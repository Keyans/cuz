export interface CreateReconciliation {
    supplierTransactionRecordIds: number[]
    supplierId: number
    remark?: string
    createdBy?: string
}

/**
 * 对账查询参数类型
 */
export interface ReconciliationQueryParams {
    size: number // 每页显示条数，默认10
    current: number // 当前页
    reconciliationNo?: string // 对账单号
    reconciliationNos?: string // 对账单号列表
    businessType?: string // 业务类型
    businessId?: number // 业务ID（商家ID或供应商ID）
    businessName?: string // 业务名称
    reconciliationTypes?: string // 对账类型
    periodTypes?: string // 对账周期类型
    minTotalAmount?: number // 最小对账金额
    maxTotalAmount?: number // 最大对账金额
    statusList?: string[] // 状态列表
    createTimeStart?: string // 创建开始时间
    createTimeEnd?: string // 创建结束时间
    reconcileTimeStart?: string // 对账开始时间
    reconcileTimeEnd?: string // 对账结束时间
}

export interface SubmitReconciliation {
    reconciliationNos: string[]
    uniqueId: string
}
