/** 
* @author 覃凤
* @date 2018/3/10
* @content 表格导入员工
*/
<template>
<div class="import-employees-page">
  <div class="table-import-page-con">
    <employee-introduction :companyInfor='companyInfor'></employee-introduction>
  </div>
</div>
</template>
<script>
import employeeIntroduction from '@/views/main/prepare/components/employeeIntroduction.vue'
export default {
  name: 'importEmployees',
  components: {
    employeeIntroduction,
  },
  data () {
    return {
      msg: '表格导入员工（页面）',
      companyInfor: {
        id: '',
        name: '',
      },
    }
  },
  methods: {
  },

}
</script>

<style lang="less">
@import '~assets/less/variable.less';
.import-employees-page {
  padding: @num10;
  height: 100%;
  .table-import-page-con {
    height: 100%;
    width: 100%;
  }
}
</style>
