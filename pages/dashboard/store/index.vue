<template>
  <div class="px-4 py-4 sm:py-6 flex flex-col h-full absolute left-0 right-0">
    <div class="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
      <h1 class="text-lg sm:text-xl lg:text-2xl font-bold">我的店铺</h1>

      <button class="btn-primary w-fit flex items-center" @click="showAddShop">
        新增店铺
      </button>
    </div>
    <!-- 店铺概览卡片 -->
    <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
      <div class="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
        <h3 class="text-sm sm:text-base lg:text-lg font-semibold mb-2">
          店铺状态
        </h3>
        <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
          正常运营
        </p>
      </div>
      <div class="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
        <h3 class="text-sm sm:text-base lg:text-lg font-semibold mb-2">
          今日订单
        </h3>
        <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">0</p>
      </div>
      <div class="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
        <h3 class="text-sm sm:text-base lg:text-lg font-semibold mb-2">
          店铺评分
        </h3>
        <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
          5.0
        </p>
      </div>
    </div> -->

    <!-- 筛选器 -->
    <Selections :platformList="platformList" @searchOrders="searchOrders"></Selections>

    <div class="flex-grow space-y-4 pb-10">
      <div v-for="item in shopList" :key="item.id"
        class="h-[124px] shadow border relative border-[#DCDFE6] rounded-md p-6 flex items-center">
        <!-- <img :src="item.icon" width="32px" height="32px" class="mr-5 rounded-lg" /> -->

        <div class="flex flex-col space-y-1 mr-[90px] min-w-[300px]">
          <div class="font-semibold">{{ item.thirdPartyShopName }}</div>
          <div class="text-[14px] text-[#909399]">
            店铺账号：{{ item.thirdPartyShopAccount }}
          </div>
        </div>

        <div class="flex flex-col space-y-2 mr-[90px]">
          <div class="text-[14px] flex justify-between">
            <span>{{ item.appType === 'PUBLISH' ? '商品上架' : '订单履约' }}</span>
            <div class="flex items-center" v-if="item.appType === 'ORDER'">
              <button class="btn-plain" @click="showSetWarehouse(item)">设置发货仓</button>
              <el-icon color="#E6A23C">
                <InfoFilled />
              </el-icon>
            </div>
          </div>
          <div class="text-[12px] text-[#606266]">
            订购到期时间
            <span class="inline-block ml-2">{{ item.bookingExpireTime }}</span>
            <span
              :class="['tag', calExpired(item.bookingExpireTime) ? 'border-red-400 text-red-400' : 'border-green-400 text-green-400']">
              {{ calExpired(item.bookingExpireTime) ? "异常" : "正常" }}
            </span>
          </div>
          <div class="text-[12px] text-[#606266]">
            授权到期时间
            <span class="inline-block ml-2">{{ item.authExpireTime }}</span>
            <span
              :class="['tag', calExpired(item.authExpireTime) ? 'border-red-400 text-red-400' : 'border-green-400 text-green-400']">
              {{ calExpired(item.authExpireTime) ? "异常" : "正常" }}
            </span>
          </div>
        </div>

        <div class="absolute right-6 flex space-x-4">
          <button class="btn-plain">续订</button>
          <button class="btn-plain text-red-400" @click="showDelShopDialog(item.id)">
            删除
          </button>
        </div>

      </div>
      <div class="flex flex-col items-center justify-center text-gray-500" v-if="!loading && shopList.length === 0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-lg">暂无数据</p>
        <p class="text-sm mt-2">当前条件下没有找到相关订单</p>
      </div>

      <!-- <div class="w-full flex justify-center" v-if="loading">
        <Loading class="scale-50" height="50px" width="50px"></Loading>
      </div> -->

      <div class="flex justify-between items-center mt-4" v-if="!loading">
        <div class="text-sm text-gray-700">
          显示 {{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }} 到
          {{ Math.min(pagination.current * pagination.pageSize, pagination.total) }} 条，
          共 {{ pagination.total }} 条
        </div>
        <nav class="flex space-x-2">
          <button class="px-3 py-1 rounded border"
            :class="pagination.current <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'"
            :disabled="pagination.current <= 1" @click="handlePageChange(pagination.current - 1)">
            &lt;
          </button>
          <template v-for="page in pageList" :key="page">
            <button v-if="page !== '...'" @click="handlePageChange(page)" class="px-3 py-1 rounded border"
              :class="page === pagination.current ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'">
              {{ page }}
            </button>
            <span v-else class="px-3 py-1">...</span>
          </template>
          <button class="px-3 py-1 rounded border"
            :class="pagination.current >= pagination.totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'"
            :disabled="pagination.current >= pagination.totalPages" @click="handlePageChange(pagination.current + 1)">
            &gt;
          </button>
        </nav>
      </div>

    </div>

    <AddShopDialog ref="addShopDialogRef" :platformList="platformList" @refresh="getData"></AddShopDialog>

    <el-dialog v-model="showDelShop" title="删除" width="400" align-center>
      <div>
        删除后无法恢复，请谨慎操作。
      </div>
      <template #footer>
        <el-button @click="showDelShop = false">取消</el-button>
        <el-button type="danger" @click="delShop">删除</el-button>
      </template>
    </el-dialog>

    <SetWarehouse ref="setWarehouseRef"></SetWarehouse>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import { Loading } from "~/components/ui/loading";
import { ScrollCallBackSymbol } from "~/constant";
import { doDeleteShop, doGetPlatformList, doGetShopList } from "~/apis/store/shop";
import AddShopDialog from "~/components/dashboard/store/addShopDialog.vue";
import Selections from "~/components/dashboard/store/selections.vue";
import SetWarehouse from "~/components/dashboard/store/setWarehouse.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const registerScrollCallback =
  inject<(id: string, fn: () => void) => void>(ScrollCallBackSymbol);

const addShopDialogRef = ref<InstanceType<typeof AddShopDialog>>();
const showDelShop = ref(false);
const calExpired = (date: string) => {
  if (dayjs(date).isAfter(dayjs())) return false;
  else return true;
};

const shopList = ref<any[]>([]);
// const noMore = ref(false);
const loading = ref(false);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
})

async function getData(params: any = {}) {
  if (loading.value) return;
  loading.value = true;
  doGetShopList({ ...params, current: pagination.current, size: pagination.pageSize }).then((res) => {
    pagination.total = res.data.total;
    pagination.totalPages = res.data.pages;
    shopList.value = res.data.records;
  }).catch((error) => {
    console.error("获取店铺列表失败:", error);
  })
    .finally(() => {
      loading.value = false;
    })
}

const searchOrders = (params: any) => {
  pagination.current = 1;
  // noMore.value = false;
  getData(params);
};


function showAddShop() {
  addShopDialogRef.value?.showAddShopDialog();
}

const delShopId = ref("");

function showDelShopDialog(id: string) {
  showDelShop.value = true;
  delShopId.value = id;
}

function delShop() {
  doDeleteShop({ id: delShopId.value }).then(() => {
    ElMessage.success("删除成功");
    showDelShop.value = false;
    getData();
  });
}

const setWarehouseRef = ref<InstanceType<typeof SetWarehouse>>();

function showSetWarehouse(item?: any) {
  setWarehouseRef.value?.showSetWarehouse(item);
}


const platformList = ref<Array<any>>([]);
// 获取平台列表
const getPlatformList = async () => {
  const { data } = await doGetPlatformList();
  platformList.value = data;
};

// 计算分页显示的页码列表
const pageList = computed(() => {
  if (!pagination) return [];

  const { current, totalPages } = pagination;
  const result = [];

  // 固定显示前后各2页，中间用...表示
  if (totalPages <= 7) {
    // 如果总页数小于等于7，直接显示所有页码
    if (totalPages == 0) return [1];
    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }
  } else {
    result.push(1);

    if (current > 3) {
      result.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    if (current < totalPages - 2) {
      result.push('...');
    }

    result.push(totalPages);
  }

  return result;
});
function handlePageChange(page: number | string) {
  // 同一页面不重复请求
  if (pagination.current === page) return;
  pagination.current = Number(page);
  getData();
}

onMounted(() => {
  getData();
  // 获取搜索条件
  getPlatformList();
  // registerScrollCallback && registerScrollCallback("dashboard-store", getData);
});

const columns: any[] = [
  {
    prop: "platform",
    width: 200,
    label: "平台",
  },
  {
    prop: "interFee",
    width: 200,
    label: "接口费用",
  },
  {
    prop: "payback",
    width: 200,
    label: "返款金额",
  },
  {
    prop: "commission",
    width: 200,
    label: "手续费",
  },
  {
    prop: "action",
    width: 200,
    label: "操作",
    slot: true,
  },
];

// const modules = [
//   {
//     name: "选品中心",
//     path: "/dashboard/store/sourcing",
//     description: "浏览和选择优质商品，丰富店铺产品线",
//   },
//   {
//     name: "产品库",
//     path: "/dashboard/store/products",
//     description: "管理店铺所有产品，设置产品详情",
//   },
//   {
//     name: "刊登任务",
//     path: "/dashboard/store/listings",
//     description: "创建和管理产品刊登任务",
//   },
//   {
//     name: "刊登模板",
//     path: "/dashboard/store/templates",
//     description: "管理产品刊登模板，提高刊登效率",
//   },
//   {
//     name: "订单中心",
//     path: "/dashboard/store/orders",
//     description: "查看和处理所有订单信息",
//   },
//   {
//     name: "售后管理",
//     path: "/dashboard/store/after-sales",
//     description: "处理退换货和客户服务请求",
//   },
//   {
//     name: "费用中心",
//     path: "/dashboard/store/wallet",
//     description: "管理店铺资金和收支明细",
//   },
//   {
//     name: "基本信息",
//     path: "/dashboard/store/settings",
//     description: "设置和管理店铺基本信息",
//   },
// ];
</script>
<style lang="css" scoped>
th {
  white-space: nowrap;
  min-width: 200px;
}

.store-table {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.tag {
  @apply inline-block border px-2 rounded-full py-[2px] -mt-2 ml-3;
}
</style>
