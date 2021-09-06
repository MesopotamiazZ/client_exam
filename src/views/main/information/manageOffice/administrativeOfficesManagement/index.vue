/**
  * 科室管理
  * @author 刘洋
  * @date 2018/3/3
  */
<template>
  <div class="administrativeOfficesManagement-Wrapper">
    <div class="administrativeOffices-Wrapper">
      <div class="administrativeOfficesManagement">
        <!-- 右侧疾病列表 -->
        <div class="allContent contentBg">
          <div class="right_w">
            <title-has-slot>
               <span slot="titletHasSlotLeftTitle"  v-model="headText">{{headText}}</span>
              <div slot="titletHasSlotRightContent" :style="{fontSize:0}" class="titlet-slot-left">
                <Button v-if="selectMode" type="ghost" class="marginL10 fr" key="1" @click="selectMode=false">取 消</Button>
                <!-- <Button v-if="selectMode" type="ghost" class="marginL10 fr" key="2" @click="print()">打 印</Button> -->
                <Button v-if="selectMode" type="success" class="fr" key="3" :disabled="selection.length===0" @click="deleteAllSelect()">删 除</Button>
                <Button v-if="!selectMode" type="ghost" class="marginL10 fr" @click="selectMode=true" key="4">选 择</Button>
                <Button type="ghost" v-if="!selectMode" class="fr marginL10" @click="exportBtn" key="5">导 出</Button>
                <Button v-if="!selectMode"  type="ghost" class="fr" @click="addDisease()" key="6">新 增</Button>
                <searchInput   class="fr marginL20"  :searchWidth="220" searText="请输入搜索内容" @on-enter='search' @on-Icon='search' @on-cancel='search'></searchInput>
                <!-- <Checkbox  v-if="!selectMode"  v-model="diseasesHistoryModel"  true-value=1 false-value=0 class="statusCheckbox">只查看疾病史疾病</Checkbox> -->
              </div>
            </title-has-slot>
            <div class="tableWrapper" ref="table">
              <q-table ref="diseaseOrExpManagementTable"
                :params="disease_params"
                :columns="disease_columns"
                :data="diseases.items"
                :pageInfo="pageInfo"
                :width="1060"
                :height="tableHeight"
                :requestDataApi="getDiseases"
                :selectMode="selectMode"
                :ifEdit="true"
                @preview-btn-selectData="preview"
                @after-request="afterRequest"
                @edit="editOneDisease"
                @on-row-dbClick='editOneDisease'
                @edit-row="editOneDisease"
                @delete="delOneDisease"
                @getRequestParams="getRequestParams"
                @delete-row="delOneDisease"
                @on-selection-change="selectChange">
              </q-table>
            </div>
          </div>
          <div v-if="selectOne" class="borderClass"></div>
        </div>
        <!-- 右侧疾病列表 -->

      </div>

      <!-- 新增疾病弹窗 -->
      <div class="addDisease modal" v-if="addDiseaseModal">
        <Modal
          v-model="addDiseaseModal"
          class-name="vertical-center-modal"
          :styles="{width:'642px'}"
          :transition-names="[]"
          :mask-closable="false"
          :transfer="false"
          :closable="false">
          <div slot="header">
            <alert-header headerText="新增科室" @alert-retrun-num="getSortby" :headerVal="total+1"></alert-header>
          </div>
          <div class="body">
            <div class="table-header clearBoth">
              <ul class="table-choose fl clearBoth">
                <li v-for='(data,index) in datas' class="curPointer" @click="addClassFun(data.name,index)" :class='{clickChange:data.name===chooseIndex}'>
                  {{data.data}}<span v-if="index===0">{{number}}</span>
                </li>
              </ul>
            </div>
            <Form ref="addForm" :model="addFormData" :rules="addFormRule">
              <div class="transfer-wrapper " v-show="chooseIndex==='print'">
                <!-- <Form ref="addForm" :model="addFormData" :rules="addFormRule"> -->
                  <div class="row clearfix">
                    <div class="item fl ">
                      <span class="textJustify" style="width:48px">科室类别</span>
                      <FormItem class="fr" prop="dept_type_id">
                        <Select
                          filterable
                          v-model="addFormData.dept_type_id"
                          style="width:292px"
                          placeholder=""
                          :class="{selectionRequired:!addFormData.dept_type_id}">
                          <Option v-for="item in standard_name_Option" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </div>
                    <div class="item fr">
                      <span class="textJustify " style="width:48px">科室编号</span>
                        <FormItem prop="code" class="fr">
                          <Input style="width:174px":class='{inputRequired: isEmpty(addFormData.code)}' v-model.trim="addFormData.code" ></Input>
                        </FormItem>
                    </div>
                  </div>
                  <div class="row clearfix">
                    <div class="item fl ">
                      <span class="textJustify" style="width:48px">科室名称</span>
                      <FormItem prop="name" class="fr">
                        <Input style="width:292px":class='{inputRequired: isEmpty(addFormData.name)}' v-model.trim="addFormData.name" ></Input>
                      </FormItem>
                    </div>
                    <div class="item fr">
                      <span class="textJustify " style="width:48px">负责人</span>
                      <FormItem class="fr" prop="leader_staff_id">
                        <Select
                          filterable
                          v-model="addFormData.leader_staff_id"
                          style="width:174px"
                          placeholder=""
                          :class="{selectionRequired:!addFormData.leader_staff_id}">
                          <Option v-for="item in getProjectCategoryLists_names" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </div>
                  </div>
                  <!-- <div class="row clearfix">

                  </div> -->
                  <div class="row">
                    <div class="item">
                      <span class="textJustify " :style="{width:'48px'}">备注</span>
                      <Input v-model="addFormData.remark" type="textarea" style="width:544px" :row="3"  :style="{marginBottom:'20px'}"></Input>
                    </div>
                  </div>

              </div>
              <!-- 基本信息结束 -->

                <!-- 复查项目开始 -->
              <div class="transfer-wrapper"  v-show="chooseIndex==='check'">
                <custom-transfer
                    v-model="transferTargetData"
                    :key="2"
                    selectTitle="项目类别"
                    listWidth="256px"
                    listHeight="335px"
                    :moveAll="true"
                    title="已选列表"
                    :columns="review_project_columns"
                    :sourceData="allPro"
                    :select="true"
                    @getSelectData="getAddTargets"
                    :selectOptions="getProjectCategoryLists_name_Option"
                    @getSelectValue="getTypeId">
                  </custom-transfer>
                  <!-- <span v-if="addPackageProse.length===0" class="transfer-require" :class="{required:addPackageProse.length===0&&showTransferRequires}">*</span> -->
              </div>
            </Form>
          </div>

           <!-- 复查项目结束 -->

          <div slot="footer">
            <Checkbox  v-model="addFormData.status"   true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
            <Button type="ghost" class="fr marginR20 marginB20" @click="addDiseaseCancel()">取 消</Button>
            <Button type="primary" class="fr marginB20 marginR20" @click="saveAddDisease()">保 存</Button>
            <div class="clearBoth"></div>
          </div>
        </Modal>
      </div>
      <!-- 新增疾病弹窗 -->



       <!-- 编辑疾病弹窗 -->
           <div class="addDisease modal" v-if="editDiseaseModal">
        <Modal
          v-model="editDiseaseModal"
          class-name="vertical-center-modal"
          :styles="{width:'642px'}"
          :transition-names="[]"
          :mask-closable="false"
          :transfer="false"
          :closable="false">
          <div slot="header">
            <alert-header headerText="编辑科室" @alert-retrun-num="getSortby" :headerVal="total+1"></alert-header>
          </div>
          <div class="body">
            <div class="table-header clearBoth">
              <ul class="table-choose fl clearBoth">
                <li v-for='(data,index) in datas' class="curPointer" @click="addClassFun(data.name,index)" :class='{clickChange:data.name===chooseIndex}'>
                  {{data.data}}<span v-if="index===0">{{number}}</span>
                </li>
              </ul>
            </div>
            <Form ref="editForm" :model="addFormData" :rules="addFormRule">
              <div class="transfer-wrapper " v-show="chooseIndex==='print'">
                <!-- <Form ref="addForm" :model="addFormData" :rules="addFormRule"> -->
                  <div class="row clearfix">
                    <div class="item fl ">
                      <span class="textJustify" style="width:48px">科室类别</span>
                      <FormItem class="fr" prop="dept_type_id">
                        <Select
                          filterable
                          v-model="addFormData.dept_type_id"
                          style="width:292px"
                          placeholder=""
                          :class="{selectionRequired:!addFormData.dept_type_id}">
                          <Option v-for="item in standard_name_Option" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </div>
                    <div class="item fr">
                      <span class="textJustify " style="width:48px">科室编号</span>
                        <FormItem prop="code" class="fr">
                          <Input style="width:174px":class='{inputRequired: isEmpty(addFormData.code)}' v-model.trim="addFormData.code" ></Input>
                        </FormItem>
                    </div>
                  </div>
                  <div class="row clearfix">
                    <div class="item fl ">
                      <span class="textJustify" style="width:48px">科室名称</span>
                      <FormItem prop="name" class="fr">
                        <Input style="width:292px":class='{inputRequired: isEmpty(addFormData.name)}' v-model.trim="addFormData.name" ></Input>
                      </FormItem>
                    </div>
                    <div class="item fr">
                      <span class="textJustify " style="width:48px">负责人</span>
                      <FormItem class="fr" prop="leader_staff_id">
                        <Select
                          filterable
                          v-model="addFormData.leader_staff_id"
                          style="width:174px"
                          placeholder=""
                          :class="{selectionRequired:!addFormData.leader_staff_id}">
                          <Option v-for="item in getProjectCategoryLists_names" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </div>
                  </div>
                  <!-- <div class="row clearfix">

                  </div> -->
                  <div class="row">
                    <div class="item">
                      <span class="textJustify " :style="{width:'48px'}">备注</span>
                      <Input v-model="addFormData.remark" type="textarea" style="width:544px" :row="3"  :style="{marginBottom:'20px'}"></Input>
                    </div>
                  </div>

              </div>
              <!-- 基本信息结束 -->

                <!-- 复查项目开始 -->
              <div class="transfer-wrapper"  v-show="chooseIndex==='check'">
                <custom-transfer
                    v-model="transferTargetData"
                    :key="2"
                    selectTitle="项目类别"
                    listWidth="256px"
                    listHeight="335px"
                    :moveAll="true"
                    title="已选列表"
                    :columns="review_project_columns"
                    :sourceData="allPro"
                    :select="true"
                    @getSelectData="getAddTargets"
                    :selectOptions="getProjectCategoryLists_name_Option"
                    @getSelectValue="getTypeId">
                  </custom-transfer>
                   <div class="clearfix marginT15">
                    <span class="fl marginR20">最后修改人：{{curDisease?curDisease.operater:''}}</span>
                    <span class="fl">最后修改时间：{{updated_at}}</span>
                  </div>
                  <!-- <span v-if="addPackageProse.length===0" class="transfer-require" :class="{required:addPackageProse.length===0&&showTransferRequires}">*</span> -->
              </div>
            </Form>
          </div>

           <!-- 复查项目结束 -->

          <div slot="footer">
            <Checkbox  v-model="addFormData.status"   true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
            <Button type="ghost" class="fr marginR20 marginB20" @click="editDiseaseCancel()">取 消</Button>
            <Button type="primary" class="fr marginB20 marginR20" @click="saveEditDisease()">保 存</Button>
            <div class="clearBoth"></div>
          </div>
        </Modal>
      </div>

      <!-- 编辑疾病弹窗 -->


      <!-- 删除疾病弹窗 -->
      <div class="delDisease">
        <affirm-del-modal :controlModal="delSomeDiseaseModal" :delCounts="delCounts" @delCancel="cancelDelSome" @affirmDel="submitDelSome"></affirm-del-modal>
      </div>
      <div class="delDisease">
        <affirm-del-modal :controlModal="delOneDiseaseModal" :delCounts="1" @delCancel="cancelDelOne" @affirmDel="submitDelOne"></affirm-del-modal>
      </div>
      <!-- 删除疾病弹窗 -->

    </div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import SearchTable from '@/components/table/searchTable'
  import fifters from '@/utils/fifters'
  import searchInput from '@/components/searchInput'

  import * as types from '@/store/modules/information/manageOffice/administrativeOfficesManagement/administrativeOfficesManagementTypes'
  import api from '@/api'
  import exportXlsx from '@/service/export-xlsx.js'
  export default {
    name: 'administrativeOfficesManagement',
    components: {
      SearchTable,
      searchInput,
    },
    data() {
      return {
        selectMode: false,
        transferTargetData: [],
        exportParams: {
          reqParams: {},
          columns: [
            {
              title: '科室编号',
              key: 'code',
            },
            {
              title: '科室类别',
              key: 'dept_type',
              render: (value) => {
                if (value) {
                  return value.name
                }
              },
            },
            {
              title: '科室名称',
              key: 'name',
            },
            {
              title: '负责人',
              key: 'leader_staff_id',
              render: (value) => {
                if (value) {
                  return value.name
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
              render: value => {
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
            },
          ],
        },
        headText: '科室列表',
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
        diseasesHistoryModel: '',
        rdiagnose_info_options: [
          {
            label: '疾病(诊断，给建议)',
            value: 1,
          },
          {
            label: '异常（可以作为诊断，给建议）',
            value: 2,
          },
          {
            label: '提示(非诊断，给建议)',
            value: 3,
          },
          {
            label: '其他(非诊断，不给建议)',
            value: 3,
          },
        ],
        showTransferRequire: false,
        showTransferRequires: false,
        addTarget: [],
        oObj: {},
        addPackagePros: [],
        addPackageProse: [],
        package_transfer_columns: [
          {
            title: '疾病类别',
            key: 'disease_type_id',
            render: (h, params) => {
              if (params.data.disease_type) {
                // return params.data.item_type.name
                return h('span', {
                  domProps: {
                    innerText: params.data.disease_type.name,
                  },
                })
              }
              return ''
            },
            rightRender: (h, params) => {
              if (params.data.disease_type) {
                return h('span', {
                  domProps: {
                    innerText: params.data.disease_type.name,
                  },
                })
              }
              return ''
            },
          },

          {
            title: '疾病(或异常)名称',
            key: 'name',
          },
        ],
        review_project_columns: [
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
        chooseIndex: 'print',
        datas: {
          data1: {
            data: '基本信息',
            name: 'print',
          },
          data2: {
            data: '可检项目',
            name: 'check',
          },
        },
        allType: [],
        addFormRule: {
          name: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('科室名称不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
          code: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('科室编号不能为空'))
                }
              },
            },
          ],
          dept_type_id: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('科室类别不能为空'))
                }
              },
            },
          ],
          leader_staff_id: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('负责人不能为空'))
                }
              },
            },
          ],
        },
        selectOne: false,
        updated_at: '',
        curDelDisease: undefined,
        disease_params: {
          search: '',
          // with: 'diseaseType:name;stdDisease:name',
          filters: '',
        },
      // 表格选择模式
        tableHeight: 400,
        editDiseasExs: [],
        columns: [
          {
            title: '疾病名称',
            key: 'name',
          },
        ],
        curDiseaseType: undefined,
        curDisease: undefined,
        keyword: '',
        addDiseaseModal: false,
        addFormData: {
          name: '',
          remark: '',
          leader_staff_id: '',
          dept_type_id: '',
          type_id: '',
          sort: '0',
          status: '0',
          code: '',
          groupItems: '',
        },
        urlSuccess: '/static/icons/public/enabledState.svg',
        urlRemark: '/static/icons/public/remarkInCell.svg',
        objData: [],
        delSomeDiseaseModal: false,
        delOneDiseaseModal: false,
        delCounts: 0,
        selection: [],
        previewDiseaseModal: false,
        editDiseaseModal: false,
        diseaseType_columns: [
          {
            title: '疾病类型',
            key: 'name',
          },
        ],
        disease_columns: [
          {
            title: '科室编号',
            key: 'code',
            ellipsis: true,
            // minWidth: 200,
          },

          {
            title: '科室类别',
            key: 'dept_type_id',
            ellipsis: true,
            // minWidth: 200,
            render: (h, params) => {
              if (params.row && params.row.dept_type) {
                return params.row.dept_type.name
              }
            },
            titleRender: (data) => {
              return data.dept_type ? data.dept_type.name : ''
            },
          },
          {
            title: '科室名称',
            key: 'name',
            ellipsis: true,
            // minWidth: 200,
          },
          {
            title: '负责人',
            key: 'leader_staff_id',
            ellipsis: true,
            // minWidth: 200,
            render: (h, params) => {
              if (params.row.leader) {
                return params.row.leader.name
              }
            },
            titleRender: (data) => {
              return data.leader ? data.leader.name : ''
            },
          },
          {
            title: '备注',
            key: 'remark',
            ellipsis: true,
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
            width: 80,
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
      }
    },
    computed: {
      ...mapState('administrativeOfficesManagementModule', [
        'diseaseTypes',
        'diseases',
        'oneTypeDiseases',
        'peItemTypes',
        'diseaseInfo',
        'reexamItems',
        'diseasesStdNames',
        'diseasesNum',
        'getReexams',
        'getProjectCategoryLists',
        'total',
        'allPro',
        'deptTypes',
        'Staffs',
      ]),
      ...mapState(['windowHeight']),
      pageInfo() {
        return this.diseases.meta
      },
      peItemtypeOption() {
        let arr = []
        for (var i = 0; i < this.peItemTypes.length; i++) {
          const type = this.peItemTypes[i]
          arr.push({
            value: type.id,
            label: type.name,
          })
        }
        return arr
      },
      typeIdOption() {
        let arr = []
        for (var i = 0; i < this.diseaseTypes.length; i++) {
          const type = this.diseaseTypes[i]
          arr.push({
            value: type.id,
            label: type.name,
          })
        }
        return arr
      },
      getProjectCategoryLists_names() {
        let arr = []
        this.Staffs.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
      },
      getProjectCategoryLists_name_Option() {
        let arr = [
          {
            value: -1,
            label: '全部',
          },
        ]
        this.getProjectCategoryLists.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
      },

      standard_name_Option() {
        let arr = []
        this.deptTypes.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
      },
      std_disease_options() {
        let arr = []
        for (var i = 0; i < this.diseasesStdNames.items.length; i++) {
          const type = this.diseasesStdNames.items[i]
          if (type.std_disease && type.std_disease.name) {
            arr.push({
              value: type.std_disease.id,
              label: type.std_disease.name,
            })
          }
        }
        return arr
      },
      diseasesData() {
        let arr = []
        for (let i = 0; i < this.diseases.items.length; i++) {
          const item = this.diseases.items[i]
          if (item.is_std) {
            item._disabled = true
          }
          arr.push(item)
        }
        return arr
      },
    },
    methods: {
      ...mapMutations('administrativeOfficesManagementModule', {
        setDiseasesNum: types.SET_DISEASESNUM,
        setTotal: types.SET_TOTAL,
        reset: types.RESET,
      }),
      ...mapActions('administrativeOfficesManagementModule', [
        'getDiseaseTypes',
        'getDiseases',
        'createDisease',
        'editDisease',
        'deleteDisease',
        'getReexamItems',
        'getDiseasesStdName',
        'getReexam',
        'getProjectCategoryList',
        'setTotal',
        'getAllPro',
        'getdeptTypes',
        'getStaffs',
      ]),
      getAddTargets(data) {
        this.addTarget = data
      },
      isEmpty(value) {
        if (value === '' || (value + '').trim() === '') {
          return true
        }
        return false
      },
      getRequestParams(params) {
        this.exportParams.reqParams = params
      },
      exportBtn() {
        let _this = this
        exportXlsx('科室管理', {
          api: api.administrativeOfficesManagement.getDiseases,
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
      refresh() {
        this.$refs.diseaseOrExpManagementTable.request()
      },
      addClassFun(data, index) {
        this.chooseIndex = data
      },
      getdieaseTypeId(val) {
        let params = {
          with: 'diseaseType:name',
        }
        if (val !== -1) {
          params.filters = `dept_type:${val};status:1`
        }
        this.getDiseases(params)
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
      async saveAddDisease() {
        let val = await this.$refs.addForm.validate()
        if (val) {
          let arr = []
          this.transferTargetData.forEach(item => {
            arr.push(item.id)
          })
          this.addFormData.groupItems = arr
          await this.createDisease(this.addFormData)
          this.setDiseasesNum(this.diseasesNum + 1)
          this.addDiseaseModal = false
          this.showTransferRequires = false
          this.setTotal(this.total + 1)
          this.refresh()
        }
      },
      addDiseaseCancel() {
        this.addDiseaseModal = false
      },

      editDiseaseCancel() {
        this.editDiseaseModal = false
      },
      async saveEditDisease() {
        let valid = await this.$refs.editForm.validate()
        // if (!valid) {
        //   return
        // }
        if (valid) {
          let arr = []
          this.transferTargetData.forEach(item => {
            arr.push(item.id)
          })
          this.addFormData.groupItems = arr
          await this.editDisease({ id: this.curDisease.id, data: this.addFormData })
          this.editDiseaseModal = false
          this.refresh()
        }
      },
      async editOneDisease(data, index) {
        await Promise.all([
          this.getAllPro({
            with: `itemType:name`,
            per_page: 10000,
          }),
          this.getReexam({ per_page: 10000 }), // 获取复查项目列表
          this.getProjectCategoryList({ per_page: 10000 }), // 获取项目类别
          this.getDiseasesStdName({ per_page: 10000 }),
          this.getdeptTypes({ per_page: 10000 }),
          this.getStaffs({ per_page: 10000 }), // 职工列表
        ])
        this.transferTargetData = data.group_items
        this.showTransferRequires = false

        this.curDisease = data
        this.addFormData = {
          name: data.name,
          status: data.status + '',
          remark: data.remark,
          leader_staff_id: data.leader_staff_id,
          dept_type_id: data.dept_type_id,
          type_id: data.type_id,
          sort: data.sort,
          code: data.code,
          groupItems: data.groupItems,
        }
        this.updated_at = fifters.timeFilter(data.updated_at, 'YYYY-MM-DD HH:mm')
        this.editDiseaseModal = true
      },
      async preview(data) {
        await this.getReexamItems()
        await this.getDiseasesStdName({ is_std: 1, per_page: 10000 })
        this.curDisease = data
        this.previewDiseaseModal = true
        this.addFormData = {
          name: data.name,
          remark: data.remark,
          leader_staff_id: data.leader_staff_id,
          dept_type_id: data.dept_type_id,
          type_id: data.type_id,
          sort: data.sort,
          status: data.status + '',
          code: data.code,
          groupItems: data.groupItems,
        }
        this.updated_at = fifters.timeFilter(data.updated_at, 'YYYY-MM-DD HH:mm')
      },
      async addDisease() {
        await Promise.all([
          this.getAllPro({
            with: `itemType:name`,
            per_page: 10000,
          }),
          this.getReexam({ per_page: 10000 }), // 获取复查项目列表
          this.getProjectCategoryList({ per_page: 10000 }), // 获取项目类别
          this.getDiseasesStdName({ per_page: 10000 }),
          this.getdeptTypes({ per_page: 10000 }),
          this.getStaffs({ per_page: 10000 }), // 职工列表
        ])

        this.addDiseaseModal = true
        this.showTransferRequires = false

        // 清空上次填写的数据
        this.addFormData = {
          name: '',
          remark: '',
          leader_staff_id: '',
          dept_type_id: '',
          sort: this.total + 1,
          status: '1',
          code: '',
          groupItems: '',
        }
        this.transferTargetData = []
      },
      selectOneDiseaseType(data, index) {
        this.selectOne = true
        this.curDiseaseType = data
        this.$set(this.disease_params, 'type_id', data.id)
        this.selection = []
      },
      search(data) {
        this.disease_params.search = data
        this.selection = []
      },
      selectChange(selection) {
        this.delCounts = selection.length
        this.selection = selection
      },
      deleteAllSelect() {
        this.delSomeDiseaseModal = true
        this.delCounts = this.selection.length
      },
      delOneDisease(data, index) {
        this.curDelDisease = data
        this.delOneDiseaseModal = true
      },
      cancelDelOne() {
        this.delOneDiseaseModal = false
      },
      async submitDelOne() {
        this.delOneDiseaseModal = false
        await this.deleteDisease({ ids: this.curDelDisease.id })
        this.setTotal(this.total - 1)
        this.$refs.diseaseOrExpManagementTable.request()
        this.refreshAfterDel(1)
      },
      cancelDelSome() {
        this.delSomeDiseaseModal = false
      },
      async submitDelSome() {
        this.delSomeDiseaseModal = false
        let arr = []
        this.selection.forEach(element => {
          arr.push(element.id)
        })
        await this.deleteDisease({ ids: arr })
        this.setTotal(this.total - this.selection.length)
        this.$refs.diseaseOrExpManagementTable.request()
        this.refreshAfterDel(this.selection.length)
      },
      clickLeftTableSearch() {
        this.selectOne = false
      },
      getSortby(value) {
        this.addFormData.sort = value
      },
      changePage() {
        this.selection = []
      },
      afterRequest() {
        this.selection = []
      },
      refreshAfterDel(delNum) {
        this.$refs.diseaseOrExpManagementTable.allSelection = []
        if (
          this.pageInfo.total <=
            (this.pageInfo.current_page - 1) * this.pageInfo.per_page + delNum &&
          this.pageInfo.current_page !== 1
        ) {
          this.$refs.diseaseOrExpManagementTable.request({ page: this.pageInfo.current_page - 1 })
        } else {
          this.$refs.diseaseOrExpManagementTable.request()
        }
      },
    },
    watch: {
      windowHeight(val) {
        this.tableHeight = this.$refs.table.offsetHeight
      },
    },
    async created() {
      await this.getDiseaseTypes({ per_page: 10000 }) // 获取全部的疾病类型\
    },
    async mounted() {
      this.tableHeight = this.$refs.table.offsetHeight
      await this.getDiseases()
      // await this.mountedAllType()
      await this.setTotal()
    },
    destroyed() {
      this.reset()
    },
    activated() {
      this.tableHeight = this.$refs.table.offsetHeight
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/public.less';
  .administrativeOfficesManagement-Wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
      .addDisease{
      .ivu-modal {
        height: calc(~'100% - 41px');
        max-height: 530px;
      }
      .ivu-modal-content {
        height: 100%;
      }
      .ivu-modal-body {
        height: calc(~'100% - 100px');

         .body {
          height: 100%;
          // overflow: auto;
          padding-bottom:15px;
        }

        form{
         padding: 20px  20px  0px  20px ;
         overflow: auto;
         height: calc(~'100% - 50px');

        }
      }
    }

  .administrativeOffices-Wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;

    .modal {
          .transfer-wrapper {
          position: relative;
          padding-top: 5px;

      .transfer-require {
        position: absolute;
        top: 100px;
        left: 200px;
        color: red;
      }
      .transfer-require.required:before {
          content: '不能为空';
          color: red;
          position: absolute;
          z-index: 1;
          left: -135px;
        }

      // .transfer-require.required:before{
      //   content: "必填项";
      //   position: absolute;
      //   width: 150px;
      //   left: -150px;
      //   top: -3px;
      // }
    }
    .statusCheckbox {
        margin-top: 7px;
        margin-right: 20px;
      }
      // .ivu-modal {
      //   height: calc(~'100% - 100px');
      // }
      // .ivu-modal-content {
      //   height: 100%;
      // }
      // .ivu-modal-body {
      //   height: calc(~'100% - 100px');
      //   overflow: auto;
      // }
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
      .inputRequired:after {
        content: '*';
        color: red;
        position: absolute;
        right: 12px;
        top: 7px;
        font-size: 16px;
      }

      .ivu-tabs-nav-wrap {
        padding: 0 40px;
      }
      .ivu-tabs-tab {
        font-size: 14px;
        height: 50px !important;
        line-height: 50px !important;
        padding: 0 4px !important;
        color: @gradeAshThree;
      }
      .ivu-tabs-tab-active {
        font-weight: bold;
        color: @gradeAshOne;
      }
      .ivu-tabs-ink-bar {
        height: 3px !important;
        background-color: @gradeAshOne;
      }
      .ivu-tabs-bar {
        margin-bottom: 0 !important;
      }

      .diseaseinfo {
        height: 100%;
        overflow: auto;

        form{
          padding: 20px;
          padding-bottom: 0;
        }
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
         .table-header{
        height:50px;
        margin: 0 20px;
        border-bottom:1px solid @gradeAshFive;
        .table-choose{
          line-height: 47px;
          font-size: 14px;
          >li{
            margin-right: 25px;
            float: left;
            color:@gradeAshThree;
            // border-bottom:3px solid red;
            border-bottom:3px solid transparent;
            >span{
              font-size: 12px;
              line-height: 18px;
              padding-left:4px;
              padding-right:4px;
              color:@contentBg;
              margin-left: 3px;
              display: inline-block;
              border-radius: 100px;
              background: @gradeAshFour;
            }
          }
          li:hover{
            color:@gradeBlueOne;
            font-weight: bold;
            >span{
              font-weight: normal;
              background: #83CB54;
            }
          }
          .clickChange{
            color:@gradeBlueOne;
            font-weight: bold;
            border-bottom:3px solid @gradeBlueOne;
            >span{
              font-weight: normal;
              background: #83CB54;
            }
          }
        }
      }

      .label {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: @gradeAshThree;
        margin-right: 10px;
      }

      .marginT-10 {
        margin-top: -10px;
      }

      .clearfix {
        clear: both;
        // height: 50px;
      }

      .lable {
        display: inline-block;
        margin-right: 10px;
        color: @gradeAshThree;
      }

      .textarea {
        height: 80px;

        textarea {
          line-height: 20px;
          height: 60px;
        }
      }
      .checkbox {
        .ivu-checkbox-wrapper {
          color: @gradeAshThree;
          margin-right: 0;
          margin-top: 5px;
        }
      }
    }
  }

  .administrativeOfficesManagement {
    display: flex;
    position: relative;
    height: 100%;

    .allContent {
      height: 100%;
      width: 100%;
      border: 1px solid @allBg;
      position: relative;

      .contentBg {
        height: 100%;
        background-color: #fff;
        overflow: hidden;
      }

      .tableWrapper {
        height: calc(~'100% - 50px');
      }
      .right_w{
       .statusCheckbox {
        margin-top: 7px;
        margin-right: 20px;
      }
      }
    }
   .statusCheckbox {
        margin-top: 7px;
        margin-right: 20px;
      }
    .tableWrapper {
      height: 100%;
    }
  }
  }
</style>
