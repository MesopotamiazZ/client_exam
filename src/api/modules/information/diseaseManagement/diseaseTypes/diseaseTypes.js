/**
* @author wzd
* @date 2017/12/21
* @content 疾病类型
*/
import method from '@/api/method'
import helper from '@/utils/helper'

// 获取疾病类型
export function getDiseaseTypesFunc (params) {
    // get请求要将请求的参数放到url地址中
  return method.get(`api/baseinfo/disease-types${helper.objToString(params)}`, {authorize: true})
}
  // 增加疾病类型
export function addDiseaseTypesFunc (params) {
    // post请求要将请求参数放到请求体中
  return method.post(`api/baseinfo/disease-types`, params, {authorize: true})
}

  // 修改疾病类型
export function updateDiseaseTypesFunc (params) {
    // post请求要将请求参数放到请求体中
  return method.put(`api/baseinfo/disease-types/` + params.id, params.data, {authorize: true})
}

  // 根据id删除
export function delDiseaseTypesFunc (params) {
    // post请求要将请求参数放到请求体中
  return method.del(`api/baseinfo/disease-types${helper.objToString(params)}`, {authorize: true})
}
