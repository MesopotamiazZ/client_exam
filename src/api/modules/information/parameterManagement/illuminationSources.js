/**
 * Created 刘佳莉
 * Date: 2017/11/30/
 *  * updated 刘洋
  * Date: 2018/1/29/
 * content:照射源职业分类列表
 */
import method from '@/api/method'
import helper from '@/utils/helper'

export function state(params) {
  console.log(params)
  return method.get(`api/baseinfo/irradiation-sources${helper.objToString(params)}`, {authorize: true})
}
export function illuminationSourcesType(params) {
  return method.get(`api/baseinfo/irradiation-source-stds${helper.objToString(params)}`, {authorize: true})
}

export function addState(params) {
  return method.post(`api/baseinfo/irradiation-sources`, params, {authorize: true})
}
export function deleteState (params) {
  // console.log(helper.objToString(params))
  return method.del(`api/baseinfo/irradiation-sources${helper.objToString(params)}`, {authorize: true})
}
// test
export function writeState(params) {
  console.log(params)
  return method.put(`api/baseinfo/irradiation-sources/${params.id}`, params.data, {authorize: true})
}
