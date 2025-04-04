<template>
  <div class="container mx-auto py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">我的钱包</h1>
      <div class="flex space-x-4">
        <button class="btn-primary">
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          申请提现
        </button>
      </div>
    </div>

    <!-- 账户概览 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">账户余额</h3>
          <div class="p-2 bg-primary-light rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-primary">¥10,000.00</p>
        <p class="text-sm text-gray-500 mt-2">可提现金额</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">待结算</h3>
          <div class="p-2 bg-yellow-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-yellow-600">¥5,000.00</p>
        <p class="text-sm text-gray-500 mt-2">预计7天后可提现</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">累计收入</h3>
          <div class="p-2 bg-green-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-green-600">¥50,000.00</p>
        <p class="text-sm text-gray-500 mt-2">近30天收入</p>
      </div>
    </div>

    <Search></Search>

    <!-- 交易记录列表 -->
    <div class="bg-white rounded-lg shadow w-full overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="wallet-table"
              v-for="(item, index) in columns"
              :key="index"
              :style="{ minWidth: item.width + 'px' }"
            >
              {{ item.label }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in data" :key="item.id">
            <td
              v-for="iitem in columns"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
              <span v-if="iitem.prop === 'index'">{{ +index + 1 }}</span>
              {{ item[iitem.prop] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="flex justify-between items-center mt-6">
      <div class="text-sm text-gray-700">显示 1 到 10 条，共 50 条</div>
      <nav class="flex space-x-2">
        <button class="px-3 py-1 rounded border hover:bg-gray-100">&lt;</button>
        <button class="px-3 py-1 rounded border bg-primary text-white">
          1
        </button>
        <button class="px-3 py-1 rounded border hover:bg-gray-100">2</button>
        <button class="px-3 py-1 rounded border hover:bg-gray-100">3</button>
        <button class="px-3 py-1 rounded border hover:bg-gray-100">&gt;</button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from "./components/search.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});
// 组件逻辑

const columns = [
  {
    prop: "index",
    width: 200,
    label: "序号",
  },
  {
    prop: "transactionAmount",
    width: 200,
    label: "交易金额",
  },
  {
    prop: "availableBalance",
    width: 200,
    label: "可用余额",
  },
  {
    prop: "frozenAmount",
    width: 200,
    label: "冻结金额",
  },
  {
    prop: "transactionCurrency",
    width: 200,
    label: "交易币种",
  },
  {
    prop: "transactionId",
    width: 200,
    label: "交易编号",
  },
  {
    prop: "relatedOrder",
    width: 200,
    label: "关联订单",
  },
  {
    prop: "businessType",
    width: 200,
    label: "业务类型",
  },
  {
    prop: "paymentType",
    width: 200,
    label: "支付类型",
  },
  {
    prop: "paymentMethod",
    width: 200,
    label: "支付方式",
  },
  {
    prop: "paymentStatus",
    width: 200,
    label: "付款状态",
  },
  {
    prop: "thirdPartySerial",
    width: 200,
    label: "第三方支付流水号",
  },
  {
    prop: "date",
    width: 200,
    label: "日期",
  },
];

const data = ref([
  {
    id: "1",
    transactionAmount: "123",
    availableBalance: "123",
    frozenAmount: "123",
    transactionCurrency: "123",
    transactionId: "123",
    relatedOrder: "123",
    businessType: "123",
    paymentType: "123",
    paymentMethod: "123",
    paymentStatus: "123",
    thirdPartySerial: "123",
    date: "123",
  },
]);
</script>

<style scoped>
th {
  white-space: nowrap;
  min-width: 200px;
}
.wallet-table {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}
</style>
