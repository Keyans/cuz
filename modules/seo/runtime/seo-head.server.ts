/**
 * 自定义SEO头部服务端组件
 *
 * 这个文件在服务器端运行，为每个页面添加SEO相关的元数据
 */

import { useHead, useRoute } from '#app'

// 为每个页面定义的默认SEO设置
const defaultSeoConfig = {
  title: 'Printify Clone - 按需定制产品平台',
  description: '创建和销售自定义产品，无需库存。按需印刷，全球配送。',
  keywords: 'printify, 按需印刷, 定制产品, T恤, 帽衫, 马克杯, 无库存业务',
  ogImage: '/assets/og-image.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
}

// 每个路由的特定SEO设置
const routeSpecificSeo = {
  '/': {
    title: 'Printify Clone - 创建和销售自定义产品',
    description: '使用Printify在没有库存的情况下创建和销售您自己的定制产品。按需印刷，全球配送。',
    keywords: 'printify, 按需印刷, 定制T恤, 定制产品, 电商创业, 无库存销售',
    ogImage: '/assets/og-home.jpg',
  },
  '/products': {
    title: 'Printify产品目录 - 定制T恤、帽衫、马克杯等',
    description: '浏览我们的产品目录，包括T恤、帽衫、马克杯等。找到适合您品牌的完美产品。',
    keywords: 'printify产品, 定制T恤, 定制帽衫, 马克杯印刷, 按需服务',
    ogImage: '/assets/og-products.jpg',
  },
  '/login': {
    title: 'Printify - 登录到您的账户',
    noIndex: true, // 不要为登录页面编入索引
  },
  '/register': {
    title: 'Printify - 注册新账户',
    noIndex: true, // 不要为注册页面编入索引
  },
  '/dashboard': {
    title: 'Printify - 仪表板',
    noIndex: true, // 不要为仪表板页面编入索引
  },
}

// 添加通用的结构化数据
const generateStructuredData = (route: string) => {
  const baseUrl = 'https://your-domain.com'
  const siteName = 'Printify Clone'

  // 网站结构化数据
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  // 组织结构化数据
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/assets/logo.svg`,
    sameAs: [
      'https://facebook.com/your-page',
      'https://twitter.com/your-handle',
      'https://instagram.com/your-profile',
    ]
  }

  // 为产品页面添加特定的结构化数据
  if (route.startsWith('/products/')) {
    return [
      websiteSchema,
      organizationSchema,
      // 在实际应用中，这里可以动态生成产品结构化数据
    ]
  }

  // 默认返回网站和组织结构化数据
  return [websiteSchema, organizationSchema]
}

export default defineNuxtPlugin(() => {
  const route = useRoute()

  // 获取当前路由的特定SEO设置
  const currentRoutePath = route.path
  const routeSeo = Object.keys(routeSpecificSeo).find(path =>
    currentRoutePath === path ||
    (path.endsWith('/**') && currentRoutePath.startsWith(path.replace('/**', '')))
  )

  // 合并默认设置和路由特定设置
  const seoConfig = {
    ...defaultSeoConfig,
    ...(routeSeo ? routeSpecificSeo[routeSeo] : {})
  }

  // 为页面添加SEO元数据
  useHead({
    title: seoConfig.title,
    meta: [
      { name: 'description', content: seoConfig.description },
      { name: 'keywords', content: seoConfig.keywords },

      // Open Graph 元数据
      { property: 'og:title', content: seoConfig.title },
      { property: 'og:description', content: seoConfig.description },
      { property: 'og:image', content: seoConfig.ogImage },
      { property: 'og:type', content: seoConfig.ogType },
      { property: 'og:url', content: `https://your-domain.com${currentRoutePath}` },

      // Twitter 卡片元数据
      { name: 'twitter:card', content: seoConfig.twitterCard },
      { name: 'twitter:title', content: seoConfig.title },
      { name: 'twitter:description', content: seoConfig.description },
      { name: 'twitter:image', content: seoConfig.ogImage },

      // 如果设置了noIndex，添加noindex,nofollow指令
      ...(seoConfig.noIndex ? [
        { name: 'robots', content: 'noindex, nofollow' }
      ] : [])
    ],
    link: [
      { rel: 'canonical', href: `https://your-domain.com${currentRoutePath}` }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(generateStructuredData(currentRoutePath))
      }
    ]
  })
})
