/** 
* @author 覃凤
* @date 2018/3/13
* @content 表格导入员工（单位管理）
*/
<template>
<div class="table-staff-introduction">
  <bread 
    @button-first='buttonFirstBread' 
    secondTitle='员工列表' 
    @button-second='buttonSecBread' 
    thirdTitle='表格导入员工'>
  </bread>
  <div class="table-import-page-con">
    <employee-introduction :companyInfor='companyInfor'></employee-introduction>
  </div>
</div>
</template>
<script>
import { mapMutations } from 'vuex'
import employeeIntroduction from '@/views/main/prepare/components/employeeIntroduction.vue'
import bread from '@/views/main/prepare/components/bread'
export default {
  name: 'tableStaffIntroduction',
  components: {
    employeeIntroduction,
    bread,
  },
  data () {
    return {
      msg: '表格导入员工',
      companyInfor: {
        id: 1,
        name: '中国石油化工有限公司',
      },
    }
  },
  methods: {
    ...mapMutations('teamPhysicalExaminationModule', ['setSwitchComponent']),
    buttonFirstBread() {
      this.setSwitchComponent('unitManageHome')
    },
    buttonSecBread () {
      this.setSwitchComponent('staffListHome')
    },
  },

}
</script>

<style lang="less">
@import '~assets/less/variable.less';
.table-staff-introduction {
  padding: 0 @num10 @num10 @num10;
  height: 100%;
  .table-import-page-con {
    height: calc(~'100% - 50px');
    width: 100%;
  }
}
</style>
