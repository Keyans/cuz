/**
 * Web Worker用于卸载主线程的繁重计算
 */

// 消息处理
self.addEventListener('message', function(e) {
  // 获取从主线程传递过来的数据
  const data = e.data;

  switch (data.action) {
    case 'calculatePricing':
      // 计算定价逻辑
      const result = calculateProductPricing(data.product, data.quantity, data.markup);
      self.postMessage({ action: 'pricingResult', result });
      break;

    case 'filterProducts':
      // 产品过滤逻辑
      const filteredProducts = filterProducts(data.products, data.filters);
      self.postMessage({ action: 'filteredProducts', products: filteredProducts });
      break;

    case 'processImage':
      // 图像处理逻辑（例如，调整大小、优化等）
      processImage(data.imageData)
        .then(result => {
          self.postMessage({ action: 'imageProcessed', imageData: result });
        })
        .catch(error => {
          self.postMessage({ action: 'error', error: error.message });
        });
      break;

    default:
      self.postMessage({ action: 'error', error: 'Unknown action' });
  }
});

/**
 * 计算产品定价
 * @param {Object} product - 产品信息
 * @param {number} quantity - 数量
 * @param {number} markup - 价格加成百分比
 * @returns {Object} - 价格计算结果
 */
function calculateProductPricing(product, quantity, markup) {
  // 成本价（基础价格）
  const baseCost = product.baseCost || 0;

  // 根据数量添加批量折扣
  let discount = 0;
  if (quantity >= 100) {
    discount = 0.2; // 20%折扣
  } else if (quantity >= 50) {
    discount = 0.15; // 15%折扣
  } else if (quantity >= 25) {
    discount = 0.1; // 10%折扣
  } else if (quantity >= 10) {
    discount = 0.05; // 5%折扣
  }

  // 计算折扣后的成本价
  const discountedCost = baseCost * (1 - discount);

  // 加成价格 (markup是百分比，例如30表示30%)
  const markupAmount = discountedCost * (markup / 100);

  // 最终零售价
  const retailPrice = discountedCost + markupAmount;

  // 总成本
  const totalCost = discountedCost * quantity;

  // 总收入
  const totalRevenue = retailPrice * quantity;

  // 总利润
  const totalProfit = totalRevenue - totalCost;

  // 利润率
  const profitMargin = (totalProfit / totalRevenue) * 100;

  return {
    unitCost: discountedCost.toFixed(2),
    unitPrice: retailPrice.toFixed(2),
    totalCost: totalCost.toFixed(2),
    totalRevenue: totalRevenue.toFixed(2),
    totalProfit: totalProfit.toFixed(2),
    profitMargin: profitMargin.toFixed(2),
    appliedDiscount: discount * 100
  };
}

/**
 * 过滤产品
 * @param {Array} products - 产品列表
 * @param {Object} filters - 过滤条件
 * @returns {Array} - 过滤后的产品列表
 */
function filterProducts(products, filters) {
  return products.filter(product => {
    // 按类别过滤
    if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    // 按价格范围过滤
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }

    // 按关键词搜索过滤
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase();
      if (!product.name.toLowerCase().includes(searchTerm) &&
          !product.description.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    // 按标签过滤
    if (filters.tags && filters.tags.length > 0) {
      if (!product.tags || !filters.tags.some(tag => product.tags.includes(tag))) {
        return false;
      }
    }

    return true;
  });
}

/**
 * 处理图像
 * @param {Object} imageData - 图像数据
 * @returns {Promise<Object>} - 处理后的图像数据
 */
async function processImage(imageData) {
  // 这里是一个简单的模拟图像处理
  // 在实际应用中，你可能会进行更复杂的操作，如调整尺寸、压缩、裁剪等
  return new Promise((resolve, reject) => {
    try {
      // 模拟处理延迟
      setTimeout(() => {
        // 假设我们对图像进行了处理
        const processedData = {
          ...imageData,
          processed: true,
          processingTime: new Date().toISOString()
        };

        resolve(processedData);
      }, 300);
    } catch (error) {
      reject(error);
    }
  });
}
