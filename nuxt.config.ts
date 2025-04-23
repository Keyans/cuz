// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // TypeScript配置
  typescript: {
    strict: false,
    typeCheck: false,
    shim: false,
  },

  // 开发工具
  devtools: { enabled: false },

  // 配置SSR（服务端渲染），以确保SEO友好
  ssr: true,
  // Nitro引擎配置 - 混合渲染策略
  nitro: {
    // 针对需要动态内容的页面使用服务器端渲染
    // preset: process.env.NODE_ENV === "production" ? "vercel" : "node-server",
    preset: "node-server",

    // 静态资源优化
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },

    // 最小化输出
    minify: true,

    // 完全禁用自动预渲染，避免构建时的500错误
    prerender: {
      crawlLinks: false,
      routes: [],
      ignore: ["/"],
    },

    // 为SSR请求设置缓存策略
    storage: {
      redis: {
        driver: "memory",
        ttl: 60 * 10, // 10分钟缓存
      },
    },

    // 提高SEO性能的缓存策略
    routeRules: {
      "/**": { swr: 600 }, // 默认使用SWR缓存600秒
    },
    externals: {
      external: ["qrcode"], // 💥 告诉 Nitro 不要打包 qrcode
    },
  },

  vite: {
    base: "/",
    server: {
      proxy: proxy(),
    },
    assetsInclude: ["**/*.json"],
    json: {
      stringify: true,
      namedExports: true,
    },
    ssr: {
      noExternal: ["qrcode"], // ⛔️ 防止它被 SSR bundle 编译（不转为 ESM）
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        maxParallelFileOps: 3,
      },
    },
  },

  app: {
    head: {
      title: "cuzcuz",
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "cuzcuz - 创建和销售自定义产品，无需库存",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#afe468" },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "cuzcuz - 按需定制产品平台" },
        {
          property: "og:description",
          content: "创建和销售自定义产品，无需库存",
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "zh_CN" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "cuzcuz - 按需定制产品平台" },
        {
          name: "twitter:description",
          content: "创建和销售自定义产品，无需库存",
        },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/assets/favicon.png" },
        { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        { rel: "manifest", href: "/manifest.json" },
      ],
      script: [
        // 结构化数据，提高SEO效果
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "cuzcuz",
            url: "https://cuzcuz.cn",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://your-domain.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    // 防止hydration不匹配
    rootId: "app",
  },

  // 配置模块
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "motion-v/nuxt",
    "@nuxt/image", // 添加图像处理模块
    "./modules/seo", // 添加自定义SEO模块
    "@element-plus/nuxt",
  ],

  // 路由规则 - 配置哪些页面使用 SSG，哪些使用 SSR
  routeRules: {
    // 主页使用 SSR 而不是预渲染，避免构建时的500错误
    "/": { ssr: true, swr: process.dev ? false : 600 }, // 使用SSR并缓存10分钟
    // 静态页面使用 SSG（静态站点生成）
    "/login": { ssr: true },
    "/register": { ssr: true },
    // 产品页面使用 SSR（服务器端渲染）带缓存
    "/products/**": { swr: 300 }, // 5分钟缓存
    // 选品列表页面不需要登录验证
    "/dashboard/sourcing/list": { ssr: true, middleware: false },
    // 仪表板页面使用 SSR 但不缓存（动态内容）
    "/dashboard/**": { ssr: true, swr: 600 },
  },

  // Tailwind CSS 配置
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.ts",
  },

  // 性能优化
  experimental: {
    componentIslands: true,
    payloadExtraction: true,
    renderJsonPayloads: true,
    crossOriginPrefetch: true, // 添加跨域预取
    viewTransition: true, // 添加视图过渡支持
  },

  // 资源压缩
  build: {
    transpile: ["vue", "estree-walker", "entities"],
  },

  // 图像优化
  image: {
    quality: 80,
    format: ["webp", "avif", "jpg", "png"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    domains: ["your-domain.com"],
    presets: {
      product: {
        modifiers: {
          format: "webp",
          quality: 80,
          width: 500,
          height: 500,
        },
      },
      thumbnail: {
        modifiers: {
          format: "webp",
          quality: 60,
          width: 200,
          height: 200,
        },
      },
    },
  },

  // SEO设置
  // robots配置已移动到模块中
  //robots: {
  //  UserAgent: "*",
  //  Allow: "/",
  //  Disallow: ["/dashboard", "/api", "/login", "/register"],
  //  Sitemap: "https://your-domain.com/sitemap.xml",
  //},

  // Sitemap设置
  // sitemap配置已移动到模块中
  //sitemap: {
  //  hostname: "https://your-domain.com",
  //  gzip: true,
  //  exclude: ["/dashboard/**"],
  //  routes: [
  //    "/",
  //    "/products",
  //    "/about",
  //    "/contact",
  //  ],
  //},

  // 为了确保SEO抓取，我们需要使用正确的HTTP头
  // 这部分配置已移动到nitro配置中
  //render: {
  //  csp: {
  //    hashAlgorithm: "sha256",
  //    policies: {
  //      "default-src": ["'self'"],
  //      "script-src": ["'self'", "'unsafe-inline'", "*.google-analytics.com"],
  //      "style-src": ["'self'", "'unsafe-inline'"],
  //      "img-src": ["'self'", "data:", "*.googleapis.com", "*.gstatic.com"],
  //      "font-src": ["'self'", "https:", "data:"],
  //      "frame-src": ["'self'", "*.google.com", "*.youtube.com"],
  //    },
  //  },
  //},

  // 公共运行时配置，可用于SEO设置等
  runtimeConfig: {
    public: {
      siteUrl: "https://cuzcuz.cn",
      siteName: "cuzcuz",
      siteDescription: "cuzcuz - 按需定制产品平台",
      language: "zh-CN",

      MICRO_POD_URL: process.env.MICRO_POD_URL,
      GALLERY_URL: process.env.GALLERY_URL,
      CLIENT_TYPE: process.env.CLIENT_TYPE,

      BACKEND_API: process.env.BACKEND_API,
    },
  },

  compatibilityDate: "2025-03-24",
});

function proxy() {
  let targetTest = "https://seller.riin.com";
  let devTarget = "http://192.168.1.151:30984"; //dev 环境

  let uaaTargetLocal = "http://10.233.90.164:9999";
  let targetLocal = "http://10.120.22.174:9999"; //hzh本地
  let targetLocal2 = "http://10.120.23.102:9210"; //lxl本地
  let targetLocal3 = 'http://10.120.20.59:8415' //syx本地
  return {
    "/dev/saas-aimall-finance": {
      target: devTarget,
      ws: false,
      changeOrigin: true,
      secure: false, //证书免校验
      rewrite: (path: string) => path.replace(/^\/dev/, ""),
    },
    // "/dev/saas-aimall-payment": {
    //   target: targetLocal2,
    //   ws: false,
    //   changeOrigin: true,
    //   secure: false, //证书免校验
    //   rewrite: (path: string) =>
    //     path.replace(/^\/dev\/saas-aimall-payment/, ""),
    // },
    // "/dev/saas-aimall-uaa": {
    //   target: targetTest,
    //   ws: false,
    //   changeOrigin: true,
    //   secure: false, //证书免校验
    //   rewrite: (path: string) => path.replace(/^\/dev/, ""),
    // },
    "/dev": {
      target: devTarget,
      ws: false,
      changeOrigin: true,
      secure: false, //证书免校验
      rewrite: (path: string) => path.replace(/^\/dev/, ""),
    },
    // '/dev': {
    //     target: 'http://localhost:7003',
    //     ws: false,
    //     changeOrigin: true,
    //     secure: false, //证书免校验
    //     rewrite: (path) => path.replace(/^\/dev/, ''),
    //     configure: (proxy, options) => {
    //         proxy.on('proxyReq', (proxyReq) => {
    //             proxyReq.setHeader('Host', 'aimall-test-supplier.riin.com') // 后端IP+端口或域名，不要设置http://
    //         })
    //     },
    // },
  };
}
