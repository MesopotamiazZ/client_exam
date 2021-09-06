<template>
  <div class="result-management-wrapper padding10 height100P">
    <div class="result-management height100P contentBg">
      <div class="main-table height100P">
        <title-has-slot>
          <span slot="titletHasSlotLeftTitle">结果配置管理</span>
          <div slot="titletHasSlotRightContent" class="titlet-slot-left">
            <Button type="primary" v-if="mainTable.selectMode" class="fr " @click="mainTable.selectMode=false" key="1">取 消</Button>
            <!-- <Button type="ghost" v-if="selectMode" class="fr marginR10" @click="print" key="2">打 印</Button> -->
            <Button
              key="3"
              type="success"
              v-if="mainTable.selectMode"
              class="fr marginR10  delete-button"
              :disabled="mainTable.selection.length===0"
              @click="mainTableDelSelect">删 除
            </Button>
            <Button type="ghost" v-if="!mainTable.selectMode" class="fr " @click="mainTable.selectMode=true" key="4">选 择</Button>
            <Button type="ghost" v-if="!mainTable.selectMode" class="fr marginR10" @click="mainTableAdd" key="6">新 增</Button>
            <!-- <search-input
              :searchWidth="220"
              class="fr marginL20 marginR20"
              searText="请输入搜索内容"
              @on-enter="search"
              @on-Icon="search"
              @on-cancel="search">
            </search-input> -->
          </div>
        </title-has-slot>
        <div class="main-table-wrapper"  ref="mainTableWrapper">
          <q-table
            ref="mainTable"
            :columns="mainTable.columns"
            :data="mainTable.data"
            :selectMode="mainTable.selectMode"
            :isBorder="true"
            :height="mainTable.tableHeight"
            :showOperateColumn="false"
            @on-row-click="mainTableRowClick"
            @all-selection="mainTableSelectChange"
            ></q-table>
        </div>
      </div>
      <div class="sub-table contentBg" v-if="mainTable.curRow">
        <title-has-slot>
          <div slot="titletHasSlotRightContent" class="titlet-slot-left">
            <Button type="primary" v-if="subTable.selectMode" class="fr " @click="subTable.selectMode=false" key="1">取 消</Button>
            <Button
              key="3"
              type="success"
              v-if="subTable.selectMode"
              class="fr marginR10  delete-button"
              :disabled="subTable.selection.length===0"
              @click="subTableDelSelect">删 除
            </Button>
            <Button type="ghost" v-if="!subTable.selectMode" class="fr " @click="subTable.selectMode=true" key="4">选 择</Button>
            <Button type="ghost" v-if="!subTable.selectMode" class="fr marginR10" @click="subTableAdd" key="6">新 增</Button>
          </div>
        </title-has-slot>
        <div class="sub-table-wrapper"  ref="subTableWrapper">
          <q-table
            ref="subTable"
            :columns="subTable.columns"
            :data="subTable.data"
            :selectMode="subTable.selectMode"
            :height="subTable.tableHeight"
            :showOperateColumn="false"
            :ifShowPagination="false"
            @all-selection="subTableSelectChange"
            ></q-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'resultManagement',
  data() {
    return {
      mainTable: {
        columns: [
          {
            title: '组合项目',
            key: 'name',
          },
          {
            title: '类名称',
            key: 'className',
          },
          {
            title: '程序集名称',
            key: 'setName',
          },
          {
            title: '显示顺序',
            key: 'sort',
            width: 70,
          },
          {
            title: '操作',
            width: 136,
            canSort: false,
            render: (h, params) => {
              return h(
                'div',
                {
                  class: ['custom-operater'],
                },
                [
                  h(
                    'span',
                    {
                      domProps: {
                        innerText: '结果配置',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          this.mainTableOperaterClick1(params.row, params.index)
                        },
                      },
                    },
                  ),
                  h(
                    'span',
                    {
                      domProps: {
                        innerText: '修改',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          this.mainTableOperaterClick2(params.row, params.index)
                        },
                      },
                    },
                  ),
                  h(
                    'span',
                    {
                      domProps: {
                        innerText: '删除',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          this.mainTableOperaterClick3(params.row, params.index)
                        },
                      },
                    },
                  ),
                ]
              )
            },
          },
        ],
        data: [
          {
            id: 1,
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            id: 2,
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            id: 3,
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            id: 4,
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
        ],
        selectMode: false,
        selection: [],
        tableHeight: 400,
        curRow: undefined,
      },
      subTable: {
        columns: [
          {
            title: '组合项目',
            key: 'name',
          },
          {
            title: '类名称',
            key: 'className',
          },
          {
            title: '程序集名称',
            key: 'setName',
          },
          {
            title: '显示顺序',
            key: 'sort',
            width: 70,
          },
          {
            title: '操作',
            width: 136,
            canSort: false,
            render: (h, params) => {
              return h(
                'div',
                {
                  class: ['custom-operater'],
                },
                [
                  h(
                    'span',
                    {
                      domProps: {
                        innerText: '结果配置',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          this.mainTableOperaterClick1(params.row, params.index)
                        },
                      },
                    },
                  ),
                  h(
                    'span',
                    {
                      domProps: {
                        innerText: '修改',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          this.mainTableOperaterClick2(params.row, params.index)
                        },
                      },
                    },
                  ),
                  h(
                    'span',
                    {
                      domProps: {
                        innerText: '删除',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          this.mainTableOperaterClick3(params.row, params.index)
                        },
                      },
                    },
                  ),
                ]
              )
            },
          },
        ],
        data: [
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
          {
            name: '电测听（骨导）',
            className: 'X_Rayed.X_Rayed',
            setName: 'X_Rayed.dll',
            sort: 1,
          },
        ],
        selectMode: false,
        selection: [],
        tableHeight: 400,
      },
    }
  },
  computed: {
    ...mapState(['windowHeight']),
  },
  watch: {
    windowHeight() {
      this.mainTable.tableHeight = this.$refs.mainTableWrapper.offsetHeight
    },
  },
  methods: {
    mainTableDelSelect() {
      //
    },
    mainTableAdd() {
      //
    },
    mainTableSelectChange(data) {
      this.mainTable.selection = data
    },
    mainTableRowClick(selection, row) {
      this.mainTable.curRow = this.mainTable.curRow && this.mainTable.curRow.id === row.id ? undefined : row
    },
    mainTableOperaterClick1(row, index) {
      console.log(row, index)
    },
    mainTableOperaterClick2(row, index) {
      console.log(row, index)
    },
    mainTableOperaterClick3(row, index) {
      console.log(row, index)
    },
    subTableDelSelect() {
      //
    },
    subTableAdd() {
      //
    },
    subTableSelectChange(data) {
      this.mainTable.selection = data
    },
  },
  mounted() {
    this.mainTable.tableHeight = this.$refs.mainTableWrapper.offsetHeight
  },
  activated() {
    this.mainTable.tableHeight = this.$refs.mainTableWrapper.offsetHeight
  },
  destroyed() {
    // this.reset()
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .result-management-wrapper{
    .result-management{
      position: relative;

      .custom-operater{
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          color: @gradeBlueOne;
        }
        span:nth-child(2){
          margin: 0 10px;
        }
        span:nth-last-child(1){
          color: @tsIcon;
        }
      }
      .main-table-wrapper{
        height: calc(~"100% - 50px");
      }
      .sub-table{
        width: 100%;
        height: 50%;
        bottom: 0;
        position: absolute;
        border-radius: 8px;
        z-index: 10;

        .titlet-has-slot-title{
          display: none;
        }
      }
      .sub-table-wrapper{
        height: calc(~"100% - 50px");
        .custom-defined-table,
        .ivu-table-wrapper,
        .ivu-table{
          height: 100% !important;
        }
        .ivu-table:before{
          display: none;
        }
        .ivu-table-body{
          height: calc(~"100% - 40px") !important;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }
    }
  }
</style>