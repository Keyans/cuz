<template>
  <div class="container mx-auto py-6">
    <!-- 引入售后申请弹窗 -->
    <AfterSaleDialog
      v-model:show="showAfterSaleDialog"
      :order-number="currentOrderNumber"
      @submit="handleAfterSaleSubmit"
    />

    <!-- 引入下载订单弹窗 -->
    <DownloadOrderDialog
      v-model:show="showDownloadDialog"
      :shops="shops"
      @submit="handleDownloadSubmit"
    />

    <!-- 引入拆分订单弹窗 -->
    <SplitOrderDialog
      v-model:show="showSplitOrderDialog"
      :products="currentOrderProducts"
      @confirm="handleSplitOrderConfirm"
    />

    <!-- 批量推送弹窗 -->
    <BatchPushDialog
      v-model:show="showBatchPushDialog"
      @stop="handleStopPush"
    />

    <!-- 标签页 -->
    <div class="flex border-b border-gray-200 mb-6">
      <button 
        class="px-6 py-3 relative"
        :class="activeTab === 'other' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'"
        @click="switchTab('other')"
      >
        其他订单
        <span class="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">2114</span>
        </button>
      <button 
        class="px-6 py-3" 
        :class="activeTab === 'purchase' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'"
        @click="switchTab('purchase')"
      >
        采购订单
      </button>
    </div>

    <!-- 搜索过滤区域 -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">订单号：</label>
          <input 
            v-model="searchParams.orderNumber"
            type="text" 
            placeholder="支持多单号查询，中英文逗号、斜杠、空格分隔" 
            class="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">平台：</label>
          <div class="relative">
            <select 
              v-model="searchParams.platform"
              class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">请选择</option>
              <option v-for="platform in platforms" :key="platform.id" :value="platform.id">{{ platform.name }}</option>
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
          <div class="relative">
            <select 
              v-model="searchParams.shop"
              class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">请选择</option>
              <option v-for="shop in shops" :key="shop.id" :value="shop.id">{{ shop.name }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
        </div>
      </div>
    </div>

        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">物流类型：</label>
          <input 
            v-model="searchParams.logisticsType"
            type="text" 
            placeholder="请输入" 
            class="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">物流单号：</label>
          <input 
            v-model="searchParams.trackingNumber"
            type="text" 
            placeholder="支持多单号查询，中英文逗号、斜杠、空格分隔" 
            class="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">时间类型：</label>
          <div class="relative">
            <select 
              v-model="searchParams.timeType"
              class="form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">请选择</option>
              <option value="order">下单时间</option>
              <option value="payment">支付时间</option>
              <option value="shipping">发货时间</option>
              <option value="latestShip">最晚发货时间</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="text-sm text-gray-600 mb-1">时间范围：</label>
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

    <!-- 操作按钮区域 -->
    <div class="flex justify-between mb-6">
      <!-- 其他订单的按钮 -->
      <template v-if="activeTab === 'other'">
        <div class="space-x-3">
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            :disabled="selectedOrdersCount === 0"
            :class="{'opacity-50 cursor-not-allowed': selectedOrdersCount === 0}"
            @click="handleBatchPush"
          >
            批量推送 <span v-if="selectedOrdersCount > 0">({{ selectedOrdersCount }})</span>
          </button>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            转外部订单
          </button>
        </div>
        <button 
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          @click="downloadSelectedOrders"
          :disabled="selectedOrdersCount === 0"
          :class="{'opacity-50 cursor-not-allowed': selectedOrdersCount === 0}"
        >
          下载订单 <span v-if="selectedOrdersCount > 0">({{ selectedOrdersCount }})</span>
        </button>
      </template>
      
      <!-- 采购订单的按钮 -->
      <template v-else>
        <div class="flex justify-end w-full">
          <!-- 移除下载订单按钮 -->
        </div>
      </template>
    </div>

    <!-- 订单状态标签 -->
    <div class="overflow-x-auto mb-6">
      <div class="flex border-b border-gray-200 min-w-max">
        <button 
          v-for="status in currentStatusOptions" 
          :key="status.id"
          @click="changeStatus(status.id)"
          :class="[
            'px-6 py-3',
            activeStatus === status.id ? 'text-blue-600 border-b-2 border-blue-500 font-medium' : 'text-gray-500'
          ]"
        >
          {{ status.name }} 
          <span v-if="status.count" class="text-xs ml-1">({{ status.count }})</span>
        </button>
      </div>
    </div>

    <!-- 订单列表 - 表格 -->
    <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    class="h-4 w-4 border-gray-300 rounded cursor-pointer"
                    :checked="allOrdersSelected"
                    @change="selectAllOrders"
                  >
                </div>
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              订单信息
            </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="toggleTimeSort">
                时间
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                收货信息
            </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                发货信息
            </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              订单状态
            </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="filteredOrders.length > 0">
              <template v-for="(order, index) in filteredOrders" :key="order.id">
                <!-- 订单行 -->
                <tr class="hover:bg-gray-50">
                  <td class="px-3 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      class="h-4 w-4 border-gray-300 rounded cursor-pointer"
                      :checked="selectedOrders[order.id]"
                      @change="toggleOrderSelection(order.id)"
                    >
                  </td>
                  <td class="px-3 py-4">
                    <div class="flex items-start">
                      <img class="h-10 w-10 rounded-md object-cover mr-3" src="https://via.placeholder.com/100" alt="" />
                      <div>
                        <div class="flex items-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.172 9l1.414-1.414a4 4 0 015.656 0L13.828 9H5.172z" clip-rule="evenodd" />
                          </svg>
                          {{ order.shopName }}
                </div>
                        <div class="text-gray-500 text-sm">{{ order.orderNumber }}</div>
                        <button 
                          @click="toggleOrderDetails(index)"
                          class="mt-2 text-blue-600 text-sm inline-flex items-center px-3 py-1 border border-blue-500 rounded-md"
                        >
                          <span v-if="expandedOrders[index]">收起</span>
                          <span v-else>展开</span>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-4 w-4 ml-1" 
                            :class="{ 'transform rotate-180': expandedOrders[index] }"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                </div>
              </div>
            </td>
                  <td class="px-3 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">下单时间：{{ order.orderTime }}</div>
                    <div class="text-sm text-gray-500">支付时间：{{ order.paymentTime }}</div>
                    <div class="text-sm text-gray-500">最晚发货时间：{{ order.latestShipTime }}</div>
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">收货人：{{ order.receiver }}</div>
                    <div class="text-sm text-gray-500">收货地址：{{ order.address }}</div>
            </td>
                  <td class="px-3 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">物流类型：{{ order.logisticsType }}</div>
                    <div class="text-sm text-gray-500">物流单号：{{ order.trackingNumber }}</div>
            </td>
                  <td class="px-3 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-sm rounded-md" :class="order.statusClass ? order.statusClass : 'text-blue-800 bg-blue-100'">
                      {{ order.status }}
              </span>
            </td>
                  <td class="px-3 py-4 whitespace-nowrap">
                    <div class="space-x-2">
                      <button 
                        @click="openAfterSaleDialog(order.orderNumber)"
                        class="text-sm text-blue-600 hover:text-blue-800"
                      >
                        申请退款
                      </button>
                      <button 
                        @click="openSplitOrderDialog(order)"
                        class="text-sm text-blue-600 hover:text-blue-800"
                      >
                        拆分订单
                      </button>
                      <button 
                        class="text-sm text-blue-600 hover:text-blue-800"
                      >
                        转外部订单
                      </button>
                      <nuxt-link :to="`/dashboard/order/${order.id}`" class="text-sm text-blue-600 hover:text-blue-800">
                        查看详情
                      </nuxt-link>
              </div>
            </td>
          </tr>
                
                <!-- 展开的商品信息 -->
                <tr v-if="expandedOrders[index]">
                  <td colspan="7" class="p-0">
                    <div class="border-t border-gray-200">
                      <!-- 商品信息头部 -->
                      <div class="bg-gray-50 px-3 py-2">
                        <div class="text-sm text-gray-700 font-medium">原商品信息</div>
                      </div>
                      
                      <!-- 商品表头 -->
                      <div class="grid grid-cols-6 bg-white border-b border-gray-200 text-xs text-gray-500 uppercase px-3 py-2">
                        <div>原商品信息</div>
                        <div>数量/单价</div>
                        <div>平台商品信息</div>
                        <div>数量/单价</div>
                        <div>金额</div>
                        <div>商品状态</div>
    </div>

                      <!-- 商品列表 -->
                      <div v-for="product in order.products" :key="product.id" class="grid grid-cols-6 bg-white hover:bg-gray-50 px-3 py-4 border-b border-gray-200">
                        <div class="flex">
                          <img class="h-16 w-16 rounded-md object-cover mr-3" src="https://via.placeholder.com/100" alt="" />
                          <div>
                            <div class="text-sm text-gray-900">{{ product.name }}</div>
                            <div class="text-sm text-gray-500">规格：{{ product.spec }}</div>
          </div>
          </div>
                        <div class="whitespace-nowrap text-sm text-gray-500 flex items-center">
                          *{{ product.quantity }} / ¥ {{ product.price.toFixed(2) }}
        </div>
                        <div class="flex relative">
                          <img class="h-16 w-16 rounded-md object-cover mr-3" src="https://via.placeholder.com/100" alt="" />
            <div>
                            <div class="text-sm text-gray-900">{{ product.name }}</div>
                            <div class="text-sm text-gray-500">规格：{{ product.spec }}</div>
                          </div>
                          <div v-if="product.isExternal" class="absolute bottom-0 right-0">
                            <span class="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">外部</span>
                          </div>
                        </div>
                        <div class="whitespace-nowrap text-sm text-gray-500 flex items-center">
                          *{{ product.quantity }} / ¥ {{ product.price.toFixed(2) }}
                        </div>
                        <div class="whitespace-nowrap text-sm text-gray-500 flex items-center">
                          ¥ {{ product.totalAmount.toFixed(2) }}
            </div>
                        <div class="whitespace-nowrap flex items-center">
                          <button class="px-2 py-1 text-xs border border-blue-500 text-blue-500 rounded hover:bg-blue-50">
                            {{ product.status }}
                          </button>
            </div>
          </div>
        </div>
                  </td>
                </tr>
              </template>
            </template>
            <template v-else>
              <tr>
                <td colspan="7" class="px-3 py-8">
                  <div class="flex flex-col items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-lg">暂无数据</p>
                    <p class="text-sm mt-2">当前条件下没有找到相关订单</p>
        </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 分页 -->
    <div class="flex justify-center mt-6">
      <nav class="flex items-center space-x-2">
        <button class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button class="w-8 h-8 flex items-center justify-center rounded border border-blue-500 bg-blue-500 text-white">1</button>
        <button class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">2</button>
        <button class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">3</button>
        <button class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">4</button>
        <button class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">5</button>
        <button class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import AfterSaleDialog from '~/components/common/AfterSaleDialog.vue'
import DownloadOrderDialog from '~/components/common/DownloadOrderDialog.vue'
import BatchPushDialog from '@/components/common/BatchPushDialog.vue'
import SplitOrderDialog from '@/components/common/SplitOrderDialog.vue'

// 页面元数据
    definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
    })

// 弹窗显示状态
const showSplitOrderDialog = ref(false)

// 当前操作的订单号和商品
const currentOrderNumber = ref('')
const currentOrderProducts = ref([])

// 顶部标签切换
const activeTab = ref('other') // 'purchase' 或 'other'

// 打开拆分订单弹窗
const openSplitOrderDialog = (order) => {
  currentOrderProducts.value = order.products
  showSplitOrderDialog.value = true
}

// 处理拆分订单确认
const handleSplitOrderConfirm = (subOrders) => {
  // TODO: 调用API处理订单拆分
  console.log('拆分订单：', subOrders)
}

// 平台数据
const platforms = ref([
  { id: 'taobao', name: '淘宝' },
  { id: 'jd', name: '京东' },
  { id: 'pdd', name: '拼多多' },
  { id: 'tmall', name: '天猫' }
])

// 店铺数据
const shops = ref([
  { id: 'shop1', name: '淘手机壳的店' },
  { id: 'shop2', name: '京东旗舰店' },
  { id: 'shop3', name: '拼多多专卖店' }
])

// 采购订单状态选项
const purchaseOrderStatuses = ref([
  { id: 'all', name: '全部' },
  { id: 'pending_push', name: '待推送', count: 5 },
  { id: 'pending_shipment', name: '待发货', count: 10 },
  { id: 'collecting', name: '集后中', count: 3 },
  { id: 'completed', name: '已完成', count: 128 },
  { id: 'closed', name: '已关闭', count: 2 },
  { id: 'external', name: '外部订单', count: 15 }
])

// 其他订单状态选项
const otherOrderStatuses = ref([
  { id: 'all', name: '全部' },
  { id: 'pending_review', name: '待审核', count: 8 },
  { id: 'pending_payment', name: '待付款', count: 15 },
  { id: 'processing', name: '处理中', count: 7 },
  { id: 'shipped', name: '已发货', count: 56 },
  { id: 'refunding', name: '退款中', count: 4 }
])

// 根据当前激活标签获取对应的状态选项
const currentStatusOptions = computed(() => {
  return activeTab.value === 'purchase' ? purchaseOrderStatuses.value : otherOrderStatuses.value
})

// 当前选中的状态
const activeStatus = ref('collecting')

// 订单数据
const orders = ref([
  {
    id: 1,
    shopName: '淘手机壳的店',
    orderNumber: 'CY20250432xxxx',
    orderTime: '2025-01-20 16:02:16',
    paymentTime: '2025-01-20 16:02:16',
    latestShipTime: '2025-01-20 16:02:16',
    receiver: 'xxx',
    address: 'xxxxxx',
    logisticsType: 'xx物流',
    trackingNumber: '234242153466',
    status: '待发货',
    statusId: 'pending_shipment',
    statusClass: 'text-blue-800 bg-blue-100',
    orderType: 'purchase', // 采购订单
    products: [
      {
        id: 1,
        name: '苹果系列胶手机壳',
        spec: '苹果11-白色',
        quantity: 3,
        price: 20.00,
        totalAmount: 60.00,
        status: '待发货'
      }
    ]
  },
  {
    id: 2,
    shopName: '淘手机壳的店',
    orderNumber: 'CY20250432xxxx',
    orderTime: '2025-01-20 16:02:16',
    paymentTime: '2025-01-20 16:02:16',
    latestShipTime: '2025-01-20 16:02:16',
    receiver: 'xxx',
    address: 'xxxxxx',
    logisticsType: 'xx物流',
    trackingNumber: '234242153466',
    status: '集后中',
    statusId: 'collecting',
    statusClass: 'text-pink-800 bg-pink-100',
    orderType: 'purchase', // 采购订单
    products: [
      {
        id: 2,
        name: '苹果系列胶手机壳',
        spec: '苹果11-白色',
        quantity: 3,
        price: 20.00,
        totalAmount: 60.00,
        status: '待发货'
      },
      {
        id: 3,
        name: '苹果系列胶手机壳',
        spec: '苹果11-白色',
        quantity: 7,
        price: 20.00,
        totalAmount: 60.00,
        status: '待发货',
        isExternal: true
      }
    ]
  },
  {
    id: 3,
    shopName: '京东旗舰店',
    orderNumber: 'JD20250433xxxx',
    orderTime: '2025-01-19 15:22:10',
    paymentTime: '2025-01-19 15:30:45',
    latestShipTime: '2025-01-22 15:30:45',
    receiver: 'yyy',
    address: 'yyyyyy',
    logisticsType: 'yy物流',
    trackingNumber: '987654321',
    status: '待审核',
    statusId: 'pending_review',
    statusClass: 'text-yellow-800 bg-yellow-100',
    orderType: 'other', // 其他订单
    products: [
      {
        id: 4,
        name: '华为系列手机壳',
        spec: 'P40-黑色',
        quantity: 2,
        price: 25.00,
        totalAmount: 50.00,
        status: '待审核'
      }
    ]
  }
])

// 时间排序
const timeSort = ref('desc') // 'asc' 或 'desc'
const toggleTimeSort = () => {
  timeSort.value = timeSort.value === 'asc' ? 'desc' : 'asc'
  
  // 根据时间排序
  filteredOrders.value.sort((a, b) => {
    const dateA = new Date(a.orderTime)
    const dateB = new Date(b.orderTime)
    return timeSort.value === 'asc' ? dateA - dateB : dateB - dateA
  })
}

// 过滤订单
const filteredOrders = computed(() => {
  let result = orders.value.filter(order => {
    // 根据订单类型过滤
    if (order.orderType !== activeTab.value) {
      return false
    }
    
    // 根据状态过滤
    if (activeStatus.value !== 'all' && order.statusId !== activeStatus.value) {
      return false
    }
    
    // 根据搜索条件过滤
    if (searchParams.orderNumber && !order.orderNumber.includes(searchParams.orderNumber)) {
      return false
    }
    
    if (searchParams.platform && order.platform !== searchParams.platform) {
      return false
    }
    
    if (searchParams.shop && order.shopName !== searchParams.shop) {
      return false
    }
    
    if (searchParams.logisticsType && !order.logisticsType.includes(searchParams.logisticsType)) {
      return false
    }
    
    if (searchParams.trackingNumber && !order.trackingNumber.includes(searchParams.trackingNumber)) {
      return false
    }
    
    // 时间范围过滤
    if (searchParams.startTime && searchParams.endTime) {
      const timeField = searchParams.timeType === 'order' ? 'orderTime' :
                        searchParams.timeType === 'payment' ? 'paymentTime' :
                        searchParams.timeType === 'shipping' ? 'shippingTime' : 'latestShipTime'
                        
      const orderDate = new Date(order[timeField])
      const startDate = new Date(searchParams.startTime)
      const endDate = new Date(searchParams.endTime)
      endDate.setHours(23, 59, 59) // 设置结束时间为当天的结束
      
      if (orderDate < startDate || orderDate > endDate) {
        return false
      }
    }
    
    return true
  })
  
  // 排序
  if (timeSort.value === 'asc') {
    result.sort((a, b) => new Date(a.orderTime) - new Date(b.orderTime))
  } else {
    result.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime))
  }
  
  return result
})

// 控制每个订单的展开状态
const expandedOrders = ref({})

// 初始化第一个订单为展开状态以展示效果
onMounted(() => {
  expandedOrders.value[0] = true
})

// 切换订单详情显示
const toggleOrderDetails = (index) => {
  expandedOrders.value[index] = !expandedOrders.value[index]
}

// 订单选择相关
const selectedOrders = ref({})

// 选择或取消选择单个订单
const toggleOrderSelection = (orderId) => {
  selectedOrders.value[orderId] = !selectedOrders.value[orderId]
}

// 计算选中的订单数量
const selectedOrdersCount = computed(() => {
  return Object.values(selectedOrders.value).filter(value => value).length
})

// 判断是否全选
const allOrdersSelected = computed(() => {
  return filteredOrders.value.length > 0 && filteredOrders.value.every(order => selectedOrders.value[order.id])
})

// 全选或取消全选
const selectAllOrders = () => {
  const newState = !allOrdersSelected.value
  filteredOrders.value.forEach(order => {
    selectedOrders.value[order.id] = newState
  })
}

// 下载订单弹窗相关
const showDownloadDialog = ref(false)

// 修改下载订单方法
const downloadSelectedOrders = () => {
  if (selectedOrdersCount.value === 0) {
    toast.warning('请先选择要下载的订单')
    return
  }
  showDownloadDialog.value = true
}

// 处理下载订单提交
const handleDownloadSubmit = (formData) => {
  console.log('下载订单:', formData)
  // 这里添加实际的下载订单逻辑
  if (formData.downloadType === 'time') {
    console.log('按时间下载:', {
      shop: formData.shop,
      startTime: formData.startTime,
      endTime: formData.endTime
    })
  } else {
    console.log('按订单号下载:', formData.orderNumbers)
  }
  toast.success('订单下载请求已提交')
}

// 切换标签
const switchTab = (tab) => {
  activeTab.value = tab
  activeStatus.value = 'all' // 切换标签时重置状态选项
  resetSearch() // 重置搜索参数
}

// 搜索参数
const searchParams = reactive({
  orderNumber: '',
  platform: '',
  shop: '',
  logisticsType: '',
  trackingNumber: '',
  timeType: '',
  startTime: '',
  endTime: ''
})

// 搜索订单
const searchOrders = () => {
  console.log('搜索参数:', searchParams)
  // filteredOrders computed属性会根据搜索参数自动更新
}

// 重置搜索
const resetSearch = () => {
  Object.keys(searchParams).forEach(key => {
    searchParams[key] = ''
  })
  searchOrders() // 重置后触发搜索
}

// 切换订单状态
const changeStatus = (status) => {
  activeStatus.value = status
  // filteredOrders computed属性会根据状态自动更新
}

// 售后申请弹窗相关
const showAfterSaleDialog = ref(false)

const openAfterSaleDialog = (orderNumber) => {
  currentOrderNumber.value = orderNumber
  showAfterSaleDialog.value = true
}

const handleAfterSaleSubmit = (formData) => {
  console.log('售后申请提交:', formData)
  // 这里添加实际的售后申请提交逻辑
  toast.success('售后申请提交成功')
}

// 批量推送弹窗控制
const showBatchPushDialog = ref(false)

// 处理批量推送
const handleBatchPush = () => {
  showBatchPushDialog.value = true
}

// 处理停止推送
const handleStopPush = () => {
  // 处理停止推送的逻辑
  console.log('停止推送')
}
</script>

<style scoped>
/* 确保输入框边框样式 */
input, textarea, select {
  @apply border border-gray-300 rounded-md;
}

/* 聚焦时的输入框样式 */
input:focus, textarea:focus, select:focus {
  @apply outline-none ring-2 ring-blue-500 border-blue-500;
}

/* 时间列可排序的样式 */
th.cursor-pointer {
  cursor: pointer;
}
th.cursor-pointer:hover {
  background-color: #f3f4f6;
}
</style>