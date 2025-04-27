import axios from './axiosConfig'
import { H3Event } from 'h3'
import { getRequestHeaders } from './axiosConfig'

// 定义请求数据类型
interface RequestData {
  url: string
  params?: Record<string, any>
  data?: Record<string, any>
  headers?: Record<string, string>
  cache?: boolean // 是否启用缓存
  cacheTime?: number // 缓存时间(ms)
  retry?: number // 重试次数
  timeout?: number // 请求超时时间
}

// 返回数据类型
interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 简单的内存缓存实现
const cache = new Map<string, { data: any, timestamp: number }>()

// 生成缓存键
const getCacheKey = (url: string, params?: Record<string, any>) => {
  return `${url}:${params ? JSON.stringify(params) : ''}`
}

// 检查缓存是否有效
const isCacheValid = (key: string, cacheTime: number = 60000) => {
  if (!cache.has(key)) return false
  const cached = cache.get(key)!
  return Date.now() - cached.timestamp < cacheTime
}

/**
 * 请求重试函数
 * @param fn 请求函数
 * @param retries 重试次数
 * @param delay 重试延迟(ms)
 */
const retry = async <T>(fn: () => Promise<T>, retries: number, delay: number = 300): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) throw error
    await new Promise(resolve => setTimeout(resolve, delay))
    return retry(fn, retries - 1, delay * 1.5)
  }
}

/**
 * 通用请求封装
 * @param method 请求方法
 * @param event H3事件
 * @param config 请求配置
 */
const request = async <T = any>(
  method: 'get' | 'post' | 'put' | 'delete',
  event: H3Event,
  config: RequestData
): Promise<ApiResponse<T>> => {
  const { url, params, data, headers, cache: useCache = false, cacheTime = 60000, retry: retries = 0, timeout } = config
  const requestHeaders = { ...getRequestHeaders(event), ...headers }
  
  // 检查缓存（仅GET请求启用缓存）
  if (method === 'get' && useCache) {
    const cacheKey = getCacheKey(url, params)
    if (isCacheValid(cacheKey, cacheTime)) {
      const cached = cache.get(cacheKey)!
      return cached.data
    }
  }

  // 构建请求配置
  const requestConfig = {
    url,
    method,
    params,
    data,
    headers: requestHeaders,
    timeout: timeout || axios.defaults.timeout
  }

  // 打印请求信息
  console.log(`服务端HTTP ${method.toUpperCase()}请求:`, {
    url,
    params,
    headers: requestHeaders,
    cache: useCache ? '启用' : '禁用'
  })

  try {
    // 执行请求，可能带重试
    const execute = () => axios.request<any, ApiResponse<T>>(requestConfig)
    const response = retries > 0 ? await retry(execute, retries) : await execute()

    // 如果请求成功且需要缓存（仅GET请求）
    if (method === 'get' && useCache) {
      const cacheKey = getCacheKey(url, params)
      cache.set(cacheKey, { data: response, timestamp: Date.now() })
    }

    return response
  } catch (error: any) {
    // 统一处理错误
    console.error(`[Server API Error] ${method.toUpperCase()} ${url}: ${error.message}`)
    
    return {
      code: error.response?.status || 500,
      data: null as any,
      message: error.message || '服务端请求错误'
    }
  }
}

/**
 * GET请求
 * @param event H3事件
 * @param config 请求配置
 */
export const get = async <T = any>(event: H3Event, config: RequestData): Promise<ApiResponse<T>> => {
  return request<T>('get', event, config)
}

/**
 * POST请求
 * @param event H3事件
 * @param config 请求配置
 */
export const post = async <T = any>(event: H3Event, config: RequestData): Promise<ApiResponse<T>> => {
  return request<T>('post', event, config)
}

/**
 * PUT请求
 * @param event H3事件
 * @param config 请求配置
 */
export const put = async <T = any>(event: H3Event, config: RequestData): Promise<ApiResponse<T>> => {
  return request<T>('put', event, config)
}

/**
 * DELETE请求
 * @param event H3事件
 * @param config 请求配置
 */
export const del = async <T = any>(event: H3Event, config: RequestData): Promise<ApiResponse<T>> => {
  return request<T>('delete', event, config)
}

/**
 * 清除指定URL的缓存
 * @param url 请求URL
 * @param params 请求参数
 */
export const clearCache = (url: string, params?: Record<string, any>) => {
  const cacheKey = getCacheKey(url, params)
  cache.delete(cacheKey)
}

/**
 * 清除所有缓存
 */
export const clearAllCache = () => {
  cache.clear()
} 