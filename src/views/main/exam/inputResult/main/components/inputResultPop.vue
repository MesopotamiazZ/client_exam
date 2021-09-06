<template>
  <h2 name='alertHeader' class="alertHeader font14">
      <span class="alertHeaderText font14">{{ headerText }}</span>
  </h2>
</template>
<script>
export default {
  props: ['headerText'],
}
</script>
<style lang="less" scoped>
@import (reference) '~assets/less/variable.less';
.alertHeader {
  background-color: #F2F5FA;
  line-height: 50px;
  height: 50px;
  padding-left: 28px;
  border-radius: 8px 8px 0 0;
  color: @gradeAshOne;
  letter-spacing: 0.04px;
  font-weight: 500;
  .alertHeaderText::before {
    
    content: '';
    width: 3px;
    height: 17px;
    margin-right: 8px;
    display: inline-block;
    vertical-align: middle;
    background-color: #6DAAFF;
  }
}
</style>
