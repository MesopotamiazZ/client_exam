/*
* 基本信息-参数管理-经济类型管理
* @author 肖康
* @date 2017/11/30
*/
import * as types from './economicTypeManagementTypes'
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
    item.code = item.code
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
  // 经济类型
  econTypes: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  // 类型选择，树形组件
  econTypesTree: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 100000,
    },
  },
  econTypesTreeChild: {
    items: [],
  },
  econTypesTreeParent: {
    items: [],
  },
  // 经济类型下拉
  econTypesAll: {
    items: [
      { children: [] },
    ],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  // 经济类型标准库
  econTypeStds: {
    items: [
      { children: [] },
    ],
    // 没有meta
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
}

const mutations = {
  [types.SET_ECONMIC_TYPE](state, payload) {
    // console.log('mut', payload)
    state.econTypes = payload
  },
  setSingleData(state, payload) {
    state.econTypes.items = [payload]
  },
  [types.SET_ECONMIC_TYPE_TREE](state, payload) {
    formatTreeDate(payload.items)
    console.log('===', payload.items)
    state.econTypesTree = payload
  },
  [types.SET_ECONMIC_TYPE_TREE_CHILD](state, payload) {
    formatTreeDate(payload.items)
    console.log('===', payload.items)
    state.econTypesTreeChild = payload
  },
  [types.SET_ECONMIC_TYPE_TREE_PARENT](state, payload) {
    // formatTreeDate(payload.items)
    console.log('parent===', payload.items)
    state.econTypesTreeParent = payload
  },
  [types.SET_ECONMIC_TYPE_ALL](state, payload) {
    formatAll(payload.items)
    state.econTypesAll = payload
    console.log('payload', payload)
  },
  [types.SET_ECONMIC_TYPE_STDS](state, payload) {
    state.econTypeStds = payload
  },
}
const actions = {
  async getEconType({ commit }, p) {
    let result = {}
    result = await api.economicTypeManagement.getEconmicType(p)
    commit(types.SET_ECONMIC_TYPE, result)
  },
  async getEconTypeTree({ commit }, p) {
    let result = {}
    result = await api.economicTypeManagement.getEconmicType(p)
    commit(types.SET_ECONMIC_TYPE_TREE, result)
  },
  async getEconmicTypeParent({ commit }, p) {
    let result = await api.economicTypeManagement.getEconmicTypeParent(p)
    commit(types.SET_ECONMIC_TYPE_TREE_PARENT, result)
  },
  async getEconTypeTreeChild({ commit }, p) {
    let result = {}
    result = await api.economicTypeManagement.getEconmicType(p)
    commit(types.SET_ECONMIC_TYPE_TREE_CHILD, result)
  },
  // 获取全部
  async getEconTypeAll({ commit }, p) {
    let result = await api.economicTypeManagement.getEconmicType(p || {filters: 'isTree:1'})
    commit(types.SET_ECONMIC_TYPE_ALL, result)
  },
  // 标准库
  async getEconTypeStds({commit}, p) {
    let result = await api.economicTypeManagement.getEconTypeStds(p)
    commit(types.SET_ECONMIC_TYPE_STDS, result)
  },
  async addEconType({ commit }, p) {
    let result = await api.economicTypeManagement.addEconType(p)
    return result
  },
  async editEconType({ commit }, p) {
    let result = await api.economicTypeManagement.editEconType(p)
    return result
  },
  async delEconType({ commit }, p) {
    let result = await api.economicTypeManagement.delEconType(p)
    return result
  },
}
const getters = {
  doneTypeList: (state) => {
    let data = state.econTypes.items.slice(0)
    return data
  },
  doneTypeClassList: (state) => {
    // console.log('gettersClass,', state.econTypesClass)
    let data = []
    if (state.econTypesClass.items.length === 0) {
      // console.log('没有 内容', state.econTypesClass)
      data = []
    } else {
      data = state.econTypesClass.items.slice(0)
    }
    return data
  },
  etypeClassAll: (state) => {
    let data = state.econTypesClassAll.meta
    return data
  },
  etypeClassMeta: (state) => {
    let data = state.econTypesClass.meta
    return data
  },

  // tree筛选
  doneEconTypesTree: (state) => {
    let data = []
    console.log('get1', state.econTypes)
    for (let i = 0; i < state.econTypes.items.length; i++) {
      data[i] = {}
      data[i].title = state.econTypes.items[i].name
      data[i].id = state.econTypes.items[i].id
      data[i].expand = true
      data[i].code = state.econTypes.items[i].code
      data[i].level = 2
      if (state.econTypes.items[i].children && state.econTypes.items[i].children.length > 0) {
        data[i].children = []
        for (let j = 0; j < state.econTypes.items[i].children.length; j++) {
          data[i].children.push({
            title: state.econTypes.items[i].children[j].name,
            id: state.econTypes.items[i].children[j].id,
            code: state.econTypes.items[i].children[j].code,
            level: 3,
          })
          if (state.econTypes.items[i].children[j].children && state.econTypes.items[i].children[j].children.length > 0) {
            data[i].children[j].children = []
            for (let k = 0; k < state.econTypes.items[i].children[j].length; k++) {
              data[i].children[j].children.push({
                title: state.econTypes.items[i].children[j].children[k].name,
                id: state.econTypes.items[i].children[j].children[k].id,
                code: state.econTypes.items[i].children[j].children[k].code,
                level: 4,
              })
            }
          }
        }
      }
    }
    console.log('getter:', data)
    return data
  },
  // 标准库
  // doneEconTypeStds:(state)=>{
  //   let data = []

  // }
  doneParentIds: (state) => {
    parentIds = []
    parentId(state.econTypesTreeParent)
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

