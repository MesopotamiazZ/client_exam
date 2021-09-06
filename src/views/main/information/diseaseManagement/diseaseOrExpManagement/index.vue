/**
  * 疾病或异常管理
  * @author 张祥
  * @date 2017/11/30
  * @updated 刘洋
  * @date 2018/2/1
  */
<template>
  <div class="disOrExpCenterWrapper">
    <div class="disOrExpWrapper">
      <div class="diseaseOrExpManagement">

         <split-pane class="project-content-con height100P" :min='22' :max='28' direction="horizontal" v-model="leftDragWidth">
          <!-- 左侧疾病类型 -->
          <div slot="left" class="left height100P">
            <search-tree
              skipName='diseaseTypes'
              :totalTitle="totalTitle"
              :data="allType"
              @local-search-key="localSearchKey"
              @on-select-change='treeSelectChange'>
            </search-tree>
          </div>
          <!-- 左侧疾病类型 -->


          <!-- 右侧疾病列表 -->
          <div slot="right" class="right width100P contentBg height100P">
            <div class="right_w width100P">
              <title-has-slot>
                <span slot="titletHasSlotLeftTitle"  v-model="headText">{{headText}}</span>
                <div slot="titletHasSlotRightContent" :style="{fontSize:0}" class="titlet-slot-left">
                  <Button v-if="selectMode" type="ghost" class="marginL10 fr" @click="selectMode=false">取 消</Button>
                  <!-- <Button v-if="selectMode" type="ghost" class="marginL10 fr" @click="print()">打 印</Button> -->
                  <Button v-if="selectMode" type="success" class="fr" :disabled="selection.length===0" @click="deleteAllSelect()">删 除</Button>
                  <Button v-if="!selectMode" type="ghost" class="marginL10 fr" @click="selectMode=true">选 择</Button>
                  <Button type="ghost" v-if="!selectMode" class=" fr marginL10" @click="exportBtn" key="5">导 出</Button>
                  <Button v-if="!selectMode"  type="ghost" class="fr" @click="addDisease()">新 增</Button>
                  <searchInput   class="fr" searText="请输入搜索内容" @on-enter='search' @on-Icon='search' @on-cancel='search'></searchInput>
                  <Checkbox  v-if="!selectMode"  v-model="diseasesHistoryModel"  true-value=1 false-value=0 class="statusCheckbox">只查看疾病史疾病</Checkbox>
                </div>
              </title-has-slot>
              <div class="tableWrapper" ref="table">
                <q-table ref="diseaseOrExpManagementTable"
                  :params="disease_params"
                  :columns="disease_columns"
                  :data="diseases.items"
                  :pageInfo="pageInfo"
                  :height="tableHeight"
                  :requestDataApi="getDiseases"
                  :selectMode="selectMode"
                  :ifEdit="true"
                  :width="1500"
                  @getRequestParams="getRequestParams"
                  @preview-btn-selectData="preview"
                  @after-request="afterRequest"
                  @edit="editOneDisease"
                  @on-row-dbClick='editOneDisease'
                  @edit-row="editOneDisease"
                  @delete="delOneDisease"
                  @delete-row="delOneDisease"
                  @on-selection-change="selectChange">
                </q-table>
              </div>
            </div>
            <div v-if="selectOne" class="borderClass"></div>
          </div>
          <!-- 右侧疾病列表 -->
        </split-pane>
      </div>

      <!-- 新增疾病弹窗 -->
      <div class="addDisease modal" v-if="addDiseaseModal">
        <Modal
          v-model="addDiseaseModal"
          class-name="vertical-center-modal"
          :styles="{width:'571px',height:'570px'}"
          :transition-names="[]"
          :mask-closable="false"
          :transfer="false"
          :closable="false">
          <div slot="header">
            <alert-header headerText="新增疾病（或异常）" @alert-retrun-num="getSortby" :headerVal="total+1"></alert-header>
          </div>
          <div class="table-header clearBoth">
            <ul class="table-choose fl clearBoth">
              <li v-for='(data,index) in datas' class="curPointer" @click="addClassFun(data.name,index)" :class='{clickChange:data.name===chooseIndex}'>
               <!-- {{data.data}}<span v-if="index===0">{{number}}</span> -->
               {{data.data}}<span v-if="index===0"></span>
              </li>
            </ul>
          </div>
        <div class="body">
               <!-- 基本信息开始 -->
           <Form ref="addForm" :model="addFormData" :rules="addFormRule">
           <div class="transfer-wrapper" v-show="chooseIndex==='print'">
            <!-- <Form ref="addForm" :model="addFormData" :rules="addFormRule"> -->
              <div class="row clearfix">
                 <div class="item fl ">
                  <span class="textJustify" style="width:110px">疾病类别</span>
                  <FormItem class="fr" prop="disease_type_id">
                    <Select
                      filterable
                      v-model="addFormData.disease_type_id"
                      style="width:160px"
                      placeholder=""
                      :class="{selectionRequired:!addFormData.disease_type_id}">
                      <Option v-for="item in standard_name_Options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </div>
                 <div class="item fr">
                  <span class="textJustify" style="width:60px">项目类别</span>
                  <FormItem class="fr" prop="item_type_id">
                    <Select
                      filterable
                      v-model="addFormData.item_type_id"
                      style="width:160px"
                      placeholder=""
                      :class="{selectionRequired:!addFormData.item_type_id}">
                      <Option v-for="item in getProjectCategoryLists_name_Options" :value="item.value" :key="item.id">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </div>
              </div>
              <div class="row clearfix">
                <div class="item">
                  <span class="textJustify fl" style="width:110px">疾病（或异常）名称</span>
                  <FormItem class="fl" prop="name">
                    <Input v-model="addFormData.name" :class="{inputRequired:!addFormData.name}" style="width:  405px"></Input>
                  </FormItem>
                </div>
              </div>
              <div class="row clearfix">
                <div class="item">
                  <span class="textJustify" style="width:110px">标准疾病名称</span>
                  <Select filterable v-model="addFormData.std_disease_name" style="width:  405px" placeholder="">
                    <Option v-for="item in  std_disease_options" :value="item.value" :key="item.id">{{ item.label }}</Option>
                  </Select>
                </div>
              </div>
             <div class="row ">
                <div class="item ">
                  <span class="textJustify" style="width:110px">诊断信息</span>
                  <Select filterable v-model="addFormData.diagnose_info" style="width:  405px" placeholder="">
                    <Option v-for="item in rdiagnose_info_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
              </div>
              <div class="row  textarea marginT20">
                <div class="item">
                  <span class="textJustify " :style="{width:'110px'}">健康建议</span>
                  <Input v-model="addFormData.advice" type="textarea" style="width:  405px" :row="2"></Input>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="textJustify " :style="{width:'110px'}">备注</span>
                  <Input v-model="addFormData.remark" type="textarea" style="width:  405px" :row="2"></Input>
                </div>
              </div>
               <div class="marginT20 ">
                <div class=" fr">
                  <Checkbox  v-model="addFormData.status"   true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
                  <Checkbox v-model="addFormData.is_common" true-value=1 false-value=0 class="statusCheckbox">是否常见疾病(或异常)</Checkbox>
                  <Checkbox v-model="addFormData.is_add_history" true-value=1 false-value=0 class="statusCheckbox marginR20">是否加入疾病史</Checkbox>
                </div>
              </div>
          </div>
           <!-- 基本信息结束 -->

            <!-- 排斥疾病开始 -->
           <div class="transfer-wrapper" v-show="chooseIndex==='order'">
               <custom-transfer
                :key="3"
                :showing="chooseIndex==='order'"
                selectTitle="疾病类别"
                listWidth="220px"
                listHeight="380px"
                :moveAll="true"
                title="已选列表"
                :columns="package_transfer_columns"
                v-model="addPackagePros"
                :sourceData="diseasesStdNames.items"
                :select="true"
                :selectOptions="standard_name_Option"
                @getSelectValue="getdieaseTypeId">
              </custom-transfer>
              <!-- <span v-show="addPackagePros.length===0" class="transfer-require" :class="{required:addPackagePros.length===0&&showTransferRequire}">*</span> -->
                 <div class="row marginT-10 marginB10">
                    <div class="clearBoth"></div>
                 </div>
          </div>
           <!-- 排斥疾病结束 -->

            <!-- 复查项目开始 -->
           <div class="transfer-wrapper "  v-show="chooseIndex==='check'">
            <custom-transfer
                :key="4"
                selectTitle="项目类别"
                listWidth="220px"
                listHeight="380px"
                :moveAll="true"
                title="已选列表"
                :showing="chooseIndex==='check'"
                :columns="review_project_columns"
                :leftColumns="left_review_project_columns"
                v-model="addPackageProse"
                :sourceData="allPro"
                :select="true"
                @getSelectData="getAddTargets"
                :selectOptions="getProjectCategoryLists_name_Option"
                @getSelectValue="getTypeId">
              </custom-transfer>
              <!-- <span v-if="addPackageProse.length===0" class="transfer-require" :class="{required:addPackageProse.length===0&&showTransferRequires}">*</span> -->
                  <div class="row marginT-10 marginB10">
                <div class="clearBoth"></div>
              </div>
          </div>
         </Form>
           <!-- 复查项目结束 -->
        </div>


          <div slot="footer">
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
          :styles="{width:'571px',height:'610px'}"
          :transition-names="[]"
          :mask-closable="false"
          :transfer="false"
          :closable="false">
          <div slot="header">
            <alert-header headerText="编辑疾病（或异常）" @alert-retrun-num="getSortby" :headerVal="addFormData.sort"></alert-header>
          </div>
          <div class="table-header clearBoth">
            <ul class="table-choose fl clearBoth">
              <li v-for='(data,index) in datas' class="curPointer" @click="addClassFun(data.name,index)" :class='{clickChange:data.name===chooseIndex}'>
                 {{data.data}}<span v-show="index===0"></span>
              </li>
            </ul>
          </div>
             <div class="body">
               <!-- 基本信息开始 -->
           <Form ref="editForm" :model="addFormData" :rules="addFormRule">
           <div class="transfer-wrapper" v-show="chooseIndex==='print'">
            <!-- <Form ref="addForm" :model="addFormData" :rules="addFormRule"> -->
              <div class="row clearfix">
                 <div class="item fl ">
                  <span class="textJustify" style="width:110px">疾病类别</span>
                  <FormItem class="fr" prop="disease_type_id">
                    <Select
                      filterable
                      v-model="addFormData.disease_type_id"
                      style="width:160px"
                      placeholder=""
                      :class="{selectionRequired:!addFormData.disease_type_id}">
                      <Option v-for="item in standard_name_Options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </div>
                 <div class="item fr">
                  <span class="textJustify" style="width:60px">项目类别</span>
                  <FormItem class="fr" prop="item_type_id">
                    <Select
                      filterable
                      v-model="addFormData.item_type_id"
                      style="width:160px"
                      placeholder=""
                      :class="{selectionRequired:!addFormData.item_type_id}">
                      <Option v-for="item in getProjectCategoryLists_name_Options" :value="item.value" :key="item.id">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </div>
              </div>
              <div class="row clearfix">
                <div class="item">
                  <span class="textJustify fl" style="width:110px">疾病（或异常）名称</span>
                  <FormItem class="fl" prop="name">
                    <Input v-model="addFormData.name" :class="{inputRequired:!addFormData.name}" style="width:  405px"></Input>
                  </FormItem>
                </div>
              </div>
              <div class="row clearfix">
                <div class="item">
                  <span class="textJustify" style="width:110px">标准疾病名称</span>
                  <Select filterable v-model="addFormData.std_disease_name" style="width:  405px" placeholder="">
                    <Option v-for="item in  std_disease_options" :value="item.value" :key="item.id">{{ item.label }}</Option>
                  </Select>
                </div>
              </div>
             <div class="row ">
                <div class="item ">
                  <span class="textJustify" style="width:110px">诊断信息</span>
                  <Select filterable v-model="addFormData.diagnose_info" style="width:  405px" placeholder="">
                    <Option v-for="item in rdiagnose_info_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
              </div>
              <div class="row  textarea marginT20">
                <div class="item">
                  <span class="textJustify " :style="{width:'110px'}">健康建议</span>
                  <Input v-model="addFormData.advice" type="textarea" style="width:  405px" :row="2"></Input>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="textJustify " :style="{width:'110px'}">备注</span>
                  <Input v-model="addFormData.remark" type="textarea" style="width:  405px" :row="2"></Input>
                </div>
              </div>
               <div class="marginT20">
                <div class="item ">
                  <span class="textJustify fl">最后修改人：{{curDisease?curDisease.operater:''}}</span>
                  <span class="textJustify fl marginL20 " style=" marginBottom:10px">最后修改时间：{{updated_at}}</span>
                </div>
              </div>
               <div class="">
                <div class=" fr">
                  <Checkbox  v-model="addFormData.status"   true-value=1 false-value=0 class="statusCheckbox">启用</Checkbox>
                  <Checkbox v-model="addFormData.is_common" true-value=1 false-value=0 class="statusCheckbox">是否常见疾病(或异常)</Checkbox>
                  <Checkbox v-model="addFormData.is_add_history" true-value=1 false-value=0 class="statusCheckbox marginR20">是否加入疾病史</Checkbox>
                </div>
              </div>

              <!-- <div class="row marginT-10 marginB10">

                <div class="clearBoth"></div>
              </div> -->

          </div>
           <!-- 基本信息结束 -->

            <!-- 排斥疾病开始 -->
           <div class="transfer-wrapper" v-show="chooseIndex==='order'">
               <custom-transfer
                :key="3"
                :showing="chooseIndex==='order'"
                selectTitle="疾病类别"
                listWidth="220px"
                listHeight="380px"
                :moveAll="true"
                title="已选列表"
                :columns="package_transfer_columns"
                v-model="addPackagePros"
                :sourceData="diseasesStdNames.items"
                :select="true"
                :selectOptions="standard_name_Option"
                @getSelectValue="getdieaseTypeId">
              </custom-transfer>
              <!-- <span v-show="addPackagePros.length===0" class="transfer-require" :class="{required:addPackagePros.length===0&&showTransferRequire}">*</span> -->
                 <div class="row marginT-10 marginB10">
                    <div class="clearBoth"></div>
                 </div>
          </div>
           <!-- 排斥疾病结束 -->

            <!-- 复查项目开始 -->
           <div class="transfer-wrapper "  v-show="chooseIndex==='check'">
            <custom-transfer
                :key="4"
                selectTitle="项目类别"
                listWidth="220px"
                listHeight="380px"
                :moveAll="true"
                title="已选列表"
                :showing="chooseIndex==='check'"
                :columns="review_project_columns"
                :leftColumns="left_review_project_columns"
                v-model="addPackageProse"
                :sourceData="allPro"
                :select="true"
                @getSelectData="getAddTargets"
                :selectOptions="getProjectCategoryLists_name_Option"
                @getSelectValue="getTypeId">
              </custom-transfer>
              <!-- <span v-if="addPackageProse.length===.0" class="transfer-require" :class="{required:addPackageProse.length===0&&showTransferRequires}">*</span> -->
                  <div class="row marginT-10 marginB10">
                <div class="clearBoth"></div>
              </div>
          </div>
         </Form>
           <!-- 复查项目结束 -->
        </div>

          <div slot="footer">
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

  import * as types from '@/store/modules/information/diseaseManagement/diseaseOrExpManagement/diseaseOrExpManagementTypes'
  import api from '@/api'
  import exportXlsx from '@/service/export-xlsx.js'
  export default {
    name: 'diseaseOrExpManagement',
    components: {
      SearchTable,
      searchInput,
    },
    data() {
      return {
        leftDragWidth: 22,
        exportParams: {
          reqParams: {},
          columns: [
            {
              title: '疾病类别',
              key: 'disease_type',
              render: (value) => {
                return value ? value.name : ''
              },
            },
            {
              title: '疾病（或异常）名称',
              key: 'name',
            },
            {
              title: '标准疾病名称',
              key: 'std_disease',
              render: (value) => {
                return value ? value.name : ''
              },
            },
            {
              title: 'ICD-10编码',
              key: 'ICD10_code',
            },
            {
              title: '常见疾病（或异常）',
              key: 'is_common',
              render: (value) => {
                return value === 1 ? '常见疾病（或异常）' : '非常见疾病（或异常）'
              },
            },
            {
              title: '建议',
              key: 'advice',
            },
            {
              title: '备注',
              key: 'remark',
            },
            {
              title: '启用',
              key: 'status',
              render: (value) => {
                if (value) {
                  return value === 1 ? '启用' : '未启用'
                }
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
        headText: '所有疾病类别',
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
        selectMode: false,
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
            value: 4,
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
            key: 'disease_type',
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
        left_review_project_columns: [
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
            title: '复查项目名称',
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
            data: '排斥疾病',
            name: 'order',
          },
          data3: {
            data: '复查项目',
            name: 'check',
          },
        },
        allType: [],
        totalTitle: '所有类别',
        addFormRule: {
          name: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('疾病（或异常）名称不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
          item_type_id: [
            {
              validator: (rule, value, callback) => {
                if (typeof value === 'number') {
                  callback()
                } else {
                  callback(new Error('项目类别不能为空'))
                }
              },
            },
          ],
          disease_type_id: [
            {
              validator: (rule, value, callback) => {
                if (typeof value === 'number') {
                  callback()
                } else {
                  callback(new Error('疾病类别不能为空'))
                }
              },
            },
          ],
        },
        selectOne: false,
        updated_at: '',
        curDelDisease: undefined,
        disease_params: {
          is_add_history: '',
          search: '',
          // with: 'diseaseType:name;stdDisease:name;',
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
          item_type_id: '',
          disease_type_id: '',
          type_id: '',
          is_common: 0,
          advice: '',
          std_disease_name: '',
          sort: 0,
          status: '0',
          is_add_history: '0',
          exclude_disease_ids: '',
          reexam_group_item_ids: '',
          ICD10_code: '',
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
            title: '疾病类别',
            key: 'disease_type_id',
            ellipsis: true,
            // minWidth: 200,
            render: (h, params) => {
              if (params.row && params.row.disease_type) {
                return params.row.disease_type.name
              }
            },
            titleRender: (data) => {
              return data.disease_type ? data.disease_type.name : ''
            },
          },
          {
            title: '疾病（或异常）名称',
            key: 'name',
            ellipsis: true,
            // minWidth: 200,
          },
          {
            title: '标准疾病名称',
            key: 'std_disease_name',
            ellipsis: true,
            // minWidth: 200,
            // render: (h, params) => {
            //   if (params.row.std_disease) {
            //     return params.row.std_disease.name
            //   }
            // },
            // titleRender: (data) => {
            //   return data.std_disease ? data.std_disease.name : ''
            // },
          },
          {
            title: 'ICD-10编码',
            key: 'ICD10_code',
            // minWidth: 100,
            ellipsis: true,
          },
          {
            // minWidth: 130,
            title: '常见疾病（或异常）',
            key: 'is_common',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              if (params.row.is_common === 1) {
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
                label: '常见疾病（或异常）',
              },
              {
                value: 0,
                label: '非常见疾病（或异常）',
              },
            ],
          },
          {
            title: '建议',
            key: 'advice',
            ellipsis: true,
            // width: 200,
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
            width: 70,
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
      ...mapState('diseaseOrExpManagementModule', [
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
        'getDiseaseAbnsStds',
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
      getProjectCategoryLists_name_Option() {
        let arr = [
          {
            value: -1,
            label: '全部',
          },
        ]
        // console.log(this.getProjectCategoryLists)
        this.getProjectCategoryLists.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
      },
      getProjectCategoryLists_name_Options() {
        let arr = [
        ]
        // console.log(this.getProjectCategoryLists)
        this.getProjectCategoryLists.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
      },

      standard_name_Option() {
        let arr = [
          {
            value: -1,
            label: '全部',
          },
        ]
        this.diseaseTypes.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
        // let arr = []
        // for (var i = 0; i < this.diseaseTypes.length; i++) {
        //   const type = this.diseaseTypes[i]
        //   arr.push({
        //     value: type.id,
        //     label: type.name,
        //   })
        // }
        // return arr
      },

      standard_name_Options() {
        let arr = [

        ]
        this.diseaseTypes.forEach(item => {
          arr.push({
            value: item.id,
            label: item.name,
          })
        })
        return arr
        // let arr = []
        // for (var i = 0; i < this.diseaseTypes.length; i++) {
        //   const type = this.diseaseTypes[i]
        //   arr.push({
        //     value: type.id,
        //     label: type.name,
        //   })
        // }
        // return arr
      },
      std_disease_options() {
        // console.log(777, this.getDiseaseAbnsStds)
        let arr2 = []
        for (var i = 0; i < this.getDiseaseAbnsStds.length; i++) {
          const type = this.getDiseaseAbnsStds[i]
          arr2.push({
            value: type.name,
            label: type.name,
          })
        }
        return arr2
      },
      // getProjectCategoryLists_name_Option() {
      //   let arr = [
      //     {
      //       value: -1,
      //       label: '全部',
      //     },
      //   ]
      //   console.log(this.getProjectCategoryLists)
      //   this.getProjectCategoryLists.forEach(item => {
      //     arr.push({
      //       value: item.id,
      //       label: item.name,
      //     })
      //   })
      //   return arr
      // },
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
      ...mapMutations('diseaseOrExpManagementModule', {
        setDiseasesNum: types.SET_DISEASESNUM,
        setTotal: types.SET_TOTAL,
        reset: types.RESET,
      }),
      ...mapActions('diseaseOrExpManagementModule', [
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
        'getDiseaseAbnsStd',
      ]),
      getRequestParams(params) {
        this.exportParams.reqParams = params
        // console.log(this.exportParams.reqParams)
        // api.getExamCategoryList()
      },
      exportBtn() {
        // console.log('导出')
        let _this = this
        exportXlsx('疾病或异常管理', {
          api: api.diseaseOrExpManagement.getDiseases,
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
      getAddTargets(data) {
        this.addTarget = data
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
          params.filters = `disease_type_id:${val};status:1`
        }
        this.getDiseasesStdName(params)
      },
      getTypeId(val) {
        let params = {
          with: 'itemType:name',
          per_page: 10000,
        }
        if (val !== -1) {
          params.filters = `item_type_id:${val};status:1`
        }
        this.getAllPro(params)
      },
      async treeSelectChange(data) {
        // console.log(11, data)
        this.oObj = data[0]
        // this.oObj.expand = !this.oObj.expand
        if (data[0]) {
          this.selfType = data[0].level
          this.oObj = data[0]
        }
        if (this.selfType === 3) {
          // alert(33)
        } else if (this.selfType === 2) {
          this.headText = this.oObj.name
          this.disease_params.filters = 'disease_type_id:' + this.oObj.id
        } else if (this.selfType === 1) {
          this.disease_params.filters = ''
          this.tableTitle = '所有疾病类别'
          this.headText = '所有疾病类别'
        }
      },
      localSearchKey(data) {
      /* console.log(data) */
      },
      mountedAllType() {
        this.allType = [
          {
            title: '所有疾病类别',
            level: 1,
            expand: true,
            children: [],
          },
        ]
        this.diseaseTypes.forEach((item) => {
          if (!item.children) {
            item.children = []
          }
          item.expand = true
          item.level = 2
          item.title = item.name
          // this.diseases.items.forEach((disea) => {
          //   if (item.id === disea.disease_type_id) {
          //     return item.children.push(disea)
          //   }
          //   disea.title = disea.name
          //   disea.level = 3
          // })
          this.allType[0].children.push(JSON.parse(JSON.stringify(item)))
        })
      },
      async saveAddDisease() {
        let val = await this.$refs.addForm.validate()
        if (val) {
          let arr = []
          this.addPackagePros.forEach(item => {
            arr.push(item.id)
          })
          this.addFormData.exclude_disease_ids = arr
          let arr2 = []
          this.addPackageProse.forEach(item => {
            arr2.push(item.id)
          })
          let ICD10Code
          this.getDiseaseAbnsStds.forEach(item => {
            if (item.name === this.addFormData.std_disease_name) {
              ICD10Code = item.ICD10_code
            }
          })
          // console.log(555, this.getDiseaseAbnsStds)
          // console.log(6666, this.addFormData.std_disease_name)
          // this.addFormData.ICD10_code =
          this.addFormData.reexam_group_item_ids = arr2
          this.addFormData.ICD10_code = ICD10Code
          console.log(this.addFormData)
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
        if (valid) {
          let arr = []
          this.addPackagePros.forEach(item => {
            arr.push(item.id)
          })
          this.addFormData.exclude_disease_ids = arr
          let arr2 = []
          this.addPackageProse.forEach(item => {
            arr2.push(item.id)
          })
          let ICD10Code
          this.getDiseaseAbnsStds.forEach(item => {
            if (item.name === this.addFormData.std_disease_name) {
              ICD10Code = item.ICD10_code
            }
          })
          this.addFormData.ICD10_code = ICD10Code
          this.addFormData.reexam_group_item_ids = arr2
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
          this.getDiseasesStdName(),
          this.getReexam(), // 获取复查项目列表
          this.getProjectCategoryList(), // 获取项目类别
          this.getDiseasesStdName(),
          this.getDiseaseAbnsStd(), // 获取标准疾病
        ])
        // if (data.is_std) {
        //   return
        // }
        this.showTransferRequires = false
        this.addPackagePros = data.excludes
        this.addPackageProse = data.reexam_groups
        this.curDisease = data
        this.addFormData = {
          name: data.name,
          status: data.status + '',
          remark: data.remark,
          is_add_history: data.is_add_history + '',
          diagnose_info: data.diagnose_info,
          item_type_id: data.item_type_id,
          disease_type_id: data.disease_type_id,
          type_id: data.type_id,
          is_common: data.is_common + '',
          std_disease_name: data.std_disease_name,
          advice: data.advice,
          sort: data.sort,
          exclude_disease_ids: data.exclude_disease_ids,
          reexam_group_item_ids: data.reexam_group_item_ids,
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
          exclude_disease_ids: data.exclude_disease_ids,
          reexam_group_item_ids: data.reexam_group_item_ids,
          remark: data.remark,
          diagnose_info: data.diagnose_info,
          item_type_id: data.item_type_id,
          disease_type_id: data.disease_type_id,
          type_id: data.type_id,
          is_common: data.is_common + '',
          std_disease_name: data.std_disease_name,
          advice: data.advice,
          sort: data.sort,
          status: data.status + '',
          is_add_history: data.is_add_history,
          ICD10_code: data.ICD10_code,
        }
        this.updated_at = fifters.timeFilter(data.updated_at, 'YYYY-MM-DD HH:mm')
      },
      async addDisease() {
        // await this.getReexamItems()
        await Promise.all([
          this.getAllPro({
            with: `itemType:name`,
            per_page: 10000,
          }),
          this.getDiseasesStdName(),
          this.getReexam(), // 获取复查项目列表
          this.getProjectCategoryList(), // 获取项目类别
          this.getDiseasesStdName(),
          this.getDiseaseAbnsStd(), // 获取标准疾病
        ])
        this.addDiseaseModal = true
        this.showTransferRequires = false

        // 清空上次填写的数据
        this.addFormData = {
          name: '',
          remark: '',
          is_add_history: '0',
          diagnose_info: '',
          item_type_id: '',
          disease_type_id: '',
          is_common: '0',
          std_disease_name: '',
          advice: '',
          sort: this.total + 1,
          status: '1',
          exclude_disease_ids: '',
          reexam_group_item_ids: '',
          ICD10_code: '',
        }
        this.addPackagePros = []
        this.addPackageProse = []
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
        for (let i = 0; i < this.selection.length; i++) {
          const element = this.selection[i]
          if (element.is_std === 1) {
            // 标准数据不能删除
            alert('选项中包含标准数据，不能删除')
            return
          }
        }
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
      diseasesHistoryModel(data) {
        // console.log(44, data)
        if (data === '1') {
          this.disease_params.filters = 'is_add_history:' + 1
        } else {
          this.disease_params.filters = 'is_add_history:' + 0
        }
      },
    },
    async created() {
      await this.getDiseaseTypes({ per_page: 10000 }) // 获取全部的疾病类型\
      await this.mountedAllType()
      await this.setTotal()
    },
    async mounted() {
      this.tableHeight = this.$refs.table.offsetHeight
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
  .disOrExpCenterWrapper {
    // width: 1055px;
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
          padding-bottom:20px;
        }

        form{
         padding: 15px  20px  0px  20px ;
         overflow: auto;
         height: calc(~'100% - 50px');

        }
      }
    }

    .height100P{
      height: 100%;
    }

    .width100P{
      width: 100%;
    }

    .disOrExpWrapper {
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

    // .addDisease{
    //   .ivu-modal {
    //     height: calc(~'100% - 41px');
    //     max-height: 599px;
    //   }
    //   .ivu-modal-content {
    //     height: 100%;
    //   }
    //   .ivu-modal-body {
    //     height: calc(~'100% - 100px');
    //     padding-bottom: 20px;

    //     .body {
    //       height: 100%;
    //       overflow: auto;
    //     }
    //   }
    // }

        // .ivu-modal {
        //   height: calc(~'100% - 100px');
        // }
        // .ivu-modal-content {
        //   height: 100%;
        // }
        // .ivu-modal-body {
        //   height: calc(~'100% - 100px');
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
          height: 50px;
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

    .diseaseOrExpManagement {
      position: relative;
      height: 100%;
      .project-content-con {
        width: 100%;
        height: 100%;
      }
      .left {
        // width: 229px;
        // margin-right: 10px;
        height: 100%;
        background: #f2f7ff;
        border: 1px solid #d9d9d9;
        color: #111111;
        box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.5);
        border-radius: 8px 0 0  8px;
      }

      .right {
        height: 100%;
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

      .tableWrapper {
        height: 100%;
      }
    }
}
</style>
