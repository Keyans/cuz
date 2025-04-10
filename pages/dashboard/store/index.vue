<template>
  <div class="px-4 py-4 sm:py-6 flex flex-col h-full absolute left-0 right-0">
    <div class="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
      <h1 class="text-lg sm:text-xl lg:text-2xl font-bold">我的店铺</h1>

      <button class="btn-primary w-fit flex items-center" @click="showAddShop">
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
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">电商平台：</label>
          <div class="relative">
            <select
              v-model="searchParams.platform"
              class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">请选择</option>
              <option
                v-for="platform in selections.platforms"
                :key="platform.id"
                :value="platform.id"
              >
                {{ platform.name }}
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

        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">店铺名称：</label>
          <input
            v-model="searchParams.name"
            type="text"
            placeholder="请输入店铺名称"
            class="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">店铺账号：</label>
          <input
            v-model="searchParams.name"
            type="text"
            placeholder="请输入店铺名称"
            class="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">接口类型：</label>
          <div class="relative">
            <select
              v-model="searchParams.type"
              class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">请选择</option>
              <option
                v-for="type in selections.types"
                :key="type.id"
                :value="type.id"
              >
                {{ type.name }}
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

        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">订购状态：</label>
          <div class="relative">
            <select
              v-model="searchParams.orderStatus"
              class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">请选择</option>
              <option
                v-for="status in selections.orderStatuses"
                :key="status.id"
                :value="status.id"
              >
                {{ status.name }}
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

        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">授权状态：</label>
          <div class="relative">
            <select
              v-model="searchParams.authStatus"
              class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">请选择</option>
              <option
                v-for="status in selections.authStatuses"
                :key="status.id"
                :value="status.id"
              >
                {{ status.name }}
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

        <div></div>
        <div class="flex items-end space-x-4">
          <button
            @click="searchOrders"
            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex-1 flex justify-center items-center"
          >
            搜索
          </button>
          <button
            @click="resetSearch"
            class="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors flex-1 flex justify-center items-center"
          >
            重置
          </button>
        </div>
      </div>
    </div>

    <div class="flex-grow space-y-4">
      <div
        v-for="item in data"
        :key="item.id"
        class="h-[124px] shadow border relative border-[#DCDFE6] rounded-md p-6 flex items-center"
      >
        <img
          :src="item.icon"
          width="32px"
          height="32px"
          class="mr-5 rounded-lg"
        />

        <div class="flex flex-col space-y-1 mr-[90px]">
          <div class="font-semibold">{{ item.name }}</div>
          <div class="text-[14px] text-[#909399]">
            店铺账号：{{ item.account }}
          </div>
        </div>

        <div
          class="flex flex-col space-y-2 mr-[90px]"
          v-for="iitem in [
            {
              name: '商品上架',
              orderProp: 'shelveOrder',
              authProp: 'shelveAuth',
            },
            {
              name: '订单履约',
              orderProp: 'shelveOrder',
              authProp: 'shelveAuth',
            },
          ]"
        >
          <div class="text-[14px]">{{ iitem.name }}</div>
          <div
            class="text-[12px] text-[#606266]"
            v-for="blockText in ['订购到期时间', '授权到期时间']"
          >
            {{ blockText + " " + (item as any)[iitem.orderProp] }}
            <div
              :class="['tag', calExpired((item as any)[iitem.orderProp])?'border-red-400 text-red-400': 'border-green-400 text-green-400']"
            >
              {{ calExpired((item as any)[iitem.orderProp]) ? "异常" : "正常" }}
            </div>
          </div>
        </div>

        <div class="absolute right-6 flex space-x-4">
          <button class="btn-plain">续订</button>
          <button class="btn-plain text-red-400" @click="delShop(item.id)">
            删除
          </button>
        </div>
      </div>

      <div class="w-full flex justify-center" v-if="!noMore">
        <Loading class="scale-50" height="50px" width="50px"></Loading>
      </div>
    </div>

    <el-dialog v-model="showDialog" title="新增店铺" width="500">
      <div class="flex flex-col">
        <el-form>
          <el-form-item label="电商平台" label-width="80">
            <el-select v-model="newShop.platform"></el-select>
          </el-form-item>

          <el-form-item label="接口类型" label-width="80">
            <el-select v-model="newShop.type"></el-select>
          </el-form-item>

          <el-form-item label="授权码" v-if="newShop.showCode" label-width="80">
            <el-input v-model="newShop.code"></el-input>
          </el-form-item>
        </el-form>

        <div class="w-full flex justify-end space-x-4">
          <button class="" @click="showDialog = false">取消</button>
          <button class="btn-secondary" @click="addShop">确认</button>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="showDelShop" title="删除" width="400">
      <div>
        删除后无法恢复，请谨慎操作。
        <div class="w-full flex justify-end space-x-4">
          <button class="" @click="showDialog = false">取消</button>
          <button class="btn-secondary bg-red-400" @click="addShop">
            删除
          </button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { Loading } from "~/components/ui/loading";
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
  icon: string;
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
const showDelShop = ref(false);
const calExpired = (date: string) => {
  if (dayjs(date).isAfter(dayjs())) return false;
  else return true;
};

const searchParams = ref({
  platform: "",
  name: "",
  account: "",
  type: "",
  orderStatus: "",
  authStatus: "",
});
const selections = ref({
  platforms: [{ id: "1", name: "淘宝" }],
  types: [{ id: "1", name: "类型" }],
  orderStatuses: [{ id: "12", name: "状态" }],
  authStatuses: [{ id: "12", name: "状态" }],
});

const data = ref<StoreData[]>([]);

const getData = async () => {
  console.log("start getData");
  const newData = await new Promise<StoreData[]>((resolve, reject) => {
    setTimeout(() => {
      const newData: StoreData[] = Array.from({ length: 20 }, (_, index) => ({
        id: String(index),
        name: "壳多多",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpvT3wFzfnw3ZLGM6OFq7IfiK7XZElLdZV8Q&s",
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

const searchOrders = () => {
  data.value = [];
  noMore.value = false;
  getData();
};

const noMore = ref(false);

const newShop = ref({
  platform: "",
  type: "",
  code: "",
  showCode: true,
});
const showAddShop = () => {
  newShop.value.platform = "";
  newShop.value.type = "";
  newShop.value.code = "";
  newShop.value.showCode = true;
  showDialog.value = true;
};
const addShop = () => {
  showDialog.value = false;
};
const delShop = (id: string) => {
  showDelShop.value = true;
};
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
  @apply inline-block border px-2 rounded-full py-[2px] -mt-2;
}
</style>
