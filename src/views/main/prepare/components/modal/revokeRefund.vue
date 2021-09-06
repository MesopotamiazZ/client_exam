/** 
* @author 覃凤
* @date 2018/2/27
* @content 预约管理-撤销退费
* listData：传入的数据
*/
<template>
  <div class="revoke-refund"
       v-if="ifShowModal">
    <Modal v-model="ifShowModal"
           :transition-names='[]'
           :styles='{width: 716+"px"}'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header :headerText="msg" :showInput='false'></alert-header>
      </div>
      <div class="apply-refund-body" style="outline: 1px solid red;">
        <ul class="apply-refund-body-ul">
          <li class="fl">
            <span class="fl textJustify marginR10">体检号</span>
            <div class="fl">
              <Input disabled v-model="showModalData.pe_sn"></Input>
            </div>
          </li>
          <li class="fl marginL50">
            <span class="fl textJustify marginR10">姓名</span>
            <div class="fl">
              <Input disabled v-model="showModalData.name"></Input>
            </div>
          </li>
          <li class="fl marginL50">
            <span class="fl textJustify marginR10">来源</span>
            <div class="fl">
              <Input disabled v-model="showModalData.order_source"></Input>
            </div>
          </li>
          <li class="fl">
            <span class="fl textJustify marginR10">总金额</span>
            <div class="fl">
              <Input disabled class="self-input-price" v-model="showModalData.total_amount"></Input>
            </div>
          </li>
          <li class="fl marginL50">
            <span class="fl textJustify marginR10">已收金额</span>
            <div class="fl">
              <Input disabled class="self-input-price" v-model="showModalData.received_amount"></Input>
            </div>
          </li>
          <!-- <li class="fl marginL50">
            <span class="fl textJustify marginR10">支付方式</span>
            <div class="fl">
              <Input disabled v-model="showModalData.newCostPayer"></Input>
            </div>
          </li>
          <li class="fl">
            <span class="fl textJustify marginR10">结算账户</span>
            <div class="fl">
              <Input disabled v-model="showModalData.name"></Input>
            </div>
          </li>
          <li class="fl marginL50">
            <span class="fl textJustify marginR10">账户余额</span>
            <div class="fl">
              <Input disabled class="self-input-price" v-model="showModalData.balance"></Input>
            </div>
          </li> -->
          <!-- <li class="fl marginL50">
            <span class="fl textJustify marginR10"></span>
            <div class="fl" style="line-height: 30px; vertical-align: middle;">
              <p v-if='!invoicing'>
                <icon class="fl" style="margin-top:8px;margin-right:3px;" name='enabledState'></icon>
                <span class="fl">已打发票</span>
              </p>
              <p v-if='invoicing'>
                <icon class="fl" style="margin-top:8px;margin-right:3px;" name='unUse'></icon>
                <span class="fl">未打发票</span>
              </p>
            </div>
          </li> -->
          <li class="fl">
            <span class="fl textJustify marginR10">退费原因</span>
            <div class="fl" style="width: 610px;">
              <Input v-model="showModalData.reason" disabled></Input>
            </div>
          </li>
          <li class="clearBoth" style="margin-bottom: 0;"></li>
        </ul>
        <div class="apply-refund-body-table">
          <self-tab :tab='tab' @tab-change='tabChange'>
            <span class="tab-right font12" slot='tabR'>({{ totalItem }}项)</span>
          </self-tab>
          <!-- 组合项目 -->
          <Table 
            v-show='showWitchTab===0'
            stripe
            ref="portfolioProject"
            :height='360' 
            :columns='columns'
            :data='showModalData.columnsData'
            @on-selection-change='selectChange'>
          </Table>
          <!-- 附加费 -->
          <Table
            v-show='showWitchTab===1'
            stripe
            ref="surchargeTable"
            :height='360' 
            :columns='surchargeColumns'
            :data='showModalData.surchargeData'
            @on-selection-change='surchargeSelectChange'>
          </Table>
        </div>
        <ul class="apply-refund-body-ul">
          <li class="fl marginT20">
            <span class="fl textJustify marginR10" style="width: 72px;">已选退费金额</span>
            <div class="fl" style="width: 100px;">
              <Input class="self-input-price" v-model='payMoney' disabled></Input>
            </div>
          </li>
          <li class="fl marginT20 marginL20">
            <span class="fl textJustify marginR10">退费比例</span>
            <div class="fl" style="width: 100px;">
              <z-input v-model='showModalData.proportion' disabled></z-input>
            </div>
          </li>
          <li class="fl marginT20 marginL20">
            <span class="fl textJustify marginR10" style="width: 60px;">退费手续费</span>
            <div class="fl" style="width: 100px;">
              <z-input class="self-input-price" disabled v-model='showModalData.refundFee'></z-input>
            </div>
          </li>
          <li class="clearBoth" style="height:0;margin-bottom:0;"></li>
        </ul>
        <p class="actual-refund">应退金额：<span>{{ actualPayMoney }}</span>元（应退比例：{{ actualRefundRatio }}）</p>
      </div>
      <div slot='footer'>
        <div class="apply-refund-footer paddingB20 paddingT20">
          <z-button ZBtype='ghost'
                    class="fr marginR20"
                    @click="cancel">取 消</z-button>
          <z-button ZBtype='primary'
                    class="fr marginR20"
                    @click='commit'>确认撤销</z-button>
          <Checkbox class="fr marginR20"
                    style="line-height: 30px;"
                    v-model="showModalData.fyqd"
                    :true-value=1
                    :false-value=0>打印退费申请单</Checkbox>
          <div class="clearBoth"></div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as _ from 'lodash'
import helper from '@/utils/helper'
export default {
  name: 'apply-refund',
  props: {
    ifShowModal: {
      type: Boolean,
      default: false,
    },
    modalData: {
      type: Object,
      default: () => {
        return {
          pe_sn: 170915003, // 体检号
          name: '王树里', // 姓名
          order_source: '个人', // 来源
          total_amount: 656.00, // 总金额
          received_amount: 600.00, // 已收金额
          new_cost_payer: 1, // 支付方式
          reason: '', // 退费原因
          balance: 10.00, // 账户余额
          chooseData: [], // 选中需要退费的项目
          surchargeChooseData: [], // 选中附加费项目
          fyqd: 1,
          proportion: null, // 退费比例
          refundFee: null, // 退费手续费
          columnsData: [ // 组合项目数据
            {
              // status: 0,
              // showStatus: '未收费',
              proName: '血常规',
              receivable_amount: 10.00,
              actual_pay_amount: 2.00,
              aleadyChecked: 0,
              discardCheck: 0,
              overtime: 1,
              // _disabled: true, // 多选按钮能否点击
            }, {
              // status: 1,
              // showStatus: '已收费',
              proName: '血常规',
              receivable_amount: 10.00,
              actual_pay_amount: 10.00,
              aleadyChecked: 1,
              discardCheck: 1,
              overtime: 0,
            },
          ],
          surchargeData: [ // 附加费数据
            {
              showStatus: '已收费',
              costType: '检查费',
              surchargeName: '早餐费',
              receivable_amount: 10.00,
              actual_pay_amount: 12.00,
            },
          ],
        }
      },
    },
  },
  watch: {
    modalData(val) {
      this.initShowData()
    },
    payMoney (val) {
      if (val === null) {
        this.showModalData.proportion = null
        this.showModalData.refundFee = null
      }
    },
  },
  computed: {
    actualPayMoney () { // 实际退费金额
      let proportion = this.showModalData.proportion

      let data = null
      let money = null
      if (proportion === null || proportion === '' || proportion === undefined || proportion === '0') {
        proportion = 1
      } else if (proportion === '1') {
        proportion = 0
      } else {
        proportion = parseFloat(proportion)
      }
      if (proportion !== null || proportion !== 0) {
        data = this.payMoney * proportion - this.showModalData.refundFee
        if (this.payMoney === null) {
          money = 0
        } else {
          money = data / (this.payMoney * 1)
        }
        this.actualRefundRatio = helper.retainedDecimal(money)
        return helper.retainedDecimal(data)
      } else {
        data = this.payMoney - this.showModalData.refundFee
        return data
      }
    },
  },
  data() {
    return {
      msg: '撤销退费',
      paymentMethodPer: 1, // 支付方式-个人
      paymentMethodUnit: 2, // 支付方式-单位
      invoicing: false, // 是否打印发票（显示）
      showModalData: {},
      payMoney: null, // 页面中显示的已选退费金额
      actualRefundRatio: 1, // 实际退费比例
      totalItem: 0,
      statusIcon: '/static/icons/public/enabledState.svg',
      // unUseIcon: '/static/icons/public/unUse.svg', // 未启用图标
      tab: [
        {
          title: '组合项目',
        }, {
          title: '附加费',
        },
      ],
      showWitchTab: 0,
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
        },
        // {
        //   title: '状态',
        //   key: 'showStatus',
        //   width: 80,
        //   ellipsis: true,
        // },
        {
          title: '项目名称',
          key: 'proName',
          width: 218,
          ellipsis: true,
        }, {
          title: '待收金额',
          key: 'receivable_amount',
          width: 110,
          ellipsis: true,
        }, {
          title: '实收金额',
          key: 'actual_pay_amount',
          width: 110,
          ellipsis: true,
        }, {
          title: '已检查',
          key: 'aleadyChecked',
          width: 60,
          ellipsis: true,
          render: (h, params) => {
            if (params.row.aleadyChecked === 1) { // 已检查
              return h('div', {
                style: {
                  background: 'url(' + this.statusIcon + ') no-repeat',
                  'width': '16px',
                  'height': '16px',
                  'margin': '0 auto',
                },
              })
            }
          },
        }, {
          title: '弃检',
          key: 'discardCheck',
          width: 60,
          ellipsis: true,
          render: (h, params) => {
            if (params.row.discardCheck === 1) { // 弃检
              return h('div', {
                'class': 'show-dot',
              })
            }
          },
        }, {
          title: '超时',
          key: 'overtime',
          width: 60,
          ellipsis: true,
          render: (h, params) => {
            if (params.row.overtime === 1) { // 超时
              return h('div', {
                'class': 'show-dot',
              })
            }
          },
        },
      ],
      surchargeColumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
        },
        // {
        //   title: '状态',
        //   key: 'showStatus',
        //   width: 80,
        //   ellipsis: true,
        // },
        {
          title: '费用类别',
          key: 'costType',
          width: 139,
          ellipsis: true,
        }, {
          title: '附加费名称',
          key: 'surchargeName',
          width: 230,
          ellipsis: true,
        }, {
          title: '待收金额',
          key: 'receivable_amount',
          width: 113,
          ellipsis: true,
        }, {
          title: '实收金额',
          key: 'actual_pay_amount',
          ellipsis: true,
        },
      ],
    }
  },
  methods: {
    initShowData (val) { // 处理弹窗显示的数据
      this.showModalData = _.clone(val)
      if (val.new_cost_payer === this.paymentMethodPer) {
        this.showModalData.newCostPayer = '个人'
      } else if (val.new_cost_payer === this.paymentMethodUnit) {
        this.showModalData.newCostPayer = '单位'
      }
    },
    selectChange (data) { // 组合项目
      this.showModalData.chooseData = data
      this.initChooseData()
    },
    surchargeSelectChange (data) { // 附加费
      this.showModalData.surchargeChooseData = data
      this.initChooseData()
    },
    initChooseData () {
      let data = this.showModalData.surchargeChooseData.concat(this.showModalData.chooseData)
      this.initShowMoney(data)
    },
    initShowMoney (data) { // 页面显示的已选退费金额
      this.payMoney = null
      data.forEach((val) => {
        this.payMoney += val.actual_pay_amount
      })
    },
    tabChange (data, index) {
      this.showWitchTab = index
      if (index === 0) {
        this.totalItem = this.showModalData.columnsData.length
      } else if (index === 1) {
        this.totalItem = this.showModalData.surchargeData.length
      }
    },
    commit() {
      console.log(this.showModalData)
      this.$emit('commit-data', this.showModalData)
      this.initClear()
    },
    cancel() {
      this.$emit('cancel-data')
      this.initClear()
    },
    initClear () {
      this.showModalData.reason = ''
      this.payMoney = null
      this.showModalData.proportion = null // 退费比例
      this.showModalData.refundFee = null // 退费手续费
      this.showWitchTab = 0
      // this.showModalData.surchargeData = []
      // this.showModalData.columnsData = []
    },
  },
  mounted() {
    this.initShowData(this.modalData)
    this.totalItem = this.showModalData.columnsData.length
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.revoke-refund {
  .ivu-modal {
    height: calc(~'100% - 30px');
    // padding: @num20;
    max-height: 741px;
    .show-dot {
      width: @num10;
      height: @num10;
      background-color: #F5A623;
      border-radius: @num10;
      margin: 0 auto;
    }
    .ivu-modal-content {
      width: 100%;
      height: 100%;
      .ivu-modal-body {
        width: 100%;
        height: calc(~'100% - 120px');
        overflow: auto;
        .apply-refund-body {
          width: 100%;
          height: 100%;
          overflow: auto;
          .ivu-checkbox-wrapper {
            margin-right: 0;
          }
        }
      }
    }
    .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
    .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
      background-color: @tableTr;
    }
  }
  .apply-refund-body {
    padding: @num20 @num20 0 @num20;
    .tab-right {
      font-size: 12px;
      line-height: 50px;
      letter-spacing: 0.03px;
      color: @gradeAshTwo;
    }
    .apply-refund-body-ul {
      & > li {
        margin-bottom: @num20;
        &>span {
          width: 48px;
          line-height: @num30;
          height: @num30;
          overflow: hidden;
        }
        &>div {
          width: 120px;
        }
      }
      .marginL50 {
        margin-left: 50px;
      }
      .last-li {
        margin-bottom: 0;
      }
      // . {
      //   line-height: 30px;
      //   vertical-align: middle;
      // }
    }
    .apply-refund-body-table {
      height: 401px;
      width: 100%;
      border: 1px solid @gradeAshFive;
      border-radius: @borderRadiuBig;
      overflow: hidden;
    }
  }
  .actual-refund {
    font-size: 12px;
    line-height: @num30;
    color: @gradeAshThree;
    & > span {
      margin-left: 3px;
      margin-right: 3px;
      color: @tsIcon;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
