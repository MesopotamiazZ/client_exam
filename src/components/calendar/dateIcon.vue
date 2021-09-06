<template>
<div class="dateIconOut">
  <span name='dateIconSlot'>
    <icon name='dateIcon' class="fr"></icon>
  </span>
</div>
</template>
<style lang="less" scoped>
@import (reference) "~assets/less/variable.less";
.dateIconOut {
  display: inline-block;
  position: absolute;
  right: @num10;
  z-index: 100;
  top: 7px;
  cursor: pointer;
}
</style>
<script>
export default {}
</script>
