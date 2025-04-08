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
          <input
            v-model="searchParams.tradeNo"
            type="text"
            class="form-input"
            placeholder="请输入"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">交易类型</label>
          <select class="form-select" v-model="searchParams.bizTypes">
            <option value="">全部类型</option>
            <option value="RECHARGE">预付</option>
            <option value="ORDER_PAY">订单支付</option>
            <option value="REFUND">退款</option>
            <option value="COMPENSATION">赔付</option>
            <option value="WITHDRAW">提现</option>
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
          <tr v-for="(item, index) in tableData" :key="item.id">
            <td
              v-for="iitem in columns"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
              <span v-if="iitem.prop === 'index'">{{ +index + 1 }}</span>
              {{
                iitem.formatter
                  ? iitem.formatter({ row: item, cell: item[iitem.prop] })
                  : item[iitem.prop]
              }}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="!tableData?.length"
        class="h-[200px] relative flex items-center"
      >
        <div
          v-if="!tableData?.length"
          class="w-full text-center absolute left-0"
        >
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
import { doListShopTransaction } from "~/apis/finance/transaction";
import Pagination from "~/components/ui/pagination/Pagination.vue";
interface TableColumn {
  prop: string;
  width: number;
  label: string;
  formatter?: ({ row, cell }: { row: any; cell: string }) => string;
}
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

const columns: TableColumn[] = [
  {
    prop: "index",
    width: 80,
    label: "序号",
  },
  {
    prop: "transAmount",
    width: 200,
    label: "交易金额",
    formatter: ({ row, cell }) => "￥" + cell,
  },
  {
    prop: "currentBalance",
    width: 200,
    label: "可用余额",
    formatter: ({ row, cell }) => (row.payType === "BALANCE" ? cell : ""),
  },
  {
    prop: "currentFreeze",
    width: 200,
    label: "冻结金额",
    formatter: ({ row, cell }) => (row.payType === "BALANCE" ? cell : ""),
  },
  {
    prop: "currency",
    width: 200,
    label: "交易币种",
  },
  {
    prop: "tradeNo",
    width: 200,
    label: "交易编号",
  },
  {
    prop: "bizNo",
    width: 200,
    label: "关联订单",
  },
  {
    prop: "payBizType",
    width: 200,
    label: "业务类型",
    formatter: ({ row, cell }) =>
      ({
        RECHARGE: "预付",
        ORDER_PAY: "订单支付",
        REFUND: "平台退款",
        COMPENSATION: "平台罚款",
        WITHDRAW: "提现",
      }[cell] ?? "未知类型"),
  },
  {
    prop: "payType",
    width: 200,
    label: "支付类型",
    formatter: ({ row, cell }) => {
      if (row.payBizType === "REFUND") return "";
      return cell
        ? { BALANCE: "余额支付", CMBPAY: "聚合支付" }[cell] ?? "未知类型"
        : "";
    },
  },
  {
    prop: "payDetailType",
    width: 200,
    label: "支付方式",
    formatter: ({ row, cell }) => {
      if (row.payBizType === "REFUND") return "";
      return cell
        ? {
            ALIPAY: "支付宝",
            WECHAT: "微信支付",
            UNIONPAY: "银联",
            DCEP: "数字人民币",
            BALANCE: "余额",
          }[cell] ?? "未知方式"
        : "";
    },
  },
  {
    prop: "tradeStatus",
    width: 200,
    label: "交易状态",
    formatter: ({ row, cell }) => {
      if (row.payBizType === "REFUND") return "";
      return cell
        ? {
            PENDING_TRADE: "待支付",
            OVERTIME_CLOSE: "交易关闭",
            SUCCESS_APPLY_TRADE: "交易中",
            FAIL_APPLY_TRADE: "交易失败",
            SUCCESS_TRADE: "交易成功",
            FAIL_TRADE: "交易失败",
          }[cell] ?? "未知状态"
        : "";
    },
  },
  {
    prop: "payChannelNo",
    width: 200,
    label: "第三方支付流水号",
    formatter: ({ row, cell }) => {
      if (row.payBizType === "REFUND") return "";
      return cell;
    },
  },
  {
    prop: "tradeTime",
    width: 200,
    label: "日期",
  },
];

const tableData = ref<any[]>();

const searchParams = reactive({
  tradeNo: "",
  bizTypes: "",
  time: "",
});

const search = async () => {
  console.log(searchParams.tradeNo, searchParams.bizTypes);

  const { data } = await doListShopTransaction({
    size: pageConfig.value.size,
    current: pageConfig.value.current,
    tradeNo: searchParams.tradeNo,
    bizTypes: searchParams.bizTypes,
  });
  console.log(data);
  tableData.value = data.records;
  pageConfig.value.total = data.total;

  // tableData.value = Array.from({ length: 10 }, (_, index) => ({
  //   transAmount: "￥100.00",
  //   currentBalance: "￥123.22",
  //   currentFreeze: "￥100.00",
  //   currency: "人民币",
  //   tradeNo: "23787193892389183912831038",
  //   bizNo: "23787193892389183912831038",
  //   payBizType: "订单支付",
  //   payType: "账户余额",
  //   payDetailType: "账户余额",
  //   tradeStatus: "付款成功",
  //   payChannelNo: "7889898008",
  //   tradeTime: "2016-09-21  08:50:08",
  // }));

  // pageConfig.value.total = 30;
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
