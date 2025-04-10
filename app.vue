<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator color="#afe468" :height="3" />
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <Toast />
    </ClientOnly>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Toast from '~/components/Toast.vue'

export default defineComponent({
  components: {
    Toast
  },
  setup() {
    // SEO优化相关信息已在nuxt.config.ts中配置
  }
})
</script>

<style>
/* Global styles that are not handled by Tailwind */
body {
  scroll-behavior: smooth;
}

/* 添加一些基础CSS变量和设置 */
:root {
  --color-primary: #303018;
  --color-secondary: #afe468;
  --color-background: #f5f5ee;
  --color-accent: #8ed9ec;
}

/* 添加页面过渡效果 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 为SPA添加视觉反馈 */
.nuxt-loading-indicator {
  background-color: var(--color-secondary);
}
.el-table th {
  @apply text-xs font-medium !text-gray-500 !bg-gray-50  uppercase tracking-wider;
}
</style>
