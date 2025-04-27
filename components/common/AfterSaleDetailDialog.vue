<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
      <!-- 弹窗标题和关闭按钮 -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">查看售后</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 步骤条 -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div v-for="(step, index) in afterSaleSteps" :key="index" class="flex flex-col items-center flex-1">
            <div :class="[
              'rounded-full w-8 h-8 flex items-center justify-center text-white mb-2',
              currentStep > index ? 'bg-blue-500' : currentStep === index ? 'bg-blue-500' : 'bg-gray-300'
            ]">
              {{ index + 1 }}
            </div>
            <div class="text-center text-sm">{{ step.title }}</div>
            <div class="text-xs text-gray-500">{{ step.date || '' }}</div>
          </div>
        </div>
        <div class="relative mt-4">
          <div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
          <div 
            class="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2"
            :style="{ width: `${Math.min(100, (currentStep / (afterSaleSteps.length - 1)) * 100)}%` }"
          ></div>
        </div>
      </div>

      <!-- 基本信息 -->
      <div class="flex flex-wrap mb-4 gap-4">
        <div class="flex items-center">
          <span class="text-gray-500">售后单号：</span>
          <span class="font-medium">{{ afterSaleDetail.afterSaleNumber }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500">订单号：</span>
          <span class="font-medium">{{ afterSaleDetail.orderNumber }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500">物流单号：</span>
          <span class="font-medium">{{ afterSaleDetail.trackingNumber }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500">售后状态：</span>
          <span :class="getStatusTagClass(currentStep)">{{ getStatusText(currentStep) }}</span>
        </div>
      </div>

      <!-- 申请信息 -->
      <div class="mb-6">
        <div class="border-b border-gray-200 pb-2 mb-4">
          <h3 class="text-blue-600 font-medium text-lg">申请信息</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex">
            <span class="text-gray-500 w-24">申请人：</span>
            <span>{{ afterSaleDetail.applicant || '未知' }}</span>
          </div>
          <div class="flex">
            <span class="text-gray-500 w-24">申请时间：</span>
            <span>{{ afterSaleDetail.applyTime }}</span>
          </div>
        </div>
        <div class="flex mb-4">
          <span class="text-gray-500 w-24 flex-shrink-0">申请原因：</span>
          <div class="flex-1">{{ afterSaleDetail.reason }}</div>
        </div>
        <div class="flex">
          <span class="text-gray-500 w-24 flex-shrink-0 mt-1">申请图片：</span>
          <div class="flex flex-wrap gap-2">
            <div v-for="(image, index) in afterSaleDetail.applyImages" :key="`apply-${index}`" class="w-24 h-24 overflow-hidden rounded border border-gray-200">
              <img :src="image" alt="申请图片" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <!-- 审核信息 -->
      <div class="mb-6">
        <div class="border-b border-gray-200 pb-2 mb-4">
          <h3 class="text-blue-600 font-medium text-lg">审核信息</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex">
            <span class="text-gray-500 w-24">审核时间：</span>
            <span>{{ afterSaleDetail.auditTime || '暂无' }}</span>
          </div>
        </div>
        <div class="flex mb-4">
          <span class="text-gray-500 w-24 flex-shrink-0">审核原因：</span>
          <div class="flex-1">{{ afterSaleDetail.auditReason || '暂无' }}</div>
        </div>
        <div class="flex" v-if="afterSaleDetail.auditImages && afterSaleDetail.auditImages.length > 0">
          <span class="text-gray-500 w-24 flex-shrink-0 mt-1">审核图片：</span>
          <div class="flex flex-wrap gap-2">
            <div v-for="(image, index) in afterSaleDetail.auditImages" :key="`audit-${index}`" class="w-24 h-24 overflow-hidden rounded border border-gray-200">
              <img :src="image" alt="审核图片" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <!-- 售后信息 -->
      <div class="mb-6">
        <div class="border-b border-gray-200 pb-2 mb-4">
          <h3 class="text-blue-600 font-medium text-lg">售后信息</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex">
            <span class="text-gray-500 w-24">退款时间：</span>
            <span>{{ afterSaleDetail.refundTime || '暂无' }}</span>
          </div>
          <div class="flex">
            <span class="text-gray-500 w-24">退款金额：</span>
            <span class="text-red-600">{{ afterSaleDetail.refundAmount ? `全部退款` : '暂无' }}</span>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="flex justify-end space-x-4 mt-8">
        <button @click="close" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          关闭
        </button>
        <button v-if="showRefundButton" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          申请退款
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  afterSaleId: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close']);

// 售后步骤
const afterSaleSteps = ref([
  { title: '申请售后', date: '2025-01-23 23:21:29' },
  { title: '等待审核', date: '' },
  { title: '审核通过', date: '2025-01-23 23:21:29' },
  { title: '自动退款', date: '2025-01-23 23:21:29' },
  { title: '售后完成', date: '2025-01-23 23:21:29' }
]);

// 当前步骤（从0开始计数）
const currentStep = ref(4);

// 示例售后详情数据
const afterSaleDetail = ref({
  afterSaleNumber: 'SH38833332',
  orderNumber: 'XS38833332',
  trackingNumber: 'YT38833332',
  applicant: 'UQ2332',
  applyTime: '2025-01-23 23:21:29',
  reason: '实物与商品描述不符，这是一些售后理由描述这是一些售后理由描述这是一些售后理由描述这是一些售后理由描述这是一些售后理由描述这是一些售后理由描述这是一些售后理由描述这是一些售后理由描述',
  applyImages: [
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100'
  ],
  auditTime: '2025-01-23 23:21:29',
  auditReason: '实际情况确实如此',
  auditImages: [
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100'
  ],
  refundTime: '2025-01-23 23:21:29',
  refundAmount: true
});

// 只有在特定状态下显示退款按钮
const showRefundButton = computed(() => {
  return false; // 在实际应用中，这应该根据售后状态决定
});

// 获取状态标签文本
const getStatusText = (step: number) => {
  const statusTexts = ['已申请', '等待审核', '审核通过', '自动退款', '售后完成'];
  return statusTexts[Math.min(step, statusTexts.length - 1)];
};

// 获取状态标签样式
const getStatusTagClass = (step: number) => {
  const baseClasses = 'px-2 py-1 ml-2 text-xs rounded-md inline-flex items-center font-medium';
  
  const statusClasses = [
    'bg-blue-100 text-blue-800', // 已申请
    'bg-yellow-100 text-yellow-800', // 等待审核
    'bg-green-100 text-green-800', // 审核通过
    'bg-purple-100 text-purple-800', // 自动退款
    'bg-green-100 text-green-800', // 售后完成
  ];
  
  return `${baseClasses} ${statusClasses[Math.min(step, statusClasses.length - 1)]}`;
};

// 在实际应用中，这里应该添加获取售后详情的API调用
const fetchAfterSaleDetail = async (id: string) => {
  try {
    console.log(`获取售后详情：${id}`);
    // 实际应用中应该从API获取数据
    // const response = await fetch(`/api/after-sales/${id}`);
    // const data = await response.json();
    // afterSaleDetail.value = data;
    
    // 根据售后状态设置当前步骤
    // currentStep.value = getStepFromStatus(data.status);
  } catch (error) {
    console.error('获取售后详情失败', error);
  }
};

// 监听ID变化，重新获取数据
watch(() => props.afterSaleId, (newId) => {
  if (newId && props.isOpen) {
    fetchAfterSaleDetail(newId);
  }
});

// 监听弹窗打开状态
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && props.afterSaleId) {
    fetchAfterSaleDetail(props.afterSaleId);
  }
});

// 关闭弹窗
const close = () => {
  emit('close');
};
</script>

<style scoped>
/* 添加弹窗动画效果 */
.fixed {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 