// 体检路由
const Enquire = () => import(/* webpackChunkName: "enquire" */'@/views/main/exam/enquire')
const CheckAssignment = () => import(/* webpackChunkName: "enquire" */'@/views/main/exam/checkAssignment')
const InputResult = () => import(/* webpackChunkName: "inputResult" */'@/views/main/exam/inputResult')
const SampleManagement = () => import(/* webpackChunkName: "sampleManagement" */'@/views/main/exam/sampleManagement')
const GuardianshipCard = () => import(/* webpackChunkName: "guardianshipCard" */'@/views/main/exam/guardianshipCard')
const HealthCard = () => import(/* webpackChunkName: "healthCard" */'@/views/main/exam/healthCard')
const RadiologicalReport = () => import(/* webpackChunkName: "healthCard" */'@/views/main/exam/radiologicalReport')
const WorkPermit = () => import(/* webpackChunkName: "workPermit" */'@/views/main/exam/workPermit')
const ExamAgreement = () => import(/* webpackChunkName: "examAgreement" */'@/views/main/exam/examAgreement')
const ExamResult = () => import(/* webpackChunkName: "examResult" */'@/views/main/exam/examResult')
const HealthLibrarianship = () => import(/* webpackChunkName: "ExamAudit" */'@/views/main/exam/healthLibrarianship')
const MainInspectionTable = () => import(/* webpackChunkName: "mainExamWorkBench" */'@/views/main/exam/mainExamWorkBench')
const UnitReportManagement = () => import(/* webpackChunkName: "unitReportManagement" */'@/views/main/exam/unitReportManagement')
const MainInquire = () => import(/* webpackChunkName: "mainInquire" */'@/views/main/exam/mainTable/mainInquire')
const UnitReportSignIn = () => import(/* webpackChunkName: "unitReportSignIn" */'@/views/main/exam/unitReportSignIn')
const UnitAgreementManagement = () => import(/* webpackChunkName: "unitAgreementManagement" */'@/views/main/exam/unitAgreementManagement')
/* UnitAgreementManagement */
export default {
  path: 'exam',
  name: 'exam',
  meta: {
    // 体检
    title: 'exam',
    icon: 'navExam',
    role: 0,
    weight: 1,
  },
  children: [
    {
      path: 'examWorkbench',
      name: 'examWorkbench',
      meta: {
        // 体检工作台
        title: 'examWorkbench',
        role: 0,
        weight: 0,
      },
      children: [
        {
          path: 'sampleManagement',
          name: 'sampleManagement',
          component: SampleManagement,
          meta: {
            //  采样管理
            title: 'sampleManagement',
            role: 0,
            weight: 1,
          },
        },
        {
          path: 'enquire',
          name: 'enquire',
          component: Enquire,
          meta: {
            //  采样查询
            title: 'enquire',
            role: 0,
            weight: 2,
          },
        },
        {
          path: 'inputResult',
          name: 'inputResult',
          component: InputResult,
          meta: {
            //  结果录入
            title: 'inputResult',
            role: 0,
            weight: 3,
          },
        },
        {
          path: 'checkAssignment',
          name: 'checkAssignment',
          component: CheckAssignment,
          meta: {
            //  检查查询
            title: 'checkAssignment',
            role: 0,
            weight: 4,
          },
        },
      ],
    },
    {path: 'mainTable',
      name: 'mainTable',
      meta: {
        // 体检工作台
        title: 'mainTable',
        role: 0,
        weight: 2,
      },
      children: [
        {
          path: 'mainInspectionTable',
          name: 'mainInspectionTable',
          component: MainInspectionTable,
          meta: {
            //  主检
            title: 'mainInspectionTable',
            role: 0,
            weight: 1,
          },
        },
        {
          path: 'mainInquire',
          name: 'mainInquire',
          component: MainInquire,
          meta: {
            //  主检查询
            title: 'mainInquire',
            role: 0,
            weight: 1,
          },
        },
      ],
    },
    {
      path: 'mainExamWorkbench',
      name: 'mainExamWorkbench',
      meta: {
        // 报告工作台
        title: 'mainExamWorkbench',
        role: 0,
        weight: 2,
      },
      children: [
        {
          path: 'examAgreement',
          name: 'examAgreement',
          component: ExamAgreement,
          meta: {
            //  报告审核管理
            title: 'examAgreement',
            role: 0,
            weight: 1,
          },
        },
        {
          path: 'examResult',
          name: 'examResult',
          component: ExamResult,
          meta: {
            //  报告审核
            title: 'examResult',
            role: 0,
            weight: 2,
          },
        },
        {
          path: 'workPermit',
          name: 'workPermit',
          component: WorkPermit,
          meta: {
            //  个人报告管理
            title: 'workPermit',
            role: 0,
            weight: 3,
          },
        },
        {
          path: 'guardianshipCard',
          name: 'guardianshipCard',
          component: GuardianshipCard,
          meta: {
            //  个人报告签收
            title: 'guardianshipCard',
            role: 0,
            weight: 4,
          },
        },
        {
          path: 'unitReportManagement',
          name: 'unitReportManagement',
          component: UnitReportManagement,
          meta: {
            //  单位报告管理
            title: 'unitReportManagement',
            role: 0,
            weight: 5,
          },
        },
        {
          path: 'unitReportSignIn',
          name: 'unitReportSignIn',
          component: UnitReportSignIn,
          meta: {
            //  单位报告签收
            title: 'unitReportSignIn',
            role: 0,
            weight: 6,
          },
        },

        {
          path: 'unitAgreementManagement',
          name: 'unitAgreementManagement',
          component: UnitAgreementManagement,
          meta: {
            //  单位协议管理
            title: 'unitAgreementManagement',
            role: 0,
            weight: 7,
          },
        },
        {
          path: 'healthCard',
          name: 'healthCard',
          component: HealthCard,
          meta: {
            //  健康证打印
            title: 'healthCard',
            role: 0,
            weight: 8,
          },
        },
        {
          path: 'radiologicalReport',
          name: 'radiologicalReport',
          component: RadiologicalReport,
          meta: {
            //  放射工作员证
            title: 'radiologicalReport',
            role: 0,
            weight: 9,
          },
        },
      ],
    },
    {
      path: 'healthLibrarianship',
      name: 'healthLibrarianship',
      component: HealthLibrarianship,
      meta: {
          //  健康档案
        title: 'healthLibrarianship',
        role: 0,
        weight: 5,
      },
    },
  ],
}
