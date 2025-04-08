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
        <p class="text-3xl font-bold text-primary">¥{{ amountInfo.undrawn }}</p>
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
        <p class="text-3xl font-bold text-yellow-600">
          ¥{{ amountInfo.uncompleted }}
        </p>
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
        <p class="text-3xl font-bold text-green-600">¥{{ amountInfo.total }}</p>
        <p class="text-sm text-gray-500 mt-2">近30天收入</p>
      </div>
    </div>

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
          <button class="btn-secondary w-full" @click="search">
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

      <div v-if="!data?.length" class="h-[200px] relative flex items-center">
        <div v-if="!data?.length" class="w-full text-center absolute left-0">
          暂无交易记录
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <Pagination v-model="pageConfig"></Pagination>
  </div>
</template>

<script setup lang="ts">
import { doGetShopBalance } from "~/apis/finance/overview";
import Pagination from "~/components/ui/pagination/Pagination.vue";
definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const amountInfo = ref({
  undrawn: "0",
  total: "0",
  uncompleted: "0",
});

onMounted(async () => {
  try {
    const { data } = await doGetShopBalance();
    if (data) {
      amountInfo.value.total = data.total;
      amountInfo.value.uncompleted = data.uncompleted;
      amountInfo.value.undrawn = data.undrawn;
    }
  } catch (error) {
    console.error(error);
  }
});

const pageConfig = ref({
  size: 10,
  current: 1,
  total: 0,
});

const columns = [
  {
    prop: "index",
    width: 80,
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

const data = ref<any[]>();

const search = () => {
  data.value = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    transactionAmount: "￥100.00",
    availableBalance: "￥123.22",
    frozenAmount: "￥100.00",
    transactionCurrency: "人民币",
    transactionId: "23787193892389183912831038",
    relatedOrder: "23787193892389183912831038",
    businessType: "订单支付",
    paymentType: "账户余额",
    paymentMethod: "账户余额",
    paymentStatus: "付款成功",
    thirdPartySerial: "7889898008",
    date: "2016-09-21  08:50:08",
  }));

  pageConfig.value.total = 30;
};

onMounted(() => {
  search();
});
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
