/**
 * Created 张祥
 * Date: 2018/01/29
 * content:复查项目信息管理
 */
<template>
  <div class="rev-pro-wrapper">
    <!-- 主体 -->
    <div class="rev-pro">
      <div class="header-wrapper">
        <div class="table-header">
          <title-has-slot>
            <span slot="titletHasSlotLeftTitle">复查项目信息列表</span>
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
              <Button type="ghost" v-if="!selectMode" class="fr marginR10" @click="buttonadd" key="6">新 增</Button>
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
            :params="paraming"
            :ifEdit="true"
            :columns="columns"
            :selectMode="selectMode"
            :data="reexamItemsList.items"
            :requestDataApi="getReexamItemsList"
            :height="tableHeight"
            :pageInfo="pageInfo"
            @after-request="afterRequest"
            @delete-row="delOne"
            @delete="delOne"
            @edit-row="editOne"
            @edit="editOne"
            @on-row-dbClick="editOne"
            @getRequestParams="getRequestParams"
            @all-selection="selectChange">
          </q-table>
        </div>
      </div>
    </div>
    <!-- 主体结束 -->

    <!-- 新增 -->
    <div class="add-mode" v-if="addMode">
      <Modal
        v-model="addMode"
        width="381"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            class="add-inquiry-center"
            headerText="新增复查项目信息"
            :headerVal="total+1"
            @alert-retrun-num="getSort">
          </alert-header>
        </div>
        <div class="add-inquiry-center">
          <Form ref="formCustomAdd"
            :model="formCustomAdd"
            :rules="ruleCustomAdd">
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;">复查项目名称</span>
              <FormItem prop="group_item_id" class="fr">
                <Select
                  filterable
                  v-model="formCustomAdd.group_item_id"
                  style="width:256px"
                  placeholder=""
                  :class="{selectionRequired:isEmpty(formCustomAdd.group_item_id)}">
                  <Option v-for="item in groupItems" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;margin-top:3px;">复查项目要求</span>
              <FormItem prop="requirement" class="fr">
                <Input
                  style="width:256px"
                  :class="{inputRequired:isEmpty(formCustomAdd.requirement)}"
                  v-model="formCustomAdd.requirement"
                  type="textarea"
                  :maxlength="255"
                  :row="2"></Input>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;margin-top:3px;">备注</span>
              <FormItem class="fr marginB15" :style="{marginBottom:'0'}">
                <Input style="width:256px" v-model="formCustomAdd.remark" type="textarea" :maxlength="255" :row="2"></Input>
              </FormItem>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox v-model="formCustomAdd.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="addMode = false">取 消</Button>
          <Button type="primary" class="fr marginR20 marginB20" @click="submitAdd()">保 存</Button>
        </div>
      </Modal>
    </div>
    <!-- 新增结束 -->

    <!-- 编辑 -->
    <div class="add-mode" v-if="compileMode">
      <Modal
        v-model="compileMode"
        width="381"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            headerText="编辑复查项目信息"
            :headerVal="formCustomAdd.sort"
            @alert-retrun-num='getSort'>
          </alert-header>
        </div>
        <div class="add-inquiry-center">
          <Form ref="formCustomEdit"
          :style="{marginBottom:'0'}"
            :model="formCustomAdd"
            :rules="ruleCustomAdd">
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;">复查项目名称</span>
              <FormItem prop="group_item_id" class="fr">
                <Select
                  filterable
                  v-model="formCustomAdd.group_item_id"
                  style="width:256px"
                  placeholder=""
                  :class="{selectionRequired:isEmpty(formCustomAdd.group_item_id)}">
                  <Option v-for="item in groupItems" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;margin-top:3px;">复查项目要求</span>
              <FormItem prop="requirement" class="fr">
                <Input
                  style="width:256px"
                  :class="{inputRequired:isEmpty(formCustomAdd.requirement)}"
                  v-model="formCustomAdd.requirement"
                  type="textarea"
                  :maxlength="255"
                  :row="2">
                </Input>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;margin-top:3px;">备注</span>
              <FormItem class="fr marginB15" :style="{marginBottom:'0'}">
                <Input style="width:256px" v-model="formCustomAdd.remark" type="textarea" :maxlength="255" :row="2"></Input>
              </FormItem>
            </div>
            <div class="row clearfix lastOperater">
              <span class="textJustify fl marginR20">最后修改人：{{curRow?curRow.operater:''}}</span>
              <span class="textJustify fl">最后修改时间：{{updated_at}}</span>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox v-model="formCustomAdd.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="compileMode=false">取 消</Button>
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
  import * as types from '@/store/modules/information/examManagement/examCategory/examCategoryTypes'
  import api from '@/api'
  import exportXlsx from '@/service/export-xlsx.js'
  export default {
    name: 'revProLisReq',
    data() {
      return {
        exportParams: {
          reqParams: {},
          // reqFields: [
            // 'requirement',
            // 'remark',
            // 'status',
            // 'sort',
            // 'operater',
            // 'updated_at',
          // ],
          columns: [
            {
              key: 'group_item',
              title: '复查项目名称',
              render: (value) => {
                return value ? value.name : ''
              },
            },
            {
              title: '复查项目要求',
              key: 'requirement',
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
        selection: [],
        curRow: undefined,
        formCustomAdd: {
          group_item_id: '',
          requirement: '',
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
        pe_typeList: [
          {
            label: '健康体检类型',
            value: 1,
          },
          {
            label: '职业体检类型',
            value: 2,
          },
        ],
        ruleCustomAdd: {
          group_item_id: [
            {
              validator: (rule, value, callback) => {
                if (typeof value === 'number') {
                  callback()
                } else {
                  callback(new Error('复查项目名称不能为空'))
                }
              },
            },
          ],
          requirement: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('复查项目要求不能为空'))
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
            title: '复查项目名称',
            key: 'name',
            ellipsis: true,
            render: (h, params) => {
              return params.row.group_item && params.row.group_item.name ? params.row.group_item.name : ''
            },
          },
          {
            title: '复查项目要求',
            key: 'requirement',
            ellipsis: true,
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
                return fifters.timeFilter(params.row.updated_at, 'YYYY-MM-DD HH:mm')
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
        proTypeList: [
          {
            label: '全部',
            value: -1,
          },
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
        paraming: {
          search: '',
        },
        status: 2,
        proType: -1,
        modelDelete: false,
        rowIdArray: [],
        delCounts: 0,
        compileMode: false,
        addMode: false,
        selectMode: false,
        tableSelectData: [],
        tableHeight: 400,
      }
    },
    computed: {
      ...mapState(['windowHeight']),
      ...mapState('revProLisReqModule', ['reexamItemsList', 'total', 'groupItems']),
      pageInfo() {
        return this.reexamItemsList.meta
      },
      updated_at() {
        if (this.curRow && this.curRow.updated_at) {
          return fifters.timeFilter(this.curRow.updated_at, 'YYYY-MM-DD HH:mm')
        } else {
          return ''
        }
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
      ...mapMutations('revProLisReqModule', {
        reset: types.RESET,
        setTotal: types.SET_TOTAL,
      }),
      ...mapActions('revProLisReqModule', [
        'getReexamItemsList',
        'addReexamItems',
        'editReexamItem',
        'delReexamItems',
        'getTotal',
        'getGroupItems',
      ]),
      // ---------------搜索对话框按钮--------------
      search(data) {
        this.paraming.search = data ? data + '&search_fields=name,operater,sort,requirement,groupItem.name' : ''
      },
      // ---------------新增对话框按钮--------------
      async buttonadd() {
        this.formCustomAdd = {
          group_item_id: '',
          requirement: '',
          remark: '',
          status: '1',
          sort: this.total + 1,
        }
        await this.getGroupItems()
        this.addMode = true
      },
      async submitAdd() {
        // 新增对话框确定按钮
        let val = await this.$refs.formCustomAdd.validate()
        if (val) {
          await this.addReexamItems(this.formCustomAdd)
          this.$refs.zBaseInfoTable.request()
          this.addMode = false
          this.setTotal(this.total + 1)
        }
      },
      async submitEdit() {
        // 新增对话框确定按钮
        let val = await this.$refs.formCustomEdit.validate()
        console.log(this.formCustomAdd)
        if (val) {
          await this.editReexamItem({
            id: this.curRow.id,
            data: this.formCustomAdd,
          })
          this.$refs.zBaseInfoTable.request()
          this.compileMode = false
        }
      },
      async editOne(data, index) {
        this.curRow = data
        console.log(data)
        this.formCustomAdd = {
          group_item_id: data.group_item_id,
          sort: data.sort,
          requirement: data.requirement,
          remark: data.remark,
          status: data.status + '',
        }
        await this.getGroupItems()
        this.compileMode = true
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
        exportXlsx('复查项目信息列表', {
          api: api.revProLisReq.getReexamItems,
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
      getRequestParams(params) {
        this.exportParams.reqParams = params
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
        await this.delReexamItems({ ids: arr })
        this.refreshAfterDel(this.selection.length)
      },
      async submitDelOne() {
        this.delOneModal = false
        await this.delReexamItems({ ids: this.curRow.id })
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
          this.$refs.zBaseInfoTable.request({ page: this.pageInfo.current_page - 1 })
        } else {
          this.$refs.zBaseInfoTable.request()
        }
      },
    },
    watch: {
      windowHeight() {
        this.tableHeight = this.$refs.contentTable.offsetHeight
      },
      status(data) {
        if (data === 2) {
          this.$set(this.paraming, 'status', '')
        } else {
          this.$set(this.paraming, 'status', data)
        }
      },
      proType(data) {
        if (data === -1) {
          this.paraming.item_class = ''
        } else {
          this.paraming.item_class = data
        }
      },
      'formCustomAdd.group_item_id'(cur) {
        console.log(cur)
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
  .rev-pro-wrapper {
    position: relative;
    margin: auto;
    height: 100%;

    .rev-pro {
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

    .add-mode {
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

      .add-inquiry-center {
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
