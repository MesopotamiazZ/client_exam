/*
*单位收费-弹窗退款单
*@author ljl
*@date 2018/2/23
*/
<template>
  <div v-if="modelReOrder">
    <Modal v-model="modelReOrder"  class="model-refund-order"
      :width='578'
      :transfer='false'
      :mask-closable="false"
      :transition-names="['']"
      :closable="false">
      <div slot="header">
        <alert-header 
          :showInput='false'
          :headerText="'退款单'">
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
          </div>
          <div>
            <div class="left-name">退款方式:</div>
            <RadioGroup v-model="reOrder.reStyle" class="marginT20" style="line-height:30px">
              <Radio label="退还现金"></Radio>
              <Radio label="退至单位账户"></Radio>
            </RadioGroup>
        </div>
        <div class="marginB20">
            <div class="left-name">备注</div>
            <Input v-model="reOrder.remark" type="textarea" class="right-input"  style="width: 456px"/>
        </div>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Button type="ghost" class="button fr" @click="cancel">取 消</Button>
            <Button type="primary" class="button fr" @click="sure">完 成</Button>
            <Checkbox v-model="reOrder.print" :true-value='1' :false-value='0' class="marginR20 fr" style="line-height:30px">打印退款凭条</Checkbox>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'refund-order',
  data () {
    return {
      reOrder: {
        unitName: '',
        unitMoney: '2233.54',
        reStyle: '退还现金',
        print: 1,
      },

    }
  },
  props: {
    modelReOrder: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    sure() {
      this.$emit('sure')
      this.reOrder = {
        unitName: '',
        unitMoney: '2233.54',
        reStyle: '退还现金',
        print: 1,
        remark: '',
      }
    },
    cancel() {
      this.$emit('cancel')
      this.reOrder = {
        unitName: '',
        unitMoney: '223dc3.54',
        reStyle: '退还现金',
        print: 1,
        remark: '',
      }
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
        // .input-price{
        //     position: relative;
        //     display: inline-block;
        //     vertical-align: top;
        //     margin-top: 20px;
        //     &::after{
        //     position: absolute;
        //     content:'元';
        //     display: inline-block;
        //     top:7px;
        //     right:10px;
        //     font-size: 12px;
        //     color: @gradeAshThree;
        //   }
        // }
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
            // margin-top: 20px;  
            margin-right: 20px;
          }
       }
    }
  }
</style>

