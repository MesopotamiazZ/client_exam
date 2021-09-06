/**
* Created wzd
* Date: 2017/12/18
* Time: 10:54
* updated:liuyang xk
* Date: 2018/1/22
* Time: 11:21
* content: 从业行业管理
*/
<template>
  <div class="tradeList-wrapper">
    <!-- header+table开始 -->
    <div class="tradeList contentBg">
      <!-- titleHasSlot开始 -->
      <title-has-slot>
        <span slot="titletHasSlotLeftTitle">从业行业管理</span>
        <div slot='titletHasSlotRightContent' class="table-header-content">
          <!-- <span class="marginR10">启用状态</span>
          <Select class="marginR20 status" v-model="tableListStatus"  @on-change="tableStatusChange">
            <Option value="all">全部</Option>
            <Option :value="1">启用</Option>
            <Option :value="0">未启用</Option>
          </Select> -->
          <search-input :searText="'请输入搜索内容'" @on-enter="searchOne" @on-Icon="searchOne" @on-cancel="onCancel":searchWidth="220"></search-input>
          <template v-if="!isSelectMode">
               <Button type="ghost"
                            class="marginR10"
                            @click="addTradeList" key="add">新 增</Button>
                  <Button type="ghost"
                            class="marginR10" @click="exportBtn" key="output">导 出</Button>
                  <Button type="ghost"
                            @click="toggleMode" key="select">选 择</Button>
          </template>
          <template v-else>
            <Button type="success"
                            class="marginR10"
                            :disabled="selection.length===0"
                            @click="deleteRows" key="del">删 除</Button>
                  <Button type="primary"
                            @click="toggleMode" key="cancel">取 消</Button>
          </template>
        </div>
      </title-has-slot>
      <!-- titleHasSlot结束 -->
      <div class="tradeListTable" ref="tradeListTable">
        <q-table
          ref="zBaseInfoTable"
          :params="params"
          :pageInfo="pageInfo"
          :requestDataApi="getTradeManagementList"
          :data='tradeManagementList.items'
          :columns="columns"
          :ifEdit="true"
          :selectMode="isSelectMode"
          :height="tableHeight"
          :width="700"
          @delete='delOne'
          @delete-row='delOne'
          @edit='editRow'
          @edit-row='editRow'
          @on-selection='selectRow'
          @on-selection-change='onSelectionChange'
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange" @on-row-dbClick="editRow" @getRequestParams="getRequestParams">
        </q-table>
      </div>
    </div>
    <!-- header+table结束 -->

    <!-- 新增模态框开始 -->
    <div class="addTradeListModal" ref="addTradeListModal">
      <Modal v-model="addTradeListModal" :styles='{width:352+"px"}'
      :transition-names='[]'
      :mask-closable="false"
      :transfer='false'
      :closable="false">
        <div slot="header">
          <alert-header :headerText='addHeaderText' :headerVal="pageTotal"  @alert-retrun-num="getSort"></alert-header>
        </div>
        <div class="modelContent">
          <Form
            :model="modalForm.data"
            :rules="modalForm.rule"
            :label-width="78 + 10"
            class="modal-form"
            ref="addForm">
            <ul>
              <li class="marginB15">
                <FormItem prop="industryName" label="从业行业名称" class="modal-form-row">
                  <Input :class='{inputVerificationTs: isEmpty(modalForm.data.industryName)}' type="text" v-model.trim="modalForm.data.industryName"></Input>
                </FormItem>
              </li>
              <li>
                <FormItem label="从业行业代码" class="modal-form-row">
                  <Input type="text" v-model.trim="modalForm.data.industryCode"></Input>
                </FormItem>
              </li>
              <li class="form-row">
                <span class="textJustify marginL20" style="width:116px">备注</span>
                <!-- <FormItem  class="modal-form-row"> -->
                  <Input type="textarea" v-model.trim="modalForm.data.remark" class="marginL15 marginR20"></Input>
                <!-- </FormItem> -->
              </li>
            </ul>
          </Form>
        </div>
        <div slot="footer">
          <div class="modelFooter marginT20 marginR20">
            <Checkbox v-model="modalForm.data.status">启用</Checkbox>            
            <Button type="primary" class="modelSaveBtn marginR20" @click="modalForm.submitEvent('addForm')">保 存</Button><Button
            type="ghost"
            class="modelCancelBtn"
            @click="addModalCancel">取 消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!-- 新增模态结束 -->

    <!-- 编辑模态框开始 -->
    <div class="editTradeListModal" ref="editTradeListModal">
      <Modal v-model="editTradeListModal" :styles='{width:352+"px"}'
      :transition-names='[]'
      :mask-closable="false"
      :transfer='false'
      :closable="false">
        <div slot="header">
          <alert-header :headerText='editHeaderText' @alert-retrun-num="onBlurSubmit" :headerVal="sortNum"></alert-header>
        </div>
        <div class="modelContent">
          <Form
            :model="modalForm.data"
            :rules="modalForm.rule"
            :label-width="78 + 10"
            class="modal-form"
            ref="editForm">
            <ul>
              <li class="marginB15">
                <FormItem prop="industryName" label="从业行业名称" class="modal-form-row">
                  <Input :class='{inputVerificationTs: isEmpty(modalForm.data.industryName)}' type="text" v-model.trim="modalForm.data.industryName"></Input>
                </FormItem>
                <!-- <label for="tradeName">行业名称</label><Input v-model="industryName" style="width: 254px;" :class="{editTradeName: isStar1}"></Input> -->
              </li>
              <li>
                <FormItem label="从业行业代码" class="modal-form-row">
                  <Input   type="text" v-model.trim="modalForm.data.industryCode"></Input>
                </FormItem>
                <!-- <label for="tradeCode">行业代码</label><Input v-model="industryCode" style="width: 254px;" :class="{editTradeCode: isStar2}"></Input> -->
              </li>
               <li class="form-row">
                <span class="textJustify marginL20" style="width:116px">备注</span>
                <!-- <FormItem  class="modal-form-row"> -->
                  <Input type="textarea" v-model.trim="modalForm.data.remark" class="marginL15 marginR20"></Input>
                <!-- </FormItem> -->
              </li>
              <!-- <li>
                <span class="textJustify marginL20" style="width:116px">备注</span>                
                <FormItem label="备注" class="modal-form-row">
                  <Input type="textarea" v-model.trim="modalForm.data.remark"></Input>
                </FormItem>
              </li> -->
              <li class="lastUpdate marginT20">
                <span>最后修改人：{{lastUsername}}</span><span>最后修改时间：{{lastTime}}</span>
              </li>

            </ul>
          </form>
        </div>
        <div slot="footer">
          <div class="modelFooter marginR20">
            <!-- editSaveTradeList -->
            <Checkbox v-model="modalForm.data.status">启用</Checkbox>
            <Button type="primary" class="modelSaveBtn marginR20" @click="modalForm.submitEvent('editForm')">保 存</Button><Button
            type="ghost"
            class="modelCancelBtn"
            @click="editModalCancel">取 消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!-- 编辑模态结束 -->
    <!-- 删除多个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delSomeModal" :delCounts="delCounts" @delCancel="cancelDelSome" @affirmDel="submitDelSome"></affirm-del-modal>
    </div>
    <!-- 删除多个弹窗 -->

    <!-- 删除1个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delOneModal" :delCounts="1" @delCancel="cancelDelOne" @affirmDel="submitDelOne"></affirm-del-modal>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
// import { timeFilter } from '@/utils/fifters'
import exportXlsx from '@/service/export-xlsx.js'
import api from '@/api'
import moment from 'moment'
import filters from '@/utils/fifters'

import * as types from '@/store/modules/information/industryBaseInfoManagement/tradeList/tradeListTypes'
export default {
  name: 'tradeList',
  components: {},
  tradeListModal: false,
  data() {
    return {
      exportParams: {
        reqParams: {},
        columns: [
          {
            title: '从业行业名称',
            key: 'name',

          },
          {
            title: '从业行业代码',
            key: 'code',

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
      },
      pageTotal: 1,
      // 启用icon
      urlImg: '/static/icons/public/enabledState.svg',
      // 备注icon
      remarkIcon: '/static/icons/public/remarkInCell.svg',
      // 启用状态
      tableListStatus: 'all',
      delCounts: 0,
      selection: [],
      curPackage: undefined,
      delSomeModal: false,
      delOneModal: false,
      totalSize: '', // 总共显示的条数
      sortNum: '',
      addHeaderText: '',
      editHeaderText: '',
      isStar1: true, // 行业名称是否显示红色*号
      isStar2: true, // 行业代码是否显示红色*号
      addTradeListModal: false,
      editTradeListModal: false,
      searchValue: '', // 模糊查询关键字
      isDisabled: true, // 控制右上角删除按钮
      selectArr: [], // 选中的数据数组
      editParams: {},
      isSelectMode: false,
      controlModal: false, // 确认删除模态框
      tableHeight: 400,
      // modalForm验证
      modalForm: {
        style: {
          height: '250px',
          width: '360px',
        },
        show: false,
        rule: {
          industryName: [
            { required: true, message: '从业行业名称不能为空', trigger: 'blur' },
          ],
          // industryCode: [
          //   { required: true, message: '不能为空', trigger: 'blur' },
          // ],
        },
        data: {
          industryName: '',
          industryCode: '',
          remark: '',
          status: true,
        },
        submitEvent: async formName => {
          try {
            if (await this.$refs[formName].validate()) {
              if (formName === 'addForm') {
                this.addSaveTradeList()
              } else {
                this.editSaveTradeList()
              }
            }
          } catch (error) {
            console.dir(error)
          }
        },
      },
    }
  },
  methods: {
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('从业行业管理', {
        api: api.tradeManagement.getTradeManagementList,
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
    // 状态更改事件
    tableStatusChange(data) {
      if (data === 'all') {
        this.$set(this.params, 'status', '')
      } else {
        this.$set(this.params, 'status', Number(data))
      }
      console.log(this.params)
    },
    // timeFilter,
    // 验证是否为空
    isEmpty(data) {
      if (data === '' || data === undefined) {
        return true
      } else {
        return false
      }
    },
    getSort(value) {
      this.pageTotal = value
    },

    async searchOne(val) {
      // 模糊查询
      this.searchValue = val || ''
      // this.searchValue = val ? val + '&search_fields=sex,code,remark,status,sort,operater,updated_at,name' : ''
      await this.getTradeManagementList({ status: 1, search: val })
    },
    async onCancel(val1, val2) {
      if (val2 === '') return
      await this.getTradeManagementList({ status: 1 })
      this.searchValue = ''
    },
    onBlurSubmit(data) {
      // alertHeaderx显示顺序失去焦点提交
      this.sortNum = data
    },
    toggleMode() {
      console.log('toggleMode', this.selection)
      // 点击选择和取消切换表格状态
      this.isSelectMode = !this.isSelectMode
      this.$refs.zBaseInfoTable.allSelection = []
      this.selection = []
      this.selectArr = []
    },
    pageChange() {
      // 换页时触发
      this.selectArr = []
      this.isDisabled = true
    },
    pageSizeChange() {
      // pageSIze变化时触发
      this.selectArr = []
      this.isDisabled = true
    },
    addTradeList() {
      // 右上角新增
      this.addHeaderText = '新增从业行业'
      this.modalForm.data.industryName = ''
      this.modalForm.data.industryCode = ''
      this.modalForm.data.sort = this.total + 1
      this.modalForm.data.status = true
      this.modalForm.data.remark = ''
      this.addTradeListModal = true
      this.pageTotal = this.total + 1
      console.log(this.total, this.pageTotal)
    },
    async addSaveTradeList() {
      // let val = await this.$refs.addForm.validate()
      // console.log('验证是', val)
      // if (!val) {
      //   return
      // }
      // 新增模态框保存
      await this.addTradeManagementList({
        name: this.modalForm.data.industryName,
        code: this.modalForm.data.industryCode,
        sort: this.pageTotal,
        remark: this.modalForm.data.remark,
        status: Number(this.modalForm.data.status),
      })
      this.totalSize += 1
      // this.$refs.zBaseInfoTable.request()
      // 搜索状态下的新增
      if (this.searchValue !== '') {
        await this.getTradeManagementList({ status: 1, key: this.searchValue })
      } else {
        await this.$refs.zBaseInfoTable.request()
        this.getTotal(this.total + 1)
      }
      this.addTradeListModal = false
    },
    addModalCancel() {
      // 新增模态框取消
      console.log(this.total)
      this.modalForm.data.sort = this.total + 1
      this.$refs.addForm.resetFields()
      this.addTradeListModal = false
    },
    async editSaveTradeList() {
      // 编辑模态框保存
      await this.updateTradeManagementList({
        id: this.editParams.id,
        name: this.modalForm.data.industryName,
        code: this.modalForm.data.industryCode,
        sort: this.sortNum === '' ? this.editParams.sort : this.sortNum,
        status: Number(this.modalForm.data.status),
        remark: this.modalForm.data.remark,
      })
      // this.$refs.zBaseInfoTable.request()
      if (this.searchValue !== '') {
        await this.getTradeManagementList({ status: 1, key: this.searchValue })
      } else {
        await this.$refs.zBaseInfoTable.request()
      }
      this.editTradeListModal = false
      // 清空
      this.modalForm.data.industryName = ''
      this.modalForm.data.industryCode = ''
    },
    editModalCancel() {
      // 编辑模态框取消
      this.modalForm.data.industryName = ''
      this.modalForm.data.industryCode = ''
      this.$refs.editForm.resetFields()
      this.editTradeListModal = false
    },
    deleteRow(data) {
      // 在table中右键/btn删除或在多选模式下下删除
      this.selectArr = []
      this.selectArr.push(data)
      this.controlModal = true
    },
    deleteRows() {
      // 多选模式下进行删除
      this.delSomeModal = true
    },
    // 删除一项进行删除
    delOne(data, index) {
      this.curPackage = data
      this.delOneModal = true
    },
    // 删除多个弹窗取消按钮
    cancelDelSome() {
      this.delSomeModal = false
    },
    // 删除1个弹窗取消按钮
    cancelDelOne() {
      this.delOneModal = false
    },
    // 删除1个弹窗确认按钮
    async submitDelOne() {
      this.delOneModal = false
      await this.delTradeManagementList({ ids: this.curPackage.id })
      this.getTotal(this.total - 1)
      this.refreshAfterDel(1)
    },
    // 删除多个个弹窗确认按钮
    async submitDelSome() {
      this.delSomeModal = false
      let arr = []
      this.selection.forEach(element => {
        arr.push(element.id)
      })
      await this.delTradeManagementList({ ids: arr })
      this.getTotal(this.total - this.selection.length)
      this.refreshAfterDel(this.selection.length)
      this.selection = []
      this.$refs.zBaseInfoTable.allSelection = []
    },
    refreshAfterDel(delNum) {
      if (
        this.pageInfo.total <=
          (this.pageInfo.page - 1) * this.pageInfo.page_size + delNum &&
        this.pageInfo.page !== 1
      ) {
        this.$refs.zBaseInfoTable.request({ page: this.pageInfo.page - 1 })
      } else {
        this.$refs.zBaseInfoTable.request()
      }
    },
    editRow(data) {
      // 在table中右键/点击编辑
      this.editHeaderText = '编辑从业行业'
      this.editParams = data
      this.modalForm.data.industryName = this.editParams.name
      this.modalForm.data.industryCode = this.editParams.code
      this.modalForm.data.remark = this.editParams.remark
      this.modalForm.data.status = !!this.editParams.status
      this.sortNum = this.editParams.sort
      this.editTradeListModal = true
      // this.pageTotal = data.sort
    },
    onSelectionChange(selection) {
      console.log('onSelectionChange', selection)
      this.selection = selection
      this.delCounts = this.selection.length
    },
    selectRow(data) {
      console.log('selectRow', data)
      this.selectArr = data
    },
    ...mapMutations('tradeListModule', {
      set_page: types.RESET_PAGE,
      getTotal: types.SET_TOTAL,
    }),
    ...mapActions('tradeListModule', [
      'getTradeManagementList',
      'addTradeManagementList',
      'updateTradeManagementList',
      'delTradeManagementList',
      'getTradeManagementListAll',
      'setTotal',
    ]),
  },
  computed: {
    ...mapState(['windowHeight']),
    pageInfo() {
      return this.tradeManagementList.meta
    },
    ...mapState('tradeListModule', [
      'tradeManagementList',
      'tradeManagementAllList',
      'total',
    ]),
    columns() {
      return [
        {
          title: '从业行业名称',
          key: 'name',
          // width: 230,
          // minWidth: 350,
          ellipsis: true,
        },
        {
          title: '从业行业代码',
          key: 'code',
          // width: 230,
          // minWidth: 165,
          ellipsis: true,
        },
        // {
        //   title: '显示顺序',
        //   key: 'sort',
        //   width: 70,
        //   ellipsis: true,
        // },
        {
          title: '备注',
          width: 60,
          key: 'remark',
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
          ellipsis: 'true',
          key: 'operater',
          // render: (h, p) => {
          //   return h('span', {}, [p.row.operater.realname])
          // },
        },
        {
          title: '最后修改时间',
          filterType: 'date',
          key: 'updated_at',
          ellipsis: 'true',
          width: 130,
          render: (h, p) => {
            return h('span', {}, [
              filters.timeFilter(p.row.updated_at, 'YYYY-MM-DD HH:mm'),
            ])
          },
        },
      ]
    },
    params() {
      return {}
    },
    lastUsername() {
      if (this.editParams.operater && this.editParams.operater.realname) {
        return this.editParams.operater.realname
      } else {
        return ''
      }
    },
    lastTime() {
      if (this.editParams.updated_at) {
        return filters.timeFilter(this.editParams.updated_at, 'YYYY-MM-DD HH:mm')
      } else {
        return ''
      }
    },
  },
  async mounted() {
    await this.setTotal()
    await this.getTradeManagementListAll({ status: 1 })
    this.totalSize = this.tradeManagementList.meta.total
    // 第一次加载获取table的高
    this.tableHeight = this.$refs.tradeListTable.offsetHeight
  },
  destroyed() {
    this.set_page()
  },
  watch: {
    // 窗口变化时，获取table的高
    windowHeight() {
      this.tableHeight = this.$refs.tradeListTable.offsetHeight
    },
  },
  activated() {
    this.tableHeight = this.$refs.tradeListTable.offsetHeight
  },
}
</script>
<style lang="less">
@import (reference) "~assets/less/variable.less";
.tradeList-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  // header
  .table-header-content {
    display: flex;
    height: 30px;
    font-size: 0;
    & > span {
      line-height: 30px;
      color: #737373;
      font-size: 12px;
    }
    & > .status {
      width: 78px;
    }
  }
  .tradeList {
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    border-top: 1px solid @gradeAshFive;
    position: relative;
    height: 100%;
    .operationDel:not([disabled]) {
      color: red;
      border: 1px solid red;
    }
    .tradeListTable {
      height: calc(~"100% - 50px");
    }
  }
  .addTradeListModal,
  .editTradeListModal {
    // height: 303px;
    .ivu-modal-header {
      // height: 50px;
    }
    .modelFooter {
      height: 50px;
      Button {
        width: 60px;
        height: 30px;
      }
    }
    .modelContent {
      width: 100%;
      .form-row {
        display: flex;
        & > span {
          padding-top: 7px;
          line-height: 20px;
          color: #737373;
        }
        // &>div{
        //   flex: 1;
        // }
      }
      .modal-form {
        padding-top: @num20;
        ul {
          width: 100%;
          // height: 100%;
          li {
            // width: 100%;
            // height: 30px;
          }
          .modal-form-row {
            padding: 0 @num20;
            height: auto;
            // height: 30px;
            & > .ivu-form-item-label {
              padding: @num10 @num10 0 0;
              text-align: justify;
              &::after {
                content: "";
                display: inline-block;
                width: 100%;
                overflow: hidden;
                height: 0%;
              }
              &::before {
                display: none;
              }
            }
            &.ivu-form-item {
              margin-bottom: @num20;
            }
          }
        }
      }
      .lastUpdate {
        color: @gradeAshThree;
        // margin-top: 15px;
        margin-bottom: 20px;
        margin-left: 20px;
        span {
        }
        span:last-child {
          margin-left: 20px;
        }
      }
      .addTradeName::after {
        content: "*";
        color: red;
        font-size: 16px;
        position: relative;
        right: -235px;
        top: -25px;
      }
      // .addTradeCode::after {
      //   content: '*';
      //   color: red;
      //   font-size: 16px;
      //   position: relative;
      //   right: -235px;
      //   top: -25px;
      // }
      .editTradeName::after {
        content: "*";
        color: red;
        font-size: 16px;
        position: relative;
        right: -235px;
        top: -25px;
      }
      // .editTradeCode::after {
      //   content: '*';
      //   color: red;
      //   font-size: 16px;
      //   position: relative;
      //   right: -235px;
      //   top: -25px;
      // }
    }
  }
}
</style>
