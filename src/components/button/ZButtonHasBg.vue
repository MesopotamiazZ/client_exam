/*
*有背景按钮
*@author 覃凤
*@date 2017/11/30*/
<template>
  <Button type="primary" @click="$emit('click')">
    <slot></slot>
  </Button>
</template>
<script>
export default {
  name: 'ZButtonHasBg',
}
</script>
<style scoped lang='less'>
</style>
