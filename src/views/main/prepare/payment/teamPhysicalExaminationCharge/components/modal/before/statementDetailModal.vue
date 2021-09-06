/** 
* @author wzd
* @date 2018/02/23
* @content 检前准备-单位收费-结算单明细弹窗
*/ 
<template>
  <div class="statementDetailModal">
    <Modal v-model="controlModal" :styles="{width: '578px'}"
      :transition-names='[]'
      :mask-closable="false"
      :transfer='false'
      :closable="false">
      <div slot="header">
         <p name='alertHeader' class="alertHeader font14">
          <span class="alertHeaderText font16">结算单明细</span>
        </p>
      </div>
      <div class="content-wrapper">
        <div class="detail-form">
          <div class="firstRow oneRow">
            <span class="oneCol">单位结算单号</span>
            <Input type="text" v-model="detailForm.unitStatementNo" disabled></Input>
            <span>单位体检号</span>
            <Input type="text" v-model="detailForm.unitExamId" disabled></Input>
          </div>
          <div class="secondRow oneRow">
            <span class="oneCol">单位名称</span>
            <Input type="text" v-model="detailForm.unit" disabled></Input>
            <span>结算时间</span>
            <Input type="text" v-model="detailForm.statementTime" disabled></Input>
          </div>
          <div class="thridRow oneRow">
            <span class="oneCol">应收金额</span>
            <Input type="text" v-model="detailForm.receivableAmount" disabled class="yuan"></Input>
            <span>收银折扣</span>
            <Input type="text" v-model="detailForm.cashierDiscount" disabled class="percent"></Input>
            <span>优惠金额</span>
            <Input type="text" v-model="detailForm.discountAmount" disabled class="yuan"></Input>
          </div>
          <div class="fourRow oneRow">
            <span class="oneCol">实收金额</span>
            <Input type="text" v-model="detailForm.actualAmount" disabled class="yuan"></Input>
            <span>实收比例</span>
            <Input type="text" v-model="detailForm.trueDiscount" disabled class="percent"></Input>
            <span>实收优惠</span>
            <Input type="text" v-model="detailForm.actualDiscount" disabled class="yuan"></Input>
          </div>
          <div class="fiveRow oneRow">
            <span class="oneCol">支付方式</span>
            <Input type="text" v-model="detailForm.paymentStyle" disabled></Input>
            <span>结算账户</span>
            <Input type="text" v-model="detailForm.statementAccount" disabled></Input>
          </div>
          <div class="sixRow oneRow">
            <span class="oneCol">备注</span>
            <Input type="textarea" v-model="detailForm.remark":rows="2" disabled></Input>
          </div>
          <div class="sevenRow oneRow">
            <span class="oneCol">发票单位</span>
            <Input type="text" v-model="detailForm.invoiceUnit" disabled></Input>
          </div>
          <div class="eightRow oneRow">
            <span class="oneCol">纳税人识别号</span>
            <Input type="text" v-model="detailForm.taxpayerId" disabled></Input>
          </div>
        </div>
        <div class="detail-table">
          <div class="detail-table-title marginL20">体检费用<span class="marginL10">（以预计人数计：共20人）</span></div>
          <table 
            stripe
            height='160'>
          </table>
          <p>公司附加费：早餐费 <span>20.00</span> 元、静脉采血费 <span>20.00</span> 元、接送费 <span>50.00</span> 元</p>
        </div>
        <div class="detail-charge">
          <span>公司附加费合计：<span class="pay">100.00</span> 元</span>
          <span>体检费用合计：<span class="pay">100.00</span> 元</span>
          <span>总费用：<span class="all-pay">100.00</span> 元</span>
        </div>
        <div class="statementManAndTime">
          <span>结算人：王思佳</span>
          <span>结算时间：2017-12-12 12:00</span>
        </div>
      </div>
      <div slot="footer">
        <div class="modelFooter">
          <Button type="primary" @click="print">打印费用清单</Button>
          <Button type="ghost" @click="cancel">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'statementDetailModal',
    props: {
      controlModal: { // 控制Modal显示与关闭
        type: Boolean,
        default: false,
      },
      statementDetailForm: { // 表单数据/表格数据
        type: Object,
      },
    },
    data () {
      return {
        detailForm: {
          unitStatementNo: 'BA20170908008', // 单位结算单号
          unitExamId: 'BA20170908008', // 单位体检号
          unit: '中国石油化工有限公司', // 单位名称
          statementTime: '2017-12-12 12:00', // 结算时间
          receivableAmount: '20000', // 应收金额
          cashierDiscount: '', // 收银折扣
          discountAmount: '1000', // 优惠金额
          actualAmount: '20000', // 实收金额
          trueDiscount: '', // 实际比例
          actualDiscount: '1000', // 实收优惠
          paymentStyle: '', // 支付方式
          statementAccount: '', // 结算账户
          remark: '', // 备注
          invoiceUnit: '', // 发票单位
          taxpayerId: '', // 纳税人识别号
        },
      }
    },
    methods: {
      print () {
        // 打印费用清单Button
      },
      cancel () {
        // 取消Button
        this.$emit('close-statement-detail', false)
      },
    },
    watch: {
      statementDetailForm: {
        handler (newData) {
          this.modalForm.data = newData
        },
        deep: true,
      },
    },
  }
</script>
<style lang="less">
@import '~assets/less/variable.less';
.statementDetailModal {
  .alertHeader {
    background-color: @alertHeadBg;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    font-weight: normal;
    .alertHeaderText::before {
      content: '';
      width: 3px;
      height: 17px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      background-color: @gradeBlueOne;
      position: relative;
    }
  }
  // content-wrapper
  .content-wrapper {
    padding: @num20;
    height: 500px;
    overflow-y: scroll;
    font-size: 0;
    .detail-form {
      .oneRow {
        margin-bottom: @num20;
        height: 30px;
        span {
          font-size: @font12;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          color: @gradeAshThree;
          margin-left: @num10;
          margin-right: @num10;
        }
        .oneCol {
          margin-left: 0;
        }
        .ivu-input-wrapper {
          width: 100px;
          font-size: @font12;
          display: inline-block;
          vertical-align: top;
        }
      }
      .firstRow {
        span {
          letter-spacing: 0;
        }
        .ivu-input-wrapper:nth-of-type(1) {
          width: 248px;
        }
        .ivu-input-wrapper:nth-of-type(2) {
          width: 122px;
        }
      }
      .secondRow {
        span:nth-of-type(1) {
          letter-spacing: 8.2px;
          margin-right: 1px;
        }
        span:nth-of-type(2) {
          letter-spacing: 4.3px;
          margin-right: 4px;
        }
        .ivu-input-wrapper:nth-of-type(1) {
          width: 248px;
        }
        .ivu-input-wrapper:nth-of-type(2) {
          width: 122px;
        }
      }
      .thridRow {
        position: relative;
        span {
          letter-spacing: 0;
        }
        .ivu-input-wrapper {
          width: 112px;
        }
        .ivu-input-wrapper:nth-of-type(1) > .ivu-input {
          font-weight: 900;
        }
        .ivu-input-wrapper:nth-of-type(3) > .ivu-input {
          font-weight: 900;
        }
      }
      .fourRow {
        span {
          letter-spacing: 0;
        }
        .ivu-input-wrapper {
          width: 112px;
        }
        .ivu-input-wrapper:nth-of-type(1) > .ivu-input {
          font-weight: 900;
        }
        .ivu-input-wrapper:nth-of-type(3) > .ivu-input {
          font-weight: 900;
        }
      }
      .fiveRow {
        span {
          letter-spacing: 0;
        }
        .ivu-input-wrapper:nth-of-type(1) {
          width: 112px;
        }
        .ivu-input-wrapper:nth-of-type(2) {
          width: 293px;
        }
      }
      .sixRow {
        height: 60px!important;
        span {
          letter-spacing: 23.4px;
          margin-right: -12px!important;
        }
        .ivu-input-wrapper {
          width: 472px!important;
        }
      }
      .sevenRow {
        span {
          letter-spacing: 7.8px;
          margin-right: 2px!important;
        }
        .ivu-input-wrapper {
          width: 447px!important;
        }
      }
      .eightRow {
        span {
          letter-spacing: 0;
        }
        .ivu-input-wrapper {
          width: 447px!important;
        }
      }
    }
  }
  .detail-table {
    border: 1px solid @gradeAshFive;
    border-radius: @borderRadiuBig;
    margin-bottom: @num20;
    .detail-table-title {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color: @gradeAshOne;
      letter-spacing: 0.04px;
      span {
        color: #49A50E;
        font-size: 12px;
        letter-spacing: 0.03px;
      }
    }
    p {
      height: 50px;
      line-height: 50px;
      margin-left: @num20;
      font-size: 12px;
      color: @gradeAshThree;
      span {
        font-weight: bold;
        color: @gradeAshOne;
      }
    }
  }
  .detail-charge {
    margin-bottom: @num20;
    &>span {
      font-size: 12px;
      color: @gradeAshThree;
      margin-right: @num30;
      .pay {
        font-weight: bold;
        color: @gradeAshOne;
      }
      .all-pay {
        font-size: 16px;
        font-weight: bold;
        color: @tsIcon;
      }
    }
  }
  .statementManAndTime {
    color: @gradeAshThree;
    span:nth-of-type(1) {
      font-size: @font12;
    }
    span:nth-of-type(2) {
      margin-left: @num30;
      font-size: @font12;
    }
  }
  .modelFooter {
    height: 50px;
    font-size: 0;
    Button {
      width: 74px;
      height: 30px;
      margin-right: @num20;;
      margin-bottom: @num20;
    }
    Button:nth-child(1) {
      width: 96px;
    }
  }
  .yuan::after {
    content: '元';
    position: absolute;
    display: inline-block;
    color: @gradeAshThree;
    font-size: 12px;
    top:7px;
    right:10px;
  }
  .percent::after {
    content: '%';
    position: absolute;
    display: inline-block;
    color: @gradeAshThree;
    font-size: 12px;
    top:7px;
    right:10px;
  }
}
</style>
