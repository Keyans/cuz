<template>
      <section class="bg-[#F9F7F2] py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center mb-12 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">什么是POD按需定制</h2>
        <p class="text-gray-600 text-lg">平台为卖家提供选品、设计、生产、物流、售后等一站式柔性供应链服务。</p>
      </div>

      <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto">
        <!-- 左侧视频/图片展示 -->
        <div class="lg:w-1/2 relative">
          <div class="relative rounded-lg overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="POD按需定制" class="w-full h-auto rounded-lg">
            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div class="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all">
                <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧内容说明 -->
        <div class="lg:w-1/2 space-y-6">
          <div class="text-xl md:text-2xl font-bold mb-4">平台为卖家提供选品、设计、生产、物流、售后等一站式柔性供应链服务。</div>
          <p class="text-gray-600">卖家只需要专注于产品推广，无需担心库存和物流问题，平台会根据订单需求进行生产和配送。</p>
          
          <div class="space-y-4 mt-6">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="text-base font-semibold">自助生成商品效果图</h4>
                <p class="text-sm text-gray-600">AI智能设计，一键生成产品图案</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="text-base font-semibold">自助定制订单处理</h4>
                <p class="text-sm text-gray-600">订单自动处理，无需人工干预</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="text-base font-semibold">智能化推荐支付</h4>
                <p class="text-sm text-gray-600">无需担心资金问题，平台提供安全支付方案</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="text-base font-semibold">可视化物流跟踪</h4>
                <p class="text-sm text-gray-600">全程跟踪订单状态，确保准时送达</p>
              </div>
            </div>
          </div>
          
          <button class="mt-6 bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors">
            了解更多
          </button>
        </div>
      </div>
    </div>
  </section>
</template>