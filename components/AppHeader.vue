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
                {{ item.name }}
              </NuxtLink>
              <a
                v-else
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
              >
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
              <div class="relative search-container">
                <input
                  type="text"
                  ref="searchInput"
                  placeholder=""
                  class="pl-8 pr-4 py-1 w-48 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                  @focus="searchFocused = true"
                  @blur="searchFocused = false"
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                />
                <div class="search-placeholder-container" v-if="!searchQuery">
                  <div 
                    class="search-placeholder-text"
                    :class="{ 'exit': isExiting, 'enter': isEntering }"
                  >
                    {{ currentPlaceholder }}
                  </div>
                </div>
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
              <NuxtLink to="/dashboard/sourcing">
                <div class="flex items-center space-x-2 text-sm text-primary hover:text-primary hover:bg-secondary hover:bg-opacity-10 rounded-md transition-colors flex">
                    <img src="/assets/favicon.png" alt="User Avatar" class="h-8 w-8 rounded-full mr-2" />
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      工作台
                    </span>
                </div>
              </NuxtLink>
            </div>
            <div v-else class="hidden sm:flex items-center space-x-3">
              <NuxtLink to="/login" class="text-sm text-primary hover:text-secondary">登录</NuxtLink>
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
            <div class="relative search-container mobile-search">
              <input
                type="text"
                placeholder=""
                class="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                v-model="searchQuery"
                @focus="searchFocused = true"
                @blur="searchFocused = false"
                @keyup.enter="handleSearch"
              />
              <div class="search-placeholder-container" v-if="!searchQuery">
                <div 
                  class="search-placeholder-text"
                  :class="{ 'exit': isExiting, 'enter': isEntering }"
                >
                  {{ currentPlaceholder }}
                </div>
              </div>
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
                to="/dashboard/sourcing"
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
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue'
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
      href: '/dashboard/sourcing', 
      icon: 'products',
      hasDropdown: false,
      dropdownItems: [
        { name: '热门产品', href: '/products/popular' },
        { name: '新品上架', href: '/products/new' },
        { name: '定制服装', href: '/products/clothing' },
        { name: '家居用品', href: '/products/home' }
      ] 
    },
    { name: '网站设计', href: `${config.public.MICRO_POD_URL}`, icon: 'design', isExternal: true },
    // { name: '创意图库', href: config.public.GALLERY_URL, icon: 'gallery', isExternal: true },
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

  // Search state
  const searchQuery = ref('')
  const searchFocused = ref(false)
  const currentPlaceholder = ref('搜索童装')
  const isExiting = ref(false)
  const isEntering = ref(true)

  // Search placeholder rotation
  const placeholders = [
    '搜索童装',
    '搜索男装',
    '搜索女装',
    '搜索首饰',
    '搜索手机壳',
    '搜索背包',
    '搜索水杯',
    '搜索背心',
    '搜索卫衣',
    '搜索帽衫',
    '搜索帽子'
  ]
  const placeholderIndex = ref(0)

  const searchInput = ref(null)
  let placeholderInterval: any = null

  // 实现平滑过渡的文本切换
  const changePlaceholder = () => {
    // 先设置退出动画
    isExiting.value = true
    
    // 匹配slideUp动画的3秒时长
    setTimeout(() => {
      placeholderIndex.value = (placeholderIndex.value + 1) % placeholders.length
      currentPlaceholder.value = placeholders[placeholderIndex.value]
      isExiting.value = false
      isEntering.value = true
      
      // 匹配slideDown动画的2秒时长
      setTimeout(() => {
        isEntering.value = false
      }, 2000)
    }, 3000)
  }

  // Start placeholder rotation
  const startPlaceholderRotation = () => {
    // 初始启动时，取消进入动画状态
    setTimeout(() => {
      isEntering.value = false
    }, 2000)
    
    placeholderInterval = setInterval(() => {
      changePlaceholder()
    }, 5000) // 增加间隔时间，让用户有足够时间阅读每个词
  }

  onMounted(() => {
    startPlaceholderRotation()
  })

  onUnmounted(() => {
    if (placeholderInterval) clearInterval(placeholderInterval)
  })

  // Handle search focus
  watch(searchFocused, (newValue) => {
    if (newValue) {
      // 用户聚焦时暂停轮播
      if (placeholderInterval) clearInterval(placeholderInterval)
    } else {
      // 用户失焦且输入框为空时继续轮播
      if (!searchQuery.value) {
        startPlaceholderRotation()
      }
    }
  })

  // Watch search query
  watch(searchQuery, (newValue) => {
    if (newValue) {
      // 有输入内容时停止轮播
      if (placeholderInterval) clearInterval(placeholderInterval)
    } else if (!searchFocused.value) {
      // 输入框为空且未聚焦时恢复轮播
      startPlaceholderRotation()
    }
  })

  // 处理搜索事件
  const handleSearch = () => {
    let searchKeyword = searchQuery.value;
    
    // 如果没有输入，使用当前的placeholder值
    if (!searchKeyword || searchKeyword.trim() === '') {
      searchKeyword = currentPlaceholder.value;
    }
    
    // 跳转到指定页面
    navigateTo(`/dashboard/sourcing/list?q=${encodeURIComponent(searchKeyword)}`);
    
    // 如果是在移动端菜单中，搜索后关闭菜单
    if (mobileMenuOpen.value) {
      mobileMenuOpen.value = false;
    }
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

  /* Placeholder fade animation */
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(100%); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-100%); }
  }

  /* 自定义更平滑的动画 */
  @keyframes slideUp {
    0% { transform: translateY(0); opacity: 1; }
    60% { transform: translateY(0); opacity: 1; } /* 保持显示状态更长时间 */
    65% { transform: translateY(-2px); opacity: 0.95; } /* 开始非常缓慢地移动 */
    70% { transform: translateY(-5px); opacity: 0.9; }
    75% { transform: translateY(-8px); opacity: 0.85; }
    80% { transform: translateY(-12px); opacity: 0.7; }
    85% { transform: translateY(-16px); opacity: 0.5; }
    90% { transform: translateY(-20px); opacity: 0.3; }
    95% { transform: translateY(-25px); opacity: 0.15; }
    100% { transform: translateY(-30px); opacity: 0; }
  }

  @keyframes slideDown {
    0% { transform: translateY(30px); opacity: 0; }
    5% { transform: translateY(25px); opacity: 0.15; }
    10% { transform: translateY(20px); opacity: 0.3; }
    15% { transform: translateY(16px); opacity: 0.5; }
    20% { transform: translateY(12px); opacity: 0.7; }
    25% { transform: translateY(8px); opacity: 0.85; }
    30% { transform: translateY(5px); opacity: 0.9; }
    35% { transform: translateY(2px); opacity: 0.95; }
    40% { transform: translateY(0); opacity: 1; } /* 到达显示位置 */
    100% { transform: translateY(0); opacity: 1; } /* 保持显示状态 */
  }

  .search-placeholder-text.exit {
    animation: slideUp 3s ease-in forwards; /* 使用ease-in使动画开始慢结束快 */
  }

  .search-placeholder-text.enter {
    animation: slideDown 2s ease-out forwards; /* 使用ease-out使动画开始快结束慢 */
  }

  /* 搜索框容器 */
  .search-container {
    position: relative;
  }

  /* 搜索框文字滚动效果 */
  .search-placeholder-container {
    position: absolute;
    left: 30px;
    top: 0;
    height: 100%;
    pointer-events: none;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: #9ca3af;
    overflow: hidden; /* 限制文字在容器内 */
    width: 70%; /* 防止文字超出搜索框 */
  }

  .search-placeholder-text {
    position: absolute;
    white-space: nowrap;
    transform: translateY(0);
    opacity: 1;
    will-change: transform, opacity; /* 提高动画性能，减少抖动 */
    transform-style: preserve-3d; /* 启用3D变换，减少抖动 */
    backface-visibility: hidden; /* 避免闪烁 */
  }

  input::placeholder {
    color: transparent;
  }

  /* 防止鼠标悬停在搜索框时出现的抖动 */
  .search-container:hover .search-placeholder-text {
    animation-play-state: paused; /* 悬停时暂停动画，防止抖动 */
  }

  /* 移动端搜索框文字位置调整 */
  .mobile-search .search-placeholder-container {
    left: 36px; /* 稍微调整以适应移动端布局 */
    width: 70%; /* 确保移动端也有足够的宽度 */
  }
  </style>