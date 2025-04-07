/*
 * @description:
 * @Author: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @Date: 2024-02-09 13:13:59
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @LastEditTime: 2024-02-10 16:33:01
 */
import { get, post, put } from "../http";
import type { CaptchaRequest } from "~/components/ui/slide-captcha/Captcha";
import type { R } from "../http.type";

export const getLoginPermShops = (username: string) => {
  return get({
    showLoading: false,
    url: `/saas-aimall-uaa/uaa/auth/shop/${username}`,
  });
};

/**
 * 获取滑块验证码
 */
export const doGetCaptchaSlider = () => {
  return get({ url: `saas-aimall-uaa/uaa/auth/captcha/slider` });
};

/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 获取验证码
 * @param {} data
 */
export const doPostSmsCode = (data: CaptchaRequest<string>) => {
  return post({ url: `saas-aimall-uaa/uaa/auth/captcha/sms`, data });
};

export const signByUser = (data: any) => {
  return post({
    showLoading: true,
    url: "/saas-aimall-uaa/uaa/auth/oauth/token",
    data,
    // headers: {
    //     'Platform-Ids': 0,
    //     'Shop-Ids': '1640998223874670592',
    // },
  });
};

export const myData = () => {
  return get({
    url: "saas-aimall-uaa/uaa/shop/admin/mine",
  });
};
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 商家中心 查询账户信息
 */
export const doGetUserDataAccount = () => {
  return get({
    url: `saas-aimall-uaa/uaa/user/data/account`,
  });
};
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 商家中心 发送重置密码短信验证码
 */
export const doGetMyResetPasswordSms = () => {
  return get({
    url: `saas-aimall-uaa/uaa/auth/reset/my/password/sms`,
  });
};
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 商家中心 重置密码
 * @param {string} code
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {*}
 */
export const doPutMyResetPassword = (
  code: string,
  password: string,
  confirmPassword: string
) => {
  return put({
    url: `saas-aimall-uaa/uaa/auth/reset/my/password`,
    data: {
      code,
      password,
      confirmPassword,
    },
  });
};
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 重置密码 发送重置密码短信验证码
 */
export const doGetResetPasswordSms = (mobile: string) => {
  return get({
    url: `saas-aimall-uaa/uaa/auth/reset/${mobile}/password/sms`,
  });
};
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 重置密码
 * @param {string} code
 * @param {string} password
 * @param {string} confirmPassword
 * @param {string} mobile
 * @returns {*}
 */
export const doPutResetPassword = (
  code: string,
  password: string,
  confirmPassword: string,
  mobile: string
) => {
  return put({
    url: `saas-aimall-uaa/uaa/auth/reset/password`,
    data: {
      code,
      password,
      confirmPassword,
      mobile,
    },
  });
};

/**
 * 查询用户菜单导航
 */
export const doGetUserMenu = (): Promise<R<any>> => {
  return new Promise((resolve, reject) => {
    get({
      url: "saas-aimall-uaa/uaa/menu/navigate",
    })
      .then((res: any) => {
        if (res.code !== 200) {
          resolve(res);
          return;
        }
        const data = res.data;
        const menuMap = new Map<string, Set<string>>();
        const menuConf = data.menuConfig;
        for (const key in menuConf) {
          menuMap.set(key, new Set(menuConf[key]));
        }
        data.menuConfig = menuMap;
        resolve(res);
      })
      .catch((err: any) => reject(err));
  });
};

/**
 * 保存用户菜单配置
 *
 * @param data 菜单配置
 */
export const doPostSetUserMenuConfig = (data: Map<string, Set<string>>) => {
  const object = {};
  for (const [key, set] of data) {
    object[key] = [...set];
  }
  return post({
    url: "saas-aimall-uaa/uaa/menu/navigate",
    data: object,
    showLoading: false,
  });
};
