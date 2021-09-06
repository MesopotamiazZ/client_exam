/**
* Created 刘洋
* Date: 2017/1/26/
* content:采样管理   标本容量管理
*/
import methods from '@/api/method'
import helper from '@/utils/helper'

// 获取所有套餐
export function getExamComboList (data) {
  if (data) {
    return methods.get(`/api/baseinfo/sample-ctnrs${helper.objToString(data)}`, {authorize: true})
  }
  return methods.get(`/api/baseinfo/sample-ctnrs`, {authorize: true})
}

// 获取全部组合
export function getAllPro(data) {
  if (data) {
    return methods.get(`/api/baseinfo/group-items${helper.objToString(data)}`, {authorize: true})
  }
  return methods.get('/api/baseinfo/group-items?filters=status:1&per_page=100000', {authorize: true})
}

// 获取套餐内的组合
export function getProOfExamComboList (id) {
  return methods.get(`/api/baseinfo/sample-ctnrs/${id}/group-items`, {authorize: true})
}

// 修改套餐
export function modifyExamCom (id, data) {
  return methods.put(`/api/baseinfo/sample-ctnrs/${id}`, data, {authorize: true})
}

// 添加套餐
export function addExamCom (data) {
  return methods.post('/api/baseinfo/sample-ctnrs', data, {authorize: true})
}

// 添加套餐
export function delExamCom (data) {
  return methods.del(`/api/baseinfo/sample-ctnrs${helper.objToString(data)}`, {authorize: true})
}

// 搜索
export function searchExamCom (keyword) {
  return methods.get('/api/baseinfo/sample-ctnrs?key=' + keyword, {authorize: true})
}

// 获取体检项目列表
export function getAllExamPro (id) {
  if (id) {
    return methods.get(`/api/baseinfo/items?type_id=${id}&per_page=100000&filters=status:1`, {authorize: true})
  } else {
    return methods.get('/api/baseinfo/items?filters=status:1&per_page=100000', {authorize: true})
  }
}

// 修改组合项目,更改其包含的体检项目列表
export function modifyZuhe (id, peItems) {
  return methods.put(`/api/baseinfo/group-items/${id}`, peItems, {authorize: true})
}

// 获取组合的详细信息
export function getZuheInfo (id) {
  return methods.get(`/api/baseinfo/group-items/${id}/items`, {authorize: true})
}

// 获取科室列表
export function getDepts() {
  return methods.get('/api/baseinfo/depts?filters=status:1&per_page=100000', { authorize: true })
}

// 获取体检单项类型列表
export function getPeItemTypes() {
  return methods.get('/api/baseinfo/item-types?filters=status:1&per_page=100000', { authorize: true })
}
