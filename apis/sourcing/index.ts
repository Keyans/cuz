import { post } from '../http'

/**
 * 获取选品中心产品列表
 */
export const doPostProductList = (data: any) => {
  return post({
    url: "saas-aimall-goods/pod/mall/product/list",
    data,
  });
};
/**
 * 产品库列表
 */
export const doPostMerchantProductList = (data: any) => {
  return post({
    url: "saas-aimall-goods/merchant/product/list",
    data,
  });
};

/**
 * 加入产品库
 */
export const doPostMerchantProductSave = (data: any) => {
  return post({
    url: "saas-aimall-goods/merchant/product/save",
    data,
  });
};
