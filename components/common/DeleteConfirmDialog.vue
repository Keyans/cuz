<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    
    <!-- 弹窗内容 -->
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="relative bg-white rounded-lg w-full max-w-md">
        <!-- 弹窗头部 -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-medium">删除</h3>
          <button @click="handleClose" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 弹窗内容 -->
        <div class="p-6">
          <p class="text-gray-600">删除后无法恢复，请谨慎操作。</p>
        </div>

        <!-- 底部按钮 -->
        <div class="flex justify-end gap-4 p-4 border-t">
          <button 
            @click="handleClose"
            class="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            取消
          </button>
          <button 
            @click="handleConfirm"
            class="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show', 'confirm'])

const handleClose = () => {
  emit('update:show', false)
}

const handleConfirm = () => {
  emit('confirm')
  handleClose()
}
</script> 