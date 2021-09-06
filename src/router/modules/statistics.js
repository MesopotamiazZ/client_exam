// 统计分析路由
const StatisticAnalysis = () => import(/* webpackChunkName: "statisticAnalysis" */'@/views/main/statistics/statisticAnalysis')
export default {
  path: 'statistics',
  name: 'statistics',
  meta: {
    // 统计分析
    title: 'statistics',
    icon: 'navStatistics',
    role: 0,
    weight: 3,
  },
  children: [
    {
      path: 'statisticAnalysis',
      name: 'statisticAnalysis',
      component: StatisticAnalysis,
      meta: {
        title: 'statisticAnalysis',
        icon: 'navStatistics',
        role: 0,
        weight: 1,
      },
    },
  ],
}
