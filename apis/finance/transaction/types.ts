/**
 * 查询参数类型
 */
export interface ShopTransactionQueryParams {
  size: number; // 页面大小
  current: number; // 当前页
  tradeNo?: string;
  bizTypes?: string;
  startTime?: string;
  endTime?: string;
}

export interface SupplierTransactionQueryParams {
  size: number; // 页面大小
  current: number; // 当前页
  recordQuery?: TransactionRecordQueryParams;
}

/**
 * 交易记录查询参数类型
 */
export interface TransactionRecordQueryParams {
  transactionRecordNo?: string; // 交易记录号
  orderNo?: string; // 订单号
  settlementNo?: string; // 结算单号
  platformId?: string; // 平台ID
  shopId?: string; // 商店ID
  supplierId?: string; // 供应商ID
  orderTypes?: string; // 订单类型
  transactionType?: string; // 交易类型
  minAmount?: number; // 最小金额
  maxAmount?: number; // 最大金额
  startTime?: string; // 开始时间
  endTime?: string; // 结束时间
  reconciliationStatusList?: string[]; // 对账状态列表
  statusList?: string[]; // 状态列表
}

export const payBizTypeMap = {
  // RECHARGE: '预付',
  ORDER_PAY: "订单支付",
  REFUND: "平台退款",
  COMPENSATION: "平台赔付",
  // TRANSFER: '转账',
  // WITHDRAW: '提现',
  // SAMPLING: '采样',
};
