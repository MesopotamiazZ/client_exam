/*
* 职务管理
* @author xk
* @date 2018.3.5
*/
<template>
  <div class='propfes-manage'>
    <div class="container contentBg">
      <div class="table-wrapper"
           slot="right">
        <!-- header -->
        <div class="header">
          <content-header :showTitle="showTitle">
            <div slot="title">职务列表</div>
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
                          class="marginR10"  @click="exportBtn">导 出</Button>
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
        <div class="tab-wrapper">
          <s-tabs :list="['行政职务','党内职务']"
                  margin="30"
                  @on-change="tabChange"></s-tabs>
        </div>
        <!-- body -->
        <div class="body"
             ref="body"
             v-if="tabPage ===1">
          <q-table ref="table"
                   :ifEdit="true"
                   :selectMode="isSelectMode"
                   :height="tableHeight"
                   :columns="tableColumns"
                   :data="tableData"
                   :params="tableParams"
                   :pageInfo="tableInfo"
                   :requestDataApi="getPorfes"
                   :width="700"
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
                   @on-row-dbClick="tableRowEdit"  @getRequestParams="getRequestParams('admin')">
          </q-table>
        </div>
        <div class="body"
             ref="body"
             v-else>
          <q-table ref="innerTable"
                   :ifEdit="true"
                   :selectMode="isSelectMode"
                   :height="tableHeight"
                   :width="700"
                   :columns="tableColumns"
                   :data="innerTableData"
                   :params="tableParams"
                   :pageInfo="innerTableInfo"
                   :requestDataApi="getInnerD"
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
                   @on-row-dbClick="tableRowEdit"  @getRequestParams="getRequestParams('innner')">
          </q-table>
        </div>
      </div>
    </div>
    <!-- add -->
    <Modal v-model="add.showModal"
           v-if="add.showModal"
           width="410"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header :headerText="modalTitle"
                      :headerVal="sortValue"
                      @alert-retrun-num="addSortCtrl"></alert-header>
      </div>
      <Form :model="add.formData"
            :rules="formRules"
            class="fmm-modal-content paddingL20 paddingR20"
            ref="addForm">
        <!-- <s-tabs :list="['行政职务','党内职务']"
                margin="30"
                @on-change="addModalTabChange"></s-tabs> -->
        <div class="fmm-modal-content-wrapper">
          <div v-if="addTabPage===1"
               class="marginB20">
            <div class="fmm-form-row">
              <span>职务</span>
              <FormItem class="fmm-item-large marginL10" prop="name">
                <!-- TODO: -->
                <Input v-model.trim="add.formData.name"
                   :class="{inputVerificationTs: isEmpty(add.formData.name)}"></Input>
              </FormItem>
              <span class="marginL20">人数</span>
              <FormItem class="marginL10 fmm-flex1"
                        style="width:70px">
                <!-- TODO: -->
                <z-input disabled></z-input>
              </FormItem>
            </div>
            <!-- 备注 -->
            <div class="fmm-form-row-height marginB20">
              <span class="fmm-item-label fmm-form-row-height-label">备注</span>
              <Input type="textarea"
                     v-model="add.formData.remark"
                     class="fmm-flex1 marginL10"></Input>
            </div>
          </div>
          <div v-else
               class="marginB20">
            <div class="fmm-form-row">
              <span>职务</span>
              <FormItem class="fmm-item-large marginL10">
                   <Input v-model.trim="add.formData.name"
                   :class="{inputVerificationTs: isEmpty(add.formData.name)}"></Input>
              </FormItem>
              <span class=" marginL20">人数</span>
              <FormItem class="marginL10 fmm-flex1"
                        style="width:70px">
                <!-- TODO: -->
                <z-input disabled></z-input>
              </FormItem>
            </div>
            <!-- 备注 -->
            <div class="fmm-form-row-height marginB20">
              <span class="fmm-item-label fmm-form-row-height-label">备注</span>
              <Input type="textarea"
                     v-model="add.formData.remark"
                     class="fmm-flex1 marginL10"></Input>
            </div>
          </div>
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
           width="410"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="编辑职务"
                      :headerVal="edit.formData.sort"
                      @alert-retrun-num="editSortCtrl"></alert-header>
      </div>
      <Form :model="edit.formData"
            :rules="formRules"
            class="fmm-modal-content paddingL20 paddingR20"
            ref="editForm">
         <div class="fmm-form-row marginT20">
              <span>职务</span>
              <FormItem class="fmm-item-large marginL10">
                      <Input v-model.trim="edit.formData.name"
                   :class="{inputVerificationTs: isEmpty(edit.formData.name)}"></Input>
              </FormItem>
              <span class=" marginL20">人数</span>
              <FormItem class="marginL10 fmm-flex1"
                        style="width:70px">
                <!-- TODO: -->
                <z-input disabled v-model="edit.formData.number"></z-input>
              </FormItem>
            </div>
            <!-- 备注 -->
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
    <!-- <affirm-del-modal :controlModal="deleteModalHasChild"
                      @delCancel="deleteModalHasChild=false"
                      @affirmDel="deleteAffirm"
                      :rests="false"
                      :content="haveChildText">
    </affirm-del-modal> -->
  </div>
</template>

<script>
import contentHeader from '@/components/contentHeader'
import sTabs from '@/components/tab/sTabs'
import { mapState, mapActions } from 'vuex'
// import _ from 'lodash'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
import filters from '@/utils/fifters'
export default {
  // TODO:
  name: 'profesManage',
  components: {
    contentHeader,
    sTabs,
  },
  data() {
    return {
      // page
      treeSelectSingle: {},
      tabPage: 1,
      // header
      exportParams: {
        reqAdminParams: {},
        reqInnerParams: {},
        columnsAdmin: [
          {
            title: '职务名称',
            key: 'name',
          },
          {
            title: '人数',
            key: 'number',
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
        columnsInner: [
          {
            title: '职务名称',
            key: 'name',
          },
          {
            title: '人数',
            key: 'number',
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
      showTitle: true,
      // table
      isSelectMode: false,
      tableHeight: 568,
      selectionData: [],
      tableParams: {},
      tableColumns: [
        {
          title: '职务',
          key: 'name',
          ellipsis: true,
          // minWidth: 414,
        },
        {
          title: '人数',
          key: 'number',
          ellipsis: true,
          // minWidth: 130,
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
      // modal
      // haveChildText: '删除问题',
      addTabPage: 1,
      // form
      sortValue: 0,
      // add
      add: {
        showModal: false,
        formData: {
          status: true,
        },
      },
      // edit
      edit: {
        showModal: false,
        formData: {
          status: true,
        },
      },
      formRules: {
        name: [
          // TODO:
          {
            // validator: nameValidator,
            required: true,
            message: '职务名称为必填',
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
    ...mapState('profesManageModule', [
      'porfes',
      'innerD',
    ]),
    isPorfes() {
      // console.log('行政', this.tabPage === 1)
      return this.tabPage === 1
    },
    modalTitle() {
      if (this.tabPage === 1) {
        return '新增行政职务'
      } else {
        return '新增党内职务'
      }
    },
    // ...mapGetters('profesManageModule', ['doneParentIds']),
    // table
    tableData() {
      return this.porfes.items
    },
    innerTableData() {
      return this.innerD.items
    },
    innerTableInfo() {
      return this.innerD.meta
    },
    tableInfo() {
      return this.porfes.meta
    },
  },
  async created() {
    await Promise.all([
      // TODO:
      this.getPorfes(),
      this.getInnerD(),
      // this.getPorfesTree({ per_page: 100000, filters: `parent_id:0;isTree:1` }),
      // this.getFloorAll({ filters: `isTree:1` }),
    ])
    // this.getEconIndustryAll({filters: `isTree:1`}),
  },
  methods: {
    // TODO:
    ...mapActions('profesManageModule', [
      'getPorfes',
      'getInnerD',
      'addInnerD',
      'editInnerD',
      'deleteInnerD',
      'addPorfes',
      'editPorfes',
      'deletePorfes',
    ]),
    // page
    setTableHeight() {
      this.tableHeight = this.$refs.body.offsetHeight
    },
    setSort() {
      if (this.isPorfes) {
        this.sortValue = this.porfes.meta.total + 1
      } else {
        this.sortValue = this.innerD.meta.total + 1
      }
    },
    // header
    exportBtn() {
        // console.log('导出')
      let _this = this
      if (this.isPorfes) {
        exportXlsx('职务管理（行政职务）', {
        // TODO:
          api: api.profesManage.getPorfesAs,
          params: this.exportParams.reqAdminParams,
          columns: this.exportParams.columnsAdmin,
          callback (result) {
            if (result) {
              _this.$Message.success('导出成功')
            } else {
              _this.$Message.error('导出失败')
            }
          },
        })
      } else {
        exportXlsx('职务管理（党内职务）', {
        // TODO:
          api: api.profesManage.getInnerDuties,
          params: this.exportParams.reqInnerParams,
          columns: this.exportParams.columnsInner,
          callback (result) {
            if (result) {
              _this.$Message.success('导出成功')
            } else {
              _this.$Message.error('导出失败')
            }
          },
        })
      }
    },
    getRequestParams(params, who) {
      if (who === 'admin') {
        this.exportParams.reqAdminParams = params
      } else {
        this.exportParams.reqInnerParams = params
      }
    },
    headerSearchEnter(val) {
      this.tableParams.search = val
      if (this.isPorfes) {
        this.$refs.table.request()
      } else {
        this.$refs.innerTable.request()
      }
      // FIXME: 在搜索状态下新增的内容后刷新表格，带key
    },
    headerSearchCancel() {
      this.tableParams.search = ''
      if (this.isPorfes) {
        this.$refs.table.request()
      } else {
        this.$refs.innerTable.request()
      }
    },
    headerAdd() {
      this.add.formData.remark = ''
      this.add.formData.name = ''
      this.add.formData.status = 1
      this.setSort()
      this.add.showModal = true
    },
    headerDelete() {
      // 删除
      this.deleteModal = true
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
      this.deleteModal = true
    },
    tableRowDelete(row, e) {
      this.selectionData = [row]
      this.deleteModal = true
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
    addSortCtrl(val) {
      this.sortValue = val
    },
    editSortCtrl(val) {
      this.edit.formData.sort = val
    },
    addCascaderChange(val, selection) {
      this.cascaderData = selection
      // TODO:
      // this.setParentId(selection[selection.length - 1])
      // console.log('返回', val, selection)
    },
    addCascaderEnd(isShow) {
      if (!isShow) {
        // TODO:
        // this.add.formData.pCode = this.cascaderData[this.cascaderData.length - 1].code
      }
    },
    tabChange(i) {
      this.tabPage = i + 1
    },
    addModalTabChange(i) {
      this.addTabPage = i + 1
    },
    async addFormSave() {
      let val = await this.$refs.addForm.validate()
      if (!val) {
        return
      }

      let send = {
        name: this.add.formData.name,
        sort: this.sortValue,
        status: this.add.formData.status,
        remark: this.add.formData.remark,
      }
      try {
        if (this.isPorfes) {
          await this.addPorfes(send)
          this.add.showModal = false
          this.$refs.table.request()
        } else {
          await this.addInnerD(send)
          this.add.showModal = false
          this.$refs.innerTable.request()
        }
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
      this.edit.formData.number = obj.number
    },
    async editFormSave() {
      let val = await this.$refs.editForm.validate()
      if (!val) {
        return
      }
      let send = {
        id: this.edit.formData.id,
        name: this.edit.formData.name,
        sort: this.edit.formData.sort,
        status: Number(this.edit.formData.status),
        remark: this.edit.formData.remark,
      }
      try {
        if (this.isPorfes) {
          await this.editPorfes(send)
          this.edit.showModal = false
          this.$refs.table.request()
        } else {
          await this.editInnerD(send)
          this.edit.showModal = false
          this.$refs.innerTable.request()
        }
      } catch (err) {
        console.error(err)
      }
      // try {
      //   // console.log('id', this.parentId)
      //   await this.editEconType({
      //     id: this.edit.formData.id,
      //     parent_id: this.parentId,
      //     name: this.edit.formData.name,
      //     code: this.edit.formData.code,
      //     remark: this.edit.formData.remark,
      //     status: Number(this.edit.formData.status),
      //     sort: this.edit.formData.sort,
      //   })
      //   this.getEconTypeAll()
      this.edit.showModal = false
      // } catch (err) {
      //   console.error(err)
      // }
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
        if (this.isPorfes) {
          await this.deletePorfes(send)
          this.deleteModal = false
          this.$refs.table.request()
        } else {
          await this.deleteInnerD(send)
          this.deleteModal = false
          this.$refs.innerTable.request()
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.propfes-manage {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  .tab-wrapper {
    height: 50px;
    padding-left: 20px;
    box-sizing: content-box;
    border-top: 1px solid #d9d9d9;
  }
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
      >div:last-child{
        height: ~"calc(100% - 40px)";
      }
      .input-wrapper {
        width: 100%;
        padding: 10px 10px 0 10px;
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
.propfes-manage {
  .fmm-modal-content {

    // padding-top: 20px;
    .fmm-modal-content-wrapper {
      // border-top: 1px solid #d8d8d8;
      padding-top: 20px;
    }
    .have-bg {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #cccccc;
      background: #fafafa;
      border-radius: 4px;
      padding: 25px 0;
    }
    .check-wrapper {
      width: 50%;
      padding: 5px 0 5px 30px;
    }
    .fmm-add-content {
      display: flex;
      height: 30px;
      align-items: center;
    }
    .add-btn {
      cursor: pointer;
    }
    .fmm-form-row {
      display: flex;
      align-items: center;
      & > span {
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
        color: #737373;
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
      width: 24px;
      overflow: hidden;
      text-align: justify;
      text-align-last: justify;
      color: #737373;
    }
    .fmm-item-large {
      width: 202px;
      color: #4a4a4a;
    }
    .fmm-item-small {
      width: 223px;
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