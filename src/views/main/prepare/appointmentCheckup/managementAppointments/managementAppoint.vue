/**
 * Created ljl
 * Date: 2017/02/27/
 * content:预约管理
 */
<template>
    <div class="personal-exam">
        <div class="personal-project"
        v-if="!isHealthRecord">
            <div class="personal-project-content">
                <div class="personal-header">
                    <div class="personal-header-right">
                      <div>
                        <z-button ZBtype="primary"
                                    v-if="selectMode"
                                    @click="selectMode=false"
                                    class="fr marginR20 button-in">取消
                          </z-button>
                          <z-button ZBtype="ghost"
                                    v-if="selectMode"
                                    :disabled="bulkOperation"
                                    @click="buttonLogin"
                                    class="fr marginR10 button-in">批量登记</z-button>
                          <z-button ZBtype="ghost"
                                    v-if="selectMode"
                                    :disabled="bulkOperation"
                                    @click="buttonAllCancel"
                                    class="fr marginL20 marginR10 button-in">批量取消预约
                          </z-button>
                          <z-button ZBtype="ghost"
                                    v-if="!selectMode"
                                    class="fr marginL10 marginR20 button-in"
                                    @click="selectMode=true">选 择</z-button>
                          <z-button ZBtype="ghost"
                                    v-if="!selectMode"
                                    class="fr marginL20 button-in"
                                    @click="buttonadd">新 增</z-button>
                          <search-input :searchWidth="180"
                                    class="marginR20 marginL20 fl search"
                                    searText="请输入搜索内容"
                                    @on-enter="search"
                                    @on-Icon="search"
                                    @on-cancel="search">
                          </search-input>
                      </div>
                    </div>
                </div>
                <div ref="zBaseInfoHeight" class="table-out">
                    <q-table
                    ref="zBaseInfoTable"
                    :showOperateColumn="false"
                    :params="paraming"
                    :ifEdit="true"
                    :columns="columns"
                    :requestDataApi="getOrderManagement"
                    :data="getOrderManagementData"
                    :selectMode="selectMode"
                    :width="2373"
                    @scroll="scrollIn"
                    @on-selection-change="tableSelectionChange"
                    :pageInfo="pageInfo">
                    </q-table>
                </div>
            </div>
        </div>
        <!-- 申请退费 -->
        <applyRefund :ifShowModal="showApplyRefund" @commit-data="sureApplyRefund" @cancel-data="showApplyRefund=false"></applyRefund>
        <!-- 撤销退费 -->
        <revokeRefund :ifShowModal="showRevokeRefund" @commit-data="sureRevokeRefund" @cancel-data="showRevokeRefund=false"></revokeRefund>
        <!-- 提示 -->
        <tip-modal :controlModal="controlModal" :mainContent="'确定取消'+tipContent+'条预约吗？'" @tip-modal-affirm="tipAffirm" @tip-modal-cancel="tipCancel"></tip-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import personalPage from '../../progressControl/comprehensiveProgressControl/personalPage'
import * as types from '@/store/types'
import applyRefund from '../../components/modal/applyRefund'
import revokeRefund from '../../components/modal/revokeRefund'
// import tipModal from '../../components/modal/tipModal'
export default {
  name: 'managementAppoint',
  components: {
    applyRefund,
    // tipModal,
    revokeRefund,
    personalPage,
  },
  data() {
    return {
      isHealthRecord: false, // 个人主页
      showApplyRefund: false,
      showRevokeRefund: false,
      controlModal: false,
      bulkOperation: true,
      selectMode: false,
      place: 'bottom-end',
      time: [],
      morebtn: null,
      tipContent: '',
      tableChooseArr: [],
      entryPeopleFilter: [],
    }
  },
  computed: {
    columns() {
      return [
        { title: '录入人',
          key: 'entering_man',
          ellipsis: true,
          // filterType: 'type',
          // filterOptions: this.entryPeopleFilter,
          width: 100 },
        { title: '录入日期', key: 'entering_time', ellipsis: true, filterType: 'time', width: 95 },
        { title: '体检号', key: 'pe_sn', ellipsis: true, width: 115 },
        { title: '姓名',
          key: 'name',
          width: 102,
          render: (h, params) => {
            if (params.row.is_vip) {
              return h(
                'div',
                {
                  style: {
                    background: '',
                    width: '100%',
                    height: '40px',
                    lineHeight: '40px',
                    float: 'left',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                },
                [
                  h(
                    'span',
                    {
                      'class': {
                        text: true,
                      },
                      style: {
                        position: 'relative',
                        lineHeight: '40px',
                      },
                      domProps: {
                        innerHTML: params.row.name,
                      },
                    },
                    ),
                ]
              )
            } else {
              return h(
                'div',
                {
                  style: {
                    background: '',
                    width: '100%',
                    height: '40px',
                    lineHeight: '40px',
                    float: 'left',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                },
                [
                  h(
                    'span',
                    {
                      'class': {
                        text: false,
                      },
                      style: {
                        position: 'relative',
                        lineHeight: '40px',
                      },
                      domProps: {
                        innerHTML: params.row.name,
                      },
                    },
                    ),
                ]
              )
            }
          } },
        { title: '性别',
          key: 'personalOrder.customer.sex',
          render: (h, params) => {
            return h('div', params.row.sex)
          },
          ellipsis: true,
          filterType: 'type',
          filterOptions: [
            {
              value: 0,
              label: '通用',
            },
            {
              value: 1,
              label: '男',
            },
            {
              value: 2,
              label: '女',
            },
          ],
          width: 46 },
        { title: '年龄', key: 'age', ellipsis: true, width: 46 },
        { title: '体检类别',
          key: 'personalOrder.peDetail.pe_type',
          ellipsis: true,
          render: (h, params) => {
            return h('div', params.row.pe_type)
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 1,
              label: '健康体检',
            },
            {
              value: 2,
              label: '职业体检',
            },
          ],
          width: 71 },
        { title: '初/复检',
          key: 'personalOrder.peDetail.is_recheck',
          ellipsis: true,
          render: (h, params) => {
            return h('div', params.row.is_recheck)
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 0,
              label: '初检',
            },
            {
              value: 1,
              label: '复检',
            },
          ],
          width: 65 },
        { title: '来源',
          key: 'personalOrder.peDetail.order_source',
          ellipsis: true,
          render: (h, params) => {
            return h('div', params.row.order_source)
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 1,
              label: '个人',
            },
            {
              value: 2,
              label: '单位',
            },
          ],
          width: 65 },
        { title: '单位体检号', key: 'unit_order_id', ellipsis: true, width: 120 },
        { title: '单位名称',
          ellipsis: true,
          key: 'unit_name',
          render: (h, params) => {
            if (params.row.is_unit_vip) {
              return h(
                'div',
                {
                  style: {
                    background: '',
                    width: '100%',
                    height: '40px',
                    lineHeight: '40px',
                    float: 'left',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                },
                [
                  h(
                    'span',
                    {
                      'class': {
                        unitText: true,
                      },
                      style: {
                        position: 'relative',
                        lineHeight: '40px',
                      },
                      domProps: {
                        innerHTML: params.row.unit_name,
                      },
                    },
                    ),
                ]
              )
            } else {
              return h(
                'div',
                {
                  style: {
                    background: '',
                    width: '100%',
                    height: '40px',
                    lineHeight: '40px',
                    float: 'left',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                },
                [
                  h(
                    'span',
                    {
                      'class': {
                        unitText: false,
                      },
                      style: {
                        position: 'relative',
                        lineHeight: '40px',
                      },
                      domProps: {
                        innerHTML: params.row.unit_name,
                      },
                    },
                    ),
                ]
              )
            }
          } },
        { title: '预约渠道',
          key: 'personalOrder.peDetail.appt_way',
          ellipsis: true,
          render: (h, params) => {
            return h('div', params.row.appt_way)
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 0,
              label: '前台',
            },
            {
              value: 1,
              label: '支付宝',
            },
            {
              value: 2,
              label: '微信',
            },
            {
              value: 3,
              label: '主检',
            },
            {
              value: 4,
              label: '官网',
            },
          ],
          width: 95 },
        { title: '预约日期', key: 'appt_time', ellipsis: true, filterType: 'date', width: 95 },
        { title: '待收金额', key: 'collect_amount', ellipsis: true, width: 95 },
        { title: '体检套餐', key: 'pe_package', ellipsis: true },
        { title: '危害因素', key: 'occupHarms', ellipsis: true },
        { title: '总工龄', key: 'total_work_age', ellipsis: true, width: 65 },
        { title: '接害工龄', key: 'injury_age', ellipsis: true, width: 75 },
        { title: '工种', key: 'occup_type_name', ellipsis: true, width: 85 },
        { title: '联系电话', key: 'mobile', ellipsis: true, width: 105 },
        {
          title: '备注',
          key: 'remark',
          ellipsis: true,
          width: 60,
          render: (h, params) => {
            let val = params.row.remark
            if (val) {
              return h(
                  'remark-in-table',
                {
                  props: {
                    text: val,
                  },
                }
                )
            }
            return ''
          },
        },
        { title: '操作',
          ellipsis: true,
          key: 'do',
          fixed: 'right',
          width: 126,
          _pop: false,
          render: (h, params) => {
            return h('div', {
              class: 'handle',
            }, [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '25px',
                  color: this.selectMode ? '#CCCCCC' : '#008cee',
                  'line-height': '30px',
                  'margin-right': '9px',
                  'margin-left': '5px',
                },
                on: {
                  click: (event) => {
                    if (!this.selectMode) {
                      event.stopPropagation()
                    // console.log(params.row.pe_sn)
                      this.$router.push({ name: 'register', params: {pe_sn: params.row.pe_sn} })
                      let temp = {}
                      temp.name = 'register'
                      temp.title = 'register'
                      this.openPage(temp)
                      this.setCurPage(temp.name)
                    }
                  },
                },
              }, '登记'),
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '50px',
                  color: this.selectMode ? '#CCCCCC' : '#008cee',
                  'line-height': '30px',
                  'margin-right': '5px',
                },
                on: {
                  click: (event) => {
                    if (!this.selectMode) {
                      event.stopPropagation()
                      this.$router.push({ name: 'frontAppointment', params: {pe_sn: params.row.pe_sn} })
                      let temp = {}
                      temp.name = 'frontAppointment'
                      temp.title = 'frontAppointment'
                      this.openPage(temp)
                      this.setCurPage(temp.name)
                    }
                  },
                },
              }, '修改订单'),
              h('Poptip', {
                props: {
                  value: this.morebtn === params.index,
                  placement: this.place,
                },
                style: {
                  display: 'inline-block',
                  width: '15px',
                  color: '#008cee',
                  'margin-right': '10px',
                },
                class: this.selectMode ? 'stopPop' : 'hasPop',
                nativeOn: {
                  click: () => {
                    this.morebtn = params.index
                  },
                  mouseenter: (e) => {
                    if (document.body.clientHeight - e.clientY >= 160) {
                      this.place = 'bottom-end'
                    } else {
                      this.place = 'top-end'
                    }
                  },
                },
              }, [
                h('div', {
                  style: {
                    width: '25px',
                    height: '15px',
                    color: '#008cee',
                    'z-index': '999',
                    background: `url('/static/icons/public/${this.selectMode ? 'threePoints.svg' : 'more.svg'}') no-repeat center 10px`,
                  },
                }), h('div', {
                  style: {
                    'line-height': '30px',
                    display: this.selectMode ? 'none' : 'block',
                  },
                  slot: 'content',
                }, [
                  h('div', {
                    class: 'slh',
                    on: {
                      click: (e) => {
                        e.stopPropagation()
                        this.morebtn = null
                        this.showApplyRefund = true
                      },
                    },
                  }, '申请退费'),
                  h('div', {
                    class: 'slh',
                    on: {
                      click: (e) => {
                        e.stopPropagation()
                        this.morebtn = null
                        this.showRevokeRefund = true
                      },
                    },
                  }, '撤销退费'),
                  h('div', {
                    class: 'slh',
                    on: {
                      click: (e) => {
                        console.log('aaa')
                        this.$emit(
                          'changeComponent',
                          'personalPage',
                          10,
                        )
                      },
                    },
                  }, '个人主页'),
                  h('div', {
                    class: 'slh',
                    on: {
                      click: (e) => {
                        e.stopPropagation()
                        this.morebtn = null
                        this.controlModal = true
                        this.tipContent = '该'
                      },
                    },
                  }, '取消预约'),
                ])]),
            ])
          },
        },
      ]
    },

    ...mapGetters('managementAppointmentsModule', [
      'getOrderManagementData',
      'pageInfo',
    ]),
    ...mapState('managementAppointmentsModule', [
      'orderManagement',
    ]),
    paraming () {
      return {

      }
    },
  },
  methods: {
    ...mapActions('managementAppointmentsModule', [
      'getOrderManagement',
    ]),
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    goBack() { // 个人主页
      console.log('111')
    },
    tipAffirm() { // 提示弹窗保存
      this.controlModal = false
    },
    tipCancel() { // 提示弹窗取消
      this.controlModal = false
    },
    buttonAllCancel() { // 点击批量取消预约
      this.tipContent = this.tableChooseArr.length === 1 ? '该' : this.tableChooseArr.length
      this.controlModal = true
    },
    buttonLogin() {
      let toLogin = []
      for (let i in this.tableChooseArr) {
        toLogin.push(this.tableChooseArr[i].pe_sn)
      }
      this.$router.push({ name: 'register', params: {pe_sn_list: toLogin} })
      let temp = {}
      temp.name = 'register'
      temp.title = 'register'
      this.openPage(temp)
      this.setCurPage(temp.name)
    },
    scrollIn() {
      this.morebtn = null
    },
    search() {
      console.log('aaa')
    },
    onChangeTime() {
      console.log('aaa')
    },
    buttonadd() {
      this.$router.push({ name: 'frontAppointment' })
      let temp = {}
      temp.name = 'frontAppointment'
      temp.title = 'frontAppointment'
      this.openPage(temp)
      this.setCurPage(temp.name)
    },
    tableSelectionChange(arr) {
      this.tableChooseArr = arr
      if (arr.length !== 0) {
        this.bulkOperation = false
      } else {
        this.bulkOperation = true
      }
    },
    sureApplyRefund() { // 申请退费
      this.showApplyRefund = false
    },
    sureRevokeRefund() { // 撤销退费
      this.showRevokeRefund = false
    },
  },
  async mounted () {
    // operater
    let result = await this.getOrderManagement({per_page: 10000, fields: 'entering_man,id'})
    console.log(result)
    // let enteringMans
    // if (result.items && result.items.length) {
    //   enteringMans = result.items.reduce((a, b) => {
    //     a[b.entering_man] = b.entering_man
    //     return a
    //   }, {})
    // }
    // this.entryPeopleFilter = Object.keys(enteringMans).map(item => ({
    //   label: item === 'null' ? '[空]' : item,
    //   value: enteringMans[item],
    // }))
    this.entryPeopleFilter = [
      {
        value: '李四',
        label: '李四',
      },
    ]
    // let entryPeopleFi = []
    // let entryPeople = []
    // for (let i in this.orderManagement.items) {
    //   if (entryPeople.indexOf(this.orderManagement.items[i].entering_man) === -1 && this.orderManagement.items.entering_man) {
    //     entryPeople.push(this.orderManagement.items.entering_man)
    //     entryPeopleFi.push({label: this.orderManagement.items.entering_man, value: this.getOrderManagementData.entering_man})
    //   }
    // }
    // this.entryPeopleFilter = entryPeopleFi
    // console.log(this.orderManagement)
  },
}
</script>

<style lang="less">
@import (reference) '~assets/less/variable.less';
.personal-exam {
  height: 100%;
  padding: @num10;
  .table-out{
    height: calc(~"100% - 50px");
  }
  .ivu-table-fixed-right {
    width:130px!important;
  }
  .ivu-table-fixed-body table colgroup col{
    width: 130px !important;
  }
  .handle{
    .ivu-poptip{
      .ivu-poptip-popper{
        right:10px!important;
        width:98px;
        .ivu-poptip-body{
          padding:0;
          width:100%;
          overflow:hidden;
          text-align: center;
        }
      }
    }
  }
  .stopPop{
    .ivu-poptip-popper{
      display: none;
    }
  }
  .ivu-table-fixed-body{
    position: static!important;
  }
  .slh{
     width: 100%; 
     height:36px;
     line-height:36px;
     color:#4a4a4a
  }
  .slh:hover{
    color:#008cee;
    background:@gradeBlueFive; 
  }
  .personal-project {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid @gradeAshFive;
    border-radius: @borderRadiuBig;
    .personal-project-content {
      width: 100%;
      height: 100%;
      .personal-header {
        width:100%;
        height:50px;
        border-bottom: 1px solid @gradeAshFive;
        .personal-header-right{
          display: inline-block;
          float: right;
          .search {
            margin: 10px 0 10px 20px;
          }
          .button-in {
            margin-top: 10px;
            margin-bottom: 10px;
          }
        }
        
      }
        .ivu-table-cell {
          .text::after {
            content: " ";
            position: absolute;
            left: -10px;
            width: 15px;
            top: 15px;
            left: -15px;
            height: 15px;
            background:url('/static/icons/public/vipYellow.svg') no-repeat
          }
          .unitText::after {
            content: " ";
            position: absolute;
            left: -10px;
            width: 15px;
            top: 15px;
            left: -15px;
            height: 15px;
            background:url('/static/icons/public/vipBlue.svg') no-repeat
          }
        }
    }
  }
}
</style>

