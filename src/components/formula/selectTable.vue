<template>
  <div class="formula-select-table width100P">
    <div class="formula-select-table-head width100P">
      <ul class="flex row width100P" :style="{paddingRight:paddingR+'px'}">
        <li v-for="column in columns" :style="{width:column.width}">
          <div class="cell">
            <span>{{column.title}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div ref="body" class="formula-select-table-body width100P">
      <ul ref="ulList width100P">
        <li v-for="(item,index) in copy_data" @click.stop="clickRow(item,index)" class="width100P">
          <ul class="flex row width100P" :class="{selected:selectedIndex===index}">
            <li v-for="column in columns" :style="{width:column.width}">
              <div class="cell">
                <span>{{item[column.key]}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'select-table',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    columns: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      paddingR: 0,
      copy_data: this.data,
      selectedIndex: undefined,
    }
  },
  methods: {
    addRightPadding() {
      let bodyHeight = this.$refs.body.offsetHeight
      let ulListHeight = this.$refs.ulList.offsetHeight
      if (ulListHeight > bodyHeight) {
        this.paddingR = 6
      } else {
        this.paddingR = 0
      }
    },
    clickRow(data, index) {
      this.selectedIndex = index
      this.$emit('clickRow', data, index)
    },
  },
  watch: {
    data(cur) {
      this.copy_data = JSON.parse(JSON.stringify(cur))
    },
    copy_data() {
      this.$nextTick(() => {
        this.addRightPadding()
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.addRightPadding()
    })
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .formula-select-table{
    .flex{
      display: flex;
    }
    .width100P{
      width: 100%;
    }
    .row{
      box-sizing: border-box;
      height: 40px;
      > li{
        height: 100%;
        border-right:1px solid @gradeAshFive;
      }
      > li:nth-last-child(1){
        border-right: none;
      }
    }
    .row.selected{
      border: 2px solid #68ccff !important;
    }
    ul li:nth-last-child(1) .row{
      border-bottom: 1px solid @gradeAshFive;
    }
    .cell{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span{
        width: 100%;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      }
    }
    .formula-select-table-head{
      background: @tableTh;
      border-top: 1px solid @gradeAshFive;
      .cell{
        color: #111111;
      }
    }
    .formula-select-table-body{
      height: 210px;
      overflow: auto;
      .row{
        cursor: pointer;
      }
      > ul > li:nth-child(odd){
        background: #ffffff;
        .row{
          border-left: 2px solid #ffffff;
          border-right: 2px solid #ffffff;
        }
      }
      > ul > li:nth-child(even){
        background: @tableTr;
        .row{
          border-left: 2px solid @tableTr;
          border-right: 2px solid @tableTr;
        }
      }
      > ul > li:hover{
        background: @iviTableHover;
        .row{
          border-left: 2px solid @iviTableHover;
          border-right: 2px solid @iviTableHover;
        }
      }
    }
  }
</style>