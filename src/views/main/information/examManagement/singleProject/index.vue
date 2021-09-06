/*
*单个项目管理
*@author 覃凤
*@date 2018/01/25*/
<template>
  <div class="single-project-out out-content-bg">
    <div class="single-project">
      <div class="single-project-content contentBg">
        <split-pane class="project-content-con" :min='22' :max='28' direction="horizontal" v-model="leftDragWidth">
          <!-- 页面左侧 -->
           <div slot="left" class="single-project-contentL fl">
              <search-tree :skipName='skipName' @local-search-key="localSearchKey" :chouseData='jumpChouseData' :data='leftTree.data' @on-select-change='treeSelectChange'></search-tree>
          </div>
          <!-- 页面右侧 -->
          <div slot='right' class="single-project-contentR fl">
            <div class="contentR-lev3" v-if='leftTree.ifLev3'>
              <right-lev3-number 
                :data='singleRightDataToChild' 
                :showLev3Number="leftTree.tableType"
                @init-req-only-resule='initReqOnlyResult'
                @edit-single-pro='editSingleProDes'
                @del-single-pro='delSinglePro'
                @add-describ='discribTabAdd'
                @edit-number='editDiscribRow'
                @del-number='delDiscribRow'>
              </right-lev3-number>
              <right-lev3-describe 
                :showLev3Number="!leftTree.tableType"
                :data='singleRightDataToChildDes' 
                @init-req-only-resule='initReqOnlyResult'
                @edit-single-pro-des='editSingleProDes'
                @del-single-pro='delSinglePro'
                @add-describ='discribTabAdd'
                @edit-describ='editDiscribRow'
                @del-describ='delDiscribRow'>
              </right-lev3-describe>
            </div>

            <!-- 左侧点击的不是第三级菜单 -->
            <div class="contentR-levall" v-if='!leftTree.ifLev3'>
              <div class="right-title">
                <ul class="fl">
                  <template v-for="(item,index) in list">
                    <li class="curPointer" :class="{active:item.ifActive}" @click='changeTab(index)' :key="index">
                      <span>{{ item.title }}</span>
                    </li>
                  </template>
                </ul>
                <div class="fr paddingR20">
                  <div class="fl single-project-search marginT10">
                    <search-input searText="请输入搜索内容" :searchWidth='220' @on-enter='enterSearch' @on-Icon='enterSearch' @on-cancel='enterSearch'></search-input>
                  </div>
                  <div class="fl marginT10" v-show='!tableRight.ifChouse'>
                    <Button type="ghost" class="fl marginR10" @click="addRightTableList">新 增</Button>
                    <Button type="ghost" class="fl" @click="btnChouse">选 择</Button>
                  </div>
                  <div class="fl marginT10" v-show='tableRight.ifChouse'>
                     <Button type="success" :disabled='ifDelBtnDisabled' class="fl marginR10" @click="deleteBtnLev2">删 除</Button>
                     <Button type="ghost" class="fl marginR10">导 出</Button>
                     <Button type="ghost" class="fl" @click="chouseCancel">取 消</Button>
                  </div>
                </div>
              </div>
              <!-- 二级对应表格 -->
              <div class="right-content" ref='singleContentTable'>
                <q-table
                  v-if='!ifShowTableRight'
                  ref='qtableNumber'
                  :width='1680'
                  :key="'level2-table-number'"
                  :selectMode='tableRight.isSelectMode'
                  :columns="tableRight.rightColumnsNumber"
                  :data="singleRightList"
                  :pageInfo="pageInfo"
                  :height="tableRight.tableHeight"
                  :params="params"
                  :accordion="true"
                  :requestDataApi="getRightList"
                  :fixedRightWidth="90"
                  :showOperateColumn="false"
                  @on-expand='onExpand'
                  @all-selection='singleTabRowClick'
                  @delete-row='deleteSingleRow'
                  @edit-row='editSingleRow'
                  @delete='deleteRow'
                  @edit='editSingleProjectFun'>
                </q-table>
                <q-table
                  ref='qtable'
                  :width='1200'
                  :key="'level2-table'"
                  v-if='ifShowTableRight'
                  :selectMode='tableRight.isSelectMode'
                  :columns="tableRight.rightColumns"
                  :data="singleRightList"
                  :pageInfo="pageInfo"
                  :height="tableRight.tableHeight"
                  :params="params"
                  :accordion="true"
                  :requestDataApi="getRightList"
                  :fixedRightWidth="90"
                  :showOperateColumn="false"
                  @on-expand='onExpand'
                  @all-selection='singleTabRowClick'
                  @delete-row='deleteSingleRow'
                  @edit-row='editSingleRow'
                  @delete='deleteRow'
                  @edit='editSingleProjectFun'>
                </q-table>
                
              </div>
            </div>
          </div>
        </split-pane>
      </div>

      <!-- 新增单个项目 -->
      <add-single-pro-modal 
        :ifShowModal='singleRroShowAddModal'
        :data='addSingleModalData'
        :selectData='requestOptionData.xmlb'
        @single-modal-save='addBcSinglePro'
        @single-modal-cancel='addQxSinglePro'>
      </add-single-pro-modal>

      <!-- 编辑单个项目 -->
      <edit-single-pro-modal 
        :ifShowModal='singleRroShowEditModal'
        :data='singleRroEditModalData'
        :selectData='requestOptionData.xmlb'
        @single-modal-save='editBcSinglPro'
        @single-modal-cancel='editQxSinglePro'>
      </edit-single-pro-modal>
      <!-- 删除单个项目-->
      <affirm-del-modal :controlModal='delModalShow' :delCounts='delCounts' @delCancel='delCancel' @affirmDel='affirmDel'></affirm-del-modal>
      <!-- 删除三级菜单对应的单个项目 -->
      <affirm-del-modal :controlModal='delModalShowLev3' :delCounts='delCountsLev3' @delCancel='delCancelLev3' @affirmDel='affirmDelLev3'></affirm-del-modal>

      <!-- 编辑单个项目（三级菜单页面中） -->
       <edit-single-pro-modal 
        :ifShowModal='singleRroShowEditModalLev3'
        :data='singleRroEditModalData'
        :selectData='requestOptionData.xmlb'
        @single-modal-save='editBcSinglProLev3'
        @single-modal-cancel='editQxSingleProLev3'>
      </edit-single-pro-modal>
      <!-- 新增单项结果（描述型） -->
      <newSingleResult
        :modaAddSingle='singleDisShowAddModal'
        :newTotalSort='newDiscribSort'
        :chooseType='requestOptionData.tjlb'
        @add-single-bc='addDiscribBc'
        @add-single-qx='addDiscribQx'>
      </newSingleResult>

      <!-- 编辑单项结果（描述型） -->
      <editSingleResult
        :modaAddSingle='singleDisShowEditModal'
        :editSingle='discribTab.editDiscribModalData'
        :chooseType='requestOptionData.tjlb'
        @add-single-bc='editDiscribBc'
        @add-single-qx='editDiscribQx'>
      </editSingleResult>

      <!-- 删除单项结果（描述型）-->
      <affirm-del-modal
        :controlModal='singleDisDelModalDiscrib.delModalShow'
        :delCounts='singleDisDelModalDiscrib.delCounts'
        @delCancel='singleDisDelCancelDiscrib'
        @affirmDel='singleDisAffirmDelDiscrib'>
      </affirm-del-modal>
    </div>
  </div>
</template>
<script>
  import * as _ from 'lodash'
  // import axios from '@/service/interceptor'
  import * as types from '@/store/modules/information/examManagement/singleProject/singleProjectTypes'

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

  // import searchTree from '@/components/searchTree' // 左侧树形菜单
  import describeType from './components/describeType' // 表格下拉加载组件（描述型）
  import rightLev3Describe from './components/rightLev3Describe' // 三级详情页面-描述型
  import rightLev3Number from './components/rightLev3Number' // 三级详情页面-数值型
  import newSingleResult from './components/newSingleResult' // 新增单项结果（描述型）
  import editSingleResult from './components/editSingleResult' // 编辑单项结果（描述型）
  import addSingleProModal from './components/addSingleProModal' // 新建单个项目
  import editSingleProModal from './components/editSingleProModal' // 编辑单个项目

  export default {
    name: 'singleProject',
    components: {
      // searchTree,
      describeType,
      rightLev3Describe,
      rightLev3Number,
      newSingleResult,
      editSingleResult,
      addSingleProModal,
      editSingleProModal,
    },
    data () {
      let that = this
      return {
        ifShowTableRight: true,
        skipName: 'projectCategory', // 跳转地址
        leftDragWidth: 22,
        urlRemark: '/static/icons/public/remarkInCell.svg', // 备注
        statusIcon: '/static/icons/public/enabledState.svg',
        editIcon: '/static/icons/public/table-hover-edit.svg', // 编辑
        delIcon: '/static/icons/public/table-hover-del.svg', // 删除
        editBanIcon: '/static/icons/public/table-edit.svg', // 编辑
        delBanIcon: '/static/icons/public/table-del.svg', // 删除
        viewBanIcon: '/static/icons/public/table-preview.svg', // 查看
        viewIcon: '/static/icons/public/table-hover-preview.svg', // 查看
        searchKey: '',
        totalSort: -1, // 新增显示条数
        resTypeDis: 1, // 描述型
        resTypeNum: 2, // 数值型
        list: [
          {
            title: '全部',
            ifActive: true,
          }, {
            title: '描述型',
            ifActive: false,
          }, {
            title: '数值型',
            ifActive: false,
          },
        ],
        singleRightDataToChild: {}, // 传入三级详情-数值型
        singleRightDataToChildDes: {}, // 传入三级详情-描述型
        /* ====================================================================二级对应表格 */
        tableRight: { // 二级菜单对应表格
          ifChouse: false, // 选择按钮点击切换
          isSelectMode: false,
          res_type: '',
          rightColumns: [
            {
              type: 'expand',
              width: 30,
              ellipsis: true,
              render: (h, params) => {
                let toChild = that.le2SelectLev3Data
                return h(describeType, {
                  on: {
                    'button-skip': function() {
                        // 点击右侧的按钮，对应跳转显示
                      // that.jumpToLev3(params.row)
                      that.preview(params.row)
                    },
                  },
                  props: {
                    row: toChild, // 传入子组件列表的数据
                    mainId: {
                      default_res_id: params.row.default_res_id, // 列表数据初始选中对应的id
                      rowId: params.row.id, // 三级菜单行对应的id
                    },
                  },
                  style: {
                    class: 'ivu-table-row',
                  },
                })
              },
            },
            {
              title: '项目类别',
              key: 'parName',
              width: 100,
              ellipsis: true,
            },
            {
              title: '单项名称',
              key: 'name',
              width: 230,
              ellipsis: true,
            },
            {
              title: '单项编号',
              key: 'code',
              width: 70,
              ellipsis: true,
            },
            {
              title: '英文简称',
              key: 'en_abbr',
              width: 70,
              ellipsis: true,
            },
            {
              title: '适用性别',
              key: 'sex',
              width: 70,
              filterType: 'type',
              filterOptions: [
                {
                  label: '通用',
                  value: 0,
                }, {
                  label: '男',
                  value: 1,
                }, {
                  label: '女',
                  value: 2,
                },
              ],
              ellipsis: true,
              render: (h, params) => {
                if (params.row.sex === 0) {
                  return h('div', '通用')
                } else if (params.row.sex === 1) {
                  return h('div', '男')
                } else {
                  return h('div', '女')
                }
              },
            },
            {
              title: '结果类型',
              key: 'res_type',
              ellipsis: true,
              width: 90,
              filterType: 'type',
              filterOptions: [
                {
                  label: '数值型',
                  value: 2,
                }, {
                  label: '描述型',
                  value: 1,
                },
              ],
              render: (h, params) => {
                if (params.row.res_type === this.resTypeNum) {
                  return h('div', '数值型')
                } else if (params.row.res_type === this.resTypeDis) {
                  return h('div', '描述型')
                } else {
                  return h('div', '表达式型')
                }
              },
            },
            {
              title: '报告显示名称',
              key: 'report_name',
              ellipsis: true,
              width: 100,
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
              width: 60,
              ellipsis: true,
              filterType: 'type',
              filterOptions: [
                {
                  label: '启用',
                  value: 1,
                }, {
                  label: '未启用',
                  value: 0,
                },
              ],
              render: (h, params) => {
                if (params.row.status === 1) {
                  return h('status-in-table')
                }
              },
            },
            {
              title: '显示顺序',
              key: 'sort',
              width: 70,
              ellipsis: true,
            },
            {
              title: '最后修改人',
              key: 'operater',
              width: 90,
              ellipsis: true,
            },
            {
              title: '最后修改时间',
              key: 'updatedAt',
              width: 123,
              filterType: 'time',
              ellipsis: true,
            },
            {
              title: '操作',
              width: 90,
              canSort: false,
              fixed: 'right',
              render: (h, params) => {
                return h('div',
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
                        background: 'url(' + (this.tableRight.isSelectMode ? this.viewBanIcon : this.viewIcon) + ') no-repeat',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          if (this.tableRight.isSelectMode) {
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
                        background: 'url(' + (this.tableRight.isSelectMode ? this.editBanIcon : this.editIcon) + ') no-repeat',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          if (this.tableRight.isSelectMode) {
                            return
                          }
                          this.editSingleProjectFun(params.row, params.index)
                        },
                      },
                    }),
                    h('span', {
                      style: {
                        display: 'inline-block',
                        width: '12px',
                        height: '13px',
                        background: 'url(' + (this.tableRight.isSelectMode ? this.delBanIcon : this.delIcon) + ') no-repeat',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          if (this.selectMode) {
                            return
                          }
                          this.deleteRow(params.row)
                        },
                      },
                    }),
                  ])
              },
            },
          ],
          rightColumnsNumber: [
            {
              type: 'expand',
              width: 30,
              ellipsis: true,
              render: (h, params) => {
                // console.log(that.le2SelectLev3Data)
                return h(describeType, {
                  on: {
                    'button-skip': function() {
                        // 点击右侧的按钮，对应跳转显示
                      // that.jumpToLev3(params.row)
                      that.preview(params.row)
                    },
                  },
                  props: {
                    row: that.le2SelectLev3Data, // 传入子组件列表的数据
                    mainId: {
                      default_res_id: params.row.default_res_id, // 列表数据初始选中对应的id
                      rowId: params.row.id, // 三级菜单行对应的id
                    },
                  },
                  style: {
                    class: 'ivu-table-row',
                  },
                })
              },
            },
            {
              title: '项目类别',
              key: 'parName',
              width: 100,
              ellipsis: true,
            },
            {
              title: '单项名称',
              key: 'name',
              width: 200,
              ellipsis: true,
            },
            {
              title: '单项编号',
              key: 'code',
              width: 70,
              ellipsis: true,
            },
            {
              title: '英文简称',
              key: 'en_abbr',
              width: 70,
              ellipsis: true,
            },
            {
              title: '适用性别',
              key: 'sex',
              width: 70,
              filterType: 'type',
              filterOptions: [
                {
                  label: '通用',
                  value: 0,
                }, {
                  label: '男',
                  value: 1,
                }, {
                  label: '女',
                  value: 2,
                },
              ],
              ellipsis: true,
              render: (h, params) => {
                if (params.row.sex === 0) {
                  return h('div', '通用')
                } else if (params.row.sex === 1) {
                  return h('div', '男')
                } else {
                  return h('div', '女')
                }
              },
            },
            {
              title: '结果类型',
              key: 'res_type',
              ellipsis: true,
              width: 90,
              // filterType: 'type',
              // filterOptions: [
              //   {
              //     label: '数值型',
              //     value: 2,
              //   }, {
              //     label: '描述型',
              //     value: 1,
              //   },
              // ],
              render: (h, params) => {
                if (params.row.res_type === this.resTypeNum) {
                  return h('div', '数值型')
                } else if (params.row.res_type === this.resTypeDis) {
                  return h('div', '描述型')
                }
              },
            },
            {
              title: '报告显示名称',
              key: 'report_name',
              ellipsis: true,
              width: 100,
            },
            {
              title: '参考下限(男)',
              key: 'low_limit_man',
              ellipsis: true,
              // width: 90,
            },
            {
              title: '参考上限(男)',
              key: 'upper_limit_man',
              ellipsis: true,
              // width: 90,
            },
            {
              title: '参考下限(女)',
              key: 'low_limit_woman',
              ellipsis: true,
              // width: 90,
            },
            {
              title: '参考上限(女)',
              key: 'upper_limit_woman',
              ellipsis: true,
              // width: 90,
            },
            {
              title: '检查所见最大值',
              key: 'max_val',
              ellipsis: true,
              width: 100,
            },
            {
              title: '检查所见最小值',
              key: 'min_val',
              ellipsis: true,
              width: 100,
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
              width: 60,
              filterType: 'type',
              filterOptions: [
                {
                  label: '启用',
                  value: 1,
                }, {
                  label: '未启用',
                  value: 0,
                },
              ],
              ellipsis: true,
              render: (h, params) => {
                if (params.row.status === 1) {
                  return h('status-in-table')
                }
              },
            },
            {
              title: '显示顺序',
              key: 'sort',
              // width: 70,
              ellipsis: true,
            },
            {
              title: '最后修改人',
              key: 'operater',
              // width: 90,
              ellipsis: true,
            },
            {
              title: '最后修改时间',
              key: 'updatedAt',
              width: 123,
              filterType: 'time',
              ellipsis: true,
            },
            {
              title: '操作',
              width: 90,
              canSort: false,
              fixed: 'right',
              render: (h, params) => {
                return h('div',
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
                        background: 'url(' + (this.selectMode ? this.viewBanIcon : this.viewIcon) + ') no-repeat',
                      },
                      on: {
                        click: (event) => {
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
                        background: 'url(' + (this.selectMode ? this.editBanIcon : this.editIcon) + ') no-repeat',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          if (this.selectMode) {
                            return
                          }
                          this.editSingleProjectFun(params.row, params.index)
                        },
                      },
                    }),
                    h('span', {
                      style: {
                        display: 'inline-block',
                        width: '12px',
                        height: '13px',
                        background: 'url(' + (this.selectMode ? this.delBanIcon : this.delIcon) + ') no-repeat',
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          if (this.selectMode) {
                            return
                          }
                          this.deleteRow(params.row)
                        },
                      },
                    }),
                  ])
              },
            },
          ],
          columns: [],
          tableHeight: 400,
        },
        le2SelectLev3Data: [], // 二级菜单页面对应的下拉数据
        ifDelBtnDisabled: true, // 是否禁用删除按钮
        delIds: [], // 需删除数据
        delModalShow: false, // 删除确认框是否出现
        delCounts: 0, // 删除条数
        /* ====================================================================新增 */
        /* =====================单个项目 */
        addSingleModalData: { // 新增单个项目传入弹窗数据
          showSort: null, // 新增显示顺序
          type_id: '', // 项目类别对应id
        },
        singleRroShowAddModal: false, // 单个新增弹窗
        singleRroShowEditModalLev3: false, // 单个编辑弹窗（三级菜单对应）
        singleRroShowEditModalLev3Des: false,
        /* =====================单项结果（描述型） */
        singleDisShowAddModal: false, // 描述新增弹窗显示
        singleDisDelModalDiscrib: { // 项目结果删除
          ifDelBtnDisabled: true, // 是否禁用删除按钮
          delIds: [], // 需删除数据
          delModalShow: false, // 删除确认框是否出现
          delCounts: 0, // 删除条数
        },
        delModalShowLev3: false, // 三级页面对应删除弹窗
        /* ====================================================================编辑 */
        /* =====================单个项目 */
        singleRroShowEditModal: false, // 单个编辑弹窗
        singleRroEditModalData: {}, // 单个编辑弹窗传入子组件数据
        /* =====================单项结果（描述型） */
        singleDisShowEditModal: false, // 描述编辑弹窗显示
        /* ====================================================================删除 */
        /* =====================单个项目 */
        delLev3Single: {}, // 右侧三级菜单对应的单个项目删除
        delCountsLev3: 0, // 三级详情删除单个项目数量
        // delModalShowLev3: false, // 三级页面对应删除弹窗
        /* =====================单项结果（描述型） */
        /* ====================================================================左侧显示树状数据 */
        leftTree: {
          tableType: true, // 点击左侧树状三级子菜单显示表格,true显示的数值型表格
          ifLev3: false, // 右侧是否显示左侧点击的三级菜单
          localSearchShow: false,
          data: [],
          lev3Id: '', // 点击选中第三级的id
          lev2Id: '', // 点击选中第二级的id
        },
        /*  ================================================================右侧表格（不是选中第三级菜单） */
        status: '', // 默认数据状态有效
        type_id: '', // 左筛右参数
        /* ================================================================右侧表格（选中第三级菜单）-描述型 */
        discribTab: {
          sort: 0, // 显示顺序
          editDiscribModalData: {},
        },
        // /*  ================================================================弹窗 */
        /* ==================================共用 */
        requestOptionData: { // 请求弹窗下拉数据
          tjlb: [], // 体检类别
          xmlb: [], // 弹窗项目类别
        },
        selfType: -1, // 左侧树形选中的级数
        level2: -1, //
        level3: -1,
        jumpChouseData: {
          level: null,
          id: null,
        },
      }
    },
    computed: {
      newDiscribSort () { // 描述型显示顺序
        // console.log(this.discribTab.sort)
        return this.discribTab.sort + 1
      },
      ...mapGetters('singleProjectModule', [
        'singleRightList',
        'getTotalMeta',
        'pageInfo',
        'singleLeftList',
        'allLeftData',
        'singleLeftLev3',
        'singleRightData',
        'singleRightDataDes',
        'singleXmlb', // 项目类别
        'singleTjlb', // 体检类别
        'getOnExpandData', // 表格请求下拉
      ]),
      ...mapState(['windowHeight']),
      /* =============================================================右侧表格请求参数 */
      params() {
        let search = ''
        let typeId = ''
        let resType = ''
        if (this.type_id !== '') {
          typeId = `type_id:${this.type_id}`
        } else {
          typeId = ''
        }
        if (this.searchKey !== '') {
          search = this.searchKey
        }
        if (this.tableRight.res_type !== '') {
          if (this.tableRight.res_type !== 0) {
            resType = `res_type:${this.tableRight.res_type}`
          } else {
            resType = ''
          }
        } else {
          resType = ''
        }
        let a = {
          search: search,
          filters: `${typeId};${resType}`,
        }
        return a
      },
    },
    methods: {
      ...mapMutations('singleProjectModule', {
        reset: types.RESET,
      }),
      ...mapActions('singleProjectModule', [
        'getRightList', // 右侧
        // 'getRightAll', // 获取所有右侧数据
        // 'getLeftAll', // 左侧所有数据
        'getRightSingle', // 左侧三级菜单选择右侧对应数据
        'getRightSingleDes', // 左侧三级菜单选择右侧对应数据(描述)
        'getSingleResultAdd', // 新增单项结果
        'getSingleResultEdit', // 编辑单项结果
        'getSingleResultDel', // 删除单项结果
        'getSingleAdd', // 新增单个项目
        'getSingleDelete', // 删除单个项目
        'getSingleEdit', // 编辑单个项目
        'getSingleItemType', // 请求项目类别
        'getSinglePeCategories', // 请求体检类别
        // 'getSingleDisAllReq', // 同时请求体检类别，项目类别
        'initReq', // 同时请求左侧所有和右侧所有数据
        'getOnExpand', // 请求表格展开数据
        'reqLev3Single', // 删除三级对应的单个项目重新请求
        'getRadioChange', // 单独修改默认结果
      ]),
      /* ======================================================================搜索 */
      async enterSearch (data) { // 触发搜索
        this.searchKey = data
      },
      localSearchKey (data) { // 本地搜索返回数据
        if (data === '') { // 点击取消，重新请求右侧数据
          this.type_id = ''
          this.res_type = ''
          this.type_id = this.leftTree.lev2Id
        }
      },
      async changeTab (index) { // 切换页面中tab
        this.list.forEach((data, i) => {
          this.list[i].ifActive = false
        })
        // 请求对应的描述型，数值型数据
        this.tableRight.res_type = index
        this.list[index].ifActive = true
      },
      /* ================================================================================左侧树形操作 */
      async preview(data) {
        this.leftTree.ifLev3 = true
        this.leftTree.lev3Id = data.id
        await this.getReqLev3Right(this.leftTree.lev3Id)
        this.initLev3Table() // 处理三级对应右侧数据
      },
      async treeSelectChange (data) { // 左侧树形点击
        if (data[0]) {
          this.selfType = data[0].level
          if (this.selfType === 2) {
            if (this.$refs.qtable) {
              this.$refs.qtable.current_page = 1
            }
            // 上部处于取消状态
            this.tableRight.ifChouse = false
            this.tableRight.isSelectMode = false
            this.ifDelBtnDisabled = true
            this.delIds = []
            this.leftTree.ifLev3 = false
              // 将二级对应id传入弹窗中
              // 请求三级子菜单数据
               // 左侧筛选右侧数据，点击对应的id
            this.leftTree.lev2Id = data[0].id
            this.type_id = data[0].id
          } else if (this.selfType === 1) {
            this.leftTree.ifLev3 = false
            this.type_id = ''
          }
        }
      },
      async getReqLev3Right (data) {
        await this.getRightSingle(data) // 请求三级菜单对应右侧数据
      },
      initLev3Table () { // 三级菜单对应显示
        if (this.singleRightData.res_type === this.resTypeNum) { // 数值型
          this.leftTree.tableType = true
          this.singleRightDataToChild = _.clone(this.singleRightData)
          this.singleRightDataToChild.pe_res_items = _.clone(this.singleRightDataDes)
        } else if (this.singleRightData.res_type === this.resTypeDis) { // 描述型
          this.singleRightDataToChildDes = _.clone(this.singleRightData)
          this.leftTree.tableType = false
        }
        if (this.singleRightData.pe_res_items && this.singleRightData.pe_res_items.length > 0) {
          this.discribTab.sort = this.singleRightData.pe_res_items.length
        } else {
          // console.log(2222)
          this.discribTab.sort = 0
        }
        // console.log(this.discribTab.sort)
      },

      async jumpToLev2 (data) {
        this.jumpChouseData = {
          level: 2,
          id: data,
        }
        let leftData = this.allLeftData[0].children
        for (let i = 0; i < leftData.length; i++) {
          if (leftData[i].children) {
            if (data === leftData[i].id) {
              // leftData[i].expand = true // 对应二级菜单展开
              leftData[i].selected = true // 对应二级菜单选中
              this.allLeftData[0].selected = false // 一级菜单不选中
              this.level2 = i
              this.leftTree.lev2Id = data
            }
          }
        }
      },
      /* =============================================================================表格中间展开 */
      async onExpand (data, statu) {
        if (statu) {
          await this.getOnExpandFun(data.id, data.res_type)
        }
      },
      async getOnExpandFun (itemId, type) {
        await this.getOnExpand(itemId)
        this.le2SelectLev3Data = this.getOnExpandData
      },
  
      /* =============================================================================二级菜单请求 */
      async lev2AddFun (data) { // 新增单个项目
        await this.getSingleAdd(data) // 这里的data是弹窗返回的数据
      },
      async lev2EditFun (id, data) { // 编辑单个项目
        await this.getSingleEdit({
          id: id,
          data: data,
        })
      },
      async lev2DelFun (ids) { // 删除单个项目
        await this.getSingleDelete(ids) // ids是数组
      },
      async rightChangeReqLeft () { // 左侧改变重新请求右侧数据
        await this.reqLev3Single() // 重新请求左侧数据
        this.leftTree.data = _.clone(this.allLeftData)
      },
      // async initGetReqDiscrip () { // 适用体检类别，项目类别一起请求
      //   await this.getSingleDisAllReq()
      //   this.requestOptionData.tjlb = _.clone(this.singleTjlb) // 体检类别
      //   this.requestOptionData.xmlb = _.clone(this.singleXmlb) // 项目类别
      // },
      async reqXmlb () { // 请求项目类别
        await this.getSingleItemType()
        this.requestOptionData.xmlb = _.clone(this.singleXmlb) // 项目类别
      },
      async reqTjlb () { // 请求体检类别
        await this.getSinglePeCategories()
        this.requestOptionData.tjlb = _.clone(this.singleTjlb) // 体检类别
      },
  
      /* ==================================================================================二级菜单操作 */
      chouseCancel () { // 点击头部取消按钮
        this.tableRight.ifChouse = false
        this.tableRight.isSelectMode = false
        this.ifDelBtnDisabled = true
        this.delIds = []
        // this.$refs.qtable.$refs.table.selectAll(false) // 取消表格选中
      },
      // afterReq () { // 表格数据变化后回调
      //   // this.ifDelBtnDisabled = true
      //   // this.delIds = []
      //   this.$nextTick(() => {
      //     console.log(2222)
      //     // this.$refs.qtable.$refs.table.handleContainerResize()
      //   })
      // },
      // pageSizeChange (page) { // 表格页码条数改变
      //   this.ifDelBtnDisabled = true
      //   this.delIds = []
      //   this.delCounts = 0
      // },
      // onChange (page) { // 表格页码改变
      //   this.ifDelBtnDisabled = true
      //   this.delIds = []
      //   this.delCounts = 0
      //   console.log(page)
      //   // this.singleTabRowClick()
      // },
      singleTabRowClick (data, row, index, column) { // 表格选中数据
        if (data.length === 0) {
          this.ifDelBtnDisabled = true
        } else {
          this.ifDelBtnDisabled = false
        }
        this.delCounts = data.length
        if (data.row) {
          this.initDelData(data.row)
        } else {
          this.initDelData(data)
        }
      },
      deleteBtnLev2 () { // 点击删除按钮
        this.delModalShow = true
      },
      initDelData (data) { // 处理需要删除的数据
        this.delIds = []
        if (data) {
          if (data.length > 0) {
            for (let a = 0; a < data.length; a++) {
              this.delIds.push(data[a].id)
            }
          } else {
            this.delIds.push(data.id)
          }
        }
      },
      btnDel() {
        this.delModalShow = true
        this.delCounts = this.delIds.length
      },
      delCancel () { // 取消删除
        this.delModalShow = false
      },
      async affirmDel () { // 确认删除
        await this.deleteTableListFun({'ids': this.delIds})// 发送删除信息到后台
        this.totalSort -= this.delIds.length
        if (this.pageInfo.total <= (this.pageInfo.page - 1) * this.pageInfo.page_size + this.delIds.length && this.pageInfo.page !== 1) {
          if (this.ifShowTableRight) {
            await this.$refs.qtable.request({page: this.pageInfo.page - 1}) // 重新请求页面数据
          } else {
            await this.$refs.qtableNumber.request({page: this.pageInfo.page - 1}) // 重新请求页面数据
          }
        } else {
          if (this.ifShowTableRight) {
            await this.$refs.qtable.request() // 重新请求页面数据
          } else {
            await this.$refs.qtableNumber.request() // 重新请求页面数据
          }
        }
        this.$refs.qtable.allSelection = []
        await this.reqLev3Single() // 重新请求左侧数据
        this.delModalShow = false
      },
      deleteRow (data, event) { // 图标删除
        console.log('二级菜单图标删除')
        this.delCounts = 1
        this.delModalShow = true
        this.initDelData(data)
      },
      deleteSingleRow (data) { // 右键
        console.log('二级菜单右键删除', data)
        this.deleteRow(data)
      },
      async deleteTableListFun (ids) { // 删除数据请求
        await this.getSingleDelete(ids)
        // 成功之后刷新左侧数据
        this.ifDelBtnDisabled = true
        await this.rightChangeReqLeft() // 重新请求左侧
      },
      async addRightTableList () { // 点击新增按钮
        // 请求项目类别，适用体检类别
        // 将左侧选中id传入弹窗
        // 单个项目弹窗出现
        if (this.leftTree.lev2Id === '') {
          this.leftTree.lev2Id = -1
        }
        this.addSingleModalData.type_id = this.leftTree.lev2Id
        // console.log(this.addSingleModalData.type_id)
        await this.reqXmlb() // 请求项目类别
        this.singleRroShowAddModal = true
      },
      async addBcSinglePro (data) { // 新增保存
        await this.lev2AddFun(data)// 传入返回的值
        await this.$refs.qtable.request() // 重新请求右侧分页表格数据
        await this.rightChangeReqLeft() // 重新请求左侧
        // console.log(this.leftTree.lev2Id)
        // this.preview(this.leftTree.lev2Id)
        this.jumpToLev2(this.leftTree.lev2Id) // 处理左侧选中状态
        this.singleRroShowAddModal = false // 如果成功页面隐藏
        this.totalSort += 1
      },
      addQxSinglePro () { // 新增取消
        this.singleRroShowAddModal = false
      },
      btnChouse () { // 点击选择按钮
        this.tableRight.ifChouse = true
        this.tableRight.isSelectMode = true
        this.ifDelBtnDisabled = true
        this.delIds = []
      },
      editSingleRow (data, event, index) { // 右键编辑
        console.log('二级菜单右键编辑')
        // console.log(index)
        this.editSingleProjectFun(data, index)
      },
      async editSingleProjectFun (data, index) { // 图标编辑
      // 编辑弹窗出现，将数据放入
        // 弹窗出现
        await this.reqXmlb() // 请求项目类别
        this.singleRroShowEditModal = true
        this.singleRroEditModalData = _.clone(this.singleRightList[index]) // 传入弹窗数据
      },
      async editBcSinglPro (id, data) { // 修改弹窗保存
        await this.lev2EditFun(id, data) // 编辑请求
        await this.$refs.qtable.request() // 重新请求右侧分页表格数据
        await this.rightChangeReqLeft() // 重新请求左侧
  
        this.singleRroShowEditModal = false
      },
      editQxSinglePro () { // 修改弹窗取消
        this.singleRroShowEditModal = false
      },
      editRow (data, event) { // 右键编辑
        console.log('右键编辑单个项目')
        this.editSingleProjectFun(data)
      },
      /* ============================================================================================三级菜单对应右侧操作 */
      /* ==================================================================================单个项目操作 */
      async delSingleReqLeft(data) { // 三级页面删除的时候左侧菜单及右侧显示变化
      // 重新请求左侧菜单
      // 删除三级菜单对应的二级菜单选中
      // 右侧三级不显示
      // 右侧显示二级菜单对应数据
        this.type_id = data.id
        await this.reqLev3Single() // 重新请求左侧数据
        this.leftTree.ifLev3 = false
        for (let i in this.allLeftData[0].children) {
          if (data.id === this.allLeftData[0].children[i].id) {
            this.allLeftData[0].children[i].selected = true
            this.allLeftData[0].children[i].expand = true
          }
        }
        this.allLeftData[0].selected = false
        this.leftTree.data = _.clone(this.allLeftData)
      },
      async affirmDelLev3 (data) { // 三级菜单确删除
      // 发送删除信息到后台
      // 处理页面显示
      // 处理显示顺序
      // 弹窗隐藏
        let getNewLev2 = {
          id: this.delLev3Single.type.id, // 当前三级对应的二级id
          name: this.delLev3Single.name, // 当前删除的三级的名称
        }
        this.delCountsLev3 = this.delIds.length
        await this.deleteTableListFun({'ids': this.delIds})
        this.delSingleReqLeft(getNewLev2)
        this.totalSort -= this.delIds.length
        this.delModalShowLev3 = false
      },
      delCancelLev3 () { // 三级菜单取消
        this.delModalShowLev3 = false
      },
      editSinglePro () { // 编辑单个项目，需要将数据传入弹窗中
        console.log('编辑单个项目-数值型')
        // 将右侧数据传入编辑弹窗
        this.singleRroShowEditModal = true
        this.editSingleProjectFunLev3(_.clone(this.singleRightData))
      },
      editSingleProDes (data) {
        this.singleRroShowEditModalLev3 = true
        this.editSingleProjectFunLev3(data)
        // this.editSingleProjectFunLev3(_.clone(this.singleRightData))
      },
      async editBcSinglProLev3 (id, data) { // 修改弹窗保存（三级菜单对应）
      // 请求编辑数据
      // 弹窗隐藏
      // 重新请求右侧数据
      // 将数据赋值
        await this.lev2EditFun(id, data) // 编辑请求
        this.singleRroShowEditModalLev3 = false
        await this.rightChangeReqLeft() // 重新请求左侧
        // 处理左侧显示
        this.preview(data)
        // this.jumpToLev3(data)
        // await this.getReqLev3Right(this.leftTree.lev3Id) // 重新请求右侧数据
        this.initLev3Table() // 处理三级对应右侧数据
      },
      editQxSingleProLev3 () {
        this.singleRroShowEditModalLev3 = false
      },
      async editSingleProjectFunLev3 (data) { //
        await this.reqXmlb() // 请求项目类别
        this.singleRroEditModalData = _.clone(data) // 传入弹窗数据
      },
      delSinglePro () { // 删除单个项目
        console.log('删除单个项目')
        this.deleteRowLev3(_.clone(this.singleRightData))
        this.delLev3Single = this.singleRightData
        // 页面数据为空
        // 请求左侧数据
        // 弹窗隐藏
        this.delModalShowLev3 = true
      },
      deleteRowLev3 (data, event) {
        this.initDelData(data)
      },
      /* ==============================================================================单项结果（描述型）操作 */
      async addSingleResult (id, data) { // 新增请求
        await this.getSingleResultAdd({
          id: id,
          data: data,
        })
      },
      async editSingleResultReq (id, data) { // 编辑请求
        await this.getSingleResultEdit({
          id: id,
          data: data,
        })
      },
      async delSingleResult (id) { // 删除请求
        await this.getSingleResultDel(id)
      },
      async getRightAllNum () { // 初始加载
        this.totalSort = this.getTotalMeta + 1
      },
      async discribTabAdd () { // 新增
        console.log('新增结果（描述型）')
         // 请求体检类别
        // 新增弹窗显示
        await this.reqTjlb()
        this.singleDisShowAddModal = true
      },
      async reqNumberTabAgain (data) { // 重新请求右侧表格数据
        data.item_id = this.leftTree.lev3Id
        await this.addSingleResult(this.leftTree.lev3Id, data) // 新增请求
      },
      async addDiscribBc (data) { // 描述型新增保存
        console.log('描述型新增保存')
        // 提交新增数据
        // 三级菜单对应显示
        // 弹窗隐藏
        await this.reqNumberTabAgain(data) // 调用单项结果（数值型）
        await this.getReqLev3Right(this.leftTree.lev3Id)
        this.initLev3Table()
        this.singleDisShowAddModal = false
      },
      addDiscribQx(data) { // 描述型新增取消
        this.singleDisShowAddModal = false
      },
      async editDiscribBc (data) { // 弹窗编辑保存
      // 将数据传入修改弹窗中
      // 修改弹窗显示
        await this.editSaveEditDis(data)
        this.singleDisShowEditModal = false
      },
      async editSaveEditDis (data) { // 描述型编辑
        // 提交编辑请求
        // 刷新右侧数据
        // 处理右侧显示数据
        data.item_id = this.leftTree.lev3Id
        await this.editSingleResultReq(data.id, data)
        await this.getReqLev3Right(this.leftTree.lev3Id)
        this.initLev3Table()
      },
      editDiscribQx (data) { // 弹窗编辑取消
        this.singleDisShowEditModal = false
      },
      async editDiscribRow (data) { // 描述型编辑
        console.log('三级菜单描述型编辑')
        // 请求体检类别
        // 将数据传入编辑弹窗中
        // 显示编辑弹窗
        await this.reqTjlb()
        data.operater = _.clone(this.singleRightData.operater) // 最后修改人
        this.discribTab.editDiscribModalData = _.clone(data)
        this.singleDisShowEditModal = true
      },
      async delDiscribRow (data) { // 描述型删除
        console.log('三级菜单描述型删除')
        this.discribTabDelFun(data)
      },
      async discribTabDelFun (data) { // 描述型删除显示
      // 删除确认框出现
      // 处理提交数据
      // 将删除条数赋值到删除弹窗中
        this.singleDisDelModalDiscrib.delModalShow = true
        this.initDelData(data)
        this.singleDisDelModalDiscrib.delCounts = this.delIds.length
      },
      singleDisDelCancelDiscrib () { // 描述型删除取消
        this.singleDisDelModalDiscrib.delModalShow = false
      },
      async singleDisAffirmDelDiscrib () { // 描述型删除确认
      // 发送删除请求
      // 删除弹窗隐藏
      // 请求右侧数据
      // 处理右侧显示
        await this.getSingleResultDel({'ids': this.delIds})
        this.singleDisDelModalDiscrib.delModalShow = false
        await this.getReqLev3Right(this.leftTree.lev3Id)
        this.initLev3Table()
      },
  /* =================描述型单独请求修改默认结果 */
      async initReqOnlyResult (id, data) {
         // 提交修改请求
         // 请求右侧数据
         // 处理右侧数据显示
        await this.getRadioChange({
          id: id,
          data: {
            'default_res_id': data,
          },
        })
        await this.getReqLev3Right(this.leftTree.lev3Id)
        this.initLev3Table()
      },
    },
    watch: {
      totalSort (val) {
        // console.log(val)
        this.addSingleModalData.showSort = val
      },
      'tableRight.res_type' (val) { // 描述型、数值型切换的时候,页面中显示的
        if (val === 2) { // 数值型
          this.ifShowTableRight = false
          // this.tableRight.columns = this.tableRight.rightColumnsNumber
        } else {
          this.ifShowTableRight = true
          // this.tableRight.columns = this.tableRight.rightColumns
        }
      },
    },
    created () {
      this.tableRight.columns = this.tableRight.rightColumns
    },
    async mounted () {
      await this.initReq() // 批量请求加载进入时左侧和右侧所有数据（获得sort）
      this.totalSort = this.getTotalMeta + 1
      // this.leftTree.data = this.allLeftData
      this.leftTree.data = _.cloneDeep(this.allLeftData)
    },
    destroyed () {
      this.reset()
    },
  }
</script>
<style lang="less">
 .single-project-out .right-content .ivu-table td:nth-of-type(2) {
      border-right: none;
  }
  .single-project-out .right-content .ivu-table th:nth-of-type(2){
     border-right: none;
  }
  .single-project-out .right-content .ivu-table-cell-expand {
    position: absolute;
    top: 0px;
    left: -6px;
    width: 40px;
    height: 40px;
}
 .single-project-out .right-content .ivu-table-body .ivu-table-cell{
    position: relative;
}
</style>

<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .single-project-out {
    padding: @num10;
    .single-project {
      width: 100%;
      height: 100%;
      border-radius: @borderRadiuBig;
      .single-project-content {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .localSearchInput .notFocusSearch .searchIcon1 {
          top: 10px;
        }
        .localSearchInput .notFocusSearch .searchIcon2 {
          top: 10px;
        }
        .project-content-title {
          border-bottom: 1px solid @gradeAshFive;
        }
        .project-content-con {
          width: 100%;
          height: 100%;
        }
      }
      .single-project-contentL {
        height: 100%;
        width: 100%;
        background-color: #F2F7FF;
        .contentL-content {
          width: 100%;
          height: calc(~'100% - 50px');
          overflow: auto;
        }
      }
      .single-project-contentR {
        height: 100%;
        width: 100%;
        .contentR-lev3 {
          height: 100%;
          .lev3-right-title {
            height: 50px;
            width: 100%;
            .title-left {
              .title-text {
                font-size: 16px;
                line-height: 50px;
                font-weight: bold;
                color: @gradeAshTwo;
                letter-spacing: 1px;
              }
              .title-statu {
                line-height: 50px;
                font-size: 12px;
                color: @gradeAshThree;
                &>img {
                  vertical-align: middle;
                  margin-right: 3px;
                }
              }
            }
          }
        }
        .contentR-levall {
          height: 100%;
          // 表格有下拉行的位置
          .ivu-table {
            .ivu-table-header {
              th:nth-of-type(3) {
                &>div {
                  margin-left: -20px;
                }
              }
            }
            .ivu-table-row {
              td:nth-of-type(3) {
                 &>div {
                  margin-left: -10px;
                }
              }
            }
          }
        }
        .right-title {
          height: 50px;
          border-bottom: 1px solid @gradeAshFive;
          &>ul {
            &>li {
              float: left;
              width: 70px;
              margin-right: 10px;
              text-align: center;
              span {
                font-size: 14px;
                display: inline-block;
                color: @gradeAshThree;
                // line-height: 40px;
                padding: 13px 3px;
                border-bottom: 3px solid transparent;
              }
            }
            .active {
              span {
                font-weight: bold;
                color: @gradeBlueOne;
                border-bottom-color: @gradeBlueOne;
              }
            }
          }
        }
        .right-content {
          width: 100%;
          height: calc(~'100% - 50px');
        }
      }
    }
  }
</style>
