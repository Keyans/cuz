import { get } from "../../http";

/**
 * 查询商户商铺余额信息
 */
export const doGetShopBalance = () => {
  return get({
    url: "saas-aimall-overview/overview/shop/balance",
  });
};
