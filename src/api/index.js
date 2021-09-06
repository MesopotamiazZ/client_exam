// api出口文件
const files = require.context('.', true, /\.js$/)
const modules = {}

try {
  files.keys().forEach(path => {
    if (path === './index.js' || path === './method.js') return
    modules[path.split('/').pop().replace(/(\.\/|\.js)/g, '')] = files(path)
  })
} catch (e) {
  console.error('api加载失败', e)
}

export default modules
