<template>
  <div class="image-item">
    <div class="image-item-inner">
      <img class="inspect-image"
           src="/static/images/public/heartbit.jpg">
      <div v-if="data.index"
           class="description">描述</div>
      <div v-else
           class="single-relation"
           @click="singleRelation">+单项关联</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    singleRelation() {
      this.$emit('single-relation', this.data)
    },
  },
}
</script>
