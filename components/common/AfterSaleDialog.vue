<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    
    <!-- 弹窗内容 -->
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="relative bg-white rounded-lg w-full max-w-2xl">
        <!-- 弹窗头部 -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-medium">申请售后</h3>
          <button @click="handleClose" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 进度条 -->
        <div class="p-6 border-b">
          <div class="flex justify-center items-center">
            <div class="flex items-center">
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">1</div>
                <span class="mt-2 text-sm text-blue-500">申请售后</span>
              </div>
              <div class="w-24 h-1 bg-gray-200">
                <div class="w-0 h-full bg-blue-500"></div>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">2</div>
                <span class="mt-2 text-sm text-gray-500">等待审核</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 表单内容 -->
        <div class="p-6">
          <div class="space-y-4">
            <!-- 订单号 -->
            <div class="flex items-center">
              <span class="text-sm text-gray-500 w-24">订单号：</span>
              <span class="text-sm">{{ orderNumber }}</span>
            </div>

            <!-- 售后类型 -->
            <div class="flex items-start">
              <span class="text-sm text-gray-500 w-24 mt-2">售后类型：</span>
              <div class="flex gap-4">
                <label class="flex items-center">
                  <input type="radio" v-model="form.type" value="refund" class="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500">
                  <span class="ml-2 text-sm">退款</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="form.type" value="compensation" class="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500">
                  <span class="ml-2 text-sm">赔付</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="form.type" value="resend" class="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500">
                  <span class="ml-2 text-sm">补发</span>
                </label>
              </div>
            </div>

            <!-- 申请原因 -->
            <div class="flex items-start">
              <span class="text-sm text-gray-500 w-24 mt-2">申请原因：</span>
              <textarea 
                v-model="form.reason"
                rows="4"
                class="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入"
              ></textarea>
            </div>

            <!-- 上传图片 -->
            <div class="flex items-start">
              <span class="text-sm text-gray-500 w-24 mt-2">申请图片：</span>
              <div class="flex flex-wrap gap-4">
                <div v-for="(image, index) in form.images" :key="index" class="relative w-24 h-24">
                  <img :src="image" class="w-full h-full object-cover rounded-md">
                  <button @click="removeImage(index)" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div 
                  v-if="form.images.length < 5"
                  class="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500"
                  @click="triggerImageUpload"
                >
                  <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <input 
                  type="file" 
                  ref="fileInput" 
                  class="hidden" 
                  accept="image/*"
                  @change="handleImageUpload"
                  multiple
                >
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
            确认
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
  orderNumber: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:show', 'submit'])

// 表单数据
const form = reactive({
  type: 'refund',
  reason: '',
  images: []
})

// 文件上传相关
const fileInput = ref(null)

const triggerImageUpload = () => {
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  const files = event.target.files
  if (!files.length) return

  // 处理图片上传，这里仅做演示，实际应该调用上传API
  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (form.images.length < 5) {
        form.images.push(e.target.result)
      }
    }
    reader.readAsDataURL(file)
  })
  
  // 清空input，允许重复选择同一文件
  event.target.value = ''
}

const removeImage = (index) => {
  form.images.splice(index, 1)
}

// 关闭弹窗
const handleClose = () => {
  emit('update:show', false)
}

// 提交表单
const handleSubmit = () => {
  if (!form.reason.trim()) {
    // 这里应该使用实际的toast组件
    alert('请填写申请原因')
    return
  }
  
  emit('submit', {
    orderNumber: props.orderNumber,
    ...form
  })
  handleClose()
}
</script> 