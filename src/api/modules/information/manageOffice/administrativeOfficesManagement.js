/**
  * 科室管理
  * @author 刘洋
  * @date 2018/3/3
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
// 获取科室管理列表
export function getDiseases(data) {
  if (data) {
    return method.get(`api/baseinfo/depts${helper.objToString(data)}`, {authorize: true})
  } else {
    return method.get('api/baseinfo/depts', {authorize: true})
  }
}
//  科室类别类型
export function getdeptTypes(params) {
  // get请求要将请求的参数放到url地址中
  return method.get(`api/baseinfo/dept-types${helper.objToString(params)}`, {authorize: true})
}
// 获取全部组合
export function getAllPro(data) {
  if (data) {
    return method.get(`/api/baseinfo/group-items${helper.objToString(data)}&filters=status:1`, {authorize: true})
  }
  return method.get('/api/baseinfo/group-items?filters=status:1&per_page=100000', {authorize: true})
}
// 获取复查项目列表
export function getReexam(data) {
  return method.get(`api/baseinfo/reexam-items${helper.objToString(data)}`, {authorize: true})
}
// 获取所有职工列表
export function getStaffs({commit}, data) {
  return method.get(`api/baseinfo/staffs${helper.objToString(data)}`, {authorize: true})
}

// 添加科室
export function addDisease(data) {
  return method.post('api/baseinfo/depts', data, {authorize: true})
}

// 修改科室
export function editDisease(id, data) {
  return method.put(`api/baseinfo/depts/${id}`, data, {authorize: true})
}

// 获取疾病详情
export function getDiseaseInfo(id) {
  return method.get(`api/baseinfo/disease-abns/${id}`, {authorize: true})
}

// 删除科室
export function deleteDisease(data) {
  return method.del(`api/baseinfo/depts${helper.objToString(data)}`, {authorize: true})
}

// 获取体检项目类型列表
export function getPeItemTypes() {
  return method.get('api/baseinfo/pe-item-types?filters=status:1&per_page=100000', {authorize: true})
}

// 获取复检及要求列表
export function getReexamItems() {
  return method.get('api/baseinfo/reexam-items?filters=status:1&per_page=100000', {authorize: true})
}

