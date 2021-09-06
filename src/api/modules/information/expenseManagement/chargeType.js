/*
* 收费类型管理
* @author 刘佳莉
* @date 2017/11/30
*/

import method from '@/api/method'
import helper from '@/utils/helper'

// 获取职业体检类别
export function getProExamTypes (params) {
  return method.get(`api/baseinfo/charge-categories${helper.objToString(params)}`, {authorize: true})
}

// 创建职业体检类别
export function createProExamType (params) {
  return method.post('api/baseinfo/charge-categories', params, {authorize: true})
}

// 编辑职业体检类别
export function editProExamType (params) {
  return method.put(`api/baseinfo/charge-categories/${params.id}`, params.params, {authorize: true})
}

// 删除职业体检类别
export function delProExamTypes (params) {
  return method.del(`api/baseinfo/charge-categories${helper.objToString(params)}`, {authorize: true})
}
