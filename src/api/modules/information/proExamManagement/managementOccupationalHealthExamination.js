/**
 * Created jiangyiling
 * Date: 2018/1/26/
 * Time: 19:20
 * content: 职业健康检查种类管理
 */
import method from '@/api/method'
import helper from '@/utils/helper'
export function getList(p) {
  return method.get(`api/baseinfo/occup-health-examination-types${helper.objToString(p)}`, {authorize: true})
}
export function addNewItem(params) {
  return method.post(`api/baseinfo/occup-health-examination-types`, params, {authorize: true})
}
export function amendItem(params) {
  return method.put(`api/baseinfo/occup-health-examination-types/${params.id}`, params.params, {authorize: true})
}
export function deletItem (params) {
  // console.log(helper.objToString(params))
  return method.del(`api/baseinfo/occup-health-examination-types${helper.objToString(params)}`, {authorize: true})
}
export function getNameList(p) {
  return method.get(`api/baseinfo/occup-health-examination-type-stds${helper.objToString(p)}`, {authorize: true})
}
