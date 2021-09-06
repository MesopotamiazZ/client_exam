/**
 * Created 张祥
 * Date: 2017/12/1
 * content:体检套餐管理
 */
import * as types from './examComboTypes'
import api from '@/api'

const state = {
  examComboList: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  }, // 所有套餐列表
  examCategoryList: [],
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
  [types.SET_EXAMCATEGORY_LIST] (state, payload) {
    state.examCategoryList = payload
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
        total: 0,
        current_page: 1,
        per_page: 20,
      },
      items: [],
    }
  },
}

const actions = {
  async getExamComboList({commit}, data) {
    let result = await api.examCombo.getExamComboList(data)
    commit(types.SET_EXAMCOMBO_LIST, result)
  },
  async modifyExamCom({commit}, data) {
    await api.examCombo.modifyExamCom(data.id, data.data)
  },
  async addExamCom({commit}, data) {
    await api.examCombo.addExamCom(data)
  },
  // 获取体检类别列表
  async getExamCategoryList ({commit}, data) {
    let result = await api.examCombo.getExamCategoryList()
    commit(types.SET_EXAMCATEGORY_LIST, result.items)
  },
  // 获取体检单项类型列表
  async getPeItemTypes({commit}) {
    let result = await api.examCombo.getPeItemTypes()
    // console.log(result)
    commit(types.SET_PEITEM_TYPES, result.items)
  },
  // 获取全部组合
  async getAllPro({commit}, data) {
    let result = await api.examCombo.getAllPro(data)
    commit(types.SET_ALL_PRO, result.items)
  },
  async delExamCom({commit}, data) {
    await api.examCombo.delExamCom(data)
  },
  async getTotal({commit}, data) {
    let result = await api.examCombo.getExamComboList()
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
