<template>
  <div class="flex justify-between items-center mt-6">
    <div class="text-sm text-gray-700">
      显示 {{ start }} 到 {{ end }} 条，共 {{ pageConfig.total }} 条
    </div>
    <nav class="flex space-x-2">
      <!-- 上一页按钮 -->
      <button
        :class="[
          'px-3 py-1 rounded border hover:bg-gray-100',
          pageConfig.current === 1 ? 'bg-gray-100' : '',
        ]"
        :disabled="pageConfig.current === 1"
        @click="goToPage(pageConfig.current - 1)"
      >
        &lt;
      </button>

      <!-- 当前页前一页 -->
      <button
        v-if="pageConfig.current > 1"
        class="px-3 py-1 rounded border hover:bg-gray-100"
        @click="goToPage(pageConfig.current - 1)"
      >
        {{ pageConfig.current - 1 }}
      </button>

      <!-- 当前页 -->
      <button
        class="px-3 py-1 rounded border bg-primary text-white"
        :class="{
          'bg-primary text-white': true,
          'bg-gray-100': pageConfig.current === pageConfig.current,
        }"
      >
        {{ pageConfig.current }}
      </button>

      <!-- 当前页后一页 -->
      <button
        v-if="pageConfig.current * pageConfig.size < pageConfig.total"
        class="px-3 py-1 rounded border hover:bg-gray-100"
        @click="goToPage(pageConfig.current + 1)"
      >
        {{ pageConfig.current + 1 }}
      </button>

      <!-- 下一页按钮 -->
      <button
        :class="[
          'px-3 py-1 rounded border hover:bg-gray-100',
          pageConfig.current * pageConfig.size >= pageConfig.total
            ? 'bg-gray-100'
            : '',
        ]"
        :disabled="
          pageConfig.current * pageConfig.size >= pageConfig.total ||
          !pageConfig.total
        "
        @click="goToPage(pageConfig.current + 1)"
      >
        &gt;
      </button>
    </nav>
  </div>
</template>

<script lang="ts" setup>
interface Pagination {
  current: number;
  total: number;
  size: number;
}
const pageConfig = defineModel<Pagination>({ required: true });

// 计算分页显示的开始和结束条数
const start = computed(
  () => (pageConfig.value.current - 1) * pageConfig.value.size + 1
);
const end = computed(() => {
  const end = pageConfig.value.current * pageConfig.value.size;
  return end > pageConfig.value.total ? pageConfig.value.total : end;
});

// 跳转到指定页面
const goToPage = (page: number) => {
  if (page >= 1 && page <= pageConfig.value.total) {
    pageConfig.value.current = page;
  }
};
</script>

<style scoped>
/* 样式 */
</style>
