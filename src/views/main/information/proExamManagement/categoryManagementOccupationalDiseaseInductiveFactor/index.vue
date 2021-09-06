/* jiangyiling */
<template>
  <div class="categoryManagementOccupationalDiseaseInductiveFactor-all">
    <div class="categoryManagementOccupationalDiseaseInductiveFactor-all-content">
      <!-- 页面头部 -->
      <titlet-hasSlot>
        <span slot="titletHasSlotLeftTitle">职业病危害因素类别列表</span>
        <div slot="titletHasSlotRightContent"
             class="content">
          <!-- <Select v-model="statusValue"
                  @on-change="statusValueChange(statusValue)"
                  class="select"
                  style="width:78px"
                  placeholder="全部"
                  :filterable='true'>
            <Option value="">全部</Option>
            <Option :value="1">启用</Option>
            <Option :value="0">未启用</Option>
          </Select> -->
          <!-- @on-enter="enterSearch" @on-Icon="enterSearch" @on-cancel="enterSearch" -->
          <search-input class="input"
                        searText="请输入搜索内容"
                        @on-enter="enterSearch"
                        @on-Icon="enterSearch"
                        @on-cancel="enterSearch"
                        :searchWidth='220'></search-input>
          <div v-if='showGroupOut' key="1"
               class="group-out">
            <Button type="ghost"
                      class="fl marginR10"
                      @click="addButton">新 增</Button>
             <Button type="ghost"
                      @click="exportBtn"
                      class="fl marginR10">导 出</Button>         
            <Button type="ghost"
                      class="fl marginR10"
                      @click="selectButton">选 择</Button>
          </div>
          <div v-else key="2"
               class="group-in">
            <Button type="success"
                      :disabled="showDelButton"
                      class="fl marginR10"
                      @click="deleCheckBoxItem">删 除</Button>
            
            <Button type="primary"
                      class="fl marginR10"
                      @click="cancelButton">取 消</Button>
          </div>
        </div>
      </titlet-hasSlot>
      <!-- 表格 -->
      <div class="table"
           ref="content">
        <q-table ref="baseInfoTable"
                 :selectMode="isSelectMode"
                 :columns="columns"
                 :data="occupHarmTypesList"
                 :pageInfo="pageInfo"
                 :height="tableHeight"
                 :params="params"
                 :requestDataApi="getManagementList"
                 :ifEdit="true"
                 @edit="editRow"
                 @edit-row="editRow"
                 @on-row-dbClick="editRow"
                 @delete="delOneRow"
                 @delete-row='delOneRow'
                 @getRequestParams="getRequestParams"
                 @all-selection="checkboxSelect">
        </q-table>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <div class="add-modal"
         v-if="addModalDiv">
      <Modal v-model="addModalDiv"
             width="404"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <alert-header headerText="新增职业病危害因素类别"
                        :headerVal="addModal.data.sort"
                        @alert-retrun-num="addSortFun"></alert-header>
        </div>
        <div class="content-footer">
          <Form ref="addForm"
                :model="addModal.data"
                :rules="addModal.rule">
            <div class="content">
              <div class="item1">
                <span class="title">职业病危害因素类别名称</span>
                <div class="text">
                  
                  <FormItem prop="name">
                    <Input type="text"
                           v-model.trim="addModal.data.name"></Input>
                  </FormItem>
                  <span v-show="starDisplay"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item2">
                <span class="title">备注</span>
                <Input class="input"
                       type="textarea"
                       v-model.trim="addModal.data.remark"></Input>
              </div>
            </div>
            <div class="footer">
              <FormItem>
                <Checkbox class="checkBox"
                          v-model="addNewCheck"
                          @on-change="newStatusValueFun">启用</Checkbox>
                <Button type="primary"
                        class="marginR20"
                        @click="saveNewItem('addForm')">保 存</Button>
                <Button type="ghost"
                        @click="cancelNewItem">取 消</Button>
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
    <!-- 编辑弹窗 -->
    <div class="edit-modal"
         v-if="editModalDiv">
      <Modal v-model="editModalDiv"
             width="404"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <alert-header headerText="编辑职业病危害因素类别"
                        :headerVal="editModal.data.sort"
                        @alert-retrun-num="editSortFun"></alert-header>
        </div>
        <div class="content-footer">
          <Form ref="editForm"
                :model="editModal.data"
                :rules="editModal.rule">
            <div class="content">
              <div class="item1">
                <span class="title">职业病危害因素类别名称</span>
                <div class="text">
                  <FormItem prop="name">
                    <Input type="text"
                           v-model.trim="editModal.data.name"></Input>
                  </FormItem>
                  <span v-show="starDisplay"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item2">
                <span class="title">备注</span>
                <Input class="input"
                       type="textarea"
                       v-model.trim="editModal.data.remark"></Input>
              </div>
              <div class="item3">
                <span class="lastUser">最后修改人：{{operater}}</span>
                <span class="updatetime">最后修改时间：{{lastTime}}</span>
              </div>
            </div>
            <div class="footer">
              <Checkbox class="checkBox"
                        v-model="editStatusBool">启用</Checkbox>
              <FormItem>
                <Button type="primary"
                        class="marginR20"
                        @click="saveEdit('editForm')">保 存</Button>
              </FormItem>
              <Button type="ghost"
                      @click="editModalDiv = false">取 消</Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
    <affirm-del-modal :delCounts="deletItemLength"
                      :controlModal="controlModal"
                      @delCancel="delCancel"
                      @affirmDel="affirmDelItem"></affirm-del-modal>
    <!-- <affirm-del-modal :delCounts="deletItemLength" :controlModal="controlModal" @delCancel="delCancel" @affirmDel="affirmDelItem"></affirm-del-modal> -->
  </div>
</template>
<script>
/* import { mapState, mapActions, mapGetters } from 'vuex' */
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'
/* import moment from 'moment' */
import filters from '@/utils/fifters'
import * as _ from 'lodash'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
export default {
  name: 'categoryManagementOccupationalDiseaseInductiveFactor',
  components: {
    titletHasSlot,
  },
  data() {
    return {
      exportParams: {
        reqParams: {},
        columns: [
          {
            key: 'name',
            title: '职业病危害因素类别名称',
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
                return filters.timeFilter(value, 'YYYY-MM-DD HH:mm')
              } else {
                return ''
              }
            },
          },
        ],
      },
      // 验证
      addNewCheck: true,
      operater: '',
      addModal: {
        data: {
          name: '',
          remark: '',
          status: 0,
        },
        rule: {
          name: [
            {
              required: true,
              message: '职业病危害因素类别名称不能为空',
              trigger: 'blur',
            },
          ],
        },
      },
      // 删除
      showDelButton: true,
      controlModal: false,
      deletItemLength: null,
      clickId: null,
      chekboxId: null,
      // 编辑
      lastTime: null,
      editSort: null,
      editStatusBool: false,
      editModal: {
        data: {
          name: '',
        },
        rule: {
          name: [
            {
              required: true,
              message: '名称必须填写',
              trigger: 'blur',
            },
          ],
        },
      },
      addNewItemData: {},
      showGroupOut: true,
      newStatus: 1,
      // 表格参数
      isSelectMode: false,
      tableHeight: 400,
      statusValue: '',
      // 弹框
      addModalDiv: false,
      editModalDiv: false,
      params: {
        search: '',
      },
      urlRemark: '/static/icons/public/remarkInCell.svg',
      /* searchText: '', */
      totalsort: null,
      /* columns: [
        {
          title: '职业健康检查种类名称',
          key: 'name',

        },
        {
          title: '备注',
          key: 'remark',

        },
        {
          title: '启用',
          key: 'status',

        },
        {
          title: '显示顺序',
          key: 'sort',

        },
        {
          title: '最后修改人',
          key: 'lastUser',

        },
        {
          title: '最后修改时间',
          key: 'updated_at',

        },
      ], */
    }
  },
  methods: {
    ...mapMutations(
      'categoryManagementOccupationalDiseaseInductiveFactorModule',
      ['requestPagingo'],
    ),
    ...mapActions(
      'categoryManagementOccupationalDiseaseInductiveFactorModule',
      ['getManagementList', 'adNewItemFun', 'amendItemFun', 'deletItemFun'],
    ),
    addSortFun(data) {
      this.addModal.data.sort = data
    },
    editSortFun(data) {
      this.editModal.data.sort = data
    },
    // 删除
    delCancel() {
      this.controlModal = false
    },
    deleCheckBoxItem() {
      this.controlModal = true
      this.deletItemLength = this.chekboxId.length
      this.clickId = null
    },
    delOneRow(data) {
      this.clickId = data.id
      this.deletItemLength = 1
      this.controlModal = true
    },
    checkboxSelect(data) {
      this.chekboxId = data.map(item => {
        return item.id
      })
      if (this.chekboxId.length) {
        this.showDelButton = false
      } else {
        this.showDelButton = true
      }
    },
    async affirmDelItem() {
      if (this.clickId) {
        await this.deletItemFun({ ids: this.clickId })
        if (
          this.pageInfo.total <=
            (this.pageInfo.current_page - 1) * this.pageInfo.per_page + 1 &&
          this.pageInfo.current_page !== 1
        ) {
          await this.$refs.baseInfoTable.request({
            page: this.pageInfo.current_page - 1,
          }) // 重新请求页面数据
        } else {
          await this.$refs.baseInfoTable.request() // 重新请求页面数据
        }
        this.totalsort --
      }
      if (this.chekboxId && !this.clickId) {
        await this.deletItemFun({ ids: this.chekboxId })
        if (
          this.pageInfo.total <=
            (this.pageInfo.current_page - 1) * this.pageInfo.per_page +
              this.chekboxId.length &&
          this.pageInfo.current_page !== 1
        ) {
          await this.$refs.baseInfoTable.request({
            current_page: this.pageInfo.current_page - 1,
          })
        } else {
          await this.$refs.baseInfoTable.request()
        }
        this.totalsort = this.totalsort - this.chekboxId.length
      }
      this.$refs.baseInfoTable.allSelection = []
      this.chekboxId = []
      this.clickId = null
      this.showDelButton = true
      this.controlModal = false
    },
    // 编辑
    editRow(owData, event) {
      /* this.editSort = owData.sort */
      this.operater = owData.operater
      this.editModal.data = _.clone(owData)
      /* this.lastTime = moment(
        parseInt(this.editModal.data.updated_at * 1000),
      ).format('YYYY-MM-DD H:mm') */
      this.lastTime = filters.timeFilter(this.editModal.data.updated_at, 'YYYY-MM-DD HH:mm')
      this.editStatusBool = !!this.editModal.data.status
      this.editModalDiv = true
    },
    async saveEdit(formName) {
      var thisdatan = {
        id: this.editModal.data.id,
        params: {
          name: this.editModal.data.name,
          remark: this.editModal.data.remark,
          status: this.editStatusBool ? 1 : 0,
          sort: this.editModal.data.sort,
        },
      }
      try {
        if (await this.$refs[formName].validate()) {
          await this.amendItemFun(thisdatan)
          await this.$refs.baseInfoTable.request()
          this.editModalDiv = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 新增启动
    newStatusValueFun(data) {
      if (data) {
        this.newStatus = 1
      } else {
        this.newStatus = 0
      }
    },
    async saveNewItem(formName) {
      this.addModal.data.status = this.newStatus
      this.addModal.data.sort = this.totalsort
      try {
        if (await this.$refs[formName].validate()) {
          await this.adNewItemFun(this.addModal.data)
          await this.$refs.baseInfoTable.request()
          this.addModalDiv = false
          this.totalsort++
        }
      } catch (error) {
        console.dir(error)
      }
    },
    // 新增项目
    cancelNewItem() {
      this.addModalDiv = false
    },
    // 模糊搜索
    addButton() {
      /* this.totalsort = this.pageInfo.total + 1 */
      this.addModalDiv = true
      this.addModal.data.name = ''
      this.addModal.data.remark = ''
      this.addModal.data.sort = this.totalsort
    },
    async enterSearch(val) {
      /* if (!val && !this.searchText) {
        return
      } */
      this.params.search = val
      this.showDelButton = true
      this.chekboxId = []
      this.$refs.baseInfoTable.allSelection = []
      /* this.searchText = val */
    },
    // 启用
    /* async statusValueChange(data) {
      this.params.status = data
      await this.$refs.baseInfoTable.request()
    }, */
    // 选择按钮
    selectButton() {
      this.showGroupOut = !this.showGroupOut
      this.isSelectMode = !this.isSelectMode
    },
    // 取消按钮
    cancelButton() {
      this.showGroupOut = !this.showGroupOut
      this.isSelectMode = !this.isSelectMode
      this.$refs.baseInfoTable.allSelection = []
      this.chekboxId = []
    },
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('职业病危害因素类别列表', {
        api: api.categoryManagementOccupationalDiseaseInductiveFactor.getList,
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
  },
  computed: {
    ...mapState(['windowHeight']),
    ...mapGetters(
      'categoryManagementOccupationalDiseaseInductiveFactorModule',
      ['occupHarmTypesList', 'pageInfo'],
    ),
    // 验证
    starDisplay() {
      if (this.addModalDiv && !this.addModal.data.name) {
        return true
      }
      if (this.editModalDiv && !this.editModal.data.name) {
        return true
      }
      return false
    },
    columns() {
      return [
        {
          title: '职业病危害因素类别名称',
          key: 'name',

          ellipsis: 'true',
        },
        {
          title: '备注',
          key: 'remark',
          width: 60,
          ellipsis: 'true',
          render: (h, params) => {
            let val = params.row.remark
            if (val) {
              /* return h('div', [
                h('span', {
                  style: {
                    position: 'absolute',
                    display: 'inline-block',
                    width: '1px',
                    height: '1px',
                  },
                  domProps: {
                    innerHTML: val,
                  },
                }),
                h('div', {
                  style: {
                    margin: '0 auto',
                    background: `url(${this.urlRemark}) no-repeat`,
                    width: '16px',
                    height: '16px',
                  },
                }),
              ]) */
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
          title: '显示顺序',
          key: 'sort',
          width: 70,
          ellipsis: 'true',
        },
        {
          title: '最后修改人',
          key: 'operater',
          width: 90,
          ellipsis: 'true',
        },
        {
          title: '最后修改时间',
          key: 'updated_at',
          width: 130,
          ellipsis: 'true',
          render: (h, params) => {
            return h(
              'span',
               filters.timeFilter(params.row.updated_at, 'YYYY-MM-DD HH:mm'),
            )
          },
          titleRender: (row) => {
            return filters.timeFilter(row.updated_at, 'YYYY-MM-DD HH:mm')
          },
          filterType: 'date',
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.content.offsetHeight
    },
  },
  async created() {
    await this.getManagementList()
    this.totalsort = this.pageInfo.total + 1
  },
  mounted() {
    this.tableHeight = this.$refs.content.offsetHeight
  },
  destroyed() {
    this.requestPagingo()
  },
}
</script>
<style lang="less" >
@import (reference) '~assets/less/variable.less';
.categoryManagementOccupationalDiseaseInductiveFactor-all {
  padding: 10px;
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  .categoryManagementOccupationalDiseaseInductiveFactor-all-content {
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    .titlet-has-slot {
      overflow: visible;
      .paddingT10 {
        height: 50px;
        .content {
          height: 30px;
          display: flex;
          .title {
            display: inline-block;
            line-height: 30px;
            font-size: 12px;
            margin-right: 10px;
          }
          .select {
            vertical-align: top;
            margin-right: 20px;
          }
          .input {
            vertical-align: top;
            margin-right: 20px;
          }
          .group-out {
            height: 30px;
            button:last-child {
              margin-right: 0px;
            }
          }
          .group-in {
            button:last-child {
              margin-right: 0px;
            }
          }
        }
      }
    }
    .table {
      height: calc(~'100% - 50px');
      .test {
        background: red;
        height: 140px;
      }
    }
  }
  .add-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .content-footer {
      height: 211px;
      .content {
        height: 141px;
        .item1 {
          height: 50px;
          padding-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 132px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
          }
          .text {
            width: 220px;
            position: relative;
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 12px;
              top: 7px;
            }
          }
        }
        .item2 {
          margin-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            display: inline-block;
            margin-top: 7px;
            width: 132px;
            margin-right: 10px;
            text-align-last: justify;
          }
          .input {
            width: 220px;
            height: 71px;
            textarea {
              height: 100%;
            }
          }
        }
      }
      .footer {
        height: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 151px;
        .ivu-form-item-content {
          display: flex;
          .checkBox {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            margin-right: 20px;
            .ivu-checkbox {
              margin-right: 3px;
            }
          }
        }
      }
    }
    .ivu-modal-footer {
      display: none;
    }
  }
  .edit-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .content-footer {
      height: 246px;
      .content {
        height: 177px;
        .item1 {
          height: 50px;
          padding-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 132px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
          }
          .text {
            width: 222px;
            position: relative;
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 12px;
              top: 7px;
            }
          }
        }
        .item2 {
          margin-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            display: inline-block;
            margin-top: 7px;
            width: 132px;
            margin-right: 10px;
            text-align-last: justify;
          }
          .input {
            width: 222px;
            height: 71px;
            textarea {
              height: 100%;
            }
          }
        }
        .item3 {
          margin-left: 20px;
          margin-top: 20px;
          height: 16px;
          font-size: 0px;
          .lastUser {
            width: 132px;
            margin-right: 20px;
            font-size: 12px;
          }
          .updatetime {
            font-size: 12px;
          }
        }
      }
      .footer {
        height: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 151px;
        display: flex;
        .checkBox {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          margin-right: 20px;
          .ivu-checkbox {
            margin-right: 5px;
          }
        }
      }
    }
    .ivu-modal-footer {
      display: none;
    }
  }
}
</style>
