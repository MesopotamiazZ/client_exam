<template>
  <div class="r-table-wrapper">
    <div class="r-table">
      <RTHead :columns="columns" :style="setTableWidth(columns)" :tableWidth="parentWidth" :isHead="true"></RTHead>
      <RTBody 
        :columns="columns" 
        :data="data" 
        @tr-spread="handleTrSpread" 
        :style="setTableWidth(columns)" 
        :body-height="bodyHeight" 
        :isHead="false"
        :isEdit = "isEdit"></RTBody>
    </div>
  </div>
</template>
<script>
import RTHead from './table-head.vue'
import RTBody from './table-body'
import mixin from './mixin'
// import {on, off} from './dom'
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    bodyHeight: {
      type: Number,
      default: 240,
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      parentWidth: 0,
    }
  },
  mounted() {
    let el = this.$el.parentElement
    this.parentWidth = Math.ceil(el.clientWidth)
    this.observer = elementResizeDetectorMaker()
    this.observer.listenTo(el, () => {
      this.parentWidth = el.clientWidth
    })
  },
  methods: {
    handleTrSpread(officeName, data) {
      this.$emit('tr-spread', officeName, data)
    },
  },
  components: {
    RTBody,
    RTHead,
  },
  mixins: [mixin],
  // watch: {
  //   'parentWidth': (newV, oldV) => {
  //     console.log(newV)
  //   },
  // },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
@import '~assets/less/color.less';

  *{
    box-sizing: border-box;
  }
  .r-table-wrapper{
    position: relative;
    table{
      border-collapse: collapse;
      width: 100%;
      table-layout: fixed;
    }
    .r-table{
      width: 100%;
      border-top: none;
      overflow-x: auto;
      overflow-y: hidden;
      .r-table-cell-ellipsis{
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .r-table-head{
        width: 100%;
        th{
          height: 40px;
          background: @tableTh;
          color: @gradeAshOne;
          font-size: @font12;
          font-weight: normal;
          &:not(:last-child){
            border-right: 1px solid @gradeAshFive;
          }
        }
      }
      .r-table-body{
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        td{
          text-align: center;
          height: 40px;
          font-size: @font12;
          color: @gradeAshTwo;
        }
        tr{
          &:not(:last-child){
            border-bottom: 1px solid @gradeAshFive;
          }
          td{
            &:not(:last-child){
              border-right: 1px solid @gradeAshFive;
            }
          }
        }
      }
    }
  }
</style>

