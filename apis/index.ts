import { get, post, put, del, patch } from "./http";

export const doGetCategoryAttribute = (params: any) => {
  return get({
    url: `saas-plugin-platform/publish/category/attribute`,
    params,
  });
};
