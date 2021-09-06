// 指令加载器
import Vue from 'vue'

const files = require.context('.', true, /\.js$/)

try {
  files.keys().forEach(path => {
    if (path === './index.js') return
    let key = path.split('/').pop().replace(/(\.\/|\.js)/g, '')
    Vue.directive(key, files(path).default)
  })
} catch (e) {
  console.error('directives加载失败', e)
}
