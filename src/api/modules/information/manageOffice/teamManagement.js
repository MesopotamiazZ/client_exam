/**
* @author liuyang
* @date 2018/3/5
* @content 排队机列表
*/
import method from '@/api/method'
import helper from '@/utils/helper'

// 获取排队机
export function getDiseaseTypesFunc (params) {
    // get请求要将请求的参数放到url地址中
  return method.get(`api/baseinfo/line-up-machines${helper.objToString(params)}`, {authorize: true})
}
  // 增加排队机
export function addDiseaseTypesFunc (params) {
    // post请求要将请求参数放到请求体中
  return method.post(`api/baseinfo/line-up-machines`, params, {authorize: true})
}

  // 修改排队机
export function updateDiseaseTypesFunc (params) {
    // post请求要将请求参数放到请求体中
  return method.put(`api/baseinfo/line-up-machines/` + params.id, params.data, {authorize: true})
}

  // 根据id删除
export function delDiseaseTypesFunc (params) {
    // post请求要将请求参数放到请求体中
  return method.del(`api/baseinfo/line-up-machines${helper.objToString(params)}`, {authorize: true})
}
