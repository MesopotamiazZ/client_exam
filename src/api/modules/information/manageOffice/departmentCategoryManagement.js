/**
* @content 综合管理办公室   科室类别管理
* Updated 刘洋
* Date: 2018/3/3
*/
import method from '@/api/method'
import helper from '@/utils/helper'

//  科室类别类型
export function getDiseaseTypesFunc (params) {
    // get请求要将请求的参数放到url地址中
  return method.get(`api/baseinfo/dept-types${helper.objToString(params)}`, {authorize: true})
}
  // 增加 科室类别
export function addDiseaseTypesFunc (params) {
    // post请求要将请求参数放到请求体中
  return method.post(`api/baseinfo/dept-types`, params, {authorize: true})
}

  // 修改 科室类别
export function updateDiseaseTypesFunc (params) {
    // post请求要将请求参数放到请求体中
  return method.put(`api/baseinfo/dept-types/` + params.id, params.data, {authorize: true})
}

  // 根据id删除
export function delDiseaseTypesFunc (params) {
    // post请求要将请求参数放到请求体中
  return method.del(`api/baseinfo/dept-types${helper.objToString(params)}`, {authorize: true})
}
