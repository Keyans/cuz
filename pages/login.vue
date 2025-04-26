<template>
  <div class="min-h-screen bg-background flex w-full justify-center relative">
    <!-- Close button -->
    <button
      @click="$router.back()"
      class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <!-- <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <NuxtLink to="/" class="flex justify-center">
        <img src="/assets/logo.svg" alt="cuzcuz" class="h-12">
      </NuxtLink>
      <h2 class="mt-6 text-center text-3xl font-bold text-primary">
        Welcome back.
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <NuxtLink to="/register" class="font-medium text-primary hover:text-secondary">
          sign up for a new account
        </NuxtLink>
      </p>
    </div> -->
    <div
      class="flex-grow-0 flex-shrink-0 basis-[41%] bg-cover hidden lg:block relative"
      :style="{ backgroundImage: `url(${leftImg})` }"
    ></div>

    <div
      class="self-center -mt-[10%] sm:mx-auto sm:w-full sm:max-w-md relative"
    >
      <div class="flex flex-col items-center mb-8">
        <img src="/assets/cuzcuz-logo.png" alt="cuzcuz" class="h-40 w-auto" />
        <h2 class="text-xl font-medium text-gray-700 mt-2">
          全球POD柔性定制供应链平台
        </h2>
      </div>

      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Demo account login button -->
        <div class="mb-6" v-if="formMode === 'login'">
          <button
            @click="loginWithDemoAccount"
            class="w-full flex justify-center items-center py-2 px-4 border border-dashed border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-secondary bg-opacity-30 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
            登录体验账号 (无需输入)
          </button>
        </div>

        <form class="space-y-6" @submit.prevent="submitForm">
          <div
            v-if="error"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          >
            {{ error }}
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">
              手机号
            </label>
            <div class="mt-1">
              <input
                @blur="checkPhone"
                id="phone"
                v-model="phone"
                name="phone"
                type="text"
                autocomplete="phone"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>

          <div v-if="formMode === 'register'">
            <label
              for="invitation"
              class="block text-sm font-medium text-gray-700"
            >
              邀请码
            </label>
            <div class="mt-1">
              <input
                id="invitation"
                v-model="invitation"
                name="invitation"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="captcha"
              class="block text-sm font-medium text-gray-700"
            >
              验证码
            </label>
            <div class="flex mt-1 w-full space-x-1">
              <input
                id="captcha"
                v-model="captcha"
                name="captcha"
                type="text"
                required
                class="appearance-none block flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
              <Motion :while-hover="{ opacity: 0.6 }">
                <button
                  type="button"
                  class="bg-white px-4 rounded-sm text-gray-600 border-gray-300 border h-full shadow-sm hover:bg-gray-50 transition-colors"
                  @click="getCaptcha"
                >
                  获取验证码
                </button>
              </Motion>
            </div>
          </div>

          <!-- <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                v-model="rememberMe"
                name="remember_me"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label for="remember_me" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <NuxtLink
                to="/forgot-password"
                class="font-medium text-primary hover:text-secondary"
              >
                Forgot password?
              </NuxtLink>
            </div>
          </div> -->

          <div>
            <Motion
              :while-hover="{ scale: 1.05, opacity: 0.9 }"
              :while-press="{ scale: 0.95 }"
            >
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary bg-secondary hover:opacity-90 transition-opacity"
                :class="{ 'opacity-75 cursor-not-allowed': loading }"
              >
                <span v-if="loading" class="mr-2">
                  <svg
                    class="animate-spin h-5 w-5 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
                {{ formMode === "login" ? "登 录" : "注 册" }}
              </button>
            </Motion>
          </div>

          <div class="mt-4 text-center text-xs text-gray-500">
            登录/注册即代表您同意
            <NuxtLink
              to="/agreement"
              class="text-primary hover:opacity-80 transition-opacity"
              >《用户服务协议》</NuxtLink
            >、
            <NuxtLink
              to="/privacy"
              class="text-primary hover:opacity-80 transition-opacity"
              >《隐私权政策》</NuxtLink
            >、
            <NuxtLink
              to="/legal"
              class="text-primary hover:opacity-80 transition-opacity"
              >《法律声明》</NuxtLink
            >、
            <NuxtLink
              to="/agency"
              class="text-primary hover:opacity-80 transition-opacity"
              >《委托代理协议》</NuxtLink
            >、
            <NuxtLink
              to="/ip-policy"
              class="text-primary hover:opacity-80 transition-opacity"
              >《知识产权政策》</NuxtLink
            >
          </div>
        </form>

        <!-- <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500"> OR </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <div>
              <a
                href="#"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>

            <div>
              <a
                href="#"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div> -->
      </div>
      <h3 class="mt-6 mx-auto w-fit">
        {{ formMode === "login" ? "没有账号？" : "已有账户？" }}
        <button class="underline underline-offset-2" @click="switchMode">
          {{ formMode === "login" ? "立即注册" : "前往登录" }}
        </button>
      </h3>
    </div>
    <ClientOnly>
      <el-dialog v-model="captchaConfig.showSliderCaptcha" width="fit-content">
        <template #header></template>
        <SliderCaptcha
          v-model="captchaConfig.showSliderCaptcha"
          :do-submit="doPostSmsCode"
          :get-form="() => phone"
          :scale="1"
          @success="slideCaptchaSuccess"
        ></SliderCaptcha>
        <template #footer></template>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore, type LoginCredentials } from "~/stores/auth";
import { Motion } from "motion-v";
import { doPostSmsCode, signByUser } from "~/apis/sign";
import SliderCaptcha from "~/components/ui/slide-captcha/SliderCaptcha.vue";

definePageMeta({
  layout: "auth",
});
const leftImg = `/assets/login_bg.png`;

// Form state
const phone = ref("");
const checkPhone = () => {
  if (
    !/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(
      phone.value
    )
  )
    error.value = "请填写正确的手机号码";
  else error.value = null;
};
const invitation = ref("");
const route = useRoute();
const router = useRouter();
const formMode = computed<"login" | "register">({
  get() {
    const type = route.query?.type;
    if (type === "login" || type === "register") return type;
    else return "login";
  },
  set(value) {
    router.replace({ query: { type: value } });
  },
});
const switchMode = () => {
  captcha.value = "";
  formMode.value === "login"
    ? (formMode.value = "register")
    : (formMode.value = "login");
};
const captcha = ref("");

const intervalTime = 120;
const captchaConfig = reactive({
  showSliderCaptcha: false,
  shop: null,
  visible: false,
  shops: [],
  account: null,
  password: null as null | string,
  disabled: false,
  time: intervalTime,
  interval: null as any,
});

const rememberMe = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const error = ref<string | null>(null);

const slideCaptchaSuccess = (response: { code: number; data: string }) => {
  captcha.value = response.data;

  captchaConfig.time -= 1;
  captchaConfig.showSliderCaptcha = false;
  captchaConfig.interval = setInterval(() => {
    captchaConfig.time -= 1;
    if (captchaConfig.time <= 0) {
      captchaConfig.time = intervalTime;
      if (captchaConfig.interval) {
        clearInterval(captchaConfig.interval);
        captchaConfig.interval = null;
      }
      return;
    }
  }, 999);
};

const getCaptcha = () => {
  if (!phone.value) {
    error.value = "请输入手机号";
    return;
  }

  captchaConfig.showSliderCaptcha = true;
};

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Get auth store
const authStore = useAuthStore();

// Login with demo account
const loginWithDemoAccount = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Login with demo credentials
    await authStore.login({
      email: "demo@example.com",
      password: "password123",
      grant_type: "email",
    });

    // Redirect to dashboard
    navigateTo("/dashboard/sourcing");
  } catch (err: any) {
    error.value =
      err.message || "Failed to login with demo account. Please try again.";
  } finally {
    loading.value = false;
  }
};

// Login method
const submitForm = async () => {
  loading.value = true;
  error.value = null;

  let credentials: LoginCredentials | undefined = undefined;

  if (formMode.value === "login") {
    credentials = {
      mobile: phone.value,
      code: captcha.value,
      grant_type: "sms_code",
    };
  } else if (formMode.value === "register") {
    credentials = {
      mobile: phone.value,
      invitation_code: invitation.value,
      code: captcha.value,
      grant_type: "creative_shop",
    };
  }

  if (!credentials) return;

  try {
    await authStore.login(credentials);
    navigateTo("/dashboard/sourcing");
  } catch (err: any) {
    error.value =
      err.message || "Failed to login. Please check your credentials.";
  } finally {
    loading.value = false;
  }
};
</script>
