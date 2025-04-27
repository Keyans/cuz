<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <!-- 弹窗标题和关闭按钮 -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">确认收货</h2>
        <button @click="handleCancel" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 确认内容 -->
      <div class="mb-8 text-center text-lg">
        是否确认收货?
      </div>

      <!-- 底部按钮 -->
      <div class="flex justify-center space-x-4">
        <button 
          @click="handleCancel" 
          class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 min-w-[100px]"
        >
          取消
        </button>
        <button 
          @click="handleConfirm" 
          class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 min-w-[100px]"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  afterSaleId: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'confirm']);

// 取消
const handleCancel = () => {
  emit('close');
};

// 确认
const handleConfirm = () => {
  emit('confirm', props.afterSaleId);
  emit('close');
};
</script>

<style scoped>
/* 添加弹窗动画效果 */
.fixed {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 