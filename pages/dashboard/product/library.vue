<template>
  <div class="container mx-auto px-4 py-6">
    <!-- 标题和操作按钮 -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">产品库</h1>
    </div>

    <!-- 搜索区域 -->
    <div class="bg-white rounded-md shadow-sm border border-gray-200 p-4 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label class="block text-sm text-gray-500 mb-1">搜索：</label>
          <input type="text" placeholder="产品名称" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:border-blue-500" v-model="searchParams.productName" />
        </div>
        <div>
          <label class="block text-sm text-gray-500 mb-1">产品分类：</label>
          <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:border-blue-500" v-model="searchParams.category">
            <option value="">男士服装>男士T恤>男士短袖T恤</option>
            <option value="clothing">服装</option>
            <option value="accessories">配饰</option>
            <option value="home">家居</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-500 mb-1">设计账号：</label>
          <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:border-blue-500" v-model="searchParams.designer">
            <option value="">张三</option>
            <option value="designer1">设计师1</option>
            <option value="designer2">设计师2</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-500 mb-1">时间：</label>
          <div class="flex items-center space-x-2">
            <input type="text" placeholder="开始时间" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:border-blue-500" v-model="searchParams.startTime" />
            <span class="text-gray-500">~</span>
            <input type="text" placeholder="结束时间" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:border-blue-500" v-model="searchParams.endTime" />
          </div>
        </div>
      </div>
      <div class="flex justify-end space-x-2">
        <button @click="resetSearch" class="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 text-sm">
          重置
        </button>
        <button @click="searchProducts" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm">
          搜索
        </button>
      </div>
    </div>

    <!-- 批量操作 -->
    <div class="mb-4">
      <button 
        class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm flex items-center" 
        @click="toggleDropdown"
        :disabled="batchOperationDisabled"
        :class="{'opacity-50 cursor-not-allowed': batchOperationDisabled}"
      >
        批量操作
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div v-if="showDropdown" class="absolute mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
        <div class="py-1">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click.prevent="batchDelete">批量删除</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click.prevent="batchOffShelf">批量下架</a>
        </div>
      </div>
    </div>

    <!-- 产品列表 -->
    <div class="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-3 py-3">
                <input 
                  type="checkbox" 
                  class="h-4 w-4 border-gray-300 rounded cursor-pointer" 
                  :checked="selectedProducts.length > 0 && selectedProducts.length === filteredProducts.length"
                  @change="toggleSelectAll" 
                />
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                产品信息
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品规格
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                关键词
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                设计人
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                时间
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50">
              <td class="px-3 py-4 whitespace-nowrap">
                <input 
                  type="checkbox" 
                  class="h-4 w-4 border-gray-300 rounded cursor-pointer" 
                  :checked="selectedProducts.includes(product.id)"
                  @change="toggleSelectProduct(product.id)" 
                />
              </td>
              <td class="px-3 py-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-16 w-16">
                    <img class="h-16 w-16 rounded-md object-cover" :src="product.image" :alt="product.name" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">ID: {{ product.productId }}</div>
                  </div>
                </div>
              </td>
              <td class="px-3 py-4 whitespace-nowrap">
                <div class="flex flex-col">
                  <div class="text-sm text-gray-900">颜色: {{ product.colors.join(', ') }}</div>
                  <div class="text-sm text-gray-500">尺寸: {{ product.sizes.join(', ') }}</div>
                  <button class="text-blue-600 text-sm underline mt-1" @click="viewSKU(product)">查看SKU</button>
                </div>
              </td>
              <td class="px-3 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.keywords }}</div>
              </td>
              <td class="px-3 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.designer }}</div>
              </td>
              <td class="px-3 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">创建：{{ product.createdAt }}</div>
                <div class="text-sm text-gray-500">更新：{{ product.updatedAt }}</div>
              </td>
              <td class="px-3 py-4 whitespace-nowrap text-sm space-y-2">
                <button class="text-blue-600 px-2 py-1 rounded-md border border-blue-600 hover:bg-blue-50 block w-full" @click="downloadImage(product)">立即下单</button>
                <button class="text-blue-600 px-2 py-1 rounded-md border border-blue-600 hover:bg-blue-50 block w-full" @click="editProduct(product)">重新设计</button>
                <button class="text-blue-600 px-2 py-1 rounded-md border border-blue-600 hover:bg-blue-50 block w-full" @click="downloadSKUImage(product)">下载缩略图</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 分页 -->
    <div class="flex justify-between items-center mt-6 flex-wrap">
      <div class="text-sm text-gray-700 mb-2 md:mb-0">
        显示 1 到 10 条，共 {{ products.length }} 条
      </div>
      <nav class="flex space-x-2">
        <button 
          class="px-3 py-1 rounded border hover:bg-gray-100" 
          :disabled="currentPage === 1"
          :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
          @click="changePage(currentPage - 1)"
        >
          &lt;
        </button>
        <button 
          v-for="page in displayedPages" 
          :key="page" 
          class="px-3 py-1 rounded border"
          :class="page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        <button 
          class="px-3 py-1 rounded border hover:bg-gray-100"
          :disabled="currentPage === totalPages"
          :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
          @click="changePage(currentPage + 1)"
        >
          &gt;
        </button>
      </nav>
    </div>
    
    <!-- SKU弹窗 -->
    <div v-if="showSKUDialog" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="showSKUDialog = false">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="w-full">
                <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">SKU列表</h3>
                <div class="max-h-80 overflow-y-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">颜色</th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">规格</th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(sku, index) in currentSKUs" :key="index" class="hover:bg-gray-50">
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{{ sku.color }}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{{ sku.size }}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{{ sku.skuCode }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm" @click="showSKUDialog = false">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

// 状态管理
const router = useRouter()
const showImportDialog = ref(false)
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showSKUDialog = ref(false)
const showDropdown = ref(false)
const selectedProducts = ref<number[]>([])
const currentProduct = ref<any>(null)
const currentSKUs = ref<any[]>([])

// 批量操作按钮是否禁用
const batchOperationDisabled = computed(() => selectedProducts.value.length === 0)

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = computed(() => products.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

// 显示的页码按钮
const displayedPages = computed(() => {
  const pages = []
  const maxDisplayed = 5 // 最多显示5个页码按钮
  
  if (totalPages.value <= maxDisplayed) {
    // 如果总页数小于等于最大显示页数，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // 计算要显示的页码范围
    let start = Math.max(1, currentPage.value - 2)
    let end = Math.min(totalPages.value, start + maxDisplayed - 1)
    
    // 如果接近尾页，调整起始位置
    if (end === totalPages.value) {
      start = Math.max(1, totalPages.value - maxDisplayed + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// 搜索参数
const searchParams = reactive({
  productName: '',
  category: '',
  designer: '',
  startTime: '',
  endTime: ''
})

// 模拟数据
const products = ref([
  {
    id: 1,
    name: '适用于iPhone14全包防摔手机壳',
    productId: '61874505168140359',
    image: '/assets/products/phone-case-1.svg',
    category: '手机配件>手机壳>iPhone手机壳',
    colors: ['白色', '黑色', '绿色', '红色'],
    sizes: ['iPhone 14', 'iPhone 14 Pro', 'iPhone 14 Pro Max'],
    designer: '张三',
    keywords: '卡通, 可爱, 全包, 防摔, 手机壳',
    createdAt: '2025-03-20 10:00',
    updatedAt: '2025-03-20 10:00',
    status: 'active',
    statusText: '在售'
  },
  {
    id: 2,
    name: '时尚运动健身T恤',
    productId: '61874505168140360',
    image: '/assets/products/tshirt-1.svg',
    category: '男士服装>男士T恤>男士短袖T恤',
    colors: ['黑色', '灰色', '蓝色'],
    sizes: ['M', 'L', 'XL'],
    designer: '李四',
    keywords: '运动, 健身, 透气, T恤',
    createdAt: '2025-03-19 15:30',
    updatedAt: '2025-03-19 16:45',
    status: 'active',
    statusText: '在售'
  }
])

// 筛选产品
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    if (searchParams.productName && !product.name.includes(searchParams.productName)) {
      return false
    }
    if (searchParams.category && product.category !== searchParams.category) {
      return false
    }
    if (searchParams.designer && product.designer !== searchParams.designer) {
      return false
    }
    // 时间筛选可以在这里实现
    return true
  })
})

// 方法
const toggleSelectAll = () => {
  if (selectedProducts.value.length === filteredProducts.value.length) {
    // 如果已经全选，则取消全选
    selectedProducts.value = []
  } else {
    // 如果没有全选，则全选
    selectedProducts.value = filteredProducts.value.map(product => product.id)
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const editProduct = (product: any) => {
  currentProduct.value = JSON.parse(JSON.stringify(product))
  showEditDialog.value = true
}

const viewSKU = (product: any) => {
  // 生成SKU列表
  currentSKUs.value = []
  product.colors.forEach((color: string) => {
    product.sizes.forEach((size: string) => {
      currentSKUs.value.push({
        color,
        size,
        skuCode: `SKU-${product.productId}-${color.substring(0, 1)}-${size}`
      })
    })
  })
  showSKUDialog.value = true
}

const downloadImage = (product: any) => {
  router.push(`/dashboard/product/libraryPage/order?productId=${product.id}`)
}

const downloadSKUImage = (product: any) => {
  alert(`下载SKU缩略图：${product.name}`)
}

const batchDelete = () => {
  if (selectedProducts.value.length === 0) {
    alert('请选择要删除的产品')
    return
  }
  
  if (confirm(`确定要删除选中的 ${selectedProducts.value.length} 个产品吗？`)) {
    products.value = products.value.filter(p => !selectedProducts.value.includes(p.id))
    selectedProducts.value = []
  }
  showDropdown.value = false
}

const batchOffShelf = () => {
  if (selectedProducts.value.length === 0) {
    alert('请选择要下架的产品')
    return
  }
  
  products.value.forEach(product => {
    if (selectedProducts.value.includes(product.id)) {
      product.status = 'inactive'
      product.statusText = '下架'
    }
  })
  selectedProducts.value = []
  showDropdown.value = false
}

const resetSearch = () => {
  searchParams.productName = ''
  searchParams.category = ''
  searchParams.designer = ''
  searchParams.startTime = ''
  searchParams.endTime = ''
}

const searchProducts = () => {
  // 实现搜索逻辑
}

const changePage = (newPage: number) => {
  currentPage.value = newPage
}

const toggleSelectProduct = (id: number) => {
  if (selectedProducts.value.includes(id)) {
    selectedProducts.value = selectedProducts.value.filter((i) => i !== id)
  } else {
    selectedProducts.value.push(id)
  }
}
</script>

<style scoped>
.table-header {
  @apply px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
  
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .px-3 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  .py-4 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
}
</style>