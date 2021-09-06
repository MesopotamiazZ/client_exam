/**
  * 组合项目管理
  * @author 张祥
  * @created 2017/11/29
  * @updated 2018/01/31
  */
<template>
  <div class="me-center-wrapper height100P">
    <div class="multi-exam-wrapper height100P">
      <div class="multi-exam height100P padding10">
        <split-pane class="height100P contentBg"
                    :min="22"
                    :max="28"
                    direction="horizontal"
                    v-model="leftWidth">
          <!-- 左侧树状组件 -->
          <div slot="left"
               class="left height100P">
            <search-tree skipName='projectCategory'
                         :data="treeData"
                         @on-select-change='treeSelectChange'></search-tree>
          </div>
          <!-- 左侧列表 -->

          <!-- 右侧主内容 -->
          <div slot="right"
               class="right height100P">
            <div v-show="showTable"
                 class="pro-list height100P">
              <title-has-slot>
                <span slot="titletHasSlotLeftTitle">{{tableTitle}}</span>
                <div slot="titletHasSlotRightContent">
                  <Button type="primary"
                                   v-if="selectMode"
                                   class="fr "
                                   @click="selectMode=false"
                                   key="1">取 消</Button>
                  <!-- <Button type="ghost" v-if="selectMode" class="fr marginR10" @click="print()" key="2">打 印</Button> -->
                  <Button key="3"
                            type="success"
                            v-if="selectMode"
                            class="fr marginR10  delete-button"
                            :disabled="selection.length===0"
                            @click="deleteAllSelect()">删 除
                  </Button>
                  <Button type="ghost"
                            v-if="!selectMode"
                            class="fr "
                            @click="selectMode=true"
                            key="4">选 择</Button>
                  <Button type="ghost"
                            v-if="!selectMode"
                            class="fr marginR10"
                            @click="exportBtn"
                            key="5">导 出</Button>
                  <Button type="ghost"
                            v-if="!selectMode"
                            class="fr marginR10"
                            @click="add"
                            key="6">新 增</Button>
                  <search-input :searchWidth="220"
                                class="fr marginL20 marginR20"
                                searText="请输入搜索内容"
                                @on-enter="search"
                                @on-Icon="search"
                                @on-cancel="search">
                  </search-input>
                </div>
              </title-has-slot>
              <div class="table-wrapper"
                   ref="tableWrapper">
                <q-table ref="table"
                         :width="1400"
                         :height="tableHeight"
                         :params="params"
                         :columns="columns"
                         :data="pros.items"
                         :pageInfo="pageInfo"
                         :requestDataApi="getPros"
                         :selectMode="selectMode"
                         :ifEdit="true"
                         :showOperateColumn="false"
                         :fixedRightWidth="90"
                         @edit="editOne"
                         @edit-row="editOne"
                         @on-row-dbClick="editOne"
                         @delete="delOne"
                         @delete-row="delOne"
                         @getRequestParams="getRequestParams"
                         @all-selection="selectChange">
                </q-table>
              </div>
            </div>

            <div v-if="!showTable"
                 class="detail-info height100P">
              <div class="info-head">
                <span class="title fl lineH50">{{curProInfo.name}}</span>
                <span class="icon fl"
                      :style="{background:`url(${curProInfo.status===1?urlSuccess:urlUnse}) no-repeat`}"></span>
                <span class="fl lineH50">{{curProInfo.status===1?'启用':'未启用'}}</span>
                <Button type="success"
                          class="marginT10 marginL10 fr"
                          @click="delOne(curProInfo)">删 除</Button>
                <Button type="ghost"
                          class="marginT10 fr"
                          @click="editOne(curProInfo)">编 辑</Button>
              </div>
              <div class="info-body">
                <span class="small-title marginB20">基本信息</span>
                <div class="width765">
                  <div class="row clearfix">
                    <div class="item fl clearfix">
                      <span class="textJustify fl lineH30 marginR10 height30"
                            style="width:97px;">项目类别</span>
                      <Input class="fl"
                             disabled
                             v-model="curProInfo.item_type"
                             style="width:342px"></Input>
                    </div>
                    <div class="item fr clearfix">
                      <span class="textJustify fl lineH30 marginR10 height30"
                            style="width:48px;">适用性别</span>
                      <Select disabled
                              filterable
                              v-model="curProInfo.sex"
                              style="width:242px;"
                              placeholder="">
                        <Option v-for="item in sexList"
                                :value="item.value"
                                :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                  </div>
                  <div class="row clearfix">
                    <div class="item fl clearfix">
                      <span class="textJustify fl lineH30 marginR10 height30"
                            style="width:97px;">组合项目名称</span>
                      <Input class="fl"
                             disabled
                             v-model="curProInfo.name"
                             style="width:342px"></Input>
                    </div>
                    <div class="item fr clearfix">
                      <span class="textJustify fl lineH30 marginR10 height30"
                            style="width:48px;">小结类型</span>
                      <Select disabled
                              filterable
                              v-model="curProInfo.summary_type"
                              style="width:242px;"
                              placeholder="">
                        <Option v-for="item in summary_typeList"
                                :value="item.value"
                                :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                  </div>
                  <div class="row clearfix">
                    <div class="item fl clearfix">
                      <span class="textJustify fl lineH30 marginR10 height30"
                            style="width:97px;">报告显示名称</span>
                      <Input class="fl"
                             disabled
                             v-model="curProInfo.report_name"
                             style="width:342px"></Input>
                    </div>
                    <div class="item fr clearfix">
                      <span class="textJustify fl lineH30 marginR10 height30"
                            style="width:48px;">费用类别</span>
                      <Select disabled
                              filterable
                              v-model="curProInfo.charge_category_id"
                              style="width:242px;"
                              placeholder="">
                        <Option v-for="item in chargeTypes"
                                :value="item.id"
                                :key="item.id">{{ item.name }}</Option>
                      </Select>
                    </div>
                  </div>
                  <div class="row clearfix">
                    <div class="item fl clearfix">
                      <span class="textJustify fl lineH30 marginR10 height30"
                            style="width:97px;">异常结果汇总方式</span>
                      <Select disabled
                              filterable
                              v-model="curProInfo.abn_summary_mode"
                              style="width:342px;"
                              placeholder="">
                        <Option v-for="item in abn_summary_modeList"
                                :value="item.value"
                                :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                    <div class="item fr clearfix">
                      <span class="textJustify fl lineH30 marginR10 height30"
                            style="width:48px;">标准价格</span>
                      <Input class="fl"
                             disabled
                             v-model="curProInfo.price"
                             style="width:242px"></Input>
                    </div>
                  </div>
                  <div class="row clearfix">
                    <div class="item fl clearfix">
                      <span class="textJustify fl lineH30 marginR10 height30"
                            style="width:97px;">指引单名称</span>
                      <Input class="fl"
                             disabled
                             v-model="curProInfo.guide_name"
                             style="width:342px"></Input>
                    </div>
                    <div class="item fr clearfix">
                      <span class="textJustify fl lineH30 marginR10 height30"
                            style="width:48px;">检查用时</span>
                      <Input class="fl"
                             disabled
                             v-model="curProInfo.exam_time"
                             style="width:242px"></Input>
                    </div>
                  </div>
                  <div class="row clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30"
                          style="width:97px;margin-top:3px;">指引单内容</span>
                    <Input class="fr"
                           disabled
                           v-model="curProInfo.guide_content"
                           style="width:657px"
                           type="textarea"
                           :maxlength="255"
                           :autosize="true"></Input>
                  </div>
                  <div class="row clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30"
                          style="width:97px;margin-top:3px;">默认小结内容</span>
                    <Input class="fr"
                           disabled
                           v-model="curProInfo.default_summary"
                           style="width:657px"
                           type="textarea"
                           :maxlength="255"
                           :autosize="true"></Input>
                  </div>
                  <div class="row clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30"
                          style="width:97px;margin-top:3px;">备注</span>
                    <Input class="fr"
                           disabled
                           v-model="curProInfo.remark"
                           style="width:657px"
                           type="textarea"
                           :maxlength="255"
                           :autosize="true"></Input>
                  </div>
                </div>
                <span class="small-title marginB20">包含单项</span>
                <div v-if="curProInfo&&curProInfo.items.length>0"
                     class="clearfix text-block-wrapper">
                  <div class="text-block fl"
                       v-for="item in curProInfo.items">
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <div v-else
                     class="marginB20">无</div>
                <span class="small-title marginB20">附加费</span>
                <div v-if="curProInfo&&curProInfo.surcharges.length>0"
                     class="summary-charge marginB20">
                  <table cellspacing="0"
                         cellpadding="0"
                         border="0"
                         :style="{width:'100%'}">
                    <colgroup>
                      <col v-for="column in chargeColumns"
                           :width="column.width">
                    </colgroup>
                    <thead>
                      <tr>
                        <th v-for="column in chargeColumns">
                          <div class="cell">
                            <span>{{column.title}}</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in curProInfo.surcharges">
                        <td v-for="column in chargeColumns">
                          <div class="cell">
                            <span>{{row[column.key]}}</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- <Table :columns="chargeColumns" :data="chargeData"></Table> -->
                </div>
                <div v-else
                     class="marginB20">无</div>
                <span class="small-title marginB20">排斥组合项目</span>
                <div v-if="curProInfo&&curProInfo.excludes.length>0"
                     class="clearfix text-block-wrapper">
                  <div class="text-block fl"
                       v-for="item in curProInfo.excludes">
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <div v-else
                     class="marginB20">无</div>
              </div>
            </div>
          </div>
          <!-- 右侧主内容 -->
        </split-pane>
      </div>
    </div>

    <!-- 新增弹窗 -->
    <AddModal v-if="addModal"
              :curType="curType"
              :sort="total+1"
              :surcharges="surcharges"
              :allItems="items"
              :allPros="allPros.items"
              :proTypeOptions="proTypesUsefor"
              :chargeTypeOptions="chargeTypes"
              @cancel="addModal=false"
              @submit="submitAdd">
    </AddModal>
    <!-- 新增弹窗 -->

    <!-- 编辑弹窗 -->
    <EditModal v-if="editModal"
               :rowData="curRow"
               :data="formData"
               :proItems="edit_items"
               :proSurCharges="edit_surCharges"
               :proExcludes="edit_excludes"
               :sort="curRow.sort"
               :surcharges="surcharges"
               :allItems="items"
               :allPros="allPros.items"
               :proTypeOptions="proTypesUsefor"
               :chargeTypeOptions="chargeTypes"
               @cancel="editModal=false"
               @submit="submitEdit">
    </EditModal>
    <!-- 编辑弹窗 -->

    <!-- 删除多个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delSomeModal"
                        :delCounts="delCounts"
                        @delCancel="delSomeModal=false"
                        @affirmDel="submitDelSome"></affirm-del-modal>
    </div>
    <!-- 删除多个弹窗 -->

    <!-- 删除1个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delOneModal"
                        :delCounts="1"
                        @delCancel="delOneModal=false"
                        @affirmDel="submitDelOne"></affirm-del-modal>
    </div>
    <!-- 删除1个弹窗 -->
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddModal from './components/addModal.vue'
import EditModal from './components/editModal.vue'
import fifters from '@/utils/fifters'
import * as types from '@/store/modules/information/examManagement/multiExam/multiExamTypes'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'

export default {
  name: 'multiExam',
  components: {
    AddModal,
    EditModal,
  },
  data() {
    return {
      curType: undefined,
      curPro: undefined,
      exportParams: {
        reqParams: {},
        columns: [
          {
            key: 'item_type.name',
            title: '项目类别',
          },
          {
            key: 'name',
            title: '组合项目名称',
          },
          {
            key: 'sex',
            title: '适用性别',
            render: value => {
              if (value === 0) {
                return '通用'
              } else if (value === 1) {
                return '男'
              } else if (value === 1) {
                return '女'
              }
            },
          },
          {
            key: 'price',
            title: '标准价格（元）',
          },
          {
            title: '费用类别',
            key: 'charge_category',
            render: value => {
              return value && value.name ? value.name : ''
            },
          },
          {
            title: '小结类型',
            key: 'summary_type',
            render: value => {
              if (value === 1) {
                return '自动'
              } else if (value === 2) {
                return '手动'
              }
            },
          },
          {
            title: '备注',
            key: 'remark',
          },
          {
            title: '启用',
            key: 'status',
            render: value => {
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
            render: value => {
              if (value) {
                return fifters.timeFilter(value, 'YYYY-MM-DD HH:mm')
              } else {
                return ''
              }
            },
          },
        ],
      },
      sexList: [
        {
          value: 0,
          label: '通用',
        },
        {
          value: 1,
          label: '男',
        },
        {
          value: 2,
          label: '女',
        },
      ],
      summary_typeList: [
        {
          value: 1,
          label: '自动',
        },
        {
          value: 2,
          label: '手动',
        },
      ],
      abn_summary_modeList: [
        {
          value: 1,
          label: '疾病或异常结果',
        },
        {
          value: 2,
          label: '汇总疾病',
        },
        {
          value: 3,
          label: '汇总异常结果',
        },
        {
          value: 4,
          label: '同时汇总疾病及异常结果',
        },
      ],
      tableTitle: '组合项目列表',
      chargeColumns: [
        {
          title: '附加费名称',
          key: 'name',
        },
        {
          title: '价格（元）',
          key: 'price',
          width: '30%',
        },
      ],
      showTable: true,
      selectMode: false,
      treeData: [],
      leftWidth: 22,
      tableHeight: 400,
      params: {
        search: '',
        with: 'itemType:name;chargeCategory:name',
        filters: '',
      },
      urlUnse: '/static/icons/public/unUse.svg',
      urlSuccess: '/static/icons/public/enabledState.svg',
      urlRemark: '/static/icons/public/remarkInCell.svg',
      editIcon: '/static/icons/public/table-hover-edit.svg', // 编辑
      delIcon: '/static/icons/public/table-hover-del.svg', // 删除
      editBanIcon: '/static/icons/public/table-edit.svg', // 编辑
      delBanIcon: '/static/icons/public/table-del.svg', // 删除
      viewBanIcon: '/static/icons/public/table-preview.svg', // 查看
      viewIcon: '/static/icons/public/table-hover-preview.svg', // 查看
      columns: [
        {
          title: '项目类别',
          key: 'itemType.name',
          ellipsis: true,
          render: (h, params) => {
            return params.row.item_type ? params.row.item_type.name : ''
          },
          titleRender: data => {
            return data.item_type ? data.item_type.name : ''
          },
        },
        {
          title: '组合项目名称',
          key: 'name',
          ellipsis: true,
        },
        {
          title: '适用性别',
          key: 'sex',
          ellipsis: true,
          width: 80,
          render: (h, params) => {
            let val = params.row.sex
            if (val === 0) {
              return '通用'
            }
            if (val === 1) {
              return '男'
            }
            if (val === 2) {
              return '女'
            }
          },
          titleRender: data => {
            let val = data.sex
            if (val === 0) {
              return '通用'
            }
            if (val === 1) {
              return '男'
            }
            if (val === 2) {
              return '女'
            }
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 0,
              label: '通用',
            },
            {
              value: 1,
              label: '男',
            },
            {
              value: 2,
              label: '女',
            },
          ],
        },
        {
          title: '标准价格（元）',
          key: 'price',
          width: 110,
          ellipsis: true,
        },
        {
          title: '费用类别',
          key: 'charge_category',
          ellipsis: true,
          render: (h, params) => {
            return params.row.charge_category
              ? params.row.charge_category.name
              : ''
          },
          titleRender: data => {
            return data.charge_category ? data.charge_category.name : ''
          },
        },
        {
          title: '小结类型',
          key: 'summary_type',
          ellipsis: true,
          width: 80,
          render: (h, params) => {
            let val = params.row.summary_type
            if (val === 1) {
              return '自动'
            }
            if (val === 2) {
              return '手动'
            }
          },
          titleRender: data => {
            let val = data.summary_type
            if (val === 1) {
              return '自动'
            }
            if (val === 2) {
              return '手动'
            }
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 1,
              label: '自动',
            },
            {
              value: 2,
              label: '手动',
            },
          ],
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
          width: 60,
          title: '启用',
          key: 'status',
          align: 'center',
          ellipsis: 'true',
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('status-in-table')
            }
          },
          titleRender: data => {
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
          align: 'center',
          ellipsis: 'true',
          width: 70,
        },
        {
          title: '最后修改人',
          key: 'operater',
          align: 'center',
          ellipsis: 'true',
          width: 90,
        },
        {
          title: '最后修改时间',
          key: 'updated_at',
          align: 'center',
          ellipsis: 'true',
          width: 130,
          render: (h, params) => {
            if (params.row.updated_at) {
              return fifters.timeFilter(
                params.row.updated_at,
                'YYYY-MM-DD HH:mm',
              )
            } else {
              return ''
            }
          },
          titleRender: data => {
            if (data.updated_at) {
              return fifters.timeFilter(data.updated_at, 'YYYY-MM-DD HH:mm')
            } else {
              return ''
            }
          },
          filterType: 'time',
        },
        {
          title: '操作',
          width: 90,
          canSort: false,
          fixed: 'right',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'space-around',
                },
              },
              [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '17px',
                    height: '11px',
                    'maring-right': '3px',
                    background:
                      'url(' +
                      (this.selectMode ? this.viewBanIcon : this.viewIcon) +
                      ') no-repeat',
                  },
                  on: {
                    click: event => {
                      event.stopPropagation()
                      if (this.selectMode) {
                        return
                      }
                      this.preview(params.row, params.index, params.column)
                    },
                  },
                }),
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '12px',
                    height: '13px',
                    background:
                      'url(' +
                      (this.selectMode ? this.editBanIcon : this.editIcon) +
                      ') no-repeat',
                  },
                  on: {
                    click: event => {
                      event.stopPropagation()
                      if (this.selectMode) {
                        return
                      }
                      this.editOne(params.row)
                    },
                  },
                }),
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '12px',
                    height: '13px',
                    background:
                      'url(' +
                      (this.selectMode ? this.delBanIcon : this.delIcon) +
                      ') no-repeat',
                  },
                  on: {
                    click: event => {
                      event.stopPropagation()
                      if (this.selectMode) {
                        return
                      }
                      this.delOne(params.row)
                    },
                  },
                }),
              ],
            )
          },
        },
      ],
      addModal: false,
      editModal: false,
      delSomeModal: false,
      delOneModal: false,
      delCounts: 0,
      selection: [],
      curRow: undefined,
      formData: {
        item_type_id: '',
        sex: '',
        name: '',
        summary_type: '',
        report_name: '',
        charge_category_id: '',
        abn_summary_mode: '',
        price: '',
        guide_name: '',
        exam_time: '',
        guide_content: '',
        default_summary: '',
        remark: '',
        sort: '',
        is_has_img: '0',
        is_before_eat: '0',
        is_sample_code: '0',
        status: '0',
        expression_status: '0',
        expression_type: 1,
        expression_content: '',
      },
      edit_items: [],
      edit_surCharges: [],
      edit_excludes: [],
    }
  },
  computed: {
    ...mapState('multiExamModule', [
      'proTypes',
      'allPros',
      'total',
      'pros',
      'proInfo',
      'proTypesUsefor',
      'chargeTypes',
      'items',
      'surcharges',
    ]),
    ...mapState(['windowHeight']),
    curProInfo() {
      let obj = JSON.parse(JSON.stringify(this.proInfo))
      obj.item_type = this.proInfo.item_type ? this.proInfo.item_type.name : ''
      return obj
    },
    pageInfo() {
      return this.pros.meta
    },
  },
  methods: {
    ...mapMutations('multiExamModule', {
      setAllPro: types.SET_ALL_PRO,
      setTotal: types.SET_TOTAL,
      reset: types.RESET,
    }),
    ...mapActions('multiExamModule', [
      'getProTypes',
      'getPros',
      'getProInfo',
      'getProTypesUsefor',
      'getChargeTypes',
      'getItems',
      'getSurcharges',
      'getAllPros',
      'addPro',
      'getTotal',
      'editPeGroupItem',
      'delPro',
    ]),
    initTreeData() {
      this.treeData = [
        {
          title: '所有类别',
          level: 1,
          selected: false,
          expand: true,
          children: [],
        },
      ]
      function handleNode(node, level) {
        let obj = {}
        obj.id = node.id
        obj.expand = false
        obj.selected = false
        obj.title = node.name
        obj.children = []
        obj.level = level
        if (Array.isArray(node.group_items) && node.group_items.length > 0) {
          node.group_items.forEach(item => {
            let childNode = handleNode(item, level + 1)
            obj.children.push(childNode)
          })
        }
        return obj
      }
      this.proTypes.forEach(item => {
        let node = handleNode(item, 2)
        this.treeData[0].children.push(node)
      })
    },
    async treeSelectChange(data) {
      let node = data[0]
      switch (node.level) {
      case 1: {
        this.params.filters = ''
        this.tableTitle = '组合项目列表'
        this.showTable = true
        this.curPro = undefined
        this.curType = undefined
        break
      }
      case 2: {
        this.tableTitle = node.title
        this.params.filters = `item_type_id:${node.id}`
        this.showTable = true
        this.curPro = undefined
        this.curType = node
        break
      }
      default:
        console.error("filed 'level' not found")
        break
      }
    },
    async editOne(data, index) {
      await Promise.all([
        this.getProTypesUsefor({
          filters: 'status:1',
        }),
        this.getProInfo(data.id),
        this.getChargeTypes(),
        this.getItems(),
        this.getSurcharges(),
        this.getAllPros({
          with: 'itemType:name',
          per_page: 100000,
          filters: 'status:1',
        }),
      ])
      this.curRow = data
      this.formData = {
        item_type_id: data.item_type_id,
        sex: data.sex,
        name: data.name,
        summary_type: data.summary_type,
        report_name: data.report_name,
        charge_category_id: data.charge_category_id,
        abn_summary_mode: data.abn_summary_mode,
        price: data.price,
        guide_name: data.guide_name,
        exam_time: data.exam_time,
        guide_content: data.guide_content,
        default_summary: data.default_summary,
        remark: data.remark,
        sort: data.sort,
        is_has_img: data.is_has_img + '',
        is_before_eat: data.is_before_eat + '',
        is_sample_code: data.is_sample_code + '',
        status: data.status + '',
        expression_status: data.expression_status + '' === '1' ? '1' : '0',
        expression_type: data.expression_type || 1,
        expression_content: data.expression_content,
      }
      this.edit_items = this.proInfo.items
      this.edit_surCharges = this.proInfo.surcharges
      this.edit_excludes = this.proInfo.excludes
      this.editModal = true
    },
    selectChange(selection) {
      this.selection = selection
    },
    deleteAllSelect() {
      this.delSomeModal = true
      this.delCounts = this.selection.length
    },
    delOne(data, index) {
      this.curRow = data
      this.delOneModal = true
    },
    print() {
      // console.log('打印')
    },
    exportBtn() {
      let _this = this
      exportXlsx('组合项目', {
        api: api.multiExam.getPros,
        params: this.exportParams.reqParams,
        columns: this.exportParams.columns,
        callback(result) {
          if (result) {
            _this.$Message.success('导出成功')
          } else {
            _this.$Message.error('导出失败')
          }
        },
      })
    },
    getSort(value) {
      this.formCustomAdd.sort = value
    },
    afterRequest() {
      // this.selection = []
    },
    async submitDelSome() {
      this.delSomeModal = false
      let arr = []
      this.selection.forEach(element => {
        arr.push(element.id)
      })
      await this.delPro({ ids: arr })
      this.refreshAfterDel(this.selection.length)
    },
    async submitDelOne() {
      this.delOneModal = false
      await this.delPro({ ids: this.curRow.id })
      this.refreshAfterDel(1)
      if (this.curPro) {
        this.showTable = true
      }
    },
    async add() {
      await Promise.all([
        this.getProTypesUsefor({
          filters: 'status:1',
        }),
        this.getChargeTypes(),
        this.getItems(),
        this.getSurcharges(),
        this.getAllPros({
          with: 'itemType:name',
          per_page: 100000,
          filters: 'status:1',
        }),
      ])
      this.addModal = true
    },
    async submitAdd(data) {
      await this.addPro(data)
      this.$refs.table.request()
      this.addModal = false
      this.setTotal(this.total + 1)
    },
    async submitEdit(data) {
      await this.editPeGroupItem({ id: this.curRow.id, data: data })
      this.$refs.table.request()
      this.editModal = false
      if (this.curPro) {
        this.getProInfo(this.curPro.id)
      }
    },
    refreshAfterDel(delNum) {
      this.$refs.table.allSelection = []
      this.selection = []
      this.setTotal(this.total - delNum)
      if (
        this.pageInfo.total <=
          (this.pageInfo.page - 1) * this.pageInfo.page_size + delNum &&
        this.pageInfo.page !== 1
      ) {
        this.$refs.table.request({ page: this.pageInfo.page - 1 })
      } else {
        this.$refs.table.request()
      }
    },
    search(data) {
      this.params.search = data
    },
    getRequestParams(params) {
      this.exportParams.reqParams = params
    },
    async preview(data) {
      await this.getProInfo(data.id)
      this.curPro = data
      this.showTable = false
    },
  },
  async created() {
    await Promise.all([
      this.getTotal({
        per_page: 100000,
      }),
      this.getProTypes(),
    ])
    this.initTreeData()
  },
  mounted() {
    this.tableHeight = this.$refs.tableWrapper.offsetHeight
  },
  activated() {
    this.tableHeight = this.$refs.tableWrapper.offsetHeight
  },
  destroyed() {
    this.reset()
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.tableWrapper.offsetHeight
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.me-center-wrapper {
  .height30 {
    height: 30px;
  }
  .lineH50 {
    line-height: 50px;
  }
  .lineH30 {
    line-height: 30px;
  }
  .clearfix:after {
    clear: both;
    content: '';
    display: block;
  }
  .multiExam-addModal {
    .ivu-modal {
      height: calc(~'100% - 41px');
    }
    .ivu-modal-content {
      height: 100%;
    }
    .ivu-modal-body {
      height: calc(~'100% - 100px');

      .body {
        height: 100%;
      }
    }
  }
  .inputRequired:after {
    content: '*';
    color: red;
    position: absolute;
    right: 12px;
    top: 7px;
    font-size: 16px;
  }

  .selectionRequired {
    .ivu-select-selection {
      position: relative;
    }
    .ivu-select-selection:after {
      content: '*';
      color: red;
      position: absolute;
      right: 20px;
      top: 2px;
      font-size: 16px;
    }
  }

  .multipleSelectionRequired {
    .ivu-select-selection {
      position: relative;
    }
    .ivu-select-selection:after {
      content: '*';
      color: red;
      position: absolute;
      right: 20px;
      top: 18px;
      font-size: 16px;
    }
  }

  .yuan {
    position: relative;
    &:before {
      content: '元';
      position: absolute;
      right: 10px;
      top: 7px;
      z-index: 1;
      color: #737373;
    }
  }

  .percent {
    position: relative;
    &:before {
      content: '%';
      position: absolute;
      right: 10px;
      top: 7px;
      z-index: 1;
      color: #737373;
    }
  }
  .minute {
    position: relative;
    &:before {
      content: 'mins';
      position: absolute;
      right: 10px;
      top: 7px;
      z-index: 1;
      color: #737373;
    }
    .ivu-input {
      padding-right: 40px;
    }
  }
  .percent.inputRequired:after,
  .yuan.inputRequired:after {
    content: '*';
    color: red;
    position: absolute;
    right: 24px;
    top: 7px;
    font-size: 16px;
  }

  .yuan .ivu-input,
  .percent .ivu-input {
    padding-right: 25px;
  }

  .transferRequest {
    position: relative;

    &:after {
      content: '*';
      color: red;
      position: absolute;
      z-index: 1;
      top: 102px;
      left: 300px;
    }
  }
  .multi-exam {
    .split-pane {
      overflow: hidden;
    }
    .left {
      background: #f2f7ff;
    }
    .right {
      .table-wrapper {
        height: calc(~'100% - 50px');
      }
      .info-head {
        height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid @gradeAshFive;

        .title {
          font-size: 16px;
          font-weight: bold;
          color: @gradeAshTwo;
        }
        .icon {
          width: 16px;
          height: 16px;
          margin: 18px 2px 0 15px;
        }
      }
      .info-body {
        padding: 20px 20px 0 20px;
        height: calc(~'100% - 50px');
        overflow: auto;
        .width765 {
          width: 765px;
        }
        .row {
          margin-bottom: 20px;
        }
        .small-title {
          display: block;
          font-size: 14px;
          font-weight: bold;
          line-height: 14px;
          color: @gradeAshTwo;
        }
        .text-block-wrapper {
          width: calc(~'100% + 20px');
        }
        .text-block {
          margin-right: 20px;
          margin-bottom: 20px;
          padding: 7px 12px;
          background: @gradeBlueFive;
          border: 1px solid #cccccc;
        }
        .summary-charge {
          tr {
            height: 40px;
          }
          .cell {
            text-align: center;
          }
          thead tr {
            background: rgb(215, 233, 255);
          }
          tbody tr:nth-child(even) {
            background: @tableTr;
          }
          table {
            border: 1px solid #cccccc;
            border-radius: 4px;
          }
          td,
          th {
            border-right: 1px solid #cccccc;
          }
          tr td:nth-last-child(1),
          tr th:nth-last-child(1) {
            border-right: none;
          }
        }
      }
    }
  }
}
</style>
