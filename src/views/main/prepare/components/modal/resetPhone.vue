/*
* 重置手机号
* @author 覃凤
* @date 2018/3/3
*/
<template>
  <div class="reset-phone" v-if="ifShowModal">
    <Modal v-model="ifShowModal" :styles="{width: '345px'}"
      :transition-names='[]'
      :mask-closable="false"
      :transfer='false'
      :closable="false">
      <div slot="header">
        <div slot="header">
          <div name='alertHeader' class="header-phone font14">
            <span class="alert-header-text font16 fl">重置手机号</span>
            <div class="alert-header-input fr">
              <img :src="tsIcon" alt="#">
              <span class="curPointer font12">请确认是否本人修改</span>
            </div>
          </div>
        </div>
      </div>
      <div class="reset-phone-main">
        <Form :model="showModalData" :rules="dataRule" ref="resetPhoneForm">
          <div class="reset-main-line">
            <span class="textJustify fl marginR10">身份证号</span>
            <div class="fl">
              <FormItem prop="self_idNum">
                <Input 
                  placeholder="" 
                  v-model.trim='showModalData.self_idNum'
                  :class='{inputVerificationTs: isEmpty(showModalData.self_idNum)}'>
                </Input>
              </FormItem>
            </div>
          </div>
          <div class="reset-main-line">
            <span class="textJustify fl marginR10">新手机号</span>
            <div class="fl">
              <FormItem prop="self_newPho">
                <Input 
                  placeholder="" 
                  v-model.trim="showModalData.self_newPho"
                  :class='{inputVerificationTs: isEmpty(showModalData.self_newPho)}'>
                </Input>
              </FormItem>
            </div>
          </div>
          <div class="reset-main-line">
            <span class="textJustify fl marginR10">验证码</span>
            <div class="fl phone-input">
              <FormItem prop="self_yzNum" style="width: 246px;">
                <Input placeholder="" v-model.trim="showModalData.self_yzNum"></Input>
              </FormItem>
              <div>
                <span class="font12 curPointer send-new-phone-valc" v-if='!resetData.verifiCodeDisabled' @click='sendVeriCodePer'>发送验证码</span>
                <span class="font12 time-span" v-if='resetData.verifiCodeDisabled'>{{ resetData.timeNumber }}S</span>
              </div>
            </div>
          </div>
          <div class="clearBoth"></div>
        </Form>
      </div>
      <div slot="footer" style="font-size: 0;" class="paddingB20 paddingR20">
        <div class="sign-img fl"></div>
        <z-button ZBtype='primary' class="marginR20" @click="commit('resetPhoneForm')">保存</z-button>
        <z-button ZBtype='ghost' @click='cancel'>取 消</z-button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'reset-phone',
  props: {
    ifShowModal: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    const idNumber = (rule, val, callback) => {
      let idNum = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
      if (val !== '') {
        if (!idNum.test(val)) {
          callback(new Error('身份证号输入不正确'))
        } else {
          callback()
        }
      } else {
        callback(new Error('身份证号不为空'))
      }
    }
    const phoneNumber = (rule, val, callback) => {
      let phoneNum = /^1[3|4|5|7|8][0-9]{9}$/
      if (val !== '') {
        if (!phoneNum.test(val)) {
          callback(new Error('手机号输入不正确'))
        } else {
          callback()
        }
      } else {
        callback(new Error('手机号不为空'))
      }
    }
    return {
      tsIcon: '/static/icons/public/noticeRed.svg',
      showModalData: { // 提交数据
        self_idNum: '',
        self_newPho: '',
        self_yzNum: '',
      },
      resetData: {
        verifiCodeDisabled: false, // 验证码
        timeNumber: null,
        timeNumberInit: 60, // 倒计时时间
        setTimeInterval: undefined, // 发送验证码调用时间
      },
      dataRule: {
        self_idNum: [
          {
            required: true,
            validator: idNumber,
            trigger: 'blur',
          },
        ],
        self_newPho: [
          {
            required: true,
            validator: phoneNumber,
            trigger: 'blur',
          },
        ],
        self_yzNum: [
          {
            required: true,
            trigger: 'blur',
            message: '请填写验证码',
          },
        ],
      },
    }
  },
  watch: {
    ifShowModal (val) {
      if (!val) {
        this.initData()
        this.clearResetDataInertval()
      }
    },
  },
  methods: {
    isEmpty(data) {
      if (data === '') {
        return true
      } else {
        return false
      }
    },
    sendVeriCodePer() {
      // 点击发送验证码
      // 计时数字开始
      // 计时完成之后
      this.resetData.verifiCodeDisabled = true
      this.showTime()
    },
    showTime() {
      this.resetData.timeNumber = this.resetData.timeNumberInit
      this.resetData.setTimeInterval = setInterval(() => {
        this.resetData.timeNumber--
        if (this.resetData.timeNumber < 0) {
          this.clearResetDataInertval()
        }
      }, 1000)
    },
    clearResetDataInertval() {
      // 清除单位会员调用
      clearInterval(this.resetData.setTimeInterval)
      this.resetData.timeNumber = this.resetData.timeNumberInit
      this.resetData.verifiCodeDisabled = false
    },
    async commit (name) { // 保存按钮
      if (await this.$refs[name].validate()) {
        this.$emit('commit-data', this.showModalData)
      }
    },
    cancel () { // 取消按钮
      this.$emit('cancel-data')
    },
    initData () {
      this.showModalData = {
        self_idNum: '',
        self_newPho: '',
        self_yzNum: '',
      }
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.reset-phone {
  .reset-phone-main {
    padding: @num20;
    color: @gradeAshThree;
    .reset-main-line {
      width: 100%;
      &>span {
        width: 48px;
        height: @num30;
        line-height: @num30;
        display: inline-block;
      }
      &>div {
        width: 246px;
      }
      .phone-input {
        position: relative;
        .ivu-input-wrapper {
          .ivu-input {
            padding-right: 78px;
          }
        }
        &>div {
          position: absolute;
          right: 0;
          .send-new-phone-valc {
            color: @gradeBlueOne;
          }
          &>span {
            position: relative;
            right: @num5;
            line-height: @num30;
            color: #B3B3B3;
            &::before {
              content: '|';
              font-size: 12px;
              margin-right: @num5;
              color: @gradeAshFour;
            }
          }
          .time-span {
            display: inline-block;
            width: 52px;
            margin-right: 18px;
            &::before {
              margin-right: 18px;
            }
          }
        }
      }
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
    .alert-header-input {
      line-height: 50px;
      // font-size: 0;
      vertical-align: middle;
      &>img {
        position: relative;
        top: 2px;
      }
      &>span {
        text-align: center;
        color: @gradeAshThree;
        letter-spacing: 0.04px;
      }
    }
  }
}
</style>
