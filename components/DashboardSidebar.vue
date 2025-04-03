<template>
    <div>
      <!-- Mobile sidebar toggle button - This will be shown outside of this component in the layout -->
      <div class="md:hidden">
        <slot name="toggle-button"></slot>
      </div>
  
      <!-- Sidebar backdrop overlay for mobile -->
      <Transition name="fade">
        <div
          v-if="isMobileOpen"
          class="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          @click="$emit('close')"
        ></div>
      </Transition>
  
      <!-- Sidebar content -->
      <aside
        class="fixed top-[64px] left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 shadow-lg md:shadow-none overflow-hidden flex flex-col h-[calc(100vh-64px)]"
        :class="[isMobileOpen ? 'translate-x-0' : '-translate-x-full']"
      >
        <div class="h-full flex flex-col overflow-y-auto">
          <!-- Logo slot -->
          <slot name="logo"></slot>
          <div class="p-4 md:p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <!-- Logo moved to slot -->
              </div>
              <button
                @click="$emit('close')"
                class="md:hidden text-gray-500 hover:text-primary p-1 rounded-full hover:bg-gray-100"
                aria-label="Close sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
  
            <nav class="mt-4 space-y-1">
              <div v-for="item in sidebarItems" :key="item.name">
                <div
                  class="flex items-center justify-between py-2 px-3 rounded-lg transition-colors text-gray-600 hover:bg-secondary hover:text-primary hover:bg-opacity-20 cursor-pointer"
                  :class="{ 'bg-secondary bg-opacity-20 text-primary font-medium': isActive(item.href) || item.isOpen }"
                  @click="toggleSubmenu(item)"
                >
                  <div class="flex items-center">
                    <span class="mr-3 flex-shrink-0">
                      <component :is="item.icon" class="h-5 w-5" />
                    </span>
                    <span class="text-sm">{{ item.name }}</span>
                  </div>
                  <span v-if="item.children" class="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 transform transition-transform duration-300"
                      :class="{ 'rotate-180': item.isOpen }"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
                <transition
                  enter-active-class="transition-all duration-300 ease-in-out"
                  enter-from-class="opacity-0 max-h-0"
                  enter-to-class="opacity-100 max-h-[500px]"
                  leave-active-class="transition-all duration-300 ease-in-out"
                  leave-from-class="opacity-100 max-h-[500px]"
                  leave-to-class="opacity-0 max-h-0"
                >
                  <div v-if="item.children" v-show="item.isOpen" class="ml-4 mt-1 space-y-1 overflow-hidden">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.name"
                      :to="child.href"
                      class="flex items-center py-2 px-3 rounded-lg transition-colors text-gray-600 hover:bg-secondary hover:text-primary hover:bg-opacity-20"
                      :class="{ 'bg-secondary bg-opacity-20 text-primary font-medium': isActive(child.href) }"
                      @click="$emit('close')"
                    >
                      <span class="mr-3 flex-shrink-0">
                        <component :is="child.icon" class="h-5 w-5" />
                      </span>
                      <span class="text-sm">{{ child.name }}</span>
                    </NuxtLink>
                  </div>
                </transition>
              </div>
            </nav>
          </div>
  
          <!-- User profile section at bottom -->
          <div class="mt-auto p-4 md:p-6 border-t border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm overflow-hidden">
                  {{ userInitials }}
                </div>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                <p class="text-xs text-gray-500 truncate">Account</p>
              </div>
              <button
                @click="handleLogout"
                class="ml-2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                title="Sign out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAuthStore } from '~/stores/auth'
  
  // Props
  const props = defineProps({
    isMobileOpen: {
      type: Boolean,
      default: false
    }
  })
  
  // Emits
  const emit = defineEmits(['close'])
  
  // Auth store
  const authStore = useAuthStore()
  const user = computed(() => authStore.currentUser)
  
  // User data
  const userName = computed(() => user.value?.name || 'User')
  const userInitials = computed(() => {
    const name = userName.value
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2)
  })
  
  // Handle logout
  const handleLogout = () => {
    authStore.logout()
    navigateTo('/')
  }
  
  // Dashboard sidebar items with icons
  const sidebarItems = reactive([
    {
      name: '首页',
      href: '/dashboard',
      icon: 'IconHome',
      isOpen: false
    },
    {
      name: '工作台',
      href: '/dashboard/workspace',
      icon: 'IconHome',
      isOpen: false
    },
    {
      name: '店铺管理',
      href: '/dashboard/store',
      icon: 'IconStore',
      isOpen: false,
    },
    {
      name: '选品中心',
      href: '/dashboard/sourcing',
      icon: 'IconBox',
      isOpen: false
    },
    {
      name: '我的产品',
      href: '/dashboard/library',
      icon: 'IconShoppingCart',
      isOpen: false,
      children: [
        {
          name: '产品库',
          href: '/dashboard/library',
          icon: 'IconBox',
        },
        {
          name: '刊登任务',
          href: '/dashboard/tasks',
          icon: 'IconBox',
        },
        {
          name: '刊登模版',
          href: '/dashboard/templates',
          icon: 'IconBox',
        },
      ],
    },
    {
      name: '我的订单',
      href: '/dashboard/center',
      icon: 'IconShoppingCart',
      isOpen: false,
      children: [
        {
          name: '订单中心',
          href: '/dashboard/center',
          icon: 'IconBox',
        },
        {
          name: '售后管理',
          href: '/dashboard/afterSales',
          icon: 'IconBox',
        },
      ],
    },
    {
      name: '我的钱包',
      href: '/dashboard/wallet',
      icon: 'IconSettings',
      isOpen: false
    },
    {
      name: '基本信息',
      href: '/dashboard/settings',
      icon: 'IconSettings',
      isOpen: false
    },
  ])
  

  
  // Current route to determine active link
  const route = useRoute()
  
  // Toggle submenu open/close state
  const toggleSubmenu = (item: any) => {
    if (item.children) {
      // Close other open submenus
      sidebarItems.forEach((menuItem: any) => {
        if (menuItem !== item && menuItem.children) {
          menuItem.isOpen = false
        }
      })
      // Toggle current submenu
      item.isOpen = !item.isOpen
    } else {
      navigateTo(item.href)
      emit('close')
    }
  }

  // Check if a link is active based on current route
  const isActive = (href: string) => {
    if (href === '/dashboard' && route.path === '/dashboard') {
      return true
    }
    return route.path.startsWith(href) && href !== '/dashboard'
  }
  
  // Define simple icon components
  const IconHome = defineComponent({
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    `
  })
  
  const IconWorkspace = defineComponent({
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    `
  })
  
  const IconBox = defineComponent({
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    `
  })
  
  const IconShoppingCart = defineComponent({
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    `
  })
  
  const IconUsers = defineComponent({
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    `
  })
  
  const IconChart = defineComponent({
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    `
  })
  
  const IconSettings = defineComponent({
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    `
  })
  
  // Additional icons
  const IconStore = defineComponent({
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    `
  })
  
  const IconHelp = defineComponent({
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `
  })
  </script>
  
  <style scoped>
  /* Transition for overlay */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>