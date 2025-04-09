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
          <select class="form-select" v-model="searchParams.time">
            <option value="">所有</option>
            <option value="7">最近7天</option>
            <option value="30">最近30天</option>
            <option value="90">最近90天</option>
            <!-- <option value="custom">自定义</option> -->
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

    <el-table
      row-key="id"
      :data="tableData"
      style="width: 100%"
      class="shadow rounded-lg"
      empty-text="暂无交易记录"
    >
      <el-table-column type="index" width="50" label="序号" fixed />
      <el-table-column width="200" prop="transAmount" label="交易金额">
        <template #default="props">
          <span
            :class="
              ['REFUND', 'COMPENSATION'].includes(props.row.payBizType)
                ? 'text-red-300'
                : ''
            "
          >
            {{
              (["REFUND", "COMPENSATION"].includes(props.row.payBizType)
                ? "+"
                : "-") +
              "￥" +
              props.row.transAmount
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        prop="currentBalance"
        label="可用余额"
        :formatter="
          (row, _column, cell) => (row.payType === 'BALANCE' ? cell : '')
        "
      />
      <el-table-column
        width="200"
        prop="currentFreeze"
        label="冻结金额"
        :formatter="
          (row, _column, cell) => (row.payType === 'BALANCE' ? cell : '')
        "
      />
      <el-table-column width="200" prop="currency" label="交易币种" />
      <el-table-column width="200" prop="tradeNo" label="交易编号" />
      <el-table-column width="200" prop="bizNo" label="关联订单" />
      <el-table-column
        width="200"
        prop="payBizType"
        label="业务类型"
        :formatter="
          (row, _column, cell) =>
            (({
              RECHARGE: '预付',
              ORDER_PAY: '订单支付',
              REFUND: '平台退款',
              COMPENSATION: '平台赔付',
              WITHDRAW: '提现',
            } as Record<string,string>)[cell] ?? '未知类型')
        "
      />
      <el-table-column
        width="200"
        prop="payType"
        label="支付类型"
        :formatter="
          (row, _column, cell) =>
            cell
              ? ({ BALANCE: '余额支付', CMBPAY: '聚合支付' } as Record<string,string>)[cell] ?? '未知类型'
              : ''
        "
      />
      <el-table-column
        width="200"
        prop="payDetailType"
        label="支付方式"
        :formatter="
          (row, _column, cell) =>
            cell
              ? ({
                  ALIPAY: '支付宝',
                  WECHAT: '微信支付',
                  UNIONPAY: '银联',
                  DCEP: '数字人民币',
                  BALANCE: '余额',
              } as Record<string,string>)[cell] ?? '未知方式'
              : ''
        "
      />
      <el-table-column
        width="200"
        prop="tradeStatus"
        label="交易状态"
        :formatter="
          (row, _column, cell) =>
            cell
              ? ({
                  PENDING_TRADE: '待支付',
                  OVERTIME_CLOSE: '交易关闭',
                  SUCCESS_APPLY_TRADE: '交易中',
                  FAIL_APPLY_TRADE: '交易失败',
                  SUCCESS_TRADE: '交易成功',
                  FAIL_TRADE: '交易失败',
                }as Record<string,string>)[cell] ?? '未知状态'
              : ''
        "
      />
      <el-table-column
        width="200"
        prop="payChannelNo"
        label="第三方支付流水号"
        :formatter="
          (row, _column, cell) => {
            if (
              row.payBizType === 'REFUND' ||
              row.payBizType === 'COMPENSATION'
            )
              return '';
            return cell;
          }
        "
      />
      <el-table-column width="200" prop="tradeTime" label="日期" />
    </el-table>

    <!-- 分页 -->
    <Pagination v-model="pageConfig"></Pagination>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { doGetShopBalance } from "~/apis/finance/overview";
import { doListShopTransaction } from "~/apis/finance/transaction";
import Pagination from "~/components/ui/pagination/Pagination.vue";

interface TableDataProp {
  transAmount: string;
  currentBalance: string;
  currentFreeze: string;
  currency: string;
  tradeNo: string;
  bizNo: string;
  payBizType: string;
  payType: string;
  payDetailType: string;
  tradeStatus: string;
  payChannelNo: string;
  tradeTime: string;
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

const tableData = ref<TableDataProp[]>();

const searchParams = reactive({
  tradeNo: "",
  bizTypes: "",
  time: "",
});

const search = async () => {
  let timeRange;
  if (searchParams.time) {
    timeRange = [
      dayjs()
        .add(-1 * +searchParams.time, "day")
        .format("YYYY-MM-DD 00:00:00"),
      dayjs().format("YYYY-MM-DD 23:59:59"),
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
