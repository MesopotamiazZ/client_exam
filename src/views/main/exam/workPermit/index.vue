<template>
<div class="workPermit">
<!--   <div id="printImg" @click="clickk">
  <img src="/static/baogao.png" ref="img" alt="">
  </div> -->
  <iframe id="iframePrint" src="/static/33.html" frameborder="0" style="display:none"></iframe>


  <div class="workPermit-content" style="height:50%">
      <div class="workPermit-tab">
        <tab :tab="tabdata"
             @tab-change="tabChange"
             ref="tab"
             class="workPermit-tab-tab"
             >
           <div slot="tab-btn" class="workPermit-tab-btn">  
                 <searchInput icon="android-search" class="fl" style="width: 225px"
                @on-enter='searchFunc' @on-Icon='searchFunc' @on-cancel="searchCancel()"
                ref="searchInput">
       
           </searchInput>
          <Dropdown class="fl marginR10" v-if="isTrue"
                    @on-click="selcetDropDown">
            <Button type="ghost">
             生成报告
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem v-for="(item, index) of printArr"
                            :name="item.name"
                            :key="index">{{item.name}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <ZButton :ZBtype='"ghost"'
                        class="fl marginR10"
                        @click="amendFunc()" >导 出</ZButton>
            <ZButton :ZBtype='"ghost"'
                        class="fl marginR20"
                        @click="choose()" v-if="!isTrue">选 择</ZButton>
            <ZButtonHasBg :ZBtype='"ghost"'
                        class="fl marginR20"
                        @click="chooseCansel()" v-if="isTrue">取 消</ZButtonHasBg>
        </div>
        </tab>
        <!-- 报告管理 -->
         <div class="workPermit-body"  ref="workPermitBody" v-if="num ===1" key="1">
                   <q-table
                    ref="zBaseInfoTableWork"
                    :showOperateColumn="false"
                    :params="paraming"
                    :ifEdit="true"
                    :columns="columns"
                    :data="tableData"
                    :fixedRightWidth ="126"
                    :height="900"
                    :selectMode="isTrue"
                    @scroll="scrollIn"
                    @on-selection-change="tableSelectionChange"
                    :pageInfo="pageInfo">
                    </q-table>
         </div>
         <!-- num === 0 报告生成 -->
         <div class="workPermit-body-zero"  ref="workPermitBody" v-if="num ===0" key="2">

                   <q-table
                    ref="zBaseInfoTableTop"
                    :showOperateColumn="false"
                    :params="paraming"
                    :ifEdit="true"
                    :columns="columnsReport"
                    :data="reportData"
                    :fixedRightWidth ="126"
                    :height="500"
                    :selectMode="isTrue"
                    @scroll="scrollIn"
                    @on-selection-change="tableSelectionChange"
                    :pageInfo="pageInfo">
                    </q-table>
         </div>
      </div>
  </div>
        <!-- 个人体检报告 -->
  <div class="workPermit-body-F"  v-if="num ===0" key="3">
      <div class="workPermit-body-bottom"  ref="workPermitBody">
         <titleHasSlot style="border-bottom: 1px solid #cccccc;">
            <span slot='titletHasSlotLeftTitle' >个人体检报告</span>
            <div slot='titletHasSlotRightContent'
                 style="margin-right:-6px;height:30px;">
              <div style="height:30px;">

              </div>
            </div>
          </titleHasSlot>
          <div class="workPermit-body-F-table" ref="ftable">        
                    <baseTable
                    ref="zBaseInfoTable"
                    :showOperateColumn="false"
                    :columns="columnsExamination"
                    :data="examinationData"
                    :fixedRightWidth ="126"
                    :height="tableHeight"
                  >
                    </baseTable>
                    <!-- <zTable
                    ref="zBaseInfoTable"
                    :showOperateColumn="false"
                    :params="paraming"
                    :ifEdit="true"
                    :columns="columnsExamination"
                    :data="examinationData"
                     :fixedRightWidth ="126"
                    :height="500"
                    :selectMode="false"
                    @scroll="scrollIn"
                    @on-selection-change="tableSelectionChange"
                    :pageInfo="pageInfo"                    
                    ></zTable> -->
                    </div>
 
      </div>
  </div>
  <holdMomentModal :warningModal="openModal" :content="content" @hold="hold"></holdMomentModal>
  <signModal :signModal="sign" @affirm="affirm" @abolish="abolish"></signModal>
  <detilModal :recallSign="detil" @affirm="detilModalAffirm" @abolish="detilAbolish"></detilModal>
  <recallSignModal :recallSign="recallSign" @affirm="affirm" @abolish="abolishRecall"></recallSignModal>
  <affirmDelModal :controlModal="isAffirm" :content="delcontent" :rests="false" @delCancel="delCancel" @affirmDel="affirmDel"></affirmDelModal>

</div>
</template>
<script>
import tab from './taba'
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import searchInput from '@/components/searchInput'
import { mapState } from 'vuex'
import holdMomentModal from '@/components/modal/holdMomentModal'
import signModal from './modal/signModal'
import recallSignModal from './modal/recallSignModal'
import affirmDelModal from '@/components/modal/affirmDelModal'
import titleHasSlot from '@/components/titleHasSlot'
import detilModal from '@/components/detilModal/detilModal'
import zTable from '@/components/table/zTable'
import baseTable from '@/components/qtable/table'
export default {
  name: 'workPermit',
  components: {
    tab,
    ZButton,
    searchInput,
    ZButtonHasBg,
    holdMomentModal,
    signModal,
    recallSignModal,
    affirmDelModal,
    titleHasSlot,
    detilModal,
    zTable,
    baseTable,
  },
  data() {
    return {
      tabdata: [{title: '报告生成'}, {title: '报告管理'}],
      tableHeight: 200,
      tableData: [
        {
          pe_sn: '170080900',
          name: '李伟',
          report_status: '已打印',
          report_code: '1708090006',
          report_name: '中国石油化工体检(女)',
          generate_name: '李医生',
          generate_date: '2017-9-25',
          print_name: '李医生',
          print_date: '2017-9-25',
          export_name: '万医生',
          export_date: '2017-9-25',
          issue_name: '杨医生',
          issue_date: '2017-9-15',
          sign_name: '张医生',
          sign_date: '2017-9-25',
        },
        {
          pe_sn: '170080901',
          name: '小伟',
          report_status: '已签收',
          report_code: '1708090006',
          report_name: '中国石油化工体检(女)',
          generate_name: '李医生',
          generate_date: '2017-9-25',
          print_name: '李医生',
          print_date: '2017-9-25',
          export_name: '万医生',
          export_date: '2017-9-25',
          issue_name: '杨医生',
          issue_date: '2017-9-15',
          sign_name: '张医生',
          sign_date: '2017-9-25',
        },
        {
          pe_sn: '170080906',
          name: '大伟',
          report_status: '已完成',
          report_code: '1708090006',
          report_name: '中国石油化工体检(女)',
          generate_name: '李医生',
          generate_date: '2017-9-25',
          print_name: '李医生',
          print_date: '2017-9-25',
          export_name: '万医生',
          export_date: '2017-9-25',
          issue_name: '杨医生',
          issue_date: '2017-9-15',
          sign_name: '张医生',
          sign_date: '2017-9-25',
        },
      ],
      place: 'bottom-end',
      num: 0,
      isTrue: false,
      printArr: [{name: '个人职业体检报告'}, {name: '个人健康体检报告'}],
      openModal: false,
      content: '该模板已经生成报告了，不能重复生成。',
      sign: false, // 控制打开
      recallSign: false, // 控制打开
      isAffirm: false, // 删除开关
      personalReportIndex: -1, // 个人体检报告删除index
      delcontent: '确认删除选中的报告吗？',
      detil: false, // 体检详情
      reportData: [
        {
          pe_sn: '170028474',
          name: '王树彤',
          first_exam: '初检',
          exam_type: '健康体检',
          exam_package: '中国石油化工体检(女)',
          company: '中国石油化工公司',
          main_exam_doctor: '李医生',
          main_exam_date: '2017-9-25',
          register_date: '2017-9-25',
        },
        {
          pe_sn: '170028484',
          name: '陈风翔',
          first_exam: '复检',
          exam_type: '健康体检',
          exam_package: '成都明晨公司(男)',
          company: '成都明晨公司',
          main_exam_doctor: '李医生',
          main_exam_date: '2017-9-25',
          register_date: '2017-9-25',
        },
        {
          pe_sn: '17002274',
          name: '王苏怀',
          first_exam: '初检',
          exam_type: '职业体检',
          exam_package: '中国石油化工体检(女)',
          company: '中国石油化工公司',
          main_exam_doctor: '李医生',
          main_exam_date: '2017-9-25',
          register_date: '2017-9-25',
        },
        {
          pe_sn: '170028474',
          name: '陈鑫',
          first_exam: '初检',
          exam_type: '健康体检',
          exam_package: '中国石油化工体检(男)',
          company: '中国石油化工公司',
          main_exam_doctor: '李医生',
          main_exam_date: '2017-9-25',
          register_date: '2017-9-25',
        },
      ],
      examinationData: [
        {
          report_status: '已打印',
          report_code: '1708090006',
          report_name: '中国石油化工体检(女)',
          generate_name: '李医生',
          generate_date: '2017-9-25',
          print_name: '李医生',
          print_date: '2017-9-25',
          export_name: '万医生',
          export_date: '2017-9-25',
          issue_name: '杨医生',
          issue_date: '2017-9-15',
          sign_name: '张医生',
          sign_date: '2017-9-25',
        },
        {
          report_status: '已签收',
          report_code: '1708090006',
          report_name: '中国石油化工体检(女)',
          generate_name: '李医生',
          generate_date: '2017-9-25',
          print_name: '李医生',
          print_date: '2017-9-25',
          export_name: '万医生',
          export_date: '2017-9-25',
          issue_name: '杨医生',
          issue_date: '2017-9-15',
          sign_name: '张医生',
          sign_date: '2017-9-25',
        },
        {
          report_status: '已完成',
          report_code: '1708090006',
          report_name: '中国石油化工体检(女)',
          generate_name: '李医生',
          generate_date: '2017-9-25',
          print_name: '李医生',
          print_date: '2017-9-25',
          export_name: '万医生',
          export_date: '2017-9-25',
          issue_name: '杨医生',
          issue_date: '2017-9-15',
          sign_name: '张医生',
          sign_date: '2017-9-25',
        },
      ],
      images: [{source: '/static/images/public/header_img.png'}, {source: '/static/images/public/heartbit.jpg'}, {source: '/static/images/public/qianming.png'}],
      options: {
        inline: true,
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: true,
        keyboard: true,
        url: 'data-source',
      },
    }
  },
  computed: {
    ...mapState(['windowHeight']),
    columns() {
      return [
        {
          title: '报告状态',
          key: 'report_status',
          ellipsis: true,
          width: 100,
        },
        {
          title: '报告编号',
          key: 'report_code',
          ellipsis: true,
          width: 100,
        },
        {
          title: '报告名称',
          key: 'report_name',
          ellipsis: true,
        },
        {
          title: '体检号',
          key: 'pe_sn',
          ellipsis: true,
          width: 100,
        },
        {
          title: '姓名',
          key: 'name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '生成人',
          key: 'generate_name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '生成日期',
          key: 'generate_date',
          ellipsis: true,
          width: 100,
        },
        {
          title: '打印人',
          key: 'print_name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '打印日期',
          key: 'print_date',
          ellipsis: true,
          width: 100,
        },
        {
          title: '导出人',
          key: 'export_name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '导出日期',
          key: 'export_date',
          ellipsis: true,
          width: 100,
        },
        {
          title: '签发人',
          key: 'issue_name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '签发日期',
          key: 'issue_date',
          ellipsis: true,
          width: 100,
        },
        {
          title: '签收人',
          key: 'sign_name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '签收日期',
          key: 'sign_date',
          ellipsis: true,
          width: 100,
        },
        { title: '操作',
          ellipsis: true,
          key: 'do',
          fixed: 'right',
          width: 126,
          _pop: false,
          render: (h, params) => {
            let that = this
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '25px',
                  color: '#008cee',
                  'line-height': '30px',
                  'margin-right': '9px',
                  'margin-left': '5px',
                },
                on: {
                  click: (event) => {
                    console.log('预览')
                    that.clickk()
                  },
                },
              }, '预览'),
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '25px',
                  color: '#008cee',
                  'line-height': '30px',
                  'margin-right': '5px',
                },
                on: {
                  click: (event) => {
                    event.stopPropagation()
                    console.log('打印')
                  },
                },
              }, '打印'),
              h('Poptip', {
                props: {
                  placement: this.place,
                  content: 'aaa',
                },
                style: {
                  display: 'inline-block',
                  width: '15px',
                  color: '#008cee',
                  'margin-right': '10px',
                },
                nativeOn: {
                  click: () => {
                    this.morebtn = 100
                  },
                  mouseenter: (e) => {
                    console.log(e, '11')
                    if (document.body.clientHeight - e.clientY >= 160) {
                      this.place = 'bottom-end'
                    } else {
                      this.place = 'top-end'
                    }
                  },
                },
              }, [
                h('div', {
                  style: {
                    width: '25px',
                    height: '15px',
                    color: '#008cee',
                    'z-index': '999',
                    background: "url('/static/icons/public/more.svg') no-repeat center 10px",
                  },
                }), h('div', {
                  style: {
                    'line-height': '30px',
                  },
                  slot: 'content',
                }, [
                  h('div', {
                    class: 'workPermit-zdy',
                    on: {
                      click: (e) => {
                        this.sign = true
                        console.log('签发')
                      },
                    },
                  }, '签发'),
                  h('div', {
                    class: 'workPermit-zdy',
                    on: {
                      click() {
                        console.log('撤回签发')
                        that.recallSign = true
                      },
                    },
                  }, '撤回签发'),
                  h('div', {
                    class: 'workPermit-zdy',
                    on: {
                      click() {
                        console.log('上传数据')
                      },
                    },
                  }, '上传数据'),
                  h('div', {
                    class: 'workPermit-zdy',
                    on: {
                      click() {
                        console.log('上传报告')
                      },
                    },
                  }, '上传报告'),
                  h('div', {
                    class: 'workPermit-zdy',
                    on: {
                      click() {
                        console.log('导出报告')
                      },
                    },
                  }, '导出报告'),
                ])]),
            ])
          },
        },
      ]
    },
    columnsExamination() {
      return [
        {
          title: '报告状态',
          key: 'report_status',
          ellipsis: true,
          width: 100,
        },
        {
          title: '报告编号',
          key: 'report_code',
          ellipsis: true,
          width: 100,
        },
        {
          title: '报告名称',
          key: 'report_name',
          ellipsis: true,
        },
        {
          title: '生成人',
          key: 'generate_name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '生成日期',
          key: 'generate_date',
          ellipsis: true,
          width: 100,
        },
        {
          title: '打印人',
          key: 'print_name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '打印日期',
          key: 'print_date',
          ellipsis: true,
          width: 100,
        },
        {
          title: '导出人',
          key: 'export_name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '导出日期',
          key: 'export_date',
          ellipsis: true,
          width: 100,
        },
        {
          title: '签发人',
          key: 'issue_name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '签发日期',
          key: 'issue_date',
          ellipsis: true,
          width: 100,
        },
        {
          title: '签收人',
          key: 'sign_name',
          ellipsis: true,
          width: 85,
        },
        {
          title: '签收日期',
          key: 'sign_date',
          ellipsis: true,
          width: 100,
        },
        { title: '操作',
          ellipsis: true,
          key: 'do',
          fixed: 'right',
          width: 126,
          _pop: false,
          render: (h, params) => {
            let that = this
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '25px',
                  color: '#008cee',
                  'line-height': '30px',
                  'margin-right': '9px',
                  'margin-left': '5px',
                },
                on: {
                  click: (event) => {
                    console.log('预览')
                    that.clickk()
                  },
                },
              }, '预览'),
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '50px',
                  color: '#008cee',
                  'line-height': '30px',
                  'margin-right': '5px',
                },
                on: {
                  click: (event) => {
                    that.del(params.row, params.index)
                  },
                },
              }, '删除'),
              h('Poptip', {
                props: {
                  placement: this.place,
                  content: 'aaa',
                },
                style: {
                  display: 'inline-block',
                  width: '15px',
                  color: '#008cee',
                  'margin-right': '10px',
                },
                nativeOn: {
                  click: () => {
                    this.morebtn = null
                  },
                  mouseenter: (e) => {
                    console.log(e, '11')
                    if (document.body.clientHeight - e.clientY >= 160) {
                      this.place = 'bottom-end'
                    } else {
                      this.place = 'top-end'
                    }
                  },
                },
              }, [
                h('div', {
                  style: {
                    width: '25px',
                    height: '15px',
                    color: '#008cee',
                    'z-index': '999',
                    background: "url('/static/icons/public/more.svg') no-repeat center 10px",
                  },
                }), h('div', {
                  style: {
                    'line-height': '30px',
                  },
                  slot: 'content',
                }, [
                  h('div', {
                    class: 'unitReportManagement-zdy',
                    on: {
                      click: (e) => {
                        console.log('导出报告')
                      },
                    },
                  }, '导出报告'),
                  h('div', {
                    class: 'unitReportManagement-zdy',
                    on: {
                      click() {
                        console.log('打印报告')
                        let a = document.getElementsById('printImg')
                        console.log(a, '1')
                        a.execCommand('print')
                      },
                    },
                  }, '打印报告'),
                ])]),
            ])
          },
        },
      ]
    },
    columnsReport() {
      let that = this
      return [
        {
          title: '体检号',
          key: 'pe_sn',
          ellipsis: true,
          width: 100,
        },
        {
          title: '姓名',
          key: 'name',
          ellipsis: true,
          width: 90,
        },
        {
          title: '初/复检',
          key: 'first_exam',
          ellipsis: true,
          width: 90,
        },
        {
          title: '体检类别',
          key: 'exam_type',
          ellipsis: true,
          width: 90,
        },
        {
          title: '体检套餐',
          key: 'exam_package',
          ellipsis: true,
        },
        {
          title: '单位名称',
          key: 'company',
          ellipsis: true,
        },
        {
          title: '主检医生',
          key: 'main_exam_doctor',
          ellipsis: true,
          width: 85,
        },
        {
          title: '主检日期',
          key: 'main_exam_date',
          ellipsis: true,
          width: 100,
        },
        {
          title: '登记日期',
          key: 'register_date',
          ellipsis: true,
          width: 120,
        },
        { title: '操作',
          ellipsis: true,
          key: 'do',
          fixed: 'right',
          width: 126,
          _pop: false,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '50px',
                  color: '#008cee',
                  'line-height': '30px',
                  'margin-right': '9px',
                  'margin-left': '5px',
                },
                on: {
                  click: (event) => {
                    console.log('体检详情')
                    that.detil = true
                  },
                },
              }, '体检详情'),
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '50px',
                  color: '#008cee',
                  'line-height': '30px',
                  'margin-right': '5px',
                },
                on: {
                  click: (event) => {
                    event.stopPropagation()
                    console.log(params)
                    this.openModal = true
                  },
                },
              }, '生成报告'),
            ])
          },
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      console.log(this.$refs.ftable.offsetHeight, 'yttttttttttttt')
      this.tableHeight = this.$refs.ftable.offsetHeight
    },
  },
  methods: {
    amendFunc() {
      this.$refs.zBaseInfoTableTop.exportCsv()
    },
    tabChange(val) {
      this.num = val
      if (val === 0) {
        this.$nextTick(() => {
          document.getElementsByClassName('workPermit-content')[0].style.height = '50%'
          this.$refs.zBaseInfoTableTop.handleHeightResize()
        })
      } else {
        this.$nextTick(() => {
          document.getElementsByClassName('workPermit-content')[0].style.height = '100%'
          this.$refs.zBaseInfoTableWork.handleHeightResize()
        })
      }
    },
    choose() {
  //
      this.isTrue = true
    },
    chooseCansel() {
  //
      this.isTrue = false
    },
    selcetDropDown() {
      let val = arguments[0]
      console.log(val, '111')
    },
    hold() {
      this.openModal = false
    },
    abolish() {
      this.sign = false
    },
    abolishRecall() {
      this.recallSign = false
    },
    del(row, index) {
      this.personalReportIndex = index
      this.isAffirm = true
    },
    affirmDel() {
      this.examinationData.splice(this.personalReportIndex, 1)
      this.personalReportIndex = -1
      this.isAffirm = false
    },
    delCancel() {
      this.personalReportIndex = -1
      this.isAffirm = false
    },
    // 体检详情
    detilAbolish() {
      this.detil = false
    },
    clickk() {
      let a = document.getElementById('iframePrint')
      a.contentWindow.print()
    },
  },
  mounted() {
    //
    this.tableHeight = this.$refs.ftable.offsetHeight
  },
}
</script>
<style lang="less">
 .workPermit{
   .ivu-table-fixed-right{
     overflow: hidden;
   }
  height:100%;
 .ivu-dropdown-menu .ivu-dropdown-item{
  display:block;
  width: 130px;
  }
 .ivu-dropdown-menu{
  width: 130px;
  }
  .workPermit-tab-btn{
    height: 30px;
  }
.workPermit-zdy{
  font-size: 12px;
  color: #4A4A4A;
  letter-spacing: 0;
  text-align: center;
}
.workPermit-zdy:hover{
  font-size: 12px;
  color: #008CEE;
  letter-spacing: 0;
  text-align: center;
}
.qtable_outerBox th, .qtable_outerBox td:not(.ivu-table-expanded-cell) {
    overflow:visible;
    text-overflow: ellipsis;
    white-space: nowrap;
}
   position: relative;
   padding: 10px;
   height: 100%;
   .ivu-table-fixed-body{
    overflow:visible;
   .ivu-table-tbody{
     border-left: 1px solid #D9D9D9;
     overflow:visible;
     >tr>td:nth-child(1){
      border-right: none;
     }
   }}
.workPermit-content{
    overflow: hidden;
    height: 100%;
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    box-shadow: 0 1px 6px 0 rgba(206,213,242,0.80);
    border-radius: 8px;
    .workPermit-tab-btn{
      margin-top: 10px;
      
    }
    
    .workPermit-tab{
      height:100%;
      .workPermit-tab-tab{
        height:50px;
      }
    .workPermit-body{
      height: calc(~'100% - 50px');
    }
    .workPermit-body-zero{
      height: calc(~'100% - 50px');
    }
    }

   }
   .workPermit-body-F{
      height: calc(~'50% - 10px');
      margin-top: 10px;
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      box-shadow: 0 1px 6px 0 rgba(206,213,242,0.80);
      border-radius: 8px;
      overflow: hidden;

   }
.workPermit-body-bottom{
 height: 100%;
       .workPermit-body-F-table{
              height: calc(~'100% - 50px');
      }

}
 }

</style>