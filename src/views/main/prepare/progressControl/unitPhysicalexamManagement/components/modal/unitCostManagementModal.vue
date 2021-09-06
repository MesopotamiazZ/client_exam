/** 
* @author wzd
* @date 2018/03/08
* @content 单位费用管理弹窗
*/ 
<template>
  <div class="unitCostManagementModal">
    <Modal v-model="controlModal"
           class="unitCostManagement-modal "
           :width='690'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <p name='alertHeader'
           class="alertHeader font14">
          <span class="alertHeaderText font16">单位费用管理</span>
        </p>
      </div>
      <div class="main">
        <Form ref="costManagementForm"
              :model="costManagementForm.data"
              :rules="costManagementForm.rule"
              :label-width="60 + 10"
              class="costManagement-form">
          <ul>
            <li class="first-row">
              <FormItem label="单位名称"
                        prop="unit"
                        class="costManagement-form-row">
                <Input type="text"
                       v-model.trim="costManagementForm.data.unit"
                       disabled></Input>
              </FormItem>
              <FormItem label="单位体检号"
                        prop="unitExamId"
                        class="costManagement-form-row">
                <Input type="text"
                       v-model.trim="costManagementForm.data.unitExamId"
                       disabled></Input>
              </FormItem>
            </li>
            <li class="second-row">
              <FormItem label="订单总金额"
                        prop="orderTotalCost"
                        class="costManagement-form-row">
                <Input type="text"
                       class="yuan"
                       v-model.trim="costManagementForm.data.orderTotalCost"
                       disabled></Input>
              </FormItem>
              <FormItem label="单位总金额"
                        prop="unitTotalCost"
                        class="costManagement-form-row">
                <Input type="text"
                       class="yuan"
                       v-model.trim="costManagementForm.data.unitTotalCost"
                       disabled></Input>
              </FormItem>
              <FormItem label="已收金额"
                        prop="receivedAmount"
                        class="costManagement-form-row">
                <Input type="text"
                       class="yuan"
                       v-model.trim="costManagementForm.data.receivedAmount"
                       disabled></Input>
              </FormItem>
            </li>
            <li class="third-row">
              <FormItem label="待收金额"
                        prop="awaitAmount"
                        class="costManagement-form-row">
                <Input type="text"
                       class="yuan"
                       v-model.trim="costManagementForm.data.awaitAmount"
                       disabled></Input>
              </FormItem>
              <FormItem label="折扣"
                        prop="disacount"
                        class="costManagement-form-row">
                <z-input type="number"
                       v-model.trim="costManagementForm.data.disacount"></z-input>
              </FormItem>
              <FormItem label="减免金额"
                        prop="creditAmount"
                        class="costManagement-form-row">
                <z-input type="number"
                       class="yuan"
                       v-model.trim="costManagementForm.data.creditAmount"></z-input>
              </FormItem>
            </li>
            <li class="four-row">
              <FormItem label="应收金额"
                        prop="amountReceivable"
                        class="costManagement-form-row">
                <Input type="text"
                       class="yuan"
                       v-model.trim="costManagementForm.data.amountReceivable"
                       disabled></Input>
              </FormItem>
            </li>
          </ul>
        </Form>
        <div class="tables-switch">
          <div class="tabs">
            <span :class="{selected: !isSelected}"
                  @click="switchTable1">体检费</span>
            <span :class="{selected: isSelected}"
                  @click="switchTable2">附加费</span>
            <div class="fr app-num">以预约人数计：共
              <b>20</b>人</div>
          </div>
          <div class="table-wrapper">
            <template v-if="!isSelected">
              <Table :columns="columns1"
                     :data="data1"
                     class="table"
                     :height='189'></Table>
            </template>
            <template v-else>
              <Table :columns="columns2"
                     :data="data2"
                     class="table"
                     :height='189'></Table>
            </template>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="modelFooter">
          <Button type="ghost"
                  @click="printProof">打印缴费凭条</Button>
          <Button type="ghost"
                  @click="printCostBreakdown">打印费用明细</Button>
          <Button type="primary"
                  @click="complete">完 成</Button>
          <Button type="ghost"
                  @click="cancel">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'unitCostManagementModal',
  props: {
    controlModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSelected: false, // 为false表示选择体检费
      costManagementForm: {
        data: {
          unit: '四川科华电子股份有限公司',
          unitExamId: '18001080011', // 单位体检号
          orderTotalCost: '1800.00', // 订单总金额
          unitTotalCost: '1800.00', // 单位总金额
          receivedAmount: '1800.00', // 已收金额
          awaitAmount: '0', // 代收金额
          disacount: null, // 折扣
          creditAmount: '', // 减免金额
          amountReceivable: '1800.00', // 应收金额
        },
        rule: {},
      },
      columns1: [
        {
          title: '体检号',
          key: 'examId',
          width: 100,
        },
        {
          title: '姓名',
          key: 'name',
          width: 100,
        },
        {
          title: '性别',
          key: 'sex',
          width: 44,
        },
        {
          title: '年龄',
          key: 'age',
          width: 44,
        },
        {
          title: '登记日期',
          key: 'registerTime',
          width: 85,
        },
        {
          title: '体检套餐',
          key: 'examCombo',
          width: 200,
        },
        {
          title: '体检套餐金额（元）',
          key: 'examComboAccount',
          width: 130,
        },
        {
          title: '待收金额（元）',
          key: 'awaitAmount',
          width: 100,
        },
        {
          title: '应收金额（元）',
          key: 'amountReceivable',
          width: 100,
        },
        {
          title: '单位支付比例',
          key: 'unitPayRatio',
          width: 85,
        },
        {
          title: '新增费用（元）',
          key: 'newCharges',
          width: 100,
        },
        {
          title: '新增费用支付方',
          key: 'newChargesPlayer',
          width: 100,
        },
      ],
      data1: [
        {
          examId: 18989000,
          name: '曲奇',
          sex: '男',
          age: 23,
          registerTime: '2018-01-09',
          examCombo: '科华电子员工体检',
          examComboAccount: '1900.00',
          awaitAmount: '800.00',
          amountReceivable: '200.00',
          unitPayRatio: '0.9',
          newCharges: '200.00',
          newChargesPlayer: '单位支付',
        },
      ],
      columns2: [
        {
          title: '费用类别',
          key: 'expenseCategory',
          width: 167,
        },
        {
          title: '附加费名称',
          key: 'surchargeName',
          width: 220,
        },
        {
          title: '待收金额（元）',
          key: 'awaitAmount',
          width: 130,
        },
        {
          title: '应收金额（元）',
          key: 'amountReceivable',
          // width: 130,
        },
      ],
      data2: [
        {
          expenseCategory: '耗材费',
          surchargeName: '附加费名称',
          awaitAmount: '200.00',
          amountReceivable: '200.00',
        },
        {
          expenseCategory: '耗材费',
          surchargeName: '附加费名称',
          awaitAmount: '200.00',
          amountReceivable: '200.00',
        },
        {
          expenseCategory: '耗材费',
          surchargeName: '附加费名称',
          awaitAmount: '200.00',
          amountReceivable: '200.00',
        },
        {
          expenseCategory: '耗材费',
          surchargeName: '附加费名称',
          awaitAmount: '200.00',
          amountReceivable: '200.00',
        },
      ],
    }
  },
  watch: {
    controlModal(val) {
      if (!val) {
        this.costManagementForm = {
          data: {
            unit: '四川科华电子股份有限公司',
            unitExamId: '18001080011', // 单位体检号
            orderTotalCost: '1800.00', // 订单总金额
            unitTotalCost: '1800.00', // 单位总金额
            receivedAmount: '1800.00', // 已收金额
            awaitAmount: '0', // 代收金额
            disacount: null, // 折扣
            creditAmount: null, // 减免金额
            amountReceivable: '1800.00', // 应收金额
          },
          rule: {},
        }
      }
    },
  },
  methods: {
    complete() {
      // 完成
      this.$emit('unit-cost-management-complete')
    },
    cancel() {
      // 取消
      this.$emit('unit-cost-management-cancel')
    },
    printProof() {
      // 打印凭条
    },
    printCostBreakdown() {
      // 打印费用明细
    },
    switchTable1() {
      this.isSelected = false
    },
    switchTable2() {
      this.isSelected = true
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.unitCostManagementModal {
  .alertHeader {
    background-color: #f2f5fa;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    color: @gradeAshOne;
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
      top: -0.7px;
    }
  }
  .main {
    font-size: 0;
    .costManagement-form {
      padding: @num20 @num20 0 @num20;
      font-size: 0;
      .costManagement-form-row {
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
          padding-right: @num20;
          padding-left: 0;
          display: inline-block;
          .ivu-form-item-content {
            width: 120px;
          }
        }
      }
      .first-row {
        .ivu-form-item:nth-of-type(1) {
          .ivu-form-item-content {
            width: 355px;
          }
        }
        .ivu-form-item:nth-of-type(2) {
          padding-right: 0;
          .ivu-form-item-content {
            width: 132px;
          }
        }
      }
      .second-row {
        .ivu-form-item {
          .ivu-form-item-content {
            width: 132px;
          }
        }
        .ivu-form-item:nth-of-type(3) {
          padding-right: 0;
        }
      }
      .third-row {
        .ivu-form-item {
          .ivu-form-item-content {
            width: 132px;
          }
        }
        .ivu-form-item:nth-of-type(3) {
          padding-right: 0;
        }
      }
      .four-row {
        .ivu-form-item {
          .ivu-form-item-content {
            width: 132px;
          }
        }
      }
    }
    .tables-switch {
      margin: 0 @num20;
      margin-bottom: @num20;
      .tabs {
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid #d9d9d9;
        margin-bottom: @num20;
        span {
          height: 100%;
          display: inline-block;
          font-size: 14px;
          color: #737373;
          box-sizing: border-box;
          margin-right: @num30;
          cursor: pointer;
        }
        .selected {
          color: #008cee;
          font-weight: 700;
          border-bottom: 3px solid #008cee;
        }
        .app-num {
          display: inline-block;
          color: #49a50e;
          font-size: @font12;
        }
      }
      .table-wrapper {
        border-radius: 4px;
        border: 1px solid #d9d9d9;
      }
    }
  }
  .modelFooter {
    height: 50px;
    Button {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
  .yuan {
    .ivu-input {
      padding-right: 25px;
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
}
</style>
