/**
* Created 张祥
* Date: 2017/12/1/
* content:组合项目管理
* update: 2018/01/31
*/
import methods from '@/api/method'
import helper from '@/utils/helper'
import axios from '@/service/interceptor'

// 获取项目类别列表
export function getProTypes(data) {
  if (data) {
    return methods.get(`/api/baseinfo/item-types${helper.objToString(data)}&per_page=100000`, { authorize: true })
  }
  return methods.get('/api/baseinfo/item-types?per_page=100000', { authorize: true })
}
// 获取组合项目
export function getPros(data) {
  if (data) {
    return methods.get(`/api/baseinfo/group-items${helper.objToString(data)}`, { authorize: true })
  }
  return methods.get('/api/baseinfo/group-items', { authorize: true })
}

// 获取初始化的数据
export function getInitData() {
  return axios.all([
    getProTypes(),
    getPros(),
  ])
}

// 删除组合项目
export function delPro (data) {
  return methods.del(`/api/baseinfo/group-items${helper.objToString(data)}`, {authorize: true})
}

// 获取组合项目中的体检项目
export function getItemInPro(id) {
  return methods.get(`/api/baseinfo/group-items/${id}/items`, { authorize: true })
}

// 获取组合的详细信息
export function getProInfo (id) {
  return methods.get(`/api/baseinfo/group-items/${id}`, {authorize: true})
}

// 修改组合项目,更改其包含的体检项目列表
export function modifyZuhe (id, peItems) {
  return methods.put(`/api/baseinfo/group-items/${id}`, peItems, {authorize: true})
}

// 获取体检项目列表
export function getItems (data) {
  if (data) {
    return methods.get(`/api/baseinfo/items${helper.objToString(data)}&per_page=100000`, {authorize: true})
  }
  return methods.get('/api/baseinfo/items?filters=status:1&per_page=100000', {authorize: true})
}

// 获取样本类型列表
export function getSampleTypes () {
  return methods.get('/api/baseinfo/sample-types?per_page=100000&filters=status:1', {authorize: true})
}

// 获取收费类型列表
export function getChargeTypes () {
  return methods.get('/api/baseinfo/charge-categories?filters=status:1&per_page=100000', {authorize: true})
}

// 获取收费类型列表
export function getSurcharges () {
  return methods.get('/api/baseinfo/surcharges?filters=status:1&per_page=100000', {authorize: true})
}

// 添加组合项目
export function addPro (data) {
  return methods.post('/api/baseinfo/group-items', data, {authorize: true})
}

// 修改组合项目
export function editPeGroupItem (id, data) {
  return methods.put(`/api/baseinfo/group-items/${id}`, data, {authorize: true})
}
