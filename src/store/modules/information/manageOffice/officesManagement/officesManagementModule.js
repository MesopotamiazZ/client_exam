/**
  *综合管理办公室   诊断管理
  * @author 刘洋
  * @created 2017/1/27
  */
import * as types from './officesManagementTypes'
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
  getAdministrativeOfficesManagements: [], // 所有科室列表
  getlineUpMachine: [], // 所有排队机列表
  getFloors: [], // 获取位置
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
  [types.SET_ADMINISTRATIVE](state, payload) {
    state.getAdministrativeOfficesManagements = payload
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
  [types.SET_FLOOR](state, payload) {
    state.getFloors = payload
  },
  [types.SET_LIBE_UP_MACHINES](state, payload) {
    state.getlineUpMachine = payload
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
    let result = await api.officesManagement.getExamComboList(data)
    commit(types.SET_EXAMCOMBO_LIST, result)
  },
  async modifyExamCom({commit}, data) {
    await api.officesManagement.modifyExamCom(data.id, data.data)
  },
  async addExamCom({commit}, data) {
    await api.officesManagement.addExamCom(data)
  },
  // 获取体检类别列表
  async getExamCategoryList ({commit}, data) {
    let result = await api.officesManagement.getExamCategoryList()
    commit(types.SET_EXAMCATEGORY_LIST, result.items)
  },
  // 获取体检单项类型列表
  async getPeItemTypes({commit}) {
    let result = await api.officesManagement.getPeItemTypes()
    // console.log(result)
    commit(types.SET_PEITEM_TYPES, result.items)
  },
  // 获取全部组合
  async getAllPro({commit}, data) {
    let result = await api.officesManagement.getAllPro(data)
    commit(types.SET_ALL_PRO, result.items)
  },

   // 所有排队机
  async getlineUpMachines({commit}, data) {
    let result = await api.officesManagement.getlineUpMachines(data)
    commit(types.SET_LIBE_UP_MACHINES, result.items)
  },
  // 所有科室
  async getAdministrativeOfficesManagement({commit}, data) {
    let result = await api.officesManagement.getAdministrativeOfficesManagement(data)
    commit(types.SET_ADMINISTRATIVE, result.items)
  },
  // 所有位置名称
  async getFloor({commit}, data) {
    let result = await api.officesManagement.getFloor(data)
    commit(types.SET_FLOOR, result.items)
  },
  async delExamCom({commit}, data) {
    await api.officesManagement.delExamCom(data)
  },
  async getTotal({commit}, data) {
    let result = await api.officesManagement.getExamComboList()
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
