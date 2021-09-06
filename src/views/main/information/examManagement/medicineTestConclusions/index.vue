/**
 * Created 张祥
 * Date: 2018/03/05
 * content:医学主检结论管理
 */
<template>
  <div class="medicine-conclusions-wrapper height100P">
    <div class="medicine-conclusions height100P padding10">
      <split-pane class="height100P contentBg" :min="22" :max="28" direction="horizontal" v-model="leftWidth">
        <!-- 左侧树状组件 -->
        <div slot="left" class="left height100P">
          <search-tree skipName='examCategory' :data="treeData" @on-select-change='treeSelectChange'></search-tree>
        </div>
        <!-- 左侧列表 -->

        <!-- 右侧主内容 -->
        <div slot="right" class="right height100P">
          <title-has-slot>
            <span slot="titletHasSlotLeftTitle">{{tableTitle}}</span>
            <div slot="titletHasSlotRightContent">
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
          <div class="table-wrapper" ref="tableWrapper">
            <q-table
              ref="table"
              :height="tableHeight"
              :params="params"
              :columns="columns"
              :data="conclusionList.items"
              :pageInfo="pageInfo"
              :requestDataApi="getConclusionList"
              :selectMode="selectMode"
              :ifEdit="true"
              @edit="editOne"
              @edit-row="editOne"
              @delete="delOne"
              @delete-row="delOne"
              @on-row-dbClick="editOne"
              @getRequestParams="getRequestParams"
              @all-selection="selectChange">
            </q-table>
          </div>
        </div>
        <!-- 右侧主内容 -->
      </split-pane>
    </div>
    <!-- 新增弹窗 -->
    <div class="add-modal" v-if="addModal">
      <Modal
        v-model="addModal"
        width="380"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            headerText="新增医学主检结论"
            :headerVal="total+1"
            @alert-retrun-num="getSort">
          </alert-header>
        </div>
        <div class="body">
          <Form ref="formCustomAdd"
            :model="formCustomAdd"
            :rules="rulesFormAdd">
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;">体检类别</span>
              <FormItem prop="pe_category_id" class="fr">
                <Select
                  filterable
                  v-model="formCustomAdd.pe_category_id"
                  style="width:256px"
                  placeholder=""
                  :class="{selectionRequired:isEmpty(formCustomAdd.pe_category_id)}">
                  <Option v-for="item in examCategoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;">结论名称</span>
              <FormItem prop="name" class="fr">
                <Input style="width:256px" :class='{inputRequired: isEmpty(formCustomAdd.name)}' v-model.trim="formCustomAdd.name"></Input>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;margin-top:3px;">结论内容</span>
              <FormItem class="fr">
                <Input style="width:256px" v-model="formCustomAdd.content" type="textarea" :row="2"></Input>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;margin-top:3px;">备注</span>
              <FormItem class="fr" :style="{marignBottom:0}">
                <Input style="width:256px;" v-model="formCustomAdd.remark" type="textarea" :row="2"></Input>
              </FormItem>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox v-model="formCustomAdd.is_default" true-value=1 false-value=0 class="statusCheckbox">是否默认</Checkbox>
          <Checkbox v-model="formCustomAdd.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="addModal = false">取 消</Button>
          <Button type="primary" class="fr marginR20 marginB20" @click="submitAdd()">保 存</Button>
        </div>
      </Modal>
    </div>
    <!-- 新增弹窗 -->

    <!-- 编辑弹窗 -->
    <div class="add-modal" v-if="editModal">
      <Modal
        v-model="editModal"
        width="380"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            headerText="编辑医学主检结论"
            :headerVal="formCustomAdd.sort"
            @alert-retrun-num="getSort">
          </alert-header>
        </div>
        <div class="body">
          <Form ref="formCustomEdit"
            :model="formCustomAdd"
            :rules="rulesFormAdd">
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;">体检类别</span>
              <FormItem prop="pe_category_id" class="fr">
                <Select
                  filterable
                  v-model="formCustomAdd.pe_category_id"
                  style="width:256px"
                  placeholder=""
                  :class="{selectionRequired:isEmpty(formCustomAdd.pe_category_id)}">
                  <Option v-for="item in examCategoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;">结论名称</span>
              <FormItem prop="name" class="fr">
                <Input style="width:256px" :class='{inputRequired: isEmpty(formCustomAdd.name)}' v-model.trim="formCustomAdd.name"></Input>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;margin-top:3px;">结论内容</span>
              <FormItem class="fr">
                <Input style="width:256px" v-model="formCustomAdd.content" type="textarea" :row="2"></Input>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl lineH30" style="width:72px;margin-top:3px;">备注</span>
              <FormItem class="fr" :style="{marignBottom:0}">
                <Input style="width:256px;" v-model="formCustomAdd.remark" type="textarea" :row="2"></Input>
              </FormItem>
            </div>
            <div class="row clearfix">
              <span class="textJustify fl marginR20">最后修改人：{{curRow?curRow.operater:''}}</span>
              <span class="textJustify fl">最后修改时间：{{updated_at}}</span>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox v-model="formCustomAdd.is_default" true-value=1 false-value=0 class="statusCheckbox">是否默认</Checkbox>
          <Checkbox v-model="formCustomAdd.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="editModal = false">取 消</Button>
          <Button type="primary" class="fr marginR20 marginB20" @click="submitEdit()">保 存</Button>
        </div>
      </Modal>
    </div>
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
  import { mapState, mapMutations, mapActions } from 'vuex'
  import fifters from '@/utils/fifters'
  import * as types from '@/store/modules/information/examManagement/medicineTestConclusions/medicineTestConclusionsTypes'
  import api from '@/api'
  import exportXlsx from '@/service/export-xlsx.js'
  export default {
    name: 'medicineTestConclusions',
    data() {
      return {
        exportParams: {
          reqParams: {},
          columns: [
            {
              title: '结论名称',
              key: 'name',
            },
            {
              title: '结论内容',
              key: 'content',
            },
            {
              title: '是否默认',
              key: 'is_default',
              render: (value) => {
                return value === 1 ? '是' : '否'
              },
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
        curType: undefined,
        tableTitle: '医学主检结论列表',
        treeData: [],
        leftWidth: 22,
        tableHeight: 400,
        selectMode: false,
        params: {
          search: '',
          filters: '',
        },
        columns: [
          {
            title: '结论名称',
            key: 'name',
            ellipsis: true,
          },
          {
            title: '结论内容',
            key: 'content',
            ellipsis: true,
          },
          {
            width: 80,
            title: '是否默认',
            key: 'is_default',
            align: 'center',
            ellipsis: 'true',
            render: (h, params) => {
              if (params.row.is_default === 1) {
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
                label: '是',
              },
              {
                value: 0,
                label: '不是',
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
        ],
        addModal: false,
        editModal: false,
        delSomeModal: false,
        delOneModal: false,
        delCounts: 0,
        selection: [],
        curRow: undefined,
        formCustomAdd: {
          pe_category_id: '',
          name: '',
          content: '',
          remark: '',
          sort: '',
          is_default: '',
          status: '0',
        },
        rulesFormAdd: {
          name: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('结论名称不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
          pe_category_id: [
            {
              validator: (rule, value, callback) => {
                if (typeof value === 'number') {
                  callback()
                } else {
                  callback(new Error('体检类别不能为空'))
                }
              },
            },
          ],
        },
        edit_items: [],
        edit_surCharges: [],
        edit_excludes: [],
      }
    },
    computed: {
      ...mapState(['windowHeight']),
      ...mapState('medicineTestConclusionsModule', [
        'total',
        'conclusionList',
        'examCategoryList',
      ]),
      pageInfo() {
        return this.conclusionList.meta
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
      ...mapMutations('medicineTestConclusionsModule', {
        setTotal: types.SET_TOTAL,
        reset: types.RESET,
      }),
      ...mapActions('medicineTestConclusionsModule', [
        'getTotal',
        'getExamCategoryList',
        'getConclusionList',
        'addConclusion',
        'updateConclusion',
        'delConclusion',
      ]),
      isEmpty(value) {
        if (value === '' || (value + '').trim() === '') {
          return true
        }
        return false
      },
      initTreeData() {
        this.treeData = [
          {
            title: '所有体检类别',
            level: 1,
            expand: true,
            children: [],
          },
        ]
        function handleNode(node, level) {
          let obj = {}
          obj.id = node.id
          obj.expand = false
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
        this.examCategoryList.forEach(item => {
          let node = handleNode(item, 2)
          this.treeData[0].children.push(node)
        })
      },
      treeSelectChange(data) {
        let node = data[0]
        switch (node.level) {
        case 1: {
          this.params.filters = ''
          this.curType = undefined
          break
        }
        case 2: {
          this.params.filters = `pe_category_id:${node.id}`
          this.curType = node
          break
        }
        default:
          console.error("filed 'level' not found")
          break
        }
      },
      async editOne(data, index) {
        await this.getExamCategoryList({
          per_page: 100000,
          filters: 'status:1',
        })
        this.curRow = data
        this.formCustomAdd = {
          pe_category_id: data.pe_category_id,
          name: data.name,
          content: data.content,
          remark: data.remark,
          sort: this.total + 1,
          is_default: data.is_default + '',
          status: data.status + '',
        }
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
        // console.log('导出')
        let _this = this
        exportXlsx('医学主检结论列表', {
          api: api.medicineTestConclusions.getConclusionList,
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
        await this.delConclusion({ ids: arr })
        this.refreshAfterDel(this.selection.length)
      },
      async submitDelOne() {
        this.delOneModal = false
        await this.delConclusion({ ids: this.curRow.id })
        this.refreshAfterDel(1)
      },
      async add() {
        await this.getExamCategoryList({
          per_page: 100000,
          filters: 'status:1',
        })
        this.formCustomAdd = {
          pe_category_id: this.curType ? this.curType.id : '',
          name: '',
          content: '',
          remark: '',
          sort: this.total + 1,
          is_default: '0',
          status: '1',
        }
        this.addModal = true
      },
      async submitAdd(data) {
        let val = await this.$refs.formCustomAdd.validate()
        if (val) {
          await this.addConclusion(this.formCustomAdd)
          this.$refs.table.request()
          this.addModal = false
          this.setTotal(this.total + 1)
        }
      },
      async submitEdit(data) {
        let val = await this.$refs.formCustomEdit.validate()
        if (val) {
          await this.updateConclusion({
            id: this.curRow.id,
            data: this.formCustomAdd,
          })
          this.$refs.table.request()
          this.editModal = false
        }
      },
      refreshAfterDel(delNum) {
        this.$refs.table.allSelection = []
        this.selection = []
        this.setTotal(this.total - delNum)
        if (this.pageInfo.total <= (this.pageInfo.page - 1) * this.pageInfo.page_size + delNum && this.pageInfo.page !== 1) {
          this.$refs.table.request({ page: this.pageInfo.page - 1 })
        } else {
          this.$refs.table.request()
        }
      },
      search(data) {
        this.params.search = data
      },
    },
    async created() {
      await Promise.all([
        this.getTotal({
          per_page: 100000,
        }),
        this.getExamCategoryList({
          per_page: 100000,
          filters: 'status:1',
        }),
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
  .medicine-conclusions-wrapper{
    .medicine-conclusions{
      .table-wrapper {
        height: calc(~'100% - 50px');
      }
    }
    .add-modal {
        .body {
          width: 100%;
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
      }
  }
</style>

  