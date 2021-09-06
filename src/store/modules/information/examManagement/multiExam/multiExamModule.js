/**
  * Created 张祥
  * Date: 2017/12/1
  * content:组合项目管理
  */
import * as types from './multiExamTypes'
import api from '@/api'

const state = {
  proTypes: [], // 体检项目类型列表
  proTypesUsefor: [], // 状态为1的类型
  allPros: [], // 全部组合项目列表
  // 表格中的组合项目列表
  pros: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  itemInPro: [], // 组合项目中的体检项目
  items: [], // 全部项目列表
  proInfo: {}, // 选中的组合的信息
  sampleTypes: [], // 采样类型列表
  chargeTypes: [], // 收费类型列表
  surcharges: [], // 附加费
  total: 0, // 组合项目的总数
}

const mutations = {
  [types.SET_PROTYPES] (state, payload) {
    state.proTypes = payload
  },
  [types.SET_PROTYPES_USEFOR] (state, payload) {
    state.proTypesUsefor = payload
  },
  [types.SET_ALL_PROS] (state, payload) {
    state.allPros = payload
  },
  [types.SET_TOTAL] (state, payload) {
    state.total = payload
  },
  [types.SET_PROS] (state, payload) {
    state.pros = payload
  },
  [types.RESET] (state, payload) {
    state.pros = {
      meta: {
        total: 0,
        current_page: 1,
        per_page: 20,
      },
      items: [],
    }
  },
  // ===============
  [types.SET_ITEMS] (state, payload) {
    state.items = payload
  },
  [types.SET_PRO_INFO] (state, payload) {
    state.proInfo = payload
  },
  [types.SET_SAMPLE_TYPES] (state, payload) {
    state.sampleTypes = payload
  },
  [types.SET_CHARGE_TYPES] (state, payload) {
    state.chargeTypes = payload
  },
  [types.SET_SURCHARGES](state, payload) {
    state.surcharges = payload
  },
}

const actions = {
  // 获取全部项目类别
  async getProTypes({commit}, data) {
    let result = await api.multiExam.getProTypes(data)
    commit(types.SET_PROTYPES, result.items)
  },
  async getProTypesUsefor({commit}, data) {
    let result = await api.multiExam.getProTypes(data)
    commit(types.SET_PROTYPES_USEFOR, result.items)
  },
  // 获取组合项目
  async getPros({commit}, data) {
    let result = await api.multiExam.getPros(data)
    commit(types.SET_PROS, result)
  },
  async getAllPros({commit}, data) {
    let result = await api.multiExam.getPros(data)
    commit(types.SET_ALL_PROS, result)
  },
  // ===============
  // 获取全部的的体检单项
  async getItems ({commit}, data) {
    let result = await api.multiExam.getItems(data)
    commit(types.SET_ITEMS, result.items)
  },
  // 获取某个组合的信息
  async getProInfo ({commit}, id) {
    let result = await api.multiExam.getProInfo(id)
    commit(types.SET_PRO_INFO, result)
  },
  // 获取样本类型列表
  async getSampleTypes ({commit}, id) {
    let result = await api.multiExam.getSampleTypes(id)
    commit(types.SET_SAMPLE_TYPES, result.items)
  },
  // 获取收费类型列表
  async getChargeTypes ({commit}, data) {
    let result = await api.multiExam.getChargeTypes(data)
    commit(types.SET_CHARGE_TYPES, result.items)
  },
  // 获取附加收费列表
  async getSurcharges({commit}, data) {
    let result = await api.multiExam.getSurcharges()
    commit(types.SET_SURCHARGES, result.items)
  },
  // 添加组合项目
  async addPro ({commit}, data) {
    await api.multiExam.addPro(data)
  },
  // 修改组合项目
  async editPeGroupItem ({commit}, data) {
    await api.multiExam.editPeGroupItem(data.id, data.data)
  },
  // 删除组合项目
  async delPro({commit}, data) {
    await api.multiExam.delPro(data)
  },
  // 获取组合项目数量
  async getTotal({commit}, data) {
    let result = await api.multiExam.getPros(data)
    commit(types.SET_TOTAL, result.meta.total)
  },
}

const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
