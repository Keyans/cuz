<template>
  <div class="container mx-auto py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">产品库</h1>
      <div class="flex space-x-4">
        <button class="btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          导入产品
        </button>
        <button class="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          新增产品
        </button>
      </div>
    </div>

    <!-- 筛选器 -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">产品状态</label>
          <select class="form-select">
            <option value="">全部状态</option>
            <option value="active">在售</option>
            <option value="inactive">下架</option>
            <option value="draft">草稿</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">产品分类</label>
          <select class="form-select">
            <option value="">全部分类</option>
            <option value="clothing">服装</option>
            <option value="accessories">配饰</option>
            <option value="home">家居</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">关键词</label>
          <input type="text" class="form-input" placeholder="输入产品名称或SKU" />
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

    <!-- 产品列表 -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              产品信息
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              价格
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              库存
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
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <img class="h-10 w-10 rounded-md" src="https://via.placeholder.com/100" alt="" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">示例产品名称</div>
                  <div class="text-sm text-gray-500">创建时间：2024-01-01</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              SKU123456
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ¥199.00
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              999
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                在售
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex space-x-2">
                <button class="text-primary hover:text-primary-dark">编辑</button>
                <button class="text-gray-600 hover:text-gray-900">下架</button>
                <button class="text-red-600 hover:text-red-900">删除</button>
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