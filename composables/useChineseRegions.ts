/**
 * 中国地区数据辅助函数
 * 替代 china-area-data 模块，解决构建时 JSON 解析错误
 */
import chinaAreaData from '../data/china-area-data';
import type { RegionMap } from '../data/china-area-data';

export function useChineseRegions() {
  // 获取所有省份
  const getProvinces = (): RegionMap => {
    const provinces: RegionMap = {};
    const provinceCodes = Object.keys(chinaAreaData['86'] || {});
    
    provinceCodes.forEach(code => {
      provinces[code] = chinaAreaData['86'][code];
    });
    
    return provinces;
  };
  
  // 获取指定省份的所有城市
  const getCities = (provinceCode: string): RegionMap => {
    if (!provinceCode || !chinaAreaData[provinceCode]) {
      return {};
    }
    
    return chinaAreaData[provinceCode];
  };
  
  // 获取指定城市的所有区县
  const getCounties = (cityCode: string): RegionMap => {
    if (!cityCode || !chinaAreaData[cityCode]) {
      return {};
    }
    
    return chinaAreaData[cityCode];
  };
  
  // 根据代码获取地区名称
  const getNameByCode = (code: string): string | undefined => {
    // 省级
    if (code.endsWith('0000')) {
      return chinaAreaData['86']?.[code];
    }
    
    // 市级
    if (code.substring(2) === '00') {
      const provinceCode = code.substring(0, 2) + '0000';
      return chinaAreaData[provinceCode]?.[code];
    }
    
    // 区县级
    const cityCode = code.substring(0, 4) + '00';
    return chinaAreaData[cityCode]?.[code];
  };
  
  return {
    getProvinces,
    getCities,
    getCounties,
    getNameByCode,
    chinaAreaData
  };
} 