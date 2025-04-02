<template>
  <div>
    <!-- Welcome section with date and greeting -->
    <div class="mb-6 md:mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-primary mb-1">Dashboard</h1>
          <p class="text-gray-600 text-sm md:text-base">
            Welcome back{{ user ? `, ${user.name}` : '' }}! <span class="hidden sm:inline">Here's your store overview.</span>
          </p>
        </div>
        <div class="mt-4 sm:mt-0 text-right">
          <p class="text-sm text-gray-500">{{ currentDate }}</p>
          <p class="text-xs text-primary font-medium">{{ storeName }}</p>
        </div>
      </div>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="bg-white p-4 md:p-6 rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-3 md:mb-4">
          <span class="text-gray-500 text-xs md:text-sm">{{ stat.name }}</span>
          <span class="text-white p-1.5 md:p-2 rounded" :class="`bg-${stat.color}`">
            <component :is="stat.icon" class="h-3 w-3 md:h-4 md:w-4" />
          </span>
        </div>
        <div class="text-lg md:text-2xl font-bold mb-1">{{ stat.value }}</div>
        <div class="flex items-center text-xs md:text-sm">
          <span :class="stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'" class="flex items-center">
            <svg v-if="stat.changeType === 'increase'" class="h-3 w-3 md:h-4 md:w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <svg v-else class="h-3 w-3 md:h-4 md:w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            {{ stat.change }}
          </span>
          <span class="text-gray-500 ml-1">since last month</span>
        </div>
      </div>
    </div>

    <!-- Analytics chart section -->
    <div class="bg-white rounded-lg shadow mb-6 md:mb-8 p-4 md:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-gray-200">
        <h2 class="text-base md:text-lg font-bold text-primary">Sales Analytics</h2>
        <div class="mt-2 sm:mt-0 flex space-x-2">
          <button
            v-for="period in chartPeriods"
            :key="period.value"
            @click="activePeriod = period.value"
            class="px-2 py-1 text-xs rounded-md transition-colors"
            :class="activePeriod === period.value ? 'bg-secondary text-primary' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          >
            {{ period.label }}
          </button>
        </div>
      </div>

      <!-- Simple chart visualization -->
      <div class="h-48 md:h-64">
        <div class="h-full flex items-end justify-between px-2">
          <div v-for="(item, index) in chartData" :key="index" class="w-full max-w-[30px] mx-auto flex flex-col items-center">
            <div
              class="w-full bg-secondary bg-opacity-70 rounded-t transition-all duration-700"
              :style="{ height: `${(item.value / maxChartValue) * 100}%` }"
            ></div>
            <div class="text-xs text-gray-500 mt-2">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent activity and sales -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
      <!-- Recent orders -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-4 md:p-6 border-b border-gray-200 flex flex-wrap justify-between items-center">
          <h2 class="text-base md:text-lg font-bold text-primary">Recent Orders</h2>
          <div class="flex items-center">
            <span class="inline-flex h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            <span class="text-xs text-gray-500">Live updates</span>
          </div>
        </div>
        <div class="p-4 md:p-6">
          <div v-if="recentOrders.length === 0" class="text-gray-500 text-center py-4 text-sm">
            No recent orders
          </div>
          <ul v-else class="divide-y divide-gray-200">
            <li v-for="order in recentOrders" :key="order.id" class="py-3 md:py-4">
              <div class="flex items-center space-x-2 md:space-x-4">
                <div class="flex-shrink-0">
                  <img :src="order.image" :alt="order.product" class="h-8 w-8 md:h-10 md:w-10 rounded-md bg-gray-100 object-cover">
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs md:text-sm font-medium text-primary truncate">{{ order.product }}</p>
                  <p class="text-xs md:text-sm text-gray-500 truncate">Order #{{ order.id }}</p>
                </div>
                <div>
                  <span class="inline-flex px-1.5 md:px-2 py-0.5 md:py-1 text-xs font-semibold rounded-full" :class="getStatusClass(order.status)">
                    {{ order.status }}
                  </span>
                </div>
                <div class="flex-shrink-0 text-xs md:text-sm text-gray-500">${{ order.amount.toFixed(2) }}</div>
              </div>
            </li>
          </ul>
          <div class="mt-4">
            <NuxtLink to="/dashboard/orders" class="text-primary hover:text-secondary text-xs md:text-sm font-medium inline-flex items-center">
              View all orders
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Recently added products -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-4 md:p-6 border-b border-gray-200 flex flex-wrap justify-between items-center">
          <h2 class="text-base md:text-lg font-bold text-primary">Recently Added Products</h2>
          <button class="text-primary text-sm hover:text-secondary">
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New
            </span>
          </button>
        </div>
        <div class="p-4 md:p-6">
          <div v-if="recentProducts.length === 0" class="text-gray-500 text-center py-4 text-sm">
            No products added yet
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div
              v-for="product in recentProducts"
              :key="product.id"
              class="border rounded-lg p-3 md:p-4 transition-all hover:shadow-md hover:border-gray-300"
            >
              <img :src="product.image" :alt="product.name" class="w-full h-24 md:h-32 object-cover rounded-md mb-2 md:mb-4">
              <h3 class="font-medium text-primary text-xs md:text-sm">{{ product.name }}</h3>
              <p class="text-xs text-gray-500">Added {{ product.added }}</p>
              <div class="mt-2 flex justify-between items-center">
                <span class="font-bold text-xs md:text-sm">${{ product.price.toFixed(2) }}</span>
                <NuxtLink :to="`/dashboard/products/${product.id}`" class="text-xs bg-secondary text-primary px-2 py-1 rounded">
                  Edit
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <NuxtLink to="/dashboard/products" class="text-primary hover:text-secondary text-xs md:text-sm font-medium inline-flex items-center">
              View all products
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions section with animation on hover -->
    <div class="bg-white rounded-lg shadow mb-6 md:mb-8">
      <div class="p-4 md:p-6 border-b border-gray-200">
        <h2 class="text-base md:text-lg font-bold text-primary">Quick Actions</h2>
      </div>
      <div class="p-4 md:p-6 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        <NuxtLink
          v-for="(action, index) in quickActions"
          :key="index"
          :to="action.to"
          class="flex flex-col items-center justify-center p-4 md:p-5 border rounded-lg bg-gray-50 hover:bg-secondary hover:bg-opacity-20 transition-all hover:shadow-md group"
        >
          <div class="h-10 w-10 flex items-center justify-center rounded-full bg-secondary bg-opacity-20 text-primary mb-3 group-hover:-translate-y-1 transition-transform">
            <component :is="action.icon" class="h-5 w-5" />
          </div>
          <span class="font-medium text-xs md:text-sm text-center">{{ action.name }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Recent activity timeline -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-4 md:p-6 border-b border-gray-200">
        <h2 class="text-base md:text-lg font-bold text-primary">Recent Activity</h2>
      </div>
      <div class="p-4 md:p-6">
        <ol class="relative border-l border-gray-200 ml-3">
          <li v-for="(activity, index) in recentActivity" :key="index" class="mb-6 last:mb-0">
            <div class="absolute w-3 h-3 rounded-full -left-1.5 border border-white" :class="`bg-${activity.color}`"></div>
            <time class="mb-1 text-xs font-normal leading-none text-gray-500">{{ activity.time }}</time>
            <h3 class="text-sm font-medium text-primary">{{ activity.title }}</h3>
            <p class="text-xs text-gray-500 mt-0.5">{{ activity.description }}</p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

// Set the dashboard layout
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

// Get the current user
const authStore = useAuthStore()
const user = computed(() => authStore.currentUser)

// Store information
const storeName = "Your cuzcuz Store"

// Format current date
const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Mock stats data
const stats = ref([
  {
    name: 'Total Products',
    value: '24',
    change: '12%',
    changeType: 'increase',
    color: 'primary',
    icon: 'IconBox'
  },
  {
    name: 'Total Sales',
    value: '$2,456',
    change: '23.5%',
    changeType: 'increase',
    color: 'green',
    icon: 'IconCash'
  },
  {
    name: 'New Customers',
    value: '14',
    change: '5%',
    changeType: 'increase',
    color: 'purple',
    icon: 'IconUser'
  },
  {
    name: 'Pending Orders',
    value: '7',
    change: '3%',
    changeType: 'decrease',
    color: 'brown',
    icon: 'IconShoppingCart'
  }
])

// Chart data
const chartPeriods = [
  { label: '7 Days', value: '7days' },
  { label: '30 Days', value: '30days' },
  { label: '3 Months', value: '3months' },
  { label: 'Year', value: 'year' }
]
const activePeriod = ref('30days')

const chartData = ref([
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 75 },
  { label: 'Apr', value: 85 },
  { label: 'May', value: 55 },
  { label: 'Jun', value: 70 },
  { label: 'Jul', value: 65 },
  { label: 'Aug', value: 40 },
  { label: 'Sep', value: 45 },
  { label: 'Oct', value: 80 },
  { label: 'Nov', value: 90 },
  { label: 'Dec', value: 100 }
])

const maxChartValue = computed(() => {
  return Math.max(...chartData.value.map(item => item.value))
})

// Mock recent orders
const recentOrders = ref([
  {
    id: '8721',
    product: 'Custom T-Shirt',
    image: '/assets/products/tshirt.png',
    status: 'Processing',
    amount: 24.99
  },
  {
    id: '8720',
    product: 'Hoodie',
    image: '/assets/products/hoodie.png',
    status: 'Shipped',
    amount: 39.99
  },
  {
    id: '8719',
    product: 'Coffee Mug',
    image: '/assets/products/mug.png',
    status: 'Delivered',
    amount: 14.99
  }
])

// Mock recent products
const recentProducts = ref([
  {
    id: '101',
    name: 'Summer Graphic Tee',
    image: '/assets/products/tshirt-2.png',
    price: 22.99,
    added: '2 days ago'
  },
  {
    id: '102',
    name: 'Custom Hoodie',
    image: '/assets/products/hoodie-2.png',
    price: 42.99,
    added: '1 week ago'
  }
])

// Quick actions
const quickActions = [
  {
    name: 'Create Product',
    icon: 'IconAdd',
    to: '/dashboard/products/new'
  },
  {
    name: 'Manage Orders',
    icon: 'IconShoppingCart',
    to: '/dashboard/orders'
  },
  {
    name: 'Design Studio',
    icon: 'IconWorkspace',
    to: '/dashboard/workspace'
  },
  {
    name: 'Settings',
    icon: 'IconSettings',
    to: '/dashboard/settings'
  }
]

// Recent activity
const recentActivity = ref([
  {
    time: 'Just now',
    title: 'New order received',
    description: 'Customer John D. placed an order for Custom T-Shirt.',
    color: 'green'
  },
  {
    time: '2 hours ago',
    title: 'Product updated',
    description: 'You updated the "Summer Graphic Tee" product details.',
    color: 'blue'
  },
  {
    time: 'Yesterday',
    title: 'New design created',
    description: 'You created a new design "Summer Vibes" in the workspace.',
    color: 'purple'
  },
  {
    time: '3 days ago',
    title: 'Order shipped',
    description: 'Order #8720 was marked as shipped.',
    color: 'accent'
  }
])

// Get status class for order status
const getStatusClass = (status: string) => {
  switch (status) {
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800'
    case 'Shipped':
      return 'bg-blue-100 text-blue-800'
    case 'Delivered':
      return 'bg-green-100 text-green-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Simple icon components

const IconBox = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  `
})

const IconCash = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  `
})

const IconUser = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  `
})

const IconShoppingCart = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  `
})

// Add icon for quick actions
const IconAdd = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  `
})

// Workspace icon
const IconWorkspace = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  `
})

// Settings icon
const IconSettings = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `
})
</script>
