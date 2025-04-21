/*
 * @description:
 * @Author: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @Date: 2024-02-09 13:58:53
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @LastEditTime: 2024-02-10 10:05:07
 */

/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 生成uuid
 * @param {number} len 长度
 * @param {number} radix 基数
 * @returns {*}
 */
export default function uuid(len: number, radix?: number) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    let uuid = [],
        i
    radix = radix || chars.length
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
    } else {
        let r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | (Math.random() * 16)
                uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
            }
        }
    }

    return uuid.join('')
}
