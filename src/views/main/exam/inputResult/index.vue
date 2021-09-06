<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <keep-alive>
      <component :is="currentView" @changeCompEvent='changeComp'></component>
    </keep-alive>
  </div>
</template>
<script>
const healthRecords = () => import(/* webpackChunkName: "healthRecords" */ /* webpackMode: "lazy" */'./healthRecords')
const inputResultMain = () => import(/* webpackChunkName: "main" */ /* webpackMode: "lazy" */'./main')

export default {
  name: 'inputResult',
  components: {
    healthRecords,
    inputResultMain,
  },
  data () {
    return {
      currentView: 'inputResultMain',
    }
  },
  methods: {
    // 变更动态组件
    changeComp (name) {
      this.currentView = name
    },
  },
}
</script>
<style>
</style>