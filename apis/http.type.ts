import type { AxiosResponse } from "axios";

/**
 * 请求数据 格式
 */
export type RequestData = {
  /**
   * 是否展示loading
   */
  showLoading?: boolean;
  /**
   * 请求地址url
   */
  url: string;
  /**
   * url参数
   */
  params?: any;
  /**
   * 请求体参数
   */
  data?: any;
};

/**
 * 响应数据格式
 */
export interface R extends AxiosResponse {
  /**
   * 响应码
   */
  code: number;
  /**
   * 响应提示信息
   */
  msg: string;
  /**
   * 响应数据
   */
  data: any;
  success: boolean;
}

enum TokenEnum {
  /**
   * 需要登录
   */
  NEED_LOGIN = 2,
  /**
   * token不可用
   */
  TOKEN_INVALID = 3,
  /**
   * token已过期
   */
  TOKEN_EXPIRED = 4,
  /**
   * refresh token不可用
   */
  REFRESH_TOKEN_INVALID = 5,
  /**
   * refresh token 已过期
   */
  REFRESH_TOKEN_EXPIRED = 6,
  /**
   * 权限不足
   */
  PERMISSION_DENIED = 7,

  /**
   * 账号已过期
   */
  ACCOUNT_EXPIRED = 8,
  /**
   * 密码有误
   */
  USERNAME_PASSWORD_INVALID = 9,

  /**
   * clientId invalid,
   */
  CLIENT_ID_INVALID = 10,
  /**
   * scope invalid
   */
  SCOPE_INVALID = 11,
  /**
   * REQUEST_INVALID
   */
  REQUEST_INVALID = 12,
  /**
   * UNSUPPORTED_RESPONSE_TYPE
   */
  RESPONSE_TYPE_INVALID = 13,
  /**
   * 用户拒绝授权
   */
  ACCESS_DENIED = 14,
  /**
   * 重定向地址不可用
   */
  REDIRECT_URI_INVALID = 15,
  /**
   * 授权不可用
   */
  GRANT_INVALID = 16,
  /**
   * 账号不可用
   */
  ACCOUNT_INVALID = 17,
  /**
   * 服务不可用
   */
  AUTH_SERVER_ERROR = 18,
  /**
   * 票据已过期
   */
  CREDENTIALS_EXPIRED = 19,
}

enum CODE_DATA {
  /**
   * 数据不存在的代码
   */
  DATA_NOT_EXIST_CODE = 100100,
  /**
   * 数据存在的代码
   */
  DATA_EXISTED_CODE = 100101,
  /**
   * 数据添加失败的代码
   */
  DATA_ADD_FAILED_CODE = 100102,
  /**
   * 数据更新失败的代码
   */
  DATA_UPDATE_FAILED_CODE = 100103,
  /**
   * 数据删除失败的代码
   */
  DATA_DELETE_FAILED_CODE = 100104,
}

/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 数据捕获错误返回code
 * @returns {*}
 */
export const CRUD_ERROR_CODE = [100100, 100101, 100102, 100103, 100104, 9];
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: TOKEN 异常
 * @returns {*}
 */
export const TOKEN_OVERDUE = [2, 3, 5, 6];
