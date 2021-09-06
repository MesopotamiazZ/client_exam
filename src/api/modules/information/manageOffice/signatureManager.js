// 部门管理 xk
import method from '@/api/method'
import helper from '@/utils/helper'

export function getSigns(p) {
  return method.get(`api/baseinfo/staffs/signs${helper.objToString(p)}`, {authorize: true})
}
export function getStaffs(p) {
  return method.get(`api/baseinfo/staffs${helper.objToString(p)}`, {authorize: true})
}
export function addSigns(p) {
  return method.post(`api/baseinfo/staffs/signs`, p, {authorize: true})
}
export function editSigns(p) {
  return method.post(`api/baseinfo/staffs/signs/${p.id}`, p.formData, {authorize: true})
}
export function deleteSigns(p) {
  return method.del(`api/baseinfo/staffs/signs?ids=${p}`, {authorize: true})
}
