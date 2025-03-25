<template>
  <div ref="lazyLoadRef">
    <div v-if="isVisible">
      <slot></slot>
    </div>
    <div v-else class="min-h-[100px] skeleton-loading">
      <slot name="placeholder">
        <div class="animate-pulse flex flex-col space-y-4 h-full">
          <div class="h-4 bg-gray-200 rounded-md w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded-md w-1/2"></div>
          <div class="h-4 bg-gray-200 rounded-md w-5/6"></div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lazyLoadRef = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  // 检测浏览器是否支持Intersection Observer API
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      const [entry] = entries
      isVisible.value = entry.isIntersecting

      // 如果元素可见，则停止观察
      if (entry.isIntersecting && observer) {
        observer.disconnect()
      }
    }, {
      // 元素出现在视口的40%时加载
      threshold: 0.1,
      rootMargin: '0px 0px 100px 0px' // 在元素接近视口100px时提前加载
    })

    if (lazyLoadRef.value) {
      observer.observe(lazyLoadRef.value)
    }
  } else {
    // 降级处理：如果浏览器不支持Intersection Observer，则直接显示内容
    isVisible.value = true
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.skeleton-loading {
  position: relative;
  overflow: hidden;
}

.skeleton-loading::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
