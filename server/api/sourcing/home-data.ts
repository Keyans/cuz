import { get, post } from '~/server/utils/http'
import { H3Event, getQuery } from 'h3'
import { createProductMockData } from '../products/mockData'
import { createCategoryMockData } from '../categories/mockData'


// API响应类型
interface ApiResponse {
  code: number
  data: any
  message: string
}

// 服务端API处理函数 - 一次获取所有首页数据
export default defineEventHandler(async (event) => {
  try {
    console.log('正在获取首页数据...')
    
    // 获取查询参数
    const query = getQuery(event)
    const categoryLevel = query.level || 'LEVEL_3'
    const categorySize = parseInt(query.categorySize as string) || 20
    const productSize = parseInt(query.productSize as string) || 4
    
    // 1. 获取类目数据
    const categoriesResponse = await getCategoriesData(event, {
      level: categoryLevel as string,
      size: categorySize,
      current: parseInt(query.current as string) || 1,
      queryenable: query.queryenable !== 'false'
    })
    
    // 2. 获取热门商品数据 
    const hotProductsResponse = await getProductsData(event, 'HOT_PRODUCT', {
      size: productSize,
      current: parseInt(query.current as string) || 1
    })
    // 组合结果
    const result: ApiResponse = {
      code: 200,
      data: {
        categories: categoriesResponse.data?.records || [],
        hotProducts: hotProductsResponse.data?.records || [],
      },
      message: 'success'
    }
    return result
  } catch (error: any) {
    console.error('获取首页数据失败:', error)
    // 返回错误信息
    return {
      code: error.response?.status || 500,
      data: null,
      message: error.message || '获取首页数据失败'
    }
  }
})

// 辅助函数 - 获取类目数据
async function getCategoriesData(event: H3Event, options: {
  level: string,
  current: number,
  size: number,
  queryenable: boolean
} = {
  level: 'LEVEL_3',
  current: 1,
  size: 20,
  queryenable: true
}) {
  try {
    // 使用server/utils/http中的get方法，传递event和配置对象
    return await get(event, {
      url: '/saas-plugin-platform/pod/platform/category/list/level',
      params: {
        level: options.level,
        current: options.current,
        size: options.size,
        queryenable: options.queryenable
      },
      cache: true, // 启用缓存
      cacheTime: 5 * 60 * 1000 // 缓存5分钟
    })
  } catch (error: any) {
    console.error('获取类目数据失败:', error)
    
    // 如果API调用失败，使用模拟数据
    const mockData = {
      code: 200,
      message: 'success',
      data: createCategoryMockData(options.level)
    }
    
    return mockData
  }
}

// 辅助函数 - 获取商品数据
async function getProductsData(event: H3Event, queryStrategy: string, options: {
  current: number,
  size: number
} = {
  current: 1,
  size: 4
}) {
  try {
    // 使用server/utils/http中的post方法，传递event和配置对象
    return await post(event, {
      url: '/saas-aimall-goods/pod/mall/product/list',
      data: {
        current: options.current,
        size: options.size,
        queryStrategy
      },
      cache: queryStrategy === 'HOT_PRODUCT', // 热门商品可以缓存，新品不缓存
      cacheTime: 5 * 60 * 1000 // 缓存5分钟
    })
  } catch (error: any) {
    console.error(`获取${queryStrategy}商品数据失败:`, error)
    
    // 如果API调用失败，使用模拟数据
    const mockData = {
      code: 200,
      message: 'success',
      data: createProductMockData(queryStrategy)
    }
    
    return mockData
  }
} 