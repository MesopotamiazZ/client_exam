/**
 * Created liuyang
 * Date: 2017/12/2/
 * Time: 19:20
 * content: 问诊请求
 */
import method from '@/api/method'
import helper from '@/utils/helper'
// 获取问诊列表
export function getIndustrialList(p) {
  return method.get(`api/baseinfo/inquiries${helper.objToString(p)}`, {authorize: true})
}

// 新增问诊列表
export function addIndustrialState(params) {
  return method.post(`api/baseinfo/inquiries`, params, {authorize: true})
}
// 修改问诊列表
export function updateIndustrialState(params) {
  return method.put(`api/baseinfo/inquiries/` + params.id, params.data, {authorize: true})
}
// 删除问诊列表
export function deleteIndustrialState(params) {
  return method.del(`api/baseinfo/inquiries${helper.objToString(params)}`, {authorize: true})
}
