/**
 * Created 覃凤
 * Date: 2018/2/26/
 * content: 个人结算-主页面
 */
<template>
  <div class="personal-physical-examination-charge">
    <div class="team-charge-wrapper paddingB10">
      <div class="top contentBg marginL10 marginR10 marginT10">
        <div class="top-header">
          <title-has-slot>
            <span slot="titletHasSlotLeftTitle">{{ msg }}</span>
            <div slot='titletHasSlotRightContent'
                 class="titlet-has-slot-right-content">
                 <!-- <Button @click='returnPremiumDetailModal.show=true'>退费单明细</Button> -->
                 <!-- <Button @click='accountModal.show=true'>体检费用清单</Button> -->
              <search-input :searchWidth='350' searText="请输入搜索内容" @on-enter='enterSearch' @on-Icon='enterSearch' @on-cancel='enterSearch'></search-input>
            </div>
          </title-has-slot>
        </div>
        <!-- 个人结算 -->
        <div class="top-table">
          <q-table ref='perSettlement'
                    key='perSettlement'
                    :width='1567'
                   :showOperateColumn="false"
                   :params="paraming"
                   :ifEdit="true"
                   :columns="perSettlement.columns"
                   :data="initTableData"
                   :height='100'
                   :pageInfo="pageInfo"
                   :isBorder='true'
                   :requestDataApi="initTable"
                   @on-row-click='perSettlementClickRow'
                   @scroll='topTableScroll'>
          </q-table>
        </div>
      </div>
      <div class="bottom marginT10 marginL10 marginR10 contentBg">
        <div class="bottom-header">
          <div class="com-tab"
               :class="{clickTab:isTab==='buttonAccount'}"
               @click="buttonAccount">结算单（{{settlementSheetLength}}）</div>
          <div class="com-tab"
               :class="{clickTab:isTab==='buttonRefund'}"
               @click="buttonRefund">退费单（{{refundSheetLength}}）</div>
          <!-- <Button type="ghost"  @click="buttonAccountCharge" class="print">打印结算费用清单</Button> -->
        </div>
        <div class="bottom-table contentBg">
          <!-- 结算单 -->
          <q-table v-if='settlementSheet.show'
                   ref='settlementTab'
                   key='settlementTab'
                   :showOperateColumn="false"
                   :params="settleParams"
                   :ifEdit="true"
                   :initReq='false'
                   :columns="settlementSheet.columns"
                   :data="initSettlementDataShow"
                   :height='100'
                   :ifShowPagination='false'
                   :pageInfo="settlePageInfo">
          </q-table>
          <!-- 退费单 -->
          <q-table v-if='!settlementSheet.show'
                   ref='refundSheetTab'
                   key='refundSheetTab'
                   :showOperateColumn="false"
                   :params="refundSheetParmas"
                   :ifEdit="true"
                   :initReq='false'
                   :columns="refundSheet.columns"
                   :data="initRefundDataShow"
                   :height='100'
                   :ifShowPagination='false'
                   :pageInfo="refundPageInfo">
          </q-table>
        </div>
        <iframe id='iframePrintFyqd' src="/static/jianqian/个人体检项目收费清单.html" frameborder="0" style="display:none;"></iframe>
          <!-- <iframe id='iframePrintYbtm' src="/static/jianqian/个人体检项目收费清单.html" frameborder="0" style="display:none;"></iframe> -->
          <iframe id='iframePrintZyd' src="/static/jianqian/指引单.html" frameborder="0" style="display:none;"></iframe>
          <!-- <iframe id='iframePrintReturnPay' src="/static/jianqian/指引单.html" frameborder="0" style="display:none;"></iframe> -->
      </div>
    </div>

    <!-- 退费明细 -->
    <return-premium-detail-modal :ReturnPremiumDetailModal.sync='returnPremiumDetailModal.show'
                                 @ReturnPremiumDetailModal='returnPremiumPrint' ref="returnPremiumDetailModal"></return-premium-detail-modal>

    <!-- 个人退费 -->
    <return-pay :modelReturnPay='modelReturnPay.show'
                @sure='commitReturnPay'
                @cancel='cancelReturnPay'>
    </return-pay>



    <!-- 结算费用清单 -->
    <account-modal :AccountModal='accountModal.show' @AccountModal='accountModalPrint'></account-modal>

    <!-- 结算单明细 -->
    <personal-statement-detail-modal :controlModal='controlModal.show'
                                     @close-statement-detail='cancelPerStateMent'
                                     @look-detail="lookDetail"
                                     @printChargeDetail='commitPerStateMent'>
    </personal-statement-detail-modal>

    <!-- 个人收费 -->
    <person-charge :ifShowModal='perPay.show'
                   :modalData='modalDataUnit'
                   @cancel-data='cancelPersonCharge'
                   @commit-data='commitPersonCharge'>
    </person-charge>

    <!-- 作废结算单 -->
    <void-statement :modelVoid='settlementInvalida.show'
                    :headerText='settlementInvalida.headerText'
                    @sure='commitSettleInvalida'
                    @cancel='cancelSettleInvalida'></void-statement>

    <!-- 作废退费单 -->
    <void-statement :modelVoid='refundInvalidate.show'
                    :headerText='refundInvalidate.headerText'
                    @sure='commitRefundInvalidate'
                    @cancel='cancelRefundInvalidate'></void-statement>

    <!-- 撤销退费 -->
    <repeal-return-pay
      :modelRepealReturnPay='removeReturnPay.show'
      @sure='commitRevokeRefund'
      @cancel='cancelRevokeRefund'>
    </repeal-return-pay>

     <!-- 体检费用明细 -->
    <detailsCharges :ifShowModal="physicalExamination.show"
                    :titleName="'体检费费用明细'"
                    :columns="physicalExamination.columns"
                    :data="physicalExamination.data"
                    :height="331"
                    @close-modal="physicalExaminationClose"></detailsCharges>

    <!-- 附加费费用明细 -->
    <detailsCharges :ifShowModal="surcharge.show"
                    :titleName="'附加费费用明细'"
                    :columns="surcharge.columns"
                    :data="surcharge.data"
                    :height="331"
                    @close-modal="surchargeClose"></detailsCharges>
  
  </div>
</template>
<script>
import timeFilter from '@/fifters/timeFilter.js'
import { mapActions, mapGetters } from 'vuex'

import returnPay from './components/modal/returnPay.vue' // 个人退费
import accountModal from './components/modal/AccountModal.vue' // 结算费用清单
import PhysicalModal from './components/modal/PhysicalModal.vue' // 体检费用清单
import personCharge from './components/modal/personCharge.vue' // 个人收费
import repealReturnPay from './components/modal/repealReturnPay.vue' // 撤销退费
import personalStatementDetailModal from './components/modal/personalStatementDetailModal.vue' // 结算单明细
import ReturnPremiumDetailModal from './components/modal/ReturnPremiumDetailModal' // 退费明细
import voidStatement from '@/views/main/prepare/payment/components/modal/voidStatement.vue' // 作废结算单（作废退费单）
// import settlementTab from './components/settlementTab'
import detailsCharges from '../components/detailsCharges'

export default {
  name: 'personalPhysicalExaminationCharge',
  components: {
    returnPay,
    accountModal,
    PhysicalModal,
    personCharge,
    repealReturnPay,
    personalStatementDetailModal,
    ReturnPremiumDetailModal,
    voidStatement,
    // settlementTab,
    detailsCharges,
  },
  data() {
    let that = this
    return {
      msg: '个人结算',
      morebtn: null,
      initSettlementDataShow: [],
      initRefundDataShow: [],
      /* =============================================主页面数据 */
      // settlementSheetLength: 0, // 结算单条数
      // refundSheetLength: 0, // 退款单条数
      isTab: 'buttonAccount',
      searchKey: '', // 搜索框数据
      perSettlement: {
        // 个人结算表格
        columns: [
          {
            title: '来源',
            key: 'order_source',
            // width: 57,
            ellipsis: true,
            filterType: 'type',
            filterOptions: [
              {
                label: '个人预约',
                value: 1,
              }, {
                label: '单位预约',
                value: 2,
              },
            ],
            render: (h, params) => {
              if (params.row.order_source === 1) {
                return h('div', '个人预约')
              } else if (params.row.order_source === 2) {
                return h('div', '单位预约')
              }
            },
          },
          {
            title: '单位体检号',
            key: 'unit_order_id',
            // width: 80,
            ellipsis: true,
          },
          {
            title: '体检号',
            key: 'pe_sn',
            width: 93,
            ellipsis: true,
          },
          {
            title: '姓名',
            key: 'name',
            // width: 100,
            ellipsis: true,
            render: (h, params) => {
              if (params.row.customer.is_vip) { // 是否是vip
                return h(
                  'div',
                  {
                    class: 'nameRenderClass',
                  },
                  [
                    h('span', {
                      class: {
                        text: true,
                      },
                      style: {
                        position: 'relative',
                        // lineHeight: '40px',
                      },
                      domProps: {
                        innerHTML: params.row.customer.name,
                      },
                    }),
                  ],
                )
              } else {
                return h(
                  'div',
                  {
                    class: 'nameRenderClass',
                  },
                  [
                    h('span', {
                      class: {
                        text: false,
                      },
                      style: {
                        position: 'relative',
                        // lineHeight: '40px',
                      },
                      domProps: {
                        innerHTML: params.row.customer.name,
                      },
                    }),
                  ],
                )
              }
            },
          },
          {
            title: '性别',
            key: 'showSex',
            width: 54,
            filterType: 'type',
            filterOptions: [
              {
                label: '男',
                value: 1,
              }, {
                label: '女',
                value: 2,
              },
            ],
            ellipsis: true,
            render: (h, params) => {
              if (params.row.customer.sex === 1) {
                return h('div', '男')
              } else if (params.row.customer.sex === 2) {
                return h('div', '女')
              }
            },
          },
          {
            title: '年龄',
            // key: 'age',
            key: 'customer.age',
            width: 44,
            filterType: 'type',
            // filterOptions: [
            //   {
            //     label: '通用',
            //     value: 0,
            //   }, {
            //     label: '男',
            //     value: 1,
            //   }, {
            //     label: '女',
            //     value: 2,
            //   },
            // ],
            ellipsis: true,
            render: (h, params) => {
              return h('div', params.row.customer.age)
            },
          },
          {
            title: '单位名称',
            key: 'unit_name',
            width: 226,
            ellipsis: true,
            render: (h, params) => {
              return h('div', params.row.customer.unit_name)
            },
          },
          {
            title: '订单金额（元）',
            key: 'total_amount',
            width: 106,
            ellipsis: true,
          },
          {
            title: '已收金额（元）',
            key: 'received_amount',
            width: 100,
            ellipsis: true,
          },
          {
            title: '待收金额（元）',
            key: 'collect_amount',
            width: 100,
            ellipsis: true,
          },
          {
            title: '应收金额（元）',
            key: 'receivable_amount',
            width: 100,
            ellipsis: true,
          },
          {
            title: '已退金额（元）',
            key: 'received_refund',
            width: 106,
            ellipsis: true,
          },
          {
            title: '应退金额（元）',
            key: 'receivable_refund',
            width: 106,
            ellipsis: true,
          },
          {
            title: '登记日期',
            key: 'registration.register_time',
            width: 93,
            ellipsis: true,
            render: (h, params) => {
              if (params.row.registration === null || params.row.registration === undefined) {
                return h('div', '')
              } else {
                return h('div', timeFilter(params.row.registration.register_time))
              }
            },
          },
          {
            title: '操作',
            key: 'operation',
            width: 128,
            _pop: false,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  {
                    style: {
                      display: 'inline-block',
                      width: '48px',
                      color: '#008cee',
                      'line-height': '36px',
                      'margin-right': '9px',
                      'margin-left': '0',
                    },
                    on: {
                      click: event => {
                        event.stopPropagation()
                        that.costListBtn()
                      },
                    },
                  },
                  '费用清单',
                ),
                h(
                  'span',
                  {
                    style: {
                      display: 'inline-block',
                      width: '25px',
                      color: '#008cee',
                      'line-height': '36px',
                      'margin-right': '9px',
                    },
                    on: {
                      click: event => {
                        event.stopPropagation()
                        console.log('收费')
                        that.perChargeBtn()
                      },
                    },
                  },
                  '收费',
                ),
                h(
                  'Poptip',
                  {
                    props: {
                      value: this.morebtn === params.index,
                      // placement: this.place,
                      placement: 'bottom-end',
                      content: 'aaa',
                    },
                    style: {
                      display: 'inline-block',
                      width: '15px',
                      color: '#008cee',
                      'margin-right': '10px',
                    },
                    nativeOn: {
                      click: () => {
                        this.morebtn = params.index
                      },
                      mouseenter: e => {
                        // console.log(document.body.clientHeight - e.clientY)
                        if (document.body.clientHeight - e.clientY >= 120) {
                          // console.log('bottom-end')
                          this.place = 'bottom-end'
                        } else {
                          // console.log('top-end')
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
                        // color: '#008cee',
                        'z-index': '999',
                        background:
                          "url('/static/icons/public/more.svg') no-repeat center 10px",
                      },
                    }),
                    h(
                      'div',
                      {
                        style: {
                          'line-height': '40px',
                        },
                        slot: 'content',
                      },
                      [
                        h(
                          'div',
                          {
                            class: 'slh',
                            on: {
                              click(e) {
                                /* console.log('退费') */
                                e.stopPropagation()
                                that.morebtn = null
                                that.refundBtn()
                              },
                            },
                          },
                          '退费',
                        ),
                        h(
                          'div',
                          {
                            class: 'slh',
                            on: {
                              click(e) {
                                /* console.log('撤销退费') */
                                e.stopPropagation()
                                that.morebtn = null
                                that.revokeRefundBtn()
                              },
                            },
                          },
                          '撤销退费',
                        ),
                      ],
                    ),
                  ],
                ),
              ])
            },
          },
        ],
      },
      settlementSheet: {
        // 结算单
        // length: 0,
        show: false,
        columns: [
          {
            title: '个人结算单号',
            key: 'self_pe_sn',
            width: 149,
            ellipsis: true,
          },
          {
            title: '结算时间',
            key: 'self_time',
            width: 141,
            ellipsis: true,
          },
          {
            title: '待收金额（元）',
            key: 'receivable_amount',
            width: 111,
            ellipsis: true,
          },
          // {
          //   title: '折扣',
          //   key: 'self_zk',
          //   width: 85,
          //   ellipsis: true,
          // },
          // {
          //   title: '减免金额（元）',
          //   key: 'discount_amount',
          //   width: 111,
          //   ellipsis: true,
          // },
          {
            title: '实收金额（元）',
            key: 'self_ssMoney',
            width: 111,
            ellipsis: true,
          },
          {
            title: '实收比例',
            key: 'self_ssbl',
            // width: 111,
            ellipsis: true,
          },
          {
            title: '实收优惠（元）',
            key: 'self_yh',
            width: 111,
            ellipsis: true,
          },
          {
            title: '支付方式',
            key: 'self_pay_fs',
            // width: 80,
            ellipsis: true,
          },
          {
            title: '结算人',
            key: 'self_name',
            // width: 117,
            ellipsis: true,
          },
          {
            title: '状态',
            key: 'statusShow',
            // width: 99,
            ellipsis: true,
          },
          {
            title: '操作',
            key: 'operation',
            width: 105,
            _pop: false,
            fixed: 'right',
            render: (h, params) => {
              // console.log(params.row.self_zf)
              if (params.row.self_zf) {
                // 作废禁用
                return h('div', [
                  h(
                    'span',
                    {
                      class: 'operationBase',
                      on: {
                        click() {
                          console.log('jiangyiling')
                          that.settlementDetailsBtn()
                        },
                      },
                    },
                    '查看明细',
                  ),
                  h(
                    'span',
                    {
                      style: {
                        'margin-left': '10px',
                        color: '#B3B3B3',
                      },
                    },
                    '作废',
                  ),
                ])
              } else {
                return h('div', [
                  h(
                    'span',
                    {
                      class: 'operationBase',
                      on: {
                        click() {
                          that.settlementDetailsBtn()
                        },
                      },
                    },
                    '查看明细',
                  ),
                  h(
                    'span',
                    {
                      style: {
                        'margin-left': '10px',
                        color: '#FF6262',
                      },
                      on: {
                        click() {
                          that.settlementInvalidaBtn()
                        },
                      },
                    },
                    '作废',
                  ),
                ])
              }
            },
          },
        ],
      },
      refundSheet: {
        // 退费单
        // length: 0,
        // show: false,
        columns: [
          {
            title: '个人退费单号',
            key: 'self_tfNumber',
            // width: 167,
            ellipsis: true,
          },
          {
            title: '退费时间',
            key: 'self_time',
            // width: 188,
            ellipsis: true,
          },
          {
            title: '已选退费金额（元）',
            key: 'self_chooseTfMoney',
            // width: 218,
            ellipsis: true,
          },
          // {
          //   title: '退费比例',
          //   key: 'self_tfBl',
          //   width: 102,
          //   ellipsis: true,
          // },
          // {
          //   title: '退费手续费（元）',
          //   key: 'self_tfsx',
          //   width: 115,
          //   ellipsis: true,
          // },
          {
            title: '实际退费金额（元）',
            key: 'self_sjtf',
            // width: 125,
            ellipsis: true,
          },
          {
            title: '实际退费比例',
            key: 'self_tfbl',
            // width: 134,
            ellipsis: true,
          },
          {
            title: '退费人',
            key: 'self_tfPer',
            // width: 102,
            ellipsis: true,
          },
          {
            title: '状态',
            key: 'self_status',
            // width: 73,
            ellipsis: true,
          },
          {
            title: '操作',
            key: 'operation',
            width: 105,
            ellipsis: true,
            _pop: false,
            fixed: 'right',
            render: (h, params) => {
              // console.log(params.row.self_zf)
              if (params.row.self_zf) {
                // 作废禁用
                return h('div', [
                  h(
                    'span',
                    {
                      class: 'operationBase',
                      on: {
                        click() {
                          that.returnPremBtn()
                        },
                      },
                    },
                    '查看明细',
                  ),
                  h(
                    'span',
                    {
                      style: {
                        'margin-left': '10px',
                        color: '#B3B3B3',
                      },
                    },
                    '作废',
                  ),
                ])
              } else {
                return h('div', [
                  h(
                    'span',
                    {
                      class: 'operationBase',
                      on: {
                        click() {
                          that.returnPremBtn()
                        },
                      },
                    },
                    '查看明细',
                  ),
                  h(
                    'span',
                    {
                      style: {
                        'margin-left': '10px',
                        color: '#FF6262',
                      },
                      on: {
                        click() {
                          that.returnInvalidaBtn()
                        },
                      },
                    },
                    '作废',
                  ),
                ])
              }
            },
          },
        ],
      },
      /* =============================================弹窗数据 */

      accountModal: {
        // 个人结算-费用清单
        show: false,
      },
      perPay: {
        // 个人结算-收费
        show: false,
      },
      modelReturnPay: {
        // 个人结算-退费
        show: false,
      },
      removeReturnPay: {
        // 个人结算-撤销退费
        show: false,
      },
      controlModal: {
        // 结算单-结算单明细
        show: false,
      },
      settlementInvalida: {
        // 结算单-作废结算单
        show: false,
        headerText: '作废结算单',
      },
      returnPremiumDetailModal: {
        // 退费单-退费单明细
        show: false,
      },
      refundInvalidate: {
        // 退费单-作废退费单
        show: false,
        headerText: '作废退费单',
      },
      physicalExamination: {// 体检费用单明细
        show: false,
        columns: [
          {
            title: '体检号',
            key: 'examId',
            ellipsis: true,
            width: 103,
          },
          {
            title: '姓名',
            key: 'name',
            ellipsis: true,
            width: 103,
          },
          {
            title: '性别',
            key: 'sex',
            ellipsis: true,
            width: 42,
          },
          {
            title: '年龄',
            key: 'age',
            ellipsis: true,
            width: 58,
          },
          {
            title: '登记日期',
            key: 'registerTime',
            ellipsis: true,
            width: 110,
          },
          {
            title: '体检套餐',
            key: 'examCombo',
            ellipsis: true,
            width: 202,
          },
          {
            title: '套餐金额（元）',
            key: 'examComboAmount',
            ellipsis: true,
            width: 136,
          },
          {
            title: '待收金额（元）',
            key: 'awaitAmount',
            ellipsis: true,
            width: 103,
          },
          {
            title: '实收金额（元）',
            key: 'actualAmount',
            ellipsis: true,
            width: 103,
          },
          {
            title: '单位支付比例',
            key: 'unitPayPercent',
            ellipsis: true,
            width: 110,
          },
          {
            title: '新增费用（元）',
            key: 'newCharge',
            ellipsis: true,
            width: 103,
          },
          {
            title: '新增费用支付方',
            key: 'newChargePayer',
            ellipsis: true,
            width: 103,
          },
        ],
        data: [
          {
            examId: '1801030056',
            name: '王树彤',
            sex: '女',
            age: '30',
            registerTime: '2018-01-09',
            examCombo: '承晟集团员工入职体检',
            examComboAmount: '200.00',
            awaitAmount: '200.00',
            actualAmount: '0',
            unitPayPercent: '1',
            newCharge: '0',
            newChargePayer: '技术部',
          },
          {
            examId: '1801030056',
            name: '王树彤',
            sex: '女',
            age: '30',
            registerTime: '2018-01-09',
            examCombo: '承晟集团员工入职体检',
            examComboAmount: '200.00',
            awaitAmount: '200.00',
            actualAmount: '0',
            unitPayPercent: '1',
            newCharge: '0',
            newChargePayer: '技术部',
          },
          {
            examId: '1801030056',
            name: '王树彤',
            sex: '女',
            age: '30',
            registerTime: '2018-01-09',
            examCombo: '承晟集团员工入职体检',
            examComboAmount: '200.00',
            awaitAmount: '200.00',
            actualAmount: '0',
            unitPayPercent: '1',
            newCharge: '0',
            newChargePayer: '技术部',
          },
          {
            examId: '1801030056',
            name: '王树彤',
            sex: '女',
            age: '30',
            registerTime: '2018-01-09',
            examCombo: '承晟集团员工入职体检',
            examComboAmount: '200.00',
            awaitAmount: '200.00',
            actualAmount: '0',
            unitPayPercent: '1',
            newCharge: '0',
            newChargePayer: '技术部',
          },
          {
            examId: '1801030056',
            name: '王树彤',
            sex: '女',
            age: '30',
            registerTime: '2018-01-09',
            examCombo: '承晟集团员工入职体检',
            examComboAmount: '200.00',
            awaitAmount: '200.00',
            actualAmount: '0',
            unitPayPercent: '1',
            newCharge: '0',
            newChargePayer: '技术部',
          },
          {
            examId: '1801030056',
            name: '王树彤',
            sex: '女',
            age: '30',
            registerTime: '2018-01-09',
            examCombo: '承晟集团员工入职体检',
            examComboAmount: '200.00',
            awaitAmount: '200.00',
            actualAmount: '0',
            unitPayPercent: '1',
            newCharge: '0',
            newChargePayer: '技术部',
          },
          {
            examId: '1801030056',
            name: '王树彤',
            sex: '女',
            age: '30',
            registerTime: '2018-01-09',
            examCombo: '承晟集团员工入职体检',
            examComboAmount: '200.00',
            awaitAmount: '200.00',
            actualAmount: '0',
            unitPayPercent: '1',
            newCharge: '0',
            newChargePayer: '技术部',
          },
          {
            examId: '1801030056',
            name: '王树彤',
            sex: '女',
            age: '30',
            registerTime: '2018-01-09',
            examCombo: '承晟集团员工入职体检',
            examComboAmount: '200.00',
            awaitAmount: '200.00',
            actualAmount: '0',
            unitPayPercent: '1',
            newCharge: '0',
            newChargePayer: '技术部',
          },
        ],
      },
      surcharge: { // 附加费费用明细
        show: false,
        columns: [
          {
            title: '费用类别',
            key: 'self_moneyType',
            ellipsis: true,
          }, {
            title: '附加费名称',
            key: 'self_fjName',
            ellipsis: true,
          }, {
            title: '待收金额（元）',
            key: 'self_dsMoney',
            ellipsis: true,
          }, {
            title: '实收金额（元）',
            key: 'self_ssMoney',
            ellipsis: true,
          }, {
            title: '实收比例',
            key: 'self_ssbl',
            ellipsis: true,
          }, {
            title: '实收优惠（元）',
            key: 'self_ssyh',
            ellipsis: true,
          },
        ],
        data: [
          {
            self_moneyType: '耗材费',
            self_fjName: '针管费',
            self_dsMoney: '10.00',
            self_ssMoney: '10.00',
            self_ssbl: 1,
            self_ssyh: 0,
          },
        ],
      },
      /* =============================================传入弹窗数据 */
      modalDataUnit: {
        pe_sn: 'BA20170908008', // 体检号
        name: '王树彤', // 姓名
        self_sexShow: '女', // 性别
        self_djDate: '2018-3-2', // 登记日期
        self_oderMoney: '2000.00', // 订单金额
        self_ysMoney: '0.00', // 已收金额
        self_dsMoney: '2000.00', // 待收金额
        self_zk: '0', // 折扣
        self_jm: '0.00', // 减免金额
        self_ysje: '2000.00', // 应收金额
        self_pe_name: '中国石油化工有限公司', // 发票单位
        self_sbh: null, // 识别号
        remark: '', // 备注
        self_per_zhye: null, // 个人会员账户余额
        self_per_pasword: '', // 个人会员账户密码
        self_per_phone: 13485622895, // 个人会员手机号
        self_per_yzNum: '', // 个人会员验证码
        self_unit_pe_sn: '成都小蓝科技', // 单位会员单位名称
        self_unit_zhye: null, // 单位会员账户余额
        self_unit_password: '', // 单位支付密码
        self_unit_phone: 13485622895, // 单位支手机号
        self_unit_yzNum: '', // 单位验证码
        vipRechargePrice: null,
        vipRechargePriceFp: '',
        columnData: [
          {
            self_type: '体检费',
            self_dsMoney: 900.00,
            self_ysMoney: 3000.0,
          }, {
            self_type: '附加费',
            self_dsMoney: 900.00,
            self_ysMoney: 2000.0,
          },
        ],
        fyqd: 1,
        ybtm: 1,
        zyd: 1,
      },
    }
  },
  computed: {
    settlementSheetLength() {
      // 结算单条数
      // initSettlementDataShow: [],
      // initRefundDataShow: [],
      return this.initSettlementDataShow.length
      // return this.initSettlementData.length
    },
    refundSheetLength() {
      // 退款单条数
      return this.initRefundDataShow.length
      // return this.initRefundData.length
    },
    ...mapGetters('personalPhysicalExaminationChargeModule', [
      'initTableData', // 个人结算
      'initSettlementData', // 结算单
      'initRefundData', // 退费单
      'settlePageInfo', // 结算单page
      'pageInfo', // 个人结算page
      'refundPageInfo', // 退费单page
    ]),
    paraming() {
      let search = ''
      // 个人结算
      if (this.searchKey !== '') {
        search = this.searchKey
      }
      let data = {
        search: search,
        filters: '',
      }
      return data
    },
    settleParams() {
      // 结算单
      return {}
    },
    refundSheetParmas() {
      // 退款单
      return {}
    },
  },
  methods: {
    surchargeClose () { // 关闭附加费费用明细
      this.surcharge.show = false
    },
    physicalExaminationClose () { // 体检费费用明细
      this.physicalExamination.show = false
    },
    ...mapActions('personalPhysicalExaminationChargeModule', [
      'initTable',
      'initSettlement',
      'initRefund',
    ]),
    ...mapActions(['subscribeScanGun', 'desubscribeScanGun']),
    /* =====================================================搜索 */
    enterSearch (data) { // 触发搜索
      this.searchKey = data
    },
    /* =====================================================主页面 */
    topTableScroll () {
      this.morebtn = null
    },
    async perSettlementClickRow(selection, row, index, column) {
      // 个人结算点击行
      // 请求结算单、退费单数据（先做结算单）
      // 显示表格
      /* console.log(arguments) */
      this.settlementSheet.show = true
      await this.initSettlement()
      await this.initRefund()
      this.initSettlementDataShow = this.initSettlementData
      this.initRefundDataShow = this.initRefundData
    },
    // 结算单
    buttonAccount() {
      this.isTab = 'buttonAccount'
      this.settlementSheet.show = true
      // this.controlModal.show = true
    },
    // 退款单
    buttonRefund() {
      this.isTab = 'buttonRefund'
      this.settlementSheet.show = false
    },
    /* =============================================================弹窗 */
    /* ============================================个人结算-费用清单AccountModal */
    costListBtn() {
      /* console.log('打印预览/结算费用清单') */
      this.accountModal.show = true
    },
    accountModalPrint () { // 打印
      this.accountModal.show = false
    },
    /* =============================================个人结算-个人收费personCharge */
    // initShowchargePer () {

    // }
    perChargeBtn() {
      this.perPay.show = true
    },
    cancelPersonCharge() {
      /* console.log('个人收费取消') */
      this.perPay.show = false
    },
    commitPersonCharge(data) {
      /* console.log('个人收费提交') */
      this.perPay.show = false
      if (data.fyqd === 1) { // 打印费用清单
        console.log(1111)
        let a = document.getElementById('iframePrintFyqd')
        a.contentWindow.print()
      }
      if (data.ybtm === 1) { // 样本条码

      }
      if (data.zyd === 1) { // 指引单
        let a = document.getElementById('iframePrintZyd')
        a.contentWindow.print()
      }
    },
    /* ============================================个人结算-退费returnPay */
    refundBtn() {
      this.modelReturnPay.show = true
    },
    cancelReturnPay(data) {
      this.modelReturnPay.show = false
      // if (data.print === 1) {
      //   let a = document.getElementById('iframePrintReturnPay')
      //   a.contentWindow.print()
      // }
    },
    commitReturnPay() {
      this.modelReturnPay.show = false
    },
    /* =============================================个人结算-撤销退费 */
    revokeRefundBtn () {
      this.removeReturnPay.show = true
    },
    cancelRevokeRefund () {
      this.removeReturnPay.show = false
    },
    commitRevokeRefund() {
      this.removeReturnPay.show = false
    },
    /* =============================================结算单-结算单明细personalStatementDetailModal */
    settlementDetailsBtn() {
      /* console.log('查看明细-结算单明细显示') */
      this.controlModal.show = true
    },
    cancelPerStateMent() {
      // 结算单取消
      this.controlModal.show = false
    },
    commitPerStateMent() {
      // 结算完成
      this.controlModal.show = false
    },
    lookDetail (data) {
      console.log('lookDetail', data)
      if (data === 1) { // 目前是按照index返回的data，这里0是第一行，体检费
        /* console.log('lookDetail', 111111111) */
        this.physicalExamination.show = true
        // this.additionalChargeDetail = false
      } else { // 附加费
        this.surcharge.show = true
        // this.additionalChargeDetail = true
      }
    },
    /* =============================================结算单-作废结算单 */
    settlementInvalidaBtn() {
      /* console.log('作废结算单') */
      this.settlementInvalida.show = true
    },
    commitSettleInvalida() {
      // 作废结算单确定
      this.settlementInvalida.show = false
    },
    cancelSettleInvalida() {
      // 作废结算单取消
      this.settlementInvalida.show = false
    },
    /* =============================================退款单-退费单明细 */
    returnPremBtn() {
      this.returnPremiumDetailModal.show = true
      this.$refs.returnPremiumDetailModal.resetClose()
    },
    returnPremiumPrint () { // 打印退费凭条
      this.returnPremiumDetailModal.show = false
    },
    /* =============================================退款单-作废退款单 */
    returnInvalidaBtn() {
      this.refundInvalidate.show = true
    },
    commitRefundInvalidate() {
      // 作废退费单确定
      this.refundInvalidate.show = false
    },
    cancelRefundInvalidate() {
      // 作废退费单取消
      this.refundInvalidate.show = false
    },
    initShowModalCharge (data) { // 扫码枪判断显示弹窗
      console.log(data)
      if (data === 'http://www.dtcash.com/Home/BeginerGuide.html') { // 显示个人收费
        this.perChargeBtn()
      } else if (data === 'http://weixin.qq.com/r/eHXT3DDE6g6VhyG-nyBc') { // 显示撤销退费
        this.revokeRefundBtn()
      } else if (data === 'http://mm.wanggou.com/promote/hb1212/index.shtml') { // 显示退费
        this.refundBtn()
      }
    },
  },
  async mounted() {
    // 请求个人结算数据
    // await this.initTable()
    // 请求结算单数据
    // this.settlementSheet.show = true
    // await this.initSettlement()
    // console.log(this.pageInfo)
    // console.log(this.initTableData)
    // 订阅扫码枪
    this.subscribeScanGun(this.initShowModalCharge)
    this.initSettlementDataShow = []
    this.initRefundDataShow = []
  },
  activated() {
    // console.log(2222)
    // 订阅扫码枪
    this.subscribeScanGun(this.initShowModalCharge)
  },
  deactivated() {
    // 取消扫码枪
    // console.log(1111)
    this.desubscribeScanGun(this.initShowModalCharge)
  },
  destroyed() {
    // 取消扫码枪
    this.desubscribeScanGun(this.initShowModalCharge)
    // console.log(3333)
    // console.log(this.initSettlementDataShow)
    this.initSettlementDataShow = []
    this.initRefundDataShow = []
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.personal-physical-examination-charge {
  // padding: 10px;
  height: 100%;
  //render里面的class
  // .ivu-table-hidden > div {
  //   visibility: visible!important;
  // }
  .titlet-has-slot {
    &>div {
      margin-right: 0;
    }
  }
  .renderClass {
    color: @gradeBlueOne;
    line-height: @num30;
  }
  .operationBase {
    margin-left: 7px;
    color: @gradeBlueOne;
  }
  .ivu-table-tbody {
    &>.ivu-table-row {
      td {
        // height: 40px!important;
        // line-height: 0px;
      }
    }
  }
  .ivu-table-fixed-body .ivu-table-row-highlight-body-content {
    &>td {
      border-left: none!important;
      border-right: 2px solid @gradeBlueOne!important;
    }
  }
  .nameRenderClass {
    background: '';
    width: 100%;
    // height: 40px;
    // line-height: 40px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ivu-table-cell {
    .text::after {
      content: ' ';
      position: absolute;
      left: -10px;
      width: 15px;
      top: 3px;
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
  .ivu-poptip-body {
    padding: 8px 0;
  }
  .top-table {
    .ivu-table-fixed-right {
      width:128px!important;
    }
    .ivu-table-fixed-body table colgroup col{
      width: 128px !important;
    }
    .ivu-table-fixed-body {
      &>table {
        &>tbody {
          .ivu-table-cell {
            &>div {
              width: 102%!important;
            }
          }
        }
      }
    }
    // .ivu-table-row,.ivu-table-row td{
    //   height: 40px!important;
    // }
  }
  .bottom-table {
    .ivu-table-fixed-right {
      width:105px!important;
    }
    .ivu-table-fixed-body table colgroup col{
      width: 105px !important;
    }
    // .ivu-table-fixed-body {
    //   height: 100%!important;
    //   line-height: 100%!important;
    // }
  }
  .ivu-poptip{
    .ivu-poptip-popper{
      right:10px!important;
      width:98px;
      .ivu-poptip-body{
        padding:0;
        width:100%;
        overflow:hidden;
        text-align: center;
      }
    }
  } 
  .ivu-table-fixed-body{
    position: static!important;
  }
  .slh {
    width: 100%;
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    color: @gradeAshTwo;
  }
  .slh:hover {
    color: @gradeBlueOne;
    background: @gradeBlueFive;
  }
  .ivu-table {
    .ivu-table-body {
      overflow: auto;
    }
  }

  .team-charge-wrapper {
    height: 100%;
    overflow: hidden;
    .top {
      height: calc(~'100% - 255px');
      .top-header {
        background: white;
      }
      .top-table {
        height: calc(~'100% - 50px');
        // background: black;
      }
    }
    .bottom {
      height: 235px;
      border: 1px solid @gradeAshFive;
      border-radius: @borderRadiuBig;
      overflow: hidden;
      .bottom-header {
        height: 50px;
        position: relative;
        .com-tab {
          font-weight: bold;
          margin-left: 20px;
          display: inline-block;
          cursor: pointer;
          color: #737373;
          font-size: 14px;
          line-height: 48px;
        }
        .clickTab {
          color: #008cee;
          border-bottom: 2px solid #008cee;
        }
        .print {
          position: absolute;
          top: 10px;
          right: 20px;
        }
      }
      .bottom-table {
        height: 205px;
        // .custom-defined-table {
        //   height: 100%!important;
        //   .ivu-table-wrapper {
        //     height: 100%!important;
        //     .ivu-table-body {
        //       height: calc(~'100% - 40px')!important;
        //     }
        //   }
        // }
        .custom-defined-table {
          height: 100%!important;
          .ivu-table-wrapper {
            height: 100%!important;
            .ivu-table {
              height: 100%!important;
              .ivu-table-body {
                height: calc(~'100% - 40px')!important;
                // height: calc(~'100% - 40px')!important;
              }
              .ivu-table-fixed-right {
                // bottom: 6px!important;
                // height: calc(~'100% - 6px')!important;
                .ivu-table-fixed-body {
                  height: calc(~'100% - 40px')!important;
                }
              }
              // .ivu-table-body {
              //   height: 100%!important;
              //   // height: calc(~'100% - 40px')!important;
              // }
              // .ivu-table-fixed-right {
              //   height: 100%!important;
              //   .ivu-table-fixed-body {
              //     height: calc(~'100% - 6px')!important;
              //   }
              // }
            }
          }
        }
      }
    }
  }
}
</style>
