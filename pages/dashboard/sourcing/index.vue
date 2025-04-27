<template>
    <div class="container mx-auto py-6 px-4">
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
          <!-- <a href="/dashboard/sourcing/list" class="text-primary hover:text-primary-dark">查看更多</a> -->
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div v-for="category in categories" :key="category.id" class="flex flex-col items-center cursor-pointer transform hover:-translate-y-1 transition-all duration-300">
            <img :src="category.image" :alt="category.name" class="w-60 h-60 object-cover rounded-lg mb-4" />
            <span class="text-lg font-medium drop-shadow-md">{{ category.name }}</span>
          </div>
        </div>
      </div>
  
      <!-- 热门商品 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">热门商品</h2>
          <router-link to="/dashboard/sourcing/list?category=hot" class="text-primary hover:text-primary-dark">查看更多</router-link>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in hotProducts" :key="product.id" class="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer" @click="navigateTo(`/dashboard/sourcing/${product.id}`)">
            <div class="relative">
              <img :src="product.image" :alt="product.name" class="w-full h-full aspect-square object-cover" />
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
                <div class="text-primary font-bold text-xl">¥ {{ product.price }}</div>
                <button class="btn-primary px-4 py-2 text-sm">选品</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 新品推荐 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">新品推荐</h2>
          <router-link to="/dashboard/sourcing/list?category=new" class="text-primary hover:text-primary-dark">查看更多</router-link>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in newProducts" :key="product.id" class="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer" @click="navigateTo(`/dashboard/sourcing/${product.id}`)">
            <div class="relative">
              <img :src="product.image" :alt="product.name" class="w-full h-full aspect-square object-cover" />
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
                <div class="text-primary font-bold text-xl">¥ {{ product.price }}</div>
                <button class="btn-primary px-4 py-2 text-sm">选品</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { ref, watch, onMounted } from 'vue'
  import { doGetCategoryList } from '@/apis/sourcing'

// onMounted(async () => {
//   try {
//     const params = {
//       level: 'LEVEL_3',
//       current: 1,
//       size: 20,
//       queryenable:true 
//     }
//     const response = await doGetCategoryList(params)
//     console.log('类目数据已加载, 共', response.data.length, '项')
//   } catch (error) {
//     console.error('获取类目数据失败:', error)
//   }
// })
  
  const router = useRouter()
  
  definePageMeta({
    layout: 'dashboard'
  })
  
  // 点击商品跳转到详情页
  const navigateTo = (path: string) => {
    router.push(path)
  }

  // 定义商品和类目接口
  interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    tag: string;
  }

  interface Category {
    id: number | string;
    name: string;
    image: string;
    level?: number;
    parentId?: string;
  }

  interface ApiResponse<T> {
    code: number;
    data: T;
    message: string;
  }

  interface CategoryResponse {
    records: Category[];
    total: number;
    size: number;
    current: number;
  }

  // 商品类目数据
  const categories = ref<Category[]>([])

  // 从服务端获取分类数据，使用key选项确保请求不重复
  const { data: categoryResponse, pending, error } = await useFetch<ApiResponse<CategoryResponse>>('/api/categories/listLevel', {
    params: {
      level: 'LEVEL_3',
      current: 1,
      size: 20,
      queryenable: true 
    },
    key: 'categories-list'
  })

  // 仅初始化时设置类目数据，避免重复更新
  if (categoryResponse.value) {
    if (categoryResponse.value.code === 200 && categoryResponse.value.data?.records) {
      categories.value = categoryResponse.value.data.records
      console.log('分类数据加载成功，共', categories.value.length, '项')
    }
  }

  // 获取热门商品数据
  const { data: hotProductsResponse, pending: hotPending } = await useFetch<ApiResponse<Product[]>>('/api/products/hot', {
    key: 'hot-products'
  })

  // 获取新品推荐数据
  const { data: newProductsResponse, pending: newPending } = await useFetch<ApiResponse<Product[]>>('/api/products/new', {
    key: 'new-products'
  })

  // 热门商品数据
  const hotProducts = ref<Product[]>([])
  if (hotProductsResponse.value?.code === 200 && hotProductsResponse.value.data) {
    hotProducts.value = hotProductsResponse.value.data
  }

  // 新品推荐数据
  const newProducts = ref<Product[]>([])
  if (newProductsResponse.value?.code === 200 && newProductsResponse.value.data) {
    newProducts.value = newProductsResponse.value.data
  }
  
  // 监听数据变化（可选）
  watch(categoryResponse, (newVal) => {
    if (newVal?.code === 200 && newVal.data?.records) {
      categories.value = newVal.data.records
      console.log('分类数据更新，共', categories.value.length, '项')
    }
  })
  </script>
  
  <style scoped>
  
  
  
  </style>