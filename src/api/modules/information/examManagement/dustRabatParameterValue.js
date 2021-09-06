/**
 * Created 张祥
 * Date: 2018/03/05
 * content:粉尘胸片参数值
 */
import method from '@/api/method'
import helper from '@/utils/helper'

export function getParameterList (params) {
  return method.get(`api/baseinfo/dust-chests${helper.objToString(params)}`, {authorize: true})
}

export function getParameterValueList (params) {
  return method.get(`api/baseinfo/dust-chest-values${helper.objToString(params)}`, {authorize: true})
}

export function addParameterValue (params) {
  return method.post(`api/baseinfo/dust-chest-values`, params, {authorize: true})
}

export function updateParameterValue (params) {
  return method.put(`api/baseinfo/dust-chest-values/` + params.id, params.data, {authorize: true})
}
export function delParameterValue (params) {
  return method.del(`api/baseinfo/dust-chest-values${helper.objToString(params)}`, {authorize: true})
}
