/* jiangyiling */
/* 费用类别管理 */
<template>
  <div class="chargeType-all">
    <div class="chargeType-all-content">
      <!-- 页面头部 -->
      <titlet-hasSlot>
        <span slot="titletHasSlotLeftTitle">费用类别列表</span>
        <div slot="titletHasSlotRightContent"
             class="content">
          <search-input class="input"
                        searText="请输入搜索内容"
                        @on-enter="enterSearch"
                        @on-Icon="enterSearch"
                        @on-cancel="enterSearch"
                        :searchWidth='220'></search-input>
          <div v-if='showGroupOut'
               class="group-out">
            <Button type="ghost"
                      class="fl marginR10"
                      @click="addButton">新 增</Button>
            <Button type="ghost"
                      @click="exportBtn"
                      class="fl marginR10">导 出</Button>
            <Button type="ghost"
                      class="fl marginR10"
                      @click="selectButton">选 择</Button>
          </div>
          <div v-else
               class="group-in">
            <Button type="success"
                      :disabled="showDelButton"
                      class="fl marginR10"
                      @click="deleCheckBoxItem">删 除</Button>
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
                 :data="chargeTypeList"
                 :pageInfo="pageInfo"
                 :height="tableHeight"
                 :params="params"
                 :requestDataApi="getProExamTypes"
                 :ifEdit="true"
                 @edit="editRow"
                 @edit-row="editRow"
                 @on-row-dbClick="editRow"
                 @delete="delOneRow"
                 @delete-row='delOneRow'
                 @getRequestParams="getRequestParams"
                 @all-selection="checkboxSelect">
        </q-table>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <div class="add-modal"
         v-if="addModalDiv">
      <Modal v-model="addModalDiv"
             width="408"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <alert-header headerText="新增费用类别"
                        :headerVal="addModal.data.sort"
                        @alert-retrun-num="addSortFun"></alert-header>
        </div>
        <div class="content-footer">
          <Form ref="addForm"
                :model="addModal.data"
                :rules="addModal.rule">
            <div class="content">
              <div class="item1">
                <span class="title">费用类型</span>
                <div class="text">
                  <!-- addNewItemData.name -->
                  <FormItem prop="charge_type">
                    <!-- <Input type="text"
                           v-model.trim="addModal.data.name"></Input> -->
                    <Select  placeholder=" " v-model="addModal.data.charge_type"
                            style="width:286px"
                            class="select">
                      <Option v-for="item in chargeTypeName"
                              :value="item.charge_type"
                              :key="item.charge_type">{{item.charge_type_name}}</Option>
                    </Select>
                  </FormItem>
                  <span v-show="!addModal.data.charge_type"
                        class="star-mark1">*</span>
                </div>
              </div>
              <div class="item1">
                <span class="title">费用类别名称</span>
                <div class="text">
                  <!-- addNewItemData.name -->
                  <FormItem prop="name">
                    <Input type="text"
                           v-model.trim="addModal.data.name"></Input>
                  </FormItem>
                  <span v-show="!addModal.data.name"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item2">
                <span class="title">备注</span>
                <Input class="input"
                       type="textarea"
                       v-model.trim="addModal.data.remark"></Input>
              </div>
            </div>
            <div class="footer">
              <FormItem>
                <Checkbox class="checkBox"
                          v-model="addNewCheck">启用</Checkbox>
                <Checkbox class="checkBox"
                          v-model="addNewDefalut">是否默认</Checkbox>
                <Button type="primary"
                        class="marginR20"
                        @click="saveNewItem('addForm')">保 存</Button>
                <Button type="ghost"
                        @click="cancelNewItem">取 消</Button>
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
    <!-- 编辑弹窗 -->
    <div class="edit-modal"
         v-if="editModalDiv">
      <Modal v-model="editModalDiv"
             width="408"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <alert-header headerText="编辑费用类别"
                        :headerVal="editModal.data.sort"
                        @alert-retrun-num="editSortFun"></alert-header>
        </div>
        <div class="content-footer">
          <Form ref="editForm"
                :model="editModal.data"
                :rules="editModal.rule">
            <div class="content">
              <div class="item1">
                <span class="title">费用类型</span>
                <div class="text">
                  <FormItem prop="charge_type">
                    <Select  placeholder=" " v-model="editModal.data.charge_type"
                            style="width:286px"
                            class="select">
                      <Option v-for="item in chargeTypeName"
                              :value="item.charge_type"
                              :key="item.charge_type">{{item.charge_type_name}}</Option>
                    </Select>
                  </FormItem>
                  <span v-show="!editModal.data.charge_type"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item1">
                <span class="title">费用类别名称</span>
                <div class="text">
                  <FormItem prop="name">
                    <Input type="text"
                           v-model.trim="editModal.data.name"></Input>
                  </FormItem>
                  <span v-show="!editModal.data.name"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item2">
                <span class="title">备注</span>
                <Input class="input"
                       type="textarea"
                       v-model.trim="editModal.data.remark"></Input>
              </div>
              <div class="item3">
                <span class="lastUser">最后修改人：{{operater}}</span>
                <span class="updatetime">最后修改时间：{{lastTime}}</span>
              </div>
            </div>
            <div class="footer">
              <Checkbox class="checkBox"
                        v-model="editStatusBool">启用</Checkbox>
              <Checkbox class="checkBox"
                        v-model="editDefalutBool">是否默认</Checkbox>
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
/* import { mapState, mapActions, mapGetters } from 'vuex' */
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'
// import moment from 'moment'
import {timeFilter} from '@/utils/fifters'
import * as _ from 'lodash'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
export default {
  name: 'chargeType',
  components: {
    titletHasSlot,
  },
  data() {
    return {
      // 验证
      exportParams: {
        reqParams: {},
        columns: [
          {
            key: 'name',
            title: '费用类别名称',
          },
          {
            key: 'charge_type',
            title: '费用类型',
            render: (value) => {
              return this.chargeTypeName[value - 1].charge_type_name
            },
          },
          {
            title: '备注',
            key: 'remark',
          },
          {
            title: '是否默认',
            key: 'is_default',
            render: (value) => {
              return value === 1 ? '是' : '否'
            },
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
                return timeFilter(value, 'YYYY-MM-DD HH:mm')
              } else {
                return ''
              }
            },
          },
        ],
      },
      addNewDefalut: true,
      addNewCheck: true,
      operater: '',
      addModal: {
        data: {
          name: '',
          charge_type: '',
          remark: '',
          is_default: 1,
          status: 0,
        },
        rule: {
          name: [
            {
              required: true,
              message: '费用类别名称不能为空',
              trigger: 'blur',
            },
          ],
          charge_type: [
            {
              required: true,
              message: '费用类型不能为空',
              type: 'number',
              trigger: 'change',
            },
          ],
          /* {
              required: true,
              message: '接害人员类别必须选',
              type: 'number',
              trigger: 'change',
            }, */
        },
      },
      // 删除
      showDelButton: true,
      controlModal: false,
      deletItemLength: null,
      clickId: null,
      chekboxId: null,
      // 编辑
      lastTime: null,
      editSort: null,
      editStatusBool: false,
      editDefalutBool: false,
      editModal: {
        data: {
          name: '',
          charge_type: '',
          remark: '',
          is_default: '',
          status: 0,
        },
        rule: {
          name: [
            {
              required: true,
              message: '费用类别名称不能为空',
              trigger: 'blur',
            },
          ],
          charge_type: [
            {
              required: true,
              message: '费用类型不能为空',
              type: 'number',
              trigger: 'change',
            },
          ],
        },
      },
      addNewItemData: {},
      showGroupOut: true,
      newStatus: 1,
      // 表格参数
      isSelectMode: false,
      tableHeight: 400,
      statusValue: '',
      // 弹框
      addModalDiv: false,
      editModalDiv: false,
      params: {
        search: '',
      },
      urlRemark: '/static/icons/public/remarkInCell.svg',
      /* searchText: '', */
      totalsort: null,
      chargeTypeName: [
        {
          charge_type: 1,
          charge_type_name: '体检费',
        },
        {
          charge_type: 2,
          charge_type_name: '处方费',
        },
        {
          charge_type: 3,
          charge_type_name: '会员费',
        },
        {
          charge_type: 4,
          charge_type_name: '附加费',
        },
      ],
      /* columns: [
        {
          title: '职业健康检查种类名称',
          key: 'name',

        },
        {
          title: '备注',
          key: 'remark',

        },
        {
          title: '启用',
          key: 'status',

        },
        {
          title: '显示顺序',
          key: 'sort',

        },
        {
          title: '最后修改人',
          key: 'lastUser',

        },
        {
          title: '最后修改时间',
          key: 'updated_at',

        },
      ], */
    }
  },
  methods: {
    ...mapMutations(
      'chargeTypeModule',
      ['requestPagingo'],
    ),
    // test
    ...mapActions('chargeTypeModule', [
      'getProExamTypes',
      'adNewItemFun',
      'amendItemFun',
      'deletItemFun',
    ]),
    addSortFun(data) {
      this.addModal.data.sort = data
    },
    editSortFun(data) {
      this.editModal.data.sort = data
    },
    /* allSelection(data) {
      this.chekboxId = data.map(item => {
        return item.id
      })
    }, */
    // 翻页
    /* pageSizeChange() {
      this.chekboxId = []
    }, */
    // 删除
    delCancel() {
      this.controlModal = false
    },
    deleCheckBoxItem() {
      this.controlModal = true
      this.deletItemLength = this.chekboxId.length
      this.clickId = null
    },
    delOneRow(data) {
      this.clickId = data.id
      this.deletItemLength = 1
      this.controlModal = true
    },
    checkboxSelect(data) {
      this.chekboxId = data.map(item => {
        return item.id
      })
      if (this.chekboxId.length) {
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
        this.totalsort --
      }
      if (this.chekboxId && !this.clickId) {
        await this.deletItemFun({ ids: this.chekboxId })
        if (
          this.pageInfo.total <=
            (this.pageInfo.current_page - 1) * this.pageInfo.per_page +
              this.chekboxId.length &&
          this.pageInfo.current_page !== 1
        ) {
          await this.$refs.baseInfoTable.request({
            current_page: this.pageInfo.current_page - 1,
          })
        } else {
          await this.$refs.baseInfoTable.request()
        }
        this.totalsort = this.totalsort - this.chekboxId.length
      }
      this.$refs.baseInfoTable.allSelection = []
      this.chekboxId = []
      this.clickId = null
      this.showDelButton = true
      this.controlModal = false
    },
    // 编辑
    editRow(owData, event) {
      /* this.editSort = owData.sort */
      this.operater = owData.operater
      this.editModal.data = _.clone(owData)
      this.editDefalutBool = !!this.editModal.data.is_default
      this.editStatusBool = !!this.editModal.data.status
      this.lastTime = timeFilter(this.editModal.data.updated_at, 'YYYY-MM-DD HH:mm')
      this.editModalDiv = true
    },
    async saveEdit(formName) {
      var thisdatan = {
        id: this.editModal.data.id,
        params: {
          name: this.editModal.data.name,
          remark: this.editModal.data.remark,
          status: this.editStatusBool ? 1 : 0,
          sort: this.editModal.data.sort,
          is_default: this.editDefalutBool ? 1 : 0,
          charge_type: this.editModal.data.charge_type,
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
    /* newStatusValueFun(data) {
      if (data) {
        this.newStatus = 1
      } else {
        this.newStatus = 0
      }
    }, */
    async saveNewItem(formName) {
      this.addModal.data.status = this.addNewCheck ? 1 : 0
      /* this.addModal.data.sort = this.totalsort */
      this.addModal.data.is_default = this.addNewDefalut ? 1 : 0
      try {
        if (await this.$refs[formName].validate()) {
          await this.adNewItemFun(this.addModal.data)
          await this.$refs.baseInfoTable.request()
          this.addModalDiv = false
          this.totalsort++
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
    addButton() {
      /* this.totalsort = this.pageInfo.total + 1 */
      this.addNewCheck = true
      this.addNewDefalut = true
      for (let k in this.addModal.data) {
        this.addModal.data[k] = null
      }
      this.addModal.data.sort = this.totalsort
      this.addModalDiv = true
    },
    async enterSearch(val) {
      /* if (!val && !this.searchText) {
        return
      } */
      this.params.search = val
      console.log(this.params)
      this.$refs.baseInfoTable.currentPage = 1
      this.$refs.baseInfoTable.allSelection = []
      this.showDelButton = true
      /* this.chekboxId = [] */
      /* this.searchText = val */
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
      this.chekboxId = []
    },
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('费用类别列表', {
        api: api.chargeType.getProExamTypes,
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
    ...mapGetters('chargeTypeModule', ['chargeTypeList', 'pageInfo']),
    // 验证
    starDisplay() {
      if (this.addModalDiv && !this.addModal.data.name) {
        return true
      }
      if (this.editModalDiv && !this.editModal.data.name) {
        return true
      }
      return false
    },
    columns() {
      return [
        {
          title: '费用类别名称',
          key: 'name',

          ellipsis: 'true',
        },
        {
          title: '费用类型',
          key: 'charge_type',
          ellipsis: 'true',
          render: (h, params) => {
            let val = params.row.charge_type
            return h('span', this.chargeTypeName[val - 1].charge_type_name)
          },
          titleRender: (row) => {
            return this.chargeTypeName[row.charge_type - 1].charge_type_name
          },

          filterType: 'type',
          filterOptions: (() => {
            return this.chargeTypeName.map((item) => {
              return {
                label: item.charge_type_name,
                value: item.charge_type,
              }
            })
          })(),
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: 'true',
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
          key: 'is_default',
          width: 60,
          align: 'center',
          ellipsis: 'true',
          render: (h, params) => {
            if (params.row.is_default === 1) {
              return h('status-in-table')
            }
          },
          titleRender: (row) => {
            return ''
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 1,
              label: '是',
            },
            {
              value: 0,
              label: '否',
            },
          ],
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
          ellipsis: 'true',
          width: 70,
        },
        {
          title: '最后修改人',
          key: 'operater',
          ellipsis: 'true',
          width: 90,
        },
        {
          title: '最后修改时间',
          key: 'updated_at',
          ellipsis: 'true',
          width: 130,
          render: (h, params) => {
            return h(
              'span',
              timeFilter(params.row.updated_at, 'YYYY-MM-DD HH:mm')
            )
          },
          titleRender: (row) => {
            return timeFilter(row.updated_at, 'YYYY-MM-DD HH:mm')
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
    await this.getProExamTypes()
    this.totalsort = this.pageInfo.total + 1
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
.chargeType-all {
  padding: 10px;
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  .chargeType-all-content {
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
      .test {
        background: red;
        height: 140px;
      }
    }
  }
  .add-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .content-footer {
      height: 250px;
      .content {
        height: 180px;
        .item1 {
          height: 50px;
          padding-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 73px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .text {
            width: 286px;
            position: relative;
            .star-mark1 {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 22px;
              top: 7px;
            }
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
          display: flex;
          .title {
            margin-top: 9px;
            width: 73px;
            margin-right: 10px;
            text-align-last: justify;
          }
          .input {
            width: 286px;
            height: 60px;
            textarea {
              height: 100%;
            }
          }
        }
      }
      .footer {
        height: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 66px;
        .ivu-form-item-content {
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
      height: 286px;
      .content {
        height: 216px;
        .item1 {
          height: 50px;
          padding-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 73px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .text {
            width: 286px;
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
          display: flex;
          .title {
            margin-top: 9px;
            width: 73px;
            margin-right: 10px;
            text-align-last: justify;
          }
          .input {
            width: 286px;
            height: 60px;
            textarea {
              height: 100%;
            }
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
        margin-left: 66px;
        display: flex;
        .checkBox {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          margin-right: 20px;
          .ivu-checkbox {
            margin-right: 5px;
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
