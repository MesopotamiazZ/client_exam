/**
* author      : yhy
* cteate      : 2018/01/11 09:22
* description : 充值vip弹窗
*/
<template>
    <Modal v-model="modelRechargeVip"  class="model-recharge-vip"
           :width='433'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <alert-header  :showInput='false' headerText="账户充值">
        </alert-header>
      </div>
      <div class="content">
        <div>
            <div class="leftName">单位名称</div>
            <Input v-model="unitName" class="rightInput"  style="width: 330px" disabled/>
        </div>
         <div>
            <div class="leftName">账户编号</div>
            <Input v-model="vipResiduePrice" class="rightInput  price" style="width: 330px" disabled/>
        </div>
        <Form :model="formInline" :rules="ruleInline">       
          <div class="leftName">账户余额</div>
          <FormItem prop="self_ye" style="width: 122px;display:inline-block;">
            <z-input type="text" disabled v-model="formInline.self_ye" class='input-price price'></z-input>
          </FormItem>
           <div class="leftName">充值金额</div>
          <FormItem prop="vipGivePrice" style="width: 120px; display:inline-block;">
            <z-input type="number" v-model="formInline.vipGivePrice" class='input-price price'></z-input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Button type="primary" class="button" @click="rechargeVipSure">确认充值</Button>
            <Button type="ghost" class="button" @click="rechargeCancel">取 消</Button>
          </div>
        </div>
      </div>
    </Modal>
</template>

<script>
export default {
  name: 'rechargeVipModal',
  data () {
    return {
      unitName: '中国石油化工股份有限公司', // 单位名称
      // vipNumber: '',
      vipResiduePrice: 'GB89289288', // 账户编号

      formInline: {
        self_ye: 50000000.00, // 账户余额
        vipRechargePrice: '',
        vipGivePrice: null,
      },
      ruleInline: {
        vipRechargePrice: [{}],
        vipGivePrice: [{}],
      },
    }
  },
  props: {
    modelRechargeVip: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    rechargeVipSure() {
      this.$emit('rechargeVipSure')
      this.formInline.vipGivePrice = null
    },
    rechargeCancel() {
      this.$emit('update:modelRechargeVip', false)
      this.formInline.vipGivePrice = null
    },
  },
}
</script>
<style lang="less">
.model-recharge-vip .price .ivu-input {
    padding: 10px 22px 10px 10px;
}
</style>


<style lang="less" scoped>
@import (reference) '~assets/less/variable.less';
  .model-recharge-vip{
    color: @gradeAshThree;
       .content{
        .leftName{
            vertical-align: top;
            line-height: 30px;
            height: 30px;
            overflow: hidden;
            margin: 20px 10px 0 20px;
            display: inline-block;
            text-align: justify;
            width: 50px;
            &::after{
              content:'';
              padding-left:100%;
              display: inline-block;

            }
        }
        .rightInput{
            display: inline-block;
            vertical-align: top;
            margin-top: 20px;
        }
        .input-price{
            position: relative;
            display: inline-block;
            vertical-align: top;
            margin-top: 20px;
            &::after{
            position: absolute;
            content:'元';
            display: inline-block;
            top:7px;
            right:10px;
            font-size: 12px;
            color: #737373;
          }
        }
        .value-price{
          position: relative;
          &::after{
            position: absolute;
            content:'元';
            display: inline-block;
            top:7px;
            right:10px;
            font-size: 12px;
            color: #737373;
          }
       } 
        
    }
    .bottom {
       height: 50px;
        .bottom-right {
          .button {
            // margin-top: 20px;  
            margin-right: 20px;
          }
       }
    }
  }
</style>

