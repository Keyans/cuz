<template>
    <div class="container mx-auto py-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">选品中心</h1>
        <div class="flex space-x-4">
          <button class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            添加商品
          </button>
        </div>
      </div>
  
      <!-- 筛选器 -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">商品分类</label>
            <select class="form-select">
              <option value="">全部分类</option>
              <option value="clothing">服装</option>
              <option value="accessories">配饰</option>
              <option value="home">家居</option>
            </select>
          </div>
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
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
          <div class="aspect-w-1 aspect-h-1 bg-gray-200">
            <img src="https://via.placeholder.com/300" alt="Product image" class="object-cover" />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2 line-clamp-2">商品名称示例</h3>
            <div class="flex justify-between items-center mb-2">
              <span class="text-primary font-bold">¥ 199.00</span>
              <span class="text-sm text-gray-500">销量: 100</span>
            </div>
            <div class="flex space-x-2">
              <button class="btn-primary flex-1">选品</button>
              <button class="btn-outline flex-1">详情</button>
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