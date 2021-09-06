/**
 * 诊断规则管理
 * xk
 * 2018.2.9
 */
import method from '@/api/method'
import helper from '@/utils/helper'

export function getDiagnoseRules(p) {
  return method.get(`api/baseinfo/diagnose-rules${helper.objToString(p)}`, {authorize: true})
}
export function getItemTypes(p) {
  return method.get(`api/baseinfo/item-types${helper.objToString(p)}`, {authorize: true})
}
export function addDiagnoseRules(p) {
  return method.post(`api/baseinfo/diagnose-rules`, p, {authorize: true})
}
export function deleteDiagnoseRules(p) {
  return method.del(`api/baseinfo/diagnose-rules${helper.objToString(p)}`, {authorize: true})
}
export function editDiagnoseRules(p) {
  console.log('put', p)
  return method.put(`api/baseinfo/diagnose-rules/${p.id}`, p, {authorize: true})
}
// modal
export function getItems(p) {
  return method.get(`api/baseinfo/items${helper.objToString(p)}`, {authorize: true})
}
// 组合项
export function getGroupItems(p) {
  return method.get(`api/baseinfo/group-items${helper.objToString(p)}`, {authorize: true})
}
// 诊断结果名称
export function getResult(p) {
  return method.get(`api/baseinfo/disease-abns${helper.objToString(p)}`, {authorize: true})
}
