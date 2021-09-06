// 部门管理 xk
import method from '@/api/method'
import helper from '@/utils/helper'

export function getDepartment(p) {
  return method.get(`api/baseinfo/divisions${helper.objToString(p)}`, {authorize: true})
}
export function getDepartmentParent(id) {
  return method.get(`api/baseinfo/divisions/${id}`, {authorize: true})
}
export function addDepartment(p) {
  return method.post(`api/baseinfo/divisions`, p, {authorize: true})
}
export function editDepartment(p) {
  return method.put(`api/baseinfo/divisions/${p.id}`, p, {authorize: true})
}
export function deleteDepartment(p) {
  return method.del(`api/baseinfo/divisions?ids=${p}`, {authorize: true})
}
