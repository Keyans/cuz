<template>
    <div class="container mx-auto py-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">刊登任务</h1>
        <div class="flex space-x-4">
          <button class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            新建刊登
          </button>
        </div>
      </div>
  
      <!-- 筛选器 -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">任务状态</label>
            <select class="form-select">
              <option value="">全部状态</option>
              <option value="pending">待处理</option>
              <option value="processing">处理中</option>
              <option value="completed">已完成</option>
              <option value="failed">失败</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">目标平台</label>
            <select class="form-select">
              <option value="">全部平台</option>
              <option value="amazon">亚马逊</option>
              <option value="ebay">eBay</option>
              <option value="shopify">Shopify</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">创建时间</label>
            <input type="date" class="form-input" />
          </div>
          <div class="flex flex-col justify-end">
            <button class="btn-secondary w-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              搜索
            </button>
          </div>
        </div>
      </div>
  
      <!-- 任务列表 -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                任务信息
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                目标平台
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                产品数量
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                创建时间
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="i in 5" :key="i">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">批量刊登任务</div>
                    <div class="text-sm text-gray-500">任务ID: TASK2024{{ i }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img src="https://via.placeholder.com/20" alt="platform" class="h-5 w-5 rounded-full" />
                  <span class="ml-2 text-sm text-gray-900">亚马逊</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                10
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  处理中
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2024-01-01 12:00:00
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                  <button class="text-primary hover:text-primary-dark">查看</button>
                  <button class="text-red-600 hover:text-red-900">取消</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- 分页 -->
      <div class="flex justify-between items-center mt-6">
        <div class="text-sm text-gray-700">
          显示 1 到 10 条，共 50 条
        </div>
        <nav class="flex space-x-2">
          <button class="px-3 py-1 rounded border hover:bg-gray-100">&lt;</button>
          <button class="px-3 py-1 rounded border bg-primary text-white">1</button>
          <button class="px-3 py-1 rounded border hover:bg-gray-100">2</button>
          <button class="px-3 py-1 rounded border hover:bg-gray-100">3</button>
          <button class="px-3 py-1 rounded border hover:bg-gray-100">&gt;</button>
        </nav>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // 组件逻辑
  definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
    })
  </script>
  
  <style scoped>
  
  </style>