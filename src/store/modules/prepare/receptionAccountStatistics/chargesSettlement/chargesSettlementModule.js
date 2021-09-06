/**
 * @author qf yhy wzd ljl
 * @time 2018/01/24/
 * @content 体检/美容/药品收费日月结算统计
 */

import * as types from './chargesSettlementTypes'
import api from '@/api'

const state = {
  examDailySettlement: {// 体检收费日结
  },
  examMonthSettlement: {// 体检收费月结
  },
  beautyDailySettlement: {// 美容收费日结
  },
  beautyMonthSettlement: {// 美容收费月结
  },
  drugDailySettlement: {// 药品收费日结
  },
  drugMonthSettlement: {// 药品收费月结
  },
}

const mutations = {
  [types.SET_BEAUTY_DAILY] (state, payload) {
    state.beautyDailySettlement = payload
  },
  [types.SET_BEAUTY_MONTH] (state, payload) {
    state.beautyMonthSettlement = payload
  },
  [types.SET_EXAM_DAILY] (state, payload) {
    state.examDailySettlement = payload
  },
  [types.SET_EXAM_MONTH] (state, payload) {
    state.examMonthSettlement = payload
  },
  [types.SET_DRUG_DAILY] (state, payload) {
    state.drugDailySettlement = payload
  },
  [types.SET_DRUG_MONTH] (state, payload) {
    state.drugMonthSettlement = payload
  },
}

const actions = {
  async getExamDailySettlement ({commit}, data) { // 获取体检日结
    let result = await api.chargesSettlement.getCharge(data)
    commit(types.SET_EXAM_DAILY, result)
  },
  async getExamMonthSettlement ({commit}, data) { // 获取体检月结
    let result = await api.chargesSettlement.getCharge(data)
    commit(types.SET_EXAM_MONTH, result)
  },
  async getBeautyDailySettlement ({commit}, data) { // 获取美容日结
    let result = await api.chargesSettlement.getCharge(data)
    commit(types.SET_BEAUTY_DAILY, result)
  },
  async getBeautyMonthSettlement ({commit}, data) { // 获取美容月结
    let result = await api.chargesSettlement.getCharge(data)
    commit(types.SET_BEAUTY_MONTH, result)
  },
  async getDrugDailySettlement ({commit}, data) { // 获取药品日结
    let result = await api.chargesSettlement.getCharge(data)
    commit(types.SET_DRUG_DAILY, result)
  },
  async getDrugMonthSettlement ({commit}, data) { // 获取药品月结
    let result = await api.chargesSettlement.getCharge(data)
    commit(types.SET_DRUG_MONTH, result)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  // getters,
}
