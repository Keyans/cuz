<template>
    <div class="container mx-auto py-6 px-4">
      <!-- 错误提示 -->
      <div v-if="errorMsg" class="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex justify-between items-center">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          {{ errorMsg }}
        </div>
        <button @click="refreshData" class="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors" :disabled="refreshing">
          <span v-if="refreshing">刷新中...</span>
          <span v-else>重新加载</span>
        </button>
      </div>

      <!-- 搜索框 -->
      <div class="mb-6 relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" class="form-input w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2" placeholder="搜索商品名称、类目或关键词" />
      </div>

      <!-- 商品类目 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">商品类目</h2>
          <!-- 类目级别选择器 -->
          <div class="flex items-center">
            <span class="mr-2 text-sm text-gray-600">类目级别:</span>
            <select 
              class="form-select border border-gray-300 rounded-lg py-1 px-2 text-sm" 
              v-model="queryParams.level"
              @change="refreshData()">
              <option value="LEVEL_1">一级类目</option>
              <option value="LEVEL_2">二级类目</option>
              <option value="LEVEL_3">三级类目</option>
            </select>
          </div>
        </div>
        <!-- 加载中状态 -->
        <div v-if="loading.categories" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div v-for="i in 6" :key="`skeleton-category-${i}`" class="flex flex-col items-center animate-pulse">
            <div class="w-60 h-60 bg-gray-200 rounded-lg mb-4"></div>
            <div class="h-6 bg-gray-200 w-24 rounded"></div>
          </div>
        </div>
        <!-- 类目数据 -->
        <div v-else-if="categories.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div v-for="category in categories" :key="category.id" class="flex flex-col items-center cursor-pointer transform hover:-translate-y-1 transition-all duration-300">
            <img :src="category.categoryImg" :alt="category.name" class="w-60 h-60 object-cover rounded-lg mb-4" />
            <span class="text-lg font-medium drop-shadow-md">{{ category.name }}</span>
          </div>
        </div>
        <!-- 无数据状态 -->
        <div v-else class="text-center py-8 text-gray-500">
          暂无类目数据
        </div>
      </div>
  
      <!-- 热门商品 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">热门商品</h2>
          <router-link to="/dashboard/sourcing/list?category=hot" class="text-primary hover:text-primary-dark">查看更多</router-link>
        </div>
        <!-- 加载中状态 -->
        <div v-if="loading.hotProducts" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="`skeleton-hot-${i}`" class="bg-white shadow-sm animate-pulse overflow-hidden">
            <div class="w-full aspect-square bg-gray-200"></div>
            <div class="p-4">
              <div class="h-6 bg-gray-200 w-3/4 mb-2 rounded"></div>
              <div class="h-4 bg-gray-200 w-full mb-1 rounded"></div>
              <div class="h-4 bg-gray-200 w-2/3 mb-3 rounded"></div>
              <div class="flex justify-between items-center">
                <div class="h-7 bg-gray-200 w-16 rounded"></div>
                <div class="h-9 bg-gray-200 w-14 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 热门商品数据 -->
        <div v-else-if="hotProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in hotProducts" :key="product.productId" class="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer" @click="navigateTo(`/dashboard/sourcing/${product.productId}`)">
            <div class="relative">
              <img :src="product.picUrl" :alt="product.name" class="w-full h-full aspect-square object-cover" />
              <span class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">{{ product.tag }}</span>
              <button class="absolute top-2 right-2 p-2 bg-white/50 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2 line-clamp-1">{{ product.name }}</h3>
              <p class="text-gray-500 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <div class="text-primary font-bold text-xl">¥ {{ product.salePrice }}</div>
                <button class="btn-primary px-4 py-2 text-sm">选品</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 无数据状态 -->
        <div v-else class="text-center py-8 text-gray-500">
          暂无热门商品数据
          <button @click="refreshData" class="ml-2 text-primary hover:underline" :disabled="refreshing">
            {{ refreshing ? '刷新中...' : '刷新' }}
          </button>
        </div>
      </div>

      <!-- 新品推荐 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">新品推荐</h2>
          <router-link to="/dashboard/sourcing/list?category=new" class="text-primary hover:text-primary-dark">查看更多</router-link>
        </div>
        <!-- 加载中状态 -->
        <div v-if="loading.newProducts" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="`skeleton-new-${i}`" class="bg-white shadow-sm animate-pulse overflow-hidden">
            <div class="w-full aspect-square bg-gray-200"></div>
            <div class="p-4">
              <div class="h-6 bg-gray-200 w-3/4 mb-2 rounded"></div>
              <div class="h-4 bg-gray-200 w-full mb-1 rounded"></div>
              <div class="h-4 bg-gray-200 w-2/3 mb-3 rounded"></div>
              <div class="flex justify-between items-center">
                <div class="h-7 bg-gray-200 w-16 rounded"></div>
                <div class="h-9 bg-gray-200 w-14 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 新品推荐数据 -->
        <div v-else-if="newProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in newProducts" :key="product.productId" class="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer" @click="navigateTo(`/dashboard/sourcing/${product.productId}`)">
            <div class="relative">
              <img :src="product.picUrl" :alt="product.name" class="w-full h-full aspect-square object-cover" />
              <span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">{{ product.tag }}</span>
              <button class="absolute top-2 right-2 p-2 bg-white/50 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2 line-clamp-1">{{ product.name }}</h3>
              <p class="text-gray-500 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <div class="text-primary font-bold text-xl">¥ {{ product.salePrice }}</div>
                <button class="btn-primary px-4 py-2 text-sm">选品</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 无数据状态 -->
        <div v-else class="text-center py-8 text-gray-500">
          暂无新品推荐数据
          <button @click="fetchNewProducts" class="ml-2 text-primary hover:underline" :disabled="loadingNewProducts">
            {{ loadingNewProducts ? '加载中...' : '刷新' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { computed, watchEffect, ref, onMounted } from 'vue'
  import { doPostProductList } from '@/apis/sourcing'
  const router = useRouter()
  
  definePageMeta({
    layout: 'dashboard'
  })
  

onMounted(() => {
  refreshData()
})

  // 点击商品跳转到详情页
  const navigateTo = (path: string) => {
    router.push(path)
  }

  // 定义商品和类目接口
  interface Product {
    productId: number;
    name: string;
    description: string;
    salePrice: number;
    picUrl: string;
    tag: string;
  }

  interface Category {
    id: number | string;
    name: string;
    categoryImg: string;
    level?: number;
    parentId?: string;
  }

  interface HomeData {
    categories: Category[];
    hotProducts: Product[];
    newProducts: Product[];
  }
  
  interface ApiResponse {
    code: number;
    data: HomeData;
    message: string;
  }
  
  // 错误信息
  const errorMsg = ref<string | null>(null)
  
  // 手动刷新数据
  const refreshing = ref(false)
  
  // 提取查询参数到响应式对象
  const queryParams = ref({
    level: 'LEVEL_3',           // 默认加载三级类目
    categorySize: 20,           // 类目数量
    productSize: 4,             // 商品数量
    current: 1,                 // 当前页码
    queryenable: true           // 启用查询
  })
  
  // 新品推荐数据
  const newProducts = ref<Product[]>([])
  // 新品推荐加载状态
  const loadingNewProducts = ref(false)
  
  // 获取新品推荐数据的函数
  const fetchNewProducts = async () => {
    loadingNewProducts.value = true
    try {
      const response = await doPostProductList({
        queryStrategy: 'NEW_PRODUCT',
        size: queryParams.value.productSize,
        current: queryParams.value.current
      })
      
      if (response && response.code === 200 && response.data) {
        newProducts.value = response.data.records || []
      } else {
        console.error('获取新品推荐失败:', response?.code !== 200 ? response?.data : '未知错误')
      }
    } catch (err) {
      console.error('获取新品推荐API调用失败:', err)
    } finally {
      loadingNewProducts.value = false
    }
  }
  
  // 使用useAsyncData获取类目和热门商品数据 - 这将在服务端渲染时执行
  const { data, pending, error, refresh } = useAsyncData<ApiResponse>(
    'home-data',
    async () => {
      try {
        // 发起API请求，带上查询参数
        const response = await $fetch<ApiResponse>('/api/sourcing/home-data', {
          params: queryParams.value
        })
        return response
      } catch (err) {
        console.error('获取首页数据API调用失败:', err)
        throw err
      }
    },
    {
      // 服务端渲染选项
      server: true,
      // 缓存控制
      default: () => ({ 
        code: 0, 
        data: { categories: [], hotProducts: [], newProducts: [] }, 
        message: '' 
      })
    }
  )
  
  // 手动刷新数据的方法
  const refreshData = async (params?: Record<string, any>) => {
    refreshing.value = true
    errorMsg.value = null
    
    // 如果传入了新的查询参数，更新queryParams
    if (params) {
      queryParams.value = { ...queryParams.value, ...params }
    }
    
    try {
      await refresh()
      // 刷新新品推荐数据
      await fetchNewProducts()
      console.log('数据已刷新，参数:', queryParams.value)
    } catch (err) {
      console.error('刷新数据失败:', err)
      errorMsg.value = '刷新数据失败，请重试'
    } finally {
      refreshing.value = false
    }
  }
  
  // 将数据转换为响应式对象
  const homeData = computed<HomeData>(() => {
    try {
      // 检查数据结构是否正确
      if (data.value && typeof data.value === 'object' && 'code' in data.value && data.value.code === 200 && 'data' in data.value && data.value.data) {
        // 清除任何错误信息
        errorMsg.value = null
        return data.value.data as HomeData
      }
      
      // 如果有错误或数据不正确，设置错误信息
      if (data.value && typeof data.value === 'object' && 'code' in data.value && data.value.code !== 200 && 'message' in data.value) {
        errorMsg.value = typeof data.value.message === 'string' ? data.value.message : '获取数据失败'
      }
    } catch (err) {
      console.error('处理返回数据出错:', err)
    }
    
    return { categories: [], hotProducts: [] }
  })
  
  // 从响应中提取各个部分
  const categories = computed(() => homeData.value.categories || [])
  const hotProducts = computed(() => homeData.value.hotProducts || [])
  
  // 数据加载状态，考虑手动刷新状态
  const loading = computed(() => ({
    categories: pending.value || refreshing.value,
    hotProducts: pending.value || refreshing.value,
  }))

  // 数据加载完成后的日志
  watchEffect(() => {
    if (!pending.value && data.value) {
      console.log('首页数据加载完成:')
      console.log('- 类目数据:', categories.value.length, '项')
      console.log('- 热门商品:', hotProducts.value.length, '项')
    }
    
    if (!loadingNewProducts.value && newProducts.value) {
      console.log('- 新品推荐:', newProducts.value.length, '项')
    }
  })
  </script>
  
  <style scoped>
  
  
  
  </style>