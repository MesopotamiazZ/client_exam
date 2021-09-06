import methods from '@/api/method'
import helper from '@/utils/helper'

// 获取职业危害类别列表
export function getHarmCategory (params) {
  let data = {
    size: 0,
    status: 1,
  }
  Object.assign(data, params)
  return methods.get(`/api/baseinfo/occup-harm-types${helper.objToString(data)}`, {authorize: true})
}

// 获取职业危害类别列表
export function getHarmCategoryTwo (params) {
  return methods.get(`/api/baseinfo/occup-harm-types${helper.objToString(params)}`, {authorize: true})
}

// 添加职业危害类别
export function addHarmCategory (params) {
  return methods.post(`/api/baseinfo/occup-harm-types`, params, {authorize: true})
}

// 修改职业危害类别
export function editHarmCategory (params) {
  return methods.put(`/api/baseinfo/occup-harm-types/${params.id}`, params.data, {authorize: true})
}

// 删除职业危害类别
export function deleteHarmCategory (params) {
  return methods.del(`/api/baseinfo/occup-harm-types${helper.objToString(params)}`, {authorize: true})
}

// 获取职业危害因素列表
export function getHarmFactor (params) {
  return methods.get(`/api/baseinfo/occup-harm-factors${helper.objToString(params)}`, {authorize: true})
}

// 获取职业危害因素列表sort
export function getHarmFactorSort () {
  let data = {
    size: 0,
  }
  return methods.get(`/api/baseinfo/occup-harm-factors${helper.objToString(data)}`, {authorize: true})
}

// 添加职业危害因素列表
export function addHarmFactor (params) {
  return methods.post(`/api/baseinfo/occup-harm-factors`, params, {authorize: true})
}

// 修改职业危害因素列表
export function editHarmFactor (params) {
  return methods.put(`/api/baseinfo/occup-harm-factors/${params.id}`, params.data, {authorize: true})
}

// 删除职业危害因素列表
export function deleteHarmFactor (params) {
  return methods.del(`/api/baseinfo/occup-harm-factors${helper.objToString(params)}`, {authorize: true})
}

