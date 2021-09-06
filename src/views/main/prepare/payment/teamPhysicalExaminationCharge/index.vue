/**
* author      : yhy
* cteate      : 2018/02/23 
* description : 单位结算主页面
*/
<template>
  <div class="team-charge">
    <div class="team-charge-wrapper paddingB10">
      <div class="top contentBg marginL10 marginR10 marginT10">
        <div class="top-header">
          <title-has-slot>
            <span slot="titletHasSlotLeftTitle">单位结算</span>
            <div slot='titletHasSlotRightContent'
                 class="titlet-has-slot-right-content">
              <search-input :searchWidth='350' searText=""></search-input>
            </div>
          </title-has-slot>
        </div>
        <div class="top-table">
          <q-table ref="zBaseInfoTable"
                   class="unit-acount-table"
                   :width='1630'
                   :showOperateColumn='false'
                   :columns="columns1"
                   :data="unitAcountItem"
                   :isBorder='true'
                   :pageInfo="unitAcountPageInfo"
                   :requestDataApi="initTable"
                   @on-row-click='unitSettlementClickRow'>
          </q-table>
        </div>
      </div>
      <div class="bottom marginT10 marginL10 marginR10 contentBg">
        <div class="bottom-header">
          <div class="com-tab" @click="buttonAccount">结算单（{{ settlementSheetLength }}）</div>
        </div>
        <div class="bottom-table">
          <!-- <q-table ref="zBaseInfoTable"
                   class="unit-acount-table"
                   :ifEdit="true"
                   :width='1581'
                   :initReq='false'
                   :height='100'
                   :ifShowPagination='false'
                   :showOperateColumn='false'
                   :columns="columns2"
                   :data="acountaSingleItemShow"
                   :pageInfo="unitAcountPageInfo"
                   :requestDataApi="getAcountaSingleTable">
          </q-table> -->
        </div>
        <!-- <iframe id='iframePrintFyqd' src="/static/jianqian/个人体检项目收费清单.html" frameborder="0" style="display:none;"></iframe> -->
      </div>
    </div>

    <!-- 体检费用清单 -->
    <physical-modal :PhysicalModal.sync='checkUpCostList.show' @PhysicalModal='physicalModalPrint' ref='physicalModal'></physical-modal>
    <!-- 做废结算单 -->
    <voidStatement :modelVoid="invalidatedSettlement.show"
                   headerText='作废结算单'
                   @sure="invalidatedSettlementCommit"
                   @cancel="invalidatedSettlementCancel"></voidStatement>
    <!-- 单位收费 -->
    <unit-charge :ifShowModal='unitCharge.show'
                 :modalData='unitCharge.data'
                 @commit-data='unitCommitData'
                 @cancel-data='unitCancelData'></unit-charge>
    <!-- 结算单明细 -->
    <statementDetailModal 
      :controlModal="statementDetai.show"
      @printChargeDetail="printChargeDetailFun"
      @look-detail="lookDetail"
      @close-statement-detail="closeStatementDetail">
    </statementDetailModal>

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
import { mapState, mapActions, mapGetters } from 'vuex'
import PhysicalModal from './components/modal/PhysicalModal'
import voidStatement from '../components/modal/voidStatement'
import unitCharge from './components/modal/unitCharge.vue'
import statementDetailModal from './components/modal/statementDetailModal'
import detailsCharges from '../components/detailsCharges'

export default {
  name: 'teamPhysicalExaminationCharge',
  components: {
    PhysicalModal,
    voidStatement,
    unitCharge,
    statementDetailModal,
    detailsCharges,
  },
  data() {
    let self = this
    return {
      statementDetai: { // 结算单明细
        show: false,
      },
      acountaSingleItemShow: [],
      unitCharge: {// 单位收费
        show: false,
        data: {
          pe_sn: 'BA20170908008', // 单位体检号
          name: '中国石油化工有限公司', // 单位名称
          self_djDate: '2018-3-2', // 登记日期
          self_oderMoney: '2000.00', // 单位总金额
          self_ysMoney: '0.00', // 已收金额
          self_dsMoney: '2000.00', // 待收金额
          self_ysje: '2000.00', // 应收金额
          self_zhye: 8888.0, // 账户余额
          self_pe_name: '中国石油化工有限公司', // 发票单位
          self_sbh: null, // 识别号
          remark: '', // 备注
          self_unit_pe_sn: '成都小蓝科技', // 单位会员单位名称
        // self_unit_zhye: null, // 单位会员账户余额
          self_unit_password: '', // 单位支付密码
          self_unit_phone: 13485622895, // 单位支手机号
          self_unit_yzNum: '', // 单位验证码
          vipRechargePrice: null,
          vipRechargePriceFp: '',
          columnData: [
            {
              self_type: '体检费',
              self_dsMoney: 900.0,
              self_ysMoney: 3000.0,
            },
            {
              self_type: '附加费',
              self_dsMoney: 900.0,
              self_ysMoney: 3000.0,
            },
          ],
          fyqd: 1,
        },
      },
      checkUpCostList: { // 体检费用清单
        show: false,
      },
      isTab: 'buttonAccount',
      invalidatedSettlement: { // 作废结算单
        show: false,
      },
      voidHeaderText: '',
      columns1: [
        {
          align: 'center',
          width: 93,
          ellipsis: true,
          title: '单位体检号',
          key: 'unit_sn',
        },
        {
          align: 'center',
          width: 200,
          ellipsis: true,
          title: '单位名称',
          key: 'unit.name',
          render: (h, params) => {
            if (params.row.unit) {
              return params.row.unit.name
            }
          },
        },
        {
          align: 'center',
          // width: 92,
          ellipsis: true,
          title: '结算方式',
          key: 'settlement_method',
          render: (h, params) => {
            if (params.row.settlement_method === 1) { // 以预约人数计
              return h('div', '以预约人数计')
            } else if (params.row.settlement_method === 2) { // 以实检人数计
              return h('div', '以实检人数计')
            }
          },
        },
        {
          align: 'center',
          // width: 106,
          ellipsis: true,
          title: '账户余额（元）',
          key: 'surpluMoney',
        },
        {
          align: 'center',
          width: 125,
          ellipsis: true,
          title: '订单总金额（元）',
          key: 'total_amount',
        },
        {
          align: 'center',
          width: 110,
          ellipsis: true,
          title: '个人总金额（元）',
          key: 'user_amount',
        },
        {
          align: 'center',
          width: 110,
          ellipsis: true,
          title: '单位总金额（元）',
          key: 'unit_amount',
        },
        {
          align: 'center',
          width: 113,
          ellipsis: true,
          title: '单位附加费（元）',
          key: 'surcharge_amount',
        },
        {
          align: 'center',
          // width: 110,
          ellipsis: true,
          title: '已收金额（元）',
          key: 'received_amount',
        },
        {
          align: 'center',
          // width: 110,
          ellipsis: true,
          title: '待收金额（元）',
          key: 'collect_amount',
        },
        {
          align: 'center',
          // width: 110,
          ellipsis: true,
          title: '应收金额（元）',
          key: 'receivable_amount',
        },
        {
          align: 'center',
          width: 97,
          ellipsis: true,
          title: '登记日期',
          key: 'created_at',
          render: (h, params) => {
            if (params.row.created_at === null) {
              return
            } else {
              return timeFilter(params.row.created_at)
            }
          },
        },
        {
          title: '备注',
          key: 'remarks',
          width: 50,
          align: 'center',
          ellipsis: true,
          render: (h, params) => {
            // console.log(params)
            return h('remark-in-table', {
              props: {
                text: params.row.remarks,
              },
            })
          },
        },
        {
          title: '操作',
          fixed: 'right',
          width: 103,
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    fontSize: '12px',
                    color: '#008CEE',
                    lineHeight: '36px',
                  },
                  on: {
                    click() {
                      self.checkUpCostList.show = true
                      // self.PhysicalModal = true
                    },
                  },
                },
                '费用清单',
              ),
              h(
                'span',
                {
                  style: {
                    fontSize: '12px',
                    color: '#008CEE',
                    lineHeight: '36px',
                    marginLeft: '10px',
                  },
                  on: {
                    click() {
                      // console.log(this)
                      self.unitCharge.show = true
                    },
                  },
                },
                '收费',
              ),
              // h(
              //   'span',
              //   {
              //     style: {
              //       display: 'none',
              //       fontSize: '12px',
              //       color: '#008CEE ',
              //       lineHeight: '40px',
              //       marginLeft: '10px',
              //     },
              //   },
              //   '退费',
              // ),
            ])
          },
        },
      ],
      columns2: [
        {
          align: 'center',
          width: 162,
          ellipsis: true,
          title: '单位结算单号',
          key: 'unitAcountNumber',
        },
        {
          align: 'center',
          // width: 153,
          ellipsis: true,
          title: '结算时间',
          key: 'acountTime',
        },
        {
          align: 'center',
          // width: 120,
          ellipsis: true,
          title: '待收金额（元）',
          key: 'waitMoney',
        },
        // {
        //   align: 'center',
        //   width: 92,
        //   ellipsis: true,
        //   title: '折扣',
        //   key: 'discountMoney',
        // },
        // {
        //   align: 'center',
        //   width: 157,
        //   ellipsis: true,
        //   title: '减免金额（元）',
        //   key: 'reducedMoney',
        // },
        {
          align: 'center',
          // width: 155,
          ellipsis: true,
          title: '实收金额（元）',
          key: 'actualMoney',
        },
        {
          align: 'center',
          // width: 120,
          ellipsis: true,
          title: '实收比例',
          key: 'actualScale',
        },
        {
          align: 'center',
          // width: 120,
          ellipsis: true,
          title: '实收优惠（元）',
          key: 'actualReduced',
        },
        {
          align: 'center',
          // width: 122,
          ellipsis: true,
          title: '支付方式',
          key: 'payWay',
        },
        {
          align: 'center',
          // width: 126,
          ellipsis: true,
          title: '结算人',
          key: 'acountPerson',
        },
        {
          align: 'center',
          // width: 106,
          ellipsis: true,
          title: '状态',
          key: 'state',
        },
        {
          title: '操作',
          fixed: 'right',
          width: 103,
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    fontSize: '12px',
                    color: '#008CEE',
                    lineHeight: '40px',
                  },
                  on: {
                    click() {
                      self.statementDetai.show = true
                    },
                  },
                },
                '查看明细',
              ),
              h(
                'span',
                {
                  style: {
                    fontSize: '12px',
                    color: '#FF3434 ',
                    lineHeight: '40px',
                    marginLeft: '10px',
                  },
                  on: {
                    click() {
                      // console.log(this)
                      self.showInvalidatedSet()
                    },
                  },
                },
                '作废',
              ),
            ])
          },
        },
      ],
      physicalExamination: {// 体检费用单明细
        show: false,
        columns: [
          {
            title: '体检号',
            key: 'examId',
            width: 103,
          },
          {
            title: '姓名',
            key: 'name',
            width: 103,
          },
          {
            title: '性别',
            key: 'sex',
            width: 42,
          },
          {
            title: '年龄',
            key: 'age',
            width: 58,
          },
          {
            title: '登记日期',
            key: 'registerTime',
            width: 96,
          },
          {
            title: '体检套餐',
            key: 'examCombo',
            width: 202,
          },
          {
            title: '套餐金额（元）',
            key: 'examComboAmount',
            width: 136,
          },
          {
            title: '待收金额（元）',
            key: 'awaitAmount',
            width: 103,
          },
          {
            title: '实收金额（元）',
            key: 'actualAmount',
            width: 103,
          },
          {
            title: '单位支付比例',
            key: 'unitPayPercent',
            width: 110,
          },
          {
            title: '新增费用（元）',
            key: 'newCharge',
            width: 103,
          },
          {
            title: '新增费用支付方',
            key: 'newChargePayer',
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
          }, {
            title: '附加费名称',
            key: 'self_fjName',
          }, {
            title: '待收金额（元）',
            key: 'self_dsMoney',
          }, {
            title: '实收金额（元）',
            key: 'self_ssMoney',
          }, {
            title: '实收比例',
            key: 'self_ssbl',
          }, {
            title: '实收优惠（元）',
            key: 'self_ssyh',
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
    }
  },
  computed: {
    ...mapState(['windowHeight']),
    ...mapGetters('teamPhysicalExaminationChargeModule', [
      'unitAcountItem',
      'unitAcountPageInfo',
      'acountaSingleItem',
      'acountaSinglePageInfo',
    ]),
    settlementSheetLength() { // 结算单条数
    // acountaSingleItemShow
      return this.acountaSingleItemShow.length
      // return this.acountaSingleItem.length
    },
  },
  methods: {
    initShowChargeModal (data) {
      if (data) {
        console.log(data)
        this.showUnitChargeModal()
      } else {
        console.log('没有数据')
      }
    },
    // 结算单
    buttonAccount() {
      this.isTab = 'buttonAccount'
    },
    // 退款单
    buttonRefund() {
      this.isTab = 'buttonRefund'
    },
    /* ====================================================体检费用清单 */
    physicalModalPrint () {
      this.checkUpCostList.show = false
    },
    /* ====================================================单位结算表格 */
    async unitSettlementClickRow(selection, row, index, column) {
      await this.getAcountaSingleTable()
      this.acountaSingleItemShow = this.acountaSingleItem
    },
    /* ====================================================单位收费 */
    showUnitChargeModal () {
      this.unitCharge.show = true
    },
    unitCommitData(data) {
      console.log(data)
      this.unitCharge.show = false
      // if (data.fyqd === 1) {
      //   console.log(1111)
      //   let a = document.getElementById('iframePrintFyqd')
      //   a.contentWindow.print()
      // } else {
      //   console.log(2222)
      // }
    },
    unitCancelData() {
      this.unitCharge.show = false
    },
    /* ==============================================================================结算单明细 */
    // 点击显示费用明细
    lookDetail (data) {
      // console.log('data', data)
      if (data === 0) { // 目前是按照index返回的data，这里0是第一行，体检费
        this.physicalExamination.show = true
        // this.additionalChargeDetail = false
      } else { // 附加费
        this.surcharge.show = true
        // this.additionalChargeDetail = true
      }
    },
    closeStatementDetail () { // 关闭结算单明细
      this.statementDetai.show = false
    },
    printChargeDetailFun() { // 打印费用明细
      this.statementDetai.show = false
    },
    /* ========================================================费用明细 */
    surchargeClose () { // 关闭附加费费用明细
      console.log(11111222222)
      this.surcharge.show = false
    },
    physicalExaminationClose () { // 体检费费用明细
      this.physicalExamination.show = false
    },
    /* ========================================================作废结算单 */
    showInvalidatedSet() {
      this.invalidatedSettlement.show = true
    },
    invalidatedSettlementCommit() {
      this.invalidatedSettlement.show = false
    },
    invalidatedSettlementCancel() {
      this.invalidatedSettlement.show = false
    },
    ...mapActions('teamPhysicalExaminationChargeModule', [
      'initTable', // 单位列表
      // 'getAcountaSingleTable',
    ]),
    ...mapActions(['subscribeScanGun', 'desubscribeScanGun']),
  },
  mounted () {
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
    this.acountaSingleItemShow = []
  },
}
</script>
<style lang='less'>
@import (reference) '~assets/less/variable.less';
.team-charge .unit-acount-table {
  .ivu-table-fixed-right {
    width: 103px !important;
  }
  .ivu-table-fixed-body table colgroup col {
    width: 103px !important;
  }
  .ivu-table-fixed-body .ivu-table-row-highlight-body-content {
    &>td {
      border-left: none!important;
      border-right: 2px solid @gradeBlueOne!important;
    }
  }
}
</style>

<style lang='less'>
@import (reference) '~assets/less/public.less';
.team-charge {
  // padding: 10px;
  height: 100%;
  .ivu-table-hidden > div {
    visibility: visible!important;
  }
  .titlet-has-slot {
    &>div {
      margin-right: 0;
    }
  }
  .team-charge-wrapper {
    height: 100%;
    overflow: hidden;
    .retrunM {
      display: inline;
    }
    .top {
      height: calc(~'100% - 255px');
      border: 1px solid @gradeAshFive;
      border-radius: @borderRadiuBig;
      overflow: hidden;
      .top-header {
        background: white;
      }
      .top-table {
        height: calc(~'100% - 50px');
        // background: lightpink;
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
          color: #008cee;
          border-bottom: 2px solid #008cee;
        }
        .clickTab {
        }
        .print {
          position: absolute;
          top: 10px;
          right: 20px;
        }
      }
      .bottom-table {
        height: 205px!important;
        // .ivu-table-fixed-body {
        //   height: 100%!important;
        //   line-height: 100%!important;
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
                bottom: 6px!important;
                // height: calc(~'100% - 6px')!important;
                .ivu-table-fixed-body {
                  height: calc(~'100% - 40px')!important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>