// 过滤器加载器
import Vue from 'vue'

const files = require.context('.', true, /\.js$/)

try {
  files.keys().forEach(path => {
    if (path === './index.js') return
    let key = path.split('/').pop().replace(/(\.\/|\.js)/g, '')
    Vue.filter(key, files(path).default)
  })
} catch (e) {
  console.error('fifters加载失败', e)
}
