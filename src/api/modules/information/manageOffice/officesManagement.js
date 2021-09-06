/**
  *综合管理办公室   诊室管理
  * @author 刘洋
  * @created 2017/1/27
  */

  import methods from '@/api/method'
  import helper from '@/utils/helper'

  // 获取所有诊室
  export function getExamComboList (data) {
    if (data) {
      return methods.get(`/api/baseinfo/diagnose_rooms${helper.objToString(data)}`, {authorize: true})
    }
    return methods.get(`/api/baseinfo/diagnose_rooms`, {authorize: true})
  }
  // 获取科室列表
  export function getAdministrativeOfficesManagement() {
    return methods.get(`api/baseinfo/depts?filters=status:1&per_page=100000`, {authorize: true})
  }
  // 获取排队机
  export function getlineUpMachines (params) {
  // get请求要将请求的参数放到url地址中
    return methods.get(`api/baseinfo/line-up-machines?filters=status:1&per_page=100000`, {authorize: true})
  }
  // 获取位置名称
  export function getFloor (params) {
    // get请求要将请求的参数放到url地址中
    return methods.get(`api/baseinfo/floors${helper.objToString(params)}`, {authorize: true})
  }

  // 获取体检类别
  export function getExamCategoryList (params) {
    return methods.get('api/baseinfo/pe-categories?filters=status:1&per_page=100000', {authorize: true})
  }

  // 获取全部组合
  export function getAllPro(data) {
    if (data) {
      return methods.get(`/api/baseinfo/group-items${helper.objToString(data)}&per_page=100000`, {authorize: true})
    }
    return methods.get('/api/baseinfo/group-items?filters=status:1&per_page=100000', {authorize: true})
  }

  // 获取套餐内的组合
  export function getProOfExamComboList (id) {
    return methods.get(`/api/baseinfo/diagnose_rooms/${id}/group-items`, {authorize: true})
  }

  // 修改诊室
  export function modifyExamCom (id, data) {
    return methods.put(`/api/baseinfo/diagnose_rooms/${id}`, data, {authorize: true})
  }

  // 添加诊室
  export function addExamCom (data) {
    return methods.post('/api/baseinfo/diagnose_rooms', data, {authorize: true})
  }

  // 删除诊室
  export function delExamCom (data) {
    return methods.del(`/api/baseinfo/diagnose_rooms${helper.objToString(data)}`, {authorize: true})
  }

  // 搜索
  export function searchExamCom (keyword) {
    return methods.get('/api/baseinfo/packages?key=' + keyword, {authorize: true})
  }

  // 获取体检项目列表
  export function getAllExamPro (id) {
    if (id) {
      return methods.get(`/api/baseinfo/items?type_id=${id}filters=status:1&per_page=100000`, {authorize: true})
    } else {
      return methods.get('/api/baseinfo/items?filters=status:1&per_page=100000', {authorize: true})
    }
  }

  // 修改组合项目,更改其包含的体检项目列表
  export function modifyZuhe (id, peItems) {
    return methods.put(`/api/baseinfo/group-items/${id}`, peItems, {authorize: true})
  }

  // 获取组合的详细信息
  export function getZuheInfo (id) {
    return methods.get(`/api/baseinfo/group-items/${id}/items`, {authorize: true})
  }

  // 获取科室列表
  export function getDepts() {
    return methods.get('/api/baseinfo/depts?filters=status:1&per_page=100000', { authorize: true })
  }

  // 获取体检单项类型列表
  export function getPeItemTypes() {
    return methods.get('/api/baseinfo/item-types?filters=status:1&per_page=100000', { authorize: true })
  }
