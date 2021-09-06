/**
 * Created jiangyiling
 * Date: 2018/1/30/
 * Time: 19:20
 * content: 职业健康检查种类管理
 */
import method from '@/api/method'
import helper from '@/utils/helper'
export function getLeftList(p) {
  return method.get(`api/baseinfo/occup-harm-types${helper.objToString(p)}`, {authorize: true})
}
export function getRightList(p) {
  return method.get(`api/baseinfo/occup-harm-factors${helper.objToString(p)}`, {authorize: true})
}
export function addNewItem(params) {
  return method.post(`api/baseinfo/occup-harm-factors`, params, {authorize: true})
}
export function deletItem (params) {
  return method.del(`api/baseinfo/occup-harm-factors${helper.objToString(params)}`, {authorize: true})
}
export function amendItem(params) {
  return method.put(`api/baseinfo/occup-harm-factors/${params.id}`, params.params, {authorize: true})
}
