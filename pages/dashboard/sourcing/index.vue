<template>
    <div class="container mx-auto py-6 px-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">选品中心</h1>
        <div class="flex space-x-4">
          <button class="btn-primary text-sm md:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            添加商品
          </button>
        </div>
      </div>

      <!-- 分类标签栏 -->
      <div class="overflow-x-auto mb-6 -mx-4 px-4">
        <div class="flex space-x-2 whitespace-nowrap">
          <button class="px-4 py-2 rounded-full bg-primary text-white text-sm">全部</button>
          <button class="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">服装</button>
          <button class="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">配饰</button>
          <button class="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">家居</button>
          <button class="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">数码</button>
          <button class="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">美妆</button>
        </div>
      </div>
  
      <!-- 筛选器 -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">价格区间</label>
            <div class="flex space-x-2">
              <input type="number" class="form-input w-1/2" placeholder="最低价" />
              <input type="number" class="form-input w-1/2" placeholder="最高价" />
            </div>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">排序方式</label>
            <select class="form-select">
              <option value="popular">综合排序</option>
              <option value="newest">最新上架</option>
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
            </select>
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
  
      <!-- 商品列表 -->
      <div class="space-y-4">
        <div v-for="i in 8" :key="i" class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
          <div class="flex flex-col md:flex-row">
            <div class="w-full md:w-48 h-48 md:h-auto relative">
              <img src="https://via.placeholder.com/300" alt="Product image" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 p-4">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold mb-2 line-clamp-2">商品名称示例</h3>
                  <p class="text-gray-500 text-sm mb-2">商品描述信息，包含商品的主要特点和卖点...</p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span>类别: 服装</span>
                    <span>销量: 100</span>
                    <span>好评率: 98%</span>
                  </div>
                </div>
                <div class="mt-4 md:mt-0 md:ml-6 flex flex-col items-end justify-between h-full">
                  <div class="text-right mb-4">
                    <div class="text-primary font-bold text-xl">¥ 199.00</div>
                    <div class="text-gray-500 text-sm">库存: 999</div>
                  </div>
                  <div class="flex space-x-2 w-full md:w-auto">
                    <button class="btn-primary px-6 py-2 text-sm">选品</button>
                    <button class="btn-outline px-6 py-2 text-sm">详情</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 分页 -->
      <div class="flex justify-center mt-8">
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