import axios from 'axios'

// 定义商品类型
interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  tag: string
}

// API响应类型
interface ApiResponse {
  code: number
  data: Product[] | null
  message: string
}

// 服务端API处理函数
export default defineEventHandler(async (event) => {
  try {
    // 获取请求查询参数
    const query = getQuery(event)
    
    // 在实际环境中应调用真实的后端API
    // const response = await axios.get('https://api-backend-url/saas-plugin-platform/pod/products/hot', {
    //   params: query
    // })
    
    // 模拟热门商品数据
    const mockHotProducts: Product[] = [
      {
        id: 1,
        name: '时尚棒球帽',
        description: '采用优质棉质面料，透气舒适，可调节帽围，适合各种场合佩戴，经典设计永不过时。',
        price: 89.00,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop',
        tag: '热销'
      },
      {
        id: 2,
        name: '运动休闲T恤',
        description: '采用优质面料，柔软亲肤，修身剪裁，多色可选，适合日常休闲和运动穿着。',
        price: 129.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
        tag: '热销'
      },
      {
        id: 3,
        name: '防晒渔夫帽',
        description: '大帽檐设计，有效防晒，可折叠便携，适合户外活动和度假旅行使用。',
        price: 69.00,
        image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400&h=300&fit=crop',
        tag: '热销'
      },
      {
        id: 4,
        name: '简约双肩包',
        description: '大容量设计，防水面料，多个收纳隔层，舒适背带，适合通勤和旅行使用。',
        price: 199.00,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop',
        tag: '热销'
      }
    ]
    
    // 返回处理后的数据
    const result: ApiResponse = {
      code: 200,
      data: mockHotProducts,
      message: 'success'
    }
    
    return result
  } catch (error: any) {
    console.error('Error fetching hot products:', error)
    
    // 返回错误信息
    const errorResponse: ApiResponse = {
      code: error.response?.status || 500,
      data: null,
      message: error.message || 'Failed to fetch hot products'
    }
    
    return errorResponse
  }
}) 