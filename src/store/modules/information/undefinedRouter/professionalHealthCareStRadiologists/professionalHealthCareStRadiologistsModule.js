/**
* @author liuyang
* @date 2018/2/27
* @content 放射人员职业健康监护规范
*/
import * as types from './professionalHealthCareStRadiologistsType'
import api from '@/api'
const state = {
  occupHealthTypesList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
  allPeItemType: [],
  // 问诊
  total: 0,
  InquiriesTypesLists: [],
  occupHealthExamTypesList: [],
  OccupHazardCategoryTypesList: [],
  OccupHazardCategoryFactorTypesList: [],
  OccpDiseasesTypesList: [],
  OccpInspectionTypesList: [],
  OccpContraindicationTypesList: [],
  InquiriesTypesList: [],
// 单项列表
  // 获取所有的 组合
  allPro: [],
}
const mutations = {
  [types.SET_OCCUP_HEALTH_TYPES] (state, payload) {
    state.occupHealthTypesList = payload
  },
  [types.RESET](state, payload) {
    state.occupHealthTypesList = {
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
  [types.SET_OCCUP_HEALTH_EXAM_TYPES] (state, payload) {
    state.occupHealthExamTypesList = payload
  },
  [types.SET_OCCUP_HAZARD_CATEGORY_TYPES] (state, payload) {
    state.OccupHazardCategoryTypesList = payload
  },
  [types.SET_OCCUP_HAZARD_CATEGORY_FACTOR_TYPES] (state, payload) {
    state.OccupHazardCategoryFactorTypesList = payload
  },
  [types.SET_OCCUP_DISEASE_TYPES] (state, payload) {
    state.OccpDiseasesTypesList = payload
  },
  [types.SET_OCCUP_INSPECTION_TYPES] (state, payload) {
    state.OccpInspectionTypesList = payload
    state.OccpInspectionTypesList.items.unshift({id: '', name: '无'})
  },
  [types.SET_OCCUP_CONTRAINDICATION_TYPES] (state, payload) {
    state.OccpContraindicationTypesList = payload
  },
  [types.SET_OCCUP_INQUIRIES_TYPES] (state, payload) {
    state.InquiriesTypesLists = payload
  },
  [types.SET_OCCUP_GROUP_ITEMS_TYPES] (state, payload) {
    state.allPeItemType = payload
  },
  [types.SET_OCCUP_GROUP_ITEMS_ITEMS_TYPES] (state, payload) {
    state.allPro = payload
    // console.log(state.OccupGroupItemsDetailsTypesList)
  },
}
const actions = {
  async getOccupHealthTypesList({commit}, data) {
    let result = await api.professionalHealthCareStRadiologists.getList(data)
    commit(types.SET_OCCUP_HEALTH_TYPES, result)
  },
  async setTotal({commit}, data) {
    let result = await api.professionalHealthCareStRadiologists.getList(data)
    commit(types.SET_TOTAL, result.meta.total)
  },
  async getOccupHealthExamTypesList({commit}, data) {
    let result = await api.professionalHealthCareStRadiologists.getOccHealthExamTypeList(data)

    commit(types.SET_OCCUP_HEALTH_EXAM_TYPES, result)
  },
  async getOccupHazardCategoryTypesList({commit}, data) {
    let result = await api.professionalHealthCareStRadiologists.getOccHazardCategoryList(data)

    commit(types.SET_OCCUP_HAZARD_CATEGORY_TYPES, result)
  },
  async getOccupHazardCategoryFactorTypesList({commit}, data) {
    let result = await api.professionalHealthCareStRadiologists.getOccHazardCategoryFactorList(data)

    commit(types.SET_OCCUP_HAZARD_CATEGORY_FACTOR_TYPES, result)
  },
  async getOccupDiseaseList({commit}, data) {
    let result = await api.professionalHealthCareStRadiologists.getOccpDiseasesList(data)

    commit(types.SET_OCCUP_DISEASE_TYPES, result)
  },
  async getOccupInspectionList({commit}, data) {
    let result = await api.professionalHealthCareStRadiologists.getInspectionList(data)

    commit(types.SET_OCCUP_INSPECTION_TYPES, result)
  },
  async getOccupContraindicationList({commit}, data) {
    let result = await api.professionalHealthCareStRadiologists.getContraindicationList(data)
    commit(types.SET_OCCUP_CONTRAINDICATION_TYPES, result)
  },
  async getInquiryProjects({commit}, data) {
    let result = await api.professionalHealthCareStRadiologists.getInquiryProjects(data)
    commit(types.SET_OCCUP_INQUIRIES_TYPES, result.items)
  },
    // 获取体检单项类型列表
  async getPeItemTypes({commit}) {
    let result = await api.professionalHealthCareStRadiologists.getPeItemTypes()
      // console.log(result)
    commit(types.SET_OCCUP_GROUP_ITEMS_TYPES, result.items)
  },
    // 获取全部组合
  async getAllPro({commit}, data) {
    let result = await api.professionalHealthCareStRadiologists.getAllPro(data)
    commit(types.SET_OCCUP_GROUP_ITEMS_ITEMS_TYPES, result.items)
  },
  async adNewItemFun({commit}, data) {
    await api.professionalHealthCareStRadiologists.addNewItem(data)
  },
  async deletItemFun({commit}, data) {
    await api.professionalHealthCareStRadiologists.deletItem(data)
  },
  async amendItemFun({commit}, data) {
    await api.professionalHealthCareStRadiologists.amendItem(data)
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
