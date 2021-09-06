/*
* 基本信息-参数管理-经济行业管理
* @author xk
* @date 2017/02/07
*/

import method from '@/api/method'
import helper from '@/utils/helper'

export function getEconIndustryStds(p) {
  return method.get(`api/baseinfo/econ-industry-stds${helper.objToString(p)}`, {authorize: true})
}
export function getEconIndustryLists(p) {
  return method.get(`api/baseinfo/econ-industrys${helper.objToString(p)}`, {authorize: true})
}
export function getEconIndustryDetails(id) {
  return method.get(`api/baseinfo/econ-industrys/${id}`, {authorize: true})
}
export function addEconIndustry(p) {
  return method.post(`api/baseinfo/econ-industrys`, p, {authorize: true})
}
export function editEconIndustry(p) {
  return method.put(`api/baseinfo/econ-industrys/${p.id}`, p, {authorize: true})
}
export function deleteEconIndustry(p) {
  return method.del(`api/baseinfo/econ-industrys?ids=${p}`, {authorize: true})
}
