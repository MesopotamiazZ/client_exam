/**
* Created wzd jiangyiling
* Date: 2017/12/01/
* Time: 10:54
* content:职业病检查依据管理
*/
<template>
  <div class="inspectionBasisManagement-wrapper">
    <div class="inspectionBasisManagement contentBg">
      <!-- titleHasSlot开始 -->
      <title-has-slot>
        <span slot="titletHasSlotLeftTitle">职业病检查依据列表</span>
        <div slot='titletHasSlotRightContent'
             class="titlet-has-slot-right-content">
          <!-- <Select v-model="statusValue" @on-change="statusValueChange" class="select"  style="width:78px" placeholder="全部" :filterable='true' >
                  <Option value="">全部</Option>
                  <Option :value="1">启用</Option>
                  <Option :value="0">未启用</Option>
           </Select> -->
          <!-- <search-input :searText="'检查依据名称'"
                        @on-enter="searchOne"
                        @on-Icon="searchOne"
                        @on-cancel="searchOne"></search-input> -->
                        <search-input class="input"
                            searText="请输入搜索内容"
                            @on-enter="enterSearch"
                            @on-Icon="enterSearch"
                            @on-cancel="enterSearch"
                            :searchWidth='220'></search-input>
          <template v-if="!isSelectMode">
            <Button type="ghost" class="marginR10" @click="addInspectionBasis1" key="1">新 增</Button>
            <Button type="ghost" class="marginR10" @click="exportBtn" key="2">导 出</Button>
            <Button type="ghost" @click="toggleMode" key="3">选 择</Button>
          </template>
          <template v-else>
            <Button type="ghost"
                    class="operationDel marginR10 delete-button"
                    :disabled='isDisabled'
                    @click="delInspectionBasisFun" key="4">删 除</Button>
           
            <Button type="primary"
                    @click="toggleMode" key="5">取 消</Button>
          </template>
        </div>
      </title-has-slot>
      <!-- titleHasSlot结束 -->
      <!-- table组件开始 -->
      <div class="inspectionBasisManagementTable"
           ref="inspectionBasisManagementTable">
        <q-table ref="zBaseInfoTable"
                 :selectMode="isSelectMode"
                 :columns="columns"
                 :data="inspectionBasisList"
                 :pageInfo="pageInfo"
                 :height="tableHeight"
                 :params="params"
                 :requestDataApi="getInspectionBasis"
                 :ifEdit="true"
                 @change-selection="changeSelection"
                 @on-select="selectRow"
                 @cancle-row="cancleRow"
                 @dbclick-row="dbclickRow"
                 @edit="editRow"
                 @delete="delOneRow"
                 @edit-row='editRow'
                 @on-row-dbClick="editRow"
                 @delete-row='delOneRow'
                 @getRequestParams="getRequestParams"
                 @all-selection="onSelectionChange">
          <!--    @on-change="pageChange"
        @on-page-size-change="pageSizeChange" -->
        </q-table>
      </div>
      <!-- table组件结束 -->
    </div>
    <!-- 新增编辑modal框开始 -->
    <div class="inspectionBasisManagementModal">
      <Modal v-model="inspectionBasisManagementModal"
             :styles='{width:473+"px"}'
             :transition-names='[]'
             :mask-closable="false"
             :transfer='false'
             :closable="false">
        <div slot="header">
          <alert-header :headerText='headerText'
                        @alert-retrun-num="onBlurSubmit"
                        :headerVal="sortNum"></alert-header>
        </div>
        <div class="modelContent">
          <Form :model="modalForm.data"
                :rules="modalForm.rule"
                :label-width="84 + 10"
                class="modal-form"
                ref="addOrEditForm">
            <FormItem prop="inspectionBasisName"
                      label="职业病检查依据"
                      class="modal-form-row">
              <Input :class='{inputVerificationTs: isEmpty(modalForm.data.inspectionBasisName)}'
                     type="text"
                     v-model.trim="modalForm.data.inspectionBasisName"
                     class="nameTextarea"></Input>
            </FormItem>
            <div class="remarkItem">
              <span class="title">备注</span>
              <Input class="inputTextarea"
                     type="textarea"
                     v-model="newRemarkValue"
                     v-if="headerText==='新增职业病检查依据'"></Input>
              <Input class="inputTextarea"
                     type="textarea"
                     v-model="editRemarkValue"
                     v-else></Input>
            </div>
            <!-- <p class="ibmName marginR10">检查依据名称</p> -->
            <!-- <Input v-model="inspectionBasisName" :rows="2" type="textarea" ref="inspectionBasisName" :class="{redStar: isStar}"></Input> -->
            <div class="lastUpdate"
                 v-show="isEdit">
              <span class="lastUser">最后修改人：{{operater}}</span>
              <span>最后修改时间：{{lastTime}}</span>
            </div>
          </Form>
        </div>
        <div slot="footer">
          <div class="modelFooter marginT20 marginR20">
            <!-- saveInspectionBasis -->
            <div class="statusValue">
              <Checkbox v-model="showStatus1"
                        @on-change="statusValueFun"
                        v-if="headerText==='新增职业病检查依据'">启用</Checkbox>
              <Checkbox v-model="showStatus2"
                        @on-change="editstatusValueFun"
                        v-else>启用</Checkbox>
            </div>
            <Button type="primary"
                    class="modelSaveBtn marginR20"
                    @click="modalForm.submitEvent('addOrEditForm')">保 存</Button>
            <Button type="ghost"
                    class="modelCancelBtn"
                    @click="ModalCancel">取 消</Button>
          </div>
        </div>
      </Modal>
    </div>
    <!-- 新增编辑modal框结束 -->

    <!--确认删除modal狂开始 -->
    <affirm-del-modal :delCounts="selectArr.length"
                      :controlModal="controlModal"
                      @delCancel="delCancel"
                      @affirmDel="affirmDel"></affirm-del-modal>
    <!--确认删除modal狂结束 -->
  </div>
</template>
<script>
import * as type from '@/store/modules/information/diagnosticManagement/inspectionBasisManagement/inspectionBasisManagementTypes'
import { mapState, mapActions, mapGetters } from 'vuex'
import { timeFilter } from '@/utils/fifters'
/* import moment from 'moment' */
/* import filters from '@/utils/fifters' */
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
// import alertHeader from '@/components/alert/alertHeader'
// import affirmDelModal from '@/components/modal/affirmDelModal'
// import zBaseInfoTable from '@/components/table/zBaseInfoTable'
// import searchInput from '@/components/searchInput'
// import titleHasSlot from '@/components/titleHasSlot'
export default {
  name: 'inspectionBasisManagement',
  components: {
    // zBaseInfoTable,
    // alertHeader,
    // affirmDelModal,
    // searchInput,
    // titleHasSlot,
  },
  data() {
    return {
      exportParams: {
        reqParams: {},
        columns: [
          {
            key: 'name',
            title: '检查依据名称',
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
                return timeFilter(value, 'YYYY-MM-DD HH:mm')
              } else {
                return ''
              }
            },
          },
        ],
      },
      params: {
        search: '',
      },
      operater: '',
      totalSize: '',
      controlModal: false,
      isDisabled: true,
      selectArr: [], // 所有选中的项目
      searchValue: '', // 双向绑定模糊查询
      isControl: true,
      headerText: '',
      editParams: {}, // 用于存放编辑数据
      inspectionBasisManagementModal: false,
      isEdit: false,
      isStar: true, // 是否显示*号
      // affirmDelModal: false,
      inspectionBasisName: '', // form表单检查依据
      tipHeaderText: '提示',
      isSelectMode: false,
      sortNum: '',
      tableHeight: 400,
      single: true,
      newStatusValue: 1,
      editStatusValue: 0,
      newRemarkValue: '',
      editRemarkValue: '',
      urlRemark: '/static/icons/public/remarkInCell.svg',
      // modalForm验证
      // 启用status
      statusValue: '',
      showStatus1: true,
      showStatus2: false,
      lastTime: null,
      lastUsername: '',
      modalForm: {
        rule: {
          inspectionBasisName: [
            { required: true, message: '职业病检查依据不能为空', trigger: 'blur' },
          ],
        },
        data: {
          inspectionBasisName: '',
        },
        submitEvent: async formName => {
          try {
            if (await this.$refs[formName].validate()) {
              this.saveInspectionBasis()
            }
          } catch (error) {
            console.dir(error)
          }
        },
      },
    }
  },
  methods: {
    /* allSelection(data) {
      this.selectArr = data
    }, */
    // 新增启用
    statusValueFun(data) {
      if (data) {
        this.newStatusValue = 1
      } else {
        this.newStatusValue = 0
      }
    },
    // 编辑启用
    editstatusValueFun(data) {
      if (data) {
        this.editStatusValue = 1
      } else {
        this.editStatusValue = 0
      }
    },
    // 启用
    /*  async statusValueChange(data) {
      console.log(data)
    }, */
    timeFilter,
    // 验证是否为空
    isEmpty(data) {
      if (data === '' || data === undefined) {
        return true
      } else {
        return false
      }
    },
    onBlurSubmit(data) {
      // alertHeaderx显示顺序失去焦点提交
      this.sortNum = data
    },
    onSelectionChange(selectionData) {
      // 在多选模式下有效，只要选中项发生变化时就会触发
      if (selectionData.length === 0) {
        this.isDisabled = true
        // this.$refs.inspectionBasisManagementTable.refreshBord()
      } else {
        this.isDisabled = false
        this.selectArr = selectionData
      }
    },
    toggleMode() {
      // 点击选择和取消切换表格状态
      if (this.isSelectMode === false) this.selectArr = []
      this.isSelectMode = !this.isSelectMode
    },
    pageChange() {
      // 换页时触发
      this.selectArr = []
      this.isDisabled = true
    },
    pageSizeChange() {
      // pageSIze变化时触发
      this.selectArr = []
      this.isDisabled = true
    },
    print() {
      // 数据打印
      console.log('数据打印')
    },
    changeSelection(data) {
      // console.log('changeSelection', data)
    },
    selectRow(data, row) {
      // console.log('selectRow', data, row)
      // this.selectArr = data
    },
    dbclickRow() {
      // console.log('dbclickRow', arguments)
    },
    cancleRow() {
      // console.log('cancleRow')
    },
    enterSearch(val) {
      // 模糊查询
      console.log(val)
      this.searchValue = val
      this.params.search = val
      /* console.log(this.params.search) */
      /* await this.$refs.zBaseInfoTable.request() */
      this.$refs.zBaseInfoTable.allSelection = []
      this.isDisabled = true
      /* await this.getInspectionBasis({key: val, status: this.his.totalSize}) */
    },
    /* async onCancel(val1, val2) {
      if (val2 === '') return
      this.$refs.zBaseInfoTable.request()
      this.searchValue = ''
    }, */
    addInspectionBasis1() {
      // 点击新增检查依据
      this.headerText = '新增职业病检查依据'
      this.showStatus1 = true
      this.isEdit = false
      this.sortNum = this.totalSize // 新增时给显示顺序赋值
      this.inspectionBasisManagementModal = true
    },
    // editInspectionBasis () {
    //   // 点击编辑检查依据,编辑的时候需要给模态框的form变淡传数据
    //   this.headerText = '编辑检查依据'
    //   this.isEdit = true
    //   this.modalForm.data.inspectionBasisName = this.editParams.name
    //   this.inspectionBasisManagementModal = true
    // },
    ModalCancel() {
      // inspectionBasisManagementModal取消按钮
      // 退出模态框之前要清空数据
      this.modalForm.data.inspectionBasisName = ''
      this.$refs.addOrEditForm.resetFields()
      this.inspectionBasisManagementModal = false
    },
    delOneRow(data) {
      // 右键删除一行,或者右边Btn删除
      this.selectArr = []
      this.selectArr.push(data)
      this.controlModal = true
    },
    editCell() {
      // 双击编辑
    },
    editRow(data) {
      console.log(data)
      // 修改行
      this.operater = data.operater
      this.editStatusValue = data.status ? data.status : null
      this.showStatus2 = !!this.editStatusValue
      this.headerText = '编辑职业病检查依据'
      this.isEdit = true
      this.editParams = data
      this.modalForm.data.inspectionBasisName = this.editParams.name
      // 编辑时给显示顺序赋值
      this.sortNum = this.editParams.sort
      this.inspectionBasisManagementModal = true
      this.updated_at = 's'
      this.lastUsername = data.lastUser
      /* this.lastTime = moment(parseInt(data.updated_at * 1000)).format(
        'YYYY-MM-DD H:mm',
      ) */
      this.lastTime = timeFilter(data.updated_at, 'YYYY-MM-DD HH:mm')
      this.editRemarkValue = data.remark
    },
    delInspectionBasisFun() {
      // 编辑中的删除按钮
      this.controlModal = true
    },
    deSelect() {
      // 取消选中
      this.isControl = true
    },
    delCancel() {
      // 提示框取消
      this.controlModal = false
      this.selectArr = []
    },
    async affirmDel() {
      // 提示框删除按钮
      let tempArr = this.selectArr.map(item => {
        return item.id
      })
      if (this.selectArr.length === 1) {
        await this.delInspectionBasis({ ids: this.selectArr[0].id })
      } else {
        await this.delInspectionBasis({ ids: tempArr })
      }

      /*  for (let i = 0; i < tempArr.length; i++) {
        if (i === tempArr.length - 1) {
          ids = tempArr[i].id
        } else {
          ids += (tempArr[i].id + ',')
        }
      } */

      this.totalSize = this.totalSize - tempArr.length
      if (this.searchValue !== '') {
        /*  await this.getInspectionBasis({status: 1, key: this.searchValue}) */
      } else {
        if (
          this.pageInfo.total <=
            (this.pageInfo.page - 1) * this.pageInfo.page_size +
              tempArr.length &&
          this.pageInfo.page !== 1
        ) {
          await this.$refs.zBaseInfoTable.request({
            page: this.pageInfo.page - 1,
          }) // 重新请求页面数据
        } else {
          await this.$refs.zBaseInfoTable.request() // 重新请求页面数据
        }
      }
      // await this.getInspectionBasis({status: 1, key: this.searchValue})
      this.inspectionBasisManagementModal = false
      this.controlModal = false
      // 清空
      this.$refs.zBaseInfoTable.allSelection = []
      this.selectArr = []
      this.isDisabled = true
    },
    async saveInspectionBasis() {
      // 新增保存
      if (this.headerText === '新增职业病检查依据') {
        await this.addInspectionBasis({
          name: this.modalForm.data.inspectionBasisName,
          sort: this.sortNum === '' ? this.totalSize + 1 : this.sortNum,
          remark: this.newRemarkValue,
          status: this.newStatusValue,
        })
        this.newRemarkValue = ''
        this.newStatusValue = 0
        this.totalSize += 1
        // await this.getInspectionBasis({status: 1, key: this.searchValue})
        if (this.searchValue !== '') {
          /*  await this.getInspectionBasis({status: 1, key: this.searchValue}) */
        } else {
          await this.$refs.zBaseInfoTable.request()
        }
        this.modalForm.data.inspectionBasisName = ''
        // this.sortNum = ''
        this.inspectionBasisManagementModal = false
      } else {
        // 编辑保存
        await this.updateInspectionBasis({
          id: this.editParams.id,
          name: this.modalForm.data.inspectionBasisName,
          sort: this.sortNum === '' ? this.editParams.sort : this.sortNum,
          remark: this.editRemarkValue,
          status: this.editStatusValue,
        })
        // await this.getInspectionBasis({status: 1, key: this.searchValue})
        if (this.searchValue !== '') {
          /* await this.getInspectionBasis({status: 1, key: this.searchValue}) */
        } else {
          await this.$refs.zBaseInfoTable.request()
        }
        this.modalForm.data.inspectionBasisName = ''
        // this.sortNum = ''
        this.inspectionBasisManagementModal = false
      }
    },
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('职业病检查依据列表', {
        api: api.inspectionBasisManagement.getInspectionBasisList,
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
    ...mapActions('inspectionBasisManagementModule', {
      getInspectionBasis: type.GET_INSPECTIONBASIS_TYPES,
      addInspectionBasis: type.ADD_INSPECTIONBASIS_TYPES,
      updateInspectionBasis: type.UP_INSPECTIONBASIS_TYPES,
      delInspectionBasis: type.DEL_INSPECTIONBASIS_TYPES,
      getInspectionBasisAll: type.GET_INSPECTIONBASISALL_TYPES,
    }),
  },
  computed: {
    ...mapState(['windowHeight']),
    ...mapGetters('inspectionBasisManagementModule', [
      'pageInfo',
      'inspectionBasisList',
    ]),
    columns() {
      // 表格的列属性
      return [
        {
          title: '检查依据名称',
          key: 'name',
          ellipsis: true,
        },
        {
          title: '备注',
          key: 'remark',
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
          align: 'center',
          ellipsis: 'true',
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('status-in-table')
            }
          },
          titleRender: (row) => {
            return ''
          },
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
        },
        {
          title: '显示顺序', // 显示顺序
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
          key: 'updated_at',
          width: 130,
          ellipsis: true,
          render: (h, params) => {
            return h(
              'span',
              timeFilter(params.row.updated_at, 'YYYY-MM-DD HH:mm')
            )
          },
          titleRender: (row) => {
            return timeFilter(row.updated_at, 'YYYY-MM-DD HH:mm')
          },
          filterType: 'date',
        },
      ]
    },
    /* lastUsername () {
      if (this.editParams.operater && this.editParams.operater.realname) {
        return this.editParams.operater.realname
      } else {
        return ''
      }
    }, */
    /* lastTime () {
      if (this.editParams.updated_at) {
        return this.timeFilter(this.editParams.updated_at, 'YYYY-MM-DD HH:mm')
      } else {
        return ''
      }
    }, */
  },
  async created() {
    await this.getInspectionBasis()
    this.totalSize = this.pageInfo.total + 1
  },
  mounted() {
    this.tableHeight = this.$refs.inspectionBasisManagementTable.offsetHeight
    /* this.totalSize = this.pageInfo.total */
  },
  watch: {
    inspectionBasisName(newData) {
      if (newData === '') {
        this.isStar = true
      } else {
        this.isStar = false
      }
    },
    windowHeight() {
      this.tableHeight = this.$refs.inspectionBasisManagementTable.offsetHeight
    },
  },
  activated() {
    this.tableHeight = this.$refs.inspectionBasisManagementTable.offsetHeight
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.inspectionBasisManagement-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  .inspectionBasisManagement {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-radius: 10px;
    // margin-top: 10px;
    border: 1px solid @gradeAshFive;
    position: relative;
    overflow: hidden;
    .paddingT10 {
      height: 50px;
      .titlet-has-slot-right-content {
        height: 30px;
        display: flex;
        .title {
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          margin-right: 10px;
        }
        .select {
          margin-right: 20px;
        }
      }
    }
    .inspectionBasisManagementHeader {
      height: 50px;
      line-height: 50px;
      border-radius: 10px 10px 0 0;
      // border-left: 1px solid @gradeAshFive;
      // border-right: 1px solid @gradeAshFive;
      background-color: #ffffff;
      .inspectionBasisManagementHeaderName {
        border-radius: 10px 0 0 0;
        background-color: @gradeBlueFive;
        color: @gradeAshOne;
        letter-spacing: 0.04px;
        font-weight: 500;
        background-color: #ffffff;
        .inspectionBasisManagementHeaderText::before {
          content: '';
          width: 3px;
          height: 17px;
          margin-right: 8px;
          display: inline-block;
          vertical-align: middle;
          background-color: @gradeBlueOne;
        }
      }
      .headerOperation {
        // display: inline-block;
        position: relative;
        top: 0;
        font-size: 0;
        li {
          display: inline-block;
          Button {
            width: 74px;
            height: 30px;
          }
        }
        .headerSearch {
          width: 183px;
          height: 30px;
        }
        img {
          position: absolute;
          top: 20px;
          right: 300px;
          cursor: pointer;
        }
      }
    }
  }
  .affirmDelModal {
    .modelFooter {
      height: 50px;
      Button {
        width: 74px;
        height: 30px;
      }
    }
    .pmain {
      text-align: center;
      font-size: 16px;
      color: @gradeAshTwo;
      letter-spacing: 0;
      margin-top: 30px;
      margin-bottom: 20px;
    }
  }
  .inspectionBasisManagementModal {
    // height: 303px;
    .ivu-modal-header {
      // height: 50px;
    }
    .modelFooter {
      height: 50px;
      display: flex;
      width: fit-content;
      margin-left: 220px;
      .statusValue {
        line-height: 30px;
        height: 30px;
        .ivu-checkbox-wrapper {
          margin-right: 20px;
        }
      }
      Button {
        width: 74px;
        height: 30px;
      }
    }
    .modelContent {
      width: 100%;
      .modal-form {
        padding-top: @num20;
        .modal-form-row {
          padding: 0 @num20;
          // height: 30px;
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
          }
        }
        .remarkItem {
          margin-left: 20px;
          font-size: 0px;
          .title {
            width: 84px;
            text-align-last: justify;
            display: inline-block;
            font-size: 12px;
          }
          .inputTextarea {
            margin-left: 10px;
            width: 339px;
          }
        }
      }
    }
    .lastUpdate {
      color: @gradeAshThree;
      margin-top: 20px;
      margin-left: 20px;
      .lastUser {
        display: inline-block;
        margin-right: 20px;
      }
      /* span:last-child {
          margin-left: 20px;
        } */
    }
  }
  .operationDel:not([disabled]) {
    color: red;
    border: 1px solid red;
  }
  .inspectionBasisManagementTable {
    height: calc(~'100% - 50px');
  }
  // .modelSaveBtn {
  //   margin-top: 23px;
  // }
  // .modelCancelBtn {
  //   margin-top: 23px;
  // }
  // .ivu-modal-content {
  //   height: 193px;
  // }
}
</style>