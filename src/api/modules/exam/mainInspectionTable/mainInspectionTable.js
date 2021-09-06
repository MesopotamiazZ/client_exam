import method from '@/api/method'
import helper from '@/utils/helper'
// 新增加主检
export function projectPost (pid) {
  return method.post(`api/baseinfo/occup-diseases`, pid, {authorize: true})
}
// 获取一条数据
export function projectGet (key) {
  return method.get(`/api/examine/pe-results/group${helper.objToString(key)}`, {authorize: true})
}
// 修改一条数据
export function changAddPut(pid) {
  return method.put(`/api/examine/pe-results/${pid.id}`, pid, {authorize: true})
}
// 获取基本信息
export function projectGetBasic (key) {
  console.log(key, '1')
  return method.get(`/api/examine/pe-results/` + key + `/show`, {authorize: true})
}

// 获取已选项目
export function projectHasChosen (key) {
  return method.get(`/api/examine/pe-results/group`, {authorize: true})
}
// 获取可/已主检患者列表
export function projectHasChecked (key) {
  return method.get(`/api/examine/pe-results/patient`, {authorize: true})
}

export function deptsGet (id) {
  return method.get(`/api/examine/pe-depts/${id}`, {authorize: true})
}
export function waitingAndComplete (doctorId) {
  return method.get(`/api/examine/pe-results/patient/${doctorId}`, {authorize: true})
}
export function diagnoseInfo (id) {
  return method.get(`/api/examine/pe-results/?pe_id=${id}&code=2`, {authorize: true})
}
export function sourceInfo (id) {
  return method.get('/api/examine/pe-results/source-group/' + id, {authorize: true})
}
