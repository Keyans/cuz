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
    // const response = await axios.get('https://api-backend-url/saas-plugin-platform/pod/products/new', {
    //   params: query
    // })
    
    // 模拟新品推荐数据
    const mockNewProducts: Product[] = [
      {
        id: 1,
        name: '潮流连帽卫衣',
        description: '采用高品质面料，保暖舒适，时尚版型，多色可选，适合秋冬季节穿着。',
        price: 199.00,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
        tag: '新品'
      },
      {
        id: 2,
        name: '复古鸭舌帽',
        description: '经典复古设计，优质棉质面料，精致刺绣，可调节帽围，百搭时尚。',
        price: 79.00,
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=300&fit=crop',
        tag: '新品'
      },
      {
        id: 3,
        name: '印花短袖T恤',
        description: '独特印花设计，优质棉料，舒适透气，修身版型，适合日常休闲穿着。',
        price: 99.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
        tag: '新品'
      },
      {
        id: 4,
        name: '创意手机壳',
        description: '采用环保材质，防摔防刮，完美贴合，多款图案可选，突显个性。',
        price: 49.00,
        image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=400&h=300&fit=crop',
        tag: '新品'
      }
    ]
    
    // 返回处理后的数据
    const result: ApiResponse = {
      code: 200,
      data: mockNewProducts,
      message: 'success'
    }
    
    return result
  } catch (error: any) {
    console.error('Error fetching new products:', error)
    
    // 返回错误信息
    const errorResponse: ApiResponse = {
      code: error.response?.status || 500,
      data: null,
      message: error.message || 'Failed to fetch new products'
    }
    
    return errorResponse
  }
}) 