<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    
    <!-- 弹窗内容 -->
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="relative bg-white rounded-lg w-full max-w-7xl mx-auto">
        <!-- 弹窗头部 -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-medium">拆分订单</h3>
          <button @click="handleClose" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 弹窗内容 -->
        <div class="p-6">
          <div class="flex space-x-4 items-start">
            <!-- 左侧：原订单商品列表 -->
            <div class="w-[45%] border rounded-lg overflow-hidden">
              <div class="bg-gray-50 p-3 border-b">
                <h4 class="font-medium">原订单商品信息</h4>
              </div>
              <div class="max-h-[600px] overflow-y-auto px-4">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        商品信息
                      </th>
                      <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        数量/单价
                      </th>
                      <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(product, index) in originalProducts" :key="product.id" class="hover:bg-gray-50">
                      <td class="px-3 py-4">
                        <div class="flex items-start">
                          <div class="flex items-center mr-3">
                            <input
                              type="checkbox"
                              :checked="product.selected"
                              @change="product.selected = !product.selected"
                              class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                          </div>
                          <img class="h-16 w-16 rounded-md object-cover mr-3" :src="product.image || 'https://via.placeholder.com/100'" alt="" />
                          <div>
                            <div class="text-sm text-gray-900">{{ product.name }}</div>
                            <div class="text-sm text-gray-500">规格：{{ product.spec }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        *{{ product.quantity }} / ¥ {{ product.price.toFixed(2) }}
                      </td>
                      <td class="px-3 py-4 whitespace-nowrap">
                        <button 
                          @click="moveProductToSubOrder(product)"
                          :disabled="selectedSubOrderIndex === null"
                          :class="{
                            'text-blue-600 hover:text-blue-800': selectedSubOrderIndex !== null,
                            'text-gray-400 cursor-not-allowed': selectedSubOrderIndex === null
                          }"
                          class="text-sm"
                        >
                          移入子订单
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 分页 -->
              <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div class="flex-1 flex justify-between sm:hidden">
                  <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    上一页
                  </button>
                  <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    下一页
                  </button>
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      显示第 <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> 到 <span class="font-medium">{{ Math.min(currentPage * pageSize, totalProducts) }}</span> 条，共 <span class="font-medium">{{ totalProducts }}</span> 条
                    </p>
                  </div>
                  <div>
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span class="sr-only">上一页</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        v-for="page in displayedPages" 
                        :key="page" 
                        @click="changePage(page)" 
                        :class="[
                          'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                          currentPage === page ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        ]"
                      >
                        {{ page }}
                      </button>
                      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span class="sr-only">下一页</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <!-- 中间的移动按钮组 -->
            <div class="flex flex-col items-center justify-center space-y-2 pt-20">
              <button
                @click="moveSelectedProductsToOriginal"
                :disabled="!selectedSubOrderIndex || !hasSelectedProductsInSubOrder"
                :class="{
                  'bg-blue-500 hover:bg-blue-600': selectedSubOrderIndex && hasSelectedProductsInSubOrder,
                  'bg-gray-300 cursor-not-allowed': !selectedSubOrderIndex || !hasSelectedProductsInSubOrder
                }"
                class="p-2 rounded-full transition-colors"
              >
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                @click="moveSelectedProductsToSubOrder"
                :disabled="!selectedSubOrderIndex || !hasSelectedProductsInOriginal"
                :class="{
                  'bg-blue-500 hover:bg-blue-600': selectedSubOrderIndex && hasSelectedProductsInOriginal,
                  'bg-gray-300 cursor-not-allowed': !selectedSubOrderIndex || !hasSelectedProductsInOriginal
                }"
                class="p-2 rounded-full transition-colors"
              >
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- 右侧：子订单列表 -->
            <div class="w-[45%]">
              <div class="flex justify-between items-center mb-4">
                <h4 class="font-medium">子订单列表</h4>
                <button 
                  @click="addSubOrder"
                  :disabled="subOrders.length >= maxSubOrders"
                  :class="{
                    'bg-blue-600 hover:bg-blue-700': subOrders.length < maxSubOrders,
                    'bg-gray-400 cursor-not-allowed': subOrders.length >= maxSubOrders
                  }"
                  class="px-3 py-1 text-sm text-white rounded-md transition-colors"
                >
                  新增子订单
                </button>
              </div>

              <div class="max-h-[600px] overflow-y-auto space-y-4 px-4">
                <div 
                  v-for="(subOrder, index) in subOrders" 
                  :key="index"
                  class="border rounded-lg overflow-hidden"
                  :class="{ 'ring-2 ring-blue-500': selectedSubOrderIndex === index }"
                >
                  <div class="bg-gray-50 p-4 border-b flex justify-between items-center">
                    <h5 class="font-medium">子订单：xx-{{ index + 1 }}</h5>
                    <div class="flex space-x-2">
                      <button 
                        @click="selectSubOrder(index)"
                        class="px-2 py-1 text-xs border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                      >
                        {{ selectedSubOrderIndex === index ? '已选中' : '选择' }}
                      </button>
                      <button 
                        v-if="subOrders.length > 2"
                        @click="removeSubOrder(index)"
                        class="px-2 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-50"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          商品信息
                        </th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          数量/单价
                        </th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <template v-if="subOrder.products.length > 0">
                        <tr v-for="(product, productIndex) in subOrder.products" :key="productIndex" class="hover:bg-gray-50">
                          <td class="px-3 py-4">
                            <div class="flex items-start">
                              <div class="flex items-center mr-3">
                                <input
                                  type="checkbox"
                                  :checked="product.selected"
                                  @change="product.selected = !product.selected"
                                  class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                              </div>
                              <img class="h-16 w-16 rounded-md object-cover mr-3" :src="product.image || 'https://via.placeholder.com/100'" alt="" />
                              <div>
                                <div class="text-sm text-gray-900">{{ product.name }}</div>
                                <div class="text-sm text-gray-500">规格：{{ product.spec }}</div>
                              </div>
                            </div>
                          </td>
                          <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            *{{ product.quantity }} / ¥ {{ product.price.toFixed(2) }}
                          </td>
                          <td class="px-3 py-4 whitespace-nowrap">
                            <button 
                              @click="moveProductFromSubOrder(index, productIndex)"
                              class="text-sm text-blue-600 hover:text-blue-800"
                            >
                              移出子订单
                            </button>
                          </td>
                        </tr>
                      </template>
                      <tr v-if="subOrder.products.length === 0">
                        <td colspan="3" class="px-3 py-4 text-center text-sm text-gray-500">
                          暂无商品，请从左侧添加
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="flex justify-end gap-4 p-4 border-t">
          <button 
            @click="handleClose"
            class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            取消
          </button>
          <button 
            @click="handleSubmit"
            :disabled="!isValidToSubmit"
            :class="{
              'bg-blue-500 hover:bg-blue-600': isValidToSubmit,
              'bg-gray-400 cursor-not-allowed': !isValidToSubmit
            }"
            class="px-4 py-2 text-sm text-white rounded-md"
          >
            确认拆分
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  orderNumber: {
    type: String,
    default: ''
  },
  orderProducts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:show', 'submit'])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10) // 每页显示10条
const totalProducts = computed(() => originalProducts.value.length)
const totalPages = computed(() => Math.ceil(totalProducts.value / pageSize.value))

// 计算当前页显示的页码
const displayedPages = computed(() => {
  const pages = []
  const maxPagesToShow = 5
  
  if (totalPages.value <= maxPagesToShow) {
    // 如果总页数小于等于要显示的最大页码数，则显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // 否则，显示当前页附近的页码
    let startPage = Math.max(1, currentPage.value - Math.floor(maxPagesToShow / 2))
    let endPage = startPage + maxPagesToShow - 1
    
    if (endPage > totalPages.value) {
      endPage = totalPages.value
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// 切换页码
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// 原订单商品列表
const originalProducts = ref([
  // 示例数据，实际应该从props.orderProducts获取
  {
    id: 1,
    name: '平面系列印花T恤衫',
    spec: '黑色/L/长袖',
    quantity: 1,
    price: 60.00,
    image: 'https://via.placeholder.com/100',
    selected: false
  },
  {
    id: 2,
    name: '平面系列印花T恤衫',
    spec: '白色/M/短袖',
    quantity: 1,
    price: 60.00,
    image: 'https://via.placeholder.com/100',
    selected: false
  },
  {
    id: 3,
    name: '平面系列印花T恤衫',
    spec: '蓝色/XL/长袖',
    quantity: 1,
    price: 60.00,
    image: 'https://via.placeholder.com/100',
    selected: false
  }
])

// 检查是否有选中的商品
const hasSelectedProductsInOriginal = computed(() => {
  return originalProducts.value.some(product => product.selected)
})

const hasSelectedProductsInSubOrder = computed(() => {
  if (selectedSubOrderIndex.value === null) return false
  return subOrders.value[selectedSubOrderIndex.value].products.some(product => product.selected)
})

// 移动单个商品到子订单
const moveProductToSubOrder = (product) => {
  if (selectedSubOrderIndex.value === null) return
  
  const index = originalProducts.value.findIndex(p => p.id === product.id)
  if (index !== -1) {
    const [movedProduct] = originalProducts.value.splice(index, 1)
    movedProduct.selected = false // 重置选中状态
    subOrders.value[selectedSubOrderIndex.value].products.push(movedProduct)
  }
}

// 移动选中的商品到子订单
const moveSelectedProductsToSubOrder = () => {
  if (selectedSubOrderIndex.value === null) return
  
  const selectedProducts = originalProducts.value.filter(product => product.selected)
  if (selectedProducts.length === 0) return
  
  selectedProducts.forEach(product => moveProductToSubOrder(product))
}

// 移动选中的商品回原订单
const moveSelectedProductsToOriginal = () => {
  if (selectedSubOrderIndex.value === null) return
  
  const subOrder = subOrders.value[selectedSubOrderIndex.value]
  const selectedProducts = subOrder.products.filter(product => product.selected)
  
  if (selectedProducts.length === 0) return
  
  // 确保移动后子订单不会为空
  if (subOrder.products.length - selectedProducts.length < 1) {
    // 这里可以添加提示：每个子订单至少需要保留一种商品
    return
  }
  
  selectedProducts.forEach(product => {
    const index = subOrder.products.findIndex(p => p.id === product.id)
    if (index !== -1) {
      const [movedProduct] = subOrder.products.splice(index, 1)
      movedProduct.selected = false // 重置选中状态
      originalProducts.value.push(movedProduct)
    }
  })
}

// 子订单列表
const subOrders = ref([
  { id: 1, products: [] },
  { id: 2, products: [] }
])

// 最大子订单数量（与原订单商品种类数一致）
const maxSubOrders = computed(() => originalProducts.value.length)

// 当前选中的子订单索引
const selectedSubOrderIndex = ref(0) // 默认选中第一个子订单

// 选择子订单
const selectSubOrder = (index) => {
  selectedSubOrderIndex.value = index
}

// 添加子订单
const addSubOrder = () => {
  if (subOrders.value.length < maxSubOrders.value) {
    subOrders.value.push({ id: subOrders.value.length + 1, products: [] })
  }
}

// 移除子订单
const removeSubOrder = (index) => {
  // 确保至少保留2个子订单
  if (subOrders.value.length > 2) {
    // 如果删除的是当前选中的子订单，则重置选中状态
    if (selectedSubOrderIndex.value === index) {
      selectedSubOrderIndex.value = 0
    } else if (selectedSubOrderIndex.value > index) {
      // 如果删除的子订单在当前选中子订单之前，则调整选中索引
      selectedSubOrderIndex.value--
    }
    
    // 将要删除的子订单中的商品移回原订单
    const productsToMove = [...subOrders.value[index].products]
    productsToMove.forEach(product => {
      originalProducts.value.push(product)
    })
    
    // 删除子订单
    subOrders.value.splice(index, 1)
  }
}

// 将商品从原订单移动到子订单
// const moveProductToSubOrder = (product) => {
//   if (selectedSubOrderIndex.value === null) return
  
//   // 找到原订单中的商品索引
//   const productIndex = originalProducts.value.findIndex(p => p.id === product.id)
//   if (productIndex === -1) return
  
//   // 从原订单中移除商品
//   const [movedProduct] = originalProducts.value.splice(productIndex, 1)
  
//   // 添加到选中的子订单
//   subOrders.value[selectedSubOrderIndex.value].products.push(movedProduct)
// }

// 将商品从子订单移回原订单
const moveProductFromSubOrder = (subOrderIndex, productIndex) => {
  // 确保每个子订单至少有一种商品（如果移出后为空，则不允许移出）
  if (subOrders.value[subOrderIndex].products.length <= 1) {
    // 这里可以添加提示：每个子订单至少需要一种商品
    return
  }
  
  // 从子订单中移除商品
  const [movedProduct] = subOrders.value[subOrderIndex].products.splice(productIndex, 1)
  
  // 添加回原订单
  originalProducts.value.push(movedProduct)
}

// 验证是否可以提交
const isValidToSubmit = computed(() => {
  // 检查每个子订单是否至少有一种商品
  return subOrders.value.every(subOrder => subOrder.products.length > 0)
})

// 初始化
onMounted(() => {
  // 实际应用中，这里应该根据props.orderProducts初始化originalProducts
  if (props.orderProducts && props.orderProducts.length > 0) {
    originalProducts.value = [...props.orderProducts]
  }
})

// 关闭弹窗
const handleClose = () => {
  emit('update:show', false)
}

// 提交表单
const handleSubmit = () => {
  if (!isValidToSubmit.value) return
  
  emit('submit', {
    orderNumber: props.orderNumber,
    subOrders: subOrders.value
  })
  handleClose()
}
</script>

<style scoped>
/* 自定义滚动条样式 */
.max-h-\[500px\].overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.max-h-\[500px\].overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.max-h-\[500px\].overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.max-h-\[500px\].overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
</style>