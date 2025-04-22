<template>
  <div class="container mx-auto py-6 px-4">
    <h1 class="text-2xl font-bold mb-6">退款处理</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="handleRefund">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 订单号 -->
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">订单号</label>
            <input 
              v-model="refundForm.orderNum" 
              type="text" 
              class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入订单号"
            />
          </div>

          <!-- 平台ID -->
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">平台ID</label>
            <input 
              v-model="refundForm.platformId" 
              type="text" 
              class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入平台ID"
            />
          </div>

          <!-- 店铺ID -->
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">店铺ID</label>
            <input 
              v-model="refundForm.shopId" 
              type="text" 
              class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入店铺ID"
            />
          </div>

          <!-- 用户ID -->
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">用户ID</label>
            <input 
              v-model="refundForm.userId" 
              type="text" 
              class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入用户ID"
            />
          </div>

          <!-- 退款单号 -->
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">退款单号</label>
            <input 
              v-model="refundForm.afsNum" 
              type="text" 
              class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入退款单号"
            />
          </div>

          <!-- 退款金额 -->
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">退款金额 (元) <span class="text-xs text-gray-400">系统将乘以10000</span></label>
            <input 
              v-model.number="refundForm.refundFee" 
              type="number" 
              step="0.01"
              class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入退款金额"
            />
          </div>
        </div>

        <!-- 计算后的金额展示 -->
        <div class="mt-4 mb-6 p-3 bg-gray-50 rounded-md">
          <p class="text-sm text-gray-700">
            实际退款金额: <span class="font-bold text-primary">{{ (refundForm.refundFee * 10000).toFixed(0) }}</span> <span class="text-xs text-gray-500">(内部单位)</span>
          </p>
        </div>

        <!-- 退款按钮 -->
        <div class="flex justify-end">
          <button 
            type="submit" 
            class="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              处理中...
            </span>
            <span v-else>确认退款</span>
          </button>
        </div>
      </form>
    </div>

    <!-- 结果提示 -->
    <div v-if="resultMessage" class="mt-6 p-4 rounded-md" :class="[resultSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
      {{ resultMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { doRefundOrder } from '~/apis/finance';

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

// 表单数据
const refundForm = reactive({
  orderNum: '',
  platformId: '0', // 默认为0
  shopId: '',
  userId: '',
  afsNum: '',
  refundFee: 0
});

// 处理状态
const isLoading = ref(false);
const resultSuccess = ref(false);
const resultMessage = ref('');

// 处理退款
const handleRefund = async () => {
  // 验证表单
  if (!refundForm.orderNum || !refundForm.shopId || 
      !refundForm.userId || !refundForm.afsNum || !refundForm.refundFee) {
    resultSuccess.value = false;
    resultMessage.value = '请填写所有必填字段';
    return;
  }

  try {
    isLoading.value = true;
    // 计算实际金额 (乘以10000)
    const actualAmount = Math.floor(refundForm.refundFee * 10000);
    
    // 调用退款API
    const response = await doRefundOrder({
      orderNum: refundForm.orderNum,
      platformId: refundForm.platformId,
      shopId: refundForm.shopId,
      userId: refundForm.userId, 
      afsNum: refundForm.afsNum,
      refundFee: actualAmount
    });
    
    if (response.success) {
      resultSuccess.value = true;
      resultMessage.value = `退款申请已提交成功，退款单号: ${refundForm.afsNum}，金额: ${actualAmount}`;
      
      // 退款成功后重置表单
      resetForm();
    } else {
      resultSuccess.value = false;
      resultMessage.value = response.msg || '退款处理失败';
    }
  } catch (error: any) {
    resultSuccess.value = false;
    resultMessage.value = `退款失败: ${error.message || '未知错误'}`;
  } finally {
    isLoading.value = false;
  }
};

// 重置表单
const resetForm = () => {
  refundForm.orderNum = '';
  refundForm.platformId = '0'; // 重置为默认值0
  refundForm.shopId = '';
  refundForm.userId = '';
  refundForm.afsNum = '';
  refundForm.refundFee = 0;
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style> 