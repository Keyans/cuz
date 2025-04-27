<template>
  <div class="container mx-auto py-6 px-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">售后详情</h1>
      <el-button @click="goBack" plain>返回</el-button>
    </div>

    <!-- 步骤条 -->
    <div class="w-full mb-8">
      <el-steps :active="afterSaleInfo.currentStep" finish-status="success" simple>
        <el-step v-for="(step, index) in afterSaleInfo.steps" :key="index" :title="step.title">
          <template #description>
            <span v-if="step.time" class="text-xs text-gray-500">{{ step.time }}</span>
          </template>
        </el-step>
      </el-steps>
    </div>

    <!-- 基本信息 -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-medium mb-4">基本信息</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-gray-500">售后编号</p>
          <p>{{ afterSaleInfo.id }}</p>
        </div>
        <div>
          <p class="text-gray-500">关联订单</p>
          <p class="text-blue-600 cursor-pointer" @click="viewOrderDetail(afterSaleInfo.orderId)">
            {{ afterSaleInfo.orderId }}
          </p>
        </div>
        <div>
          <p class="text-gray-500">售后类型</p>
          <p>{{ afterSaleInfo.type }}</p>
        </div>
        <div>
          <p class="text-gray-500">申请时间</p>
          <p>{{ afterSaleInfo.applyTime }}</p>
        </div>
        <div class="md:col-span-2">
          <p class="text-gray-500 mb-2">当前状态</p>
          <p class="flex items-center">
            <el-tag :type="getStatusType(afterSaleInfo.status)">
              {{ getStatusText(afterSaleInfo.status) }}
            </el-tag>
          </p>
        </div>
      </div>
    </div>

    <!-- 申请信息 -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-medium mb-4">申请信息</h2>
      <div class="mb-4">
        <p class="text-gray-500 mb-2">申请原因</p>
        <p>{{ afterSaleInfo.reason }}</p>
      </div>
      <div class="mb-4">
        <p class="text-gray-500 mb-2">问题描述</p>
        <p>{{ afterSaleInfo.description }}</p>
      </div>
      <div>
        <p class="text-gray-500 mb-2">申请凭证</p>
        <div class="flex flex-wrap gap-4">
          <div v-for="(img, index) in afterSaleInfo.images" :key="index" class="w-24 h-24 relative">
            <img :src="img" class="w-full h-full object-cover rounded" />
            <div class="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex justify-center items-center transition-opacity rounded">
              <el-button type="primary" size="small" @click="viewImage(img)" icon="el-icon-zoom-in" circle></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 审核信息 -->
    <div v-if="afterSaleInfo.status >= 1" class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-medium mb-4">审核信息</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-gray-500">审核时间</p>
          <p>{{ afterSaleInfo.reviewTime }}</p>
        </div>
        <div>
          <p class="text-gray-500">审核结果</p>
          <p>
            <el-tag :type="afterSaleInfo.reviewResult ? 'success' : 'danger'">
              {{ afterSaleInfo.reviewResult ? '通过' : '拒绝' }}
            </el-tag>
          </p>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-gray-500 mb-2">审核备注</p>
        <p>{{ afterSaleInfo.reviewRemark || '无' }}</p>
      </div>
    </div>

    <!-- 售后信息 -->
    <div v-if="afterSaleInfo.status >= 2" class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-medium mb-4">售后信息</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-gray-500">处理时间</p>
          <p>{{ afterSaleInfo.processTime }}</p>
        </div>
        <div v-if="afterSaleInfo.type === '退款'">
          <p class="text-gray-500">退款金额</p>
          <p class="text-red-600">¥{{ afterSaleInfo.refundAmount }}</p>
        </div>
        <div v-if="afterSaleInfo.type === '换货'">
          <p class="text-gray-500">换货状态</p>
          <p>{{ afterSaleInfo.exchangeStatus }}</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-gray-500 mb-2">处理备注</p>
        <p>{{ afterSaleInfo.processRemark || '无' }}</p>
      </div>
    </div>

    <!-- 图片查看器 -->
    <el-dialog v-model="imageDialogVisible" title="查看凭证" width="50%">
      <img :src="currentImage" class="w-full" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

const router = useRouter();
const route = useRoute();
const afterSaleId = route.params.id as string;

// 图片查看相关
const imageDialogVisible = ref(false);
const currentImage = ref('');

// 模拟售后数据 - 实际项目中应该通过API获取
const afterSaleInfo = ref({
  id: afterSaleId,
  orderId: 'XS33234355',
  type: '退款',
  status: 2,
  currentStep: 2, // 当前激活的步骤
  steps: [
    { title: '申请售后', time: '2023-10-15 14:30:45' },
    { title: '等待审核', time: '2023-10-16 09:15:22' },
    { title: '审核通过', time: '2023-10-16 09:15:22' },
    { title: '售后关闭', time: '2023-10-17 10:45:33' }
  ],
  applyTime: '2023-10-15 14:30:45',
  reason: '商品质量问题',
  description: '收到的商品与描述不符，面料材质与介绍不一致，穿着不舒适。',
  images: [
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
    'https://picsum.photos/200/200?random=3'
  ],
  reviewTime: '2023-10-16 09:15:22',
  reviewResult: true,
  reviewRemark: '经核实，确认商品存在质量问题，同意退款申请。',
  processTime: '2023-10-17 10:45:33',
  refundAmount: 199.00,
  processRemark: '已将退款金额返还至用户支付账户，预计1-3个工作日到账。',
  exchangeStatus: '已发货'
});

// 获取售后状态对应的类型和文本
const getStatusType = (status: number) => {
  const types = ['info', 'warning', 'primary', 'success'] as const;
  return types[status] || 'info';
};

const getStatusText = (status: number) => {
  const texts = ['已申请', '审核中', '处理中', '已完成'];
  return texts[status] || '未知状态';
};

// 返回上一页
const goBack = () => {
  router.back();
};

// 查看订单详情
const viewOrderDetail = (orderId: string) => {
  router.push(`/dashboard/order/${orderId}`);
};

// 查看图片
const viewImage = (img: string) => {
  currentImage.value = img;
  imageDialogVisible.value = true;
};

// 获取售后详情数据
onMounted(async () => {
  // 实际项目中在这里调用API获取售后详情
  // const { data } = await api.getAfterSaleDetail(afterSaleId);
  // afterSaleInfo.value = data;
  
  // 根据售后类型设置不同的步骤
  setAfterSaleSteps();
});

// 根据售后类型和状态设置步骤
const setAfterSaleSteps = () => {
  const type = afterSaleInfo.value.type;
  const status = afterSaleInfo.value.status;
  
  if (type === '退款') {
    afterSaleInfo.value.steps = [
      { title: '申请售后', time: afterSaleInfo.value.applyTime },
      { title: '等待审核', time: status > 0 ? afterSaleInfo.value.reviewTime : '' },
      { title: '审核通过', time: status > 1 ? afterSaleInfo.value.reviewTime : '' },
      { title: '售后关闭', time: status > 2 ? afterSaleInfo.value.processTime : '' }
    ];
  } else if (type === '退款补发') {
    afterSaleInfo.value.steps = [
      { title: '申请售后', time: afterSaleInfo.value.applyTime },
      { title: '等待审核', time: status > 0 ? afterSaleInfo.value.reviewTime : '' },
      { title: '审核通过', time: status > 1 ? afterSaleInfo.value.reviewTime : '' },
      { title: '平台补发', time: status > 2 ? afterSaleInfo.value.processTime : '' },
      { title: '确认收货', time: status > 3 ? afterSaleInfo.value.processTime : '' },
      { title: '售后完成', time: status > 4 ? afterSaleInfo.value.processTime : '' }
    ];
  } else if (type === '换货') {
    afterSaleInfo.value.steps = [
      { title: '申请售后', time: afterSaleInfo.value.applyTime },
      { title: '等待审核', time: status > 0 ? afterSaleInfo.value.reviewTime : '' },
      { title: '审核通过', time: status > 1 ? afterSaleInfo.value.reviewTime : '' },
      { title: '等待寄回', time: status > 2 ? afterSaleInfo.value.processTime : '' },
      { title: '平台换货', time: status > 3 ? afterSaleInfo.value.processTime : '' },
      { title: '售后完成', time: status > 4 ? afterSaleInfo.value.processTime : '' }
    ];
  } else {
    // 默认步骤
    afterSaleInfo.value.steps = [
      { title: '申请售后', time: afterSaleInfo.value.applyTime },
      { title: '等待审核', time: status > 0 ? afterSaleInfo.value.reviewTime : '' },
      { title: '审核拒绝', time: status > 1 && !afterSaleInfo.value.reviewResult ? afterSaleInfo.value.reviewTime : '' },
      { title: '售后关闭', time: status > 2 ? afterSaleInfo.value.processTime : '' }
    ];
  }
  
  // 设置当前步骤，根据状态算出
  afterSaleInfo.value.currentStep = Math.min(status, afterSaleInfo.value.steps.length - 1);
};
</script> 