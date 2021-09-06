// 仪器接口路由
// const InstrumentManagement = () => import(/* webpackChunkName: "examResult" */ /* webpackMode: "lazy" */'@/views/main/instrument/instrumentManagement')
const UeditorTest = () => import(/* webpackChunkName: "ueditorTest" */ /* webpackMode: "lazy" */'@/views/main/instrument/instrumentManagement/ueditorTest')

const UeditorTestHtml = () => import(/* webpackChunkName: "ueditorTestHtml" */ /* webpackMode: "lazy" */'@/views/main/instrument/instrumentManagement/ueditorTestHtml')

export default {
  path: 'instrument',
  name: 'instrument',
  meta: {
    // 仪器管理
    title: 'instrument',
    icon: 'navInstrument',
    role: 0,
    weight: 4,
  },
  children: [
    {
      path: 'ueditorTest',
      name: 'ueditorTest',
      component: UeditorTest,
      meta: {
        // 仪器管理
        title: 'ueditorTest',
        role: 0,
      },
    },
    {
      path: 'ueditorTestHtml',
      name: 'ueditorTestHtml',
      component: UeditorTestHtml,
      meta: {
        // 仪器管理
        title: 'ueditorTestHtml',
        role: 0,
      },
    },
    /* {
      path: 'instrumentManagement',
      name: 'instrumentManagement',
      component: InstrumentManagement,
      meta: {
        // 仪器管理
        title: 'instrumentManagement',
        role: 0,
      },
    }, */
  ],
}
