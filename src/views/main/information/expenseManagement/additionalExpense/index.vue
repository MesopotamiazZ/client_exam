/* jiangyiling */
/* 附加费管理 */
<template>
  <div class="additionalExpense-all">
    <div class="additionalExpense-all-content">
      <!-- 页面头部 -->
      <titlet-hasSlot>
        <span slot="titletHasSlotLeftTitle">附加费列表</span>
        <div slot="titletHasSlotRightContent"
             class="content">
          <search-input class="input"
                        searText="请输入搜索内容"
                        @on-enter="enterSearch"
                        @on-Icon="enterSearch"
                        @on-cancel="enterSearch"
                        :searchWidth='220'></search-input>
          <div v-if='showGroupOut'
               class="group-out">
            <Button type="ghost"
                      class="fl marginR10"
                      @click="addButton">新 增</Button>
            <Button type="ghost"
                      class="fl marginR10"
                      @click="exportBtn">导 出</Button>          
            <Button type="ghost"
                      class="fl marginR10"
                      @click="selectButton">选 择</Button>
          </div>
          <div v-else
               class="group-in">
            <Button type="success"
                      :disabled="showDelButton"
                      class="fl marginR10"
                      @click="deleCheckBoxItem">删 除</Button>
            <Button type="ghost"
                      class="fl marginR10">打 印</Button>
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
                 :isSelectMode="isSelectMode"
                 :selectMode="isSelectMode"
                 :columns="columns"
                 :data="additionalExpenseList"
                 :pageInfo="pageInfo"
                 :height="tableHeight"
                 :params="params"
                 :requestDataApi="getAdditionList"
                 :ifEdit="true"
                 @edit="editRow"
                 @edit-row="editRow"
                 @on-row-dbClick="editRow"
                 @delete="delOneRow"
                 @delete-row='delOneRow'
                 @all-selection="checkboxSelect"
                 @getRequestParams="getRequestParams"
                 @after-request="afterRequest"
                 >
        </q-table>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <div class="add-modal"
         v-if="addModalDiv">
      <Modal v-model="addModalDiv"
             width="563"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <alert-header headerText="新增附加费"
                        :headerVal="addModal.data.sort"
                        @alert-retrun-num="addSortFun"></alert-header>
        </div>
        <div class="content-footer">
          <ul class="second">
            <li v-for=" (item,index) in secoundData"
                @click="changeItem(item)"
                :class="{ 'active': index === showSecoundItem}">{{item.name}}</li>
          </ul>
          <Form ref="addForm"
                :model="addModal.data"
                :rules="addModal.rule">
            <div v-show="0 === showSecoundItem"
                 class="content-one"
                 style="height:290px">
              <div class="item1">
                <span class="title1">费用类别</span>
                <div class="text">
                  <FormItem prop="charge_category_id">
                    <Select placeholder=" " v-model="addModal.data.charge_category_id"
                            style="width:188px"
                            class="select">
                      <Option v-for="item in additionalTypesList"
                              :value="item.id"
                              :key="item.name">{{item.name}}</Option>
                    </Select>
                  </FormItem>
                  <span v-show="!addModal.data.charge_category_id"
                        class="star-mark1">*</span>
                </div>
                <span class="title2">附加费名称</span>
                <div class="text">
                  <!-- addNewItemData.name -->
                  <FormItem prop="name">
                    <Input type="text"
                           v-model.trim="addModal.data.name"></Input>
                  </FormItem>
                  <span v-show="!addModal.data.name"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item1">
                <span class="title1">单价</span>
                <div class="text">
                  <FormItem prop="price">
                    <z-input type="number" :step="0.01"
                           v-model.trim="addModal.data.price"></z-input>
                    <span class="priceItem">元</span>
                  </FormItem>
                  <span v-show="!addModal.data.price"
                        class="star-mark1">*</span>
                </div>
                <span class="title2">执行科室</span>
                <div class="text">
                  <!-- addNewItemData.name -->
                  <Select placeholder=" " v-model="addModal.data.dept_id"
                          style="width:188px"
                          class="select">
                    <Option v-for="item in adminOfficeList"
                            :value="item.id"
                            :key="item.name">{{item.name}}</Option>
                  </Select>
                </div>
              </div>
              <div class="item2">
                <span class="title">备注</span>
                <Input class="input"
                       type="textarea"
                       v-model.trim="addModal.data.remark"></Input>
              </div>
            </div>
            <div v-show="1 === showSecoundItem"
                 class="content-two">
              <custom-transfer listWidth="230px"
                               :columns='customInit.columns'
                               :sourceData='customInit.sourceData'
                               :moveAll="true"
                               v-model="newExcludeSurchargeIds">
              </custom-transfer>
            </div>
            <div class="footer">
              <FormItem>
                <Checkbox class="checkBox"
                          v-model="addNewCheck">启用</Checkbox>
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
    <div class="add-modal"
         v-if="editModalDiv">
      <Modal v-model="editModalDiv"
             width="563"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <alert-header headerText="编辑费用类别"
                        :headerVal="editModal.data.sort"
                        @alert-retrun-num="editSortFun"></alert-header>
        </div>
        <div class="content-footer"
            style="height:432px"
        >
          <div class="content">
            <ul class="second">
              <li v-for=" (item,index) in secoundData"
                  @click="changeItem(item)"
                  :class="{ 'active': index === showSecoundItem}">{{item.name}}</li>
            </ul>
            <Form ref="editForm"
                  :model="editModal.data"
                  :rules="editModal.rule">
              <div v-show="0 === showSecoundItem"
                   class="content-one"
                   style="height:290px">
                <div class="item1">
                  <span class="title1">费用类别</span>
                  <div class="text">
                    <FormItem prop="charge_category_id">
                      <Select placeholder=" " v-model="editModal.data.charge_category_id"
                              style="width:188px"
                              class="select">
                        <Option v-for="item in additionalTypesList"
                                :value="item.id"
                                :key="item.name">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!editModal.data.charge_category_id"
                          class="star-mark1">*</span>
                  </div>
                  <span class="title2">附加费名称</span>
                  <div class="text">
                    <!-- addNewItemData.name -->
                    <FormItem prop="name">
                      <Input type="text"
                             v-model.trim="editModal.data.name"></Input>
                    </FormItem>
                    <span v-show="!editModal.data.name"
                          class="star-mark">*</span>
                  </div>
                </div>
                <div class="item1">
                  <span class="title1">单价</span>
                  <div class="text">
                    <FormItem prop="price">
                      <z-input type="number" :step="0.01"
                             v-model.trim="editModal.data.price"></z-input>
                      <span class="priceItem">元</span>
                    </FormItem>
                    <span v-show="!editModal.data.price"
                          class="star-mark1">*</span>
                  </div>
                  <span class="title2">执行科室</span>
                  <div class="text">
                    <!-- addNewItemData.name -->
                    <Select placeholder=" " v-model="editModal.data.dept_id"
                            style="width:188px"
                            class="select">
                      <Option v-for="item in adminOfficeList"
                              :value="item.id"
                              :key="item.name">{{item.name}}</Option>
                    </Select>
                  </div>
                </div>
                <div class="item2">
                  <span class="title">备注</span>
                  <Input class="input"
                         type="textarea"
                         v-model.trim="editModal.data.remark"></Input>
                </div>
              </div>
              <div v-show="1 === showSecoundItem"
                   class="content-two">
                <custom-transfer listWidth="230px"
                                 :columns='customInit.columns'
                                 :sourceData='customInit.sourceData'
                                 :moveAll="true"
                                 v-model="editExcludeSurchargeIds">
                </custom-transfer>
              </div>
              <div class="lastItem">
                <span>最后修改人：{{operater}}</span>
                <span>最后修改时间：{{lastTime}}</span>
              </div>  
              <div class="footer">
                <FormItem>
                  <Checkbox class="checkBox"
                            v-model="editStatusBool">启用</Checkbox>
                  <Button type="primary"
                          class="marginR20"
                          @click="saveEdit('editForm')">保 存</Button>
                  <Button type="ghost"
                          @click="editModalDiv = false">取 消</Button>
                </FormItem>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
    <affirm-del-modal :delCounts="deletItemLength"
                      :controlModal="controlModal"
                      @delCancel="delCancel"
                      @affirmDel="affirmDelItem"></affirm-del-modal>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'
// import moment from 'moment'
import {timeFilter} from '@/utils/fifters'
import * as _ from 'lodash'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
export default {
  name: 'additionalExpense',
  components: {
    titletHasSlot,
  },
  data() {
    return {
      exportParams: {
        reqParams: {},
        columns: [
          {
            title: '附加费名称',
            key: 'name',
          },
          {
            title: '费用类别',
            key: 'charge_category_name',
          },
          {
            title: '单价（元）',
            key: 'price',
          },
          {
            title: '执行科室',
            key: 'dep_name',
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
      editExcludeSurchargeIds: [],
      newExcludeSurchargeIds: [],
      customInit: {
        columns: [
          {
            title: '附加费名称',
            key: 'name',
          },
        ],
        sourceData: [], // 穿梭框右侧数据
      },
      /* addNewDefalut: true, */
      addNewCheck: true,
      operater: '',
      addModal: {
        data: {
          name: '',
          charge_category_id: null,
          remark: '',
          /* is_default: 1, */
          status: 1,
          price: null,
          dept_id: null,
          exclude_surcharge_ids: [],
        },
        rule: {
          name: [
            {
              required: true,
              message: '附加费名称不能为空',
              trigger: 'blur',
            },
          ],
          charge_category_id: [
            {
              required: true,
              message: '费用类别不能为空',
              type: 'number',
              trigger: 'change',
            },
          ],
          price: [
            {
              required: true,
              message: '单价不能为空',
              type: 'string',
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
      checkboxId: [],
      // 编辑
      lastTime: null,
      editSort: null,
      editStatusBool: false,
      /* editDefalutBool: false, */
      editModal: {
        data: {
          name: '',
          charge_type: '',
          remark: '',
          /* is_default: '', */
          status: 0,
        },
        rule: {
          name: [
            {
              required: true,
              message: '附加费名称不能为空',
              trigger: 'blur',
            },
          ],
          charge_type: [
            {
              required: true,
              message: '费用类别不能为空',
              type: 'number',
              trigger: 'change',
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
      chargeTypeName: [
        {
          charge_type: 1,
          charge_type_name: '体检费',
        },
        {
          charge_type: 2,
          charge_type_name: '处方费',
        },
        {
          charge_type: 3,
          charge_type_name: '会员费',
        },
        {
          charge_type: 4,
          charge_type_name: '附加费',
        },
      ],
      showSecoundItem: 0,
      secoundData: [
        {
          name: '基本信息',
          number: 0,
          item: 'item1',
        },
        {
          name: '排斥附加费',
          number: 1,
          item: 'item2',
        },
      ],
    }
  },
  methods: {
    ...mapMutations('additionalExpenseModule', ['requestPagingo']),
    // test
    /* ...mapActions('chargeTypeModule', [
      'getProExamTypes',
      'adNewItemFun',
      'amendItemFun',
      'deletItemFun',
    ]), */
    ...mapActions('additionalExpenseModule', [
      'getAdditionList',
      'getTypeList',
      'getAdminOffice',
      'deletItemFun',
      'adNewItemFun',
      'amendItemFun',
    ]),
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('附加费列表', {
        api: api.additionalExpense.surchargesList,
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
    afterRequest() {
      this.checkboxId = []
    },
    changeItem(data) {
      this.showSecoundItem = data.number
    },
    addSortFun(data) {
      this.addModal.data.sort = data
    },
    editSortFun(data) {
      this.editModal.data.sort = data
    },
    /* allSelection(data) {
      this.checkboxId = data.map(item => {
        return item.id
      })
    }, */
    // 翻页
    /* pageSizeChange() {
      this.checkboxId = []
    }, */
    // 删除
    delCancel() {
      this.controlModal = false
    },
    deleCheckBoxItem() {
      this.controlModal = true
      this.deletItemLength = this.checkboxId.length
      this.clickId = null
    },
    delOneRow(data) {
      this.clickId = data.id
      this.deletItemLength = 1
      this.controlModal = true
    },
    checkboxSelect(data) {
      this.checkboxId = data.map(item => item.id)
      if (this.checkboxId.length) {
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
      if (this.checkboxId && !this.clickId) {
        await this.deletItemFun({ ids: this.checkboxId })
        if (
          this.pageInfo.total <=
            (this.pageInfo.current_page - 1) * this.pageInfo.per_page +
              this.checkboxId.length &&
          this.pageInfo.current_page !== 1
        ) {
          await this.$refs.baseInfoTable.request({
            current_page: this.pageInfo.current_page - 1,
          })
        } else {
          await this.$refs.baseInfoTable.request()
        }
        this.totalsort = this.totalsort - this.checkboxId.length
      }
      this.$refs.baseInfoTable.allSelection = []
      this.checkboxId = []
      this.clickId = null
      this.showDelButton = true
      this.controlModal = false
    },
    // 编辑
    async editRow(owData, event) {
      /* this.editSort = owData.sort */
      await Promise.all([this.getTypeList({ per_page: 100000, filters: 'status:1' }), this.getAdminOffice({ per_page: 100000, filters: 'status:1' })])
      this.showSecoundItem = 0
      this.customInit.sourceData = this.additionalExpenseList
      this.operater = owData.operater
      this.editModal.data = _.clone(owData)
      this.editExcludeSurchargeIds = this.editModal.data.exclude_surcharges
      /* if (this.editModal.data.exclude_surcharge_ids && this.editModal.data.exclude_surcharge_ids.length) {
        this.editExcludeSurchargeIds = this.customInit.sourceData.filter(item => {
          for (let i = 0; i < this.editModal.data.exclude_surcharge_ids.length; i++) {
            return item === this.editModal.data.exclude_surcharge_ids[i].id
          }
        })
      } else {
        this.editExcludeSurchargeIds = []
      } */
      this.editStatusBool = !!this.editModal.data.status
      this.lastTime = timeFilter(this.editModal.data.updated_at, 'YYYY-MM-DD HH:mm')
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
          dept_id: this.editModal.data.dept_id,
          charge_category_id: this.editModal.data.charge_category_id,
          exclude_surcharges: this.editExcludeSurchargeIds.map(item => item.id),
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
    /* newStatusValueFun(data) {
      if (data) {
        this.newStatus = 1
      } else {
        this.newStatus = 0
      }
    }, */
    async saveNewItem(formName) {
      this.addModal.data.status = this.addNewCheck ? 1 : 0
      /* this.addModal.data.sort = this.totalsort */
      this.addModal.data.exclude_surcharge_ids = this.newExcludeSurchargeIds.map(
        item => {
          return item.id
        },
      )
      /* this.addModal.data.is_default = this.addNewDefalut ? 1 : 0 */
      try {
        if (await this.$refs[formName].validate()) {
          await this.adNewItemFun(this.addModal.data)
          await this.$refs.baseInfoTable.request()
          this.addModalDiv = false
          /* this.totalsort++ */
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
    async addButton() {
      /* this.totalsort = this.pageInfo.total + 1 */
      for (let k in this.addModal.data) {
        this.addModal.data[k] = null
      }
      this.addModal.data.sort = this.totalsort
      this.addModalDiv = true
      this.addNewCheck = true
      this.showSecoundItem = 0
      await Promise.all([this.getTypeList({ per_page: 100000, filters: 'status:1' }), this.getAdminOffice({ per_page: 100000, filters: 'status:1' })])
      /* this.addNewDefalut = true */
      this.customInit.sourceData = this.additionalExpenseList
    },
    async enterSearch(val) {
      /* if (!val && !this.searchText) {
        return
      } */
      this.params.search = val
      this.$refs.baseInfoTable.currentPage = 1
      this.$refs.baseInfoTable.allSelection = []
      this.showDelButton = true
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
      this.checkboxId = []
    },
  },
  computed: {
    ...mapState(['windowHeight']),
    // test
    /* ...mapGetters('chargeTypeModule', ['chargeTypeList', 'pageInfo']), */
    ...mapGetters('additionalExpenseModule', [
      'additionalExpenseList',
      'additionalTypesList',
      'adminOfficeList',
      'pageInfo',
    ]),
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
          title: '附加费名称',
          key: 'name',

          ellipsis: 'true',
        },
        {
          title: '费用类别',
          key: 'charge_category_name',

          ellipsis: 'true',
        },
        {
          title: '单价（元）',

          key: 'price',
          ellipsis: 'true',
        },
        {
          title: '执行科室',
          key: 'dep_name',

          ellipsis: 'true',
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: 'true',
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
          title: '显示顺序',
          key: 'sort',
          ellipsis: 'true',
          width: 70,
        },
        {
          title: '最后修改人',
          key: 'operater',
          ellipsis: 'true',
          width: 90,
        },
        {
          title: '最后修改时间',
          key: 'updated_at',
          width: 130,
          ellipsis: 'true',
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
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.content.offsetHeight
    },
  },
  async created() {
    await this.getAdditionList()
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
.additionalExpense-all {
  padding: 10px;
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  .additionalExpense-all-content {
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
      height: 394px;
      .second {
        margin-left: 19px;
        margin-right: 20px;
        margin-top: 20px;
        height: 34px;
        border-bottom: 1px solid #d9d9d9;
        display: flex;
        & > li {
          font-size: 14px;
          color: #737373;
          margin-right: 25px;
          cursor: pointer;
        }
        & > .active {
          font-weight: bold;
          font-size: 14px;
          color: #008cee;
          border-bottom: 3px solid #008cee;
        }
      }
      .content-one {
        height: 180px;
        .item1 {
          height: 50px;
          padding-top: 20px;
          margin-left: 19px;
          display: flex;
          .title1 {
            width: 48px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .title2 {
            width: 60px;
            margin-right: 10px;
            margin-left: 20px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .text {
            width: 188px;
            position: relative;
            .star-mark1 {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 22px;
              top: 7px;
            }
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 12px;
              top: 7px;
            }
            .priceItem {
              position: absolute;
              font-size: 12px;
              right: 7px;
              top: 7px;
            }
          }
        }
        .item2 {
          margin-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            margin-top: 9px;
            width: 48px;
            margin-right: 10px;
            text-align-last: justify;
          }
          .input {
            width: 466px;
            height: 60px;
            textarea {
              height: 100%;
            }
          }
        }
      }
      .content-two {
        margin-top: 20px;
        margin-left: 20px;
        .customTransfer {
          height: 270px;
          .customTransfer-list {
            height: 100% !important;
            width: 216px !important;
          }
          .customTransfer-operation {
            width: 90px;
          }
        }
      }
      .lastItem {
        margin-top: 20px;
        margin-left:20px;
        &>span:last-child {
          margin-left: 20px;
        }
      }
      .footer {
        height: 50px;
        margin-top: 20px;
        /* margin-bottom: 20px; */
        margin-left: 310px;
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
}
</style>
