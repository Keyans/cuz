import { get } from "../../http";
import type { ShopTransactionQueryParams } from "./types";

/**
 * 分页查询商家交易记录
 */
export const doListShopTransaction = (params: ShopTransactionQueryParams) => {
  return get({
    url: "saas-aimall-payment/payment/record",
    params,
  });
};
