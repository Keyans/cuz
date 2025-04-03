<template>
  <div class="container mx-auto py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">订单中心</h1>
      <div class="flex space-x-4">
        <button class="btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          导出订单
        </button>
      </div>
    </div>

    <!-- 订单统计 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">待发货</p>
            <p class="text-2xl font-bold text-primary mt-1">10</p>
          </div>
          <div class="p-3 bg-primary-light rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">待付款</p>
            <p class="text-2xl font-bold text-yellow-600 mt-1">5</p>
          </div>
          <div class="p-3 bg-yellow-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">退款中</p>
            <p class="text-2xl font-bold text-red-600 mt-1">2</p>
          </div>
          <div class="p-3 bg-red-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">已完成</p>
            <p class="text-2xl font-bold text-green-600 mt-1">128</p>
          </div>
          <div class="p-3 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 筛选器 -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">订单状态</label>
          <select class="form-select">
            <option value="">全部状态</option>
            <option value="pending">待付款</option>
            <option value="paid">待发货</option>
            <option value="shipped">已发货</option>
            <option value="completed">已完成</option>
            <option value="refunding">退款中</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">下单时间</label>
          <input type="date" class="form-input" />
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">订单号/买家</label>
          <input type="text" class="form-input" placeholder="输入订单号或买家信息" />
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

    <!-- 订单列表 -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              订单信息
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              买家信息
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              金额
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              订单状态
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
                  <div class="text-sm font-medium text-gray-900">订单号：ORD2024{{ i }}</div>
                  <div class="text-sm text-gray-500">下单时间：2024-01-01 12:00:00</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900">买家名称</div>
              <div class="text-sm text-gray-500">buyer@example.com</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">¥299.00</div>
              <div class="text-xs text-gray-500">含运费：¥10.00</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                已付款
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex space-x-2">
                <button class="text-primary hover:text-primary-dark">详情</button>
                <button class="text-gray-600 hover:text-gray-900">发货</button>
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