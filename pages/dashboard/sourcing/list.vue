<template>
  <div class="container mx-auto py-6 px-4">
    <!-- 面包屑 -->
    <Breadcrumb v-if="isAuthenticated" :items="breadcrumb"/>
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold">产品列表</h1>
      <div class="mt-4 flex flex-wrap gap-2">
        <button 
          v-for="category in categories" 
          :key="category.id"
          class="px-4 py-2 rounded-full border hover:bg-primary hover:text-white transition-colors"
          :class="selectedCategory === category.id ? 'bg-primary text-white' : 'bg-white'"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="mb-6 relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input type="text" v-model="searchQuery" class="form-input w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2" placeholder="搜索商品类目/商品名称" />
    </div>

    <!-- 筛选器 -->
    <div class="mb-6 flex flex-wrap gap-4">
      <div class="flex items-center">
        <span class="mr-2 text-gray-600">价格区间：</span>
        <select v-model="priceRange" class="form-select border border-gray-300 rounded px-3 py-1">
          <option value="">全部</option>
          <option value="0-50">¥0-50</option>
          <option value="50-100">¥50-100</option>
          <option value="100-200">¥100-200</option>
          <option value="200+">¥200以上</option>
        </select>
      </div>
      <div class="flex items-center">
        <span class="mr-2 text-gray-600">发货时间：</span>
        <select v-model="shippingTime" class="form-select border border-gray-300 rounded px-3 py-1">
          <option value="">全部</option>
          <option value="1-3">1-3个工作日</option>
          <option value="3-5">3-5个工作日</option>
          <option value="5-7">5-7个工作日</option>
        </select>
      </div>
      <div class="flex items-center">
        <span class="mr-2 text-gray-600">库存状态：</span>
        <select v-model="stockStatus" class="form-select border border-gray-300 rounded px-3 py-1">
          <option value="">全部</option>
          <option value="in-stock">有货</option>
          <option value="out-of-stock">无货</option>
        </select>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- 商品列表 -->
      <div v-if="loading" class="col-span-full text-center py-12">
        <p class="text-lg text-gray-500">加载中...</p>
      </div>
      <div v-else-if="products.length === 0" class="col-span-full text-center py-12">
        <p class="text-lg text-gray-500">暂无商品</p>
      </div>
      <div 
        v-else
        v-for="product in products" 
        :key="product.id" 
        class="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
      >
        <div class="relative">
          <img :src="product.image" :alt="product.name" class="w-full h-full aspect-square object-cover" />
          <span v-if="product.tag" class="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">{{ product.tag }}</span>
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

    <!-- 分页 -->
    <div class="mt-8 flex justify-center items-center space-x-2">
      <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50" :disabled="currentPage === 1" @click="currentPage--">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div class="flex space-x-1">
        <button 
          v-for="page in totalPages" 
          :key="page" 
          class="w-8 h-8 rounded-full flex items-center justify-center transition-colors" 
          :class="page === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-100'"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
      </div>
      <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50" :disabled="currentPage === totalPages" @click="currentPage++">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import Breadcrumb from '~/components/common/Breadcrumb.vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const route = useRoute()
const router = useRouter()

// 获取URL参数
const category = computed(() => route.query.category as string || '')
const searchQuery = ref(route.query.q as string || '')

// 页面标题
const pageTitle = computed(() => {
  switch (category.value) {
    case 'hot':
      return '热门商品'
    case 'new':
      return '新品推荐'
    default:
      return '选品中心'
  }
})

// 面包屑数据
const breadcrumb = computed(() => {
  const items = [
    { title: '首页', path: '/' },
    { title: '选品中心', path: '/dashboard/sourcing' }
  ]
  
  if (category.value) {
    items.push({ title: pageTitle.value, path: '' })
  } else {
    items.push({ title: '商品列表', path: '' })
  }
  
  return items
})

definePageMeta({
  layout: 'dashboard'
})

// 筛选条件
const priceRange = ref('')
const shippingTime = ref('')
const stockStatus = ref('')

// 分页
const currentPage = ref(1)
const pageSize = 15
const totalPages = 5

// 定义商品和类目接口
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
}

interface Category {
  id: number | string;
  name: string;
  level?: number;
  image?: string;
}

const categories = ref<Category[]>([])
const products = ref<Product[]>([])
const loading = ref(true)
const selectedCategory = ref<number | string | null>(null)

// 选择类目
const selectCategory = (categoryId: number | string) => {
  selectedCategory.value = categoryId
  // 根据选中的类目加载商品
  // 这里可以根据实际情况调用后端API
}

// 页面加载时获取分类数据
onMounted(async () => {
  try {
    // 从服务端获取类目数据
    const { data } = await useFetch<{ code: number, data: Category[], message: string }>('/api/categories/listLevel', {
      params: {
        level: 1, // 获取一级类目
        parentId: 0, // 可选：顶级类目的父ID
        pageSize: 20, // 可选：每页数量
        sortBy: 'order', // 可选：排序字段
        sortOrder: 'asc' // 可选：排序方向
      }
    })
    
    if (data.value && data.value.code === 200 && data.value.data) {
      categories.value = data.value.data
      
      // 如果有类目数据，默认选中第一个
      if (categories.value.length > 0) {
        selectedCategory.value = categories.value[0].id
      }
    }
    
    // 模拟商品数据
    products.value = [
      {
        id: 1,
        name: '时尚棒球帽',
        description: '采用优质棉质面料，透气舒适，可调节帽围，适合各种场合佩戴，经典设计永不过时。',
        price: 89.00,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop',
        tag: '热销'
      },
      {
        id: 2,
        name: '运动休闲T恤',
        description: '采用优质面料，柔软亲肤，修身剪裁，多色可选，适合日常休闲和运动穿着。',
        price: 129.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
      },
      {
        id: 3,
        name: '防晒渔夫帽',
        description: '大帽檐设计，有效防晒，可折叠便携，适合户外活动和度假旅行使用。',
        price: 69.00,
        image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400&h=300&fit=crop'
      },
      {
        id: 4,
        name: '简约双肩包',
        description: '大容量设计，防水面料，多个收纳隔层，舒适背带，适合通勤和旅行使用。',
        price: 199.00,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop'
      }
    ]
  } catch (error) {
    console.error('获取数据失败', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-primary {
  @apply bg-primary text-white rounded hover:bg-primary hover:opacity-90 transition-colors;
}
</style>