/**
 * Created jyl
 * Date: 2018/2/2/
 * Time: 13:20
 * content: 职业病分类和目录管理
 */
import method from '@/api/method'
import helper from '@/utils/helper'
export function getList (p) {
  return method.get(`api/baseinfo/occup-diseases${helper.objToString(p)}`, {authorize: true})
}
export function deletItem (params) {
  return method.del(`api/baseinfo/occup-diseases${helper.objToString(params)}`, {authorize: true})
}
export function addNewItem(params) {
  return method.post(`api/baseinfo/occup-diseases`, params, {authorize: true})
}
export function amendItem(params) {
  return method.put(`api/baseinfo/occup-diseases/${params.id}`, params.params, {authorize: true})
}
export function getStdList (p) {
  return method.get(`api/baseinfo/occup-disease-stds${helper.objToString(p)}`, {authorize: true})
}
