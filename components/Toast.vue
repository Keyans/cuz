<template>
  <div class="fixed top-4 right-4 z-50">
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id"
           class="mb-2 p-4 rounded-lg shadow-lg transform transition-all duration-300"
           :class="{
             'bg-green-500': toast.type === 'success',
             'bg-red-500': toast.type === 'error',
             'bg-yellow-500': toast.type === 'warning',
             'bg-blue-500': toast.type === 'info',
           }"
           v-show="toast.show">
        <div class="flex items-center text-white">
          <span class="mr-2">
            <!-- Success Icon -->
            <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <!-- Error Icon -->
            <svg v-if="toast.type === 'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <!-- Warning Icon -->
            <svg v-if="toast.type === 'warning'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <!-- Info Icon -->
            <svg v-if="toast.type === 'info'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span class="text-sm">{{ toast.message }}</span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { ref } from 'vue'

// 创建一个全局共享的toasts数组
const toasts = ref([])

// 导出到全局的Toast功能
export function useCustomToast() {
  let id = 0

  const show = (options) => {
    const toast = {
      id: ++id,
      message: options.message,
      type: options.type || 'info',
      show: true
    }

    toasts.value.push(toast)

    setTimeout(() => {
      toast.show = false
      setTimeout(() => {
        const index = toasts.value.findIndex(t => t.id === toast.id)
        if (index > -1) {
          toasts.value.splice(index, 1)
        }
      }, 300)
    }, options.duration || 3000)
  }

  const success = (message, duration) => {
    show({ message, type: 'success', duration })
  }

  const error = (message, duration) => {
    show({ message, type: 'error', duration })
  }

  const warning = (message, duration) => {
    show({ message, type: 'warning', duration })
  }

  const info = (message, duration) => {
    show({ message, type: 'info', duration })
  }

  return {
    toast: {
      show,
      success,
      error,
      warning,
      info
    }
  }
}

// 组件定义
export default {
  name: 'Toast',
  setup() {
    return {
      toasts
    }
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 