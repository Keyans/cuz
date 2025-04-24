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
 * 查询店铺列表
 */
export const doGetauthorizeList = (data: any) => {
  return post({
    url: "saas-aimall-shop/shop/third/authorize/list",
    data,
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

/**
 * 获取分类属性列表接口
 */
export const doGetAttributeList = (params: any) => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/goods/attribute/getList",
    params,
  });
};

/**
 * 获取分类列表接口
 */
export const doGetCategoryList = (params: any) => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/goods/category/getList",
    params,
  });
};

/**
 * 获取仓库列表
 */
export const doGetWarehouseList = (params: any) => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/goods/publicInformation/getWarehouseList",
    params,
  });
};

/**
 * 获取公共信息列表
 */
export const doGetPublicInformationList = (params: any) => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/goods/publicInformation/getList",
    params,
  });
};

/**
 * 获取刊登模版变量列表
 */
export const doGetVariableList = () => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/posting/template/variableList",
  });
};

/**
 * 上传文件
 */
export const doUpload = (data: any) => {
  return post({
    url: "saas-aimall-message-pigeon/oss/upload",
    data,
  });
};

/**
 * 分页查询刊登商品列表
 */
export const doGetTaskPage = (params: any) => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/posting/product/page",
    params,
  });
};

/**
 * 批量删除刊登商品
 */
export const doTaskBatchDelete = (data: any) => {
  return post({
    url: "saas-plugin-third-party-adapter/thirdParty/posting/product/batch/delete",
    data,
  });
};

/**
 * 发布刊登商品
 */
export const doTaskCreate = (data: any) => {
  return post({
    url: 'saas-plugin-third-party-adapter/thirdParty/posting/product/public',
    data,
  });
};
/**
 * 删除刊登商品
 */
export const doTaskDelete = (id: string) => {
  return post({
    url: `saas-plugin-third-party-adapter/thirdParty/posting/product/delete/${id}`,
  });
};
/**
 * 根据ID查询刊登商品详情
 */
export const doGetTaskProductDetail = (id: string) => {
  return get({
    url: `saas-plugin-third-party-adapter/thirdParty/posting/product/${id}`,
  });
};
/**
 * 更新刊登商品信息
 */
export const doTaskUpdate = (data: any) => {
  return post({
    url: `saas-plugin-third-party-adapter/thirdParty/posting/product/update/${data.id}`,
    data,
  });
};

/**
 * 获取尺码表列表接口
 */
export const doGetSizeTableList = (params: any) => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/goods/publicInformation/getSizeTableList",
    params,
  });
};

/**
 * 获取模特列表接口
 */
export const doGetModelInfoList = (params: any) => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/goods/publicInformation/getModelInfoList",
    params,
  });
};

/**
 * 统计不同状态的刊登任务数量
 */
export const doGetProductStatusCount = () => {
  return get({
    url: "saas-plugin-third-party-adapter/thirdParty/posting/product/status/count",
  });
};