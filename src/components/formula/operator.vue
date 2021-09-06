<template>
  <div class="formula-operator">
    <ul>
      <li @click="clickItem('+')"><span :style="{fontSize:'22px'}">+</span></li>
      <li @click="clickItem('-')"><span :style="{fontSize:'30px'}">-</span></li>
      <li @click="clickItem('*')"><span :style="{fontSize:'26px',marginTop:'5px'}">*</span></li>
      <li @click="clickItem('/')"><span :style="{fontSize:'16px'}">/</span></li>
      <li @click="clickItem('(')"><span :style="{fontSize:'22px'}">(</span></li>
      <li @click="clickItem(')')"><span :style="{fontSize:'22px'}">)</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'operator',
  methods: {
    clickItem(str) {
      this.$emit('clickItem', str)
    },
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .formula-operator{
    width: 140px;
    user-select:none;
    ul{
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      border-top: 1px solid @gradeAshFive;
      li{
        cursor: pointer;
        width: 50%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid @gradeAshFive;
      }
      li:nth-child(odd){
        border-right: 1px solid @gradeAshFive;
      }
      li:active{
        background: @buttonActiveBG;
      }
      span{
        display: inline-block;
        color: @gradeBlueOne
      }
    }
  }
</style>