/*
*检测项目列表(单个项目管理)
*@author 覃凤
*@date 2017/11/27
* */
import methods from '@/api/method'
import helper from '@/utils/helper'
import axios from '@/service/interceptor'

export function getLeftAll () { // 获取左侧所有数据
  return methods.get(`api/baseinfo/item-types?per_page=100000`, {authorize: true})
}

export function getRightList (data) { // 单个项目加载进入右侧数据
  return methods.get(`api/baseinfo/items${helper.objToString(data)}`, {authorize: true})
}
export function getRightAll (data) { // 单个项目加载进入右侧数据-获取总条数
  return methods.get(`api/baseinfo/items${helper.objToString(data)}`, {authorize: true})
}
export function getLeftLev3 (data) { // 二级对应三级的数据
  return methods.get(`api/baseinfo/items${helper.objToString(data)}&per_page=100000&filters=status:1`, {authorize: true})
}
export function getRightSingle (id) { // 左侧三级菜单选择右侧对应数据
  return methods.get(`api/baseinfo/items/` + id, {authorize: true})
}
export function getRightSingleDes (data) { // 左侧三级菜单选择右侧对应数据(描述型)
  // api/baseinfo/item-results?filters=item_id:256;is_abn:1
  return methods.get(`api/baseinfo/item-results${helper.objToString(data)}&per_page=100000`, {authorize: true})
}
export function getSingleResultAdd (id, data) { // 新增单项结果
  return methods.post(`api/baseinfo/item-results/`, data, {authorize: true})
}
export function getSingleResultEdit (id, data) { // 编辑单项结果
  return methods.put(`api/baseinfo/item-results/` + id, data, {authorize: true})
}
export function getSingleResultDel (id) { // 删除单项结果
  return methods.del(`api/baseinfo/item-results/${helper.objToString(id)}`, {authorize: true})
}

export function getSingleEdit (id, data) { // 编辑单个项目
  return methods.put(`api/baseinfo/items/` + id, data, {authorize: true})
}

export function getSingleAdd (data) { // 新增单个项目
  return methods.post(`api/baseinfo/items`, data, {authorize: true})
}

export function getSingleDelete (data) { // 删除项目
  return methods.del(`api/baseinfo/items${helper.objToString(data)}`, {authorize: true})
}
export function getOnExpand (data) { // 点击表格下拉请求
  return methods.get(`api/baseinfo/items/${data}/result`, {authorize: true})
}
export function getSingleItemType () { // 项目类别
  return methods.get(`api/baseinfo/item-types?per_page=100000`, {authorize: true})
}
export function getSinglePeCategories () { // 适用体检类别
  return methods.get(`api/baseinfo/pe-categories?per_page=100000`, {authorize: true})
}
export function getSingleDisAllReq () { // 适用体检类别，项目类别一起请求
  return axios.all([
    getSingleItemType(),  // 项目类别
    getSinglePeCategories(), // 体检类别
  ])
}
export function getRadioChange (params) { // 展开项radio改变
  return methods.put(`api/baseinfo/items/${params.id}/default-result`, params.data, {authorize: true})
}
export function initReq (data) { // 批量请求加载进入时左侧和右侧所有数据（获得sort）
  return axios.all([
    getLeftAll(),
    getRightAll({'per_page': 100000, 'status': ''}), // 右侧所有，获得sort
  ])
}
export function reqLev3Single () { // 批量请求删除三级菜单
  return axios.all([
    getLeftAll(),
  ])
}
