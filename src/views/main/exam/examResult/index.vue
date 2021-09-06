<template>
  <!-- 报告审核 -->
  <div class="report-audit-wrapper">
    <div class="report-audit-content">
      <div class="report-audit-Body">
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
                     class="fl marginR10"
                     @click="amendFunc()">导 出</ZButton>
            <ZButton :ZBtype='"ghost"'
                     class="fl"
                     v-if="!selectMode"
                     @click="amendFunc1()">选 择</ZButton>
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
    <default-modal :recallSign="recallReasonModal"
                   headerText="退回原因"
                   :modalWidth="360"
                   @abolish="recallReasonModal=false"
                   @affirm="affirmSendBack">

    </default-modal>
    <!-- 体检详情 -->
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
import DefaultModal from './components/modal'
import { mapState } from 'vuex'
import detilModal from '@/components/detilModal/detilModal'

export default {
  name: 'report-audit',
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
      examDetailModalStatus: false, // 体检详情
    }
  },
  components: {
    ZButton,
    ZButtonHasBg,
    titletHasSlot,
    searchInput,
    DefaultModal,
    detilModal,
  },
  computed: {
    columns() {
      let that = this
      return [
        {
          title: '体检号',
          key: 'name',
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
          key: 'name',
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
        },
        {
          title: '体检类别',
          key: 'name',
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
          key: 'name',
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
          key: 'name',
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
          key: 'name',
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
                    'text-button': true,
                  },
                  on: {
                    click: function() {
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
                    'text-button': true,
                  },
                },
                '审核通过',
              ),
              h(
                'span',
                {
                  class: {
                    'text-button': true,
                  },
                  on: {
                    click: that.sendBack,
                  },
                },
                '退回修改',
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
    amendFunc1() {
      this.selectMode = true
    },
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
    sendBack() {
      this.recallReasonModal = true
    },
    // 确认修改退回
    affirmSendBack(data) {
      console.log(data)
      this.recallReasonModal = false
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

.report-audit-wrapper {
  position: relative;
  height: 100%;
  background: #ffffff;
  height: 100%;

  .report-audit-content {
    padding: 10px;
    height: 100%;
    .report-audit-Body {
      height: 100%;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      box-shadow: 0 1px 6px 0 rgba(206, 213, 242, 0.8);
      border-radius: 8px;

      .report-table {
        height: calc(~'100% - 50px');
        .back-status-color {
          color: #ff7b11;
        }
        .text-button {
          line-height: 40px;
          color: @gradeBlueTwo;
        }
      }
    }

    .ivu-table-fixed-body {
      height: calc(~'100% - 40px - 1px') !important;
    }
  }

}
</style>