<template>
      <section class="bg-[#F8F8F8] py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center mb-12 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">三步开启你的轻资产创业</h2>
        <p class="text-gray-600 text-lg">全球POD柔性定制供应链平台，抢占电商AI创业新蓝海</p>
      </div>

      <div class="flex flex-col lg:flex-row items-center gap-6 max-w-5xl mx-auto">
        <!-- 左侧步骤说明 -->
        <div class="flex-1 space-y-8 w-full lg:w-1/2">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">按需定制</h3>
              <p class="text-gray-500">POD按需定制+AI创作</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">一键刊登铺货</h3>
              <p class="text-gray-500">商品图文自动同步到你的店铺</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">坐等分润</h3>
              <p class="text-gray-500">稳定支付无忧后一件代发全球</p>
            </div>
          </div>
          <button class="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors">
            开始设计
          </button>
        </div>

        <!-- 右侧设计工具预览 -->
        <div class="flex-1 relative w-full lg:w-1/2">
          <!-- 视频 -->
          <div class="video">
            <div class="blue-bg-box"></div>
            <div class="video-bg-box">
              <video width="100%" height="100%" autoplay="autoplay">
                <source :src="aboveFold.introductionArea?.src" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { reactive } from 'vue';

// 首屏组件配置项
const aboveFold = reactive({
  backgroundImage:
    'https://www.hicustom.com/static/frontend/images/indexNew/new-web/festival/main-bg-text_common.png',
  bannerTile_highlight: '供应链选品', // 标题高亮文字部分
  functionButton: [
    { name: '立即使用', path: '/mirco_pod' },
    { name: '更多介绍', path: '' },
  ],
  featureDescription: [
    { icon: 'Medal', text: '1件起订' },
    { icon: 'Cpu', text: '1天上新' },
    { icon: 'AlarmClock', text: '小单快返' },
  ],
  introductionArea: {
    type: 'video',
    src: 'https://static2.hicustom.com/static/frontend/images/indexNew/home/front-20241023.mp4',
  },
})
</script>
<style scoped>
.video {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  max-width: 600px;
  margin: 0 auto;

  .blue-bg-box {
    position: absolute;
    width: 100%;
    max-width: 600px;
    height: 300px;
    background-color: #0453f3;
    border-radius: 12px;
    transform: rotate(7deg) translateY(0);
  }

  .video-bg-box {
    position: absolute;
    width: 100%;
    max-width: 600px;
    height: 300px;
    background: linear-gradient(180deg, #d4d4d4 0%, #f1eeee 64%, #dadada 100%);
    border-radius: 12px;
    transform: rotate(0deg) translateY(0);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
}

@media (max-width: 1024px) {
  .video {
    margin-top: 2rem;
  }
}
</style>