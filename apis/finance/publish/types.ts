
/**
 * 新增店铺 (授权码店铺授权)
 */
export interface ShopAddParams {
    platformType: string;
    appType: string;
}

/**
 * 新增店铺 (授权码店铺授权)
 */
export interface ShopAddData {
    authRegion?: string; // 授权区域
    orderAuthCode?: string; // 订单授权码
    productAuthCode?: string; // 商品授权码
    thirdPartyShopName?: string; // 第三方店铺名称
    shopId?: number; // 店铺ID
    middleGroundShopId?: number; // 中台店铺ID
    middleGroundShopCode?: string; // 中台店铺Code
    authExpireTime?: string; // 订阅到期时间
}