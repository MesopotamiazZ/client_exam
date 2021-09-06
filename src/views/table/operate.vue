<template>
  <div>
    <Button @click="$emit('edit', row)">编辑</Button>
    <Button @click="$emit('del', row)">删除</Button>
  </div>
</template>

<script>
export default {
  name: 'operate',
  props: {
    row: Object,
  },
  data: function () {
    return {}
  },
}
</script>

<style lang="css" scoped>
</style>
