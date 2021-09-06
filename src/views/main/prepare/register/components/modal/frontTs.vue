/*
*前台登记-提示
*@author ljl
*@date 2018/2/24
*/
<template>
    <Modal v-model="modelts"  class="model-ts"
           :width='612'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <alert-header 
          :showInput='false'
          :headerText="'提示'">
        </alert-header>
      </div>
      <div class="content marginB20">
        <p class="content-top">该公司已存在进行中的体检订单，是否需要把预约信息加入到系统订单中？</p>
        <Table :columns="columns" :data="data" stripe ellipsis class="table-in"></Table>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Button type="ghost" class="button fr" @click="cancel">重新生成</Button>
            <Button type="primary" class="button fr" @click="sure">确 定</Button>
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
      choose: null,
      columns: [
        {
          title: '选中',
          key: 'choose',
          width: '50px',
          render: (h, params) => {
            return h('div', [
              h('Radio', {
                props: {
                  value: this.choose === params.index,
                },
                nativeOn: {
                  click: () => {
                    this.choose = params.index
                  },
                },
              }),
            ])
          },
        },
        {
          title: '预约日期',
          key: 'time',
          width: '106px',
        },
        {
          title: '个人支付比例',
          key: 'pre',
          width: '99px',
        },
        {
          title: '预付金额',
          key: 'money',
          width: '92px',
        },
        {
          title: '结算方式',
          key: 'play',
          width: '105px',
        },
        {
          title: '预约人数',
          key: 'num',
        },
        {
          title: '状态',
          key: 'state',
        },
      ],
      data: [
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '1212121', pre: '12', money: '100元', play: '现金', num: 299, state: '已支付',
        },
      ],
    }
  },
  props: {
    modelts: {
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
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
  .model-ts{
    .content{
      .content-top{
        height:50px;
        line-height:50px;
        padding-left:20px;
        font-size:14px;
        letter-spacing:0.04px;
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
    .ivu-radio-wrapper{
      margin-right:0px;
    }
    .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
        background-color: #f2f7ff;
    }
    .ivu-table-wrapper .ivu-table-body{
      max-height:240px;
      overflow-y: auto;
      overflow-x: hidden!important;
    }
  }
</style>

