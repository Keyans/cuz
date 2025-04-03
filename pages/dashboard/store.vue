<template>
    <div class="container mx-auto py-6">
      <h1 class="text-2xl font-bold mb-6">我的店铺</h1>
      
      <!-- 店铺概览卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">店铺状态</h3>
          <p class="text-3xl font-bold text-primary">正常运营</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">今日订单</h3>
          <p class="text-3xl font-bold text-primary">0</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">店铺评分</h3>
          <p class="text-3xl font-bold text-primary">5.0</p>
        </div>
      </div>
  
      <!-- 功能模块导航 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <NuxtLink
          v-for="module in modules"
          :key="module.path"
          :to="module.path"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">{{ module.name }}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p class="text-gray-600">{{ module.description }}</p>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
      definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
    })
  const modules = [
    {
      name: '选品中心',
      path: '/dashboard/store/sourcing',
      description: '浏览和选择优质商品，丰富店铺产品线'
    },
    {
      name: '产品库',
      path: '/dashboard/store/products',
      description: '管理店铺所有产品，设置产品详情'
    },
    {
      name: '刊登任务',
      path: '/dashboard/store/listings',
      description: '创建和管理产品刊登任务'
    },
    {
      name: '刊登模板',
      path: '/dashboard/store/templates',
      description: '管理产品刊登模板，提高刊登效率'
    },
    {
      name: '订单中心',
      path: '/dashboard/store/orders',
      description: '查看和处理所有订单信息'
    },
    {
      name: '售后管理',
      path: '/dashboard/store/after-sales',
      description: '处理退换货和客户服务请求'
    },
    {
      name: '我的钱包',
      path: '/dashboard/store/wallet',
      description: '管理店铺资金和收支明细'
    },
    {
      name: '基本信息',
      path: '/dashboard/store/settings',
      description: '设置和管理店铺基本信息'
    }
  ]
  </script>