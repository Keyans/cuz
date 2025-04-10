import { get, post } from "../../http";
import type {
  ConfirmReconciliationParam,
  ReconciliationPageParam,
  ShopTransactionQueryParams,
} from "./types";

/**
 * 分页查询商家交易记录
 */
export const doListShopTransaction = (params: ShopTransactionQueryParams) => {
  return get({
    url: "saas-aimall-payment/payment/record",
    params,
  });
};

export const doListReconciliation = (params: ReconciliationPageParam) => {
  return get({
    url: "saas-aimall-finance/finance/transaction/shop/reconciliation/page",
    params,
  });
};

export const doConfirmReconciliation = (data: ConfirmReconciliationParam) => {
  return post({
    url: "saas-aimall-finance//finance/transaction/shop/reconciliation/confirm",
    data,
  });
};
