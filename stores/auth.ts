import { defineStore } from "pinia";
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
  invitationCode?: string;
  grant_type: "sms_code";
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

type LoginCredentials =
  | PhoneCredentials
  | EmailCredentials
  | RefreshTokenCredentials
  | UsernameCredentials;

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
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
                  avatar: "/assets/demo-avatar.png",
                },
                token: "demo-jwt-token",
              });
            }
          );
          this.user = response.user;
          this.token = response.token;
        } else {
          const { data } = await signByUser(credentials);
          console.log(data);
          this.user = {
            id: data.additionalInformation?.userId,
            shopId: data.additionalInformation?.shopId?.[0],
            email: "",
            name: "",
          };
          this.token = data.value;
          this.refreshToken = data.refreshToken.value;
        }
        localStorage.setItem("token", this.token!);
        localStorage.setItem("refreshToken", this.refreshToken!);
        localStorage.setItem("user", JSON.stringify(this.user));
        navigateTo("/dashboard");
      } catch (err: any) {
        this.error = err.message || "Failed to login";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Register action
    async register(credentials: RegisterCredentials) {
      this.loading = true;
      this.error = null;

      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll simulate a successful registration
        const response = await new Promise<{
          user: User;
          token: string;
          refreshToken: string;
        }>((resolve) => {
          setTimeout(() => {
            resolve({
              user: {
                id: "1",
                shopId: "demo",
                email: credentials.email,
                name: credentials.name,
                role: "user",
              },
              token: "fake-jwt-token",
              refreshToken: "fake-jwt-token",
            });
          }, 1000);
        });

        this.user = response.user;
        this.token = response.token;

        // Store in localStorage
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        return response;
      } catch (err: any) {
        this.error = err.message || "Failed to register";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Logout action
    logout() {
      this.user = null;
      this.token = null;

      // Remove from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});
