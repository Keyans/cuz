<template>
  <div class="container mx-auto py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">费用中心</h1>
    </div>

    <!-- 账户概览 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">可用预付余额</h3>
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
        <p class="text-3xl font-bold text-primary">
          ¥{{ amountInfo?.undrawn }}
        </p>
        <div class="flex w-full justify-between mt-4 items-center">
          <p class="text-sm text-gray-500">
            总预付余额：￥{{ amountInfo?.total }} - 冻结金额：￥{{
              amountInfo?.freeze
            }}
          </p>
          <button
            @click="showRecharge = true"
            class="btn-plain btn-plain-border flex items-center px-2 py-1 text-[14px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
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
            立即预付
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">未出账单</h3>
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
          ¥{{ amountInfo?.uncompleted }}
        </p>
        <div class="flex w-full justify-between mt-4 items-center">
          <p class="text-sm text-gray-500">
            <text class="text-red-400">1</text> 笔账单未确认
          </p>
          <NuxtLink href="/dashboard/wallet/reconciliations" target="_blank">
            <button class="btn-plain flex items-center px-2 py-1 text-[14px]">
              查看更多
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688m-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
                ></path>
              </svg>
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- <div class="bg-white rounded-lg shadow p-6">
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
        <p class="text-3xl font-bold text-green-600">
          ¥{{ amountInfo?.total }}
        </p>
        <p class="text-sm text-gray-500 mt-2">近30天收入</p>
      </div> -->
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

    <el-dialog
      v-model="showRecharge"
      :close-on-click-modal="false"
      width="500"
      v-loading=""
    >
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col space-y-4">
          <div class="text-[22px] font-semibold shrink-0">充值金额</div>

          <div
            class="flex items-center text-[18px] space-x-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <div>￥</div>
            <input
              v-model="rechargeAmount"
              placeholder="请输入预付到账金额"
              class="w-full outline-none"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            v-for="item in [100, 500, 1000, 2000, 3000, 5000, 10000, 20000]"
            :key="item"
            class="bg-[#f2f2f2] rounded-lg text-center px-2 py-2 shadow"
            @click="rechargeAmount = item"
          >
            <text class="text-[14px] font-semibold"> {{ item }}元 </text>
            <div class="text-[12px]">售价：￥{{ item }}</div>
          </button>
        </div>

        <button class="btn-secondary w-full" @click="confirmPay">确认支付</button>
      </div>
    </el-dialog>

    <!--二维码支付弹窗-->
    <el-dialog
      v-model="showPayQRcode"
      :close-on-click-modal="false"
      width="500"
      v-loading=""
      :before-close="handleCloseQRcode"
    > 
      <div class="qccode-box">
        <p>向 <span class="text-[14px] font-semibold">深圳市深航科技有限公司</span></p>
        <p class="text-[14px] font-semibold text-blue-600">扫码支付{{ rechargeAmount }}元</p>
        <img :src="qrCodeUrl"></img>
        <p>支付平台：</p>
        <img src="/assets/pay-platform.png" class="h-12"></img>
        <p>若未到账，请前往<span class="text-[14px] text-blue-400">帮助中心</span>联系客服处理。</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { doGetShopBalance, doRecharge, doGetPayOrderStatus } from "~/apis/finance/overview";
import { doListShopTransaction } from "~/apis/finance/transaction";
import type { TableDataProp } from "./components/transactionTable.vue";
import TransactionTable from "./components/transactionTable.vue";
import Pagination from "~/components/ui/pagination/Pagination.vue";
import { payBizTypeMap } from "~/apis/finance/transaction/types";
import QRCode from 'qrcode'
definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const amountInfo = ref<Record<string, string> | undefined>();
const showRecharge = ref(false);
onMounted(async () => {
  try {
    const { data } = await doGetShopBalance();
    if (data) {
      amountInfo.value = data;
    }
  } catch (error) {
    console.error(error);
  }
});
const rechargeAmount = ref();
const rechargeLoading = ref(false);

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

/**
 * 确认支付函数
 *
 * @returns 异步返回充值结果
 */
const confirmPay = async () => {
  const rechargeValue = Number(rechargeAmount.value);
  // 检查是否为数字且大于0
  if (isNaN(rechargeValue) || rechargeValue <= 0) {
    return ElMessage.warning("请输入有效的充值金额（大于0）");
  }
  const { success,msg,data } = await doRecharge({
    payType:'CMBPAY',
    rechargeAmt:rechargeValue * 10000,
  });
  if (!success) return ElMessage.error(`充值失败:${msg}`);
  showRecharge.value = false;
  await createQrCode(data.data,data.outTradeNo)
};
const showPayQRcode = ref(false)
const qrCodeUrl = ref('')
/**
 * 创建二维码，并扫码支付
 *
 * @param url 要生成二维码的链接
 * @param outTradeNo 订单号

 */
const interval = ref<NodeJS.Timeout | null>(null)
const createQrCode = async (url:string, outTradeNo:string) => {
  qrCodeUrl.value = await QRCode.toDataURL(url)
  showPayQRcode.value = true
  // 每隔5秒轮询支付状态接口
  interval.value = setInterval(async () => {
    const { data, success } = await doGetPayOrderStatus({
      outTradeNo,
    });
    if (success) {
      handleCloseQRcode();
      await search();
      ElMessage.success('充值成功！')
    }
  }, 5000);
}
/**
 * 关闭二维码显示处理函数
 *
 */
const handleCloseQRcode = () => {
  if (interval.value) {
    clearInterval(interval.value);
    interval.value = null;
  }
  showPayQRcode.value = false;
}
</script>

<style scoped>
th {
  white-space: nowrap;
  min-width: 200px;
}
.qccode-box{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
