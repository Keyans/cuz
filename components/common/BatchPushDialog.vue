<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    
    <!-- 弹窗内容 -->
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="relative bg-white rounded-lg w-full max-w-2xl">
        <!-- 弹窗头部 -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-medium">批量推送</h3>
          <button @click="handleClose" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 表格内容 -->
        <div class="p-6">
          <div class="bg-gray-50 rounded-lg">
            <!-- 表头 -->
            <div class="grid grid-cols-3 text-sm font-medium text-gray-500 p-4 border-b">
              <div>订单号</div>
              <div>推送进度</div>
              <div>推送结果</div>
            </div>

            <!-- 表格内容 -->
            <div class="divide-y">
              <div v-for="item in pushList" :key="item.orderNumber" class="grid grid-cols-3 text-sm p-4 items-center">
                <div class="text-gray-900">{{ item.orderNumber }}</div>
                <div class="pr-4">
                  <div class="relative">
                    <div class="h-2 bg-gray-200 rounded-full">
                      <div 
                        class="h-2 rounded-full transition-all duration-300"
                        :class="getProgressBarColor(item.status)"
                        :style="{ width: item.progress + '%' }"
                      ></div>
                    </div>
                    <span v-if="item.status === 'processing'" class="absolute right-0 top-[-4px] text-gray-500">
                      {{ item.progress }}%
                    </span>
                  </div>
                </div>
                <div class="flex items-center">
                  <!-- 成功状态 -->
                  <template v-if="item.status === 'success'">
                    <svg class="w-5 h-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-900">推送成功</span>
                  </template>
                  <!-- 处理中状态 -->
                  <span v-else-if="item.status === 'processing'" class="text-gray-500">
                    处理中...
                  </span>
                  <!-- 失败状态 -->
                  <template v-else-if="item.status === 'failed'">
                    <svg class="w-5 h-5 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span class="text-red-500">推送失败！余额不足，请充值！</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="flex justify-end gap-4 p-4 border-t">
          <button 
            v-if="!isAllCompleted"
            @click="handleStop"
            class="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            停止推送
          </button>
          <button 
            v-else
            @click="handleClose"
            class="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show', 'stop'])

// 推送列表数据
const pushList = ref([
  {
    orderNumber: 'XS345345456565',
    progress: 100,
    status: 'success' // 'success' | 'processing' | 'failed'
  },
  {
    orderNumber: 'XS345345456565',
    progress: 40,
    status: 'processing'
  },
  {
    orderNumber: 'XS345345456565',
    progress: 30,
    status: 'failed'
  },
  {
    orderNumber: 'XS345345456565',
    progress: 30,
    status: 'failed'
  }
])

// 判断是否全部完成
const isAllCompleted = computed(() => {
  return pushList.value.every(item => 
    item.status === 'success' || item.status === 'failed'
  )
})

// 获取进度条颜色
const getProgressBarColor = (status) => {
  switch (status) {
    case 'success':
      return 'bg-green-500'
    case 'processing':
      return 'bg-blue-500'
    case 'failed':
      return 'bg-red-500'
    default:
      return 'bg-gray-200'
  }
}

// 关闭弹窗
const handleClose = () => {
  emit('update:show', false)
}

// 停止推送
const handleStop = () => {
  emit('stop')
}
</script> 