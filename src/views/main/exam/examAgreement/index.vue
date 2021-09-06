<template>
  <!-- 报告审核管理 -->
  <div class="report-audit-manage-wrapper">
    <div class="report-audit-manage-content">
      <div class="report-audit-manage-Body">
        <titletHasSlot style="border-bottom: 1px solid #cccccc;">
          <span slot='titletHasSlotLeftTitle'>体检列表</span>
          <div slot='titletHasSlotRightContent'>
            <searchInput class="fl "
                         icon="android-search"
                         searText="请输入搜索内容"
                         @on-enter='searchFunc'
                         @on-Icon='searchFunc'
                         @on-cancel="searchCancel()"
                         ref="searchInput">
            </searchInput>
            <ZButton :ZBtype='"ghost"'
                     class="fl marginR10" @click="amendFunc()">导 出</ZButton>
            <ZButton :ZBtype='"ghost"'
                     class="fl"
                     v-if="!selectMode"
                     @click="handleSelect">选 择</ZButton>
            <ZButtonHasBg v-if="selectMode"
                          class="fl"
                          @click="abolishSelectMode">取 消</ZButtonHasBg>
          </div>
        </titletHasSlot>
        <div ref="radiologicalReportcontently"
             class="report-table">
          <q-table ref="zBaseInfoTable"
                   :showOperateColumn="false"
                   :isSelectMode="selectMode"
                   :params="params"
                   :ifEdit="true"
                   :columns="columns"
                   :selectMode="selectMode"
                   :data="getList"
                   :height="tableHeight"
                   @delete-row="delOne"
                   @delete="delOne"
                   @edit-row="editOne"
                   @edit="editOne"
                   @on-row-dbClick="editOne"
                   @all-selection="selectChange"
                   :fixedRightWidth="185"
                   :initReq="false">
          </q-table>
        </div>
      </div>

    </div>

    <!-- <custom-transfer v-model="itemTarget"
                     :showing="curIndex===1"
                     :listWidth="'280px'"
                     :listHeight="'320px'"
                     :columns="itemColumns"
                     :sourceData="allItems"
                     :moveAll="true">
    </custom-transfer> -->
    <!-- 编辑审核人员 -->
    <edit-audits-modal :recallSign="editAuditsModal"
                       headerText="编辑审核人员"
                       :modalWidth="590"
                       @abolish="editAuditsModal=false"
                       @affirm="affirmEditAudits">
      <div style="margin: 20px auto; width: 548px;">
        <custom-transfer v-model="auditsLists"
                         :listWidth="'230px'"
                         :listHeight="'438px'"
                         :select='true'
                         :selectOptions="[]"
                         selectTitle="科室名称"
                         :selectDefault="1"
                         :columns="auditColumns"
                         :sourceData="allAuditsLists"
                         :moveAll="true">
        </custom-transfer>
      </div>
    </edit-audits-modal>
    <!-- 退回修改 -->
    <send-back-modal :recallSign="recallReasonModal"
                     headerText="退回原因"
                     :modalWidth="360"
                     @abolish="recallReasonModal=false"
                     @affirm="affirmSendBack"></send-back-modal>
    <!-- 点击状态时打开审核详情 -->
    <audit-detail-modal :recallSign="auditDetailModal"
                        headerText="审核详情"
                        :modalWidth="514">
      <div class="audit-detail-content">
        <div class="audit-detail-item">
          <titletHasSlot style="border-bottom: 1px solid #cccccc;">
            <span slot='titletHasSlotLeftTitle'>第一次审核详情</span>
            <div slot='titletHasSlotRightContent'>
              <div class="title-right">(9/10)</div>
            </div>
          </titletHasSlot>
          <Table :columns="auditDetailColumns"></Table>
        </div>
      </div>
    </audit-detail-modal>
    <!-- 体检详情模态框 -->
    <detilModal :recallSign="examDetailModalStatus"
                @affirm="detilModalAffirm"
                @abolish="detilAbolish"></detilModal>
  </div>
</template>
<script>
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import titletHasSlot from '@/components/titleHasSlot'
import searchInput from '@/components/searchInput'
import EditAuditsModal from './components/modal'
import SendBackModal from './components/sendBackModal'
import auditDetailModal from './components/auditDetailModal'
import { mapState } from 'vuex'
import detilModal from '@/components/detilModal/detilModal'

export default {
  name: 'report-audit-manage',
  data() {
    return {
      getList: [
        {
          pe_sn: '1001',
          name: '张小三',
          first_exam: 1,
          exam_category: '类别',
          exam_package: '',
          company_name: '承晟集团',
          back_status: 0,
          person_vip: 1,
          company_vip: 1,
        },
        {
          pe_sn: '1001',
          name: '李小四',
          first_exam: 1,
          exam_category: '类别',
          exam_package: '',
          company_name: '承晟集团',
          back_status: 1,
        },
        {
          pe_sn: '1001',
          name: '王小五',
          first_exam: 0,
          exam_category: '类别',
          exam_package: '',
          company_name: '承晟集团',
          back_status: 0,
        },
      ],
      params: {
        search: '',
      },
      selectMode: false,
      tableHeight: 500,
      recallReasonModal: false,
      place: 'bottom-end',
      editAuditsModal: false,
      // 穿梭框字段
      auditsLists: [], // 审核编辑人员列表
      auditColumns: [
        {
          title: '人员编号',
          key: 'audit_no',
        },
        {
          title: '人员名称',
          key: 'audit_name',
        },
      ], // 列信息
      allAuditsLists: [
        {
          id: '001',
          audit_no: '001',
          audit_name: '马芳',
        },
        {
          id: '002',
          audit_no: '002',
          audit_name: '杨芳',
        },
        {
          id: '003',
          audit_no: '003',
          audit_name: '朱芳',
        },
      ], // 全部审核人员
      // select的选项
      selectOptions: [
        {
          label: '内科',
          value: 1,
        },
        {
          label: '外科',
          value: 2,
        },
        {
          label: '烧伤科',
          value: 3,
        },
      ],
      auditDetailModal: false, // 审核详情模态框
      auditDetailColumns: [
        {
          title: '审核人',
          key: 'audit_name',
          width: 80,
        },
        {
          title: '审核结果',
          key: 'audit_result',
          width: 70,
        },
        {
          title: '审核详情',
          key: 'audit_detail',
        },
        {
          title: '审核时间',
          key: 'audit_time',
          width: 124,
        },
      ],
      examDetailModalStatus: false, // 体检详情
    }
  },
  components: {
    ZButton,
    ZButtonHasBg,
    titletHasSlot,
    searchInput,
    EditAuditsModal,
    SendBackModal,
    auditDetailModal,
    detilModal,
  },
  computed: {
    columns() {
      let that = this
      return [
        {
          title: '体检号',
          key: 'pe_sn',
          width: 100,
          render(h, params) {
            return h(
              'div',
              {
                class: {
                  'back-status-color': !!(params.index % 2),
                },
              },
              params.row.pe_sn,
            )
          },
        },
        {
          title: '姓名',
          key: 'name',
          width: 92,
          render(h, params) {
            return h(
              'div',
              {
                style: {
                  display: 'inline-block',
                  position: 'relative',
                },
                class: {
                  'back-status-color': !!(params.index % 2),
                },
              },
              [
                h('span', params.row.name),
                h('i', {
                  style: {
                    display: 'inline-block',
                    width: '12px',
                    height: '10px',
                    background: 'url(/static/icons/public/vipYellow.svg)',
                    position: 'absolute',
                    left: '-16px',
                    top: '4px',
                  },
                }),
              ],
            )
          },
        },
        {
          title: '初/复检',
          key: 'first_exam',
          width: 92,
          render(h, params) {
            return h(
              'div',
              {
                class: {
                  'back-status-color': !!(params.index % 2),
                },
              },
              params.row.first_exam ? '初检' : '复检',
            )
          },
          titleRender(row) {
            let val = row.first_exam ? '初检' : '复检'
            return val
          },
        },
        {
          title: '体检类别',
          key: 'exam_category',
          width: 92,
          render(h, params) {
            return h(
              'div',
              {
                class: {
                  'back-status-color': !!(params.index % 2),
                },
              },
              params.row.exam_category,
            )
          },
        },
        {
          title: '体检套餐',
          key: 'exam_package',
          render(h, params) {
            return h(
              'div',
              {
                class: {
                  'back-status-color': !!(params.index % 2),
                },
              },
              params.row.exam_package,
            )
          },
        },
        {
          title: '单位名称',
          key: 'company_name',
          render(h, params) {
            return h(
              'div',
              {
                style: {
                  position: 'relative',
                  display: 'inline-block',
                },
                class: {
                  'back-status-color': !!(params.index % 2),
                },
              },
              [
                h('span', params.row.company_name),
                h('i', {
                  style: {
                    display: 'inline-block',
                    width: '12px',
                    height: '10px',
                    background: 'url(/static/icons/public/vipBlue.svg)',
                    position: 'absolute',
                    left: '-13px',
                    top: '4px',
                  },
                }),
              ],
            )
          },
        },
        {
          title: '状态',
          key: 'back_status',
          width: 90,
          render(h, params) {
            return h(
              'div',
              {
                style: {
                  position: 'relative',
                  display: 'inline-block',
                },
                class: {
                  'back-status-color': !!(params.index % 2),
                },
                on: {
                  click: that.openAuditDetailModal,
                },
              },
              [
                h('span', params.row.back_status ? '已退回' : '已通过'),
                h('i', {
                  style: {
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    background: params.row.back_status
                      ? 'url(/static/icons/public/recall.svg)'
                      : '',
                    position: 'absolute',
                    left: '-17px',
                    top: '2px',
                  },
                }),
              ],
            )
          },
        },
        {
          title: '主检医生',
          key: 'name',
          width: 84,
          render(h, params) {
            return h(
              'div',
              {
                class: {
                  'back-status-color': !!(params.index % 2),
                },
              },
              params.row.name,
            )
          },
        },
        {
          title: '主检日期',
          key: 'name',
          width: 96,
          render(h, params) {
            return h(
              'div',
              {
                class: {
                  'back-status-color': !!(params.index % 2),
                },
              },
              params.row.name,
            )
          },
        },
        {
          title: '操作',
          width: 185,
          fixed: 'right',
          render(h, params) {
            return h('div', [
              h(
                'span',
                {
                  class: {
                    'text-button': !that.selectMode,
                    'text-button-disable': that.selectMode,
                  },
                  on: {
                    click: function() {
                      if (that.selectMode) return
                      that.openExamDetailModal(params.row, params.index)
                    },
                  },
                },
                '体检详情',
              ),
              h(
                'span',
                {
                  style: {
                    padding: '0 10px',
                  },
                  class: {
                    'text-button': !that.selectMode,
                    'text-button-disable': that.selectMode,
                  },
                  on: {
                    click: function () {
                      if (that.selectMode) return
                      that.editAudit()
                    },
                  },
                },
                '编辑审核人员',
              ),
              h(
                'Poptip',
                {
                  props: {
                    // value: 2,
                    placement: 'bottom-end',
                  },
                  style: {
                    display: 'inline-block',
                    width: '15px',
                    color: '#008cee',
                    'margin-right': '10px',
                  },
                  nativeOn: {
                    click: () => {
                      this.morebtn = 1
                    },
                    mouseenter: e => {
                      if (document.body.clientHeight - e.clientY >= 160) {
                        this.place = 'bottom-end'
                      } else {
                        this.place = 'top-end'
                      }
                    },
                  },
                },
                [
                  h('div', {
                    style: {
                      width: '25px',
                      height: '15px',
                      color: '#008cee',
                      'z-index': '999',
                      background:
                        "url('/static/icons/public/more.svg') no-repeat center 10px",
                    },
                  }),
                  h(
                    'div',
                    {
                      style: {
                        'line-height': '30px',
                      },
                      slot: 'content',
                    },
                    [
                      h(
                        'div',
                        {
                          class: 'report-audit-manage-poptip',
                          on: {
                            click: e => {
                              console.log('审核通过')
                            },
                          },
                        },
                        '审核通过',
                      ),
                      h(
                        'div',
                        {
                          class: 'report-audit-manage-poptip',
                          on: {
                            click: that.sendBackToModify,
                          },
                        },
                        '退回修改',
                      ),
                    ],
                  ),
                ],
              ),
            ])
          },
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.radiologicalReportcontently.offsetHeight
    },
  },
  methods: {
    ...mapState(['windowHeight']),
    searchFunc() {
      console.log('搜索')
    },
    // 选择按钮
    handleSelect() {
      this.selectMode = true
    },
    // 取消选择
    abolishSelectMode() {
      this.selectMode = false
    },
    delOne() {
      console.log('删除')
    },
    editOne() {
      console.log('编辑', this.$refs.editModal)
      this.$refs.editModal.openM()
    },
    selectChange() {
      console.log('全选')
    },
    // 退回修改
    sendBackToModify() {
      this.recallReasonModal = true
    },
    // 确认修改退回
    affirmEditAudits(data) {
      this.editAuditsModal = false
      console.log(this.auditsLists, data, '应用于所有结果审核')
    },
    // 编辑审核人员
    editAudit() {
      this.editAuditsModal = true
    },
    // 退回修改
    // 退回修改确定
    affirmSendBack(data) {
      console.log(data)
      this.recallReasonModal = false
    },
    // 审核详情
    openAuditDetailModal() {
      this.auditDetailModal = true
    },
    // 体检详情
    openExamDetailModal(row, index) {
      this.examDetailModalStatus = true
    },
    detilModalAffirm() {
      this.examDetailModalStatus = false
    },
    detilAbolish() {
      this.examDetailModalStatus = false
    },
    amendFunc() {
      this.$refs.zBaseInfoTable.exportCsv()
    },
  },
}
</script>
<style  lang="less" >
@import (reference) '~assets/less/variable.less';

.report-audit-manage-wrapper {
  position: relative;
  height: 100%;
  background: #ffffff;
  height: 100%;

  .report-audit-manage-content {
    padding: 10px;
    height: 100%;
    .report-audit-manage-Body {
      height: 100%;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      box-shadow: 0 1px 6px 0 rgba(206, 213, 242, 0.8);
      border-radius: 8px;
      overflow: hidden;
      .ivu-table-fixed-body {
        overflow: visible;
        .ivu-table-tbody {
          border-left: 1px solid #d9d9d9;
          overflow: visible;
          > tr > td:nth-child(1) {
            border-right: none;
          }
        }
      }

      .report-table {
        height: calc(~'100% - 50px');
        .back-status-color {
          color: #ff7b11;
        }
        .text-button {
          line-height: 40px;
          color: @gradeBlueTwo;
        }
        .text-button-disable {
          line-height: 40px;
          color: @gradeAshFive;
        }
      }
    }
  }

  // poptip
  .report-audit-manage-poptip {
    font-size: 12px;
    color: @gradeAshTwo;
    letter-spacing: 0;
    &:hover {
      font-size: 12px;
      color: @gradeBlueTwo;
      letter-spacing: 0;
    }
  }

  // 审核详情模态框内容
  .audit-detail-content {
    padding: 20px;
    padding-bottom: 0;
    overflow: auto;
    height: 560px;
    .audit-detail-item {
      width: 474px;
      border: 1px solid @gradeAshFive;
      margin: 0 auto;
      margin-bottom: 20px;
      border-radius: 8px;
      overflow: hidden;
      .title-right {
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
}
</style>