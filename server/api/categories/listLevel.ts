import { get } from '~/server/utils/http'

// 定义分类类型，确保与前端接口匹配
interface Category {
  id: number | string
  name: string
  level: number
  parentId?: string
  image: string // 确保有image字段
}

// 对于分页数据的统一接口
interface PageData<T> {
  records: T[]
  total: number
  size: number
  current: number
}

// API返回格式接口
interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 处理函数
export default defineEventHandler(async (event) => {
  try {
    // 获取查询参数
    const query = getQuery(event)
    const level = query.level || 'LEVEL_1' // 默认level参数
    
    console.log(`[类目API] 请求参数:`, query)
    
    // 调用后端API，启用缓存（5分钟）并最多重试2次
    const apiResponse = await get<PageData<Category>>(event, {
      url: 'saas-plugin-platform/pod/platform/category/list/level',
      params: query,
      cache: true,
      cacheTime: 300000, // 5分钟缓存
      retry: 2
    })
    
    // 如果API请求成功并且有数据
    if (apiResponse && apiResponse.code === 200 && apiResponse.data?.records?.length > 0) {
      console.log(`[类目API] 成功获取真实数据，共${apiResponse.data.records.length}条记录`)
      
      // 直接返回统一格式的响应数据
      return {
        code: 200,
        data: {
          records: apiResponse.data.records,
          total: apiResponse.data.total || apiResponse.data.records.length,
          size: apiResponse.data.size || 20,
          current: apiResponse.data.current || 1
        },
        message: '获取成功'
      }
    }
    
    // 如果API请求失败或无数据，使用模拟数据
    console.log(`[类目API] 使用模拟数据，level=${level}`)
    
    // 准备模拟数据
    const mockCategories = getMockCategories(level)
    
    // 返回统一格式的模拟数据
    return {
      code: 200,
      data: {
        records: mockCategories,
        total: mockCategories.length,
        size: 20,
        current: 1
      },
      message: '模拟数据'
    }
  } catch (error: any) {
    console.error('[类目API] 错误:', error)
    
    // 错误情况下返回空数据但保持相同格式
    return {
      code: error.response?.status || 500,
      data: {
        records: [],
        total: 0,
        size: 20,
        current: 1
      },
      message: error.message || '获取分类数据失败'
    }
  }
})

/**
 * 根据level获取模拟数据
 * @param level 类目级别
 */
function getMockCategories(level: string | string[] | number | true | any): Category[] {
  // 将任何level参数转换为字符串类型
  const levelStr = String(level || 'LEVEL_1')
  console.log(`[模拟数据] 生成level=${levelStr}的数据`)
  
  // 默认返回统一结构的模拟数据
  return [
    {
      id: "191315345257911588",
      name: '女装',
      level: 3,
      parentId: "0",
      image: '/assets/catalog/Women.png'
    },
    {
      id: "191365390293913600",
      name: '男装',
      level: 3,
      parentId: "0",
      image: '/assets/catalog/Men.png'
    },
    {
      id: "191452898228374528",
      name: '童装',
      level: 3,
      parentId: "191365390293913600",
      image: '/assets/catalog/Children_Wear.png'
    },
    {
      id: "191456280679760144",
      name: '高端休闲装',
      level: 3,
      parentId: "0",
      image: '/assets/catalog/Hoodie.png'
    },
    {
      id: "191457174587351449",
      name: '高端加勒比装',
      level: 3,
      parentId: "0",
      image: '/assets/catalog/Hat.png'
    },
    {
      id: "191457264426756384",
      name: '衫',
      level: 3,
      parentId: "191457174587351449",
      image: '/assets/catalog/Hoodies.png'
    },
    {
      id: "191457464883519876",
      name: '高端加勒比7G',
      level: 3,
      parentId: "191457174587351449",
      image: '/assets/catalog/Jewelry.png'
    },
    {
      id: "191458405733534000",
      name: '面膜套',
      level: 3,
      parentId: "0",
      image: '/assets/catalog/Phone_Cases.png'
    },
    {
      id: "191465712354445888",
      name: '男裤',
      level: 3,
      parentId: "0",
      image: '/assets/catalog/Backpack.png'
    }
  ];
} 