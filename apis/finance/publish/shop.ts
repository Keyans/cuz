import { get, post, del } from "../../http";
import type { ShopAddData, ShopAddParams } from "./types";

/**
 * 查询店铺列表
 * @returns
 */
export const doGetShopList = (params?: any) => {
  return get({
    url: "/saas-aimall-shop/shop/third/authorization",
    params
  });
};

/**
 * 获取电商平台列表（查询授权应用列表）
 */
export const doGetPlatformList = () => {
  return get({
    url: "/saas-aimall-shop/shop/third/authorization/app",
  });
};

/**
 * 新增店铺 (授权码店铺授权)
 */
export const doAddShop = (params: ShopAddParams, data?: ShopAddData) => {
  return post({
    url: `/saas-aimall-shop/shop/third/authorization/code/${params.platformType}/${params.appType}`,
    data,
  });
};

/**
 * 删除店铺( 取消关联 )
 */
export const doDeleteShop = (params: { id: string }) => {
  return del({
    url: `/saas-aimall-shop/shop/third/authorization/${params.id}`, 
  }) 
}
