// 根据API响应结构创建的商品Mock数据
export function createProductMockData(queryStrategy: string) {
  // 根据查询策略创建不同的商品数据
  const isHotProduct = queryStrategy === 'HOT_PRODUCT';
  
  // 生成记录
  const records = [];
  
  if (isHotProduct) {
    // 热门商品数据
    records.push(
      {
        productId: 101,
        originProductId: 501,
        platformOrgId: 543,
        shopOrgId: 614,
        providerId: 847,
        supplierId: 842,
        supplierIds: ["supplier1", "supplier2"],
        platformCategoryId: 1,
        platformCategoryName: "男装",
        name: "时尚棒球帽",
        nameEn: "Fashion Baseball Cap",
        publishStatus: 1,
        status: 1,
        extra: {},
        picUrl: "/assets/products/hat1.jpg",
        originPicUrl: "/assets/products/hat1.jpg",
        createTime: "2023-05-15 10:29:28",
        updateTime: "2023-06-27 20:29:28",
        skuList: [
          {
            productId: 101,
            skuId: 1001,
            designInfoId: 850,
            image: "/assets/products/hat1.jpg",
            weight: 100,
            standardPrice: 99,
            salePrice: 89,
            title: "时尚棒球帽 - 黑色",
            renderingInfo: {},
            cutPiecesData: {},
            specValues: [
              {
                attributeId: 1,
                attributeValueId: 10,
                attributeValueName: "黑色"
              }
            ],
            designResultInfo: {
              designResultDraftId: 123,
              designResultId: 456,
              designId: 789,
              resultInfo: {},
              produceInfo: {},
              canvasInfo: {}
            },
            originSkuId: 901,
            isDesign: 0
          }
        ],
        originProductInfo: {
          id: 501,
          shopId: 110,
          platformOrgId: 543,
          shopOrgId: 614,
          supplierIds: [123, 456],
          platformCategoryId: 1,
          platformCategoryName: "男装",
          name: "时尚棒球帽",
          nameEn: "Fashion Baseball Cap",
          publishStatus: 1,
          status: 1,
          extra: {},
          picUrl: "/assets/products/hat1.jpg",
          specs: [
            {
              attributeId: 1,
              attributeName: "颜色",
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 10,
                  attributeValueName: "黑色"
                }
              ]
            }
          ],
          cutPiecesData: {},
          cutPiecesDataId: 123,
          createTime: "2023-05-15 10:29:28",
          updateTime: "2023-06-27 20:29:28",
          skuInfos: [
            {
              productId: 101,
              skuId: 1001,
              designInfoId: 850,
              image: "/assets/products/hat1.jpg",
              weight: 100,
              standardPrice: 99,
              salePrice: 89,
              title: "时尚棒球帽 - 黑色",
              renderingInfo: {},
              cutPiecesData: {},
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 10,
                  attributeValueName: "黑色"
                }
              ]
            }
          ]
        },
        salePrice: "89.00"
      },
      {
        productId: 102,
        originProductId: 502,
        platformOrgId: 543,
        shopOrgId: 614,
        providerId: 847,
        supplierId: 842,
        supplierIds: ["supplier1", "supplier3"],
        platformCategoryId: 2,
        platformCategoryName: "男装",
        name: "运动休闲T恤",
        nameEn: "Sport Casual T-Shirt",
        publishStatus: 1,
        status: 1,
        extra: {},
        picUrl: "/assets/products/tshirt1.jpg",
        originPicUrl: "/assets/products/tshirt1.jpg",
        createTime: "2023-04-20 14:29:28",
        updateTime: "2023-06-25 10:29:28",
        skuList: [
          {
            productId: 102,
            skuId: 1002,
            designInfoId: 851,
            image: "/assets/products/tshirt1.jpg",
            weight: 150,
            standardPrice: 159,
            salePrice: 129,
            title: "运动休闲T恤 - 白色",
            renderingInfo: {},
            cutPiecesData: {},
            specValues: [
              {
                attributeId: 1,
                attributeValueId: 11,
                attributeValueName: "白色"
              }
            ],
            designResultInfo: {
              designResultDraftId: 124,
              designResultId: 457,
              designId: 790,
              resultInfo: {},
              produceInfo: {},
              canvasInfo: {}
            },
            originSkuId: 902,
            isDesign: 0
          }
        ],
        originProductInfo: {
          id: 502,
          shopId: 110,
          platformOrgId: 543,
          shopOrgId: 614,
          supplierIds: [123, 457],
          platformCategoryId: 2,
          platformCategoryName: "男装",
          name: "运动休闲T恤",
          nameEn: "Sport Casual T-Shirt",
          publishStatus: 1,
          status: 1,
          extra: {},
          picUrl: "/assets/products/tshirt1.jpg",
          specs: [
            {
              attributeId: 1,
              attributeName: "颜色",
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 11,
                  attributeValueName: "白色"
                }
              ]
            }
          ],
          cutPiecesData: {},
          cutPiecesDataId: 124,
          createTime: "2023-04-20 14:29:28",
          updateTime: "2023-06-25 10:29:28",
          skuInfos: [
            {
              productId: 102,
              skuId: 1002,
              designInfoId: 851,
              image: "/assets/products/tshirt1.jpg",
              weight: 150,
              standardPrice: 159,
              salePrice: 129,
              title: "运动休闲T恤 - 白色",
              renderingInfo: {},
              cutPiecesData: {},
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 11,
                  attributeValueName: "白色"
                }
              ]
            }
          ]
        },
        salePrice: "129.00"
      },
      {
        productId: 103,
        originProductId: 503,
        platformOrgId: 543,
        shopOrgId: 614,
        providerId: 847,
        supplierId: 842,
        supplierIds: ["supplier2", "supplier4"],
        platformCategoryId: 1,
        platformCategoryName: "配饰",
        name: "防晒渔夫帽",
        nameEn: "Sun Protection Bucket Hat",
        publishStatus: 1,
        status: 1,
        extra: {},
        picUrl: "/assets/products/hat2.jpg",
        originPicUrl: "/assets/products/hat2.jpg",
        createTime: "2023-03-10 09:29:28",
        updateTime: "2023-06-20 11:29:28",
        skuList: [
          {
            productId: 103,
            skuId: 1003,
            designInfoId: 852,
            image: "/assets/products/hat2.jpg",
            weight: 90,
            standardPrice: 79,
            salePrice: 69,
            title: "防晒渔夫帽 - 米色",
            renderingInfo: {},
            cutPiecesData: {},
            specValues: [
              {
                attributeId: 1,
                attributeValueId: 12,
                attributeValueName: "米色"
              }
            ],
            designResultInfo: {
              designResultDraftId: 125,
              designResultId: 458,
              designId: 791,
              resultInfo: {},
              produceInfo: {},
              canvasInfo: {}
            },
            originSkuId: 903,
            isDesign: 0
          }
        ],
        originProductInfo: {
          id: 503,
          shopId: 110,
          platformOrgId: 543,
          shopOrgId: 614,
          supplierIds: [124, 458],
          platformCategoryId: 1,
          platformCategoryName: "配饰",
          name: "防晒渔夫帽",
          nameEn: "Sun Protection Bucket Hat",
          publishStatus: 1,
          status: 1,
          extra: {},
          picUrl: "/assets/products/hat2.jpg",
          specs: [
            {
              attributeId: 1,
              attributeName: "颜色",
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 12,
                  attributeValueName: "米色"
                }
              ]
            }
          ],
          cutPiecesData: {},
          cutPiecesDataId: 125,
          createTime: "2023-03-10 09:29:28",
          updateTime: "2023-06-20 11:29:28",
          skuInfos: [
            {
              productId: 103,
              skuId: 1003,
              designInfoId: 852,
              image: "/assets/products/hat2.jpg",
              weight: 90,
              standardPrice: 79,
              salePrice: 69,
              title: "防晒渔夫帽 - 米色",
              renderingInfo: {},
              cutPiecesData: {},
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 12,
                  attributeValueName: "米色"
                }
              ]
            }
          ]
        },
        salePrice: "69.00"
      },
      {
        productId: 104,
        originProductId: 504,
        platformOrgId: 543,
        shopOrgId: 614,
        providerId: 847,
        supplierId: 842,
        supplierIds: ["supplier1", "supplier5"],
        platformCategoryId: 3,
        platformCategoryName: "箱包",
        name: "简约双肩包",
        nameEn: "Simple Backpack",
        publishStatus: 1,
        status: 1,
        extra: {},
        picUrl: "/assets/products/bag1.jpg",
        originPicUrl: "/assets/products/bag1.jpg",
        createTime: "2023-02-15 15:29:28",
        updateTime: "2023-06-15 16:29:28",
        skuList: [
          {
            productId: 104,
            skuId: 1004,
            designInfoId: 853,
            image: "/assets/products/bag1.jpg",
            weight: 500,
            standardPrice: 249,
            salePrice: 199,
            title: "简约双肩包 - 黑色",
            renderingInfo: {},
            cutPiecesData: {},
            specValues: [
              {
                attributeId: 1,
                attributeValueId: 10,
                attributeValueName: "黑色"
              }
            ],
            designResultInfo: {
              designResultDraftId: 126,
              designResultId: 459,
              designId: 792,
              resultInfo: {},
              produceInfo: {},
              canvasInfo: {}
            },
            originSkuId: 904,
            isDesign: 0
          }
        ],
        originProductInfo: {
          id: 504,
          shopId: 110,
          platformOrgId: 543,
          shopOrgId: 614,
          supplierIds: [125, 459],
          platformCategoryId: 3,
          platformCategoryName: "箱包",
          name: "简约双肩包",
          nameEn: "Simple Backpack",
          publishStatus: 1,
          status: 1,
          extra: {},
          picUrl: "/assets/products/bag1.jpg",
          specs: [
            {
              attributeId: 1,
              attributeName: "颜色",
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 10,
                  attributeValueName: "黑色"
                }
              ]
            }
          ],
          cutPiecesData: {},
          cutPiecesDataId: 126,
          createTime: "2023-02-15 15:29:28",
          updateTime: "2023-06-15 16:29:28",
          skuInfos: [
            {
              productId: 104,
              skuId: 1004,
              designInfoId: 853,
              image: "/assets/products/bag1.jpg",
              weight: 500,
              standardPrice: 249,
              salePrice: 199,
              title: "简约双肩包 - 黑色",
              renderingInfo: {},
              cutPiecesData: {},
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 10,
                  attributeValueName: "黑色"
                }
              ]
            }
          ]
        },
        salePrice: "199.00"
      }
    );
  } else {
    // 新品推荐数据
    records.push(
      {
        productId: 105,
        originProductId: 505,
        platformOrgId: 543,
        shopOrgId: 614,
        providerId: 847,
        supplierId: 842,
        supplierIds: ["supplier3", "supplier6"],
        platformCategoryId: 4,
        platformCategoryName: "外套",
        name: "轻薄连帽外套",
        nameEn: "Lightweight Hooded Jacket",
        publishStatus: 1,
        status: 1,
        extra: {},
        picUrl: "/assets/products/jacket1.jpg",
        originPicUrl: "/assets/products/jacket1.jpg",
        createTime: "2023-06-01 10:00:28",
        updateTime: "2023-06-27 20:29:28",
        skuList: [
          {
            productId: 105,
            skuId: 1005,
            designInfoId: 854,
            image: "/assets/products/jacket1.jpg",
            weight: 350,
            standardPrice: 299,
            salePrice: 259,
            title: "轻薄连帽外套 - 蓝色",
            renderingInfo: {},
            cutPiecesData: {},
            specValues: [
              {
                attributeId: 1,
                attributeValueId: 13,
                attributeValueName: "蓝色"
              }
            ],
            designResultInfo: {
              designResultDraftId: 127,
              designResultId: 460,
              designId: 793,
              resultInfo: {},
              produceInfo: {},
              canvasInfo: {}
            },
            originSkuId: 905,
            isDesign: 0
          }
        ],
        originProductInfo: {
          id: 505,
          shopId: 110,
          platformOrgId: 543,
          shopOrgId: 614,
          supplierIds: [126, 460],
          platformCategoryId: 4,
          platformCategoryName: "外套",
          name: "轻薄连帽外套",
          nameEn: "Lightweight Hooded Jacket",
          publishStatus: 1,
          status: 1,
          extra: {},
          picUrl: "/assets/products/jacket1.jpg",
          specs: [
            {
              attributeId: 1,
              attributeName: "颜色",
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 13,
                  attributeValueName: "蓝色"
                }
              ]
            }
          ],
          cutPiecesData: {},
          cutPiecesDataId: 127,
          createTime: "2023-06-01 10:00:28",
          updateTime: "2023-06-27 20:29:28",
          skuInfos: [
            {
              productId: 105,
              skuId: 1005,
              designInfoId: 854,
              image: "/assets/products/jacket1.jpg",
              weight: 350,
              standardPrice: 299,
              salePrice: 259,
              title: "轻薄连帽外套 - 蓝色",
              renderingInfo: {},
              cutPiecesData: {},
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 13,
                  attributeValueName: "蓝色"
                }
              ]
            }
          ]
        },
        salePrice: "259.00"
      },
      {
        productId: 106,
        originProductId: 506,
        platformOrgId: 543,
        shopOrgId: 614,
        providerId: 847,
        supplierId: 842,
        supplierIds: ["supplier4", "supplier7"],
        platformCategoryId: 3,
        platformCategoryName: "箱包",
        name: "女士真皮小包",
        nameEn: "Ladies Leather Bag",
        publishStatus: 1,
        status: 1,
        extra: {},
        picUrl: "/assets/products/bag2.jpg",
        originPicUrl: "/assets/products/bag2.jpg",
        createTime: "2023-06-05 14:29:28",
        updateTime: "2023-06-26 10:29:28",
        skuList: [
          {
            productId: 106,
            skuId: 1006,
            designInfoId: 855,
            image: "/assets/products/bag2.jpg",
            weight: 300,
            standardPrice: 459,
            salePrice: 399,
            title: "女士真皮小包 - 棕色",
            renderingInfo: {},
            cutPiecesData: {},
            specValues: [
              {
                attributeId: 1,
                attributeValueId: 14,
                attributeValueName: "棕色"
              }
            ],
            designResultInfo: {
              designResultDraftId: 128,
              designResultId: 461,
              designId: 794,
              resultInfo: {},
              produceInfo: {},
              canvasInfo: {}
            },
            originSkuId: 906,
            isDesign: 0
          }
        ],
        originProductInfo: {
          id: 506,
          shopId: 110,
          platformOrgId: 543,
          shopOrgId: 614,
          supplierIds: [127, 461],
          platformCategoryId: 3,
          platformCategoryName: "箱包",
          name: "女士真皮小包",
          nameEn: "Ladies Leather Bag",
          publishStatus: 1,
          status: 1,
          extra: {},
          picUrl: "/assets/products/bag2.jpg",
          specs: [
            {
              attributeId: 1,
              attributeName: "颜色",
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 14,
                  attributeValueName: "棕色"
                }
              ]
            }
          ],
          cutPiecesData: {},
          cutPiecesDataId: 128,
          createTime: "2023-06-05 14:29:28",
          updateTime: "2023-06-26 10:29:28",
          skuInfos: [
            {
              productId: 106,
              skuId: 1006,
              designInfoId: 855,
              image: "/assets/products/bag2.jpg",
              weight: 300,
              standardPrice: 459,
              salePrice: 399,
              title: "女士真皮小包 - 棕色",
              renderingInfo: {},
              cutPiecesData: {},
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 14,
                  attributeValueName: "棕色"
                }
              ]
            }
          ]
        },
        salePrice: "399.00"
      },
      {
        productId: 107,
        originProductId: 507,
        platformOrgId: 543,
        shopOrgId: 614,
        providerId: 847,
        supplierId: 842,
        supplierIds: ["supplier2", "supplier8"],
        platformCategoryId: 5,
        platformCategoryName: "鞋靴",
        name: "男士商务皮鞋",
        nameEn: "Men's Business Leather Shoes",
        publishStatus: 1,
        status: 1,
        extra: {},
        picUrl: "/assets/products/shoes1.jpg",
        originPicUrl: "/assets/products/shoes1.jpg",
        createTime: "2023-06-10 09:29:28",
        updateTime: "2023-06-25 11:29:28",
        skuList: [
          {
            productId: 107,
            skuId: 1007,
            designInfoId: 856,
            image: "/assets/products/shoes1.jpg",
            weight: 800,
            standardPrice: 499,
            salePrice: 459,
            title: "男士商务皮鞋 - 黑色",
            renderingInfo: {},
            cutPiecesData: {},
            specValues: [
              {
                attributeId: 1,
                attributeValueId: 10,
                attributeValueName: "黑色"
              }
            ],
            designResultInfo: {
              designResultDraftId: 129,
              designResultId: 462,
              designId: 795,
              resultInfo: {},
              produceInfo: {},
              canvasInfo: {}
            },
            originSkuId: 907,
            isDesign: 0
          }
        ],
        originProductInfo: {
          id: 507,
          shopId: 110,
          platformOrgId: 543,
          shopOrgId: 614,
          supplierIds: [128, 462],
          platformCategoryId: 5,
          platformCategoryName: "鞋靴",
          name: "男士商务皮鞋",
          nameEn: "Men's Business Leather Shoes",
          publishStatus: 1,
          status: 1,
          extra: {},
          picUrl: "/assets/products/shoes1.jpg",
          specs: [
            {
              attributeId: 1,
              attributeName: "颜色",
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 10,
                  attributeValueName: "黑色"
                }
              ]
            }
          ],
          cutPiecesData: {},
          cutPiecesDataId: 129,
          createTime: "2023-06-10 09:29:28",
          updateTime: "2023-06-25 11:29:28",
          skuInfos: [
            {
              productId: 107,
              skuId: 1007,
              designInfoId: 856,
              image: "/assets/products/shoes1.jpg",
              weight: 800,
              standardPrice: 499,
              salePrice: 459,
              title: "男士商务皮鞋 - 黑色",
              renderingInfo: {},
              cutPiecesData: {},
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 10,
                  attributeValueName: "黑色"
                }
              ]
            }
          ]
        },
        salePrice: "459.00"
      },
      {
        productId: 108,
        originProductId: 508,
        platformOrgId: 543,
        shopOrgId: 614,
        providerId: 847,
        supplierId: 842,
        supplierIds: ["supplier5", "supplier9"],
        platformCategoryId: 6,
        platformCategoryName: "配饰",
        name: "智能运动手表",
        nameEn: "Smart Sports Watch",
        publishStatus: 1,
        status: 1,
        extra: {},
        picUrl: "/assets/products/watch1.jpg",
        originPicUrl: "/assets/products/watch1.jpg",
        createTime: "2023-06-15 15:29:28",
        updateTime: "2023-06-27 16:29:28",
        skuList: [
          {
            productId: 108,
            skuId: 1008,
            designInfoId: 857,
            image: "/assets/products/watch1.jpg",
            weight: 120,
            standardPrice: 699,
            salePrice: 599,
            title: "智能运动手表 - 黑色",
            renderingInfo: {},
            cutPiecesData: {},
            specValues: [
              {
                attributeId: 1,
                attributeValueId: 10,
                attributeValueName: "黑色"
              }
            ],
            designResultInfo: {
              designResultDraftId: 130,
              designResultId: 463,
              designId: 796,
              resultInfo: {},
              produceInfo: {},
              canvasInfo: {}
            },
            originSkuId: 908,
            isDesign: 0
          }
        ],
        originProductInfo: {
          id: 508,
          shopId: 110,
          platformOrgId: 543,
          shopOrgId: 614,
          supplierIds: [129, 463],
          platformCategoryId: 6,
          platformCategoryName: "配饰",
          name: "智能运动手表",
          nameEn: "Smart Sports Watch",
          publishStatus: 1,
          status: 1,
          extra: {},
          picUrl: "/assets/products/watch1.jpg",
          specs: [
            {
              attributeId: 1,
              attributeName: "颜色",
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 10,
                  attributeValueName: "黑色"
                }
              ]
            }
          ],
          cutPiecesData: {},
          cutPiecesDataId: 130,
          createTime: "2023-06-15 15:29:28",
          updateTime: "2023-06-27 16:29:28",
          skuInfos: [
            {
              productId: 108,
              skuId: 1008,
              designInfoId: 857,
              image: "/assets/products/watch1.jpg",
              weight: 120,
              standardPrice: 699,
              salePrice: 599,
              title: "智能运动手表 - 黑色",
              renderingInfo: {},
              cutPiecesData: {},
              specValues: [
                {
                  attributeId: 1,
                  attributeValueId: 10,
                  attributeValueName: "黑色"
                }
              ]
            }
          ]
        },
        salePrice: "599.00"
      }
    );
  }
  
  // 返回符合API格式的数据对象
  return {
    pages: 1,
    records: records,
    total: records.length,
    size: 4,
    current: 1
  };
} 