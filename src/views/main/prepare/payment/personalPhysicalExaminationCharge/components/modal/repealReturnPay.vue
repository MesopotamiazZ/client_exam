/*
*个人结算-弹窗撤销退费
*@author ljl
*@date 2018/2/26
*/
<template>
  <Modal v-model="modelRepealReturnPay"
         class="model-repeal-return"
         :width='818'
         :transfer='false'
         :mask-closable="false"
         :transition-names="['']"
         :closable="false">
    <div slot="header">
      <alert-header :showInput='false'
                    :headerText="'撤销退费'">
      </alert-header>
    </div>
    <div class="content">
      <div class="content-top">
        <div class="left-name fl"
             style="width: 48px;margin-left:0px">体检号</div>
        <Input v-model="reOrder.self_pe_sn"
               class="right-input fl"
               style="width: 120px"
               disabled/>
        <div class="left-name fl"
             style="width: 48px;">姓名</div>
        <Input v-model="reOrder.self_name"
               class="right-input fl"
               style="width: 120px"
               disabled/>
        <div class="left-name fl"
             style="width: 48px;">性别</div>
        <Input v-model="reOrder.self_sex"
               class="right-input fl"
               style="width: 120px"
               disabled/>
        <div class="left-name fl"
             style="width: 48px;">登记日期</div>
        <Input v-model="reOrder.self_date"
               class="right-input fl"
               style="width: 120px"
               disabled/>
        <div class="clearBoth"></div>
      </div>
      <div class="return-info">退费信息</div>
      <div>
        <div class="left-name fl">已选退费金额</div>
        <Input v-model="reOrder.self_chooseJe"
               class="right-input fl value-price price"
               style="width: 120px"
               disabled/>
        <!-- <div class="left-name fl" style="width:48px;">退费比例</div> -->
        <!-- <Input v-model="reOrder.unitMoney"
               class="right-input value-precent fl"
               style="width: 96px;"
               disabled/> -->
        <!-- <div class="left-name fl"
             style="width: 60px">退费手续费</div> -->
        <!-- <Input v-model="reOrder.unitOrderMoney"
               class="right-input value-price price fl"
               style="width: 108px"
               disabled/> -->
        <div class="left-name fl" style="width: 48px">应退金额</div>
        <Input v-model="reOrder.reMoney"
               class="right-input value-price fl"
               style="width: 120px"
               disabled/>
        <div class="left-name value-precent fl">应退比例</div>
        <Input v-model="reOrder.ratio"
               class="right-input fl"
               style="width: 120px"
               disabled/>
        <div class="clearBoth"></div>
      </div>
      <div style="margin-bottom:20px">
        <!-- <div class="left-name fl" style="width:72px;">支付方式</div>
        <Input v-model="reOrder.unitOrderMoney"
               class="right-input fl"
               style="width: 294px"
               disabled/>
        <div class="right-name fl" style="width:60px;">结算账户</div>
        <Input v-model="reOrder.reMoney"
               class="right-input fl"
               style="width: 108px"
               disabled/>
        <div class="left-name fl" style="width:48px;">账户余额</div>
        <Input v-model="reOrder.account"
               class="right-input fl value-price price"
               style="width: 124px"
               disabled/> -->
        <div class="left-name fl" style="width:72px;">退费原因</div>
        <Input v-model="reOrder.remark"
               class="right-input fl"
               style="width: 318px"
               disabled/>
        <div class="clearBoth"></div>
      </div>
      <div class="return-info">退费明细</div>
      <div class="tfmx" style="overflow:hidden;">
        <ul class="table-choose marginL20">
            <li v-for='(data,key,index) in datas' class="curPointer" @click="addClassFun(data.name,index)" :class='{clickChange:data.name===chooseIndex}'>
              {{data.data}}
            </li>
        </ul>
        <div style="width: 100%;overflow: auto;" v-if="chooseIndex==='zhxm'">
          <Table
            stripe
            :columns='columns1'
            :data='data1'>
          </Table>
        </div>
        <div style="width: 100%;overflow: auto;" v-if="chooseIndex==='add'">
          <Table
            stripe
            :columns='columns2'
            :data='data2'>
          </Table>
        </div>
      </div>
      <div class="bottom-money">
         <div>待收金额合计：<span>0.00 </span>元</div>
         <div>实收金额合计：<span>210.00 </span>元</div>
         <div>应退金额合计：<span>210.00 </span>元</div>
       </div>
    </div>
    <div slot="footer">
      <div class="bottom">
        <div class="bottom-time">
         <div class="fl">申请人：王思佳</div>
         <div class="fl">申请时间：2017-12-12  12：00</div>
       </div>
        <div class="bottom-right">
          <Button type="ghost"
                  class="button fr"
                  @click="cancel">取 消</Button>
          <Button type="primary"
                  class="button fr"
                  @click="sure">撤 销</Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'return-pay',
  data() {
    return {
      chooseIndex: 'zhxm',
      reOrder: {
        self_pe_sn: 'BA20170908008',
        self_name: '王树彤',
        self_sex: '女',
        self_date: '2018-01-09',
        self_chooseJe: 2000.00,
        reMoney: 100.00,
        ratio: 0.05,
        remark: '',
        // reStyle: '',s
        // unitName: '',
        // unitMoney: '14',
        reStyle: '现金',
        print: 1,
      },
      datas: {
        data1: {
          data: '组合项目',
          name: 'zhxm',
        },
        data2: {
          data: '附加费',
          name: 'add',
        },
      },
      columns1: [
        {
          title: '项目类别',
          key: 'type',
          width: '120px',
          ellipsis: true,
        },
        {
          title: '项目名称',
          key: 'name',
          width: '256px',
          ellipsis: true,
        },
        {
          title: '待收金额（元）',
          key: 'dsamount',
          ellipsis: true,
        },
        {
          title: '实收金额（元）',
          key: 'ssamount',
          ellipsis: true,
        },
        {
          title: '应退金额（元）',
          key: 'stamount',
          ellipsis: true,
        },
      ],
      data1: [
        {
          type: '功能项目',
          name: '血常规',
          dsamount: '0.00',
          ssamount: '200.00',
          stamount: '200.00',
        },
      ],
      columns2: [
        {
          title: '费用类别',
          key: 'type',
          width: '120px',
          ellipsis: true,
        },
        {
          title: '附加费名称',
          key: 'name',
          width: '256px',
          ellipsis: true,
        },
        {
          title: '待收金额（元）',
          key: 'dsamount',
          ellipsis: true,
        },
        {
          title: '实收金额（元）',
          key: 'ssamount',
          ellipsis: true,
        },
        {
          title: '应退金额（元）',
          key: 'stamount',
          ellipsis: true,
        },
      ],
      data2: [
        {
          type: '耗材费',
          name: '针管费',
          dsamount: '0.00',
          ssamount: '10.00',
          stamount: '10.00',
        },
      ],
    }
  },
  props: {
    modelRepealReturnPay: {
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
    addClassFun(name, index) {
      this.chooseIndex = name
    },
  },
}
</script>
<style lang="less">
.model-repeal-return .price .ivu-input {
  padding: 10px 22px 10px 10px;
  font-weight: bold;
}
</style>


<style lang="less">
@import (reference) '~assets/less/variable.less';
.model-repeal-return {
  .ivu-modal {
    height: calc(~'100% - 30px');
    max-height: 828px;
    .ivu-modal-content {
      height: 100%;
      .ivu-modal-body {
        height: calc(~'100% - 120px');
        .content { // 弹窗中间内容部分
          overflow: auto;
          height: 100%;
        }
      }
    }
  }
  .content {
    .tfmx{
      width:calc(~'100% - 40px');
      margin:20px;
      border: 1px solid @gradeAshFive;
      border-radius: @borderRadiuBig;
      .table-choose{
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        color: @gradeAshOne;
        letter-spacing: 0.04px;
        >li{
          margin-right: 25px;
          float: left;
          color:@gradeAshThree;
          // border-bottom:3px solid red;
          border-bottom:3px solid transparent;
        }
        li:hover{
          color:@gradeBlueOne;
          font-weight: bold;
        }
        .clickChange{
          color:@gradeBlueOne;
          font-weight: bold;
          border-bottom:3px solid @gradeBlueOne;
          >span{
            font-weight: normal;
            background: #83CB54;
          }
        }
      }
      .ivu-table-body{
        height:200px;
        overflow-y:auto;
        overflow-x:hidden;
      }
    }
    .content-top{
      margin: 0px 20px 0px 20px;
      padding-bottom:20px;
    }
    .return-info{
      padding:10px 0 0 20px;
      font-weight:900;
    }
    .left-name {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
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
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align: justify;
      width: 60px;
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
      margin-top: 20px;
    }
    .value-price {
      position: relative;
      &::after {
        position: absolute;
        content: '元';
        display: inline-block;
        top: 7px;
        right: 10px;
        font-size: 12px;
        color: @gradeAshThree;
      }
    }
    .value-precent {
      .ivu-input{
        font-weight: bold;
      }
    }
    .bottom-money{
      display: flex;
       div{
        color:@gradeAshThree;
        font-size:14px;
        margin-left:20px;
        span{
          color:@tsIcon;
          font-size: 18px;
          font-weight:bold;
        }
      }
    }
  }
  .bottom {
    padding-top:20px;
    .bottom-time{
      float: left;
      color:@gradeAshThree;
      div{
        margin-left:20px;
        line-height:30px;
      }
    }
    .bottom-right {
      .button {
        margin-right: 20px;
      }
    }
  }
}
</style>

