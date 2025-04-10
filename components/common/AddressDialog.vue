<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" @click="close">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-6 pt-5 pb-4">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-medium text-gray-900">{{ props.editingAddress ? '编辑地址' : '新增地址' }}</h3>
            <button @click="close" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 地址表单 -->
          <form @submit.prevent="handleSave" class="space-y-5">
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
              <div class="flex-1">
                <div class="mb-2">
                  <select 
                    v-model="regionMode" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="china">中国地区</option>
                    <option value="world">海外地区</option>
                  </select>
                </div>
                <CascaderSelect 
                  :value="regionValue"
                  :mode="regionMode"
                  @change="handleRegionChange"
                  class="w-full"
                />
                <div v-if="showRegionError" class="text-red-500 text-sm mt-1">
                  请选择完整的地区信息
                </div>
              </div>
            </div>

            <div class="flex items-start">
              <label class="block w-20 text-gray-700 pt-2">详细地址</label>
              <textarea 
                v-model="form.address" 
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
            @click="handleSave" 
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
import { ref, reactive, watch, computed, onBeforeUnmount, onMounted, toRefs } from 'vue'
import CascaderSelect from './CascaderSelect.vue'

// 控制页面滚动的函数
const disableScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = '15px' // 防止滚动条消失导致页面抖动
}

const enableScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

interface Address {
  id?: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  address: string
  isDefault: boolean
}

const props = withDefaults(defineProps<{
  show: boolean
  editingAddress?: Address | null
}>(), {
  show: false,
  editingAddress: null
})

// 使用toRefs将props转换为响应式引用，避免直接访问props
const { show, editingAddress } = toRefs(props)

// 监听show属性变化来控制页面滚动
watch(show, (newVal) => {
  if (newVal) {
    disableScroll()
  } else {
    enableScroll()
  }
})

// 组件卸载前确保恢复页面滚动
onBeforeUnmount(() => {
  enableScroll()
})

const emit = defineEmits(['update:show', 'save'])

const addresses = ref<Address[]>([
  // 国内地址
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    province: '浙江省',
    city: '杭州市',
    district: '西湖区',
    address: '文三路 123 号',
    isDefault: true
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    address: '建国路 456 号',
    isDefault: false
  },
  // 海外地址
  {
    id: 3,
    name: 'Tom',
    phone: '13700137000',
    province: 'United States',
    city: 'New York',
    district: 'Manhattan',
    address: '123 Main Street',
    isDefault: false
  },
  {
    id: 4,
    name: 'John',
    phone: '13600136000',
    province: 'United Kingdom',
    city: 'London',
    district: 'Westminster',
    address: '45 Oxford Street',
    isDefault: false
  },
  {
    id: 5,
    name: 'Marie',
    phone: '13500135000',
    province: 'France',
    city: 'Paris',
    district: '8th arrondissement',
    address: '15 Avenue des Champs-Élysées',
    isDefault: false
  },
  {
    id: 6,
    name: 'Hans',
    phone: '13400134000',
    province: 'Germany',
    city: 'Berlin',
    district: 'Mitte',
    address: 'Unter den Linden 10',
    isDefault: false
  },
  {
    id: 7,
    name: 'Marco',
    phone: '13300133000',
    province: 'Italy',
    city: 'Rome',
    district: 'Historic Centre',
    address: 'Via del Corso 20',
    isDefault: false
  },
  {
    id: 8,
    name: 'Yuki',
    phone: '13200132000',
    province: 'Japan',
    city: 'Tokyo',
    district: 'Shibuya',
    address: '1-2-3 Shibuya',
    isDefault: false
  },
  {
    id: 9,
    name: 'James',
    phone: '13100131000',
    province: 'Australia',
    city: 'Sydney',
    district: 'CBD',
    address: '100 George Street',
    isDefault: false
  },
  {
    id: 10,
    name: 'Sophie',
    phone: '13000130000',
    province: 'Canada',
    city: 'Toronto',
    district: 'Downtown',
    address: '200 Bay Street',
    isDefault: false
  }
])
const isEditing = ref(false)
const isAdding = ref(false)
const editingId = ref('')

const form = reactive<Address>({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  address: '',
  isDefault: false
})

const showRegionError = ref(false)

const regionMode = ref('china')

const handleRegionChange = (selectedRegion: { province: string; city: string; district: string }) => {
  form.province = selectedRegion.province
  form.city = selectedRegion.city
  form.district = selectedRegion.district
}

const close = () => {
  emit('update:show', false)
  resetForm()
}

const resetForm = () => {
  form.name = ''
  form.phone = ''
  form.province = ''
  form.city = ''
  form.district = ''
  form.address = ''
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
  editingId.value = address.id?.toString() || ''
  Object.assign(form, address)
}

const deleteAddress = (id: string) => {
  if (confirm('确定要删除这个地址吗？')) {
    addresses.value = addresses.value.filter(addr => addr.id?.toString() !== id)
  }
}

const validateRegion = (): boolean => {
  if (!form.province || !form.city || !form.district) {
    showRegionError.value = true
    return false
  }
  showRegionError.value = false
  return true
}

const handleSave = () => {
  if (!validateRegion()) {
    return
  }

  const addressData: Address = {
    ...form,
    id: props.editingAddress?.id
  }

  if (form.isDefault) {
    addresses.value.forEach(addr => addr.isDefault = false)
  }

  if (isEditing.value) {
    const index = addresses.value.findIndex(addr => addr.id?.toString() === editingId.value)
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

// 计算属性：地区值
const regionValue = computed(() => ({
  province: form.province,
  city: form.city,
  district: form.district
}))

// 判断是否为中国地址
const isChineseAddress = (province: string): boolean => {
  if (!province) return true
  return !province.includes('国') && !province.includes('State') && !province.includes('Province')
}

// 监听编辑地址的变化
watch(editingAddress, (newAddress) => {
  if (newAddress) {
    // 如果是编辑模式，填充表单数据
    form.name = newAddress.name
    form.phone = newAddress.phone
    form.province = newAddress.province || ''
    form.city = newAddress.city || ''
    form.district = newAddress.district || ''
    form.address = newAddress.address
    form.isDefault = newAddress.isDefault
    
    // 根据地址判断是国内还是海外地址
    regionMode.value = isChineseAddress(newAddress.province) ? 'china' : 'world'
  } else {
    // 如果是新增模式，重置表单
    resetForm()
    regionMode.value = 'china' // 默认选择中国地区
  }
}, { immediate: true })

// 监听弹窗显示状态
watch(show, (newVal) => {
  if (!newVal) {
    // 关闭弹窗时重置表单
    if (!editingAddress.value) {
      Object.assign(form, {
        name: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        address: '',
        isDefault: false
      })
    }
  }
})
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