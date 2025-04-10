<template>
  <div class="container mx-auto py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">费用中心</h1>
    </div>

    <!-- 账户概览 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">可用余额</h3>
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
        <div class="flex w-full justify-between">
          <p class="text-sm text-gray-500 mt-2">可提现金额</p>
          <button class="btn-primary flex items-center px-2 py-1 text-[14px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
            立即充值
          </button>
        </div>
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
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">交易编号：</label>
          <input
            v-model="searchParams.tradeNo"
            type="text"
            placeholder="请输入交易编号"
            class="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">业务类型：</label>
          <div class="relative">
            <select
              v-model="searchParams.bizTypes"
              class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">请选择</option>
              <option
                v-for="(item, index) in payBizTypeMap"
                :key="index"
                :value="index"
              >
                {{ item }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="text-sm text-gray-600 mb-1">时间：</label>
          <div class="flex items-center space-x-2">
            <div class="flex-1 relative">
              <input
                v-model="searchParams.startTime"
                type="date"
                class="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <span class="text-gray-500">至</span>
            <div class="flex-1 relative">
              <input
                v-model="searchParams.endTime"
                type="date"
                class="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div class="flex items-end space-x-4">
          <button
            @click="search"
            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex-1 flex justify-center items-center"
          >
            搜索
          </button>
        </div>
      </div>
    </div>

    <TransactionTable v-model:table-data="tableData"></TransactionTable>
    <!-- 分页 -->
    <Pagination v-model="pageConfig"></Pagination>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { doGetShopBalance } from "~/apis/finance/overview";
import { doListShopTransaction } from "~/apis/finance/transaction";
import type { TableDataProp } from "./components/transactionTable.vue";
import TransactionTable from "./components/transactionTable.vue";
import Pagination from "~/components/ui/pagination/Pagination.vue";
import { payBizTypeMap } from "~/apis/finance/transaction/types";
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

watch(
  pageConfig,
  () => {
    tableData.value = [];
    search();
  },
  { deep: true }
);

const tableData = ref<TableDataProp[]>([]);

const searchParams = reactive({
  tradeNo: "",
  bizTypes: "",
  startTime: "",
  endTime: "",
});

const search = async () => {
  let timeRange;
  if (searchParams.startTime) {
    timeRange = [
      searchParams.startTime
        ? dayjs(searchParams.startTime).format("YYYY-MM-DD 00:00:00")
        : undefined,
      searchParams.endTime
        ? dayjs(searchParams.endTime).format("YYYY-MM-DD 23:59:59")
        : undefined,
    ];
  }

  const { data } = await doListShopTransaction({
    size: pageConfig.value.size,
    current: pageConfig.value.current,
    tradeNo: searchParams.tradeNo,
    bizTypes: searchParams.bizTypes,
    startTime: timeRange?.[0],
    endTime: timeRange?.[1],
  });
  tableData.value = data.records;
  pageConfig.value.total = data.total;
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
</style>
