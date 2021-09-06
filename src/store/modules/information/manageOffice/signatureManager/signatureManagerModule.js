// 职员管理 xk
import * as types from './signatureManagerTypes'
import api from '@/api'
import _ from 'lodash'

const state = {
  staffs: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  signs: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
}

const mutations = {
  [types.SET_SIGNS](state, payload) {
    state.signs = payload
  },
  [types.SET_STAFFS](state, payload) {
    state.staffs = payload
  },
}

const actions = {
  async getStaffs({commit}, p) {
    let result = await api.signatureManager.getStaffs(p)
    commit(types.SET_STAFFS, result)
  },
  async getSigns({commit}, p) {
    let result = await api.signatureManager.getSigns(p)
    commit(types.SET_SIGNS, result)
  },
  async addSigns({commit}, p) {
    await api.signatureManager.addSigns(p)
  },

  async editSigns({commit}, p) {
    await api.signatureManager.editSigns(p)
  },

  async deleteSigns({commit}, p) {
    await api.signatureManager.deleteSigns(p)
  },

}

const getters = {
  doneStaffsAll: (state) => {
    let data = _.cloneDeep(state.staffs)
    for (let item of data.items) {
      let text = ''
      switch (item.pro_title) {
      case 1:
        text = '医师'
        break
      case 2:
        text = '主治医师'
        break
      case 3:
        text = '副主任医师'
        break
      case 4:
        text = '主任医师'
        break
      case 5:
        text = '护士'
        break
      case 6:
        text = '护师'
        break
      case 7:
        text = '主管护师'
        break
      case 8:
        text = '副主任护师'
        break
      case 9:
        text = '主任护师'
        break
      }
      item.label = `${item.code}-${item.name}-${item.sex === 1 ? '男' : item.sex === 2 ? '女' : ' '}-${text}`
    }
    return data
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
