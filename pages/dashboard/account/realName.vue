<template>
  <div class="container mx-auto py-6 px-4">
    <!-- 使用面包屑组件 -->
    <Breadcrumb :items="breadcrumbItems" />
    <!-- 标签页 -->
    <div class="mb-6 flex">
      <div class="flex items-center space-x-2">
        <div class="text-lg font-medium">实名认证</div>
        <div v-if="authStatus === 'pending'" class="px-2 py-1 bg-orange-100 text-orange-600 text-sm rounded">审核中</div>
        <div v-if="authStatus === 'approved'" class="px-2 py-1 bg-green-100 text-green-600 text-sm rounded">已认证</div>
        <div v-if="authStatus === 'none'" class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">未认证</div>
      </div>
    </div>

      <!-- 企业认证区块 -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center h-full">
          <div class="flex-1">
            <h2 class="text-lg font-medium mb-6">
              企业认证
            </h2>
            <div class="flex items-start">
              <div class="min-w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-gray-600 mb-1">说明：</p>
                <ol class="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>企业认证后，账号归属于企业，后续一切行为视规为企业行为。</li>
                  <li>只有企业用户可以开增值税普通发票、增值税专用发票。</li>
                  <li>一个企业主体最多可认证5个账号。</li>
                </ol>
              </div>
            </div>
          </div>
          <div class="flex items-center ml-8">
            <button @click="navigateToAuthForm" class="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors">
              {{ authStatus === 'pending' || authStatus === 'approved' ? '重新认证' : '立即认证' }}
            </button>
          </div>
        </div>
      </div>

    <!-- 审核中状态 或 认证成功状态 -->
    <template  v-if="authStatus === 'pending' || authStatus === 'approved' ">
      <!-- 企业信息卡片 -->
      <div class="bg-white rounded-lg border border-gray-200 p-6 mt-6">
        <h2 class="text-base font-medium border-b pb-3 mb-6 text-blue-600">企业信息</h2>
        
        <div class="flex items-start mb-2 text-sm">
          <div class="w-32 text-gray-500">企业名称</div>
          <div class="flex-1 text-gray-800">{{ enterpriseData.companyName || 'xxxxx企业' }}</div>
        </div>
        
        <div class="flex items-start mb-2 text-sm">
          <div class="w-32 text-gray-500">统一社会信用代码</div>
          <div class="flex-1 text-gray-800">{{ enterpriseData.creditCode || 'xxxxxxxxxxxxxxxxxx' }}</div>
        </div>
        
        <div class="flex items-start mb-6 text-sm">
          <div class="w-32 text-gray-500">企业证件</div>
          <div class="flex-1">
            <div class="w-48 h-48 bg-gray-100 rounded flex items-center justify-center">
              <img v-if="enterpriseData.companyLicenseUrl" :src="enterpriseData.companyLicenseUrl" alt="企业证件" class="max-w-full max-h-full object-contain" />
              <div v-else class="text-blue-300">
                <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 认证人信息卡片 -->
      <div class="bg-white rounded-lg border border-gray-200 p-6 mt-6">
        <h2 class="text-base font-medium border-b pb-3 mb-6 text-blue-600">认证人信息</h2>
        
        <div class="flex items-start mb-2 text-sm">
          <div class="w-32 text-gray-500">认证身份</div>
          <div class="flex-1 text-gray-800">{{ enterpriseData.identityType || '被授权人' }}</div>
        </div>
        
        <div class="flex items-start mb-2 text-sm">
          <div class="w-32 text-gray-500">姓名</div>
          <div class="flex-1 text-gray-800">{{ enterpriseData.name || 'xxx' }}</div>
        </div>
        
        <div class="flex items-start mb-2 text-sm">
          <div class="w-32 text-gray-500">身份证号码</div>
          <div class="flex-1 text-gray-800">{{ enterpriseData.idNumber || 'xxxxxxxxxxxxx' }}</div>
        </div>
        
        <div class="flex items-start mb-2 text-sm">
          <div class="w-32 text-gray-500">身份证件</div>
          <div class="flex-1 grid grid-cols-2 gap-4">
            <div class="w-40 h-40 bg-gray-100 rounded flex items-center justify-center">
              <img v-if="enterpriseData.idCardFrontUrl" :src="enterpriseData.idCardFrontUrl" alt="身份证正面" class="max-w-full max-h-full object-contain" />
              <div v-else class="text-blue-300">
                <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <div class="w-40 h-40 bg-gray-100 rounded flex items-center justify-center">
              <img v-if="enterpriseData.idCardBackUrl" :src="enterpriseData.idCardBackUrl" alt="身份证反面" class="max-w-full max-h-full object-contain" />
              <div v-else class="text-blue-300">
                <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/common/Breadcrumb.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

const router = useRouter();
const activeTab = ref(0);

// 认证状态：none-未认证，pending-审核中，approved-已认证
const authStatus = ref('pending'); // 这里模拟默认是审核中状态，实际应从API获取

// 企业认证数据
const enterpriseData = reactive({
  companyName: '',
  creditCode: '',
  companyLicenseUrl: '',
  identityType: '',
  name: '',
  idNumber: '',
  idCardFrontUrl: '',
  idCardBackUrl: ''
});

// 面包屑数据
const breadcrumbItems = [
  { title: '账号', path: '/dashboard/account' },
  { title: '实名认证' }
];

// 导航到认证表单页面
const navigateToAuthForm = () => {
  // 构建路由参数
  const routeParams = {
    companyName: enterpriseData.companyName,
    creditCode: enterpriseData.creditCode,
    identityType: enterpriseData.identityType,
    name: enterpriseData.name,
    idNumber: enterpriseData.idNumber
  };
  
  // 使用query参数传递数据
  router.push({
    path: '/dashboard/account/realNamePage/enterprise-auth',
    query: routeParams
  });
};

// 模拟获取认证状态和数据
const fetchAuthStatus = async () => {
  try {
    // 模拟API调用
    // const response = await fetch('/api/enterprise-auth/status');
    // const data = await response.json();
    // authStatus.value = data.status;
    // Object.assign(enterpriseData, data.enterpriseData);
    
    // 模拟数据
    setTimeout(() => {
      authStatus.value = 'pending'; // 可以改为 'none', 'pending', 'approved' 测试不同状态
      
      if (authStatus.value !== 'none') {
        Object.assign(enterpriseData, {
          companyName: 'xxxxx企业',
          creditCode: 'xxxxxxxxxxxxxxxxxx',
          companyLicenseUrl: '',
          identityType: '被授权人',
          name: 'xxx',
          idNumber: 'xxxxxxxxxxxxx',
          idCardFrontUrl: '',
          idCardBackUrl: ''
        });
      }
    }, 500);
  } catch (error) {
    console.error('获取认证状态失败', error);
  }
};

// 页面加载时获取认证状态
fetchAuthStatus();
</script>

<style scoped>
/* 移动端优化 */
@media (max-width: 768px) {
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
