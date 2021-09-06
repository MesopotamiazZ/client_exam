<!--
*单位管理-员工列表-备单（放射体检备单）-批量设置
*@author 刘佳莉
*@date 2018/03/05
-->
<template>
  <div class="radiology-set"
       v-if="radiologySetModal">
    <Modal v-model="radiologySetModal" class="model-void"
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
                   class="left-input"
                   :class='{inputVerificationTs: isEmpty(editData.personPay)}' />
          </FormItem>
          <div class="right-name">新增费用支付方</div>
          <FormItem style="display:inline-block" prop='payer'>
            <Select :class="{selectVerificationTs: isEmpty(editData.payer)}" 
              v-model.trim="editData.payer" 
              class="right-input"
              filterable placeholder="">
              <Option v-for="item in newPayer" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <div class="left-name">放射线种类</div>
          <FormItem style="display:inline-block" prop='illType'>
            <Select :class="{selectVerificationTs: isEmpty(editData.illType)&&this.printCertificate}" 
              v-model.trim="editData.illType" 
              class="left-input"
              filterable placeholder="">
              <Option v-for="item in illTypeChoose" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <div class="right-name">每日工作时数或工作量</div>
          <FormItem style="display:inline-block" prop='dayWork' class="has-before">
            <Input v-model.trim="editData.dayWork"
                   class="right-input value-day-work"
                   :class='{inputVerificationTs: isEmpty(editData.dayWork)&&this.printCertificate}' />
          </FormItem>
          <div class="left-name">过量照射史</div>
          <FormItem style="display:inline-block" prop="moreIrradiate">
            <Select :class="{selectVerificationTs: isEmpty(editData.moreIrradiate)&&this.printCertificate}" 
              v-model.trim="editData.moreIrradiate" 
              class="left-input"
              filterable placeholder="">
              <Option v-for="item in moreIrradiateChoose" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <div class="right-name">佩戴个人剂量计</div>
          <FormItem style="display:inline-block" prop='adorn'>
            <Select :class="{selectVerificationTs: isEmpty(editData.adorn)&&this.printCertificate}" 
              v-model.trim="editData.adorn" 
              class="right-input"
              filterable placeholder="">
              <Option v-for="item in adornChoose" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <div class="left-name">累计受照剂量</div>
          <FormItem style="display:inline-block" prop="allIrradiate" class="all-irradiate">
            <Input v-model.trim="editData.allIrradiate"
                   class="left-input value-all-irradiate"
                   :class='{inputVerificationTs: isEmpty(editData.allIrradiate)&&this.printCertificate}' />
          </FormItem>
          <div class="right-name">职业健康检查种类</div>
          <FormItem style="display:inline-block" prop='checkType'>
            <Select :class="{selectVerificationTs: isEmpty(editData.checkType)}" 
              v-model.trim="editData.checkType" 
              class="right-input"
              filterable placeholder="">
              <Option v-for="item in checkTypeChoose" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <div class="left-name">特殊情况</div>
          <FormItem style="display:inline-block" prop='exceptionalCase'>
            <Select :class="{selectVerificationTs: isEmpty(editData.exceptionalCase)}" 
              v-model.trim="editData.exceptionalCase" 
              class="left-input"
              style="width:458px;"
              filterable placeholder="">
              <Option v-for="item in newPayer" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <div>
            <Checkbox style="line-height:30px;margin-bottom:20px;"  v-model="printCertificate"  :true-value=1 :false-value=0>打证</Checkbox>
            <div class="left-name" style="width:48px;margin-left:8px;" v-if="printCertificate">申请类型</div>
            <FormItem style="display:inline-block" prop='apply'  v-if="printCertificate">
              <Select :class="{selectVerificationTs: isEmpty(editData.apply)}" 
                v-model.trim="editData.apply" 
                class="left-input"
                style="width:118px;"
                filterable placeholder="">
                <Option v-for="item in applyType" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
            <div class="left-name" style="width:48px;margin-left:16px;" v-if="this.editData.apply===1">变更内容</div>
            <FormItem style="display:inline-block" prop="changeContent"  v-if="this.editData.apply===1">
              <Input v-model.trim="editData.changeContent"
                    class="left-input"
                    style="width:226px;"
                    :class='{inputVerificationTs: isEmpty(editData.changeContent)}' />
            </FormItem>
          </div>
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
  name: 'radiology-set',
  data() {
    const validateIllType = (rule, value, callback) => {
      if (!this.printCertificate) {
        callback()
      }
      if (value === null) {
        callback(new Error('放射线种类不能为空'))
      } else {
        callback()
      }
    }
    const validatedayWork = (rule, value, callback) => {
      if (!this.printCertificate) {
        callback()
      }
      if (value === '') {
        callback(new Error('每日工作时数或工作量不能为空'))
      } else {
        callback()
      }
    }
    const validatemoreIrradiate = (rule, value, callback) => {
      if (!this.printCertificate) {
        callback()
      }
      if (value === null) {
        callback(new Error('过量照射史不能为空'))
      } else {
        callback()
      }
    }
    const validateadorn = (rule, value, callback) => {
      if (!this.printCertificate) {
        callback()
      }
      if (value === null) {
        callback(new Error('佩戴个人剂量计不能为空'))
      } else {
        callback()
      }
    }
    const validateallIrradiate = (rule, value, callback) => {
      if (!this.printCertificate) {
        callback()
      }
      if (value === '') {
        callback(new Error('累计受照剂量不能为空'))
      } else {
        callback()
      }
    }
    return {
      validate: true,
      printCertificate: 1,
      newPayer: [
        {value: 0, label: '单位'},
        {value: 1, label: '个人'},
      ],
      applyType: [
        {value: 0, label: '初次申请'},
        {value: 1, label: '变更'},
        {value: 2, label: '遗失补办'},
        {value: 3, label: '换发'},
      ],
      illTypeChoose: [
        {value: 1, label: 'α射线'},
        {value: 2, label: 'β射线'},
        {value: 3, label: 'γ射线'},
        {value: 4, label: '中子射线'},
        {value: 5, label: '电子射线'},
        {value: 6, label: '质子射线'},
        {value: 7, label: '其他射线'},
      ],
      moreIrradiateChoose: [
        {value: 1, label: '有'},
        {value: 2, label: '无'},
      ],
      adornChoose: [
        {value: 1, label: '是'},
        {value: 2, label: '否'},
      ],
      checkTypeChoose: [
        {value: 1, label: '上岗前'},
        {value: 2, label: '在岗期间'},
      ],
      hoverIcon: false,
      time: 60,
      clickSend: true,
      editData: {
        personPay: '',
        payer: null,
        illType: null,
        dayWork: '',
        adorn: null,
        moreIrradiate: null,
        allIrradiate: '',
        checkType: null,
        exceptionalCase: null,
        apply: null,
        changeContent: '',
      },
      editRule: {
        // 编辑验证规则
        personPay: [
          // 个人支付比例
          {
            required: true,
            message: '个人支付比例不能为空！',
            type: 'string',
            trigger: 'blur',
          },
        ],
        payer: [
          // 新增费用支付
          {
            required: true,
            message: '新增费用支付方不能为空',
            trigger: 'change',
            type: 'number',
          },
        ],
        illType: [
          {
            validator: validateIllType,
            trigger: 'change',
          },
        ],
        dayWork: [
          {
            validator: validatedayWork,
            trigger: 'change',
          },
        ],
        moreIrradiate: [
          {
            validator: validatemoreIrradiate,
            trigger: 'change',
          },
        ],
        adorn: [
          {
            validator: validateadorn,
            trigger: 'change',
          },
        ],
        allIrradiate: [
          {
            validator: validateallIrradiate,
            type: 'string',
          },
        ],
        checkType: [
          {
            required: true,
            message: '职业健康检查种类不能为空',
            trigger: 'change',
            type: 'number',
          },
        ],
        exceptionalCase: [
          {
            required: true,
            message: '特殊情况不能为空',
            trigger: 'change',
            type: 'number',
          },
        ],
        apply: [
          {
            required: true,
            message: '申请类型不能为空',
            trigger: 'change',
            type: 'number',
          },
        ],
        changeContent: [
          {
            required: true,
            message: '变更内容不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  props: {
    radiologySetModal: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    printCertificate(val) {
      if (val === 0) {
        this.editData.apply = null
        if (!this.validate) {
          this.$refs.editData.validate()
        }
      }
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
        this.validate = valid
        if (valid) {
          this.$emit('send')
          this.editData = {
            personPay: '',
            payer: null,
            illType: null,
            dayWork: '',
            adorn: null,
            moreIrradiate: null,
            allIrradiate: '',
            checkType: null,
            exceptionalCase: null,
            apply: null,
            changeContent: '',
          }
        }
      })
    },
    cancel() {
      this.$emit('cancel')
      this.editData = {
        personPay: '',
        payer: null,
        illType: null,
        dayWork: '',
        adorn: null,
        moreIrradiate: null,
        allIrradiate: '',
        checkType: null,
        exceptionalCase: null,
        apply: null,
        changeContent: '',
      }
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.radiology-set {
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
      .has-before{
        .ivu-form-item-error-tip{
          left:-20px;
        }
        .value-day-work {
          position: relative;
          &::before {
            position: absolute;
            content: 'h';
            z-index:10;
            display: inline-block;
            top: 7px;
            right: 10px;
            font-size: 12px;
            color: @gradeAshThree;
          }
        }
        .inputVerificationTs::after{
          right:23px;
        }
      }
      .all-irradiate{
        .ivu-input{
          padding:10px 38px 10px 10px;
        }
        .value-all-irradiate{
          position: relative;
          &::before {
            position: absolute;
            content: 'mSv';
            z-index: 10;
            display: inline-block;
            top: 7px;
            right: 10px;
            font-size: 12px;
            color: @gradeAshThree;
          }
        }
        .inputVerificationTs::after{
          right:36px;
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
      width: 72px;
      color: @gradeAshThree;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .right-name {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin-right: 6px;
      display: inline-block;
      text-align: justify;
      width: 121px;
      margin-left:16px;
      color: @gradeAshThree;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .left-input {
      display: inline-block;
      vertical-align: top;
      width:160px;
    }
    .right-input {
      display: inline-block;
      vertical-align: top;
      width:148px;
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
