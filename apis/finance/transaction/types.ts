interface PageParam {
  size: number;
  current: number;
}
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

export const payBizTypeMap: Record<string, string> = {
  RECHARGE: "预付",
  ORDER_PAY: "订单支付",
  REFUND: "平台退款",
  COMPENSATION: "平台赔付",
  WITHDRAW: "提现",
  TRANSFER: "转账",
  SAMPLING: "采样",
};

export const tradeStatusMap: Record<string, string> = {
  PENDING_TRADE: "待支付",
  OVERTIME_CLOSE: "交易关闭",
  SUCCESS_APPLY_TRADE: "交易中",
  FAIL_APPLY_TRADE: "交易失败",
  SUCCESS_TRADE: "交易成功",
  FAIL_TRADE: "交易失败",
};
export const payTypeMap: Record<string, string> = {
  BALANCE: "预付余额支付",
  CMBPAY: "聚合支付",
};
export const payDetailTypeMap: Record<string, string> = {
  ALIPAY: "支付宝",
  WECHAT: "微信支付",
  UNIONPAY: "银联",
  DCEP: "数字人民币",
  BALANCE: "预付余额",
};

export interface ReconciliationPageParam extends PageParam {
  startTime?: string;
  endTime?: string;
}

export interface ConfirmReconciliationParam {
  reconciliationNos: string[];
  shopId: number;
}
