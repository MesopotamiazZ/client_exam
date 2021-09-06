/*
*前台登记-提示
*@author ljl
*@date 2018/2/24
*/
<template>
    <Modal v-model="modelts"  class="model-ts"
           :width='869'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <alert-header 
          :showInput='false'
          :headerText="'进行中订单'">
        </alert-header>
      </div>
      <div class="content marginB20">
        <p class="content-top">请确认是否需要将备单信息加入到进行中订单：</p>
        <div>
          <Table :columns="columns" :data="data" stripe ellipsis class="table-in"></Table>
        </div>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Button type="primary" class="button fr" @click="cancel">重新生成</Button>
            <Button type="primary" class="button fr" @click="sure">加 入</Button>
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
          title: '单位名称',
          key: 'pre',
          width: '260px',
          render: (h, params) => {
            let val = params.row.pre
            if (val) {
              return h(
                  'span',
                {
                  domProps: {
                    title: val,
                  },
                }, val)
            }
          },
        },
        {
          title: '预约日期',
          key: 'time',
          width: '94px',
          render: (h, params) => {
            let val = params.row.time
            if (val) {
              return h(
                  'span',
                {
                  domProps: {
                    title: val,
                  },
                }, val)
            }
          },
        },
        {
          title: '登记日期',
          key: 'registerTime',
          width: '94px',
          render: (h, params) => {
            let val = params.row.registerTime
            if (val) {
              return h(
                  'span',
                {
                  domProps: {
                    title: val,
                  },
                }, val)
            }
          },
        },
        {
          title: '结算方式',
          key: 'play',
          width: '107px',
          render: (h, params) => {
            let val = params.row.play
            if (val) {
              return h(
                  'span',
                {
                  domProps: {
                    title: val,
                  },
                }, val)
            }
          },
        },
        {
          title: '预约人数（人）',
          key: 'num',
          width: '107px',
          render: (h, params) => {
            let val = params.row.num
            if (val) {
              return h(
                  'span',
                {
                  domProps: {
                    title: val,
                  },
                }, val)
            }
          },
        },
        {
          title: '状态',
          key: 'state',
          width: '66px',
          render: (h, params) => {
            let val = params.row.state
            if (val) {
              return h(
                  'span',
                {
                  domProps: {
                    title: val,
                  },
                }, val)
            }
          },
        },
        {
          title: '备注',
          key: 'remark',
          render: (h, params) => {
            let val = params.row.remark
            if (val) {
              return h(
                  'remark-in-table',
                {
                  props: {
                    text: val,
                  },
                  domProps: {
                    title: val,
                  },
                }
                )
            }
            return ''
          },
        },
      ],
      data: [
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付', remark: '加入备单',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付', remark: '加入备单',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付', remark: '加入备单',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付', remark: '加入备单',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付', remark: '加入备单',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付', remark: '加入备单',
        },
        {
          time: '2018-03-02', pre: '成都市小蓝科技', registerTime: '2018-03-02', play: '现金', num: 299, state: '已支付',
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
        color: #111111;
      } 
      >div{
        margin:0 20px;
        border-radius: 8px;
        overflow: hidden;
        border:1px solid #d9d9d9;
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

