/** 
* @author 覃凤
* @date 2018/03/7
* @content 批量附加费用
*/ 
<template>
  <div class="batch-add-pay">
    <iframe id='iframePrint' src="/static/jianqian/缴费凭条.html" frameborder="0" style="display:none;"></iframe>
    <div  v-if='controlModal'>
      <Modal v-model="controlModal"
           :styles="{width: '340px'}"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
        <div class="batch-add-pay-header" slot="header">
          <alert-header :showInput='false' :headerText="'批量增加附加费用'"></alert-header>
        </div>
        <div class="batch-add-pay-main">
          <Form ref="batchAddPay" :model="emitData" :rules='dataRule'>
            <ul class="batch-add-pay-main-ul">
              <li class="fl marginB20">
                <span class="fl textJustify marginR10">费用类别</span>
                <div class="fl">
                  <FormItem prop="costCategory">
                    <Select 
                      :class="{selectVerificationTs:isEmpty(emitData.costCategory)}" 
                      v-model="emitData.costCategory" 
                      filterable 
                      placeholder=''>
                      <Option v-for="item in costCategorySelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </div>
              </li>
              <li class="fl surcharge-name">
                <span class="fl textJustify marginR10">附加费名称</span>
                <div class="fl">
                  <!-- <FormItem prop="surchargeName"> -->
                    <Input v-show='surchargeDisabled' disabled class="inputVerificationTs"></Input>
                  <!-- </FormItem> -->
                  <FormItem prop="surchargeName">
                    <Select 
                        :class="{selectVerificationTs:isEmpty(emitData.surchargeName)}"
                        v-show='!surchargeDisabled' 
                        v-model="emitData.surchargeName" 
                        filterable 
                        placeholder=''>
                      <Option v-for="item in surchargeNameSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </div>
              </li>
              <li class="fl" v-if='surchargePriceDisabled'>
                <span class="fl textJustify marginR10"></span>
                <div class="fl disable-div">
                  <span class="marginL10">单价：</span>
                  <span>{{ emitData.unitPrice }}</span>
                  <span>元</span>
                </div>
              </li>
              <li class="fl marginT20">
                <span class="fl textJustify marginR10">收费金额</span>
                <!-- {{ tipContent }} -->
                <div class="fl">
                  <FormItem prop="chargeAmount">
                    <z-input 
                      type='number'
                      v-model.trim='emitData.chargeAmount'
                      :class="{inputVerificationTsHasUnit:isEmpty(emitData.chargeAmount)}" 
                      class="self-input-price">
                    </z-input>
                  </FormItem>
                </div>
              </li>
              <li class="clearBoth"></li>
            </ul>
          </Form>
        </div>
        <div slot="footer">
          <div class="batch-add-pay-footer paddingT20 paddingB20" style="font-size:0;">
            <Button type="ghost" @click="cancel" class="marginR20 fr">取 消</Button>
            <Button type="primary" @click="commit('batchAddPay')" class="marginR20 fr">保 存</Button>
            <Checkbox class="fr marginR20" style="line-height: 30px;" v-model="emitData.withdrawalAmount" :true-value=1 :false-value=0>打印缴费凭条</Checkbox>
            <div class="clearBoth"></div>
          </div>
        </div>
      </Modal>
    </div>
    <!-- 批量添加确认 -->
    <tip-modal 
        headerText='批量添加附加费用' 
        :controlModal='controlModalTip'
        :isMask="false"
        :mainContent="'确认给'+tableChooseLen+'人增加'+addProject+'吗？'"
        @tip-modal-affirm='tipCommit'
        @tip-modal-cancel='tipCancel'>
      </tip-modal>
  </div>
</template>
<script>
// import tipModal from '@/views/main/prepare/components/modal/tipModal.vue'
export default {
  name: 'batch-add-pay',
  components: {
    // tipModal,
  },
  props: {
    controlModal: {
      type: Boolean,
      default: false,
    },
    tableChooseLen: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      msg: '批量附加费用',
      controlModalTip: false, // 确认添加提示
      mainContent: '', // 传入到提示的数据
      addProject: '早餐费',
      emitData: {
        costCategory: '', // 费用类别
        surchargeName: '', // 附加费名称
        unitPrice: 12.00, // 单价
        chargeAmount: '', // 收费金额
        withdrawalAmount: 1, // 是否打印缴费凭条
      },
      surchargeDisabled: true, // 附加费名成是否禁用
      surchargePriceDisabled: false, // 是否显示单价行
      costCategorySelect: [
        {
          label: '全部',
          value: 0,
        },
      ], // 费用类别下拉
      surchargeNameSelect: [{
        label: '早餐费',
        value: 0,
      }], // 附加费名称下拉
      dataRule: {
        costCategory: [
          {
            required: true,
            message: '费用类别不为空',
            trigger: 'change',
            type: 'number',
          },
        ],
        surchargeName: [
          {
            required: true,
            trigger: 'change',
            message: '附加费名称不为空',
            type: 'number',
          },
        ],
        chargeAmount: [
          {
            required: true,
            trigger: 'blur',
            message: '收费金额不为空',
          },
        ],
      },
    }
  },
  watch: {
    controlModal(val) {
      if (!val) {
        this.initClear()
      }
    },
    'emitData.costCategory' (val) {
      console.log(val)
      if (val !== '') {
        this.surchargeDisabled = false
      } else {
        this.surchargeDisabled = true
      }
    },
    'emitData.surchargeName' (val) {
      console.log(val)
      if (val !== '') {
        this.surchargePriceDisabled = true
      } else {
        this.surchargePriceDisabled = false
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
    async tipCommit () {
      // 提示弹窗隐藏
      // 附加增加附加费用隐藏
      // 数据返回
      let a = document.getElementById('iframePrint')
      a.contentWindow.print()
      this.controlModalTip = false
      // this.controlModal = false
      this.$emit('update:controlModal', false)
      // if (await this.$refs[name].validate()) {
      //   this.$emit('commit-data', this.emitData)
      //   this.initClear()
      // }
      this.$emit('commit-data', this.emitData)
    },
    tipCancel () {
      this.controlModalTip = false
    },
    async commit (name) {
      if (await this.$refs[name].validate()) {
        // this.$emit('commit-data', this.emitData)
        // this.initClear()
        this.controlModalTip = true
      }
    },
    cancel () {
      this.$emit('cancel-data')
      this.initClear()
    },
    initClear() {
      this.emitData = {
        costCategory: '', // 费用类别
        surchargeName: '', // 附加费名称
        unitPrice: 12.00, // 单价
        chargeAmount: '', // 收费金额
        withdrawalAmount: 1, // 是否打印缴费凭条
      }
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.batch-add-pay {
  color: @gradeAshThree;
  .disable-div {
    height: @num30;
    line-height: @num30;
    background-color: @iviInputDisabled;
  }
  .batch-add-pay-main {
    padding: @num20 @num20 0 @num20;
    .ivu-form-item {
      margin-bottom: 0;
    }
    .surcharge-name {
      .ivu-form-item-error-tip {
        padding-top: 34px;
      }
    }
    .batch-add-pay-main-ul {
      &>li {
        &>span {
          width: 60px;
          height: @num30;
          line-height: @num30;
        }
        &>div {
          width: 230px;
        }
      }
    }
  }
}
</style>
