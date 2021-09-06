/**
* created: xk
* date:2018.01.30
* content: 经济行业管理
*/
<template>
  <div class="economic-type-management">
    <div class="container contentBg">
      <split-pane :min='26'
                  :max='30'
                  direction="horizontal"
                  v-model="tree.width">
        <div class="tree-wrapper"
             slot="left">
          <div class="input-wrapper">
            <local-search-input @on-enter="treeSearchEnter"
                                @on-addirm="treeSearchAddrim"
                                @search-key="treeSearchCancel"></local-search-input>
          </div>
          <div class="ctm-tree-wrapper">
          <s-tree ref="tree"
                  :loadData="treeLoadData"
                  :data='treeData'
                  @on-select-change='treeSelectChange'
                  @expandAll="treeExpandAll"
                  @putAwayAll="treePutAwayAll"
                  @on-adds="treeAdd"
                  @on-deletes="treeDelete"></s-tree>
          </div>
                  
        </div>
        <div class="table-wrapper"
             slot="right">
          <div class="header">
            <content-header :showTitle="showTitle">
              <div slot="title">{{tableTitle}}</div>
              <!-- <div slot="other">123</div> -->
              <div slot="contents"
                   class="header-content-wrapper paddingR20">
                <search-input searText="请输入搜索内容"
                              @on-enter="headerSearchEnter"
                              @on-Icon="headerSearchEnter"
                              @on-cancel="headerSearchCancel"
                              :searchWidth="220">
                </search-input>
                <template v-if="!isSelectMode">
                  <Button type="ghost"
                            class="marginR10"
                            @click="headerAdd"
                            key="add">新 增</Button>
                  <Button type="ghost"
                            class="marginR10"
                            @click="exportBtn"
                            key="output">导 出</Button>
                  <Button type="ghost"
                            @click="toSelectMode"
                            key="select">选 择</Button>
                </template>
                <template v-else>
                  <Button type="success"
                            class="marginR10"
                            :disabled="selectionData.length===0"
                            @click="headerDelete"
                            key="del">删 除</Button>
                  <Button type="primary"
                            @click="exitSelectMode"
                            key="cancel">取 消</Button>
                </template>
              </div>
            </content-header>
          </div>
          <div class="body"
               ref="body">
            <q-table ref="table"
                     :ifEdit="true"
                     :selectMode="isSelectMode"
                     :height="tableHeight"
                     :columns="tableColumns"
                     :data="tableData"
                     :params="tableParams"
                     :pageInfo="tableInfo"
                     :requestDataApi="getEconIndustryLists"
                     :initReq="false"
                     :width="700"
                     @edit="tableEdit"
                     @edit-row="tableRowEdit"
                     @delete="tableDelete"
                     @delete-row="tableRowDelete"
                     @on-select="tableSelectRow"
                     @on-select-cancel="tableCancelSelectRow"
                     @on-select-all="tableSelectAll"
                     @all-selection="tableAllSelection"
                     @on-selection-change="tableSelectionChange"
                     @getRequestParams="getRequestParams"
                     @on-row-click="tableClickRow"  @on-row-dbClick="tableRowEdit">
            </q-table>
          </div>
        </div>
      </split-pane>
    </div>
    <!-- 新增 -->
    <Modal v-model="add.showModal"
           v-if="add.showModal"
           width="537"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="新增经济行业"
                      :headerVal="sortValue"
                      @alert-retrun-num="addSortCtrl"></alert-header>
      </div>
      <Form :model="add.formData"
            :rules="formRules"
            class="etm-modal-content paddingL20 paddingR20"
            ref="addForm">
        <div class="etm-form-row">
          <span class="etm-item-label">上级经济行业名称</span>
          <FormItem class="etm-item-large marginL10">
            <Cascader filterable
                      change-on-select
                      :data="econIndustryAll.items"
                      v-model="add.formData.pName"
                      @on-change="addCascaderChange"
                      @on-visible-change="addCascaderEnd" placeholder=" "></Cascader>
          </FormItem>
          <div class="etm-flex1"></div>
          <span class="etm-item-label">上级经济行业代码</span>
          <FormItem prop="pCode"
                    class="etm-item-small marginL10">
            <Input disabled
                   v-model="add.formData.pCode"></Input>
          </FormItem>
        </div>
        <div class="etm-form-row">
          <span class="etm-item-label">经济行业名称</span>
          <FormItem prop="name"
                    class="etm-item-large marginL10">
            <select-input v-model="add.formData.name"
                          :class='{inputVerificationTs: isEmpty(add.formData.name)}'
                          :data="econIndustryStds.items"
                          @input="addFormInputName"
                          @getSelect="addFormInputSelect"></select-input>
          </FormItem>
          <div class="etm-flex1"></div>
          <span class="etm-item-label">经济行业代码</span>
          <FormItem class="etm-item-small marginL10">
            <Input disabled
                   v-model="add.formData.code"></Input>
          </FormItem>
        </div>
        <div class="etm-form-row-height marginB20">
          <span class="etm-item-label etm-form-row-height-label">备注</span>
          <Input type="textarea"
                 v-model="add.formData.remark"
                 class="etm-flex1 marginL10"></Input>
        </div>
      </Form>
      <div slot="footer"
           class="">
        <div class="etm-modal-footer">
          <Checkbox v-model="add.formData.status">启用</Checkbox>
          <Button @click="addFormSave"
                    type="primary"
                    class="marginR20">保 存</Button>
          <Button @click="addFormCancel"
                    type="ghost">取 消</Button>
        </div>
      </div>
    </Modal>
    <!-- 编辑 -->
    <Modal v-model="edit.showModal"
           v-if="edit.showModal"
           width="537"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="编辑经济行业"
                      :headerVal="edit.formData.sort"
                      @alert-retrun-num="editSortCtrl"></alert-header>
      </div>
      <Form :model="edit.formData"
            :rules="formRules"
            class="etm-modal-content paddingL20 paddingR20"
            ref="editForm">
        <div class="etm-form-row">
          <span class="etm-item-label">上级经济行业名称</span>
          <FormItem class="etm-item-large marginL10">
            <Cascader filterable
                      change-on-select
                      :data="econIndustryAll.items"
                      v-model="edit.formData.pName"
                      @on-change="editCascaderChange"
                      @on-visible-change="editCascaderEnd"></Cascader>
          </FormItem>
          <div class="etm-flex1"></div>
          <span class="etm-item-label">上级经济行业代码</span>
          <FormItem class="etm-item-small marginL10">
            <Input disabled
                   v-model="edit.formData.pCode"></Input>
          </FormItem>
        </div>
        <div class="etm-form-row">
          <span class="etm-item-label">经济行业名称</span>
          <FormItem prop="name"
                    class="etm-item-large marginL10">
            <select-input v-model="edit.formData.name"
                          :class='{inputVerificationTs: isEmpty(edit.formData.name)}'
                          :data="econIndustryStds.items"
                          @input="editFormInputName"
                          @getSelect="editFormInputSelect"></select-input>
          </FormItem>
          <div class="etm-flex1"></div>
          <span class="etm-item-label">经济行业代码</span>
          <FormItem class="etm-item-small marginL10">
            <Input disabled
                   v-model="edit.formData.code"></Input>
          </FormItem>
        </div>
        <div class="etm-form-row-height">
          <span class="etm-item-label etm-form-row-height-label">备注</span>
          <Input type="textarea"
                 class="etm-flex1 marginL10"
                 v-model="edit.formData.remark"></Input>
        </div>
        <div class="etm-operator marginT10 marginB20">
          <span>最后修改人：</span>
          <span>{{edit.formData.operater}}</span>
          <span class="marginL10">最后修改时间：</span>
          <span>{{edit.formData.updated_at|timeFilter}}</span>
        </div>
      </Form>
      <div slot="footer">
        <div class="etm-modal-footer">
          <Checkbox v-model="edit.formData.status">启用</Checkbox>
          <Button @click="editFormSave"
                    type="primary"
                    class="marginR20">保 存</Button>
          <Button @click="editFormCancel"
                    type="ghost">取 消</Button>
        </div>
      </div>
    </Modal>
    <!-- 删除 -->
    <affirm-del-modal :controlModal="deleteOneModal"
                      :delCounts="selectionData.length"
                      @delCancel="deleteOneModal=false"
                      @affirmDel="deleteAffirm">
    </affirm-del-modal>
    <!-- 删除多级 -->
    <!-- <affirm-del-modal :controlModal="deleteModalHasChild"
                      @delCancel="deleteModalHasChild=false"
                      @affirmDel="deleteAffirm"
                      :rests="false"
                      :content="haveChildText">
    </affirm-del-modal> -->
    <!-- 删除多级 -->
    <affirm-del-modal :modalWidth="355"
                      :showFooter="false"
                      :closable="true"
                      :controlModal="deleteModalHasChild"
                      @delCancel="deleteModalHasChild=false"
                      @affirmDel="deleteAffirm"
                      :rests="false"
                      :content="haveChildText"
                      @on-visible-change="deleteModalcChange">
    </affirm-del-modal>
  </div>
</template>
<script>
import contentHeader from '@/components/contentHeader'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
import filters from '@/utils/fifters'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
// import zSearchTree from './components/tree/searchTree'

export default {
  name: 'economicIndustryManagement',
  components: {
    contentHeader,
    // zSearchTree,

  },
  data() {
    // const nameValidator = (rule, value, callback, source, options) => {
    //   if (value.toString().length <= 0) {
    //     callback(new Error('经济行业名称不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      exportParams: {
        reqParams: {},
        columns: [
          {
            key: 'name',
            title: '经济行业名称',
          },
          {
            title: '经济行业代码',
            key: 'remark',
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
          },
        ],
      },
      // icon
      urlImg: '/static/icons/public/enabledState.svg',
      remarkIcon: '/static/icons/public/remarkInCell.svg',
      haveChildText: '该项下存在子项,确认删除?',
      // 当前层级
      level: 1,
      headerSearchValue: '',
      isSelectMode: false,
      // 选中数据
      selectionData: [],
      treeSelectSingle: {},
      tableHeight: 568,
      tableParams: {},
      tableColumns: [
        {
          title: '经济行业名称',
          key: 'name',
          ellipsis: true,
          // minWidth: 120,
        },
        {
          title: '经济行业代码',
          key: 'code',
          ellipsis: true,
          // minWidth: 120,
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
          },
        },
        {
          title: '启用',
          width: 60,
          align: 'center',
          key: 'status',
          filterType: 'type',
          filterOptions: [
            {
              label: '启用',
              value: 1,
            },
            {
              label: '未启用',
              value: 0,
            },
          ],
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
          filterType: 'date',
          key: 'updated_at',
          width: 130,
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
      tree: {
        width: 26,
        data: [],
      },
      // sort
      sortValue: 0,
      parentId: 0,
      // rules
      formRules: {
        name: [
          {
            required: true,
            // validator: nameValidator,
            message: '经济行业名称为必填',
            trigger: 'blur',
          },
        ],
        // pName: [
        //   {
        //     validator: nameValidator,
        //     message: '上级经济行业名称为必填',
        //     trigger: ['change', 'blur'],
        //   },
        // ],
      },
      // 新增
      add: {
        showModal: false,
        formData: {
          name: '',
          code: '',
          pName: [],
          pCode: '',
          remark: '',
          status: true,
        },

      },
      // 编辑
      edit: {
        showModal: false,
        formData: {
          id: '',
          name: '',
          code: '',
          pName: [],
          pCode: '',
          remark: '',
          status: true,
        },
      },
      // 删除
      deleteOneModal: false,
      tableTitle: '经济行业列表',
      deleteModalHasChild: false,
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
    ...mapState('economicIndustryManagementModule', [
      'econIndustryLists',
      'econIndustryStds',
      'econIndustryTreeChild',
      'econIndustryTree',
      'econIndustryAll',
      'econIndustryTreeParent',
    ]),
    ...mapGetters('economicIndustryManagementModule', ['doneParentIds']),
    // ...mapGetters('economicIndustryManagement', ['doneEconTypesTree']),
    // FIXME: 界面交互更改，待确认是否需要
    showTitle() {
      // 如果是当前展示一级，那么显示title
      return this.level === 1
    },
    tableData() {
      return this.econIndustryLists.items
    },
    tableInfo() {
      // console.log('info', this.econTypes)
      return this.econIndustryLists.meta
    },
    treeData() {
      let data = _.cloneDeep(this.econIndustryTree.items)
      let result = [
        {
          title: '所有行业',
          selected: true,
          level: 1,
          id: 0,
          children: data,
          expand: true,
          code: '',
          $parent: undefined,
        },
      ]
      // this.deepTree(result[0].children, result[0])
      console.log('resule', result)
      return result
    },
  },
  async created() {
    await Promise.all([
      this.getEconIndustryLists({filters: `parent_id:0;`}),
      this.getEconIndustryTree({per_page: 100000, filters: `parent_id:0;isTree:1`}),
      this.getEconIndustryAll({per_page: 100000, filters: `isTree:1`}),
      this.getEconIndustryStds({per_page: 100000, filters: `isTree:0`}),
    ])
    this.pageInit()
  },
  mounted() {
    this.$nextTick(function() {
      this.setTableHeight()
    })
  },
  methods: {
    ...mapMutations('economicIndustryManagementModule', ['setSingleData']),
    ...mapActions('economicIndustryManagementModule', [
      'getEconIndustryLists',
      'getEconIndustryStds',
      'getEconIndustryTree',
      'getEconIndustryTreeChild',
      'getEconIndustryAll',
      'getEconIndustryTreeParent',
      'addEconIndustry',
      'editEconIndustry',
      'deleteEconIndustry',
    ]),
    deleteModalcChange(val) {
      this.deleteModalHasChild = val
    },
    deleteValidator(arr) {
      for (let item of arr) {
        if (item.is_children) {
          this.haveChildText = `该行业包含${item.is_children}个子类，无法删除。`
          this.deleteModalHasChild = true
          return true
        }
      }
      return false
    },
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('经济行业管理', {
        api: api.economicIndustryManagement.getEconIndustryLists,
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
      this.sortValue = this.econIndustryLists.meta.total + 1
    },
    // tree
    treeSearchEnter(e, value) {
      this.treeSearch(value)
    },
    treeSearchAddrim(e, value) {
      this.treeSearch(value)
    },
    treeSearchCancel(text) {
      if (!text.length) {
        this.getEconIndustryTree({search: '', filters: 'parent_id:0;isTree:1'})
      }
    },
    treeSearch(data) {
      //
      // console.log(data)
      this.getEconIndustryTree({search: data, filters: 'isTree:1'})
    },
    async treeLoadData(item, callback) {
      console.log('item', item)
      if (item.is_children) {
        await this.getEconIndustryTreeChild({ filters: `parent_id:${item.id};isTree:1` })
      }
      callback(_.cloneDeep(this.econIndustryTreeChild.items))
    },
    treePutAwayAll() {
      //
    },
    treeExpandAll() {
      //
    },
    async treeAdd(data) {
      console.log('123', data)
      if (data.level === 1) {
        this.add.formData.pName = []
        this.add.formData.pCode = ''
      } else {
        await this.setFormParentData(data.id)
      }
      this.setParentId(data)
      // getEconIndustryTreeParent
      this.add.formData.remark = ''
      this.add.formData.name = ''
      this.add.showModal = true
      console.log(this.add.formData)
    },
    setDelteText(num) {
      this.haveChildText = `该行业包含${num}个子类，无法删除。`
    },
    treeDelete(data) {
      if (data.id === this.treeSelectSingle.id) {
        this.treeSelectSingle = {}
      }

      console.log(data)
      if (!this.deleteValidator([data])) {
        this.selectionData = [data]
        this.deleteOneModal = true
      }

      // if (data.is_children || (data.children && data.children.length)) {
      //   this.deleteModalHasChild = true
      //   this.selectionData = [data]
      //   return
      // }
      // this.selectionData = [data]
      // this.deleteOneModal = true
    },
    deepTree (tree, parent) {
      for (let i in tree) {
        tree[i].$parent = parent
        if (tree[i].children && tree[i].children.length > 0) {
          this.deepTree(tree[i].children, tree[i])
        }
      }
    },
    isLastData(data) {
      if (!data.is_children) {
        // this.$set(this.tableData, data)
        this.setSingleData(_.cloneDeep(data))
        return true
      } else {
        return false
      }
    },
    treeSelectChange(data) {
      if (!data.length) {
        return
      }
      if (data[0].title === '所有行业') {
        this.tableParams.filters = `parent_id:0`
        this.$refs.table.request()
      } else {
        this.treeSelectSingle = data[0]
        if (!this.isLastData(data[0])) {
          this.tableParams.filters = `parent_id:${data[0].id}`
          this.$refs.table.request()
        }
      }
      this.setTableTitle(data[0].title)
      this.setParentId(data[0])
    },
    setTableTitle(text) {
      this.tableTitle = text
    },
    // 获取tree上级
    //
    // 设置表单父级内容
    async setFormParentData(id, isTree) {
      let data = []
      await this.getEconIndustryTreeParent(id)
      for (let item of this.doneParentIds) {
        data.push(item.id)
      }
      console.log('ids', this.doneParentIds)
      console.log('ids', data)
      this.add.formData.pName = _.cloneDeep(data)
      this.add.formData.pCode = ''
      this.edit.formData.pName = _.cloneDeep(data)
      this.edit.formData.pCode = ''
      if (isTree) {
          // 父级
        this.add.formData.pName.splice(this.doneParentIds.length - 1)
        this.edit.formData.pName.splice(this.doneParentIds.length - 1)
        this.doneParentIds.pop()
        if (this.doneParentIds.length) {
          this.add.formData.pCode = _.cloneDeep(this.doneParentIds.pop().code)
          this.edit.formData.pCode = _.cloneDeep(this.add.formData.pCode)
        }
        console.log('表单pNmae', this.add.formData.pName)
      } else {
        this.add.formData.pCode = _.cloneDeep(this.doneParentIds.pop().code)
        this.edit.formData.pCode = _.cloneDeep(this.add.formData.pCode)
      }
    },
    treeLocalSearch(data) {
      //
      console.log(data)
    },
    // 设置表格高度
    setTableHeight() {
      this.tableHeight = this.$refs.body.offsetHeight
    },
    etTableTitle(text) {
      this.tableTitle = text
    },
    // header
    headerSearchEnter(val) {
      this.headerSearchValue = val
      // this.tableParams.search = val ? val + '&search_fields=name,code,remark,status,sort,operater' : ''
      this.tableParams.search = val
      this.$refs.table.request()
      // FIXME: 在搜索状态下新增的内容后刷新表格，带key
    },
    headerSearchCancel() {
      this.headerSearchValue = ''
      this.tableParams.search = ''
      this.$refs.table.request()
    },
    async headerAdd() {
      if (this.treeSelectSingle.id) {
        await this.setFormParentData(this.treeSelectSingle.id)
      } else {
        this.add.formData.pName = []
      }
      this.add.formData.remark = ''
      this.add.formData.name = ''
      console.log(this.add.formData, this.econIndustryAll.items)
      this.add.showModal = true
    },
    headerDelete() {
      // if (this.hasChild(this.selectionData)) {
      //   this.deleteModalHasChild = true
      // } else {
      //   this.deleteOneModal = true
      // }
      // this.setDefaultTipText()

      if (!this.deleteValidator(this.selectionData)) {
        this.deleteOneModal = true
      }
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
    async tableEdit(row, i, col) {
      await this.setFormParentData(row.id, true)
      this.resetEditForm(row)
      this.edit.showModal = true
    },
    async tableRowEdit(row, e) {
      await this.setFormParentData(row.id, true)
      this.resetEditForm(row)
      this.edit.showModal = true
    },
    tableDelete(row, i, col) {
      // this.selectionData = [row]
      this.selectionData = [row]
      if (!this.deleteValidator(this.selectionData)) {
        this.deleteOneModal = true
      }

      // if (this.hasChild(this.selectionData)) {
      //   this.deleteModalHasChild = true
      // } else {
      //   this.deleteOneModal = true
      // }
      // this.setDefaultTipText()
    },
    tableRowDelete(row, e) {
      this.selectionData = [row]
      this.selectionData = [row]
      if (!this.deleteValidator(this.selectionData)) {
        this.deleteOneModal = true
      }

      // if (this.hasChild(this.selectionData)) {
      //   this.deleteModalHasChild = true
      // } else {
      //   this.deleteOneModal = true
      // }
      // this.setDefaultTipText()
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
      // console.log('edit', obj)
      this.edit.formData.id = obj.id
      this.edit.formData.name = obj.name
      this.edit.formData.code = obj.code
      this.edit.formData.remark = obj.remark
      this.edit.formData.status = !!obj.status
      this.edit.formData.operater = obj.operater
      this.edit.formData.updated_at = obj.updated_at
      this.edit.formData.sort = obj.sort
    },
    // delete
    hasChild(arr) {
      for (let item of arr) {
        if (item.is_children || (item.children && item.children.length)) {
          this.haveChildText = '选中项内数据存在子项！'
          return true
        }
      }
    },
    setDefaultTipText() {
      this.haveChildText = '该项下存在子项,确认删除?'
    },
    async deleteAffirm() {
      try {
        let send = []
        this.selectionData.map(function(value, i, arr) {
          send.push(value.id)
        })
        await this.deleteEconIndustry(send)
        this.deleteOneModal = false
        this.deleteModalHasChild = false
        await Promise.all([
          this.$refs.table.request(),
          this.getEconIndustryTree({per_page: 100000, filters: 'isTree:1'}),
          this.getEconIndustryAll({per_page: 100000, filters: `isTree:1`}),
        ])
      } catch (err) {
        console.error(err)
      }
    },
    // add
    addSortCtrl(val) {
      this.sortValue = val
    },
    addCascaderChange(val, selection) {
      this.cascaderData = selection
      this.setParentId(selection[selection.length - 1])
      // console.log('返回', val, selection)
    },
    addCascaderEnd(isShow) {
      if (!isShow) {
        this.add.formData.pCode = this.cascaderData[this.cascaderData.length - 1].code
      }
    },
    addFormInputName(val) {
      // console.log('输入值：', val)
      // this.add.formData.name = val
    },
    addFormInputSelect(data) {
      // console.log(data)
      this.add.formData.code = data.code
    },
    async addFormSave() {
    //  TODO: 验证无效
      let val = await this.$refs.addForm.validate()
      console.log('验证是', val)
      if (!val) {
        return
      }
      try {
        await this.addEconIndustry({
          parent_id: this.parentId,
          name: this.add.formData.name,
          code: this.add.formData.code,
          remark: this.add.formData.remark,
          status: Number(this.add.formData.status),
          sort: this.sortValue,
        })
        this.add.showModal = false
        await Promise.all([
          this.$refs.table.request(),
          this.getEconIndustryAll({filters: `isTree:1`}),
          this.getEconIndustryTree({per_page: 100000, filters: `parent_id:0;isTree:1`}),
        ])
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
    async editFormSave() {
      let val = await this.$refs.editForm.validate()
      if (!val) {
        return
      }
      try {
        // console.log('id', this.parentId)
        await this.editEconIndustry({
          id: this.edit.formData.id,
          parent_id: this.parentId,
          name: this.edit.formData.name,
          code: this.edit.formData.code,
          remark: this.edit.formData.remark,
          status: Number(this.edit.formData.status),
          sort: this.edit.formData.sort,
        })
        this.$refs.table.request()
        this.getEconIndustryAll({per_page: 100000, filters: `isTree:1`})
        this.getEconIndustryTree({per_page: 100000, filters: `isTree:1`})
        this.edit.showModal = false
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
.economic-type-management {
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
    .tree-wrap{
      background: #F2F7FF;
    }
    .tree-wrapper {
      flex: 1;
      height: 100%;
      overflow: hidden;
      background: #F2F7FF;
      .input-wrapper {
        width: 100%;
        padding: 10px 10px 0 10px;
      }
      .ctm-tree-wrapper{
        height: ~"calc(100% - 40px)";
      }
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
.economic-type-management {
  .etm-modal-content {
    padding-top: 20px;
    color: #737373;
    .etm-form-row {
      display: flex;
      align-items: center;
      & > span {
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
      }
    }
    .etm-form-row-height-label {
      padding-top: 7px;
      line-height: 20px;
    }
    .etm-form-row-height {
      display: flex;
      height: 60px;
      textarea {
        color: #4a4a4a;
      }
    }
    .etm-flex1 {
      flex: 1;
    }
    .etm-item-label {
      width: 96px;
      overflow: hidden;
      text-align: justify;
      text-align-last: justify;
    }
    .etm-item-large {
      width: 200px;
      color: #4a4a4a;
    }
    .etm-item-small {
      width: 60px;
    }
    .etm-operator {
      line-height: 12px;
    }
  }
  .etm-modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // height: 50px;
    padding-right: 20px;
    padding-bottom: 20px;
    & > label {
      margin-right: 20px;
    }
  }
}
</style>
