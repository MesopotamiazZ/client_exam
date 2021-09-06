/* jiangyiling 权限列表 */
<template>
  <div class="permissionList-wrapper">
    <split-pane style="width:100%;height:100%"
                :min="22"
                :max="28"
                direction="horizontal"
                v-model="triggerOffset">
      <div slot="left"
           class="left">
        <search-tree :data="treeData"
                     @on-select-change='treeSelectChange'></search-tree>
      </div>
      <div slot="right"
           class="right height100P">
        <div class="table-wrapper height100P"
             ref="contentTable">
          
            <q-table ref="zBaseInfoTable"
                     :isSelectMode="selectMode"
                     :params="paraming"
                     :ifEdit="true"
                     :width="800"
                     :columns="columns"
                     :selectMode="selectMode"
                     :data="dataTable"
                     :height="tableHeight"
                     :pageInfo="pageInfo"
                     :showOperateColumn="false"
                     @after-request="afterRequest"
                     @delete-row="delOne"
                     @delete="delOne"
                     @edit-row="editOne"
                     @edit="editOne"
                     @on-row-dbClick="editOne"
                     @getRequestParams="getRequestParams"
                     @all-selection="selectChange">
            </q-table>

        </div>
      </div>
    </split-pane>
    <div v-if="showEditModal"
         class="addModal">
      <Modal v-model="showEditModal"
             width="606"
             :transition-names='[]'
             :mask-closable="false"
             :transfer='false'
             :closable="false">
        <div class="header"
             slot="header">
          <alert-header headerText="编辑"
                        :showInput="false"></alert-header>
          <div class="button-group">
            <Button type="primary"
                    class="marginR20" @click="table2SelectMode=!table2SelectMode">启 用</Button>
            <Button type="primary">停 用</Button>
          </div>
        </div>
        <div class="modal-content height100P"
             ref="editTableW">
             <div class="table2wrapper">
               <q-table ref="editTable"
                :ifEdit="true"
                :isSelectMode="table2SelectMode"
                :selectMode="table2SelectMode"
                :columns="columns1"
                :data="dataTableTwo"
                :ifShowPagination="false"
                :showOperateColumn="false"
                @all-selection="selectChange">
              </q-table>
             </div>
          <div class="sp-box marginT10 marginL20">
            <span class="sp-b">检前准备-前台登记</span>
            <span class="sp-l">已启用</span>
            <span class="sp-b">（25人）</span>
          </div>
          <span class="operater marginT10  marginL20 marginR20">最后修改人：李四</span>
          <span class="operater marginT10">最后修改时间：2017-12-12 12:01</span>
        </div>
        <div slot="footer"
             class="clearfix">
          <Button type="ghost"
                    class="fr marginR20 marginB20"
                    @click="showEditModal=false">取 消</Button>
          <Button type="primary" class="fr marginR20 marginB20"
                           @click="showEditModal=false">保 存</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import fifters from '@/utils/fifters'
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'permissionList',
    data() {
      return {
        table2SelectMode: false,
        showEditModal: false,
        dataTable: [],
        totalTitle: '所有菜单',
        triggerOffset: 22,
        selectMode: false,
        treeData: [
          {
            title: '所有菜单',
            expand: true,
            children: [
              {
                title: '检前准备',
                expand: false,
                children: [
                  {
                    title: '体检预约',
                    expand: false,
                    children: [
                      {
                        title: '前台预约',
                        expand: false,
                        id: 1,
                      },
                      {
                        title: '单位管理',
                        expand: false,
                        id: 2,
                      },
                      {
                        title: '预约管理',
                        expand: false,
                        id: 3,
                      },
                      {
                        title: '表格导入备单',
                        expand: false,
                        id: 4,
                      },
                      {
                        title: '表格导入员工',
                        expand: false,
                        id: 5,
                      },
                    ],
                  },
                  {
                    title: '体检登记',
                    expand: false,
                    id: 6,
                  },
                  {
                    title: '进度管理',
                    expand: false,
                    children: [
                      {
                        title: '体检进度综合管理',
                        expand: false,
                        id: 7,
                      },
                      {
                        title: '单位体检订单管理',
                        expand: false,
                        id: 8,
                      },
                    ],
                  },
                  {
                    title: '体检收费',
                    expend: false,
                    children: [
                      {
                        title: '个人结算',
                        expand: false,
                        id: 9,
                      },
                      {
                        title: '单位结算',
                        expand: false,
                        id: 10,
                      },
                      {
                        title: '体检收费日结',
                        expand: false,
                        id: 11,
                      },
                      {
                        title: '体检收费月结',
                        expand: false,
                        id: 12,
                      },
                      {
                        title: '团体收费清单',
                        expand: false,
                        id: 13,
                      },
                    ],
                  },
                ],
              },
              {
                title: '体检',
                expend: false,
                children: [
                  {
                    title: '体检工作台',
                    expand: false,
                    children: [
                      {
                        title: '采样台',
                        expend: false,
                        id: 14,
                      },
                      {
                        title: '采样查询',
                        expend: false,
                        id: 15,
                      },
                      {
                        title: '结果录入',
                        expend: false,
                        id: 16,
                      },
                      {
                        title: '检查查询',
                        expend: false,
                        id: 17,
                      },
                    ],
                  },
                  {
                    title: '主检工作台',
                    expend: true,
                    children: [
                      {
                        title: '主检',
                        expand: false,
                        id: 18,
                      },
                      {
                        title: '主检查询',
                        expand: false,
                        id: 19,
                      },
                    ],
                  },
                  {
                    title: '报告工作台',
                    expend: false,
                    children: [
                      {
                        title: '报告审核管理',
                        expend: false,
                        id: 20,
                      },
                      {
                        title: '报告审核',
                        expend: false,
                        id: 21,
                      },
                      {
                        title: '个人报告管理',
                        expend: false,
                        id: 22,
                      },
                      {
                        title: '个人报告签收',
                        expend: false,
                        id: 23,
                      },
                      {
                        title: '单位报告管理',
                        expend: false,
                        id: 24,
                      },
                      {
                        title: '单位报告签收',
                        expend: false,
                        id: 25,
                      },
                      {
                        title: '单位协议管理',
                        expend: false,
                        id: 26,
                      },
                      {
                        title: '健康证管理',
                        expend: false,
                        id: 27,
                      },
                      {
                        title: '放射工作人员证管理',
                        expend: false,
                        id: 28,
                      },
                    ],
                  },
                  {
                    title: '健康档案管理',
                    expend: false,
                    id: 29,
                  },
                ],
              },
              {
                title: '统计分析',
                expend: false,
                children: [
                  {
                    title: '统计分析',
                    expend: false,
                    id: 30,
                  },
                ],
              },
              {
                title: '综合管理办公室',
                expend: false,
                children: [
                  {
                    title: '机构信息管理',
                    expend: false,
                    id: 31,
                  },
                  {
                    title: '部门诊室管理',
                    expend: false,
                    children: [
                      {
                        title: '楼层管理',
                        expend: false,
                        id: 32,
                      },
                      {
                        title: '排队机管理',
                        expend: false,
                        id: 33,
                      },
                      {
                        title: '部门管理',
                        expend: false,
                        id: 34,
                      },
                      {
                        title: '科室类别管理',
                        expend: false,
                        id: 35,
                      },
                      {
                        title: '科室管理',
                        expend: false,
                        id: 36,
                      },
                      {
                        title: '诊室管理',
                        expend: false,
                        id: 37,
                      },
                    ],
                  },
                  {
                    title: '人员信息管理',
                    expend: false,
                    children: [
                      {
                        title: '岗位管理',
                        expend: false,
                        id: 38,
                      },
                      {
                        title: '职务管理',
                        expend: false,
                        id: 39,
                      },
                      {
                        title: '职员管理',
                        expend: false,
                        id: 40,
                      },
                      {
                        title: '签名管理',
                        expend: false,
                        id: 41,
                      },
                    ],
                  },
                  {
                    title: '账号权限管理',
                    expend: false,
                    children: [
                      {
                        title: '权限分组管理',
                        expend: false,
                        id: 42,
                      },
                      {
                        title: '账号管理',
                        expend: false,
                        id: 43,
                      },
                    ],
                  },
                ],
              },
              {
                title: '基础信息管理',
                expend: false,
                children: [
                  {
                    title: '行业参数管理',
                    expend: false,
                    children: [
                      {
                        title: '经济行业管理',
                        expend: false,
                        id: 44,
                      },
                      {
                        title: '经济类型管理',
                        expend: false,
                        id: 45,
                      },
                      {
                        title: '行政区划管理',
                        expend: false,
                        id: 46,
                      },
                      {
                        title: '从业行业管理',
                        expend: false,
                        id: 47,
                      },
                      {
                        title: '工种管理',
                        expend: false,
                        id: 48,
                      },
                    ],
                  },
                  {
                    title: '体检项目管理',
                    expend: false,
                    children: [
                      {
                        title: '体检类别管理',
                        expend: false,
                        id: 49,
                      },
                      {
                        title: '项目类别管理',
                        expend: false,
                        id: 50,
                      },
                      {
                        title: '单个项目管理',
                        expend: false,
                        id: 51,
                      },
                      {
                        title: '组合项目管理',
                        expend: false,
                        id: 52,
                      },
                      {
                        title: '体检套餐管理',
                        expend: false,
                        id: 53,
                      },
                      {
                        title: '复查项目信息管理',
                        expend: false,
                        id: 54,
                      },
                      {
                        title: '问诊症状管理',
                        expend: false,
                        id: 55,
                      },
                      {
                        title: '粉尘胸片参数管理',
                        expend: false,
                        id: 56,
                      },
                      {
                        title: '粉尘胸片参数值管理',
                        expend: false,
                        id: 57,
                      },
                      {
                        title: '结果配置',
                        expend: false,
                        id: 58,
                      },
                      {
                        title: '弃检原因管理',
                        expend: false,
                        id: 59,
                      },
                      {
                        title: '医学主检结论管理',
                        expend: false,
                        id: 60,
                      },
                    ],
                  },
                  {
                    title: '职业体检管理',
                    expend: false,
                    children: [
                      {
                        title: '职业病危害因素类别管理',
                        expend: false,
                        id: 61,
                      },
                      {
                        title: '职业病危害因素类别管理',
                        expend: false,
                        id: 62,
                      },
                      {
                        title: '检查依据管理',
                        expend: false,
                        id: 63,
                      },
                      {
                        title: '职业病分类和目录管理',
                        expend: false,
                        id: 64,
                      },
                      {
                        title: '职业禁忌证管理',
                        expend: false,
                        id: 65,
                      },
                      {
                        title: '职业健康监护技术规范',
                        expend: false,
                        id: 66,
                      },
                      {
                        title: '职业体检建议管理',
                        expend: false,
                        id: 67,
                      },
                      {
                        title: '照射源职业分类管理',
                        expend: false,
                        id: 68,
                      },
                      {
                        title: '放射工作证申请类型管理',
                        expend: false,
                        id: 69,
                      },
                      {
                        title: '放射人员职业健康监护规范',
                        expend: false,
                        id: 70,
                      },
                      {
                        title: '放射体检结论管理',
                        expend: false,
                        id: 71,
                      },
                    ],
                  },
                  {
                    title: '疾病管理',
                    expend: false,
                    children: [
                      {
                        title: '疾病类别管理',
                        expend: false,
                        id: 72,
                      },
                      {
                        title: '疾病（或异常）管理',
                        expend: false,
                        id: 73,
                      },
                    ],
                  },
                  {
                    title: '采样管理',
                    expend: false,
                    children: [
                      {
                        title: '采样类型管理',
                        expend: false,
                        id: 74,
                      },
                      {
                        title: '标本容器管理',
                        expend: false,
                        id: 75,
                      },
                    ],
                  },
                  {
                    title: '诊断管理',
                    expend: false,
                    children: [
                      {
                        title: '诊断规则管理',
                        expend: false,
                        id: 76,
                      },
                    ],
                  },
                  {
                    title: '费用管理',
                    expend: false,
                    children: [
                      {
                        title: '费用类别管理',
                        expend: false,
                        id: 77,
                      },
                      {
                        title: '附加费管理',
                        expend: false,
                        id: 78,
                      },
                    ],
                  },
                ],
              },
              {
                title: '系统管理',
                expend: false,
                children: [
                  {
                    title: '编号规则管理',
                    expend: false,
                    id: 79,
                  },
                  {
                    title: '自定义模板',
                    expend: false,
                    id: 80,
                  },
                  {
                    title: '备份与还原',
                    expend: false,
                    id: 81,
                  },
                  {
                    title: '系统参数配置',
                    expend: false,
                    id: 82,
                  },
                  {
                    title: '外检配置',
                    expend: false,
                    id: 83,
                  },
                ],
              },
            ],
          },
        ],
        paraming: {
          search: '',
        },
        columns1: [
          {
            title: '用户名',
            key: 'name',
            ellipsis: 'true',
            canSort: false,
          },
          {
            title: '人员编号',
            key: 'code',
            ellipsis: 'true',
            canSort: false,
          },
          {
            title: '真实姓名',
            key: 'real',
            ellipsis: 'true',
            canSort: false,
          },
          {
            title: '性别',
            key: 'sex',
            ellipsis: 'true',
            canSort: false,
          },
          {
            title: '年龄',
            key: 'age',
            ellipsis: 'true',
            canSort: false,
          },
          {
            title: '操作',
            width: 70,
            key: 'operater',
            canSort: false,
            fixed: 'right',
            render: (h, params) => {
              return h('div', {}, [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    background:
                      'url(' +
                      (params.row.status === 1
                        ? this.enableIcon
                        : this.disableIcon) +
                      ') no-repeat',
                  },
                  on: {
                    click: event => {
                      event.stopPropagation()
                      if (this.selectMode) {
                        return
                      }
                      if (params.row.status === 1) {
                        this.disableOne(params.row)
                      } else {
                        this.enableOne(params.row)
                      }
                    },
                  },
                }),
              ])
            },
          },
        ],
        columns: [
          {
            title: '菜单名称',
            key: 'name',
            align: 'center',
            ellipsis: 'true',
          },
          {
            title: '菜单名称',
            key: 'name',
            align: 'center',
            ellipsis: 'true',
          },
          {
            title: '备注',
            key: 'remark',
            ellipsis: true,
            width: 60,
            render: (h, params) => {
              let val = params.row.remark
              if (val) {
                return h('remark-in-table', {
                  props: {
                    text: val,
                  },
                })
              }
              return ''
            },
          },
          {
            width: 50,
            title: '启用',
            key: 'status',
            align: 'center',
            ellipsis: 'true',
            render: (h, params) => {
              if (params.row.status === 1) {
                return h('status-in-table')
              }
            },
            titleRender: () => {
              return ''
            },
            filterType: 'type',
            filterOptions: [
              {
                value: 1,
                label: '启用',
              },
              {
                value: 0,
                label: '未启用',
              },
            ],
          },
          {
            title: '最后修改人',
            key: 'operater',
            align: 'center',
            ellipsis: 'true',
            width: 90,
          },
          {
            title: '最后修改时间',
            key: 'updated_at',
            align: 'center',
            ellipsis: 'true',
            width: 130,
            render: (h, params) => {
              if (params.row.updated_at) {
                return fifters.timeFilter(
                  params.row.updated_at,
                  'YYYY-MM-DD HH:mm',
                )
              } else {
                return ''
              }
            },
            titleRender: data => {
              if (data.updated_at) {
                return fifters.timeFilter(data.updated_at, 'YYYY-MM-DD HH:mm')
              } else {
                return ''
              }
            },
            filterType: 'time',
          },
          {
            title: '操作',
            fixed: 'right',
            width: 70,
            render: (h, params) => {
              return h(
                'div',
                {},
                [
                  h(
                    'span',
                    {
                      style: {
                        display: 'inline-block',
                        width: '15px',
                        height: '15px',
                        marginLeft: '6px',
                        background: `url(${this.editIcon}) no-repeat`,
                      },
                      on: {
                        click: () => {
                          this.editOne(params.row)
                        },
                      },
                    }
                  ),
                  h(
                    'span',
                    {
                      style: {
                        display: 'inline-block',
                        width: '15px',
                        height: '15px',
                        marginLeft: '6px',
                        background: `url(${params.row.status === 1 ? this.enableIcon : this.disableIcon}) no-repeat`,
                      },
                      on: {
                        click: () => {
                          if (params.row.status === 1) {
                            this.disableOne(params.row)
                          } else {
                            this.enableOne(params.row)
                          }
                        },
                      },
                    }
                  ),
                ]
              )
            },
          },
        ],
        editIcon: '/static/icons/public/table-hover-edit.svg', // 编辑
        enableIcon: '/static/icons/public/enable.svg', // 启用
        disableIcon: '/static/icons/public/disable.svg', // 禁用
        dataTableTwo: [
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            sex: '男',
            status: 0,
            age: 28,
          },
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            sex: '男',
            status: 1,
            age: 28,
          },
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            sex: '男',
            status: 1,
            age: 28,
          },
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            sex: '男',
            status: 1,
            age: 28,
          },
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            sex: '男',
            status: 0,
            age: 28,
          },
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            sex: '男',
            status: 0,
            age: 28,
          },
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            sex: '男',
            status: 1,
            age: 28,
          },
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            sex: '男',
            status: 1,
            age: 28,
          },
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            sex: '男',
            status: 1,
            age: 28,
          },
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            sex: '男',
            status: 0,
            age: 28,
          },
        ],
        dataTableOne: [
          {
            name: '金凯利',
            code: 111,
            real: '张三',
            remake: '管理员',
            status: 0,
            sort: 11,
            operater: '李四',
            updated_at: 1515764820,
          },
          {
            name: '傻大姐',
            code: 111,
            real: '李四',
            remake: '管理员',
            status: 1,
            sort: 11,
            operater: '李四',
            updated_at: 1515764820,
          },
          {
            name: '切波拉',
            code: 111,
            real: '王五',
            remake: '管理员',
            status: 1,
            sort: 11,
            operater: '傻傻的',
            updated_at: 1515764820,
          },
          {
            name: '杨瑞',
            code: 111,
            real: '张三',
            remake: '管理员',
            status: 1,
            sort: 11,
            operater: '李四',
            updated_at: 1515764820,
          },
          {
            name: '张菲',
            code: 111,
            real: '张三',
            remake: '管理员',
            status: 1,
            sort: 11,
            operater: '李四',
            updated_at: 1515764820,
          },
        ],
        tableHeight: 400,
        pageInfo: {
          total: 0,
          current_page: 1,
          per_page: 20,
        },
      }
    },
    watch: {
      windowHeight() {
        this.tableHeight = this.$refs.contentTable.offsetHeight
      },
      showEditModal(cur) {
        this.$nextTick(() => {
          this.table2SelectMode = cur
        })
      },
    },
    computed: {
      ...mapState('departmentManageModule', [
        'departmentTree',
        'department',
        'departmentTreeParent',
        'departmentTreeChild',
        'departmentAll',
      ]),
      ...mapGetters('departmentManageModule', ['doneParentIds']),
    },
    methods: {
      ...mapMutations('departmentManageModule', ['setSingleData']),

      ...mapActions('departmentManageModule', [
        'getDepartment',
        'getDepartmentTree',
        'getDepartmentParent',
        'getDepartmentAll',
        'getDepartmentChild',
        'addDepartment',
        'editDepartment',
        'deleteDepartment',
      ]),
      treeSearchCancel(text) {
        if (!text.length) {
          this.getDepartmentTree({ search: '', filters: 'parent_id:0;isTree:1' })
        }
      },
      treeSelectChange(data) {
        let node = data[0]
        switch (node.level) {
        case 1: {
          break
        }
        case 2: {
          break
        }
        default:
          console.error("filed 'level' not found")
          break
        }
      },
      localSearchKey(data) {
        console.log(data)
      },
      delOne(row) {
        //
      },
      editOne(row) {
        this.showEditModal = true
        this.$nextTick(() => {
          this.table2SelectMode = true
        })
      },
      afterRequest() {
        //
      },
      getRequestParams(params) {
        //
      },
      selectChange(data) {
        //
      },
      disableOne(row) {
        // console.log(111, row)
      },
      enableOne(row) {
        // console.log(222, row)
      },
    },
    mounted() {
      this.tableHeight = this.$refs.contentTable.offsetHeight
      this.dataTable = this.dataTableOne.map(item => item)
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .permissionList-wrapper {
    .addModal {
      .ivu-modal {
        height: calc(~'100% - 41px');
        max-height: 545px;
      }
      .ivu-modal-content {
        height: 100%;
      }
      .ivu-modal-body {
        height: calc(~'100% - 100px');
      }
    }
    height: 100%;
    .left {
      flex: 1;
      height: 100%;
      background: #f2f7ff;
      .input-wrapper {
        width: 100%;
        padding: 10px 10px 0 10px;
      }
      .tree-content .search-line span.curPointer {
        display: none;
      }
    }
    .ivu-modal-content {
      .header {
        position: relative;
        .button-group {
          display: flex;
          position: absolute;
          top: 8px;
          right: 0px;
        }
      }
    }
    .sp-box {
      vertical-align: bottom;
      .sp-b {
        font-size: 14px;
      }
      .sp-l {
        margin-left: 5px;
        color: @gradeAshThree;
      }
    }
    .operater {
      display: inline-block;
      color: @gradeAshThree;
    }

    .table-wrapper {
      .ivu-table-fixed-right table {
        width: 70px !important;
      }
    }
    .modal-content {
      padding-bottom: 20px;
    }
    .table2wrapper{
      height: calc(~"100% - 60px");
      .custom-defined-table{
        height: 100%;
      }
      .ivu-table-wrapper,
      .ivu-table{
        height: 100% !important;
      }
      .ivu-table-body{
        height: calc(~"100% - 40px") !important;
      }
      .ivu-table-fixed-right{
        height: 100%;
      }
      .ivu-table-fixed-body{
        height: calc(~"100% - 40px") !important;
      }
    }
  }
</style>