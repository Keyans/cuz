<template>
  <!-- 仅用于SEO的组件，无需渲染内容 -->
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: 'Create and sell custom products with print-on-demand'
  },
  keywords: {
    type: String,
    default: 'printify, print-on-demand, custom products, merchandise'
  },
  ogImage: {
    type: String,
    default: '/assets/og-image.jpg'
  },
  ogType: {
    type: String,
    default: 'website'
  },
  twitterCard: {
    type: String,
    default: 'summary_large_image'
  },
  canonicalUrl: {
    type: String,
    default: ''
  }
})

// 使用Nuxt的useSeoMeta和useServerSeoMeta来设置SEO元数据
useSeoMeta({
  title: props.title || 'Printify Clone',
  ogTitle: props.title || 'Printify Clone',
  description: props.description,
  ogDescription: props.description,
  ogImage: props.ogImage,
  ogType: props.ogType,
  twitterCard: props.twitterCard,
  keywords: props.keywords
})

// 使用useHead设置规范URL和其他头部标签
useHead({
  link: [
    props.canonicalUrl ? {
      rel: 'canonical',
      href: `https://your-domain.com${props.canonicalUrl || useRoute().path}`
    } : null
  ].filter(Boolean)
})

// 添加结构化数据
const jsonLd = computed(() => {
  // 基本的结构化数据
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: props.title || 'Printify Clone',
    description: props.description,
    url: `https://your-domain.com${props.canonicalUrl || useRoute().path}`
  }
})

// 使用useHead添加结构化数据
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd.value)
    }
  ]
})
</script>
