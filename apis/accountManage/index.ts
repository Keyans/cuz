import { get, post, del , put } from '../http'
/**
 * 新增或修改物流地址 
 */
export const doPostAddress = (data: any) => {
    return post({
      url: "saas-aimall-shop/shop/logistics/address/set",
      data,
    });
};

/**
 * 删除物流地址 
 */
export const doDelAddress = (id: number) => {
    return del({
       url: `saas-aimall-shop/shop/logistics/address/del/${id}`
   });
};
/**
 * 获取物流地址
 */
export const doGetAddressList = (params: any) => {
  return get({
    url: "saas-aimall-shop/shop/logistics/address/list",
    params,
  });
};

/**
 * 获取物流地址
 */
export const doGetAddress = (params: any) => {
  return get({
    url: "saas-aimall-shop/shop/logistics/address/get",
    params,
  });
};

/**
 * 设置默认收发货地址 
 */
export const doPutAddress = (id: number) => {
  return put({
    url: `saas-aimall-shop/shop/logistics/address/set/def/address/${id}`,
  });
};


/**
 * 分页查询创意选品平台用户
 */
export const doGetCreativeList = (params: any) => {
    return get({
      url: "saas-aimall-uaa/uaa/shop/admin/creative/list",
      params,
    });
  };
  
  /**
   * 用户详情
   */
  export const doGetCreative = (id: any) => {
    return get({
      url: `saas-aimall-uaa/uaa/shop/admin/creative/${id}`,
    });
  };

  /**
 *  编辑创意选品平台用户
 */
export const doPutCreative = (id: number) => {
    return put({
      url: `saas-aimall-uaa/uaa/shop/admin/creative/${id}`,
    });
  };
