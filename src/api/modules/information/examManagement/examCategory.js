/**
 * Created 张祥
 * Date: 2018/01/19
 * content:体检类别管理
 */
import method from '@/api/method'
import helper from '@/utils/helper'

export function getExamCategoryList (params) { // 获取项目类别
  return method.get(`api/baseinfo/pe-categories${helper.objToString(params)}`, {authorize: true})
}

export function addExamCategoryList (params) { // 增加项目类别管理
  return method.post(`api/baseinfo/pe-categories`, params, {authorize: true})
}

export function updateExamCategoryList (params) { // 修改项目类别
  return method.put(`api/baseinfo/pe-categories/` + params.id, params.data, {authorize: true})
}
export function delExamCategoryList(params) {
  return method.del(`api/baseinfo/pe-categories${helper.objToString(params)}`, {authorize: true})
}
