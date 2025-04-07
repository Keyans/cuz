// plugins/apiFetch.ts
import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { useAuthStore } from "~/stores/auth";

// 从 URL 中获取 platformId 的辅助函数
function getPlatformIdFromUrl() {
  let platformId = "0";
  if (import.meta.client) {
    const url = window.location.href;
    const matches = url.match(/\/platform\/(\d+)\//);
    platformId = matches ? matches[1] : "0";
    if (!platformId || platformId === "0") {
      const matches_id = url.match(/\/platform_(\d+)\//);
      platformId = matches_id ? matches_id[1] : "0";
    }
    if (!platformId || platformId === "0") {
      const urlParams = new URLSearchParams(window.location.search);
      platformId = urlParams.get("platformId") || "0";
    }
  }
  return platformId;
}

// 用于标识重复请求的 key 函数
function getPendingKey(method: string, url: string) {
  return `${method}&${url}`;
}

// 全局变量：请求去重控制（使用 AbortController）
// 注意：$fetch 内部没有内置取消重复请求功能，这里利用 AbortController 来实现类似效果
const pendingMap = new Map<string, AbortController>();

// Token 类型前缀
const TOKEN_TYPE = "Bearer ";

// Token 刷新相关变量
let isRefreshing = false;
let requests: ((token: string) => void)[] = [];

// token 刷新函数（示例逻辑，根据实际接口调整）
async function refreshingFn() {
  const authStore = useAuthStore();
  const refreshToken = authStore.refreshToken;
  if (!refreshToken) return;
  try {
    isRefreshing = true;
    // 调用登录接口刷新 token（这里示例使用 login 方法，具体请根据你的逻辑调整）
    await authStore.login({ refreshToken, grant_type: "refreshToken" });
    // 执行挂起的请求，更新新 token 后重试
    requests.forEach((cb) => cb(authStore.token!));
    requests = [];
  } catch (error) {
    console.error("Token refresh error", error);
  } finally {
    isRefreshing = false;
  }
}

// 创建全局 $fetch 实例
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const apiFetch = $fetch.create({
    baseURL: import.meta.dev ? "/dev" : config.public.BASE_URL, // 在 runtimeConfig 中配置公开的 API 基础地址
    headers: {
      "Client-Hardware-Id": 1 as any,
      "Client-Type": config.public.CLIENT_TYPE,
      // 'Shop-Ids': '0',
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      Appenv: "PC",
    },
    async onRequest({ request, options }) {
      console.log(request, options);
      // 设置默认请求头
      options.headers = options.headers || {};
      options.headers.append("Accept-Language", "zh");

      // 添加平台相关 header
      const platformId = getPlatformIdFromUrl();
      if (
        !options.headers.get("Platform-Ids") ||
        options.headers.get("Platform-Ids") === "0"
      ) {
        options.headers.append("Platform-Ids", platformId);
      }
      // 使用 auth store 设置 token 和 shop id
      const authStore = useAuthStore();
      if (authStore.token) {
        options.headers.append("Authorization", TOKEN_TYPE + authStore.token);
      }
      if (authStore.user?.id) {
        options.headers.append("Shop-Ids", authStore.user.id);
      }

      // 可在此处添加其他 header 或对 URL 进行修正（例如 urlCorrect 函数）

      // 重复请求取消处理：若存在相同 key 的请求则取消旧请求
      const pendingKey = getPendingKey(request.method, request.url);
      if (pendingMap.has(pendingKey)) {
        const controller = pendingMap.get(pendingKey);
        controller?.abort();
        pendingMap.delete(pendingKey);
      }
      const controller = new AbortController();
      pendingMap.set(pendingKey, controller);
      options.signal = controller.signal;
    },
    async onResponse({ request, response, options }) {
      console.log(request, response, options);
      // 请求完成后，从 pendingMap 中清除对应项
      const pendingKey = getPendingKey(request.method, request.url);
      pendingMap.delete(pendingKey);

      // 解析响应数据
      const data = response.bodyUsed ? response._data : response.json();

      // 如果返回数据中包含分页数据，将部分字段转换为数字
      if (data.data && data.data.total) {
        data.data.total = Number(data.data.total);
        data.data.size = Number(data.data.size);
        data.data.pages = Number(data.data.pages);
        data.data.current = Number(data.data.current);
      }
      console.log("data:", data);
      // 基础响应状态检查（根据你的后端返回结构调整）
      if (response.status !== 200 || !data) {
        return Promise.reject({ msg: "服务器异常" });
      }

      // 如果后端返回 code 为 4（例如 token 失效），则尝试刷新 token
      if (data.code === 4) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshingFn();
        }
        // 挂起当前请求，待 token 刷新后重试
        return new Promise((resolve, reject) => {
          requests.push((token: string) => {
            options.headers = options.headers || {};
            options.headers.append("Authorization", TOKEN_TYPE + token);
            resolve(apiFetch(request.url, options));
          });
        });
      }

      // 可根据 code 值做更多错误处理，例如弹出提示等
      if (![200, 304].includes(data.code)) {
        console.error(data.msg);
      }
    },
    async onRequestError({ request, error, options }) {
      return Promise.reject(error);
    },
    async onResponseError({ request, error, options }) {
      return Promise.reject(error);
    },
  });

  // 将封装好的 apiFetch 实例全局注入，后续组件可通过 useNuxtApp().$apiFetch 使用
  return {
    provide: {
      apiFetch,
    },
  };
});
