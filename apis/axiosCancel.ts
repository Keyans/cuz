import axios from 'axios'
import type { AxiosRequestConfig, Canceler } from 'axios'
let pendingMap = new Map<string, Canceler>()
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')
export class AxiosCanceler {
    // 添加请求
    addPending(config: AxiosRequestConfig) {
        this.removePending(config)
        const url = getPendingUrl(config)
        config.cancelToken =
            config.cancelToken ||
            new axios.CancelToken((cancel) => {
                if (!pendingMap.has(url)) {
                    pendingMap.set(url, cancel)
                }
            })
    }
    // 去除请求
    removePending(config: AxiosRequestConfig) {
        const url = getPendingUrl(config)
        if (pendingMap.has(url)) {
            const cancel = pendingMap.get(url)
            cancel?.(url)
            pendingMap.delete(url)
        }
    }
    removeAllPending() {
        pendingMap.forEach((cancel) => {
            if (typeof cancel === 'function') {
                cancel()
            }
        })
        pendingMap.clear()
    }
    // 预付Map
    reset(): void {
        pendingMap = new Map<string, Canceler>()
    }
}
