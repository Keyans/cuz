<template>
  <header class="bg-white shadow-sm">
    <div class="container-app">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <img src="/assets/logo.svg" alt="Printify" class="h-8 w-auto">
          </NuxtLink>
        </div>

        <!-- Main Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            class="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
            :class="{ 'text-primary': isActive(item.href) }"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- Right section: Auth & cart -->
        <div class="flex items-center space-x-4">
          <!-- User auth status -->
          <div v-if="isAuthenticated" class="hidden sm:flex items-center space-x-2">
            <NuxtLink to="/dashboard" class="flex items-center space-x-2 text-sm text-primary hover:text-secondary">
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                工作台
              </span>
            </NuxtLink>
          </div>
          <div v-else class="hidden sm:flex items-center space-x-3">
            <NuxtLink to="/login" class="text-sm text-primary hover:text-secondary">登录</NuxtLink>
            <NuxtLink to="/register" class="text-sm bg-secondary text-primary px-3 py-1 rounded hover:bg-opacity-80">注册</NuxtLink>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              :class="{'hidden': mobileMenuOpen, 'block': !mobileMenuOpen}"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen}"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen}"
      class="md:hidden"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.href"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          :class="{ 'bg-secondary bg-opacity-20 text-primary': isActive(item.href) }"
          @click="mobileMenuOpen = false"
        >
          {{ item.name }}
        </NuxtLink>

        <!-- Auth links for mobile -->
        <div class="border-t border-gray-200 pt-2 mt-2">
          <div v-if="isAuthenticated">
            <NuxtLink
              to="/dashboard"
              class="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-50 flex items-center"
              @click="mobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              进入工作台
            </NuxtLink>
            <button
              @click="handleLogout"
              class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              退出登录
            </button>
          </div>
          <div v-else class="flex flex-col space-y-1">
            <NuxtLink
              to="/login"
              class="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-50"
              @click="mobileMenuOpen = false"
            >
              登录
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="block px-3 py-2 rounded-md text-base font-medium bg-secondary bg-opacity-20 text-primary"
              @click="mobileMenuOpen = false"
            >
              注册
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

// Mobile menu state
const mobileMenuOpen = ref(false)

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Get current route
const route = useRoute()

// Check if a link is active
const isActive = (href: string) => {
  return route.path === href || route.path.startsWith(`${href}/`)
}

// Auth store for login status
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

// Handle logout
const handleLogout = () => {
  authStore.logout()
  mobileMenuOpen.value = false
  navigateTo('/')
}

// Navigation items
const navigationItems = [
  { name: '首页', href: '/' },
  { name: '产品', href: '/products' },
  { name: '定价', href: '/pricing' },
  { name: '帮助', href: '/help' },
]
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
