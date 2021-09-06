// 部门管理 xk
import method from '@/api/method'
import helper from '@/utils/helper'

export function getPersonnel(p) {
  return method.get(`api/baseinfo/staffs${helper.objToString(p)}`, {authorize: true})
}
// 科室
export function getDept(p) {
  return method.get(`api/baseinfo/depts${helper.objToString(p)}`, {authorize: true})
}
// 科室类别
export function getDeptType(p) {
  return method.get(`api/baseinfo/dept-types${helper.objToString(p)}`, {authorize: true})
}
// 行政职务
export function getAdministrative(p) {
  return method.get(`api/baseinfo/administrative-duties${helper.objToString(p)}`, {authorize: true})
}
// 党内职务
export function getInnerPartyDuties(p) {
  return method.get(`api/baseinfo/inner-party-duties${helper.objToString(p)}`, {authorize: true})
}
// 岗位
export function getJobs(p) {
  return method.get(`api/baseinfo/jobs${helper.objToString(p)}`, {authorize: true})
}
// 部门
export function getDivisions(p) {
  return method.get(`api/baseinfo/divisions${helper.objToString(p)}`, {authorize: true})
}
// export function getpersonPelParent(id) {
//   return method.get(`api/baseinfo/staffs/${id}`, {authorize: true})
// }
export function addPersonnel(p) {
  return method.post(`api/baseinfo/staffs`, p, {authorize: true})
}
export function editPersonnel(p) {
  return method.put(`api/baseinfo/staffs/${p.id}`, p, {authorize: true})
}
export function deletePersonnel(p) {
  return method.del(`api/baseinfo/staffs?ids=${p}`, {authorize: true})
}
