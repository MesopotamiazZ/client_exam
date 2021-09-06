// 基本信息管理路由
/* 仪器接口管理 */
/* 体检管理 */
const SingleProject = () =>
  import(/* webpackChunkName: "singleProject" */ '@/views/main/information/examManagement/singleProject')
const ExamCombo = () =>
  import(/* webpackChunkName: "examCombo" */ '@/views/main/information/examManagement/examCombo')
const MultiExam = () =>
  import(/* webpackChunkName: "multiExam" */ '@/views/main/information/examManagement/multiExam')
const ProjectCategory = () =>
  import(/* webpackChunkName: "projectCategory" */ '@/views/main/information/examManagement/projectCategory')
const ExamCategory = () =>
  import(/* webpackChunkName: "examCategory" */ '@/views/main/information/examManagement/examCategory')
/* 职业体检管理 */
const ManagementOccupationalHealthExamination = () =>
import(/* webpackChunkName: "managementOccupationalHealthExamination" */ '@/views/main/information/proExamManagement/managementOccupationalHealthExamination')
const CategoryManagementOccupationalDiseaseInductiveFactor = () =>
import(/* webpackChunkName: "categoryManagementOccupationalDiseaseInductiveFactor" */ '@/views/main/information/proExamManagement/categoryManagementOccupationalDiseaseInductiveFactor')
const ManagementOccupationalDiseaseInductiveFactor = () =>
import(/* webpackChunkName: "managementOccupationalDiseaseInductiveFactor" */ '@/views/main/information/proExamManagement/managementOccupationalDiseaseInductiveFactor')
const OccupationalDiseaseClassificationDirectoryManagement = () =>
import(/* webpackChunkName: "occupationalDiseaseClassificationDirectoryManagement" */ '@/views/main/information/proExamManagement/occupationalDiseaseClassificationDirectoryManagement')
const HealthCare = () =>
  import(/* webpackChunkName: "healthCare" */ '@/views/main/information/proExamManagement/healthCare')
const InspectionBasisManagement = () =>
  import(/* webpackChunkName: "inspectionBasisManagement" */ '@/views/main/information/diagnosticManagement/inspectionBasisManagement')
const InterrogationManagement = () =>
  import(/* webpackChunkName: "interrogationManagement" */ '@/views/main/information/proExamManagement/interrogationManagement')
const OccupationalContraindication = () =>
  import(/* webpackChunkName: "occupationalContraindication" */ '@/views/main/information/proExamManagement/occupationalContraindication')
const PhysicalRecommendation = () =>
  import(/* webpackChunkName: "physicalRecommendation" */ '@/views/main/information/proExamManagement/physicalRecommendation')
/* 样本管理 */
const SamplingStopReason = () =>
  import(/* webpackChunkName: "samplingStopReason" */ '@/views/main/information/samplingManagement/samplingStopReason')
const SamplingType = () =>
  import(/* webpackChunkName: "samplingType" */ '@/views/main/information/samplingManagement/samplingType')
const SampleContainerManagement = () =>
import(/* webpackChunkName: "sampleContainerManagement" */ '@/views/main/information/samplingManagement/sampleContainerManagement')
const TradeManagement = () =>
  import(/* webpackChunkName: "tradeManagement" */ '@/views/main/information/industryBaseInfoManagement/tradeManagement')
const TradeList = () =>
  import(/* webpackChunkName: "tradeList" */ '@/views/main/information/industryBaseInfoManagement/tradeList')
const AdditionalExpense = () =>
  import(/* webpackChunkName: "additionalExpense" */ '@/views/main/information/expenseManagement/additionalExpense')
const ChargeType = () =>
  import(/* webpackChunkName: "chargeType" */ '@/views/main/information/expenseManagement/chargeType')
/*  疾病管理 */
const RevProLisReq = () =>
  import(/* webpackChunkName: "revProLisReq" */ '@/views/main/information/diseaseManagement/revProLisReq')
const DiseaseOrExpManagement = () =>
  import(/* webpackChunkName: "diseaseOrExpManagement" */ '@/views/main/information/diseaseManagement/diseaseOrExpManagement')
const DiseaseTypes = () =>
  import(/* webpackChunkName: "diseaseTypes" */ '@/views/main/information/diseaseManagement/diseaseTypes')
const AdministrativeAreaManagement = () =>
  import(/* webpackChunkName: "administrativeAreaManagement" */ '@/views/main/information/parameterManagement/administrativeAreaManagement')
const IlluminationSources = () =>
  import(/* webpackChunkName: "illuminationSources" */ '@/views/main/information/parameterManagement/illuminationSources')
const EconomicTypeManagement = () =>
  import(/* webpackChunkName: "economicTypeManagement" */ '@/views/main/information/parameterManagement/economicTypeManagement')
const EconomicIndustryManagement = () => import(/* webpackChunkName: "economicIndustryManagement" */ '@/views/main/information/parameterManagement/economicIndustryManagement')
const DiagnosticRuleManagement = () =>
import(/* webpackChunkName: "diagnosticRuleManagement" */ '@/views/main/information/diagnosticManagementItem/diagnosticRuleManagement')
const ProfessionalHealthCareStRadiologists = () =>
import(/* webpackChunkName: "professionalHealthCareStRadiologists" */ '@/views/main/information/undefinedRouter/professionalHealthCareStRadiologists')
const RadioactiveApplicationMaintenance = () =>
import(/* webpackChunkName: "radioactiveApplicationMaintenance" */ '@/views/main/information/undefinedRouter/radioactiveApplicationMaintenance')
const RadiologicalExamConMaintenance = () =>
 import(/* webpackChunkName: "radiologicalExamConMaintenance" */ '@/views/main/information/undefinedRouter/radiologicalExamConMaintenance')
const DustRabatParameterManagement = () => import(/* webpackChunkName: "dustRabatParameterManagement" */ '@/views/main/information/examManagement/dustRabatParameterManagement')
const DustRabatParameterValue = () =>
import(/* webpackChunkName: "dustRabatParameterValue" */ '@/views/main/information/examManagement/dustRabatParameterValue')
const MedicineTestConclusions = () =>
import(/* webpackChunkName: "medicineTestConclusions" */ '@/views/main/information/examManagement/medicineTestConclusions')
const ResultManagement = () =>
import(/* webpackChunkName: "resultManagement" */ '@/views/main/information/examManagement/resultManagement')
export default {
  path: 'information',
  name: 'information',
  meta: {
    // 基本信息管理
    title: 'information',
    icon: 'navInformation',
    role: 0,
    weight: 3,
  },
  children: [
    {
      path: 'parameterManagement',
      name: 'parameterManagement',
      meta: {
            // 其他基础信息管理
        title: 'parameterManagement',
        role: 0,
        weight: 1,
      },
      children: [
            // 经济类型管理
        {
          path: 'economicTypeManagement',
          name: 'economicTypeManagement',
          component: EconomicTypeManagement,
          meta: {
                // 基本信息-参数管理-经济类型管理
            title: 'economicTypeManagement',
            role: 0,
            weight: 1,
          },
        },
            // 行政区域管理
        {
          path: 'administrativeAreaManagement',
          name: 'administrativeAreaManagement',
          component: AdministrativeAreaManagement,
          meta: {
                // 基本信息-参数管理-行政区域管理
            title: 'administrativeAreaManagement',
            role: 0,
            weight: 2,
          },
        },
                // 行业管理
        {
          path: 'tradeList',
          name: 'tradeList',
          component: TradeList,
          meta: {
                  // 行业列表
            title: 'tradeList',
            role: 0,
            weight: 3,
          },
        },
                        // 工种管理
        {
          path: 'tradeManagement',
          name: 'tradeManagement',
          component: TradeManagement,
          meta: {
                            // 行业管理及工种管理
            title: 'tradeManagement',
            role: 0,
            weight: 4,
          },
        },
        // 经济行业管理
        {
          path: 'economicIndustryManagement',
          name: 'economicIndustryManagement',
          component: EconomicIndustryManagement,
          meta: {
            // 参数管理
            title: 'economicIndustryManagement',
            role: 0,
            weight: 0,
          },
        },
      ],
    },
    // 体检项目管理
    {
      path: 'examinationManagement',
      name: 'examinationManagement',
      // 体检项目管理
      meta: {
        title: 'examinationManagement',
        role: 0,
        weight: 2,
      },
      children: [
         // 体检类别管理
        {
          path: 'examCategory',
          name: 'examCategory',
          component: ExamCategory,
          meta: {
            // 体检管理 体检类别、项目类别管理
            title: 'examCategory',
            role: 0,
            weight: 1,
          },
        },
        // 项目类别管理
        {
          path: 'projectCategory',
          name: 'projectCategory',
          component: ProjectCategory,
          meta: {
            // 体检管理 体检类别、项目类别管理
            title: 'projectCategory',
            role: 0,
            weight: 2,
          },
        },
         // 单个项目管理
        {
          path: 'singleProject',
          name: 'singleProject',
          component: SingleProject,
          meta: {
            // 单个项目管理
            title: 'singleProject',
            role: 0,
            weight: 3,
          },
        },
        // 组合项目管理
        {
          path: 'multiExam',
          name: 'multiExam',
          component: MultiExam,
          meta: {
            // 组合项目管理
            title: 'multiExam',
            role: 0,
            weight: 4,
          },
        },
        // 体检套餐管理
        {
          path: 'examCombo',
          name: 'examCombo',
          component: ExamCombo,
          meta: {
            // 体检套餐管理界面
            title: 'examCombo',
            role: 0,
            weight: 7,
          },
        },
        // 复查项目信息管理
        {
          path: 'revProLisReq',
          name: 'revProLisReq',
          component: RevProLisReq,
          meta: {
            // 复查项目要求列表
            title: 'revProLisReq',
            role: 0,
            weight: 8,
          },
        },
        // 问诊管理
        {
          path: 'interrogationManagement',
          name: 'interrogationManagement',
          component: InterrogationManagement,
          meta: {
            // 职业体验 问诊管理
            title: 'interrogationManagement',
            role: 0,
            weight: 9,
          },
        },
         // 粉尘胸片参数管理
        {
          path: 'dustRabatParameterManagement',
          name: 'dustRabatParameterManagement',
          component: DustRabatParameterManagement,
          meta: {
            // 粉尘胸片参数管理
            title: 'dustRabatParameterManagement',
            role: 0,
            weight: 10,
          },
        },
        // 粉尘胸片参数值管理
        {
          path: 'dustRabatParameterValue',
          name: 'dustRabatParameterValue',
          component: DustRabatParameterValue,
          meta: {
                    // 粉尘胸片参数值管理
            title: 'dustRabatParameterValue',
            role: 0,
            weight: 11,
          },
        },
        {
          path: 'resultManagement',
          name: 'resultManagement',
          component: ResultManagement,
          meta: {
                    // 结果配置
            title: 'resultManagement',
            role: 0,
            weight: 12,
          },
        },
          // 1弃检原因管理
        {
          path: 'samplingStopReason',
          name: 'samplingStopReason',
          component: SamplingStopReason,
          meta: {
              // 弃检原因管理组件
            title: 'samplingStopReason',
            role: 0,
            weight: 13,
          },
        },
        {
          path: 'medicineTestConclusions',
          name: 'medicineTestConclusions',
          component: MedicineTestConclusions,
          meta: {
            // 医学主检结论管理
            title: 'medicineTestConclusions',
            role: 0,
            weight: 14,
          },
        },
      ],
    },
    //  职业体检管理
    {
      path: 'proExamManagement',
      name: 'proExamManagement',
      meta: {
        // 职业体检管理
        title: 'proExamManagement',
        role: 0,
        weight: 3,
      },
      children: [
 // 职业病危害因素类别管理
        {
          path: 'categoryManagementOccupationalDiseaseInductiveFactor',
          name: 'categoryManagementOccupationalDiseaseInductiveFactor',
          component: CategoryManagementOccupationalDiseaseInductiveFactor,
          meta: {
            title: 'categoryManagementOccupationalDiseaseInductiveFactor',
            role: 0,
            weight: 1,
          },
        },
        // 职业病危害因素管理
        {
          path: 'managementOccupationalDiseaseInductiveFactor',
          name: 'managementOccupationalDiseaseInductiveFactor',
          component: ManagementOccupationalDiseaseInductiveFactor,
          meta: {
            title: 'managementOccupationalDiseaseInductiveFactor',
            role: 0,
            weight: 2,
          },
        },
        // 1检查依据管理
        {
          path: 'inspectionBasisManagement',
          name: 'inspectionBasisManagement',
          component: InspectionBasisManagement,
          meta: {
            // 检查依据管理
            title: 'inspectionBasisManagement',
            role: 0,
            weight: 3,
          },
        },
         // 职业病分类和目录管理
        {
          path: 'occupationalDiseaseClassificationDirectoryManagement',
          name: 'occupationalDiseaseClassificationDirectoryManagement',
          component: OccupationalDiseaseClassificationDirectoryManagement,
          meta: {
            title: 'occupationalDiseaseClassificationDirectoryManagement',
            role: 0,
            weight: 4,
          },
        },
         // 1职业禁忌症管理
        {
          path: 'occupationalContraindication',
          name: 'occupationalContraindication',
          component: OccupationalContraindication,
          meta: {
            // 职业体检管理 禁忌症管理
            title: 'occupationalContraindication',
            role: 0,
            weight: 5,
          },
        },
                // 职业健康检查种类管理
        {
          path: 'managementOccupationalHealthExamination',
          name: 'managementOccupationalHealthExamination',
          component: ManagementOccupationalHealthExamination,
          meta: {
            title: 'managementOccupationalHealthExamination',
            role: 0,
            weight: 6,
          },
        },
// 1职业健康监护技术规范
        {
          path: 'healthCare',
          name: 'healthCare',
          component: HealthCare,
          meta: {
    // 职业健康监护
            title: 'healthCare',
            role: 0,
            weight: 7,
          },
        },
         // 职业体检建议管理
        {
          path: 'physicalRecommendation',
          name: 'physicalRecommendation',
          component: PhysicalRecommendation,
          meta: {
            title: 'physicalRecommendation',
            role: 0,
            weight: 8,
          },
        },
        // 1照射源职业分类管理
        {
          path: 'illuminationSources',
          name: 'illuminationSources',
          component: IlluminationSources,
          meta: {
            // 照射源职业分类列表
            title: 'illuminationSources',
            role: 0,
            weight: 9,
          },
        },
        {
          // 放射工作证申请类型维护
          path: 'radioactiveApplicationMaintenance',
          name: 'radioactiveApplicationMaintenance',
          component: RadioactiveApplicationMaintenance,
          meta: {
            title: 'radioactiveApplicationMaintenance',
            role: 0,
            weight: 10,
          },
        },
        {
          path: 'professionalHealthCareStRadiologists',
          name: 'professionalHealthCareStRadiologists',
          component: ProfessionalHealthCareStRadiologists,
          meta: {
            title: 'professionalHealthCareStRadiologists',
            role: 0,
            weight: 11,
          },
        },
                // 放射体检结论管理
        {
          path: 'radiologicalExamConMaintenance',
          name: 'radiologicalExamConMaintenance',
          component: RadiologicalExamConMaintenance,
          meta: {
            title: 'radiologicalExamConMaintenance',
            role: 0,
            weight: 12,
          },
        },
      ],
    },
// 疾病管理
    {
      path: 'diseaseManagement',
      name: 'diseaseManagement',
      meta: {
        // 疾病管理
        title: 'diseaseManagement',
        role: 0,
        weight: 4,
      },
      children: [
        // 疾病类型管理
        {
          path: 'diseaseTypes',
          name: 'diseaseTypes',
          component: DiseaseTypes,
          meta: {
            // 疾病类型管理
            title: 'diseaseTypes',
            role: 0,
            weight: 1,
          },
        },
        // 疾病或异常管理
        {
          path: 'diseaseOrExpManagement',
          name: 'diseaseOrExpManagement',
          component: DiseaseOrExpManagement,
          meta: {
            // 疾病或异常管理
            title: 'diseaseOrExpManagement',
            role: 0,
            weight: 2,
          },
        },
        // 病史管理

      ],
    },
    // 采样管理
    {
      path: 'sampleManagement',
      name: 'sampleManagement',
      meta: {
        // 样本管理
        title: 'sampleManagement',
        role: 0,
        weight: 5,
      },
      children: [
        // 1样本类型管理
        {
          path: 'samplingType',
          name: 'samplingType',
          component: SamplingType,
          meta: {
            // 采样类型管理
            title: 'samplingType',
            role: 0,
            weight: 2,
          },
        },
        // 标本容器管理
        {
          path: 'sampleContainerManagement',
          name: 'sampleContainerManagement',
          component: SampleContainerManagement,
          meta: {
            // 标本容器管理
            title: 'sampleContainerManagement',
            role: 0,
            weight: 2,
          },
        },
      ],
    },
    {
      path: 'diagnosticManagementItem',
      name: 'diagnosticManagementItem',
      meta: {
        title: 'diagnosticManagementItem',
        role: 0,
        weight: 6,
      },
      children: [
    // 诊断规则管理
        {
          path: 'diagnosticRuleManagement',
          name: 'diagnosticRuleManagement',
          component: DiagnosticRuleManagement,
          meta: {
            title: 'diagnosticRuleManagement',
            role: 0,
            weight: 1,
          },
        },
      ],
    },
    // 结算相关管理
    {
      path: 'expenseManagement',
      name: 'expenseManagement',
      meta: {
        // 结算相关管理
        title: 'expenseManagement',
        role: 0,
        weight: 7,
      },
      children: [
        // 收费类型管理
        {
          path: 'chargeType',
          name: 'chargeType',
          component: ChargeType,
          meta: {
            // 收费类型
            title: 'chargeType',
            role: 0,
            weight: 1,
          },
        },
        // 1附加费管理
        {
          path: 'additionalExpense',
          name: 'additionalExpense',
          component: AdditionalExpense,
          meta: {
            // 附加费用页面
            title: 'additionalExpense',
            role: 0,
            weight: 2,
          },
        },
      ],
    },
  ],
}
