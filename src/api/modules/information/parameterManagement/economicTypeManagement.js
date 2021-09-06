/*
* 基本信息-参数管理-经济类型管理
* @author 肖康
* @date 2017/11/30
*/

import method from '@/api/method'
import helper from '@/utils/helper'

export function getEconmicType(p) {
  return method.get(`api/baseinfo/econ-types${helper.objToString(p)}`, {authorize: true})
}
export function getEconmicTypeParent(id) {
  return method.get(`api/baseinfo/econ-types/${id}`, {authorize: true})
}
export function getEconmicTypeAll(p) {
  return method.get(`api/baseinfo/econ-types${helper.objToString(p)}`, {authorize: true})
}
export function getEconTypeStds(p) {
  return method.get(`api/baseinfo/econ-type-stds${helper.objToString(p)}`, {authorize: true})
}

export function addEconType(p) {
  return method.post('api/baseinfo/econ-types', p, {authorize: true})
}

export function editEconType(p) {
  return method.put(`api/baseinfo/econ-types/${p.id}`, p, {authorize: true})
}
export function delEconType(p) {
  return method.del(`api/baseinfo/econ-types?ids=${p}`, {authorize: true})
}
