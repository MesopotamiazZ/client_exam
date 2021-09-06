<template>
  <!-- 报告审核 -->
  <div class="health-card-wrapper">
    <div class="health-card-content">
      <div class="health-card-Body">
        <titletHasSlot style="border-bottom: 1px solid #cccccc;">
          <div slot='titletHasSlotLeftTitle'>
            <tab :tab="titleTabs"
                 @tab-change="changeTab"></tab>
          </div>
          <div v-if="tabIndex === 0"
               slot='titletHasSlotRightContent'>
            <searchInput class="fl "
                         icon="android-search"
                         searText="请输入搜索内容"
                         ref="searchInput">
            </searchInput>
            <ZButton class="marginR10"
                     v-if="matchSelectMode"
                     ZBtype="ghost">上传数据</ZButton>
            <ZButton class="marginR10"
                     v-if="matchSelectMode"
                     ZBtype="ghost">打印健康证</ZButton>
            <ZButton :ZBtype='"ghost"'
                     class="marginR10" @click="amendFunc">导 出</ZButton>
            <ZButton :ZBtype='"ghost"'
                     class="marginR10"
                     v-if="!matchSelectMode"
                     @click="matchChoose">选 择</ZButton>
            <ZButtonHasBg v-if="matchSelectMode"
                          class="marginR10"
                          @click="abolishMatchSelectMode">取 消</ZButtonHasBg>
          </div>
          <div v-if="tabIndex === 1"
               slot='titletHasSlotRightContent'>
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
                     @click="amendFunc()">导出表格</ZButton>
            <ZButton :ZBtype='"ghost"'
                     class="fl marginR10"
                     v-if="!selectMode"
                     @click="amendFunc()">选 择</ZButton>
            <ZButtonHasBg v-if="selectMode"
                          class="fl"
                          @click="abolishSelectMode">取 消</ZButtonHasBg>
          </div>
        </titletHasSlot>
        <!-- <div style="height: 500px;  "
             v-if="tabIndex === 0"
             key="0"> -->
        <div class="health-card-Body-content match-condition"
             ref="radiologicalReportcontently"
             v-if="tabIndex === 0"
             key="0">

          <q-table :showOperateColumn="false"
                   :ifEdit="true"
                   :columns="matchListsColumns"
                   :data="matchListsData"
                   :height="500"
                   :fixedRightWidth="136"
                   :selectMode="false" ref="zBaseInfoTable"></q-table>
        </div>
        <!-- </div> -->

        <!-- <div style="height: 500px;"
             v-if="tabIndex === 1"
             key="1"> -->
        <div class="health-card-Body-content"
             ref="radiologicalReportcontently"
             v-if="tabIndex === 1"
             key="1">
          <q-table :showOperateColumn="false"
                   :ifEdit="true"
                   :columns="notMatchListsColumns"
                   :data="notMatchListsData"
                   :fixedRightWidth="120"
                   :height="500"
                   :selectMode="false" ref="zBaseInfoTable"></q-table>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <preview-modal :recallSign="previewModal"
                   :modalWidth="403"
                   @abolish="abolishPreviewModal"
                   @affirm="affirmPreviewModal">
      <div class="preview-content">
        <div class="title">健康证</div>
        <div class="card-content">
          <div>
            <span class="card-content-title">健康证号</span>
            <span class="card-content-content">川20170402231</span>
          </div>
          <div>
            <div class="card-content-title">姓名</div>
            <span class="card-content-content">王树彤</span>
            <span class="card-content-title second-column">性别</span>
            <span class="card-content-content second-column">女</span>
          </div>
          <div>
            <span class="card-content-title">出生年月</span>
            <span class="card-content-content">1989年10月</span>
          </div>
          <div>
            <span class="card-content-title">从事行业</span>
            <span class="card-content-content">餐饮</span>
          </div>
          <div>
            <span class="card-content-title">工种</span>
            <span class="card-content-content">食品加工员</span>
          </div>
          <div>
            <span class="card-content-title">发证日期</span>
            <span class="card-content-content">2017年04月02日</span>
          </div>
          <div>
            <span class="card-content-title">发证单位</span>
            <span class="card-content-content">成都中医药大学第二附属医院健康管理中心</span>
          </div>
          <img class="photo"
               src=""
               alt="">
        </div>
      </div>
    </preview-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import searchInput from '@/components/searchInput'
import tab from './components/tab'
import QTable from '@/components/qtable'
import previewModal from './components/previewModal'
export default {
  name: 'health-card',
  data() {
    return {
      titleTabs: [
        {
          title: '符合条件人员列表',
        },
        {
          title: '不符合条件人员列表',
        },
      ],
      tabIndex: 0,
      tableHeight: 500,
      // 符合人员
      params: {
        search: '',
      },
      matchSelectMode: false,
      matchListsData: [
        {
          health_id: '川2017002231',
          pe_sn: '170925001',
          name: '王树彤',
          sex: '女',
          age: '28',
          fields: '餐饮',
          work_type: '食品加工员',
          company_name: '四川郫县泰来贸易有限公司',
          register_date: '2017-12-12',
        },
        {
          health_id: '川2017002231',
          pe_sn: '170925003',
          name: '王局',
          sex: '男',
          age: '24',
          fields: '冶金化工',
          work_type: '石棉湿纺',
          company_name: '四川郫县泰来贸易有限公司',
          register_date: '2017-12-12',
        },
        {
          health_id: '川2017002231',
          pe_sn: '170925003',
          name: '王局',
          sex: '男',
          age: '24',
          fields: '冶金化工',
          work_type: '石棉湿纺',
          company_name: '四川郫县泰来贸易有限公司',
          register_date: '2017-12-12',
        },
        {
          health_id: '川2017002231',
          pe_sn: '170925003',
          name: '王局',
          sex: '男',
          age: '24',
          fields: '冶金化工',
          work_type: '石棉湿纺',
          company_name: '四川郫县泰来贸易有限公司',
          register_date: '2017-12-12',
        },
        {
          health_id: '川2017002231',
          pe_sn: '170925003',
          name: '王局',
          sex: '男',
          age: '24',
          fields: '冶金化工',
          work_type: '石棉湿纺',
          company_name: '四川郫县泰来贸易有限公司',
          register_date: '2017-12-12',
        },

      ],
      previewModal: false, // 预览健康证模态框
      // 不符合人员
      notParams: {
        search: '',
      },
      notMatchSelectMode: false,
      notMatchListsData: [
        {
          reason: '咳嗽、腹泻、发热',
          pe_sn: '172007234',
          name: '张小明',
          sex: '男',
          age: 29,
          fields: '食品',
          work_type: '食品加工',
          company_name: '某某食品加工有限公司',
          register_date: '2017-12-25',
        },
        {
          reason: '咳嗽、腹泻、发热',
          pe_sn: '172007234',
          name: '张小明',
          sex: '男',
          age: 29,
          fields: '食品',
          work_type: '食品加工',
          company_name: '某某食品加工有限公司',
          register_date: '2017-12-25',
        },
        {
          reason: '咳嗽、腹泻、发热',
          pe_sn: '172007234',
          name: '张小明',
          sex: '男',
          age: 29,
          fields: '食品',
          work_type: '食品加工',
          company_name: '某某食品加工有限公司',
          register_date: '2017-12-25',
        },
        {
          reason: '咳嗽、腹泻、发热',
          pe_sn: '172007234',
          name: '张小明',
          sex: '男',
          age: 29,
          fields: '食品',
          work_type: '食品加工',
          company_name: '某某食品加工有限公司',
          register_date: '2017-12-25',
        },
      ],
      selectMode: false,
    }
  },
  components: {
    titletHasSlot,
    ZButton,
    ZButtonHasBg,
    searchInput,
    tab,
    QTable,
    previewModal,
  },
  computed: {
    // ...mapState(['windowHeight']),
    // columns() {
    //   if (this.tabIndex === 0) {
    //     return this.matchListsColumns
    //   } else if (this.tabIndex === 1) {
    //     return this.notMatchListsColumns
    //   }
    // },
    matchListsColumns() {
      let that = this
      return [
        {
          title: '健康证号',
          key: 'health_id',
          width: 120,
        },
        {
          title: '体检号',
          key: 'pe_sn',
          width: 98,
        },
        {
          title: '姓名',
          key: 'name',
          width: 80,
        },
        {
          title: '性别',
          key: 'sex',
          width: 44,
        },
        {
          title: '年龄',
          key: 'age',
          width: 44,
        },
        {
          title: '从业行业',
          key: 'fields',
          width: 116,
        },
        {
          title: '工种',
          key: 'work_type',
          width: 116,
        },
        {
          title: '单位名称',
          key: 'company_name',
          minWidth: 203,
        },
        {
          title: '登记日期',
          key: 'register_date',
          width: 94,
        },
        {
          title: '操作',
          width: 136,
          fixed: 'right',
          render(h, params) {
            return h('div', {
              style: {
                height: '40px',
                'line-height': '40px',
                color: '#008CEE',
              },
            }, [
              h('span', {
                on: {
                  click: function() {
                    that.preView(params.row, params.index)
                  },
                },
              }, '预览'),
              h('span', {
                style: {
                  margin: '10px',
                },
              }, '打印'),
              h('span', '上传数据'),
            ])
          },
        },
      ]
    },
    notMatchListsColumns() {
      return [
        {
          title: '不符合原因',
          key: 'reason',
          width: 120,
        },
        {
          title: '体检号',
          key: 'pe_sn',
          width: 98,
        },
        {
          title: '姓名',
          key: 'name',
          width: 80,
        },
        {
          title: '性别',
          key: 'sex',
          width: 44,
        },
        {
          title: '年龄',
          key: 'age',
          width: 44,
        },
        {
          title: '从业行业',
          key: 'fields',
          width: 116,
        },
        {
          title: '工种',
          key: 'work_type',
          width: 116,
        },
        {
          title: '单位名称',
          key: 'company_name',
          minWidth: 203,
        },
        {
          title: '登记日期',
          key: 'register_date',
          minWidth: 94,
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      // if (this.tabIndex === 0) {
      this.tableHeight = this.$refs.radiologicalReportcontently.offsetHeight
      // } else if (this.tabIndex === 1) {
      //   this.tableHeight = this.$refs.notMatchMembers.offsetHeight
      // }
    },
    columns: {
      handler(val) {
        console.log(val.length, val)
      },
      deep: true,
    },
  },
  methods: {
    ...mapState(['windowHeight']),
    changeTab(data, index) {
      this.tabIndex = index
    },
    searchFunc() {
      //
    },
    // 符合
    matchChoose() {
      this.matchSelectMode = true
    },
    abolishMatchSelectMode() {
      this.matchSelectMode = false
    },
    // 预览
    preView(row, index) {
      this.previewModal = true
    },
    affirmPreviewModal() {
      this.previewModal = false
    },
    abolishPreviewModal() {
      this.previewModal = false
    },
    // 不符合
    amendFunc() {
      this.$refs.zBaseInfoTable.exportCsv()
    },
  },
}
</script>
<style  lang="less" >
@import (reference) '~assets/less/variable.less';

.health-card-wrapper {
  position: relative;
  height: 100%;
  background: #ffffff;
  height: 100%;

  .health-card-content {
    padding: 10px;
    height: 100%;

    .health-card-Body {
      height: 100%;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      box-shadow: 0 1px 6px 0 rgba(206, 213, 242, 0.8);
      border-radius: 8px;

      .titlet-has-slot-title {
        margin-top: 0;
        &::before {
          content: none;
        }
      }

      .health-card-Body-content {
        height: calc(~'100% - 50px');
        box-sizing: border-box;
        // height: 500px;
        &.match-condition {
          .ivu-table-fixed-body {
            height: calc(~'100% - 41px') !important;
          }
        }
      }
    }
  }

  //
  .preview-content {
    margin: 20px;
    background: #f2f7ff;
    border-radius: 14px;
    padding-top: 12px;
    .title {
      font-size: 20px;
      color: @gradeAshTwo;
      letter-spacing: 16px;
      text-align: center;
    }
    .card-content {
      position: relative;
      margin-top: 6px;
      padding: 0 20px 20px 20px;
      .photo {
        position: absolute;
        width: 90px;
        height: 130px;
        top: 6px;
        right: 20px;
        border: 1px solid rgba(51, 163, 241, 0.7);
      }
      .card-content-title {
        display: inline-block;
        font-size: 12px;
        color: @gradeBlueTwo;
        margin-right: 10px;
        width: 48px;
        line-height: 26px;
        text-align: justify;
        text-align-last: justify;
        &.second-column {
          display: inline;
          margin-left: 5em;
        }
      }
      .card-content-content {
        color: @gradeAshTwo;
        line-height: 26px;
        &.second-column {
        }
      }
    }
  }
}
</style>