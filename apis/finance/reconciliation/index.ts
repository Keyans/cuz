import { get, post, put, del, patch } from '../../http'
import type { CreateReconciliation, ReconciliationQueryParams, SubmitReconciliation } from './types'

/**
 * 创建对账单
 */
export const doCreateReconciliation = (data: CreateReconciliation) => {
    return post({
        url: 'saas-aimall-finance/finance/reconciliation/create',
        data,
    })
}

export const doListReconciliation = (params: ReconciliationQueryParams) => {
    return get({
        url: 'saas-aimall-finance/finance/reconciliation/page',
        params,
    })
}

/**
 * 创建结算单（提交财务审核）
 */
export const doSubmitReconciliation = (data: SubmitReconciliation) => {
    return post({
        url: 'saas-aimall-finance/finance/reconciliation/submit',
        data,
    })
}
