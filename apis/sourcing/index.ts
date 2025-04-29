import { post } from '../http'

/**
 * 获取指定level 等级类目
 */
export const doPostProductList = (data: any) => {
  return post({
    url: "saas-aimall-goods/pod/mall/product/list",
    data,
  });
};
