/*
*表格上部按钮行
*@author 覃凤
*@date 2017/11/30*/
<template>
  <div class="titlet-has-slot-middle">
    <span class="titlet-has-slot-title fl font14 marginT10">
      <slot name='titletHasSlotLeftTitle'></slot>
    </span>
    <div class="fr marginR20 paddingB10 paddingT10">
      <slot name='titletHasSlotRightContent'></slot>
    </div>
    <div class="cleatBoth"></div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'title-has-slot-small',
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';

.titlet-has-slot-middle {
  height: 50px;
  overflow: hidden;
  font-size: 0;
  //background: rgb(242, 245, 250);
  .titlet-has-slot-title  {
    color: @gradeAshOne;
    height: @num30;
    line-height: @num30;
    letter-spacing: 0.04px;
    /*vertical-align: middle;*/
    &:before {
      content: '';
      margin-top: -4px;
      display: inline-block;
      margin-right: 8px;
      margin-left: @num20;
      width: 3px;
      height: 15px;
      vertical-align: middle;
      background-color: @gradeBlueOne;
    }
  }
}
</style>
