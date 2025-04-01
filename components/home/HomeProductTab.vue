<template>
      <section class="bg-printify-cream py-16">
        <div class="container mx-auto px-4">
      <div class="relative">
        <button @click="scrollLeft" class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div class="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide" ref="productsSlider">
          <div v-for="(product, index) in products" :key="index" class="flex-none w-40 md:w-48 mx-2">
            <router-link :to="product.link" class="block text-center group">
              <div class="bg-white rounded-lg p-4 mb-2 shadow-sm transition-transform group-hover:shadow-md group-hover:-translate-y-1">
                <img :src="product.image" :alt="product.name" class="h-32 mx-auto">
              </div>
              <p class="text-printify-dark font-medium text-sm">{{ product.name }}</p>
            </router-link>
          </div>
        </div>

        <button @click="scrollRight" class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
// const isDark = computed(() => useColorMode().value == "dark");
const products = [
{
          name: 'T-shirts',
          image: 'https://ext.same-assets.com/817906495/3257356.webp',
          link: '/app/products/mens-clothing/t-shirts'
        },
        {
          name: 'Sweatshirt',
          image: 'https://ext.same-assets.com/1445519514/1648442875.webp',
          link: '/app/products/womens-clothing/sweatshirts'
        },
        {
          name: 'Mugs',
          image: 'https://ext.same-assets.com/3965162463/2971667221.webp',
          link: '/app/products/home-and-living/mugs'
        },
        {
          name: 'Hoodie',
          image: 'https://ext.same-assets.com/1058857193/4066051932.webp',
          link: '/app/products/mens-clothing/hoodies'
        },
        {
          name: 'Kids clothing',
          image: 'https://ext.same-assets.com/683519307/4001271168.webp',
          link: '/app/products/kids-clothing'
        },
        {
          name: 'Stickers',
          image: 'https://ext.same-assets.com/3635049860/3606820756.webp',
          link: '/app/products/home-and-living/magnets-and-stickers'
        },
        {
          name: 'Phone cases',
          image: 'https://ext.same-assets.com/378110523/4264551984.webp',
          link: '/app/products/accessories/phone-cases'
        },
        {
          name: 'Posters',
          image: 'https://ext.same-assets.com/203836858/1705327113.webp',
          link: '/app/products/home-and-living/posters'
        },
        {
          name: 'Candles',
          image: 'https://ext.same-assets.com/539519909/4086639946.webp',
          link: '/app/products/home-and-living/home-decor'
        },
        {
          name: 'Bags',
          image: 'https://ext.same-assets.com/650447100/1514958678.webp',
          link: '/app/products/accessories/bags'
        }
]
const productsSlider = ref(null);

const scrollLeft = () => {
      const container = productsSlider.value;
      container.scrollBy({ left: -300, behavior: 'smooth' });
}
const scrollRight = () => {
      const container = productsSlider.value;
      container.scrollBy({ left: 300, behavior: 'smooth' });
}
</script>
<style scoped>

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>