<template>
  <div class="accountList-wrapper">
    <div class="accountList height100P" ref="contentTable">
      <q-table
        ref="zBaseInfoTable"
        :isSelectMode="selectMode"
        :params="paraming"
        :ifEdit="true"
        :width="1400"
        :columns="columns"
        :selectMode="selectMode"
        :data="accountList.items"
        :height="tableHeight"
        :pageInfo="pageInfo"
        :requestDataApi="getAccountList"
        :showOperateColumn="false"
        @after-request="afterRequest"
        @delete-row="delOne"
        @delete="delOne"
        @edit-row="editOne"
        @edit="editOne"
        @on-row-dbClick ="editOne"
        @getRequestParams="getRequestParams"
        @all-selection="selectChange">
      </q-table>
    </div>
    <div class="addModal" v-if="addModal">
      <Modal
        v-model="addModal"
        width="776"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            headerText="新增账号"
            :headerVal="total+1"
            @alert-retrun-num="getSort">
          </alert-header>
        </div>
        <div class="body">
          <Form ref="formCustomAdd"
            :model="formCustomAdd"
            :rules="ruleCustomAdd">
            <div class="row clearfix">
              <div class="fl">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">职员</span>
                <FormItem prop="staff_id" class="fl">
                  <Select filterable :class='{selectionRequired: isEmpty(formCustomAdd.staff_id)}' v-model="formCustomAdd.staff_id" style="width:140px;" placeholder="">
                    <Option v-for="item in staffOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="fl marginL20">
                <span class="textJustify fl lineH30 marginR10" style="width:24px;">性别</span>
                <FormItem class="fl">
                  <Select filterable disabled v-model="formCustomAdd.staff.sex" style="width:60px;" placeholder="">
                    <Option v-for="item in optionsList.sexOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="fl marginL20">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">身份证号</span>
                <FormItem class="fl">
                  <Input style="width:148px" disabled v-model.trim="formCustomAdd.staff.id_card"></Input>
                </FormItem>
              </div>
              <div class="fl marginL20">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">手机号码</span>
                <FormItem class="fl">
                  <Input style="width:113px" disabled v-model.trim="formCustomAdd.staff.mobile"></Input>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix">
              <div class="fl">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">用户名</span>
                <FormItem prop="username" class="fl">
                  <Input style="width:140px" :class='{inputRequired: isEmpty(formCustomAdd.username)}' v-model.trim="formCustomAdd.username"></Input>
                </FormItem>
              </div>
              <div class="fl marginL20">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">初始密码</span>
                <FormItem prop="init_password" class="fl">
                  <Input style="width:140px" :class='{inputRequired: isEmpty(formCustomAdd.init_password)}' v-model.trim="formCustomAdd.init_password"></Input>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix">
              <div class="fl">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">有效期至</span>
                <FormItem class="fl">
                  <DatePicker :disabled="formCustomAdd.is_permanent===1" type="date" placeholder="" style="width: 140px" v-model="formCustomAdd.validity"></DatePicker>
                </FormItem>
              </div>
              <div class="fl marginL10">
                <span class="textJustify fl lineH30" style="width:24px;">永久</span>
                <Checkbox v-model="formCustomAdd.is_permanent" :style="{margin:'6px 0'}" :true-value="1" :false-value="0"></Checkbox>
              </div>
              <div class="fl marginL20">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">权限分组</span>
                <FormItem class="fl">
                  <Select filterable multiple v-model="formCustomAdd.permission" style="width:330px">
                    <Option v-for="item in optionsList.permissionOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <span class="fl lineH30 marginL10 router" style="width:24px;" @click="toAuthorityGroup">编辑</span>
            </div>
            <div class="row clearfix">
              <div class="fl">
                <span class="textJustify fl lineH30 marginR10" style="width:49px;">Mac地址</span>
                <FormItem class="fl">
                  <Input style="width:140px" v-model.trim="formCustomAdd.mac_address"></Input>
                </FormItem>
              </div>
            </div>
            <div class="tree-wrapper">
              <div class="tree-wrapper-title">
                <span>拥有权限：<span class="authCount">已有（0）</span></span>
              </div>
              <div class="tree-control">
                <div @click="toggleAll(false)">
                  <icon  name="upDoubleArrow" class="gray"></icon>
                  <icon name="upDoubleArrowBlue" class="up blue"></icon>
                  全部收起
                </div>
                <div @click="toggleAll(true)" class="marginL15">
                  <icon name="downDoubleArrowGray" class="gray"></icon>
                  <icon name="downDoubleArrow" class="up blue"></icon>
                  全部展开
                </div>
                <div :style="{width:'210px'}">
                  <localSearchInput @search-key='getSearchWord'></localSearchInput>
                </div>
              </div>
              <div class="tree-body">
                <ZTree ref='ztree' :data="treeData" :render="renderContent" @on-check-change="onCheckChange"></ZTree>
              </div>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox v-model="formCustomAdd.status" :true-value="1" :false-value="0" class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="addModal = false">取 消</Button>
          <Button type="primary" class="fr marginR20 marginB20" @click="submitAdd()">保 存</Button>
        </div>
      </Modal>
    </div>
    <div class="addModal" v-if="editModal">
      <Modal
        v-model="editModal"
        width="776"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            headerText="编辑账号"
            :headerVal="total+1"
            @alert-retrun-num="getSort">
          </alert-header>
        </div>
        <div class="body">
          <Form ref="formCustomEdit"
            :model="formCustomAdd"
            :rules="ruleCustomAdd">
            <div class="row clearfix">
              <div class="fl">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">职员</span>
                <FormItem prop="staff_id" class="fl">
                  <Select filterable :class='{selectionRequired: isEmpty(formCustomAdd.staff_id)}' v-model="formCustomAdd.staff_id" style="width:140px;" placeholder="">
                    <Option v-for="item in staffOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="fl marginL20">
                <span class="textJustify fl lineH30 marginR10" style="width:24px;">性别</span>
                <FormItem class="fl">
                  <Select filterable disabled v-model="formCustomAdd.staff.sex" style="width:60px;" placeholder="">
                    <Option v-for="item in optionsList.sexOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="fl marginL20">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">身份证号</span>
                <FormItem class="fl">
                  <Input style="width:148px" disabled v-model.trim="formCustomAdd.staff.id_card"></Input>
                </FormItem>
              </div>
              <div class="fl marginL20">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">手机号码</span>
                <FormItem class="fl">
                  <Input style="width:113px" disabled v-model.trim="formCustomAdd.staff.mobile"></Input>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix">
              <div class="fl">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">用户名</span>
                <FormItem prop="username" class="fl">
                  <Input style="width:140px" :class='{inputRequired: isEmpty(formCustomAdd.username)}' v-model.trim="formCustomAdd.username"></Input>
                </FormItem>
              </div>
              <div class="fl marginL20">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">初始密码</span>
                <FormItem prop="init_password" class="fl">
                  <Input style="width:140px" :class='{inputRequired: isEmpty(formCustomAdd.init_password)}' v-model.trim="formCustomAdd.init_password"></Input>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix">
              <div class="fl">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">有效期至</span>
                <FormItem class="fl">
                  <DatePicker :disabled="formCustomAdd.is_permanent===1" type="date" placeholder="" style="width: 140px" v-model="formCustomAdd.validity"></DatePicker>
                </FormItem>
              </div>
              <div class="fl marginL10">
                <span class="textJustify fl lineH30" style="width:24px;">永久</span>
                <Checkbox v-model="formCustomAdd.is_permanent" :style="{margin:'6px 0'}" :true-value="1" :false-value="0"></Checkbox>
              </div>
              <div class="fl marginL20">
                <span class="textJustify fl lineH30 marginR10" style="width:48px;">权限分组</span>
                <FormItem class="fl">
                  <Select filterable multiple v-model="formCustomAdd.permission" style="width:330px">
                    <Option v-for="item in optionsList.permissionOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <span class="fl lineH30 marginL10 router" style="width:24px;" @click="toAuthorityGroup">编辑</span>
            </div>
            <div class="row clearfix">
              <div class="fl">
                <span class="textJustify fl lineH30 marginR10" style="width:49px;">Mac地址</span>
                <FormItem class="fl">
                  <Input style="width:140px" v-model.trim="formCustomAdd.mac_address"></Input>
                </FormItem>
              </div>
            </div>
            <div class="tree-wrapper">
              <div class="tree-wrapper-title">
                <span>拥有权限：<span class="authCount">已有（0）</span></span>
              </div>
              <div class="tree-control">
                <div @click="toggleAll(false)">
                  <icon  name="upDoubleArrow" class="gray"></icon>
                  <icon name="upDoubleArrowBlue" class="up blue"></icon>
                  全部收起
                </div>
                <div @click="toggleAll(true)" class="marginL15">
                  <icon name="downDoubleArrowGray" class="gray"></icon>
                  <icon name="downDoubleArrow" class="up blue"></icon>
                  全部展开
                </div>
                <div :style="{width:'210px'}">
                  <localSearchInput @search-key='getSearchWord'></localSearchInput>
                </div>
              </div>
              <div class="tree-body">
                <ZTree ref='ztree' :data="treeData" :render="renderContent" @on-check-change="onCheckChange"></ZTree>
              </div>
            </div>
            <div class="row clearfix">
              <span class="marginT15 fl marginR20">最后修改人：{{curRow?curRow.operater:''}}</span>
              <span class="marginT15 fl">最后修改时间：{{updated_at}}</span>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox v-model="formCustomAdd.status" :true-value="1" :false-value="0" class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="editModal = false">取 消</Button>
          <Button type="primary" class="fr marginR20 marginB20" @click="submitEdit()">保 存</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import fifters from '@/utils/fifters'
import helper from '@/utils/helper'
import localSearchInput from '@/components/localSearchInput'
import ZTree from '@/components/zTree'
import * as types from '@/store/modules/information/manageOffice/accountManagement/accountManagementTypes'
export default {
  name: 'accountList',
  components: {
    localSearchInput,
    ZTree,
  },
  data() {
    return {
      curRow: undefined,
      selectMode: false,
      paraming: {
        search: '',
      },
      columns: [
        {
          title: '用户名',
          key: 'username',
          align: 'center',
          ellipsis: 'true',
        },
        {
          title: '人员编号',
          key: 'staff.code',
          align: 'center',
          ellipsis: 'true',
          render: (h, params) => {
            let val = params.row.staff
            return val ? val.code : ''
          },
          titleRender: (row) => {
            let val = row.staff
            return val ? val.code : ''
          },
        },
        {
          title: '真实姓名',
          key: 'staff.name',
          align: 'center',
          ellipsis: 'true',
          render: (h, params) => {
            let val = params.row.staff
            return val ? val.name : ''
          },
          titleRender: (row) => {
            let val = row.staff
            return val ? val.name : ''
          },
        },
        {
          title: '性别',
          key: 'staff.sex',
          align: 'center',
          ellipsis: 'true',
          width: 60,
          render: (h, params) => {
            let val = params.row.staff ? params.row.staff.sex : ''
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
          titleRender: (data) => {
            let val = data.staff ? data.staff.sex : ''
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
          title: '年龄',
          key: 'staff.id_card',
          align: 'center',
          ellipsis: 'true',
          width: 60,
          render: (h, params) => {
            let val = params.row.staff ? params.row.staff.id_card : ''
            if (!val) {
              return ''
            }
            let id = val
            if (val.length === 15) {
              id = val.slice(0, 6) + '19' + val.slice(6)
            }
            let birthday = [
              id.slice(6, 10),
              id.slice(10, 12),
              id.slice(12, 14),
            ].join('-')
            return helper.getAge(birthday)
          },
          titleRender: (row) => {
            let val = row.staff ? row.staff.id_card : ''
            if (!val) {
              return ''
            }
            let id = val
            if (val.length === 15) {
              id = val.slice(0, 6) + '19' + val.slice(6)
            }
            let birthday = [
              id.slice(6, 10),
              id.slice(10, 12),
              id.slice(12, 14),
            ].join('-')
            return helper.getAge(birthday)
          },
        },
        {
          title: '手机号',
          key: 'staff.mobile',
          align: 'center',
          ellipsis: 'true',
          width: 100,
          render: (h, params) => {
            let val = params.row.staff
            return val ? val.mobile : ''
          },
          titleRender: (row) => {
            let val = row.staff
            return val ? val.mobile : ''
          },
        },
        {
          title: '创建日期',
          key: 'created_at',
          align: 'center',
          ellipsis: 'true',
          width: 100,
          render: (h, params) => {
            if (params.row.created_at) {
              return fifters.timeFilter(
                  params.row.created_at,
                  'YYYY-MM-DD'
                )
            } else {
              return ''
            }
          },
          titleRender: (row) => {
            if (row.created_at) {
              return fifters.timeFilter(
                  row.created_at,
                  'YYYY-MM-DD'
                )
            } else {
              return ''
            }
          },
        },
        {
          title: '有限期至',
          key: 'validity',
          align: 'center',
          ellipsis: 'true',
          width: 100,
          render: (h, params) => {
            if (params.row.validity) {
              return fifters.timeFilter(
                  params.row.validity,
                  'YYYY-MM-DD'
                )
            } else {
              return ''
            }
          },
          titleRender: (row) => {
            if (row.validity) {
              return fifters.timeFilter(
                  row.validity,
                  'YYYY-MM-DD'
                )
            } else {
              return ''
            }
          },
        },
        {
          width: 60,
          title: '锁定',
          key: 'is_lock',
          align: 'center',
          ellipsis: 'true',
          render: (h, params) => {
            if (params.row.is_lock === 1) {
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
              label: '锁定',
            },
            {
              value: 0,
              label: '未锁定',
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
        {
          title: '操作',
          width: 70,
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
                    width: '12px',
                    height: '13px',
                    background: 'url(' + this.editIcon + ') no-repeat',
                  },
                  on: {
                    click: (event) => {
                      event.stopPropagation()
                      if (this.selectMode) {
                        return
                      }
                      this.editOne(params.row)
                    },
                  },
                }),
              ])
          },
        },
      ],
      treeData: [
        {
          title: '所有菜单',
          level: 1,
          selected: false,
          expand: true,
          children: [
            {
              title: '检前准备',
              level: 2,
              selected: false,
              expand: true,
              checked: false,
              children: [
                {
                  title: '体检预约',
                  level: 3,
                  selected: false,
                  checked: false,
                  expand: true,
                  children: [
                    {
                      title: '前台预约',
                      level: 4,
                      selected: false,
                      checked: false,
                      expand: true,
                    },
                    {
                      title: '单位管理',
                      level: 4,
                      selected: false,
                      checked: false,
                      expand: true,
                    },
                    {
                      title: '预约管理',
                      level: 4,
                      selected: false,
                      checked: false,
                      expand: true,
                    },
                  ],
                },
                {
                  title: '前台登记',
                  level: 3,
                  selected: false,
                  checked: false,
                  expand: true,
                },
                {
                  title: '体检收费',
                  level: 2,
                  selected: false,
                  expand: true,
                  checked: false,
                  children: [],
                },
              ],
            },
            {
              title: '检前准备',
              level: 2,
              selected: false,
              expand: true,
              checked: false,
              children: [
                {
                  title: '体检预约',
                  level: 3,
                  selected: false,
                  checked: false,
                  expand: true,
                  children: [
                    {
                      title: '前台预约',
                      level: 4,
                      selected: false,
                      checked: false,
                      expand: true,
                    },
                    {
                      title: '单位管理',
                      level: 4,
                      selected: false,
                      checked: false,
                      expand: true,
                    },
                    {
                      title: '预约管理',
                      level: 4,
                      selected: false,
                      checked: false,
                      expand: true,
                    },
                  ],
                },
                {
                  title: '前台登记',
                  level: 3,
                  selected: false,
                  checked: false,
                  expand: true,
                },
                {
                  title: '体检收费',
                  level: 2,
                  selected: false,
                  expand: true,
                  checked: false,
                  children: [],
                },
              ],
            },
            {
              title: '体检',
              level: 2,
              selected: false,
              expand: true,
              checked: false,
              children: [
                {
                  title: '体检预约',
                  level: 3,
                  selected: false,
                  checked: false,
                  expand: true,
                  children: [
                    {
                      title: '前台预约',
                      level: 4,
                      selected: false,
                      checked: false,
                      expand: true,
                    },
                    {
                      title: '单位管理',
                      level: 4,
                      selected: false,
                      checked: false,
                      expand: true,
                    },
                    {
                      title: '预约管理',
                      level: 4,
                      selected: false,
                      checked: false,
                      expand: true,
                    },
                  ],
                },
                {
                  title: '前台登记',
                  level: 3,
                  selected: false,
                  checked: false,
                  expand: true,
                },
                {
                  title: '体检收费',
                  level: 2,
                  selected: false,
                  expand: true,
                  checked: false,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
      tableHeight: 400,
      pageInfo: {
        total: 0,
        current_page: 1,
        per_page: 20,
      },
      editIcon: '/static/icons/public/table-hover-edit.svg', // 编辑
      addModal: false,
      editModal: false,
      formCustomAdd: {
        username: '',
        staff_id: '',
        staff: {},
        init_password: '',
        validity: '',
        is_lock: 0,
        is_permanent: 0,
        mac_address: '',
        permission: [],
        sort: '',
        status: 0,
      },
      ruleCustomAdd: {
        username: [
          {
            validator: (rule, value, callback) => {
              if (value !== null && (value + '').length > 0) {
                callback()
              } else {
                callback(new Error('用户名不能为空'))
              }
            },
            trigger: 'blur',
          },
        ],
        init_password: [
          {
            validator: (rule, value, callback) => {
              if (value !== null && (value + '').length > 0) {
                callback()
              } else {
                callback(new Error('初始密码不能为空'))
              }
            },
            trigger: 'blur',
          },
        ],
        staff_id: [
          {
            validator: (rule, value, callback) => {
              if (typeof value === 'number') {
                callback()
              } else {
                callback(new Error('职员不能为空'))
              }
            },
          },
        ],
      },
      optionsList: {
        sexOptions: [
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
        permissionOptions: [
          {
            value: 1,
            label: '管理员',
          },
          {
            value: 2,
            label: '主检',
          },
          {
            value: 3,
            label: '采样',
          },
          {
            value: 4,
            label: '综合管理办公室',
          },
        ],
      },
    }
  },
  computed: {
    ...mapState('accountManagementModule', [
      'total',
      'accountList',
      'staffList',
    ]),
    staffOptions() {
      return this.staffList.map(item => {
        return {
          value: item.id,
          label: item.code + ' ' + item.name,
        }
      })
    },
    updated_at() {
      if (this.curRow && this.curRow.updated_at) {
        return fifters.timeFilter(this.curRow.updated_at, 'YYYY-MM-DD HH:mm')
      } else {
        return ''
      }
    },
  },
  watch: {
    windowHeight() {
      this.tableHeight = this.$refs.contentTable.offsetHeight
    },
    'formCustomAdd.staff_id'(cur) {
      let staff = this.staffList.find(item => {
        return item.id === cur
      })
      this.formCustomAdd.staff = staff || {}
    },
    'formCustomAdd.is_permanent'(cur) {
      if (cur) {
        this.formCustomAdd.validity = ''
      }
    },
  },
  methods: {
    ...mapMutations('accountManagementModule', {
      setTotal: types.SET_TOTAL,
      reset: types.RESET,
    }),
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    ...mapActions('accountManagementModule', [
      'getAccountList',
      'getStaffList',
      'addAccount',
      'updateAccount',
      'delAccount',
    ]),
    async add() {
      await Promise.all([
        this.getStaffList(
          {
            fifters: 'status:1',
            per_page: 100000,
          }
        ),
      ])
      this.formCustomAdd = {
        username: '',
        staff_id: '',
        staff: {},
        init_password: '',
        validity: '',
        is_lock: 0,
        is_permanent: 0,
        mac_address: '',
        permission: [],
        sort: '',
        status: 0,
      }
      this.addModal = true
      this.$nextTick(() => {
        this.clearTree()
      })
    },
    async submitAdd() {
      let val = await this.$refs.formCustomAdd.validate()
      if (val) {
        await this.addAccount(this.formCustomAdd)
        this.$refs.zBaseInfoTable.request()
        this.addModal = false
        this.setTotal(this.total + 1)
      }
    },
    delOne(row) {
      //
    },
    editOne(data) {
      this.curRow = data
      this.formCustomAdd = {
        username: data.username,
        staff_id: data.staff_id,
        staff: data.staff,
        init_password: data.init_password,
        validity: data.validity,
        is_lock: data.is_lock,
        is_permanent: data.is_permanent,
        mac_address: data.mac_address,
        permission: [],
        sort: data.sort,
        status: data.status,
      }
      this.editModal = true
      this.$nextTick(() => {
        this.clearTree()
      })
    },
    async submitEdit() {
      let val = await this.$refs.formCustomEdit.validate()
      if (val) {
        await this.updateAccount({
          id: this.curRow.id,
          data: this.formCustomAdd,
        })
        this.$refs.zBaseInfoTable.request()
        this.editModal = false
      }
    },
    isEmpty(value) {
      if (value === '' || (value + '').trim() === '') {
        return true
      }
      return false
    },
    getSort(value) {
      this.formCustomAdd.sort = value
    },
    afterRequest() {
      //
    },
    getRequestParams(params) {
      //
    },
    selectChange(data) {
      //
    },
    renderContent(h, {root, node, data}) {
      return h(
          'div',
        {
          class: {
            node: true,
          },
          style: {
            display: 'inline-block',
          },
        },
        [
          h(
              'span',
            {
              domProps: {
                innerText: node.node.title,
              },
              style: {
                marginRight: '20px',
              },
            }
            ),
          h(
              'Checkbox',
            {
              props: {
                value: node.node.checked,
              },
              nativeOn: {
                click: () => {
                  this.$refs.ztree.$refs.tree.handleCheck({
                    checked: !node.node.checked,
                    nodeKey: node.nodeKey,
                  })
                },
              },
            },
            ),
          h(
              'span',
            {
              domProps: {
                innerText: node.children && node.children.length > 0 ? '全选' : '',
              },
              on: {
                click: () => {
                  this.$refs.ztree.$refs.tree.handleCheck({
                    checked: !node.node.checked,
                    nodeKey: node.nodeKey,
                  })
                },
              },
            }
            ),
        ]
        )
    },
    onCheckChange(data) {
      console.log(data)
    },
    toggleAll(val) {
      this.treeData.forEach(item => {
        this.toggleNode(item, val)
      })
    },
    toggleNode(node, val) {
      node.expand = val
      if (node.children && node.children.length > 0) {
        node.children.forEach(item => {
          this.toggleNode(item, val)
        })
      }
    },
    getSearchWord(value) {
      console.log(value)
    },
    clearTree() {
      this.$refs.ztree.$refs.tree.handleCheck({
        checked: false,
        nodeKey: 0,
      })
    },
    toAuthorityGroup() {
      this.$router.push({ name: 'authorityGroup' })
      let temp = {}
      temp.name = 'authorityGroup'
      temp.title = 'authorityGroup'
      this.openPage(temp)
      this.setCurPage(temp.name)
    },
  },
  mounted() {
    this.tableHeight = this.$refs.contentTable.offsetHeight
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .accountList-wrapper{
    height: 100%;
    
    .lineH30{
      height: 30px;
      line-height: 30px;
    }

    span.textJustify{
      color: @gradeAshThree;
    }

    .addModal{
      .ivu-modal {
        height: calc(~'100% - 41px');
        max-height: 599px;
      }
      .ivu-modal-content {
        height: 100%;
      }
      .ivu-modal-body {
        height: calc(~'100% - 100px');

        .body {
          height: 100%;
          padding-bottom: 20px;

          form{
            height: 100%;
            overflow: auto;
            padding: 20px;
            padding-bottom: 0;
          }
        }

        span.router{
          cursor: pointer;
          color: @gradeBlueOne;
        }

        .clearfix:after {
          clear: both;
          content: '';
          display: block;
        }

        .tree-wrapper{
          height: 510px;
          border: 1px solid @gradeAshFour;
          border-radius: 4px;

          .tree-wrapper-title{
            padding: 5px 10px;
            span{
              color: @gradeAshTwo;
              font-size: 14px;
            }
            .authCount{
              color:#1ad4aa;
              font-weight: bold;
            }
          }
        }

        .tree-body{
          height: calc(~"100% - 50px");
          overflow: auto;

          .node>span{
            color: @gradeAshThree;
          }
          .node>span:nth-child(1){
            font-size: 14px;
            color: @gradeAshOne;
          }
        }

        .tree-control {
          display: flex;
          align-items: center;
          margin-left: 22px;
          > div {
            display: flex;
            align-items: center;
            height: 20px;
            line-height: 20px;
            width: 64px;
            color: #737373;
            cursor: pointer;
            .fa-icon {
              width: 12px;
              height: 12px;
              margin-top: 2px;
            }
            > i {
              display: inline-block;
            }
          }
          > div:last-child {
            margin-left: 18px;
          }
          > div:hover{
            color: #008cee;
          }
          > div .up{
            display: none;
          }
          > div:hover .gray{
            display: none
          }    
          > div:hover .blue{
            display: inline-block;
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

    .statusCheckbox{
      margin-right: 20px;
      margin-top: 7px;
    }
  }
</style>