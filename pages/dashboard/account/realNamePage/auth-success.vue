<template>
  <div class="container mx-auto py-6 px-4">
    <!-- 使用面包屑组件 -->
    <Breadcrumb :items="breadcrumbItems" />

    <div class="flex flex-col items-center justify-center py-12">
      <!-- 成功图标 -->
      <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <!-- 成功提示文本 -->
      <h2 class="text-2xl font-medium text-gray-900 mb-4">申请认证提交成功！</h2>
      <p class="text-gray-600 text-center">平台会在1～3个工作日内审核，请耐心等待～</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Breadcrumb from '~/components/common/Breadcrumb.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

// 面包屑数据
const breadcrumbItems = [
  { title: '账号', path: '/dashboard/account' },
  { title: '实名认证', path: '/dashboard/account/realName' },
  { title: '认证结果' }
];
</script>

<style scoped>
/* 移动端优化 */
@media (max-width: 768px) {
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style> 