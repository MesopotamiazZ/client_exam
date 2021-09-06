/* 
HW */
<template>
  <div class="titlet-has-slot-small">
    <span class="titlet-has-slot-title fl font12 marginT10">
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
.titlet-has-slot-small {
  height: 36px;
  overflow: hidden;
  font-size: 0;
  .titlet-has-slot-title  {
    color: @gradeAshOne;
    height: 16px;
    line-height: 16px;
    letter-spacing: 0.04px;
    &:before {
      content: '';
      margin-top: -4px;
      display: inline-block;
      margin-right: 8px;
      margin-left: @num20;
      width: 2px;
      height: 14px;
      vertical-align: middle;
      background-color: @gradeBlueOne;
    }
  }
}
</style>
