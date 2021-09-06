/*
* 内容上部按钮行
* @author xk
* update xk
* @date 2017/11/30
*/
<template>
  <div class="x-content-header">
    <div v-if="showTitle" class="x-content-header-title font16">
      <slot name='title'></slot>
    </div>
    <div v-else class="x-content-header-other">
      <slot name="other"></slot>
    </div>
    <div class="x-content-header-container">
      <slot name='contents'></slot>
    </div>
  </div>
</template>
<script>
/*
说明：
  通过更改`showTitle`控制标题位置显示内容，默认：显示文字title
*/
export default {
  name: 'content-header',
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<style lang="less" scoped>
@import (reference) "~assets/less/variable.less";
.x-content-header {
  display: flex;
  align-items: center;
  height: 50px;
  overflow: hidden;
  // overflow-x: scroll;
  .x-content-header-title {
    color: @gradeAshOne;
    height: 50px;
    line-height: 50px;
    letter-spacing: 0.04px;
    overflow: hidden;
    :nth-child(1){
      display: inline;
    }
    &:before {
      content: "";
      margin-top: -4px;
      display: inline-block;
      margin-right: 6px;
      margin-left: @num20;
      width: 4px;
      height: 18px;
      vertical-align: middle;
      background-color: @gradeBlueOne;
    }
  }
  .x-content-header-other{
    height: 100%;
  }
  .x-content-header-container{
    flex: 1;
    height: 50px;
  }
}
</style>
