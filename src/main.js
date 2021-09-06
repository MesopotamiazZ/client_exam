// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//
import '../static/ue/ueditor.config.js'
import '../static/ue/ueditor.all.min.js'
import '../static/ue/lang/zh-cn/zh-cn.js'
import '../static/ue/ueditor.parse.min.js'
import forbidBackSpace from './service/forbidBackSpace'

// 加载粒子效果
import VueParticles from 'vue-particles'

/* import Viewer from 'viewerjs'
Vue.use(Viewer) */
// 加载iview
import iView from 'iview'
import '@/assets/less/theme.less'

import '@/assets/less/public.less'

// 加载 font awesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

// 加载自定义图标
import '@/service/icons'

// 加载组件
import '@/components'

// 加载指令
import '@/directives'

// 加载过滤器
import '@/fifters'

// 加载handsontable样式
// import 'handsontable/dist/handsontable.full.css'
// import 'handsontable'
// 加载i18n
import { i18n } from '@/store/plugins/i18n'
// 加载echarts
import VueECharts from 'vue-echarts'

Vue.use(VueParticles)
Vue.use(iView)
Vue.component('icon', Icon)
Vue.component('chart', VueECharts)

// 关闭提示
Vue.config.productionTip = false
Vue.config.devtools = false

// 启动时打开开发者工具
if (process.env.NODE_ENV === 'development') {
  nw.Window.get().showDevTools()
}

// 错误捕捉
// Vue.config.errorHandler = function (err, vm, info) {
//   // handle error
//   console.error('errorHandler', err, vm, info)
// }

// 禁止后退键  作用于IE、Chrome
document.onkeydown = forbidBackSpace

Vue.prototype.nwWindow = nw.Window.get()

// 打印
// nw.Window.open('E:/file.pdf', function(win) {
//     win.on('loaded', function() {
//         win.print({}, function(callback) {
//             win.close();
//         });
//     });
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App },
})
