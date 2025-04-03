<template>
    <div class="container mx-auto py-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">刊登模板</h1>
        <div class="flex space-x-4">
          <button class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            新建模板
          </button>
        </div>
      </div>
  
      <!-- 筛选器 -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">平台类型</label>
            <select class="form-select">
              <option value="">全部平台</option>
              <option value="amazon">亚马逊</option>
              <option value="ebay">eBay</option>
              <option value="shopify">Shopify</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">模板类型</label>
            <select class="form-select">
              <option value="">全部类型</option>
              <option value="product">产品模板</option>
              <option value="category">类目模板</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">关键词</label>
            <input type="text" class="form-input" placeholder="输入模板名称" />
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
  
      <!-- 模板列表 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">通用产品模板</h3>
              <span class="px-2 py-1 text-xs font-semibold rounded-full" :class="i % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                {{ i % 2 === 0 ? '已启用' : '已停用' }}
              </span>
            </div>
            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">平台类型</span>
                <span class="text-gray-900">亚马逊</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">模板类型</span>
                <span class="text-gray-900">产品模板</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">更新时间</span>
                <span class="text-gray-900">2024-01-01</span>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="btn-outline flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                编辑
              </button>
              <button class="btn-outline flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                复制
              </button>
              <button class="btn-outline flex-1 text-red-600 hover:text-red-700 hover:border-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                删除
              </button>
            </div>
          </div>
        </div>
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