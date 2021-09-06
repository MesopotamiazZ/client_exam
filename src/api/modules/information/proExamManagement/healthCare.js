/**
 * Created jiangyiling
 * Date: 2018/1/26/
 * Time: 19:20
 * content: 职业健康检查种类管理
 */
import method from '@/api/method'
import helper from '@/utils/helper'
export function getList(p) {
  return method.get(`api/baseinfo/occup-health-care-stds${helper.objToString(p)}`, {authorize: true})
}
export function getOccHealthExamTypeList(p) {
  return method.get(`api/baseinfo/occup-health-examination-types${helper.objToString(p)}`, {authorize: true})
}
export function getOccHazardCategoryList(p) {
  return method.get(`api/baseinfo/occup-harm-types${helper.objToString(p)}`, {authorize: true})
}
export function getOccHazardCategoryFactorList(p) {
  return method.get(`api/baseinfo/occup-harm-factors${helper.objToString(p)}`, {authorize: true})
}
export function getOccpDiseasesList(p) {
  return method.get(`api/baseinfo/occup-diseases${helper.objToString(p)}`, {authorize: true})
}
export function getInspectionList(p) {
  return method.get(`api/baseinfo/occup-exam-basis${helper.objToString(p)}`, {authorize: true})
}
export function getContraindicationList(p) {
  return method.get(`api/baseinfo/occup-taboos${helper.objToString(p)}`, {authorize: true})
}
export function getInquiryProjectsList(p) {
  return method.get(`api/baseinfo/inquiries${helper.objToString(p)}`, {authorize: true})
}
export function getItemClassList(p) {
  return method.get(`api/baseinfo/item-types${helper.objToString(p)}`, {authorize: true})
}
export function getGroupItemsList(p) {
  return method.get(`api/baseinfo/group-items${helper.objToString(p)}`, {authorize: true})
}
export function addNewItem(params) { // 新增条目
  return method.post(`api/baseinfo/occup-health-care-stds`, params, {authorize: true})
}
export function deletItem (params) { // 删除条目
  return method.del(`api/baseinfo/occup-health-care-stds${helper.objToString(params)}`, {authorize: true})
}
export function amendItem(params) {
  return method.put(`api/baseinfo/occup-health-care-stds/${params.id}`, params.params, {authorize: true})
}
/* export function addNewItem(params) {
  return method.post(`api/baseinfo/occup-harm-types`, params, {authorize: true})
}
export function amendItem(params) {
  return method.put(`api/baseinfo/occup-harm-types/${params.id}`, params.params, {authorize: true})
}
export function deletItem (params) {
  // console.log(helper.objToString(params))
  return method.del(`api/baseinfo/occup-harm-types${helper.objToString(params)}`, {authorize: true})
} */

/* import methods from '@/api/method'
import helper from '@/utils/helper'
import axios from '@/service/interceptor'

export function getTableInit (data) { // 加载表格数据
  return methods.get(`api/baseinfo/occup-health-care-stds${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function getAllSort (data) { // 加载表格数据所有数据
  return methods.get(`api/baseinfo/occup-health-care-stds${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function getHarmTypes (data) { // 职业危害类别下拉
  return methods.get(`api/baseinfo/occup-harm-types${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function getPeTypes (data) { // 体检类别下拉
  return methods.get(`api/baseinfo/occup-pe-types${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function getHarmFactors (data) { // 危害因素下拉
  return methods.get(`api/baseinfo/occup-harm-factors${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function postHarmInfosFun (data) { // 新增职业健康监护 调整后
  return methods.post(`api/baseinfo/occup-health-care-stds`, data, {authorize: true})
}

export function getOccupaDiseaseFun (data) { // 职业病
  return methods.get(`api/baseinfo/occup-disease-types${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function getIdOccDiseaseFun (data) { // 通过id获取职业病
  return methods.get(`api/baseinfo/occup-diseases${helper.objToString(data)}&per_page=100000&filters=status:1`, {authorize: true})
}

export function getOccupaTaboos (data) { // 职业禁忌
  return methods.get(`api/baseinfo/occup-taboos${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function getItemTypesFun (data) { // 检查项目下拉
  return methods.get(`api/baseinfo/item-types${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function getGroupItemsFun (data) { // 检查项目下拉筛选组合项目名称
  return methods.get(`api/baseinfo/group-items${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function getIdInterrogation (data) { // 获取问诊项目
  return methods.get(`api/baseinfo/inquiries${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function getIdBasis (data) { // 获取依据标准
  return methods.get(`api/baseinfo/occup-exam-basis${helper.objToString(data)}&filters=status:1`, {authorize: true})
}

export function putEditFun (id, data) { // 提交修改数据
  return methods.put(`api/baseinfo/occup-health-care-stds/${id}`, data, {authorize: true})
}

export function delDataFun (data) { // 删除数据
  return methods.del(`api/baseinfo/occup-health-care-stds${helper.objToString(data)}`, {authorize: true})
}

export function getNumsReq (data) {
  return axios.all([
    getHarmTypes(data.harmType), // 危害类别
    getPeTypes(data.peType), // 体检类别
    getIdBasis(data.idBasis), // 依据标准
    getIdInterrogation(data.interrogaData), // 职业问诊
    getItemTypesFun(data.itemType), // 检查项目
    getGroupItemsFun(data.itemTypeAll), // 初始请求所有的检查项目
    getOccupaDiseaseFun(data.occupaDisease), // 请求职业病
    getIdOccDiseaseFun(data.occupSelectData), // 职业病初始加载所有数据
    getOccupaTaboos(data.occupaTaboos), // 职业禁忌
  ])
}
 */
