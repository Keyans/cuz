<template>
  <div class="bg-white rounded-lg shadow p-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <div class="flex flex-col">
        <label class="text-sm text-gray-600 mb-1">电商平台：</label>
        <div class="relative">
          <select v-model="searchParams.platform"
            class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            @change="handlePlatformChange">
            <option value="">请选择</option>
            <option v-for="platform in platformList" :value="platform.thirdPartyPlatformType"
              :key="platform.thirdPartyPlatformType">
              {{ platform.thirdPartyPlatformName }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="text-sm text-gray-600 mb-1">店铺名称：</label>
        <input v-model="searchParams.name" type="text" placeholder="请输入店铺名称"
          class="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div class="flex flex-col">
        <label class="text-sm text-gray-600 mb-1">店铺账号：</label>
        <input v-model="searchParams.account" type="text" placeholder="请输入店铺账号"
          class="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div class="flex flex-col">
        <label class="text-sm text-gray-600 mb-1">接口类型：</label>
        <div class="relative">
          <select v-model="searchParams.type"
            class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
            <option value="">请选择</option>
            <option v-for="item in typesList" :key="item.authAppType" :value="item.authAppType">
              {{ item.authAppDesc }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="text-sm text-gray-600 mb-1">订购状态：</label>
        <div class="relative">
          <select v-model="searchParams.orderStatus"
            class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
            <option value="0">请选择</option>
            <option v-for="item in orderStatusList" :key="item.id" :value="item.value">
              {{ item.name }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="text-sm text-gray-600 mb-1">授权状态：</label>
        <div class="relative">
          <select v-model="searchParams.authStatus"
            class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
            <option value="0">请选择</option>
            <option v-for="item in authStatusList" :key="item.id" :value="item.value">
              {{ item.name }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div></div>
      <div class="flex items-end space-x-4">
        <button @click="searchOrders"
          class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex-1 flex justify-center items-center">
          搜索
        </button>
        <button @click="resetSearch"
          class="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors flex-1 flex justify-center items-center">
          重置
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  platformList: { // 平台列表
    type: Array<any>,
    default: () => []
  }
})

const emits = defineEmits([
  'searchOrders', // 搜索订单
  'resetSearch', // 重置搜索
])

const searchParams = reactive({
  platform: '', // 平台
  name: '', // 店铺名称
  account: '', // 店铺账号
  type: '', // 接口类型
  orderStatus: 0, // 订单状态
  authStatus: 0 // 授权状态
})

// 筛选条件
const typesList = ref<Array<any>>([]) // 接口类型列表
const orderStatusList = ref<Array<any>>([
  { id: 1, name: '正常', value: 1 },
  { id: 2, name: '异常', value: 2 },
]) // 订单状态列表
const authStatusList = ref<Array<any>>([
  { id: 1, name: '正常', value: 1 },
  { id: 2, name: '异常', value: 2 },
]) // 授权状态列表


// 平台改变
const handlePlatformChange = (e: any) => {
  const value = e.target.value;
  const item = props.platformList.find((item) => item.thirdPartyPlatformType == value)
  if (item) {
    typesList.value = item.appList;
  } else {
    typesList.value = [];
  }
}

const searchOrders = () => {
  // 处理一下搜索参数
  let paramsObj: any = {
    // platformType: searchParams.platform, // 平台 string
    // appType: searchParams.type, // 接口类型 string 接口类型，枚举值：PUBLISH：商品上架，ORDER：订单
    // thirdPartyShopName: "", // 店铺名称 string 店铺名称，模糊查询
    // thirdPartyShopAccount: "", // 店铺账号 string 店铺账号，模糊查询
    // bookingStatus: false, // 订购状态 boolean 订单状态，true：已订购，false：未订购
    // authStatus: false, // 授权状态 boolean 授权状态，true：已授权，false：未授权
  }

  if (searchParams.platform) {
    paramsObj.platformType = searchParams.platform; // 平台 string 
  }

  if(searchParams.type) {
    paramsObj.appType = searchParams.type; // 接口类型 string 接口类型，枚举值：PUBLISH：商品上架，ORDER：订单
  }

  if(searchParams.name) {
    paramsObj.thirdPartyShopName = searchParams.name; // 店铺名称 string 店铺名称，模糊查询 
  }

  if(searchParams.account) {
    paramsObj.thirdPartyShopAccount = searchParams.account; // 店铺账号 string 店铺账号，模糊查询 
  }

  if(searchParams.orderStatus && searchParams.orderStatus != 0) {
    paramsObj.bookingStatus = searchParams.orderStatus == 1 ? true : false; // 订购状态 boolean 订单状态，true：已订购，false：未订购 
  }

  if(searchParams.authStatus && searchParams.authStatus!= 0) {
    paramsObj.authStatus = searchParams.authStatus == 1? true : false; // 授权状态 boolean 授权状态，true：已授权，false：未授权 
  }

  console.log('searchParams', paramsObj)
  emits('searchOrders', paramsObj);
}

// 重置搜索
const resetSearch = () => {
  searchParams.platform = '';
  searchParams.name = '';
  searchParams.account = '';
  searchParams.type = '';
  searchParams.orderStatus = 0;
  searchParams.authStatus = 0;
  typesList.value = [];

  emits('resetSearch');
}


</script>