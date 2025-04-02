// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 开发工具
  devtools: { enabled: false },

  // 配置SSR（服务端渲染），以确保SEO友好
  ssr: true,
  // Nitro引擎配置 - 混合渲染策略
  nitro: {
    // 针对需要动态内容的页面使用服务器端渲染
    preset: process.env.NODE_ENV === 'production' ? 'netlify' : 'node-server',

    // 静态资源优化
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },

    // 最小化输出
    minify: true,

    // 完全禁用自动预渲染，避免构建时的500错误
    prerender: {
      crawlLinks: false,
      routes: [
        '/login',
        '/register',
      ],
      ignore: [
        '/',  // 显式忽略首页预渲染
      ]
    },

    // 为SSR请求设置缓存策略
    storage: {
      'redis': {
        driver: 'memory',
        ttl: 60 * 10 // 10分钟缓存
      }
    },

    // 提高SEO性能的缓存策略
    routeRules: {
      '/**': { swr: 600 } // 默认使用SWR缓存600秒
    }
  },

  app: {
    head: {
      title: 'Printify Clone',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Printify - 创建和销售自定义产品，无需库存' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#afe468' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'Printify - 按需定制产品平台' },
        { property: 'og:description', content: '创建和销售自定义产品，无需库存' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Printify - 按需定制产品平台' },
        { name: 'twitter:description', content: '创建和销售自定义产品，无需库存' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'manifest', href: '/manifest.json' }
      ],
      script: [
        // 结构化数据，提高SEO效果
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Printify Clone',
            url: 'https://your-domain.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://your-domain.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    // 防止hydration不匹配
    rootId: 'app'
  },

  // 配置模块
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image', // 添加图像处理模块
    './modules/seo', // 添加自定义SEO模块
  ],

  // Pinia 配置
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },

  // 路由规则 - 配置哪些页面使用 SSG，哪些使用 SSR
  routeRules: {
    // 主页使用 SSR 而不是预渲染，避免构建时的500错误
    '/': { ssr: true, swr: 600 }, // 使用SSR并缓存10分钟
    // 静态页面使用 SSG（静态站点生成）
    '/login': { prerender: true },
    '/register': { prerender: true },
    // 产品页面使用 SSR（服务器端渲染）带缓存
    '/products': { swr: 600 }, // 10分钟缓存
    '/products/**': { swr: 300 }, // 5分钟缓存
    // 仪表板页面使用 SSR 但不缓存（动态内容）
    '/dashboard/**': { ssr: true, cache: false },
  },

  // Tailwind CSS 配置
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
  },

  // 性能优化
  experimental: {
    componentIslands: true,
    payloadExtraction: true,
    renderJsonPayloads: true,
    crossOriginPrefetch: true,  // 添加跨域预取
    viewTransition: true,       // 添加视图过渡支持
  },

  // 资源压缩
  build: {
    transpile: ['vue','estree-walker','entities'],
    extractCSS: true,
    optimizeCSS: true,
  },

  // 图像优化
  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpg', 'png'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    domains: ['your-domain.com'],
    presets: {
      product: {
        modifiers: {
          format: 'webp',
          quality: 80,
          width: 500,
          height: 500
        }
      },
      thumbnail: {
        modifiers: {
          format: 'webp',
          quality: 60,
          width: 200,
          height: 200
        }
      }
    }
  },

  // SEO设置
  robots: {
    UserAgent: '*',
    Allow: '/',
    Disallow: ['/dashboard', '/api', '/login', '/register'],
    Sitemap: 'https://your-domain.com/sitemap.xml'
  },

  // Sitemap设置
  sitemap: {
    hostname: 'https://your-domain.com',
    gzip: true,
    exclude: ['/dashboard/**', '/login', '/register'],
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date()
    }
  },

  // 为了确保SEO抓取，我们需要使用正确的HTTP头
  render: {
    http2: {
      push: true
    },
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7天缓存静态资源
    }
  },

  // 公共运行时配置，可用于SEO设置等
  runtimeConfig: {
    public: {
      siteUrl: 'https://your-domain.com',
      siteName: 'Printify Clone',
      siteDescription: 'Printify - 按需定制产品平台',
      language: 'zh-CN',
    }
  },

  compatibilityDate: '2025-03-24'
})