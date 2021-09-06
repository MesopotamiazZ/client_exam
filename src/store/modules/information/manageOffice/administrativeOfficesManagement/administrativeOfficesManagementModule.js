/**
  * 科室管理
  * @author 刘洋
  * @date 2018/3/3
  */
import * as types from './administrativeOfficesManagementTypes'
import api from '@/api'

const state = {
  diseaseTypes: [],
  diseases: {
    meta: {
      current_page: 1,
      per_page: 20,
      total: 123,
    },
    items: [],
  },
  Staffs: [], // 职工列表
  deptTypes: [], // 科室类别
  allPro: [], // 全部组合
  diseasesNum: 0,
  oneTypeDiseases: [],
  peItemTypes: [],
  diseaseInfo: {},
  reexamItems: [], // 复检及要求列表
  diseasesStdNames: [],
  getReexams: [],
  getProjectCategoryLists: [],
  total: 0,
}

const mutations = {
  [types.SET_DISEASE_TYPES] (state, payload) {
    state.diseaseTypes = payload
  },
  [types.SET_ALL_PRO](state, payload) {
    state.allPro = payload
  },
  [types.SET_DISEASES] (state, payload) {
    // console.log(88, payload)
    state.diseases = payload
  },
  [types.RESET](state, payload) {
    state.diseases = {
      meta: {
        total: 0,
        current_page: 1,
        per_page: 20,
      },
      items: [],
    }
  },
  async [types.SET_TOTAL] (state, payload) { // 排列顺序
    state.total = payload
  },
  [types.SET_PE_ITEM_TYPES] (state, payload) {
    state.peItemTypes = payload
  },
  [types.SET_DISEASE_INFO] (state, payload) {
    state.diseaseInfo = payload
  },
  [types.SET_REEXAM_ITEMS] (state, payload) {
    state.reexamItems = payload
  },
  [types.SET_PROJECTCATEGORY_TYPES](state, payload) {
    state.getProjectCategoryLists = payload
  },
  [types.SET_DISEASES_STD_NAME] (state, payload) {
    state.diseasesStdNames = payload
  },
  [types.SET_REEXAM] (state, payload) {
    state.getReexams = payload
  },
  [types.SET_DEPT_TYPES](state, payload) {
    state.deptTypes = payload
  },
  [types.SET_DISEASESNUM] (state, payload) {
    state.diseasesNum = payload
  },
  [types.SET_STAFFS] (state, payload) {
    state.Staffs = payload
  },
}

const actions = {
  // 获取疾病类型列表
  async getDiseaseTypes ({commit}, data) {
    let result = await api.administrativeOfficesManagement.getDiseaseTypes(data)
    commit(types.SET_DISEASE_TYPES, result.items)
  },
  // 获取全部 获取科室列表
  async getDiseases ({commit}, data) {
    let result = await api.administrativeOfficesManagement.getDiseases(data)
    commit(types.SET_DISEASES, result)
  },
  async getProjectCategoryList ({commit}, data) {
    let result = await api.administrativeOfficesManagement.getProjectCategoryList(data)
    commit(types.SET_PROJECTCATEGORY_TYPES, result.items)
  },
  // 获取标获取科室列表
  async getDiseasesStdName ({commit}, data) {
    let result = await api.administrativeOfficesManagement.getDiseases(data)
    commit(types.SET_DISEASES_STD_NAME, result)
  },
  async setTotal ({commit}, data) {
    let result = await api.administrativeOfficesManagement.getDiseases()
    commit(types.SET_TOTAL, result.meta.total)
  },
  // 获得科室类别列表
  async getdeptTypes({commit}, data) {
    let result = await api.administrativeOfficesManagement.getdeptTypes(data)
      // console.log(result)
    commit(types.SET_DEPT_TYPES, result.items)
  },
    // 获取所有职工列表
  async getStaffs({commit}, data) {
    let result = await api.administrativeOfficesManagement.getStaffs(data)
        // console.log(result)
    commit(types.SET_STAFFS, result.items)
  },
    // 获取全部组合
  async getAllPro({commit}, data) {
    let result = await api.administrativeOfficesManagement.getAllPro(data)
      // console.log(result)
    commit(types.SET_ALL_PRO, result.items)
  },
    // 获取复查项目列表
  async getReexam ({commit}, data) {
    let result = await api.administrativeOfficesManagement.getReexam(data)
    commit(types.SET_REEXAM, result.items)
  },
  // 获取体检项目类型列表
  async getPeItemTypes ({commit}, data) {
    let result = await api.administrativeOfficesManagement.getPeItemTypes(data)
    commit(types.SET_PE_ITEM_TYPES, result.items)
  },
  // 添加疾病与异常
  async createDisease ({commit}, data) {
    await api.administrativeOfficesManagement.addDisease(data)
  },
  // 获取疾病详情
  async getDiseaseInfo ({commit}, data) {
    let result = await api.administrativeOfficesManagement.getDiseaseInfo(data)
    commit(types.SET_DISEASE_INFO, result)
  },
  // 修改疾病详情
  async editDisease ({commit}, data) {
    await api.administrativeOfficesManagement.editDisease(data.id, data.data)
  },
  // 删除疾病
  async deleteDisease ({commit}, data) {
    await api.administrativeOfficesManagement.deleteDisease(data)
  },
  // 获取复检及要求列表
  async getReexamItems ({commit}) {
    let result = await api.administrativeOfficesManagement.getReexamItems()
    commit(types.SET_REEXAM_ITEMS, result.items)
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
