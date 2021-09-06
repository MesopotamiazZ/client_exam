<!--
*单位管理-单位账户详情-重置单位支付密码
*@author 刘佳莉
*@date 2018/03/02
-->
<template>
  <div class="reset-unit-password"
       v-if="resetEditUnitPayModal">
    <Modal v-model="resetEditUnitPayModal"
           :styles="{width: '356px'}"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <div slot="header">
          <div name='alertHeader'
               class="header-phone font14">
            <span class="alert-header-text font16 fl">重置单位支付密码</span>
          </div>
        </div>
      </div>
      <div class="reset-phone-main">
        <Form ref='editData'
              :model="editData"
              :rules="editRule">
          <div class="left-name">手机号码</div>
          <FormItem style="display:inline-block">
            <Input v-model.trim="editData.mobile"
                   class="right-input"
                   disabled
                   style="width: 258px;" />
          </FormItem>
          <div class="left-name">验证码</div>
          <FormItem prop="yzm"
                    style="display:inline-block">
            <div class="phone-input">
              <Input v-model.trim="editData.yzm"
                     class="right-input"
                     style="width: 258px;" />
              <span class="font12 curPointer" @click="sendyzm" v-if="clickSend">发送验证码</span>
              <span class="font12 curPointer time-span" style="color: #B3B3B3;" v-if="!clickSend">{{time}}s</span>
            </div>
          </FormItem>
          <div class="left-name">新密码</div>
          <FormItem prop="newPassword"
                    class="password-in"
                    style="display:inline-block">
            <Input v-model.trim="editData.newPassword"
                   type="password"
                   class="right-input have-remark"
                   :class='{inputVerificationTs: isEmpty(editData.newPassword)}'
                   style="width: 258px;" />
                   <div class="remark-in">
            <div class="icon" @mouseover="hoverIcon=true" @mouseout="hoverIcon=false"></div>
              <div class="text" v-if="hoverIcon">请输入6-32位的字母或数字</div>
            </div>
          </FormItem>
          <div class="left-name">密码确认</div>
          <FormItem prop="surePassword"
                    v-if="!isEmpty(editData.newPassword)"
                    style="display:inline-block">
            <Input v-model.trim="editData.surePassword"
                   type="password"
                   class="right-input"
                   :class='{inputVerificationTs: isEmpty(editData.surePassword)}'
                   style="width: 258px;" />
          </FormItem>
          <Input v-if="isEmpty(editData.newPassword)"
                   type="password"
                   class="right-input marginB20"
                   disabled
                   style="width: 258px;" />
        </Form>
      </div>
      <div slot="footer"
           style="font-size: 0;"
           class="paddingB20 paddingR20">
        <div class="sign-img fl"></div>
        <z-button ZBtype='primary'
                  @click="send"
                  class="marginR20">保 存</z-button>
        <z-button @click="cancel" ZBtype='ghost'>取 消</z-button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'edit-unit-pay',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空'))
      } else {
        let psd = /^[0-9A-Za-z]{6,32}$/
        if (!psd.test(value)) {
          callback(new Error('密码必须为6-32位的字母或数字'))
        } else {
          if (this.editData.surePassword !== '') {
            // 对第二个密码框单独验证
            this.$refs.editData.validateField('surePassword')
          }
          callback()
        }
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (value !== this.editData.newPassword) {
        callback(new Error('与当前密码不一致'))
      } else {
        callback()
      }
    }
    return {
      timer: null,
      hoverIcon: false,
      time: 60,
      clickSend: true,
      showSurePsd: false,
      editData: {
        mobile: '13485469548',
        yzm: '',
        newPassword: '',
        surePassword: '',
      },
      editRule: {
        // 编辑验证规则
        yzm: [
          // 验证码
          {
            required: true,
            message: '验证码不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
        newPassword: [
          // 新密码
          {
            validator: validatePass,
            trigger: 'blur',
          },
        ],
        surePassword: [
          // 确认密码
          {
            validator: validatePassCheck,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  props: {
    resetEditUnitPayModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    isEmpty(data) {
      if (data === '') {
        if (data === this.editData.newPassword) {
          this.editData.surePassword = ''
        }
        return true
      } else {
        return false
      }
    },
    sendyzm() {
      this.clickSend = false
      this.timer = setInterval(() => {
        this.time--
        if (this.time <= 0) {
          clearInterval(this.timer)
          this.clickSend = true
          this.time = 60
        }
      }, 1000)
      this.$emit('sendyzm')
    },
    send() {
      this.$refs.editData.validate((valid) => {
        this.validate = valid
        if (valid) {
          this.$emit('send')
          clearInterval(this.timer)
          this.clickSend = true
          this.time = 60
          this.editData = {
            mobile: '13485469548',
            yzm: '',
            oldPassword: '',
            newPassword: '',
            surePassword: '',
          }
        }
      })
    },
    cancel() {
      this.$emit('cancel')
      clearInterval(this.timer)
      this.clickSend = true
      this.time = 60
      this.editData = {
        mobile: '13485469548',
        yzm: '',
        newPassword: '',
        surePassword: '',
      }
    },
    resetPsd() {
      this.$emit('reset-psd')
      clearInterval(this.timer)
      this.clickSend = true
      this.time = 60
      this.editData = {
        mobile: '13485469548',
        yzm: '',
        newPassword: '',
        surePassword: '',
      }
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.reset-unit-password {
  .reset-phone-main {
    padding: 20px 20px 0 20px;
    color: @gradeAshThree;
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
    .password-in{
      .inputVerificationTs::after{
        right:30px;
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
      width: 48px;
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
    .phone-input {
      .time-span {
        display: inline-block;
        width: 68px;
        &::before {
          margin-right: 32px;
        }
      }
      .right-input {
        .ivu-input {
          padding-right: 85px;
        }
      }
      & > span {
        position: absolute;
        top: 0px;
        right: 15px;
        line-height: @num30;
        color: @gradeBlueOne;
        &::before {
          content: '|';
          font-size: 12px;
          margin-right: @num5;
          color: @gradeAshFour;
        }
      }
    }
    // .reset-main-line {
    //   // & > span {
    //   //   width: 48px;
    //   //   line-height: 30px;
    //   //   display: inline-block;
    //   // }
    //   .phone-input {
    //     .ivu-input {
    //       padding-right: 78px;
    //     }
    //     & > span {
    //       position: absolute;
    //       right: @num5;
    //       line-height: @num30;
    //       color: @gradeBlueOne;
    //       &::before {
    //         content: '|';
    //         font-size: 12px;
    //         margin-right: @num5;
    //         color: @gradeAshFour;
    //       }
    //     }
    //     .send-new-phone-valc {
    //       color: @gradeBlueOne;
    //     }
    //   }
    // }
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
    .alert-header-input {
      line-height: 50px;
      vertical-align: middle;
      & > span {
        text-align: center;
        color: @gradeBlueOne;
        letter-spacing: 0.04px;
      }
    }
  }
}
</style>
