/** 
* @author wzd
* @date 2018/03/07
* @content 单位体检订单管理
*/ 
<template>
  <component :is="isComponent"></component>
</template>

<script>
const unitPhyexamManageHome = () =>
  import(/* webpackChunkName: "unitPhyexamManageHome" */ /* webpackMode: "lazy" */ './unitPhyexamManageHome')
const unitPhysicalexamOrderDetail = () =>
  import(/* webpackChunkName: "unitPhysicalexamOrderDetail" */ /* webpackMode: "lazy" */ './unitPhysicalexamOrderDetail')

import {mapState, mapMutations} from 'vuex'

export default {
  name: 'unitPhysicalexamManagement',
  components: {
    unitPhyexamManageHome,
    unitPhysicalexamOrderDetail,
  },
  data () {
    return {
      isComponent: 'unitPhyexamManageHome',
    }
  },
  methods: {
    ...mapMutations('unitPhysicalexamManagementModule', ['setSwitchComponent']),
  },
  computed: {
    ...mapState('unitPhysicalexamManagementModule', ['switchComponent']),
  },
  watch: {
    switchComponent(newComponent) {
      console.log(newComponent)
      if (newComponent.component === 'unitPhyexamManageHome') {
        this.isComponent = 'unitPhyexamManageHome'
      } else {
        this.isComponent = 'unitPhysicalexamOrderDetail'
      }
    },
  },
  mounted () {
    this.setSwitchComponent({component: 'unitPhyexamManageHome', id: ''})
  },
}
</script>

<style lang="less">
</style>
