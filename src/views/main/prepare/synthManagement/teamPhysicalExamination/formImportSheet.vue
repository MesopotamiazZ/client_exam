/** 
* @author 覃凤
* @date 2018/3/13
* @content 表格导入备单（单位管理）
*/
<template>
  <div class="form-import-sheet">
    <bread 
      @button-first='buttonFirstBread' 
      @button-second='buttonSecBread' 
      secondTitle='员工列表' 
      thirdTitle='表格导入备单'>
    </bread>
    <div class="table-import-page-con">
      <table-import :companyInfor='companyInfor'></table-import>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import tableImport from '@/views/main/prepare/components/tableImport.vue'
import bread from '@/views/main/prepare/components/bread'
export default {
  name: 'formImportSheet',
  components: {
    tableImport,
    bread,
  },
  data () {
    return {
      msg: '表格导入备单',
      companyInfor: {
        id: 2,
        name: '中国石油化工股份有限公司',
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


<style lang="less" scoped>
@import '~assets/less/variable.less';
.form-import-sheet {
  padding: 0 @num10 @num10 @num10;
  height: 100%;
  .table-import-page-con {
    height: calc(~'100% - 50px');
    width: 100%;
  }
}
</style>
