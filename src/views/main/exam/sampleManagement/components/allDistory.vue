<template>
  <div class="allDistory">
      <p>确定将全部采样记录作废吗？</p>
      <span>作废原因</span>
      <textarea class="result"></textarea>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
  .allDistory{
    margin-left: 20px;
    margin-right:20px;
  }
  p{
    margin-top: 20px;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0.06px;
  }
  span{
    display: block;
    margin-top: 20px;
    font-size: 12px;
    color: #737373;
  }
  .result{
    margin-top: 10px;
    height: 100px;
    width: 485px;
    overflow-y: scroll;
    resize:none;
    border-radius: 4px;
    border: 1px solid #CCCCCC;
  }
</style>
