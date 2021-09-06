/* jiangyiling */
/* 单位体检订单管理 */
<template>
  <div class="unitPhyexamManageHome-all">
    <div class="unitPhyexamManageHome-all-content">
      <!-- 页面头部 -->
      <titlet-hasSlot>
        <span slot="titletHasSlotLeftTitle">单位体检订单管理</span>
        <div slot="titletHasSlotRightContent"
             class="content">
          <search-input class="input"
                        searText="请输入搜索内容"
                        @on-enter="enterSearch"
                        @on-Icon="enterSearch"
                        @on-cancel="enterSearch"
                        :searchWidth='351'></search-input>
        </div>
      </titlet-hasSlot>
      <!-- 表格 -->
      <div class="table"
           ref="content">
        <!--  @edit="editRow"
                         @edit-row="editRow"
                         @on-row-dbClick="editRow" -->
        <q-table ref="baseInfoTable"
                 :showOperateColumn="false"
                 :columns="columns"
                 :pageInfo="pageInfo"
                 :height="tableHeight"
                 :data="unitPhyExamTypesLists"
                 :requestDataApi="getUnitPhyExamTypeListFun"
                 :params="params"
                 :ifEdit="true"
                 :width="1450"
                 @on-row-dbClick="editRow"
                 @after-request="afterRequest">
        </q-table>
      </div>
    </div>

    <!-- 单位附加费 -->
    <div class="editSurcharge"
         v-if="editSurchargeDiv">
      <Modal v-model="editSurchargeDiv"
             width="452"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <alert-header headerText="单位附加费"
                        :showInput="false"></alert-header>
        </div>
        <div class="content-footer">
          <!-- <ul>
            <li class="lis">
              <span class="spans">单位名称</span>
              <Input v-model="editData.unit_name"
                     class="company-name"
                     type="text"
                     disabled></Input>
            </li>
            <li class="lis">
              <span class="spans">单位体检号</span>
              <Input v-model="editData.unit_sn"
                     class="exam-no"
                     type="text"
                     disabled></Input>
              <span class="cost-type-title spans">费用类别</span>
              <Select v-model="editData.unitPeStatusNew"
                      placeholder=" "
                      class="cost-type"
                      type="text">
                <Option v-for="(item,index) in unitPeStatus"
                        :key="item.unit_pe_status"
                        :value="item.unit_pe_status">
                  {{item.label}}
                </Option>
              </Select>
            </li>
            <li class="lis">
              <span class="spans">附加费名称</span>
              <Select v-model="editData.costName"
                      placeholder=" "
                      class="same-item"
                      type="text">
                <Option v-for="(item,index) in costName"
                        :key="item.value"
                        :value="item.value">
                  {{item.label}}
                </Option>
              </Select>
            </li>
            <li class="lis1">
              <Input v-model="editData.unitPrice"
                     class="dis-charge"
                     type="text"
                     disabled></Input>
            </li>
            <li class="lis">
              <span class="spans">收费金额</span>
              <z-input v-model="editData.costNumber"
                     class="same-item self-input-price"
                     type="number"></z-input>
            </li>
          </ul> -->
          <Form ref="surchargeForm"
                :model="surchargeForm.data"
                :rules="surchargeForm.rules"
                :label-width="60 + 10"
                class="surcharge-form">
            
          </Form>
          <div class="footer">
            <Checkbox class="checkBox">打印缴费凭条</Checkbox>
            <Button type="primary"
                    class="marginR20"
                    @click="editSurchargeDiv = false">保 存</Button>
            <Button type="ghost"
                    @click="editSurchargeDiv = false">取 消</Button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
/* import { mapState, mapActions, mapGetters } from 'vuex' */
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'
import moment from 'moment'
export default {
  name: 'unitPhyexamManageHome',
  components: {
    titletHasSlot,
  },
  data() {
    return {
      /* pageInfo: {
        current_page: 0,
        total: 1,
        per_page: 20,
      }, */
      costName: [
        {
          label: '早餐费',
          value: 1,
        },
      ],
      editData: {
        unit_name: '',
        unit_sn: '',
        unitPeStatusNew: 1,
        costName: 1,
        costNumber: null,
        unitPrice: '4.00元',
      },
      editSurchargeDiv: false,
      params: {
        search: '',
      },
      unitPeStatus: [
        {
          label: '已预约',
          value: 1,
        },
        {
          label: '体检中',
          value: 2,
        },
        {
          label: '已完成',
          value: 3,
        },
      ],
      urlRemark: '/static/icons/public/remarkInCell.svg',
      urlVipBlue: '/static/icons/public/vipBlue.svg',
      tableHeight: 400,
    }
  },
  methods: {
    ...mapMutations('unitPhysicalexamManagementModule', ['setSwitchComponent']),
    ...mapActions('unitPhysicalexamManagementModule', [
      'getUnitPhyExamTypeListFun',
    ]),
    gotoUnitOrderDetail(data) {
      console.log(data)
      this.setSwitchComponent({
        component: 'unitPhysicalexamOrderDetail',
        id: data,
      })
    },
    test() {
      this.editSurchargeDiv = true
    },
    editDataFun(data) {
      this.editData.unit_name = data.unit_name
      this.editData.unit_sn = data.unit_sn
    },
    editRowTodo(data) {
      this.editDataFun(data)
    },
    afterRequest() {
      console.log()
    },
    editRow(owData, event) {
      // this.editDataFun(owData)
      // this.editSurchargeDiv = true
      // console.log('owData', owData)
      this.gotoUnitOrderDetail(owData.id)
    },
    async enterSearch(val) {
      /* if (!val && !this.searchText) {
        return
      } */
      this.params.search = val
      /* this.params.search = val
      this.$refs.baseInfoTable.currentPage = 1
      this.$refs.baseInfoTable.allSelection = [] */
      /* this.showDelButton = true */
      /* this.searchText = val */
    },
  },
  computed: {
    ...mapState(['windowHeight']),
    ...mapState('unitPhysicalexamManagementModule', ['switchComponent']),
    ...mapGetters('unitPhysicalexamManagementModule', [
      'unitPhyExamTypesLists',
      'pageInfo',
    ]),
    /* costName: [
      {
        label: '早餐费',
        value: 1,
      },
    ], */
    columns() {
      return [
        {
          title: '状态',
          ellipsis: true,
          key: 'unit_pe_status',
          width: 55,
          render: (h, params) => {
            return h(
              'span',
              this.unitPeStatus[params.row.unit_pe_status - 1].label,
            )
          },
        },
        {
          title: '单位体检号',
          ellipsis: true,
          key: 'unit_sn',
          width: 93,
        },
        {
          title: '单位名称',
          ellipsis: true,
          key: 'unit_name',
          render: (h, params) => {
            return h(
              'span',
              {
                class: 'unit-name',
                style: {
                  background:
                    params.row.unit.is_vip === 0
                      ? `url(${this.urlVipBlue}) no-repeat 4px 3px`
                      : 'none',
                },
              },
              params.row.unit_name,
            )
            /* return h('div', [
              h(
                'span',
                {
                  class: 'unit-name',
                  style: {
                    background:
                      params.row.unit.is_vip === 1
                        ? `url(${this.urlVipBlue}) no-repeat 4px 3px`
                        : 'none',
                  },
                },
                params.row.unit_name,
              ),
            ]) */
          },
        },
        {
          title: '经济行业',
          ellipsis: true,
          key: 'econ_industry_name',
          width: 123,
        },
        {
          title: '经济类型',
          ellipsis: true,
          key: 'economic_type_name',
          width: 123,
        },
        {
          title: '待收金额（元）',
          ellipsis: true,
          width: 104,
          key: 'collect_amount',
        },
        {
          title: '预约人数（人）',
          ellipsis: true,
          width: 104,
          key: 'number',
        },
        {
          title: '完检人数（人）',
          ellipsis: true,
          width: 104,
          key: 'person_count',
        },
        {
          title: '录入人',
          ellipsis: true,
          width: 98,
          key: 'operater',
        },
        {
          title: '预约日期',
          ellipsis: true,
          width: 88,
          key: 'appt_time',
          render: (h, params) => {
            if (params.row.updated_at) {
              return h(
                'span',
                moment(parseInt(params.row.updated_at * 1000)).format(
                  'YYYY-MM-DD',
                ),
              )
            } else {
              return h('span', '/')
            }
          },
        },
        {
          title: '登记日期',
          ellipsis: true,
          width: 88,
          key: 'created_at',
          render: (h, params) => {
            return h(
              'span',
              moment(parseInt(params.row.created_at * 1000)).format(
                'YYYY-MM-DD',
              ),
            )
          },
        },
        {
          title: '备注',
          ellipsis: true,
          key: 'remarks',
          width: 50,
          render: (h, params) => {
            let val = params.row.remarks
            if (val) {
              return h('remark-in-table', {
                props: {
                  text: val,
                },
              })
            }
            return ''
          },
        },
        {
          title: '操作',
          key: 'todo',
          ellipsis: true,
          fixed: 'right',
          width: 126,
          _pop: false,
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  class: 'additional-charges',
                  on: {
                    click: event => {
                      event.stopPropagation()
                      this.editRowTodo(params.row)
                      this.editSurchargeDiv = true
                    },
                  },
                },
                '附加费用',
              ),
              h(
                'span',
                {
                  class: 'modifyOrder',
                  on: {
                    click: event => {
                      event.stopPropagation()
                      this.gotoUnitOrderDetail(params.row.id)
                    },
                  },
                },
                '修改订单',
              ),
            ])
          },
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.content.offsetHeight
    },
    editSurchargeDiv(val) {
      this.editData = {
        unit_name: '',
        unit_sn: '',
        unitPeStatusNew: 1,
        costName: 1,
        costNumber: null,
        unitPrice: '4.00元',
      }
    },
  },
  mounted() {
    this.tableHeight = this.$refs.content.offsetHeight
    console.log('pageinfo', this.pageInfo)
  },
  destroyed() {
    /* this.requestPagingo() */
  },
}
</script>
<style lang="less" >
@import (reference) '~assets/less/variable.less';
.unitPhyexamManageHome-all {
  padding: 10px;
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  .unitPhyexamManageHome-all-content {
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    .titlet-has-slot {
      overflow: visible;
      .content {
        .search-input {
          margin-right: 0px;
        }
      }
    }
    .table {
      height: calc(~'100% - 50px');
      .unit-name {
        display: inline-block;
        padding-left: 20px;
        padding-right: 20px;
        width: auto;
      }
      .F::after {
        content: '';
        width: 20px;
      }
      .additional-charges {
        display: inline-block;
        width: 48px;
        color: #008cee;
        line-height: 30px;
        margin-right: 9px;
        margin-left: 5px;
      }
      .modifyOrder {
        display: inline-block;
        width: 48px;
        color: #008cee;
        line-height: 30px;
        margin-right: 5px;
      }
      .ivu-table-fixed-right {
        width: 130px !important;
      }
      .ivu-table-fixed-body table colgroup col {
        width: 130px !important;
      }
    }
  }
  .editSurcharge {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .ivu-modal-footer {
      display: none;
    }
    .content-footer {
      // ul {
      //   .lis {
      //     margin-top: 20px;
      //     margin-left: 20px;
      //     display: flex;
      //     .spans {
      //       line-height: 30px;
      //       display: inline-block;
      //       width: 60px;
      //       margin-right: 10px;
      //       text-align-last: justify;
      //     }
      //     .company-name {
      //       width: 342px;
      //     }
      //     .same-item {
      //       width: 342px;
      //     }
      //     .exam-no {
      //       width: 144px;
      //     }
      //     .cost-type {
      //       width: 120px;
      //     }
      //     .cost-type-title {
      //       margin-left: 20px;
      //       width: 48px;
      //     }
      //     .unit-price {
      //       margin-left: 10px;
      //       width: auto;
      //     }
      //     // .dis-charge {
      //     //   width: 342px;
      //     // }
      //   }
      //   .lis1 {
      //     width: 342px;
      //     margin-left: 90px;
      //   }
      // }
      .surcharge-form {
        // padding-top: @num20;
        font-size: 0;
        .surcharge-form-row {
          padding: 0 @num20;
          height: 30px;
          & > .ivu-form-item-label {
            padding: @num10 @num10 0 0;
            text-align: justify;
            &::after {
              content: '';
              display: inline-block;
              width: 100%;
              overflow: hidden;
              height: 0%;
            }
            &::before {
              display: none;
            }
          }
          &.ivu-form-item {
            margin-bottom: @num20;
          }
        }
      }
      .footer {
        height: 50px;
        margin-top: 20px;
        padding-bottom: 20px;
        margin-left: 151px;
        display: flex;
        .checkBox {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          margin-right: 20px;
          .ivu-checkbox {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
