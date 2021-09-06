/**
 * Created ljl
 * Date: 2017/03/07/
 * content:体检进度综合管理
 */
<template>
  <div class="exam-progress">
    <div class="exam-progress-project"
         v-if="!isHealthRecord">
      <div class="exam-progress-project-content">
        <div class="exam-progress-header">
          <div class="exam-progress-header-left">当前体检人数：
            <span>{{curPeople}}</span> 人</div>
          <div class="exam-progress-header-right">
            <div>
              <z-button ZBtype="primary"
                          v-if="selectMode"
                          @click="selectMode=false"
                          class="fr marginR20 button-in">取消
              </z-button>
              <z-button ZBtype="ghost"
                        v-if="selectMode"
                        :disabled="bulkOperation"
                        @click="batchAddPay=true"
                        class="fr marginR10 button-in">批量增加附加费</z-button>
              <z-button ZBtype="ghost"
                        v-if="selectMode"
                        :disabled="bulkOperation"
                        @click="modelChooseReduceItem=true"
                        class="fr marginR10 button-in">批量减项</z-button>
              <z-button ZBtype="ghost"
                        v-if="selectMode"
                        :disabled="bulkOperation"
                        @click="modelChooseAddItem=true"
                        class="fr marginL20 marginR10 button-in">批量加项
              </z-button>
              <z-button ZBtype="ghost"
                        v-if="!selectMode"
                        class="fr marginL10 marginR20 button-in"
                        @click="selectMode=true">选 择</z-button>
              <z-button ZBtype="ghost"
                        v-if="!selectMode"
                        class="fr marginL20 button-in"
                        @click="buttonadd">新 增</z-button>
              <search-input :searchWidth="180"
                            class="marginR20 marginL20 fl search"
                            searText="请输入搜索内容"
                            @on-enter="search"
                            @on-Icon="search"
                            @on-cancel="search">
              </search-input>
            </div>
          </div>
        </div>
        <div ref="zBaseInfoHeight"
             class="table-out">
          <q-table ref="zBaseInfoTable"
                   :showOperateColumn="false"
                   :params="paraming"
                   :ifEdit="true"
                   :columns="columns"
                   :width="2773"
                   :requestDataApi="getOrderManagement"
                   :data="getOrderManagementData"
                   :selectMode="selectMode"
                   @scroll="scrollIn"
                   @on-selection-change="tableSelectionChange"
                   :pageInfo="pageInfo">
          </q-table>
        </div>
      </div>
    </div>
    <!-- 申请退费 -->
    <applyRefund :ifShowModal="showApplyRefund"
                 @commit-data="sureApplyRefund"
                 @cancel-data="showApplyRefund=false"></applyRefund>
    <!-- 撤销退费 -->
    <revokeRefund :ifShowModal="showRevokeRefund"
                  @commit-data="sureRevokeRefund"
                  @cancel-data="showRevokeRefund=false"></revokeRefund>
    <!-- 撤销完检 -->
    <revocation-examine-modal :RevocationExamineModal.sync='RevocationExamineModal'
                              @RevocationExamineModal="sureRevocationExamineModal"></revocation-examine-modal>
    <!-- 完检 -->
    <examine-modal :ExamineModal.sync='showExamineModal'
                   @ExamineModal="ExamineModal"></examine-modal>
    <!-- 批量增加附加费 -->
    <batchAddPay :controlModal.sync="batchAddPay"
                 :tableChooseLen="tipContent"
                 @commit-data="sureBatchAddPay"
                 @cancel-data="batchAddPay=false"></batchAddPay>
    <!-- 批量减项-选择项目 -->
    <chooseItemReduce :modelBatchChoose="modelChooseReduceItem"
                :tipContent="tipContent"
                @sure="surechooseReduceItem"
                @cancel="modelChooseReduceItem=false"></chooseItemReduce>
    <!-- 批量加项-选择项目 -->
    <chooseItemAdd :modelBatchChoose="modelChooseAddItem"
                :tipContent="tipContent"
                @sure="surechooseAddItem"
                @cancel="modelChooseAddItem=false"></chooseItemAdd>
    <!-- 个人主页 -->
    <personalPage v-if="isHealthRecord"
                  :firstTitle="'体检进度综合管理'"
                  @goBack="goBack"></personalPage>
    <!-- 撤销完检-提示 -->
    <tip-modal 
        headerText='提示' 
        :controlModal='controlModalTip'
        :isMask="false"
        :mainContent="'是否要把前台弃检、超时项目恢复到初始状态？'"
        @tip-modal-affirm='tipCommit'
        @tip-modal-cancel='tipCancel'>
      </tip-modal>
  </div>
</template>

<script>
import personalPage from './personalPage' // 个人主页
import { mapActions, mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/types'
import applyRefund from '../../components/modal/applyRefund'
import revokeRefund from '../../components/modal/revokeRefund'
import RevocationExamineModal from './components/modal/RevocationExamineModal'
import ExamineModal from './components/modal/ExamineModal'
import accountRecharge from './components/modal/accountRecharge'
import accountWithdrawalPer from './components/modal/accountWithdrawalPer'
import updataVipModalPer from './components/modal/updataVipModalPer'
import batchAddPay from './components/modal/batchAddPay'
import chooseItemAdd from './components/modal/chooseItemAdd'
import chooseItemReduce from './components/modal/chooseItemReduce'
export default {
  name: 'comprehensiveProgress',
  components: {
    personalPage, // 个人主页
    applyRefund,
    // tipModal,
    revokeRefund,
    RevocationExamineModal,
    ExamineModal,
    accountRecharge,
    accountWithdrawalPer,
    updataVipModalPer,
    batchAddPay,
    chooseItemAdd,
    chooseItemReduce,
  },
  data() {
    return {
      controlModalTip: false,
      modelChooseAddItem: false,
      modelChooseReduceItem: false,
      isHealthRecord: false, // 个人主页
      curPeople: '20',
      batchAddPay: false,
      accountRecharge: false,
      accountWithdrawalPer: false,
      updataVipModalPer: false,
      RevocationExamineModal: false,
      showExamineModal: false,
      showApplyRefund: false,
      showRevokeRefund: false,
      cancelOrderModal: false,
      bulkOperation: true,
      selectMode: false,
      place: 'bottom-end',
      time: [],
      morebtn: null,
      cancelOrder: '',
      tipContent: 0,
      entryPeopleFilter: [],
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '登记人',
          key: 'register_man',
          ellipsis: true,
          filterType: 'type',
          // filterOptions: this.entryPeopleFilter,
          width: 100,
        },
        {
          title: '登记日期',
          key: 'register_time',
          ellipsis: true,
          filterType: 'time',
          width: 95,
        },
        {
          title: '状态',
          key: 'status',
          ellipsis: true,
          filterType: 'time',
          width: 65,
        },
        { title: '体检号', key: 'pe_sn', ellipsis: true, width: 115 },
        {
          title: '姓名',
          key: 'name',
          width: 102,
          render: (h, params) => {
            if (params.row.is_vip) {
              return h(
                'div',
                {
                  style: {
                    background: '',
                    width: '100%',
                    height: '40px',
                    lineHeight: '40px',
                    float: 'left',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                },
                [
                  h('span', {
                    class: {
                      text: true,
                    },
                    style: {
                      position: 'relative',
                      lineHeight: '40px',
                    },
                    domProps: {
                      innerHTML: params.row.name,
                    },
                  }),
                ],
              )
            } else {
              return h(
                'div',
                {
                  style: {
                    background: '',
                    width: '100%',
                    height: '40px',
                    lineHeight: '40px',
                    float: 'left',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                },
                [
                  h('span', {
                    class: {
                      text: false,
                    },
                    style: {
                      position: 'relative',
                      lineHeight: '40px',
                    },
                    domProps: {
                      innerHTML: params.row.name,
                    },
                  }),
                ],
              )
            }
          },
        },
        {
          title: '性别',
          key: 'personalOrder.customer.sex',
          render: (h, params) => {
            return h('div', params.row.sex)
          },
          ellipsis: true,
          filterType: 'type',
          filterOptions: [
            {
              value: 0,
              label: '通用',
            },
            {
              value: 1,
              label: '男',
            },
            {
              value: 2,
              label: '女',
            },
          ],
          width: 46,
        },
        { title: '年龄', key: 'age', ellipsis: true, width: 46 },
        {
          title: '待收金额',
          key: 'collect_amount',
          ellipsis: true,
          width: 95,
        },
        {
          title: '体检类别',
          key: 'personalOrder.peDetail.pe_type',
          ellipsis: true,
          render: (h, params) => {
            return h('div', params.row.pe_type)
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 1,
              label: '健康体检',
            },
            {
              value: 2,
              label: '职业体检',
            },
          ],
          width: 71,
        },
        {
          title: '初/复检',
          key: 'personalOrder.peDetail.is_recheck',
          ellipsis: true,
          render: (h, params) => {
            return h('div', params.row.is_recheck)
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 0,
              label: '初检',
            },
            {
              value: 1,
              label: '复检',
            },
          ],
          width: 65,
        },
        {
          title: '来源',
          key: 'personalOrder.peDetail.order_source',
          ellipsis: true,
          render: (h, params) => {
            return h('div', params.row.order_source)
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 1,
              label: '个人',
            },
            {
              value: 2,
              label: '单位',
            },
          ],
          width: 65,
        },
        {
          title: '单位体检号',
          key: 'unit_order_id',
          ellipsis: true,
          width: 120,
        },
        {
          title: '单位名称',
          ellipsis: true,
          key: 'unit_name',
          render: (h, params) => {
            if (params.row.is_unit_vip) {
              return h(
                'div',
                {
                  style: {
                    background: '',
                    width: '100%',
                    height: '40px',
                    lineHeight: '40px',
                    float: 'left',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                },
                [
                  h('span', {
                    class: {
                      unitText: true,
                    },
                    style: {
                      position: 'relative',
                      lineHeight: '40px',
                    },
                    domProps: {
                      innerHTML: params.row.unit_name,
                    },
                  }),
                ],
              )
            } else {
              return h(
                'div',
                {
                  style: {
                    background: '',
                    width: '100%',
                    height: '40px',
                    lineHeight: '40px',
                    float: 'left',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                },
                [
                  h('span', {
                    class: {
                      unitText: false,
                    },
                    style: {
                      position: 'relative',
                      lineHeight: '40px',
                    },
                    domProps: {
                      innerHTML: params.row.unit_name,
                    },
                  }),
                ],
              )
            }
          },
        },
        {
          title: '预约渠道',
          key: 'personalOrder.peDetail.appt_way',
          ellipsis: true,
          render: (h, params) => {
            return h('div', params.row.appt_way)
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 1,
              label: '1',
            },
            {
              value: 2,
              label: '2',
            },
          ],
          width: 95,
        },
        { title: '体检套餐', key: 'pe_package', ellipsis: true },
        { title: '危害因素', key: 'occupHarms', ellipsis: true },
        {
          title: '总工龄',
          key: 'total_work_age',
          ellipsis: true,
          width: 65,
        },
        { title: '接害工龄', key: 'injury_age', ellipsis: true, width: 75 },
        { title: '工种', key: 'occup_type_name', ellipsis: true, width: 85 },
        { title: '联系电话', key: 'mobile', ellipsis: true, width: 105 },
        {
          title: '完检人',
          key: 'finish_check_man',
          ellipsis: true,
          width: 94,
        },
        {
          title: '完检日期',
          key: 'finish_check_time',
          ellipsis: true,
          width: 94,
        },
        {
          title: '主检日期',
          key: 'main_check_time',
          ellipsis: true,
          width: 94,
        },
        { title: '审核日期', key: 'audit_time', ellipsis: true, width: 94 },
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
          title: '操作',
          ellipsis: true,
          key: 'do',
          fixed: 'right',
          width: 153,
          _pop: false,
          render: (h, params) => {
            return h(
              'div',
              {
                class: 'handle',
              },
              [
                h(
                  'span',
                  {
                    style: {
                      display: 'inline-block',
                      width: '50px',
                      color: this.selectMode ? '#CCCCCC' : '#008cee',
                      'line-height': '30px',
                      'margin-right': '9px',
                      'margin-left': '5px',
                    },
                    on: {
                      click: event => {
                        event.stopPropagation()
                        if (!this.selectMode) {
                          this.$router.push({
                            name: 'register',
                            params: { pe_sn: params.row.pe_sn },
                          })
                          let temp = {}
                          temp.name = 'register'
                          temp.title = 'register'
                          this.openPage(temp)
                          this.setCurPage(temp.name)
                        }
                      },
                    },
                  },
                  params.row.status === '已登记' ? '修改订单' : '查看订单',
                ),
                h(
                  'span',
                  {
                    style: {
                      display: 'inline-block',
                      width: '50px',
                      color: this.selectMode ? '#CCCCCC' : '#008cee',
                      'line-height': '30px',
                      'margin-right': '5px',
                    },
                    on: {
                      click: event => {
                        if (!this.selectMode) {
                          event.stopPropagation()
                          this.morebtn = null
                          this.showApplyRefund = true
                        }
                        // console.log(params.row.pe_sn)
                        // this.$router.push({ name: 'register', params: {pe_sn: params.row.pe_sn} })
                        // let temp = {}
                        // temp.name = 'register'
                        // temp.title = 'register'
                        // this.openPage(temp)
                        // this.setCurPage(temp.name)
                      },
                    },
                  },
                  '申请退费',
                ),
                h(
                  'Poptip',
                  {
                    props: {
                      value: this.morebtn === params.index,
                      placement: this.place,
                    },
                    style: {
                      display: 'inline-block',
                      width: '15px',
                      color: '#008cee',
                      'margin-right': '10px',
                    },
                    class: this.selectMode ? 'stopPop' : 'hasPop',
                    nativeOn: {
                      click: (event) => {
                        this.morebtn = params.index
                      },
                      mouseenter: e => {
                        if (document.body.clientHeight - e.clientY >= 160) {
                          this.place = 'bottom-end'
                        } else {
                          this.place = 'top-end'
                        }
                      },
                    },
                  },
                  [
                    h('div', {
                      style: {
                        width: '25px',
                        height: '15px',
                        color: '#008cee',
                        'z-index': '999',
                        background:
                          `url('/static/icons/public/${this.selectMode ? 'threePoints.svg' : 'more.svg'}') no-repeat center 10px`,
                      },
                    }),
                    h(
                      'div',
                      {
                        style: {
                          'line-height': '30px',
                        },
                        slot: 'content',
                      },
                      [
                        h(
                          'div',
                          {
                            class: 'slh',
                            on: {
                              click: e => {
                                e.stopPropagation()
                                this.morebtn = null
                                this.showRevokeRefund = true
                              },
                            },
                          },
                          '撤销退费',
                        ),
                        h(
                          'div',
                          {
                            class:
                              params.row.status === '已登记' ||
                              params.row.status === '已完检'
                                ? 'slh'
                                : 'slh-hidden',
                            on: {
                              click: e => {
                                e.stopPropagation()
                                this.morebtn = null
                                if (params.row.status === '已登记') {
                                  this.showExamineModal = true
                                } else if (params.row.status === '已完检') {
                                  this.RevocationExamineModal = true
                                }
                              },
                            },
                          },
                          params.row.status === '已登记' ? '完检' : '撤销完检',
                        ),
                        h(
                          'div',
                          {
                            class: 'slh',
                            on: {
                              click: e => {
                                this.$emit(
                                  'changeComponent',
                                  'personalPage',
                                  10,
                                )
                              },
                            },
                          },
                          '个人主页',
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            )
          },
        },
      ]
    },

    ...mapGetters('comprehensiveProgressControlModule', [
      'getOrderManagementData',
      'pageInfo',
    ]),
    paraming() {
      return {}
    },
  },
  methods: {
    initShowChargeModal(data) {
      if (data) {
        this.showRevokeRefund = true
      }
    },
    goBack() {
      // 个人主页
      console.log('111')
    },
    ...mapActions('comprehensiveProgressControlModule', [
      'getOrderManagement',
      'orderManagement',
    ]),
    ...mapActions(['subscribeScanGun', 'desubscribeScanGun']),
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    sureBatchAddPay(data) {
      console.log(data)
      this.tipContent = this.tableChooseArr.length
      this.controlModal = true
    },
    buttonLogin() {
      let toLogin = []
      for (let i in this.tableChooseArr) {
        toLogin.push(this.tableChooseArr[i].pe_sn)
      }
      this.$router.push({ name: 'register', params: { pe_sn_list: toLogin } })
      let temp = {}
      temp.name = 'register'
      temp.title = 'register'
      this.openPage(temp)
      this.setCurPage(temp.name)
    },
    scrollIn() {
      this.morebtn = null
    },
    search() {
      console.log('aaa')
    },
    onChangeTime() {
      console.log('aaa')
    },
    buttonadd() {
      this.$router.push({ name: 'register' })
      let temp = {}
      temp.name = 'register'
      temp.title = 'register'
      this.openPage(temp)
      this.setCurPage(temp.name)
    },
    tableSelectionChange(arr) {
      this.tipContent = arr ? arr.length : 0
      if (arr.length !== 0) {
        this.bulkOperation = false
      } else {
        this.bulkOperation = true
      }
    },
    ExamineModal() {
      console.log(222)
      // 完检确认
      this.showExamineModal = false
    },
    RevocationExamineModal() {
      // 撤销完检确认
      this.RevocationExamineModal = false
    },
    sureApplyRefund() {
      // 申请退费
      this.showApplyRefund = false
    },
    sureRevokeRefund() {
      // 申请退费
      this.showRevokeRefund = false
    },
    buttonReduce(name) {
      this.modelChooseItem = true
    },
    surechooseReduceItem(data) {
      this.modelChooseReduceItem = false
    },
    surechooseAddItem(data) {
      this.modelChooseAddItem = false
    },
    sureRevocationExamineModal() {
      this.controlModalTip = true
    },
    tipCommit() {
      this.RevocationExamineModal = false
      this.controlModalTip = false
    },
    tipCancel() {
      this.controlModalTip = false
    },
  },
  async mounted() {
    // 请求个人结算数据
    // this.getOrderManagement()
    let num = 0
    let result = await this.getOrderManagement({
      per_page: 10000,
      fields: 'register_man,id,status',
    })
    for (let i in result.items) {
      if (result.items[i].status) {
        num++
      }
    }
    this.num = num.console.log(result)
    // 订阅扫码枪
    this.subscribeScanGun(this.initShowChargeModal)
  },
  activated() {
    // 订阅扫码枪
    this.subscribeScanGun(this.initShowChargeModal)
  },
  deactivated() {
    // 取消扫码枪
    this.desubscribeScanGun(this.initShowChargeModal)
  },
  destroyed () {
    // 取消扫码枪
    this.desubscribeScanGun(this.initShowChargeModal)
  },
}
</script>

<style lang="less">
@import (reference) '~assets/less/variable.less';
.exam-progress {
  height: 100%;
  padding: @num10;
  .table-out {
    height: calc(~'100% - 50px');
  }
  .ivu-table-fixed-right {
    width: 153px !important;
  }
  .ivu-table-fixed-body table colgroup col {
    width: 153px !important;
  }
  .handle {
    .ivu-poptip {
      .ivu-poptip-popper {
        right: 10px !important;
        width: 98px;
        .ivu-poptip-body {
          padding: 0;
          width: 100%;
          overflow: hidden;
          text-align: center;
        }
      }
    }
    .stopPop{
      .ivu-poptip-popper{
        display: none;
      }
    }
  }

  .ivu-table-fixed-body {
    position: static !important;
  }
  .slh {
    width: 100%;
    height: 36px;
    line-height: 36px;
    color: #4a4a4a;
  }
  .slh-hidden {
    display: none;
  }
  .slh:hover {
    color: #008cee;
    background: @gradeBlueFive;
  }
  .exam-progress-project {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid @gradeAshFive;
    border-radius: @borderRadiuBig;
    .exam-progress-project-content {
      width: 100%;
      height: 100%;
      .exam-progress-header {
        width: 100%;
        height: 50px;
        overflow: hidden;
        border-bottom: 1px solid @gradeAshFive;
        .exam-progress-header-left {
          float: left;
          line-height: 49px;
          margin-left: 20px;
          > span {
            font-size: 16px;
            font-weight: bold;
          }
        }
        .exam-progress-header-right {
          display: inline-block;
          float: right;
          .search {
            margin: 10px 0 10px 20px;
          }
          .button-in {
            margin-top: 10px;
            margin-bottom: 10px;
          }
        }
      }
      .ivu-table-cell {
        .text::after {
          content: ' ';
          position: absolute;
          left: -10px;
          width: 15px;
          top: 15px;
          left: -15px;
          height: 15px;
          background: url('/static/icons/public/vipYellow.svg') no-repeat;
        }
        .unitText::after {
          content: ' ';
          position: absolute;
          left: -10px;
          width: 15px;
          top: 15px;
          left: -15px;
          height: 15px;
          background: url('/static/icons/public/vipBlue.svg') no-repeat;
        }
      }
    }
  }
}
</style>

