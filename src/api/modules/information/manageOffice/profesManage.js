// 职务管理 xk
import method from '@/api/method'
import helper from '@/utils/helper'

// 行政
export function getPorfesAs(p) {
  return method.get(`api/baseinfo/administrative-duties${helper.objToString(p)}`, {authorize: true})
}
// export function getPorfesAsParent(id) {
//   return method.get(`api/baseinfo/administrative-duties/${id}`, {authorize: true})
// }
export function addPorfesAs(p) {
  return method.post(`api/baseinfo/administrative-duties`, p, {authorize: true})
}
export function editPorfesAs(p) {
  return method.put(`api/baseinfo/administrative-duties/${p.id}`, p, {authorize: true})
}
export function deletePorfesAs(p) {
  return method.del(`api/baseinfo/administrative-duties?ids=${p}`, {authorize: true})
}
// 党内
export function getInnerDuties(p) {
  return method.get(`api/baseinfo/inner-party-duties${helper.objToString(p)}`, {authorize: true})
}
// export function getInnerDutiesParent(id) {
//   return method.get(`api/baseinfo/inner-party-duties/${id}`, {authorize: true})
// }
export function addInnerDuties(p) {
  return method.post(`api/baseinfo/inner-party-duties`, p, {authorize: true})
}
export function editInnerDuties(p) {
  return method.put(`api/baseinfo/inner-party-duties/${p.id}`, p, {authorize: true})
}
export function deleteInnerDuties(p) {
  return method.del(`api/baseinfo/inner-party-duties?ids=${p}`, {authorize: true})
}
