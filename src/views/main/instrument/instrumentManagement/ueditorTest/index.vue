<template>
  <div class="components-container">
    <div class="info">UE编辑器示例<br>需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。</div>
    <button @click="getUEContent()">获取内容</button>
    <button @click="getRef">测试</button>
    <!-- <a href="#" @click="function(event) { event.preventDefault()}">{{111111}}</a>
    <a  @click="function(event) { event.preventDefault()}">{{222222}}</a> -->
    <z-button ZBtype="ghost" class="testData" v-for="(item,index) in testdata" :key="index" @dragstart="dragstart" @click="addContent(item)">{{Object.keys(item)[0]}}</z-button>
    <!-- <span draggable="true" @dragstart="dragstart" @click="addContent">33333333</span>
    <span draggable="true" @dragstart="dragstart" @click="addContent">22222222</span>
    <span draggable="true" @dragstart="dragstart" @click="addContent">11111111</span>
    <span draggable="true" @dragstart="dragstart" @click="addContent">33333333</span> -->
    <div class="editor-container">
      <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
    </div>
  </div>
</template>
<style> 
  .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
</style>
<script>
import UE from '@/components/ue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {UE},
  data() {
    return {
      defaultMsg: '这里是UE测试',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350,
      },
      testdata: [
        {name: 'xiaokang'},
        {sex: 'man'},
        {year: 23},
      ],
    }
  },
  methods: {
    getRef() {
      console.log(this.$refs.ue.dom)
    },
    ...mapMutations('ueditorStoreModule', ['setUeditorData']),
    dragstart(event) {
      event.dataTransfer.setData('text', event.target.innerText)
    },
    addContent(data) {
      /* console.log(data.target.innerText) */
      /* console.log(data.target.innerText) */
      this.$refs.ue.editor.focus()
      this.$refs.ue.editor.execCommand('inserthtml', `($(${Object.keys(data)[0]})$)`)
    },
    getUEContent() {
      let content = this.$refs.ue.getUEContent()
      this.setUeditorData(content)
      /* console.log(content) */
      /* this.$notify({
        title: '获取成功，可在控制台查看！',
        message: content,
        type: 'success',
      }) */
    },

  },
  computed: {
    ...mapState('ueditorStoreModule', ['ueditorStoreData']),
  },
  mounted () {
    this.$refs.ue.editor.focus()
    console.log(this.ueditorStoreData)
    /* this.$refs.ue.editor.execCommand('inserthtml', this.ueditorStoreData) */
    /* console.log(this.ueditorStoreData) */
  },
}
</script>
<style lang="less">
.testData {
  margin-right: 10px;
}
</style>
