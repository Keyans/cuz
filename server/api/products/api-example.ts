import { get, post } from '../../utils/http'

// 定义商品类型接口
interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

// 服务端API处理函数
export default defineEventHandler(async (event) => {
  try {
    // 1. 直接从客户端请求中获取授权信息
    // server/utils/http.ts 会自动从event中提取authorization头
    // 不需要手动获取和传递token，这是server/utils/axiosConfig.ts中getRequestHeaders函数的作用
    
    // 2. 使用我们的服务端http工具发送请求
    const response = await get(event, {
      url: '/api/products/list', // 目标后端API地址
      params: {
        page: 1,
        size: 10
      }
    })
    
    // 3. 返回处理后的结果
    if (response.code === 200) {
      return response
    } else {
      // 处理错误响应
      throw new Error(response.message || '请求失败')
    }
  } catch (error: any) {
    // 统一错误处理
    console.error('API请求失败:', error.message)
    
    return {
      code: error.response?.status || 500,
      data: null,
      message: error.message || '服务器内部错误'
    }
  }
}) 