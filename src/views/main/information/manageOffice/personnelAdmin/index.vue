/*
* 职员管理
* @author xk
* @date 2018.3.5
*/
<template>
  <div class='personnel-admin'>
    <div class="container contentBg">
      <div class="table-wrapper"
           slot="right">
        <!-- header -->
        <div class="header">
          <content-header :showTitle="showTitle">
            <div slot="title">职员列表</div>
            <!-- <div slot="other">123</div> -->
            <div slot="contents"
                 class="header-content-wrapper paddingR20">
              <search-input searText="请输入搜索内容"
                            @on-enter="headerSearchEnter"
                            @on-Icon="headerSearchEnter"
                            @on-cancel="headerSearchCancel"
                            :searchWidth="220">
              </search-input>
              <template v-if="!isSelectMode">
                <Button type="ghost"
                          class="marginR10"
                          @click="headerAdd">新 增</Button>
                          <Button type="ghost"
                          class="marginR10"  @click="exportBtn">导 出</Button>
                <Button type="ghost"
                          @click="toSelectMode">选 择</Button>
              </template>
              <template v-else>
                <!-- <Button type="success"
                          class="marginR10"
                          :disabled="selectionData.length===0"
                          @click="headerDelete">删 除</Button> -->
                
                <Button type="primary"
                          @click="exitSelectMode">取 消</Button>
              </template>
            </div>
          </content-header>
        </div>
        <!-- body :initReq="false" @edit="tableEdit" -->
        <div class="body"
             ref="body">
          <q-table ref="table"
                  :width="1712"
                   :ifEdit="true"
                   :selectMode="isSelectMode"
                   :height="tableHeight"
                   :columns="tableColumns"
                   :data="tableData"
                   :params="tableParams"
                   :pageInfo="tableInfo"
                   :requestDataApi="getPersonnel"
                   @edit-row="tableRowEdit"
                   @delete="tableDelete"
                   @delete-row="tableRowDelete"
                   @on-select="tableSelectRow"
                   @on-select-cancel="tableCancelSelectRow"
                   @on-select-all="tableSelectAll"
                   @all-selection="tableAllSelection"
                   @on-selection-change="tableSelectionChange"
                   @on-row-click="tableClickRow"
                   @on-row-dbClick="tableRowEdit" :showOperateColumn = "false"  @getRequestParams="getRequestParams">
          </q-table>
        </div>
      </div>
    </div>
    <!-- add -->
    <Modal v-model="add.showModal"
           v-if="add.showModal"
           width="642"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="新增职员"
                      :headerVal="sortValue"
                      @alert-retrun-num="addSortCtrl"></alert-header>
      </div>
      <Form :model="add.formData"
            :rules="formRules"
            class="pam-modal-content paddingL20"
            ref="addForm">
        <s-tabs :list="['基本信息','所在科室']"
                margin="30"
                @on-change="addModalTabChange"></s-tabs>
        <div class="pam-modal-content-wrapper paddingR20 marginB20">
          <div v-if="addModalPage===1"
               class="">
            <div class="pam-form-row">
              <span class="pam-item-label">姓名</span>
              <FormItem class="pam-flex1 marginL10"
                        prop="name">
                <Input v-model="add.formData.name"
                       :class="{inputVerificationTs: isEmpty(add.formData.name)}"></Input>
              </FormItem>
              <span class=" marginL10">性别</span>
              <FormItem class="marginL10"
                        style="width:70px"
                        prop="sex">
                <Select v-model="add.formData.sex"
                        :class="{selectVerificationTs: isEmpty(add.formData.sex)}" placeholder=" ">
                  <Option :value="1">男</Option>
                  <Option :value="2">女</Option>
                </Select>
              </FormItem>
              <span class="pam-item-label marginL20">人员编号</span>
              <FormItem class="pam-item-large marginL10"
                        prop="code">
                <Input v-model="add.formData.code"
                       :class="{inputVerificationTs: isEmpty(add.formData.code)}"></Input>
              </FormItem>
            </div>
            <div class="pam-form-row">
              <span class="pam-item-label">民族</span>
              <FormItem class="pam-flex1 marginL10"
                        prop="nation">
                <Select v-model="add.formData.nation"
                        :class="{selectVerificationTs: isEmpty(add.formData.nation)}" placeholder=" ">
                  <Option :value="1">汉族</Option>
                  <Option :value="2">少数民族</Option>
                  <Option :value="3">其他</Option>
                </Select>
              </FormItem>
              <span class="pam-item-label marginL20">身份证号</span>
              <FormItem class="pam-item-large marginL10"
                        name="id_card">
                <Input v-model="add.formData.id_card"
                       :class="{inputVerificationTs: isEmpty(add.formData.id_card)}"></Input>
              </FormItem>
            </div>
            <div class="pam-form-row">
              <span class="pam-item-label">手机号</span>
              <FormItem class="pam-flex1 marginL10"
                        prop="mobile">
                <Input v-model="add.formData.mobile"
                       :class="{inputVerificationTs: isEmpty(add.formData.mobile)}"></Input>
              </FormItem>
              <span class="pam-item-label marginL20">行政职务</span>
              <FormItem class="pam-item-large marginL10">
                <Select v-model="add.formData.administrative_duties_id" placeholder=" ">
                  <Option :value="item.id"
                          v-for="item in adminstartiveAll.items"
                          :key="item.id"
                          :label="item.name"></Option>
                </Select>
              </FormItem>
            </div>
            <div class="pam-form-row">
              <span class="pam-item-label">党内职务</span>
              <FormItem class="pam-flex1 marginL10">
                <Select v-model="add.formData.inner_party_duties_id" placement="top" transfer placeholder=" ">
                  <Option :value="item.id"
                          v-for="item in innerPartyDytiesAll.items"
                          :key="item.id"
                          :label="item.name"></Option>
                </Select>
              </FormItem>
              <span class="pam-item-label marginL20">职称</span>
              <FormItem class="pam-item-large marginL10">
                <Select v-model="add.formData.pro_title" placement="top" transfer placeholder=" ">
                  <Option :value="1">医师</Option>
                  <Option :value="2">主治医师</Option>
                  <Option :value="3">副主任医师</Option>
                  <Option :value="4">主任医师</Option>
                  <Option :value="5">护士</Option>
                  <Option :value="6">护师</Option>
                  <Option :value="7">主管护师</Option>
                  <Option :value="8">副主任护师</Option>
                  <Option :value="9">主任护师</Option>
                </Select>
              </FormItem>
            </div>
            <div class="pam-form-row">
              <div class="pam-form-col">
                <!-- <div class="pam-add-content pam-flex1"> -->
                  <div class="pam-col-l" v-for="(items,index) in formDepartment" :key="items.id">
                    <span class="pam-item-label marginR10">所在部门</span>
                    <!-- <Select v-model="add.formData.divisions" -->
                    <Select v-model="items.id"
                            style="width:198px;" placement="top" transfer placeholder=" ">
                      <Option :value="item.id"
                              v-for="item in divisionsAll.items"
                              :key="item.id"
                              :label="item.name"></Option>
                    </Select>
                    <div v-if="notLast(index)" @click="addFormDeap" class="add-item-wrapper">
                      <icon name="addNewItemT"
                            class="marginL10 add-btn"></icon>
                      </div>
                    <div v-else @click="delFormDeap(index)" class="add-item-wrapper">
                    <icon name="deletItemT"
                          class="marginL10 add-btn"></icon>
                    </div> 
                  </div>
                  
                <!-- </div> -->
              </div>
              <div class="pam-form-col">
                <div class="pam-col-r" v-for="(items,index) in formJobs" :key="items.id">
                  <!-- <div class="pam-add-content marginL10"> -->
                    <span class="pam-item-label marginR10">岗位</span>
                    <!-- <Select v-model="add.formData.divisions" style="width:203px"> -->
                    <Select v-model="items.id" style="width:203px"placement="top" transfer placeholder=" ">
                      <Option :value="item.id"
                              v-for="item in jobsAll.items"
                              :key="item.id"
                              :label="item.name"></Option>
                    </Select>
                    <!-- <z-input class="pam-flex1 marginL10"></z-input> -->
                    <div  v-if="notLastJobs(index)" class="add-item-wrapper" @click="addFormJobs">
                    <icon name="addNewItemT"
                          class="marginL10 add-btn"></icon>
                    </div>
                    <div  v-else class="add-item-wrapper" @click="delFormJobs">
                    <icon name="deletItemT"
                          class="marginL10 add-btn"></icon>
                    </div>

                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="pam-form-row">
              <span class="pam-item-label">科室类别</span>
              <FormItem prop="pCode"
                        class="pam-item-small marginL10">
                <Select v-model="selectDepts" transfer placeholder=" ">
                  <Option v-for="item in doneDeptTypeAll.items" :key="item.id" :label="item.name" :value="item.id"></Option>
                </Select>
              </FormItem>
            </div>
            <CheckboxGroup v-model="add.formData.depts">
              <div class="pam-form-row have-bg">
                <div class="check-wrapper"
                     v-for="item in deptAll.items" :key="item.id">
                  <Checkbox :label="item.id">{{item.name}}</Checkbox>
                </div>
              </div>
            </CheckboxGroup>
          </div>
        </div>

        <!-- 备注 -->
        <!-- <div class="pam-form-row-height marginB20">
          <span class="pam-item-label pam-form-row-height-label">备注</span>
          <Input type="textarea"
                 v-model="add.formData.remark"
                 class="pam-flex1 marginL10"></Input>
        </div> -->
      </Form>
      <div slot="footer"
           class="">
        <div class="pam-modal-footer">
          <Checkbox v-model="add.formData.status">启用</Checkbox>
          <Button @click="addFormSave"
                    type="primary"
                    class="marginR20">保 存</Button>
          <Button @click="addFormCancel"
                    type="ghost">取 消</Button>
        </div>
      </div>
    </Modal>
    <!-- edit -->
    <Modal v-model="edit.showModal"
           v-if="edit.showModal"
           width="642"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="编辑职员"
                      :headerVal="edit.formData.sort"
                      @alert-retrun-num="editSortCtrl"></alert-header>
      </div>
      <Form :model="edit.formData"
            :rules="formRules"
            class="pam-modal-content paddingL20 "
            ref="editForm">
        <s-tabs :list="['基本信息','所在科室']"
                margin="30"
                @on-change="addModalTabChange"></s-tabs>
        <div class="pam-modal-content-wrapper paddingR20 marginB20">
          <div v-if="addModalPage===1"
               class="">
            <div class="pam-form-row">
              <span class="pam-item-label">姓名</span>
              <FormItem class="pam-flex1 marginL10" prop="name">
                 <Input v-model="edit.formData.name"
                       :class="{inputVerificationTs: isEmpty(edit.formData.name)}"></Input>
              </FormItem>
              <span class=" marginL10">性别</span>
              <FormItem class="marginL10"
                        style="width:70px" prop="sex">
                <Select v-model="edit.formData.sex"
                        :class="{selectVerificationTs: isEmpty(edit.formData.sex)}" placeholder=" ">
                  <Option :value="1">男</Option>
                  <Option :value="2">女</Option>
                </Select>
              </FormItem>
              <span class="pam-item-label marginL20">人员编号</span>
              <FormItem class="pam-item-large marginL10" prop="code">
                <Input v-model="edit.formData.code"
                       :class="{inputVerificationTs: isEmpty(edit.formData.code)}"></Input>
              </FormItem>
            </div>
            <div class="pam-form-row">
              <span class="pam-item-label">民族</span>
              <FormItem class="pam-flex1 marginL10">
                 <Select v-model="edit.formData.nation" placeholder=" ">
                  <Option :value="1">汉族</Option>
                  <Option :value="2">少数民族</Option>
                  <Option :value="3">其他</Option>
                </Select>
              </FormItem>
              <span class="pam-item-label marginL20">身份证号</span>
              <FormItem class="pam-item-large marginL10" prop="id_card">
                <Input v-model="edit.formData.id_card"
                       :class="{inputVerificationTs: isEmpty(edit.formData.id_card)}"></Input>
              </FormItem>
            </div>
            <div class="pam-form-row">
              <span class="pam-item-label">手机号</span>
              <FormItem class="pam-flex1 marginL10" prop="mobile">
                <Input v-model="edit.formData.mobile"
                       :class="{inputVerificationTs: isEmpty(edit.formData.mobile)}"></Input>
              </FormItem>
              <span class="pam-item-label marginL20">行政职务</span>
              <FormItem class="pam-item-large marginL10">
                <Select v-model="edit.formData.administrative_duties_id" transfer placeholder=" ">
                  <Option :value="item.id"
                          v-for="item in adminstartiveAll.items"
                          :key="item.id"
                          :label="item.name"></Option>
                </Select>
              </FormItem>
            </div>
            <div class="pam-form-row">
              <span class="pam-item-label">党内职务</span>
              <FormItem class="pam-flex1 marginL10">
                <Select v-model="edit.formData.inner_party_duties_id"  placement="top" transfer placeholder=" ">
                  <Option :value="item.id"
                          v-for="item in innerPartyDytiesAll.items"
                          :key="item.id"
                          :label="item.name"></Option>
                </Select>
              </FormItem>
              <span class="pam-item-label marginL20">职称</span>
              <FormItem class="pam-item-large marginL10">
                <Select v-model="edit.formData.pro_title"  placement="top" transfer placeholder=" ">
                  <Option :value="1">医师</Option>
                  <Option :value="2">主治医师</Option>
                  <Option :value="3">副主任医师</Option>
                  <Option :value="4">主任医师</Option>
                  <Option :value="5">护士</Option>
                  <Option :value="6">护师</Option>
                  <Option :value="7">主管护师</Option>
                  <Option :value="8">副主任护师</Option>
                  <Option :value="9">主任护师</Option>
                </Select>
              </FormItem>
            </div>
            <!-- for -->
            <div class="pam-form-row">
              <div class="pam-form-col">
                <!-- <div class="pam-add-content pam-flex1"> -->
                  <div class="pam-col-l" v-for="(items,index) in formDepartment" :key="items.id">
                    <span class="pam-item-label marginR10">所在部门</span>
                    <!-- <Select v-model="add.formData.divisions" -->
                    <Select v-model="items.id"
                            style="width:198px;"  placement="top" transfer placeholder=" ">
                      <Option :value="item.id"
                              v-for="item in divisionsAll.items"
                              :key="item.id"
                              :label="item.name"></Option>
                    </Select>
                    <div v-if="notLast(index)" @click="addFormDeap" class="add-item-wrapper">
                      <icon name="addNewItemT"
                            class="marginL10 add-btn"></icon>
                      </div>
                    <div v-else @click="delFormDeap(index)" class="add-item-wrapper">
                    <icon name="deletItemT"
                          class="marginL10 add-btn"></icon>
                    </div> 
                  </div>
                  
                <!-- </div> -->
              </div>
              <div class="pam-form-col">
                <div class="pam-col-r" v-for="(items,index) in formJobs" :key="items.id">
                  <!-- <div class="pam-add-content marginL10"> -->
                    <span class="pam-item-label marginR10">岗位</span>
                    <!-- <Select v-model="add.formData.divisions" style="width:203px"> -->
                    <Select v-model="items.id" style="width:203px"  placement="top" transfer placeholder=" ">
                      <Option :value="item.id"
                              v-for="item in jobsAll.items"
                              :key="item.id"
                              :label="item.name"></Option>
                    </Select>
                    <!-- <z-input class="pam-flex1 marginL10"></z-input> -->
                    <div  v-if="notLastJobs(index)" class="add-item-wrapper" @click="addFormJobs">
                    <icon name="addNewItemT"
                          class="marginL10 add-btn"></icon>
                    </div>
                    <div  v-else class="add-item-wrapper" @click="delFormJobs">
                    <icon name="deletItemT"
                          class="marginL10 add-btn"></icon>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="pam-form-row">
              <span class="pam-item-label">科室类别</span>
              <FormItem prop="pCode"
                        class="pam-item-small marginL10">
                <Select v-model="selectDepts" transfer placeholder=" ">
                  <Option v-for="item in doneDeptTypeAll.items" :key="item.id" :label="item.name" :value="item.id"></Option>
                </Select>
              </FormItem>
            </div>
            <CheckboxGroup v-model="edit.formData.depts">
              <div class="pam-form-row have-bg">
                <div class="check-wrapper"
                     v-for="item in deptAll.items" :key="item.id">
                  <Checkbox :label="item.id">{{item.name}}</Checkbox>
                </div>
              </div>
            </CheckboxGroup>
          </div>
        </div>
        
      </Form>
      <div slot="footer"
           class="">
        <div class="pam-modal-footer marginL20">
          <div class="pam-operator">
          <span>最后修改人：</span>
          <span>{{edit.formData.operater}}</span>
          <span class="marginL10">最后修改时间：</span>
          <span>{{edit.formData.updated_at|timeFilter}}</span>
        </div>
        <div class="pam-flex1"></div>
          <Checkbox v-model="edit.formData.status">启用</Checkbox>
          <Button @click="editFormSave"
                    type="primary"
                    class="marginR20">保 存</Button>
          <Button @click="editFormCancel"
                    type="ghost">取 消</Button>
        </div>
      </div>
    </Modal>
    <!-- 删除 -->
    <affirm-del-modal :controlModal="deleteModal"
                      :delCounts="selectionData.length"
                      @delCancel="deleteModal=false"
                      @affirmDel="deleteAffirm">
    </affirm-del-modal>
    <!-- 删除多级 -->
    <!-- <affirm-del-modal :controlModal="deleteModalHasChild"
                      @delCancel="deleteModalHasChild=false"
                      @affirmDel="deleteAffirm"
                      :rests="false"
                      :content="haveChildText">
    </affirm-del-modal> -->
  </div>
</template>

<script>
import contentHeader from '@/components/contentHeader'
import sTabs from '@/components/tab/sTabs'
import { mapState, mapActions, mapGetters } from 'vuex'
// import _ from 'lodash'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
import filters from '@/utils/fifters'
export default {
  // TODO:
  name: 'personnelAdmin',
  components: {
    contentHeader,
    sTabs,
  },
  data() {
    let editBanIcon = '/static/icons/public/table-hover-edit.svg'
    let editIcon = '/static/icons/public/table-edit.svg' // 编辑
    let that = this

    return {
      // page
      treeSelectSingle: {},
      // header
      exportParams: {
        reqParams: {},
        columns: [
          {
            title: '人员编号',
            key: 'code',
          },
          {
            title: '姓名',
            key: 'name',
          },
          {
            title: '性别',
            key: 'sex',
            render(data) {
              return Number(data) === 1 ? '男' : Number(data) === 2 ? '女' : ''
            },
          },
          {
            title: '民族',
            key: 'nation',
            render(data) {
              return data === 1 ? '汉族' : data === 2 ? '少数名族' : '其他'
            },
          },
          {
            title: '所在科室',
            key: 'depts',
            ellipsis: true,
            render(p) {
              let text = []
              if (!p && !p.length) {
                return ''
              }
              p.map(item => {
                if (item.dept) {
                  text.push(item.dept.name)
                }
              })
              return text.join(',')
            },
          },
          {
            title: '部门',
            key: 'divisions ',
            render(p) {
              if (p && p.length) {
                return p.map(item => {
                  if (item.division) {
                    item.division.name
                  }
                }).join(',')
              }
            },
          },
          {
            title: '职称',
            key: 'pro_title',
            render(p) {
              let text = ''
              switch (p) {
              case 1:
                text = '医师'
                break
              case 2:
                text = '主治医师'
                break
              case 3:
                text = '副主任医师'
                break
              case 4:
                text = '主任医师'
                break
              case 5:
                text = '护士'
                break
              case 6:
                text = '护师'
                break
              case 7:
                text = '主管护师'
                break
              case 8:
                text = '副主任护师'
                break
              case 9:
                text = '主任护师'
                break
              }
              return text
            },
          },
          {
            title: '岗位',
            key: 'jobs',
            render(p) {
              let text = []
              p.map(item => {
                if (item.job) {
                  text.push(item.job.name)
                }
              })
              return text.join(',')
            },
          },
          {
            title: '行政职务',
            key: 'administrative_duties',
            render(p) {
              if (p) {
                return p.name
              }
            },
          },
          {
            title: '党内职务',
            key: 'inner_party_duties',
            render(p) {
              if (p) {
                return p.name
              }
            },
          },
          {
            title: '身份证号',
            key: 'id_card',
          },
          {
            title: '手机号',
            key: 'mobile',
          },
          {
            title: '备注',
            key: 'remark',
          },
          {
            title: '启用',
            key: 'status',
            ellipsis: 'true',
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
            render: (data) => {
              if (data) {
                return filters.timeFilter(
                  data,
                  'YYYY-MM-DD HH:mm'
                )
              } else {
                return ''
              }
            },
          },
        ],
      },
      showTitle: true,
      // table
      isSelectMode: false,
      tableHeight: 568,
      selectionData: [],
      tableParams: {},
      tableColumns: [
        {
          title: '人员编号',
          key: 'code',
          ellipsis: true,
          // minWidth: 68,
        },
        {
          title: '姓名',
          key: 'name',
          ellipsis: true,
          // minWidth: 100,
        },
        {
          title: '性别',
          key: 'sex',
          ellipsis: true,
          // minWidth: 44,
          render(h, p) {
            return h('span', Number(p.row.sex) === 1 ? '男' : Number(p.row.sex) === 2 ? '女' : '')
          },
          titleRender(data) {
            return Number(data.sex) === 1 ? '男' : Number(data.sex) === 2 ? '女' : ''
          },
        },
        {
          title: '民族',
          key: 'nation',
          ellipsis: true,
          // minWidth: 68,
          render(h, p) {
            return h('span', p.row.nation === 1 ? '汉族' : p.row.nation === 2 ? '少数名族' : '其他')
          },
          titleRender(data) {
            return data.nation === 1 ? '汉族' : data.nation === 2 ? '少数名族' : '其他'
          },
        },
        {
          title: '所在科室',
          key: 'depts',
          ellipsis: true,
          // minWidth: 116,
          render(h, p) {
            let text = []
            p.row.depts.map(item => {
              if (item.dept) {
                text.push(item.dept.name)
              }
            })
            return h('span', text.join(','))
          },
          titleRender(p) {
            let text = []
            if (!p.depts && !p.depts.length) {
              return ''
            }
            p.depts.map(item => {
              if (item.dept) {
                text.push(item.dept.name)
              }
            })
            return text.join(',')
          },
        },
        {
          title: '部门',
          key: 'divisions ',
          ellipsis: true,
          // minWidth: 116,
          render(h, p) {
            console.log(p.row.divisions)
            if (p.row.divisions && p.row.divisions.length) {
              return h('span', p.row.divisions.map(item => {
                if (item.division) {
                  return item.division.name
                }
              }).join(','))
            }
          },
          titleRender(p) {
            if (p.divisions && p.divisions.length) {
              return p.divisions.map(item => {
                if (item.division) {
                  return item.division.name
                }
              }).join(',')
            }
          },
        },
        {
          title: '职称',
          key: 'pro_title',
          ellipsis: true,
          // minWidth: 116,
          render(h, p) {
            let text = ''
            switch (p.row.pro_title) {
            case 1:
              text = '医师'
              break
            case 2:
              text = '主治医师'
              break
            case 3:
              text = '副主任医师'
              break
            case 4:
              text = '主任医师'
              break
            case 5:
              text = '护士'
              break
            case 6:
              text = '护师'
              break
            case 7:
              text = '主管护师'
              break
            case 8:
              text = '副主任护师'
              break
            case 9:
              text = '主任护师'
              break
            }

            return h('span', text)
          },
          titleRender(p) {
            let text = ''
            switch (p.pro_title) {
            case 1:
              text = '医师'
              break
            case 2:
              text = '主治医师'
              break
            case 3:
              text = '副主任医师'
              break
            case 4:
              text = '主任医师'
              break
            case 5:
              text = '护士'
              break
            case 6:
              text = '护师'
              break
            case 7:
              text = '主管护师'
              break
            case 8:
              text = '副主任护师'
              break
            case 9:
              text = '主任护师'
              break
            }

            return text
            // return h('span', p.row.staff.pro_title)
          },
        },
        {
          title: '岗位',
          key: 'jobs',
          ellipsis: true,
          // minWidth: 116,
          render(h, p) {
            let text = []
            p.row.jobs.map(item => {
              if (item.job) {
                text.push(item.job.name)
              }
            })
            return h('span', text.join(','))
          },
          titleRender(p) {
            let text = []
            p.jobs.map(item => {
              if (item.job) {
                text.push(item.job.name)
              }
            })
            return text.join(',')
          },
        },
        {
          title: '行政职务',
          key: 'administrative_duties',
          ellipsis: true,
          // minWidth: 116,
          render(h, p) {
            if (p.row.administrative_duties) {
              return h('span', p.row.administrative_duties.name)
            }
          },
          titleRender(p) {
            if (p.administrative_duties) {
              return p.administrative_duties.name
            }
          },
        },
        {
          title: '党内职务',
          key: 'inner_party_duties',
          ellipsis: true,
          // minWidth: 116,
          render(h, p) {
            if (p.row.inner_party_duties) {
              return h('span', p.row.inner_party_duties.name)
            }
          },
          titleRender(p) {
            if (p.inner_party_duties) {
              return p.inner_party_duties.name
            }
          },
        },
        {
          title: '身份证号',
          key: 'id_card',
          ellipsis: true,
          // minWidth: 150,
        },
        {
          title: '手机号',
          key: 'mobile',
          ellipsis: true,
          // minWidth: 100,
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
          },
        },
        {
          title: '启用',
          width: 60,
          align: 'center',
          key: 'status',
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
          ellipsis: 'true',
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('status-in-table')
            }
          },
          titleRender: (data) => {
            return ''
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
          align: 'center',
          ellipsis: 'true',
          // render: (h, p) => {
          //   return h('span', {}, [p.row.operater.realname])
          // },
        },
        {
          title: '最后修改时间',
          filterType: 'date',
          key: 'updated_at',
          ellipsis: 'true',
          width: 130,
          render: (h, p) => {
            if (p.row.updated_at) {
              return h('span', {}, [
                filters.timeFilter(p.row.updated_at, 'YYYY-MM-DD HH:mm'),
              ])
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
        {
          title: '操作',
          fixedRightWidth: 70,
          width: 70,
          fixed: 'right',
          render(h, p) {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '12px',
                  height: '13px',
                  'margin-right': '10px',
                  'margin-left': '5px',
                  background: `url(${that.isSelectMode === true ? editIcon : editBanIcon}) no-repeat`,
                  // background: 'url(' + editIcon + ') no-repeat',
                },
                on: {
                  click: function(event) {
                    event.stopPropagation()
                    if (that.isSelectMode) {
                      return
                    }
                    console.log('编辑', that.isSelectMode)
                    that.tableEdit(p.row, p.index, p.column)
                    // this.$emit('edit', p.row, p.index, p.column)
                  },
                },
              }),
            ])
          },
        },
      ],
      // modal
      addModalPage: 1,
      haveChildText: '删除问题',
      // form
      sortValue: 0,
      formDepartment: [{id: 0}],
      formJobs: [{id: 0}],
      selectDepts: '',
      // add
      add: {
        showModal: false,
        formData: {
          status: true,
          code: '',
          depts: [],
          divisions: [],
          jobs: [],
          pro_title: '',
          id_card: '',
          inner_party_duties_id: '',
          mobile: '',
          name: '',
          nation: 1,
          sex: 1,
          sort: 0,
        },
      },
      // edit
      edit: {
        showModal: false,
        formData: {
          status: true,
          code: '',
          depts: [],
          divisions: [],
          jobs: [],
          pro_title: '',
          id_card: '',
          inner_party_duties_id: '',
          mobile: '',
          name: '',
          nation: 1,
          sex: 1,
          sort: 0,
        },
      },
      formRules: {
        name: [
          // TODO:
          {
            // validator: nameValidator,
            required: true,
            message: '姓名不能为空',
            trigger: 'blur',
          },
        ],
        sex: [
          {
            required: true,
            type: 'number',
            message: ' ',
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '人员编号不能为空',
            trigger: 'blur',
          },
        ],
        nation: [
          {
            required: true,
            type: 'number',
            message: '民族不能为空',
            trigger: 'blur',
          },
        ],
        id_card: [
          {
            required: true,
            message: '身份证号不能为空',
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur',
          },
        ],
      },
      // delete
      deleteModal: false,
      // deleteModalHasChild: false,
    }
  },
  watch: {
    windowHeight(val) {
      this.$nextTick(function() {
        this.setTableHeight()
      })
    },
    selectDepts(data) {
      if (data === 'all') {
        this.getDept({per_page: 100000})
      } else {
        this.getDept({per_page: 100000, filters: `dept_type_id:${data}`})
      }
    },
  },
  computed: {
    ...mapState(['windowHeight']),
    // TODO:
    ...mapState('personnelAdminModule', [
      'jobsAll',
      'personnel',
      'divisionsAll',
      'adminstartiveAll',
      'innerPartyDytiesAll',
      'deptTypeAll',
      'deptAll',
      // 'personnelAll',
    ]),
    ...mapGetters('personnelAdminModule', ['doneDeptTypeAll']),
    // table
    tableData() {
      return this.personnel.items
    },
    tableInfo() {
      return this.personnel.meta
    },
  },
  async created() {
    // await Promise.all([
    // TODO:
    // this.getPersonnel({ per_page: 100000 }),
    // this.getPersonnelTree({ per_page: 100000, filters: `parent_id:0;isTree:1` }),
    // this.getFloorAll({ filters: `isTree:1` }),
    // ])
    // this.getEconIndustryAll({filters: `isTree:1`}),
  },
  methods: {
    // TODO:
    ...mapActions('personnelAdminModule', [
      'getPersonnel',
      'getAdministrative',
      'getDivisions',
      'getJobs',
      'getInnerPartyDuties',
      'getDeptType',
      'getDept',
      'addPersonnel',
      'editPersonnel',
      'deletePersonnel',
    ]),
    // page
    setTableHeight() {
      this.tableHeight = this.$refs.body.offsetHeight
    },
    pageInit() {
      // 初始化sort
      // TODO:
      this.sortValue = this.personnel.meta.total + 1
      this.addModalPage = 1
    },
    // header
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('职员管理', {
        // TODO:
        api: api.personnelAdmin.getPersonnel,
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
    headerSearchEnter(val) {
      this.tableParams.search = val
      this.$refs.table.request()
      // FIXME: 在搜索状态下新增的内容后刷新表格，带key
    },
    headerSearchCancel() {
      this.tableParams.search = ''
      this.$refs.table.request()
    },
    async headerAdd() {
      this.pageInit()
      this.cleanFormData()
      this.add.showModal = true
      await this.getFormSelectData()
    },
    headerDelete() {
      // 删除
      this.deleteModal = true
    },
    toSelectMode() {
      this.selectionData = []
      this.isSelectMode = true
    },
    exitSelectMode() {
      // TODO: 取消
      this.selectionData = []
      this.isSelectMode = false
    },
    // table
    tableEdit(row, i, col) {
      // console.log('shoduao', row)
      this.resetEditForm(row)
      this.getFormSelectData()
      this.edit.showModal = true
    },
    tableRowEdit(row, e) {
      this.resetEditForm(row)
      this.getFormSelectData()
      this.edit.showModal = true
    },
    tableDelete(row, i, col) {
      this.selectionData = [row]
      this.deleteModal = true
    },
    tableRowDelete(row, e) {
      this.selectionData = [row]
      this.deleteModal = true
    },
    tableSelectRow(arr, row, i) {
      this.selectionData = arr
    },
    tableCancelSelectRow(arr, row, i) {
      this.selectionData = arr
    },
    tableSelectAll(arr) {
      this.selectionData = arr
    },
    tableAllSelection(arr) {
      //
    },
    tableSelectionChange(arr) {
      //
    },
    tableClickRow(arr, row, i, col) {
      //
    },
    // form
    isEmpty(data) {
      if (data === '' || data === undefined || data === 0) {
        return true
      } else {
        return false
      }
    },
    async getFormSelectData() {
      await Promise.all([
        this.getAdministrative({ per_page: 100000, filters: 'status:1' }),
        this.getDivisions({ per_page: 100000, filters: 'status:1' }),
        this.getJobs({ per_page: 100000, filters: 'status:1' }),
        this.getInnerPartyDuties({ per_page: 100000, filters: 'status:1' }),
        this.getDeptType({ per_page: 100000, filters: 'status:1' }),
        this.getDept({ per_page: 100000, filters: 'status:1' }),
      ])

      // console.log('asdf', this.doneDeptTypeAll)
    },
    notLast(i) {
      if (this.formDepartment.length === 1) {
        return true
      } else if (i + 1 !== this.formDepartment.length) {
        return false
      } else {
        return true
      }
    },
    notLastJobs(i) {
      // console.log(i, this.formJobs.length)
      if (this.formJobs.length === 1) {
        return true
      } else if (i + 1 !== this.formJobs.length) {
        return false
      } else {
        return true
      }
    },
    sendData(data, isEdit) {
      // console.log('send前', data)
      let send = {
        code: data.code,
        name: data.name,
        sex: data.sex,
        nation: data.nation,
        id_card: data.id_card,
        mobile: data.mobile,
        pro_title: data.pro_title,
        status: Number(data.status),
        administrative_duties_id: data.administrative_duties_id,
        inner_party_duties_id: data.inner_party_duties_id,
        remark: data.remark,
      }
        // depts: data.depts,

      send.jobs = this.formJobs.filter(item => {
        return !!item && item.id
      }).map(item => {
        if (item.id) {
          return item.id
        }
      }

      )
      send.depts = data.depts.filter(item => {
        return !!item
      })
      send.divisions = this.formDepartment.filter(item => {
        return !!item && item.id
      }).map(item => {
        // console.log('div', item)
        if (item.id) {
          return item.id
        }
      })

      if (isEdit) {
        send.sort = this.edit.formData.sort
        send.id = this.edit.formData.id
      } else {
        send.sort = this.sortValue
      }
      // console.log('send', send)

      return send
    },
    resetEditForm(obj) {
      console.log('rest', obj)
      this.edit.formData.id = obj.id
      this.edit.formData.name = obj.name
      this.edit.formData.remark = obj.remark
      this.edit.formData.status = !!obj.status
      this.edit.formData.operater = obj.operater
      this.edit.formData.updated_at = obj.updated_at
      this.edit.formData.sort = obj.sort
      this.edit.formData.nation = obj.nation
      this.edit.formData.id_card = obj.id_card
      this.edit.formData.mobile = obj.mobile
      this.edit.formData.code = obj.code
      this.edit.formData.pro_title = obj.pro_title
      this.edit.formData.administrative_duties_id = obj.administrative_duties_id
      this.edit.formData.inner_party_duties_id = obj.inner_party_duties_id

      if (obj.depts) {
        this.edit.formData.depts = obj.depts.map(item => {
          if (item.dept && item.dept.id) {
            return item.dept.id
          }
        })
      }

      if (obj.jobs && obj.jobs.length) {
        this.formJobs = obj.jobs.map(item => {
          if (item.job && item.job.id) {
            return {
              id: item.job.id,
            }
          } else {
            return {
              id: 0,
            }
          }
        }
       )
      } else {
        this.formJobs = [{id: 0}]
      }

      if (obj.divisions && obj.divisions.length) {
        this.formDepartment = obj.divisions.map(item => {
          if (item.division_id) {
            return {
              id: item.division_id,
            }
          } else {
            return {
              id: 0,
            }
          }
          // return {
          //   id: item.division.id,
          // }
        }
        )
      } else {
        this.formDepartment = [{id: 0}]
      }
      this.selectDepts = 'all'
      this.addModalPage = 1
      // console.log('edit', obj)
      // console.log('edit', this.edit.formData)
      // console.log('edit', this.formJobs)
    },
    addFormDeap() {
      // console.log(this.formDepartment)
      this.formDepartment.push({id: 0})
    },
    delFormDeap(i) {
      this.formDepartment.splice(i, 1)
    },
    addFormJobs() {
      // console.log(this.formDepartment)
      this.formJobs.push({id: 0})
    },
    delFormJobs(i) {
      this.formJobs.splice(i, 1)
    },
    cleanFormData() {
      this.add.formData = {
        code: '',
        depts: [],
        divisions: [],
        jobs: [],
        id_card: '',
        inner_party_duties_id: '',
        mobile: '',
        name: '',
        nation: '',
        sex: 1,
        sort: 0,
        pro_title: '',
        status: 1,
      }
      this.edit.formData = {
        code: '',
        depts: [],
        divisions: [],
        jobs: [],
        id_card: '',
        inner_party_duties_id: '',
        mobile: '',
        name: '',
        nation: '',
        sex: 1,
        sort: 0,
        pro_title: '',
        status: 1,
      }

      this.formDepartment = [{id: 0}]
      this.formJobs = [{id: 0}]
    },
    addSortCtrl(val) {
      this.sortValue = val
    },
    editSortCtrl(val) {
      this.edit.formData.sort = val
    },
    addCascaderChange(val, selection) {
      this.cascaderData = selection
      // TODO:
      // this.setParentId(selection[selection.length - 1])
      // console.log('返回', val, selection)
    },
    addCascaderEnd(isShow) {
      if (!isShow) {
        // TODO:
        // this.add.formData.pCode = this.cascaderData[this.cascaderData.length - 1].code
      }
    },
    addModalTabChange(i) {
      this.addModalPage = i + 1
    },
    async addFormSave() {
      let val = !await this.$refs.addForm.validate()
      if (val) {
        return '验证失败' + val
      }
      // console.log(this.add.formData)
      // console.log(this.formJobs)
      // console.log(this.formDepartment)
      // console.log(this.adminstartiveAll)
      try {
        await this.addPersonnel(this.sendData(this.add.formData))
        this.add.showModal = false
        this.$refs.table.request()
        this.sortValue++
      } catch (err) {
        console.error(err)
      }
    },
    addFormCancel() {
      this.add.showModal = false
    },
    // edit
    async editFormSave() {
      let val = !await this.$refs.editForm.validate()
      if (val) {
        return '验证失败' + val
      }
      try {
        await this.editPersonnel(this.sendData(this.edit.formData, true))
        this.edit.showModal = false
        this.$refs.table.request()
      } catch (err) {
        console.error(err)
      }
      // try {
      //   // console.log('id', this.parentId)
      //   await this.editEconType({
      //     id: this.edit.formData.id,
      //     parent_id: this.parentId,
      //     name: this.edit.formData.name,
      //     code: this.edit.formData.code,
      //     remark: this.edit.formData.remark,
      //     status: Number(this.edit.formData.status),
      //     sort: this.edit.formData.sort,
      //   })
      //   this.getEconTypeAll()
      // this.edit.showModal = false
      // } catch (err) {
      //   console.error(err)
      // }
    },
    editFormCancel() {
      this.edit.showModal = false
    },
    // delete
    async deleteAffirm() {
      try {
        let send = []
        this.selectionData.map(function(value, i, arr) {
          send.push(value.id)
        })
        await this.deletePersonnel(send)
        this.deleteModal = false
        // TODO: 更新table和tree
        this.$refs.table.request()
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.personnel-admin {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;

  .container {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
    & > div {
      width: 100%;
      height: 100%;
    }
    .tree-wrapper {
      flex: 1;
      height: 100%;
      overflow: hidden;

      .input-wrapper {
        width: 100%;
        padding: 10px 10px 0 10px;
      }
    }
    .table-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .header {
        .header-content-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          height: 100%;
        }
      }
      .body {
        display: flex;
        width: 100%;
        flex: 1;
        & > div {
          width: 100%;
        }
      }
    }
  }
}
</style>

<style lang="less">
.personnel-admin {
  .pam-modal-content {
    // padding-top: 20px;
    .pam-modal-content-wrapper {
      border-top: 1px solid #d8d8d8;
      padding-top: 20px;
      height: 251px;
      overflow-y: scroll;
    }
    .have-bg {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items:flex-start!important;
      border: 1px solid #cccccc;
      background: #fafafa;
      border-radius: 4px;
      padding: 25px 0;
      height:180px;
      overflow-y: scroll;
    }
    .check-wrapper {
      width: 50%;
      padding: 5px 0 5px 30px;
      color:#737373;
    }
    .pam-form-col {
      align-self:flex-start;
      width: 50%;
      >.pam-col-l{
        margin-top:20px;
      }
      >.pam-col-l:nth-child(1){
        margin-top:0;
      }
      >.pam-col-r{
        margin-top:20px;
            justify-content: flex-end;
      }
      >.pam-col-r:nth-child(1){
        margin-top:0;
      }
    }
    .pam-add-content {
      display: flex;
      height: 30px;
      align-items: center;
    }
    .pam-col-l {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .pam-col-r {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .add-item-wrapper{
      display:flex;
      align-items:center;
    }
    .add-btn {
      width:20px;
      height:20px;
      cursor: pointer;
    }
    .pam-form-row {
      display: flex;
      align-items: center;
      & > span {
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
      }
    }
    .pam-form-row-height-label {
      padding-top: 7px;
      line-height: 20px;
    }
    .pam-form-row-height {
      display: flex;
      height: 60px;
    }
    .pam-flex1 {
      flex: 1;
    }
    .pam-item-label {
      width: 48px;
      overflow: hidden;
      text-align: justify;
      text-align-last: justify;
      color: #737373;
    }
    .pam-item-large {
      width: 233px;
      color: #4a4a4a;
    }
    .pam-item-small {
      width: 223px;
    }
    .pam-operator {
      line-height: 12px;
      color: #737373;
      span{
        color:#737373
      }
    }
  }
  .pam-modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // height: 50px;
    padding-right: 20px;
    padding-bottom: 20px;
    & > label {
      margin-right: 20px;
    }
    .pam-flex1 {
      flex: 1;
    }
    .pam-operator {
    span{
        color:#737373
      }
    }
  }
}
</style>

