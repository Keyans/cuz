<template>
  <div class="container mx-auto py-6 px-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">基本信息</h1>
    </div>

    <!-- 账号信息 -->
    <div class="bg-white rounded-lg shadow mb-6 overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-semibold">账号信息</h2>
        <button v-if="!isEditingUserInfo" @click="startEditUserInfo" class="text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button v-else @click="saveUserInfo" class="btn-primary text-sm py-1 px-3">
          保存
        </button>
      </div>
      <div class="p-6">
        <div class="flex flex-col md:flex-row gap-6">          
          <!-- 信息部分 -->
          <div class="flex-1">
            <div class="space-y-4">
              <div class="flex items-center">
                <span class="w-24 text-gray-600">用户昵称</span>
                <div class="flex-1 flex items-center">
                  <span v-if="!isEditingUserInfo" class="mr-2">{{ userInfo.nickname }}</span>
                  <input 
                    v-else
                    v-model="userInfo.nickname" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div class="flex items-center">
                <span class="w-24 text-gray-600">手机号</span>
                <div class="flex-1">{{ userInfo.phone }}</div>
              </div>
              <div class="flex items-center">
                <span class="w-24 text-gray-600">邮箱</span>
                <div class="flex-1 flex items-center">
                  <span v-if="!isEditingUserInfo" class="mr-2">{{ userInfo.email }}</span>
                  <input 
                    v-else
                    v-model="userInfo.email" 
                    type="email" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 收货地址 -->
    <div class="bg-white rounded-lg shadow mb-6 overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-semibold">收货地址</h2>
      </div>
      <div class="divide-y divide-gray-200">
        <div class="p-6 relative">
          <div class="flex justify-between">
            <div>
              <div class="flex items-center mb-2">
                <span class="font-medium mr-4">张三</span>
                <span>12345678901</span>
                <span class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">默认</span>
              </div>
              <div class="text-gray-600">广东省 深圳市 宝安区 西乡街道 青青草原</div>
            </div>
            <div class="space-x-2">
              <button class="text-blue-500 hover:text-blue-700">编辑</button>
              <button class="text-red-500 hover:text-red-700">删除</button>
            </div>
          </div>
        </div>
        <div class="p-6 relative">
          <div class="flex justify-between">
            <div>
              <div class="flex items-center mb-2">
                <span class="font-medium mr-4">张三</span>
                <span>12345678901</span>
              </div>
              <div class="text-gray-600">广东省 深圳市 宝安区 西乡街道 青青草原</div>
            </div>
            <div class="flex items-center space-x-4">
              <button class="text-blue-500 hover:text-blue-700">设为默认</button>
              <button class="text-blue-500 hover:text-blue-700">编辑</button>
              <button class="text-red-500 hover:text-red-700">删除</button>
            </div>
          </div>
        </div>
        <div class="p-4">
          <button @click="showAddressDialog = true" class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            添加新地址
          </button>
        </div>
      </div>
    </div>

    <!-- 开票资料 -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-semibold">开票资料</h2>
        <button @click="showInvoiceDialog = true" class="text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div class="flex">
            <span class="w-24 text-gray-600">公司名称</span>
            <span>{{ invoiceInfo.companyName }}</span>
          </div>
          <div class="flex">
            <span class="w-24 text-gray-600">税号</span>
            <span>{{ invoiceInfo.taxNumber }}</span>
          </div>
          <div class="flex">
            <span class="w-24 text-gray-600">单位地址</span>
            <span>{{ invoiceInfo.address }}</span>
          </div>
          <div class="flex">
            <span class="w-24 text-gray-600">电话号码</span>
            <span>{{ invoiceInfo.phone }}</span>
          </div>
          <div class="flex">
            <span class="w-24 text-gray-600">开户银行</span>
            <span>{{ invoiceInfo.bankName }}</span>
          </div>
          <div class="flex">
            <span class="w-24 text-gray-600">银行账户</span>
            <span>{{ invoiceInfo.bankAccount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 地址弹窗 -->
    <AddressDialog 
      :show="showAddressDialog" 
      @update:show="showAddressDialog = $event" 
      @save="handleSaveAddress"
    />

    <!-- 开票资料弹窗 -->
    <InvoiceDialog
      :show="showInvoiceDialog"
      :invoice-info="invoiceInfo"
      @update:show="showInvoiceDialog = $event"
      @save="handleSaveInvoice"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AddressDialog from '../../../components/common/AddressDialog.vue'
import InvoiceDialog from '../../../components/common/InvoiceDialog.vue'

// 控制地址弹窗显示
const showAddressDialog = ref(false)

// 控制开票资料弹窗显示
const showInvoiceDialog = ref(false)

// 账户信息编辑状态
const isEditingUserInfo = ref(false)

// 用户信息数据
const userInfo = reactive({
  nickname: 'yh4513',
  phone: '186****4513',
  email: '',
  avatar: 'https://via.placeholder.com/200'
})

// 开始编辑用户信息
const startEditUserInfo = () => {
  isEditingUserInfo.value = true
}

// 保存用户信息
const saveUserInfo = () => {
  console.log('保存用户信息:', userInfo)
  // 这里可以添加保存用户信息的逻辑
  isEditingUserInfo.value = false
}

// 开票资料数据
const invoiceInfo = reactive({
  companyName: '深圳市汉森软件有限公司',
  taxNumber: '91440300795429977A',
  address: '深圳市宝安区西乡街道固兴社区航空产业园A栋A201-A301',
  phone: '0755-28940020',
  bankName: '招商银行股份有限公司深圳新安支行',
  bankAccount: '755935091410501'
})

// 处理保存地址
const handleSaveAddress = (address) => {
  console.log('保存地址:', address)
  // 这里可以添加保存地址的逻辑
}

// 处理保存开票资料
const handleSaveInvoice = (info) => {
  console.log('保存开票资料:', info)
  // 更新开票资料
  Object.assign(invoiceInfo, info)
}

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
</script>

<style scoped>
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors;
}

/* 确保输入框边框样式 */
input, textarea, select {
  @apply border border-gray-300 rounded-md;
}

/* 聚焦时的输入框样式 */
input:focus, textarea:focus, select:focus {
  @apply outline-none ring-2 ring-blue-500 border-blue-500;
}
</style>