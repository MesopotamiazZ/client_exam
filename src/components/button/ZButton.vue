/**
 * 无背景按钮
 * @author zero
 * @date 2017/11/21
 */
<template>
<Button :type='ZBtype' @click="$emit('click')">
  <slot></slot>
</Button>
</template>
<script>
export default {
  name: 'z-button',
  props: {
    ZBtype: {
      type: String,
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="less">
</style>
