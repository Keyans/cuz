<template>
  <div class="min-h-screen flex flex-col bg-background">
    <!-- Header -->
    <div
      class="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200 flex-shrink-0"
    >
      <div class="container-app">
        <div class="flex items-center justify-between h-16">
          <!-- Mobile menu button and logo -->
          <div class="flex items-center">
            <button
              v-if="!hideSidebar"
              @click="toggleSidebar"
              class="p-2 rounded-md text-primary hover:bg-secondary hover:bg-opacity-20 transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
              aria-label="Toggle sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <NuxtLink to="/" class="flex items-center ml-3 md:ml-0">
              <img
                src="/assets/cuzcuz-logo.png"
                alt="cuzcuz"
                class="h-16 w-auto hidden md:block"
              />
              <span class="font-bold text-primary text-lg md:hidden"
                >cuzcuz</span
              >
            </NuxtLink>
          </div>

          <!-- Header actions -->
          <div class="flex items-center space-x-3">
            <!-- Search -->
            <div class="hidden md:block">
              <div class="relative">
                <input
                  type="text"
                  placeholder="搜索..."
                  class="w-64 bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-500 absolute left-3 top-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <!-- User info -->
            <div class="hidden sm:flex items-center">
              <span class="text-sm text-gray-600 mr-2">{{ userName }}</span>
              <div
                v-if="userAvatar"
                class="h-8 w-8 rounded-full overflow-hidden"
              >
                <img
                  :src="userAvatar"
                  alt="User Avatar"
                  class="h-full w-full object-cover"
                />
              </div>
              <div
                v-else
                class="h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
              >
                <span class="text-primary font-bold text-sm">{{
                  userInitials
                }}</span>
              </div>
            </div>

            <!-- Notifications -->
            <button class="p-2 rounded-full hover:bg-gray-100 relative">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                class="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                >3</span
              >
            </button>

            <!-- Help -->
            <button class="p-2 rounded-full hover:bg-gray-100 hidden sm:block">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Dashboard container -->
    <div class="flex-grow flex relative">
      <!-- Sidebar -->
      <div v-if="!hideSidebar" class="md:w-64 flex-shrink-0">
        <DashboardSidebar
          :is-mobile-open="sidebarOpen"
          @close="sidebarOpen = false"
        >
          <!-- <template #logo>
            <div class="flex items-center justify-center p-4 border-b border-gray-200">
              <img src="/assets/cuzcuz-logo.png" alt="cuzcuz" class="h-16 w-auto block" />
            </div>
          </template> -->
          <template #toggle-button>
            <!-- Slot kept for backward compatibility -->
          </template>
        </DashboardSidebar>
      </div>

      <!-- Main content -->
      <main
        class="flex-1 p-4 pt-2 overflow-auto transition-all duration-300 relative scroll-smooth"
        id="dashboard-main"
        @scroll="handleScroll"
      >
        <NuxtPage keep-alive transition="fade" />

        <button
          @click="goTop"
          :class="[
            'transition-all rounded-full bg-black/5 fixed h-[32px] w-[32px] flex justify-center items-center',
            showClickToTop ? 'right-4 bottom-4' : '-right-[32px] bottom-10',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 1024 1024"
          >
            <path fill="currentColor" d="M512 320 192 704h639.936z"></path>
          </svg>
        </button>
      </main>
    </div>

    <!-- Mobile action button - quick access to workspace -->
    <div v-if="!hideSidebar" class="fixed bottom-4 right-4 md:hidden z-30">
      <button
        @click="navigateToWorkspace"
        class="w-14 h-14 rounded-full bg-secondary shadow-lg flex items-center justify-center text-primary hover:bg-opacity-90 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ScrollCallBackSymbol } from "~/constant";
import { useAuthStore } from "~/stores/auth";
import { shouldHideSidebar } from "~/constant/auth";
import { useRoute } from "vue-router";

// 获取当前路由
const route = useRoute();
// 获取用户登录状态
const authStore = useAuthStore();
// 判断是否需要隐藏侧边栏，增加登录状态判断
const hideSidebar = computed(() => shouldHideSidebar(route.path, authStore.isAuthenticated));

// Mobile sidebar state
const sidebarOpen = ref(false);

// Toggle sidebar for mobile
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

type CallBack = () => void | Promise<void>;
const callbacks = ref<Map<string, { lock: boolean; fn: CallBack }>>(new Map());

// 注册子组件的回调函数
const registerScrollCallback = (id: string, fn: CallBack) => {
  callbacks.value.set(id, { fn, lock: false });
};

const showClickToTop = ref(false);

// 滚动事件处理函数
const handleScroll = (event: Event) => {
  const container = event.target as HTMLElement;
  if (
    container.scrollHeight > container.clientHeight &&
    container.scrollTop > 50
  ) {
    showClickToTop.value = true;
  } else {
    showClickToTop.value = false;
  }

  // 判断滚动条是否触底
  if (
    container.scrollHeight - container.scrollTop - 50 <=
    container.clientHeight
  ) {
    // 执行所有子组件的回调函数
    callbacks.value.forEach(async (item) => {
      if (!item.lock) {
        item.lock = true;
        try {
          await item.fn();
        } catch (error) {
          console.error("item fn failed", error);
        } finally {
          item.lock = false;
        }
      }
    });
  }
};

const goTop = () => {
  const el = document.getElementById("dashboard-main");
  el && (el.scrollTop = 0);
};
// 提供给子组件注册回调函数的接口
provide(ScrollCallBackSymbol, registerScrollCallback);

// Get user info from auth store
const user = computed(() => authStore.currentUser);
const userName = computed(() => user.value?.name || "User");
const userAvatar = computed(() => user.value?.avatar || null);
const userInitials = computed(() => {
  const name = userName.value;
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2);
});

// Quick navigation to workspace
const navigateToWorkspace = () => {
  navigateTo("/dashboard/workspace");
};
</script>

<style scoped>
/* Optional dashboard layout styles */
</style>
