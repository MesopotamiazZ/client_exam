const OrganizationInformation = () =>
  import(/* webpackChunkName: "organizationInformation" */ '@/views/main/office/organizationInformation')
const FloorManagement = () =>
  import(/* webpackChunkName: "floorManagement" */ '@/views/main/information/manageOffice/floorManagement')
const TeamManagement = () => import(/* webpackChunkName: "teamManagement" */'@/views/main/information/manageOffice/teamManagement')
const DepartmentManage = () => import(/* webpackChunkName: "departmentManage" */'@/views/main/information/manageOffice/departmentManage')
const DepartmentCategoryManagement = () => import(/* webpackChunkName: "departmentCategoryManagement" */'@/views/main/information/manageOffice/departmentCategoryManagement')
const AdministrativeOfficesManagement = () => import(/* webpackChunkName: "administrativeOfficesManagement" */'@/views/main/information/manageOffice/administrativeOfficesManagement')
const OfficesManagement = () => import(/* webpackChunkName: "officesManagement" */'@/views/main/information/manageOffice/officesManagement')
const PostManagement = () => import(/* webpackChunkName: "postManagement" */'@/views/main/information/manageOffice/postManagement')
const ProfesManage = () => import(/* webpackChunkName: "profesManage" */'@/views/main/information/manageOffice/profesManage')
const PersonnelAdmin = () =>
import(/* webpackChunkName: "personnelAdmin" */ '@/views/main/information/manageOffice/personnelAdmin')
const SignatureManager = () =>
import(/* webpackChunkName: "signatureManager" */ '@/views/main/information/manageOffice/signatureManager')
const AuthorityGroup = () =>
  import(/* webpackChunkName: "authorityGroup" */ '@/views/main/office/authorityGroup')
const AccountManagement = () =>
  import(/* webpackChunkName: "accountManagement" */ '@/views/main/office/accountManagement')
export default {
  path: 'office',
  name: 'office',
  meta: {
          // 综合管理办公室
    title: 'office',
    icon: 'navOffice',
    role: 0,
    weight: 2,
  },
  children: [
      // 机构信息管理
    {
      path: 'organizationInformation',
      name: 'organizationInformation',
      component: OrganizationInformation,
      meta: {
              // 基本信息-参数管理-经济类型管理
        title: 'organizationInformation',
        role: 0,
        weight: 1,
      },
    },
    // 部门诊断室管理
    {
      path: 'diagnosticRoomManagement',
      name: 'diagnosticRoomManagement',
      /* component: DiagnosticRoomManagement, */
      meta: {
                // 基本信息-参数管理-经济类型管理
        title: 'diagnosticRoomManagement',
        role: 0,
        weight: 2,
      },
      children: [
        {
          path: 'floorManagement',
          name: 'floorManagement',
          component: FloorManagement,
          meta: {
                // 楼层管理
            title: 'floorManagement',
            role: 0,
            weight: 1,
          },
        },
        {
          path: 'teamManagement',
          name: 'teamManagement',
          component: TeamManagement,
          meta: {
                  // 排队机管理
            title: 'teamManagement',
            role: 0,
            weight: 2,
          },
        },
        {
          path: 'departmentManage',
          name: 'departmentManage',
          component: DepartmentManage,
          meta: {
                  // 部门管理
            title: 'departmentManage',
            role: 0,
            weight: 3,
          },
        },
        {
          path: 'departmentCategoryManagement',
          name: 'departmentCategoryManagement',
          component: DepartmentCategoryManagement,
          meta: {
                 // 科室类别管理
            title: 'departmentCategoryManagement',
            role: 0,
            weight: 4,
          },
        },

        {
          path: 'administrativeOfficesManagement',
          name: 'administrativeOfficesManagement',
          component: AdministrativeOfficesManagement,
          meta: {
                // 科室管理
            title: 'administrativeOfficesManagement',
            role: 0,
            weight: 5,
          },
        },
        {
          path: 'officesManagement',
          name: 'officesManagement',
          component: OfficesManagement,
          meta: {
                  // 诊室管理
            title: 'officesManagement',
            role: 0,
            weight: 6,
          },
        },
      ],
    },
    // 人员信息管理
    {
      path: 'personinFormationManagement',
      name: 'personinFormationManagement',
      meta: {
        // 基本信息-参数管理-经济类型管理
        title: 'personinFormationManagement',
        role: 0,
        weight: 3,
      },
      children: [
        {
          path: 'postManagement',
          name: 'postManagement',
          component: PostManagement,
          meta: {
                // 岗位管理
            title: 'postManagement',
            role: 0,
            weight: 1,
          },
        },

        {
          path: 'profesManage',
          name: 'profesManage',
          component: ProfesManage,
          meta: {
                  // 职务管理
            title: 'profesManage',
            role: 0,
            weight: 2,
          },
        },
        {
          path: 'personnelAdmin',
          name: 'personnelAdmin',
          component: PersonnelAdmin,
          meta: {
                // 职员管理
            title: 'personnelAdmin',
            role: 0,
            weight: 6,
          },
        },

        {
          path: 'signatureManager',
          name: 'signatureManager',
          component: SignatureManager,
          meta: {
                // 签名管理
            title: 'signatureManager',
            role: 0,
            weight: 4,
          },
        },
      ],
    },
    // 账号权限管理
    {
      path: 'accountPermissionMan',
      name: 'accountPermissionMan',
      meta: {
        // 基本信息-参数管理-经济类型管理
        title: 'accountPermissionMan',
        role: 0,
        weight: 4,
      },
      children: [
        {
          path: 'authorityGroup',
          name: 'authorityGroup',
          component: AuthorityGroup,
          meta: {
                  // 权限分组管理
            title: 'authorityGroup',
            role: 0,
            weight: 1,
          },
        },
        {
          path: 'accountManagement',
          name: 'accountManagement',
          component: AccountManagement,
          meta: {
                    // 权限分组管理
            title: 'accountManagement',
            role: 0,
            weight: 2,
          },
        },
      ],
    },
  ],
}
