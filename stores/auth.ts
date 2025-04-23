import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { signByUser } from "~/apis/sign";
import {
  getRefreshTokenFromCookie,
  removeRefreshTokenFromCookie,
  setRefreshTokenToCookie,
} from "senhang-ui/utils";

interface User {
  id: string;
  shopId: string;
  email: string;
  name: string;
  role?: string;
  avatar?: string;
}
// 验证码+邀请码
interface PhoneCredentials {
  mobile: string;
  code: string;
  grant_type: "sms_code";
}

interface RegisterCredentials {
  mobile: string;
  code: string;
  invitation_code: string;
  grant_type: "creative_shop";
}

// 邮件（暂无）
interface EmailCredentials {
  email: string;
  password: string;
  grant_type: "email";
}
// 账号密码;
interface UsernameCredentials {
  username: string;
  password: string;
  grant_type: "password";
}
// 刷新
interface RefreshTokenCredentials {
  refreshToken: string;
  grant_type: "refreshToken";
}

export type LoginCredentials =
  | RegisterCredentials
  | PhoneCredentials
  | EmailCredentials
  | RefreshTokenCredentials
  | UsernameCredentials;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    refreshToken: null as string | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    // Set user and token from local storage on initialization
    init() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },
    // Login action
    async login(credentials: LoginCredentials) {
      this.loading = true;
      this.error = null;

      try {
        // Check if it's the demo account
        const isDemoAccount =
          "email" in credentials &&
          credentials.email === "demo@example.com" &&
          credentials.password === "password123";

        let response: { user: User; token: string };

        if (isDemoAccount) {
          response = await new Promise<{ user: User; token: string }>(
            (resolve) => {
              resolve({
                user: {
                  id: "demo-user",
                  shopId: "demo-shop",
                  email: credentials.email,
                  name: "体验账号用户",
                  role: "demo",
                  avatar: "/assets/favicon.png",
                },
                token: "demo-jwt-token",
              });
            }
          );
          this.user = response.user;
          this.token = response.token;
        } else {
          const { data, msg } = await signByUser(credentials);

          if (msg) throw new Error(msg);

          if (!data) throw new Error("未知错误");

          this.user = {
            id: data.additionalInformation?.userId,
            shopId: data.additionalInformation?.shopId?.[0],
            email: "",
            name: "",
          };
          this.token = data.value;
          this.refreshToken = data.refreshToken.value;

          // 生产环境中，设置refreshToken 到 cookie
          setRefreshTokenToCookie(
            data?.refreshToken?.value,
            data?.refreshToken?.expiration
          );

          // 仅在本地环境中测试代码
          if (import.meta.env.DEV) {
            const refresh_token_from_cookie = data.refreshToken.value;
            Cookies.set("refreshToken", refresh_token_from_cookie, {
              expires: 7, // 过期时间
              domain: window.location.hostname, // 一级域名共享
              path: "/", // 根路径
            });
          }
        }
        localStorage.setItem("token", this.token!);
        localStorage.setItem("refreshToken", this.refreshToken!);
        localStorage.setItem("user", JSON.stringify(this.user));
        navigateTo("/dashboard/sourcing");
      } catch (err: any) {
        this.error = err.message || "Failed to login";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Logout action
    logout() {
      if (import.meta.env.DEV) {
        Cookies.remove("refreshToken");
      }
      // 清除refreshToken 到 cookie
      removeRefreshTokenFromCookie();

      this.user = null;
      this.token = null;

      // Remove from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
    async auto_login() {
      // 判断是否开启cookie 一级域名共享
      const cookieShare = import.meta.env.VITE_COOKIE_SHARE;
      if (cookieShare !== "true") {
        console.log("cookie 一级域名共享未开启");
        return;
      }
      let refresh_token = getRefreshTokenFromCookie();
      // 本地环境不能自动登录, 这个是因为本地环境的cookie是在本地环境的域名下的，而不是一级域名下的，所以不能自动登录
      if (import.meta.env.DEV) {
        refresh_token = Cookies.get("refreshToken");
      }
      if (!refresh_token) {
        console.log("refreshToken 不存在");
        return;
      }
      console.log("获取到自动登录的token");
      const { data } = await signByUser({
        grant_type: "refresh_token",
        refresh_token,
      });

      this.user = {
        id: data.additionalInformation?.userId,
        shopId: data.additionalInformation?.shopId?.[0],
        email: "",
        name: "",
      };
      
      this.token = data.value;
      this.refreshToken = data.refreshToken.value;
      
      localStorage.setItem("token", this.token!);
      localStorage.setItem("refreshToken", this.refreshToken!);
      localStorage.setItem("user", JSON.stringify(this.user));
    },
  },
});
