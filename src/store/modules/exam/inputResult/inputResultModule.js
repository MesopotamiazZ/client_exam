import api from '@/api'
const state = {
  connectInstrument: [
    {
      instrument: '科力飞电子伽马刀',
      status: 1,
    },
    {
      instrument: '伽马刀',
      status: 0,
    },
  ],
  // 检查病人基本信息
}
const mutations = {}
const actions = {
  async forOtherOfficeToSeeGet ({commit}, id) {
    let result = await api.inputResult.forOtherOfficeToSeeGet(id)
    return result
  },
  async getSilkCurrentOfficeResultGet ({commit}, id) {
    let result = await api.inputResult.getSilkCurrentOfficeResultGet(id)
    return result
  },
  async currentOfficeWillExamGet ({commit}, id) {
    let result = await api.inputResult.currentOfficeWillExamGet(id)
    return result
  },
  async addOfficeExamRecordsPost ({commit}, id) {
    let result = await api.inputResult.addOfficeExamRecordsPost(id)
    return result
  },
  async modifyOfficeExamRecords ({commit}, id) {
    let result = await api.inputResult.modifyOfficeExamRecords(id)
    return result
  },
  async getUserBasicInfoByCheckupNumber({commit}, id) {
    let result = await api.inputResult.getUserBasicInfoByCheckupNumber(id)
    return result
  },
  async getDiagnoseTypes({commit}, type) {
    let result = await api.inputResult.getDiagnoseTypes(type)
    return result
  },
  async getDeseases({commit}, type) {
    let result = await api.inputResult.getDeseases(type)
    return result
  },
  async getOccupDisease({commit}, type) {
    let result = await api.inputResult.getOccupDisease(type)
    return result
  },

  async getDeptInfo({commit}, id) {
    let result = await api.inputResult.getDeptInfo(id)
    return result
  },
  // -------------- 2018.2.27------------------
  // 获取粉尘胸片参数
  async getDustChestParams() {
    let result = await api.inputResult.getDustChestParams()
    return result
  },
  // 获取听阈修正值
  async getAuditoryThresholdCorrection ({commit}, obj) {
    let result = await api.inputResult.getAuditoryThresholdCorrection(obj)
    return result
  },
  // -------------- 2018.3.2------------------
  async getBasicInfoInqueries({commit}, id) {
    let result = await api.inputResult.getBasicInfoInqueries(id)
    return result
  },

  // -------------- 2018.3.7------------------
  // 获取待检组合项目
  async getPatientWaitingGroupItemsInfoById({commit}, id) {
    let result = await api.inputResult.getPatientWaitingGroupItemsInfoById(id)
    return result
  },

  // 获取病人个人信息
  async getPatientBasicInfoById({commit}, id) {
    let result = await api.inputResult.getPatientBasicInfoById(id)
    return result
  },

  // -------------- 2018.3.20------------------
  // 获取病人当前科室组合项目
  async getPatientGroupItemsInfoById({commit}, obj) {
    let result = await api.inputResult.getPatientGroupItemsInfoById(obj.pe_sn, obj.dept_id)
    return result
  },
  // 获取参考所见参考结果
  async getReferenceResultBySingleId({commit}, obj) {
    let result = await api.inputResult.getReferenceResultBySingleId(obj.item_id, obj.sex, obj.pe_categories)
    return result
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
