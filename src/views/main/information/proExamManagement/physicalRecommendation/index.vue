/**
  * 职业体检建议管理
  * @author 刘洋
  * @created 2017/1/27
  */
<template>
  <div class="center-wrapper">
    <div class="physical-recommendation-combo-wrapper">
      <div class="physical-recommendation-combo relative">

        <!-- 主内容表格 -->
        <div class="combo-table contentBg">
          <div class="right_w height100P">
            <title-has-slot>
              <span slot="titletHasSlotLeftTitle">职业体检建议列表</span>
              <div slot="titletHasSlotRightContent">
                <search-input searText="请输入搜索内容"   class="marginL10" :searchWidth="220" @on-enter="search" @on-Icon="search" @on-cancel="search"></search-input>
                <Button v-if="!selectMode" type="ghost" @click="add()" key="1">新 增</Button>
                <Button v-if="selectMode" type="success" :disabled="selection.length===0" @click="deleteAllSelect()"  key="2">删 除</Button>
                <!-- <Button v-if="selectMode" type="ghost" class="marginL10" @click="print()"  key="3">打 印</Button> -->
                <Button v-if="selectMode" type="ghost" class="marginL10" @click="selectMode=false"  key="4">取 消</Button>
                <Button type="ghost" v-if="!selectMode" class=" marginL10" @click="exportBtn" key="5">导 出</Button>
                <Button v-if="!selectMode" type="ghost" class="marginL10" @click="selectMode=true"  key="6">选 择</Button>

              </div>
            </title-has-slot>
            <div class="table-wrapper" ref="tableWrapper">
              <q-table
                ref="table"
                :params="package_params"
                :columns="package_columns"
                :data="physicalRecommendationlist.items"
                :pageInfo="pageInfo"
                :height="tableHeight"
                :requestDataApi="getTemplateTable"
                :selectMode="selectMode"
                :ifEdit="true"
                @after-request="afterRequest"
                @edit-row="editOne"
                @on-row-dbClick='editOne'
                @edit="editOne"
                :width="1100"
                @delete-row="delOne"
                @delete="delOne"
                @on-selection-change="selectChange">
              </q-table>
            </div>
          </div>
          <div v-if="selectOne" class="borderClass"></div>
        </div>
        <!-- 主内容表格 -->
      </div>
    </div>

    <!-- 增加套餐对话框 -->
    <div class="package add-package modal" v-if="addPackageModal">
      <Modal
        :styles="{width:'580px',maxHeight:'636px'}"
        v-model="addPackageModal"
        class-name="vertical-center-modal"
        :transition-names='[]'
        :mask-closable="false"
        :transfer='false'
        :closable="false">
        <div slot="header">
          <alert-header headerText="增加职业体检建议" :headerVal="total+1" @alert-retrun-num="getSort"></alert-header>
        </div>
        <div class="body">
          <Form ref="addPackageForm" :model="addPackageData.data" :rules="addPackageFormRule">
            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify" style="width:72px">模板名称</span>
                 <FormItem class="fl" prop="name">
                  <Input v-model="addPackageData.data.name" style="width: 180px" :class="{inputRequired:isEmpty(addPackageData.data.name)}"></Input>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix" >
               <div class="item fr">
                <span class="textJustify" style="width:120">职业健康检查种类</span>
                <FormItem class="fl" prop="occup_health_examination_type">
                  <Select
                    filterable
                    v-model="addPackageData.data.occup_health_examination_type"
                    style="width: 150px"
                    placeholder=""
                    :class="{selectionRequired:isEmpty(addPackageData.data.occup_health_examination_type)}">
                    <Option v-for="item in physicalRecommendationType.items" :value="item.id" :key="item.value">{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </div>
               <div class="item fl">
                 <span class="textJustify" style="width:72px">个体体检结论</span>
                <FormItem class="fl" prop="individual_pe_conclusion">
                  <Select
                    filterable
                    style="width:180px"
                    placeholder=""
                    v-model="addPackageData.data.individual_pe_conclusion"
                    :class="{selectionRequired:isEmpty(addPackageData.data.individual_pe_conclusion)}">
                    <Option v-for="item in addPackageData.package_type_data " :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix">
               <div class="item fr">
                  <ul class="body-ul">
                     <li class="row-ul-Top">变量名称 </li>
                     <li class="row-ul-First">
                        <ul  class="li-ul">
                            <li class="row-ul" v-for="(item,index) in varListsData"  @click="selectOneRow(item,index)">{{item.text}}</li>
                        </ul>
                     </li>
                  </ul>
              </div>
               <div class="item">
                <span class="textJustify" style="width:72px">模板内容</span>
               <FormItem class="fl">
                  <Input v-model="addPackageData.data.content"  type="textarea"  :rows="12" style="width: 180px;"  ></Input>
                </FormItem>
               </div>
            </div>
          <div class="row fl">
            <span class="textJustify fl"  style="width:72px;margin-top:0px;">备注</span>
            <FormItem class="fl">
              <Input style="width:458px;"   :style="{marginBottom:'-15px'}" v-model="addPackageData.data.remark"  type="textarea"  :rows="2" ></Input>
            </FormItem>
          </div>
          </Form>
        </div>
        <div slot="footer">
          <Checkbox v-model="addPackageData.data.is_default" true-value=1 false-value=0 class="statusCheckbox">是否默认</Checkbox>
          <Checkbox v-model="addPackageData.data.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="addPackageModal=false">取 消</Button>
          <Button class="fr marginR20 marginB20" @click="submitAdd()">保 存</Button>
          <div class="clearBoth"></div>
        </div>
      </Modal>
    </div>
    <!-- 增加套餐对话框 -->

    <!-- 修改套餐对话框 -->
    <div class="package edit-package modal" v-if="modifyTCModal">
      <Modal
        :styles="{width:'580px',maxHeight:'636px'}"
        v-model="modifyTCModal"
        class-name="vertical-center-modal"
        :transition-names='[]'
        :mask-closable="false"
        :transfer='false'
        :closable="false">
        <div slot="header">
          <alert-header headerText="编辑职业体检建议" :headerVal="curPackage.sort" @alert-retrun-num="getSort"></alert-header>
        </div>
          <div class="body">
          <Form ref="EditPackageForm" :model="addPackageData.data" :rules="addPackageFormRule">
            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify" style="width:72px">模板名称</span>
                 <FormItem class="fl" prop="name">
                  <Input v-model="addPackageData.data.name" style="width: 180px" :class="{inputRequired:isEmpty(addPackageData.data.name)}"></Input>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix" >
              <div class="item fr">
              <span class="textJustify" style="width:100">职业健康检查种类</span>
                <FormItem class="fl" prop="occup_health_examination_type">
                  <Select
                    filterable
                    v-model="addPackageData.data.occup_health_examination_type"
                    style="width: 150px"
                    placeholder=""
                    :class="{selectionRequired:isEmpty(addPackageData.data.occup_health_examination_type)}">
                    <Option v-for="item in physicalRecommendationType.items" :value="item.id" :key="item.value">{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </div>
               <div class="item fl">
                <span class="textJustify"  style="width:72px">个体体检结论</span>
                <FormItem class="fl" prop="individual_pe_conclusion">
                  <Select
                    filterable
                    style="width: 180px"
                    placeholder=""
                    v-model="addPackageData.data.individual_pe_conclusion"
                    :class="{selectionRequired:isEmpty(addPackageData.data.individual_pe_conclusion)}">
                    <Option v-for="item in addPackageData.package_type_data " :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix">
               <div class="item fr">
                  <ul class="body-ul">
                     <li class="row-ul-Top">变量名称 </li>
                     <li class="row-ul-First">
                        <ul  class="li-ul">
                            <li class="row-ul" v-for="(item,index) in varListsData"  @click="selectOneRow(item,index)">{{item.text}}</li>
                        </ul>
                     </li>
                  </ul>
              </div>
               <div class="item fl">
                <span class="textJustify" style="width:72px">模板内容</span>
               <FormItem class="fl">
                  <Input v-model="addPackageData.data.content"  type="textarea"  :rows="12" style="width: 180px;"  ></Input>
                </FormItem>
               </div>
            </div>
            <div class="row fl">
              <span class="textJustify fl"  style="width:72px;margin-top:0px;">备注</span>
              <FormItem class="fl">
                <Input style="width:458px;"   :style="{marginBottom:'0px'}" v-model="addPackageData.data.remark"  type="textarea"  :rows="2" ></Input>
              </FormItem>
            </div>
          <div class="row">
              <span class="fl">最后修改人：{{curPackage?curPackage.operater:''}}</span>
              <span class="fl marginL20">最后修改时间：{{updated_at}}</span>
              <div class="clearBoth"></div>
            </div>
          </Form>
        </div>
        <div slot="footer">
          <Checkbox v-model="addPackageData.data.is_default" true-value=1 false-value=0 class="statusCheckbox">是否默认</Checkbox>
          <Checkbox v-model="addPackageData.data.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="modifyTCModal=false">取 消</Button>
          <Button class="fr marginR20 marginB20" @click="submitEdit()">保 存</Button>
          <div class="clearBoth"></div>
        </div>
      </Modal>
    </div>
    <!-- 修改套餐对话框 -->

    <!-- 删除多个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delSomeModal" :delCounts="delCounts" @delCancel="cancelDelSome" @affirmDel="submitDelSome"></affirm-del-modal>
    </div>
    <!-- 删除多个弹窗 -->

    <!-- 删除1个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delOneModal" :delCounts="1" @delCancel="cancelDelOne" @affirmDel="submitDelOne"></affirm-del-modal>
    </div>
    <!-- 删除1个弹窗 -->

  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ZTable from '@/components/table/zTable'
import fifters from '@/utils/fifters'
import * as types from '@/store/modules/information/proExamManagement/physicalRecommendation/physicalRecommendationTypes'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'

export default {
  name: 'physicalRecommendation',
  components: {
    ZTable,
  },
  data() {
    return {
      exportParams: {
        reqParams: {},
        columns: [
          {
            title: '模板名称',
            key: 'name',
          },
          {
            title: '个体体检结论',
            key: 'individual_pe_conclusion',
            render: (value) => {
              if (value === 1) {
                return '目前未见异常'
              }
              if (value === 2) {
                return '复查'
              }
              if (value === 3) {
                return '疑似职业病'
              }
              if (value === 4) {
                return '职业禁忌症'
              }
              if (value === 5) {
                return '其他疾病或异常'
              }
            },
          },
          {
            title: '职业健康检查种类',
            key: 'occup_health_examination_type',
            render: (value) => {
              if (value) {
                return value.name
              } else {
                return ''
              }
            },
          },
          {
            title: '是否默认',
            key: 'is_default',
            render: (value) => {
              return value === 1 ? '默认' : '非默认'
            },
          },
          {
            title: '模板内容',
            key: 'content',
          },
          {
            title: '备注',
            key: 'remark',
          },
          {
            title: '启用',
            key: 'status',
            render: (value) => {
              return value === 1 ? '启用' : '非启用'
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
                return fifters.timeFilter(
                value,
                'YYYY-MM-DD HH:mm'
              )
              } else {
                return ''
              }
            },
          },
        ],
      },
      filterValue: '',
      showTransferRequire: false,
      addPackageFormRule: {
        name: [
          {
            validator: (rule, value, callback) => {
              if (value !== null && (value + '').length > 0) {
                callback()
              } else {
                callback(new Error('模板名称不能为空'))
              }
            },
            trigger: 'blur',
          },
        ],
        individual_pe_conclusion: [
          {
            validator: (rule, value, callback) => {
              if (typeof value === 'number') {
                callback()
              } else {
                callback(new Error('个体体检结论不能为空'))
              }
            },
          },
        ],
        occup_health_examination_type: [
          {
            validator: (rule, value, callback) => {
              if (typeof value === 'number') {
                callback()
              } else {
                callback(new Error('职业健康检查种类不能为空'))
              }
            },
          },
        ],
        content: [
          {
            validator: (rule, value, callback) => {
              if (typeof value === 'number') {
                callback()
              } else {
                callback(new Error('适用性别不能为空'))
              }
            },
          },
        ],
      },
      iconUrl: '/static/icons/public/success.png',
      tableHeight: 400,
      valueStartState: 2,
      valueStartStateList: [
        {
          value: 2,
          label: '全部',
        },
        {
          value: 1,
          label: '启用',
        },
        {
          value: 0,
          label: '未启用',
        },
      ],
      // 变量列表
      varListCol: [
        {
          data: 'text',
          readOnly: true,
          className: 'htCenter htMiddle',
        },
      ],
      varListsData: [
        {
          text: '工种&',
        },
        {
          text: '职业危害&',
        },
        {
          text: '职业体检类别',
        },
        {
          text: '需复查项目及要求',
        },
        {
          text: '目标疾病',
        },
        {
          text: '主检结论',
        },
        {
          text: '来源组合项目',
        },
      ],
      delCounts: 0,
      contentData: '',
      delSomeModal: false,
      delOneModal: false,
      selection: [],
      selectOne: false,
      curTableRow: undefined,
      selectMode: false,
      package_params: {
        search: '',
        status: '',
      },
      urlRemark: '/static/icons/public/remarkInCell.svg',
      package_columns: [
        {
          title: '模板名称',
          key: 'name',
          ellipsis: true,
          // minWidth: 140,
        },
        {
          title: '个体体检结论',
          key: 'individual_pe_conclusion',
          ellipsis: true,
          // minWidth: 150,
          render: (h, params) => {
            let val = params.row.individual_pe_conclusion
            if (val === 1) {
              return '目前未见异常'
            } else if (val === 2) {
              return '复查'
            } else if (val === 3) {
              return '疑似职业病'
            } else if (val === 4) {
              return '职业禁忌症'
            } else if (val === 5) {
              return '其他疾病或异常'
            }
          },
          titleRender: (data) => {
            if (data.individual_pe_conclusion === 1) {
              return '目前未见异常'
            } else if (data.individual_pe_conclusion === 2) {
              return '复查'
            } else if (data.individual_pe_conclusion === 3) {
              return '疑似职业病'
            } else if (data.individual_pe_conclusion === 4) {
              return '职业禁忌症'
            } else if (data.individual_pe_conclusion === 5) {
              return '其他疾病或异常'
            }
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 1,
              label: '目前未见异常',
            },
            {
              value: 2,
              label: '复查',
            },
            {
              value: 3,
              label: '疑似职业病',
            },
            {
              value: 4,
              label: '职业禁忌症',
            },
            {
              value: 5,
              label: '其他疾病或异常',
            },
          ],
        },
        {
          title: '职业健康检查种类',
          key: 'occup_health_examination_type',
          // minWidth: 130,
          ellipsis: true,
          render: (h, params) => {
            if (params.row.occup_health_examination_type && params.row.occup_health_examination_type.name) {
              return params.row.occup_health_examination_type.name
            } else {
              return ''
            }
          },
          titleRender: (data) => {
            return data.occup_health_examination_type.name
          },
        },
        {
          title: '是否默认',
          key: 'is_default',
          ellipsis: true,
          // width: 60,
          render: (h, params) => {
            if (params.row.is_default === 1) {
              return h('status-in-table')
            }
          },
          titleRender: (data) => {
            return ''
          },
          filterType: 'type',
          filterOptions: [
            {
              value: 1,
              label: '默认',
            },
            {
              value: 0,
              label: '未默认',
            },
          ],
        },
        {
          title: '模版内容',
          key: 'content',
          ellipsis: true,
          // minWidth: 230,
          filter: true,
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
          ellipsis: true,
          width: 60,
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('status-in-table')
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
          ellipsis: true,
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
          align: 'center',
          ellipsis: true,
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
      ],
      pros_columns: [
        {
          title: '序号',
          width: 50,
          type: 'index',
        },
        {
          title: '组合项目名称',
          key: 'name',
        },
        {
          title: '检测项目类别',
          key: 'item_type',
          render: (h, params) => {
            return params.row.item_type ? params.row.item_type.name : ''
          },
        },
      ],
      addTarget: [],
      package_transfer_columns: [
        {
          title: '组合项目名称',
          key: 'name',
        },
      ],
      keyword: '',
      curPackage: undefined, // 当前选中的套餐
      TC_Data: [],
      addPackageModal: false,
      addPackageData: {
        data: {
          name: '',
          individual_pe_conclusion: '',
          occup_health_examination_type: '',
          content: '',
          remark: '',
          sort: '',
          status: '0',
          is_default: '0',
        },
        package_type_data: [
          {
            value: 1,
            label: '通目前未见异常用',
          },
          {
            value: 2,
            label: '复查',
          },
          {
            value: 3,
            label: '疑似职业病',
          },
          {
            value: 4,
            label: '职业禁忌症',
          },
          {
            value: 5,
            label: '其他疾病或异常',
          },
        ],
        sex_data: [
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
      modifyTCModal: false,
    }
  },
  computed: {
    ...mapState('physicalRecommendationModule', [
      'physicalRecommendationlist',
      'total',
      'physicalRecommendationType',
    ]),
    ...mapState(['windowHeight']),
    pageInfo() {
      return this.physicalRecommendationlist.meta
    },
    peItemTypeOptions() {
      let arr = [
        {
          value: -1,
          label: '全部',
        },
      ]
      for (let i = 0, len = this.allPeItemType.length; i < len; i++) {
        const item = this.allPeItemType[i]
        arr.push({
          value: item.id,
          label: item.name,
        })
      }
      return arr
    },
    updated_at() {
      if (this.curPackage && this.curPackage.updated_at) {
        return fifters.timeFilter(
          this.curPackage.updated_at,
          'YYYY-MM-DD HH:mm'
        )
      } else {
        return ''
      }
    },
  },
  methods: {
    ...mapMutations('physicalRecommendationModule', {
      setAllPro: types.SET_ALL_PRO,
      setTotal: types.SET_TOTAL,
      reset: types.RESET,
    }),
    ...mapActions('physicalRecommendationModule', [
      'getTemplateTable',
      'getTotal',
      'editTemplate',
      'addTemplate',
      'delTemplate',
      'TypeTemplateResult',
    ]),
    // 点击传入模板内容的table框
    selectOneRow(item, index) {
      // console.log(data.text)
      this.contentData = item.text
      this.addPackageData.data.content += '《' + this.contentData + '》'
    },
    getAddTargets(data) {
      this.addTarget = data
    },
    search(data) {
      this.package_params.search = data
    },
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('职业体检建议', {
        api: api.physicalRecommendation.getTemplateTable,
        params: this.exportParams.reqParams,
        columns: this.exportParams.columns,
        callback: (result) => {
          if (result) {
            _this.$Message.success('导出成功')
          } else {
            _this.$Message.error('导出失败')
          }
        },
      })
    },
    refresh() {
      this.$refs.table.request()
    },
    async add() {
      await this.TypeTemplateResult()
      this.addPackageData.data = {
        name: '',
        individual_pe_conclusion: '',
        occup_health_examination_type: '',
        content: '',
        remark: '',
        status: '1',
        is_default: '0',
        sort: this.total + 1,
      }
      this.showTransferRequire = false
      this.addPackageModal = true
    },
    async editOne(data, index) {
      // console.log(data.occup_health_examination_type.name)
      this.curPackage = data
      this.addPackageData.data = {
        name: data.name,
        is_default: data.is_default + '',
        individual_pe_conclusion: data.individual_pe_conclusion,
        occup_health_examination_type: data.occup_health_examination_type.id,
        content: data.content,
        status: data.status + '',
        sort: data.sort,
        remark: data.remark,
      }
      this.showTransferRequire = false
      this.modifyTCModal = true
    },
    editCurTC() {
      this.editOne(this.curTableRow)
    },
    delOne(data, index) {
      this.curPackage = data
      this.delOneModal = true
    },
    selectChange(selection) {
      this.selection = selection
    },
    deleteAllSelect() {
      this.delSomeModal = true
      this.delCounts = this.selection.length
    },
    cancelDelOne() {
      this.delOneModal = false
    },
    async submitDelOne() {
      this.delOneModal = false
      await this.delTemplate({ ids: this.curPackage.id })
      this.setTotal(this.total - 1)
      // this.refresh()
      this.refreshAfterDel(1)
    },
    cancelDelSome() {
      this.delSomeModal = false
    },
    async submitDelSome() {
      this.delSomeModal = false
      let arr = []
      this.selection.forEach(element => {
        arr.push(element.id)
      })
      await this.delTemplate({ ids: arr })
      this.setTotal(this.total - this.selection.length)
      this.refreshAfterDel(this.selection.length)
    },
    async submitAdd() {
      let valid = await this.$refs.addPackageForm.validate()
      if (valid) {
        await this.addTemplate(this.addPackageData.data)
        this.setTotal(this.total + 1)
        this.addPackageModal = false
        this.refresh()
      }
    },
    async submitEdit() {
      // this.addPackageData.data.checked = checkeds
      let valid = await this.$refs.EditPackageForm.validate()
      if (valid) {
        await this.editTemplate({
          id: this.curPackage.id,
          data: this.addPackageData.data,
        })
        this.modifyTCModal = false
        this.refresh()
      }
    },
    afterRequest() {
      this.selection = []
      if (this.curTableRow) {
        let exist = false
        for (
          let i = 0, len = this.physicalRecommendationlist.items.length;
          i < len;
          i++
        ) {
          const element = this.physicalRecommendationlist.items[i]
          if (element.id === this.curTableRow.id) {
            this.curTableRow = element
            exist = true
            break
          }
        }
        if (!exist) {
          this.curTableRow = undefined
        }
      }
    },
    getSort(value) {
      this.addPackageData.data.sort = value
    },
    refreshAfterDel(delNum) {
      this.$refs.table.allSelection = []
      if (
        this.pageInfo.total <=
          (this.pageInfo.current_page - 1) * this.pageInfo.per_page + delNum &&
        this.pageInfo.current_page !== 1
      ) {
        this.$refs.table.request({ page: this.pageInfo.current_page - 1 })
      } else {
        this.$refs.table.request()
      }
    },
    isEmpty(value) {
      if (value === '' || (value + '').trim() === '') {
        return true
      }
      return false
    },
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.tableWrapper.offsetHeight
    },
    valueStartState(cur) {
      if (cur === 2) {
        this.$set(this.package_params, 'status', '')
      } else {
        this.$set(this.package_params, 'status', cur)
      }
    },
  },
  created() {
    this.getTotal()
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
}
</script>
<style lang="less">
@import (reference) "~assets/less/variable.less";
.center-wrapper {
  // width: 1055px;
  height: 100%;
  margin: 0 auto;

  .clearfix {
    clear: both;
    height: 50px;
  }
}

.physical-recommendation-combo-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;

  .physical-recommendation-combo {
    height: 100%;
  }

  .table-wrapper {
    height: calc(~"100% - 50px");
  }

  .combo-table {
    height: 100%;
    position: relative;
  }

  .start-state {
    float: left;
    line-height: 30px;
    font-size: 12px;
    color: @gradeAshThree;
    margin-right: 10px;
  }

  .customColumn {
    .ivu-table-cell {
      padding: 0;
      height: 100%;
    }
    .cell {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 5px;
      color: @gradeBlueOne;

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      }
    }
    .active {
      background: @gradeBlueOne;
      color: #fff;
    }
  }

  .fr-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 50px;
    width: 57%;
    z-index: 102;
    box-shadow: -1px 0 6px 0 rgba(206, 213, 242, 0.8);

    .titletHasSlot {
      height: 50px;
    }

    .table-wrapper {
      height: calc(~"100% - 50px");
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      overflow: hidden;
    }

    .fa-icon {
      fill: #fff;
      width: 16px;
      height: 16px;
      padding: 3px;
      position: absolute;
      top: -8px;
      right: -8px;
      background: #b3b3b3;
      border-radius: 50%;
      cursor: pointer;
    }

    .fa-icon:hover {
      background: @tsIcon;
      border-radius: 50%;
    }

    .ivu-icon-ios-close {
      position: absolute;
      top: -7px;
      right: -7px;
      font-size: 18px;
      color: #cccccc;
      cursor: pointer;
    }
  }
}

.package {
  .body {
    padding: 20px;
    height: 100%;
    overflow: auto;
    .nowd{
     margin-top: 0px;
    }
    .body-ul {
      width: 258px;
      height: 256px;
      display: inline-block;
      border: 1px solid #d9d9d9;
      margin-left: 10px;
      border-radius: 5px;
      .row-ul-Top {
        width: 100%;
        height: 40px;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
        background-color:@tableTh;
        border-radius: 5px 5px 0 0;
        font-weight:bold;
      }
      .row-ul-First {
        width: 100%;
        height: 210px;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
        overflow: auto;
        .row-ul {
          width: 100%;
          height: 40px;
          cursor: pointer;
          text-align: center;
          line-height: 40px;
        }
        .row-ul:nth-child(odd) {
          background-color: #ffffff;
          border-left: 2px solid #ffffff;
          border-right: 2px solid #ffffff;
        }
        .row-ul:nth-child(even) {
          background-color: @tableTr;
          border-left: 2px solid @tableTr;
          border-right: 2px solid @tableTr;
        }

        .rowUl:nth-last-child(1) {
          border-bottom: 1px solid #d9d9d9;
        }

        .row-ul:hover {
          color: #008CEE;
          border-left: 2px solid #dff0ff;
          border-right: 2px solid #dff0ff;
        }
      }
    }
  }

  .textJustify {
    float: left;
    height: 30px;
    overflow: hidden;
    line-height: 30px;
    font-size: 12px;
    color: @gradeAshThree;
    margin-right: 10px;
  }

  .transfer-wrapper {
    position: relative;
    padding-top: 5px;

    .transfer-require {
      position: absolute;
      top: 100px;
      left: 220px;
      color: red;
    }

    .transfer-require.required:before {
      content: "必填项";
      position: absolute;
      width: 150px;
      left: -150px;
      top: -3px;
    }
  }

  // .ivu-modal {
  //   height: calc(~"100% - 100px");
  // }
  // .ivu-modal-content {
  //   height: 100%;
  // }
  // .ivu-modal-body {
  //   height: calc(~"100% - 100px");
  // }

  .inputRequired:after {
    content: "*";
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
      content: "*";
      color: red;
      position: absolute;
      right: 20px;
      top: 2px;
      font-size: 16px;
    }
  }
  .statusCheckbox {
    margin-top: 7px;
    margin-right: 20px;
  }
}
</style>
