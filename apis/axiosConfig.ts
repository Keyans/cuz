import axios, { type AxiosResponse } from "axios";
import { AxiosCanceler } from "./axiosCancel";
import { CRUD_ERROR_CODE, type R } from "./http.type";

import { useAuthStore } from "~/stores/auth";

const axiosCancel = new AxiosCanceler();
let isCance = true;
// const LastModified = ref('')
// const $useLastModified = useLastModified()
const TOKEN_TYPE = "Bearer ";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

const platformId = getPlatformIdFromUrl();
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: Number(import.meta.env.VITE_REQUEST_TIME_OUT),
  withCredentials: false,
  headers: {
    "Client-Hardware-Id": 1,
    // 'Client-Type': 'PLATFORM_CONSOLE',
    "Client-Type": import.meta.env.VITE_CLIENT_TYPE,
    "Platform-Ids": platformId ? platformId : 0,
    // 'Shop-Ids': '0',
    Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    Appenv: "PC",
  },
});

//是否是单体应用
const isAone =
  import.meta.env.VITE_IS_AONE &&
  import.meta.env.VITE_IS_AONE.toLowerCase() === "true";
//单体应用矫正正则
const aoneUrlCorrectRegex = /\/?.*?\//;
//url矫正函数
const urlCorrect = (currentUrl: undefined | string) => {
  return !currentUrl
    ? currentUrl
    : isAone
    ? currentUrl.replace(aoneUrlCorrectRegex, "/")
    : currentUrl;
};
// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列
let requests: any = [];

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    //如果请求头中没有平台ID，或平台ID为0，就添加刷新Platform-Ids平台ID
    const Platform_Ids = config.headers["Platform-Ids"];
    config.headers["Accept-Language"] = "zh";
    if (!Platform_Ids || Platform_Ids === 0 || Platform_Ids === "0") {
      config.headers["Platform-Ids"] = getPlatformIdFromUrl();
    }
    const { user, token } = useAuthStore();
    // const token = useUserStore().userToken
    // @ts-ignore
    if (!isRefreshing && token) {
      config.headers.Authorization = TOKEN_TYPE + token;
    }
    if (platformId) {
      config.headers["Platform-Ids"] = platformId;
    }
    if (user?.id) {
      config.headers["Shop-Ids"] = user.id;
    }
    config.url = urlCorrect(config.url);
    axiosCancel.addPending(config);
    isCance = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  async (response: AxiosResponse<R>) => {
    const result = response.data;
    if (result.data?.total) {
      result.data.total = Number(result.data.total);
      result.data.size = Number(result.data.size);
      result.data.pages = Number(result.data.pages);
      result.data.current = Number(result.data.current);
    }
    if (response.status !== 200 || !result) {
      return Promise.reject({
        msg: "服务器异常",
      });
    }
    const code = result.code;
    // 2 需要登陆 3 token不可用 4 token已过期 reFreshToken 换 token
    if (code === 4) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshingFn();
      }
      // 返回未执行 resolve 的 promise
      return new Promise((resole) => {
        requests.push((token: string) => {
          response.headers.Authorization = TOKEN_TYPE + token;
          resole(instance(response.config));
        });
      });
    }
    if ([200, 304].includes(code)) {
      return Promise.resolve(response);
    }
    // 错误捕获
    if (CRUD_ERROR_CODE.includes(code)) {
      //TODO: 弹出报错信息
      console.error(response.data.msg);
      //   ElMessage.error(response.data.msg);
    }

    axiosCancel.removePending(response.config);
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error);
    } else if (error.response === undefined && isCance) {
      isCance = false;
      return Promise.reject(error);
    }
  }
);

export default instance;

// export function uuidHandle() {
//     const $storage = new storage()
//     let uuid = $storage.getItem('UUID')
//     if (!uuid) {
//         uuid = createUuid(8)
//         $storage.setItem('UUID', uuid, 60 * 60 * 24)
//     }
//     return uuid
// }

const refreshingFn = async () => {
  const refreshToken = useAuthStore().refreshToken;
  if (!refreshToken) return;
  try {
    isRefreshing = true;
    await useAuthStore().login({
      refreshToken,
      type: "refreshToken",
    });
    requests.forEach((cd: (t: string) => any) => cd(useAuthStore().token!));
    requests = [];
    isRefreshing = false;
  } catch (error) {
    console.log("error", error);
  } finally {
    isRefreshing = false;
  }
};

// 通过函数动态从URL中取出 platformId 值
export function getPlatformIdFromUrl() {
  //定义platformId变量，并设置默认值为0
  let platformId = "0";

  //1.优先取值【地址路径法(不会被刷掉)：只在平台端使用，其他端废弃，因为改动影响太多】其中，用户请求的URL格式如下：http://www.aixcc.com:8078/platform/1788139342520967168/generalSet，正则表达式会匹配到 1788139342520967168 并将其作为 platformId
  const url = window.location.href;
  const matches = url.match(/\/platform\/(\d+)\//);
  platformId = matches ? matches[1] : "0";

  //1.1.如果优先没有在第一种格式的地址路径法中没有取到，就尝试兼容的另外一种路径格式中去取
  if (!platformId || platformId === "0") {
    //1.优先取值【地址路径法(不会被刷掉)：只在平台端使用，其他端废弃，因为改动影响太多】其中，用户请求的URL格式如下：http://www.aixcc.com:8078/h5/platform_1788139342520967168/generalSet，正则表达式会匹配到 1788139342520967168 并将其作为 platformId
    const matches_id = url.match(/\/platform_(\d+)\//);
    platformId = matches_id ? matches_id[1] : "0";
    //debugger
  }

  //2.如果优先没有在地址路径法中没有取到，就从地址参数法中取
  if (!platformId || platformId === "0") {
    //2.其次取值【地址参数法(会被刷掉)：其他端使用，平台端不用】其中，用户请求的URL格式如下：http://www.aixcc.com:8078/platform/#/generalSet?platformId=1788139342520967168，地址栏取请求参数会匹配到 1788139342520967168 并将其作为 platformId
    const urlParams = new URLSearchParams(window.location.search);
    platformId = urlParams.get("platformId") || "0";
  }

  return platformId;
}
