/**
* Created 刘洋
* Update xk
* Date: 2017/1/18
* Time: 10:00
* content: 工种管理
*/
<template>
  <div class="trade-management-wrapper">
    <!-- 主体开始 -->
    <div class="trade-management-contet">
      <div class="header-wrapper">
        <title-has-slot>
          <span slot="titletHasSlotLeftTitle">工种管理</span>
          <div slot='titletHasSlotRightContent'>
            <div class="table-header-content">
              <!-- <span class="marginR10">启用状态</span>
              <Select class="marginR20 status" v-model="tradeListStatus"  @on-change="tradeStatusChange">
                <Option value="all">全部</Option>
                <Option :value="1">启用</Option>
                <Option :value="0">未启用</Option>
              </Select> -->
              <search-input searText="请输入搜索内容"
                            :searchWidth="220"
                            @on-enter="serrchCompany"
                            @on-Icon="serrchCompany"
                            @on-cancel="serrchCompany">
              </search-input>
              <template v-if="!isSelectMode">
                <Button type="ghost"
                          class="marginR10"
                          @click="appendButton"
                          key="add">新 增</Button>
                <Button type="ghost"
                          class="marginR10"
                          @click="exportBtn"
                          key="output">导 出</Button>
                <Button type="ghost"
                          @click="seletButton"
                          key="select">选 择</Button>
              </template>
              <template v-else>
                <Button type="success"
                          class="marginR10"
                          :disabled="tableSelectData.length===0"
                          @click="deleteButton"
                          key="del">删 除</Button>
                <Button type="primary"
                          @click="cancelButton"
                          key="cancel">取 消</Button>
              </template>
            </div>
          </div>
        </title-has-slot>
        <div class="tradeListTable"
             ref="content">
          <q-table ref="zBaseInfoTable"
                   :ifEdit="true"
                   :selectMode="isSelectMode"
                   :data="occupTypesAllList.items"
                   :columns="columns"
                   :pageInfo="pageInfo"
                   :params="params"
                   :height="tableHeight"
                   :width="700"
                   :requestDataApi="getOccupTypesList"
                   @delete="delImg"
                   @delete-row="delImg"
                   @edit-row="editRow"
                   @after-request="afterRequest"
                   @edit="editRow"
                   @on-selection-change="onSelectionChange"
                   @on-row-dbClick="editRow" @getRequestParams="getRequestParams">
          </q-table>
        </div>
      </div>
    </div>
    <!-- 主体结束 -->
    <!-- 新增开始 -->
    <div class="add-model-class"
         v-if="addModel">
      <Modal v-model="addModel"
             width="352"
             height="246"
             :transfer="false"
             :closable="false"
             :mask-closable="false"
             :transition-names="['']">
        <div slot="header">
          <alert-header :headerText="headerTexadd"
                        :headerVal="valueAddHeaderVal"
                        @alert-retrun-num="alertRetrunNumAdd">
          </alert-header>
        </div>
        <div class="formCustomAdd">
          <Form ref="formCustomAddForm"
                :model="formCustomAdd"
                :rules="ruleCustomAdd"
                :label-width="60">
            <div class="row">
              <FormItem label="工种代码"
                        prop="modeNumber"
                        class="modal-form-row">
                <!-- <Input type="text"  v-model.trim="formCustomAdd.modeNumber" disabled></Input> -->
                <Input type="text"
                       v-model.trim="formCustomAdd.modeNumber"
                       disabled></Input>
              </FormItem>
            </div>
            <div class="row marginL20"
                 style="marginTop:-20px;marginBottom:-20px;">
              <FormItem label="工种名称"
                        prop="modeName">
                <select-input v-model="formCustomAdd.nomeName"
                              :class='{inputVerificationTs: isEmpty(formCustomAdd.modeName)}'
                              style="width:250px"
                              :data="occupTypesAll"
                              @input="addFormInputName"
                              @getSelect="addFormInputSelect"></select-input>
                <!-- <AutoComplete
                    style="width:250px"
                    :class='{inputVerificationTs: isEmpty(formCustomAdd.modeName)}'
                    :data="occupTypesAllSimple"
                    @on-change="addOccupTypeChange"
                    :filter-method="addOccupTypeFilter"
                    v-model="formCustomAdd.modeName">
                    <Option v-for="(item,index) in occupTypesAllSimple" :value="item" :key="index">{{item}}</Option>
                  </AutoComplete> -->
                <!-- <Select filterable    @on-change="addOccupTypeChange()">
                    <Option @click.native="formOptionClick(item)" v-for="(item,index) in occupTypesAll" :value="item.code" :key="item.id">{{item.name}}</Option>
                  </Select> -->
              </FormItem>
            </div>
            <div class="form-row marginT20">
              <span class="textJustify"
                    style="width:60px">备注</span>
              <Input v-model="formCustomAdd.remark"
                     type="textarea"
                     class="marginL15 marginR20"></Input>
            </div>
          </Form>
        </div>
        <div slot="footer">
          <div class="bottom">
            <Checkbox v-model="formCustomAdd.status">启用</Checkbox>
            <Button type="primary"
                    class="marginR20"
                    @click="saveButton('formCustomAddForm')">保 存</Button>
            <Button type="ghost"
                    class="marginR20"
                    @click="buttonAddCont()">取 消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!-- 新增结束 -->

    <!-- 编辑开始 -->
    <div class="add-model-class">
      <Modal v-model="compileModel"
             width="352"
             height="246"
             :transfer="false"
             :closable="false"
             :mask-closable="false"
             :transition-names="['']">
        <div slot="header">
          <alert-header :headerText="headerTexCompile"
                        :headerVal="valueCompileHeaderVal"
                        @alert-retrun-num="alertRetrunNumEdit">
          </alert-header>
        </div>
        <div class="formCustomAdd">
          <Form ref="formCustomEditForm"
                :model="formCustomEdit"
                :rules="ruleCustomAdd"
                :label-width="60">
            <div class="row ">
              <FormItem label="工种代码"
                        prop="modeNumber"
                        class="modal-form-row">
                <Input type="text"
                       v-model="formCustomEdit.modeNumber"
                       disabled></Input>
              </FormItem>
            </div>
            <!-- <div class="row marginL20" style="marginTop:-20px;marginBottom:-20px;">
               <FormItem label="工种名称" prop="modeName">
                <Input type="text" style="width:270px" :class='{inputVerificationTs: isEmpty(formCustomAdd.modeName)}' v-model.trim="formCustomAdd.modeName"></Input>
              </FormItem>
            </div> -->
            <div class="row marginL20"
                 style="marginTop:-20px;marginBottom:-20px;">
              <FormItem label="工种名称"
                        prop="modeName">
                        <Input :class='{inputVerificationTs: isEmpty(formCustomEdit.modeName)}' style="width:250px" v-model="formCustomEdit.modeName"></Input>
                <!-- <select-input :class='{inputVerificationTs: isEmpty(formCustomEdit.modeName)}'
                              style="width:250px"
                              v-model="formCustomEdit.modeName"
                              :data="occupTypesAll"
                              @input="editFormInputName"
                              @getSelect="editFormInputSelect"></select-input> -->

                <!-- <Select filterable v-model="formCustomEdit.modeName" style="width:250px" :class='{selectVerificationTs: isEmpty(formCustomEdit.modeName)}' @on-change="editOccupTypeChange">
                    <Option v-for="(item,index) in occupTypesAll" :value="index" :key="item.id">{{item.name}}</Option>
                </Select> -->
              </FormItem>
            </div>
            <div class="form-row marginT20">
              <span class="textJustify"
                    style="width:60px">备注</span>
              <Input v-model="formCustomEdit.remark"
                     type="textarea"
                     class="marginL15 marginR20"></Input>
            </div>
          </Form>
          <div class="row time marginL20">
            <span style="width:109px">最后修改人： {{finallyPerson}}</span>
            <span class="marginL20">最后修改时间： {{finallyTime}}</span>
          </div>
        </div>
        <div slot="footer">
          <div class="bottom">
            <Checkbox v-model="formCustomEdit.status">启用</Checkbox>
            <Button type="primary"
                    class="marginR20"
                    @click="saveCompileButton('formCustomEdit')">保 存</Button>
            <Button type="ghost"
                    class="marginR20"
                    @click="buttonCompileCont()">取 消</Button>
          </div>
        </div>
      </Modal>

    </div>
    <!-- 编辑结束 -->

    <!-- 删除多个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delSomeModal"
                        :delCounts="delCounts"
                        @delCancel="delSomeModal=false"
                        @affirmDel="submitDelSome">
      </affirm-del-modal>
    </div>
    <!-- 删除多个弹窗 -->

    <!-- 删除1个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delOneModal"
                        :delCounts="1"
                        @delCancel="delOneModal=false"
                        @affirmDel="submitDelOne">
      </affirm-del-modal>
    </div>
    <!-- 删除1个弹窗 -->
  </div>

</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import * as types from '@/store/modules/information/industryBaseInfoManagement/tradeManagement/tradeManagementTypes'
import exportXlsx from '@/service/export-xlsx.js'
import api from '@/api'
import moment from 'moment'
import filters from '@/utils/fifters'

// import selectInput from '@/components/selectinput'
export default {
  name: 'tradeManagement',
  // components: {
  //   selectInput,
  // },
  data() {
    // const validateName = (rule, value, callback) => {
    //   if (value === 0 || value === '') {
    //     return callback()
    //   }
    //   if (!value) {
    //     return callback(new Error('工种名称不能是空'))
    //   } else {
    //     callback()
    //   }
    // }
    const nameValidator = (rule, value, callback) => {
      if (value.toString().length <= 0) {
        callback(new Error('工种名称不能为空'))
      } else {
        // this.$refs.formCustomAddForm.validateField('modeName')
        callback()
      }
    }
    return {
      exportParams: {
        reqParams: {},
        columns: [
          {
            title: '工种名称',
            key: 'name',

          },
          {
            title: '工种代码',
            key: 'code',

          },
          {
            title: '备注',
            minWidth: 50,
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
            ellipsis: 'true',

            render: (value) => {
              if (value) {
                return moment(parseInt(value * 1000)).format('YYYY-MM-DD H:mm')
              } else {
                return ''
              }
            },
            titleRender: (data) => {
              if (data.updated_at) {
                return filters.timeFilter(
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
      // 启用状态筛选
      tradeListStatus: 'all',
      // 启用icon
      urlImg: '/static/icons/public/enabledState.svg',
      // 备注icon
      remarkIcon: '/static/icons/public/remarkInCell.svg',
      arr: [],
      curRow: undefined,
      delSomeModal: false,
      delOneModal: false,
      rowArrayId: [],
      addModel: false,
      compileModel: false,
      deleteModel: false,
      tableHeight: 400,
      delCounts: 0,
      finallyPerson: '',
      finallyTime: '',
      params: {
        key: '',
        code: '',
        status: '',
      },
      headerTexadd: '新增工种',
      headerTexCompile: '编辑工种',
      valueAddHeaderVal: 0,
      valueCompileHeaderVal: 0,
      isSelectMode: false,
      tableSelectData: [],
      // 新增表单对象
      formCustomAdd: {
        modeNumber: '',
        modeName: '',
        remark: '',
        status: true,
      },
      // 编辑表对象
      formCustomEdit: {
        modeNumber: '',
        modeName: '',
        remark: '',
        status: true,
      },
      param: {},
      ruleCustomAdd: {
        modeName: [
          {
            validator: nameValidator,
            // required: true,
            message: '工种名称为必填',
            trigger: 'blur',
          },
        ],
      },
      columns: [
        {
          title: '工种名称',
          key: 'name',
          align: 'center',
          ellipsis: 'true',
          // minWidth: 320,
        },
        {
          title: '工种代码',
          key: 'code',
          align: 'center',
          ellipsis: 'true',
          // minWidth: 215,
        },
        // {
        //   title: '工种编号',
        //   key: 'code',
        //   align: 'center',
        //   ellipsis: 'true',
        //   minWidth: 271,
        // },
        {
          title: '备注',
          width: 60,
          key: 'remark',
          render: (h, params) => {
            let val = params.row.remark
            if (val) {
              return h('remark-in-table', {
                props: {
                  text: val,
                },
              })
            }
          },
        },
        {
          title: '启用',
          width: 60,
          key: 'status',
          align: 'center',
          ellipsis: 'true',
          filterType: 'type',
          filterOptions: [
            {
              label: '启用',
              value: 1,
            },
            {
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
          align: 'center',
          ellipsis: 'true',
          width: 70,
        },
        {
          title: '最后修改人',
          width: 90,
          key: 'operater',
          ellipsis: 'true',
          // render: (h, p) => {
          //   return h('span', {}, [p.row.operater.realname])
          // },
        },
        {
          title: '最后修改时间',
          key: 'updated_at',
          filterType: 'date',
          ellipsis: 'true',
          width: 130,
          render: (h, p) => {
            return h('span', {}, [
              filters.timeFilter(p.row.updated_at, 'YYYY-MM-DD HH:mm'),
            ])
          },
        },
      ],
    }
  },
  computed: {
    ...mapState(['windowHeight']),
    ...mapState('tradeManagementModule', [
      'occupTypesAllList',
      'occupTypesAll',
    ]),
    ...mapGetters('tradeManagementModule', ['occupTypesAllSimple']),
    pageInfo() {
      return this.occupTypesAllList.meta
    },
  },
  async created() {
    await this.getOccupTypesList()
    this.totalSize = this.occupTypesAllList.meta.total
    await this.getOccupAllTypes()
  },
  watch: {
    windowHeight() {
      this.tableHeight = this.$refs.content.offsetHeight
    },
  },
  destroyed() {
    this.reset()
  },
  methods: {
    ...mapMutations('tradeManagementModule', {
      reset: types.RESET,
    }),
    ...mapActions('tradeManagementModule', [
      'addOccupTypesList',
      'updateOccupTypesList',
      'delOccupTypesList',
      'getOccupTypesList',
      'getOccupAllTypes',
    ]),
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('工种管理', {
        api: api.tradeManagement.getOccupTypesList,
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
    addFormInputSelect(data) {
      this.formCustomAdd.modeNumber = data.code
    },
    addFormInputName(val) {
      this.formCustomAdd.modeName = val
    },
    editFormInputSelect(data) {
      // console.log(1)
      this.formCustomEdit.modeNumber = data.code
    },
    editFormInputName(val) {
      this.formCustomEdit.modeName = val
    },
    addOccupTypeFilter(value, option) {
      // console.log('val', value, 'opt', option)
      return option.indexOf(value) !== -1
      // for (let i = 0; i++; i < this.occupTypesAll.length) {
      // }
      // for (let item of this.occupTypesAll) {
      //   console.loe9
      //   return item.indexOf(value) !== -1
      // }
    },
    formOptionClick(data) {
      // console.log('sdf', data)
    },
    // 添加工种下拉change
    addOccupTypeChange(data) {
      // console.log('change', this.occupTypesAllSimple)
      this.formCustomAdd.modeName = data
      // this.formCustomAdd.modeNumber = this.occupTypesAll[index].code
      // this.formCustomAdd.modeName = this.occupTypesAll[index].name
    },
    editOccupTypeChange(index) {
      // console.log('kk', this.occupTypesAll[index])
      // this.formCustomAdd.modeNumber = this.occupTypesAll[index].code
      this.formCustomAdd.modeName = this.occupTypesAll[index].name
    },
    // 状态更改
    tradeStatusChange(data) {
      if (data === 'all') {
        this.$set(this.params, 'status', '')
      } else {
        this.$set(this.params, 'status', Number(data))
      }
    },
    // 验证输入框是否为空显示提示信息
    isEmpty(data) {
      if (data === '' || data === undefined) {
        return true
      } else {
        return false
      }
    },
    serrchCompany(data) {
      // 搜索

      // let searchValue = data ? data + '&search_fields=sex,code,remark,status,sort,operater,updated_at,name' : ''
      let searchValue = data || ''
      if (data) {
        this.$set(this.params, 'search', searchValue)
      } else {
        this.$set(this.params, 'search', '')
      }

      // this.params.search = data
    },
    alertRetrunNumAdd(data) {
      // 保存按钮显示顺序的回调
      // console.log('return ', data)
      this.valueAddHeaderVal = data
    },
    alertRetrunNumEdit(data) {
      // 保存按钮显示顺序的回调
      // console.log('return ', data)
      this.valueCompileHeaderVal = data
    },
    seletButton() {
      // 选择按钮
      this.isSelectMode = true
      this.arr = []
      this.$refs.zBaseInfoTable.allSelection = []
    },
    cancelButton() {
      // 取消按钮
      this.isSelectMode = false
      this.arr = []
      this.$refs.zBaseInfoTable.allSelection = []
    },
    appendButton() {
      this.formCustomAdd.modeNumber = ''
      this.formCustomAdd.modeName = ''
      this.formCustomAdd.remark = ''
      this.formCustomAdd.status = true
      this.valueAddHeaderVal = this.occupTypesAllList.meta.total + 1
      this.addModel = true
      // console.log(this.formCustomAdd)
    },
    buttonAddCont() {
      // 新增弹框的取消按钮
      this.addModel = false
    },
    async saveButton(data) {
      // 新增弹框的保存按钮
      // TODO: 验证无效
      let val = await this.$refs.formCustomAddForm.validate()
      console.log('表单值', val)
      if (val) {
        try {
          await this.addOccupTypesList({
            name: this.formCustomAdd.modeName,
            sort: this.valueAddHeaderVal,
            remark: this.formCustomAdd.remark,
            code: this.formCustomAdd.modeNumber,
            status: Number(this.formCustomAdd.status),
          })
          // console.log(this.$refs.zBaseInfoTable)

          this.addModel = false
          this.$refs.zBaseInfoTable.request()
        } catch (err) {
          console.error(err)
        }
      }
    },
    async submitDelSome() {
      // 删除多条确认按钮
      this.delSomeModal = false
      // console.log(this.arr)
      await this.delOccupTypesList({ ids: this.arr })
      this.refreshAfterDel(this.tableSelectData.length)
    },
    async submitDelOne() {
      // 删除一条确认按钮
      this.delOneModal = false
      await this.delOccupTypesList({ ids: this.curRow.id })
      this.refreshAfterDel(1)
    },
    deleteButton() {
      // 删除按钮
      this.delSomeModal = true
    },
    delImg(data, index) {
      // 表格删除图标和右键单机删除按钮点击
      this.delOneModal = true
      this.curRow = data
    },
    CancelModelAffirm() {
      // 删除后取消按
      this.deleteModel = false
    },
    refreshAfterDel(delNum) {
      if (
        this.pageInfo.total <=
          (this.pageInfo.page - 1) * this.pageInfo.per_page + delNum &&
        this.pageInfo.page !== 1
      ) {
        this.$refs.zBaseInfoTable.request({ page: this.pageInfo.per_page - 1 })
      } else {
        this.$refs.zBaseInfoTable.request()
      }
    },
    afterRequest() {
      this.tableSelectData = []
    },
    editRow(data) {
      // console.log('edi11t', data)
      // 右键编辑
      this.selectData(data)
    },
    selectData(data) {
      // console.log('selectData', data.code)
      // 表格编辑图片点击
      // console.log(2)
      this.formCustomEdit.modeNumber = data.code.toString()
      this.valueCompileHeaderVal = data.sort
      this.formCustomEdit.modeName = data.name
      this.formCustomEdit.remark = data.remark
      this.formCustomEdit.status = !!data.status
      this.finallyPerson = data.operater.realname
      this.finallyTime = filters.timeFilter(data.updated_at, 'YYYY-MM-DD HH:mm')
      // console.log('selectData', this.formCustomEdit.modeNumber)
      this.param = data
      this.compileModel = true
    },
    buttonCompileCont() {
      // 编辑弹框的取消按钮
      this.compileModel = false
    },
    async saveCompileButton(data) {
      // 编辑弹框的保存按钮
      // TODO: 验证总是返回true
      let val = await this.$refs.formCustomEditForm.validate()
      console.log('ref', val)
      if (val) {
        try {
          await this.updateOccupTypesList({
            id: this.param.id,
            name: this.formCustomEdit.modeName,
            sort: this.valueCompileHeaderVal,
            remark: this.formCustomEdit.remark,
            code: this.formCustomEdit.modeNumber,
            status: Number(this.formCustomEdit.status),
          })
          this.compileModel = false
          await this.$refs.zBaseInfoTable.request() // 重新请求页面数据
        } catch (err) {
          console.log(err)
        }
      }
    },
    onSelectionChange(selection) {
      // console.log('select', selection)
      // 改变时选择
      this.tableSelectData = selection
      this.delCounts = selection.length
      this.arr = []
      selection.forEach(element => {
        this.arr.push(element.id)
      })
      // for (let i = 0, len = selection.length; i < len; i++) {
      //   this.arr.push(selection[i].id)
      // }
    },
  },
  mounted() {
    // 第一次加载获取table的高
    this.tableHeight = this.$refs.content.offsetHeight
  },
  activated() {
    this.tableHeight = this.$refs.content.offsetHeight
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.trade-management-wrapper {
  position: relative;
  margin: 0 auto;
  height: 100%;
  .ivu-form-item-required .ivu-form-item-label:before {
    display: none;
  }
  .trade-management-contet {
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
      border: 1px solid @gradeAshFive;
      color: @gradeAshOne;
      box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.5);
      overflow: hidden;

      .table-header-content {
        display: flex;
        height: 30px;
        font-size: 0;
        & > span {
          line-height: 30px;
          color: #737373;
          font-size: 12px;
        }
        & > .status {
          width: 78px;
        }
      }
    }
  }
  .tradeListTable {
    height: calc(~'100% - 50px');
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 70px;
    & > label {
      margin-right: 20px;
    }
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 0px;
    /* display: none; */
  }
  .add-model-class {
    .form-row {
      display: flex;
      padding-left: 20px;

      & > span {
        padding-top: 7px;
        line-height: 20px;
        color: #737373;
      }
      // &>div{
      //   flex: 1;
      // }
    }
    .modelFooter {
      height: 70px;
      line-height: 70px;

      button {
        width: 74px;
        height: 30px;
      }
    }
    .formCustomAdd {
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
      .row {
        padding: 20px 0 0 0;
        width: 100%;
        display: table;
        position: relative;

        & > label {
          display: table-cell;
          white-space: nowrap;
          width: 1%;
          color: @gradeAshThree;
        }

        .require {
          position: absolute;
          right: 34px;
          top: 0;
          bottom: 0;
          line-height: 75px;
          font-size: 16px;
          color: @tsIcon;
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
          color: @synthManageAText;
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
  }
}
</style>
