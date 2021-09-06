/**
  *综合管理办公室   诊室管理
  * @author 刘洋
  * @created 2017/1/27
  */

<template>
  <div class="officesManagement-wrapper">
    <!-- 主体 -->
    <div class="officesManagement">
      <div class="header-wrapper">
        <div class="table-header">
          <title-has-slot>
            <span slot="titletHasSlotLeftTitle">诊室列表</span>
            <div slot="titletHasSlotRightContent" class="titlet-slot-left">
              <Button type="ghost" v-if="selectMode" class="fr " @click="selectMode=false">取 消</Button>
              <Button type="ghost" v-if="selectMode" class="fr marginR10" @click="print">打 印</Button>
              </Button
                type="success"
                v-if="selectMode"
                class="fr marginR10  delete-button"
                :disabled="selection.length===0"
                @click="deleteAllSelect()">删 除
              </Button>
              <Button type="ghost" v-if="!selectMode" class="fr " @click="selectMode=true">选 择</Button>
              <Button type="ghost" v-if="!selectMode" class="fr marginR10" @click="exportBtn" key="5">导 出</Button>
              <Button type="ghost" v-if="!selectMode" class="fr marginR10" @click="addmode">新 增</Button>
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
            :columns="columns"
            :width="1060"
            :selectMode="selectMode"
            :data="examComboList.items"
            :requestDataApi="getExamComboList"
            :height="tableHeight"
            :pageInfo="pageInfo"
            @after-request="afterRequest"
            @delete-row="delOne"
            @delete="delOne"
            @edit-row="editOne"
            @edit="editOne"
            @on-row-dbClick="editOne"
            @getRequestParams="getRequestParams"
            @copy="copy"
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
        width="476"
        height="376"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            headerText="新增诊室"
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
                <span class="textJustify lineH30 fl marginR10" style="width:48px;">诊室名称</span>
                <FormItem prop="name" class="fl">
                  <Input style="width:176px" :class='{inputRequired: isEmpty(formAdd.name)}' v-model.trim="formAdd.name"></Input>
                </FormItem>
              </div>
              <div class="item fr">
                <span class="textJustify lineH30 fl marginR10" style="width:65px;">适用性别</span>
                <FormItem prop="sex" class="fl">
                  <Select
                    filterable
                    v-model="formAdd.sex"
                    style="width:112px;"
                    placeholder=""
                    :class="{selectionRequired:isEmpty(formAdd.sex)}">
                    <Option v-for="item in targetList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>

            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify lineH30 fl marginR10" style="width:48px">所属科室</span>
                <FormItem prop="dept_id" class="fl">
                  <Select
                    filterable
                    v-model="formAdd.dept_id"
                    style="width:176px;"
                    placeholder=""
                    :class="{selectionRequired:isEmpty(formAdd.dept_id)}">
                    <Option v-for="item in standard_name_Option" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="item fr">
                <span class="textJustify lineH30 fl marginR10" style="width:65px;">对应排队机</span>
                <FormItem prop="line_up_machine_id" class="fl">
                  <Select
                    filterable
                    v-model="formAdd.line_up_machine_id"
                    style="width:112px;"
                    placeholder="">
                    <Option v-for="item in getlineUpMachine_name_Option" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix">
              <span class="textJustify lineH30 fl marginR10" style="width:48px;margin-top:3px;">位置名称</span>
                  <FormItem prop="floor_id" class="fl">
                    <Cascader
                      style="width:378px"
                      :data="floorOptions"
                      change-on-select
                      filterable
                      v-model="formAdd.floor_id"  >
                    </Cascader>
                  </FormItem>
            </div>

            <div class="row ">
              <span class="textJustify fl lineH30 marginR10" style="width:48px;margin-top:3px;">备注</span>
              <FormItem class="fl">
                <Input style="width:378px" v-model="formAdd.remark" type="textarea" :maxlength="255" :row="2"></Input>
              </FormItem>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox v-model="formAdd.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="addModal = false">取 消</Button>
          <Button class="fr marginR20 marginB20" @click="submitAdd()">保 存</Button>
        </div>
      </Modal>
    </div>
    <!-- 新增结束 -->

    <!-- 编辑 -->
    <div class="add-modal" v-if="editModal">
      <Modal
        v-model="editModal"
        width="476"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            headerText="编辑诊室"
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
                <span class="textJustify lineH30 fl marginR10" style="width:48px;">诊室名称</span>
                <FormItem prop="name" class="fl">
                  <Input style="width:176px" :class='{inputRequired: isEmpty(formAdd.name)}' v-model.trim="formAdd.name"></Input>
                </FormItem>
              </div>
              <div class="item fr">
                <span class="textJustify lineH30 fl marginR10" style="width:65px;">适用性别</span>
                <FormItem prop="sex" class="fl">
                  <Select
                    filterable
                    v-model="formAdd.sex"
                    style="width:112px;"
                    placeholder=""
                    :class="{selectionRequired:isEmpty(formAdd.sex)}">
                    <Option v-for="item in targetList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>

            <div class="row clearfix">
             <div class="item fl">
                <span class="textJustify lineH30 fl marginR10" style="width:48px">所属科室</span>
                <FormItem prop="dept_id" class="fl">
                  <Select
                    filterable
                    v-model="formAdd.dept_id"
                    style="width:176px;"
                    placeholder=""
                    :class="{selectionRequired:isEmpty(formAdd.dept_id)}">
                    <Option v-for="item in standard_name_Option" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="item fr">
                <span class="textJustify lineH30 fl marginR10" style="width:65px;">对应排队机</span>
                <FormItem prop="line_up_machine_id" class="fl">
                  <Select
                    filterable
                    v-model="formAdd.line_up_machine_id"
                    style="width:112px;"
                    placeholder="">
                    <Option v-for="item in getlineUpMachine_name_Option" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>

             <div class="row clearfix">
              <span class="textJustify lineH30 fl marginR10" style="width:48px;margin-top:3px;">位置名称</span>
                <FormItem prop="floor_id" class="fl">
                    <Cascader
                      style="width:378px"
                      :data="floorOptions"
                      change-on-select
                      filterable
                      v-model="formAdd.floor_id"  >
                    </Cascader>
                  </FormItem>
            </div>

            <div class="row clearfix">
              <span class="textJustify fl lineH30 marginR10" style="width:48px;margin-top:3px;">备注</span>
              <FormItem class="fl">
                <Input style="width:378px" v-model="formAdd.remark" type="textarea" :maxlength="255" :row="2"></Input>
              </FormItem>
            </div>

            <div class="row clearfix ">
              <span class="fl marginR20">最后修改人：{{curRow?curRow.operater:''}}</span>
              <span class="fl">最后修改时间：{{updated_at}}</span>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox v-model="formAdd.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="editModal = false">取 消</Button>
          <Button class="fr marginR20 marginB20" @click="submitEdit()">保 存</Button>
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
  import * as types from '@/store/modules/information/manageOffice/officesManagement/officesManagementTypes'
  import api from '@/api'
  // import _ from 'lodash'
  import exportXlsx from '@/service/export-xlsx.js'
  export default {
    name: 'officesManagement',
    data() {
      return {
        objData: {},
        DDD: [],
        exportParams: {
          reqParams: {},
          columns: [
            {
              title: '诊室名称',
              key: 'name',
            },
            {
              title: '所属科室',
              key: 'dept',
              render: (value) => {
                if (value) {
                  return value.name
                }
              },
            },
            {
              title: '位置名称',
              key: 'floors',
              render: (value) => {
                if (value) {
                  return value.map(item => {
                    return item.name
                  }).join('-')
                }
              },
            },
            {
              title: '对应排队机',
              key: 'line_up_machine',
              render: (value) => {
                if (value) {
                  return value.name
                }
              },
            },
            {
              title: '适用性别',
              key: 'sex',
              render: (value) => {
                if (value === 0) {
                  return '通用'
                }
                if (value === 1) {
                  return '男'
                }
                if (value === 2) {
                  return '女'
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
              render: value => {
                if (value) {
                  return fifters.timeFilter(value, 'YYYY-MM-DD HH:mm')
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
            },
          ],
        },
        canAdd: true,
        group_item_ids: [],
        delSomeModal: false,
        delOneModal: false,
        selection: [],
        curRow: undefined,
        formAdd: {
          name: '',
          sex: '',
          dept_id: '',
          remark: '',
          status: '0',
          sort: 0,
          line_up_machine_id: '',
          floor_id: [],
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
                  callback(new Error('诊室名称不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
          dept_id: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('所属科室不能为空'))
                }
              },
            },
          ],
          // line_up_machine_id: [
          //   {
          //     validator: (rule, value, callback) => {
          //       if (value !== null && (value + '').length > 0) {
          //         callback()
          //       } else {
          //         callback(new Error('对应排队机不能为空'))
          //       }
          //     },
          //   },
          // ],
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
        },
        urlSuccess: '/static/icons/public/enabledState.svg',
        urlRemark: '/static/icons/public/remarkInCell.svg',
        columns: [
          {
            title: '诊室名称',
            key: 'name',
            ellipsis: true,
            // minWidth: 190,
          },
          {
            title: '所属科室',
            key: 'dept_id',
            // minWidth: 130,
            render: (h, params) => {
              if (params.row && params.row.dept) {
                return params.row.dept.name
              }
            },
            titleRender: (data) => {
              return data.dept ? data.dept.name : ''
            },
          },
          {
            title: '位置名称',
            key: 'floor_id',
            ellipsis: true,
            // minWidth: 130,
            render: (h, params) => {
              if (params.row && params.row.floors) {
                return params.row.floors.map(item => {
                  return item.name
                }).join('-')
              }
            },
            titleRender: (data) => {
              if (data && data.floors) {
                return data.floors.map(item => {
                  return item.name
                }).join('-')
              }
            },
          },
          {
            title: '对应排队机',
            key: 'line_up_machine_id',
            ellipsis: true,
            // minWidth: 130,
            render: (h, params) => {
              if (params.row && params.row.line_up_machine) {
                return params.row.line_up_machine.name
              }
            },
            titleRender: (data) => {
              return data.line_up_machine ? data.line_up_machine.name : ''
            },
          },
          {
            title: '适用性别',
            key: 'sex',
            ellipsis: true,
            // minWidth: 130,
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
            titleRender: (data) => {
              let val = data.sex
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
            ellipsis: true,
            render: (h, params) => {
              if (params.row.status === 1) {
                return h('status-in-table')
              }
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
      ...mapState('officesManagementModule', [
        'examComboList',
        'total',
        'examCategoryList',
        'allPeItemType',
        'allPro',
        'getAdministrativeOfficesManagements',
        'getlineUpMachine',
        'getFloors',
      ]),
      // getFloors(data) {
      //   console.log(data)
      // },
      pageInfo() {
        return this.examComboList.meta
      },
      floorIds() {
        this.objData.floors.forEach(item => {
          var arr = []
          if (item.parent_id) {
            arr.unshift(item.parent_id)
            item.forEach(itemTwo => {
              if (itemTwo.parent_id) {
                arr.unshift(itemTwo.parent_id)
              }
            })
          }
          return arr
        })
      },

      updated_at() {
        if (this.curRow && this.curRow.updated_at) {
          return fifters.timeFilter(this.curRow.updated_at, 'YYYY-MM-DD HH:mm')
        } else {
          return ''
        }
      },
      standard_name_Option() {
        let arr = []
        this.getAdministrativeOfficesManagements.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
      },
      getlineUpMachine_name_Option() {
        let arr = []
        this.getlineUpMachine.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
      },
      getFloors_name_Option() {
        let arr = []
        this.getFloors.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
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
      floorOption() {
        let arr = []
        if (this.getFloors) {
          arr = JSON.parse(JSON.stringify(this.getFloors))
        }
        function parseFloor(floor) {
          floor.value = floor.id
          floor.label = floor.name
          if (floor.children && floor.children.length > 0) {
            floor.children.forEach(item => {
              parseFloor(item)
            })
          }
        }
        arr.forEach(floor => {
          parseFloor(floor)
        })
        return arr

        // let arr = []
        // if (this.getFloors) {
        //   arr = JSON.parse(JSON.stringify(this.getFloors))
        // }
        // function parseFloor(floor) {
        //   floor.value = floor.id
        //   floor.label = floor.name
        //   if (floor.children && floor.children.length > 0) {
        //     floor.children.forEach(item => {
        //       parseFloor(item)
        //     })
        //   }
        // }
        // arr.forEach(floor => {
        //   parseFloor(floor)
        // })
        // return arr
      },
      floorOptions() {
        let arr = []
        if (this.getFloors) {
          arr = JSON.parse(JSON.stringify(this.getFloors))
        }
        function parseFloor(floor) {
          floor.value = floor.id
          floor.label = floor.name
          if (floor.children && floor.children.length > 0) {
            floor.children.forEach(item => {
              parseFloor(item)
            })
          }
        }
        arr.forEach(floor => {
          parseFloor(floor)
        })
        return arr

        // let arr = []
        // if (this.getFloors) {
        //   arr = JSON.parse(JSON.stringify(this.getFloors))
        // }
        // function parseFloor(floor) {
        //   floor.value = floor.id
        //   floor.label = floor.name
        //   if (floor.children && floor.children.length > 0) {
        //     floor.children.forEach(item => {
        //       parseFloor(item)
        //     })
        //   }
        // }
        // arr.forEach(floor => {
        //   parseFloor(floor)
        // })
        // return arr
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
      ...mapMutations('officesManagementModule', {
        reset: types.RESET,
        setTotal: types.SET_TOTAL,
      }),
      ...mapActions('officesManagementModule', [
        'getExamComboList',
        'addExamCom',
        'modifyExamCom',
        'delExamCom',
        'getTotal',
        'getExamCategoryList',
        'getPeItemTypes',
        'getAllPro',
        'getAdministrativeOfficesManagement',
        'getlineUpMachines',
        'getFloor',
      ]),
      search(data) {
        this.params.search = data
      },
      getDates(data) {
        this.params.search = data
      },
      getRequestParams(params) {
        this.exportParams.reqParams = params
        console.log(this.exportParams.reqParams)
        // api.getExamCategoryList()
      },
      exportBtn() {
        // console.log('导出')
        let _this = this
        exportXlsx('诊室管理', {
          api: api.officesManagement.getExamComboList,
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
        if (this.formAdd.pe_categories.length === this.getAdministrativeOfficesManagements.length) {
          this.formAdd.pe_categories = []
        } else {
          this.formAdd.pe_categories = this.getAdministrativeOfficesManagements.map(item => {
            return item.id
          })
        }
        this.$refs.selecter.$refs.dropdown.update()
      },
      async addmode() {
        await Promise.all([
          this.getAdministrativeOfficesManagement({per_page: 100000}),
          this.getFloor({per_page: 100000, filters: 'isTree:1'}),
          this.getlineUpMachines({per_page: 100000}),
        ])
        // let arr = []
        // for (let item of this.getFloors) {
        //   arr.push(item.id)
        // }

        // this.add.formData.floor_id = _.cloneDeep(arr)
        // let obj = JSON.parse(JSON.stringify(this.formAdd))
        // obj.floor_id = this.formAdd.floor_id.length > 0 ? this.formAdd.floor_id[this.formAdd.floor_id.length - 1] : ''
        this.formAdd = {
          name: '',
          sex: '',
          remark: '',
          status: '1',
          sort: this.total + 1,
          dept_id: '',
          line_up_machine_id: '',
          floor_id: [],
        }
        this.addModal = true
      },
      async submitAdd() {
        // 新增对话框确定按钮
        let val = await this.$refs.formAdd.validate()
        if (val) {
          let obj = JSON.parse(JSON.stringify(this.formAdd))
          obj.floor_id = this.formAdd.floor_id.length > 0 ? this.formAdd.floor_id[this.formAdd.floor_id.length - 1] : ''
          await this.addExamCom(obj)
          this.$refs.zBaseInfoTable.request()
          this.addModal = false
          this.setTotal(this.total + 1)
        }
      },
      async submitEdit() {
        // 新增对话框确定按钮
        let val = await this.$refs.formEdit.validate()
        if (val) {
          let obj = JSON.parse(JSON.stringify(this.formAdd))
          obj.floor_id = this.formAdd.floor_id.length > 0 ? this.formAdd.floor_id[this.formAdd.floor_id.length - 1] : ''
          await this.modifyExamCom({ id: this.curRow.id, data: obj })
          this.$refs.zBaseInfoTable.request()
          this.editModal = false
        }
      },
      async editOne(data, index) {
        await Promise.all([
          this.getAdministrativeOfficesManagement({per_page: 100000}),
          this.getFloor({per_page: 100000, filters: 'isTree:1'}),
          this.getlineUpMachines({per_page: 100000}),
        ])
        let floorIdArr = data.floors.map(item => {
          return item.id
        })
        this.curRow = data
        this.formAdd = {
          name: data.name,
          sex: data.sex,
          remark: data.remark,
          status: data.status + '',
          sort: data.sort,
          dept_id: data.dept_id,
          line_up_machine_id: data.line_up_machine_id,
          floor_id: floorIdArr,
        }
        this.editModal = true
      },
      async copy(data, index) {
        await this.getAdministrativeOfficesManagement()
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
          sex: data.sex,
          remark: data.remark,
          status: data.status + '',
          sort: data.sort,
          dept_id: data.dept_id,
          line_up_machine_id: data.line_up_machine_id,
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
      },
      inputPrice() {
        this.watchDiscount = false
        this.watchPrice = true
      },
      getSourceSelectRow(row) {
  //
      },
    },
    watch: {
      windowHeight() {
        this.tableHeight = this.$refs.contentTable.offsetHeight
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
  .officesManagement-wrapper {
    position: relative;
    margin: auto;
    height: 100%;

    // .ivu-modal {
    //   height: calc(~'100% - 100px');
    // }
    // .ivu-modal-content {
    //   height: 100%;
    // }
    // .ivu-modal-body {
    //   height: calc(~'100% - 100px');

    //   .body {
    //     height: 100%;
    //     overflow: auto;
    //   }
    // }

    .officesManagement {
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
