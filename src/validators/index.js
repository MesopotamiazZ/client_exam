// 验证器加载器
const files = require.context('.', true, /\.js$/)

let validators = {}

try {
  files.keys().forEach(path => {
    if (path === './index.js') return
    let key = path.split('/').pop().replace(/(\.\/|\.js)/g, '')
    validators[key] = files(path).default
  })
} catch (e) {
  console.error('validators加载失败', e)
}

export default validators
