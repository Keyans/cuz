import { get, post, del } from '../http'

/**
 * 获取指定level 等级类目
 */
export const doGetCategoryList = (params: any) => {
  return get({
    url: "saas-plugin-platform/pod/platform/category/list/level",
    params,
  });
};
