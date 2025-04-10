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
          <a href="/dashboard/sourcing/list" class="text-primary hover:text-primary-dark">查看更多</a>
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
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
  })
  
  // 点击商品跳转到详情页
  const navigateTo = (path) => {
    router.push(path)
  }

  // 商品类目数据
  const categories = [
    {
      id: 1,
      name: '制帽',
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&h=500&fit=crop'
    },
    {
      id: 2,
      name: 'T恤',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'
    },
    {
      id: 3,
      name: '卫衣',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop'
    },
    {
      id: 4,
      name: '包包',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop'
    },
    {
      id: 5,
      name: '手机壳',
      image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=500&h=500&fit=crop'
    },
    {
      id: 6,
      name: '保健品',
      image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=500&h=500&fit=crop'
    }
  ]
  
  // 热门商品数据
  const hotProducts = [
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
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      tag: '热销'
    },
    {
      id: 3,
      name: '防晒渔夫帽',
      description: '大帽檐设计，有效防晒，可折叠便携，适合户外活动和度假旅行使用。',
      price: 69.00,
      image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400&h=300&fit=crop',
      tag: '热销'
    },
    {
      id: 4,
      name: '简约双肩包',
      description: '大容量设计，防水面料，多个收纳隔层，舒适背带，适合通勤和旅行使用。',
      price: 199.00,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop',
      tag: '热销'
    }
  ]
  
  // 新品推荐数据
  const newProducts = [
    {
      id: 1,
      name: '潮流连帽卫衣',
      description: '采用高品质面料，保暖舒适，时尚版型，多色可选，适合秋冬季节穿着。',
      price: 199.00,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
      tag: '新品'
    },
    {
      id: 2,
      name: '复古鸭舌帽',
      description: '经典复古设计，优质棉质面料，精致刺绣，可调节帽围，百搭时尚。',
      price: 79.00,
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=300&fit=crop',
      tag: '新品'
    },
    {
      id: 3,
      name: '印花短袖T恤',
      description: '独特印花设计，优质棉料，舒适透气，修身版型，适合日常休闲穿着。',
      price: 99.00,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      tag: '新品'
    },
    {
      id: 4,
      name: '创意手机壳',
      description: '采用环保材质，防摔防刮，完美贴合，多款图案可选，突显个性。',
      price: 49.00,
      image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=400&h=300&fit=crop',
      tag: '新品'
    }
  ]
  </script>
  
  <style scoped>
  
  
  
  </style>