<!--轮播图组件-->
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { Swiper } from 'swiper/bundle'
import 'swiper/swiper-bundle.css'

const $router = useRouter()

/*
 *variable
 */
const carousel = reactive({
  title: '您可以在全球各大电商平台销售', // 标题
  subtitle: '', // 副标题
  swiperPrev: '', // 轮播图左侧图标
  swiperNext: '', // 轮播图右侧图标
  // 轮播项列表
  list: [
    {
      image:
        'https://nimg5.hicustom.com/static/frontendService/ESIJSA-sSOOxSXZyZOMRtkkkekeqWV-1000-6a59466b8fda84018a000283cc629.png',
      showButtons: false, // 默认不显示按钮
      buttons: [
        {
          name: '联系店铺',
          icon: 'Phone',
          path: '/contact',
          redirectionMethod: 'WINDOW_OPEN',
        },
        {
          name: '了解更多',
          icon: 'More',
          path: '/contact',
          redirectionMethod: 'WINDOW_OPEN',
        },
      ],
    },
    {
      image:
        'https://nimg5.hicustom.com/static/frontendService/BYDKLG-sSOOxxOMXXXZOykkkekeqVg-1000-e7e157dd144caf5093fb5a6fe2656.png',
      showButtons: false, // 默认不显示按钮
      buttons: [
        {
          name: '联系店铺',
          icon: 'Phone',
          path: '/contact',
          redirectionMethod: 'WINDOW_OPEN',
        },
        {
          name: '了解更多',
          icon: 'More',
          path: '/contact',
          redirectionMethod: 'WINDOW_OPEN',
        },
      ],
    },
    {
      image:
        'https://nimg5.hicustom.com/static/frontendService/2RS8TI-sMRtxZStyMyMXMkWePjgWka-1000-50410c11292c844e141aae9ed72e7.png',
      showButtons: false, // 默认不显示按钮
      buttons: [
        { name: '联系店铺', path: '/contact', redirectionMethod: 'WINDOW_OPEN' },
        { name: '了解更多', path: '/contact', redirectionMethod: 'WINDOW_OPEN' },
      ],
    },
    {
      image:
        'https://nimg5.hicustom.com/static/frontendService/K9C8GG-sytxMXRSOxSZSOVkgVgWgkq-1000-d3a9ac63a56d3ecf0ecc586e7715a.jpg',
      showButtons: false, // 默认不显示按钮
      buttons: [
        { name: '联系店铺', path: '/contact', redirectionMethod: 'WINDOW_OPEN' },
        { name: '了解更多', path: '/contact', redirectionMethod: 'WINDOW_OPEN' },
      ],
    },
    {
      image:
        'https://nimg5.hicustom.com/static/frontendService/DJYUXZ-stSRXtySyQOyZykkWUPqWUW-1000-1ee5bf21a6f2d68d9cb1b7ace8186.jpg',
      showButtons: false, // 默认不显示按钮
      buttons: [
        { name: '联系店铺', path: '/contact', redirectionMethod: 'WINDOW_OPEN' },
        { name: '了解更多', path: '/contact', redirectionMethod: 'WINDOW_OPEN' },
      ],
    },
    {
      image:
        'https://nimg5.hicustom.com/static/frontendService/76UK9M-sSOOxxORytxyQkkkekeqke-1000-b451646418268d1f8c03f6a75ccfd.png',
      showButtons: false, // 默认不显示按钮
      buttons: [
        { name: '联系店铺', path: '/contact', redirectionMethod: 'WINDOW_OPEN' },
        { name: '了解更多', path: '/contact', redirectionMethod: 'WINDOW_OPEN' },
        { name: '了解更多', path: '/contact', redirectionMethod: 'WINDOW_OPEN' },
      ],
    },
    {
      image:
        'https://nimg5.hicustom.com/static/frontendService/B6NXN5-sSOOxxSMXZXyXxkkkekeVPU-1000-446b5214170df2baf8b9a7dc36eed.png',
      showButtons: false, // 默认不显示按钮
      buttons: [{ name: '联系店铺', path: '/contact', redirectionMethod: 'WINDOW_OPEN' }],
    },
  ],
})
/*
 *lifeCircle
 */
/*
 *function
 */
// 跳转
const navigator = (item: any) => {
  const path = item.path
  if (item.redirectionMethod === 'WINDOW_OPEN') window.open(path)
  else $router.push({ path, query: {} })
}

const swiperInstance = ref(null)
const handleMouseOver = (item: any, index: Number) => {
  item.showButtons = true
  swiperInstance.value.autoplay.stop() // 停止自动播放
}
const handleMouseLeave = (item: any) => {
  item.showButtons = false
  swiperInstance.value.autoplay.start()
}

// 底部按钮特殊样式处理
const getSpeciaStyle = (length: number, index: Number) => {
  if (length === 1) return 'border-radius:0 0 12px 12px'
  else if (index === 0) return 'border-radius:0 0 0 12px'
  else if (index === length - 1) return 'border-radius:0 0 12px 0;border-left: 1px solid #E4E7ED;'
  else return 'border-radius:0;border-left: 1px solid #E4E7ED;'
}
onMounted(() => {
  swiperInstance.value = new Swiper('.swiper-container-platform', {
    // Swiper 配置
    slidesPerView: 5, // 同时显示的图片的数量
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000, // 自动播放的间隔时间，单位为毫秒
      disableOnInteraction: true, // 用户交互后是否停止自动播放
    },
  })
})
</script>

<template>
  <div class="carousel">
    <div ref="slideUp">
      <div class="title">{{ carousel.title }}</div>
      <div class="subtitle">{{ carousel.subtitle }}</div>
      <div class="swiper-container-platform">
        <div class="swiper-wrapper">
          <!--轮播图-->
          <div
            v-for="(item, index) in carousel.list"
            class="swiper-slide"
            @mouseover="handleMouseOver(item, index)"
            @mouseleave="handleMouseLeave(item)"
          >
            <img
              :src="item.image"
              alt=""
              :style="{ 'margin-top': item.showButtons ? '-30px' : '0' }"
            />
            <!--底部按钮-->
            <div class="btn-group" :style="{ opacity: item.showButtons ? 1 : 0 }">
              <div
                v-for="(bItem, bIndex) in item.buttons"
                class="button"
                :style="getSpeciaStyle(item.buttons.length, bIndex)"
                @click="navigator(item)"
              >
                <span>{{ bItem.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <!--左右按钮-->
        <div class="swiper-button-prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </div>
        <div class="swiper-button-next">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  background: #ffffff;
  width: 100%;
  padding-bottom: 30px;
}
.title {
  font-size: 26px;
  font-weight: bold;
  color: #000000;
  padding-top: 40px;
  text-align: center;
  width: 100%;
}
.subtitle {
  font-size: 16px;
  color: #777a8b;
  margin-top: 8px;
  font-weight: 300;
  height: 20px;
}
.swiper-container-platform {
  width: 1058px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
}

@media (max-width: 1057px) {
  .swiper-container-platform {
    width: 100%;
  }
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
  width: 200px;
  border-radius: 12px;
  cursor: pointer;
  img {
    display: inline-block;
    width: 127px;
    height: 42px;
    transition: all 0.2s ease 50ms;
  }
}
.swiper-slide::before {
  content: '';
  background: rgba(0, 0, 0, 0.02);
  position: absolute;
  display: inline-block;
  top: 0;
  bottom: 0;
  border-radius: 12px;
  height: 88px;
  width: 200px;
}
.swiper-slide:hover::before {
  background: rgba(255, 255, 255, 0);
}
.btn-group {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  transition: bottom 0s ease 0s, opacity 0s ease 0s, all 0.2s ease 0s, all 0.2s ease 0s;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f6fc;
  border-radius: 0 0 12px 12px;
  .button {
    width: 100%;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button:hover {
    background: #0453f3;
    color: #ffffff;
  }
}
.swiper-button-prev,
.swiper-button-next {
  background: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.swiper-button-prev {
  margin-left: -20px;
}

.swiper-button-next {
  margin-right: -20px;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  content: '';
}
.swiper-button-next:after {
  content: '';
}
.swiper-button-prev:after {
  content: '';
}
</style>
