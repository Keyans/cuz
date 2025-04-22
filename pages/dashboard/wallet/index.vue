<template>
  <div class="container mx-auto py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">资金明细</h1>
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
          ¥{{ +(amountInfo?.undrawn ?? 0) / 10000 }}
        </p>
        <div class="flex w-full justify-between mt-4 items-center">
          <p class="text-sm text-gray-500">
            总预付余额：￥{{ +(amountInfo?.total ?? 0) / 10000 }} -
            冻结金额：￥{{ +(amountInfo?.freeze ?? 0) / 10000 }}
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
          ¥{{ +(amountInfo?.uncompleted ?? 0) / 10000 }}
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
    <ClientOnly>
      <TransactionTable v-model:table-data="tableData"></TransactionTable>
      <!-- 分页 -->
      <Pagination v-model="pageConfig"></Pagination>
    </ClientOnly>
    <ClientOnly>
      <el-dialog
        v-model="showRecharge"
        :close-on-click-modal="false"
        width="500"
        ref="paymentDialogRef"
      >
        <div class="flex flex-col space-y-4">
          <div class="flex flex-col space-y-4">
            <div class="text-[22px] font-semibold shrink-0">充值金额</div>

            <div
              class="flex items-center text-[18px] space-x-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <div>￥</div>
              <input
                @blur="checkRechargeAmount"
                v-model="rechargeAmount"
                placeholder="请输入预付到账金额"
                class="w-full outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              v-for="item in [
                '100',
                '500',
                '1000',
                '2000',
                '3000',
                '5000',
                '10000',
                '20000',
              ]"
              :key="item"
              class="bg-[#f2f2f2] rounded-lg text-center px-2 py-2 shadow"
              @click="rechargeAmount = item"
            >
              <text class="text-[14px] font-semibold"> {{ item }}元 </text>
              <div class="text-[12px]">售价：￥{{ item }}</div>
            </button>
          </div>

          <button class="btn-secondary w-full" @click="confirmPay">
            确认支付
          </button>
        </div>
      </el-dialog>
    </ClientOnly>

    <!--二维码支付弹窗-->
    <ClientOnly>
      <el-dialog
        v-model="showPayQRcode"
        :close-on-click-modal="false"
        width="500"
        v-loading=""
        :before-close="() => (handleCloseQRcode(), search(), getShopBalance())"
      >
        <div class="qccode-box">
          <p>
            向
            <span class="text-[14px] font-semibold">
              深圳市深航科技有限公司
            </span>
          </p>
          <p class="text-[14px] font-semibold text-blue-600">
            扫码支付{{ rechargeAmount }}元
          </p>
          <img :src="qrCodeUrl" />
          <p>支付平台：</p>
          <img src="/assets/pay-platform.png" class="h-12" />
          <p>
            若未到账，请前往<span class="text-[14px] text-blue-400"
              >帮助中心</span
            >联系客服处理。
          </p>
        </div>
      </el-dialog>
    </ClientOnly>

    <ClientOnly>
      <el-dialog
        v-model="paymentMsgDialog"
        :show-close="false"
        :close-on-click-modal="false"
        width="500"
      >
        <template #header>
          <div class="flex items-center space-x-2">
            <el-icon :color="paymentStatusColor[paymentMsgStatus]" size="24">
              <svg
                v-if="paymentMsgStatus === 'WAITING_AUDIT'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"
                ></path>
              </svg>

              <svg
                v-else-if="paymentMsgStatus === 'AUDIT_PASS'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
                ></path>
              </svg>

              <svg
                v-else-if="paymentMsgStatus === 'AUDIT_REJECT'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
                ></path>
              </svg>
            </el-icon>
            <div>
              {{ paymentMsgTitleMap[paymentMsgStatus] }}
            </div>
          </div>
        </template>

        <div
          v-if="paymentMsgStatus === 'WAITING_AUDIT'"
          class="text-[#f59a23] space-y-4"
        >
          <div>
            结果返回前，请不要重复操作！可前往
            <NuxtLink class="text-blue-400">预付记录</NuxtLink>
            查看结果
          </div>
          <div class="w-full flex justify-end">
            <button
              :disabled="pendingDown > 0"
              :class="[
                'btn-secondary',
                pendingDown > 0 ? 'bg-gray-400 cursor-not-allowed' : '',
              ]"
              @click="handleResetDialog()"
            >
              知道了<span v-if="pendingDown > 0">({{ pendingDown }})</span>
            </button>
          </div>
        </div>

        <div v-else-if="paymentMsgStatus === 'AUDIT_PASS'" class="space-y-4">
          <div>预付成功，您可在付费记录中查看</div>
          <div class="w-full flex justify-end">
            <button :class="['btn-secondary']" @click="handleResetDialog()">
              确定
            </button>
          </div>
        </div>

        <div v-else-if="paymentMsgStatus === 'AUDIT_REJECT'" class="space-y-4">
          <div>
            xxx 对应的失败原因 未知 ，请前往
            <NuxtLink class="text-blue-400">帮助中心</NuxtLink>
            联系客服处理
          </div>

          <div class="w-full flex justify-end">
            <button :class="['btn-secondary']" @click="handleResetDialog()">
              确定
            </button>
          </div>
        </div>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {
  doGetShopBalance,
  doRecharge,
  doGetRechargeStatus,
} from "~/apis/finance/overview";
import { type LoadingInstance } from "element-plus/es/components/loading/src/loading";
import { doListShopTransaction } from "~/apis/finance/transaction";
import type { TableDataProp } from "./components/transactionTable.vue";
import TransactionTable from "./components/transactionTable.vue";
import Pagination from "~/components/ui/pagination/Pagination.vue";
import { payBizTypeMap } from "~/apis/finance/transaction/types";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});
const toast = useToast();
const amountInfo = ref<Record<string, string> | undefined>();
const showRecharge = ref(false);
const paymentStatusColor: Record<string, string> = {
  WAITING_AUDIT: "#fa8c15",
  AUDIT_PASS: "#52c41a",
  AUDIT_REJECT: "#ff4d4f",
};

const getShopBalance = async () => {
  const { data } = await doGetShopBalance();
  if (data) {
    amountInfo.value = data;
  }
};
onMounted(async () => {
  try {
    search();
    getShopBalance();
  } catch (error) {
    console.error(error);
  }
});
const rechargeAmount = ref<string>();
const paymentDialogRef = ref();
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

  try {
    tableData.value = [];

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
  } catch (error) {
    console.error(error);
  }
};

/**
 * 确认支付函数
 *
 * @returns 异步返回充值结果
 */
const confirmPay = async () => {
  let loading: LoadingInstance;
  try {
    loading = ElLoading.service({
      target:
        paymentDialogRef.value?.$el.nextElementSibling.querySelector(
          ".el-dialog"
        ),
    });

    const rechargeValue = Number(rechargeAmount.value);
    // 检查是否为数字且大于0
    if (isNaN(rechargeValue) || rechargeValue <= 0) {
      return ElMessage.warning("请输入有效的充值金额（大于0）");
    }
    const { success, msg, data } = await doRecharge({
      payType: "CMBPAY",
      rechargeAmt: rechargeValue * 10000,
    });
    if (!success) return ElMessage.error(`充值失败:${msg}`);
    showRecharge.value = false;
    await createQrCode(data.data, data.outTradeNo);
  } catch (error) {
    console.error(error);
  } finally {
    loading!.close();
  }
};
const showPayQRcode = ref(false);
const qrCodeUrl = ref("");

/**
 * 创建二维码，并扫码支付
 * @param url 要生成二维码的链接
 * @param outTradeNo 订单号
 */
const interval = ref<NodeJS.Timeout | null>(null);
let cdInterval = ref<NodeJS.Timeout | null>(null);
const createQrCode = async (url: string, outTradeNo: string) => {
  if (import.meta.client) {
    const QRCode = await import("qrcode"); // ⬅️ 运行时导入，不进入 SSR 构建
    qrCodeUrl.value = await QRCode.toDataURL(url);
    showPayQRcode.value = true;
  }
  // 每隔3秒轮询支付状态接口
  interval.value = setInterval(async () => {
    // const { data } = await doGetPayOrderStatus({
    //   outTradeNo,
    // });
    // if (data.NotifyStatus === "ACCOMPLISH") {
    //   // 充值处理完成
    //   handleCloseQRcode();
    //   await search();
    //   ElMessage.success("充值成功！");
    // }
    const { data } = await doGetRechargeStatus({ outTradeNo });

    console.log(data);

    if (
      data === "WAITING_AUDIT" &&
      paymentMsgStatus.value !== "WAITING_AUDIT"
    ) {
      paymentMsgStatus.value = "WAITING_AUDIT";
      showPayQRcode.value = false;
      paymentMsgDialog.value = true;
      cdInterval.value = setInterval(() => {
        --pendingDown.value;
        if (pendingDown.value === 0) {
          handleResetDialog(true);
        }
      }, 1000);
    } else if (
      data === "AUDIT_PASS" &&
      paymentMsgStatus.value !== "AUDIT_PASS"
    ) {
      paymentMsgStatus.value = "AUDIT_PASS";
      paymentMsgDialog.value = true;
      handleCloseQRcode();
    } else if (
      data === "AUDIT_REJECT" &&
      paymentMsgStatus.value !== "AUDIT_REJECT"
    ) {
      paymentMsgStatus.value = "AUDIT_REJECT";
      paymentMsgDialog.value = true;
      handleCloseQRcode();
    }
  }, 3000);
};
const handleCloseQRcode = () => {
  handleResetDialog(true);
  showPayQRcode.value = false;
};

const handleResetDialog = (onlyClear?: boolean) => {
  if (interval.value) {
    clearInterval(interval.value);
    interval.value = null;
  }
  if (cdInterval.value) {
    clearInterval(cdInterval.value);
    cdInterval.value = null;
  }

  if (onlyClear) return;

  paymentMsgDialog.value = false;
  paymentMsgStatus.value = "";
  pendingDown.value = 10;

  search();
  getShopBalance();
};

const checkRechargeAmount = (e: Event) => {
  if (rechargeAmount.value && !/^[1-9]\d*$/.test(rechargeAmount.value)) {
    toast.warning("请输入正整数");
    rechargeAmount.value = parseInt(rechargeAmount.value) + "";
  }
};

const paymentMsgTitleMap = {
  WAITING_AUDIT: "等待预付结果",
  AUDIT_PASS: "预付成功",
  AUDIT_REJECT: "预付失败",
  "": "未知状态",
};

// 支付回调弹窗
const paymentMsgDialog = ref(false);
const paymentMsgStatus = ref<
  "WAITING_AUDIT" | "AUDIT_PASS" | "AUDIT_REJECT" | ""
>("");
const pendingDown = ref(10);
</script>

<style scoped>
th {
  white-space: nowrap;
  min-width: 200px;
}
.qccode-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
