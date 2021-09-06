/**
 * Created wzd
 * Date: 2017/12/1/
 * Time: 21:33
 * content: 检查依据管理
 */
import method from '@/api/method'
import helper from '@/utils/helper'

// 获取检查依据管理
export function getInspectionBasisList (params) {
  return method.get(`api/baseinfo/occup-exam-basis${helper.objToString(params)}`, {authorize: true})
}
// 增加检查依据管理
export function addInspectionBasisList (params) {
  return method.post(`api/baseinfo/occup-exam-basis`, params, {authorize: true})
}

// 修改检查依据管理
export function updateInspectionBasisList (params) {
  return method.put(`api/baseinfo/occup-exam-basis/` + params.id, params, {authorize: true})
}

// 根据id删除检查依据管理
export function delInspectionBasisList (params) {
  return method.del(`api/baseinfo/occup-exam-basis${helper.objToString(params)}`, {authorize: true})
}
