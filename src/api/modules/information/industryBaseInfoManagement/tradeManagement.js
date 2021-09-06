/**
 * Created wzd
 * update xk
 * Date: 2017/12/3/
 * Time: 16:34
 * content: 工种管理
 */
import method from '@/api/method'
import helper from '@/utils/helper'

// 获取行业列表
export function getTradeManagementList (params) {
  return method.get(`api/baseinfo/industrys${helper.objToString(params)}`, {authorize: true})
}
// 增加行业列表
export function addTradeManagementList (params) {
  return method.post(`api/baseinfo/industrys`, params, {authorize: true})
}

// 修改行业列表
export function updateTradeManagementList (params) {
  return method.put(`api/baseinfo/industrys/` + params.id, params, {authorize: true})
}

// 根据id删除行业列表
export function delTradeManagementList (params) {
  return method.del(`api/baseinfo/industrys${helper.objToString(params)}`, {authorize: true})
}

// =====================工种=====================
// 获取工种
export function getOccupTypesList (params) {
  return method.get(`api/baseinfo/occup-types${helper.objToString(params)}`, {authorize: true})
}

// 获取工种名称
export function getOccupNameTypesList (params) {
  return method.get(`api/baseinfo/occup-type-stds${helper.objToString(params)}`, {authorize: true})
}
// 新增工种
export function addOccupTypesList (params) {
  return method.post(`api/baseinfo/occup-types`, params, {authorize: true})
}

// 修改工种
export function updateOccupTypesList (params) {
  return method.put(`api/baseinfo/occup-types/` + params.id, params, {authorize: true})
}

// 根据id删除工种
export function delOccupTypesList (params) {
  return method.del(`api/baseinfo/occup-types${helper.objToString(params)}`, {authorize: true})
}
