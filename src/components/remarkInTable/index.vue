<template>
  <div class="remark-in-table">
    <span class="text">{{text}}</span>
    <div class="icon"></div>
  </div>
</template>
<script>
export default {
  name: 'remark-in-table',
  props: {
    text: String,
  },
}
</script>
<style lang="less">
  .remark-in-table{
    .text{
      overflow: hidden;
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 1px;
    }
    .icon{
      margin: 0 auto;
      width: 16px;
      height: 16px;
      background: url('/static/icons/public/remarkInCell.svg') no-repeat;
    }
  }
</style>