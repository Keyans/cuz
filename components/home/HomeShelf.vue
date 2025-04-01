<template>
      <section class="bg-white py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center mb-12 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">立即铺货</h2>
        <p class="text-gray-600 text-lg">全球POD柔性定制供应链平台，抢占电商AI创业新蓝海</p>
      </div>

      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          v-for="tab in tabs"
          :key="tab"
          @click="productTab = tab"
          :class="[
            'px-6 py-2 rounded-full text-sm font-medium transition-colors',
            productTab === tab ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ tab }}
        </button>
      </div>
      
      <div class="relative w-full">
        <button 
          @click="scrollProducts('left')" 
          class="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 hover:shadow-lg md:flex items-center justify-center hidden z-10 transition-transform duration-200 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div ref="productsContainer" class="flex overflow-x-auto gap-6 py-4 px-2 scrollbar-hide">
          <DirectionAwareHover
            v-for="(item, index) in currentProducts"
            :key="index"
            :image-url="item.img"
            class="flex-none w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 shadow-lg rounded-lg overflow-hidden"
          >
            <h2 class="text-xl font-semibold">{{ item.title }}</h2>
            <p class="mt-2">{{ item.description }}</p>
            <div class="mt-3 flex items-center">
              <span class="text-lg font-bold text-red-500">¥{{ item.price }}</span>
              <span v-if="item.originalPrice" class="ml-2 text-sm line-through text-gray-500">¥{{ item.originalPrice }}</span>
            </div>
          </DirectionAwareHover>
        </div>
        
        <button 
          @click="scrollProducts('right')" 
          class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 md:flex items-center justify-center hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from 'vue';
import { DirectionAwareHover } from '~/components/ui/direction-aware-hover';

const tabs = ['热门商品', '新品推荐', '极速出货', '设计成品', '创意图库'];
const productTab = ref('热门商品'); // 默认选中第一个标签
const productsContainer = ref(null);

// 产品左右滚动功能
const scrollProducts = (direction) => {
  if (productsContainer.value) {
    const container = productsContainer.value;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const currentScroll = container.scrollLeft;
    const gap = 24; // gap-6 equals to 1.5rem = 24px
    
    // 计算每次滚动的距离，考虑间距
    const scrollAmount = direction === 'left' ? 
      Math.max(-clientWidth, -currentScroll) : 
      Math.min(clientWidth, scrollWidth - (currentScroll + clientWidth));
    
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
};

// 热门商品数据
const hotProducts = [
  {
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop',
    title: '定制T恤',
    description: '优质面料，舒适透气',
    price: 89,
    originalPrice: 129
  },
  {
    img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2080&auto=format&fit=crop',
    title: '创意马克杯',
    description: '陶瓷材质，安全环保',
    price: 49,
    originalPrice: 69
  },
  {
    img: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=2080&auto=format&fit=crop',
    title: '帆布包',
    description: '简约设计，实用耐用',
    price: 79,
    originalPrice: 99
  },
  {
    img: 'https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=80&w=2080&auto=format&fit=crop',
    title: '定制手机壳',
    description: '多机型适配，个性定制',
    price: 39,
    originalPrice: 59
  },
  {
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2080&auto=format&fit=crop',
    title: '新款卫衣',
    description: '秋冬新款，保暖舒适',
    price: 159,
    originalPrice: 199
  },
  {
    img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2080&auto=format&fit=crop',
    title: '生日礼盒',
    description: '精美包装，送礼首选',
    price: 199,
    originalPrice: 259
  },
  {
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2080&auto=format&fit=crop',
    title: '创意笔记本',
    description: '优质纸张，书写流畅',
    price: 29,
    originalPrice: 39
  }
];

// 新品推荐数据
const newProducts = [
  {
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2080&auto=format&fit=crop',
    title: '新款卫衣',
    description: '秋冬新款，保暖舒适',
    price: 159,
    originalPrice: 199
  },
  {
    img: 'https://images.unsplash.com/photo-1618354691229-88d47f285158?q=80&w=2080&auto=format&fit=crop',
    title: '潮流水杯',
    description: '不锈钢材质，保温效果好',
    price: 69,
    originalPrice: 89
  },
  {
    img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2080&auto=format&fit=crop',
    title: '北欧台灯',
    description: '简约设计，优雅大方',
    price: 179,
    originalPrice: 249
  },
  {
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2080&auto=format&fit=crop',
    title: '创意笔记本',
    description: '优质纸张，书写流畅',
    price: 29,
    originalPrice: 39
  }
];

// 极速出货数据
const fastProducts = [
  {
    img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2080&auto=format&fit=crop',
    title: '运动T恤',
    description: '速干面料，24小时发货',
    price: 99,
    originalPrice: 129
  },
  {
    img: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=2080&auto=format&fit=crop',
    title: '轻便帽子',
    description: '纯棉材质，48小时到货',
    price: 49,
    originalPrice: 69
  },
  {
    img: 'https://images.unsplash.com/photo-1611010344444-5f9e4d86a6e1?q=80&w=2080&auto=format&fit=crop',
    title: '防晒衬衫',
    description: '轻薄透气，急速配送',
    price: 119,
    originalPrice: 159
  },
  {
    img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2080&auto=format&fit=crop',
    title: '时尚眼镜',
    description: '轻量镜框，当日发货',
    price: 89,
    originalPrice: 129
  }
];

// 设计成品数据
const designProducts = [
  {
    img: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=2080&auto=format&fit=crop',
    title: '艺术挂画',
    description: '原创设计，限量发售',
    price: 199,
    originalPrice: 299
  },
  {
    img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2080&auto=format&fit=crop',
    title: '创意花瓶',
    description: '独特造型，精工细作',
    price: 159,
    originalPrice: 199
  },
  {
    img: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=2080&auto=format&fit=crop',
    title: '木质摆件',
    description: '天然材质，工艺精湛',
    price: 129,
    originalPrice: 159
  },
  {
    img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2080&auto=format&fit=crop',
    title: '北欧台灯',
    description: '简约设计，优雅大方',
    price: 179,
    originalPrice: 249
  }
];

// 创意图库数据
const creativeProducts = [
  {
    img: 'https://images.unsplash.com/photo-1620121684840-edffcfc4b878?q=80&w=2080&auto=format&fit=crop',
    title: '水彩插画',
    description: '原创艺术，IP授权',
    price: 99,
    originalPrice: 149
  },
  {
    img: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2080&auto=format&fit=crop',
    title: '复古图案',
    description: '经典设计，多场景适用',
    price: 79,
    originalPrice: 99
  },
  {
    img: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2080&auto=format&fit=crop',
    title: '趣味卡通',
    description: '可爱形象，定制印刷',
    price: 69,
    originalPrice: 89
  },
  {
    img: 'https://images.unsplash.com/photo-1573221566340-81bdde00e00b?q=80&w=2080&auto=format&fit=crop',
    title: '几何图形',
    description: '现代简约，年轻时尚',
    price: 59,
    originalPrice: 79
  }
];

// 根据当前选中的标签返回对应的产品数据
const currentProducts = computed(() => {
  switch (productTab.value) {
    case '热门商品':
      return hotProducts;
    case '新品推荐':
      return newProducts;
    case '极速出货':
      return fastProducts;
    case '设计成品':
      return designProducts;
    case '创意图库':
      return creativeProducts;
    default:
      return hotProducts;
  }
});
</script>
<style scoped>
/* 确保圆形数字标记保持圆形 */
.rounded-full {
  aspect-ratio: 1;
}

/* 隐藏滚动条 */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 添加滚动捕捉效果 */
.snap-x {
  scroll-snap-type: x mandatory;
}
.snap-center {
  scroll-snap-align: center;
}
</style>