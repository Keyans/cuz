import { post } from '../../http'
import type { ListSettlementParams } from './types'

/**
 * 分页获取结算单
 */
export const doListSettlement = (params: ListSettlementParams) => {
    return post({
        url: 'saas-aimall-finance/finance/settlement/page',
        params,
    })
}

/**
 * 确认结算单
 */
export const doConfirmSettlement = (settlementNo: string) => {
    return post({
        url: `saas-aimall-finance/finance/settlement/${settlementNo}/confirm`,
    })
}
