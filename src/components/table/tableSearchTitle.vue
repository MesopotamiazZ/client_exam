/*
*表格上部按钮行
*@author 覃凤
*@date 2017/12/15*/
<template>
  <div class="tableSearchTitle">
    <span class="titletHasSlotTitle fl font16 marginT10">
      <slot name='titletHasSlotLeftTitle'></slot>
    </span>
    <div class="fr marginR10 paddingB10 paddingT10">
      <slot name='titletHasSlotRightContent'></slot>
    </div>
    <div class="cleatBoth"></div>
  </div>
</template>
<script>
export default {
  name: 'tableSearchTitle',
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.tableSearchTitle {
  height: 50px;
  overflow: hidden;
  font-size: 0;
  .titletHasSlotTitle {
    color: @gradeAshOne;
    height: @num30;
    line-height: @num30;
    font-weight: 500;
    letter-spacing: 0.04px;
    /*vertical-align: middle;*/
    &:before {
      content: '';
      margin-top: -4px;
      display: inline-block;
      margin-right: 8px;
      margin-left: @num20;
      width: 4px;
      height: 18px;
      vertical-align: middle;
      background-color: @gradeBlueOne;
    }
  }
}
</style>
