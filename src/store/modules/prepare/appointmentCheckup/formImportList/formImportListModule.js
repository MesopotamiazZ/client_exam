/*
* 表格导入备单
*@author 覃凤
*@date 2018/3/6
* */
import * as types from './formImportListTypes'
import api from '@/api'
const state = {
  getPhysicalExaminatioData: {}, // 体检类别
}

const mutations = {
  [types.SET_PHYSICAL_EXAMINATION] (state, payload) { // 体检类别
    state.getPhysicalExaminatioData = payload
  },
}

const actions = {
  async getPhysicalExaminatio ({commit}, data) { // 获取体检类别
    let result = await api.formImportList.getPhysicalExaminatio(data)
    commit(types.SET_PHYSICAL_EXAMINATION, result)
  },
  async getUnitAllOrder({commit}, data) { // 获取单位所有订单
    // console.log(await api.formImportList.getUnitAllOrder(data))
    return await api.formImportList.getUnitAllOrder(data)
    // commit(types.SET_PHYSICAL_EXAMINATION, result)
  },
  async postReadExcel({commit}, data) { // excel读取单位预约
    return await api.formImportList.postReadExcel(data)
  },
  async getPagingExcelData({commit}, data) { // 获取excel表格分页数据
    return await api.formImportList.getPagingExcelData(data)
  },
}

const getters = {
  getPhysicalExaminatioData: (state) => {
    return state.getPhysicalExaminatioData.items.map((val) => {
      return {
        value: val.id,
        label: val.name,
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
