/**
 * Created 张祥
 * Date: 2018/01/19
 * content:体检类别管理
 * updated：2018/01/26
 */
<template>
  <div class="exam-combo-wrapper">
    <!-- 主体 -->
    <div class="exam-combo">
      <div class="header-wrapper">
        <div class="table-header">
          <title-has-slot>
            <span slot="titletHasSlotLeftTitle">体检套餐列表</span>
            <div slot="titletHasSlotRightContent" class="titlet-slot-left">
              <Button type="primary" v-if="selectMode" class="fr " @click="selectMode=false" key="1">取 消</Button>
              <!-- <Button type="ghost" v-if="selectMode" class="fr marginR10" @click="print()" key="2">打 印</Button> -->
              <Button 
                key="3"
                type="success"
                v-if="selectMode"
                class="fr marginR10  delete-button"
                :disabled="selection.length===0"
                @click="deleteAllSelect()">删 除
              </Button>
              <Button type="ghost" v-if="!selectMode" class="fr " @click="selectMode=true" key="4">选 择</Button>
              <Button type="ghost" v-if="!selectMode" class="fr marginR10" @click="exportBtn" key="5">导 出</Button>
              <Button type="ghost" v-if="!selectMode" class="fr marginR10" @click="add" key="6">新 增</Button>
              <search-input
                :searchWidth="220"
                class="fr marginL20 marginR20"
                searText="请输入搜索内容"
                @on-enter="search"
                @on-Icon="search"
                @on-cancel="search">
              </search-input>
            </div>
          </title-has-slot>
        </div>
        <div class="contently" ref="contentTable">
          <q-table
            ref="zBaseInfoTable"
            :isSelectMode="selectMode"
            :params="params"
            :ifEdit="true"
            :width="1200"
            :columns="columns"
            :selectMode="selectMode"
            :data="examComboList.items"
            :requestDataApi="getExamComboList"
            :height="tableHeight"
            :pageInfo="pageInfo"
            :hasOperateCopy="true"
            :fixedRightWidth="90"
            @after-request="afterRequest"
            @delete-row="delOne"
            @delete="delOne"
            @edit-row="editOne"
            @edit="editOne"
            @on-row-dbClick="editOne"
            @copy="copy"
            @getRequestParams="getRequestParams"
            @all-selection="selectChange">
          </q-table>
        </div>
      </div>
    </div>
    <!-- 主体结束 -->

    <!-- 新增 -->
    <div class="add-modal" v-if="addModal">
      <Modal
        v-model="addModal"
        width="760"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            headerText="新增体检套餐"
            :headerVal="total+1"
            @alert-retrun-num="getSort">
          </alert-header>
        </div>
        <div class="body">
          <Form ref="formAdd"
            :model="formAdd"
            :rules="rulesForm">

            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify lineH30 fl marginR10" style="width:72px;">体检套餐名称</span>
                <FormItem prop="name" class="fl">
                  <Input style="width:390px" :class='{inputRequired: isEmpty(formAdd.name)}' v-model.trim="formAdd.name"></Input>
                </FormItem>
              </div>
              <div class="item fr">
                <span class="textJustify lineH30 fl marginR10" style="width:48px;">适用对象</span>
                <FormItem prop="target" class="fl">
                  <Select
                    filterable
                    v-model="formAdd.target"
                    style="width:168px;"
                    placeholder=""
                    :class="{selectionRequired:isEmpty(formAdd.target)}">
                    <Option v-for="item in targetList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>

            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify lineH30 fl marginR10" style="width:72px;">适用体检类别</span>
                <FormItem prop="pe_categories" class="fl">
                  <Select
                    ref="selecter"
                    multiple
                    filterable
                    v-model="formAdd.pe_categories"
                    style="width:390px"
                    placeholder=""
                    :class="{multipleSelectionRequired:isEmpty(formAdd.pe_categories)}">
                    <li @click="selectAll" class="ivu-select-item" :class="{'ivu-select-item-selected':formAdd.pe_categories.length===examCategoryList.length}">全部</li>
                    <Option v-for="item in examCategoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="item fr">
                <span class="textJustify lineH30 fl marginR10" style="width:48px;">适用性别</span>
                <FormItem prop="sex" class="fl">
                  <Select
                    filterable
                    v-model="formAdd.sex"
                    style="width:168px;"
                    placeholder=""
                    :class="{selectionRequired:isEmpty(formAdd.sex)}">
                    <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>

            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify lineH30 fl marginR10" style="width:72px;">项目合计价格</span>
                <FormItem class="fl">
                  <z-input
                    type="number"
                    disabled
                    style="width:160px;"
                    class="yuan"
                    v-model.trim="formAdd.group_price">
                  </z-input>
                </FormItem>
              </div>
              <div class="item fl" :style="{marginLeft:'25px'}">
                <span class="textJustify lineH30 fl marginR10" style="width:72px;">套餐折扣比例</span>
                <FormItem prop="discount" class="fl">
                  <z-input
                    type="number"
                    style="width:122px;"
                    :class='{inputRequired: isEmpty(formAdd.discount)}'
                    @keydown.native="inputDiscount($event)"
                    v-model.trim="formAdd.discount">
                  </z-input>
                </FormItem>
              </div>
              <div class="item fr">
                <span class="textJustify lineH30 fl marginR10" style="width:48px;">套餐价格</span>
                <FormItem prop="price" class="fl">
                  <z-input
                    type="number"
                    style="width:168px;"
                    class="yuan"
                    :step="0.01"
                    :class='{inputRequired: isEmpty(formAdd.price)}'
                    @keydown.native="inputPrice($event)"
                    v-model.trim="formAdd.price">
                  </z-input>
                </FormItem>
              </div>
            </div>
            
            <div class="row clearfix">
              <span class="textJustify fl lineH30 marginR10" style="width:72px;margin-top:3px;">备注</span>
              <FormItem class="fl">
                <Input style="width:632px" v-model="formAdd.remark" type="textarea" :maxlength="255" :row="2"></Input>
              </FormItem>
            </div>

            <div class="transfer-wrapper" :class="{transferRequestText:showTransferRequest&&transferTargetData.length===0,transferRequest:transferTargetData.length===0}">
              <custom-transfer
                v-model="transferTargetData"
                checkTitle="是否必检"
                selectTitle="项目类别"
                listWidth="313px"
                listHeight="291px"
                :moveAll="true"
                :canChecked="true"
                :canAdd="canAdd"
                :columns="transferColumns"
                :sourceData="allPro"
                :select="true"
                :selectOptions="selectOptions"
                @getSourceSelectRow="getSourceSelectRow"
                @getSelectValue="getItemType">
              </custom-transfer>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox v-model="formAdd.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="addModal = false">取 消</Button>
          <Button type="primary" class="fr marginR20 marginB20" @click="submitAdd()">保 存</Button>
        </div>
      </Modal>
    </div>
    <!-- 新增结束 -->

    <!-- 编辑 -->
    <div class="add-modal" v-if="editModal">
      <Modal
        v-model="editModal"
        width="760"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            headerText="编辑体检套餐"
            :headerVal="curRow.sort"
            @alert-retrun-num="getSort">
          </alert-header>
        </div>
        <div class="body">
          <Form ref="formEdit"
            :model="formAdd"
            :rules="rulesForm">

            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify lineH30 fl marginR10" style="width:72px;">体检套餐名称</span>
                <FormItem prop="name" class="fl">
                  <Input style="width:390px" :class='{inputRequired: isEmpty(formAdd.name)}' v-model.trim="formAdd.name"></Input>
                </FormItem>
              </div>
              <div class="item fr">
                <span class="textJustify lineH30 fl marginR10" style="width:48px;">适用对象</span>
                <FormItem prop="target" class="fl">
                  <Select
                    filterable
                    v-model="formAdd.target"
                    style="width:168px;"
                    placeholder=""
                    :class="{selectionRequired:isEmpty(formAdd.target)}">
                    <Option v-for="item in targetList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>

            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify lineH30 fl marginR10" style="width:72px;">适用体检类别</span>
                <FormItem prop="pe_categories" class="fl">
                  <Select
                    ref="selecter"
                    multiple
                    filterable
                    v-model="formAdd.pe_categories"
                    style="width:390px"
                    placeholder=""
                    :class="{multipleSelectionRequired:isEmpty(formAdd.pe_categories)}">
                    <li @click="selectAll" class="ivu-select-item" :class="{'ivu-select-item-selected':formAdd.pe_categories.length===examCategoryList.length}">全部</li>
                    <Option v-for="item in examCategoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="item fr">
                <span class="textJustify lineH30 fl marginR10" style="width:48px;">适用性别</span>
                <FormItem prop="sex" class="fl">
                  <Select
                    filterable
                    v-model="formAdd.sex"
                    style="width:168px;"
                    placeholder=""
                    :class="{selectionRequired:isEmpty(formAdd.sex)}">
                    <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>

            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify lineH30 fl marginR10" style="width:72px;">项目合计价格</span>
                <FormItem class="fl">
                  <z-input
                    type="number"
                    disabled
                    style="width:160px;"
                    class="yuan"
                    v-model.trim="formAdd.group_price">
                  </z-input>
                </FormItem>
              </div>
              <div class="item fl" :style="{marginLeft:'25px'}">
                <span class="textJustify lineH30 fl marginR10" style="width:72px;">套餐折扣比例</span>
                <FormItem prop="discount" class="fl">
                  <z-input
                    type="number"
                    style="width:122px;"
                    :class='{inputRequired: isEmpty(formAdd.discount)}'
                    @keydown.native="inputDiscount($event)"
                    v-model.trim="formAdd.discount">
                  </z-input>
                </FormItem>
              </div>
              <div class="item fr">
                <span class="textJustify lineH30 fl marginR10" style="width:48px;">套餐价格</span>
                <FormItem prop="price" class="fl">
                  <z-input
                    type="number"
                    style="width:168px;"
                    class="yuan"
                    :step="0.01"
                    :class='{inputRequired: isEmpty(formAdd.price)}'
                    @keydown.native="inputPrice($event)"
                    v-model.trim="formAdd.price">
                  </z-input>
                </FormItem>
              </div>
            </div>
            
            <div class="row clearfix">
              <span class="textJustify fl lineH30 marginR10" style="width:72px;margin-top:3px;">备注</span>
              <FormItem class="fl">
                <Input style="width:632px" v-model="formAdd.remark" type="textarea" :maxlength="255" :row="2"></Input>
              </FormItem>
            </div>

            <div class="transfer-wrapper" :class="{transferRequestText:showTransferRequest&&transferTargetData.length===0,transferRequest:transferTargetData.length===0}">
              <custom-transfer
                v-model="transferTargetData"
                checkTitle="是否必检"
                selectTitle="项目类别"
                listWidth="313px"
                listHeight="291px"
                :moveAll="true"
                :canChecked="true"
                :columns="transferColumns"
                :sourceData="allPro"
                :select="true"
                :selectOptions="selectOptions"
                @getSourceSelectRow="getSourceSelectRow"
                @getSelectValue="getItemType">
              </custom-transfer>
            </div>

            <div class="row clearfix marginT15">
              <span class="fl marginR20">最后修改人：{{curRow?curRow.operater:''}}</span>
              <span class="fl">最后修改时间：{{updated_at}}</span>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox v-model="formAdd.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="editModal = false">取 消</Button>
          <Button type="primary" class="fr marginR20 marginB20" @click="submitEdit()">保 存</Button>
        </div>
      </Modal>
    </div>
    <!-- 编辑结束-->

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
  import fifters from '@/utils/fifters'
  import * as types from '@/store/modules/information/examManagement/examCombo/examComboTypes'
  import api from '@/api'
  import exportXlsx from '@/service/export-xlsx.js'
  export default {
    name: 'examCombo',
    data() {
      return {
        exportParams: {
          reqParams: {},
          reqFields: [
            'name',
            'sex',
            'target',
            'pe_categories',
            'group_price',
            'price',
            'remark',
            'status',
            'sort',
            'operater',
            'updated_at',
          ],
          columns: [
            {
              key: 'name',
              title: '体检套餐名称',
            },
            {
              key: 'sex',
              title: '适用性别',
              render: (value) => {
                if (value === 0) {
                  return '通用'
                } else if (value === 1) {
                  return '男'
                } else if (value === 2) {
                  return '女'
                }
              },
            },
            {
              key: 'target',
              title: '适用对象',
              render: (value) => {
                if (value === 0) {
                  return '通用'
                } else if (value === 1) {
                  return '单位'
                } else if (value === 2) {
                  return '个人'
                }
              },
            },
            {
              title: '适用体检类别',
              key: 'pe_categories',
              render: (value) => {
                return value.map(item => item.name).join('，')
              },
            },
            {
              title: '项目合计价格（元）',
              key: 'group_price',
            },
            {
              title: '套餐价格（元）',
              key: 'price',
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
        canAdd: true,
        watchDiscount: true,
        watchPrice: true,
        watchTarget: true,
        watchGroupPrice: true,
        showTransferRequest: false,
        transferColumns: [
          {
            title: '项目类别',
            key: 'item_type',
            render: (h, params) => {
              if (params.data.item_type) {
                // return params.data.item_type.name
                return h('span', {
                  domProps: {
                    innerText: params.data.item_type.name,
                  },
                })
              }
              return ''
            },
            rightRender: (h, params) => {
              if (params.data.item_type) {
                return h('span', {
                  domProps: {
                    innerText: params.data.item_type.name,
                  },
                })
              }
              return ''
            },
          },
          {
            title: '组合项目名称',
            key: 'name',
          },
        ],
        transferTargetData: [],
        group_item_ids: [],
        delSomeModal: false,
        delOneModal: false,
        selection: [],
        curRow: undefined,
        formAdd: {
          name: '',
          target: '',
          pe_categories: [],
          sex: '',
          group_items: [],
          group_price: '',
          discount: '',
          price: '',
          remark: '',
          status: '0',
          sort: 0,
        },
        itemClassList: [
          {
            label: '检验体检',
            value: 1,
          },
          {
            label: '检查体检',
            value: 2,
          },
          {
            label: '功能体检',
            value: 3,
          },
        ],
        targetList: [
          {
            label: '通用',
            value: 0,
          },
          {
            label: '单位',
            value: 1,
          },
          {
            label: '个人',
            value: 2,
          },
        ],
        sexList: [
          {
            label: '通用',
            value: 0,
          },
          {
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 2,
          },
        ],
        rulesForm: {
          name: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('体检套餐名称不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
          target: [
            {
              validator: (rule, value, callback) => {
                if (typeof value === 'number') {
                  callback()
                } else {
                  callback(new Error('适用对象不能为空'))
                }
              },
            },
          ],
          pe_categories: [
            {
              validator: (rule, value, callback) => {
                if (Array.isArray(value) && value.length > 0) {
                  callback()
                } else {
                  callback(new Error('适用体检类别不能为空'))
                }
              },
            },
          ],
          sex: [
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
          discount: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('套餐折扣比例不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
          price: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('套餐价格不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
        },
        urlSuccess: '/static/icons/public/enabledState.svg',
        urlRemark: '/static/icons/public/remarkInCell.svg',
        columns: [
          {
            title: '体检套餐名称',
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
            titleRender: (row) => {
              let val = row.sex
              if (val === 0) {
                return '通用'
              } else if (val === 1) {
                return '男'
              } else if (val === 2) {
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
            title: '适用对象',
            key: 'target',
            ellipsis: true,
            width: 80,
            render: (h, params) => {
              let val = params.row.target
              if (val === 0) {
                return '通用'
              }
              if (val === 1) {
                return '单位'
              }
              if (val === 2) {
                return '个人'
              }
            },
            titleRender: (row) => {
              let val = row.sex
              if (val === 0) {
                return '通用'
              } else if (val === 1) {
                return '单位'
              } else if (val === 2) {
                return '个人'
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
                label: '单位',
              },
              {
                value: 2,
                label: '个人',
              },
            ],
          },
          {
            title: '适用体检类别',
            key: 'peCategories.name',
            ellipsis: true,
            render: (h, params) => {
              return params.row.pe_categories.map(item => item.name).join('，')
            },
            titleRender: (row) => {
              return row.pe_categories.map(item => item.name).join('，')
            },
          },
          {
            title: '项目合计价格（元）',
            key: 'group_price',
            ellipsis: true,
            width: 130,
          },
          {
            title: '套餐价格（元）',
            key: 'price',
            ellipsis: true,
            width: 130,
          },
          {
            title: '备注',
            key: 'remark',
            ellipsis: true,
            width: 60,
            render: (h, params) => {
              let val = params.row.remark
              if (val) {
                return h(
                  'remark-in-table',
                  {
                    props: {
                      text: val,
                    },
                  }
                )
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
            titleRender: () => {
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
        statusList: [
          {
            label: '全部',
            value: 2,
          },
          {
            label: '启用',
            value: 1,
          },
          {
            label: '未启用',
            value: 0,
          },
        ],
        params: {
          with: 'groupItems.itemType:id,name',
          search: '',
        },
        status: 2,
        delCounts: 0,
        editModal: false,
        addModal: false,
        selectMode: false,
        tableHeight: 400,
      }
    },
    computed: {
      ...mapState(['windowHeight']),
      ...mapState('examComboModule', [
        'examComboList',
        'total',
        'examCategoryList',
        'allPeItemType',
        'allPro',
      ]),
      pageInfo() {
        return this.examComboList.meta
      },
      updated_at() {
        if (this.curRow && this.curRow.updated_at) {
          return fifters.timeFilter(this.curRow.updated_at, 'YYYY-MM-DD HH:mm')
        } else {
          return ''
        }
      },
      selectOptions() {
        let arr = [
          {
            value: -1,
            label: '全部',
          },
        ]
        this.allPeItemType.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
      },
    },
    methods: {
      // 验证输入框是否为空显示提示信息
      isEmpty(value) {
        if (value === '' || (value + '').trim() === '') {
          return true
        }
        return false
      },
      ...mapMutations('examComboModule', {
        reset: types.RESET,
        setTotal: types.SET_TOTAL,
      }),
      ...mapActions('examComboModule', [
        'getExamComboList',
        'addExamCom',
        'modifyExamCom',
        'delExamCom',
        'getTotal',
        'getExamCategoryList',
        'getPeItemTypes',
        'getAllPro',
      ]),
      search(data) {
        this.params.search = data
      },
      getItemType(val) {
        let params = {
          with: 'itemType:name',
        }
        if (val !== -1) {
          params.filters = `item_type_id:${val};status:1`
        }
        this.getAllPro(params)
      },
      selectAll() {
        if (this.formAdd.pe_categories.length === this.examCategoryList.length) {
          this.formAdd.pe_categories = []
        } else {
          this.formAdd.pe_categories = this.examCategoryList.map(item => {
            return item.id
          })
        }
        this.$refs.selecter.$refs.dropdown.update()
      },
      async add() {
        await this.getExamCategoryList()
        await this.getPeItemTypes()
        await this.getAllPro({
          with: `itemType:name;excludes:name`,
          filters: 'status:1',
        })
        this.canAdd = true
        this.watchTarget = false
        this.transferTargetData = []
        this.showTransferRequest = false
        this.formAdd = {
          name: '',
          target: 0,
          pe_categories: [],
          sex: 0,
          group_items: [],
          group_price: '',
          discount: '',
          price: '',
          remark: '',
          status: '1',
          sort: this.total + 1,
        }
        this.addModal = true
        this.$nextTick(() => {
          this.watchTarget = true
        })
      },
      async submitAdd() {
        // 新增对话框确定按钮
        let val = await this.$refs.formAdd.validate()
        if (!val || this.transferTargetData.length === 0) {
          this.showTransferRequest = true
          return
        }
        this.formAdd.group_items = this.transferTargetData.map(item => {
          return {
            id: item.id,
            is_required: item._checked ? 1 : 0,
          }
        })
        await this.addExamCom(this.formAdd)
        this.$refs.zBaseInfoTable.request()
        this.addModal = false
        this.setTotal(this.total + 1)
      },
      async submitEdit() {
        // 新增对话框确定按钮
        let val = await this.$refs.formEdit.validate()
        if (!val || this.transferTargetData.length === 0) {
          this.showTransferRequest = true
          return
        }
        this.formAdd.group_items = this.transferTargetData.map(item => {
          return {
            id: item.id,
            is_required: item._checked ? 1 : 0,
          }
        })
        await this.modifyExamCom({ id: this.curRow.id, data: this.formAdd })
        this.$refs.zBaseInfoTable.request()
        this.editModal = false
      },
      async editOne(data, index) {
        await this.getExamCategoryList()
        await this.getPeItemTypes()
        await this.getAllPro({
          with: `itemType:name;excludes:name`,
          filters: 'status:1',
        })
        this.transferTargetData = data.group_items.map(item => {
          if (item.pivot && item.pivot.is_required === 1) {
            item._checked = true
          }
          return item
        })
        this.canAdd = true
        this.curRow = data
        this.showTransferRequest = false
        this.formAdd = {
          name: data.name,
          target: data.target,
          pe_categories: data.pe_categories.map(item => item.id),
          sex: data.sex,
          group_price: data.group_price,
          discount: data.discount,
          price: data.price,
          remark: data.remark,
          status: data.status + '',
          sort: data.sort,
        }
        this.editModal = true
      },
      async copy(data, index) {
        await this.getExamCategoryList()
        await this.getPeItemTypes()
        await this.getAllPro({
          with: `itemType:name;excludes:name`,
        })
        this.watchGroupPrice = false
        this.transferTargetData = data.group_items.map(item => {
          if (item.pivot && item.pivot.is_required === 1) {
            item._checked = true
          }
          return item
        })
        this.showTransferRequest = false
        this.formAdd = {
          name: '',
          target: data.target,
          pe_categories: data.pe_categories.map(item => item.id),
          sex: data.sex,
          group_price: data.group_price,
          discount: '',
          price: '',
          remark: data.remark,
          status: data.status + '',
          sort: data.sort,
        }
        this.addModal = true
        this.$nextTick(() => {
          this.watchGroupPrice = true
        })
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
        // console.log('导出')
        let _this = this
        exportXlsx('体检套餐列表', {
          api: api.examCombo.getExamComboList,
          params: {
            ...this.exportParams.reqParams,
            fields: this.exportParams.reqFields.join(','),
          },
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
      getRequestParams(params) {
        this.exportParams.reqParams = params
      },
      getSort(value) {
        this.formAdd.sort = value
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
        await this.delExamCom({ ids: arr })
        this.refreshAfterDel(this.selection.length)
      },
      async submitDelOne() {
        this.delOneModal = false
        await this.delExamCom({ ids: this.curRow.id })
        this.refreshAfterDel(1)
      },
      refreshAfterDel(delNum) {
        this.$refs.zBaseInfoTable.allSelection = []
        this.selection = []
        this.setTotal(this.total - delNum)
        if (
          this.pageInfo.total <=
            (this.pageInfo.current_page - 1) * this.pageInfo.per_page + delNum &&
          this.pageInfo.current_page !== 1
        ) {
          this.$refs.zBaseInfoTable.request({
            page: this.pageInfo.current_page - 1,
          })
        } else {
          this.$refs.zBaseInfoTable.request()
        }
      },
      inputDiscount(event) {
        this.watchDiscount = true
        this.watchPrice = false
        // console.log(String.fromCharCode(event.keyCode))
        // console.log(this.formAdd.discount)
        // let groupPrice = Number.parseFloat(this.formAdd.group_price)
        // if (Number.isNaN(groupPrice)) {
        //   return
        // }
        // this.formAdd.price = groupPrice * this.formAdd.discount / 100
      },
      inputPrice() {
        this.watchDiscount = false
        this.watchPrice = true
      },
      getSourceSelectRow(row) {
        // let arr = this.transferTargetData
        // if (row.excludes) {
        //   let exist = row.excludes.some(item => {
        //     return arr.some(item1 => {
        //       return item1.id === item.pivot.exclude_id
        //     })
        //   })
        //   this.canAdd = !exist
        // } else {
        //   this.canAdd = true
        // }
        // let exist = false
        // for (let i = 0; i < this.transferTargetData.length; i++) {
        //   let item = this.transferTargetData[i]
        //   let b = false
        //   for (let j = 0; j < item.excludes.length; j++) {
        //     let exclude = item.excludes[j]
        //     if (exclude.pivot.exclude_id === row.id) {
        //       b = true
        //       break
        //     }
        //   }
        //   if (b) {
        //     exist = true
        //     break
        //   }
        // }
        // this.canAdd = !exist
        // console.log(this.canAdd)
      },
    },
    watch: {
      windowHeight() {
        this.tableHeight = this.$refs.contentTable.offsetHeight
      },
      transferTargetData(cur, old) {
        if (!this.watchTarget) {
          return
        }
        let sum = 0
        cur.forEach(item => {
          let price = Number.parseFloat(item.price)
          sum += Number.isNaN(price) ? 0 : price
        })
        this.formAdd.group_price = sum
      },
      'formAdd.price'(cur) {
        if (!this.watchPrice) {
          return
        }
        let price = Number.parseFloat(cur)
        let groupPrice = Number.parseFloat(this.formAdd.group_price)
        if (Number.isNaN(price) || Number.isNaN(groupPrice)) {
          if (cur === '') {
            this.formAdd.discount = ''
          }
        } else {
          this.formAdd.discount = (price / groupPrice).toFixed(2)
        }
      },
      'formAdd.discount'(cur) {
        if (!this.watchDiscount) {
          return
        }
        let discount = Number.parseFloat(cur)
        let groupPrice = Number.parseFloat(this.formAdd.group_price)
        if (Number.isNaN(discount) || Number.isNaN(groupPrice)) {
          if (cur === '') {
            this.formAdd.price = ''
          }
          return
        } else {
          this.formAdd.price = (discount * groupPrice).toFixed(2)
        }
      },
      'formAdd.group_price'(cur) {
        this.watchPrice = false
        if (!this.watchGroupPrice) {
          return
        }
        let discount = Number.parseFloat(this.formAdd.discount)
        if (Number.isNaN(discount)) {
          this.formAdd.price = cur
        } else {
          this.formAdd.price = cur * discount / 100
        }
      },
    },
    created() {
      this.getTotal()
    },
    mounted() {
      this.tableHeight = this.$refs.contentTable.offsetHeight
    },
    destroyed() {
      this.reset()
    },
    activated() {
      this.tableHeight = this.$refs.contentTable.offsetHeight
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .exam-combo-wrapper {
    position: relative;
    margin: auto;
    height: 100%;

    .add-modal{
      .ivu-modal {
        height: calc(~'100% - 41px');
        max-height: 599px;
      }
      .ivu-modal-content {
        height: 100%;
      }
      .ivu-modal-body {
        height: calc(~'100% - 100px');
        padding-bottom: 20px;

        .body {
          height: 100%;
          overflow: auto;
        }
      }
    }

    .exam-combo {
      height: 100%;
      width: 100%;
      padding: 10px;

      .header-wrapper {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        border-radius: 8px;
        position: relative;
        background: #ffffff;
        border: 1px solid #d9d9d9;
        color: #111111;
        box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.5);
        overflow: hidden;
        .contently {
          height: calc(~'100% - 50px');
        }
      }

      .table-header {
        position: relative;
        .titlet-slot-left {
          .start-state {
            line-height: 30px;
            font-size: 12px;
            color: @gradeAshThree;
            margin-right: 10px;
          }
        }
      }
    }

    .add-modal {
      .bottom {
        height: 70px;

        .bottom-right {
          font-size: 0;
          position: relative;

          .button {
            margin-top: 20px;
            margin-right: 20px;
          }
          .check-box {
            position: absolute;
            right: 200px;
            top: 25px;
          }
        }
      }

      .body {
        width: 100%;
        .modal-form-row {
          padding: 0 @num20;
          & > .ivu-form-item-label {
            padding: @num10 @num10 0 0;
            text-align: justify;
            &::after {
              content: '';
              display: inline-block;
              width: 100%;
              overflow: hidden;
              height: 0%;
            }
            &::before {
              display: none;
            }
          }
          &.ivu-form-item {
            margin-bottom: @num20;
          }
        }

        form {
          padding: 20px;
          padding-bottom:0; 
        }

        .lineH30 {
          height: 30px;
          line-height: 30px;
        }

        .check-group-row {
          .item .ivu-checkbox-wrapper {
            margin-right: 0;
          }
        }

        .row {
          & > label {
            display: table-cell;
            white-space: nowrap;
            width: 1%;
            color: @tagGroupText;
          }

          .require {
            position: absolute;
            right: 34px;
            top: 0;
            bottom: 0;
            line-height: 75px;
            font-size: 16px;
            color: #ff6262;
          }

          & .ls24 {
            padding-top: 10px;
            vertical-align: top;
            letter-spacing: 24px;
          }

          & .ls24:after {
            content: '';
            margin-left: -24px;
          }

          .time {
            margin-top: 15px;
            font-size: 12px;
            color: @tagGroupText;
            position: relative;

            span:first-child {
              margin-left: 20px;
            }

            span:nth-child(2) {
              position: absolute;
              top: 0;
              right: 20px;
            }
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

      .transferRequestText {
        position: relative;

        &:before {
          content: '组合项目不能为空';
          color: red;
          position: absolute;
          z-index: 1;
          top: 100px;
          left: 135px;
        }
      }

      .clearfix:after {
        clear: both;
        content: '';
        display: block;
      }

      .statusCheckbox {
        margin-top: 7px;
        margin-right: 20px;
      }

      .lastOperater {
        line-height: 12px;
        padding-top: 20px;
        height: 32px;
      }
    }
  }
</style>
