/** 
* @author wzd
* @date 2018/03/02
* @content 账户提现弹窗
*/ 
<template>
  <div class="accountWithdrawal">
    <Modal v-model="controlModal"
           :styles="{width: '433px'}"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <p name='alertHeader'
           class="alertHeader font14">
          <span class="alertHeaderText font16">账户提现</span>
        </p>
      </div>
      <div class="main">
        <Form ref="withdrawalForm"
              :model="withdrawalForm.data"
              :rules="withdrawalForm.rule"
              :label-width="48 + 10"
              class="withdrawal-form">
          <FormItem label="单位名称"
                    prop="unit"
                    class="withdrawal-form-row one">
            <Input type="text"
                   v-model.trim="withdrawalForm.data.unit"
                   disabled></Input>
          </FormItem>
          <FormItem label="账户编号"
                    prop="accountId"
                    class="withdrawal-form-row two">
            <Input type="text"
                   v-model.trim="withdrawalForm.data.accountId"
                   disabled></Input>
          </FormItem>
          <FormItem label="账户余额"
                    prop="accountBlance"
                    class="withdrawal-form-row three">
            <Input type="text"
                   v-model.trim="withdrawalForm.data.accountBlance"
                   disabled class="yuan"></Input>
          </FormItem>
          <FormItem label="提现金额"
                    prop="withdrawalAmount"
                    class="withdrawal-form-row three">
            <z-input type="number"
                   v-model.trim="withdrawalForm.data.withdrawalAmount" class="yuan"></z-input>
          </FormItem>
          <FormItem label="提现原因"
                    prop="reason"
                    class="withdrawal-form-row four">
            <Input type="textarea"
                   v-model.trim="withdrawalForm.data.withdrawalReason"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <div class="modelFooter">
          <Button type="primary"
                  @click="affirm">确认提现</Button>
          <Button type="ghost"
                  @click="cancel">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'accountWithdrawal',
  props: {
    controlModal: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      withdrawalForm: {
        data: {
          unit: '中国石油化工股份有限公司', // 单位名称
          accountId: 'GB7637473', // 账户编号
          accountBlance: '50000.00', // 账户余额
          withdrawalAmount: '', // 提现金额
          withdrawalReason: '', // 提现原因
        },
        rule: {},
      },
    }
  },
  methods: {
    affirm () {
      this.$emit('account-withdrawal-affirm', false)
    },
    cancel () {
      this.$emit('account-withdrawal-cancel', false)
    },
    initClear () {
      this.withdrawalForm.data.withdrawalAmount = ''
      this.withdrawalForm.data.withdrawalReason = ''
    },
  },
  watch: {
    formData: {
      handler (newData) {
        // newData
      },
      deep: true,
    },
    controlModal(val) {
      if (!val) {
        this.initClear()
      }
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.accountWithdrawal {
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
    .withdrawal-form {
      padding-top: @num20;
      font-size: 0;
      .withdrawal-form-row {
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
    .three {
      display: inline-block;
      .ivu-form-item-content {
        width: 118px;
        .ivu-input {
          padding-right: 25px;
        }
      }
    }
    .four {
      margin-bottom: 43px!important;
    }
  }
  .modelFooter {
    height: 50px;
    Button {
      width: 74px;
      height: 30px;
      margin-right: 20px;
      margin-bottom: 20px;
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
