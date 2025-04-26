<template>
  <div class="container mx-auto py-8 px-4">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- 左侧导航 -->
      <div class="w-full md:w-64 flex-shrink-0">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <NuxtLink to="/agreement" class="block p-4 hover:bg-gray-50 transition-colors" :class="{ 'text-primary border-l-4 border-primary bg-blue-50': currentPage === 'agreement' }">
            服务条款
          </NuxtLink>
          <NuxtLink to="/privacy" class="block p-4 hover:bg-gray-50 transition-colors" :class="{ 'text-primary border-l-4 border-primary bg-blue-50': currentPage === 'privacy' }">
            隐私政策
          </NuxtLink>
          <NuxtLink to="/legal" class="block p-4 hover:bg-gray-50 transition-colors" :class="{ 'text-primary border-l-4 border-primary bg-blue-50': currentPage === 'legal' }">
            法律声明
          </NuxtLink>
          <NuxtLink to="/agency" class="block p-4 hover:bg-gray-50 transition-colors" :class="{ 'text-primary border-l-4 border-primary bg-blue-50': currentPage === 'agency' }">
            委托代理协议
          </NuxtLink>
          <NuxtLink to="/ip-policy" class="block p-4 hover:bg-gray-50 transition-colors" :class="{ 'text-primary border-l-4 border-primary bg-blue-50': currentPage === 'ip-policy' }">
            知识产权保护政策
          </NuxtLink>
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="flex-1">
        <div class="bg-white rounded-lg shadow p-6">
          <h1 class="text-2xl font-bold text-center mb-6">{{ title }}</h1>
          <p class="text-right text-gray-500 mb-6">更新日期: {{ updateDate }}</p>

          <div class="prose max-w-none">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  updateDate: {
    type: String,
    default: '2021年11月1日'
  },
  currentPage: {
    type: String,
    required: true
  }
});
</script> 