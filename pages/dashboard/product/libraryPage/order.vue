<template>
  <div class="container mx-auto py-3 px-4">
    <!-- 面包屑导航 -->
    <Breadcrumb :items="breadcrumbItems" />
    
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- 左侧区域 -->
      <div class="w-full lg:w-8/12 space-y-6">
        <!-- 收货地址 -->
        <div class="bg-white rounded-lg shadow relative">
          <div class="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 class="text-lg font-medium flex items-center">
              <div class="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-2 text-sm">1</div>
              收货地址
            </h2>
            <div class="flex space-x-2">
              <button 
                @click="showChangeAddressDialog = true" 
                class="text-blue-600 hover:text-blue-700 text-sm"
              >
                更换地址
              </button>
              <button 
                @click="showAddAddressDialog = true" 
                class="text-blue-600 hover:text-blue-700 text-sm"
              >
                添加新地址
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="selectedAddress" class="flex items-start">
              <div class="flex-1">
                <div class="flex items-center mb-2">
                  <div class="font-medium mr-2">{{ selectedAddress.name }}</div>
                  <div class="text-gray-600">{{ selectedAddress.phone }}</div>
                </div>
                <div class="text-gray-800">{{ selectedAddress.fullAddress }}</div>
              </div>
              <div class="ml-4" v-if="selectedAddress.isDefault">
                <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">默认地址</span>
              </div>
            </div>
            <div v-else class="text-gray-500 text-center py-4">
              请添加收货地址
            </div>
          </div>
        </div>

        <!-- 商品规格 -->
        <div class="bg-white rounded-lg shadow relative">
          <div class="flex justify-between items-center p-4 border-b border-gray-200">
            <div class="flex items-center">
              <div class="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-2 text-sm">2</div>
              <h2 class="text-lg font-medium">商品信息</h2>
            </div>
            <button 
              @click="addNewProduct" 
              class="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              添加商品
            </button>
          </div>

          <div class="p-4 border-b border-gray-200">
            <div class="text-xl font-medium mb-3">{{ productTitle }}</div>
          </div>

          <div v-for="(product, productIndex) in products" :key="productIndex" class="border-b border-gray-200 p-4">
            <div class="flex justify-between mb-3">
              <h3 class="font-medium text-gray-700">商品 {{ productIndex + 1 }}</h3>
              <button 
                @click="removeProduct(productIndex)" 
                class="text-red-500 hover:text-red-700"
                v-if="products.length > 1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <div class="flex space-x-4">
              <div class="w-24 h-24">
                <img :src="product.image" :alt="product.name" class="w-full h-full object-cover border border-gray-200">
              </div>
              <div class="flex-1">
                <!-- 颜色选择 -->
                <div class="mb-3">
                  <div class="flex items-center">
                    <span class="text-gray-500 mr-4 w-8">颜色</span>
                    <div class="flex items-center space-x-3">
                      <label v-for="color in product.colors" :key="color" class="cursor-pointer">
                        <input 
                          type="radio" 
                          :name="`color-${productIndex}`" 
                          :value="color" 
                          v-model="selectedOptions[productIndex].color"
                          class="hidden"
                        >
                        <span 
                          class="inline-block w-5 h-5 rounded-full border" 
                          :class="selectedOptions[productIndex].color === color ? 'ring-2 ring-blue-500 ring-offset-1' : ''"
                        >
                          <span v-if="color === '白色'" class="block w-full h-full rounded-full bg-white border border-gray-300"></span>
                          <span v-else-if="color === '黑色'" class="block w-full h-full rounded-full bg-black"></span>
                          <span v-else-if="color === '红色'" class="block w-full h-full rounded-full bg-red-600"></span>
                          <span v-else-if="color === '黄色'" class="block w-full h-full rounded-full bg-yellow-500"></span>
                          <span v-else-if="color === '蓝色'" class="block w-full h-full rounded-full bg-blue-600"></span>
                          <span v-else-if="color === '绿色'" class="block w-full h-full rounded-full bg-green-600"></span>
                          <span v-else-if="color === '灰色'" class="block w-full h-full rounded-full bg-gray-500"></span>
                          <span v-else class="block w-full h-full rounded-full bg-gray-300"></span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <!-- 尺寸选择 -->
                <div class="mb-3">
                  <div class="flex items-center">
                    <span class="text-gray-500 mr-4 w-8">尺码</span>
                    <div class="flex flex-wrap gap-2">
                      <label 
                        v-for="size in product.sizes" 
                        :key="size" 
                        class="cursor-pointer"
                      >
                        <input 
                          type="radio" 
                          :name="`size-${productIndex}`" 
                          :value="size" 
                          v-model="selectedOptions[productIndex].size"
                          class="hidden"
                        >
                        <span 
                          class="inline-block px-3 py-1 text-center text-xs border rounded-md"
                          :class="selectedOptions[productIndex].size === size ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-700'"
                        >
                          {{ size }}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- 单价和数量 -->
                <div class="flex justify-between items-center mt-4">
                  <div class="text-gray-500">
                    <span class="mr-4 w-8">单价</span>
                    <span class="font-medium">¥ {{ product.price.toFixed(2) }}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-gray-500 mr-2">数量</span>
                    <div class="flex items-center border border-gray-300 rounded-md">
                      <button 
                        @click="decreaseQuantity(productIndex)" 
                        class="px-2 py-1 text-gray-500 hover:text-gray-700"
                        :disabled="selectedOptions[productIndex].quantity <= 1"
                        :class="{'opacity-50 cursor-not-allowed': selectedOptions[productIndex].quantity <= 1}"
                      >
                        -
                      </button>
                      <div class="px-2 min-w-[40px] text-center">{{ selectedOptions[productIndex].quantity }}</div>
                      <button 
                        @click="increaseQuantity(productIndex)" 
                        class="px-2 py-1 text-gray-500 hover:text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧区域 -->
      <div class="w-full lg:w-4/12 space-y-6">
        <!-- 费用总计 -->
        <div class="bg-white rounded-lg shadow relative">
          <div class="flex items-center p-4 border-b border-gray-200">
            <div class="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-2 text-sm">3</div>
            <h2 class="text-lg font-medium">费用总计</h2>
          </div>
          <div class="p-4">
            <div class="flex justify-between mb-2">
              <div class="text-gray-600">商品总计 {{ totalItems }}件</div>
              <div class="font-medium">¥ {{ subTotal.toFixed(2) }}</div>
            </div>
            <div class="flex justify-between mb-2">
              <div class="text-gray-600">运费</div>
              <div class="font-medium">¥ {{ shippingFee.toFixed(2) }}</div>
            </div>
            <div class="border-t border-gray-200 mt-4 pt-4">
              <div class="flex justify-between">
                <div class="text-gray-600">实付金额</div>
                <div class="text-xl font-bold text-red-500">¥ {{ totalAmount.toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 备注 -->
        <div class="bg-white rounded-lg shadow relative">
          <div class="flex items-center p-4 border-b border-gray-200">
            <div class="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-2 text-sm">4</div>
            <h2 class="text-lg font-medium">备注</h2>
          </div>
          <div class="p-4">
            <textarea 
              v-model="orderNote" 
              placeholder="请输入" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px] focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <!-- 底部操作栏 -->
        <div class="flex justify-between mt-6">
          <button @click="goBack" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            返回
          </button>
          <button @click="submitOrder" class="px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            立即下单
          </button>
        </div>
      </div>
    </div>

    <!-- 更换地址弹窗 -->
    <div v-if="showChangeAddressDialog" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="showChangeAddressDialog = false">
          <div class="fixed inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">更换收货地址</h3>
            <button @click="showChangeAddressDialog = false" class="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="max-h-80 overflow-y-auto">
              <div 
                v-for="address in addresses" 
                :key="address.id" 
                class="border border-gray-200 rounded-md p-4 mb-3"
                :class="{'border-blue-500 bg-blue-50': tempSelectedAddress && tempSelectedAddress.id === address.id}"
              >
                <div class="flex items-start">
                  <input 
                    type="checkbox" 
                    :checked="tempSelectedAddress && tempSelectedAddress.id === address.id"
                    @change="selectAddress(address)"
                    class="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  
                  <div class="ml-4 flex-1">
                    <div class="flex justify-between mb-1">
                      <div class="font-medium">{{ address.name }}</div>
                      <div class="text-gray-600">{{ address.phone }}</div>
                    </div>
                    <div class="text-gray-700 text-sm mb-2">{{ address.fullAddress }}</div>
                    
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <input 
                          type="checkbox" 
                          :checked="address.isDefault" 
                          @change="setAsDefault(address.id)"
                          class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          :id="'default-' + address.id"
                        />
                        <label :for="'default-' + address.id" class="ml-2 text-sm text-gray-700">设为默认</label>
                      </div>
                      
                      <div class="flex space-x-3">
                        <button @click="editAddress(address)" class="text-blue-600 hover:text-blue-800 text-sm">
                          <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            编辑
                          </div>
                        </button>
                        <button @click="deleteAddress(address.id)" class="text-red-600 hover:text-red-800 text-sm">
                          <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            删除
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              @click="openAddAddress"
              class="w-full mt-2 mb-3 flex items-center justify-center border border-gray-300 rounded-md py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              添加地址
            </button>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
              @click="confirmChangeAddress"
            >
              确认
            </button>
            <button 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="showChangeAddressDialog = false"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加新地址弹窗 -->
    <div v-if="showAddAddressDialog" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="showAddAddressDialog = false">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ isEditMode ? '编辑地址' : '添加新地址' }}</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">收货人</label>
                <input 
                  v-model="newAddress.name" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="请输入收货人姓名"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
                <input 
                  v-model="newAddress.phone" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="请输入手机号码"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">详细地址</label>
                <textarea 
                  v-model="newAddress.fullAddress" 
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px]"
                  placeholder="请输入详细地址，包括省市区街道门牌号"
                ></textarea>
              </div>
              <div class="flex items-center">
                <input 
                  id="setDefault" 
                  type="checkbox" 
                  v-model="newAddress.isDefault"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="setDefault" class="ml-2 block text-sm text-gray-900">
                  设为默认地址
                </label>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
              @click="addNewAddress"
            >
              保存
            </button>
            <button 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="cancelAddAddress"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品选择弹窗 -->
    <div v-if="showProductSelector" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="closeProductSelector">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="w-full">
                <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">选择商品</h3>
                <div class="max-h-80 overflow-y-auto">
                  <div 
                    v-for="product in availableProducts" 
                    :key="product.id" 
                    class="border border-gray-200 rounded-md p-4 mb-3 cursor-pointer hover:border-blue-500"
                    :class="{'border-blue-500 bg-blue-50': selectedProductId === product.id}"
                    @click="selectProduct(product)"
                  >
                    <div class="flex">
                      <div class="w-16 h-16 rounded-md overflow-hidden">
                        <img 
                          :src="product.image" 
                          :alt="product.name" 
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <div class="ml-3">
                        <div class="font-medium">{{ product.name }}</div>
                        <div class="text-sm text-gray-500">¥{{ product.price.toFixed(2) }}</div>
                        <div class="text-xs text-gray-500 mt-1">
                          <span class="mr-2">颜色: {{ product.colors.join(', ') }}</span>
                          <span>尺寸: {{ product.sizes.join(', ') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
              @click="confirmProductSelection"
              :disabled="!selectedProductId"
              :class="{'opacity-50 cursor-not-allowed': !selectedProductId}"
            >
              确认
            </button>
            <button 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="closeProductSelector"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Breadcrumb from '~/components/Breadcrumb.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
  breadcrumbs: [
    { name: '我的产品', path: '/dashboard/product' },
    { name: '产品库', path: '/dashboard/product/library' },
    { name: '立即下单' }
  ]
})

const router = useRouter()
const route = useRoute()
const productId = computed(() => Number(route.query.productId))
const productTitle = ref('成人衫棉圆领短袖')

// 收货地址相关
const showChangeAddressDialog = ref(false)
const showAddAddressDialog = ref(false)
const selectedAddress = ref<{ id: number; name: string; phone: string; fullAddress: string; isDefault: boolean } | null>(null)
const tempSelectedAddress = ref<{ id: number; name: string; phone: string; fullAddress: string; isDefault: boolean } | null>(null)
const addresses = ref([
  {
    id: 1,
    name: '林可',
    phone: '12345677890',
    fullAddress: '广东省 深圳市 南山区 西北半岛西',
    isDefault: true
  },
  {
    id: 2,
    name: '张三',
    phone: '13987654321',
    fullAddress: '北京市 朝阳区 建国路88号',
    isDefault: false
  }
])

// 新地址
const newAddress = reactive({
  id: 0,
  name: '',
  phone: '',
  fullAddress: '',
  isDefault: false
})

// 编辑模式标志
const isEditMode = ref(false)

// 商品数据
interface ProductOption {
  color: string;
  size: string;
  quantity: number;
}

// 产品列表
const products = ref([
  {
    id: 1,
    name: '成人衫棉圆领短袖',
    image: '/assets/products/tshirt-1.svg',
    price: 20.00,
    colors: ['白色', '红色', '黄色', '蓝色', '黑色'],
    sizes: ['S', 'M', 'L', 'XL'],
  }
])

// 选中的选项
const selectedOptions = ref<ProductOption[]>([
  { color: '白色', size: 'S', quantity: 1 }
])

// 订单备注
const orderNote = ref('')

// 费用相关
const shippingFee = ref(0)
const subTotal = computed(() => {
  return selectedOptions.value.reduce((total, option, index) => {
    return total + (products.value[index].price * option.quantity)
  }, 0)
})
const totalAmount = computed(() => {
  return subTotal.value + shippingFee.value
})
const totalItems = computed(() => {
  return selectedOptions.value.reduce((total, option) => {
    return total + option.quantity
  }, 0)
})

// 自定义面包屑配置
const breadcrumbItems = [
  { name: '我的产品', path: '/dashboard/product' },
  { name: '产品库', path: '/dashboard/product/library' },
  { name: '立即下单' }
]

// 初始化数据
onMounted(async () => {
  // 设置默认地址
  selectedAddress.value = addresses.value.find(addr => addr.isDefault) || addresses.value[0]
  
  // 根据商品ID获取商品信息
  if (productId.value) {
    await loadProductData()
  }
})

// 加载商品数据
const loadProductData = async () => {
  try {
    // 模拟从API获取数据
    // 实际应用中，这里应该调用API获取商品详情
    const productsData = [
      {
        id: 1,
        name: '适用于iPhone14全包防摔手机壳',
        image: '/assets/products/phone-case-1.svg',
        price: 20.00,
        colors: ['白色', '黑色', '绿色', '红色'],
        sizes: ['iPhone 14', 'iPhone 14 Pro', 'iPhone 14 Pro Max'],
      },
      {
        id: 2,
        name: '时尚运动健身T恤',
        image: '/assets/products/tshirt-1.svg',
        price: 20.00,
        colors: ['黑色', '白色', '红色', '灰色', '蓝色'],
        sizes: ['S', 'M', 'L', 'XL'],
      }
    ]
    
    const product = productsData.find(p => p.id === productId.value)
    
    if (product) {
      products.value = [product]
      productTitle.value = product.name
      
      // 默认选择第一个颜色和尺寸
      selectedOptions.value = [
        {
          color: product.colors[0],
          size: product.sizes[0],
          quantity: 1
        }
      ]
    } else {
      // 商品不存在，返回上一页
      router.replace('/dashboard/product/library')
    }
  } catch (error) {
    console.error('加载商品数据失败:', error)
  }
}

// 增加商品数量
const increaseQuantity = (index: number) => {
  selectedOptions.value[index].quantity++
}

// 减少商品数量
const decreaseQuantity = (index: number) => {
  if (selectedOptions.value[index].quantity > 1) {
    selectedOptions.value[index].quantity--
  }
}

// 选择地址
const selectAddress = (address: { id: number; name: string; phone: string; fullAddress: string; isDefault: boolean }) => {
  tempSelectedAddress.value = address
}

// 确认更换地址
const confirmChangeAddress = () => {
  if (tempSelectedAddress.value) {
    selectedAddress.value = tempSelectedAddress.value
  }
  showChangeAddressDialog.value = false
}

// 编辑地址
const editAddress = (address: { id: number; name: string; phone: string; fullAddress: string; isDefault: boolean }) => {
  // 复制地址信息到newAddress
  newAddress.id = address.id
  newAddress.name = address.name
  newAddress.phone = address.phone
  newAddress.fullAddress = address.fullAddress
  newAddress.isDefault = address.isDefault
  
  // 设置编辑模式
  isEditMode.value = true
  
  // 关闭当前弹窗，打开添加地址弹窗
  showChangeAddressDialog.value = false
  showAddAddressDialog.value = true
}

// 添加新地址
const addNewAddress = () => {
  // 验证表单
  if (!newAddress.name || !newAddress.phone || !newAddress.fullAddress) {
    alert('请填写完整的地址信息')
    return
  }
  
  if (isEditMode.value) {
    // 编辑现有地址
    const index = addresses.value.findIndex(addr => addr.id === newAddress.id)
    if (index !== -1) {
      // 如果设为默认地址，取消其他地址的默认状态
      if (newAddress.isDefault) {
        addresses.value.forEach(addr => {
          if (addr.id !== newAddress.id) {
            addr.isDefault = false
          }
        })
      }
      
      // 更新地址
      addresses.value[index] = { ...newAddress }
    }
  } else {
    // 添加新地址
    
    // 如果设为默认地址，取消其他地址的默认状态
    if (newAddress.isDefault) {
      addresses.value.forEach(addr => {
        addr.isDefault = false
      })
    }
    
    // 添加新地址
    const newId = addresses.value.length > 0 ? Math.max(...addresses.value.map(a => a.id)) + 1 : 1
    
    const address = {
      id: newId,
      name: newAddress.name,
      phone: newAddress.phone,
      fullAddress: newAddress.fullAddress,
      isDefault: newAddress.isDefault
    }
    
    addresses.value.push(address)
    
    // 如果是默认地址或没有选中地址，自动选中新地址
    if (newAddress.isDefault || !selectedAddress.value) {
      selectedAddress.value = address
      tempSelectedAddress.value = address
    }
  }
  
  // 重置表单和编辑模式
  resetAddressForm()
  
  // 关闭弹窗
  showAddAddressDialog.value = false
  
  // 如果是从更换地址弹窗过来的，则返回
  if (isEditMode.value) {
    showChangeAddressDialog.value = true
    isEditMode.value = false
  }
}

// 重置地址表单
const resetAddressForm = () => {
  newAddress.id = 0
  newAddress.name = ''
  newAddress.phone = ''
  newAddress.fullAddress = ''
  newAddress.isDefault = false
  isEditMode.value = false
}

// 删除地址
const deleteAddress = (id: number) => {
  // 确认删除
  if (confirm('确定要删除此地址吗？')) {
    // 如果删除的是当前选中的地址，重置选中状态
    if (tempSelectedAddress.value && tempSelectedAddress.value.id === id) {
      tempSelectedAddress.value = null
    }
    
    if (selectedAddress.value && selectedAddress.value.id === id) {
      // 删除选中的地址，重新选择一个默认地址
      const defaultAddress = addresses.value.find(addr => addr.id !== id && addr.isDefault)
      if (defaultAddress) {
        selectedAddress.value = defaultAddress
      } else if (addresses.value.length > 1) {
        // 选择第一个非当前地址
        const otherAddress = addresses.value.find(addr => addr.id !== id)
        selectedAddress.value = otherAddress || null
      } else {
        selectedAddress.value = null
      }
    }
    
    // 从地址列表中移除
    addresses.value = addresses.value.filter(addr => addr.id !== id)
  }
}

// 打开添加地址弹窗
const openAddAddress = () => {
  resetAddressForm()
  showChangeAddressDialog.value = false
  showAddAddressDialog.value = true
}

// 提交订单
const submitOrder = () => {
  if (!selectedAddress.value) {
    alert('请选择收货地址')
    return
  }
  
  // 生成一个模拟的订单号
  const orderId = Math.floor(100000000 + Math.random() * 900000000).toString()
  
  // 跳转到订单成功页面，传递订单信息
  router.push({
    path: '/dashboard/product/libraryPage/order-success',
    query: {
      orderId,
      address: encodeURIComponent(JSON.stringify(selectedAddress.value)),
      amount: totalAmount.value.toString()
    }
  })
}

// 返回
const goBack = () => {
  router.back()
}

// 添加新商品
const addNewProduct = async () => {
  // 显示商品选择弹窗
  showProductSelector.value = true;
  
  // 等待用户选择商品
  const selectedProduct = await showProductSelectionModal();
  
  if (selectedProduct) {
    // 添加选中的商品，确保创建新对象避免引用问题
    const newProduct = { ...selectedProduct };
    products.value.push(newProduct);
    
    // 为新商品添加默认选项
    selectedOptions.value.push({
      color: newProduct.colors[0],
      size: newProduct.sizes[0],
      quantity: 1
    });
  }
}

// 模拟商品选择对话框
const showProductSelectionModal = () => {
  return new Promise<{
    id: number;
    name: string;
    image: string;
    price: number;
    colors: string[];
    sizes: string[];
  } | undefined>((resolve) => {
    // 这个函数不再直接返回结果，而是通过UI交互选择
    // 我们将在confirmProductSelection中处理选择结果
    productSelectionResolve = resolve;
  });
}

// 存储Promise的resolve函数
let productSelectionResolve: ((value: any) => void) | null = null;

// 确认商品选择
const confirmProductSelection = () => {
  if (selectedProductId.value && productSelectionResolve) {
    // 找到选中的商品
    const selectedProduct = availableProducts.value.find(p => p.id === selectedProductId.value);
    
    // 解析Promise，返回选中的商品
    productSelectionResolve(selectedProduct);
    productSelectionResolve = null;
  }
  
  // 关闭弹窗
  selectedProductId.value = null;
  showProductSelector.value = false;
}

// 移除商品
const removeProduct = (index: number) => {
  // 确保至少保留一个商品
  if (products.value.length > 1) {
    products.value.splice(index, 1)
    selectedOptions.value.splice(index, 1)
  }
}

// 商品选择相关
const showProductSelector = ref(false)
const selectedProductId = ref<number | null>(null)
const availableProducts = ref([
  {
    id: 1,
    name: '适用于iPhone14全包防摔手机壳',
    image: '/assets/products/phone-case-1.svg',
    price: 20.00,
    colors: ['白色', '黑色', '绿色', '红色'],
    sizes: ['iPhone 14', 'iPhone 14 Pro', 'iPhone 14 Pro Max'],
  },
  {
    id: 2,
    name: '时尚运动健身T恤',
    image: '/assets/products/tshirt-1.svg',
    price: 20.00,
    colors: ['黑色', '白色', '红色', '灰色', '蓝色'],
    sizes: ['S', 'M', 'L', 'XL'],
  }
])

const selectProduct = (product: { id: number; name: string; image: string; price: number; colors: string[]; sizes: string[] }) => {
  selectedProductId.value = product.id
}

const closeProductSelector = () => {
  selectedProductId.value = null
  showProductSelector.value = false
}

// 设置为默认地址
const setAsDefault = (id: number) => {
  addresses.value.forEach(addr => {
    if (addr.id === id) {
      addr.isDefault = true
    } else {
      addr.isDefault = false
    }
  })
}

// 取消添加地址
const cancelAddAddress = () => {
  resetAddressForm()
  showAddAddressDialog.value = false
  
  // 如果是从更换地址弹窗来的，则返回
  if (isEditMode.value) {
    isEditMode.value = false
    showChangeAddressDialog.value = true
  }
}
</script>

<style scoped>
</style> 