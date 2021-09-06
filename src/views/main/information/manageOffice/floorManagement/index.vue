/*
* 楼层管理
* @author 肖康
* @date 2018.3.5
*/
<template>
  <div class='floor-management'>
    <div class="container contentBg">
      <split-pane :min='22'
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
          <div class="fm-tree-wrapper">
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
          <!-- header -->
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
                            @click="headerAdd">新 增</Button>
                              <Button type="ghost"
                            class="marginR10" @click="exportBtn">导 出</Button>
                  <Button type="ghost"
                            @click="toSelectMode">选 择</Button>
                </template>
                <template v-else>
                  <Button type="success"
                            class="marginR10"
                            :disabled="selectionData.length===0"
                            @click="headerDelete">删 除</Button>
                  <Button type="primary"
                            @click="exitSelectMode">取 消</Button>
                </template>
              </div>
            </content-header>
          </div>
          <!-- body -->
          <div class="body"
               ref="body">
            <q-table ref="table"
                     :ifEdit="true"
                     :selectMode="isSelectMode"
                     :height="tableHeight"
                     :width="700"
                     :columns="tableColumns"
                     :data="tableData"
                     :params="tableParams"
                     :pageInfo="tableInfo"
                     :requestDataApi="getFloors"
                     :initReq="false"
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
                     @on-row-dbClick="tableRowEdit"  @getRequestParams="getRequestParams">
            </q-table>
          </div>
        </div>
      </split-pane>
    </div>
    <!-- add -->
    <Modal v-model="add.showModal"
           v-if="add.showModal"
           width="440"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="新增楼层"
                      :headerVal="sortValue"
                      @alert-retrun-num="addSortCtrl"></alert-header>
      </div>
      <Form :model="add.formData"
            :rules="formRules"
            class="fmm-modal-content paddingL20 paddingR20"
            ref="addForm">
        <div class="fmm-form-row">
          <span class="fmm-item-label">上级位置</span>
          <FormItem class="fmm-flex1 marginL10">
            <!-- TODO: -->
            <Cascader filterable
                      change-on-select
                      :data="floorAll.items"
                      v-model="add.formData.parent"
                      @on-change="addCascaderChange"
                      @on-visible-change="addCascaderEnd"></Cascader>
          </FormItem>
          <!-- <div class="fmm-flex1"></div> -->
          <!-- <span class="fmm-item-label">上级经济行业代码</span>
          <FormItem prop="pCode"
                    class="fmm-item-small marginL10">
            <Input disabled
                   v-model="add.formData.pCode"></Input>
          </FormItem> -->
        </div>
        <div class="fmm-form-row">
          <span class="fmm-item-label">位置名称</span>
          <FormItem prop="name"
                    class="fmm-flex1 marginL10">
            <Input v-model.trim="add.formData.name"
                   :class="{inputVerificationTs: isEmpty(add.formData.name)}"></Input>
          </FormItem>
        </div>
        <div class="fmm-form-row-height marginB20">
          <span class="fmm-item-label fmm-form-row-height-label">备注</span>
          <Input type="textarea"
                 v-model="add.formData.remark"
                 class="fmm-flex1 marginL10"></Input>
        </div>
      </Form>
      <div slot="footer"
           class="">
        <div class="fmm-modal-footer">
          <Checkbox v-model="add.formData.status">启用</Checkbox>
          <Button @click="addFormSave"
                    type="primary"
                    class="marginR20">保 存</Button>
          <Button @click="addFormCancel"
                    type="ghost">取 消</Button>
        </div>
      </div>
    </Modal>
    <!-- edit -->
    <Modal v-model="edit.showModal"
           v-if="edit.showModal"
           width="440"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="编辑楼层"
                      :headerVal="edit.formData.sort"
                      @alert-retrun-num="editSortCtrl"></alert-header>
      </div>
      <Form :model="edit.formData"
            :rules="formRules"
            class="fmm-modal-content paddingL20 paddingR20"
            ref="addForm">
        <div class="fmm-form-row">
          <span class="fmm-item-label">上级位置</span>
          <FormItem class="fmm-flex1 marginL10">
            <!-- TODO: -->
            <Cascader filterable
                      change-on-select
                      :data="floorAll.items"
                      v-model="edit.formData.parent"
                      @on-change="addCascaderChange"
                      @on-visible-change="addCascaderEnd"></Cascader>
          </FormItem>
        </div>
        <div class="fmm-form-row">
          <span class="fmm-item-label">位置名称</span>
          <FormItem prop="name"
                    class="fmm-flex1 marginL10">
                       <Input v-model.trim="edit.formData.name"
                   :class="{inputVerificationTs: isEmpty(edit.formData.name)}"></Input>
          </FormItem>
        </div>
        <div class="fmm-form-row-height marginB20">
          <span class="fmm-item-label fmm-form-row-height-label">备注</span>
          <Input type="textarea"
                 v-model="edit.formData.remark"
                 class="fmm-flex1 marginL10"></Input>
        </div>
        <div class="fmm-operator marginT10 marginB20">
          <span>最后修改人：</span>
          <span>{{edit.formData.operater}}</span>
          <span class="marginL10">最后修改时间：</span>
          <span>{{edit.formData.updated_at|timeFilter}}</span>
        </div>
      </Form>
      <div slot="footer"
           class="">
        <div class="fmm-modal-footer">
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
    <affirm-del-modal :controlModal="deleteModal"
                      :delCounts="selectionData.length"
                      @delCancel="deleteModal=false"
                      @affirmDel="deleteAffirm">
    </affirm-del-modal>
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
import filters from '@/utils/fifters'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
export default {
  // TODO:
  name: 'floorManagement',
  components: {
    contentHeader,
  },
  data() {
    return {
      // page
      treeSelectSingle: {},
      parentId: 0,
      // tree
      tree: {
        width: 24,
        data: [],
      },
      // header
      showTitle: true,
      exportParams: {
        reqParams: {},
        columns: [
          {
            title: '位置名称',
            key: 'name',
          },

          {
            title: '备注',
            key: 'remark',
          },
          {
            title: '启用',
            key: 'status',
            ellipsis: 'true',
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
            render: (data) => {
              if (data) {
                return filters.timeFilter(
                  data,
                  'YYYY-MM-DD HH:mm'
                )
              } else {
                return ''
              }
            },
          },
        ],
      },
      // table
      tableTitle: '楼层列表',
      isSelectMode: false,
      tableHeight: 568,
      selectionData: [],
      tableParams: {},
      tableColumns: [
        {
          title: '位置名称',
          key: 'name',
          ellipsis: true,
          // minWidth: 314,
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
            if (p.row.updated_at) {
              return h('span', {}, [
                filters.timeFilter(p.row.updated_at, 'YYYY-MM-DD HH:mm'),
              ])
            }
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
      // form
      sortValue: 0,
      cascaderData: [],
      haveChildText: '',
      // add
      add: {
        showModal: false,
        formData: {
          status: true,
          name: '',
          remark: '',
        },
      },
      // edit
      edit: {
        showModal: false,
        formData: {
          status: true,
          name: '',
          remark: '',
        },
      },
      formRules: {
        name: [
          // TODO:
          {
            // validator: nameValidator,
            required: true,
            message: '位置名称为必填',
            // trigger: ['change', 'blur'],
            trigger: 'blur',
          },
        ],
      },
      // delete
      deleteModal: false,
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
    // TODO:
    ...mapState('floorManagementModule', [
      'floorTree',
      'floors',
      'floorTreeParent',
      'floorTreeChild',
      'floorAll',
    ]),
    ...mapGetters('floorManagementModule', ['doneParentIds']),
    // table
    tableData() {
      return this.floors.items
    },
    tableInfo() {
      return this.floors.meta
    },
    // tree
    treeData() {
      // TODO: treedata
      let data = _.cloneDeep(this.floorTree.items)
      let result = [
        {
          title: '所有区域',
          selected: true,
          level: 1,
          id: 1,
          children: data,
          expand: true,
        },
      ]
      // this.deepTree(result[0].children, result[0])
      // console.log('floorTree', result)
      return result
    },
  },
  async created() {
    await Promise.all([
      // TODO:
      this.getFloors({filters: `parent_id:0;`}),
      this.getFloorsTree({ per_page: 100000, filters: `parent_id:0;isTree:1` }),
      this.getFloorAll({ filters: `isTree:1` }),
    ])
    // this.getEconIndustryAll({filters: `isTree:1`}),
  },
  mounted() {
    this.pageInit()
  },
  methods: {

    ...mapMutations('floorManagementModule', ['setSingleData']),

    ...mapActions('floorManagementModule', [
      'getFloors',
      'getFloorsTree',
      'getFloorParent',
      'getFloorAll',
      'getFloorChild',
      'addFloors',
      'editFloors',
      'deleteFloors',
    ]),
    // page
    setTableHeight() {
      this.tableHeight = this.$refs.body.offsetHeight
    },
    pageInit() {
      // 初始化sort
      // TODO:
      // FIXME: 这里考虑是取所有还是对应层级的最大值
      this.sortValue = this.floors.meta.total + 1
    },
    setTableTitle(text) {
      this.tableTitle = text
    },
    deleteValidator(arr) {
      for (let item of arr) {
        if (item.is_children) {
          this.haveChildText = `该区域包含${item.is_children}个位置，无法删除。`
          this.deleteModalHasChild = true
          return true
        }
      }
      return false
    },
    async setFormParentData(id, child) {
      let data = []
      // TODO:
      await this.getFloorParent(id)
      for (let item of this.doneParentIds) {
        data.push(item.id)
      }
      this.add.formData.parent = _.cloneDeep(data)
      this.edit.formData.parent = _.cloneDeep(data)
      if (child) {
        this.add.formData.parent.splice(this.doneParentIds.length - 1)
        this.edit.formData.parent.splice(this.doneParentIds.length - 1)
      }
    },
    // tree
    treeSearch(data) {
      // TODO:
      this.getFloorsTree({ search: data, filters: 'isTree:1' })
    },
    treeSearchEnter(e, value) {
      this.treeSearch(value)
    },
    treeSearchAddrim(e, value) {
      this.treeSearch(value)
    },
    treeSearchCancel(text) {
      // TODO: 更新tree数据 还原
      if (!text.length) {
        this.getFloorsTree({search: '', filters: 'parent_id:0;isTree:1'})
      }
    },
    async treeLoadData(item, callback) {
      // TODO: 获取子级数据
      if (item.is_children) {
        await this.getFloorChild({ filters: `parent_id:${item.id};isTree:1` })
      }
      callback(_.cloneDeep(this.floorTreeChild.items))
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
      if (data[0].level === 1) {
        this.tableParams.filters = `parent_id:0`
        this.$refs.table.request()
      } else {
        this.treeSelectSingle = data[0]
        if (!this.isLastData(data[0])) {
          this.tableParams.filters = `parent_id:${data[0].id}`
          this.$refs.table.request()
        }
      }
      // this.setTableTitle(data[0].title)
      this.setParentId(data[0])
    },
    async treeAdd(data) {
      // TODO: 新增
      // console.log('123', data)
      if (data.level === 1) {
        this.add.formData.parent = []
      } else {
        await this.setFormParentData(data.id)
      }
      this.setParentId(data)
      this.add.formData.remark = ''
      this.add.formData.name = ''
      this.add.formData.status = true
      this.add.showModal = true
    },
    setDelteText(num) {
      this.haveChildText = `该区域包含${num}个位置，无法删除。`
    },
    treeDelete(data) {
      // TODO: 删除
      // console.log(data)
      if (!this.deleteValidator([data])) {
        this.selectionData = [data]
        this.deleteModal = true
      }
    },
    treePutAwayAll() {
      //
    },
    treeExpandAll() {
      //
    },
    // header
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('楼层管理', {
        // TODO:
        api: api.floorManagement.getFloors,
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
    headerSearchEnter(val) {
      this.tableParams.search = val
      this.$refs.table.request()
      // FIXME: 在搜索状态下新增的内容后刷新表格，带key
    },
    headerSearchCancel() {
      this.tableParams.search = ''
      this.$refs.table.request()
    },
    async headerAdd() {
      if (this.treeSelectSingle.id) {
        await this.setFormParentData(this.treeSelectSingle.id)
      } else {
        this.add.formData.parent = []
      }
      // console.log('add')
      this.add.formData.remark = ''
      this.add.formData.name = ''
      // this.edit.formData.id = ''
      this.edit.formData.name = ''
      // this.edit.formData.code = ''
      this.edit.formData.status = 1
      this.add.showModal = true
    },
    headerDelete() {
      // 删除
      if (!this.deleteValidator(this.selectionData)) {
        this.deleteModal = true
      }
    },
    toSelectMode() {
      this.selectionData = []
      this.isSelectMode = true
    },
    exitSelectMode() {
      // TODO: 取消
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
      this.selectionData = [row]
      if (!this.deleteValidator(this.selectionData)) {
        this.deleteModal = true
      }
    },
    tableRowDelete(row, e) {
      this.selectionData = [row]
      if (!this.deleteValidator(this.selectionData)) {
        this.deleteModal = true
      }
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
      // TODO: 验证失效
      // console.log('验证', data)
      if (data === '' || data === undefined) {
        return true
      } else {
        return false
      }
    },
    setParentId(obj) {
      // 如果是最上级
      // console.log('setParentId', obj)
      if (obj.level && obj.level === 1) {
        this.parentId = 0
      } else {
        this.parentId = obj.id
      }
    },
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
        // TODO:
        // this.add.formData.pCode = this.cascaderData[this.cascaderData.length - 1].code
      }
    },
    async addFormSave() {
      if (!await this.$refs.addForm.validate()) {
        return
      }

      try {
        // console.log('id', this.parentId)
        await this.addFloors({
          parent_id: this.parentId,
          name: this.add.formData.name,
          remark: this.add.formData.remark,
          status: Number(this.add.formData.status),
          sort: this.sortValue,
        })
        // console.log(this.add.formData)
        this.add.showModal = false
        // 级联数据
        this.getFloorAll({ filters: `isTree:1` })
        // FIXME: 获取对应层级的数据
        this.getFloorsTree({per_page: 100000, filters: `parent_id:0;isTree:1`})
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
    resetEditForm(obj) {
      // console.log('edit', obj)
      this.edit.formData.id = obj.id
      this.edit.formData.name = obj.name
      this.edit.formData.remark = obj.remark
      this.edit.formData.status = !!obj.status
      this.edit.formData.operater = obj.operater
      this.edit.formData.updated_at = obj.updated_at
      this.edit.formData.sort = obj.sort
    },
    editSortCtrl(val) {
      this.edit.formData.sort = val
    },
    async editFormSave() {
      try {
        // console.log('表单', this.edit.formData)
        await this.editFloors({
          id: this.edit.formData.id,
          parent_id: this.parentId,
          name: this.edit.formData.name,
          remark: this.edit.formData.remark,
          status: Number(this.edit.formData.status),
          sort: this.edit.formData.sort,
        })
        this.getFloorAll({ filters: `isTree:1` })
        this.getFloorsTree({ per_page: 100000, filters: `isTree:1` })
        this.edit.showModal = false
        console.log('表格tableParams', this.tableParams)
        this.tableParams.filters = `parent_id:${this.parentId}`
        this.$refs.table.request()
      } catch (err) {
        console.error(err)
      }
    },
    editFormCancel() {
      this.edit.showModal = false
    },
    // delete
    async deleteAffirm() {
      try {
        let send = []
        this.selectionData.map(function(value, i, arr) {
          send.push(value.id)
        })
        await this.deleteFloors(send)
        this.deleteModal = false
        this.deleteModalHasChild = false
        // TODO: 更新table和tree
        Promise.all([
          this.$refs.table.request(),
          this.getFloorAll({ filters: `isTree:1` }),
          this.getFloorsTree({ per_page: 100000, filters: `isTree:1` }),
        ])
      } catch (err) {
        console.error(err)
      }
    },
    deleteModalcChange(val) {
      this.deleteModalHasChild = val
    },
  },
}
</script>

<style lang="less" scoped>
.floor-management {
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
      .fm-tree-wrapper{
        height:~"calc(100% - 40px)";
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
.floor-management {
  .fmm-modal-content {
    padding-top: 20px;
    .fmm-form-row {
      display: flex;
      align-items: center;
      & > span {
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
      }
    }
    .fmm-form-row-height-label {
      padding-top: 7px;
      line-height: 20px;
    }
    .fmm-form-row-height {
      display: flex;
      height: 60px;
    }
    .fmm-flex1 {
      flex: 1;
    }
    .fmm-item-label {
      width: 48px;
      overflow: hidden;
      text-align: justify;
      text-align-last: justify;
      color: #737373;
    }
    .fmm-item-large {
      width: 200px;
      color: #4a4a4a;
    }
    .fmm-item-small {
      width: 60px;
    }
    .fmm-operator {
      line-height: 12px;
      color: #737373;
    }
  }
  .fmm-modal-footer {
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
