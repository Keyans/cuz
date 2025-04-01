<template>
  <div>
    <AppSeo
      :title="`${product.name} - Printify 产品详情`"
      :description="`${product.name} - ${product.description.substring(0, 150)}...`"
      :keywords="`printify, 定制${product.name}, 按需印刷, 定制产品, ${product.category}`"
      :ogImage="product.image"
      ogType="product"
    />

    <div class="container-app py-8 md:py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 产品图像 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <OptimizedImage
            :src="product.image"
            :alt="product.name"
            class="w-full h-auto object-contain"
            width="500"
            height="500"
            format="webp"
            preset="product"
            loading="eager"
            imgClass="w-full h-auto object-contain aspect-square"
          />
        </div>

        <!-- 产品信息 -->
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-primary mb-2">{{ product.name }}</h1>
          <div class="flex items-center mb-4">
            <div class="flex">
              <span v-for="i in 5" :key="i" class="text-yellow-400">
                <svg class="w-5 h-5" :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
              <span class="text-sm text-gray-600 ml-2">{{ product.reviewCount }} 条评价</span>
            </div>
          </div>

          <div class="text-2xl font-bold text-primary mb-4">${{ product.price.toFixed(2) }}</div>

          <div class="mb-6">
            <h2 class="font-bold text-lg mb-2">描述</h2>
            <p class="text-gray-700">{{ product.description }}</p>
          </div>

          <div class="mb-6">
            <h2 class="font-bold text-lg mb-2">规格</h2>
            <ul class="list-disc list-inside text-gray-700">
              <li v-for="(spec, index) in product.specifications" :key="index">{{ spec }}</li>
            </ul>
          </div>

          <div class="mb-6">
            <h2 class="font-bold text-lg mb-2">选择颜色</h2>
            <div class="flex space-x-2">
              <button
                v-for="color in product.colors"
                :key="color.name"
                class="w-8 h-8 rounded-full border-2"
                :class="selectedColor === color.name ? 'border-primary' : 'border-transparent'"
                :style="{ backgroundColor: color.hex }"
                @click="selectedColor = color.name"
              ></button>
            </div>
          </div>

          <div class="mb-6">
            <h2 class="font-bold text-lg mb-2">选择尺寸</h2>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in product.sizes"
                :key="size"
                class="px-3 py-1 border rounded"
                :class="selectedSize === size ? 'bg-secondary border-primary text-primary' : 'border-gray-300 hover:border-primary'"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="flex items-center mb-6">
            <div class="mr-4">
              <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">数量</label>
              <div class="flex">
                <button
                  class="px-2 py-1 border border-gray-300 rounded-l"
                  @click="quantity > 1 ? quantity-- : null"
                >
                  -
                </button>
                <input
                  id="quantity"
                  v-model="quantity"
                  type="number"
                  min="1"
                  class="w-12 text-center border-t border-b border-gray-300"
                />
                <button
                  class="px-2 py-1 border border-gray-300 rounded-r"
                  @click="quantity++"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button class="btn-primary px-6 py-2">定制设计</button>
            <button class="btn-secondary px-6 py-2">添加到购物车</button>
          </div>
        </div>
      </div>

      <!-- 产品详情 Tab -->
      <div class="mt-12">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-4 px-1 border-b-2 font-medium text-sm"
              :class="activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="py-6">
          <!-- 详情内容 -->
          <div v-if="activeTab === 'details'" class="prose max-w-none">
            <h3 class="text-xl font-bold mb-4">产品详情</h3>
            <p>{{ product.fullDescription }}</p>
          </div>

          <!-- 规格内容 -->
          <div v-if="activeTab === 'specifications'" class="prose max-w-none">
            <h3 class="text-xl font-bold mb-4">规格</h3>
            <ul>
              <li v-for="(spec, index) in product.specifications" :key="index" class="mb-2">{{ spec }}</li>
            </ul>
            <table class="w-full mt-4 border-collapse">
              <thead>
                <tr class="bg-gray-100">
                  <th class="border border-gray-300 px-4 py-2 text-left">规格</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">值</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in product.specTable" :key="key">
                  <td class="border border-gray-300 px-4 py-2 font-medium">{{ key }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 评价内容 -->
          <div v-if="activeTab === 'reviews'" class="prose max-w-none">
            <h3 class="text-xl font-bold mb-4">客户评价</h3>
            <div v-if="product.reviews.length === 0" class="text-gray-500">
              暂无评价
            </div>
            <div v-else>
              <div v-for="(review, index) in product.reviews" :key="index" class="mb-6 pb-6 border-b border-gray-200 last:border-0">
                <div class="flex items-center mb-2">
                  <div class="flex">
                    <span v-for="i in 5" :key="i" class="text-yellow-400">
                      <svg class="w-4 h-4" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </div>
                  <span class="font-bold ml-2">{{ review.title }}</span>
                </div>
                <p class="text-gray-700 mb-2">{{ review.comment }}</p>
                <div class="flex items-center text-sm text-gray-500">
                  <span class="font-medium mr-2">{{ review.author }}</span>
                  <span>{{ review.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 相关产品 -->
      <LazyLoadSection>
        <div class="mt-12">
          <h2 class="text-2xl font-bold text-primary mb-6">相关产品</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
            >
              <NuxtLink :to="`/products/${relatedProduct.slug}`" class="block">
                <OptimizedImage
                  :src="relatedProduct.image"
                  :alt="relatedProduct.name"
                  width="200"
                  height="200"
                  format="webp"
                  preset="thumbnail"
                  loading="lazy"
                  imgClass="w-full h-40 object-contain"
                />
                <div class="p-4">
                  <h3 class="font-bold text-primary mb-1 truncate">{{ relatedProduct.name }}</h3>
                  <p class="text-gray-700 font-bold">${{ relatedProduct.price.toFixed(2) }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </LazyLoadSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import OptimizedImage from '@/components/common/OptimizedImage.vue'
import LazyLoadSection from '@/components/common/LazyLoadSection.vue'

const route = useRoute()
const slug = route.params.slug

// 当前产品的状态
const product = ref({
  id: 1,
  name: 'Custom Printed T-Shirt',
  slug: 'custom-printed-tshirt',
  description: 'Premium quality custom printed t-shirt made with 100% cotton. Perfect for your brand or special event.',
  fullDescription: 'Our premium quality custom printed t-shirts are made with 100% combed ring-spun cotton, providing exceptional comfort and durability. These shirts feature a modern fit that flatters any body type and are pre-shrunk to ensure your design stays looking great wash after wash. Perfect for brand merchandise, special events, or personal expression, our t-shirts offer a canvas for your creativity with vibrant, long-lasting prints that won\'t crack or fade.',
  image: '/assets/products/tshirt.png',
  price: 24.99,
  category: 'Clothing',
  subcategory: 'T-Shirts',
  rating: 4.5,
  reviewCount: 127,
  specifications: [
    '100% ring-spun cotton',
    'Pre-shrunk',
    'Shoulder-to-shoulder taping',
    'Quarter-turned to avoid crease down the center',
    'Double-needle sleeve and bottom hem'
  ],
  specTable: {
    'Material': '100% Combed Ring-Spun Cotton',
    'Weight': '4.3 oz/yd² (145.8 g/m²)',
    'Fabric Thickness': 'Medium',
    'Printing Method': 'DTG (Direct to Garment)',
    'Sizes Available': 'XS, S, M, L, XL, 2XL, 3XL',
    'Care Instructions': 'Machine wash cold, inside-out, gentle cycle with mild detergent'
  },
  colors: [
    { name: 'White', hex: '#ffffff' },
    { name: 'Black', hex: '#000000' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Red', hex: '#ff0000' },
    { name: 'Green', hex: '#008000' }
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
  reviews: [
    {
      author: 'John D.',
      date: '2025-02-15',
      rating: 5,
      title: 'Great quality shirt!',
      comment: 'The print quality is excellent and the shirt is very comfortable. Highly recommend!'
    },
    {
      author: 'Sarah L.',
      date: '2025-01-20',
      rating: 4,
      title: 'Good shirt, runs a bit small',
      comment: 'The quality is good but I found it runs a bit small. Order a size up if you\'re unsure.'
    },
    {
      author: 'Mike T.',
      date: '2024-12-10',
      rating: 5,
      title: 'Perfect for our team',
      comment: 'We ordered these for our company event and everyone loved them. Great quality and fast shipping.'
    }
  ]
})

const relatedProducts = ref([
  {
    id: 2,
    name: 'Custom Hoodie',
    slug: 'custom-hoodie',
    image: '/assets/products/hoodie.png',
    price: 39.99
  },
  {
    id: 3,
    name: 'Custom Mug',
    slug: 'custom-mug',
    image: '/assets/products/mug.png',
    price: 14.99
  },
  {
    id: 4,
    name: 'Custom Tote Bag',
    slug: 'custom-tote-bag',
    image: '/assets/products/bags.png',
    price: 19.99
  },
  {
    id: 5,
    name: 'Custom Sweatshirt',
    slug: 'custom-sweatshirt',
    image: '/assets/products/sweatshirt.png',
    price: 34.99
  }
])

// 产品选择状态
const selectedColor = ref('White')
const selectedSize = ref('M')
const quantity = ref(1)

// 详情页 tabs
const tabs = [
  { id: 'details', name: '详情' },
  { id: 'specifications', name: '规格' },
  { id: 'reviews', name: '评价' }
]
const activeTab = ref('details')

// 添加结构化数据 for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.value.name,
        image: [product.value.image],
        description: product.value.description,
        brand: {
          '@type': 'Brand',
          name: 'Printify'
        },
        sku: `PRD-${product.value.id}`,
        offers: {
          '@type': 'Offer',
          url: `https://your-domain.com/products/${product.value.slug}`,
          priceCurrency: 'USD',
          price: product.value.price,
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.value.rating,
          reviewCount: product.value.reviewCount
        },
        review: product.value.reviews.map(review => ({
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating,
            bestRating: '5'
          },
          author: {
            '@type': 'Person',
            name: review.author
          },
          datePublished: review.date,
          reviewBody: review.comment,
          name: review.title
        }))
      })
    }
  ]
})

// 模拟从API获取产品数据
onMounted(() => {
  // 在实际应用中，这里会从API获取产品数据
  // fetchProduct(slug)
})

// 定义页面元信息
definePageMeta({
  layout: 'default'
})
</script>
