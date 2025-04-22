<template>
  <div>
    <el-table
      row-key="id"
      :data="tableData"
      style="width: 100%"
      class="shadow rounded-lg"
      empty-text="暂无交易记录"
    >
      <el-table-column type="index" width="50" label="序号" fixed />
      <el-table-column width="100" prop="transAmount" label="交易金额">
        <template #default="props">
          <span
            :class="
              plusTypes.slice(0, 2).includes(props.row.payBizType)
                ? 'text-red-300' // 仅平台退款或赔付才变色
                : ''
            "
          >
            {{
              (plusTypes.includes(props.row.payBizType) ? "+" : "-") +
              "￥" +
              +props.row?.transAmount / 10000
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        prop="currentBalance"
        label="可用预付余额"
        :formatter="
          (row, _column, cell) =>
            row.payType === 'BALANCE' || row.payBizType === 'RECHARGE'
              ? '￥' + +cell / 10000
              : ''
        "
      />
      <el-table-column
        width="100"
        prop="currentFreeze"
        label="冻结金额"
        :formatter="
          (row, _column, cell) => (row.payType === 'BALANCE' ? cell : '')
        "
      />
      <el-table-column width="100" prop="currency" label="交易币种" />
      <el-table-column width="210" prop="tradeNo" label="交易编号" />
      <el-table-column width="200" prop="bizNo" label="关联订单" />
      <el-table-column
        width="100"
        prop="payBizType"
        label="业务类型"
        :formatter="(_, __, cell) => payBizTypeMap[cell] ?? '未知类型'"
      />
      <el-table-column
        width="100"
        prop="payType"
        label="支付类型"
        :formatter="
          (_, __, cell) => (cell ? payTypeMap[cell] ?? '未知类型' : '')
        "
      />
      <el-table-column
        width="100"
        prop="payDetailType"
        label="支付方式"
        :formatter="
          (_, __, cell) => (cell ? payDetailTypeMap[cell] ?? '未知方式' : '')
        "
      />
      <el-table-column
        width="100"
        prop="tradeStatus"
        label="交易状态"
        :formatter="
          (row, __, cell) => {
            if (!cell) return '';
            if (row.payBizType === 'RECHARGE' && cell === 'SUCCESS_TRADE')
              cell = 'RECHARGE_SUCCESS_TRADE';
            return tradeStatusMap[cell] ?? '未知状态';
          }
        "
      >
        <template #default="props">
          <span
            :class="
              props?.row?.tradeStatus === 'FAIL_TRADE' ? 'text-red-300' : ''
            "
          >
            {{
              props?.row?.tradeStatus
                ? tradeStatusMap[props?.row?.tradeStatus] ?? "未知状态"
                : ""
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        prop="payChannelNo"
        label="第三方支付流水号"
        :formatter="formatter['payChannelNo']"
      />
      <el-table-column width="200" prop="tradeTime" label="日期" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import {
  payBizTypeMap,
  payDetailTypeMap,
  tradeStatusMap,
  payTypeMap,
} from "~/apis/finance/transaction/types";
export interface TableDataProp {
  transAmount: string;
  currentBalance: string;
  currentFreeze: string;
  currency: string;
  tradeNo: string;
  bizNo: string;
  payBizType: string;
  payType: string;
  payDetailType: string;
  tradeStatus: string;
  payChannelNo: string;
  tradeTime: string;
}
let tableData = defineModel<TableDataProp[]>("tableData", {
  required: true,
  default: [],
});

const plusTypes = ["REFUND", "COMPENSATION", "RECHARGE"];

const formatter: Record<string, (row: any, column: any, cell: any) => string> =
  {
    payChannelNo: (row, _column, cell) => {
      if (row.payBizType === "REFUND" || row.payBizType === "COMPENSATION")
        return "";
      return cell;
    },
  };
</script>

<style scoped>
/* 样式 */
</style>
