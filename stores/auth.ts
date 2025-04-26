import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { signByUser } from "~/apis/sign";

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
    setCookiesInfo(data: any) {
      Cookies.set("SH_TOKEN_SHOP", data?.value, {
        expires: new Date(data?.refreshToken?.expiration), // 过期时间
        domain: window.location.hostname.split(".").slice(-2).join("."),
        path: "/", // 根路径
      });
      // 设置时间戳到cookie， 用于处理url没有传参，同时两个端都登录的情况
      const time = new Date().getTime().toString();
      Cookies.set("SH_TOKEN_SHOP_TIME", time, {
        expires: new Date(data?.refreshToken?.expiration), // 过期时间
        domain: window.location.hostname.split(".").slice(-2).join("."),
        path: "/", // 根路径
      });
      const shopId = data.additionalInformation.shopId[0] || "";
      Cookies.set("SH_SHOP_SHOPID", shopId, {
        expires: new Date(data?.refreshToken?.expiration), // 过期时间
        domain: window.location.hostname.split(".").slice(-2).join("."),
        path: "/", // 根路径
      });
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

          this.setCookiesInfo(data);
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
      // 清除refreshTokenSource 到 cookie
      Cookies.remove("SH_TOKEN_SHOP", {
        domain: window.location.hostname.split(".").slice(-2).join("."),
        path: "/", // 根路径
      });
      Cookies.remove("SH_TOKEN_SHOP_TIME", {
        domain: window.location.hostname.split(".").slice(-2).join("."),
        path: "/", // 根路径
      });
      Cookies.remove("SH_SHOP_SHOPID", {
        domain: window.location.hostname.split(".").slice(-2).join("."),
        path: "/", // 根路径
      });

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
      const refresh_token = Cookies.get("SH_TOKEN_SHOP");
      if (!refresh_token) {
        console.log("refreshToken 不存在");
        return;
      }
      console.log("获取到自动登录的token");

      const { data } = await signByUser({
        grant_type: "refresh_token",
        refresh_token,
      });

      this.setCookiesInfo(data);

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
