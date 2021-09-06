// const NumberingRuleMan = () => import(/* webpackChunkName: "numberingRuleMan" */'@/views/main/systemmanagement/numberingRuleMan')
// const CustomTemplates = () => import(/* webpackChunkName: "customTemplates" */'@/views/main/systemmanagement/customTemplates')
// const BackupRestore = () => import(/* webpackChunkName: "backupRestore" */'@/views/main/systemmanagement/backupRestore')
const SystemParameterConfiguration = () => import(/* webpackChunkName: "systemParameterConfiguration" */'@/views/main/systemmanagement/systemParameterConfiguration')
const OutsideTestConfiguration = () => import(/* webpackChunkName: "outsideTestConfiguration" */'@/views/main/systemmanagement/outsideTestConfiguration')
const ViewLog = () => import(/* webpackChunkName: "viewLog" */'@/views/main/systemmanagement/viewLog')
export default {
  path: 'systemmanagement',
  name: 'systemmanagement',
  meta: {
            // 系统管理
    title: 'systemmanagement',
    icon: 'navSystemItem',
    role: 0,
    weight: 7,
  },
  children: [
    /* {
      path: 'numberingRuleMan',
      name: 'numberingRuleMan',
      component: NumberingRuleMan,
      meta: {
        // 编号规则管理
        title: 'numberingRuleMan',
        role: 0,
        weight: 1,
      },
    }, */
    /* {
      path: 'customTemplates',
      name: 'customTemplates',
      component: CustomTemplates,
      meta: {
          // 自定义模板
        title: 'customTemplates',
        role: 0,
        weight: 2,
      },
    }, */
    /* {
      path: 'backupRestore',
      name: 'backupRestore',
      component: BackupRestore,
      meta: {
            // 备份与还原
        title: 'backupRestore',
        role: 0,
        weight: 3,
      },
    }, */
    {
      path: 'systemParameterConfiguration',
      name: 'systemParameterConfiguration',
      component: SystemParameterConfiguration,
      meta: {
              // 系统参数配置
        title: 'systemParameterConfiguration',
        role: 0,
        weight: 4,
      },
    },
    {
      path: 'outsideTestConfiguration',
      name: 'outsideTestConfiguration',
      component: OutsideTestConfiguration,
      meta: {
                // 外检配置
        title: 'outsideTestConfiguration',
        role: 0,
        weight: 5,
      },
    },
    {
      path: 'viewLog',
      name: 'viewLog',
      component: ViewLog,
      meta: {
                // 查看日志
        title: 'viewLog',
        role: 0,
        weight: 6,
      },
    },
  ],
}
