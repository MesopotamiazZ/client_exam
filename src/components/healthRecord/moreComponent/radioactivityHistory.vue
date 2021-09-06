<template>
  <div class="radioactivityHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>放射性工作职业史</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr radioactivityHistory-title-btn"
               style="margin-left:10px"
               @click="isAllPickUp">
            <Icon :type="thisItems ? 'arrow-up-b' : 'arrow-down-b'"
                  size="8"
                  color="white"
                  style="margin-top:5px;"></Icon>
          </div>
          <ZButton :ZBtype='"ghost"'
                   class="fr"
                   @click="openM">新 增</ZButton>
        </div>
      </div>
    </titleHasSlotMiddle>
    <div v-if="thisItems"
         class="thisItems">
<!--       <ZTable :isShowSelectOrIndex="false"
              border
              stripe
              :columns="columns"
              :data="detilData"
              :isDependent="true"
              style="border:none;"></ZTable> -->

              
       <q-table 
                    ref="zBaseInfoTable"
                    :ifShowPagination="false"
                    :params="paraming"
                    :ifEdit="true"
                    :columns="columns"
                    :data="detilData"
                    :height="500"
                    :selectMode="false"
                    @on-selection-change="tableSelectionChange"
                    @edit="edit"
                    @delete="del"
                    >
       </q-table>     
    </div>
    <addOccupationalDiseaseHistory ref="addOccupationalDiseaseHistory"
                                   :id="basicInformationData.id"
                                   :detilData="rowData"
                                   :Model="newAdd"
                                   @addAbolish="addAbolish"
                                   @refresh="refresh"></addOccupationalDiseaseHistory>
    <delmodel ref="delmodel"
              @affirmDel="affirmDel"> </delmodel>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import ZTable from '@/components/table/zTable'
import addOccupationalDiseaseHistory from '../modal/addOccupationalDiseaseHistory'
import delmodel from '../otherModal/delmodel'
import { copy } from '@/utils/helper'
import { mapActions } from 'vuex'

export default {
  name: 'radioactivityHistory',
  data() {
    return {
      //
      chooseIndex: 'order',
      basicInformationRule: {},
      // 摩太框
      editIcon: '/static/icons/public/table-hover-edit.svg', // 编辑
      delIcon: '/static/icons/public/table-hover-del.svg', // 删除
      editBanIcon: '/static/icons/public/table-edit.svg', // 编辑
      delBanIcon: '/static/icons/public/table-del.svg', // 删除
      newAdd: false,
      datas: {
        data2: {
          data: '单位名称',
          name: 'order',
        },
        data3: {
          data: '部门/车间',
          name: 'check',
        },
        data4: {
          data: '工种',
          name: 'sign',
        },
      },
      thisItems: false,
      detilData: [], // 数据
      rowData: {},
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    ZTable,
    addOccupationalDiseaseHistory,
    delmodel,
  },
  watch: {
    basicInformationData(val) {
      if (val.rad_work_occup_hist) {
        this.detilData = copy(val.rad_work_occup_hist, true)
        console.log(this.detilData, '放射性工作史')
      }
    },
  },
  computed: {
    columns() {
      return [
        {
          title: '单位名称',
          key: 'unit_name',
          width: 200,
          ellipsis: true,
        },
        {
          title: '部门/车间',
          key: 'unit_dept_name',
          width: 140,
          ellipsis: true,

        },
        {
          title: '工种',
          key: 'occup_type_name',
          width: 133,
          ellipsis: true,
        },
        {
          title: '职业照射种类',
          key: 'occup_source_type',
          width: 205,
          ellipsis: true,
          render: (h, p) => {
            let a = ''
            if (p.row.occup_source_type) {
              for (let key of p.row.occup_source_type) {
                a += key + '、'
              }
              a = a.substring(0, a.length - 1)
            } else {
              a = ''
            }
            return h('div', a)
          },
        },
        {
          title: '特殊情况',
          key: 'special_case',
          width: 205,
          ellipsis: true,
          render: (h, p) => {
            let a = ''
            if (p.row.special_case) {
              for (let key of p.row.special_case) {
                a += key
              }
            } else {
              a = ''
            }
            return h('div', a)
          },
        },
        {
          title: '放射线种类',
          key: 'rad_type',
          width: 80,
          ellipsis: true,
          render: (h, p) => {
            let a = ''
            if (p.row.rad_type) {
              for (let key of p.row.rad_type) {
                if (key === 1) {
                  a += 'α射线' + '、'
                }
                if (key === 2) {
                  a += 'γ射线' + '、'
                }
                if (key === 3) {
                  a += 'β射线' + '、'
                }
                if (key === 4) {
                  a += '中子射线' + '、'
                }
                if (key === 5) {
                  a += '电子射线' + '、'
                }
                if (key === 6) {
                  a += '质子射线' + '、'
                }
                if (key === 7) {
                  a += '其他射线' + '、'
                }
              }
              a = a.substring(0, a.length - 1)
            } else {
              a = ''
            }
            return h('div', a)
          },
        },
        {
          title: '每日工作时数或工作量',
          key: 'daily_workload',
          width: 140,
          ellipsis: true,
          render: (h, p) => {
            return h('div', p.row.daily_workload + 'h')
          },
        },
        {
          title: '累积受照剂量',
          key: 'rad_amount',
          width: 92,
          ellipsis: true,

          render: (h, p) => {
            return h('div', 'ph(' + p.row.rad_amount + ')')
          },
        },
        {
          title: '过量照射史',
          key: 'excess_rad_hist',
          width: 80,
          ellipsis: true,

          render: (h, p) => {
            let a = ''
            if (p.row.excess_rad_hist === 1 || p.row.excess_rad_hist === '1') {
              a = '有'
            } else {
              a = '无'
            }
            return h('div', a)
          },
        },
        {
          title: '佩戴个人剂量计',
          key: 'is_wear_personal_dosimeter',
          width: 100,
          ellipsis: true,

          render: (h, p) => {
            let a = ''
            if (p.row.excess_rad_hist === 1 || p.row.excess_rad_hist === '1') {
              a = '有'
            } else {
              a = '无'
            }
            return h('div', a)
          },
        },
        {
          title: '备注',
          key: 'remark',
          width: 50,
          ellipsis: true,

          render: (h, p) => {
            if (p.row.remark) {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '27px',
                    height: '27px',
                    color: '#008cee',
                    'line-height': '30px',
                    'margin-right': '9px',
                    'margin-left': '5px',
                    background: "url('/static/icons/public/remarkInCell.png') no-repeat center 10px",
                  },
                  on: {
                    click: (event) => {
                    //
                    },
                  },
                }),

              ])
            }
          },
        },
/*         {
          title: '操作',
          width: 100,
          key: '',
          render: (h, params) => {
            // if (this.numberType.data.length > 0) {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '13px',
                  height: '13px',
                  'margin-right': '10px',
                  'margin-left': '5px',
                  background: 'url(' + this.editIcon + ') no-repeat',
                },
                on: {
                  click: event => {
                    this.edit(params.row, params.index, params.column)
                  },
                },
              }),
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '12px',
                  height: '13px',
                  'margin-right': '10px',
                  'margin-left': '5px',
                  background: 'url(' + this.delIcon + ') no-repeat',
                },
                on: {
                  click: event => {
                    this.delete(params.row, params.index, params.column)
                  },
                },
              }),
            ])
            // }
          },
        }, */
      ]
    },
  },
  props: {
    allItems: {
      type: Boolean,
      defalut: false,
    },
    basicInformationData: {
      type: [Object, Array],
    },
  },
  methods: {
    ...mapActions('healthRecordModule', ['irradiationDel']),
    //
    unfold() {
      this.thisItems = true
    },
    retract() {
      this.thisItems = false
    },
    isAllPickUp() {
      this.thisItems = !this.thisItems
    },
    addClassFun(a) {
      this.chooseIndex = a
    },
    openM() {
      this.newAdd = true
      this.$refs.addOccupationalDiseaseHistory.setData(true)
    },
    // 取消摩太框
    addAbolish() {
      this.newAdd = false
    },
    refresh() {
      this.newAdd = false
      this.$emit('refresh')
    },
    edit(a, b, c) {
      this.rowData = a
      this.newAdd = true
      this.$refs.addOccupationalDiseaseHistory.setData(false)
    },
    del(a, b, c) {
      this.$refs.delmodel.openM(a.id)
    },
    // 确认删除
    affirmDel(id) {
      if (id) {
        let a = {}
        let that = this
        a.id = id
        this.irradiationDel(a).then(data => {
          that.$emit('refresh')
          that.$refs.delmodel.closeM()
        })
      }
      console.log('删除')
    },
  },
  mounted() {
    // console.log('1')
  },
}
</script>
<style >

</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.radioactivityHistory {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  // box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
  border-radius: 8px;
  .thisItems {
    border-top: 1px solid #cccccc;
  }
  .ivu-table::before {
    width: 0;
    height: 0;
  }
  .ivu-table::after {
    width: 0;
    height: 0;
  }
  .radioactivityHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
  }
  .radioactivityHistory-title-btn:hover {
    cursor: pointer;
  }
  .table-header {
    height: 50px;
    border-bottom: 1px solid @gradeAshFive;
    .table-choose {
      padding-left: 20px;
      line-height: 47px;
      font-size: 14px;
      > li {
        margin-right: 25px;
        float: left;
        color: @gradeAshThree;
        // border-bottom:3px solid red;
        border-bottom: 3px solid transparent;
        > span {
          font-size: 12px;
          line-height: 18px;
          padding-left: 4px;
          padding-right: 4px;
          color: @contentBg;
          margin-left: 3px;
          display: inline-block;
          border-radius: 100px;
          background: @gradeAshFour;
        }
      }
      li:hover {
        color: @gradeBlueOne;
        font-weight: bold;
        > span {
          font-weight: normal;
          background: #83cb54;
        }
      }
      .clickChange {
        color: @gradeBlueOne;
        font-weight: bold;
        border-bottom: 3px solid @gradeBlueOne;
        > span {
          font-weight: normal;
          background: #83cb54;
        }
      }
    }
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .radioactivityHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .radioactivityHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .radioactivityHistory-row {
    height: 30px;
  }
  .radioactivityHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .radioactivityHistory-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .marginL30px {
    margin-left: 30px;
  }
  .marginT15 {
    margin-top: 15px;
  }
  .radioactivityHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>