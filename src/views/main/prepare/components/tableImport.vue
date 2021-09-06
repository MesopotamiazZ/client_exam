/** 
* @author 覃凤
* @date 2018/3/5
* @content 表格导入备单（组件）
* id：传入的单位id，cancel-data：取消按钮，commit-data：完成按钮
*/
<template>
  <div class="table-import">
    <div class="contentBg">
      <title-has-slot class="title-has-slot">
        <span slot="titletHasSlotLeftTitle">{{ msg }}<span v-if='!showCompanyName'>（{{ companyInfor.name }}）</span></span>
        <div slot='titletHasSlotRightContent' class="titlet-has-slot-right-content">
          <Button class="marginR10" type="ghost" :disabled='orderIngDisabled' @click='checkOrderIng'>进行中订单</Button>
          <Button class="marginR10" type="primary" @click='importDataBtn'>表格导入</Button>
          <Button class="marginR10" type="primary" :disabled='commitDisabled' @click="commitData('mustInfor')">保 存</Button>
          <Button type="ghost" @click='clearData'>清 空</Button>
        </div>
      </title-has-slot>
      <!-- 表格内容显示及必填项 -->
      <div class="table-import-excel-list">
        <!-- 备单信息（必填） -->
        <Form ref="mustInfor" :rules='dataRule' :model='emitData'>
          <div  ref='tableImport' class="table-import-must-infor paddingL20 paddingB20">
            <!-- 单位名称，通过是否有单位id判断 -->
            <div class="unit-name flex marginR20" v-if='showCompanyName'>
              <span class="marginR10">单位名称</span>
              <div class="flx1">
                <FormItem prop='self_companyName'>
                  <Input v-model.trim="emitData.self_companyName" :class="{inputVerificationTs:isEmpty(emitData.self_companyName)}"></Input>
                </FormItem>
              </div>
            </div>
            <div class="flex reservation-date marginR20">
              <span class="marginR10">预约日期</span>
              <div class="flx1">
                <DatePicker type="date" placeholder=""></DatePicker>
                <!-- <Input v-model="emitData.self_companyDate"></Input> -->
              </div>
            </div>
            <div class="res-type flex marginR20">
              <span class="marginR10">体检类别</span>
              <div class="flx1">
                <FormItem prop='self_PhysicalExaminatioData'>
                  <Select 
                  v-model="emitData.self_PhysicalExaminatioData" filterable placeholder=''
                  :class="{selectVerificationTs:isEmpty(emitData.self_PhysicalExaminatioData)}">
                    <Option v-for="item in newGetPhysicalExaminatioData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>
            <div class="settlement-method flex marginR20">
              <span class="marginR10">结算方式</span>
              <div class="flx1" style="width: 115px;margin-top:1px;">
                <FormItem prop='self_settlementMethod'>
                  <Select class="fl flx1" v-model="emitData.self_settlementMethod" filterable placeholder=''>
                    <Option v-for="item in settlementMethod" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>
            <div class="flex remark marginR20">
              <span class="marginR10">备注</span>
              <div class="flx1">
                <Input type="textarea" v-model="emitData.self_remark"></Input>
              </div>
            </div>
          </div>
        </Form>
        <!-- 显示表格内容 -->
        <div :class="{tableImportContentL2: !ifOneLine,tableImportContent:ifOneLine}">
          <excel-table-infor :excelData='importData' :errorRow='errorRow'></excel-table-infor>
        </div>
      </div>
    </div>
    <!-- 错误列表 -->
    <div class="table-import-err-list contentBg">
      <error-list :errorData='errorData' @error-choose-data='errorDataRow'></error-list>
    </div>
    <!-- 表格导入弹窗 -->
    <excel-modal :excelModal.sync='showExcelModal' @upgradeVipSure='importExcel'></excel-modal>
    <!-- 提示 -->
    <front-ts :modelts='showFrontTs' :data='getOrderIng' @cancel='frontTsCancel' @sure='frontTsCommit'></front-ts>
  </div>
</template>
<script>
import * as _ from 'lodash'
import {mapActions, mapGetters} from 'vuex'

import errorList from './childComponent/errorList.vue'
import excelTableInfor from './childComponent/excelTableInfor.vue'
import excelModal from './childComponent/excelModal.vue'
import frontTs from '@/views/main/prepare/components/modal/frontTs.vue'
export default {
  name: 'table-import',
  components: {
    errorList,
    excelTableInfor,
    excelModal,
    frontTs,
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
      msg: '表格导入备单',
      showFrontTs: false, // 是否显示提示弹窗
      showExcelModal: false, // 显示导入弹窗
      orderIngDisabled: false, // 进行中订单是否能够点击
      commitDisabled: true, // 保存按钮能否点击
      showCompanyName: true, // 是否显示单位名称
      ifOneLine: true, // 信息行是否是一行
      getOrderIng: [], // 进行中订单数据
      importData: [], // 导入的数据
      errorData: { // 错误数据
        data_code: '',
        count: null, // 总条数
        filename: undefined, // 所属文件名称
        _error: [],
      },
      widnowHeight: 0,
      // pageInfo: {
      //   total: 1,
      //   current_page: 1,
      // },
      emitData: { // 保存提交到后台的数据
        // id: '',
        self_companyName: '',
        self_PhysicalExaminatioData: undefined, // 体检类别
        self_settlementMethod: 1, // 结算方式
        self_allData: [], // 表格导入的数据
      },
      errorRow: null, // 错误数据行，需要传入excel显示的表格
      newGetPhysicalExaminatioData: [], // 接受体检类别并处理
      settlementMethod: [
        {
          label: '以预约人数计',
          value: 1,
        }, {
          label: '以实检人数计',
          value: 2,
        },
      ],
      dataRule: {
        self_companyName: [
          {
            required: true,
            message: '单位名称不为空',
            trigger: 'blur',
            // type: String,
          },
        ],
        self_PhysicalExaminatioData: [
          {
            required: true,
            message: '体检类别不为空',
            trigger: 'change',
            type: String,
          },
        ],
        self_settlementMethod: [
          {
            required: true,
            message: '结算方式不为空',
            trigger: 'change',
            type: Number,
          },
        ],
      },
    }
  },
  watch: {
    errorData: {
      handler(val) {
        if (val.filename !== undefined) {
          this.commitDisabled = true
        } else {
          this.commitDisabled = false
        }
      },
      deep: true,
    },
    // windowWidth (val) {
    //   console.log(val)
    //   this.$store.state.windowWidth
    // },
  },
  computed: {
    ...mapGetters('formImportListModule', [
      'getPhysicalExaminatioData', // 体检类别
    ]),
  },
  methods: {
    ...mapActions('formImportListModule', [
      'getPhysicalExaminatio', // 获取适用体检类别
      'getUnitAllOrder', // 获取单位所有订单
      'postReadExcel', // excel读取单位预约
      'getPagingExcelData', // 获取excel表格分页数据
    ]),
    isEmpty(data) {
      if (data === '' || data === undefined) {
        return true
      } else {
        return false
      }
    },
    commitData (name) { // 保存提示数据
      this.$refs[name].validate((valid) => {
        console.log(1111)
      })
    },
    /* ==============================================进行中订单 */
    async initReqOnOrder (data) { // 判断单位中是否有进行中订单
       // 请求公司是否有进行中订单
       // 将请求到的数据赋值给getOrderIng

      // this.getOrderIng = []
      this.getOrderIng = _.clone(await this.getUnitAllOrder(data))
      console.log('公司现有订单数据', this.getOrderIng)
      if (this.getOrderIng.length > 0) {
        this.orderIngDisabled = false
      } else {
        this.orderIngDisabled = true
      }
    },
    checkOrderIng () {
      this.showFrontTs = true
    },
    frontTsCancel (data) { // 重新生成
      this.showFrontTs = false
    },
    frontTsCommit (data) { // 加入到原来的订单中
      this.showFrontTs = false
    },
    // 窗口改变
    widnowHeightFn () {
      this.widnowHeight = document.documentElement.offsetHeight
      if (this.widnowHeight > 750) {
        // console.log('窗口大于750')
        this.ifOneLine = false
      } else {
        // console.log('窗口750')
        if (this.showCompanyName) {
          // console.log('显示单位名称')
          this.ifOneLine = true
        } else {
          console.log('不显示单位名称')
          this.ifOneLine = false
        }
      }
    },
    /* ==========================================================页面头部操作 */
    // 表格导入
    importDataBtn () {
      this.showExcelModal = true
    },
    async importExcel (data) { // 表格导入
    // data传给后台
    // 后台会返回code，全局保存
    // 将code传入请求分页的函数中，请求分页函数（默认请求第一条）
      // console.log(await this.postReadExcel(data))
      await this.initReqExcelFun()
      this.showExcelModal = false
    },
    async initReqExcelFun (data) {
      // 请求分页的数据
      // this.importData，和this.errorData都是请求到的数据，将数据传到组件中
      this.importData = [
        {
          num: 2,
          realname: '杨子晨',
          id_card: '510105199807300111',
          sex: '男',
          age: 27,
          dept_name: '技术部',
          mobile: 18587425206,
          package_name: '基本体检套餐(通用)',
          self_pay: 0.5,
          payment: '员工',
          occup_type_name: '凹版印工',
          total_work_age: 1,
          injury_age: 1,
          factor1: '粉尘',
          factor_type1: '上岗前',
          factor2: '',
          factor_type2: '',
          factor3: '',
          factor_type3: '',
          Self_occup_type_name: 1,
          Self_total_work_age: 8,
          Self_injury_age: '无',
          Self_factor1: 0,
          Self_factor_type1: '否',
          Self_factor2: '',
          Self_factor_type2: '',
          Self_factor3: '上岗前',
          Self_factor_type3: 15,
          Self_factor_type4: 1,
        }, {
          num: 3,
          realname: '张瑞',
          id_card: '510402199108202265',
          sex: '男',
          age: 22,
          dept_name: '技术部',
          mobile: 13487425128,
          package_name: '基本体检套餐(通用)',
          self_pay: 0.5,
          payment: '员工',
          occup_type_name: '凹版印刷工',
          total_work_age: 2,
          injury_age: 2,
          factor1: '粉尘',
          factor_type1: '上岗前',
          factor2: '',
          factor_type2: '',
          factor3: '',
          factor_type3: '',
          Self_occup_type_name: 3,
          Self_total_work_age: 9,
          Self_injury_age: '无',
          Self_factor1: 1,
          Self_factor_type1: '否',
          Self_factor2: '',
          Self_factor_type2: '',
          Self_factor3: '上岗前',
          Self_factor_type3: 1,
          Self_factor_type4: 2,
        }, {
          num: 4,
          realname: '李欣',
          id_card: '510402199102212213',
          sex: '女',
          age: 25,
          dept_name: '技术部',
          mobile: 18786426060,
          package_name: '基本体检套餐(通用)',
          self_pay: 0.5,
          payment: '员工',
          occup_type_name: '凹版印刷工',
          total_work_age: 3,
          injury_age: 3,
          factor1: '粉尘',
          factor_type1: '上岗前',
          factor2: '',
          factor_type2: '',
          factor3: '',
          factor_type3: '',
          Self_occup_type_name: 3,
          Self_total_work_age: 9,
          Self_injury_age: '无',
          Self_factor1: 1,
          Self_factor_type1: '否',
          Self_factor2: '',
          Self_factor_type2: '',
          Self_factor3: '上岗前',
          Self_factor_type3: 9,
          Self_factor_type4: 3,
        },
      ]
      this.errorData = {
        data_code: '',
        count: 1, // 总条数
        filename: '文件1', // 所属文件名称
        _error: [ // 错误数据
          {
            row: 1, // 行
            line: 11, // 列
            info: '该工种不存在', // 详情
          },
        ],
      }
      // console.log('获取分页的数据', await this.getPagingExcelData(data))
    },
    // 清空
    clearData () {
      this.importData = []
      this.errorData = {
        data_code: '',
        count: 1, // 总条数
        filename: '文件1', // 所属文件名称
        _error: [],
      }
      this.errorRow = null
    },
    errorDataRow (row) { // 错误数据返回的数据行
      // console.log('错误列表返回的错误行', row)
      this.errorRow = row
    },
  },
  async created() {
    if (this.companyInfor.id !== '') { // 有单位名称
      this.initReqOnOrder(this.companyInfor.id)
      this.showCompanyName = false
      this.ifOneLine = false
    } else {
      this.orderIngDisabled = true
      this.showCompanyName = true
      this.ifOneLine = true
    }
    // 请求体检类别
    await this.getPhysicalExaminatio()
    this.newGetPhysicalExaminatioData = _.clone(this.getPhysicalExaminatioData)
    // this.newGetPhysicalExaminatioData.unshift({
    //   label: '全部',
    //   value: 0,
    // })
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
.table-import {
  height: 100%;
  .ivu-form-item {
    margin-bottom: 0;
  }
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
      border-bottom: 1px solid @gradeAshFive;
      display: flex;
      // white-space: nowrap;
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
      // .remarkLine {
      //   margin-top:0;
      // }
    }
    .tableImportContent {
      width: 100%;
      // max-height: calc(~'100% - 72px');
      height: calc(~'100% - 122px');
    }
    .tableImportContentL2 {
      width: 100%;
      height: calc(~'100% - 72px');
    }
  }
  .table-import-err-list {
    height: 210px;
    margin-top: @num10;
    // background-color: blue;
  }
}
</style>
