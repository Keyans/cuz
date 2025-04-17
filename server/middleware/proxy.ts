// server/middleware/proxy.ts
import { defineEventHandler, proxyRequest, getRequestURL } from 'h3'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  // 匹配 /saas-aimall- 开头的请求路径
  if (url.pathname.startsWith('/saas-aimall-')) {
    const target = 'http://10.233.90.164:9999'
    console.log('target', target)
    // 转发请求并保留完整路径
    return proxyRequest(event, `${target}${url.pathname}`)
  }
})
