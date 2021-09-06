<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null,
      }
    },
    props: {
      defaultMsg: {
        type: String,
      },
      config: {
        type: Object,
      },
    },
    mounted() {
      const _this = this
/* eslint-disable */
      console.log(UE)
      this.editor = UE.getEditor('editor', this.config) // 初始化UE
      this.editor.addListener('ready', function () {
        _this.editor.focus(true)
      })
      /* document.querySelector('.edui-box.edui-button.edui-for-insertvar.edui-default').onclick = this.insertVal */
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      insertVal(e) {
        this.$emit('insertVal', this.editor)
      },
    },
    destroyed() {
      this.editor.destroy()
    },
  }
</script>
<style scoped>
/*.edui-default .edui-toolbar .edui-for-insertvar .edui-icon:before{*/
  /*content: "V";*/
  /*display: block;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*background: none;*/
/*}*/
</style>
