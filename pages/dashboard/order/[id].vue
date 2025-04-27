<template>
  <div class="container mx-auto py-6">
    <!-- 加载状态 -->
    <template v-if="pending">
      <div class="space-y-4">
        <!-- 面包屑骨架屏 -->
        <div class="flex items-center space-x-2">
          <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <!-- 标题骨架屏 -->
        <div class="flex justify-between items-center">
          <div class="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <!-- 内容区域骨架屏 -->
        <div class="bg-white rounded-lg shadow p-6 space-y-4">
          <div class="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div class="grid grid-cols-3 gap-4">
            <div class="h-20 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-20 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6 space-y-4">
          <div class="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div class="space-y-4">
            <div class="h-24 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </template>

    <!-- 错误状态 -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[400px]">
      <div class="text-red-500 text-xl mb-4">{{ error.message || '获取订单详情失败' }}</div>
      <button @click="refreshData" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        重试
      </button>
    </div>

    <!-- 订单详情内容 -->
    <template v-else>
      <!-- 面包屑导航 -->
      <Breadcrumb :items="breadcrumbItems" />

      <!-- 订单编号和状态 -->
      <div class="flex justify-between mb-6">
        <h1 class="text-2xl font-bold">{{ orderDetail.orderNumber }}</h1>
        <div>
          <button class="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
            {{ orderDetail.status }}
          </button>
        </div>
      </div>

      <!-- 订单信息 -->
      <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div class="border-b border-gray-200">
          <h2 class="text-lg font-medium p-4 bg-blue-50 text-blue-600">
            订单信息
          </h2>
        </div>

        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div class="flex items-center mb-4">
                <div class="w-24 flex items-center">
                  <img src="https://via.placeholder.com/32" alt="店铺图标" class="h-8 w-8 mr-2" />
                </div>
                <div>
                  <div class="text-sm font-medium whitespace-nowrap">平台店铺：</div>
                  <div class="text-gray-600 whitespace-nowrap">{{ orderDetail.shopName }}</div>
                </div>
              </div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">商家型号：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.merchantCode }}</div>
              </div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">收货人：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.receiver }}</div>
              </div>
              <div class="flex items-center">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">备注：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.note }}</div>
              </div>
            </div>

            <div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">订单号：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.orderNumber }}</div>
              </div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">下单时间：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.orderTime }}</div>
              </div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">支付时间：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.paymentTime }}</div>
              </div>
            </div>

            <div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">订单类型：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.orderType }}</div>
              </div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">收货电话：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.phone }}</div>
              </div>
              <div class="flex items-center">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">收货地址：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.address }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div class="border-b border-gray-200">
          <h2 class="text-lg font-medium p-4 bg-blue-50 text-blue-600">
            商品信息
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  原商品信息
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  数量/单价
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  平台商品信息
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  数量/单价
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金额
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in orderDetail.products" :key="product.id">
                <td class="px-4 py-4">
                  <div class="flex">
                    <img class="h-16 w-16 rounded-md object-cover mr-3" :src="product.image" alt="" />
                    <div>
                      <div class="text-sm text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">规格：{{ product.spec }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  *{{ product.quantity }} / ¥ {{ product.price.toFixed(2) }}
                </td>
                <td class="px-4 py-4">
                  <div class="flex">
                    <img class="h-16 w-16 rounded-md object-cover mr-3" :src="product.image" alt="" />
                    <div>
                      <div class="text-sm text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">规格：{{ product.spec }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  *{{ product.quantity }} / ¥ {{ product.price.toFixed(2) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  ¥ {{ product.totalAmount.toFixed(2) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-gray-50">
                <td colspan="4" class="px-4 py-3 text-right text-sm font-medium text-gray-900">
                  订单金额： 
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 font-bold">
                  ¥ {{ orderDetail.totalAmount.toFixed(2) }}
                </td>
              </tr>
              <tr class="bg-gray-50">
                <td colspan="4" class="px-4 py-3 text-right text-sm font-medium text-gray-900">
                  实付金额：
                </td>
                <td class="px-4 py-3 text-sm text-red-600 font-bold">
                  ¥ {{ orderDetail.paidAmount.toFixed(2) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- 物流信息 -->
      <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div class="border-b border-gray-200">
          <h2 class="text-lg font-medium p-4 bg-blue-50 text-blue-600">
            物流信息
          </h2>
        </div>

        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">物流类型：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.logisticsType }}</div>
              </div>
            </div>
            <div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">物流单号：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.trackingNumber }}</div>
              </div>
            </div>
            <div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">承诺发货时间：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ orderDetail.shippingPromise }}</div>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <div class="flex items-center mb-2">
              <div class="w-24 text-sm text-gray-500 whitespace-nowrap">物流单查询：</div>
              <div class="text-blue-500 hover:underline whitespace-nowrap">
                <a :href="orderDetail.trackingUrl" target="_blank">{{ orderDetail.trackingUrl }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 售后信息 -->
      <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div class="border-b border-gray-200">
          <h2 class="text-lg font-medium p-4 bg-blue-50 text-blue-600 flex justify-between items-center">
            <span>售后信息</span>
            <span v-if="afterSalesCount > 0" class="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full">{{ afterSalesCount }}</span>
          </h2>
        </div>

        <div class="p-4">
          <template v-if="hasAfterSales">
            <!-- 渲染每一个售后记录 -->
            <div v-for="(afterSale, index) in orderDetail.afterSales" :key="afterSale.id" 
                 :class="{'mb-6 border-b border-gray-200 pb-6': index < orderDetail.afterSales.length - 1}">
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">售后单号：</div>
                <div class="text-gray-700 mr-4 whitespace-nowrap">{{ afterSale.afterSaleNumber }}</div>
                <div class="text-xs px-2 py-1 rounded-full"
                     :class="{
                       'bg-yellow-100 text-yellow-800': afterSale.status === '待审核',
                       'bg-green-100 text-green-800': afterSale.status === '已通过',
                       'bg-blue-100 text-blue-800': afterSale.status === '处理中',
                       'bg-gray-100 text-gray-800': afterSale.status === '已关闭'
                     }">
                  {{ afterSale.status }}
                </div>
              </div>
              <div class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">申请时间：</div>
                <div class="text-gray-700 whitespace-nowrap">{{ afterSale.applyTime }}</div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div class="flex items-center">
                  <div class="w-24 text-sm text-gray-500 whitespace-nowrap">申请原因：</div>
                  <div class="text-gray-700 whitespace-nowrap">{{ afterSale.reason }}</div>
                </div>
                <div class="flex items-center">
                  <div class="w-24 text-sm text-gray-500 whitespace-nowrap">退款金额：</div>
                  <div class="text-red-500 font-bold whitespace-nowrap">¥ {{ afterSale.refundAmount.toFixed(2) }}</div>
                </div>
              </div>
              <div v-if="afterSale.images && afterSale.images.length > 0" class="flex items-center mb-4">
                <div class="w-24 text-sm text-gray-500 whitespace-nowrap">图片凭证：</div>
                <div class="flex space-x-2">
                  <img v-for="(image, imgIndex) in afterSale.images" :key="imgIndex" 
                       :src="image" alt="凭证" 
                       class="h-16 w-16 object-cover rounded-md cursor-pointer" />
                </div>
              </div>
              <div class="flex justify-end space-x-3">
                <button @click="openAfterSaleDetail(afterSale.afterSaleNumber)" class="px-4 py-1.5 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors text-sm">
                  查看售后
                </button>
              </div>
            </div>
          </template>
          
          <div v-if="!hasAfterSales" class="p-8 flex flex-col items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-lg">暂无售后信息</p>
            <p class="text-sm mt-2">该订单尚未发起任何售后申请</p>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-center space-x-4 mt-8">
        <button @click="goBack" 
                class="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                :disabled="isLoading">
          返回
        </button>
        
        <button v-if="orderDetail?.status === '待付款'" 
                @click="handleOrderOperation('cancel')"
                class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                :disabled="isLoading">
          取消订单
        </button>
        
        <button v-if="orderDetail?.status === '待收货'" 
                @click="handleOrderOperation('confirm')"
                class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                :disabled="isLoading">
          确认收货
        </button>
        
        <button v-if="['已完成', '已收货'].includes(orderDetail?.status)" 
                @click="handleOrderOperation('refund')"
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                :disabled="isLoading">
          申请退款
        </button>
      </div>

      <!-- 售后详情弹窗 -->
      <AfterSaleDetailDialog 
        :is-open="isAfterSaleDialogOpen" 
        :after-sale-id="currentAfterSaleId"
        @close="closeAfterSaleDialog"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCustomToast } from '~/components/Toast.vue'
import Breadcrumb from '~/components/common/Breadcrumb.vue'
import AfterSaleDetailDialog from '~/components/common/AfterSaleDetailDialog.vue'

// 页面元数据
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

// 获取路由参数
const route = useRoute()
const router = useRouter()
const orderId = route.params.id
const source = ref(route.query.source || '') // 获取来源参数
const { toast } = useCustomToast()

// 面包屑导航数据
const breadcrumbItems = computed(() => {
  const baseItems = [
    { title: '我的订单', path: '/dashboard/order' }
  ]
  
  if (source.value === 'afterSales') {
    return [
      ...baseItems,
      { title: '售后管理', path: '/dashboard/order/afterSales' },
      { title: '订单详情' }
    ]
  } else {
    return [
      ...baseItems,
      { title: '订单中心', path: '/dashboard/order/center' },
      { title: '订单详情' }
    ]
  }
})

// 状态管理变量
const pending = ref(false)
const error = ref(null)
const isLoading = ref(false)
const orderDetail = ref({
  id: orderId,
  orderNumber: 'XS38833332',
  shopName: '卖手机壳的店',
  merchantCode: 'UQ2332',
  orderTime: '2025-01-20 16:02:16',
  paymentTime: '----',
  orderType: '其他订单',
  receiver: '小李',
  phone: '0754-4223455',
  address: '广东省深圳市宝安区',
  note: '这是备注信息',
  logisticsType: 'xxxx物流',
  trackingNumber: 'YT48473423423',
  shippingPromise: '48h发货',
  trackingUrl: 'https://www.17track.net/zh-cn',
  totalAmount: 270.00,
  paidAmount: 270.00,
  status: '售后中',
  products: [
    {
      id: 1,
      name: '苹果系列胶胶手机壳',
      spec: '苹果11-白色',
      quantity: 3,
      price: 20.00,
      totalAmount: 60.00,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      name: '苹果系列胶胶手机壳',
      spec: '苹果11-白色',
      quantity: 7,
      price: 20.00,
      totalAmount: 60.00,
      image: 'https://via.placeholder.com/100'
    }
  ],
  afterSales: [
    {
      id: 1,
      afterSaleNumber: 'SH394399484',
      applyTime: '2025-01-23 23:21:02',
      reason: '产品质量不符合预期，收到后发现有破损',
      refundAmount: 130.00,
      status: '待审核',
      images: [
        'https://via.placeholder.com/80',
        'https://via.placeholder.com/80'
      ]
    },
    {
      id: 2,
      afterSaleNumber: 'SH394399484',
      applyTime: '2025-01-23 23:21:02',
      reason: '产品与描述不符',
      refundAmount: 140.00,
      status: '已关闭',
      images: []
    }
  ]
})

// 使用计算属性来处理售后信息的显示逻辑
const hasAfterSales = computed(() => {
  return orderDetail.value.afterSales && orderDetail.value.afterSales.length > 0
})

const afterSalesCount = computed(() => {
  return orderDetail.value.afterSales ? orderDetail.value.afterSales.length : 0
})

// 售后详情弹窗状态
const isAfterSaleDialogOpen = ref(false)
const currentAfterSaleId = ref('')

// 打开售后详情弹窗
const openAfterSaleDetail = (afterSaleId) => {
  currentAfterSaleId.value = afterSaleId
  isAfterSaleDialogOpen.value = true
}

// 关闭售后详情弹窗
const closeAfterSaleDialog = () => {
  isAfterSaleDialogOpen.value = false
}

// API调用函数
const fetchOrderDetail = async () => {
  try {
    pending.value = true
    isLoading.value = true
    error.value = null
    
    // 实际项目中，应该使用真实API获取数据
    // 这里我们使用模拟数据，直接返回
    // const response = await $fetch(`/api/orders/${orderId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // })
    
    // orderDetail.value = response
    
    // 延迟一下，模拟API请求
    await new Promise(resolve => setTimeout(resolve, 500))
    
  } catch (err) {
    error.value = err
    toast.error('获取订单详情失败：' + (err.message || '未知错误'))
  } finally {
    pending.value = false
    isLoading.value = false
  }
}

// 刷新数据
const refreshData = () => {
  fetchOrderDetail()
}

// 订单操作函数
const handleOrderOperation = async (operation) => {
  try {
    isLoading.value = true
    
    // 延迟一下，模拟API请求
    await new Promise(resolve => setTimeout(resolve, 500))
    
    switch (operation) {
      case 'cancel':
        // await $fetch(`/api/orders/${orderId}/cancel`, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        toast.success('订单已取消')
        orderDetail.value.status = '已取消'
        break
        
      case 'confirm':
        // await $fetch(`/api/orders/${orderId}/confirm`, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        toast.success('订单已确认')
        orderDetail.value.status = '已完成'
        break
        
      case 'refund':
        router.push(`/dashboard/order/${orderId}/refund`)
        return
    }
    
  } catch (err) {
    toast.error('操作失败：' + (err.message || '未知错误'))
  } finally {
    isLoading.value = false
  }
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 初始化加载数据
onMounted(() => {
  fetchOrderDetail()
})
</script>

<style scoped>
/* 输入框和按钮样式 */
.form-input, .form-select {
  @apply border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors;
}

.btn-secondary {
  @apply bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors;
}
</style> 