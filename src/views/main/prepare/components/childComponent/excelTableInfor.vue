/** 
* @author 覃凤
* @date 2018/3/6
* @content 表格导入备单-表格信息
*/
<template>
  <div class="excel-table-infor">
    <tab :tab='tab' @tab-change='tabChange'>
      <div style="line-height:50px;font-weight: bold;color: #4a4a4a" slot='tabR'>共<span style="margin-left:3px;margin-right:3px;color: rgb(86,171,31);">{{ newExcelData.length }}</span>条信息</div>
    </tab>
    <!-- 表格数据 -->
    <div class="content-detailed">
      <personnel-infor :showData='newExcelData' :showThisRow='showThisRow' v-show='showWitchTab===0' class="person-info"></personnel-infor>

      <!-- 职业史信息 -->
      <career-history-infor :showData='newExcelData' v-show='showWitchTab===1' :showThisRow='showThisRow' class="occupation-info"></career-history-infor>

      <!-- 放射史信息 -->
      <radiation-his-infor :showData='newExcelData' v-show='showWitchTab===2' :showThisRow='showThisRow' class="radiation-info"></radiation-his-infor>
    </div>
    <!-- 分页 -->
    <div class="fr marginR20 marginT10">
      <page 
        :total='page.total' 
        show-sizer 
        placement='top'
        :page-size='page.page_size' 
        :page-size-opts='page.page_size_opts'
        @on-change='pageChange' 
        @on-page-size-change='pageSizeChange'>
      </page>
      <!-- <z-page 
        :total='page.total' 
        show-sizer 
        placement='top'
        :page-size='page.page_size' 
        :page-size-opts='page.page_size_opts'
        :indexNum='findErrData.page_size'
        @on-change='pageChange' 
        @on-page-size-change='pageSizeChange'>
      </z-page> -->
    </div>
  </div>
</template>
<script>
// import * as _ from 'lodash'
import tab from '@/components/tab/tab.vue'
import zPage from '@/components/readLocalData/page/page.vue'
import personnelInfor from './personnelInfor' // 人员信息
import careerHistoryInfor from './careerHistoryInfor' // 职业史信息
import radiationHisInfor from './radiationHisInfor' // 放射史信息
export default {
  name: 'excel-table-infor',
  components: {
    tab,
    zPage,
    personnelInfor,
    careerHistoryInfor,
    radiationHisInfor,
  },
  props: {
    excelData: {
      type: Array,
      default: () => {
        return []
      },
    },
    errorRow: { // 错误行
      type: Number,
      default: null,
    },
  },
  data () {
    return {
      msg: '表格导入备单-表格信息',
      tab: [
        {
          title: '人员信息',
        }, {
          title: '职业史信息',
        }, {
          title: '放射史信息',
        },
      ],
      findErrData: {
        index: 0, // 错误数据对应的当前的index
        page_size: 0, // 错误数据对应的页码
      },
      page: {
        total: 1,
        page_size: 1, // 每页显示条数
        current_page: 1,
        page_size_opts: [20, 30, 50, 100], // 切换选择显示条数数组
      },
      showThisRow: null, // 显示哪个被选中
      showWitchTab: 0, // 显示哪个tab
      pageSize: null,
    }
  },
  watch: {
    errorRow (val) {
      console.log('变化的错误数据', val)
      this.initThisRow(val)
    },
    excelData (val) {
      this.initThisRow(null)
    },
    // excelData(val) {
    //   console.log(val)
    //   this.newExcelData = val
    //   console.log(this.newExcelData)
    // },
  },
  computed: {
    newExcelData () {
      return this.excelData
    },
  },
  methods: {
    tabChange (data, index) {
      this.showWitchTab = index
    },
    pageChange (data) {
      console.log(data)
    },
    pageSizeChange (data) {
      console.log(data)
      this.page.page_size = data
    },
    initThisRow (val) {
      console.log(val)
      if (val !== null) {
        if (val > 0) {
          this.showThisRow = (val - 1)
        } else {
          this.showThisRow = val
        }
      } else {
        this.showThisRow = null
      }
    },
  },
  created() {
    this.page.page_size = this.page.page_size_opts[0]
    this.initThisRow(null)
    // this.newExcelData = _.clone(this.excelData)
  },
}
</script>
<style lang="less" scoped>
@import '~assets/less/variable.less';
@keyBg: #f4f4f4;;
.excel-table-infor {
  height: 100%;
  width: 100%;
  .ivu-page-options {
    float: right;
  }
  .content-detailed {
    height: calc(~'100% - 100px');
    width: 100%;
    border-bottom: 1px solid @gradeAshFive;
  }
}
</style>
