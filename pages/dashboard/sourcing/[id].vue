<template>
  <div class="container mx-auto py-6 px-4">
    <Breadcrumb :items="breadcrumb"/>
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- 商品基本信息 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <!-- 商品图片 -->
        <div class="space-y-4">
          <div class="relative aspect-square">
            <transition name="fade" mode="out-in">
              <img :key="currentImage" :src="currentImage" :alt="product.name" class="w-full h-full object-cover rounded-lg" />
            </transition>
            <span class="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded">{{ product.tag }}</span>
          </div>
          <!-- 缩略图滚动区域 -->
          <div class="relative">
            <button @click="scrollThumbnails('left')" class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2" :disabled="isScrollLeftDisabled">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div ref="thumbnailContainer" class="overflow-x-auto hide-scrollbar flex space-x-4 justify-center relative scroll-smooth mx-auto">
              <div v-for="(image, index) in product.imageInfos" :key="index" 
                   @click="selectImage(index)"
                   class="flex-shrink-0 w-20 h-20 cursor-pointer rounded-md overflow-hidden transition-all duration-300"
                   :class="{'border-4 border-primary shadow-lg scale-110': currentImageIndex === index}">
                <img :src="image.imgUrl" :alt="`${product.name} - ${index + 1}`" class="w-full h-full object-cover" />
              </div>
            </div>
            <button @click="scrollThumbnails('right')" class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2" :disabled="isScrollRightDisabled">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 商品信息 -->
        <div class="space-y-6">
          <h1 class="text-3xl font-bold">{{ product.name }}</h1>
          <p class="text-gray-600">{{ product.description }}</p>
          
          <div class="text-3xl font-bold text-primary">
            ¥ {{ product.price }}
          </div>

          <!-- 商品属性 -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">商品属性</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-sm">
                <span class="text-gray-500">商品编号：</span>
                <span>{{ product.id }}</span>
              </div>
              <div class="text-sm">
                <span class="text-gray-500">商品分类：</span>
                <span>{{ product.category }}</span>
              </div>
              <div class="text-sm">
                <span class="text-gray-500">库存状态：</span>
                <span class="text-green-500">有货</span>
              </div>
              <div class="text-sm">
                <span class="text-gray-500">发货时间：</span>
                <span>1-3个工作日</span>
              </div>
            </div>
          </div>
          <!-- 操作按钮 -->
          <div class="flex space-x-4">
            <button class="btn-primary flex-1 py-3">立即设计</button>
            <button class="btn-secondary flex-1 py-3">立即刊登</button>
            <button class="btn-primary flex-1 py-3">采样下单</button>
          </div>

          <!-- 地址管理弹窗 -->
          <AddressDialog
            v-model:show="showAddressDialog"
            @save="handleAddressSave"
          />
        </div>
      </div>

      <!-- 商品详情 -->
      <div class="border-t">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-6">商品详情</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- 左侧商品描述 -->
            <div class="space-y-6">
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold mb-4">商品描述</h3>
                <p class="text-gray-600">{{ product.detailDescription }}</p>
              </div>
              
              <!-- 商品属性 -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold mb-4">商品属性</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-500">材质：</span>
                    <span>优质棉料</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-500">工艺：</span>
                    <span>印花/刺绣</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-500">适用季节：</span>
                    <span>四季</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-500">风格：</span>
                    <span>休闲</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右侧尺码表 -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold mb-4">尺码表</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="px-4 py-2 text-left">尺码</th>
                      <th class="px-4 py-2 text-left">胸围（cm）</th>
                      <th class="px-4 py-2 text-left">衣长（cm）</th>
                      <th class="px-4 py-2 text-left">肩宽（cm）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-200">
                      <td class="px-4 py-2">S</td>
                      <td class="px-4 py-2">96</td>
                      <td class="px-4 py-2">65</td>
                      <td class="px-4 py-2">42</td>
                    </tr>
                    <tr class="border-b border-gray-200">
                      <td class="px-4 py-2">M</td>
                      <td class="px-4 py-2">100</td>
                      <td class="px-4 py-2">67</td>
                      <td class="px-4 py-2">44</td>
                    </tr>
                    <tr class="border-b border-gray-200">
                      <td class="px-4 py-2">L</td>
                      <td class="px-4 py-2">104</td>
                      <td class="px-4 py-2">69</td>
                      <td class="px-4 py-2">46</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-2">XL</td>
                      <td class="px-4 py-2">108</td>
                      <td class="px-4 py-2">71</td>
                      <td class="px-4 py-2">48</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 尺码说明 -->
              <div class="mt-4 text-sm text-gray-500">
                <p>* 以上尺寸为人工测量，可能存在1-2cm误差</p>
                <p>* 建议根据个人喜好选择合适尺码</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '~/components/common/Breadcrumb.vue'
import AddressDialog from '~/components/common/AddressDialog.vue'

// 获取路由参数
const route = useRoute()
const productId = computed(() => route.params.id)

// 定义商品详情接口
interface ProductDetail {
  id: number | string
  name: string
  description: string
  detailDescription: string
  price: number
  imageInfos: string[]
  tag: string
  category: string
  attributes?: Record<string, string>
  sizes?: Array<{
    name: string
    chest: number
    length: number
    shoulder: number
  }>
}

// 使用useAsyncData在服务端获取商品详情数据
const { data: productResponse, pending, error } = useAsyncData(
  `product-${productId.value}`,
  async () => {
    try {
      // 调用本地API获取数据，而不是直接调用外部API
      const response = await $fetch(`/api/products/detail/${productId.value}`)
      return response
    } catch (err) {
      console.error('获取商品详情失败:', err)
      throw err
    }
  },
  {
    server: true, // 在服务端执行
    lazy: false   // 立即执行
  }
)

// 商品数据计算属性
const product = computed<ProductDetail>(() => {
  const response = productResponse.value as any;
  if (response && response.code === 200 && response.data) {
    return response.data as ProductDetail;
  }
  
  // 如果没有数据，返回默认值
  return {
    id: productId.value as string,
    name: '商品加载失败',
    description: '无法获取商品信息',
    detailDescription: '无法获取商品详细信息',
    price: 0,
    images: ['/assets/products/placeholder.jpg'],
    tag: '',
    category: ''
  }
})

// 面包屑导航
const breadcrumb = computed(() => [
  { title: '首页', path: '/' },
  { title: '选品中心', path: '/dashboard/sourcing' },
  { title: product.value.name }
])

definePageMeta({
  layout: 'dashboard'
})

// 图片预览相关
const currentImageIndex = ref(0)
const currentImage = computed(() => {
  if (product.value.images && product.value.images.length > 0) {
    return product.value.images[currentImageIndex.value]
  }
  return '/assets/products/placeholder.jpg'
})
const thumbnailContainer = ref<HTMLElement | null>(null)
const showAddressDialog = ref(false)

// 缩略图滚动控制
const isScrollLeftDisabled = ref(true)
const isScrollRightDisabled = ref(false)

// 选择图片
const selectImage = (index: number) => {
  currentImageIndex.value = index
  // 滚动到选中的缩略图
  nextTick(() => {
    if (thumbnailContainer.value) {
      const selectedThumb = thumbnailContainer.value.children[index]
      if (selectedThumb) {
        selectedThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  })
}

// 滚动缩略图
const scrollThumbnails = (direction: 'left' | 'right') => {
  if (!thumbnailContainer.value) return
  
  const container = thumbnailContainer.value
  const scrollAmount = 100 // 每次滚动的像素数
  
  if (direction === 'left') {
    container.scrollLeft -= scrollAmount
  } else {
    container.scrollLeft += scrollAmount
  }
  
  // 更新按钮状态
  updateScrollButtons()
}

// 更新滚动按钮状态
const updateScrollButtons = () => {
  if (!thumbnailContainer.value) return
  
  const container = thumbnailContainer.value
  isScrollLeftDisabled.value = container.scrollLeft <= 0
  isScrollRightDisabled.value = container.scrollLeft + container.clientWidth >= container.scrollWidth
}

// 处理地址保存
const handleAddressSave = (address: any) => {
  console.log('地址已保存:', address)
  showAddressDialog.value = false
}

// 监听滚动事件
onMounted(() => {
  if (thumbnailContainer.value) {
    thumbnailContainer.value.addEventListener('scroll', updateScrollButtons)
    updateScrollButtons()
  }
})

onUnmounted(() => {
  if (thumbnailContainer.value) {
    thumbnailContainer.value.removeEventListener('scroll', updateScrollButtons)
  }
})
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.border-primary {
  border-color: var(--color-primary, #3490dc);
}
</style>