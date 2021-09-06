// 楼层管理 xk
import * as types from './floorManagementTypes'
import api from '@/api'

let parentIds = []
let parentId = function(arr) {
  if (arr[0]) {
    parentIds.push({id: arr[0].id, code: arr[0].code})
    if (arr[0].children && arr[0].children.length) {
      parentId(arr[0].children)
    }
  }
}

let formatAll = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].value = arr[i].id
    arr[i].label = arr[i].name
    if (arr[i].children && arr[i].children.length > 0) {
      formatAll(arr[i].children)
    }
  }
}

let formatTreeDate = (data) => {
  data.map(item => {
    item.title = item.name
    // item.code = item.code
    item.id = item.id
    item.children = []
    if (item.is_children) {
      item.loading = false
    }
    if (item.children && item.children.length) {
      formatTreeDate(item.children)
    }
  })
}
const state = {
  floors: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  floorTree: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  floorTreeParent: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  floorTreeChild: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  floorAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
}

const mutations = {
  [types.SET_FLOORS](state, payload) {
    state.floors = payload
  },
  setSingleData(state, payload) {
    state.floors.items = [payload]
  },
  [types.SET_FLOORS_TREE](state, payload) {
    formatTreeDate(payload.items)
    state.floorTree = payload
  },
  [types.SET_FLOORS_PARENT](state, payload) {
    state.floorTreeParent = payload
  },
  [types.SET_FLOORS_CHILD](state, payload) {
    formatTreeDate(payload.items)
    state.floorTreeChild = payload
  },
  [types.SET_FLOORS_ALL](state, payload) {
    formatAll(payload.items)
    state.floorAll = payload
  },
}

const actions = {
  async getFloors({commit}, p) {
    let result = await api.floorManagement.getFloors(p)
    commit(types.SET_FLOORS, result)
  },
  async getFloorsTree({commit}, p) {
    let result = await api.floorManagement.getFloors(p)
    commit(types.SET_FLOORS_TREE, result)
  },
  async getFloorParent({commit}, p) {
    let result = await api.floorManagement.getFloorsParent(p)
    commit(types.SET_FLOORS_PARENT, result)
  },
  async getFloorChild({commit}, p) {
    let result = await api.floorManagement.getFloors(p)
    commit(types.SET_FLOORS_CHILD, result)
  },
  async getFloorAll({commit}, p) {
    let result = await api.floorManagement.getFloors(p)
    commit(types.SET_FLOORS_ALL, result)
  },

  async addFloors({commit}, p) {
    await api.floorManagement.addFloors(p)
  },

  async editFloors({commit}, p) {
    await api.floorManagement.editFloors(p)
  },

  async deleteFloors({commit}, p) {
    await api.floorManagement.deleteFloors(p)
  },

}

const getters = {
  doneParentIds: (state) => {
    parentIds = []
    parentId(state.floorTreeParent)
    return parentIds
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
