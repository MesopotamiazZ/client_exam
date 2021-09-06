<template>
<div class="unitReportSignIn">
        <!-- 个人体检报告 -->
  <iframe id="iframePrint" src="/static/11.html" frameborder="0" style="display:none"></iframe>

  <div class="unitReportSignIn-body-F">
      <div class="unitReportSignIn-body-bottom"  ref="workPermitBody">
         <titleHasSlot style="border-bottom: 1px solid #cccccc;">
            <span slot='titletHasSlotLeftTitle'>单位报告签收列表</span>
            <div slot='titletHasSlotRightContent'
                 style="margin-right:-6px;height:30px;">
              <div style="height:30px;">
                <searchInput icon="android-search" class="fl" style="minWidth: 220px"
                  @on-enter='searchFunc' @on-Icon='searchFunc' @on-cancel="searchCancel()"
                  ref="searchInput">
                </searchInput>
<!--           <ZButton :ZBtype='"ghost"'
                        class="fl marginR10"
                        @click="amendFunc()" >导 出</ZButton> -->
<!--             <ZButton :ZBtype='"ghost"'
                        class="fl marginR10"
                        @click="choose()" v-if="!isTrue">选 择</ZButton>
            <ZButtonHasBg :ZBtype='"ghost"'
                        class="fl marginR10"
                        @click="chooseCansel()" v-if="isTrue">取 消</ZButtonHasBg> -->
              </div> 
            </div>
          </titleHasSlot>
          <div class="unitReportSignIn-body-F-table">        
                      <q-table
                    ref="zBaseInfoTable"
                    :showOperateColumn="false"
                    :params="paraming"
                    :ifEdit="true"
                    :columns="columnsExamination"
                    :data="tableData"
                    :fixedRightWidth ="100"
                    :height="500"
                    :selectMode="false"
                    @scroll="scrollIn"
                    @on-selection-change="tableSelectionChange"
                    :pageInfo="pageInfo">
                    </q-table>
                    </div>
 
      </div>
  </div>
  <reportToSign :recallSign="isChange" @affirm="affirm" @abolish="abolish"></reportToSign>
  <refuseModal :signModal="refuse" @affirm="affirm" @abolish="abolishRefuse"></refuseModal>
</div>
</template>
<script>
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import searchInput from '@/components/searchInput'
import { mapState } from 'vuex'
import titleHasSlot from '@/components/titleHasSlot'
import reportToSign from './modal/reportToSign'
import refuseModal from './modal/signModal'
export default {
  name: 'unitReportSignIn',
  components: {
    ZButton,
    searchInput,
    ZButtonHasBg,
    titleHasSlot,
    reportToSign,
    refuseModal,
  },
  data() {
    return {
      tableData: [
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
        {
          report_status: '已打印',
          report_code: '1705687811',
          report_name: '健康体检',
          company_exam_num: 'z7894432',
          company: '中国联通成都分公司',
          issue_name: '于医生',
          issue_date: '2017-12-23',
          sign_name: '侯医生',
          sign_date: '2017-12-23',
        },
      ],
      place: 'bottom-end',
      isChange: false,
      isTrue: false,
      refuse: false,
    }
  },
  computed: {
    ...mapState(['windowHeight']),
    columnsExamination() {
      return [
        {
          title: '报告状态',
          key: 'report_status',
          ellipsis: true,
          minWidth: 100,
        },
        {
          title: '报告编号',
          key: 'report_code',
          ellipsis: true,
          minWidth: 100,
        },
        {
          title: '报告名称',
          key: 'report_name',
          ellipsis: true,
          minWidth: 150,
        },
        {
          title: '单位体检号',
          key: 'company_exam_num',
          ellipsis: true,
          minWidth: 100,

        },
        {
          title: '单位名称',
          key: 'company',
          ellipsis: true,
          minWidth: 85,

        },
        {
          title: '签发人',
          key: 'issue_name',
          ellipsis: true,
          minWidth: 85,

        },
        {
          title: '签发日期',
          key: 'issue_date',
          ellipsis: true,
          minWidth: 100,

        },
        {
          title: '签收人',
          key: 'sign_name',
          ellipsis: true,
          minWidth: 85,

        },
        {
          title: '签收日期',
          key: 'sign_date',
          ellipsis: true,
          minWidth: 100,
        },
        { title: '操作',
          ellipsis: true,
          key: 'do',
          fixed: 'right',
          width: 100,
          _pop: false,
          render: (h, params) => {
            let that = this
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  minWidth: '25px',
                  color: '#008cee',
                  'line-height': '30px',
                  'margin-right': '9px',
                  'margin-left': '5px',
                },
                on: {
                  click: (event) => {
                    console.log('预览', that.clickk())
                  },
                },
              }, '预览'),
              h('span', {
                style: {
                  display: 'inline-block',
                  minWidth: '50px',
                  color: '#008cee',
                  'line-height': '30px',
                  'margin-right': '5px',
                },
                on: {
                  click: (event) => {
                    console.log('签收')

                    if (params.index !== 1) {
                      that.isChange = true
                    } else {
                      that.refuse = true
                    }
                  },
                },
              }, params.index === 1 ? '撤回签收' : '签收'),
            ])
          },
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.workPermitBody.offsetHeight
    },
  },
  methods: {
    choose() {
      this.isTrue = true
    },
    chooseCansel() {
      this.isTrue = false
    },
    abolish() {
      this.isChange = false
    },
    abolishRefuse() {
      this.refuse = false
    },
        // 目前的打印
    clickk() {
      let a = document.getElementById('iframePrint')
      a.contentWindow.print()
    },
  },

}
</script>
<style lang="less">
 .unitReportSignIn{
  height:100%;
 .ivu-dropdown-menu .ivu-dropdown-item{
  display:block;
  }
  .unitReportSignIn-tab-btn{
    height: 30px;
  }
.unitReportSignIn-zdy{
  font-size: 12px;
  color: #4A4A4A;
  letter-spacing: 0;
}
.unitReportSignIn-zdy:hover{
  font-size: 12px;
  color: #008CEE;
  letter-spacing: 0;
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
    overflow:hidden;
   .ivu-table-tbody{
     border-left: 1px solid #D9D9D9;
     overflow:default;
     >tr>td:nth-child(1){
      border-right: none;
     }
   }}
.unitReportSignIn-content{
    overflow: hidden;
    height: 100%;
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    box-shadow: 0 1px 6px 0 rgba(206,213,242,0.80);
    border-radius: 8px;
    
   }
   .unitReportSignIn-body-F{
      height: calc(~'100% ');
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      box-shadow: 0 1px 6px 0 rgba(206,213,242,0.80);
      border-radius: 8px;
      overflow: hidden;

   }
.unitReportSignIn-body-bottom{
 height: 100%;
       .unitReportSignIn-body-F-table{
              height: calc(~'100% - 50px');
      }

}
 }

</style>