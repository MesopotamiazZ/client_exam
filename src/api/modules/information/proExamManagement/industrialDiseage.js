
import method from '@/api/method'
import helper from '@/utils/helper'
// 获取问诊列表
export function getIndustrialList(params) {
  // console.log('api')
  return method.get(`api/baseinfo/inquiries${helper.objToString(params)}`, {authorize: true})
}
// 新增问诊列表
export function addIndustrialState(params) {
  // console.log('api')
  return method.post(`api/baseinfo/inquiries`, params, {authorize: true})
}
