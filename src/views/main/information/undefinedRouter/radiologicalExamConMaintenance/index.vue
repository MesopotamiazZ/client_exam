/* jiangyiling */
<template>
    <div class="managementOccupationalHealthExamination-all">
        <div class="managementOccupationalHealthExamination-all-content">
            <!-- 页面头部 -->
            <titlet-hasSlot>
                <span slot="titletHasSlotLeftTitle">放射职业体检结论列表</span>
                <div slot="titletHasSlotRightContent"
                     class="content">
                    <search-input class="input"
                                  searText="请输入搜索内容"
                                  @on-enter="enterSearch"
                                  @on-Icon="enterSearch"
                                  @on-cancel="enterSearch"
                                  :searchWidth='220'></search-input>
                    <div v-if='showGroupOut' key="1"
                         class="group-out">
                        <Button type="ghost"
                                  class="fl marginR10"
                                  @click="addButton">新 增</Button>
                        <Button type="ghost"
                                  class="fl marginR10"
                                  @click="exportBtn">导 出</Button>
                        <Button type="ghost"
                                  class="fl marginR10"
                                  @click="selectButton">选 择</Button>
                    </div>
                    <div v-else key="2"
                         class="group-in">
                        <Button type="success"
                                  :disabled="showDelButton"
                                  class="fl marginR10"
                                  @click="deleCheckBoxItem">删 除</Button>
                        <!-- <Button type="ghost"
                                  class="fl marginR10">打 印</Button> -->
                        <Button type="primary"
                                  class="fl marginR10"
                                  @click="cancelButton">取 消</Button>
                    </div>
                </div>
            </titlet-hasSlot>
            <!-- 表格 -->
            <div class="table"
                 ref="content">
                <q-table ref="baseInfoTable"
                         :selectMode="isSelectMode"
                         :columns="columns"
                         :data="occupHealthExaminationTypesList"
                         :pageInfo="pageInfo"
                         :height="tableHeight"
                         :params="params"
                         :requestDataApi="getManagementList"
                         :ifEdit="true"
                         @edit="editRow"
                         @edit-row='editRow'
                         @on-row-dbClick="editRow"
                         @delete="delOneRow"
                         @delete-row='delOneRow'
                         @getRequestParams="getRequestParams"
                         @on-selection-change='checkboxSelect'
                         @all-selection="allSelection"
                         >
                </q-table>
            </div>
        </div>
        <!-- 新增弹窗 -->
        <div class="add-modal"
             v-if="addModalDiv">
            <Modal v-model="addModalDiv"
                   width="536"
                   :transition-names="[]"
                   :mask-closable="false"
                   :transfer="false"
                   :closable="false">
                <div slot="header">
                    <alert-header headerText="新增放射职业体检结论"
                                  :headerVal="totalsort"
                                  @alert-retrun-num="addSortFun"></alert-header>
                </div>
                <div class="content-footer">
                    <Form ref="addForm"
                          :model="addModal.data"
                          :rules="addModal.rule">
                        <div class="content">
                            <div class="item1">
                                <span class="title">职业健康检查种类</span>
                                <div class="category">
                                    <FormItem prop="testOne">
                                        <!-- <select-input v-model="addModal.data.name"
                                  :data="itemNameList"></select-input> -->
                                        <Select v-model="addModal.data.testOne"
                                                :filterable='true'>
                                            <Option value="1"
                                                    key="1">1</Option>
                                            <Option value="2"
                                                    key="2">2</Option>
                                            <Option value="3"
                                                    key="3">3</Option>
                                        </Select>
                                    </FormItem>
                                    <span v-show="starDisplay"
                                          class="star-mark1">*</span>
                                </div>
                                <span class="ideaName">意见名称</span>
                                <div class="ideaNameInput">
                                    <FormItem prop="testTwo">
                                        <Input v-model="addModal.data.testTwo">
                                        </Input>
                                    </FormItem>
                                    <span v-show="starDisplay"
                                          class="star-mark">*</span>
                                </div>
                            </div>
                            <div class="item2">
                                <span class="title">放射工作适应性意见</span>
                                <Input class="input"
                                       type="textarea"
                                       v-model="addModal.data.remark"></Input>
                                <span v-show="starDisplay"
                                      class="star-mark">*</span>
                            </div>
                            <div class="item2">
                                <span class="title">备注</span>
                                <Input class="input"
                                       type="textarea"
                                       v-model="addModal.data.remark"></Input>
                            </div>
                        </div>
                        <div class="footer">

                            <Checkbox class="checkBox"
                                      @on-change="newStatusValueFun">是否默认</Checkbox>
                            <Checkbox class="checkBox"
                                      @on-change="newStatusValueFun">启用</Checkbox>
                            <FormItem>
                                <Button type="primary"
                                        class="marginR20"
                                        @click="saveNewItem('addForm')">保 存</Button>
                            </FormItem>
                            <Button type="ghost"
                                    @click="cancelNewItem">取 消</Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
        <!-- 编辑弹窗 -->
        <div class="edit-modal"
             v-if="editModalDiv">
            <Modal v-model="editModalDiv"
                   width="536"
                   :transition-names="[]"
                   :mask-closable="false"
                   :transfer="false"
                   :closable="false">
                <div slot="header">
                    <alert-header headerText="编辑放射职业体检结论"
                                  :headerVal="editSort"
                                  @alert-retrun-num="editSortFun"></alert-header>
                </div>
                <div class="content-footer">
                    <Form ref="editForm"
                          :model="editModal.data"
                          :rules="editModal.rule">
                        <div class="content">
                            <div class="item1">
                                <span class="title">职业健康检查种类</span>
                                <div class="category">
                                    <FormItem prop="name">
                                        <!-- <select-input v-model="editModal.data.name"
                                  :data="itemNameList"></select-input> -->
                                        <Select v-model="editModal.data.testOne"
                                                :filterable='true'>
                                            <Option value="1"
                                                    key="1">1</Option>
                                            <Option value="2"
                                                    key="2">2</Option>
                                            <Option value="3"
                                                    key="3">3</Option>
                                        </Select>
                                    </FormItem>
                                    <span v-show="starDisplay"
                                          class="star-mark">*</span>
                                </div>
                                <span class="ideaName">意见名称</span>
                                <div class="ideaNameInput">
                                    <FormItem prop="testTwo">
                                        <Input v-model="editModal.data.testTwo">
                                        </Input>
                                    </FormItem>
                                    <span v-show="starDisplay"
                                          class="star-mark">*</span>
                                </div>
                            </div>
                            <div class="item2">
                                <span class="title">放射工作适应性意见</span>
                                <Input class="input"
                                       type="textarea"
                                       v-model="addModal.data.remark"></Input>
                                <span v-show="starDisplay"
                                      class="star-mark">*</span>
                            </div>
                            <div class="item2">
                                <span class="title">备注</span>
                                <Input class="input"
                                       type="textarea"
                                       v-model.trim="editModal.data.remark"></Input>
                            </div>
                            <div class="item3">
                                <span class="lastUser">最后修改人：{{editModal.data.operater}}</span>
                                <span class="updatetime">最后修改时间：{{lastTime}}</span>
                            </div>
                        </div>
                        <div class="footer">
                            <Checkbox class="checkBox"
                                      @on-change="editStatusBool">是否默认</Checkbox>
                            <Checkbox class="checkBox"
                                      v-model="editStatusBool">启用</Checkbox>
                            <FormItem>
                                <Button type="primary"
                                        class="marginR20"
                                        @click="saveEdit('editForm')">保 存</Button>
                            </FormItem>
                            <Button type="ghost"
                                    @click="editModalDiv = false">取 消</Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
        <affirm-del-modal :delCounts="deletItemLength"
                          :controlModal="controlModal"
                          @delCancel="delCancel"
                          @affirmDel="affirmDelItem"></affirm-del-modal>
        <!-- <affirm-del-modal :delCounts="deletItemLength" :controlModal="controlModal" @delCancel="delCancel" @affirmDel="affirmDelItem"></affirm-del-modal> -->
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'
import moment from 'moment'
import * as _ from 'lodash'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
export default {
  name: 'managementOccupationalHealthExamination',
  components: {
    titletHasSlot,
  },
  data() {
    return {
      // test
      exportParams: {
        reqParams: {},
        columns: [
          {
            key: 'name',
            title: '职业健康检查种类',
          },
          {
            key: 'name',
            title: '意见名称',
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
      data2: [],
      // 验证
      addModal: {
        data: {
          name: '',
          remark: '',
          status: 0,
        },
        rule: {
          name: [
            {
              required: true,
              message: '名称必须填写',
              trigger: ['blur', 'change'],
            },
          ],
        },
      },
      // 删除
      showDelButton: true,
      controlModal: false,
      deletItemLength: null,
      clickId: null,
      checkboxId: null,
      // 编辑
      lastTime: null,
      editSort: null,
      editStatusBool: false,
      editModal: {
        data: {
          name: '',
        },
        rule: {
          name: [
            {
              required: true,
              message: '名称必须填写',
              trigger: 'blur',
            },
          ],
        },
      },
      addNewItemData: {},
      showGroupOut: true,
      newStatus: 0,
      // 表格参数
      isSelectMode: false,
      tableHeight: 400,
      statusValue: '',
      // 弹框
      addModalDiv: false,
      editModalDiv: false,
      params: {},
      urlRemark: '/static/icons/public/remarkInCell.svg',
      searchText: '',
      totalsort: null,
    }
  },
  methods: {
    ...mapMutations('managementOccupationalHealthExaminationModule', [
      'requestPagingo',
    ]),
    ...mapActions('managementOccupationalHealthExaminationModule', [
      'getManagementList',
      'adNewItemFun',
      'amendItemFun',
      'deletItemFun',
      'getNameList',
    ]),
    // 显示顺序
    addSortFun(data) {
      this.addModal.data.sort = data
    },
    editSortFun(data) {
      this.editModal.data.sort = data
    },
    allSelection(data) {
      this.checkboxId = data.map(item => {
        return item.id
      })
    },
    // 翻页
    /* pageSizeChange() {
      this.checkboxId = []
    }, */
    // 删除
    delCancel() {
      this.controlModal = false
    },
    deleCheckBoxItem() {
      this.controlModal = true
      this.deletItemLength = this.checkboxId.length
      this.clickId = null
    },
    delOneRow(data) {
      this.clickId = data.id
      this.deletItemLength = 1
      this.controlModal = true
    },
    checkboxSelect(data) {
      this.checkboxId = data.map(item => {
        return item.id
      })
      if (this.checkboxId.length) {
        this.showDelButton = false
      } else {
        this.showDelButton = true
      }
    },
    async affirmDelItem() {
      if (this.clickId) {
        await this.deletItemFun({ ids: this.clickId })
        if (
          this.pageInfo.total <=
            (this.pageInfo.current_page - 1) * this.pageInfo.per_page + 1 &&
          this.pageInfo.current_page !== 1
        ) {
          await this.$refs.baseInfoTable.request({
            page: this.pageInfo.current_page - 1,
          }) // 重新请求页面数据
        } else {
          await this.$refs.baseInfoTable.request() // 重新请求页面数据
        }
        /* this.totalsort -- */
      }
      if (this.checkboxId && !this.clickId) {
        await this.deletItemFun({ ids: this.checkboxId })
        if (
          this.pageInfo.total <=
            (this.pageInfo.current_page - 1) * this.pageInfo.per_page +
              this.checkboxId.length &&
          this.pageInfo.current_page !== 1
        ) {
          await this.$refs.baseInfoTable.request({
            page: this.pageInfo.current_page - 1,
          })
        } else {
          await this.$refs.baseInfoTable.request()
        }
        /* this.totalsort = this.totalsort - this.checkboxId.length */
      }
      this.$refs.baseInfoTable.allSelection = []
      this.checkboxId = []
      this.clickId = null
      this.showDelButton = true
      this.controlModal = false
    },
    // 编辑
    editRow(owData, event) {
      this.editSort = owData.sort
      this.editModal.data = _.clone(owData)
      this.lastTime = moment(
        parseInt(this.editModal.data.updated_at * 1000),
      ).format('YYYY-MM-DD H:mm')
      this.editStatusBool = !!this.editModal.data.status
      this.editModalDiv = true
    },
    /* dbClickEditRow() {

    }, */
    async saveEdit(formName) {
      var thisdatan = {
        id: this.editModal.data.id,
        params: {
          name: this.editModal.data.name,
          remark: this.editModal.data.remark,
          status: this.editStatusBool ? 1 : 0,
          sort: this.editModal.data.sort,
        },
      }
      try {
        if (await this.$refs[formName].validate()) {
          await this.amendItemFun(thisdatan)
          await this.$refs.baseInfoTable.request()
          this.editModalDiv = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 新增启动
    newStatusValueFun(data) {
      if (data) {
        this.newStatus = 1
      } else {
        this.newStatus = 0
      }
    },
    async saveNewItem(formName) {
      this.addModal.data.status = this.newStatus
      this.addModal.data.sort = this.totalsort
      try {
        if (await this.$refs[formName].validate()) {
          console.log(this.addModal.data)
          await this.adNewItemFun(this.addModal.data)
          await this.$refs.baseInfoTable.request()
          this.addModalDiv = false
        }
      } catch (error) {
        console.dir(error)
      }
    },
    // 新增项目
    cancelNewItem() {
      this.addModalDiv = false
    },
    // 模糊搜索
    async addButton() {
      if (!this.itemNameList.length) {
        await this.getNameList({ with: 'itemType:name', per_page: 100000 })
      }
      this.totalsort = this.pageInfo.total + 1
      this.addModalDiv = true
      this.addModal.data.name = ''
      this.addModal.data.remark = ''
    },
    async enterSearch(val) {
      if (!val && !this.searchText) {
        return
      }
      this.params.search = val
      await this.$refs.baseInfoTable.request()
      this.checkboxId = []
      this.searchText = val
    },
    // 启用
    /* async statusValueChange(data) {
      this.params.status = data
      await this.$refs.baseInfoTable.request()
    }, */
    // 选择按钮
    selectButton() {
      this.showGroupOut = !this.showGroupOut
      this.isSelectMode = !this.isSelectMode
    },
    // 取消按钮
    cancelButton() {
      this.showGroupOut = !this.showGroupOut
      this.isSelectMode = !this.isSelectMode
      this.$refs.baseInfoTable.allSelection = []
      this.checkboxId = []
    },
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('放射职业体检结论列表', {
        api: api.managementOccupationalHealthExamination.getList,
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
  },
  computed: {
    ...mapState(['windowHeight']),
    ...mapGetters('managementOccupationalHealthExaminationModule', [
      'occupHealthExaminationTypesList',
      'pageInfo',
      'itemNameList',
    ]),
    // 验证
    starDisplay() {
      if (this.addModalDiv && this.addModal.data.name) {
        return false
      }
      if (this.editModalDiv && this.editModal.data.name) {
        return false
      }
      return true
    },
    columns() {
      return [
        {
          title: '职业健康检查种类',
          key: 'name',

        },
        {
          title: '意见名称',
          key: 'name',

        },
        {
          title: '放射工作适应性意见',
          key: 'name',

        },
        {
          title: '备注',
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
          title: '是否默认',
          key: 'status',
          width: 60,
          align: 'center',
          ellipsis: 'true',
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('status-in-table')
            }
          },
          titleRender: (row) => {
            return ''
          },
        },
        {
          title: '启用',
          key: 'status',
          width: 60,
          align: 'center',
          ellipsis: 'true',
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('status-in-table')
            }
          },
          titleRender: (row) => {
            return ''
          },
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
        },
        {
          title: '显示顺序',
          key: 'sort',
          width: 70,
        },
        {
          title: '最后修改人',
          key: 'operater',
          width: 90,
        },
        {
          title: '最后修改时间',
          key: 'updated_at',
          width: 130,
          render: (h, params) => {
            return h(
              'span',
              moment(parseInt(params.row.updated_at * 1000)).format(
                'YYYY-MM-DD H:mm',
              ),
            )
          },
          filterType: 'date',
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.content.offsetHeight
    },
  },
  async created() {
    /* this.totalsort = this.pageInfo.total + 1 */
  },
  mounted() {
    this.tableHeight = this.$refs.content.offsetHeight
  },
  destroyed() {
    this.requestPagingo()
  },
}
</script>
<style lang="less" >
@import (reference) '~assets/less/variable.less';
.managementOccupationalHealthExamination-all {
  padding: 10px;
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  .managementOccupationalHealthExamination-all-content {
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    .titlet-has-slot {
      overflow: visible;
      .paddingT10 {
        height: 50px;
        .content {
          height: 30px;
          display: flex;
          .title {
            display: inline-block;
            line-height: 30px;
            font-size: 12px;
            margin-right: 10px;
          }
          .select {
            vertical-align: top;
            margin-right: 20px;
          }
          .input {
            vertical-align: top;
            margin-right: 20px;
          }
          .group-out {
            height: 30px;
            button:last-child {
              margin-right: 0px;
            }
          }
          .group-in {
            button:last-child {
              margin-right: 0px;
            }
          }
        }
      }
    }
    .table {
      height: calc(~'100% - 50px');
    }
  }
  .add-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .content-footer {
      height: 280px;
      .content {
        height: 210px;
        .item1 {
          height: 50px;
          padding-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 108px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .category {
            width: 144px;
            position: relative;
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 12px;
              top: 7px;
            }
            .star-mark1 {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 20px;
              top: 7px;
            }
          }
          .ideaName {
            margin-left: 32px;
            margin-right: 10px;
            width: 48px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .ideaNameInput {
            width: 144px;
            position: relative;
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 12px;
              top: 7px;
            }
          }
        }
        .item2 {
          margin-top: 20px;
          margin-left: 20px;
          position: relative;
          display: flex;
          .title {
            display: inline-block;
            margin-top: 7px;
            width: 108px;
            margin-right: 10px;
            text-align-last: justify;
          }
          .input {
            width: 378px;
            height: 60px;
            textarea {
              height: 100%;
            }
          }
          .star-mark {
            position: absolute;
            font-size: 16px;
            color: #ff6262;
            right: 32px;
            top: 12px;
          }
        }
      }
      .footer {
        height: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 194px;
        display: flex;
        .checkBox {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          margin-right: 20px;
          .ivu-checkbox {
            margin-right: 3px;
          }
        }
      }
    }
    .ivu-modal-footer {
      display: none;
    }
  }
  .edit-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .content-footer {
      height: 314px;
      .content {
        height: 244px;
        .item1 {
          height: 50px;
          padding-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 108px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .category {
            width: 144px;
            position: relative;
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 12px;
              top: 7px;
            }
          }
          .ideaName {
            margin-left: 32px;
            margin-right: 10px;
            width: 48px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .ideaNameInput {
            width: 144px;
            position: relative;
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 12px;
              top: 7px;
            }
          }
        }
        .item2 {
          margin-top: 20px;
          margin-left: 20px;
          position: relative;
          display: flex;
          .title {
            display: inline-block;
            margin-top: 8px;
            width: 108px;
            margin-right: 10px;
            text-align-last: justify;
          }
          .input {
            width: 378px;
            height: 60px;
            textarea {
              height: 100%;
            }
          }
          .star-mark {
            position: absolute;
            font-size: 16px;
            color: #ff6262;
            right: 32px;
            top: 12px;
          }
        }
        .item3 {
          margin-left: 20px;
          margin-top: 20px;
          height: 16px;
          font-size: 0px;
          .lastUser {
            width: 132px;
            margin-right: 20px;
            font-size: 12px;
          }
          .updatetime {
            font-size: 12px;
          }
        }
      }
      .footer {
        height: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 194px;
        display: flex;
        .checkBox {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          margin-right: 20px;
          .ivu-checkbox {
            margin-right: 3px;
          }
        }
      }
    }
    .ivu-modal-footer {
      display: none;
    }
  }
}
</style>
