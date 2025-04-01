<template>
      <section class="relative w-full h-screen">
    <AuroraBackground class="index-bg w-full h-screen">
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
        :in-view="{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }"
        :transition="{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }"
        class="relative w-full h-screen flex flex-col items-center pt-[150px] gap-4 px-4 z-20"
      >
      <div class="py-4 font-extralight text-7xl dark:text-neutral-200">
        <ClientOnly>
            <BlurReveal
              :delay="0.2"
              :duration="0.75"
            >
              一件起订 货通全球
            </BlurReveal>
        </ClientOnly>
      </div>
      <ClientOnly>
        <div class="flex h-64 text-4xl items-center justify-center max-lg:w-full min-md:flex-1">
          <TextGenerateEffect
            words="零 库 存 风 险 ，轻 松 开 启 电 商 事 业 ！"
          />
        </div>
      </ClientOnly>
      <div class="flex items-center">
        <ShimmerButton>
          <span>
            开始选品
          </span>
        </ShimmerButton>
        <InteractiveHoverButton class="ml-10" text="免费设计"/>
      </div>
      </Motion>
    </AuroraBackground>
  </section>
</template>
<script setup>
import { Motion } from "motion-v";
import { BlurReveal } from '~/components/ui/blur-reveal';
import { AuroraBackground } from '~/components/ui/aurora-background';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import { InteractiveHoverButton } from '~/components/ui/interactive-hover-button';
import { ShimmerButton } from '~/components/ui/shimmer-button';

</script>
<style scoped>
.index-bg{
  width: 100%;
  height: 100%;
  position: relative;
}
</style>