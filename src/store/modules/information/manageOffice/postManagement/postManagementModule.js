// 岗位管理 xk
import * as types from './postManagementTypes'
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
  posts: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },

  postsTree: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  postsTreeParent: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  postsTreeChild: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  postsAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
}

const mutations = {
  [types.SET_POSTS](state, payload) {
    state.posts = payload
  },
  setSingleData(state, payload) {
    state.posts.items = [payload]
  },
  [types.SET_POSTS_TREE](state, payload) {
    formatTreeDate(payload.items)
    state.postsTree = payload
  },
  [types.SET_POSTS_PARENT](state, payload) {
    state.postsTreeParent = payload
  },
  [types.SET_POSTS_CHILD](state, payload) {
    formatTreeDate(payload.items)
    state.postsTreeChild = payload
  },
  [types.SET_POSTS_ALL](state, payload) {
    formatAll(payload.items)
    state.postsAll = payload
  },

}

const actions = {
  async getPosts({commit}, p) {
    let result = await api.postsManage.getPosts(p)
    commit(types.SET_POSTS, result)
  },

  async getPostsTree({commit}, p) {
    let result = await api.postsManage.getPosts(p)
    commit(types.SET_POSTS_TREE, result)
  },
  async getPostsParent({commit}, p) {
    let result = await api.postsManage.getPostsParent(p)
    commit(types.SET_POSTS_PARENT, result)
  },
  async getPostsChild({commit}, p) {
    let result = await api.postsManage.getPosts(p)
    commit(types.SET_POSTS_CHILD, result)
  },
  async getPostsAll({commit}, p) {
    let result = await api.postsManage.getPosts(p)
    commit(types.SET_POSTS_ALL, result)
  },

  async addPosts({commit}, p) {
    await api.postsManage.addPosts(p)
  },

  async editPosts({commit}, p) {
    await api.postsManage.editPosts(p)
  },

  async deletePosts({commit}, p) {
    await api.postsManage.deletePosts(p)
  },

}

const getters = {
  doneParentIds: (state) => {
    parentIds = []
    parentId(state.postsTreeParent)
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
