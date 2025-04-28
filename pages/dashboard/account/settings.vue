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
      
      <!-- 地址列表 -->
      <div class="divide-y divide-gray-200">
        <div v-for="address in addressList" 
             :key="address.id" 
             class="p-6 relative hover:bg-gray-50"
             :class="{ 'opacity-50': isSubmitting }"
        >
          <div class="flex justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span class="font-medium mr-4">{{ address.name }}</span>
                <span class="text-gray-600">{{ address.phone }}</span>
                <span v-if="address.isDefault" 
                      class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded"
                >
                  默认
                </span>
              </div>
              <div class="text-gray-600">{{ address.address }}</div>
            </div>
            <div class="flex items-center space-x-4 ml-4">
              <button 
                v-if="!address.isDefault"
                @click="setDefaultAddress(address)"
                class="text-blue-500 hover:text-blue-700 whitespace-nowrap disabled:opacity-50"
                :disabled="isSubmitting"
              >
                设为默认
              </button>
              <button 
                class="text-blue-500 hover:text-blue-700 whitespace-nowrap disabled:opacity-50"
                :disabled="isSubmitting"
                @click="openEditAddressDialog(address)"
              >
                编辑
              </button>
              <button 
                @click="openDeleteConfirmDialog(address)"
                class="text-red-500 hover:text-red-700 whitespace-nowrap disabled:opacity-50"
                :disabled="isSubmitting"
              >
                删除
              </button>
            </div>
          </div>
        </div>

        <!-- 添加新地址按钮 -->
        <div v-if="addressList.length < 5" class="p-4">
          <button 
            @click="openAddAddressDialog"
            class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center text-gray-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isSubmitting"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            添加新地址
          </button>
        </div>
        <!-- 达到上限提示 -->
        <div v-else class="p-4 text-center text-gray-500 text-sm">
          最多只能添加5个收货地址
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
      :editing-address="editingAddress"
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

    <!-- 删除确认弹窗 -->
    <DeleteConfirmDialog
      v-model:show="showDeleteConfirmDialog"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useToast } from '../../../composables/useToast'
import AddressDialog from '../../../components/common/AddressDialog.vue'
import InvoiceDialog from '../../../components/common/InvoiceDialog.vue'
import DeleteConfirmDialog from '../../../components/common/DeleteConfirmDialog.vue'
import { useUserStore } from '@/stores/user'
import { doGetAddressList, doGetAddress ,doPutAddress, doPostAddress, doDelAddress } from '@/apis/accountManage'

const toast = useToast()
const userStore = useUserStore()
const loading = ref(false)

interface Address {
  id: number
  contactName: string
  contactPhone: string
  address: string
  defReceive: string
}

interface InvoiceInfo {
  companyName: string
  taxNumber: string
  address: string
  phone: string
  bankName: string
  bankAccount: string
}

// 控制地址弹窗显示
const showAddressDialog = ref(false)
const editingAddress = ref<Address | null>(null)

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

// 初始地址数据
const initialAddresses = [
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    address: '广东省深圳市南山区科技园南区 1号楼 A座 1001室',
    isDefault: true
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    address: '广东省深圳市福田区车公庙 2号街 B栋 2002室',
    isDefault: false
  },
  {
    id: 3,
    name: '王五',
    phone: '13700137000',
    address: '广东省深圳市宝安区西乡街道 海滨广场 C座 3003室',
    isDefault: false
  },
  {
    id: 4,
    name: '赵六',
    phone: '13600136000',
    address: '广东省深圳市龙岗区横岗街道 龙园大厦 D座 4004室',
    isDefault: false
  },
  {
    id: 5,
    name: '陈七',
    phone: '13500135000',
    address: '广东省深圳市罗湖区笋岗街道 城市广场 E座 5005室',
    isDefault: false
  }
]

// 地址列表数据
const addressList = ref<Address[]>(initialAddresses)
const isSubmitting = ref(false)

// 从本地存储加载地址列表
const loadAddressList = async () => {
  try {
    const req = {
      current: 1,
      size: 10
    }
    const res = await doGetAddressList(req)
    // if(res.code === 200 && res.data) {
    //   addressList.value = res.data.records
    // }
  } catch (error) {
    toast.error('加载地址列表失败')
  }
}

// 保存地址列表到本地存储
const saveAddressList = async () => {
  try {
    const req = {
      name: '张三',
      phone: '13800138000',
      address: '广东省深圳市南山区科技园南区 1号楼 A座 1001室',
      isDefault: true
    }
    const res = await doPostAddress(req)
  } catch (error) {
    toast.error('保存地址失败')
    throw error
  }
}

// 控制删除确认弹窗显示
const showDeleteConfirmDialog = ref(false)
const addressToDelete = ref<Address | null>(null)

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
const handleSaveAddress = async (address: Address) => {
  try {
    const res = await doPostAddress(address)
    console.log(res)
    showAddressDialog.value = false
  } catch (error) {
    toast.error('保存地址失败')
  }
}

// 处理保存开票资料
const handleSaveInvoice = (info: InvoiceInfo) => {
  console.log('保存开票资料:', info)
  // 更新开票资料
  Object.assign(invoiceInfo, info)
}

// 打开删除确认弹窗
const openDeleteConfirmDialog = (address: Address) => {
  addressToDelete.value = address
  showDeleteConfirmDialog.value = true
}

// 处理地址删除确认
const handleDeleteConfirm = async () => {
  if (!addressToDelete.value) return
  
  try {
    isSubmitting.value = true
    
    const res = await doDelAddress(addressToDelete.value.id)
    if(res.code === 200) {
      toast.success('地址删除成功')
      // 保存更新后的列表
      loadAddressList()
      showDeleteConfirmDialog.value = false
    }
  } catch (error) {
    toast.error('删除地址失败')
  } finally {
    isSubmitting.value = false
    addressToDelete.value = null
  }
}

// 设置默认地址
const setDefaultAddress = async (address: Address) => {
  try {
    isSubmitting.value = true
    
    // 更新地址列表中的默认状态
    addressList.value = addressList.value.map(addr => ({
      ...addr,
      isDefault: addr.id === address.id
    }))
    
    // 保存更新后的列表
    saveAddressList()
    
    toast.success('默认地址设置成功')
  } catch (error) {
    toast.error('设置默认地址失败')
  } finally {
    isSubmitting.value = false
  }
}

// 打开编辑地址弹窗
const openEditAddressDialog = (address: Address) => {
  console.log(address)
  editingAddress.value = { ...address } // 创建地址对象的副本
  showAddressDialog.value = true
}

// 打开新增地址弹窗
const openAddAddressDialog = () => {
  editingAddress.value = null
  showAddressDialog.value = true
}

// 在组件挂载时加载数据
onMounted(() => {
  loadAddressList()
})

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

/* 确保按钮文字不换行 */
button {
  white-space: nowrap;
}

/* 地址项样式优化 */
.divide-y > div {
  @apply transition-colors duration-200;
}

/* 加载动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>