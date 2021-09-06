// 刘鹏伟
// 2017/11/28 15:00
import * as types from './industrialDiseageTypes'
import api from '@/api'
// console.log(api)
const state = {
  industrialTypeList: {},
  addindustrialTypeList: {},
  // searchindustrialState: {},
}

const mutations = {
  [types.SET_INDUSTRIAL_TYPES] (state, Payload) {
    // console.log('sjkadhsalkdlksa')
    state.industrialTypeList = Payload
  },
  [types.ADD_INDUSTR_IAL_STATE] (state, Payload) {
    console.log('sadasjsdjefifjseifjsfse')
    state.addindustrialTypeList = Payload
  },
  [types.SEARCH_SAMPLE_TYPES_STATE] (state, payload) {
    state.searchindustrialState = payload
  },
}

const actions = {
  async [types.GET_INDUSTRIAL_TYPES] ({commit}, data) {
    // console.log(123)
    // console.log('action', data)
    let result = await api.industrialDiseage.getIndustrialList(data)
    commit(types.SET_INDUSTRIAL_TYPES, result)
    // return result
  },
  async [types.ADD_INDUSTR_TYPES] ({commit}, data) {
    console.log(1111111111111)
    console.log('action', data)
    let result = await api.industrialDiseage.addIndustrialState(data)
    commit(types.ADD_INDUSTR_IAL_STATE, result)
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
