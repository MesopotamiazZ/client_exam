/** 
* @author ljl
* @date 2018/03/08
* @content 体检进度综合管理
*/ 
<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <keep-alive>
      <component :is="view" @changeComponent='changeRout'></component>
    </keep-alive>
  </div>
</template>

<script>
import comprehensiveProgress from './comprehensiveProgress'
import personalPage from './personalPage'
export default {
  name: 'comprehensiveProgressControl',
  components: {
    comprehensiveProgress,
    personalPage,
  },
  data () {
    return {
      view: 'comprehensiveProgress',
      id: null, // 健康档案id
      oldview: 'personalPage',
    }
  },
  methods: {
    // 变更动态组件
    changeRout (a, b) {
      this.oldview = this.view
      this.view = a
      if (b) {
        this.id = b
      }
    },
  },
}
</script>

<style lang="less">
</style>
