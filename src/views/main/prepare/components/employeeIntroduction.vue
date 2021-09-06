/** 
* @author 覃凤
* @date 2018/3/10
* @content 表格导入员工（组件）
* id：传入的单位id，cancel-data：取消按钮，commit-data：完成按钮
*/
<template>
  <div class="employee-introduction">
    <div class="contentBg">
      <title-has-slot class="title-has-slot">
        <span slot="titletHasSlotLeftTitle">{{ msg }}<span v-if='!showCompanyName'>（{{ companyInfor.name }}）</span></span>
        <div slot='titletHasSlotRightContent' class="titlet-has-slot-right-content">
          <Button class="marginR10" type="primary" @click='importDataBtn'>表格导入</Button>
          <Button class="marginR10" type="primary" :disabled='commitDisabled'>保 存</Button>
          <Button type="ghost" @click='clearData'>清 空</Button>
        </div>
      </title-has-slot>
      <!-- 表格内容显示及必填项 -->
      <div class="table-import-excel-list">
        <!-- 备单信息（必填） -->
        <Form ref="mustInfor" :rules='dataRule' :model='emitData'>
          <div  ref='tableImport' class="table-import-must-infor"  v-if='showCompanyName'>
            <!-- 单位名称，通过是否有单位id判断 -->
            <div class="unit-name flex marginR20 paddingL20 paddingB20">
              <span class="marginR10">单位名称</span>
              <div class="flx1">
                <FormItem prop='self_companyName'>
                  <Input v-model.trim="emitData.self_companyName" class="marginT20" :class="{inputVerificationTs:isEmpty(emitData.self_companyName)}"></Input>
                </FormItem>
              </div>
            </div>
          </div>
        </Form>
        <!-- 显示表格内容 -->
        <div  :class="{tableImportContentL2: !ifOneLine,tableImportContent:ifOneLine}">
          <excel-table-infor-staff :excelData='importData' :errorRow='errorRow'></excel-table-infor-staff>
        </div>
      </div>
    </div>
    <!-- 错误列表 -->
    <div class="table-import-err-list contentBg">
      <error-list :errorData='errorData' @error-choose-data='errorDataRow'></error-list>
    </div>
    <!-- 表格导入弹窗 -->
    <excel-modal :excelModal.sync='showExcelModal' @upgradeVipSure='importExcel'></excel-modal>
  </div>
</template>
<script>
// import * as _ from 'lodash'
import {mapActions, mapGetters} from 'vuex'

import errorList from './childComponent/errorList.vue' // 错误信息
import excelTableInforStaff from './childComponent/excelTableInforStaff.vue' // 表格内容显示
import excelModal from './childComponent/excelModal.vue' // 选择文件导入弹窗
export default {
  name: 'employee-introduction',
  components: {
    errorList,
    excelTableInforStaff,
    excelModal,
  },
  props: {
    companyInfor: {
      type: Object,
      default: () => {
        return {
          id: '',
          name: '',
        }
      },
    },
  },
  data () {
    return {
      msg: '表格导入员工',
      showExcelModal: false, // 显示导入弹窗
      commitDisabled: true, // 保存按钮能否点击
      showCompanyName: true, // 是否显示单位名称
      ifOneLine: true, // 信息行是否是一行
      getOrderIng: [], // 进行中订单数据
      importData: [], // 导入的数据
      errorData: { // 错误数据
        data_code: '',
        count: null, // 总条数
        filename: '', // 所属文件名称
        _error: [],
      },
      widnowHeight: 0,
      emitData: { // 保存提交到后台的数据
        // id: '',
        self_companyName: '',
        self_allData: [], // 表格导入的数据
      },
      errorRow: null, // 错误数据行，需要传入excel显示的表格
      dataRule: {
        self_companyName: [
          {
            required: true,
            message: '单位名称不为空',
            trigger: 'blur',
            // type: String,
          },
        ],
      },
    }
  },
  watch: {
    errorData (val) {
      console.log(val)
    },
    // 'errorData._error'(val) {
    //   if (val.length === 0) {
    //     this.commitDisabled = false
    //   } else {
    //     this.commitDisabled = true
    //   }
    // },
  },
  computed: {
    ...mapGetters('formImportListModule', [
    ]),
  },
  methods: {
    ...mapActions('formImportListModule', [
    ]),
    widnowHeightFn () {
      this.widnowHeight = document.documentElement.offsetHeight
      if (this.showCompanyName) {
        this.ifOneLine = true
      } else {
        this.ifOneLine = false
      }
    },
    isEmpty(data) {
      if (data === '' || data === undefined) {
        return true
      } else {
        return false
      }
    },
    /* ==========================================================页面头部操作 */
    // 表格导入
    importDataBtn () {
      this.showExcelModal = true
    },
    importExcel () { // 表格导入
      this.importData = [
        {
          num: 2,
          realname: '张瑞',
          id_card: '510402199108202265',
          sex: '男',
          age: 23,
          dept_name: '修理',
          self_zw: '职员',
          mobile: 18587425206,
          package_name: '成都市郫都区橡树湾',
          self_pay: 0.5,
          payment: '员工',
          occup_type_name: '修理',
          total_work_age: 3,
          injury_age: 0,
        }, {
          num: 3,
          realname: '王树彤',
          id_card: '510402199111203065',
          sex: '女',
          age: 22,
          dept_name: '洗车',
          self_zw: '职员',
          mobile: 18587425206,
          package_name: '成都市武侯区汇景新村3栋',
          self_pay: 0.5,
          payment: '员工',
          occup_type_name: '洗车',
          total_work_age: 1,
          injury_age: 0,
        },
      ]
      this.errorData = {
        data_code: '',
        count: 1, // 总条数
        filename: '文件1', // 所属文件名称
        _error: [],
      }
      // if (this.errorData.filename === '') {
      //   // if (this.errorData._error.length === 0) {
      //   //   this.commitDisabled = false
      //   // } else {
      //   this.commitDisabled = true
      //   // }
      // } else {
      if (this.errorData._error.length === 0) {
        this.commitDisabled = false
      } else {
        this.commitDisabled = true
      }
      // }

      this.showExcelModal = false
    },
    // 清空
    clearData () {
      this.importData = []
      this.errorData = {
        data_code: '',
        count: null, // 总条数
        filename: '', // 所属文件名称
        _error: [],
      }
      this.errorRow = null
      this.commitDisabled = true
    },
    initReqOnOrder (data) { // 判断单位中是否有进行中订单
      this.getOrderIng = []
    },
    errorDataRow (row) { // 错误数据返回的数据行
      console.log(row)
      this.errorRow = row
    },

  },
  async created() {
    if (this.companyInfor.id !== '') {
      this.initReqOnOrder(this.companyInfor.id)
      this.showCompanyName = false
      this.ifOneLine = false
    } else {
      this.showCompanyName = true
      this.ifOneLine = true
    }
    this.widnowHeightFn()
    window.addEventListener('resize', this.widnowHeightFn)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.widnowHeightFn)
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.employee-introduction {
  height: 100%;
  &>div {
    height: calc(~'100% - 220px');
  }
  textarea.ivu-input {
    height: @num30;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .table-import-excel-list {
    height: calc(~'100% - 50px');
    overflow: auto;
    .table-import-must-infor { // 备单信息
      border-top: 1px solid @gradeAshFive;
      // border-bottom: 1px solid @gradeAshFive;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      color: @gradeAshTwo;
      &>div {
        color: @gradeAshThree;
        line-height: @num30;
        flex-grow:0;
        height: @num30;
        margin-top: @num20;
        &>span {
          line-height: 50px;
          width: 48px;
          text-align-last: justify;
        }
      }
      .unit-name { // 单位名称
        width: 340px;
      }
      .reservation-date { // 预约日期
        flex: 3;
        min-width: 175px;
        max-width: 255px;
      }
      .res-type { // 体检类别
        flex: 2;
        min-width: 216px;
        max-width: 249px;
      }
      .settlement-method { // 结算方式
        flex: 1.7;
        min-width: 164px;
        max-width: 224px;
      }
      .remark { // 备注
        flex: 1;
        min-width: 537px;
        max-width: 615px;
      }
    }
    .tableImportContent {
      width: 100%;
      height: calc(~'100% - 52px');
      border-top: 1px solid @gradeAshFive;
    }
    .tableImportContentL2 {
      width: 100%;
      border-top: 1px solid @gradeAshFive;
      height: calc(~'100% - 2px');
    }
  }
  .table-import-err-list {
    height: 210px;
    margin-top: @num10;
  }
}
</style>
