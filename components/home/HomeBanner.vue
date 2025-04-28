<template>
      <section class="relative w-full h-screen">
        <ClientOnly>
    <AuroraBackground class="index-bg w-full h-screen" :disable-on-mobile="false">
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
        :in-view="{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }"
        :transition="{
          delay: isMobileDevice ? 0.1 : 0.3,
          duration: isMobileDevice ? 0.4 : 0.8,
          ease: 'easeInOut',
        }"
        class="relative w-full h-screen flex flex-col items-center pt-[200px] gap-4 px-4 z-20 hardware-accelerated"
      >
      <div class="font-extralight text-6xl dark:text-neutral-200 font-blod hardware-accelerated-3d">
            <BlurReveal
              :delay="isMobileDevice ? 0.1 : 0.2"
              :duration="0.75"
            >
              <div class="flex flex-col md:flex-row md:space-x-2">
                <span class="block mb-3 md:mb-0">一件起订</span>
                <span class="block">货通全球</span>
              </div>
            </BlurReveal>
      </div>
        <div class="flex flex-col md:flex-row h-64 text-3xl md:text-4xl items-center justify-center max-lg:w-full min-md:flex-1 gap-4 md:gap-1 hardware-accelerated">
          <TextGenerateEffect
            words="零 库 存 风 险 ，"
            class="block"
          />
          <TextGenerateEffect
            words="轻 松 开 启 电 商 事 业 ！"
            class="block"
          />
        </div>
      <div class="flex items-center hardware-accelerated">
        <NuxtLink to="/dashboard/sourcing">
          <ShimmerButton :disable-effects="false">
            <span>
              开始选品
            </span>
          </ShimmerButton>
        </NuxtLink>
        <a :href="config.public.MICRO_POD_URL">
          <InteractiveHoverButton @click="openDesigner" class="ml-10" text="免费设计" :disable-effects="false"/>
        </a>
      </div>
      </Motion>
    </AuroraBackground>
  </ClientOnly>
  </section>
</template>
<script setup>
import { Motion } from "motion-v";
import { BlurReveal } from '~/components/ui/blur-reveal';
import { AuroraBackground } from '~/components/ui/aurora-background';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import { InteractiveHoverButton } from '~/components/ui/interactive-hover-button';
import { ShimmerButton } from '~/components/ui/shimmer-button';
import { ref, onMounted, onUnmounted } from 'vue';

const config = useRuntimeConfig();
const isMobileDevice = ref(false);

onMounted(() => {
  // 检测是否为移动设备，但不影响3D效果
  isMobileDevice.value = window.innerWidth < 768;
  
  // 添加硬件加速相关CSS
  document.body.classList.add('hardware-acceleration-enabled');
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  // 移除事件监听
  window.removeEventListener('resize', handleResize);
  document.body.classList.remove('hardware-acceleration-enabled');
});

const handleResize = () => {
  isMobileDevice.value = window.innerWidth < 768;
};

const openDesigner = () => {
  window.open(config.public.MICRO_POD_URL, '_blank');
};
</script>
<style scoped>
.index-bg{
  width: 100%;
  height: 100%;
  position: relative;
}

/* 硬件加速相关样式 */
.hardware-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  will-change: transform;
}

.hardware-accelerated-3d {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  will-change: transform, opacity;
}
</style>