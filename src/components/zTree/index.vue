<template>
  <div class="">
    <Tree ref="tree" :data="data" :render="render" @on-check-change="onCheckChange"></Tree>
  </div>
</template>
<script>
  import Tree from './tree'
  export default {
    name: 'z-tree',
    components: {
      Tree,
    },
    props: {
      data: {
        type: Array,
        default () {
          return []
        },
      },
      render: Function,
    },
    methods: {
      onCheckChange(value) {
        this.$emit('on-check-change', value)
      },
    },
  }
</script>
<style>
</style>