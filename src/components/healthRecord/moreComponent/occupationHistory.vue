<template>
  <div class="occupationHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>职业史</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr occupationHistory-title-btn"
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
    <addOccupationalHistory ref="addOccupationalHistory"
                            :detilData="rowData"
                            :Model="newAdd"
                            @addAbolish="addAbolish"
                            :id="basicInformationData.id"
                            @refresh="refresh"
                            ></addOccupationalHistory>
    <delmodel ref="delmodel"
              @affirmDel="affirmDel"> </delmodel>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import ZTable from '@/components/table/zTable'
import addOccupationalHistory from '../modal/addOccupationalHistory'
import delmodel from '../otherModal/delmodel'
import { mapActions } from 'vuex'

export default {
  name: 'occupationHistory',
  data() {
    return {
      //
      editIcon: '/static/icons/public/table-hover-edit.svg', // 编辑
      delIcon: '/static/icons/public/table-hover-del.svg', // 删除
      editBanIcon: '/static/icons/public/table-edit.svg', // 编辑
      delBanIcon: '/static/icons/public/table-del.svg', // 删除
      chooseIndex: 'order',
      basicInformationRule: {},
      // 摩太框
      thisItems: false,
      detilData: [],
      newAdd: false,
      rowData: {},
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    ZTable,
    addOccupationalHistory,
    delmodel,
  },
  computed: {
    columns() {
      return [
        {
          title: '单位名称',
          key: 'unit_name',
          ellipsis: true,

          width: 200,
        },
        {
          title: '部门/车间',
          key: 'unit_dept_name',
          ellipsis: true,

          width: 140,
        },
        {
          title: '工种',
          key: 'occup_type_name',
          ellipsis: true,

          width: 132,
        },
        {
          title: '总工龄',
          key: 'work_age',
          ellipsis: true,

          width: 64,
        },
        {
          title: '接害工龄',
          key: 'contact_harm_work_age',
          ellipsis: true,

          width: 68,
        },
        {
          title: '职业危害因素',
          key: 'occup_harm_factor',
          ellipsis: true,

          width: 340,
          render: (h, p) => {
            let a = ''
            if (p.row.occup_harm_factor) {
              for (let key of p.row.occup_harm_factor) {
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
          title: '备注',
          key: 'remark',
          ellipsis: true,
          width: 50,
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
          key: '',
          width: 70,
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
  watch: {
    basicInformationData(val, oldV) {
      if (val) {
        this.detilData = val.occup_hist
        console.log(this.detilData, '职业史')
      }
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
    ...mapActions('healthRecordModule', ['occupationalDel']),
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
      this.$refs.addOccupationalHistory.setData(true)
    },
    // 取消摩太框
    addAbolish() {
      this.newAdd = false
    },
    refresh() {
      this.$emit('refresh')
    },
    // 编辑
    edit(a, b, c) {
      this.rowData = a
      this.newAdd = true
      this.$refs.addOccupationalHistory.setData(false)
    },
    del(a, b, c) {
      this.$refs.delmodel.openM(a.id)
    },
    affirmDel(id) {
      if (id) {
        let a = {}
        let that = this
        a.id = id
        this.occupationalDel(a).then(data => {
          that.$emit('refresh')
          that.$refs.delmodel.closeM()
        })
      }
      console.log('删除')
    },
  },
  mounted() {
//
  },
}
</script>
<style >

</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.occupationHistory {
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e0e0e0;
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
  .occupationHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
  }
  .occupationHistory-title-btn:hover {
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
    .occupationHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .occupationHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .occupationHistory-row {
    height: 30px;
  }
  .occupationHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .occupationHistory-input {
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
  .occupationHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>