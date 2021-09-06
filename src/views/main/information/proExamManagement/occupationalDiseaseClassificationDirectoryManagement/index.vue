/* jiangyiling 职业病分类和目录管理 */
<template>
  <!-- jiangyiling -->
  <div class="occupationalDiseaseClassificationDirectoryManagement-all">
    <div class="occupationalDiseaseClassificationDirectoryManagement-content">
      <split-pane style="width:100%;height:100%"
                  :min="22"
                  :max="28"
                  direction="horizontal"
                  v-model="triggerOffset">
        <!-- 左 -->
        <div slot="left"
             class="left">
          <search-tree :totalTitle="totalTitle"
                       :data="leftTreeData "
                       @local-search-key="localSearchKey"
                       @on-select-change='treeSelectChange'>
          </search-tree>
        </div>
        <!-- 右 -->
        <div slot="right"
             class="right">
          <titlet-hasSlot>
            <span slot="titletHasSlotLeftTitle">职业病列表</span>
            <div slot="titletHasSlotRightContent"
                 class="content">
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
          <!--  表格 -->
          <div class="table"
               ref="content">
            <q-table ref="baseInfoTable"
                     :selectMode="isSelectMode"
                     :columns="columns"
                     :data="occDiseaseListClone"
                     :pageInfo="rightPageInfo"
                     :height="tableHeight"
                     :params="params"
                     :requestDataApi="getOccDisList"
                     :ifEdit="true"
                     :width="1080"
                     @edit="editRow"
                     @edit-row='editRow'
                     @on-row-dbClick="editRow"
                     @delete="delOneRow"
                     @delete-row='delOneRow'
                     @getRequestParams="getRequestParams"
                     @all-selection="checkboxSelect">
            </q-table>
          </div>
        </div>
      </split-pane>
    </div>
    <!-- 新增弹窗 -->
    <div class="add-modal"
         v-if="addModalDiv">
      <Modal v-model="addModalDiv"
             width="438"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <!-- <alert-header headerText="新增职业健康检查种类" :headerVal="totalsort"  @alert-retrun-num="editSortFun"  ></alert-header> -->
          <alert-header headerText="新增职业病"
                        :headerVal="addModal.data.sort"
                        @alert-retrun-num="addSortFun"></alert-header>
        </div>
        <div class="content-footer">
          <Form ref="addForm"
                :model="addModal.data"
                :rules="addModal.rule">
            <div class="content">
              <div class="item1">
                <span class="title">职业病类别</span>
                <div class="text">
                  <FormItem prop="disease_type_id">
                    <Select 
                    filterable
                            v-model="addModal.data.disease_type_id"
                            placeholder=""
                            class="select">
                      <Option v-for="item in leftTreeData[0].children"
                              :value="item.id"
                              :key="item.id">{{ item.title }}</Option>
                    </Select>
                  </FormItem>
                  <span v-show="!addModal.data.disease_type_id"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item-a">
                <span class="title">职业病名称</span>
                <div class="text">
                  <FormItem prop="name">
                    <select-input class="input" v-model="addModal.data.name"
                                  :data="occDiseaseStdList"></select-input>
                    <!-- <Input class="input"
                           type="text"
                           v-model.trim="addModal.data.name"></Input> -->
                  </FormItem>
                  <span v-show="!addModal.data.name"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item-b">
                <span class="title">建议</span>
                <Input class="input"
                       type="textarea"
                       v-model.trim="addModal.data.advise"></Input>
              </div>
              <!-- <div class="item-b">
              <span class="title">对劳动者的影响</span>
              <Input class="input" type="textarea" v-model.trim = "addModal.data.affect"></Input>
            </div>   -->
              <div class="item-b">
                <span class="title">备注</span>
                <Input class="input"
                       type="textarea"
                       v-model="addModal.data.remark"></Input>
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
                        @click="addModalDiv = false">取 消</Button>
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
    <!-- 编辑 弹窗 -->
    <div class="edit-modal"
         v-if="editModalDiv">
      <Modal v-model="editModalDiv"
             width="438"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <!-- <alert-header headerText="新增职业健康检查种类" :headerVal="totalsort"  @alert-retrun-num="editSortFun"  ></alert-header> -->
          <alert-header headerText="编辑职业病"
                        :headerVal="editModal.data.sort"
                        @alert-retrun-num="editSortFun"></alert-header>
        </div>
        <div class="content-footer">
          <Form ref="editForm"
                :model="editModal.data"
                :rules="editModal.rule">
            <div class="content">
              <div class="item1">
                <span class="title">职业病类别</span>
                <div class="text">
                  <FormItem prop="name">
                    <Select filterable
                            v-model="editModal.data.disease_type_id"
                            placeholder=""
                            class="select">
                      <Option v-for="item in leftTreeData[0].children"
                              :value="item.id"
                              :key="item.id">{{ item.title }}</Option>
                    </Select>
                  </FormItem>
                  <span v-show="editModal.data.disease_type_id"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item-a">
                <span class="title">职业病名称</span>
                <div class="text">
                  <FormItem prop="name">
                    <select-input class="input"
                           type="text"
                           :data="occDiseaseStdList"
                           v-model="editModal.data.name"></select-input>
                  </FormItem>
                  <span v-show="!editModal.data.name"
                        class="star-mark">*</span>
                </div>
                <!-- <span class="title2">危害年限</span>
              <Input class="input2" type="text" v-model="editModal.data.year" ></Input>   -->
              </div>
              <div class="item-b">
                <span class="title">建议</span>
                <Input class="input"
                       type="textarea"
                       v-model="editModal.data.advise"></Input>
              </div>
              <!-- <div class="item-b">
              <span class="title">对劳动者的影响</span>
              <Input class="input" type="textarea"   v-model="editModal.data.affect"></Input>
            </div> -->
              <div class="item-b">
                <span class="title">备注</span>
                <Input class="input"
                       type="textarea"
                       v-model="editModal.data.remark"></Input>
              </div>
              <div class="item3">
                <span class="lastUser">最后修改人：{{operater}}</span>
                <span class="updatetime">最后修改时间：{{lastTime}}</span>
              </div>
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
      </Modal>
    </div>
    <affirm-del-modal :delCounts="deletItemLength"
                      :controlModal="controlModal"
                      @delCancel="delCancel"
                      @affirmDel="affirmDelItem">
    </affirm-del-modal>
  </div>
</template>
<script>
import searchTree from '@/components/tree/searchTree'
import titletHasSlot from '@/components/titleHasSlot'
// import moment from 'moment'
import {timeFilter} from '@/utils/fifters'
/* import * as _ from 'lodash' */
/* import { mapState, mapActions, mapGetters, mapMutations } from 'vuex' */
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
export default {
  name: 'occupationalDiseaseClassificationDirectoryManagement',
  components: {
    searchTree,
    titletHasSlot,
  },
  data() {
    return {
      exportParams: {
        reqParams: {},
        columns: [
          {
            key: 'disease_type_id',
            title: '职业病类别',
            render: (value) => {
              return this.leftTreeDataChildren[value - 1].title
            },
          },
          {
            title: '职业病名称',
            key: 'name',
          },
          {
            title: '建议',
            key: 'advise',
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
      addNewCheck: true,
      leftTreeId: null,
      leftTreeDataChildren: [
        {
          id: 1,
          title: '职业性尘肺病',
        },
        {
          id: 2,
          title: '职业性其他呼吸系统疾病',
        },
        {
          id: 3,
          title: '职业性皮肤病',
        },
        {
          id: 4,
          title: '职业性眼病',
        },
        {
          id: 5,
          title: '职业性耳鼻喉口腔疾病',
        },
        {
          id: 6,
          title: '职业性化学中毒',
        },
        {
          id: 7,
          title: '物理因素所致职业病',
        },
        {
          id: 8,
          title: '职业性放射性疾病',
        },
        {
          id: 9,
          title: '职业性传染病',
        },
        {
          id: 10,
          title: '职业性肿瘤',
        },
        {
          id: 11,
          title: '其他职业病',
        },
      ],
      occDiseaseListClone: [],
      operater: '',
      statusValue: '',
      totalTitle: '所有职业病危害因素类别',
      atMax: false,
      atMin: false,
      triggerOffset: 22,
      checkboxId: [],
      showDelButton: true,
      /* allSelection: true, */
      isSelectMode: false,
      clickId: null,
      deletItemLength: null,
      controlModal: false,
      searchText: '',
      editModalDiv: false,
      leftTreeData: [],
      showGroupOut: true,
      tableHeight: 400,
      addModalDiv: false,
      describe: '',
      newStatus: 1,
      editStatusBool: false,
      params: {
        search: '',
        filters: '',
      },
      urlRemark: '/static/icons/public/remarkInCell.svg',
      // 新增数据&验证
      addModal: {
        data: {
          advise: '',
          name: '',
          remark: '',
          status: 0,
          disease_type_id: '',
          sort: '',
        },
        rule: {
          disease_type_id: [
            {
              required: true,
              message: '职业病类别不能为空',
              type: 'number',
              trigger: 'change',
            },
          ],
          name: [
            {
              required: true,
              message: '职业病名称不能为空',
              trigger: 'blur',
            },
          ],
        },
      },
      editModal: {
        data: {
          id: '',
          advise: '',
          name: '',
          remark: '',
          status: 0,
          disease_type_id: '',
        },
        rule: {
          type_id: [
            {
              required: false,
              message: '职业病类别不能为空',
              type: 'number',
              trigger: 'change',
            },
          ],
          name: [
            {
              required: true,
              message: '职业病名称不能为空',
              trigger: 'blur',
            },
          ],
        },
      },
    }
  },
  methods: {
    ...mapMutations(
      'occupationalDiseaseClassificationDirectoryManagementModule',
      ['requestPagingo'],
    ),
    ...mapActions(
      'occupationalDiseaseClassificationDirectoryManagementModule',
      ['getOccDisList', 'deletItemFun', 'adNewItemFun', 'amendItemFun', 'getOccDisStdList'],
    ),
    /* async statusValueChange(data) {
      this.params.status = data
      await this.$refs.baseInfoTable.request()
    }, */
    addSortFun(data) {
      /* this.totalsort = data */
      this.addModal.sort = data
    },
    editSortFun(data) {
      this.editModal.data.sort = data
    },
    /* allSelection(data) {
      this.checkboxId = data.map(item => {
        return item.id
      })
    }, */
    handleMoving(e) {
      this.atMax = e.atMax
      this.atMin = e.atMin
    },
    deleCheckBoxItem() {
      this.controlModal = true
      this.deletItemLength = this.checkboxId.length
      this.clickId = null
    },
    // 多选
    checkboxSelect(data) {
      this.checkboxId = data.map(item => {
        return item.id
      })
      if (this.checkboxId.length) {
        this.showDelButton = false
      } else {
        this.showDelButton = true
      }
    },
    // 编辑保存
    async saveEdit(formName) {
      var thisdatan = {
        id: this.editModal.data.id,
        params: {
          advise: this.editModal.data.advise,
          name: this.editModal.data.name,
          remark: this.editModal.data.remark,
          status: this.editStatusBool ? 1 : 0,
          sort: this.editModal.data.sort,
          disease_type_id: this.editModal.data.disease_type_id,
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
    // 编辑
    async editRow(owData, event) {
      await this.getOccDisStdList({per_page: 100000,
        filters: 'status:1' })
      this.editSort = owData.sort
      /* this.editModal.data = _.clone(owData)
      this.operater = owData.operater
      this.editModal.disease_type_id = owData.id */
      this.editModal.data = {
        id: owData.id,
        advise: owData.advise === '/' ? '' : owData.advise,
        name: owData.name,
        remark: owData.remark,
        status: owData.status,
        disease_type_id: owData.disease_type_id,
        sort: owData.sort,
      }
      this.operater = owData.operater
      this.lastTime = timeFilter(owData.updated_at, 'YYYY-MM-DD HH:mm')
      this.editStatusBool = !!this.editModal.data.status
      this.editModalDiv = true
    },
    // 确认删除
    async affirmDelItem() {
      if (this.clickId) {
        await this.deletItemFun({ ids: this.clickId })
        this.totalsort--
        if (
          this.rightPageInfo.total <=
            (this.rightPageInfo.page - 1) * this.rightPageInfo.page_size + 1 &&
          this.rightPageInfo.page !== 1
        ) {
          await this.$refs.baseInfoTable.request({
            page: this.rightPageInfo.page - 1,
          }) // 重新请求页面数据
        } else {
          await this.$refs.baseInfoTable.request() // 重新请求页面数据
        }
      }
      if (this.checkboxId && !this.clickId) {
        await this.deletItemFun({ ids: this.checkboxId })
        if (
          this.rightPageInfo.total <=
            (this.rightPageInfo.page - 1) * this.rightPageInfo.page_size +
              this.checkboxId.length &&
          this.rightPageInfo.page !== 1
        ) {
          await this.$refs.baseInfoTable.request({
            page: this.rightPageInfo.page - 1,
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
    delOneRow(data) {
      this.clickId = data.id
      this.deletItemLength = 1
      this.controlModal = true
    },
    delCancel() {
      this.controlModal = false
    },
    async enterSearch(val) {
      if (!val && !this.searchText) {
        return
      }
      this.params.search = val
      this.params.filters = this.leftTreeId
        ? `disease_type_id:${this.leftTreeId}`
        : ''
      this.$refs.baseInfoTable.allSelection = []
      this.showDelButton = true
      this.searchText = val
    },
    localSearchKey(data) {
      /* console.log(data) */
    },
    // 新增保存
    async saveNewItem(formName) {
      this.addModal.data.status = this.newStatus
      /* this.addModal.data.sort = this.totalsort */
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
    // 启用按钮
    newStatusValueFun(data) {
      if (data) {
        this.newStatus = 1
      } else {
        this.newStatus = 0
      }
    },
    // 新 增 按钮
    async addButton() {
      await this.getOccDisStdList({per_page: 100000,
        filters: 'status:1' })
      this.addModalDiv = true
      this.addModal.data = {
        advise: '',
        name: '',
        remark: '',
        status: 0,
        disease_type_id: this.leftTreeId ? this.leftTreeId : '',
        sort: this.totalsort,
      }
      /* this.totalsort = this.rightPageInfo.total + 1 */
    },
    cancelButton() {
      this.showGroupOut = !this.showGroupOut
      this.isSelectMode = !this.isSelectMode
      /* this.$refs.baseInfoTable.allSelection = []
      this.checkboxId = [] */
    },
    cancelNewItem() {
      this.addModalDiv = false
    },
    selectButton() {
      this.showGroupOut = !this.showGroupOut
      this.isSelectMode = !this.isSelectMode
    },
    async treeSelectChange(data) {
      if (data[0].id) {
        this.params.filters = `disease_type_id:${data[0].id}`
        /* await this.getOccDisList({ filters: `disease_type_id:${data[0].id}` }) */
        this.leftTreeId = data[0].id
      } else {
        this.params.filters = ''
        this.leftTreeId = ''
        /* await this.getOccDisList() */
      }
      /* if (data[0].level === 1) {
        data[0].expand = !data[0].expand
      } */
      if (!this.showDelButton) {
        this.showDelButton = true
        this.checkboxId = []
      }
    },
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('职业病列表', {
        api: api.occupationalDiseaseClassificationDirectoryManagement.getList,
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
    /* ...mapGetters('managementOccupationalDiseaseInductiveFactorModule', ['occupHarmTypesList', 'occupRightTypesList', 'rightPageInfo']), */
    ...mapGetters(
      'occupationalDiseaseClassificationDirectoryManagementModule',
      ['occDiseaseList', 'rightPageInfo', 'occDiseaseStdList'],
    ),
    columns() {
      return [
        {
          title: '职业病类别',
          key: 'disease_type_name',
          ellipsis: 'true',

        },
        {
          title: '职业病名称',
          key: 'name',
          ellipsis: 'true',

        },
        {
          title: '建议',
          key: 'advise',
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
              timeFilter(params.row.updated_at, 'YYYY-MM-DD H:mm')
            )
          },
          titleRender: (row) => {
            return timeFilter(row.updated_at, 'YYYY-MM-DD H:mm')
          },
          filterType: 'date',
        },
      ]
    },
  },
  watch: {
    occDiseaseList(data) {
      this.occDiseaseListClone = data.map(item => {
        item.disease_type_name = this.leftTreeDataChildren[item.disease_type_id - 1].title
        return item
      })
    },
    windowHeight(val) {
      this.tableHeight = this.$refs.content.offsetHeight
    },
  },
  async created() {
    await this.getOccDisList()
    this.totalsort = this.rightPageInfo.total + 1
  },
  mounted() {
    this.tableHeight = this.$refs.content.offsetHeight
    this.leftTreeData = [
      {
        title: '所有职业病危害因素类别',
        id: 0,
        level: 1,
        expand: true,
        children: [
          {
            id: 1,
            title: '职业性尘肺病',
          },
          {
            id: 2,
            title: '职业性其他呼吸系统疾病',
          },
          {
            id: 3,
            title: '职业性皮肤病',
          },
          {
            id: 4,
            title: '职业性眼病',
          },
          {
            id: 5,
            title: '职业性耳鼻喉口腔疾病',
          },
          {
            id: 6,
            title: '职业性化学中毒',
          },
          {
            id: 7,
            title: '物理因素所致职业病',
          },
          {
            id: 8,
            title: '职业性放射性疾病',
          },
          {
            id: 9,
            title: '职业性传染病',
          },
          {
            id: 10,
            title: '职业性肿瘤',
          },
          {
            id: 11,
            title: '其他职业病',
          },
        ],
      },
    ]
  },
  destroyed() {
    this.requestPagingo()
  },
}
</script>
<style lang="less" >
.occupationalDiseaseClassificationDirectoryManagement-all {
  padding: 10px;
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  .occupationalDiseaseClassificationDirectoryManagement-content {
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    .split-pane-left-area {
      overflow: hidden;
      .left {
        width: 100%;
        display: inline-block;
        padding-left: 10px;
        height: 100%;
        overflow: hidden;
        background: #f2f7ff;
        .curPointer {
          display: none;
        }
      }
    }

    .right {
      width: 100%;
      display: inline-block;
      height: 100%;
      .titlet-has-slot {
        overflow: visible;
        .title {
          display: inline-block;
          line-height: 30px;
          font-size: 12px;
          margin-right: 10px;
        }
        .select {
          vertical-align: top;
          margin-right: 20px;
          z-index: 999;
        }
      }

      .table {
        height: calc(~'100% - 50px');
      }
      .content {
        height: 30px;
        display: flex;
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
  .add-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .content-footer {
      height: 330px;
      .content {
        height: 260px;
        .item1 {
          height: 50px;
          padding-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 60px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
          }
          .text {
            width: 323px;
            position: relative;
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 23px;
              top: 7px;
            }
          }
        }
        .item-a {
          height: 50px;
          padding-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 60px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
          }
          .text {
            width: 324px;
            position: relative;
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 12px;
              top: 8px;
            }
          }
          /* .title2 {
           display: inline-block;
           height: 30px;
           line-height: 30px;
           margin-left: 20px;
         }
         .input2 {
           width: 64px;
           margin-left: 10px;
         } */
        }
        .item-b {
          margin-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 60px;
            margin-right: 10px;
            margin-top: 3px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .input {
            width: 323px;
            height: 60px;
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
        margin-left: 180px;
        .ivu-form-item-content {
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

        /* .checkBox {
         display: inline-block;
         height: 30px;
         line-height: 30px;
         margin-right: 20px;
         .ivu-checkbox {
           margin-right: 5px;
         }
       } */
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
      height: 363px;
      .content {
        height: 293px;
        .item1 {
          height: 50px;
          padding-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 60px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .text {
            width: 324px;
            position: relative;
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 23px;
              top: 7px;
            }
          }
        }
        .item-a {
          height: 50px;
          padding-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 60px;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .text {
            width: 324px;
            position: relative;
            .star-mark {
              position: absolute;
              font-size: 16px;
              color: #ff6262;
              right: 12px;
              top: 8px;
            }
          }
          /* .title2 {
           display: inline-block;
           height: 30px;
           line-height: 30px;
           margin-left: 20px;
         }
         .input2 {
           width: 64px;
           margin-left: 10px;
         } */
        }
        .item-b {
          margin-top: 20px;
          margin-left: 20px;
          display: flex;
          .title {
            width: 60px;
            margin-right: 10px;
            margin-top: 3px;
            height: 30px;
            line-height: 30px;
            text-align-last: justify;
          }
          .input {
            width: 324px;
            height: 60px;
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
        margin-left: 180px;
        .ivu-form-item-content {
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

        /* .checkBox {
         display: inline-block;
         height: 30px;
         line-height: 30px;
         margin-right: 20px;
         .ivu-checkbox {
           margin-right: 5px;
         }
       } */
      }
    }
    .ivu-modal-footer {
      display: none;
    }
  }
}
</style>
