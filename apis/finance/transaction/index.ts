import { get, post, put, del, patch } from '../../http'
import type { ShopTransactionQueryParams, SupplierTransactionQueryParams } from './types'

/**
 * 分页查询商家交易记录
 */
export const doListShopTransaction = (params: ShopTransactionQueryParams) => {
    return get({
        // url: 'saas-aimall-finance/finance/transaction/shop/page',
        url: 'saas-aimall-payment/payment/record',
        params,
    })
}

/**
 * 分页查询供应商交易记录
 */
export const doListSupplierTransaction = (params: SupplierTransactionQueryParams) => {
    return get({
        url: 'saas-aimall-finance/finance/transaction/supplier/page',
        params,
    })
}

/**
 * 查询商家交易记录明细
 * @param transactionNo 交易记录号
 */
export const doGetShopTransactionDetail = (transactionNo: string) => {
    return get({
        url: `saas-aimall-finance/finance/transaction/shop/detail/${transactionNo}`,
    })
}

/**
 * 查询商家交易记录明细
 * @param transactionNo 交易记录号
 */
export const doGetSupplierTransactionDetail = (transactionNo: string) => {
    return get({
        url: `saas-aimall-finance/finance/transaction/supplier/detail/${transactionNo}`,
    })
}
