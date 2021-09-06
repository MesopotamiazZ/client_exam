/**
* author      : yhy jiangyl
* cteate      : 2018/02/26 
* description : 退费单明细
*/
<template>
  <Modal v-model="ReturnPremiumDetailModal"
         class="account-modal"
         :width='812'
         :transfer='false'
         :mask-closable="false"
         :transition-names="['']"
         :closable="false">
    <div slot="header">
      <alert-header :showInput='false'
                    :headerText="'退费单明细'">
      </alert-header>
    </div>
    <div class="content"
    :style="{height:contentHeight}">
      <div class="item">
        <div class="leftName">个人退费单号</div>
        <Input v-model="showData.self_pe_snPer"
               class="rightInput"
               disabled/>
        <div class="leftName">体检号</div>
        <Input v-model="showData.self_pe_sn"
               class="rightInput"
               disabled/>
        <div class="leftName">姓名</div>
        <Input v-model="showData.self_name"
               class="rightInput"
               disabled/>
      </div>
      <div class="item">
        <div class="leftName">已退费金额</div>
        <Input v-model="showData.self_ytje"
               class="rightInput value-price"
               disabled/>
        <div class="leftName">实际退费金额</div>
        <Input v-model="showData.self_sjtf"
               class="rightInput value-price"
               disabled/>
        <div class="leftName">实际退费比例</div>
        <Input v-model="showData.self_sjtfbl"
               class="rightInput"
               disabled/>
      </div>
      <div class="item">
        <div class="leftName">退费方式</div>
        <Input v-model="showData.self_tffs"
               class="rightInput"
               disabled/>
        <div class="leftName">退费账户</div>
        <Input v-model="showData.self_tfzh"
               class="rightInput"
               disabled/>
        <div class="leftName">账户余额</div>
        <Input v-model="showData.self_zhye"
               class="rightInput value-price"
               disabled/>
      </div>
      <div class="item">
        <div class="leftName">备注</div>
        <Input v-model="showData.self_remark"
               class="rightInput "
               style="width: 585px"
               disabled/>
      </div>
      <div class="contentBg tableContent">

        <ul class="tableHeader">
          <li v-for="(item,index) in headerData"
              :class="showTableHeaderClass === index?'showTableHeader':''"
              @click="showTableHeader(item)">{{item.label}}</li>
        </ul>
        <div v-if="0 === this.showTableHeaderClass" class="normal-table"
             ref="normalTable">
          <Table stripe
                 :columns="columns1"
                 :data="data1"
                 :height='tableHeightOne'
                 script='true'></Table>
        </div>
        <div v-if="1 === this.showTableHeaderClass" class="normal-table"
             ref="normalTable">
          <Table stripe
                 :columns="columns1"
                 :data="data1"
                 script='true'></Table>
        </div>
      </div>
      <!-- <div class="borlder"></div> -->
      <!-- <div>
        <div class="leftName "
             style="width:72px">已选退费金额</div>
        <Input v-model="unitName"
               class="rightInput value-price font-bold"
               style="width: 133px"
               disabled/>
        <div class="rightName"
             style="width:72px">退费比例</div>
        <Input v-model="unitName"
               class="rightInput value-symbol "
               style="width: 76px"
               disabled/>
        <div class="rightName"
             style="width:60px">退费手续费</div>
        <Input v-model="unitName"
               class="rightInput value-price font-bold"
               style="width: 130px"
               disabled/>
      </div> -->
      <!-- <div>
        <div class="leftName"
             style="width:72px">实际退费金额</div>
        <Input v-model="unitName"
               class="rightInput value-price font-bold"
               style="width: 133px"
               disabled/>
        <div class="rightName"
             style="width:72px">实际退费比例</div>
        <Input v-model="unitName"
               class="rightInput value-symbol "
               style="width: 76px"
               disabled/>
      </div> -->
      <!-- <div>
        <div class="leftName"
             style="width:48px">支付方式</div>
        <Input v-model="unitName"
               class="rightInput  "
               style="width: 117px"
               disabled/>
        <div class="leftName"
             style="width:48px">退费账户</div>
        <Input v-model="unitName"
               class="rightInput value-price "
               style="width: 140px"
               disabled/>
        <div class="rightName"
             style="width:48px">账户余额</div>
        <Input v-model="unitName"
               class="rightInput value-price font-bold"
               style="width: 140px"
               disabled/>
      </div> -->
      <!-- <div>
        <div class="leftName"
             style="width:48px">备注</div>
        <Input v-model="unitName"
               class="rightInput "
               style="width: 566px"
               disabled/>

      </div> -->
      <!-- <div class="normal-list contentBg">
        <div class="normal-header">
          退费信息
        </div>
        <div class="normal-table"
             ref="normalTable">
          <Table stripe
                 :columns="columns1"
                 :data="data1"
                 :height='tableHeightOne'
                 script='true'></Table>
        </div>
      </div> -->
      <div class="bottom-money">
        <div>应收金额合计：
          <span>280.00 </span>元</div>
        <div>实收金额合计：
          <span>180.00 </span>元</div>
        <div>退费金额合计：
          <span>60.00 </span>元</div>
      </div>
      <div class="bottom-time">
        <div>退费人：王思佳</div>
        <div>退费时间：2017-12-12 12：00</div>
      </div>
    </div>
    <div slot="footer">
      <div class="bottom">
        <div class="bottom-right">
          <Button type="primary"
                  class="button"
                  @click="printSure">打印退费凭条</Button>
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
export default {
  name: 'ReturnPremiumDetailModal',
  data() {
    return {
      contentHeight: '480px',
      showTableHeaderClass: 0,
      headerData: [
        {
          label: '组合项目',
          index: 0,
        },
        {
          label: '附加费',
          index: 1,
        },
      ],
      tableHeightOne: 0,
      // unitName: 'BA20',
      showData: {
        self_pe_snPer: '2017122500003',
        self_pe_sn: 'BA20170908008',
        self_name: '王树彤',
        self_ytje: 0,
        self_sjtf: 0,
        self_sjtfbl: 0,
        self_tffs: '个人账户',
        self_tfzh: '76792782',
        self_zhye: 8988.00,
        self_remark: '',
      },
      columns1: [
        {
          title: '项目类型',
          key: 'self_type',
        },
        {
          title: '项目名称',
          key: 'self_name',
        },
        {
          title: '待收金额（元）',
          key: 'self_dsje',
        },
        {
          title: '实收金额（元）',
          key: 'self_ssje',
        },
        {
          title: '实退金额（元）',
          key: 'self_stje',
        },
      ],
      data1: [
        {
          self_type: '检查项目',
          self_name: '一般检查',
          self_dsje: 80.00,
          self_ssje: 40.00,
          self_stje: 0,
        }, {
          self_type: '功能项目',
          self_name: '心电图',
          self_dsje: 200.00,
          self_ssje: 140.00,
          self_stje: 60.00,
        },
      ],
    }
  },
  props: {
    ReturnPremiumDetailModal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['windowHeight']),
  },
  methods: {
    showTableHeader(data) {
      this.showTableHeaderClass = data.index
    },
    printSure() {
      this.$emit('ReturnPremiumDetailModal')
    },
    cancel() {
      this.$emit('update:ReturnPremiumDetailModal', false)
    },
    async resetClose() {
      await this.$nextTick()
      this.tableHeightOne = this.$refs.normalTable.offsetHeight
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
.account-modal .font-bold .ivu-input {
  font-weight: bold;
}
</style>

<style lang="less" scoped>
@import (reference) '~assets/less/variable.less';
li {
  // height: 50px;
  // background: blue;
}
.account-modal {
  .content {
    .item {
      display: flex;
    }

    .tableContent {
      margin-top: 17px;
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: 20px;
      max-height: 331px;
      overflow: hidden;
      .unnit-table {
        max-height: 283px;
        overflow: hidden;
        .ivu-table-body {
          max-height: 244px;
        }
        .ivu-table-body::-webkit-scrollbar {
          height: 12px;
        }
      }
    }
    .tableHeader {
      height: 50px;
      margin-left: 21px;
      li {
        margin-top: 14px;
        margin-right: 25px;
        padding-bottom: 0px;
        height: 34px;
        display: inline-block;
        font-size: 14px;
        color: #737373;
        background:none;
        cursor: pointer;
      }
      .showTableHeader {
        font-weight: bold;
        color: #008cee;
        border-bottom: 3px solid #008cee;
      }
    }
    .borlder {
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 20px;
      height: 1px;
      background-color: #d9d9d9;
    }
    .leftName {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 30px;
      display: inline-block;
      text-align: justify;
      width: 72px;
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
      width: 24px;
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
    .value-symbol {
      position: relative;
      &::after {
        position: absolute;
        content: '%';
        display: inline-block;
        top: 7px;
        right: 10px;
        font-size: 12px;
        color: #737373;
      }
    }
    .normal-list {
      margin-top: 20px;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      .normal-header {
        padding-left: 20px;
        line-height: 50px;
        height: 50px;
        font-size: 14px;
        color: #111111;
        letter-spacing: 0.04px;
      }
      .normal-table {
        max-height: 281px;
      }
    }
    .bottom-money {
      display: flex;
      div {
        margin-left: 20px;
        margin-top: 20px;
        span {
          font-size: 18px;
          line-height: 19px;
          font-weight: bold;
          color: @tsIcon;
        }
      }
    }
    .bottom-time {
      display: flex;
      div {
        margin-left: 20px;
        margin-top: 20px;
      }
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
