/** 
* @author wzd
* @date 2018/03/10
* @content 检前准备-个人收费-结算单明细弹窗
*/ 
<template>
  <div class="personalStatementDetailModal">
    <Modal v-model="controlModal"
           :styles="{width: '812px'}"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <p name='alertHeader'
           class="alertHeader font14">
          <span class="alertHeaderText font16">结算单明细</span>
        </p>
      </div>
      <div class="content-wrapper">
        <div class="detail-form-wrapper">
          <Form ref="detailForm"
                :model="detailForm.data"
                :rules="detailForm.rule"
                :label-width="48 + 10"
                class="detail-form">
            <ul>
              <li class="first-row">
                <FormItem label="个人结算单号"
                          prop="statementNo"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.statementNo"
                         disabled></Input>
                </FormItem>
                <FormItem label="体检号"
                          prop="examId"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.examId"
                         disabled></Input>
                </FormItem>
                <FormItem label="姓名"
                          prop="name"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.name"
                         disabled></Input>
                </FormItem>
                <FormItem label="性别"
                          prop="sex"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.sex"
                         disabled></Input>
                </FormItem>
              </li>
              <li class="second-row">
                <FormItem label="登记日期"
                          prop="registerTime"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.registerTime"
                         disabled></Input>
                </FormItem>
              </li>
              <li class="third-row">
                <FormItem label="待收金额"
                          prop="awaitAmount"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.awaitAmount"
                         disabled></Input>
                </FormItem>
                <!-- <FormItem label="折扣"
                          prop="discount"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.discount"
                         disabled></Input>
                </FormItem> -->
                <!-- <FormItem label="减免金额"
                          prop="creditAmount"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.creditAmount"
                         disabled></Input>
                </FormItem> -->
                <FormItem label="实收金额"
                          prop="actualAmount"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.actualAmount"
                         disabled></Input>
                </FormItem>
                <FormItem label="实收比例"
                          prop="trueDiscount"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.trueDiscount"
                         disabled></Input>
                </FormItem>
                <FormItem label="实收优惠"
                          prop="actualDiscount"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.actualDiscount"
                         disabled></Input>
                </FormItem>
              </li>
              <!-- <li class="four-row">
                <FormItem label="实收比例"
                          prop="trueDiscount"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.trueDiscount"
                         disabled></Input>
                </FormItem>
                <FormItem label="实收优惠"
                          prop="actualDiscount"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.actualDiscount"
                         disabled></Input>
                </FormItem>
              </li> -->
              <li class="five-row">
                <FormItem label="支付方式"
                          prop="paymentStyle"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.paymentStyle"
                         disabled></Input>
                </FormItem>
                <FormItem label="结算账户"
                          prop="settlementAccount"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.settlementAccount"
                         disabled></Input>
                </FormItem>
                <FormItem label="账户余额"
                          prop="accountBalance"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.accountBalance"
                         disabled></Input>
                </FormItem>
              </li>
              <li class="six-row">
                <FormItem label="备注"
                          prop="remark"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.remark"
                         disabled></Input>
                </FormItem>
              </li>
              <li class="detail-form-title">发票信息</li>
              <li class="seven">
                <FormItem label="发票单位"
                          prop="invoiceUnit"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.invoiceUnit"
                         disabled></Input>
                </FormItem>
              </li>
              <li class="eight">
                <FormItem label="纳税人识别号"
                          prop="taxpayerId"
                          class="detail-form-row">
                  <Input type="text"
                         v-model.trim="detailForm.data.taxpayerId"
                         disabled></Input>
                </FormItem>
              </li>
            </ul>
          </Form>
        </div>
        <div class="detail-table">
          <div class="detail-table-title marginL20">费用信息
            <span class="marginR20 fr">以预计人数计：共20人</span>
          </div>
          <Table width="766"
                 border
                 :columns="columns"
                 :data="data"
                 stripe></Table>
        </div>
        <div class="detail-charge">
          <span>待收金额合计：
            <span class="pay">3200.00</span> 元</span>
          <span>应收金额合计：
            <span class="pay">3200.00</span> 元</span>
        </div>
        <div class="statementManAndTime">
          <span>结算人：王思佳</span>
          <span>结算时间：2017-12-12 12:00</span>
        </div>
      </div>
      <div slot="footer">
        <div class="modelFooter">
          <Button type="primary"
                  @click="print">打印费用明细</Button>
          <Button type="ghost"
                  @click="cancel">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'personalStatementDetailModal',
  props: {
    controlModal: {
      // 控制Modal显示与关闭
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
    },
    statementDetailForm: {
      // 表单数据/表格数据
      type: Object,
    },
  },
  data() {
    return {
      detailForm: {
        data: {
          statementNo: 'BA20170908008', // 结算单号
          examId: 'BA20170908008', // 体检号
          name: '王树彤', // 姓名
          sex: '女', // 性别
          registerTime: '2017-12-12', // 登记日期
          statementTime: '2017-12-12 12:00', // 结算时间
          unitTotalAmount: '8888.00', // 单位总金额
          awaitAmount: '8000.00', // 待收金额
          receivableAmount: '20000', // 应收金额
          discount: '', // 折扣
          creditAmount: '', // 减免金额
          discountAmount: '1000', // 优惠金额
          actualAmount: '20000', // 实收金额
          trueDiscount: '70%', // 实收比例
          actualDiscount: '1000', // 实收优惠
          paymentStyle: '支付宝', // 支付方式
          settlementAccount: '阿里巴巴集团', // 结算账户
          accountBalance: '50000',
          remark: '', // 备注
          invoiceUnit: '阿里巴巴集团', // 发票单位
          taxpayerId: '125000005699091207', // 纳税人识别号
        },
        rule: {},
      },
      columns: [
        {
          title: '费用类型',
          key: 'chargeType',
          width: 178,
        },
        {
          title: '待收金额（元）',
          key: 'awaitAmount',
        },
        {
          title: '实收金额（元）',
          key: 'actualAmount',
        },
        {
          title: '操作',
          key: 'operator',
          fixed: 'right',
          width: 78,
          render: (h, params) => {
            let self = this
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small',
                  },
                  style: {
                    color: '#008CEE',
                  },
                  on: {
                    // 以后要改成params.row.data
                    click() {
                      self.lookDetail(1)
                    },
                    // self.lookDetail(1),
                  },
                },
                '查看明细',
              ),
            ])
          },
        },
      ],
      data: [
        {
          chargeType: '体检费',
          awaitAmount: '3000.00',
          actualAmount: '3000.00',
        },
        {
          chargeType: '附加费',
          awaitAmount: '200.00',
          actualAmount: '200.00',
        },
      ],
    }
  },
  methods: {
    print() {
      // 打印费用清单Button
      this.$emit('printChargeDetail')
    },
    cancel() {
      // 取消Button
      this.$emit('close-statement-detail', false)
    },
    lookDetail (data) {
      console.log('ckmx', data)
      this.$emit('look-detail', data)
    },
  },
  watch: {
    statementDetailForm: {
      handler(newData) {
        this.modalForm.data = newData
      },
      deep: true,
    },
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.personalStatementDetailModal {
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
      // padding-top: @num20;
      font-size: 0;
      .detail-form-row {
        padding: 0 @num20;
        height: 30px;
        & > .ivu-form-item-label {
          padding: @num10 @num10 0 0;
          text-align: justify;
          &::after {
            content: '';
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
    ul {
      .first-row {
        .detail-form-row {
          padding-left: 0;
          display: inline-block;
        }
        .detail-form-row:nth-of-type(1) {
          padding-right: 20px;
          .ivu-form-item-content {
            width: 118px;
            margin-left: 84px!important;
          }
          .ivu-form-item-label {
            width: 84px!important;
          }
        }
        .detail-form-row:nth-of-type(2) {
          padding-right: 20px;
          .ivu-form-item-content {
            width: 118px;
          }
        }
        .detail-form-row:nth-of-type(3) {
          padding-right: 0;
          padding-right: @num20;
          .ivu-form-item-content {
            width: 118px;
          }
        }
        .detail-form-row:nth-of-type(4) {
          padding-right: 0;
          .ivu-form-item-content {
            width: 94px;
          }
        }
      }
      .second-row {
        .detail-form-row {
          padding-left: 0;
          display: inline-block;
        }
        .detail-form-row:nth-of-type(1) {
          padding-right: 20px;
          .ivu-form-item-content {
            width: 120px;
            margin-left: 84px!important;
          }
          .ivu-form-item-label {
            width: 84px!important;
          }
        }
      }
      .third-row {
        .detail-form-row {
          padding-left: 0;
          display: inline-block;
        }
        .detail-form-row:nth-of-type(1) {
          padding-right: 20px;
          .ivu-form-item-content {
            width: 118px;
            margin-left: 84px!important;
          }
          .ivu-form-item-label {
            width: 84px!important;
          }
        }
        .detail-form-row:nth-of-type(2) {
          padding-right: 20px;
          .ivu-form-item-content {
            width: 118px;
          }
        }
        .detail-form-row:nth-of-type(3) {
          padding-right: 0;
          padding-right: @num20;
          .ivu-form-item-content {
            width: 118px;
          }
        }
        .detail-form-row:nth-of-type(4) {
          padding-right: 0;
          .ivu-form-item-content {
            width: 94px;
          }
        }
      }
      .four-row {
        .detail-form-row {
          padding-left: 0;
          display: inline-block;
        }
        .detail-form-row:nth-of-type(1) {
          padding-right: 20px;
          .ivu-form-item-content {
            width: 118px;
            margin-left: 84px!important;
          }
          .ivu-form-item-label {
            width: 84px!important;
          }
        }
        .detail-form-row:nth-of-type(2) {
          padding-left: 0;
          padding-right: 20px;
          .ivu-form-item-content {
            width: 118px!important;
          }
        }
      }
      .five-row {
        .detail-form-row {
          padding-left: 0;
          display: inline-block;
        }
        .detail-form-row:nth-of-type(1) {
          padding-right: 20px;
          .ivu-form-item-content {
            width: 118px;
            margin-left: 84px!important;
          }
          .ivu-form-item-label {
            width: 84px!important;
          }
        }
        .detail-form-row:nth-of-type(2) {
          padding-right: 20px;
          .ivu-form-item-content {
            width: 118px;
          }
        }
        .detail-form-row:nth-of-type(3) {
          padding-right: 0;
          padding-right: @num20;
          .ivu-form-item-content {
            width: 118px;
          }
        }
      }
      .six-row {
        .detail-form-row {
          padding: 0;
          .ivu-form-item-label {
            width: 84px!important;
          }
          .ivu-form-item-content {
            margin-left: 84px!important;
          }
        }
      }
      .detail-form-title {
        font-size: @font12;
        color: #4a4a4a;
        font-weight: 700;
        // padding: 0 @num20;
        margin-bottom: @num20;
      }
      .seven {
        .detail-form-row {
          display: inline-block;
          padding: 0;
          .ivu-form-item-content {
            width: 456px;
            margin-left: 84px!important;
          }
          .ivu-form-item-label {
            width: 84px!important;
          }
        }
      }
      .eight {
        .detail-form-row {
          display: inline-block;
          padding: 0;
          .ivu-form-item-content {
            width: 456px;
            margin-left: 84px!important;
          }
          .ivu-form-item-label {
            width: 84px!important;
          }
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
        color: #49a50e;
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
    & > span {
      font-size: 12px;
      color: @gradeAshThree;
      margin-right: @num30;
      .pay {
        font-weight: 700;
        color: @tsIcon;
        font-size: 18px;
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
      margin-right: @num20;
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
    top: 7px;
    right: 10px;
  }
  .percent::after {
    content: '%';
    position: absolute;
    display: inline-block;
    color: @gradeAshThree;
    font-size: 12px;
    top: 7px;
    right: 10px;
  }
}
</style>
