/**
* author      : yhy jyl
* cteate      : 2018/02/26 
* description : 体检费用清单
*/
<template>
  <Modal v-model="AccountModal"
         class="account-modal"
         :width='812'
         :transfer='false'
         :mask-closable="false"
         :transition-names="['']"
         :closable="false">
    <div slot="header">
      <alert-header :showInput='false' :headerText="'体检费用清单'">
      </alert-header>
    </div>
    <div class="content" :style="{height:contentHeight}">
      <div class="item">
        <span class="shortName">体检号</span>
        <Input v-model="editData.unitName"
               class="rightInput"
               disabled/>
        <span class="shortName">姓名</span>
        <Input v-model="editData.name"
               class="rightInput"
               disabled/>
        <span class="shortName">性别</span>
        <Input v-model="editData.sex"
               class="rightInput"
               disabled/>
        <span class="shortName">登记日期</span>
        <Input v-model="editData.date"
               class="rightInput"
               disabled/>         
      </div>
      <div class="item">
        <span class="shortName">订单金额</span>
        <Input v-model="editData.orderAmount"
               class="rightInput value-price "
               disabled/>
        <span class="shortName"
             style="width:48px">已收金额</span>
        <Input v-model="editData.amountReceived"
               class="rightInput value-price "
               disabled/>
        <span class="shortName"
             style="width:48px">待收金额</span>
        <Input v-model="editData.amountCollected"
               class="rightInput value-price "
               disabled/>
        <span class="shortName"
             style="width:48px">应收金额</span>
        <Input v-model="editData.amountReceivable"
               class="rightInput value-price "
               disabled/>
      </div>
      <div class="item">
        <span class="shortName"
             style="width:48px">已退金额</span>
        <Input v-model="editData.retiredAmount"
               class="rightInput value-price "
               disabled/>
        <span class="shortName"
             style="width:48px">应退金额</span>
        <Input v-model="editData.refundableAmount"
               class="rightInput value-price "
               disabled/>
      </div>
      <div class="normal-list contentNoBg">
        <div class="normal-table"
             ref="normalTable"
             style="height:331px;">
          <Table stripe
                  height='120'
                 :columns="columns1"
                 :data="data1"
                 script='true'></Table>
        </div>
      </div>
      <!-- <div class="complete-list contentBg"
           v-if="isComplete">
        <div class="complete-header">
          <alert-header-com :titleName="'处方费费用明细'"
                            @closeModal='closeComplete'></alert-header-com>
        </div>
        <div class="complete-table"
             ref="completeTable">
          <Table stripe
                 :columns="columns2"
                 :data="data1"
                 :height='tableHeightTwo'
                 script='true'></Table>
        </div>
      </div> -->
      <!-- <div class="compound-project contentBg"
           v-if="isCompound">
        <div class="compound-header">
          <alert-header-com :titleName="'体检费费用明细'"
                            @closeModal='closeCompound'></alert-header-com>
        </div>
        <div class="compound-table">
          <Table stripe
                 :columns="columns3"
                 :data="data1"
                 :height='tableHeightTwo'
                 script='true'></Table>
        </div>
      </div> -->
      <!-- <div class="unnit-charge contentBg"
           v-if="isUnnit">
        <div class="unnit-header">
          <alert-header-com :titleName="'附加费费用明细'"
                            @closeModal='closeUnnit'></alert-header-com>
        </div>
        <div class="unnit-table">
           <Table stripe
                 :columns="columns4"
                 :data="data1"
                 :height='tableHeightOne'
                 script='true'></Table>
        </div>
      </div> -->
      <div class="contentNoBg tableContent">
        <self-tab :tab='headerData' @tab-change='tabChange'></self-tab>
        <!-- <ul class="tableHeader">
          <li v-for="(item,index) in headerData"
           :class="showTableHeaderClass === index?'showTableHeader':''"
           @click="showTableHeader(item)">{{item.label}}</li>
        </ul> -->
        <div class="unnit-table" >
          <Table v-if="showTableHeaderClass === 0" stripe :columns="columns4" :data="data2" height='280'></Table>
          <Table v-if="showTableHeaderClass === 1" stripe :columns="columns5" :data="data3" height='280'></Table>
        </div>
        <!-- <div class="unnit-table" v-else>
           
        </div> -->
      </div>
    </div>
    <div slot="footer">
      <div class="bottom">
        <div class="bottom-right">
          <Button type="primary"
                  class="button"
                  @click="printSure">打 印</Button>
          <Button type="ghost"
                  class="button"
                  @click="cancel">取 消</Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'vuex'
import AlertHeaderCom from '@/views/main/prepare/components/AlertHeaderCom.vue'
import selfTab from '@/components/tab/tab'
export default {
  name: 'AccountModalPerson',
  components: {
    AlertHeaderCom,
    selfTab,
  },
  data() {
    return {
      contentHeight: '480px',
      headerData: [
        {
          title: '组合项目',
          index: 0,
        },
        {
          title: '附加费',
          index: 1,
        },
      ],
      showTableHeaderClass: 0,
      tableHeightOne: 0,
      tableHeightTwo: 0,
      editData: {
        unitName: 'BA201709',
        name: '贾思明',
        sex: '男',
        date: '2018-3-14',
        orderAmount: 100000,
        amountReceived: 50000,
        amountCollected: 50000,
        amountReceivable: 100000,
        retiredAmount: 0,
        refundableAmount: 0,
      },
      isComplete: true,
      isCompound: true,
      isUnnit: true,
      columns1: [
        {
          title: '费用类型',
          key: 'name',
          width: 178,
          ellipsis: true,
        },
        {
          title: '已收金额（元）',
          key: 'self_ys',
          width: 119,
          ellipsis: true,
        },
        {
          title: '待收金额（元）',
          key: 'self_ds',
          width: 116,
          ellipsis: true,
        },
        {
          title: '实收金额（元）',
          key: 'self_ss',
          width: 119,
          ellipsis: true,
        },
        {
          title: '已退金额（元）',
          key: 'self_yittui',
          width: 119,
          ellipsis: true,
        },
        {
          title: '应退金额（元）',
          key: 'self_yingtui',
          ellipsis: true,
        },
      ],
      // columns2: [
      //   {
      //     title: '药品名称',
      //     key: 'name',
      //   },
      //   {
      //     title: '数量',
      //     key: 'age',
      //   },
      //   {
      //     title: '应收单价（元）',
      //     key: 'age',
      //   },
      //   {
      //     title: '实收单价（元）',
      //     key: 'age',
      //   },
      //   {
      //     title: '实收比列（%）',
      //     key: 'age',
      //   },
      //   {
      //     title: '应收金额（元）',
      //     key: 'age',
      //   },
      //   {
      //     title: '优惠金额（元）',
      //     key: 'age',
      //   },
      //   {
      //     title: '实收金额（元）',
      //     key: 'age',
      //   },
      // ],
      // columns3: [
      //   {
      //     title: '项目类型',
      //     key: 'name',
      //   },
      //   {
      //     title: '项目名称',
      //     key: 'age',
      //   },
      //   {
      //     title: '应收单价（元）',
      //     key: 'age',
      //   },
      //   {
      //     title: '实收单价（元）',
      //     key: 'age',
      //   },
      //   {
      //     title: '实收比列（%）',
      //     key: 'age',
      //   },
      //   {
      //     title: '应收金额（元）',
      //     key: 'age',
      //   },
      //   {
      //     title: '状态',
      //     key: 'age',
      //   },
      // ],
      columns4: [
        {
          title: '项目类型',
          key: 'self_name',
          ellipsis: true,
          width: 120,
        },
        {
          title: '项目名称',
          key: 'self_type',
          ellipsis: true,
          width: 178,
        },
        {
          title: '待收金额（元）',
          key: 'self_ds',
          ellipsis: true,
          width: 103,
        },
        {
          title: '实收金额（元）',
          key: 'self_ss',
          ellipsis: true,
          width: 103,
        },
        {
          title: '实收比例',
          key: 'self_ssbl',
          ellipsis: true,
          width: 74,
        },
        {
          title: '实收优惠（元）',
          key: 'self_ssyh',
          ellipsis: true,
          width: 103,
        },
        {
          title: '状态',
          key: 'self_statu',
          ellipsis: true,
          width: 91,
        },
        {
          title: '结算单号',
          key: 'self_dh',
          ellipsis: true,
          width: 136,
        },
      ],
      columns5: [
        {
          title: '费用类别',
          key: 'self_type',
          ellipsis: true,
          width: 120,
        },
        {
          title: '附加费名称',
          key: 'self_name',
          ellipsis: true,
          width: 178,
        },
        {
          title: '待收金额（元）',
          key: 'self_ds',
          ellipsis: true,
          width: 103,
        },
        {
          title: '实收金额（元）',
          key: 'self_ss',
          ellipsis: true,
          width: 103,
        },
        {
          title: '实收比例',
          key: 'self_ssbl',
          ellipsis: true,
          width: 74,
        },
        {
          title: '实收优惠（元）',
          key: 'self_ssyh',
          ellipsis: true,
          width: 103,
        },
        {
          title: '状态',
          key: 'self_statu',
          ellipsis: true,
          width: 91,
        },
        {
          title: '结算单号',
          key: 'self_dh',
          ellipsis: true,
          width: 136,
        },
      ],
      data1: [
        {
          name: '体检费',
          self_ys: 3000.00,
          self_ds: 3000.00,
          self_ss: 3000.00,
          self_yittui: 0,
          self_yingtui: 0,
        }, {
          name: '附加费',
          self_ys: 200.00,
          self_ds: 150.00,
          self_ss: 50.00,
          self_yittui: 0,
          self_yingtui: 0,
        },
      ],
      data2: [
        {
          self_name: '检查项目',
          self_type: '一般检查',
          self_ds: 80.00,
          self_ss: 48.00,
          self_ssbl: 0.6,
          self_ssyh: 0,
          self_statu: '已收费',
          self_dh: '2017122500003',
        }, {
          self_name: '功能项目',
          self_type: '心电图',
          self_ds: 200.00,
          self_ss: 200.00,
          self_ssbl: 1,
          self_ssyh: 0,
          self_statu: '已收费',
          self_dh: '2017122500004',
        }, {
          self_name: '功能项目',
          self_type: '血常规',
          self_ds: 100.00,
          self_ss: 100.00,
          self_ssbl: 1,
          self_ssyh: 0,
          self_statu: '已收费',
          self_dh: '2017122500005',
        },
      ],
      data3: [
        {
          self_type: '耗材费',
          self_name: '针管费',
          self_ds: 0.00,
          self_ss: 10.00,
          self_ssbl: 1,
          self_ssyh: 0,
          self_statu: '已收费',
          self_dh: '2017122500003',
        },
      ],
    }
  },
  props: {
    AccountModal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['windowHeight']),
  },
  methods: {
    tabChange (data, index) { // tab切换
      this.showTableHeaderClass = index
    },
    // showTableHeader(data) {
    //   this.showTableHeaderClass = data.index
    // },
    printSure() {
      this.$emit('AccountModal')
    },
    cancel() {
      this.$parent.$data.accountModal.show = false
      this.showTableHeaderClass = 0
    },
    closeComplete() {
      this.isComplete = false
    },

    closeCompound() {
      this.isCompound = false
    },

    closeUnnit() {
      this.isUnnit = false
    },
    async resetClose() {
      await this.$nextTick()
      this.isComplete = true
      this.isCompound = true
      this.isUnnit = true
      this.tableHeightOne = this.$refs.normalTable.offsetHeight
      console.log('resetClose', this.tableHeightOne)
      this.tableHeightTwo = this.$refs.completeTable.offsetHeight
    },
  },
  watch: {
    windowHeight(val) {
      /* this.tableHeightOne = this.$refs.normalTable.offsetHeight */
      if (val - 250 > 660) {
        this.contentHeight = '660px'
      } else {
        this.contentHeight = `${val - 270}px`
      }
      /* console.log('watch', this.tableHeightOne) */
      /* this.tableHeightTwo = this.$refs.completeTable.offsetHeight */
    },
  },
}
</script>

<style lang="less">
.account-modal {
  .ivu-modal {
    .ivu-modal-content {
      .ivu-modal-body {
        .content {
          // 弹窗中间内容部分
          overflow: auto;
          height: 100%;
        }
      }
    }
  }
}
</style>

<style lang="less" >
.account-modal {
  .content {
    .item {
      display:flex;
    }
    .tableContent {
      margin-top: 17px;
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: 20px;
      max-height: 331px;
      overflow: hidden;
      .unnit-table {
        // max-height: 283px;
        overflow: hidden;
          .ivu-table-body {
            // max-height: 244px;
          }
          .ivu-table-body::-webkit-scrollbar {
            // height: 12px;
          }
      }
      
    }
    .leftName {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align: justify;
      width: 36px;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .shortName {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align-last:justify;
      width:48px;
    }
    .rightName {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align: justify;
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
      width: 120px;
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
    .tableHeader {
      height:50px;
      margin-left:21px;
      li {
        margin-top:14px;
        margin-right:25px;
        padding-bottom: 12px;
        display: inline-block;
        font-size: 14px;
        color: #737373;
        cursor: pointer;
      }
      .showTableHeader {
        font-weight: bold;
        color: #008CEE;
        border-bottom: 3px solid #008CEE;
      }
    }
    .normal-list {
      margin-top: 20px;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      .normal-table {
        max-height: 120px;
        .ivu-table-body {
          height: 80px;
          overflow: auto;
        }
      }
    }
    .complete-list {
      margin-top: 20px;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      .complete-table {
        max-height: 200px;
      }
    }
    .compound-project {
      margin-top: 20px;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      .compound-table {
        max-height: 200px;
      }
    }
    /* .unnit-charge {
      margin-top: 20px;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      .unnit-table {
        max-height: 160px;
      }
    } */
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
