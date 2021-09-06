/**
  * content:采样管理   标本容量管理
  * @author 刘洋
  * @created 2018/2/26
  **/

<template>
  <div class="sample-container-management-center-wrapper">
    <div class="sample-container-management-combo-wrapper">
      <div class="sample-container-management-combo relative">

        <!-- 主内容表格 -->
        <div class="combo-table contentBg">
          <div class="right_w height100P">
            <title-has-slot>
              <span slot="titletHasSlotLeftTitle">标本容器列表</span>
              <div slot="titletHasSlotRightContent">
                <search-input searText="请输入搜索内容" :searchWidth="220" class="marginL10" @on-enter="search" @on-Icon="search" @on-cancel="search"></search-input>
                <Button v-if="!selectMode" type="ghost" class="" @click="addMode()">新 增</Button>
                <Button type="ghost" v-if="!selectMode"  class=" marginL10"  @click="exportBtn" key="5">导 出</Button>
                <Button v-if="selectMode" type="success" class="" key="3" :disabled="selection.length===0" @click="deleteAllSelect()">删 除</Button>
                <!-- <Button v-if="selectMode" type="ghost" class="marginL10" @click="print()">打 印</Button> -->
                <Button v-if="selectMode" type="ghost" class="marginL10" key="5" @click="selectMode=false">取 消</Button>
                <Button v-if="!selectMode" type="ghost" class="marginL10"  key="6" @click="selectMode=true">选 择</Button>
              </div>
            </title-has-slot>
            <div class="table-wrapper" ref="tableWrapper">
              <q-table
                ref="table"
                :ifEdit="true"
                :data="examComboList.items"
                :columns="package_columns"
                :pageInfo="pageInfo"
                :params="package_params"
                :width="1000"
                :height="tableHeight"
                :requestDataApi="getExamComboList"
                :isSelectMode="selectMode"
                @after-request="afterRequest"
                @edit-row="editOne"
                @on-row-dbClick='editOne'
                @edit="editOne"
                @delete-row="delOne"
                @delete="delOne"
                @getRequestParams="getRequestParams"
                @on-selection-change="selectChange">
              </q-table>
            </div>
          </div>
          <div v-if="selectOne" class="borderClass"></div>
        </div>
      </div>
    </div>

    <!-- 增加套餐对话框 -->
    <div class="package add-package modal" v-if="addPackageModal">
      <Modal
         width="770" height="622"
        v-model="addPackageModal"
        class-name="vertical-center-modal"
        :transition-names='[]'
        :mask-closable="false"
        :transfer='false'
        :closable="false">
        <div slot="header">
          <alert-header headerText="新增标本容器" :headerVal="total+1" @alert-retrun-num="getSort"></alert-header>
        </div>
        <div class="body">
          <Form ref="addPackageForm" :model="addPackageData.data" :rules="addPackageFormRule">
            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify"style="width:78px;">容器名称</span>
                <FormItem class="fl" prop="name">
                  <Input v-model="addPackageData.data.name" style="width: 635px" :class="{inputRequired:isEmpty(addPackageData.data.name)}"></Input>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify"  style="width:78px">生成环节</span>
                <FormItem class="fl" prop="generate_type">
                  <Select
                    filterable
                    style="width: 102px"
                    placeholder=""
                    v-model="addPackageData.data.generate_type">
                    <Option v-for="item in addPackageData.generate_type_data " :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="item fl marginL20">
                <span class="textJustify"  style="width:78px">生成条码</span>
                <FormItem class="fl" prop="sample_num_type">
                  <Select
                    filterable
                    style="width: 102px"
                    placeholder=""
                    v-model="addPackageData.data.sample_num_type"
                    >
                    <Option v-for="item in addPackageData.sample_num_type_data " :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="item fl ">
                 <Checkbox  v-model="addPackageData.data.is_need_confirm" true-value=1 false-value=0 class="sampleConfirmedCheckbox">需要采样确认</Checkbox>
              </div>
            </div>
            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify" style="width:78px;">备注</span>
                <Input v-model="addPackageData.data.remark" style="width: 635px"></Input>
              </div>
            </div>
            <div class="transfer-wrapper">
              <custom-transfer
                v-model="transferTargetData"
                selectTitle="项目类别"
                listWidth="321px"
                listHeight="382px"
                :moveAll="true"
                title="已选组合项目"
                :selectDefault="-1"
                :columns="package_transfer_columns"
                :targetData="addPackagePros"
                :sourceData="allPro"
                :select="true"
                :selectOptions="peItemTypeOptions"
                @getSelectData="getAddTargets"
                @getSelectValue="getTypeId">
              </custom-transfer>
            </div>
          </Form>
        </div>
        <div slot="footer">
          <Checkbox v-model="addPackageData.data.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="addPackageModal=false">取 消</Button>
          <Button class="fr marginR20 marginB20" @click="submitAdd()">保 存</Button>
          <div class="clearBoth"></div>
        </div>
      </Modal>
    </div>
    <!-- 增加套餐对话框 -->

    <!-- 修改套餐对话框 -->
    <div class="package add-package modal" v-if="modifyTCModal">
      <Modal
        width="770" height="622"
        v-model="modifyTCModal"
        class-name="vertical-center-modal"
        :transition-names='[]'
        :mask-closable="false"
        :transfer='false'
        :closable="false">
        <div slot="header">
          <alert-header headerText="编辑标本容量" :headerVal="curPackage.sort" @alert-retrun-num="getSort"></alert-header>
        </div>
        <div class="body">
          <Form ref="editPackageForm" :model="addPackageData.data" :rules="addPackageFormRule">
            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify" style="width:78px;">容器名称</span>
                <FormItem class="fl" prop="name">
                  <Input v-model="addPackageData.data.generate_type" style="width: 635px" :class="{inputRequired:isEmpty(addPackageData.data.generate_type)}"></Input>
                </FormItem>
              </div>
            </div>
            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify"  style="width:78px">生成环节</span>
                <FormItem class="fl" prop="generate_type">
                  <Select
                    filterable
                    style="width: 102px"
                    placeholder=""
                    v-model="addPackageData.data.generate_type">
                    <Option v-for="item in addPackageData.generate_type_data " :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="item fl marginL20">
                <span class="textJustify"  style="width:78px">样本条码</span>
                <FormItem class="fl" prop="sample_num_type">
                  <Select
                    filterable
                    style="width: 102px"
                    placeholder=""
                    v-model="addPackageData.data.sample_num_type">
                    <Option v-for="item in addPackageData.sample_num_type_data " :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="item fl ">
                 <Checkbox  v-model="addPackageData.data.is_need_confirm" true-value=1 false-value=0 class="sampleConfirmedCheckbox">需要采样确认</Checkbox>
              </div>
            </div>
            <div class="row clearfix">
              <div class="item fl">
                <span class="textJustify" style="width:78px;">备注</span>
                <Input v-model="addPackageData.data.remark" style="width: 635px"></Input>
              </div>
            </div>
            <div class="transfer-wrapper">
              <custom-transfer
                v-model="transferTargetData"
                selectTitle="项目类别"
                listWidth="321px"
                listHeight="382px"
                :moveAll="true"
                :columns="package_transfer_columns"
                :targetData="addPackagePros"
                :sourceData="allPro"
                :select="true"
                :selectDefault="-1"
                :selectOptions="peItemTypeOptions"
                @getSelectData="getAddTargets"
                @getSelectValue="getTypeId">
              </custom-transfer>
              <!-- <span v-if="addPackagePros.length===0" class="transfer-require" :class="{required:addPackagePros.length===0&&showTransferRequire}">*</span> -->
            </div>
            <div class="row marginT10">
              <span class="textJustify fl">最后修改人：{{curPackage?curPackage.operater:''}}</span>
              <span class="textJustify fl marginL20">最后修改时间：{{updated_at}}</span>
              <div class="clearBoth"></div>
            </div>
          </Form>
        </div>
        <div slot="footer">
          <Checkbox v-model="addPackageData.data.status" true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="modifyTCModal=false">取 消</Button>
          <Button class="fr marginR20 marginB20" @click="submitEdit()">保 存</Button>
          <div class="clearBoth"></div>
        </div>
      </Modal>
    </div>
    <!-- 修改套餐对话框 -->

    <!-- 删除多个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delSomeModal" :delCounts="delCounts" @delCancel="cancelDelSome" @affirmDel="submitDelSome"></affirm-del-modal>
    </div>
    <!-- 删除多个弹窗 -->

    <!-- 删除1个弹窗 -->
    <div class="del-disease modal">
      <affirm-del-modal :controlModal="delOneModal" :delCounts="1" @delCancel="cancelDelOne" @affirmDel="submitDelOne"></affirm-del-modal>
    </div>
    <!-- 删除1个弹窗 -->

  </div>
</template>
<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import ZTable from '@/components/table/zTable'
  import fifters from '@/utils/fifters'
  import * as types from '@/store/modules/information/samplingManagement/sampleContainerManagement/sampleContainerManagementTypes'
  import api from '@/api'
  import exportXlsx from '@/service/export-xlsx.js'

  export default {
    name: 'sampleContainerManagement',
    components: {
      ZTable,
    },
    data() {
      return {
        exportParams: {
          reqParams: {},
          columns: [
            {
              title: '容器名称',
              key: 'name',
            },
            {
              title: '是否需要采样确认',
              key: 'is_need_confirm',
              render: (value) => {
                return value === 1 ? '采样确认' : '未采样确认'
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
              ellipsis: true,
              width: 120,
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
        transferTargetData: [],
        filterValue: '',
        showTransferRequire: false,
        addPackageFormRule: {
          name: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('容器名称不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
        },
        urlRemark: '/static/icons/public/remarkInCell.svg',
        remarkIcon: '/static/icons/public/remarkInCell.svg',
        iconUrl: '/static/icons/public/success.png',
        tableHeight: 400,
        valueStartState: 2,
        valueStartStateList: [
          {
            value: 2,
            label: '全部',
          },
          {
            value: 1,
            label: '启用',
          },
          {
            value: 0,
            label: '未启用',
          },
        ],
        delCounts: 0,
        delSomeModal: false,
        delOneModal: false,
        selection: [],
        selectOne: false,
        curTableRow: undefined,
        selectMode: false,
        package_params: {
          search: '',
          status: '',
        },
        package_columns: [
          {
            title: '容器名称',
            key: 'name',
            ellipsis: true,
            // minWidth: 200,
          },
          {
            title: '是否需要采样确认',
            key: 'is_need_confirm',
            ellipsis: true,
            // minWidth: 100,
            render: (h, params) => {
              if (params.row.is_need_confirm === 1) {
                return h('status-in-table')
              }
            },
            titleRender: (data) => {
              return ''
            },
            filterType: 'type',
            filterOptions: [
              {
                value: 1,
                label: '采样确认',
              },
              {
                value: 0,
                label: '未采样确认',
              },
            ],
          },
          {
            title: '生成环节',
            key: 'generate_type',
            minWidth: 150,
            render: (h, params) => {
              let val = params.row.generate_type
              if (val === 1) {
                return '登记'
              }
              if (val === 2) {
                return '采样'
              }
            },
            titleRender: (data) => {
              if (data.generate_type === 1) {
                return '登记'
              } else if (data.generate_type === 2) {
                return '采样'
              }
            },
            filterType: 'type',
            filterOptions: [
              {
                value: 1,
                label: '登记',
              },
              {
                value: 2,
                label: '采样',
              },
            ],
          },
          {
            title: '标本条码',
            key: 'sample_num_type',
            // minWidth: 170,
            render: (h, params) => {
              let val = params.row.sample_num_type
              if (val === 1) {
                return '体检号'
              }
              if (val === 2) {
                return '采血'
              }
              if (val === 3) {
                return '采尿'
              }
              if (val === 4) {
                return '手动输入'
              }
            },
            titleRender: (data) => {
              if (data.sample_num_type === 1) {
                return '体检号'
              } else if (data.sample_num_type === 2) {
                return '采血'
              } else if (data.sample_num_type === 3) {
                return '采尿'
              } else if (data.sample_num_type === 4) {
                return '手动输入'
              }
            },
            filterType: 'type',
            filterOptions: [
              {
                value: 1,
                label: '体检号',
              },
              {
                value: 2,
                label: '采血',
              },
              {
                value: 3,
                label: '采尿',
              },
              {
                value: 4,
                label: '手动输入',
              },
            ],
          },
          {
            title: '备注',
            width: 100,
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
            ellipsis: true,
            width: 60,
            render: (h, params) => {
              if (params.row.status === 1) {
                return h('status-in-table')
              }
            },
            titleRender: (data) => {
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
            ellipsis: true,
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
            ellipsis: true,
            width: 130,
            render: (h, params) => {
              if (params.row && params.row.updated_at) {
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
        pros_columns: [
          {
            title: '序号',
            width: 50,
            type: 'index',
          },
          {
            title: '组合项目名称',
            key: 'name',
          },
          {
            title: '项目类别',
            key: 'item_type',
            render: (h, params) => {
              return params.row.item_type ? params.row.item_type.name : ''
            },
          },
        ],
        addPackagePros: [],
        addTarget: [],
        package_transfer_columns: [
          {
            title: '项目类别',
            key: 'item_type',
            render: (h, params) => {
              if (params.data.item_type) {
                // return params.data.item_type.name
                return h('span', {
                  domProps: {
                    innerText: params.data.item_type.name,
                  },
                })
              }
              return ''
            },
            rightRender: (h, params) => {
              if (params.data.item_type) {
                return h('span', {
                  domProps: {
                    innerText: params.data.item_type.name,
                  },
                })
              }
              return ''
            },
          },
          {
            title: '组合项目名称',
            key: 'name',
          },
        ],
        keyword: '',
        curPackage: undefined, // 当前选中的套餐
        TC_Data: [],
        addPackageModal: false,
        addPackageData: {
          data: {
            name: '',
            remark: '',
            sort: '',
            status: '0',
            is_need_confirm: '0',
            group_item_ids: '',
            group_items: '',
            generate_type: '',
            sample_num_type: '',
          },
          generate_type_data: [
            {
              value: 1,
              label: '登记',
            },
            {
              value: 2,
              label: '采样',
            },
          ],
          sample_num_type_data: [
            {
              value: 1,
              label: '体检号',
            },
            {
              value: 2,
              label: '采血',
            },
            {
              value: 3,
              label: '采尿',
            },
            {
              value: 4,
              label: '手动输入',
            },
          ],
          pe_type_data: [
            {
              value: 1,
              label: '健康体检',
            },
            {
              value: 2,
              label: '职业体检',
            },
          ],
          package_type_data: [
            {
              value: 0,
              label: '通用',
            },
            {
              value: 1,
              label: '单位',
            },
            {
              value: 2,
              label: '个人',
            },
          ],
          sex_data: [
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
        modifyTCModal: false,
      }
    },
    computed: {
      ...mapState('sampleContainerManagementModule', [
        'examComboList',
        'proOfExamComboList',
        'allExamProList',
        'zuheInfo',
        'allDepts',
        'allPro',
        'allPeItemType',
        'total',
      ]),
      ...mapState(['windowHeight']),
      pageInfo() {
        return this.examComboList.meta
      },
      peItemTypeOptions() {
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
      updated_at() {
        if (this.curPackage && this.curPackage.updated_at) {
          return fifters.timeFilter(this.curPackage.updated_at, 'YYYY-MM-DD HH:mm')
        } else {
          return ''
        }
      },
    },
    methods: {
      ...mapMutations('sampleContainerManagementModule', {
        setAllPro: types.SET_ALL_PRO,
        setTotal: types.SET_TOTAL,
        reset: types.RESET,
      }),
      ...mapActions('sampleContainerManagementModule', [
        'delExamCom',
        'getTotal',
        'getExamComboList',
        'modifyExamCom',
        'addExamCom',
        'getAllPro',
        'getPeItemTypes',
      ]),
      getAddTargets(data) {
        this.addTarget = data
      },
      getRequestParams(params) {
        this.exportParams.reqParams = params
      },
      search(data) {
        this.package_params.search = data
      },
      refresh() {
        this.$refs.table.request()
      },
      exportBtn() {
        // console.log('导出')
        let _this = this
        exportXlsx('标本容器管理', {
          api: api.sampleContainerManagement.getExamComboList,
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
      async addMode() {
        await Promise.all([
          this.getAllPro({
            with: `itemType:name`,
            per_page: 10000,
          }),
          this.getPeItemTypes(),
        ])
        this.transferTargetData = []
        this.addPackageData.data = {
          name: '',
          remark: '',
          status: '1',
          sort: this.total + 1,
          is_need_confirm: '0',
          group_item_ids: '',
          group_items: '',
          generate_type: '',
          sample_num_type: '',
        }
        this.showTransferRequire = false
        this.addPackagePros = []
        // await this.getAllPro({
        //   with: `itemType:name`,
        // })
        // await this.getPeItemTypes()
        this.addPackageModal = true
      },
      async editOne(data, index) {
        await Promise.all([
          this.getAllPro({
            with: `itemType:name`,
            per_page: 10000,
          }),
          this.getPeItemTypes(),
        ])
        this.curPackage = data
        this.transferTargetData = data.group_items
        this.addPackageData.data = {
          name: data.name,
          remark: data.remark,
          status: data.status + '',
          sort: data.sort,
          is_need_confirm: data.is_need_confirm + '',
          group_item_ids: data.group_item_ids,
          generate_type: data.generate_type,
          sample_num_type: data.sample_num_type,
        }
        this.showTransferRequire = false
        this.modifyTCModal = true
      },
      // editCurTC() {
      //   this.editOne(this.curTableRow)
      // },
      delOne(data, index) {
        this.curPackage = data
        this.delOneModal = true
      },
      selectChange(selection) {
        this.selection = selection
      },
      deleteAllSelect() {
        this.delSomeModal = true
        this.delCounts = this.selection.length
      },
      cancelDelOne() {
        this.delOneModal = false
      },
      async submitDelOne() {
        this.delOneModal = false
        await this.delExamCom({ ids: this.curPackage.id })
        this.setTotal(this.total - 1)
        // this.refresh()
        this.refreshAfterDel(1)
      },
      cancelDelSome() {
        this.delSomeModal = false
      },
      async submitDelSome() {
        this.delSomeModal = false
        let arr = []
        this.selection.forEach(element => {
          arr.push(element.id)
        })
        await this.delExamCom({ ids: arr })
        this.setTotal(this.total - this.selection.length)
        this.refreshAfterDel(this.selection.length)
      },
      async submitAdd() {
        let valid = await this.$refs.addPackageForm.validate()
        if (valid) {
          let arr = []
          this.transferTargetData.forEach(item => {
            arr.push(item.id)
          })
          this.addPackageData.data.group_item_ids = arr
          await this.addExamCom(this.addPackageData.data)
          this.setTotal(this.total + 1)
          this.addPackageModal = false
          this.refresh()
        }
      },
      async submitEdit() {
        let valid = await this.$refs.editPackageForm.validate()
        // console.log(666, this.curPackage.group_item_ids)

        if (valid) {
          let arr = []
          this.transferTargetData.forEach(item => {
            arr.push(item.id)
          })
          this.addPackageData.data.group_item_ids = arr
          await this.modifyExamCom({ id: this.curPackage.id, data: this.addPackageData.data })
          this.modifyTCModal = false
          this.refresh()
        }
      },
      afterRequest() {
        this.selection = []
        if (this.curTableRow) {
          let exist = false
          for (let i = 0, len = this.examComboList.items.length; i < len; i++) {
            const element = this.examComboList.items[i]
            if (element.id === this.curTableRow.id) {
              this.curTableRow = element
              exist = true
              break
            }
          }
          if (!exist) {
            this.curTableRow = undefined
          }
        }
      },
      getSort(value) {
        this.addPackageData.data.sort = value
      },
      getTypeId(val) {
        let params = {
          with: 'itemType:name',
        }
        if (val !== -1) {
          params.filters = `item_type_id:${val};status:1`
        }
        this.getAllPro(params)
      },
      refreshAfterDel(delNum) {
        this.$refs.table.allSelection = []
        if (this.pageInfo.total <= (this.pageInfo.current_page - 1) * this.pageInfo.per_page + delNum && this.pageInfo.current_page !== 1) {
          this.$refs.table.request({page: this.pageInfo.current_page - 1})
        } else {
          this.$refs.table.request()
        }
      },
      isEmpty(value) {
        if (value === '' || (value + '').trim() === '') {
          return true
        }
        return false
      },
      _search() {
    //
      },
    },
    watch: {
      windowHeight(val) {
        this.tableHeight = this.$refs.tableWrapper.offsetHeight
      },
      addPackagePros(cur) {
        // let prosPrice = 0
        // cur.forEach((pro) => {
        //   prosPrice += Number.parseFloat(pro.price)
        // })
        // this.addPackageData.data.group_items_price = prosPrice
      },
      valueStartState(cur) {
        if (cur === 2) {
          this.$set(this.package_params, 'status', '')
        } else {
          this.$set(this.package_params, 'status', cur)
        }
      },
    },
    created() {
      this.getTotal()
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
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .sample-container-management-center-wrapper {
    // width: 1055px;
    height: 100%;
    margin: 0 auto;
     .add-package{
      .ivu-modal {
        height: calc(~'100% - 41px');
        max-height: 599px;
      }
      .ivu-modal-content {
        height: 100%;
      }
      .ivu-modal-body {
        height: calc(~'100% - 100px');
        padding-bottom: 20px;

         .body {
          height: 100%;
          overflow: auto;
        }

        form{
         padding: 20px  20px  0px  20px ;
        }
      }
    }

    .clearfix {
      clear: both;
      height: 50px;
    }
  }

  .sample-container-management-combo-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;

    .sample-container-management-combo {
      height: 100%;
    }

    .table-wrapper {
      height: calc(~'100% - 50px');
    }

    .combo-table {
      height: 100%;
      position: relative;
    }

    .start-state {
      float: left;
      line-height: 30px;
      font-size: 12px;
      color: @gradeAshThree;
      margin-right: 10px;
    }

    .customColumn {
      .ivu-table-cell {
        padding: 0;
        height: 100%;
      }
      .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 0 5px;
        color: @gradeBlueOne;

        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: break-all;
        }
      }
      .active {
        background: @gradeBlueOne;
        color: #fff;
      }
    }

    .fr-box {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 50px;
      width: 57%;
      z-index: 102;
      box-shadow: -1px 0 6px 0 rgba(206,213,242,0.80);

      .titletHasSlot {
        height: 50px;
      }

      .table-wrapper {
        height: calc(~'100% - 50px');
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        overflow: hidden;
      }

      .fa-icon {
        fill: #fff;
        width: 16px;
        height: 16px;
        padding: 3px;
        position: absolute;
        top: -8px;
        right: -8px;
        background: #b3b3b3;
        border-radius: 50%;
        cursor: pointer;
      }

      .fa-icon:hover {
        background: @tsIcon;
        border-radius: 50%;
      }

      .ivu-icon-ios-close {
        position: absolute;
        top: -7px;
        right: -7px;
        font-size: 18px;
        color: #cccccc;
        cursor: pointer;
      }
    }
  }

  .package {
    .body {
      // padding: 20px;
      height: 100%;
      overflow: auto;
    }

    .textJustify {
      float: left;
      height: 30px;
      overflow: hidden;
      line-height: 30px;
      font-size: 12px;
      color: @gradeAshThree;
      margin-right: 10px;
    }

    .transfer-wrapper {
      position: relative;
      padding-top: 5px;

      .transfer-require {
        position: absolute;
        top: 100px;
        left: 220px;
        color: red;
      }

      .transfer-require.required:before{
        content: "必填项";
        position: absolute;
        width: 150px;
        left: -150px;
        top: -3px;
      }
    }

    // .ivu-modal {
    //   height: calc(~'100% - 100px');
    // }
    // .ivu-modal-content {
    //   height: 100%;
    // }
    // .ivu-modal-body {
    //   height: calc(~'100% - 100px');
    // }

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
    .statusCheckbox {
      margin-top: 7px;
      margin-right: 20px;
    }
    .sampleConfirmedCheckbox{
      margin-top: 7px;
      margin-right: 0px;
      margin-left: 10px;
    }
  }
</style>
