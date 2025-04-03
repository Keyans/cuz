<template>
    <div class="container mx-auto py-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">基本信息</h1>
        <div class="flex space-x-4">
          <button class="btn-primary">
            保存更改
          </button>
        </div>
      </div>
  
      <div class="grid grid-cols-1 gap-6">
        <!-- 店铺基本信息 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="p-6">
            <h2 class="text-lg font-semibold mb-4">店铺信息</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    店铺名称
                  </label>
                  <input type="text" class="form-input" placeholder="输入店铺名称" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    店铺简介
                  </label>
                  <textarea class="form-textarea" rows="3" placeholder="输入店铺简介"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    联系电话
                  </label>
                  <input type="tel" class="form-input" placeholder="输入联系电话" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    联系邮箱
                  </label>
                  <input type="email" class="form-input" placeholder="输入联系邮箱" />
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    店铺Logo
                  </label>
                  <div class="mt-1 flex items-center">
                    <span class="inline-block h-24 w-24 rounded-lg overflow-hidden bg-gray-100">
                      <img src="https://via.placeholder.com/200" alt="Store logo" class="h-full w-full object-cover" />
                    </span>
                    <button class="ml-5 btn-outline">
                      更改
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    店铺地址
                  </label>
                  <input type="text" class="form-input mb-2" placeholder="省/市/区" />
                  <input type="text" class="form-input" placeholder="详细地址" />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 支付设置 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="p-6">
            <h2 class="text-lg font-semibold mb-4">支付设置</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div class="flex items-center">
                  <img src="https://via.placeholder.com/40" alt="Payment" class="h-10 w-10 rounded" />
                  <div class="ml-4">
                    <h3 class="text-sm font-medium text-gray-900">支付宝商家</h3>
                    <p class="text-sm text-gray-500">支持支付宝付款</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <button class="btn-outline mr-2">设置</button>
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div class="flex items-center">
                  <img src="https://via.placeholder.com/40" alt="Payment" class="h-10 w-10 rounded" />
                  <div class="ml-4">
                    <h3 class="text-sm font-medium text-gray-900">微信支付</h3>
                    <p class="text-sm text-gray-500">支持微信付款</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <button class="btn-outline mr-2">设置</button>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 物流设置 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="p-6">
            <h2 class="text-lg font-semibold mb-4">物流设置</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    默认物流公司
                  </label>
                  <select class="form-select">
                    <option value="">请选择物流公司</option>
                    <option value="sf">顺丰速运</option>
                    <option value="zt">中通快递</option>
                    <option value="yd">韵达快递</option>
                    <option value="ems">EMS</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    发货时间
                  </label>
                  <select class="form-select">
                    <option value="24">24小时内</option>
                    <option value="48">48小时内</option>
                    <option value="72">72小时内</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  运费模板
                </label>
                <div class="border rounded-lg divide-y">
                  <div class="p-4 flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">默认运费模板</h4>
                      <p class="text-sm text-gray-500">适用于全国范围</p>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button class="btn-outline">编辑</button>
                      <button class="text-red-600 hover:text-red-700">删除</button>
                    </div>
                  </div>
                  <div class="p-4">
                    <button class="btn-outline w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      添加运费模板
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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