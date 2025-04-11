<template>
  <div class="container mx-auto py-3 px-4">
    <!-- 面包屑导航 -->
    <Breadcrumb :items="breadcrumbItems" />
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <!-- 下单成功标题 -->
      <div class="flex flex-col items-center justify-center py-6 mb-6 border-b border-gray-200">
        <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">下单成功</h1>
        <p class="text-gray-600">您的订单已成功提交，订单号：{{ orderId }}</p>
      </div>
      
      <!-- 订单信息 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- 订单金额 -->
        <div class="p-4 border border-gray-200 rounded-lg">
          <h3 class="text-base font-medium text-gray-700 mb-3">订单金额</h3>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">应付金额</span>
            <span class="text-xl font-bold text-red-500">¥ {{ amount }}</span>
          </div>
        </div>
        
        <!-- 收货地址 -->
        <div class="p-4 border border-gray-200 rounded-lg">
          <h3 class="text-base font-medium text-gray-700 mb-3">收货信息</h3>
          <div v-if="address">
            <div class="flex items-center mb-2">
              <span class="font-medium mr-2">{{ address.name }}</span>
              <span class="text-gray-600">{{ address.phone }}</span>
            </div>
            <div class="text-gray-700">{{ address.fullAddress }}</div>
          </div>
        </div>
      </div>
      
      <!-- 支付方式选择 -->
      <div class="mb-8">
        <h3 class="text-base font-medium text-gray-700 mb-4">选择支付方式</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- 余额支付 -->
          <div 
            class="p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-500"
            :class="{'border-blue-500 bg-blue-50': paymentMethod === 'balance'}"
            @click="paymentMethod = 'balance'"
          >
            <div class="flex items-center">
              <div class="w-10 h-10 mr-3 flex items-center justify-center bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="font-medium">余额支付</p>
                <div class="flex items-center gap-2">
                  <p class="text-xs text-gray-500">可用余额：¥ 1000.00</p>
                  <button 
                    @click.stop="showRechargeDialog = true"
                    class="text-xs text-blue-600 hover:text-blue-700"
                  >
                    余额充值
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 其他支付 -->
          <div 
            class="p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-500"
            :class="{'border-blue-500 bg-blue-50': paymentMethod === 'other'}"
            @click="paymentMethod = 'other'"
          >
            <div class="flex items-center">
              <div class="w-10 h-10 mr-3 flex items-center justify-center bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <p class="font-medium">其他支付</p>
                <p class="text-xs text-gray-500">使用第三方支付平台</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 支付详情 (根据选择的支付方式展示不同内容) -->
      <div class="p-6 bg-gray-50 rounded-lg mb-6">
        <div v-if="paymentMethod === 'balance'" class="flex flex-col items-center">
          <div class="bg-blue-50 p-4 rounded-lg mb-4 w-full max-w-md">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">可用余额</span>
              <span class="font-medium">¥ 1000.00</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">应付金额</span>
              <span class="font-medium text-red-500">¥ {{ amount }}</span>
            </div>
            <div class="flex justify-between items-center pt-2 border-t border-gray-200">
              <span class="text-gray-600">支付后余额</span>
              <span class="font-medium">¥ {{ (1000 - parseFloat(amount)).toFixed(2) }}</span>
            </div>
          </div>
        </div>
        
        <div v-else-if="paymentMethod === 'other'" class="flex flex-col items-center">
          <div class="w-40 h-40 bg-white p-2 mb-4">
            <img src="/assets/payment/qrcode.svg" alt="支付二维码" class="w-full h-full" />
          </div>
          <p class="text-gray-600 mb-2">请使用微信或支付宝扫描二维码完成支付</p>
          <p class="text-sm text-gray-500">付款金额: <span class="text-red-500 font-medium">¥ {{ amount }}</span></p>
        </div>
        
        <div v-else class="text-center text-gray-500 py-8">
          请选择一种支付方式
        </div>
      </div>
      
      <!-- 底部按钮 -->
      <div class="flex justify-end items-center space-x-4">
        <button 
          class="px-10 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          @click="skipPayment"
        >
          暂不支付
        </button>
        <button 
          class="px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!paymentMethod"
          @click="processPayment"
        >
          确认支付
        </button>
      </div>
    </div>

    <!-- 充值弹窗 -->
    <div v-if="showRechargeDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-medium">预付充值</h3>
          <button @click="showRechargeDialog = false" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            预付金额 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="rechargeAmount"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入"
          />
        </div>

        <div class="grid grid-cols-4 gap-4 mb-6">
          <div
            v-for="amount in presetAmounts"
            :key="amount.value"
            class="border border-gray-200 rounded p-3 text-center cursor-pointer hover:border-blue-500"
            @click="rechargeAmount = amount.value.toString()"
          >
            <div class="font-medium">{{ amount.label }}</div>
            <div class="text-sm text-gray-500">售价: ¥ {{ amount.value }}</div>
          </div>
        </div>

        <div class="flex justify-end gap-4">
          <button
            @click="showRechargeDialog = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            取消
          </button>
          <button
            @click="handleRecharge"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 支付二维码弹窗 -->
  <div v-if="showQRCodeDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6">
      <div class="flex flex-col items-center">
        <p class="mb-4">向 深圳市森航科技有限公司</p>
        <p class="text-blue-600 mb-4">扫码支付{{ rechargeAmount }}元</p>
        <div class="w-48 h-48 bg-white p-2 mb-4 border">
          <img src="/assets/payment/qrcode.svg" alt="支付二维码" class="w-full h-full" />
        </div>
        <p class="mb-4">支持平台：</p>
        <div class="flex gap-4 mb-4">
          <img src="/assets/payment/bank.svg" alt="银联" class="h-8" />
          <img src="/assets/payment/wechat.svg" alt="微信" class="h-8" />
          <img src="/assets/payment/alipay.svg" alt="支付宝" class="h-8" />
        </div>
        <p class="text-sm text-gray-500">若未到账，请前往 <a href="#" class="text-blue-600">帮助中心</a> 联系客服处理。</p>
        <button 
          @click="showQRCodeDialog = false" 
          class="mt-6 px-6 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumb from '~/components/Breadcrumb.vue'

// 充值弹窗相关
const showRechargeDialog = ref(false)
const rechargeAmount = ref('')
const presetAmounts = [
  { value: 100, label: '100元' },
  { value: 500, label: '500元' },
  { value: 1000, label: '1000元' },
  { value: 2000, label: '2000元' },
  { value: 3000, label: '3000元' },
  { value: 5000, label: '5000元' },
  { value: 10000, label: '10000元' },
  { value: 20000, label: '20000元' },
]

// 支付二维码弹窗
const showQRCodeDialog = ref(false)

const handleRecharge = () => {
  const amount = rechargeAmount.value || '0'
  showQRCodeDialog.value = true
  showRechargeDialog.value = false
}

// 设置页面元数据
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
})

const route = useRoute()
const router = useRouter()

// 获取URL参数
const orderId = computed(() => route.query.orderId as string || '')
const amount = computed(() => {
  const amountStr = route.query.amount as string || '0'
  return parseFloat(amountStr).toFixed(2)
})

// 解析地址信息
const address = ref<{ id: number; name: string; phone: string; fullAddress: string; isDefault: boolean } | null>(null)
onMounted(() => {
  const addressStr = route.query.address as string
  if (addressStr) {
    try {
      address.value = JSON.parse(decodeURIComponent(addressStr))
    } catch (error) {
      console.error('解析地址信息失败:', error)
    }
  }
})

// 支付方式
const paymentMethod = ref('')

// 面包屑配置
const breadcrumbItems = [
  { name: '我的产品', path: '/dashboard/product' },
  { name: '产品库', path: '/dashboard/product/library' },
  { name: '立即下单', path: '/dashboard/product/libraryPage/order' },
  { name: '支付订单' }
]

// 处理支付
const processPayment = () => {
  if (!paymentMethod.value) {
    alert('请选择支付方式')
    return
  }
  
  // 这里模拟支付处理
  alert(`使用${paymentMethod.value === 'balance' ? '余额支付' : '其他支付'}成功！`)
  
  // 支付成功后跳转
  router.push('/dashboard/product/library')
}

// 暂不支付
const skipPayment = () => {
  router.push('/dashboard/product/library')
}
</script>