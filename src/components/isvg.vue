/**
 * svg图片加载组件
 * @author zero
 * @date 2017/11/21
 */
<template>
  <div :class="loaded ? '' : 'hide'">
    <embed class="hide" :src='src' type="image/svg+xml" ref="embed"/>
  </div>
</template>
<script>
export default {
  name: 'i-svg',
  data () {
    return {
      loaded: false,
    }
  },
  props: {
    'src': String, // 文件地址
  },
  mounted () {
    this.$refs.embed.onload = function () {
      try {
        this.$el.appendChild(this.$refs.embed.getSVGDocument().children[0])
        this.$el.removeChild(this.$refs.embed)
        this.loaded = true
      } catch (e) {
        console.error('component isvg', e)
      }
    }.bind(this)
  },
}
</script>
<style scoped>
.hide {
  visibility: none;
}
</style>
