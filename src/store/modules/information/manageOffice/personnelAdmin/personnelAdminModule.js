// 职员管理 xk
import * as types from './personnelAdminTypes'
import api from '@/api'
import _ from 'lodash'
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
  personnel: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },

  personnelTree: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  personnelTreeParent: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  personnelTreeChild: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  personnelAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  jobsAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  divisionsAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  adminstartiveAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  innerPartyDytiesAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  deptTypeAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  deptAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
}

const mutations = {
  [types.SET_PERSONNEL](state, payload) {
    state.personnel = payload
  },
  [types.SET_ADMINISTRATIVE](state, payload) {
    state.adminstartiveAll = payload
  },
  [types.SET_DIVISIONS](state, payload) {
    state.divisionsAll = payload
  },
  [types.SET_INNERPARTYDYTIES](state, payload) {
    state.innerPartyDytiesAll = payload
  },
  [types.SET_JOBS](state, payload) {
    state.jobsAll = payload
  },
  [types.SET_DEPT_TYPE_ALL](state, payload) {
    state.deptTypeAll = payload
  },
  [types.SET_DEPT_ALL](state, payload) {
    state.deptAll = payload
  },

  // [types.SET_PERSONNEL_TREE](state, payload) {
  //   formatTreeDate(payload.items)
  //   state.personnelTree = payload
  // },
  // [types.SET_PERSONNEL_PARENT](state, payload) {
  //   state.personnelTreeParent = 'SET_PERSONNEL_ALL'
  // },
  // [types.SET_PERSONNEL_CHILD](state, payload) {
  //   formatTreeDate(payload.items)
  //   state.personnelTreeChild = payload
  // },
  [types.SET_PERSONNEL_ALL](state, payload) {
    formatAll(payload.items)
    state.personnelAll = payload
  },
}

const actions = {
  async getPersonnel({commit}, p) {
    let result = await api.personnelAdmin.getPersonnel(p)
    commit(types.SET_PERSONNEL, result)
  },
  // 行政职务
  async getAdministrative({commit}, p) {
    let result = await api.personnelAdmin.getAdministrative(p)
    commit(types.SET_ADMINISTRATIVE, result)
  },
  // 部门
  async getDivisions({commit}, p) {
    let result = await api.personnelAdmin.getDivisions(p)
    commit(types.SET_DIVISIONS, result)
  },
  // 党内
  async getInnerPartyDuties({commit}, p) {
    let result = await api.personnelAdmin.getInnerPartyDuties(p)
    commit(types.SET_INNERPARTYDYTIES, result)
  },
  // 岗位
  async getJobs({commit}, p) {
    let result = await api.personnelAdmin.getJobs(p)
    commit(types.SET_JOBS, result)
  },
  // 科室类别
  async getDeptType({commit}, p) {
    let result = await api.personnelAdmin.getDeptType(p)
    commit(types.SET_DEPT_TYPE_ALL, result)
  },
  // 科室
  async getDept({commit}, p) {
    let result = await api.personnelAdmin.getDept(p)
    commit(types.SET_DEPT_ALL, result)
  },

  async addPersonnel({commit}, p) {
    await api.personnelAdmin.addPersonnel(p)
  },

  async editPersonnel({commit}, p) {
    await api.personnelAdmin.editPersonnel(p)
  },

  async deletePersonnel({commit}, p) {
    await api.personnelAdmin.deletePersonnel(p)
  },

}

const getters = {
  doneParentIds: (state) => {
    parentIds = []
    parentId(state.personnelTreeParent)
    return parentIds
  },
  doneDeptTypeAll: (state) => {
    let data = _.cloneDeep(state.deptTypeAll)
    data.items.unshift({id: 'all', name: '所有类型'})
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
