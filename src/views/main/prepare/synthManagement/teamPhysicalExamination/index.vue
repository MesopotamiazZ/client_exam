/**
* author      : yhy
* cteate      : 2018/03/02
* description : 单位
*/
<template>
  <component :is="componentName"></component>
</template>

<script>
const unitManageHome = () => import('./unitManageHome.vue')
const staffListHome = () => import('./staffListHome.vue')
const accountDetailHome = () => import('./accountDetailHome.vue')
const formImportSheet = () => import('./formImportSheet.vue')
const tableStaffIntroduction = () => import('./tableStaffIntroduction.vue')
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'teamPhysicalExamination',
  components: {
    unitManageHome, // 单位管理
    staffListHome, // 员工列表
    accountDetailHome, // 账户详情
    formImportSheet, // 表格导入备单
    tableStaffIntroduction, // 表格导入员工
  },
  data() {
    return {
      componentName: unitManageHome,
    }
  },
  computed: {
    ...mapState('teamPhysicalExaminationModule', ['switchComponent']),
  },
  methods: {
    ...mapMutations('teamPhysicalExaminationModule', ['setSwitchComponent']),
  },
  watch: {
    switchComponent(newComponent) {
      console.log(newComponent)
      if (newComponent === 'unitManageHome') {
        this.componentName = unitManageHome
      } else if (newComponent === 'accountDetailHome') {
        this.componentName = accountDetailHome
      } else if (newComponent === 'staffListHome') {
        this.componentName = staffListHome
      } else if (newComponent === 'formImportSheet') {
        this.componentName = formImportSheet
      } else if (newComponent === 'tableStaffIntroduction') {
        this.componentName = tableStaffIntroduction
      }
    },
  },
  mounted() {
    this.setSwitchComponent('unitManageHome')
  },
}
</script>

<style lang='less' scoped>

</style>
