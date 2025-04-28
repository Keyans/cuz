// 根据API响应结构创建的类目Mock数据
export function createCategoryMockData(level = 'LEVEL_3') {
  // 根据级别创建不同的类目数据
  const records = [];
  
  // 一级类目
  if (level === 'LEVEL_1') {
    records.push(
      {
        id: '1',
        name: '服装',
        categoryImg: '/assets/products/clothing.jpg',
        level: 1,
        parentId: '0'
      },
      {
        id: '2',
        name: '鞋靴',
        categoryImg: '/assets/products/shoes.jpg',
        level: 1,
        parentId: '0'
      },
      {
        id: '3',
        name: '箱包',
        categoryImg: '/assets/products/bags.jpg',
        level: 1,
        parentId: '0'
      },
      {
        id: '4',
        name: '配饰',
        categoryImg: '/assets/products/accessories.jpg',
        level: 1,
        parentId: '0'
      },
      {
        id: '5',
        name: '家居',
        categoryImg: '/assets/products/homeware.jpg',
        level: 1,
        parentId: '0'
      },
      {
        id: '6',
        name: '美妆',
        categoryImg: '/assets/products/beauty.jpg',
        level: 1,
        parentId: '0'
      }
    );
  } 
  // 二级类目
  else if (level === 'LEVEL_2') {
    records.push(
      {
        id: '101',
        name: '男装',
        categoryImg: '/assets/products/menswear.jpg',
        level: 2,
        parentId: '1'
      },
      {
        id: '102',
        name: '女装',
        categoryImg: '/assets/products/womenswear.jpg',
        level: 2,
        parentId: '1'
      },
      {
        id: '103',
        name: '童装',
        categoryImg: '/assets/products/childrenswear.jpg',
        level: 2,
        parentId: '1'
      },
      {
        id: '201',
        name: '男鞋',
        categoryImg: '/assets/products/menshoes.jpg',
        level: 2,
        parentId: '2'
      },
      {
        id: '202',
        name: '女鞋',
        categoryImg: '/assets/products/womenshoes.jpg',
        level: 2,
        parentId: '2'
      },
      {
        id: '301',
        name: '男包',
        categoryImg: '/assets/products/menbags.jpg',
        level: 2,
        parentId: '3'
      },
      {
        id: '302',
        name: '女包',
        categoryImg: '/assets/products/womenbags.jpg',
        level: 2,
        parentId: '3'
      },
      {
        id: '401',
        name: '帽子',
        categoryImg: '/assets/products/hat1.jpg',
        level: 2,
        parentId: '4'
      },
      {
        id: '402',
        name: '饰品',
        categoryImg: '/assets/products/jewelry.jpg',
        level: 2,
        parentId: '4'
      }
    );
  }
  // 三级类目
  else if (level === 'LEVEL_3') {
    records.push(
      {
        id: '10101',
        name: 'T恤',
        categoryImg: '/assets/products/tshirt1.jpg',
        level: 3,
        parentId: '101'
      },
      {
        id: '10102',
        name: '衬衫',
        categoryImg: '/assets/products/menshirt.jpg',
        level: 3,
        parentId: '101'
      },
      {
        id: '10103',
        name: '裤子',
        categoryImg: '/assets/products/menpants.jpg',
        level: 3,
        parentId: '101'
      },
      {
        id: '10104',
        name: '外套',
        categoryImg: '/assets/products/jacket1.jpg',
        level: 3,
        parentId: '101'
      },
      {
        id: '10201',
        name: '连衣裙',
        categoryImg: '/assets/products/womendress.jpg',
        level: 3,
        parentId: '102'
      },
      {
        id: '10202',
        name: '上装',
        categoryImg: '/assets/products/womentop.jpg',
        level: 3,
        parentId: '102'
      },
      {
        id: '10203',
        name: '裤装',
        categoryImg: '/assets/products/womenpants.jpg',
        level: 3,
        parentId: '102'
      },
      {
        id: '10204',
        name: '套装',
        categoryImg: '/assets/products/womensuit.jpg',
        level: 3,
        parentId: '102'
      }
    );
  }
  
  // 返回符合API格式的数据对象
  return {
    pages: 1,
    records: records,
    total: records.length,
    size: records.length,
    current: 1
  };
} 