/**
 * api请求接口封装
 */
import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete,
  HttpHead,
  HttpOptions,
  HttpPatch,
} from "./http-handle";
import type { RequestData } from "./http.type";

const httpGet = new HttpGet();
/**
 * get 请求
 * @param config 请求参数配置
 */
const get = (config: RequestData) => {
  return httpGet.request(config);
};

/**
 * post 请求
 * @param config 请求参数配置
 */
const httpPost = new HttpPost();
const post = (config: RequestData) => {
  return httpPost.request(config);
};
/**
 * put 请求
 * @param config 请求参数配置
 */
const httpPut = new HttpPut();
const put = (config: RequestData) => {
  return httpPut.request(config);
};
/**
 * delete 请求
 * @param config 请求参数配置
 */
const httpDelete = new HttpDelete();
const del = (config: RequestData) => {
  return httpDelete.request(config);
};
/**
 * head 请求
 * @param config 请求参数配置
 */
const httpHead = new HttpHead();
const head = (config: RequestData) => {
  return httpHead.request(config);
};
/**
 * options 请求
 * @param config 请求参数配置
 */
const httpOptions = new HttpOptions();
const options = (config: RequestData) => {
  return httpOptions.request(config);
};
/**
 * patch 请求
 * @param config 请求参数配置
 */
const httpPatch = new HttpPatch();
const patch = (config: RequestData) => {
  return httpPatch.request(config);
};

export { get, post, put, del, head, options, patch };
