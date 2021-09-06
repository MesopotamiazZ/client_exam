/** 
* @author wzd
* @date 2018/03/07
* @content 单位体检订单详情
*/ 
<template>
  <div class="unitPhysicalexamOrderDetail-wrapper">
    <!-- 主页面 -->
    <div class="unitPhysicalexamOrderDetail-main">
      <bread :firstTitle="'单位体检订单管理'"
             class="main-bread"
             :secondTitle="'单位体检订单详情'"
             @button-first="backToHome"></bread>
      <div class="unitPhysicalexamOrderDetail-main-content contentBg">
        <div class="unitPhysicalexamOrderDetail-main-content-wrapper">
          <div class="content-title">
            <div class="content-title-left">
              <div class="display-table"
                   v-show="showDisplaytable"
                   @mouseenter="disTableEnter"
                   @mouseleave="disTableLeave">
                <display-table :unitAllOrder="unitAllOrder"></display-table>
              </div>
              <ul>
                <li class="li1">
                  <span>{{unitOrderDetail.common.unit.name}}</span>
                  <span @mouseenter="getDispalyTable"
                        @mouseleave="leaveDispalyTable">历史体检次数：
                    <b>{{unitOrderDetail.common.his_count}}</b>次
                    <Icon class="icon-arrow"
                          type="arrow-down-b"></Icon>
                  </span>
                </li>
                <li class="li2">
                  <span class="overflowEllipsis">经济行业：{{unitOrderDetail.common.unit.econ_industry}}</span>
                  <!-- unitOrderDetail.common.unit.economic_type.name -->
                  <span class="overflowEllipsis">经济类型：{{unitOrderDetail.common.unit.econ_industry}}</span>
                  <span class="overflowEllipsis">单位体检号：{{unitOrderDetail.common.unit_sn}}</span>
                </li>
                <li class="li3">
                  <!-- moment(
                parseInt(unitOrderDetail.common.appt_time * 1000),
              ).format('YYYY-MM-DD') -->
                  <span class="overflowEllipsis">预约日期：{{unitOrderDetail.common.appt_time}}
                  </span>
                  <span class="overflowEllipsis">结算方式：{{selectOptions.settlementModes[unitOrderDetail.common.settlement_method - 1].label}}</span>
                  <span class="overflowEllipsis">备注：{{unitOrderDetail.common.remarks}}</span>
                </li>
              </ul>
            </div>
            <div class="content-title-right">
              <div style="display: inline-block;position: absolute;right: 0;top: 35px">
                <Button type="ghost">打印缴费凭条</Button>
                <Button type="ghost"
                        @click="openCostManagement">费用管理</Button>
                <Button type="ghost"
                        @click="openAdditionalCharge">附加费用</Button>
                <Button type="ghost"
                        @click="newOrderInfo">新增预约信息</Button>
                <Button type="ghost">导出体检记录</Button>
                <Button type="ghost"
                        :disabled="true">取消单位体检订单</Button>
              </div>
            </div>
          </div>
          <div class="content-total">
            <ul>
              <li class="appNum">
                <div class="appNum-top">{{unitOrderDetail.common.number}}
                  <sub>人</sub>
                </div>
                <div class="appNum-bottom">预约体检人数</div>
              </li>
              <li class="yetAppNum">
                <div class="yetAppNum-top">{{unitOrderDetail.common.appointment}}
                  <sub>人</sub>
                </div>
                <div class="yetAppNum-bottom">已预约人数</div>
              </li>
              <li class="yetRegister">
                <div class="yetRegister-top">{{unitOrderDetail.common.register}}
                  <sub>人</sub>
                </div>
                <div class="yetRegister-bottom">已登记人数</div>
              </li>
              <li class="yetComplete">
                <div class="yetComplete-top">{{unitOrderDetail.common.check}}
                  <sub>人</sub>
                </div>
                <div class="yetComplete-bottom">已完检人数</div>
              </li>
              <li class="yetzhujian">
                <div class="yetzhujian-top">{{unitOrderDetail.common.check_out}}
                  <sub>人</sub>
                </div>
                <div class="yetzhujian-bottom">已主检人数</div>
              </li>
              <li class="yetAudit">
                <div class="yetAudit-top">{{unitOrderDetail.common.examine}}
                  <sub>人</sub>
                </div>
                <div class="yetAudit-bottom">已审核人数</div>
              </li>
            </ul>
          </div>
          <div class="content-table">
            <div class="content-table-header">
              <titletHasSlot>
                <span slot='titletHasSlotLeftTitle'>
                  体检信息
                </span>
                <div slot='titletHasSlotRightContent'>
                  <div class="fl ">
                    <search-input class="input"
                                  searText="请输入搜索内容"
                                  @on-enter="enterSearch"
                                  @on-Icon="enterSearch"
                                  @on-cancel="enterSearch"
                                  :searchWidth='351'></search-input>
                  </div>

                </div>
              </titletHasSlot>
            </div>
            <div class="content-table-body">
              <q-table ref="baseInfoTable"
                       :width='1560'
                       :columns="columns"
                       :data="unitOrderDetail.items"
                       :pageInfo="pageInfo1"
                       :params="params"
                       :ifEdit="true"
                       :showOperateColumn="false"
                       @after-request="afterRequest">
              </q-table>
              <!-- :requestDataApi="getUnitPhysicalexamOrderDetail({ id: this.switchComponent.id })"
              :height="tableHeight"-->
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- 主页面 -->

    <!-- 单位费用管理弹窗 -->
    <unitCostManagementModal :controlModal="isShowCostManagement"
                             @unit-cost-management-complete="ucmComplete"
                             @unit-cost-management-cancel="ucmCancel"></unitCostManagementModal>
    <!-- 单位费用管理弹窗 -->

    <!-- 单位附加费 -->
    <additionalCharge :controlModal="isShowAdditionalCharge"
                      @commit-data='additionalChargeCommit'></additionalCharge>
    <!-- 单位附加费 -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import bread from '@/views/main/prepare/components/bread'
import searchInput from '@/components/searchInput'
import titletHasSlot from '@/components/titleHasSlot'
import moment from 'moment'
import displayTable from './displayTable'
import unitCostManagementModal from './components/modal/unitCostManagementModal'
import additionalCharge from './components/modal/additionalCharge'
import * as types from '@/store/types'
export default {
  name: 'unitPhysicalexamOrderDetail',
  components: {
    bread,
    searchInput,
    titletHasSlot,
    displayTable,
    unitCostManagementModal,
    additionalCharge,
  },
  data() {
    return {
      // 单位体检号 unit_sn
      // 预约时间 appt_time
      // 备注 remarks
      // 预约人数 number
      // 已预约人数 appointment
      // 已登记人数 register
      // 已完检人数 check
      // 已主检人数 check_out
      // 已审核人数 examine
      showDisplaytable: false,
      isShowCostManagement: false,
      isShowAdditionalCharge: false, // 附加费
      tempTimeout: null,
      orderDetail: {
        unit_: '中国石油化工有限公司',
        examCounts: 2, // 历史体检次数
        jjhy: '国有企业', // 经济行业
        jjlx: '国有企业', // 经济类型
        dwtjh: '170203U0001', // 单位体检号
        yyrq: '2017-12-12', // 预约日期
        jsfs: '以完检人数', // 以完检人数
        bz: '仅限10-30岁员工检查', // 备注
        customerStatus: [
          {
            label: '已预约',
            unit_pe_status: 0,
          },
          {
            label: '体检中',
            unit_pe_status: 1,
          },
          {
            label: '已完成',
            unit_pe_status: 2,
          },
        ],
      },
      tableHeight: 400,
      params: {
        search: '',
      },
    }
  },
  methods: {
    async enterSearch(val) {
      this.params.search = val
    },
    backToHome() {
      this.setSwitchComponent({ component: 'unitPhyexamManageHome', id: '' })
    },
    searchFunc(a) {
      if (a.length > 0) {
        this.search = a
      }
    },
    openCostManagement() {
      this.isShowCostManagement = true
    },
    ucmComplete() {
      this.isShowCostManagement = false
    },
    ucmCancel() {
      this.isShowCostManagement = false
    },
    afterRequest() {
      console.log('afterRequest')
    },
    openAdditionalCharge() {
      // 附加费用弹窗
      this.isShowAdditionalCharge = true
    },
    additionalChargeCommit() {
      this.isShowAdditionalCharge = false
    },
    ...mapMutations('unitPhysicalexamManagementModule', ['setSwitchComponent']),
    ...mapActions('unitPhysicalexamManagementModule', [
      'getUnitPhysicalexamOrderDetail',
      'getUnitAllOrder',
    ]),
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    getDispalyTable() {
      this.showDisplaytable = true
    },
    leaveDispalyTable() {
      let self = this
      this.tempTimeout = setTimeout(function() {
        self.showDisplaytable = false
      }, 100)
    },
    disTableEnter() {
      clearTimeout(this.tempTimeout)
    },
    disTableLeave() {
      this.showDisplaytable = false
    },
    newOrderInfo() {
      this.$router.push({ name: 'teamPhysicalExamination' })
      let temp = {}
      temp.name = 'teamPhysicalExamination'
      temp.title = 'teamPhysicalExamination'
      this.openPage(temp)
      this.setCurPage(temp.name)
    },
  },
  computed: {
    ...mapState('unitPhysicalexamManagementModule', [
      'switchComponent',
      'unitOrderDetail',
      'selectOptions', // 下拉选项
      'unitAllOrder',
    ]),
    ...mapState(['windowHeight']),
    ...mapGetters('unitPhysicalexamManagementModule', ['pageInfo1']),
    columns() {
      return [
        {
          title: '状态',
          ellipsis: true,
          key: 'status',
          // minWidth: 56,
          render: (h, params) => {
            if (params.row.customer.status === 0) {
              return h('span', '已预约')
            } else if (params.row.customer.status === 1) {
              return h('span', '已登记')
            } else if (params.row.customer.status === 2) {
              return h('span', '已完检')
            } else if (params.row.customer.status === 3) {
              return h('span', '已主检')
            } else {
              return h('span', '已审核')
            }
          },
        },
        {
          title: '体检号',
          ellipsis: true,
          key: 'pe_sn',
          // minWidth: 87,
        },
        {
          title: '姓名',
          ellipsis: true,
          key: 'name',
          minWidth: 100,
          render: (h, params) => {
            return h('span', params.row.customer.name)
          },
        },
        {
          title: '性别',
          ellipsis: true,
          key: 'sex',
          minWidth: 44,
          render: (h, params) => {
            return h('span', params.row.customer.sex === 1 ? '男' : '女')
          },
        },
        {
          title: '年龄',
          ellipsis: true,
          key: 'age',
          minWidth: 44,
          render: (h, params) => {
            return h('span', params.row.customer.age)
          },
        },
        {
          title: '个人支付比例',
          ellipsis: true,
          minWidth: 120,
          key: 'pay_ratio',
          render: (h, params) => {
            return h('span', params.row.pay_ratio)
          },
        },
        {
          title: '新增费用支付方',
          ellipsis: true,
          minWidth: 110,
          key: 'new_cost_payer',
          render: (h, params) => {
            return h('span', params.row.new_cost_payer)
          },
        },
        {
          title: '部门',
          ellipsis: true,
          minWidth: 163,
          key: 'department',
          render: (h, params) => {
            return h('span', params.row.customer.department)
          },
        },
        {
          title: '初/复检',
          ellipsis: true,
          minWidth: 84,
          key: 'operater',
          render: (h, params) => {
            return h(
              'span',
              params.row.pe_detail.is_recheck === 0 ? '初检' : '复检',
            )
          },
        },
        {
          title: '体检类别',
          ellipsis: true,
          minWidth: 79,
          key: 'appt_time',
          render: (h, params) => {
            return h(
              'span',
              params.row.pe_detail.pe_type === 1 ? '健康体检' : '职业体检',
            )
          },
        },
        {
          title: '体检套餐',
          ellipsis: true,
          minWidth: 234,
          key: 'created_at',
          render: (h, params) => {
            return h('span', params.row.pe_detail.pe_package)
          },
        },
        {
          title: '登记日期',
          ellipsis: true,
          key: 'remarks',
          minWidth: 81,
          render: (h, params) => {
            if (
              !params.row.registration ||
              !params.row.registration.register_time
            ) {
              return h('span', '/')
            }
            return h(
              'span',
              moment(
                parseInt(params.row.registration.register_time * 1000),
              ).format('YYYY-MM-DD'),
            )
          },
        },
        {
          title: '完检日期',
          ellipsis: true,
          key: 'remarks',
          minWidth: 81,
          render: (h, params) => {
            if (
              !params.row.registration ||
              !params.row.registration.finish_check_time
            ) {
              return h('span', '/')
            }
            return h(
              'span',
              moment(
                parseInt(params.row.registration.finish_check_time * 1000),
              ).format('YYYY-MM-DD'),
            )
          },
        },
        {
          title: '主检日期',
          ellipsis: true,
          key: 'remarks',
          minWidth: 81,
          render: (h, params) => {
            if (
              !params.row.registration ||
              !params.row.registration.main_check_time
            ) {
              return h('span', '/')
            }
            return h(
              'span',
              moment(
                parseInt(params.row.registration.main_check_time * 1000),
              ).format('YYYY-MM-DD'),
            )
          },
        },
        {
          title: '审核日期',
          ellipsis: true,
          key: 'remarks',
          minWidth: 81,
          render: (h, params) => {
            if (
              !params.row.registration ||
              !params.row.registration.audit_time
            ) {
              return h('span', '/')
            }
            return h(
              'span',
              moment(
                parseInt(params.row.registration.audit_time * 1000),
              ).format('YYYY-MM-DD'),
            )
          },
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.baseInfoTable.offsetHeight
    },
  },
  async mounted() {
    await Promise.all([
      this.getUnitPhysicalexamOrderDetail({ id: this.switchComponent.id }),
      this.getUnitAllOrder({ id: 1 }),
    ])
    // this.getUnitPhysicalexamOrderDetail({ id: this.switchComponent.id })
    this.tableHeight = this.$refs.baseInfoTable.offsetHeight
    console.log('pageinfo1', this.pageInfo1)
  },
}
</script>

<style lang="less">
@import (reference) '~assets/less/variable.less';
.unitPhysicalexamOrderDetail-wrapper {
  position: relative;
  margin: 0 auto;
  height: 100%;
  .unitPhysicalexamOrderDetail-main {
    padding: 40px @num10 @num10 @num10;
    width: 100%;
    height: 100%;
    position: relative;
    .main-bread {
      position: absolute;
      top: -3px;
    }
    .unitPhysicalexamOrderDetail-main-content {
      overflow: auto;
      height: 100%;
      .unitPhysicalexamOrderDetail-main-content-wrapper {
        // min-width: 1435px;
        height: 100%;
        .content-title {
          padding: @num20 @num20 0 @num20;
          display: flex;
          height: 151px;
          .content-title-left {
            flex: 1;
            position: relative;
            .display-table {
              position: absolute;
              left: 198px;
              top: 28px;
              width: 690px;
              z-index: 100;
            }
            .li1 {
              cursor: pointer;
              margin-bottom: @num20;
              span:nth-of-type(1) {
                font-family: MicrosoftYaHei-Bold;
                font-size: 18px;
                font-weight: bold;
                color: #4a4a4a;
                margin-right: @num10;
              }
              span:nth-of-type(2) {
                font-size: @font12;
                color: #737373;
                border-radius: 12px;
                border: 1px solid #cccccc;
                padding: 3px 20px 3px 10px;
              }
              .icon-arrow {
                position: relative;
                left: 7px;
              }
            }
            .li2,
            .li3 {
              margin-bottom: @num20;
              span:nth-of-type(1) {
                display: inline-block;
                width: 130px;
                margin-right: @num30;
              }
              span:nth-of-type(2) {
                display: inline-block;
                width: 140px;
                margin-right: @num20;
              }
              span:nth-of-type(3) {
                display: inline-block;
                width: 160px;
              }
            }
          }
          .content-title-right {
            font-size: 0;
            flex: 1;
            position: relative;
            Button {
              margin-right: @num10;
              margin-bottom: @num20;
            }
            Button:nth-of-type(6) {
              margin-right: 0;
            }
          }
        }
        .content-total {
          height: 100px;
          width: 100%;
          border-top: 1px solid #d9d9d9;
          border-bottom: 1px solid #d9d9d9;
          ul {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0 67px;
            li {
              position: relative;
              top: 5px;
              text-align: center;
            }
            .appNum {
              .appNum-top {
                font-family: MicrosoftYaHeiLight;
                font-size: 40px;
                color: #4a4a4a;
                sub {
                  font-size: 14px;
                  color: #737373;
                }
              }
              .appNum-bottom {
                color: #216fe3;
              }
            }
            .yetAppNum {
              .yetAppNum-top {
                font-family: MicrosoftYaHeiLight;
                font-size: 40px;
                color: #4a4a4a;
                sub {
                  font-size: 14px;
                  color: #737373;
                }
              }
              .yetAppNum-bottom {
                color: #01be94;
              }
            }
            .yetRegister {
              .yetRegister-top {
                font-family: MicrosoftYaHeiLight;
                font-size: 40px;
                color: #4a4a4a;
                sub {
                  font-size: 14px;
                  color: #737373;
                }
              }
              .yetRegister-bottom {
                color: #1ab110;
              }
            }
            .yetComplete {
              .yetComplete-top {
                font-family: MicrosoftYaHeiLight;
                font-size: 40px;
                color: #4a4a4a;
                sub {
                  font-size: 14px;
                  color: #737373;
                }
              }
              .yetComplete-bottom {
                color: #8e5ae4;
              }
            }
            .yetzhujian {
              .yetzhujian-top {
                font-family: MicrosoftYaHeiLight;
                font-size: 40px;
                color: #4a4a4a;
                sub {
                  font-size: 14px;
                  color: #737373;
                }
              }
              .yetzhujian-bottom {
                color: #216fe3;
              }
            }
            .yetAudit {
              .yetAudit-top {
                font-family: MicrosoftYaHeiLight;
                font-size: 40px;
                color: #4a4a4a;
                sub {
                  font-size: 14px;
                  color: #737373;
                }
              }
              .yetAudit-bottom {
                color: #01be94;
              }
            }
          }
        }
        .content-table {
          height: calc(~'100% - 251px');
          .content-table-header {
            height: 50px;
            // box-sizing: border-box;
            // border-bottom: 1px solid #D9D9D9;
          }
          .content-table-body {
            height: calc(~'100%  - 50px');
          }
        }
      }
    }
  }
  .search-input {
    margin-right: 0;
  }
}
</style>
