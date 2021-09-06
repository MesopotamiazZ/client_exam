/*
*单位收费-弹窗退款单明细
*@author ljl
*@date 2018/2/23
*/
<template>
    <Modal v-model="modelRefundOrder"  class="model-refund-order"
           :width='578'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <alert-header 
          :showInput='false'
          :headerText="'退款单明细'">
        </alert-header>
      </div>
      <div class="content">
        <div>
            <div class="left-name">单位名称</div>
            <Input v-model="reOrder.unitName" class="right-input"  style="width: 456px" disabled/>
        </div>
         <div>
            <div class="left-name">单位体检号</div>
            <Input v-model="reOrder.unitNumber" class="right-input" style="width: 180px" disabled/>
            <div class="right-name">单位总金额</div>
            <Input v-model="reOrder.unitMoney" class="right-input value-price price" style="width: 180px;" disabled/>
            <div class="left-name">单位预付金额</div>
            <Input v-model="reOrder.unitOrderMoney" class="right-input value-price price" style="width: 180px" disabled/>
            <div class="right-name">应退金额</div>
            <Input v-model="reOrder.reMoney" class="right-input value-price price" style="width: 180px" disabled/>
            <div class="left-name">退款方式</div>
            <Input v-model="reOrder.reStyle" class="right-input" style="width: 180px" disabled/>
        </div>
        <div>
            <div class="left-name">备注</div>
            <Input v-model="reOrder.remark" type="textarea" class="right-input"  style="width: 456px" disabled/>
        </div>
        <div class="marginT20 marginB20 marginL20">
          <span style="margin-right:20px;color: #737373">
            退款人：hahahahaha
          </span>
          <span style="color: #737373">
            退款时间：csdfcsdcfs
          </span>
        </div>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Button type="ghost" class="button" @click="print">打印退款凭条</Button>
            <Button type="primary" class="button" @click="sure">完 成</Button>
            <Button type="ghost" class="button" @click="cancel">取 消</Button>
          </div>
        </div>
      </div>
    </Modal>
</template>

<script>
export default {
  name: 'refund-order',
  data () {
    return {
      reOrder: {
        unitName: '',
        unitMoney: '2233.54',
      },

    }
  },
  props: {
    modelRefundOrder: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    sure() {
      this.$emit('sure')
    },
    cancel() {
      this.$emit('cancel')
    },
    print() {
      this.$emit('print')
    },
  },
}
</script>
<style lang="less">
.model-refund-order .price .ivu-input {
    padding: 10px 22px 10px 10px;
    font-weight:bold;
}
</style>


<style lang="less" scoped>
@import (reference) '~assets/less/variable.less';
  .model-refund-order{
       .content{
        .left-name{
            vertical-align: top;
            line-height: 30px;
            height: 30px;
            overflow: hidden;
            margin: 20px 10px 0 20px;
            display: inline-block;
            text-align: justify;
            width: 72px;
            color:@gradeAshThree;
            &::after{
              content:'';
              padding-left:100%;
              display: inline-block;

            }
        }
        .right-name{
            vertical-align: top;
            line-height: 30px;
            height: 30px;
            overflow: hidden;
            margin: 20px 10px 0 20px;
            display: inline-block;
            text-align: justify;
            width: 60px;
            color:@gradeAshThree;
            &::after{
              content:'';
              padding-left:100%;
              display: inline-block;

            }
        }
        .right-input{
            display: inline-block;
            vertical-align: top;
            margin-top: 20px;
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
            color: @gradeAshThree;
          }
       } 
        
    }
    .bottom {
       height: 50px;
        .bottom-right {
          .button {
            margin-right: 20px;
          }
       }
    }
  }
</style>

