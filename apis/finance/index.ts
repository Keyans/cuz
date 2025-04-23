import { get, post } from "../http";
import type { RefundParam } from "./types";

/**
 * 订单退款
 */
export const doRefundOrder = (data: RefundParam) => {
  return post({
    url: "saas-aimall-payment/merchant/pay/order/refund",
    data,
  });
}; 