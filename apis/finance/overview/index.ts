import { get, post } from "../../http";
import type { RechargeParam, PayOrderStatusParam } from "./types";

/**
 * 查询商户商铺预付余额信息
 */
export const doGetShopBalance = () => {
  return get({
    url: "saas-aimall-overview/overview/shop/balance",
  });
};

/**
 * 查询商户商铺预付余额信息
 */
export const doRecharge = (data: RechargeParam) => {
  return post({
    url: "saas-aimall-overview/overview/shop/balance/recharge",
    data,
  });
};

/**
 * 查询商户商铺预付余额信息
 */
export const doGetPayOrderStatus = (params:PayOrderStatusParam) => {
  return get({
    url: "saas-aimall-payment/merchant/pay/order/status",
    params,
  });
};

