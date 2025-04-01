<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
/*
 *variable
 */
const data = reactive({
  type: 1, //,模板1：上名下量，模板2： 上量下名
  list: [
    { name: '累计交付订单', value: 100000000, unit: '件+' },
    { name: '智能中央工厂', value: 600000, unit: 'm²' },
    { name: '设备投入', value: 100000000, unit: '元+' },
    { name: '设备投入', value: 100000000, unit: '元+' },
    { name: '设备投入', value: 100000000, unit: '元+' },
  ],
})

/*
 *lifeCircle
 */
/*
 *function
 */
const useNumberAnimation = (
  form: number,
  to: number,
  duration: number,
  onProgress?: (v: number) => void,
) => {
  let value: number = form
  const speed = (to - form) / duration
  const startTime = Date.now()
  const run = () => {
    const t = Date.now() - startTime
    if (t > duration) {
      value = to
      onProgress?.(value)
      return
    }
    value = form + speed * t
    onProgress?.(value)
    requestAnimationFrame(run)
  }
  run()
}
const infoBlock = ref(null)
let observer = null
const setAnimation = (entries: any) => {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      // 动画逻辑
      data.list.forEach((item) => {
        useNumberAnimation(0, item.value, 1000, (v) => {
          item.value = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        })
      })
      observer.unobserve(entry.target) // 确保动画只触发一次
    }
  })
}
onMounted(() => {
  if (infoBlock.value) {
    observer = new IntersectionObserver(setAnimation, {
      root: null, // 视口作为根元素
      rootMargin: '0px',
      threshold: 0.1, // 当元素10%可见时触发
    })
    observer.observe(infoBlock.value)
  }
})
</script>

<template>
  <div class="statistical-data">
    <div class="info-block" ref="infoBlock">
      <img
        src="https://www.hicustom.com/static/frontend/images/indexNew/home/img_long_left_bg.png"
        alt=""
        class="info-left-bg"
      />
      <img
        src="https://www.hicustom.com/static/frontend/images/indexNew/home/img_long_right_bg.png"
        alt=""
        class="info-right-bg"
      />
      <div class="info-content">
        <div v-for="item in data.list" class="info-item">
          <div v-if="data.type === 1">
            <div class="info-title">
              <div class="info-num">
                {{ item.value }}
              </div>
              <div class="info-unit">{{ item.unit }}</div>
            </div>
            <div class="info-desc">{{ item.name }}</div>
          </div>
          <div v-else>
            <div class="info-desc">{{ item.name }}</div>
            <div class="info-title">
              <div class="info-num">
                {{ item.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
              </div>
              <div class="info-unit">{{ item.unit }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistical-data {
  width: 100%;
  height: 165px;
  background: #0453f3;
  overflow: hidden;
}
.info-block {
  max-width: 1200px;
  height: 165px;
  margin: 0 auto;
  position: relative;
}
.info-left-bg,
.info-right-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 165px;
  width: auto;
}
.info-left-bg {
  left: -400px;
}
.info-right-bg {
  right: -400px;
}
.info-content {
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}
.info-item {
  text-align: center;
}
.info-title {
  display: flex;
  flex-direction: row;
}
.info-num {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}
.info-unit {
  font-size: 14px;
  color: #ffffff;
  transform: translateY(-4px);
  margin-left: 4px;
}
.info-desc {
  font-size: 14px;
  color: #ffffff;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
