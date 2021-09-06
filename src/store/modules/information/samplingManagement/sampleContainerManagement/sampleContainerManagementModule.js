/**
  * content:采样管理   标本容量管理
  * @author 刘洋
  * @created 2018/1/26
  **/
import * as types from './sampleContainerManagementTypes'
import api from '@/api'

const state = {
  examComboList: {
    meta: {
      current_page: 1,
      per_page: 20,
      total: 123,
    },
    items: [],
  }, // 所有套餐列表
  proOfExamComboList: [], // 套餐内项目列表
  allExamProList: [], // 全部项目列表
  zuheInfo: [], // 选中的组合的信息
  allDepts: [], // 全部科室
  allPro: [], // 全部组合
  allPeItemType: [], // 体检单项类型列表
  total: 0,
}

const mutations = {
  [types.SET_EXAMCOMBO_LIST](state, payload) {
    state.examComboList = payload
  },
  [types.SET_PRO_OF_EXAMCOMBO_LIST](state, payload) {
    state.proOfExamComboList = payload
  },
  [types.SET_ALL_EXAMPRO](state, payload) {
    state.allExamProList = payload
  },
  [types.SET_ZUHE_INFO](state, payload) {
    state.zuheInfo = payload
  },
  [types.SET_ALL_PRO](state, payload) {
    state.allPro = payload
  },
  [types.SET_PEITEM_TYPES](state, payload) {
    state.allPeItemType = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.RESET](state, payload) {
    state.examComboList = {
      meta: {
        current_page: 1,
        per_page: 20,
        total: 123,
      },
      items: [],
    }
  },
}

const actions = {
  async getExamComboList({commit}, data) {
    let result = await api.sampleContainerManagement.getExamComboList(data)
    commit(types.SET_EXAMCOMBO_LIST, result)
  },
  async modifyExamCom({commit}, data) {
    await api.sampleContainerManagement.modifyExamCom(data.id, data.data)
  },
  async addExamCom({commit}, data) {
    await api.sampleContainerManagement.addExamCom(data)
  },
  // 获取全部组合
  async getAllPro({commit}, data) {
    let result = await api.sampleContainerManagement.getAllPro(data)
    // console.log(result)
    commit(types.SET_ALL_PRO, result.items)
  },
  // 获取体检单项类型列表
  async getPeItemTypes({commit}) {
    let result = await api.sampleContainerManagement.getPeItemTypes()
    // console.log(result)
    commit(types.SET_PEITEM_TYPES, result.items)
  },
  async delExamCom({commit}, data) {
    await api.sampleContainerManagement.delExamCom(data)
  },
  async getTotal({commit}, data) {
    let result = await api.sampleContainerManagement.getExamComboList({size: 0})
    commit(types.SET_TOTAL, result.meta.total)
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
