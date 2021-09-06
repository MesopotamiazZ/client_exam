/**
* Created jyling
* Date: 2017/11/28/
* content:复查项目及要求管理
*/
import method from '@/api/method'
import helper from '@/utils/helper'
// 复查项目复检要求列表
export function getReexamItems(params) {
  return method.get(`api/baseinfo/reexam-items${helper.objToString(params)}`, {authorize: true})
}
// 修改复检项目及要求
export function editReexamItemItems(params) {
  return method.put(`api/baseinfo/reexam-items/${params.id}`, params.data, {authorize: true})
}
// 新增
export function addReexamItems(params) {
  return method.post(`api/baseinfo/reexam-items`, params, {authorize: true})
}
// 获取组合项目列表
export function getGroupItems (params) {
  return method.get('api/baseinfo/group-items?per_page=100000&filters=status:1', {authorize: true})
}
// 删除复查项目
export function deletReexamItem (params) {
  return method.del(`api/baseinfo/reexam-items${helper.objToString(params)}`, {authorize: true})
}
