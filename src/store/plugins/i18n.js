import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langPack from '@/../static/lang'
import * as types from '../types'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'zh',
  messages: langPack,
})

function i18nPlugin (store) {
  store.subscribe((mutation, state) => {
    if (mutation.type === types.SET_LANGUAGE) {
      i18n.locale = mutation.payload.toString()
    }
  })
}

export default i18nPlugin
