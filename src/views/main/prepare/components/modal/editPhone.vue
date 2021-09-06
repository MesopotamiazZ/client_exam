/*
* 修改验证手机
*@author 覃凤
*@date 2018/3/3*/
<template>
  <div class="edit-phone" v-if='ifShowModal'>
    <Modal v-model="ifShowModal" :styles="{width: '356px'}"
      :transition-names='[]'
      :mask-closable="false"
      :transfer='false'
      :closable="false">
      <div slot="header">
        <div slot="header">
          <div name='alertHeader' class="header-phone font14">
            <span class="alert-header-text font16 fl">修改验证手机</span>
            <div class="alert-header-input fr">
              <span class="curPointer font12" @click='showResetPho'>重置手机号</span>
            </div>
          </div>
        </div>
      </div>
      <div class="vip-phone-main">
        <Form ref='editVipPhone' :rules="dataRule" :model='editData'>
          <div class="main-line">
            <span class="marginR10 fl textJustify">当前手机号</span>
            <div class="fl">
              <FormItem prop="self_phoneNum">
                <Input v-model="editData.self_phoneNum" disabled placeholder=""></Input>
              </FormItem>
            </div>
          </div>
          <div class="main-line">
            <span class="textJustify fl marginR10">验证码</span>
            <div class="fl phone-input">
              <FormItem prop="self_yzNum" style="width: 246px;">
                <Input placeholder="" v-model.trim="editData.self_yzNum"></Input>
              </FormItem>
              <div>
                <span class="font12 curPointer send-new-phone-valc" v-if='!oldDataPhone.verifiCodeDisabled' @click='sendVeriCodePer'>发送验证码</span>
                <span class="font12 time-span" v-if='oldDataPhone.verifiCodeDisabled'>{{ oldDataPhone.timeNumber }}S</span>
              </div>
            </div>
          </div>
          <div class="clearBoth marginB20"></div>
          <div class="main-line">
            <span class="marginR10 fl textJustify">新手机号</span>
            <div class="fl">
              <FormItem prop="self_newPhone">
                <Input 
                  v-model="editData.self_newPhone" 
                  placeholder="" 
                  :class='{inputVerificationTs: isEmpty(editData.self_newPhone)}'>
                </Input>
              </FormItem>
            </div>
          </div>
          <div class="main-line">
            <span class="textJustify fl marginR10">验证码</span>
            <div class="fl phone-input">
              <FormItem prop="self_yzNewNum" style="width: 246px;">
                <Input placeholder="" v-model.trim="editData.self_yzNewNum"></Input>
              </FormItem>
              <div>
                <span class="font12 curPointer send-new-phone-valc" v-if='!newDataPhone.verifiCodeDisabled' @click='sendNewVeriCodePer'>发送验证码</span>
                <span class="font12 time-span" v-if='newDataPhone.verifiCodeDisabled'>{{ newDataPhone.timeNumber }}S</span>
              </div>
            </div>
          </div>
          <div class="clearBoth"></div>
        </Form>
      </div>
      <div slot="footer" style="font-size: 0;" class="paddingB20 paddingR20">
        <z-button ZBtype='primary' class="marginR20" @click="commit('editVipPhone')">保存</z-button>
        <z-button ZBtype='ghost' @click='cancel'>取 消</z-button>
      </div>
    </Modal>

    <!-- 重置手机号 -->
    <reset-phone :ifShowModal='ifShowModalReset' @cancel-data='cancelReset' @commit-data='commitReset'></reset-phone>
  </div>
</template>
<script>
import resetPhone from './resetPhone.vue'
export default {
  name: 'edit-phone',
  components: {
    resetPhone,
  },
  props: {
    ifShowModal: {
      type: Boolean,
      default: false,
    },
  },
  data () {
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
      msg: '修改手机号',
      ifShowModalReset: false, // 重置手机号弹窗显示隐藏
      editData: {
        self_phoneNum: '18756239846', // 当前手机号
        self_yzNum: '', // 当前手机验证码
        self_newPhone: '', // 新手机号
        self_yzNewNum: '', // 新手机验证码
      },
      oldDataPhone: { // 旧手机号
        verifiCodeDisabled: false, // 验证码
        timeNumber: null,
        timeNumberInit: 60, // 倒计时时间
        setTimeInterval: undefined, // 发送验证码调用时间
      },
      newDataPhone: { // 新手机号
        verifiCodeDisabled: false, // 验证码
        timeNumber: null,
        timeNumberInit: 60, // 倒计时时间
        setTimeInterval: undefined, // 发送验证码调用时间
      },
      dataRule: {
        self_yzNum: [ // 验证码（当前手机）
          {
            required: true,
            trigger: 'blur',
            message: '请填写验证码',
          },
        ],
        self_newPhone: [
          {
            required: true,
            validator: phoneNumber,
            trigger: 'blur',
          },
        ],
        self_yzNewNum: [
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
        this.clearoldDataPhoneInertval()
        this.clearNewDataPhoneInertval()
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
    /* =====================================================重置手机号 */
    showResetPho () { // 点击重置手机号
      // this.ifShowModalReset = true
      this.$emit('reset-phone')
    },
    cancelReset () {
      this.ifShowModalReset = false
    },
    commitReset (data) {
      console.log(data)
      this.ifShowModalReset = false
    },
    /* =====================================================发送验证码 */
    sendVeriCodePer() {
      // 点击发送验证码
      // 计时数字开始
      // 计时完成之后
      this.oldDataPhone.verifiCodeDisabled = true
      this.showTime()
    },
    showTime() {
      this.oldDataPhone.timeNumber = this.oldDataPhone.timeNumberInit
      this.oldDataPhone.setTimeInterval = setInterval(() => {
        this.oldDataPhone.timeNumber--
        if (this.oldDataPhone.timeNumber < 0) {
          this.clearoldDataPhoneInertval()
        }
      }, 1000)
    },
    clearoldDataPhoneInertval() {
      // 清除单位会员调用
      clearInterval(this.oldDataPhone.setTimeInterval)
      this.oldDataPhone.timeNumber = this.oldDataPhone.timeNumberInit
      this.oldDataPhone.verifiCodeDisabled = false
    },
    sendNewVeriCodePer () {
      // 点击发送验证码
      // 计时数字开始
      // 计时完成之后
      this.newDataPhone.verifiCodeDisabled = true
      this.showTimeNew()
    },
    showTimeNew() {
      this.newDataPhone.timeNumber = this.newDataPhone.timeNumberInit
      this.newDataPhone.setTimeInterval = setInterval(() => {
        this.newDataPhone.timeNumber--
        if (this.newDataPhone.timeNumber < 0) {
          this.clearNewDataPhoneInertval()
        }
      }, 1000)
    },
    clearNewDataPhoneInertval() {
      clearInterval(this.newDataPhone.setTimeInterval)
      this.newDataPhone.timeNumber = this.newDataPhone.timeNumberInit
      this.newDataPhone.verifiCodeDisabled = false
    },
    /* =====================================================保存、取消 */
    cancel () { // 修改手机号取消
      this.$emit('cancel-data')
    },
    async commit (name) { // 修改新手机号保存
      if (await this.$refs[name].validate()) {
        this.$emit('commit-data', this.editData)
      }
    },
    initData () {
      this.editData.self_yzNum = ''
      this.editData.self_newPhone = ''
      this.editData.self_yzNewNum = ''
      // this.editData = {
      //   self_phoneNum: '18756239846', // 当前手机号
      //   self_yzNum: '', // 当前手机验证码
      //   self_newPhone: '', // 新手机号
      //   self_yzNewnum: '', // 新手机验证码
      // },
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.edit-phone {
  .reset-phone {
    .ivu-modal-mask {
      background-color: rgba(0,0,0,0);
    }
  }
  .vip-phone-main {
    padding: @num20;
    color: @gradeAshThree;
    // outline: 1px solid red;
    .main-line {
      &>span {
        width: 60px;
        display: inline-block;
        height: @num30;
        line-height: @num30;
      }
      &>div {
        width: 246px;
      }
      .phone-input {
        position: relative;
        .ivu-input {
          padding-right: 78px;
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
      vertical-align: middle;
      &>span {
        cursor: pointer;
        text-align: center;
        color: @gradeBlueOne;
        letter-spacing: 0.04px;
      }
    }
  }
}
</style>
