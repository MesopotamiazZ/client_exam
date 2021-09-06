/**
* author      : yhy
* cteate      : 2017/12/14 16:28
* description : iview tableTr源码
*/
<template>
  <tr :class="rowClasses(row._index)" ref="tr" @mousedown.stop="trClick($event, row)">
    <slot></slot>
  </tr>
</template>
<script>
  export default {
    props: {
      row: Object,
      prefixCls: String,
    },
    computed: {
      objData() {
        return this.$parent.objData
      },
    },
    methods: {
      rowClasses(_index) {
        return [
          `${this.prefixCls}-row`,
          this.rowClsName(_index),
          {
            [`${this.prefixCls}-row-highlight`]: this.objData[_index] && this.objData[_index]._isHighlight,
            [`${this.prefixCls}-row-hover`]: this.objData[_index] && this.objData[_index]._isHover,
          },
        ]
      },
      rowClsName(_index) {
        return this.$parent.$parent.rowClassName(this.objData[_index], _index)
      },
      trClick (event, data) {
        if (event.button === 2) {
          this.$emit('buttonRight', data, event)
        }
      },
    },
    mounted() {
      // 右键事件
/*       this.$refs.tr.onmousedown = (event) => {
        let btnNum = event.button
        if (btnNum === 2) {
          this.$emit('buttonRight', this.row, event)
        }
        event.stopPropagation()
      } */
    },
  }
</script>
