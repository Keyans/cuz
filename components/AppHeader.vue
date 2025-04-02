<template>
    <header class="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm shadow-sm sticky top-0 z-40" @click.self="closeDropdowns">
      <div class="container-app">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <NuxtLink to="/" class="flex items-center">
              <img src="/assets/cuzcuz-logo.png" alt="CuzCuz" class="h-16 w-auto">
            </NuxtLink>
          </div>
  
          <!-- Main Navigation -->
          <nav class="hidden md:flex space-x-4">
            <div 
              v-for="item in navigationItems" 
              :key="item.name"
              class="relative"
            >
              <div 
                v-if="item.hasDropdown" 
                @click.prevent="toggleDropdown(item.name)"
                class="flex items-center cursor-pointer text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
                :class="{ 'text-primary': isActive(item.href) || activeDropdown === item.name }"
              >
                <svg class="h-5 w-5 mr-1">
                  <use :href="`/assets/nav-icons.svg#icon-${item.icon}`" />
                </svg>
                {{ item.name }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <NuxtLink
                v-else-if="!item.isExternal"
                :to="item.href"
                class="flex items-center text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
                :class="{ 'text-primary': isActive(item.href) }"
              >
                <svg class="h-5 w-5 mr-1">
                  <use :href="`/assets/nav-icons.svg#icon-${item.icon}`" />
                </svg>
                {{ item.name }}
              </NuxtLink>
              <a
                v-else
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                <svg class="h-5 w-5 mr-1">
                  <use :href="`/assets/nav-icons.svg#icon-${item.icon}`" />
                </svg>
                {{ item.name }}
              </a>
              
              <!-- Dropdown menu -->
              <div 
                v-if="item.hasDropdown && activeDropdown === item.name"
                class="absolute z-10 left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <NuxtLink
                    v-for="dropdownItem in item.dropdownItems"
                    :key="dropdownItem.name"
                    :to="dropdownItem.href"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="closeDropdowns"
                  >
                    {{ dropdownItem.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </nav>
  
          <!-- Right section: Search, Auth & cart -->
          <div class="flex items-center space-x-4">
            <!-- Search box -->
            <div class="hidden sm:flex items-center relative">
              <div class="relative">
                <input
                  type="text"
                  placeholder="搜索..."
                  class="pl-8 pr-4 py-1 w-48 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                  @focus="searchFocused = true"
                  @blur="searchFocused = false"
                  v-model="searchQuery"
                />
                <svg
                  class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
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
            <!-- Language switcher -->
            <div class="hidden sm:block relative">
              <button
                @click="toggleLanguageDropdown"
                class="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary hover:bg-secondary hover:bg-opacity-10 rounded-md px-2 py-1 transition-colors"
              >
                <span>{{ currentLanguage === 'zh' ? '中文' : 'English' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <!-- Language dropdown -->
              <div
                v-if="showLanguageDropdown"
                class="absolute z-10 right-0 mt-1 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <button
                    v-for="lang in languages"
                    :key="lang.code"
                    @click="changeLanguage(lang.code)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {{ lang.name }}
                  </button>
                </div>
              </div>
            </div>
            <!-- User auth status -->
            <div v-if="isAuthenticated" class="hidden sm:flex items-center space-x-2">
              <NuxtLink to="/dashboard" class="flex items-center space-x-2 text-sm text-primary hover:text-primary hover:bg-secondary hover:bg-opacity-10 rounded-md transition-colors">
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
          <!-- Mobile search box -->
          <div class="mb-3">
            <div class="relative">
              <input
                type="text"
                placeholder="搜索..."
                class="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                v-model="searchQuery"
              />
              <svg
                class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
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
          <div v-for="item in navigationItems" :key="item.name" class="relative">
            <!-- Items with dropdown -->
            <div v-if="item.hasDropdown" class="space-y-1">
              <div 
                @click="toggleDropdown(item.name)"
                class="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 cursor-pointer"
                :class="{ 'bg-secondary bg-opacity-20 text-primary': isActive(item.href) || activeDropdown === item.name }"
              >
                <span>{{ item.name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <!-- Mobile dropdown items -->
              <div v-if="activeDropdown === item.name" class="pl-4 space-y-1">
                <NuxtLink
                  v-for="dropdownItem in item.dropdownItems"
                  :key="dropdownItem.name"
                  :to="dropdownItem.href"
                  class="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                  @click="mobileMenuOpen = false"
                >
                  {{ dropdownItem.name }}
                </NuxtLink>
              </div>
            </div>
            
            <!-- Regular items without dropdown -->
            <NuxtLink
              v-else
              :to="item.href"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              :class="{ 'bg-secondary bg-opacity-20 text-primary': isActive(item.href) }"
              @click="mobileMenuOpen = false"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
  
          <!-- Language switcher for mobile -->
          <div class="border-t border-gray-200 pt-2 mt-2">
            <button
              @click="toggleLanguageDropdown"
              class="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              <span>{{ currentLanguage === 'zh' ? '中文' : 'English' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <!-- Language dropdown for mobile -->
            <div v-if="showLanguageDropdown" class="pl-4 space-y-1">
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="changeLanguage(lang.code)"
                class="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
              >
                {{ lang.name }}
              </button>
            </div>
          </div>
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
  const config = useRuntimeConfig()
  console.log("🚀 ~ config:", config.public)
  const navigationItems = [
    { 
      name: '选品中心', 
      href: '/products', 
      icon: 'products',
      hasDropdown: true,
      dropdownItems: [
        { name: '热门产品', href: '/products/popular' },
        { name: '新品上架', href: '/products/new' },
        { name: '定制服装', href: '/products/clothing' },
        { name: '家居用品', href: '/products/home' }
      ] 
    },
    { name: '网站设计', href: config.public.MICRO_POD_URL, icon: 'design', isExternal: true },
    { name: '创意图库', href: config.public.GALLERY_URL, icon: 'gallery', isExternal: true },
    // { name: '个人中心', href: '/dashboard', icon: 'user' },
  ]
  
  // Dropdown state
  const activeDropdown = ref('')
  
  // Toggle dropdown
  const toggleDropdown = (itemName: string) => {
    activeDropdown.value = activeDropdown.value === itemName ? '' : itemName
  }
  
  // Close dropdown when clicking outside
  const closeDropdowns = () => {
    activeDropdown.value = ''
  }
  // Language state
  const currentLanguage = ref('zh')
  const showLanguageDropdown = ref(false)
  const languages = [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' }
  ]
  
  // Toggle language dropdown
  const toggleLanguageDropdown = () => {
    showLanguageDropdown.value = !showLanguageDropdown.value
  }
  
  // Change language
  const changeLanguage = (langCode: string) => {
    currentLanguage.value = langCode
    showLanguageDropdown.value = false
  }
  </script>
  
  <style scoped>
  /* Navigation item hover transitions */
  .text-gray-600, .text-primary {
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
  }
  
  .text-gray-600:hover {
    background-color: rgba(var(--color-secondary), 0.1);
    color: var(--color-primary);
  }

  /* Active and hover states for primary text */
  .text-primary {
    color: var(--color-primary);
  }

  .text-primary:hover {
    background-color: rgba(var(--color-secondary), 0.1);
  }

  /* Dropdown item hover transitions */
  .text-gray-700 {
    transition: all 0.3s ease;
  }

  .text-gray-700:hover {
    background-color: rgba(var(--color-secondary), 0.1);
    color: var(--color-primary);
  }

  /* Header background transition */
  header {
    transition: background-color 0.3s ease;
  }
  </style>