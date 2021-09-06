<template>
<div class="guardianshipCard">
        <!-- 个人体检报告 -->
        <div style="padding:10px;height:100%;">
                    <iframe id="iframePrint" src="/static/11.html" frameborder="0" style="display:none"></iframe>
  <div class="guardianshipCard-body-F">
      <iframe id="iframePrint" src="/static/11.html" frameborder="0" style="display:none"></iframe>
      <div class="guardianshipCard-body-bottom"  ref="workPermitBody">
         <titleHasSlot style="border-bottom: 1px solid #cccccc;">
            <span slot='titletHasSlotLeftTitle'>个人报告签收列表</span>
            <div slot='titletHasSlotRightContent'
                 style="margin-right:-6px;height:30px;">
              <div style="height:30px;">
                <searchInput icon="android-search" class="fl" style="width: 220px;"
                  @on-enter='searchFunc' @on-Icon='searchFunc' @on-cancel="searchCancel()"
                  ref="searchInput">
                </searchInput>
           <ZButton :ZBtype='"ghost"'
                        class="fl"
                        @click="choose()" v-if="!isTrue">选 择</ZButton>
<!--            <ZButton :ZBtype='"ghost"'
                        class="fl"
                        @click="choose()" v-if="!isTrue">撤回签收</ZButton -->>
            <ZButtonHasBg :ZBtype='"ghost"'
                        class="fl"
                        @click="chooseCansel()" v-if="isTrue">取 消</ZButtonHasBg>
              </div>
            </div>
          </titleHasSlot>
          <div class="guardianshipCard-body-F-table">        
                      <q-table
                    ref="zBaseInfoTable"
                    :showOperateColumn="false"
                    :params="paraming"
                    :ifEdit="true"
                    :columns="columnsExamination"
                    :data="tableData"
                    :fixedRightWidth ="100"
                    :height="500"
                    @scroll="scrollIn"
                    :selectMode="isTrue"
                    @on-selection-change="tableSelectionChange"
                    :pageInfo="pageInfo">
                    </q-table>
                    </div>
 
      </div>
  </div>
  <reportToSign :recallSign="isChange" @affirm="affirm" @abolish="abolish"></reportToSign>
  <refuseModal :signModal="refuse" @affirm="affirm" @abolish="abolishRefuse"></refuseModal>
        </div>

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
  name: 'guardianshipCard',
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
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011111',
          name: '张龙',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '未签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011122',
          name: '周小王',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '',
          sign_date: '',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011128',
          name: '杨敬华',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011133',
          name: '林震',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011758',
          name: '周志华',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011177',
          name: '李晓',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011177',
          name: '李晓',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011177',
          name: '李晓',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011177',
          name: '李晓',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011177',
          name: '李晓',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011177',
          name: '李晓',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011177',
          name: '李晓',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
        {
          report_status: '已签收',
          report_code: '170080900',
          report_name: '职业健康体检报告',
          pe_sn: '171011177',
          name: '李晓',
          exam_type: '职业体检',
          issue_name: '李志贵',
          issue_date: '2017-10-19',
          sign_name: '李志贵',
          sign_date: '2017-10-19',
        },
      ],
      place: 'bottom-end',
      isChange: false,
      isTrue: false,
      refuse: false,
    }
  },
  computed: {
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
          minWidth: 200,
        },
        {
          title: '体检号',
          key: 'pe_sn',
          ellipsis: true,
          minWidth: 100,
        },
        {
          title: '姓名',
          key: 'name',
          ellipsis: true,
          minWidth: 85,

        },
        {
          title: '体检类别',
          key: 'exam_type',
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
          title: '签发时间',
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
          title: '签收时间',
          key: 'sign_date',
          ellipsis: true,
          minWidth: 150,
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
                  width: '25px',
                  color: '#008cee',
                  'line-height': '30px',
                  'margin-right': '9px',
                  'margin-left': '5px',
                },
                on: {
                  click: (event) => {
                    console.log(1, that.clickk())
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
                    console.log('签收')

                    if (params.index !== 1) {
                      that.isChange = true
                    } else {
                      that.refuse = true
                    }
                  },
                },
              }, params.index !== 1 ? '签收' : '撤回签收'),
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
    ...mapState(['windowHeight']),
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
    clickk() {
      let a = document.getElementById('iframePrint')
      a.contentWindow.print()
    },
  },
}
</script>
<style lang="less">
 .guardianshipCard{
   .ivu-table-fixed-right{
     overflow: hidden;
   }
  height:100%;
 .ivu-dropdown-menu .ivu-dropdown-item{
  display:block;
  }
  .guardianshipCard-tab-btn{
    height: 30px;
  }
.guardianshipCard-zdy{
  font-size: 12px;
  color: #4A4A4A;
  letter-spacing: 0;
}
.guardianshipCard-zdy:hover{
  font-size: 12px;
  color: #008CEE;
  letter-spacing: 0;
}
/* .qtable_outerBox th, .qtable_outerBox td:not(.ivu-table-expanded-cell) {
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
     overflow:default;
     >tr>td:nth-child(1){
      border-right: none;
     }
   }} */
.guardianshipCard-content{
    overflow: hidden;
    height: 100%;
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    box-shadow: 0 1px 6px 0 rgba(206,213,242,0.80);
    border-radius: 8px;
    
   }
   .guardianshipCard-body-F{
       height: 100%;
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      box-shadow: 0 1px 6px 0 rgba(206,213,242,0.80);
      border-radius: 8px;
      overflow: hidden;

   }
.guardianshipCard-body-bottom{
 height: 100%;
       .guardianshipCard-body-F-table{
              height: calc(~'100% - 50px');
      }

}
 }

</style>