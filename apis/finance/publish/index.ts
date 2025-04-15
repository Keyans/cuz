import { get, post, del } from '../../http'

/**
 * 分页查询刊登模版
 */
export const doGetTemplatePage = (params: any) => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/posting/template/page",
    params,
  });
};

/**
 * 刊登模版语言列表
 */
export const doGetTemplateLanguageList = () => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/posting/template/languageList"
  });
};
/**
 * 添加修改刊登模版
 */
export const doSaveTemplate = (data: any) => {
    return post({
      url: "saas-plugin-third-party-adapter/thirdParty/posting/template/saveOrUpdate",
      data,
    });
};

/**
 * 查询刊登模版详情
 */
export const doGetTemplateDetail = (params: any) => {
   return get({
      url: "saas-plugin-third-party-adapter/thirdParty/posting/template/detail",
      params,
  });
};

/**
 * 删除刊登模版
 */
export const doDelTemplate = (id: number) => {
    return del({
       url: `saas-plugin-third-party-adapter/thirdParty/posting/template/delete/${id}`
   });
};