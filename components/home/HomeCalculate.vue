<template>
  <section class="bg-gradient-to-r from-amber-100/90 via-amber-200/70 to-amber-300/50 py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center mb-12 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">立即测算: 看看你能赚多少</h2>
      </div>

      <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl">
        <!-- 左侧产品展示图片 -->
        <div class="lg:w-1/2 overflow-hidden" style="height: 552px;">
          <img 
            :src="selectedProduct === 'tshirt' ? 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1000&auto=format&fit=crop'"
            :alt="selectedProduct === 'tshirt' ? 'T恤产品展示' : '手机壳产品展示'"
            class="w-full"
          />
        </div>

        <!-- 右侧计算器功能 -->
        <div class="lg:w-1/2 p-8">
          <div class="space-y-8">
            <!-- 产品选择 -->
            <div>
              <h3 class="text-lg font-semibold mb-3">选择产品:</h3>
              <div class="flex gap-3">
                <button 
                  @click="selectedProduct = 'tshirt'"
                  class="w-32 h-12 rounded-lg text-sm font-medium transition-all duration-300"
                  :class="[
                    selectedProduct === 'tshirt' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  ]"
                >
                  T恤
                </button>
                <button 
                  @click="selectedProduct = 'phonecase'"
                  class="w-32 h-12 rounded-lg text-sm font-medium transition-all duration-300"
                  :class="[
                    selectedProduct === 'phonecase' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  ]"
                >
                  手机壳
                </button>
              </div>
            </div>

            <!-- 数量和价格滑块 -->
            <div>
              <h3 class="text-lg font-semibold mb-2">数量和价格:</h3>
              <div class="mb-4">
                <p class="text-sm text-gray-600 mb-1">出售价:</p>
                <div class="flex items-center gap-4">
                  <input 
                    type="range" 
                    v-model="salesPrice" 
                    min="10" 
                    max="100" 
                    step="1"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-white [&::-webkit-slider-thumb]:ring-offset-2 [&::-webkit-slider-thumb]:ring-offset-black [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:ring-2 [&::-moz-range-thumb]:ring-white [&::-moz-range-thumb]:ring-offset-2 [&::-moz-range-thumb]:ring-offset-black [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-black [&::-webkit-slider-runnable-track]:to-gray-200 [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-black [&::-moz-range-track]:to-gray-200"
                    @input="calculateProfit"
                  >
                  <span class="bg-gray-100 px-2 py-1 rounded text-sm w-16 text-center">${{ salesPrice }}</span>
                </div>
              </div>
              <div>
                <p class="text-sm text-gray-600 mb-1">日出售件数:</p>
                <div class="flex items-center gap-4">
                  <input 
                    type="range" 
                    v-model="dailySales" 
                    min="1" 
                    max="100" 
                    step="1"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-white [&::-webkit-slider-thumb]:ring-offset-2 [&::-webkit-slider-thumb]:ring-offset-black [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:ring-2 [&::-moz-range-thumb]:ring-white [&::-moz-range-thumb]:ring-offset-2 [&::-moz-range-thumb]:ring-offset-black [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-black [&::-webkit-slider-runnable-track]:to-gray-200 [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-black [&::-moz-range-track]:to-gray-200"
                    @input="calculateProfit"
                  >
                  <span class="bg-gray-100 px-2 py-1 rounded text-sm w-16 text-center">{{ dailySales }}</span>
                </div>
              </div>
            </div>

            <!-- 月盈利计算结果 -->
            <div>
              <h3 class="text-lg font-semibold mb-3">月盈利:</h3>
              <div class="text-6xl font-bold">${{ monthlyProfit.toLocaleString() }}</div>
            </div>

            <!-- 立即测算按钮 -->
            <button class="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
              立即测算
            </button>
          </div>
        </div>
      </div>

      <p class="text-center text-sm text-gray-700 mt-6">*盈利数据仅供参考，一件印刷的具体利润会根据产品类型、材质和市场需求而有所不同。</p>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from 'vue';
// 立即测算模块所需变量
const selectedProduct = ref('tshirt');
const salesPrice = ref(20);
const dailySales = ref(3);
const costPrice = ref(5);
const shippingCost = ref(2);
const otherCost = ref(1);


// 计算月盈利
const monthlyProfit = computed(() => {
  // 根据选择的产品调整成本
  const productCost = selectedProduct.value === 'tshirt' ? 5 : 3;
  // 单件利润 = 销售价格 - 产品成本 - 运输费用 - 其他费用
  const profitPerItem = salesPrice.value - productCost - shippingCost.value - otherCost.value;
  // 月盈利 = 单件利润 * 日销量 * 30天
  return Math.round(profitPerItem * dailySales.value * 30);
});
</script>