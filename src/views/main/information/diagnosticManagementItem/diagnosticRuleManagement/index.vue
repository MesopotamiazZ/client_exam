/*
* 诊断规则管理
* xk
* 2018.7.9
*/
<template>
      <div class="diagnostic-rule-management">
    <div class="container contentBg">
      <split-pane :min='22' :max='28' direction="horizontal" v-model="tree.width">
        <div class="tree-wrapper" slot="left">
          <!-- TODO: tree -->
          <search-tree ref="tree" :data='treeData' @on-select-change='treeSelectChange' skipName="projectCategory"></search-tree>
          <!-- <select-tree  ref="tree" :data='treeData' @on-select-change='treeSelectChange'></select-tree> -->
          <!-- <Tree ref="tree" :data='treeData' @on-select-change='treeSelectChange'></Tree> -->
        </div>
        <div class="table-wrapper" slot="right">
          <div class="header">
            <content-header :showTitle="showTitle">
              <div slot="title">{{titleText}}</div>
              <div slot="contents" class="header-content-wrapper paddingR20">
                <search-input
                  searText="请输入搜索内容"
                  @on-enter="headerSearchEnter"
                  @on-Icon="headerSearchEnter"
                  @on-cancel="headerSearchCancel"
                  :searchWidth="220">
                </search-input>
                <template v-if="!isSelectMode">
                  <Button type="ghost" class="marginR10" @click="headerAdd">新 增</Button>
                    <Button type="ghost"
                            class="marginR10" @click="exportBtn" key="output">导 出</Button>
                  <Button type="ghost" @click="toSelectMode">选 择</Button>
                </template>
                <template v-else>
                  <Button type="success"
                            class="marginR10"
                            :disabled="selectionData.length===0"
                            @click="headerDelete" key="del">删 除</Button>
                  <Button type="primary"
                            @click="exitSelectMode" key="cancel">取 消</Button>

                </template>
              </div>
            </content-header>
          </div>
          <div class="body" ref="body">
            <q-table
            ref="table"
            :ifEdit="true"
            :selectMode="isSelectMode"
            :height="tableHeight"
            :columns="tableColumns"
            :data="tableData"
            :params="tableParams"
            :pageInfo="tableInfo"
            :requestDataApi="getDiagnoseRules"
            :initReq="false"
            :width="1000"
            @edit="tableEdit"
            @edit-row="tableRowEdit"
            @delete="tableDelete"
            @delete-row="tableRowDelete"
            @on-select="tableSelectRow"
            @on-select-cancel="tableCancelSelectRow"
            @on-select-all="tableSelectAll"
            @all-selection="tableAllSelection"
            @on-selection-change="tableSelectionChange"
            @on-row-click="tableClickRow"
            @on-row-dbClick="tableRowEdit"
            @getRequestParams="getRequestParams"
            >
            </q-table>
          </div>
        </div>
      </split-pane>
    </div>
    <!-- add -->
    <add-modal v-if="add.showModal" :show="add.showModal" :formData="add.formData" @on-affirm="addFormSave" @on-cancel="addFormCancel"></add-modal>
    <!-- 编辑 -->
    <edit-modal v-if="edit.showModal" :show="edit.showModal" :data="edit.formData" @on-affirm="editFormSave" @on-cancel="editFormCancel"></edit-modal>

    <!-- 删除 -->
    <affirm-del-modal
      :controlModal="deleteOneModal"
      :delCounts="selectionData.length"
      @delCancel="deleteOneModal=false"
      @affirmDel="deleteAffirm">
    </affirm-del-modal>
  </div>
</template>
<script>
// 弹框：
  // 诊断结果名称：
// 新增：post,diagnose-rules
// 编辑：
  // 规则内容：
    // 单个项目 items
    // 组合项目 group-items
    // 病史，小结
    // 表达式

  import addModal from './components/addModal'
  import editModal from './components/editModal'
  import contentHeader from '@/components/contentHeader'

  import { mapState, mapActions } from 'vuex'
  import _ from 'lodash'
  import filters from '@/utils/fifters'
  import exportXlsx from '@/service/export-xlsx.js'
  import api from '@/api'
  import moment from 'moment'

  // import selectTree from './components/tree/selectTree'

  export default {
    name: 'diagnosticRuleManagement',
    components: {
      contentHeader,
      addModal,
      editModal,
      // selectTree,
    },
    data() {
      const nameValidator = (rule, value, callback, source, options) => {
        if (value.toString().length <= 0) {
          callback(new Error('经济类型名称不能为空'))
        } else {
          callback()
        }
      }
      return {
        exportParams: {
          reqParams: {},
          columns: [
            {
              title: '诊断规则名称',
              key: 'name',

            },
            {
              title: '诊断结果名称',
              key: 'diagnose_result',
              render: (val) => {
                if (val && val.name) {
                  return val.name
                }
              },
            },
            {
              title: '适用性别',
              key: 'sex',
              render(val) {
                return Number(val) === 1 ? '男' : Number(val) === 0 ? '女' : '通用'
              },
            },
            {
              title: '适用年龄段',
              key: 'age_x',
              render(p, row) {
                return `${p}-${row.age_y}`
              },
            },
            {
              title: '备注',
              key: 'remark',
            },
            {
              title: '启用',
              key: 'status',
              render: (value) => {
                return value === 1 ? '启用' : '未启用'
              },
            },
            {
              title: '显示顺序',
              key: 'sort',
            },
            {
              title: '最后修改人',
              key: 'operater',
            },
            {
              title: '最后修改时间',
              key: 'updated_at',
              render: (value) => {
                if (value) {
                  return moment(parseInt(value * 1000)).format('YYYY-MM-DD H:mm')
                } else {
                  return ''
                }
              },
            }],
        },
        titleText: '诊断规则管理',
        // icon
        urlImg: '/static/icons/public/enabledState.svg',
        remarkIcon: '/static/icons/public/remarkInCell.svg',
        // 父级页面
        // TODO:
        parentPage: '',
        // 当前层级
        level: 1,
        headerSearchValue: '',
        isSelectMode: false,
        // 选中数据
        selectionData: [],
        tableHeight: 568,
        tableParams: {},
        tableColumns: [
          {
            title: '诊断规则名称',
            key: 'name',
            ellipsis: true,
            // minWidth: 188,
          },
          {
            title: '诊断结果名称',
            key: 'diagnose_result',
            ellipsis: true,
            // TODO: 这个宽度需要对照下UI图
            // minWidth: 155,
            render: (h, params) => {
              if (params.row.diagnose_result) {
                return h('div', params.row.diagnose_result.name)
              }
            },
            titleRender: (params) => {
              if (params.diagnose_result && params.diagnose_result.name) {
                return params.diagnose_result.name
              }
            },
          },
          {
            title: '适用性别',
            // minWidth: 90,
            key: 'sex',
            render(h, p) {
              return h('span', Number(p.row.sex) === 1 ? '男' : Number(p.row.sex) === 0 ? '女' : '通用')
            },
          },
          {
            title: '适用年龄段',
            // minWidth: 90,
            // FIXME: 年龄段
            key: 'age_x',
            render(h, p) {
              return h('span', `${p.row.age_x}-${p.row.age_y}`)
            },
          },
          {
            title: '备注',
            ellipsis: true,
            key: 'remark',
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
            title: '启用',
            width: 60,
            key: 'status',
            align: 'center',
            ellipsis: 'true',
            render: (h, params) => {
              if (params.row.status === 1) {
                return h('status-in-table')
              }
            },
            titleRender: (data) => {
              return ''
            },
          },
          {
            title: '显示顺序',
            key: 'sort',
            align: 'center',
            ellipsis: 'true',
            width: 70,
          },
          {
            title: '最后修改人',
            width: 90,
            key: 'operater',
            align: 'center',
            ellipsis: 'true',
            // render: (h, p) => {
            //   return h('span', {}, [p.row.operater.realname])
            // },
          },
          {
            title: '最后修改时间',
            width: 130,
            key: 'updated_at',
            ellipsis: 'true',

            render: (h, p) => {
              return h('span', {}, [
                filters.timeFilter(p.row.updated_at, 'YYYY-MM-DD HH:mm'),
              ])
            },
            titleRender: (data) => {
              if (data.updated_at) {
                return filters.timeFilter(
                  data.updated_at,
                  'YYYY-MM-DD HH:mm'
                )
              } else {
                return ''
              }
            },
          },
        ],
        // 上级数据
        cascaderData: [],
        // tree
        // FIXME: 这个tree的width有什么作用
        tree: {
          width: 22,
          data: [],
        },
        // sort
        sortValue: 0,
        parentId: 0,
        // rules
        formRules: {
          name: [
            {
              validator: nameValidator,
              // message: '经济类型名称为必填',
              trigger: 'blur',
            },
          ],
          // pName: [
          //   {
          //     validator: nameValidator,
          //     message: '上级经济类型名称为必填',
          //     trigger: ['change', 'blur'],
          //   },
          // ],
        },
        // 新增
        add: {
          showModal: false,
          formData: {

          },

        },
        // 编辑
        edit: {
          showModal: false,
          formData: {
          },
        },
        // 删除
        deleteOneModal: false,
      }
    },
    watch: {
      windowHeight(val) {
        this.$nextTick(function() {
          this.setTableHeight()
        })
      },
    },
    computed: {
      ...mapState(['windowHeight']),
      ...mapState('diagnosticRuleManagementModule', ['itemTypes', 'diagnoseRules']),
      // FIXME: 界面交互更改，待确认是否需要
      showTitle() {
        // 如果是当前展示一级，那么显示title
        return this.level === 1
      },
      treeData() {
        let arr = _.cloneDeep(this.itemTypes.items)
        let data = [
          {
            title: '所有项目类别',
            expand: true,
            level: 1,
            selected: true,
            children: this.formatTreeData(arr),
          },
        ]
        console.log('data', arr, data)

        return data
      },
      tableData() {
        //
        return this.diagnoseRules.items
      },
      tableInfo() {
        return this.diagnoseRules.meta

        // console.log('info', this.econTypes)
      },

    },
    async created() {
      await Promise.all([
        this.getItemTypes({per_page: 100000, filters: 'status:1'}),
        this.getDiagnoseRules({with: 'itemType;rules;diagnoseResult:name'}),
      ])
      // this.pageInit()
    },
    mounted() {
      this.$nextTick(function() {
        this.setTableHeight()
      })
    },
    methods: {
      ...mapActions('diagnosticRuleManagementModule', ['getItemTypes', 'getDiagnoseRules', 'addDiagnoseRules', 'deleteDiagnoseRules', 'editDiagnoseRules']),
      exportBtn() {
        // console.log('导出')
        let _this = this
        exportXlsx('诊断规则管理', {
          api: api.diagnosticRuleManagement.getDiagnoseRules,
          params: this.exportParams.reqParams,
          columns: this.exportParams.columns,
          callback (result) {
            if (result) {
              _this.$Message.success('导出成功')
            } else {
              _this.$Message.error('导出失败')
            }
          },
        })
      },
      getRequestParams(params) {
        this.exportParams.reqParams = params
      },
      // page
      pageInit() {
        // 初始化sort
        this.sortValue = this.econTypesAll.meta.total + 1
      },
      deepTree (tree, parent) {
        for (let i in tree) {
          tree[i].$parent = parent
          if (tree[i].children && tree[i].children.length > 0) {
            this.deepTree(tree[i].children, tree[i])
          }
        }
      },
      formatTreeData (arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].title = arr[i].name
        }
        return arr
      },
      treeSelectChange(data) {
        console.log('change', data)
        this.setTitleText(data[0].title)
        if (data[0].level === 1) {
          this.tableParams.filters = ''
          // this.getDiagnoseRules()
          this.$refs.table.request()
        } else {
          this.tableParams.filters = `item_type_id:${data[0].id}`
          this.$refs.table.request()
        }
      },
      setTitleText(text) {
        this.titleText = text
      },
      // 获取tree上级
      getTreeParent(obj) {
        let data = []
        if (obj.level !== 1) {
          data.push(obj.code)
          if (obj.$parent) {
            data.unshift(obj.$parent.code)
          }
          if (obj.$parent.$parent) {
            data.unshift(obj.$parent.$parent.code)
          }
        }
        this.add.formData.pName = data
        this.add.formData.pCode = obj.code
        this.edit.formData.pName = data
        this.edit.formData.pCode = obj.code
      },
      // tree
      // TODO: 将返回内容用作搜索
      treeLocalSearch(data) {
        //
        // console.log(data)
      },
      // 设置表格高度
      setTableHeight() {
        this.tableHeight = this.$refs.body.offsetHeight
      },
      // header
      headerSearchEnter(val) {
        this.headerSearchValue = val
        this.tableParams.search = val ? val + '&search_fields=sex,age_x,remark,status,sort,operater,updated_at,name' : ''
        this.$refs.table.request()
        // FIXME: 在搜索状态下新增的内容后刷新表格，带key
      },
      headerSearchCancel() {
        this.headerSearchValue = ''
        this.tableParams.search = ''
        this.$refs.table.request()
      },
      headerAdd() {
        this.add.formData.remark = ''
        this.add.formData.sex = 0
        this.add.showModal = true
      },
      headerDelete() {
        this.deleteOneModal = true
      },
      toSelectMode() {
        this.selectionData = []
        this.isSelectMode = true
      },
      exitSelectMode() {
        this.selectionData = []
        this.isSelectMode = false
      },
      // table
      tableEdit(row, i, col) {
        this.resetEditForm(row)
        this.edit.showModal = true
      },
      tableRowEdit(row, e) {
        this.resetEditForm(row)
        this.edit.showModal = true
      },
      tableDelete(row, i, col) {
        this.selectionData = [row]
        this.deleteOneModal = true
      },
      tableRowDelete(row, e) {
        this.selectionData = [row]
        this.deleteOneModal = true
      },
      tableSelectRow(arr, row, i) {
        this.selectionData = arr
      },
      tableCancelSelectRow(arr, row, i) {
        this.selectionData = arr
      },
      tableSelectAll(arr) {
        this.selectionData = arr
      },
      tableAllSelection(arr) {
        //
      },
      tableSelectionChange(arr) {
        //
      },
      tableClickRow(arr, row, i, col) {
        //
      },
      // form
      isEmpty(data) {
        if (data === '' || data === undefined) {
          return true
        } else {
          return false
        }
      },
      setParentId(obj) {
        // 如果是最上级
        // console.log('setParentId', obj)
        if (obj.level === 1) {
          this.parentId = 0
        } else {
          this.parentId = obj.id
        }
      },
      resetEditForm(obj) {
        console.log('edit', obj)
        this.edit.formData = obj
      },
      // delete
      async deleteAffirm() {
        try {
          let send = []
          this.selectionData.map(function(value, i, arr) {
            send.push(value.id)
          })
          await this.deleteDiagnoseRules({ids: send.join()})
          this.$refs.table.request()
          this.deleteOneModal = false
        } catch (err) {
          console.error(err)
        }
      },
      // add

      async addFormSave(data) {
        try {
          let send = _.cloneDeep(data)
          for (let item of send.rules) {
            if (item.relate_type === 3) {
              item.express = item.relate_id
            }
          }
          await this.addDiagnoseRules(send)
          this.add.showModal = false
          this.$refs.table.request()
          this.sortValue++
        } catch (err) {
          console.error(err)
        }
      },
      addFormCancel() {
        this.add.showModal = false
      },
      // edit
      editCascaderChange(val, selection) {
        this.cascaderData = selection
        this.setParentId(selection[selection.length - 1])
        // console.log('返回', val, selection)
      },
      editCascaderEnd(isShow) {
        if (!isShow) {
          this.edit.formData.pCode = this.cascaderData[this.cascaderData.length - 1].code
        }
      },
      editSortCtrl(val) {
        this.edit.formData.sort = val
      },
      editFormInputName(val) {
        // console.log('input内', val)
        // this.edit.formData.name = val
      },
      editFormInputSelect(data) {
        this.edit.formData.code = data.code
      },
      async editFormSave(data) {
        try {
          let send = _.cloneDeep(data)
          console.log('edit', send)

          for (let item of send.rules) {
            if (item.relate_type === 3) {
              item.express = item.relate_id
            }
          }
          send.diagnose_result = send.diagnose_result.id
          send.status = Number(send.status)
          await this.editDiagnoseRules(send)
          this.edit.showModal = false
          this.$refs.table.request()
          console.log('edit', send)
        } catch (err) {
          console.error(err)
        }
      },
      editFormCancel() {
        this.edit.showModal = false
      },
    },
  }
</script>
<style lang="less" scoped>
.diagnostic-rule-management {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  .container {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
    & > div {
      width: 100%;
      height: 100%;
    }
    .tree-wrapper {
      flex: 1;
      height: 100%;
      overflow: hidden;
    }
    .table-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .header {
        .header-content-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          height: 100%;
        }
      }
      .body {
        display: flex;
        width: 100%;
        flex: 1;

        & > div {
          width: 100%;
        }
      }
    }
  }
}
</style>
<style lang="less">
.diagnostic-rule-management {
  .drm-modal-content {
    padding-top: 20px;
    color:#737373;
    .drm-form-row {
      display: flex;
      align-items: center;
      // & > span {
      //   height: 30px;
      //   line-height: 30px;
      //   margin-bottom: 20px;
      // }
      // > div > span{
      //   height: 30px;
      //   line-height: 30px;
      //   margin-bottom: 20px;
      // }
    }
    .drm-row-item{
      display:flex;
      justify-content: flex-end;
      // align-items:center;
    }
    .drm-table-wrapper{
      height:280px;
      border:1px solid #d9d9d9;
      overflow: hidden;
      border-radius:8px;
    }
    .drm-form-textarea{
      display: flex;
    }
    .drm-form-row-height-label {
      padding-top: 7px;
      line-height: 20px;
    }
    .drm-form-row-height {
      display: flex;
      height: 60px;
    }
    .drm-flex1 {
      flex: 1;
    }
    .drm-item-label {
      // width: 96px;
      overflow: hidden;
      text-align: justify;
      text-align-last: justify;
      height: 30px;
      line-height: 30px;
      margin-bottom: 20px;
    }
    .drm-item-large {
      width:282px;
    }
    .drm-item-small {
      width: 228px;
    }
    .drm-flex-line{
      display:flex;
      flex:1;
      align-items:center;
      height:30px;
      padding:0 4px;
      // background:#ccc;
    }
    .drm-flex-line:after{
      content:'';
      flex:1;
      height:1px;
      background: #ccc;
    }
    .drm-operator {
      line-height: 12px;
    }
  }
  .drm-modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // height: 50px;
    padding-right: 20px;
    padding-bottom:20px;
    & > label {
      margin-right: 20px;
    }
  }
}
</style>
