/**
 * Created wzd
 * Date: 2017/11/28/
 * Time: 13:20
 * content: 职业禁忌症管理请求
 */
import method from '@/api/method'
import helper from '@/utils/helper'
// 获取禁忌症管理类型列表
export function getOccupationalContraindicationList (params) {
  // get请求要将请求的参数放到url地址中
  return method.get(`api/baseinfo/occup-taboos${helper.objToString(params)}`, {authorize: true})
}
// 增加禁忌症
export function addOccupationalContraindicationList (params) {
  // post请求要将请求参数放到请求体中
  return method.post(`api/baseinfo/occup-taboos`, params, {authorize: true})
}

// 修改禁忌症
export function updateOccupationalContraindicationList (params) {
  // post请求要将请求参数放到请求体中
  return method.put(`api/baseinfo/occup-taboos/` + params.id, params, {authorize: true})
}

// 根据id删除
export function delOccupationalContraindicationList (params) {
  // post请求要将请求参数放到请求体中
  return method.del(`api/baseinfo/occup-taboos${helper.objToString(params)}`, {authorize: true})
}

// ===================复检项目=====================
// 获取复检项目
export function getReexamItems (params) {
  return method.get(`api/baseinfo/reexam-items${helper.objToString(params)}`, {authorize: true})
}
