<!--
*单位管理-员工列表-备单（健康体检备单）-批量设置
*@author 刘佳莉
*@date 2018/03/05
-->
<template>
  <div class="healthy-set"
       v-if="healthySetModal">
    <Modal v-model="healthySetModal"  class="model-void"
           :styles="{width: '451px'}"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <div slot="header">
          <div name='alertHeader'
               class="header-phone font14">
            <span class="alert-header-text font16 fl">批量设置</span>
          </div>
        </div>
      </div>
      <div class="content">
        <Form ref='editData'
              :model="editData"
              :rules="editRule">
          <div class="left-name">个人支付比例</div>
          <FormItem style="display:inline-block" prop="personPay">
            <Input v-model.trim="editData.personPay"
                   class="right-input"
                   :class='{inputVerificationTs: isEmpty(editData.personPay)}'
                   style="width: 317px;" />
          </FormItem>
          <div class="left-name">新增费用支付方</div>
          <FormItem style="display:inline-block" prop='payer'>
            <Select :class="{selectVerificationTs: isEmpty(editData.payer)}" 
              v-model.trim="editData.payer" 
              class="right-input"
              style="width: 317px;"
              filterable placeholder="">
              <Option v-for="item in newPayer" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer"
           style="font-size: 0;"
           class="paddingB20 paddingR20">
        <div class="sign-img fl"></div>
        <z-button ZBtype='primary'
                  style="margin-right:20px;"
                  @click="send">确 认</z-button>
        <z-button @click="cancel" ZBtype='ghost'>取 消</z-button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'healthy-set',
  data() {
    return {
      newPayer: [
        {value: 0, label: '单位'},
        {value: 1, label: '个人'},
      ],
      hoverIcon: false,
      time: 60,
      clickSend: true,
      editData: {
        personPay: '',
        payer: null,
      },
      editRule: {
        // 编辑验证规则
        personPay: [
          // 个人支付比例
          {
            required: true,
            message: '个人支付比例不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
        payer: [
          // 新增费用支付
          {
            required: true,
            message: '新增费用支付方不能为空',
            type: 'number',
            trigger: 'change',
          },
        ],
      },
    }
  },
  props: {
    healthySetModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    isEmpty(data) {
      if (data === '' || data === null) {
        return true
      } else {
        return false
      }
    },
    send() {
      this.$refs.editData.validate((valid) => {
        if (valid) {
          this.$emit('send')
          this.editData = {
            personPay: '',
            payer: null,
          }
        }
      })
    },
    cancel() {
      this.$emit('cancel')
      this.editData = {
        personPay: '',
        payer: null,
      }
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.healthy-set {
  width:100%;
  height:100%;
  .ivu-modal-mask {
    background-color: transparent!important;
  }
  .ivu-modal-content {
    border-radius: @borderRadiuBig;
    background-color: #FFFFFF;
    box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
  }
  .content {
    padding: 20px 20px 0 20px;
    color: @gradeAshThree;
    .has-year{
      .ivu-form-item-error-tip{
        left:-19px;
      }
      .ivu-input{
        padding:10px 22px 10px 10px;
      }
      .value-price {
        position: relative;
        &::before {
          position: absolute;
          content: '年';
          z-index: 999;
          display: inline-block;
          top: 7px;
          right: 10px;
          font-size: 12px;
          color: @gradeAshThree;
        }
      }
      .inputVerificationTs::after{
        right:25px;
      }
    }
    .jh-time{
      .ivu-form-item-error-tip{
        left:-31px;
      }
    }
    .left-name {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin-right: 6px;
      display: inline-block;
      text-align: justify;
      width: 84px;
      color: @gradeAshThree;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .right-input {
      display: inline-block;
      vertical-align: top;
    }
    .have-remark{
      .ivu-input {
        padding-right: 30px;
      }
    }
    .remark-in{
      .icon{
        position: absolute;
        right: 10px;
        top:8px;
        margin: 0 auto;
        width: 16px;
        height: 16px;
        background: url('/static/icons/public/remarkInCell.svg') no-repeat;
      }
      .text{
          position: absolute;
          right:27px;
          bottom:9px;
          max-width: 200px;
          padding:5px 13px 5px 11px;
          border-radius: 2px;
          background: #FFFCDC;
          border: 1px solid @gradeAshFour;
        }
    }
  }
  .password-in{
    .inputVerificationTs::after{
      right:30px;
    }
  }
  .header-phone {
    background-color: @alertHeadBg;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    font-weight: normal;
    .alert-header-text {
      display: inline-block;
      line-height: 50px;
      font-weight: 500;
    }
    .alert-header-text::before {
      content: '';
      width: 4px;
      height: 18px;
      margin-right: 6px;
      display: inline-block;
      margin-top: -4px;
      vertical-align: middle;
      background-color: @gradeBlueOne;
    }
  }
}
</style>
