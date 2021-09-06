// 检前准备路由
const Register = () => import(/* webpackChunkName: "register" */'@/views/main/prepare/register')
const PersonalPhysicalExaminationCharge = () => import(/* webpackChunkName: "personalPhysicalExaminationCharge" */'@/views/main/prepare/payment/personalPhysicalExaminationCharge')
const TeamPhysicalExaminationCharge = () => import(/* webpackChunkName: "teamPhysicalExaminationCharge" */'@/views/main/prepare/payment/teamPhysicalExaminationCharge')
const TeamPhysicalExamination = () => import(/* webpackChunkName: "teamPhysicalExamination" */'@/views/main/prepare/synthManagement/teamPhysicalExamination')
const HealthExaminationDailySettlement = () => import(/* webpackChunkName: "healthExaminationDailySettlement" */'@/views/main/prepare/payment/healthExaminationDailySettlement')
const HealthExaminationMonthSettlement = () => import(/* webpackChunkName: "healthExaminationMonthSettlement" */'@/views/main/prepare/payment/healthExaminationMonthSettlement')
const GroupListCharges = () => import(/* webpackChunkName: "groupListCharges" */'@/views/main/prepare/payment/groupListCharges')
const FrontAppointment = () => import(/* webpackChunkName: "frontAppointment" */'@/views/main/prepare/appointmentCheckup/frontAppointment')
const ManagementAppointments = () => import(/* webpackChunkName: "managementAppointments" */'@/views/main/prepare/appointmentCheckup/managementAppointments')
const FormImportList = () => import(/* webpackChunkName: "formImportList" */'@/views/main/prepare/appointmentCheckup/formImportList')
const ImportEmployees = () => import(/* webpackChunkName: "importEmployees" */'@/views/main/prepare/appointmentCheckup/importEmployees')
const ComprehensiveProgressControl = () => import(/* webpackChunkName: "comprehensiveProgressControl" */'@/views/main/prepare/progressControl/comprehensiveProgressControl')
const UnitPhysicalexamManagement = () => import(/* webpackChunkName: "unitPhysicalexamManagement" */'@/views/main/prepare/progressControl/unitPhysicalexamManagement')
export default {
  path: 'prepare',
  name: 'prepare',
  meta: {
    // 检前准备
    title: 'prepare',
    icon: 'navPrepare',
    role: 0,
    weight: 0,
  },
  children: [
    {
      path: 'appointmentCheckup',
      name: 'appointmentCheckup',
      meta: {
        // 综合管理
        title: 'appointmentCheckup',
        role: 0,
        weight: 1,
      },
      children: [
        // 前台预约
        {
          path: 'frontAppointment',
          name: 'frontAppointment',
          component: FrontAppointment,
          meta: {
            title: 'frontAppointment',
            role: 0,
            weight: 2,
          },
        },
        // 单位体检
        {
          path: 'teamPhysicalExamination ',
          name: 'teamPhysicalExamination',
          component: TeamPhysicalExamination,
          meta: {
            title: 'teamPhysicalExamination',
            role: 0,
            weight: 3,
          },
        },
        // 团体预约
        // 预约管理
        {
          path: 'managementAppointments',
          name: 'managementAppointments',
          component: ManagementAppointments,
          meta: {
            title: 'managementAppointments',
            role: 0,
            weight: 4,
          },
        },
        // 表格导入备单
        {
          path: 'formImportList',
          name: 'formImportList',
          component: FormImportList,
          meta: {
            title: 'formImportList',
            role: 0,
            weight: 5,
          },
        },
        // 表格导入员工
        {
          path: 'importEmployees',
          name: 'importEmployees',
          component: ImportEmployees,
          meta: {
            title: 'importEmployees',
            role: 0,
            weight: 6,
          },
        },
      ],
    },
    {
      path: 'register',
      name: 'register',
      component: Register,
      meta: {
        // 前台登记
        title: 'register',
        role: 0,
        weight: 2,
      },
    },
       // 进度管理
    {
      path: 'progressControl',
      name: 'progressControl',
        /* component: synthManagement, */
      meta: {
          // 综合管理
        title: 'progressControl',
        role: 0,
        weight: 3,
      },
      children: [
          // 体检综合管理
        {
          path: 'comprehensiveProgressControl',
          name: 'comprehensiveProgressControl',
          component: ComprehensiveProgressControl,
          meta: {
            title: 'comprehensiveProgressControl',
            role: 0,
            weight: 1,
          },
        },
          // 体检快捷管理
          // 单位体检订单管理
        {
          path: 'unitPhysicalexamManagement',
          name: 'unitPhysicalexamManagement',
          component: UnitPhysicalexamManagement,
          meta: {
            title: 'unitPhysicalexamManagement',
            role: 0,
            weight: 2,
          },
        },
      ],
    },
    // {
    //   path: 'synthManagement',
    //   name: 'synthManagement',
    //   /* component: synthManagement, */
    //   meta: {
    //     // 综合管理
    //     title: 'synthManagement',
    //     role: 0,
    //     weight: 3,
    //   },
    //   children: [
    //     // 个人体检
    //     // 团体体检
    //     {
    //       path: 'teamPhysicalExamination ',
    //       name: 'teamPhysicalExamination',
    //       component: TeamPhysicalExamination,
    //       meta: {
    //         title: 'teamPhysicalExamination',
    //         role: 0,
    //         weight: 1,
    //       },
    //     },
    //   ],
    // },
    {
      path: 'payment',
      name: 'payment',
      /* component: Payment, */
      meta: {
        // 体检收费
        title: 'payment',
        role: 0,
        weight: 4,
      },
      children: [
        // 个人体检
        {
          path: 'personalPhysicalExaminationCharge',
          name: 'personalPhysicalExaminationCharge',
          component: PersonalPhysicalExaminationCharge,
          meta: {
            title: 'personalPhysicalExaminationCharge',
            role: 0,
            weight: 1,
          },
        },
        {
          path: 'teamPhysicalExaminationCharge',
          name: 'teamPhysicalExaminationCharge',
          component: TeamPhysicalExaminationCharge,
          meta: {
            title: 'teamPhysicalExaminationCharge',
            role: 0,
            weight: 2,
          },
        },
        // 体检收费日结
        {
          path: 'healthExaminationDailySettlement',
          name: 'healthExaminationDailySettlement',
          component: HealthExaminationDailySettlement,
          meta: {
            title: 'healthExaminationDailySettlement',
            role: 0,
            weight: 3,
          },
        },
        // 体检收费月结
        {
          path: 'healthExaminationMonthSettlement',
          name: 'healthExaminationMonthSettlement',
          component: HealthExaminationMonthSettlement,
          meta: {
            title: 'healthExaminationMonthSettlement',
            role: 0,
            weight: 4,
          },
        },
        // 团体收费清单
        {
          path: 'groupListCharges',
          name: 'groupListCharges',
          component: GroupListCharges,
          meta: {
            title: 'groupListCharges',
            role: 0,
            weight: 5,
          },
        },
      ],
    },
  ],
}
