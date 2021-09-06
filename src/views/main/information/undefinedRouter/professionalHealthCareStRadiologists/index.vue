/**
* @author liuyang
* @date 2018/2/27
* @content 放射人员职业健康监护规范
*/
<template>
  <div class="professional-health-care-stradiologists-all">
    <div class="professional-health-care-stradiologists-all-content">
      <!-- 页面头部 -->
      <titlet-hasSlot>
        <span slot="titletHasSlotLeftTitle">放射人员职业健康监护规范</span>
        <div slot="titletHasSlotRightContent"
             class="content">
          <search-input class="input"
                        searText="请输入搜索内容"
                        @on-enter="enterSearch"
                        @on-Icon="enterSearch"
                        @on-cancel="enterSearch"
                        :searchWidth='220'></search-input>
          <div v-if='showGroupOut'
               class="group-out">
            <Button type="ghost"
                      class="fl marginR10"
                      @click="addButton" key="3">新 增</Button>
            <Button type="ghost" v-if="!isSelectMode" class="fl marginR10" @click="exportBtn" key="5">导 出</Button>
            <Button type="ghost"
                      class="fl marginR10"
                      @click="selectButton" key="4">选 择</Button>
          </div>
          <div v-else
               class="group-in">
            <Button type="success"
                      class="fl marginR10"
                      :disabled="selection.length===0"
                      @click="deleCheckBoxItem" key="6">删 除</Button>
            <!-- <Button type="ghost"
                      class="fl marginR10">打 印</Button> -->
            <Button type="primary"
                      class="fl marginR10"
                      @click="cancelButton" key="2">取 消</Button>
          </div>
        </div>
      </titlet-hasSlot>
      <!-- 表格 -->
      <div class="table"
           ref="content">
        <q-table ref="professionalHealthCareStRadiologistsTable"
                 :selectMode="isSelectMode"
                 :params="params"
                 :columns="columnsTable"
                 :data="occupHealthTypesList.items"
                 :pageInfo="pageInfo"
                 :height="tableHeight"
                 :requestDataApi="getOccupHealthTypesList"
                 :ifEdit="true"
                 @on-selection-change="checkboxSelect"
                 @delete="delOneRow"
                 @on-row-dbClick='editRow'
                 @delete-row='delOneRow'
                 @edit="editRow"
                 :width="1400"
                 @edit-row='editRow'
                 @all-selection="allSelection"
                 @getRequestParams="getRequestParams"
                 >
        </q-table>
      </div>
    </div>
    <!-- 新增弹窗 -->
   <add-component :addModalDiv='addComponentMode' @commit-data="save" @cancel-data="cancel" :sort="total+1"></add-component>
    <!-- 新增弹窗 -->

     <!-- 编辑弹窗 -->
   <edit-component :editModalDiv='editComponentMode' @commit-data="edit" @cancel-data="cancelEdit" :data="editMo"  :InquiriesTypesList="InquiriesTypesLists"  :sort="editMo.sort" ></edit-component>
    <!-- 编辑弹窗 -->

     <!-- 删除多个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delSomeModal" :delCounts="delCounts" @delCancel="delSomeModal=false" @affirmDel="submitDelSome"></affirm-del-modal>
    </div>
    <!-- 删除多个弹窗 -->

    <!-- 删除1个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delOneModal" :delCounts="1" @delCancel="delOneModal=false" @affirmDel="submitDelOne"></affirm-del-modal>
    </div>
    <!-- 删除1个弹窗 -->
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'
import addComponent from './components/addComponent'
import editComponent from './components/editComponent'
import * as types from '@/store/modules/information/undefinedRouter/professionalHealthCareStRadiologists/professionalHealthCareStRadiologistsType'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
import fifters from '@/utils/fifters'
/* import * as _ from 'lodash' */
export default {
  name: 'professionalHealthCareStRadiologists',
  components: {
    titletHasSlot,
    addComponent,
    editComponent,
  },
  data() {
    return {
      exportParams: {
        reqParams: {},
        columns: [
          {
            title: '职业健康检查种类',
            key: 'occup_health_examination_type_name',
            minWidth: 136,
          },
          {
            title: '特殊情况',
            key: 'occup_harm_factor_name',
            minWidth: 136,
          },
          {
            title: '重点症状询问',
            key: 'examination_content',
            minWidth: 125,
          },
          {
            title: '体检项目',
            key: 'examination_content',
            minWidth: 125,
          },
          {
            title: '检查周期',
            key: 'examination_content',
            minWidth: 191,
            className: 'test',
          },
          {
            title: '备注',
            key: 'remark',
          },
          {
            title: '启用',
            key: 'status',
            render: (value) => {
              return value === 1 ? '启用' : '未启用'
            },
          },
          {
            title: '显示顺序',
            key: 'sort',
          },
          {
            title: '最后修改人',
            key: 'operater',
          },
          {
            title: '最后修改时间',
            key: 'updated_at',
            render: (value) => {
              if (value) {
                return fifters.timeFilter(value, 'YYYY-MM-DD HH:mm')
              } else {
                return ''
              }
            },
          },
        ],
      },
      delSomeModal: false,
      delOneModal: false,
      addComponentMode: false,
      editComponentMode: false,
      delCounts: 0,
      realName: '',
      /* edit_examination_content: '', */
      targetConDisplay: [],
      targetConDisplayEdit: [],
      OccpDiseasesTypesListClone: [],
      // 新增弹窗 目标疾病禁用
      targetDiseaseDisplay: [],
      targetDiseaseDisplayEdit: [],
      OccpContraindicationTypesListClone: [],
      customNewAddInit: {
        columns: [
          {
            title: '项目类别',
            key: 'item_type_name',
          },
          {
            title: '组合项目名称',
            key: 'name',
          },
        ],
        sourceData: [],
      },
      editMo: {
        curRow: undefined,
        occup_taboo: '',
        occup_disease: '',
        examination_content: '',
        inquiry_item: '',
        group_item: '',
        status: '',
        sort: '',
        remark: '',
        pe_cycle: '',
        examination_object: '',
        examination_time: '',
        harm_personnel_type_id: '',
        occup_health_examination_type_id: '',
        occup_harm_type_id: '',
        occup_harm_factor_id: '',
      },
      // third addNew
      group_item: [],
      inquiry_item: [],
      // 检查内容
      examination_content: '',
      addModalThreeOverflow: '',
      OccpDiseasesTypesId: [],
      editOccpDiseasesTypesId: [
        {
          occup_disease_id: '',
          exam_basi_id: '',
        },
      ],
      OccpContTypesIdSecond: [
        {
          occup_taboo_id: '',
          exam_basi_id: '',
        },
      ],
      OccpContTypesIdSecondEdit: [
        {
          occup_taboo_id: '',
          exam_basi_id: '',
        },
      ],
      addNewOccpArry: [
        {
          addNewItemSShwow: false,
          addNewItemTShwow: true,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
      addNewOccpArrySecond: [
        {
          addNewItemSShwow: false,
          addNewItemTShwow: true,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
      // 编辑
      editNewOccpArry: [
        {
          addNewItemSShwow: false,
          addNewItemTShwow: true,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
      editNewOccpArrySecond: [
        {
          addNewItemSShwow: false,
          addNewItemTShwow: true,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
      // 穿梭框test数据
      customInit: {
        // 穿梭框数据
        columns: [
          {
            title: '问诊症状名称',
            key: 'name',
          },
        ],
        sourceData: [], // 穿梭框右侧数据
        targetData: [], // 穿梭框左侧数据
      },
      // show Secound
      showSecoundItem: 0,
      selection: [],
      // 验证
      addModal: {
        data: {
          curRow: undefined,
          occup_taboo: '',
          occup_disease: '',
          examination_content: '',
          inquiry_item: '',
          group_item: '',
          status: '',
          sort: '',
          remark: '',
          pe_cycle: '',
          examination_object: '',
          examination_time: '',
          harm_personnel_type_id: '',
          occup_health_examination_type_id: '',
          occup_harm_type_id: '',
          occup_harm_factor_id: '',
        },
        rule: {
          harm_personnel_type_id: [
            {
              required: true,
              message: '接害人员类别必须选',
              type: 'number',
              trigger: 'change',
            },
          ],
          occup_health_examination_type_id: [
            {
              required: true,
              type: 'number',
              message: '职业健康检查种类必须填写',
              trigger: 'change',
            },
          ],
          occup_harm_type_id: [
            {
              required: true,
              type: 'number',
              message: '职业病危害因素类别必须填写',
              trigger: 'change',
            },
          ],
          occup_harm_factor_id: [
            {
              required: true,
              type: 'number',
              message: '职业危害因素名称必须填写',
              trigger: 'change',
            },
          ],
        },
      },
      // 删除
      showDelButton: true,
      controlModal: false,
      deletItemLength: null,
      clickId: null,
      chekboxId: null,
      // 编辑
      lastTime: null,
      editSort: null,
      addNewItemData: {},
      showGroupOut: true,
      newStatus: 0,
      // 表格参数
      isSelectMode: false,
      tableHeight: 400,
      statusValue: '',
      // 弹框
      addModalDiv: false,
      editModalDiv: false,
      params: {
        search: '',
      },
      urlRemark: '/static/icons/public/remarkInCell.svg',
      searchText: '',
      totalsort: null,
    }
  },
  methods: {
    ...mapMutations('professionalHealthCareStRadiologistsModule', {
      // setDiseasesNum: types.SET_DISEASESNUM,
      setTotal: types.SET_TOTAL,
      reset: types.RESET,
    }),
    ...mapActions('professionalHealthCareStRadiologistsModule', [
      'getOccupHealthTypesList',
      'getOccupHealthExamTypesList',
      'getOccupHazardCategoryTypesList',
      'getOccupHazardCategoryFactorTypesList',
      'getOccupDiseaseList',
      'getOccupInspectionList',
      'getOccupContraindicationList',
      'getInquiriesList',
      'getGroupItemsList',
      'getGroupItemsDetailsList',
      'adNewItemFun',
      'deletItemFun',
      'amendItemFun',
      'getAllPro',
      'getInquiryProjects',
      'setTotal',
    ]),
    // 表格全选
    allSelection(data) {
      this.checkboxId = data.map(item => {
        return item.id
      })
    },
    getRequestParams(params) {
      this.exportParams.reqParams = params
    },
    exportBtn() {
      let _this = this
      exportXlsx('放射人员职业健康监护规范', {
        api: api.professionalHealthCareStRadiologists.getList,
        params: this.exportParams.reqParams,
        columns: this.exportParams.columns,
        callback (result) {
          if (result) {
            _this.$Message.success('导出成功')
          } else {
            _this.$Message.error('导出失败')
          }
        },
      })
    },
    // 项目类别
    async getItemType(data) {
      await this.getGroupItemsDetailsList({
        with: 'itemType:name',
        item_type_id: data,
        per_page: 100000,
      })
      this.customNewAddInit.sourceData = this.OccupGroupItemsDetailsTypesList
    },
    async getItemTypeEdit(data) {
      await this.getGroupItemsDetailsList({
        with: 'itemType:name',
        item_type_id: data,
        per_page: 100000,
      })
      this.customNewAddInit.sourceData = this.OccupGroupItemsDetailsTypesList
    },
    // 新增目标职业病
    changeOccpDiseasesDisplay(index) {
      return this.OccpDiseasesTypesId.some(function(item) {
        return index === item.occup_disease_id
      })
    },
    // 新增目标职业病
    changeOccpDiseases(index) {
     //
    },
    // 删除
    delCancel() {
      this.controlModal = false
    },
    deleCheckBoxItem() {
      this.delSomeModal = true
      this.delCounts = this.selection.length
    },
    delOneRow(data) {
      this.editMo = data
      this.delOneModal = true
    },
    refresh() {
      this.$refs.diseaseOrExpManagementTable.request()
    },
    checkboxSelect(selection) {
      this.delCounts = selection.length
      this.selection = selection
    },
    async submitDelSome() {
      this.delSomeModal = false
      let arr = []
      this.selection.forEach(element => {
        arr.push(element.id)
      })
      this.setTotal(this.total - this.selection.length)
      await this.deletItemFun({ ids: arr })
      this.refreshAfterDel(this.selection.length)
    },
    async submitDelOne() {
      this.delOneModal = false
      await this.deletItemFun({ ids: this.editMo.id })
      this.setTotal(this.total - 1)
      this.$refs.professionalHealthCareStRadiologistsTable.request()
      this.refreshAfterDel(1)
    },
    refreshAfterDel(delNum) {
      this.$refs.professionalHealthCareStRadiologistsTable.allSelection = []
      if (
          this.pageInfo.total <=
            (this.pageInfo.current_page - 1) * this.pageInfo.per_page + delNum &&
          this.pageInfo.current_page !== 1
        ) {
        this.$refs.professionalHealthCareStRadiologistsTable.request({ page: this.pageInfo.current_page - 1 })
      } else {
        this.$refs.professionalHealthCareStRadiologistsTable.request()
      }
    },

    async editRow(data) {
      console.log(78, data)
      this.editComponentMode = true
      await this.getInquiryProjects()
      this.editMo = data
    },
    async addButton() {
      this.addComponentMode = true
    },
    // 保存
    async save(data) {
      await this.adNewItemFun(data)
      this.setTotal(this.total + 1)
      this.refreshTree()
      this.addComponentMode = false
      this.refresh()
    },
    edit() {
      this.editComponentMode = false
    },
    // 编辑取消
    cancelEdit() {
      this.editComponentMode = false
    },
    // 添加取消
    cancel() {
      this.addComponentMode = false
    },
    async enterSearch(data) {
      this.params.search = data
    },
    // 启用
    // 选择按钮
    selectButton() {
      this.showGroupOut = !this.showGroupOut
      this.isSelectMode = !this.isSelectMode
    },
    // 取消按钮
    cancelButton() {
      this.showGroupOut = !this.showGroupOut
      this.isSelectMode = !this.isSelectMode
      this.$refs.baseInfoTable.allSelection = []
      this.chekboxId = []
    },
  },
  computed: {
    ...mapState(['windowHeight']),
    ...mapState('professionalHealthCareStRadiologistsModule', [
      'occupHealthTypesList',
      'occupHealthExamTypesList',
      'OccupHazardCategoryTypesList',
      'OccupHazardCategoryFactorTypesList',
      'OccpDiseasesTypesList',
      'OccpInspectionTypesList',
      'OccpContraindicationTypesList',
      'InquiriesTypesList',
      'OccupGroupItemsTypesList',
      'allPro',
      'InquiriesTypesLists',
      'total',
    ]),
    // editMo(data) {
    //   console.log(123, data)
    // },
    pageInfo() {
      return this.occupHealthTypesList.meta
    },
    columnsTable() {
      return [
        {
          title: '职业健康检查种类',
          key: 'occup_health_examination_type_name',
          // minWidth: 136,
        },
        {
          title: '特殊情况',
          key: 'occup_harm_factor_name',
          // minWidth: 136,
        },
        {
          title: '重点症状询问',
          key: 'examination_content',
          // minWidth: 125,
          className: 'test',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerHTML: params.row.examination_content,
                },
              }),
            ])
          },
        },
        {
          title: '体检项目',
          key: 'examination_content',
          // minWidth: 125,
          className: 'test',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerHTML: params.row.examination_content,
                },
              }),
            ])
          },
        },
        {
          title: '检查周期',
          key: 'examination_content',
          // minWidth: 191,
          className: 'test',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerHTML: params.row.examination_content,
                },
              }),
            ])
          },
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: true,
          width: 60,
          render: (h, params) => {
            let val = params.row.remark
            if (val) {
              return h('remark-in-table', {
                props: {
                  text: val,
                },
              })
            }
            return ''
          },
        },
        {
          title: '启用',
          key: 'status',
          width: 58,
          render: (h, params) => {
            if (params.row.status === 1) {
              if (params.row.status === 1) {
                return h('status-in-table')
              }
            }
          },
          titleRender: (data) => {
            return ''
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 1,
              label: '启用',
            },
            {
              value: 0,
              label: '未启用',
            },
          ],
        },
        {
          title: '显示顺序',
          key: 'sort',
          width: 70,
        },
        {
          title: '最后修改人',
          key: 'operater',
          align: 'center',
          ellipsis: true,
          width: 90,
        },
        {
          title: '最后修改时间',
          key: 'updated_at',
          width: 130,
          render: (h, params) => {
            if (params.row.updated_at) {
              return fifters.timeFilter(
                  params.row.updated_at,
                  'YYYY-MM-DD HH:mm'
                )
            } else {
              return ''
            }
          },
          titleRender: (data) => {
            if (data.updated_at) {
              return fifters.timeFilter(
                  data.updated_at,
                  'YYYY-MM-DD HH:mm'
                )
            } else {
              return ''
            }
          },
          filterType: 'time',
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      //
    },
    targetDiseaseDisplay(val) {
      if (val.length) {
        this.OccpDiseasesTypesListClone = this.OccpDiseasesTypesList.items.map(
          (item, index) => {
            if (
              val.some(function(items) {
                return items === item.id
              })
            ) {
              item.displayDisabled = false
              return item
            } else {
              item.displayDisabled = true
              return item
            }
          },
        )
      }
    },
    targetDiseaseDisplayEdit(val) {
      if (val.length) {
        this.OccpDiseasesTypesListClone = this.OccpDiseasesTypesList.items.map(
          (item, index) => {
            if (
              val.some(function(items) {
                return items === item.id
              })
            ) {
              item.displayDisabled = false
              return item
            } else {
              item.displayDisabled = true
              return item
            }
          },
        )
      }
    },
    targetConDisplay(val) {
      if (val.length) {
        this.OccpContraindicationTypesListClone = this.OccpContraindicationTypesList.items.map(
          (item, index) => {
            if (
              val.some(function(items) {
                return items === item.id
              })
            ) {
              item.displayDisabled = false
              return item
            } else {
              item.displayDisabled = true
              return item
            }
          },
        )
      }
    },
    targetConDisplayEdit(val) {
      if (val.length) {
        this.OccpContraindicationTypesListClone = this.OccpContraindicationTypesList.items.map(
          (item, index) => {
            if (
              val.some(function(items) {
                return items === item.id
              })
            ) {
              item.displayDisabled = false
              return item
            } else {
              item.displayDisabled = true
              return item
            }
          },
        )
      }
    },
  },
  async created() {
  //
  },
  async mounted() {
    await this.setTotal()
  },
  destroyed() {
    this.reset()
  },
}
</script>
<style lang="less" >
@import (reference) '~assets/less/variable.less';
.professional-health-care-stradiologists-all {
  padding: 10px;
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  .professional-health-care-stradiologists-all-content {
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    .titlet-has-slot {
      overflow: visible;
      .paddingT10 {
        height: 50px;
        .content {
          height: 30px;
          display: flex;
          .title {
            display: inline-block;
            line-height: 30px;
            font-size: 12px;
            margin-right: 10px;
          }
          .select {
            vertical-align: top;
            margin-right: 20px;
          }
          .input {
            vertical-align: top;
            margin-right: 20px;
          }
          .group-out {
            height: 30px;
            button:last-child {
              margin-right: 0px;
            }
          }
          .group-in {
            button:last-child {
              margin-right: 0px;
            }
          }
        }
      }
    }
        .table {
      height: calc(~'100% - 50px');
      .ivu-table-body {
         .test {
           /* box-sizing: content-box;
           height: 80px;
           padding-top: 20px;
           padding-bottom: 20px;
           overflow: hidden; */
           .ivu-table-cell {
             height: 120px;
             padding-top: 20px;
             padding-bottom: 20px;
             display: table;
             width: 100%;
             &>div {
               width: 100%;
               display: table-cell;
               vertical-align: middle;
               text-align: center;
             }
           }
           span {
             white-space: initial;
             width: 100%;
             max-height: 80px;
              overflow:hidden;
              text-overflow:ellipsis;
              display:-webkit-box;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:4;
              line-height: 20px;
              font-size:12px;
            }
          }
      }
      .ivu-table-fixed-right {
        .ivu-table-row {
          height: 120px;
        }
      }
    }
  }
}
</style>
