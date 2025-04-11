export interface RechargeParam {
  payType: "BALANCE" | "WECHAT" | "ALIPAY" | "CMBPAY";
  rechargeAmt: number;
}
export interface PayOrderStatusParam{
  outTradeNo: string;
}