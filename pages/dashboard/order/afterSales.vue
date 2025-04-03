<template>
    <div class="container mx-auto py-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">售后管理</h1>
      </div>
  
      <!-- 售后统计 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">待处理</p>
              <p class="text-2xl font-bold text-primary mt-1">5</p>
            </div>
            <div class="p-3 bg-primary-light rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">处理中</p>
              <p class="text-2xl font-bold text-yellow-600 mt-1">3</p>
            </div>
            <div class="p-3 bg-yellow-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">已完成</p>
              <p class="text-2xl font-bold text-green-600 mt-1">28</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">已拒绝</p>
              <p class="text-2xl font-bold text-red-600 mt-1">2</p>
            </div>
            <div class="p-3 bg-red-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 筛选器 -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">售后类型</label>
            <select class="form-select">
              <option value="">全部类型</option>
              <option value="refund">退款</option>
              <option value="return">退货</option>
              <option value="exchange">换货</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">处理状态</label>
            <select class="form-select">
              <option value="">全部状态</option>
              <option value="pending">待处理</option>
              <option value="processing">处理中</option>
              <option value="completed">已完成</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">申请时间</label>
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
  
      <!-- 售后列表 -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                售后信息
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单信息
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                退款金额
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
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
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-md" src="https://via.placeholder.com/100" alt="" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">售后编号：AS2024{{ i }}</div>
                    <div class="text-sm text-gray-500">申请时间：2024-01-01 12:00:00</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">订单号：ORD2024{{ i }}</div>
                <div class="text-sm text-gray-500">买家：buyer@example.com</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">¥299.00</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                  'bg-yellow-100 text-yellow-800': i % 3 === 0,
                  'bg-green-100 text-green-800': i % 3 === 1,
                  'bg-red-100 text-red-800': i % 3 === 2
                }">
                  {{ ['处理中', '已完成', '已拒绝'][i % 3] }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                  <button class="text-primary hover:text-primary-dark">详情</button>
                  <button class="text-gray-600 hover:text-gray-900">处理</button>
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
      definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
    })
  // 组件逻辑
  </script>
  
  <style scoped>
 
  </style>