/**
* @author 覃凤
* @date 2018/03/6
* @content 表格导入备单
*/
import methods from '@/api/method'
import helper from '@/utils/helper'
export function getPhysicalExaminatio () { // 适用体检类别
  return methods.get(`api/baseinfo/pe-categories?per_page=100000`, {authorize: true})
}
export function getUnitAllOrder (id) { // 获取单位所有订单
  return methods.get(`api/examine2/unit-order/${id}?per_page=100000`, {authorize: true})
}
export function postReadExcel (data) { // excel读取单位预约
  return methods.post(`api/examine/unit-appts`, data, {authorize: true})
}
export function getPagingExcelData (data) { // 获取excel表格分页数据
  return methods.get(`api/examine/unit-appts/prep?${helper.objToString(data)}`, {authorize: true})
}
