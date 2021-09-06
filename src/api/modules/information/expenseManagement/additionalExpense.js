//  jyiling
import method from '@/api/method'
import helper from '@/utils/helper'
// 获取列表全体额外费用
export function surchargesList(params) {
  return method.get(`api/baseinfo/surcharges${helper.objToString(params)}`, {authorize: true})
}
// 新增额外费用列表
export function addsurchargesList(params) {
  return method.post(`api/baseinfo/surcharges`, params, {authorize: true})
}
// 获取收费类型列表
export function getTypesList(params) {
  return method.get(`api/baseinfo/charge-categories${helper.objToString(params)}`, {authorize: true})
}
// 修改收费类型
export function amendAdditionExpense(params) {
  return method.put(`api/baseinfo/surcharges/${params.id}`, params.params, {authorize: true})
}
// 删除
export function deletAdditionExpense(params) {
  return method.del(`api/baseinfo/surcharges${helper.objToString(params)}`, {authorize: true})
}
// 获取科室
export function getAdministrative(params) {
  return method.get(`api/baseinfo/depts${helper.objToString(params)}`, {authorize: true})
}
