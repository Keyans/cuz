<template>
  <div class="container mx-auto py-6 px-4">
    <!-- 使用面包屑组件 -->
    <Breadcrumb :items="breadcrumbItems" />

    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-medium">企业认证</h2>
      </div>

      <div class="mb-8">
        <h3 class="text-blue-600 font-medium border-b border-blue-600 pb-2 mb-6">企业信息</h3>
        
        <div class="mb-4">
          <label class="block mb-2 text-sm">
            企业名称 <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="formData.companyName" 
            type="text" 
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="请输入"
          />
        </div>
        
        <div class="mb-4">
          <label class="block mb-2 text-sm">
            统一社会信用代码 <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="formData.creditCode" 
            type="text" 
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="请输入"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm">
            上传企业证件 <span class="text-red-500">*</span>
          </label>
          <div class="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500" @click="triggerFileUpload('companyLicense')">
            <input
              ref="companyLicenseInput"
              type="file"
              @change="handleFileChange('companyLicense', $event)"
              class="hidden"
              accept="image/*"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="text-gray-500" v-if="!formData.companyLicenseFile">点击上传</span>
            <span class="text-blue-600" v-else>已上传: {{ formData.companyLicenseFile.name }}</span>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-blue-600 font-medium border-b border-blue-600 pb-2 mb-6">认证人信息</h3>
        
        <div class="mb-4">
          <label class="block mb-2 text-sm">认证身份 <span class="text-red-500">*</span></label>
          <div class="flex space-x-6">
            <label class="flex items-center">
              <input 
                type="radio" 
                v-model="formData.identityType" 
                value="法人"
                class="mr-2"
              />
              <span>法人</span>
            </label>
            <label class="flex items-center">
              <input 
                type="radio" 
                v-model="formData.identityType" 
                value="被授权人"
                class="mr-2"
              />
              <span>被授权人</span>
            </label>
          </div>
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm">
            姓名 <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="formData.name" 
            type="text" 
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="请输入"
          />
        </div>
        
        <div class="mb-4">
          <label class="block mb-2 text-sm">
            身份证号码 <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="formData.idNumber" 
            type="text" 
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="请输入"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm">
            上传身份证件 <span class="text-red-500">*</span>
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 身份证正面 -->
            <div>
              <div 
                class="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 h-40"
                @click="triggerFileUpload('idCardFront')"
              >
                <input
                  ref="idCardFrontInput" 
                  type="file"
                  @change="handleFileChange('idCardFront', $event)"
                  class="hidden" 
                  accept="image/*"
                />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="text-gray-500" v-if="!formData.idCardFrontFile">点击上传</span>
                <span class="text-blue-600" v-else>已上传</span>
              </div>
              <div class="text-center mt-2">身份证正面</div>
            </div>
            
            <!-- 身份证反面 -->
            <div>
              <div 
                class="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 h-40"
                @click="triggerFileUpload('idCardBack')"
              >
                <input
                  ref="idCardBackInput" 
                  type="file"
                  @change="handleFileChange('idCardBack', $event)"
                  class="hidden" 
                  accept="image/*"
                />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="text-gray-500" v-if="!formData.idCardBackFile">点击上传</span>
                <span class="text-blue-600" v-else>已上传</span>
              </div>
              <div class="text-center mt-2">身份证反面</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center space-x-4 mt-8">
        <button 
          @click="goBack" 
          class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          取消认证
        </button>
        <button 
          @click="submitAuthForm" 
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          申请认证
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/common/Breadcrumb.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

const router = useRouter();
const route = useRoute();

// 面包屑数据
const breadcrumbItems = [
  { title: '账号管理', path: '/dashboard/account' },
  { title: '实名认证', path: '/dashboard/account/realName' },
  { title: '企业认证' }
];

interface FormData {
  companyName: string;
  creditCode: string;
  companyLicenseFile: File | null;
  identityType: string;
  name: string;
  idNumber: string;
  idCardFrontFile: File | null;
  idCardBackFile: File | null;
}

// 表单数据
const formData = ref<FormData>({
  companyName: route.query.companyName as string || '',
  creditCode: route.query.creditCode as string || '',
  companyLicenseFile: null,
  identityType: route.query.identityType as string || '法人',
  name: route.query.name as string || '',
  idNumber: route.query.idNumber as string || '',
  idCardFrontFile: null,
  idCardBackFile: null
});

// 上传相关引用
const companyLicenseInput = ref<HTMLInputElement | null>(null);
const idCardFrontInput = ref<HTMLInputElement | null>(null);
const idCardBackInput = ref<HTMLInputElement | null>(null);

// 触发文件上传
const triggerFileUpload = (type: string) => {
  if (type === 'companyLicense' && companyLicenseInput.value) {
    companyLicenseInput.value.click();
  } else if (type === 'idCardFront' && idCardFrontInput.value) {
    idCardFrontInput.value.click();
  } else if (type === 'idCardBack' && idCardBackInput.value) {
    idCardBackInput.value.click();
  }
};

// 处理文件变化
const handleFileChange = (type: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  if (type === 'companyLicense') {
    formData.value.companyLicenseFile = file;
  } else if (type === 'idCardFront') {
    formData.value.idCardFrontFile = file;
  } else if (type === 'idCardBack') {
    formData.value.idCardBackFile = file;
  }
};

// 返回上一页
const goBack = () => {
  router.back();
};

// 提交表单
const submitAuthForm = () => {
  // 在此处添加表单验证和提交逻辑
  console.log('提交表单数据:', formData.value);
  // 假设提交成功
  alert('认证申请已提交，请等待审核');
  router.push('/dashboard/account/realNamePage/auth-success');
};

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