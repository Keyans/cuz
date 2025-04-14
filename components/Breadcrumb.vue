<template>
  <div class="container mx-auto py-1 px-0 mb-2">
    <div class="flex items-center text-sm text-gray-500">
      <div class="flex items-center space-x-1">
        <template v-for="(item, index) in activeBreadcrumbs" :key="index">
          <router-link 
            v-if="item.path" 
            :to="item.path" 
            class="hover:text-blue-500"
          >
            {{ item.name }}
          </router-link>
          <span v-else class="text-gray-700">{{ item.name }}</span>
          <span v-if="index < activeBreadcrumbs.length - 1" class="mx-1">/</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

// 定义props，允许页面传入自定义面包屑
const props = defineProps({
  items: {
    type: Array as () => Array<{ name: string, path?: string }>,
    default: () => []
  }
})

// 获取当前路由
const route = useRoute()

// 路由映射表 - 用于自动生成面包屑
const routeNameMap: Record<string, { name: string, parent?: string }> = {
  'dashboard': { name: '控制台' },
  'dashboard-product': { name: '我的产品', parent: 'dashboard' },
  'dashboard-product-library': { name: '产品库', parent: 'dashboard-product' },
  'dashboard-product-libraryPage-order': { name: '立即下单', parent: 'dashboard-product-library' },
  'dashboard-product-tasks': { name: '刊登任务', parent: 'dashboard-product' },
  'dashboard-product-templates': { name: '设计模板', parent: 'dashboard-product' },
  'dashboard-order': { name: '订单中心', parent: 'dashboard' },
  'dashboard-finance': { name: '财务管理', parent: 'dashboard' },
  'dashboard-settings': { name: '系统设置', parent: 'dashboard' },
  'dashboard-account': { name: '账号管理', parent: 'dashboard' },
  'dashboard-account-verification': { name: '实名认证', parent: 'dashboard-account' }
}

// 特定页面的自定义映射
const customPathMap: Record<string, { items: { name: string, path?: string }[] }> = {
  '/dashboard/account/verification': {
    items: [
      { name: '账号管理', path: '/dashboard/account' },
      { name: '实名认证' }
    ]
  },
  '/dashboard/product/libraryPage/order': {
    items: [
      { name: '我的产品', path: '/dashboard/product' },
      { name: '产品库', path: '/dashboard/product/library' },
      { name: '立即下单' }
    ]
  }
}

// 根据路由自动生成面包屑
const autoBreadcrumbs = computed(() => {
  // 先检查是否有特定路径的自定义配置
  const path = route.path
  if (customPathMap[path]) {
    return customPathMap[path].items
  }
  
  // 否则根据路由名称自动生成
  const routeName = route.name as string
  const result: { name: string, path?: string }[] = []
  let currentRoute = routeName

  while (currentRoute && routeNameMap[currentRoute]) {
    const routeInfo = routeNameMap[currentRoute]
    result.unshift({
      name: routeInfo.name,
      path: currentRoute === routeName ? undefined : `/${currentRoute.replace(/-/g, '/')}`
    })
    currentRoute = routeInfo.parent || ''
  }

  return result
})

// 最终使用的面包屑，优先级：props传入 > 路由meta > 自动生成
const activeBreadcrumbs = computed(() => {
  // 1. 优先使用props传入的
  if (props.items.length > 0) {
    return props.items
  }
  
  // 2. 其次使用路由meta中的
  const routeMeta = route.meta?.breadcrumbs
  if (routeMeta && Array.isArray(routeMeta) && routeMeta.length > 0) {
    return routeMeta
  }
  
  // 3. 最后使用自动生成的
  return autoBreadcrumbs.value
})
</script> 