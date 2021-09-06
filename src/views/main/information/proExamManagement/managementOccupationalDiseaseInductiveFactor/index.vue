
<template>
<!-- jiangyiling -->
<div class="managementOccupationalDiseaseInductiveFactor-all">
<div class="managementOccupationalDiseaseInductiveFactor-content">
  <split-pane style="width:100%;height:100%" :min="22" :max="28"  direction="horizontal" v-model="triggerOffset">
    <!-- 左 -->
    <div slot="left" class="left">
      <search-tree skipName='categoryManagementOccupationalDiseaseInductiveFactor' :totalTitle="totalTitle" :data="leftTreeData" @local-search-key="localSearchKey" @on-select-change='treeSelectChange'>
      </search-tree>
    </div>
    <!-- 右 -->
    <div  slot="right" class="right">
      <titlet-hasSlot>
          <span slot="titletHasSlotLeftTitle">职业病危害因素列表</span>
          <div slot="titletHasSlotRightContent" class="content">
              <!-- <Select v-model="statusValue" @on-change="statusValueChange(statusValue)" class="select"  style="width:78px" placeholder="全部" :filterable='true' >
                  <Option value="">全部</Option>
                  <Option :value="1">启用</Option>
                  <Option :value="0">未启用</Option>
              </Select> -->
                <search-input class="input" searText="请输入搜索内容" @on-enter="enterSearch" @on-Icon="enterSearch" @on-cancel="enterSearch" :searchWidth='220' ></search-input>
              <div v-if='showGroupOut' class="group-out" key="1">
                <Button type="ghost" class="fl marginR10" @click="addButton" >新 增</Button>
                <Button type="ghost" class="fl marginR10" @click="exportBtn">导 出</Button>
                <Button type="ghost" class="fl marginR10"  @click="selectButton" >选 择</Button>
              </div>
              <div v-else class="group-in" key="2">
                <Button type="success" :disabled = "showDelButton" class="fl marginR10" @click="deleCheckBoxItem">删 除</Button>
                <Button type="primary" class="fl marginR10" @click="cancelButton" >取 消</Button>
              </div>
          </div>  
      </titlet-hasSlot>
        <!--  表格 -->
      <div class="table" ref="content">
        <q-table
          ref="baseInfoTable"
          :selectMode="isSelectMode"
          :columns="columns"
          :data="occupRightTypesList"
          :pageInfo="rightPageInfo"
          :height="tableHeight"
          :params = "params"
          :width="1088"
          :requestDataApi="getOccupRightTypesList"
          :ifEdit="true"
          @edit="editRow"
          @edit-row='editRow'
          @on-row-dbClick="editRow"
          @delete="delOneRow"
          @delete-row='delOneRow'
          @getRequestParams="getRequestParams"
          @all-selection="checkboxSelect"
          >
        </q-table>
      </div>
    </div>
  </split-pane>
</div>
  <!-- 新增弹窗 -->  
  <div class="add-modal" v-if="addModalDiv" >
      <Modal
        v-model="addModalDiv"
        width="488"
        :transition-names="[]"
        :mask-closable="false"
        :transfer="false"
        :closable="false"
      >
      <div slot="header">
        <alert-header headerText="新增职业病危害因素" :headerVal="addModal.data.sort" @alert-retrun-num="addSortFun"></alert-header>
      </div>
      <div class="content-footer">
        <Form ref="addForm" :model="addModal.data" :rules="addModal.rule">
          <div class="content">
            <div class="item1">
              <span class="title">职业病危害因素类别</span>
              <div class="text">
                <FormItem prop="type_id">
                <Select filterable v-model="addModal.data.type_id" placeholder="" class="select">
                  <Option v-for="item in occupHarmTypesList" :value="item.id" :key="item.key">{{ item.name }}</Option>
                </Select>
                </FormItem>
                <span v-show="!addModal.data.type_id" class="star-mark">*</span>
              </div>   
            </div>
            <div class="item-a">
              <span class="title">职业病危害因素名称</span>
              <div class="text">
                <FormItem prop="name">
                  <Input class="input" type="text" v-model.trim = "addModal.data.name" ></Input>  
                </FormItem>
                <span v-show="!addModal.data.name" class="star-mark">*</span>
              </div>
              <span class="title2" >危害年限</span>
              <InputNumber class="input2"  v-model = "addModal.data.year">年</InputNumber>
              <span class="yearCode">年</span>     
            </div>
            <div class="item-b">
              <span class="title">职业病危害因素描述</span>
              <Input class="input" type="textarea" v-model.trim = "addModal.data.describe" ></Input>
            </div>
             <div class="item-b">
              <span class="title">对劳动者的影响</span>
              <Input class="input" type="textarea" v-model.trim = "addModal.data.affect"></Input>
            </div>                    
            <div class="item-b">
              <span class="title">备注</span>
              <Input class="input" type="textarea" v-model="addModal.data.remark"></Input>
            </div>            
          </div>
          <div class="footer">
            <FormItem>
              <Checkbox class="checkBox" 
              v-model="addNewCheck"
               @on-change="newStatusValueFun"
                >启用</Checkbox>
              <Button type="primary" class="marginR20" @click="saveNewItem('addForm')">保 存</Button>
              <Button type="ghost" @click="cancelNewItem">取 消</Button>
            </FormItem>
          </div>
        </Form>
      </div>
      </Modal>
    </div>
    <!-- 编辑 弹窗 -->
    <div class="edit-modal" v-if="editModalDiv" >
      <Modal
        v-model="editModalDiv"
        width="488"
        :transition-names="[]"
        :mask-closable="false"
        :transfer="false"
        :closable="false"
      >
      <div slot="header">
        <!-- <alert-header headerText="新增职业健康检查种类" :headerVal="totalsort"  @alert-retrun-num="editSortFun"  ></alert-header> -->
        <alert-header headerText="编辑职业病危害因素" :headerVal="editModal.data.sort" @alert-retrun-num="editSortFun"></alert-header>
      </div>
       <div class="content-footer">
        <Form ref="editForm" :model="editModal.data" :rules="editModal.rule">
          <div class="content">
            <div class="item1">
              <span class="title">职业病危害因素类别</span>
              <div class="text">
                <FormItem prop="type_id">
                <Select filterable v-model="editModal.data.type_id" placeholder="" class="select">
                <Option v-for="item in occupHarmTypesList" :value="item.id" :key="item.id">{{ item.title }}</Option>
              </Select>
                </FormItem>
                <span v-show="!editModal.data.type_id" class="star-mark">*</span>
              </div>   
            </div>
            <div class="item-a">
              <span class="title">职业病危害因素名称</span>
              <div class="text">
                <FormItem prop="name">
                  <Input class="input" type="text" v-model="editModal.data.name" ></Input>  
                </FormItem>
                <span v-show="!editModal.data.name" class="star-mark">*</span>
              </div>
              <span class="title2">危害年限</span>
              <InputNumber class="input2"  v-model="editModal.data.year" ></InputNumber>
              <span class="yearCode">年</span>          
            </div>
            <div class="item-b">
              <span class="title">职业病危害因素描述</span>
              <Input class="input" type="textarea" v-model="editModal.data.describe"></Input>
            </div>
            <div class="item-b">
              <span class="title">对劳动者的影响</span>
              <Input class="input" type="textarea"   v-model="editModal.data.affect"></Input>
            </div>                    
            <div class="item-b">
              <span class="title">备注</span>
              <Input class="input" type="textarea" v-model="editModal.data.remark"></Input>
            </div>  
            <div class="item3">
              <span class="lastUser">最后修改人：{{operater}}</span>
              <span class="updatetime">最后修改时间：{{lastTime}}</span>
            </div>           
          </div>
          <div class="footer">
            <FormItem>
              <Checkbox class="checkBox" @on-change="newStatusValueFun" v-model="editStatusBool">启用</Checkbox>
              <Button type="primary" class="marginR20" @click="saveEdit('editForm')">保 存</Button>
              <Button type="ghost" @click="editModalDiv = false">取 消</Button>
            </FormItem>
          </div>
        </Form>
      </div>
      </Modal>
    </div>
    <affirm-del-modal :delCounts="deletItemLength" :controlModal="controlModal" @delCancel="delCancel" @affirmDel="affirmDelItem"></affirm-del-modal>
</div>
</template>
<script>
// import searchTree from '@/components/tree/searchTree'
import titletHasSlot from '@/components/titleHasSlot'
// import moment from 'moment'
import filters from '@/utils/fifters'
import * as _ from 'lodash'
/* import { mapState, mapActions, mapGetters, mapMutations } from 'vuex' */
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
export default {
  name: 'managementOccupationalDiseaseInductiveFactor',
  components: {
    // searchTree,
    titletHasSlot,
  },
  data() {
    return {
      exportParams: {
        reqParams: {},
        columns: [
          {
            key: 'name',
            title: '职业病危害因素名称',
          },
          {
            title: '职业病危害因素描述',
            key: 'describe',
          },
          {
            title: '对劳动者的影响',
            key: 'affect',
          },
          {
            title: '危害年限',
            key: 'year',
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
      addNewCheck: true,
      leftTreeId: null,
      operater: null,
      totalsort: 0,
      /* leftTreeDataCloneItem: [], */
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
        filters: '',
        search: '',
      },
      urlRemark: '/static/icons/public/remarkInCell.svg',
      // 新增数据&验证
      addModal: {
        data: {
          value: null,
          name: '',
          remark: '',
          status: 0,
          year: 0,
          affect: null,
          type_id: null,
        },
        rule: {
          type_id: [{
            required: true,
            message: '职业病危害因素类别不能为空',
            type: 'number',
            trigger: 'change',
          }],
          name: [{
            required: true,
            message: '职业病危害因素名称不能为空',
            type: 'string',
            trigger: 'blur',
          },
          ],
        },
      },
      editModal: {
        data: {
          value: '',
          name: '',
          remark: '',
          status: 0,
          year: '',
          affect: '',
          id: 0,
        },
        rule: {
          type_id: [{
            required: true,
            message: '职业病危害因素类别不能为空',
            type: 'number',
            trigger: 'change',
          }],
          name: [{
            required: true,
            message: '职业病危害因素名称不能为空',
            trigger: 'blur',
          },
          ],
        },
      },
    }
  },
  methods: {
    ...mapMutations('managementOccupationalDiseaseInductiveFactorModule', ['requestPagingo']),
    ...mapActions('managementOccupationalDiseaseInductiveFactorModule', ['getOccupHarmTypesList', 'getOccupRightTypesList', 'adNewItemFun', 'deletItemFun', 'amendItemFun']),
    editSortFun(data) {
      this.editModal.data.sort = data
    },
    addSortFun(data) {
      this.addModal.data.sort = data
    },
    /* async statusValueChange(data) {
      this.params.status = data
      await this.$refs.baseInfoTable.request()
    }, */
    /* allSelection(data) {
      this.checkboxId = data.map((item) => { return item.id })
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
      this.checkboxId = data.map((item) => {
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
          type_id: this.editModal.data.type_id,
          name: this.editModal.data.name,
          remark: this.editModal.data.remark,
          status: this.editStatusBool ? 1 : 0,
          sort: this.editModal.data.sort,
          year: this.editModal.data.year,
          describe: this.editModal.data.describe,
          affect: this.editModal.data.affect,
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
    editRow(owData, event) {
      this.operater = owData.operater
      this.editSort = owData.sort
      this.editModal.data = _.clone(owData)
      this.editModal.data.affect = owData.affect === '/' ? '' : owData.affect
      this.editModal.data.describe = owData.describe === '/' ? '' : owData.describe
      this.lastTime = filters.timeFilter(this.editModal.data.updated_at, 'YYYY-MM-DD HH:mm')
      this.editStatusBool = !!this.editModal.data.status
      this.editModalDiv = true
    },
    // 确认删除
    async affirmDelItem() {
      if (this.clickId) {
        await this.deletItemFun({ids: this.clickId})
        this.totalsort--
        if (this.rightPageInfo.total <= (this.rightPageInfo.page - 1) * this.rightPageInfo.page_size + 1 && this.rightPageInfo.page !== 1) {
          /* await this.getOccupRightTypesList({filters: `type_id:${data[0].id}`}) */
          await this.getOccupRightTypesList({filters: `type_id:${this.leftTreeId}`, page: this.rightPageInfo.page - 1}) // 重新请求页面数据
        } else {
          await this.getOccupRightTypesList({filters: `type_id:${this.leftTreeId}`}) // 重新请求页面数据
        }
      }
      if (this.checkboxId && !this.clickId) {
        await this.deletItemFun({ids: this.checkboxId})
        if (this.rightPageInfo.total <= (this.rightPageInfo.page - 1) * this.rightPageInfo.page_size + this.checkboxId.length && this.rightPageInfo.page !== 1) {
          await this.getOccupRightTypesList({filters: `type_id:${this.leftTreeId}`, page: this.rightPageInfo.page - 1}) // 重新请求页面数据
        } else {
          await this.getOccupRightTypesList({filters: `type_id:${this.leftTreeId}`}) // 重新请求页面数据
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
      this.params.search = val
      this.params.filters = this.leftTreeId ? `type_id:${this.leftTreeId}` : ''
      /* await this.$refs.baseInfoTable.request() */
      this.$refs.baseInfoTable.allSelection = []
      this.showDelButton = true
      this.searchText = val
    },
    localSearchKey(data) {
      console.log(data)
    },
    // 新增保存
    async saveNewItem(formName) {
      this.addModal.data.status = this.newStatus
      try {
        if (await this.$refs[formName].validate()) {
          await this.adNewItemFun(this.addModal.data)
          await this.$refs.baseInfoTable.request()
          /* await this.getOccupRightTypesList() */
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
    addButton() {
      this.addModalDiv = true
      /* this.totalsort = this.rightPageInfo.total + 1 */
      for (var k in this.addModal.data) {
        this.addModal.data[k] = null
      }
      this.addModal.data.type_id = this.leftTreeId ? this.leftTreeId : ''
      this.addModal.data.sort = this.totalsort
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
        this.params.filters = `type_id:${data[0].id}`
        /* await this.getOccupRightTypesList({filters: `type_id:${data[0].id}`}) */
        this.leftTreeId = data[0].id
      } else {
        this.params.filters = ''
        this.leftTreeId = ''
        /* await this.getOccupRightTypesList() */
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
      exportXlsx('职业病危害因素列表', {
        api: api.managementOccupationalDiseaseInductiveFactor.getRightList,
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
    ...mapGetters('managementOccupationalDiseaseInductiveFactorModule', ['occupHarmTypesList', 'occupRightTypesList', 'rightPageInfo']),
    columns() {
      return [
        {
          title: '职业病危害因素名称',
          key: 'name',
          ellipsis: 'true',
        },
        {
          title: '职业病危害因素描述',
          key: 'describe',
          className: 'test',
          ellipsis: 'true',
        },
        {
          title: '对劳动者的影响',
          key: 'affect',
          className: 'test',
          ellipsis: 'true',
        },
        {
          title: '危害年限',
          key: 'year',
          width: 60,
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
          titleRender: () => {
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
            return h('span', filters.timeFilter(params.row.updated_at, 'YYYY-MM-DD HH:mm'))
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
  mounted () {
    this.tableHeight = this.$refs.content.offsetHeight
  },
  async created () {
    await this.getOccupRightTypesList()
    this.totalsort = this.rightPageInfo.total + 1
    await this.getOccupHarmTypesList({per_page: 100000})
    this.leftTreeData = [{
      title: '所有职业病危害因素类别',
      level: 1,
      expand: true,
      children: _.cloneDeep(this.occupHarmTypesList.map((item) => {
        item.title = item.name
        item.level = 2
        item.expand = false
        return item
      })),
    }]
  },
  destroyed() {
    this.requestPagingo()
  },
}
</script>
<style lang="less" >
.managementOccupationalDiseaseInductiveFactor-all {
  padding: 10px;
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  .managementOccupationalDiseaseInductiveFactor-content {
    border: 1px solid #D9D9D9;
    box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    .split-pane-left-area {
      overflow: hidden;
      .left {
        width: 100%;
        display: inline-block;
        padding-left:10px;
        height: 100%;
        overflow: hidden;
        background: #F2F7FF;
      }
    }

    .right {
      width:  100%;
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
       .ivu-table-body {
         .test {
           box-sizing: content-box;
           height: 80px;
           padding-top: 20px;
           padding-bottom: 20px;
           overflow: hidden;
           span {
             white-space: initial;
             width: 100%;
             max-height: 80px;
              overflow:hidden;
              text-overflow:ellipsis;
              display:-webkit-box;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:4;
              line-height: 20px;
              font-size:12px;
            }
          }
        }
        .ivu-table-fixed-right {
          .ivu-table-row {
            height: 120px
          }
        }
       }
      .content {
        height: 30px;
        display: flex;
        .input{
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
     height: 411px;
     .content {
       height: 341px;
       .item1 {
         height: 50px;
         padding-top:20px; 
         margin-left: 20px;
         display: flex;
         .title {
           width:108px;
           margin-right: 10px;
           height: 30px;
           line-height: 30px;
         }
         .text {
           width: 186px;
           position: relative;
           .star-mark {
             position: absolute;
             font-size: 16px;
             color: #FF6262;
             right: 20px;
             top: 7px;
           }
         }
       }
       .item-a {
         height: 50px;
         padding-top:20px; 
         margin-left: 20px;
         display: flex;
         position: relative;
         .title{
           width:108px;
           margin-right: 10px;
           height: 30px;
           line-height: 30px;
         }
         .text {
            width: 186px; 
            position: relative;
        .star-mark {
             position: absolute;
             font-size: 16px;
             color: #FF6262;
             right: 12px;
             top: 7px;
           }
         }
         .title2 {
           display: inline-block;
           height: 30px;
           line-height: 30px;
           margin-left: 20px;
         }
         .input2 {
           width: 64px;
           margin-left: 10px;
         }
         .yearCode {
           position: absolute;
           right: 30px;
           top: 27px; 
         }
      
       }
       .item-b {
        margin-top: 20px;
        margin-left: 20px;
        display: flex;
        .title {
           width:108px;
           margin-right: 10px;
           margin-top: 3px;
           height: 30px;
           line-height: 30px;
           text-align-last: justify;
        }
        .input {
          width: 329px;
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
       margin-left: 233px;
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
     height: 444px;
     .content {
       height: 374px;
       .item1 {
         height: 50px;
         padding-top:20px; 
         margin-left: 20px;
         display: flex;
         .title {
           width:108px;
           margin-right: 10px;
           height: 30px;
           line-height: 30px;
         }
         .text {
           width: 186px;
           position: relative;
           .star-mark {
             position: absolute;
             font-size: 16px;
             color: #FF6262;
             right: 12px;
             top: 7px;
           }
         }
       }
       .item-a {
         height: 50px;
         padding-top:20px; 
         margin-left: 20px;
         position: relative;
         display: flex;
         .title{
           width:108px;
           margin-right: 10px;
           height: 30px;
           line-height: 30px;
         }
         .text {
            width: 186px; 
            position: relative;
           .star-mark {
             position: absolute;
             font-size: 16px;
             color: #FF6262;
             right: 12px;
             top: 7px;
           }
         }
         .title2 {
           display: inline-block;
           height: 30px;
           line-height: 30px;
           margin-left: 20px;
         }
         .input2 {
           width: 64px;
           margin-left: 10px;
           position: relative;
           .star-mark {
             position: absolute;
             font-size: 16px;
             color: #FF6262;
             right: 12px;
             top: 7px;
           }
         }
         .yearCode {
           position: absolute;
           right: 30px;
           top: 27px; 
         }
       }
       .item-b {
        margin-top: 20px;
        margin-left: 20px;
        display: flex;
        .title {
           width:108px;
           margin-right: 10px;
           margin-top: 3px;
           height: 30px;
           line-height: 30px;
           text-align-last: justify;
        }
        .input {
          width: 329px;
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
       margin-left: 233px;
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
