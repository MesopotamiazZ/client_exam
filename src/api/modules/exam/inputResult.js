import method from '@/api/method'
import helper from '@/utils/helper'
// 其他科室可见
export function forOtherOfficeToSeeGet (key) {
  return method.get(`/api/examine/pe-results/group${helper.objToString(key)}`, {authorize: true})
}

//  获取病人当前科室检查结果
export function getSilkCurrentOfficeResultGet(id) {
  return method.get(`/api/examine/pe-depts${helper.objToString(id)}`, {authorize: true})
}

// 新增科室检查记录
export function addOfficeExamRecordsPost(obj) {
  return method.post(`/api/examine/pe-depts`, obj, {authorize: true})
}

// 修改科室检查记录
export function modifyOfficeExamRecords(obj) {
  return method.put(`/api/examine/pe-depts/${obj.id}`, obj, {authorize: true})
}

// 根据体检号查询该用户基本信息
export function getUserBasicInfoByCheckupNumber(id) {
  return method.get(`/api/examine/physical-examines/${id}/detail`, {authorize: true})
}

// 新增临床诊断 - 诊断类别选择后得到疾病类型
export function getDiagnoseTypes(type) {
  return method.get(`/api/baseinfo/${type}`, {authorize: true})
}

// 疾病类型得到疾病 - 疾病(或异常)
export function getDeseases(id) {
  return method.get(`/api/baseinfo/occup-diseases?disease_type_id=${id}`, {authorize: true})
}

// 疾病类型得到疾病 - 职业病
export function getOccupDisease(id) {
  return method.get(`/api/baseinfo/disease-abns?type_id=${id}`, {authorize: true})
}

// -------------- 2018.2.24------------------
// 获取科室信息
export function getDeptInfo (doctorId) {
  return method.get(`/api/baseinfo/staffs/${doctorId}`, {authorize: true})
}

// -------------- 2018.2.27------------------
// 获取粉尘胸片参数
export function getDustChestParams() {
  return method.get(`/api/baseinfo/dust-chests`, {authorize: true})
}
// 获取听阈修正值
export function getAuditoryThresholdCorrection(obj) {
  return method.post(`/api/examine/pe-depts/correct`, obj, {authorize: true})
}

// --------------- 2018.3.2 -----------------
// 获取所有问诊症状
// export function getBasicInfoInqueries(id) {
//   return method.get(`/api/examine2/inquiries?pe_sn=${id}`, {authorize: true})
// }

// --------------- 2018.3.7 -----------------
// 获取体检组合项目信息
// export function getPatientGroupItemsInfoById(id) {
//   return method.get(`/api/examine2/get-pe-groups/${id}`, {authorize: true})
// }

// 获取病人个人信息
export function getPatientBasicInfoById(id) {
  return method.get(`/api/examine2/get-pe-meta/${id}`, {authorize: true})
}

// --------------- 2018.3.8 -----------------
// 当前科室待检病人列表
// export function currentOfficeWillExamGet(officeId) {
//   return method.get(`/api/examine/pe-depts/dept-patient/${officeId}`, {authorize: true})
//   // return method.get(`/api/examine/pe-depts/` + officeId + `/dept-patient`, {authorize: true})
// }

// --------------- 2018.3.12 -----------------
// 当前科室待检病人列表
export function currentOfficeWillExamGet(officeId) {
  return method.get(`/api/examine/pe-depts/dept-patient?dept_ids=${officeId}`, {authorize: true})
}
// 获取待检组合项目列表
export function getPatientWaitingGroupItemsInfoById(id) {
  return method.get(`/api/examine/pe-depts/pe-wait-groupItem/${id}`, {authorize: true})
}

// --------------- 2018.3.14 -----------------
// 获取所有问诊症状
export function getBasicInfoInqueries(id) {
  return method.get(`/api/examine/pe-inquiry?pe_sn=${id}`, {authorize: true})
}

// --------------- 2018.3.20 -----------------
// 获取体检组合项目信息
export function getPatientGroupItemsInfoById(id, deptId) {
  return method.get(`/api/examine2/get-pe-groups/${id}?dept_ids=${deptId}`, {authorize: true})
}

// 获取检查所见参考结果
export function getReferenceResultBySingleId(id, sex, category) {
  return method.get(`/api/baseinfo/item-results?filters=item_id:${id};status:1;sex:${sex};pe_categories:${category}&fields=item_id,see,result&per_page=100000`, {authorize: true})
}
