/**
* Created 张祥
* Date: 2017/12/1/
* content:疾病或异常管理
*/
import method from '@/api/method'
import helper from '@/utils/helper'

// 获取疾病类型列表
export function getDiseaseTypes(data) {
  if (data) {
    return method.get(`api/baseinfo/disease-types${helper.objToString(data)}`, {authorize: true})
  } else {
    return method.get('api/baseinfo/disease-types?filters=status:1&per_page=100000', {authorize: true})
  }
}
// 获取项目类别列表
export function getProjectCategoryList (params) { // 获取项目类别
  // console.log(2)
  return method.get(`api/baseinfo/item-types${helper.objToString(params)}`, {authorize: true})
}
// 获取疾病列表
export function getDiseases(data) {
  if (data) {
    return method.get(`api/baseinfo/disease-abns${helper.objToString(data)}`, {authorize: true})
  } else {
    return method.get('api/baseinfo/disease-abns', {authorize: true})
  }
}
// 获取全部组合
export function getAllPro(data) {
  if (data) {
    return method.get(`/api/baseinfo/group-items${helper.objToString(data)}`, {authorize: true})
  }
  return method.get('/api/baseinfo/group-items?filters=status:1&per_page=100000', {authorize: true})
}
// 获取复查项目列表
export function getReexam(data) {
  return method.get(`api/baseinfo/reexam-items${helper.objToString(data)}`, {authorize: true})
}

// 添加疾病与异常
export function addDisease(data) {
  return method.post('api/baseinfo/disease-abns', data, {authorize: true})
}

// 修改疾病详情
export function editDisease(id, data) {
  return method.put(`api/baseinfo/disease-abns/${id}`, data, {authorize: true})
}

// 获取疾病详情
export function getDiseaseInfo(id) {
  return method.get(`api/baseinfo/disease-abns/${id}`, {authorize: true})
}

// 删除疾病
export function deleteDisease(data) {
  return method.del(`api/baseinfo/disease-abns${helper.objToString(data)}`, {authorize: true})
}

// 获取体检项目类型列表
export function getPeItemTypes() {
  return method.get('api/baseinfo/pe-item-types?filters=status:1&per_page=100000', {authorize: true})
}

// 获取复检及要求列表
export function getReexamItems() {
  return method.get('api/baseinfo/reexam-items?filters=status:1&per_page=100000', {authorize: true})
}
// 获取标准疾病名称
export function getDiseaseAbnsStd() {
  return method.get('api/baseinfo/disease-abns-std?filters=status:1', {authorize: true})
}

