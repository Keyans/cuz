<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" @click="close">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-6 pt-5 pb-4">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-medium text-gray-900">编辑</h3>
            <button @click="close" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 开票资料表单 -->
          <form @submit.prevent="saveInvoice" class="space-y-5">
            <div class="flex items-center">
              <label class="block w-24 text-gray-700">
                公司名称
                <span class="text-red-500 ml-0.5">*</span>
              </label>
              <input 
                v-model="form.companyName" 
                type="text" 
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入"
                required
              >
            </div>

            <div class="flex items-center">
              <label class="block w-24 text-gray-700">
                税号
                <span class="text-red-500 ml-0.5">*</span>
              </label>
              <input 
                v-model="form.taxNumber" 
                type="text" 
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入"
                required
              >
            </div>

            <div class="flex items-center">
              <label class="block w-24 text-gray-700">
                单位地址
                <span class="text-red-500 ml-0.5">*</span>
              </label>
              <input 
                v-model="form.address" 
                type="text" 
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入"
                required
              >
            </div>

            <div class="flex items-center">
              <label class="block w-24 text-gray-700">
                电话号码
                <span class="text-red-500 ml-0.5">*</span>
              </label>
              <input 
                v-model="form.phone" 
                type="tel" 
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入"
                required
              >
            </div>

            <div class="flex items-center">
              <label class="block w-24 text-gray-700">
                开户银行
                <span class="text-red-500 ml-0.5">*</span>
              </label>
              <input 
                v-model="form.bankName" 
                type="text" 
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入"
                required
              >
            </div>

            <div class="flex items-center">
              <label class="block w-24 text-gray-700">
                银行账户
                <span class="text-red-500 ml-0.5">*</span>
              </label>
              <input 
                v-model="form.bankAccount" 
                type="text" 
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入"
                required
              >
            </div>
          </form>
        </div>

        <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button 
            type="button" 
            @click="close" 
            class="px-5 py-2 rounded-md border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            取消
          </button>
          <button 
            type="button" 
            @click="saveInvoice" 
            class="px-5 py-2 rounded-md border border-transparent bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

interface InvoiceInfo {
  companyName: string
  taxNumber: string
  address: string
  phone: string
  bankName: string
  bankAccount: string
}

const props = defineProps<{
  show: boolean
  invoiceInfo?: InvoiceInfo
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'save', info: InvoiceInfo): void
}>()

const form = reactive<InvoiceInfo>({
  companyName: props.invoiceInfo?.companyName || '',
  taxNumber: props.invoiceInfo?.taxNumber || '',
  address: props.invoiceInfo?.address || '',
  phone: props.invoiceInfo?.phone || '',
  bankName: props.invoiceInfo?.bankName || '',
  bankAccount: props.invoiceInfo?.bankAccount || ''
})

// 监听 invoiceInfo 变化
watch(() => props.invoiceInfo, (newValue) => {
  if (newValue) {
    form.companyName = newValue.companyName || ''
    form.taxNumber = newValue.taxNumber || ''
    form.address = newValue.address || ''
    form.phone = newValue.phone || ''
    form.bankName = newValue.bankName || ''
    form.bankAccount = newValue.bankAccount || ''
  }
}, { immediate: true })

const close = () => {
  emit('update:show', false)
}

const saveInvoice = () => {
  // 基本验证 - 所有字段都是必填的
  if (!form.companyName.trim()) {
    alert('请输入公司名称')
    return
  }
  if (!form.taxNumber.trim()) {
    alert('请输入税号')
    return
  }
  if (!form.address.trim()) {
    alert('请输入单位地址')
    return
  }
  if (!form.phone.trim()) {
    alert('请输入电话号码')
    return
  }
  if (!form.bankName.trim()) {
    alert('请输入开户银行')
    return
  }
  if (!form.bankAccount.trim()) {
    alert('请输入银行账户')
    return
  }

  emit('save', { ...form })
  close()
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
</style> 