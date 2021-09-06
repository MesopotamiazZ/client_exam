
const state = {
  ueditorStoreData: '',
}
const mutations = {
  setUeditorData(state, payload) {
    state.ueditorStoreData = payload
    console.log(state.ueditorStoreData)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
}

