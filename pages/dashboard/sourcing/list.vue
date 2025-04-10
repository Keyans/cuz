<template>
  <div class="container mx-auto py-6 px-4">
    <!-- 面包屑 -->
    <Breadcrumb :items="breadcrumb"/>
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
      <p class="text-gray-600 mt-3">查找优质商品，一键刊登，快速开店</p>
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
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div v-for="product in filteredProducts" :key="product.id" class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div class="relative">
          <img :src="product.image" :alt="product.name" class="w-full aspect-square object-cover" />
          <button class="absolute top-2 right-2 p-1.5 bg-white/70 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div class="p-3">
          <h3 class="text-sm font-semibold mb-1 line-clamp-1">{{ product.name }}</h3>
          <div class="text-primary font-bold">¥ {{ product.price }}</div>
          <div class="text-xs text-gray-500 my-1.5">{{ product.shippingDisplay }}</div>
          <button @click="navigateToDetail(product.id)" class="text-xs text-primary border border-primary rounded px-2 py-1 w-full hover:bg-primary hover:text-white transition-colors">查看更多</button>
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
import Breadcrumb from '~/components/common/Breadcrumb.vue'

const route = useRoute()
const router = useRouter()

// 获取URL参数
const category = computed(() => route.query.category as string || '')

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
  layout: 'dashboard',
  middleware: ['auth'],
})

// 筛选条件
const searchQuery = ref('')
const priceRange = ref('')
const shippingTime = ref('')
const stockStatus = ref('')

// 分页
const currentPage = ref(1)
const pageSize = 15
const totalPages = 5

// 模拟不同类目的商品数据
const allProducts = {
  clothing: [
    {
      id: 1,
      name: '成人仿棉圆领短袖',
      price: 27.80,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      shipping: '1-3',
      shippingDisplay: '1~3天发货',
      stock: 'in-stock'
    },
    {
      id: 2,
      name: '运动休闲T恤',
      price: 129.00,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      shipping: '1-3',
      shippingDisplay: '1~3天发货',
      stock: 'in-stock'
    },
    // 更多服装类商品...
  ],
  accessories: [
    {
      id: 1,
      name: '时尚棒球帽',
      price: 89.00,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop',
      shipping: '1-3',
      shippingDisplay: '1~3天发货',
      stock: 'in-stock'
    },
    {
      id: 2,
      name: '复古鸭舌帽',
      price: 79.00,
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab?w=500&h=500&fit=crop',
      shipping: '1-3',
      shippingDisplay: '1~3天发货',
      stock: 'in-stock'
    },
    // 更多配饰类商品...
  ],
  home: [
    {
      id: 1,
      name: '北欧风抱枕',
      price: 59.00,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop',
      shipping: '3-5',
      shippingDisplay: '3~5天发货',
      stock: 'in-stock'
    },
    {
      id: 2,
      name: '简约装饰画',
      price: 199.00,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      shipping: '3-5',
      shippingDisplay: '3~5天发货',
      stock: 'in-stock'
    },
    // 更多家居类商品...
  ],
  hot: [
    {
      id: 1,
      name: '时尚棒球帽',
      price: 89.00,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop',
      shipping: '1-3',
      shippingDisplay: '1~3天发货',
      stock: 'in-stock'
    },
    {
      id: 2,
      name: '运动休闲T恤',
      price: 129.00,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      shipping: '1-3',
      shippingDisplay: '1~3天发货',
      stock: 'in-stock'
    },
  ],
  new: [
    {
      id: 1,
      name: '潮流连帽卫衣',
      price: 199.00,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop',
      shipping: '1-3',
      shippingDisplay: '1~3天发货',
      stock: 'in-stock'
    },
    {
      id: 2,
      name: '复古鸭舌帽',
      price: 79.00,
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab?w=500&h=500&fit=crop',
      shipping: '1-3',
      shippingDisplay: '1~3天发货',
      stock: 'in-stock'
    },
  ]
}

// 为每个类目添加更多商品数据
Object.keys(allProducts).forEach(category => {
  if (category !== 'hot' && category !== 'new') {
    allProducts[category] = allProducts[category].concat(
      Array.from({ length: 13 }, (_, i) => ({
        id: i + 3,
        name: `${category}商品 ${i + 3}`,
        price: Math.floor(Math.random() * 150) + 50,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        shipping: '3-5',
        shippingDisplay: '3~5天发货',
        stock: 'in-stock'
      }))
    )
  }
})

// 根据类别获取商品数据
const productList = computed(() => {
  const categoryKey = category.value || 'clothing'
  return allProducts[categoryKey] || []
})

// 过滤后的商品列表
const filteredProducts = computed(() => {
  return productList.value.filter(product => {
    // 搜索过滤
    if (searchQuery.value && !product.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }
    
    // 价格过滤
    if (priceRange.value) {
      const [min, max] = priceRange.value.split('-')
      if (max && (product.price < Number(min) || product.price > Number(max))) {
        return false
      }
      if (!max && product.price < Number(min)) {
        return false
      }
    }
    
    // 发货时间过滤
    if (shippingTime.value && product.shipping !== shippingTime.value) {
      return false
    }
    
    // 库存状态过滤
    if (stockStatus.value && product.stock !== stockStatus.value) {
      return false
    }
    
    return true
  })
})

// 跳转到详情页
const navigateToDetail = (id: number) => {
  router.push(`/dashboard/sourcing/${id}`)
}
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
</style>