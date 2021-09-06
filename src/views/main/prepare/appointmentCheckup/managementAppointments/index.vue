/** 
* @author ljl
* @date 2018/03/08
* @content 预约管理
*/ 
<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <keep-alive>
      <component :is="view" @changeComponent='changeRout' :firstTitle="firstTitle"></component>
    </keep-alive>
  </div>
</template>

<script>
import managementAppoint from './managementAppoint'
import personalPage from '../../progressControl/comprehensiveProgressControl/personalPage'
export default {
  name: 'managementAppointments',
  components: {
    managementAppoint,
    personalPage,
  },
  data () {
    return {
      view: 'managementAppoint',
      id: null, // 健康档案id
      oldview: 'personalPage',
      firstTitle: '预约管理',
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
