/*
*主检 已/待 检所用到的表组件
*@author 张澈
*@date 2018/1/9
<template>
  <div class="simpleSearchTable" :style="{width: width + 'px'}" v-show="beShowing">
    <div class="searchBox">
      <input class="searchInput" placeholder="请输入体检号/姓名" @input="resultFilter"/>
      <i class="icon"></i>
    </div>
    <div class="tableItem" v-for="(table, index) in datas">
      <div class="selectIndicator" :style="{top: selectedTableIndex === index ? selectedRowIndex * 40 + 90 + 'px' : undefined}"></div>
      <div class="title">
        <titletHasSlot><span slot='titletHasSlotLeftTitle'>{{table.title}}<span class="title-numbers">({{table.rows.length}})</span></span></titletHasSlot>
      </div>
      <div class="tableHeader">
        <table>
          <tr>
            <th v-if="withSn" style="width: 50px">序号</th>
            <th v-for="(col, index) in table.columns" :style="{width: col.width + 'px'}">{{col.title}}</th>
          </tr>
        </table>
      </div>
      <div class="tableBody" @scroll="tableScrollX" :style="{height: table.height + 'px'}">
        <table :class="{selected: selectedTableIndex === index}" @click="selectedTableIndex = index">
          <colgroup>
            <col v-if="withSn" width="50" />
            <col v-for="(col, index) in table.columns" :width="col.width"/>
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in tableRows[index]" v-if="!row.disabled" :class="{evenLine: (index % 2), selected: selectedRowIndex === index}" @click="selectedRowIndex = index; $emit('rowclick', row.data)">
              <td v-if="withSn">
                <!--<span>{{index + 1}}</span>-->
                <span v-if="row.lockType === 0">{{index + 1}}</span>
                <img v-else-if="row.lockType === 1" src="/static/icons/public/lock.jpg" />
                <img v-else="" src="/static/icons/public/lockmyself.jpg" />
              </td>
              <td v-for="(col, index) in table.columns">{{row.data[col.key || index]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
export default {
  name: 'simpleSearchTable',
  components: {
    titletHasSlot,
  },
  props: {
    width: {
      type: Number,
    },
    datas: {
      type: Array,   // [{title, columns, rows, height}]   可以包含多张表的数据，每一个对象包含一张表的数据
                      // culomns : [{title, width, key}]
                      // rows : [{[key]: [htmlValue]}]
      default: [],
    },
    withSn: {
      type: Boolean,
      default: true,
    },
    searchColumns: {
      type: Array,
      default: [],
    },
    beShowing: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    datas(val) {
      this.tableRows = val.map((table) => {
        return table.rows.slice()
      })
    },
  },
  data() {
    return {
      selectedRowIndex: NaN,
      selectedTableIndex: NaN,
      tableRows: [],
    }
  },
  methods: {
    tableScrollX() {
      // 同步head 和 body的滚动
      console.log(event)
    },
    cancelSelect() {
      this.selectedRowIndex = -1
      this.selectedTableIndex = -1
    },
    resultFilter() {
      if (!this.searchColumns.length) {
        return
      }
      this.tableRows = []
      let searchText = event.srcElement.value
      this.datas.forEach((table, index) => {
        this.tableRows[index] = []
        this.searchColumns.forEach((searchColumnKey) => {
          this.tableRows[index] = this.tableRows[index].concat(table.rows.filter((row) => {
            return row.data[searchColumnKey].indexOf(searchText) >= 0 && this.tableRows[index].indexOf(row) === -1
          }))
        })
      })
    },
  },
}
</script>
<style lang="less" scoped>
  .simpleSearchTable{
    border-radius: 8px;
    box-shadow: 0 1px 6px 0 rgba(206, 213, 242, 0.8);
    position: absolute;
    z-index: 999;
    top: 45px;
    left: 112px;
    background-color: white;
    overflow: hidden;
    .title-numbers{
      font-size: 14px;
      color: #3AA5F1;
    }
    .searchBox{
      height: 50px;
      position: relative;
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid #D6D6D6;
      input{
        height: 30px;
        line-height: 30px;
        transition: box-shadow 0.4s linear;
        border: 1px solid #CCC;
        border-radius: 4px;
        display: block;
        margin: 10px auto 0 auto;
        width: calc(~'100% - 40px');
        padding: 0 10px;
        &:hover{
          box-shadow: 0 0 2px rgba(52, 163, 241, 0.8);
        }
        &::-webkit-input-placeholder{
          color: #aaa;
        }
      }
      .icon{
        position: absolute;
        right: 30px;
        top: 0;
        bottom: 0;
        margin: auto;
        background: url(/static/icons/public/search.png) no-repeat;
        width: 14px;
        height: 14px;
      }
    }
    .tableItem{
      position: relative;
      overflow: hidden;
      .selectIndicator{
        border: 2px solid #53C7FF;
        width: 100%;
        height: 40px;
        position: absolute;
        left: 0;
        top: -40px;
      }
      .tableHeader{
        height: 40px;
        line-height: 40px;
        background-color: #D3E9FF;
        font-size: 12px;
        overflow: hidden;
        text-align: center;
        table{
          border-collapse: collapse;
          width: 100%;
          th{
            border-left: 1px solid #DDDEDF;
            &:first-child{
              border-left: none;
            }
          }
        }
      }
      .tableBody{
        overflow: auto;
        width: 100%;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        table{
          border-collapse: collapse;
          width: 100%;
          border-bottom: 1px solid #DDDEDF;
          tr{
            &.evenLine{
              background-color: #F2F7FF;
            }
            td{
              border-left: 1px solid #DDDEDF;
              &:first-child{
                border-left: none;
              }
            }
          }
        }
      }
    }
  }
</style>
