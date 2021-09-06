<template>
  <div class="status-in-table">
    <div class="icon"></div>
  </div>
</template>
<script>
export default {
  name: 'status-in-table',
}
</script>
<style lang="less">
  .status-in-table{
    .icon{
      margin: 0 auto;
      background: url('/static/icons/public/enabledState.svg') no-repeat;
      width: 16px;
      height: 16px;
    }
  }
</style>