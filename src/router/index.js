import Vue from 'vue'
import Router from 'vue-router'
// import iView from 'iview'

import store from '@/store'
import { sync } from 'vuex-router-sync'

// 惰性加载
const Main = () =>
  import(/* webpackChunkName: "main" */ /* webpackMode: "lazy" */ '@/views/main')
const Login = () =>
  import(/* webpackChunkName: "login" */ /* webpackMode: "lazy" */ '@/views/login')
const Table = () =>
  import(/* webpackChunkName: "table" */ /* webpackMode: "lazy" */ '@/views/table/tableDemo')
const Echarts = () =>
  import(/* webpackChunkName: "echarts" */ /* webpackMode: "lazy" */ '@/views/echarts')
const StartBoot = () =>
  import(/* webpackChunkName: "startBoot" */ /* webpackMode: "lazy" */ '@/views/startBoot')
const Split = () =>
  import(/* webpackChunkName: "split" */ /* webpackMode: "lazy" */ '@/views/Split')
const print = () =>
  import(/* webpackChunkName: "print" */ /* webpackMode: "lazy" */ '@/views/print')
const healthRecord = () =>
  import(/* webpackChunkName: "healthRecord" */ /* webpackMode: "lazy" */ '@/components/healthRecord/healthRecord')

Vue.use(Router)

const mainChildrenRouter = []
const files = require.context('./modules', true, /\.js$/)

try {
  files.keys().forEach(path => {
    /* if (~path.indexOf('instrument') || ~path.indexOf('statistics')) return */
    mainChildrenRouter.push(files(path).default)
  })
} catch (e) {
  console.error('router main children router加载失败', e)
}

// 默认路由
export let defaultRoutes = [
  {
    path: 'login',
    name: 'login',
    component: Login,
    meta: {
      title: 'login',
      requiresAuth: false,
    },
  },
  {
    path: 'table',
    name: 'table',
    component: Table,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: 'print',
    name: 'print',
    component: print,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: 'echarts',
    name: 'echarts',
    component: Echarts,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: 'split',
    name: 'split',
    component: Split,
    mata: {
      requiresAuth: false,
    },
  },
  {
    path: 'startBoot',
    name: 'startBoot',
    component: StartBoot,
    meta: {
      // 启动页面
      title: 'startBoot',
      requiresAuth: false,
    },
  },
]

// 不需要显示在菜单的动态路由
export let otherRouters = [
  {
    path: '',
    name: 'index',
    component: Main,
    meta: {
      title: '主页',
    },
    children: [
      {
        path: 'healthRecord',
        name: 'healthRecord',
        component: healthRecord,
        meta: {
          title: '健康档案',
        },
      },
    ],
  },
]

// 需要显示在菜单的动态路由
export let appRouters = [...mainChildrenRouter]

// 基础页面
export let baseRouter = {
  path: '',
  name: 'main',
  component: Main,
}

const router = new Router({
  // mode: process.env.ROUTE_MODE,
  routes: [...defaultRoutes, ...otherRouters],
})

// 路由加载前钩子
router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start()
  if (to.name !== 'startBoot' && !store.state.initialization) {
    // 未初始化
    next({ name: 'startBoot' })
  }
  // 验证权限
  // 点击顶部图标切换默认页面
  // 切换回页面时需要跳转到之前记录的滚动条位置
  next()
  // 判断是否需要登录
  // if (to.matched.some(record => record.meta.requiresAuth) && !store.getters['user/token']) {
  //   next({
  //     path: '/login',
  //   })
  // } else {
  //   next() // 确保一定要调用 next()
  // }
  // iView.LoadingBar.finish()
})

// 路由加载后钩子
router.afterEach(function(route) {
  // iView.LoadingBar.finish()
  if (route.meta.title) {
    // global.document.title = route.meta.title + '——' + store.state.title
  }
})

sync(store, router)

export default router
