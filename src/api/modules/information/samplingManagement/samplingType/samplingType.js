/**
 * Created yhy
 * Date: 2017/11/28/
 * Time: 09:20
 * content:采样类型管理 样本类型
 */
import method from '@/api/method'
import helper from '@/utils/helper'

// 获取采样管理类型列表
export function getSamplingTypeList (params) {
  // console.log('getSamplingTypeList', params)
  return method.get(`api/baseinfo/sample-types${helper.objToString(params)}`, {authorize: true})
}

// 获取采样管理类型列表sort
export function getSamplingTypeListSort () {
  // console.log('getSamplingTypeList', params)
  return method.get(`api/baseinfo/sample-types?filters=status:1&per_page=100000`, {authorize: true})
}

// 采样管理新增
export function addSamplingTypeList (params) {
  return method.post(`api/baseinfo/sample-types`, params, {authorize: true})
}

// 采样管理编辑
export function editSamplingTypeList (data) {
  // console.log(222, data)
  return method.put(`api/baseinfo/sample-types/${data.id}`, data.data, {authorize: true})
}

// 搜索采样管理类型列表
export function searchSamplingTypeList (params) {
  return method.get(`api/baseinfo/sample-types${helper.objToString(params)}`, {authorize: true})
}

// 删除采样管理类型列表
export function deleteSamplingTypeList (params) {
  return method.del(`api/baseinfo/sample-types/${helper.objToString(params)}`, {authorize: true})
}

// 获取样本状态
export function getSamplingStatus () {
  return method.get(`api/baseinfo/sample-status`, {authorize: true})
}

// 获取全部组合
export function getAllPro(data) {
  if (data) {
    return method.get(`/api/baseinfo/group-items${helper.objToString(data)}`, {authorize: true})
  }
  return method.get('/api/baseinfo/group-items?filters=status:1&per_page=100000', {authorize: true})
}

// 获取体检项目列表
export function getAllExamPro (id) {
  if (id) {
    return method.get(`/api/baseinfo/items?type_id=${id}?filters=status:1&per_page=100000`, {authorize: true})
  } else {
    return method.get('/api/baseinfo/items?filters=status:1&per_page=100000', {authorize: true})
  }
}

// 修改组合项目,更改其包含的体检项目列表
export function modifyZuhe (id, peItems) {
  return method.put(`/api/baseinfo/group-items/${id}`, peItems, {authorize: true})
}

// 获取组合的详细信息
export function getZuheInfo (id) {
  return method.get(`/api/baseinfo/group-items/${id}/items`, {authorize: true})
}

// 获取科室列表
export function getDepts() {
  return method.get('/api/baseinfo/depts?filters=status:1&per_page=100000', { authorize: true })
}

// 获取体检单项类型列表
export function getPeItemTypes() {
  return method.get('/api/baseinfo/item-types?filters=status:1&per_page=100000', { authorize: true })
}

