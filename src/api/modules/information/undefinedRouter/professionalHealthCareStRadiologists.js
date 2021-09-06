/**
* @author liuyang
* @date 2018/2/27
* @content 放射人员职业健康监护规范
*/
import method from '@/api/method'
import helper from '@/utils/helper'
export function getList(p) {
  return method.get(`api/baseinfo/occup-health-care-stds${helper.objToString(p)}`, {authorize: true})
}
export function getOccHealthExamTypeList(p) {
  return method.get(`api/baseinfo/occup-health-examination-types${helper.objToString(p)}`, {authorize: true})
}
export function getOccHazardCategoryList(p) {
  return method.get(`api/baseinfo/occup-harm-types${helper.objToString(p)}`, {authorize: true})
}
export function getOccHazardCategoryFactorList(p) {
  return method.get(`api/baseinfo/occup-harm-factors${helper.objToString(p)}`, {authorize: true})
}
export function getOccpDiseasesList(p) {
  return method.get(`api/baseinfo/occup-diseases${helper.objToString(p)}`, {authorize: true})
}
export function getInspectionList(p) {
  return method.get(`api/baseinfo/occup-exam-basis${helper.objToString(p)}`, {authorize: true})
}
export function getContraindicationList(p) {
  return method.get(`api/baseinfo/occup-taboos${helper.objToString(p)}`, {authorize: true})
}
// 问诊
export function getInquiryProjects(data) {
  if (data) {
    return method.get(`/api/baseinfo/inquiries${helper.objToString(data)}&per_page=100000`, {authorize: true})
  }
  return method.get('/api/baseinfo/inquiries?filters=status:1&per_page=100000', {authorize: true})
}
// export function getItemClassList(p) {
//   return method.get(`api/baseinfo/item-types${helper.objToString(p)}`, {authorize: true})
// }

// 获取体检单项类型列表
export function getPeItemTypes() {
  return method.get('/api/baseinfo/item-types?filters=status:1&per_page=100000', { authorize: true })
}

// export function getGroupItemsList(p) {
//   return method.get(`api/baseinfo/group-items${helper.objToString(p)}`, {authorize: true})
// }
// 获取所有组合项目
export function getAllPro(data) {
  if (data) {
    return method.get(`/api/baseinfo/group-items${helper.objToString(data)}&per_page=100000`, {authorize: true})
  }
  return method.get('/api/baseinfo/group-items?filters=status:1&per_page=100000', {authorize: true})
}

export function addNewItem(params) { // 新增条目
  return method.post(`api/baseinfo/occup-health-care-stds`, params, {authorize: true})
}
export function deletItem (params) { // 删除条目
  return method.del(`api/baseinfo/occup-health-care-stds${helper.objToString(params)}`, {authorize: true})
}
export function amendItem(params) {
  return method.put(`api/baseinfo/occup-health-care-stds/${params.id}`, params.params, {authorize: true})
}
