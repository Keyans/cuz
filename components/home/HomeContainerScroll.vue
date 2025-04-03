<template>
<section>
    <ClientOnly>
        <ContainerScroll>
        <template #title>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 mt-5">POD柔性定制</h2>
            <p class="text-gray-600 text-lg">全球POD柔性定制供应链平台，抢占电商AI创业新蓝海</p>
        </template>
        <template #card>
          <img
            src="/assets/web.png"
            class="mx-auto h-full rounded-2xl object-cover object-left-top"
            alt="hero"
          />
        </template>
      </ContainerScroll>
    </ClientOnly>
</section>
</template>
<script setup>
import { ContainerScroll } from "@/components/ui/container-scroll";

</script>