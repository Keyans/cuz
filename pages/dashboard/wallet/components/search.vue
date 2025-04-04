<template>
  <!-- 交易记录筛选 -->
  <div class="bg-white rounded-lg shadow p-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="flex flex-col">
        <label class="text-sm text-gray-600 mb-1">交易编号</label>
        <input type="text" class="form-input" placeholder="请输入" />
      </div>

      <div class="flex flex-col">
        <label class="text-sm text-gray-600 mb-1">交易类型</label>
        <select class="form-select">
          <option value="">全部类型</option>
          <option value="income">收入</option>
          <option value="withdraw">提现</option>
          <option value="refund">退款</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label class="text-sm text-gray-600 mb-1">时间范围</label>
        <select class="form-select">
          <option value="7">最近7天</option>
          <option value="30">最近30天</option>
          <option value="90">最近90天</option>
          <option value="custom">自定义</option>
        </select>
      </div>

      <div class="flex flex-col justify-end">
        <button class="btn-secondary w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          搜索
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 生命周期钩子
onMounted(() => {
  console.log("Component mounted");
});
</script>

<style scoped>
/* 样式 */
</style>
