/**
 * Created 张祥
 * Date: 2018/03/05
 * content:医学主检结论管理
 */
import method from '@/api/method'
import helper from '@/utils/helper'

export function getExamCategoryList (params) { // 获取项目类别
  return method.get(`api/baseinfo/pe-categories${helper.objToString(params)}`, {authorize: true})
}

export function getConclusionList (params) {
  return method.get(`api/baseinfo/main-conclusions${helper.objToString(params)}`, {authorize: true})
}

export function addConclusion (params) {
  return method.post(`api/baseinfo/main-conclusions`, params, {authorize: true})
}

export function updateConclusion (params) {
  return method.put(`api/baseinfo/main-conclusions/` + params.id, params.data, {authorize: true})
}
export function delConclusion(params) {
  return method.del(`api/baseinfo/main-conclusions${helper.objToString(params)}`, {authorize: true})
}
