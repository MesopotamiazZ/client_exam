/*
*
* @author 黄伟
* @date 2017/12/15
*/
import * as types from './healthRecordTypes'
import api from '@/api'

const state = {
  getList: {
    meta: {
      total: 0,
      page: 1,
      page_size: 20,
    },
    items: [],
  },
  basicInformation: {},
}

const mutations = {
  async [types.SET_DATA_TYPES] (state, payload) { // 合并数据
    state.basicInformation = payload
  },
}

const actions = {
  // 基础信息
  async basicInformationGet ({commit}, param = {}) {
    let result
    result = await api.healthRecord.basicInformationGet(param.id, param.key)
    if (!param.key) commit(types.SET_DATA_TYPES, result)
    return result
  },
  // 基础信息
  async basicInformationPut ({commit}, key) {
    let result
    result = await api.healthRecord.basicInformationPut(key)
    return result
  },
  async personalLifeHistoryPut ({commit}, key) {
    let result
    result = await api.healthRecord.personalLifeHistoryPut(key)
    return result
  },
  async personalLifeEnvironsPut ({commit}, key) {
    let result
    result = await api.healthRecord.personalLifeEnvironsPut(key)
    return result
  },
  async menstruationPut ({commit}, key) {
    let result
    result = await api.healthRecord.menstruationPut(key)
    return result
  },
  async diseaseGet ({commit}, key) {
    let result
    result = await api.healthRecord.diseaseGet(key)
    return result
  },
  // 获取疾病史的下拉选择框
  async medicalGet ({commit}, key) {
    let result
    result = await api.healthRecord.medicalGet(key)
    return result
  },
  // 疾病史
  async previousPost ({commit}, key) {
    let result
    result = await api.healthRecord.previousPost(key)
    return result
  },
  // 遗传病史
  async geneticDiseasePost ({commit}, key) {
    let result
    result = await api.healthRecord.geneticDiseasePost(key)
    return result
  },
  // 家族史
  async familyPost ({commit}, key) {
    let result
    result = await api.healthRecord.familyPost(key)
    return result
  },
  // 婚姻史
  async marriagePost ({commit}, key) {
    let result
    result = await api.healthRecord.marriagePost(key)
    return result
  },
  // 获取照射源
  async irradiationGet ({commit}, key) {
    let result
    result = await api.healthRecord.irradiationGet(key)
    return result
  },
  // 多条件查询
  async irradiationNameGet ({commit}, key) {
    let result
    result = await api.healthRecord.irradiationNameGet(key)
    return result
  },
  // 放射源POST
  async irradiationPost ({commit}, key) {
    let result
    result = await api.healthRecord.irradiationPost(key)
    return result
  },
  // 放射源Put
  async irradiationPut ({commit}, key) {
    let result
    result = await api.healthRecord.irradiationPut(key)
    return result
  },
  // 放射源del
  async irradiationDel ({commit}, key) {
    let result
    result = await api.healthRecord.irradiationDel(key)
    return result
  },
  // 工种下拉框
  async craftGet ({commit}, key) {
    let result
    result = await api.healthRecord.craftGet(key)
    return result
  },
  // 危害因素
  async harmGet ({commit}, key) {
    let result
    result = await api.healthRecord.harmGet(key)
    return result
  },
  // 危害因素
  async harmWithGet ({commit}, key) {
    let result
    result = await api.healthRecord.harmWithGet(key)
    return result
  },
  // 职业史提交
  async occupationalPost ({commit}, key) {
    let result
    result = await api.healthRecord.occupationalPost(key)
    return result
  },
  // 根据ID 找数据
  async harmWithNameGet ({commit}, key) {
    let result
    result = await api.healthRecord.harmWithNameGet(key)
    return result
  },
  // 修改
  async occupationalPut ({commit}, key) {
    let result
    result = await api.healthRecord.occupationalPut(key)
    return result
  },
  // 删除职业史
  async occupationalDel ({commit}, key) {
    let result
    result = await api.healthRecord.occupationalDel(key)
    return result
  },
  // 添加POSt
  async birthPost ({commit}, key) {
    let result
    result = await api.healthRecord.birthPost(key)
    return result
  },

}

const getters = {
  getBasicInformation: (state) => {
    return state.basicInformation
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

