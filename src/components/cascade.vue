<template>
  <div class="cascadeContainer">
    <div v-for="(box, index) in boxes" class="box">
      <div class="boxHeader" @click="toggle(index)">
        <span class="headerTitle" v-if="!box.headerRender" >{{box.title}}</span>
        <renderBox v-else :param="box" :render="box.headerRender"></renderBox>
      </div>
      <div class="boxBody" v-show="box.spread" >
        <renderBox v-if="box.render" :param="box" :render="box.render"></renderBox>
        <slot v-else :name="box.slot"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cascade',
  components: {
    renderBox: {
      functional: true,
      props: {
        attrs: Object,
        render: Function,
        param: Object,
      },
      render: (h, ctx) => {
        if (ctx.props.render) {
          return ctx.props.render(h, ctx)
        } else {
          return h('div', {...ctx.props.attrs})
        }
      },
    },
  },
  props: {
    data: Array,   // [{title, headerRender, slot, spread, render}]
  },
  data() {
    return {
      boxes: null,
    }
  },
  created() {
    if (this.data) {
      this.data.forEach((box) => {
        if (!box.spread) box.spread = false
      })
      this.boxes = this.data
    }
  },
  methods: {
    toggle(index) {
      let box = this.boxes[index]
      box.spread = !box.spread
      console.log(box)
    },
  },
}
</script>

<style lang="less" scoped>
  .cascadeContainer{
    .box{
      overflow: hidden;
      margin-top: 10px;
      .boxHeader{
        height: 30px;
        line-height: 30px;
        background-color: #DFF0FF;
        .headerTitle{
          display: inline-block;
          font-weight: bold;
          padding-left: 10px;
        }
      }
      .boxBody{
        overflow: hidden;
      }
    }
  }
</style>
