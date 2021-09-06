<!--
*单位管理-员工列表-备单（职业体检备单）-批量设置
*@author 刘佳莉
*@date 2018/03/02
-->
<template>
  <div class="profession-set"
       v-if="professionSetModal">
    <Modal v-model="professionSetModal" class="model-void"
           :styles="{width: '580px'}"
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
                   style="width: 160px;" />
          </FormItem>
          <div class="left-name" style="margin-left:16px;width:84px;">新增费用支付方</div>
          <FormItem style="display:inline-block" prop='payer'>
            <Select :class="{selectVerificationTs: isEmpty(editData.payer)}" 
              v-model.trim="editData.payer" 
              class="right-input"
              style="width: 181px;"
              filterable placeholder="">
              <Option v-for="item in newPayer" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <div class="left-name" style="width: 24px;">工种</div>
          <FormItem style="display:inline-block" prop="profession">
            <Input v-model.trim="editData.profession"
                   class="right-input"
                   :class='{inputVerificationTs: isEmpty(editData.profession)}'
                   style="width: 208px;" />
          </FormItem>
          <div class="left-name" style="margin-left:16px;width: 36px;">总工龄</div>
          <FormItem style="display:inline-block" prop="allWorkTime" class="has-year">
            <Input v-model.trim="editData.allWorkTime"
                   class="right-input value-price"
                   :class='{inputVerificationTs: isEmpty(editData.allWorkTime)}'
                   style="width: 77px;" />
          </FormItem>
          <div class="left-name" style="margin-left:16px;width: 48px;">接害工龄</div>
          <FormItem style="display:inline-block" prop="jhTime" class="has-year jh-time">
            <Input v-model.trim="editData.jhTime"
                   class="right-input value-price"
                   :class='{inputVerificationTs: isEmpty(editData.jhTime)}'
                   style="width: 77px;" />
          </FormItem>
          <div class="left-name" style="width: 116px;">职业病危害因素名称1</div>
          <FormItem style="display:inline-block" prop="dangerName1">
            <Input v-model.trim="editData.dangerName1"
                   class="right-input"
                   :class='{inputVerificationTs: isEmpty(editData.dangerName1)}'
                   style="width: 414px;" />
          </FormItem>
          <div class="left-name" style="width:116px;">职业健康检查种类</div>
          <FormItem style="display:inline-block" prop='checkType1'>
            <Select :class="{selectVerificationTs: isEmpty(editData.checkType1)}" 
              v-model.trim="editData.checkType1" 
              class="right-input"
              style="width: 414px;"
              filterable placeholder="">
              <Option v-for="item in newPayer" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <div class="left-name" style="width: 116px;">职业病危害因素名称2</div>
          <FormItem style="display:inline-block">
            <Input v-model.trim="editData.dangerName2"
                   class="right-input"
                   style="width: 414px;" />
          </FormItem>
          <div class="left-name" style="width:116px;">职业健康检查种类</div>
          <FormItem style="display:inline-block">
            <Select
              v-model.trim="editData.checkType2" 
              class="right-input"
              style="width: 414px;"
              filterable placeholder="">
              <Option v-for="item in newPayer" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <div class="left-name" style="width: 116px;">职业病危害因素名称3</div>
          <FormItem style="display:inline-block">
            <Input v-model.trim="editData.dangerName3"
                   class="right-input"
                   style="width: 414px;" />
          </FormItem>
          <div class="left-name" style="width:116px;">职业健康检查种类</div>
          <FormItem style="display:inline-block">
            <Select
              v-model.trim="editData.checkType3" 
              class="right-input"
              style="width: 414px;"
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
  name: 'profession-set',
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
        payer: '',
        jhTime: '',
        profession: '',
        allWorkTime: '',
        dangerName1: '',
        checkType1: '',
      },
      editRule: {
        // 编辑验证规则
        personPay: [
          // 验证码
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
        profession: [
          {
            required: true,
            message: '工种不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
        allWorkTime: [
          // 验证码
          {
            required: true,
            message: '总工龄不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
        jhTime: [
          {
            required: true,
            message: '接害工龄不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
        dangerName1: [
          {
            required: true,
            message: '职业病危害因素名称不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
        checkType1: [
          {
            required: true,
            message: '职业健康检查种类不能为空',
            type: 'number',
            trigger: 'change',
          },
        ],
      },
    }
  },
  props: {
    professionSetModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    isEmpty(data) {
      if (data === '' || data === null) {
        if (data === this.editData.newPassword) {
          this.editData.surePassword = ''
        }
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
            payer: '',
            jhTime: '',
            profession: '',
            allWorkTime: '',
            dangerName1: '',
            checkType1: '',
          }
        }
      })
    },
    cancel() {
      this.$emit('cancel')
      this.editData = {
        personPay: '',
        payer: '',
        jhTime: '',
        profession: '',
        allWorkTime: '',
        dangerName1: '',
        checkType1: '',
      }
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.profession-set {
  .model-void{
    box-shadow: 0 2px 10px 0;
    .ivu-modal-mask {
      background-color: transparent!important;
    }
    .ivu-modal-content {
      border-radius: @borderRadiuBig;
      background-color: #FFFFFF;
      box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
    }
  }
  .content {
    padding: 20px 20px 0 20px;
    color: @gradeAshThree;
    .has-year{
      .ivu-form-item-error-tip{
        left:-8px;
      }
      .ivu-input{
        padding:10px 27px 10px 10px;
      }
      .value-price {
        position: relative;
        &::before {
          position: absolute;
          content: '年';
          z-index: 10;
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
        left:-20px;
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
      width: 72px;
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
