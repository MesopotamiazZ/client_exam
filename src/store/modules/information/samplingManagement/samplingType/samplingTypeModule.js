/**
 * Created yhy
 * Date: 2017/11/28/
 * Time: 09:20
 * content:采样类型管理 样本类型
 */
import * as types from './samplingTypeTypes'
import api from '@/api'
const state = {
  samplingTypeList: {
    meta: {
      total: 54, current_page: 1, per_page: 20,
    },
    items: [],
  },
  proOfExamComboList: [], // 套餐内项目列表
  allExamProList: [], // 全部项目列表
  zuheInfo: [], // 选中的组合的信息
  allDepts: [], // 全部科室
  allPro: [], // 全部组合
  allPeItemType: [], // 体检单项类型列表
  total: 0,
}

const mutations = {
  [types.SET_SAMPLE_TYPES](state, payload) {
    state.samplingTypeList = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.SET_SAMPLINGS_TATUS](state, payload) {
    state.setSamplingstatus = payload
  },
  [types.SET_ALL_PRO](state, payload) {
    state.allPro = payload
  },
  [types.SET_PEITEM_TYPES](state, payload) {
    state.allPeItemType = payload
  },
  setSamplingTypeListSort(state, payload) {
    state.samplingTypeListSort = payload
  },
  resetPageInfo(state, payload) {
    state.samplingTypeList = {
      meta: {
        total: 54, current_page: 1, per_page: 20,
      },
      items: [],
    }
  },
  [types.RESET](state, payload) {
    state.samplingTypeList = {
      meta: {
        total: 54, current_page: 1, per_page: 20,
      },
      items: [],
    }
  },
}

const actions = {
  async getSamplingTypeListSort({commit}) {
    let result = await api.samplingType.getSamplingTypeListSort()
    commit('setSamplingTypeListSort', result.meta.total)
  },
  async getSamplingTypeList({commit}, params) {
    let result = await api.samplingType.getSamplingTypeList(params)
    commit(types.SET_SAMPLE_TYPES, result)
  },
  async addSamplingTypeList({commit}, data) {
    await api.samplingType.addSamplingTypeList(data)
  },
  async editSamplingTypeList({commit}, params) {
    // console.log(111, params)
    await api.samplingType.editSamplingTypeList(params)
  },
  async [types.SEARCH_SAMPLE_TYPES]({commit}, params) {
    await api.samplingType.searchSamplingTypeList(params)
  },
  async deleteSamplingTypeList({commit}, params) {
    await api.samplingType.deleteSamplingTypeList(params)
  },
  async [types.GET_SAMPLINGS_TATUS]({commit}) {
    await api.samplingType.getSamplingStatus()
  },
  async getTotal({commit}, data) {
    let result = await api.samplingType.getSamplingTypeList({size: 0})
    commit(types.SET_TOTAL, result.meta.total)
  },
  // 获取全部组合
  async getAllPro({commit}, data) {
    let result = await api.samplingType.getAllPro(data)
    // console.log(result)
    commit(types.SET_ALL_PRO, result.items)
  },
  // 获取体检单项类型列表
  async getPeItemTypes({commit}) {
    let result = await api.samplingType.getPeItemTypes()
    // console.log(result)
    commit(types.SET_PEITEM_TYPES, result.items)
  },
  async delExamCom({commit}, data) {
    await api.samplingType.delExamCom(data)
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
