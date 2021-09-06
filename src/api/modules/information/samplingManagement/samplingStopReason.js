/**
* Created jyling
* Date: 2017/11/27/027
* Time: 11:51
* content:获取弃检原因
*/
import method from '@/api/method'
import helper from '@/utils/helper'
// 获取列表全体弃检原因
export function stopReason(params) {
  return method.get(`api/baseinfo/abandon-reasons${helper.objToString(params)}`, {authorize: true})
}
// 新增
export function addStopReason(params) {
  return method.post(`api/baseinfo/abandon-reasons`, params, {authorize: true})
}
export function deletReason (params) {
  // console.log(helper.objToString(params))
  return method.del(`api/baseinfo/abandon-reasons${helper.objToString(params)}`, {authorize: true})
}
// test
export function amendReason(params) {
  return method.put(`api/baseinfo/abandon-reasons/${params.id}`, params.params, {authorize: true})
}
