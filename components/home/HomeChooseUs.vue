<template>
    <section class="bg-white py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center mb-12 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">为什么选择我们</h2>
        <p class="text-gray-600 text-lg">全球POD柔性定制供应链平台，抢占电商AI创业新蓝海</p>
      </div>
      <ClientOnly>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-4">
        <!-- 卡片容器 -->
        <div v-for="(card, index) in [
          { title: '零成本创业', desc: '全球POD柔性定制供应链平台，抢占电商AI创业新蓝海', img: 'https://img-xhpfm.xinhuaxmt.com/News/202309/XxjpsgC007279_20230921_CBMFN0A013.jpg?x-oss-process=image/resize,w_600/auto-orient,1/quality,Q_80', alt: '零成本创业', action: '无需囤货压货' },
          { title: '极简操作流程', desc: '一键设计，一键上架，一键发货，让创业变得更简单', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop', alt: '极简操作流程', action: '一键设计' },
          { title: '海外仓覆盖全美', desc: '海外仓覆盖全美各地，快速配送服务，助力业务增长', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop', alt: '海外仓覆盖全美', action: '快速配送' }
        ]" :key="index" class="flex">
          <CardContainer class="w-full">
            <CardBody class="group/card relative w-full h-full rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
              <CardItem :translate-z="50" class="text-xl font-bold text-neutral-600 dark:text-white text-center w-full">
                <h3>{{ card.title }}</h3>
              </CardItem>
              <CardItem as="p" :translate-z="60" class="mt-2 text-sm text-neutral-500 dark:text-neutral-300 text-center w-full whitespace-nowrap overflow-hidden text-overflow-ellipsis">
                {{ card.desc }}
              </CardItem>
              <CardItem :translate-z="100" class="mt-4 w-full">
                <div class="overflow-hidden rounded-xl">
                  <img :src="card.img" :alt="card.alt" class="w-full h-60 object-cover group-hover/card:shadow-xl transition-transform duration-300 hover:scale-110">
                </div>
                <div class="mt-8 flex flex-col space-y-4">
                  <CardItem :translate-z="20" as="button" class="w-full rounded-xl px-4 py-2 text-sm font-normal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    {{ card.action }} →
                  </CardItem>
                  <CardItem :translate-z="20" as="button" class="w-full rounded-xl bg-black px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                    立即开始
                  </CardItem>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </ClientOnly>
    </div>
  </section>
</template>
<script setup>
import { CardContainer, CardBody, CardItem } from "~/components/ui/card-3d";

</script>