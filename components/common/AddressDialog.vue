<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" @click="close">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-6 pt-5 pb-4">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-medium text-gray-900">新增地址</h3>
            <button @click="close" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 地址表单 -->
          <form @submit.prevent="saveAddress" class="space-y-5">
            <div class="flex items-center">
              <label class="block w-20 text-gray-700">收件人</label>
              <input 
                v-model="form.name" 
                type="text" 
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入收件人"
                required
              >
            </div>

            <div class="flex items-center">
              <label class="block w-20 text-gray-700">手机号</label>
              <input 
                v-model="form.phone" 
                type="tel" 
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入手机号"
                required
                pattern="[0-9]{11}"
              >
            </div>

            <div class="flex items-center">
              <label class="block w-20 text-gray-700">地区</label>
              <div class="flex-1 relative">
                <select 
                  v-model="form.region" 
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="请选择地区"
                  required
                >
                  <option value="">请选择地区</option>
                  <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="flex items-start">
              <label class="block w-20 text-gray-700 pt-2">详细地址</label>
              <textarea 
                v-model="form.detail" 
                rows="3" 
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入详细地址，如道路、门牌号、楼栋号等信息"
                required
              ></textarea>
            </div>

            <div class="flex items-center ml-20">
              <input 
                v-model="form.isDefault" 
                id="default-address"
                type="checkbox" 
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              >
              <label for="default-address" class="ml-2 text-gray-700">设为默认地址</label>
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
            @click="saveAddress" 
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
import { ref, reactive } from 'vue'

interface Address {
  id: string
  name: string
  phone: string
  region: string
  detail: string
  isDefault: boolean
}

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'save', address: Address): void
}>()

const addresses = ref<Address[]>([])
const isEditing = ref(false)
const isAdding = ref(false)
const editingId = ref('')

const form = reactive({
  name: '',
  phone: '',
  region: '',
  detail: '',
  isDefault: false
})

// 模拟地区数据
const regions = [
  '北京市',
  '上海市',
  '广州市',
  '深圳市',
  // 更多地区...
]

const close = () => {
  emit('update:show', false)
  resetForm()
}

const resetForm = () => {
  form.name = ''
  form.phone = ''
  form.region = ''
  form.detail = ''
  form.isDefault = false
  isEditing.value = false
  isAdding.value = false
  editingId.value = ''
}

const startAddAddress = () => {
  if (addresses.value.length >= 5) {
    alert('最多只能添加5个收货地址')
    return
  }
  isAdding.value = true
  resetForm()
}

const editAddress = (address: Address) => {
  isEditing.value = true
  editingId.value = address.id
  Object.assign(form, address)
}

const deleteAddress = (id: string) => {
  if (confirm('确定要删除这个地址吗？')) {
    addresses.value = addresses.value.filter(addr => addr.id !== id)
  }
}

const saveAddress = () => {
  const addressData = {
    id: isEditing.value ? editingId.value : Date.now().toString(),
    ...form
  }

  if (form.isDefault) {
    addresses.value.forEach(addr => addr.isDefault = false)
  }

  if (isEditing.value) {
    const index = addresses.value.findIndex(addr => addr.id === editingId.value)
    if (index !== -1) {
      addresses.value[index] = addressData
    }
  } else {
    addresses.value.push(addressData)
  }

  emit('save', addressData)
  resetForm()
}

const cancelEdit = () => {
  resetForm()
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