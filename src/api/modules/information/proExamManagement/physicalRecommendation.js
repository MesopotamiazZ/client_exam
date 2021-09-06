/*
* 职业体检建议
* @author 刘洋
* @date 2018/1/29
*/

import method from '@/api/method'
import helper from '@/utils/helper'

// 获取职业体检建议
export function getTemplateTable (p) {
  return method.get(`api/baseinfo/occup-pe-advices${helper.objToString(p)}`, {authorize: true})
}
// 修改职业体检建议
export function editTemplate(params) {
  return method.put(`api/baseinfo/occup-pe-advices/` + params.id, params.data, {authorize: true})
}
// 添加职业体检建议
export function addTemplate (params) {
  return method.post(`api/baseinfo/occup-pe-advices`, params, {authorize: true})
}
// 添加模板 - 体检种类
export function TypeTemplateResult (p) {
  return method.get(`api/baseinfo/occup-health-examination-types${helper.objToString(p)}`, {authorize: true})
}
// 删除职业体检建议
export function delTemplate (params) {
  return method.del(`api/baseinfo/occup-pe-advices${helper.objToString(params)}`, {authorize: true})
}

