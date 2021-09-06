/** 
* @author 覃凤
* @date 2018/3/5
* @content 表格导入备单（页面）
*/
<template>
  <div class="table-import-page">
    <!-- <iframe id='iframePrint' src="/static/jianqian/个人体检项目收费清单.html" frameborder="0" style="display:none;"></iframe>
    <Button @click="clickk">个人体检项目收费清单</Button> -->
    <div class="table-import-page-con">
      <table-import :companyInfor='companyInfor'></table-import>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import tableImport from '@/views/main/prepare/components/tableImport.vue'
export default {
  name: 'formImportList',
  components: {
    tableImport,
  },
  data () {
    return {
      msg: '表格导入备单（页面）',
      companyInfor: {
        id: '',
        name: '',
      },
    }
  },
  methods: {
    ...mapActions(['subscribeScanGun', 'desubscribeScanGun']),
    // clickk() {
    //   let a = document.getElementById('iframePrint')
    //   a.contentWindow.print()
    // },
    // initTest (data) {
    //   console.log(data)
    // },
  },
  mounted () {
    // 订阅扫码枪
    // this.subscribeScanGun(this.initTest)
  },
  // destroyed () {
  //   this.desubscribeScanGun(this.initTest)
  // },
}
</script>


<style lang="less" scoped>
@import '~assets/less/variable.less';
.table-import-page {
  padding: @num10;
  height: 100%;
  .table-import-page-con {
    height: 100%;
    width: 100%;
  }
}
</style>
