import axios from 'axios'
import { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

// 获取运行时配置
const config = useRuntimeConfig()

// 创建axios实例
const instance = axios.create({
  baseURL: config.public.BACKEND_API || 'http://10.233.90.164:9999',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 这里可以添加统一的请求头、token等
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做处理
    const res = response.data
    
    // 根据API的返回结构处理
    if (res.code && res.code !== 200) {
      console.error(`[API Error] ${res.message || 'Unknown error'}`)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.error(`[HTTP Error] ${error.message}`)
    return Promise.reject(error)
  }
)

// 获取服务端API请求的Headers
export const getRequestHeaders = (event: H3Event) => {
  // 传递客户端的cookie和授权信息到服务端请求
  const headers: Record<string, string> = {}
  
  // 获取请求中的Cookie
  const cookie = getRequestHeader(event, 'cookie')
  if (cookie) {
    headers.cookie = cookie
  }
  
  // 获取请求中的Authorization
  const authorization = getRequestHeader(event, 'authorization')
  if (authorization) {
    headers.authorization = authorization
  }
  
  return headers
}

export default instance 