import { get, post, del } from "../http";
import type { ShopAddData, ShopAddParams } from "./types";

/**
 * 查询店铺列表
 * @returns
 */
export const doGetShopList = (params?: any) => {
  return get({
    url: "/saas-aimall-shop/shop/third/authorization",
    params,
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
  });
};

/**
 * 获得平台站点列表（获得经营站点列表接口）
 * @returns
 */
export const doGetThirdWarehouseSiteList = (params: { appType: number }) => {
  return get({
    url: `/saas-plugin-third-party-adapter/thirdParty/goods/publicInformation/getSiteList`,
    params,
  });
};

/**
 * 获得平台仓库的列表（工厂仓库列表查询）
 * @returns
 */
export const doGetFactoryThirdWarehouseList = () => {
  return get({
    url: `/saas-aimall-shop/shop/factory/warehouse`,
  });
};

/**
 * 商家三方店铺发货仓列表
 * @returns
 */
export const doGetThirdWarehouseList = () => {
  return get({
    url: `/saas-aimall-shop/shop/third/warehouse`,
  });
};

/**
 * 更新三方仓库与本地仓库绑定关系
 */
export const doUpdateThirdWarehouseBind = (data: any) => {
  return post({
    url: `/saas-aimall-shop/shop/third/warehouse/relation`,
    data,
  });
};

/**
 * 刷新发货仓信息
 */
export const doRefreshWarehouseInfo = (params: { appShopId: any; platformType: any; siteId: any; }) => {
  return get({
    url: `/saas-aimall-shop/shop/third/warehouse/refresh/${params.appShopId}/${params.platformType}/${params.siteId}`,
  });
};
