/**
 * 退款请求参数类型
 */
export interface RefundParam {
  orderNum: string;       // 订单号
  platformId: string;     // 平台ID
  shopId: string;         // 店铺ID
  userId: string;         // 用户ID
  afsNum: string;         // 退款单号
  refundFee: number;      // 退款金额 (已乘以10000)
} 