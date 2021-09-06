/**
* author      : yhy
* cteate      : 2018/01/11 09:22
* description : 升级VIP
*/
<template>
    <!-- 升级vip -->
    <div v-if='modelRechargeVip'>
      <Modal v-model="modelRechargeVip"  class="model-recharge-vip"
            :width='433'
            :transfer='false'
            :mask-closable="false"
            :transition-names="['']"
            :closable="false">
        <div slot="header">
          <alert-header 
            :showInput='false'
            headerText="升级VIP">
          </alert-header>
        </div>
        <div class="content">
          <div>
              <div class="leftName">单位名称</div>
              <Input v-model="unitName" class="rightInput"  style="width: 330px" disabled/>
          </div>
          <div>
              <div class="leftName">账户编号</div>
              <Input v-model="vipNumber" class="rightInput" style="width: 122px" disabled/>
              <div class="leftName">账户金额</div>
              <Input v-model="vipResiduePrice" class="rightInput value-price price" style="width: 120px" disabled/>
          </div>
          <Form :model="formInline" :rules="ruleInline" ref='rechargeVip'>       
            <div class="leftName">充值金额</div>
            <FormItem prop="vipRechargePrice" style="width: 122px;display:inline-block;">
              <z-input type="text" v-model="formInline.vipRechargePrice" class='input-price price'></z-input>
            </FormItem>
            <div class="leftName">VIP折扣</div>
            <FormItem prop="vipGivePrice" style="width: 120px; display:inline-block;">
              <z-input class="marginT20" type="number" v-model="formInline.vipGivePrice"></z-input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <div class="bottom">
            <div class="bottom-right">
              <Button type="primary" class="button" @click="rechargeVipSure('rechargeVip')">确认充值</Button>
              <Button type="ghost" class="button" @click="rechargeCancel">取 消</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
</template>

<script>
export default {
  name: 'updataVipModal',
  data () {
    const vipGivePriceRule = (rule, val, callback) => {
      let data = parseFloat(val)
      if (data !== '') {
        // console.log(data)
        // console.log(val)
        if (val > 1 || val < 0) {
          callback(new Error('输入小于1的2位小数'))
        } else {
          if (val.length > 4) {
            callback(new Error('输入小于1的2位小数'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    }
    return {
      unitName: '成都市超有爱科技信息技术有限公司', // 单位名称
      vipNumber: 'GB89289288',  // 账户编号
      vipResiduePrice: '50000000.00', // 账户金额
      formInline: {
        vipRechargePrice: '',  // 充值金额
        vipGivePrice: '',      // vip折扣
      },
      ruleInline: {
        vipRechargePrice: [{}],
        vipGivePrice: [{ // VIP折扣
          trigger: 'blur',
          validator: vipGivePriceRule,
        }],
      },
    }
  },
  props: {
    modelRechargeVip: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    modelRechargeVip(val) {
      if (!val) {
        this.initClear()
      }
    },
  },
  methods: {
    async rechargeVipSure(name) {
      if (await this.$refs[name].validate()) {
        this.$emit('rechargeVipSure', this.formInline)
      }
    },
    rechargeCancel() {
      this.$emit('update:modelRechargeVip', false)
    },
    initClear () {
      this.formInline.vipRechargePrice = ''
      this.formInline.vipGivePrice = ''
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
  .model-recharge-vip{
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
         .symbol-price{
            position: relative;
            display: inline-block;
            vertical-align: top;
            margin-top: 20px;
            &::after{
            position: absolute;
            content:'%';
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

