// 楼层管理 xk
import method from '@/api/method'
import helper from '@/utils/helper'

export function getFloors(p) {
  return method.get(`api/baseinfo/floors${helper.objToString(p)}`, {authorize: true})
}
export function getFloorsParent(id) {
  return method.get(`api/baseinfo/floors/${id}`, {authorize: true})
}
export function addFloors(p) {
  return method.post(`api/baseinfo/floors`, p, {authorize: true})
}
export function editFloors(p) {
  return method.put(`api/baseinfo/floors/${p.id}`, p, {authorize: true})
}
export function deleteFloors(p) {
  return method.del(`api/baseinfo/floors?ids=${p}`, {authorize: true})
}
