<template>
  <div class="px-4 py-4 sm:py-6 flex flex-col h-full absolute">
    <div class="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
      <h1 class="text-lg sm:text-xl lg:text-2xl font-bold">我的店铺</h1>

      <button
        class="btn-primary w-fit flex items-center"
        @click="showDialog = true"
      >
        新增店铺
      </button>
    </div>
    <!-- 店铺概览卡片 -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8"
    >
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
    </div>

    <!-- 筛选器 -->
    <div
      class="bg-white/85 rounded-lg shadow p-4 mb-6 sticky top-0 z-30 backdrop-blur-lg"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">商品分类</label>
          <select class="form-select">
            <option value="">全部分类</option>
            <option value="clothing">服装</option>
            <option value="accessories">配饰</option>
            <option value="home">家居</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">价格区间</label>
          <div class="flex space-x-2">
            <input
              type="number"
              class="form-input w-1/2"
              placeholder="最低价"
            />
            <input
              type="number"
              class="form-input w-1/2"
              placeholder="最高价"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">排序方式</label>
          <select class="form-select">
            <option value="popular">综合排序</option>
            <option value="newest">最新上架</option>
            <option value="price-asc">价格从低到高</option>
            <option value="price-desc">价格从高到低</option>
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

    <div class="flex-grow space-y-4">
      <div
        v-for="item in data"
        :key="item"
        class="h-[124px] shadow border relative border-[#DCDFE6] rounded-md p-6 flex items-center"
      >
        <img src="" width="32px" height="32px" class="mr-[7px]" />

        <div class="flex flex-col space-y-1 mr-[90px]">
          <div class="font-semibold">壳多多</div>
          <div class="text-[14px] text-[#909399]">店铺账号：IJFI59194</div>
        </div>

        <div class="flex flex-col space-y-2 mr-[90px]">
          <div class="text-[14px]">商品上架</div>
          <div class="text-[12px] text-[#606266]">
            订购到期时间 2025-12-12 19:32:23
            <div class="tag border-green-400 text-green-400">正常</div>
          </div>

          <div class="text-[12px] text-[#606266]">
            授权到期时间 2025-12-12 19:32:23
            <div class="tag border-green-400 text-green-400">正常</div>
          </div>
        </div>

        <div class="flex flex-col space-y-2 mr-[90px]">
          <div class="text-[14px]">订单履约</div>
          <div class="text-[12px] text-[#606266]">
            订购到期时间 2025-12-12 19:32:23
            <div class="tag border-red-400 text-red-400">异常</div>
          </div>

          <div class="text-[12px] text-[#606266]">
            授权到期时间 2025-12-12 19:32:23
            <div class="tag border-red-400 text-red-400">异常</div>
          </div>
        </div>
        <div class="absolute right-6 flex space-x-4">
          <div>续订</div>
          <div class="text-red-400">删除</div>
        </div>
      </div>

      <div>加载中</div>
    </div>
    <!--     <!~~ 功能模块导航 ~~>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <NuxtLink
          v-for="module in modules"
          :key="module.path"
          :to="module.path"
          class="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow"
        >
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <h3 class="text-base sm:text-lg font-semibold">{{ module.name }}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p class="text-sm sm:text-base text-gray-600">{{ module.description }}</p>
        </NuxtLink>
      </div>-->

    <Dialog v-model="showDialog" title="新增店铺">
      <div class="bg-white rounded-lg shadow w-fit overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="store-table"
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
                  iitem.slot
                    ? ""
                    : iitem.formatter
                    ? iitem.formatter({ row: item, cell: item[iitem.prop] })
                    : item[iitem.prop]
                }}

                <!-- 自定义部分 -->
                <div v-if="iitem.prop === 'action'" class="space-x-1 flex">
                  <button class="btn-primary">订购</button>
                  <button class="btn-primary">授权</button>
                </div>
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
            暂无可用店铺
          </div>
        </div>
      </div>
      <template #footer></template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from "~/components/ui/dialog/Dialog.vue";
import { ScrollCallBackSymbol } from "~/constant";

interface TableColumn {
  prop: string;
  width: number;
  label: string;
  slot?: boolean;
  formatter?: ({ row, cell }: { row: any; cell: string }) => string | any;
}
interface StoreData {
  id: string;
  name: string;
  account: string;
  shelveOrder: string;
  shelveAuth: string;
  fulfillmentOrder: string;
  fulfillmentAuth: string;
}

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const registerScrollCallback =
  inject<(id: string, fn: () => void) => void>(ScrollCallBackSymbol);

const showDialog = ref(false);

const data = ref<StoreData[]>([]);

const getData = async () => {
  console.log("start getData");
  const newData = await new Promise<StoreData[]>((resolve, reject) => {
    setTimeout(() => {
      const newData: StoreData[] = Array.from({ length: 20 }, (_, index) => ({
        id: String(index),
        name: "壳多多",
        account: "IJFI59194",
        shelveOrder: "2025-12-12 19:32:23",
        shelveAuth: "2025-12-12 19:32:23",
        fulfillmentOrder: "2025-12-12 19:32:23",
        fulfillmentAuth: "2025-12-12 19:32:23",
      }));
      resolve(newData);
    }, 1000);
  });
  console.log(newData.length);
  data.value.push(...newData);
};

const noMore = ref(false);

import.meta.client && getData();

onMounted(() => {
  registerScrollCallback && registerScrollCallback("dashboard-store", getData);
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

const tableData = ref<any[]>([
  {
    platform: "淘宝",
    interFee: "￥1200/年",
    payback: "￥1200",
    commission: "￥12/店铺",
    action: "",
  },
]);

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
//     name: "我的钱包",
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
  @apply inline-block border px-2 rounded-full py-[2px] -mt-2;
}
</style>
