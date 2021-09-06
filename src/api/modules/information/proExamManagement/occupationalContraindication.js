/**
 * Created jiangyiling
 * Date: 2018/1/28/
 * Time: 19:20
 * content: 职业禁忌证管理
 */
import method from '@/api/method'
import helper from '@/utils/helper'
export function getList(p) {
  return method.get(`api/baseinfo/occup-taboos${helper.objToString(p)}`, {authorize: true})
}
export function addNewItem(params) {
  return method.post(`api/baseinfo/occup-taboos`, params, {authorize: true})
}
export function amendItem(params) {
  return method.put(`api/baseinfo/occup-taboos/${params.id}`, params.params, {authorize: true})
}
export function deletItem (params) {
  // console.log(helper.objToString(params))
  return method.del(`api/baseinfo/occup-taboos${helper.objToString(params)}`, {authorize: true})
}
