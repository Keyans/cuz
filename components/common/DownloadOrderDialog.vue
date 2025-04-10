<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    
    <!-- 弹窗内容 -->
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="relative bg-white rounded-lg w-full max-w-lg">
        <!-- 弹窗头部 -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-medium">下载订单</h3>
          <button @click="handleClose" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 表单内容 -->
        <div class="p-6">
          <div class="space-y-6">
            <!-- 下载方式 -->
            <div class="flex items-start">
              <span class="text-sm text-gray-500 mt-1 w-20 text-right mr-2 flex items-center justify-end">
                下载方式
                <span class="text-red-500 ml-0.5">*</span>
              </span>
              <div class="flex gap-6">
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    v-model="form.downloadType" 
                    value="time" 
                    class="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                  >
                  <span class="ml-2 text-sm">按时间下载</span>
                </label>
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    v-model="form.downloadType" 
                    value="orderNumber" 
                    class="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                  >
                  <span class="ml-2 text-sm">按订单号下载</span>
                </label>
              </div>
            </div>

            <!-- 动态表单内容区域 -->
            <div class="relative">
              <!-- 平台店铺选择（固定显示） -->
              <div class="flex items-start mb-6">
                <span class="text-sm text-gray-500 mt-2 w-20 text-right mr-2 flex items-center justify-end">
                  平台店铺
                  <span class="text-red-500 ml-0.5">*</span>
                </span>
                <div class="flex-1">
                  <select 
                    v-model="form.shop"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">请选择</option>
                    <option v-for="shop in shops" :key="shop.id" :value="shop.id">
                      {{ shop.name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- 动态内容区域 -->
              <div class="relative h-[60px]">
                <!-- 按时间下载 -->
                <div 
                  v-show="form.downloadType === 'time'" 
                  class="absolute inset-0 flex items-start transition-opacity duration-200"
                  :class="form.downloadType === 'time' ? 'opacity-100' : 'opacity-0'"
                >
                  <span class="text-sm text-gray-500 mt-2 w-20 text-right mr-2 flex items-center justify-end">
                    下单时间
                    <span class="text-red-500 ml-0.5">*</span>
                  </span>
                  <div class="flex-1 flex items-center space-x-2">
                    <input 
                      type="datetime-local" 
                      v-model="form.startTime"
                      class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                    <span class="text-gray-500">-</span>
                    <input 
                      type="datetime-local" 
                      v-model="form.endTime"
                      class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                  </div>
                </div>

                <!-- 按订单号下载 -->
                <div 
                  v-show="form.downloadType === 'orderNumber'" 
                  class="absolute inset-0 flex items-start transition-opacity duration-200"
                  :class="form.downloadType === 'orderNumber' ? 'opacity-100' : 'opacity-0'"
                >
                  <span class="text-sm text-gray-500 mt-2 w-20 text-right mr-2 flex items-center justify-end">
                    订单号
                    <span class="text-red-500 ml-0.5">*</span>
                  </span>
                  <div class="flex-1">
                    <input 
                      type="text" 
                      v-model="form.orderNumbers"
                      placeholder="支持多个订单号查询，用中英文逗号、斜杠、空格分隔"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="flex justify-end gap-4 p-4 border-t">
          <button 
            @click="handleClose"
            class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            取消
          </button>
          <button 
            @click="handleSubmit"
            class="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  shops: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:show', 'submit'])

// 表单数据
const form = reactive({
  downloadType: 'time', // 'time' 或 'orderNumber'
  shop: '',
  startTime: '',
  endTime: '',
  orderNumbers: ''
})

// 关闭弹窗
const handleClose = () => {
  emit('update:show', false)
  // 重置表单
  form.downloadType = 'time'
  form.shop = ''
  form.startTime = ''
  form.endTime = ''
  form.orderNumbers = ''
}

// 提交表单
const handleSubmit = () => {
  // 表单验证
  if (!form.shop) {
    alert('请选择平台店铺')
    return
  }

  if (form.downloadType === 'time') {
    if (!form.startTime || !form.endTime) {
      alert('请选择下单时间范围')
      return
    }
  } else {
    if (!form.orderNumbers.trim()) {
      alert('请输入订单号')
      return
    }
  }
  
  emit('submit', {
    ...form,
    orderNumbers: form.orderNumbers.split(/[,，\/\s]+/).filter(Boolean) // 将订单号字符串转换为数组
  })
  handleClose()
}
</script>

<style scoped>
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style> 