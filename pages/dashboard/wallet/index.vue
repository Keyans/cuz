<template>
    <div class="container mx-auto py-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">我的钱包</h1>
        <div class="flex space-x-4">
          <button class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            申请提现
          </button>
        </div>
      </div>
  
      <!-- 账户概览 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">账户余额</h3>
            <div class="p-2 bg-primary-light rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-primary">¥10,000.00</p>
          <p class="text-sm text-gray-500 mt-2">可提现金额</p>
        </div>
  
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">待结算</h3>
            <div class="p-2 bg-yellow-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-yellow-600">¥5,000.00</p>
          <p class="text-sm text-gray-500 mt-2">预计7天后可提现</p>
        </div>
  
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">累计收入</h3>
            <div class="p-2 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-green-600">¥50,000.00</p>
          <p class="text-sm text-gray-500 mt-2">近30天收入</p>
        </div>
      </div>
  
      <!-- 交易记录筛选 -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">交易类型</label>
            <select class="form-select">
              <option value="">全部类型</option>
              <option value="income">收入</option>
              <option value="withdraw">提现</option>
              <option value="refund">退款</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">时间范围</label>
            <select class="form-select">
              <option value="7">最近7天</option>
              <option value="30">最近30天</option>
              <option value="90">最近90天</option>
              <option value="custom">自定义</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">关键词</label>
            <input type="text" class="form-input" placeholder="输入订单号或交易说明" />
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
  
      <!-- 交易记录列表 -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                交易时间
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                交易说明
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                关联订单
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                收支金额
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="i in 5" :key="i">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2024-01-{{ i.toString().padStart(2, '0') }} 12:00:00
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ ['订单收入', '提现', '退款'][i % 3] }}</div>
                <div class="text-sm text-gray-500">交易流水号：TR2024{{ i }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ORD2024{{ i }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span :class="{
                  'text-green-600': i % 3 === 0,
                  'text-red-600': i % 3 !== 0
                }">
                  {{ i % 3 === 0 ? '+' : '-' }}¥{{ (299 * (i + 1)).toFixed(2) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  已完成
                </span>
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