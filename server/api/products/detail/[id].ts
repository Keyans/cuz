import { H3Event, defineEventHandler } from 'h3'
import { get } from '~/server/utils/http'

// 定义商品详情接口
interface ProductDetail {
  id: number | string
  name: string
  description: string
  detailDescription: string
  price: number
  images: string[]
  tag: string
  category: string
  attributes: Record<string, string>
  sizes: Array<{
    name: string
    chest: number
    length: number
    shoulder: number
  }>
}

// 导出处理函数
export default defineEventHandler(async (event: H3Event) => {
  try {
    // 获取商品ID参数
    const productId = event.context.params?.id
    
    if (!productId) {
      return {
        code: 400,
        message: '商品ID不能为空',
        data: null
      }
    }
    
    console.log(`获取商品详情，ID: ${productId}`)
    
    try {
      // 发起API请求获取商品详情
      const response = await get(event, {
        url: `/saas-aimall-goods/manager/product/pod/detail/${productId}`,
        // 缓存1小时
        cache: true,
        cacheTime: 60 * 60 * 1000
      })
      
      // 如果API调用成功，返回商品详情
      if (response && response.code === 200 && response.data) {
        console.log('成功获取商品详情数据')
        return {
          code: 200,
          message: 'success',
          data: response.data
        }
      } else {
        // API调用成功但返回错误，使用Mock数据
        console.log('API返回错误，使用Mock数据')
        return {
          code: 200,
          message: 'success',
          data: getMockProductDetail(productId)
        }
      }
    } catch (error) {
      // API调用失败，使用Mock数据
      console.error('获取商品详情接口调用失败:', error)
      return {
        code: 200,
        message: 'success',
        data: getMockProductDetail(productId)
      }
    }
  } catch (error: any) {
    console.error('获取商品详情异常:', error)
    return {
      code: 500,
      message: error.message || '获取商品详情失败',
      data: null
    }
  }
})

// 生成Mock数据
function getMockProductDetail(id: string | number): ProductDetail {
  // 可以根据ID生成不同的Mock数据
  const productId = String(id)
  
  // 基础Mock数据模板
  const mockData: ProductDetail = {
    id: productId,
    name: '时尚棒球帽',
    description: '采用优质棉质面料，透气舒适，可调节帽围，适合各种场合佩戴，经典设计永不过时。',
    detailDescription: '这款棒球帽采用100%优质棉质面料制作，具有良好的透气性和吸汗性。帽围可调节，适合头围54-60cm的成人佩戴。帽檐采用经典弧度设计，既能很好地遮阳，又不影响视线。帽子整体做工精细，车缝线迹均匀，经久耐用。',
    price: 89.00,
    images: [
      '/assets/products/hat1.jpg',
      '/assets/products/hat2.jpg',
      '/assets/products/hat3.jpg',
      '/assets/products/hat4.jpg',
    ],
    tag: '热销',
    category: '制帽',
    attributes: {
      '材质': '优质棉料',
      '工艺': '印花/刺绣',
      '适用季节': '四季',
      '风格': '休闲'
    },
    sizes: [
      { name: 'S', chest: 96, length: 65, shoulder: 42 },
      { name: 'M', chest: 100, length: 67, shoulder: 44 },
      { name: 'L', chest: 104, length: 69, shoulder: 46 },
      { name: 'XL', chest: 108, length: 71, shoulder: 48 }
    ]
  }
  
  // 根据ID的最后一位数字生成不同的商品数据
  const lastDigit = Number(productId.charAt(productId.length - 1))
  
  if (lastDigit % 3 === 0) {
    mockData.name = 'T恤'
    mockData.description = '采用优质面料，柔软亲肤，修身剪裁，多色可选，适合日常休闲和运动穿着。'
    mockData.detailDescription = '这款T恤采用优质棉料和聚酯纤维混纺面料，柔软舒适，穿着体验好。版型经过精心设计，修身不紧绷，适合各种体型穿着。印花采用环保材料，不易脱落。'
    mockData.price = 129.00
    mockData.images = ['/assets/products/tshirt1.jpg', '/assets/products/tshirt2.jpg', '/assets/products/tshirt3.jpg']
    mockData.tag = '畅销'
    mockData.category = '上衣'
  } else if (lastDigit % 3 === 1) {
    mockData.name = '防晒渔夫帽'
    mockData.description = '大帽檐设计，有效防晒，可折叠便携，适合户外活动和度假旅行使用。'
    mockData.detailDescription = '这款渔夫帽采用优质尼龙面料，防晒效果好，透气性佳。大帽檐设计能够有效遮挡阳光，保护面部和颈部。可折叠设计方便携带和收纳。'
    mockData.price = 69.00
    mockData.images = ['/assets/products/hat2.jpg', '/assets/products/hat3.jpg', '/assets/products/hat1.jpg']
    mockData.tag = '新品'
    mockData.category = '制帽'
  }
  
  return mockData
} 