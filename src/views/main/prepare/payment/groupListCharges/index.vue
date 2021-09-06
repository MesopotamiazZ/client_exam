/** 
* @author 覃凤
* @date 2018/03/10
* @content 团体收费清单
*/ 
<template>
<div class="group-list-charges-wrapper">
  <div class="group-list-charges-content contentBg">
    <div class="group-list-charges-content-title flex paddingT10 paddingB10 paddingR20">
      <div class="marginR20">
        <span class="fl marginR10 font12">结算日期</span>
        <DatePicker class="fl" type="date" placeholder="" style="width: 240px"></DatePicker>
      </div>
      <Button class="marginR10" type="ghost">打 印</Button>
      <Button type="ghost" @click='queryBtn'>查 询</Button>
    </div>
    <div class="group-list-charges-content-total paddingL10 paddingR10 marginB10">
      <h1>{{ msg }}</h1>
      <div class="group-list-charges-content-public">
        <Table :height='totalTable.height' :data='totalTable.data' :columns='totalTable.columns'></Table>
      </div>
    </div>
    <div class="group-list-charges-content-table group-list-charges-content-public marginL10 marginR10 marginB10">
      <title-has-slot>
        <span slot="titletHasSlotLeftTitle">结算单</span>
      </title-has-slot>
      <q-table ref='settlementTable'
        :showOperateColumn="false"
        :params="paraming"
        :ifEdit="true"
        :columns="settlementTable.columns"
        :data="settlementTable.data"
        :height='100'
        :pageInfo="pageInfo"
        :isBorder='true'
        :requestDataApi="initTable">
      </q-table>
    </div>
    <div class="group-list-charges-content-tj group-list-charges-content-public flex marginL10 marginR10">
      <div class="charges-content-tj-left">
        <title-has-slot>
          <span slot="titletHasSlotLeftTitle">统计</span>
        </title-has-slot>
        <div class="charges-content-tj-left-con">
          <ul class="flex charges-content-tj-public-ul">
            <li>实际合计（元）</li>
            <li class="overflowEllipsis">1000.00</li>
            <li>结算作废金额（元）</li>
            <li class="flx1 overflowEllipsis">200.00</li>
          </ul>
          <ul class="charges-content-tj-public-ul total-money flex">
            <li style="font-weight:bold;">收入合计（元）</li>
            <li class="overflowEllipsis" style="font-weight:bold;">1000000000.00</li>
            <li class="last-li flx1"></li>
          </ul>
        </div>
      </div>
      <div class="charges-content-tj-right flx1">
        <title-has-slot>
          <span slot="titletHasSlotLeftTitle">支付方式统计</span>
        </title-has-slot>
        <div class="charges-content-tj-left-con ">
          <ul class="flex charges-content-tj-public-ul">
            <li>现金</li>
            <li class="overflowEllipsis">1000.00</li>
            <li>支付宝</li>
            <li class="flx1 overflowEllipsis">200.00</li>
          </ul>
          <ul class="flex charges-content-tj-public-ul">
            <li>微信</li>
            <li class="overflowEllipsis">1000.00</li>
            <li>银行卡</li>
            <li class="flx1 overflowEllipsis">200.00</li>
          </ul>
          <ul class="charges-content-tj-public-ul total-money flex">
            <li style="font-weight:bold;">账户余额</li>
            <li class="overflowEllipsis" style="font-weight:bold;">1000000000.00</li>
            <li class="last-li flx1"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import * as _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'healthExaminationDailySettlement',
  data () {
    return {
      msg: '团体收费清单',
      totalTable: { // 结算单数-总
        height: 80,
        data: [
          {
            self_endData: '2017-09-30——2017-09-31',
            invoice_count: 1,
          },
        ],
        columns: [
          {
            title: '结算日期',
            key: 'self_endData',
            // width: 200,
            ellipsis: true,
          }, {
            title: '结算单数',
            key: 'invoice_count',
            // width: 584,
            ellipsis: true,
          },
        ],
      },
      settlementTable: {
        data: [],
        columns: [
          {
            title: '结算单号',
            key: 'order_sn',
            minWidth: 131,
            ellipsis: true,
          }, {
            title: '体检号',
            key: '',
            minWidth: 131,
            ellipsis: true,
          }, {
            title: '单位名称',
            key: '',
            minWidth: 220,
            ellipsis: true,
          }, {
            title: '结算方式',
            key: '',
            minWidth: 116,
            ellipsis: true,
          }, {
            title: '支付方式',
            key: '',
            minWidth: 122,
            ellipsis: true,
          }, {
            title: '结算时间',
            key: '',
            minWidth: 122,
            ellipsis: true,
          }, {
            title: '待收金额（元）',
            key: '',
            minWidth: 103,
            ellipsis: true,
          }, {
            title: '实收金额（元）',
            key: '',
            minWidth: 103,
            ellipsis: true,
          }, {
            title: '作废标志',
            key: '',
            width: 69,
            ellipsis: true,
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters('groupListChargesModule', [
      'pageInfo',
      'initTableData',
    ]),
    paraming () {
      return {

      }
    },
  },
  methods: {
    ...mapActions('groupListChargesModule', [
      'initTable',
    ]),
    async queryBtn () { // 点击查询按钮
      await this.$refs.settlementTable.request()
      this.totalTable.data = _.clone(this.initTableData.accounts)
      this.settlementTable.data = _.clone(this.initTableData[0])
    },
  },
}
</script>
<style lang="less">
@import "~assets/less/variable.less"; 
.group-list-charges-wrapper {
  padding: @num10;
  width: 100%;
  height: 100%;
  .group-list-charges-content {
    width: 100%;
    height: 100%;
    .group-list-charges-content-public {
      border: 1px solid @gradeAshFive;
      border-radius: @borderRadiuBig;
      overflow: hidden;
    }
    .group-list-charges-content-title {
      justify-content: flex-end;
      border-bottom: 1px solid @gradeAshFive;
      font-size: 0;
      &>div {
        &>span {
          line-height: @num30;
          height: @num30;
        }
      }
    }
    .group-list-charges-content-total {
      h1 {
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        text-align: center;
        font-weight: normal;
      }
    }
    .group-list-charges-content-table {
      height: calc(~'100% - 390px');
    }
    .group-list-charges-content-tj {
      height: 170px;
      width: 100%;
      width: calc(~'100% - 20px');
      // min-width: 1184px;
      // overflow-x: auto;
      &>div {
        height: 100%;
        // min-width: 584px;
      }
    }
    .charges-content-tj-public-ul {
      height: 40px;
      line-height: 40px;
      // min-width: 584px;
      text-align: center;
      color: @gradeAshOne;
      // background-color: red;
      li {
        border-right: 1px solid @gradeAshFive;
        border-top: 1px solid @gradeAshFive;
        padding-left: @num10;
        padding-right: @num10;
      }
      li:nth-of-type(2n-1) {
        background-color: @tableTr;
      }
      li:nth-of-type(2n) {
        color: @gradeAshTwo;
      }
      li.last-li {
        height: 40px;
        background-color: transparent;
        border-top: 1px solid @gradeAshFive;
      }
      li:nth-of-type(1) {
        width: 144px;
      }
      li:nth-of-type(2) {
        width: 145px;
      }
      li:nth-of-type(3) {
        width: 144px;
      }
      &>li:nth-last-of-type(1) {
        border-right: none;
      }
    }
    ul.total-money {
      li {
        line-height: 40px;
        height: 40px;
        border-bottom: 1px solid @gradeAshFive;
      }
    }
    .charges-content-tj-left-con {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      // ul {
      //   min-width: 900px;
      // }
    }
    .charges-content-tj-left {
      width: 50%;
      margin-right: 10px;
      border-right: 1px solid @gradeAshFive;
    }
    .charges-content-tj-right {
      border-left: 1px solid @gradeAshFive;
    }
  }
}
</style>