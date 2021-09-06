<template>
  <p name='healthyHeard' class="healthyHeard font14">
      <span class="healthyHeardText font14">{{ headerText }}</span>
  </p>
</template>
<script>
export default {
  props: ['headerText'],
}
</script>
<style lang="less" scoped>
@import (reference) '~assets/less/variable.less';
.healthyHeard {
  background-color: #F2F5FA;
  // padding: 16px 20px;
  // padding: 6px 0;
  line-height: 50px;
  height: 50px;
  // border-top-left-radius: 8px;
  // border-top-right-radius: 8px;
  color: @gradeAshOne;
  letter-spacing: 0.04px;
  .healthyHeardText::before {
    
    content: '';
    width: 3px;
    height: 17px;
    margin-left:20px; 
    margin-right: 8px;
    display: inline-block;
    vertical-align: middle;
    background-color: #6DAAFF;
  }
}
</style>
