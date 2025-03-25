import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'seo-module',
    configKey: 'seo',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // 添加服务器端SEO插件
    addPlugin({
      src: resolver.resolve('./runtime/seo-head.server'),
      mode: 'server'
    })

    // 这里可以添加其他SEO相关的设置
    nuxt.hook('nitro:config', (nitroConfig) => {
      // 启用压缩
      nitroConfig.compressPublicAssets = {
        gzip: true,
        brotli: true
      }

      // 确保预渲染配置正确
      if (!nitroConfig.prerender) {
        nitroConfig.prerender = {
          crawlLinks: true,
          routes: [
            '/',
            '/login',
            '/register',
            '/products',
            '/pricing',
            '/help'
          ]
        }
      }
    })
  }
})
