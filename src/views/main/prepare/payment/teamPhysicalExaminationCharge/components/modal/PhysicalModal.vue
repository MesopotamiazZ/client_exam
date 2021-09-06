/**
* author      : yhy
* cteate      : 2018/02/23 
* description : 体检费用清单
*/
<template>
  <Modal v-model="PhysicalModal"
         class="physical-modal"
         :width='812'
         :transfer='false'
         :mask-closable="false"
         :transition-names="['']"
         :closable="false">
    <div slot="header">
      <alert-header :showInput='false'
                    :headerText="'体检费用清单'">
      </alert-header>
    </div>
    <div class="content"
          ref="content"
    :style="{height:contentHeight}">
      <div>
        <div class="leftName">单位体检号</div>
        <Input v-model="editData.unitName"
               class="rightInput"
               style="width: 122px"
               disabled/>
        <div class="leftName">单位名称</div>
        <Input v-model="editData.name"
               class="rightInput"
               style="width: 259px"
               disabled/>
        <div class="leftName">登记日期</div>
        <Input v-model="editData.date"
               class="rightInput"
               style="width: 122px"
               disabled/>
      </div>
      <div>
        <div class="leftName">订单总金额</div>
        <Input v-model="editData.orderAmount"
               class="rightInput value-price "
               style="width: 122px"
               disabled/>
        <div class="leftName">个人总金额</div>
        <Input v-model="editData.personTotal"
               class="rightInput value-price "
               style="width: 122px"
               disabled/>
        <div class="leftName">单位总金额</div>
        <Input v-model="editData.unitTotal"
               class="rightInput value-price "
               style="width: 122px"
               disabled/>
      </div>
      <div>
        <div class="leftName">已收金额</div>
        <Input v-model="editData.amountReceived"
               class="rightInput value-price "
               style="width: 122px"
               disabled/>
        <div class="leftName">待收金额</div>
        <Input v-model="editData.amountCollected"
               class="rightInput value-price "
               style="width: 122px"
               disabled/>
        <div class="leftName">实收金额</div>
        <Input v-model="editData.payAmount"
               class="rightInput value-price "
               style="width: 122px"
               disabled/>
      </div>
      <div class="content-table contentNoBg">
        <Table :columns="columns1"
               :data="data1"
               :height='120'></Table>
      </div>
      <div class="wrapper-test contentNoBg">
        <div class="header">
          <div class="com-tab"
               :class="{clickTab:isTab==='buttonAccount'}"
               @click="buttonAccount">组合项目</div>
          <div class="com-tab"
               :class="{clickTab:isTab==='buttonRefund'}"
               @click="buttonRefund">附加费</div>
        </div>
        <div class="fj-table" v-if="isTab==='buttonAccount'">
          <Table :columns="columns2" stripe :data="data2"></Table>
        </div>
        <div class="fj-table" v-else>
          <Table :columns="columns3" stripe :data="data3"></Table>
        </div>
      </div>
    </div>
    <div slot="footer">
      <div class="bottom">
        <div class="bottom-right">
          <Button type="primary"
                  class="button"
                  @click="printSure">打印</Button>
          <Button type="ghost"
                  class="button"
                  @click="cancel">取 消</Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import AlertHeaderCom from '@/views/main/prepare/components/AlertHeaderCom.vue'
import { mapState } from 'vuex'
export default {
  name: 'PhysicalModal',
  components: {
    AlertHeaderCom,
  },
  data() {
    return {
      editData: {
        unitName: 'BA201709',
        name: '超微半导体公司',
        date: '2017-12-12',
        orderAmount: 100000,
        personTotal: 500,
        unitTotal: 100000,
        amountReceived: 50000,
        amountCollected: 50000,
        payAmount: 100000,
      },
      contentHeight: '480px',
      isTab: 'buttonAccount',
      unitName: 'BA201709',
      columns1: [
        {
          title: '费用类型',
          key: 'fylx',
        },
        {
          title: '已收金额（元）',
          key: 'ysje',
        },
        {
          title: '待收金额（元）',
          key: 'dsje',
        },
        {
          title: '实收金额（元）',
          key: 'ssje',
        },
        {
          title: '已退金额（元）',
          key: 'ytje',
        },
        {
          title: '应退金额（元）',
          key: 'ytjee',
        },
      ],
      data1: [
        {
          fylx: '体检费',
          ysje: '3000.00',
          dsje: '1000.00',
          ssje: '10.00',
          ytje: '5.00',
          ytjee: '9999.00',
        },
        {
          fylx: '体检费',
          ysje: '3000.00',
          dsje: '1000.00',
          ssje: '10.00',
          ytje: '5.00',
          ytjee: '9999.00',
        },
        {
          fylx: '体检费',
          ysje: '3000.00',
          dsje: '1000.00',
          ssje: '10.00',
          ytje: '5.00',
          ytjee: '9999.00',
        },
        {
          fylx: '体检费',
          ysje: '3000.00',
          dsje: '1000.00',
          ssje: '10.00',
          ytje: '5.00',
          ytjee: '9999.00',
        },
        {
          fylx: '体检费',
          ysje: '3000.00',
          dsje: '1000.00',
          ssje: '10.00',
          ytje: '5.00',
          ytjee: '9999.00',
        },
        {
          fylx: '体检费',
          ysje: '3000.00',
          dsje: '1000.00',
          ssje: '10.00',
          ytje: '5.00',
          ytjee: '9999.00',
        },
        {
          fylx: '体检费',
          ysje: '3000.00',
          dsje: '1000.00',
          ssje: '10.00',
          ytje: '5.00',
          ytjee: '9999.00',
        },
        {
          fylx: '体检费',
          ysje: '3000.00',
          dsje: '1000.00',
          ssje: '10.00',
          ytje: '5.00',
          ytjee: '9999.00',
        },
      ],
      columns2: [
        {
          title: '体检号',
          width: 103,
          ellipsis: true,
          align: 'center',
          key: 'tjh',
        },
        {
          title: '姓名',
          width: 103,
          ellipsis: true,
          align: 'center',
          key: 'xm',
        },
        {
          title: '性别',
          width: 42,
          key: 'xb',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '年龄',
          width: 58,
          key: 'nl',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '登记日期',
          width: 96,
          key: 'djrq',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '体检套餐',
          width: 202,
          key: 'tjtc',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '体检套餐金额（元）',
          width: 136,
          key: 'tjtcje',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '待收金额（元）',
          width: 103,
          key: 'dsje',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '实收金额（元）',
          width: 103,
          key: 'ssje',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '单位支付比列',
          width: 110,
          key: 'dwzfbl',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '新增费用（元）',
          width: 103,
          key: 'xzfy',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '新增费用支付方',
          width: 120,
          key: 'xzfyzff',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '结算单号',
          width: 136,
          key: 'jsdh',
          ellipsis: true,
          align: 'center',
        },
      ],
      data2: [
        {
          tjh: '1801030056',
          xm: '王树彤',
          xb: '男',
          nl: '45',
          djrq: '2018-01-09',
          tjtc: '承晟集团员工入职体检',
          tjtcje: '4000.00',
          dsje: '6000.00',
          ssje: '60.00',
          dwzfbl: '1.0',
          xzfy: '800.00',
          xzfyzff: '单位支付',
          jsdh: '2017122500003',
        }, {
          tjh: '1801030057',
          xm: '张瑞',
          xb: '男',
          nl: '45',
          djrq: '2018-01-09',
          tjtc: '承晟集团员工入职体检',
          tjtcje: '4000.00',
          dsje: '6000.00',
          ssje: '60.00',
          dwzfbl: '1.0',
          xzfy: '800.00',
          xzfyzff: '单位支付',
          jsdh: '2017122500004',
        },
      ],
      columns3: [
        {
          title: '费用类别',
          ellipsis: true,
          align: 'center',
          key: 'fylb',
        },
        {
          title: '附加费名称',
          ellipsis: true,
          align: 'center',
          key: 'fjfmc',
        },
        {
          title: '待收金额（元）',
          key: 'dsje',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '实收金额（元）',
          key: 'ssje',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '实收比列',
          key: 'ssbl',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '实收优惠',
          key: 'ssyh',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '结算单号',
          key: 'jsdh',
          ellipsis: true,
          align: 'center',
        },
      ],
      data3: [
        {
          fylb: '耗材费',
          fjfmc: '早餐费',
          dsje: '10.00',
          ssje: '8.00',
          ssbl: '1.0',
          ssyh: '8.00',
          jsdh: '2017122500003',
        },
        {
          fylb: '耗材费',
          fjfmc: '针管费',
          dsje: '10.00',
          ssje: '8.00',
          ssbl: '1.0',
          ssyh: '8.00',
          jsdh: '2017122500003',
        },
      ],
    }
  },
  props: {
    PhysicalModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    printSure() {
      this.$emit('PhysicalModal')
    },
    cancel() {
      this.$emit('update:PhysicalModal', false)
    },
    // 结算单
    buttonAccount() {
      this.isTab = 'buttonAccount'
    },
    // 退款单
    buttonRefund() {
      this.isTab = 'buttonRefund'
    },
  },
  computed: {
    ...mapState(['windowHeight']),
    /* contentHeight() {
      if (this.windowHeight - 150 > 644) {
        return '646px'
      } else {
        return `${this.contentHeight - 270}px`
      }
    }, */
  },
  watch: {
    windowHeight(val) {
      if (val - 250 >= 644) {
        this.contentHeight = '646px'
      } else {
        this.contentHeight = val - 270 + 'px'
      }
    },
  },
}
</script>

<style lang="less">
.physical-modal {
  .fj-table  {
    .ivu-table-body {
      max-height: 240px;
    }
  }
 .content {
  overflow: auto
} 
.wrapper-test {
      margin: 20px 20px 0 20px;
      overflow: hidden;
    }
}
// .physical-modal {
//   .ivu-modal {
//     height: calc(~'100% - 40px');
//     .ivu-modal-content {
//       height: 100%;
//       .ivu-modal-body {
//         height: calc(~'100% - 120px');
//         .content {
//           // 弹窗中间内容部分
//           overflow: auto;
//           height: 100%;
//         }
//       }
//     }
//   }
// }
</style>

<style lang="less" scoped>
.physical-modal {
  height: 100%;
  .content {
    .leftName {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align: justify;
      width: 60px;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .rightName {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align: justify;
      width: 48px;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .rightInput {
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
        color: #737373;
      }
    }
    .content-table {
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 20px;
    }
    .com-tab {
      font-weight: bold;
      margin-left: 20px;
      display: inline-block;
      cursor: pointer;
      color: #737373;
      font-size: 14px;
      line-height: 48px;
    }
    .clickTab {
      color: #008cee;
      border-bottom: 2px solid #008cee;
    }
  }
  .bottom {
    height: 70px;
    .bottom-right {
      .button {
        margin-top: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
