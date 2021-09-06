/**
 * Created 张祥
 * Date: 2018/03/05
 * content:粉尘胸片参数
 */
import method from '@/api/method'
import helper from '@/utils/helper'

export function getParameterList (params) {
  return method.get(`api/baseinfo/dust-chests${helper.objToString(params)}`, {authorize: true})
}

export function addParameterList (params) {
  return method.post(`api/baseinfo/dust-chests`, params, {authorize: true})
}

export function updateParameterList (params) {
  return method.put(`api/baseinfo/dust-chests/` + params.id, params.data, {authorize: true})
}
export function delParameterList(params) {
  return method.del(`api/baseinfo/dust-chests${helper.objToString(params)}`, {authorize: true})
}
