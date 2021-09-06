
<template>
  <div class="healthCard-all">
    <div class="healthCard-all-content">
      <!-- 页面头部 -->
      <titlet-hasSlot>
        <span slot="titletHasSlotLeftTitle">职业健康监护技术规范列表</span>
        <div slot="titletHasSlotRightContent"
             class="content">
          <span class="title">启用状态</span>
          <!-- <Select v-model="statusValue" @on-change="statusValueChange(statusValue)" class="select"  style="width:78px" placeholder="全部" :filterable='true' > -->
          <Select v-model="statusValue"
                  class="select"
                  style="width:78px"
                  placeholder="全部"
                  :filterable='true'
                  :placement="'top'">
            <Option value="">全部</Option>
            <Option :value="1">启用</Option>
            <Option :value="0">未启用</Option>
          </Select>
          <!-- @on-enter="enterSearch" @on-Icon="enterSearch" @on-cancel="enterSearch" -->
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
                      @click="selectButton">选 择</Button>

            <Button type="ghost"
                      class="fl marginR10"
                      @click="testButton">新增Test</Button>
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
                 :selectMode="isSelectMode"
                 :params="params"
                 :columns="columnsTable"
                 :data="occupHealthTypesList"
                 :pageInfo="pageInfo"
                 :height="tableHeight"
                 :requestDataApi="getOccupHealthTypesList"
                 :ifEdit="true"
                 @on-selection-change="checkboxSelect"
                 @delete="delOneRow"
                 @delete-row='delOneRow'
                 @edit="editRow"
                 @edit-row='editRow'
                 @all-selection="allSelection">
        </q-table>
      </div>
    </div>
    <!-- 弹窗组件Test -->
    <modal-component v-if="modalDisplay"
                     :modalDisplay="modalDisplay"
                     :headerText="'新增职业病危害因素类别'"
                     @closeModal = "cancelNewItemTest"
                     modalType = "addNewItem"
                     :occupHazardCategoryFactorTypesList="OccupHazardCategoryFactorTypesList.items"
                     :occpDiseasesTypesListClone="OccpDiseasesTypesListClone">
      <!-- <div slot="headerCom">
        <alert-header headerText="新增职业病危害因素类别"
                      :headerVal="totalsort"
                      @alert-retrun-num="addSortFun"></alert-header>
      </div> -->
    </modal-component>
    <!-- 新增弹窗 -->
    <div class="add-modal"
         v-if="addModalDiv">
      <Modal ref="modalContent"
             v-model="addModalDiv"
             width="708"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <alert-header headerText="新增职业病危害因素类别"
                        :headerVal="totalsort"
                        @alert-retrun-num="addSortFun"></alert-header>
        </div>
        <div class="content-footer">
          <Form ref="addForm"
                :model="addModal.data"
                :rules="addModal.rule">
            <div class="content"
                 :style="{maxHeight:addModalThreeHeighttest}">
              <div class="first">
                <div class="item1">
                  <span class="title1">接害人员类别</span>
                  <div class="text1">
                    <FormItem prop="harm_personnel_type_id">
                      <Select v-model="addModal.data.harm_personnel_type_id"
                              :filterable='true'>
                        <Option v-for="item in selectData"
                                :value="item.value"
                                :key="item.value">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!addModal.data.harm_personnel_type_id"
                          class="star-mark">*</span>
                  </div>
                  <span class="title2">职业健康检查种类</span>
                  <div class="text2">
                    <FormItem prop="occup_health_examination_type_id">
                      <Select v-model="addModal.data.occup_health_examination_type_id"
                              :filterable='true'>
                        <Option v-for="item in occupHealthExamTypesList.items"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!addModal.data.occup_health_examination_type_id"
                          class="star-mark">*</span>
                  </div>
                </div>
                <div class="item1">
                  <span class="title1">职业病危害因素类别</span>
                  <div class="text1">
                    <!-- addNewItemData.name -->
                    <FormItem prop="occup_harm_type_id">
                      <Select v-model="addModal.data.occup_harm_type_id"
                              :filterable='true'
                              @on-change="hazardCategoryChange">
                        <Option v-for="item in OccupHazardCategoryTypesList.items"
                                :value="item.id"
                                :key="item.id"
                                :disabled="false">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!addModal.data.occup_harm_type_id"
                          class="star-mark">*</span>
                  </div>
                  <span class="title2">职业危害因素名称</span>
                  <div class="text2">
                    <!-- addNewItemData.name -->
                    <FormItem prop="occup_harm_factor_id">
                      <Select v-model="addModal.data.occup_harm_factor_id"
                              :filterable='true'
                              :disabled="!addModal.data.occup_harm_type_id">
                        <Option v-for="item in OccupHazardCategoryFactorTypesList.items"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!addModal.data.occup_harm_factor_id"
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
              <ul class="second">
                <li v-for=" (item,index) in secoundData"
                    @click="changeItem(item)"
                    :class="{ 'active': index === showSecoundItem}">{{item.name}}</li>
              </ul>
              <div class="third"
                   ref="addModalThree">
                <div class="item1"
                     v-if="0 === showSecoundItem"
                     ref="item1">
                  <p class="content-title">目标职业病</p>
                  <ul class="content">
                    <li v-for="(item,index) in addNewOccpArry">
                      <p class="first-title">职业病名称</p>
                      <Select class="first-input"
                              v-model="OccpDiseasesTypesId[index].occup_disease_id"
                              :placement="'top'"
                              @on-change="changeOccpDiseases(index)">
                        <Option v-for="(items,indexs) in OccpDiseasesTypesListClone"
                                :value="items.id"
                                :key="items.id"
                                v-show="items.displayDisabled">{{items.name}}</Option>
                      </Select>
                      <p class="second-title">检查依据</p>
                      <Select class="second-input"
                              v-model="OccpDiseasesTypesId[index].exam_basi_id"
                              :placement="'top'"
                              :disabled="item.inspectionShow">
                        <Option v-for="item in OccpInspectionTypesList.items"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                      <span class="icon-title"
                            @click="addDelNewItemTSFirst(index)">
                        <icon name='addNewItemS'
                              v-show="item.addNewItemSShwow"></icon>
                        <icon name='addNewItemT'
                              v-show="item.addNewItemTShwow"
                              style="cursor:pointer"></icon>
                        <icon name='deletItemT'
                              v-show="item.deletItemTShwow"
                              style="cursor:pointer"></icon>
                      </span>
                    </li>
                  </ul>
                  <p class="content-title">目标职业禁忌证</p>
                  <ul class="content">
                    <li v-for="(item,index) in addNewOccpArrySecond">
                      <p class="first-title">职业禁忌证名称</p>
                      <Select class="first-input"
                              v-model="OccpContTypesIdSecond[index].occup_taboo_id"
                              :placement="'top'"
                              @on-change="changeOccpContraindication(index)">
                        <Option v-for="items in OccpContraindicationTypesListClone"
                                :value="items.id"
                                :key="items.id"
                                v-show="items.displayDisabled">{{items.name}}</Option>
                      </Select>
                      <p class="second-title">检查依据</p>
                      <Select class="second-input"
                              v-model="OccpContTypesIdSecond[index].exam_basi_id"
                              :placement="'top'"
                              :disabled="item.inspectionShow">
                        <Option v-for="item in OccpInspectionTypesList.items"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                      <span class="icon-title"
                            @click="addDelNewItemCont(index)">
                        <icon name='addNewItemS'
                              v-show="item.addNewItemSShwow"></icon>
                        <icon name='addNewItemT'
                              v-show="item.addNewItemTShwow"
                              style="cursor:pointer"></icon>
                        <icon name='deletItemT'
                              v-show="item.deletItemTShwow"
                              style="cursor:pointer"></icon>
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="item2"
                     v-else-if="1 === showSecoundItem"
                     ref="item2">
                  <p class="content-title">检查内容</p>
                  <Input class="input-text"
                         type="textarea"
                         v-model="examination_content"></Input>
                </div>
                <div class="item3"
                     v-else-if="2 === showSecoundItem"
                     ref="item3">
                  <div class="content">
                    <custom-transfer listWidth="230px"
                                     :columns='customInit.columns'
                                     :sourceData='customInit.sourceData'
                                     :moveAll="true"
                                     v-model="inquiry_item">
                    </custom-transfer>
                  </div>
                </div>
                <div class="item4"
                     v-else-if="3 === showSecoundItem"
                     ref="item4">
                  <custom-transfer listWidth="290px"
                                   listHeight="310px"
                                   checkTitle="是否必检"
                                   :moveAll="true"
                                   :canChecked="true"
                                   :select="true"
                                   :selectOptions="OccupGroupItemsTypesList"
                                   :columns='customNewAddInit.columns'
                                   :sourceData='customNewAddInit.sourceData'
                                   @getSelectValue="getItemType"
                                   v-model="group_item">
                  </custom-transfer>
                </div>
                <div class="item5"
                     v-else-if="4 === showSecoundItem"
                     ref="item5">
                  <ul class="content">
                    <li>
                      <p>健康检查周期</p>
                      <Input type="textarea"
                             v-model="addModal.data.pe_cycle"></Input>
                    </li>
                    <li>
                      <p>检查时间</p>
                      <Input type="textarea"
                             v-model="addModal.data.examination_time"></Input>
                    </li>
                    <li>
                      <p>检查对象</p>
                      <Input type="textarea"
                             v-model="addModal.data.examination_object"></Input>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="footer">
              <FormItem>
                <Checkbox class="checkBox"
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
             width="708"
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
            <div class="content"
                 :style="{maxHeight:addModalThreeHeighttest}">
              <div class="first">
                <div class="item1">
                  <span class="title1">接害人员类别</span>
                  <div class="text1">
                    <FormItem prop="harm_personnel_type_id">
                      <Select v-model="editModal.data.harm_personnel_type_id"
                              :filterable='true'>
                        <Option v-for="item in selectData"
                                :value="item.value"
                                :key="item.value">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!editModal.data.harm_personnel_type_id"
                          class="star-mark">*</span>
                  </div>
                  <span class="title2">职业健康检查种类</span>
                  <div class="text2">
                    <!-- addNewItemData.name -->
                    <FormItem prop="occup_health_examination_type_id">
                      <!-- <Input type="text" v-model.trim="addModal.data.name"  ></Input> -->
                      <Select v-model="editModal.data.occup_health_examination_type_id"
                              :filterable='true'
                              @on-change="changeOccpDiseasesEdit(index)">
                        <Option v-for="item in occupHealthExamTypesList.items"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!editModal.data.occup_health_examination_type_id"
                          class="star-mark">*</span>
                  </div>
                </div>
                <div class="item1">
                  <span class="title1">职业病危害因素类别</span>
                  <div class="text1">
                    <!-- addNewItemData.name -->
                    <FormItem prop="occup_harm_type_id">
                      <!-- <Input type="text" v-model.trim="addModal.data.name"  ></Input> -->
                      <Select v-model="editModal.data.occup_harm_type_id"
                              :filterable='true'
                              @on-change="hazardCategoryChangeEdit">
                        <Option v-for="item in OccupHazardCategoryTypesList.items"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!editModal.data.occup_harm_type_id"
                          class="star-mark">*</span>
                  </div>
                  <span class="title2">职业危害因素名称</span>
                  <div class="text2">
                    <!-- addNewItemData.name -->
                    <FormItem prop="occup_harm_factor_id">
                      <Select v-model="editModal.data.occup_harm_factor_id"
                              :filterable='true'
                              :disabled="!editModal.data.occup_harm_type_id">
                        <Option v-for="item in OccupHazardCategoryFactorTypesList.items"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!editModal.data.occup_harm_factor_id"
                          class="star-mark">*</span>
                  </div>
                </div>
                <div class="item2">
                  <span class="title">备注</span>
                  <Input class="input"
                         type="textarea"
                         v-model.trim="editModal.data.remark"></Input>
                </div>
              </div>
              <ul class="second">
                <li v-for=" (item,index) in secoundData"
                    @click="changeItem(item)"
                    :class="{ 'active': index === showSecoundItem}">{{item.name}}</li>
              </ul>
              <div class="third"
                   ref="addModalThree">
                <div class="item1"
                     v-if="0 === showSecoundItem"
                     ref="item1">
                  <p class="content-title">目标职业病</p>
                  <ul class="content">
                    <li v-for="(item,index) in editNewOccpArry">
                      <p class="first-title">职业病名称</p>
                      <Select class="first-input"
                              v-model="editOccpDiseasesTypesId[index].occup_disease_id"
                              :placement="'top'"
                              @on-change="changeOccpDiseasesEditSecond(index)">
                        <!-- <Select class="first-input" v-model="editOccpDiseasesTypesId[index].occup_disease_id" @on-change="changeOccpDiseasesEdit(index)"> -->
                        <!-- <Option v-for="items in OccpDiseasesTypesList.items" :value="items.id" :key="items.id" :disabled="changeOccpDiseasesDisplayEdit(items.id)">{{items.name}}</Option> -->
                        <Option v-for="items in OccpDiseasesTypesListClone"
                                :value="items.id"
                                :key="items.id"
                                v-show="items.displayDisabled">{{items.name}}</Option>
                      </Select>
                      <p class="second-title">检查依据</p>
                      <Select class="second-input"
                              v-model="editOccpDiseasesTypesId[index].exam_basi_id"
                              :disabled="item.inspectionShow"
                              :placement="'top'">
                        <!--  <Select  class="second-input" v-model="editOccpDiseasesTypesId[index].exam_basi_id"> -->
                        <Option v-for="item in OccpInspectionTypesList.items"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                      <span class="icon-title"
                            @click="editDelNewItemTSFirst(index)">
                        <icon name='addNewItemS'
                              v-show="item.addNewItemSShwow"></icon>
                        <icon name='addNewItemT'
                              v-show="item.addNewItemTShwow"
                              style="cursor:pointer"></icon>
                        <icon name='deletItemT'
                              v-show="item.deletItemTShwow"
                              style="cursor:pointer"></icon>
                      </span>
                    </li>
                  </ul>
                  <p class="content-title">目标职业禁忌证</p>
                  <ul class="content">
                    <li v-for="(item,index) in editNewOccpArrySecond">
                      <p class="first-title">职业禁忌证名称</p>
                      <!-- @on-change="changeOccpContraindication(index)" -->
                      <Select v-model="OccpContTypesIdSecondEdit[index].occup_taboo_id"
                              :placement="'top'"
                              @on-change="editChangeOccpContraindication(index)"
                              class="first-input">
                        <Option v-for="items in OccpContraindicationTypesListClone"
                                :value="items.id"
                                :key="items.id"
                                v-show="items.displayDisabled">{{items.name}}</Option>
                      </Select>
                      <p class="second-title">检查依据</p>
                      <Select class="second-input"
                              v-model="OccpContTypesIdSecondEdit[index].exam_basi_id"
                              :placement="'top'"
                              :disabled="item.inspectionShow">
                        <Option v-for="item in OccpInspectionTypesList.items"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                      <span class="icon-title"
                            @click="editDelNewItemCont(index)">
                        <icon name='addNewItemS'
                              v-show="item.addNewItemSShwow"></icon>
                        <icon name='addNewItemT'
                              v-show="item.addNewItemTShwow"
                              style="cursor:pointer"></icon>
                        <icon name='deletItemT'
                              v-show="item.deletItemTShwow"
                              style="cursor:pointer"></icon>
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="item2"
                     v-else-if="1 === showSecoundItem"
                     ref="item2">
                  <p class="content-title">检查内容</p>
                  <Input class="input-text"
                         type="textarea"
                         v-model="editModal.data.examination_content"></Input>
                </div>
                <div class="item3"
                     v-else-if="2 === showSecoundItem"
                     ref="item3">
                  <div class="content">
                    <custom-transfer listWidth="230px"
                                     :columns='customInit.columns'
                                     :sourceData='customInit.sourceData'
                                     :moveAll="true"
                                     v-model="editModal.data.inquiry_item">
                    </custom-transfer>
                  </div>
                </div>
                <div class="item4"
                     v-else-if="3 === showSecoundItem"
                     ref="item4">
                  <custom-transfer listWidth="290px"
                                   listHeight="310px"
                                   checkTitle="是否必检"
                                   :moveAll="true"
                                   :canChecked="true"
                                   :select="true"
                                   :selectOptions="OccupGroupItemsTypesList"
                                   :columns='customNewAddInit.columns'
                                   :sourceData='customNewAddInit.sourceData'
                                   @getSelectValue="getItemTypeEdit"
                                   v-model="editModal.data.group_item">
                  </custom-transfer>
                </div>
                <div class="item5"
                     v-else-if="4 === showSecoundItem"
                     ref="item5">
                  <ul class="content">
                    <li>
                      <p>健康检查周期</p>
                      <Input type="textarea"
                             v-model="editModal.data.pe_cycle"></Input>
                    </li>
                    <li>
                      <p>检查时间</p>
                      <Input type="textarea"
                             v-model="editModal.data.examination_time"></Input>
                    </li>
                    <li>
                      <p>检查对象</p>
                      <Input type="textarea"
                             v-model="editModal.data.examination_object"></Input>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
            <div class="footer">
              <div class="last-amend">
                <span class="lastUser">最后修改人：{{realName}}</span>
                <span class="updatetime">最后修改时间：{{lastTime}}</span>
              </div>
              <FormItem>
                <Checkbox class="checkBox"
                          v-model="editModal.data.editStatusBool">启用</Checkbox>
                <Button type="primary"
                        class="marginR20"
                        @click="saveEdit('editForm')">保 存</Button>
                <Button type="ghost"
                        @click="cancelNewItem">取 消</Button>
              </FormItem>
            </div>
          </Form>
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
/* import { mapState, mapActions, mapGetters , mapMutations} from 'vuex' */
import modalComponent from './component/modalComponent'
import { mapState, mapActions, mapGetters } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'
import moment from 'moment'
/* import * as _ from 'lodash' */
export default {
  name: 'healthCare',
  components: {
    titletHasSlot,
    modalComponent,
  },
  data() {
    return {
      // 编辑test
      modalDisplay: false,
      selectData: [
        {
          value: 1,
          name: '接触有害化学因素工作人员',
        },
        {
          value: 2,
          name: '粉尘作业劳动者',
        },
        {
          value: 3,
          name: '接触有害物理因素作业人员',
        },
        {
          value: 4,
          name: '接触有害生物因素作业人员',
        },
        {
          value: 5,
          name: '特殊作业人员',
        },
      ],
      realName: '',
      /* edit_examination_content: '', */
      targetConDisplay: [],
      targetConDisplayEdit: [],
      OccpDiseasesTypesListClone: [],
      // 新增弹窗 目标疾病禁用
      targetDiseaseDisplay: [],
      targetDiseaseDisplayEdit: [],
      OccpContraindicationTypesListClone: [],
      /* targetDiseaseDisplayBool: [], */
      // 新增字段
      // 新增检查时间
      /* harm_personnel_type_id: null,
      occup_health_examination_type_id: null, */
      // 体检项目穿梭框
      customNewAddInit: {
        columns: [
          {
            title: '项目类别',
            key: 'item_type_name',
          },
          {
            title: '组合项目名称',
            key: 'name',
          },
        ],
        sourceData: [],
      },
      // third addNew
      group_item: [],
      inquiry_item: [],
      // 检查内容
      examination_content: '',
      addModalThreeOverflow: '',
      OccpDiseasesTypesId: [],
      editOccpDiseasesTypesId: [
        {
          occup_disease_id: '',
          exam_basi_id: '',
        },
      ],
      OccpContTypesIdSecond: [
        {
          occup_taboo_id: '',
          exam_basi_id: '',
        },
      ],
      OccpContTypesIdSecondEdit: [
        {
          occup_taboo_id: '',
          exam_basi_id: '',
        },
      ],
      addNewOccpArry: [
        {
          addNewItemSShwow: false,
          addNewItemTShwow: true,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
      addNewOccpArrySecond: [
        {
          addNewItemSShwow: false,
          addNewItemTShwow: true,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
      // 编辑
      editNewOccpArry: [
        {
          addNewItemSShwow: false,
          addNewItemTShwow: true,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
      editNewOccpArrySecond: [
        {
          addNewItemSShwow: false,
          addNewItemTShwow: true,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
      // 职业病名称
      // third
      /* addElement: {item: 'item1'}, */
      /* addModalThreeHeight: {}, */
      /* addModalThreeHeight:{

      } */
      // 穿梭框test数据
      customInit: {
        // 穿梭框数据
        columns: [
          {
            title: '问诊症状名称',
            key: 'name',
          },
        ],
        sourceData: [], // 穿梭框右侧数据
        targetData: [], // 穿梭框左侧数据
      },
      // secound数据
      secoundData: [
        {
          name: '目标疾病',
          number: 0,
          item: 'item1',
        },
        {
          name: '检查内容',
          number: 1,
          item: 'item2',
        },
        {
          name: '重点症状询问',
          number: 2,
          item: 'item3',
        },
        {
          name: '体检项目',
          number: 3,
          item: 'item4',
        },
        {
          name: '其他',
          number: 4,
          item: 'item5',
        },
      ],
      // show Secound
      showSecoundItem: 0,
      // 验证
      editModal: {
        data: {
          id: '',
          editStatusBool: false,
          remark: '',
          pe_cycle: null,
          examination_object: null,
          examination_time: null,
          harm_personnel_type_id: null,
          occup_health_examination_type_id: null,
          occup_harm_type_id: null,
          occup_harm_factor_id: null,
          examination_content: '',
        },
        rule: {
          harm_personnel_type_id: [
            {
              required: true,
              message: '接害人员类别必须选',
              type: 'number',
              trigger: 'change',
            },
          ],
          occup_health_examination_type_id: [
            {
              required: true,
              type: 'number',
              message: '职业健康检查种类必须填写',
              trigger: 'change',
            },
          ],
          occup_harm_type_id: [
            {
              required: true,
              type: 'number',
              message: '职业病危害因素类别必须填写',
              trigger: 'change',
            },
          ],
          occup_harm_factor_id: [
            {
              required: true,
              type: 'number',
              message: '职业危害因素名称必须填写',
              trigger: 'change',
            },
          ],
        },
      },
      addModal: {
        data: {
          occup_taboo: '',
          occup_disease: '',
          examination_content: '',
          inquiry_item: '',
          group_item: '',
          status: '',
          sort: '',
          remark: '',
          pe_cycle: '',
          examination_object: '',
          examination_time: '',
          harm_personnel_type_id: '',
          occup_health_examination_type_id: '',
          occup_harm_type_id: '',
          occup_harm_factor_id: '',
        },
        rule: {
          harm_personnel_type_id: [
            {
              required: true,
              message: '接害人员类别必须选',
              type: 'number',
              trigger: 'change',
            },
          ],
          occup_health_examination_type_id: [
            {
              required: true,
              type: 'number',
              message: '职业健康检查种类必须填写',
              trigger: 'change',
            },
          ],
          occup_harm_type_id: [
            {
              required: true,
              type: 'number',
              message: '职业病危害因素类别必须填写',
              trigger: 'change',
            },
          ],
          occup_harm_factor_id: [
            {
              required: true,
              type: 'number',
              message: '职业危害因素名称必须填写',
              trigger: 'change',
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
      /* editStatusBool: false, */
      /* editModal: {
        data: {
          name: '',
        },
        rule: {
          name: [{
            required: true,
            message: '名称必须填写',
            trigger: 'blur',
          },
          ],
        },
      }, */
      addNewItemData: {},
      showGroupOut: true,
      newStatus: 0,
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
      searchText: '',
      totalsort: null,
    }
  },
  methods: {
    /* ...mapMutations('categoryManagementOccupationalDiseaseInductiveFactorModule', ['requestPagingo']), */
    /* ...mapActions('categoryManagementOccupationalDiseaseInductiveFactorModule', ['getManagementList', 'adNewItemFun', 'amendItemFun', 'deletItemFun'] */
    ...mapActions('healthCareModule', [
      'getOccupHealthTypesList',
      'getOccupHealthExamTypesList',
      'getOccupHazardCategoryTypesList',
      'getOccupHazardCategoryFactorTypesList',
      'getOccupDiseaseList',
      'getOccupInspectionList',
      'getOccupContraindicationList',
      'getInquiriesList',
      'getGroupItemsList',
      'getGroupItemsDetailsList',
      'adNewItemFun',
      'deletItemFun',
      'amendItemFun',
    ]),
    cancelNewItemTest(data) {
      this.modalDisplay = data
    },
    testButton() {
      this.modalDisplay = true
      console.log(this.modalDisplay)
    },
    // 表格全选
    allSelection(data) {
      this.checkboxId = data.map(item => {
        return item.id
      })
    },
    // 项目类别
    async getItemType(data) {
      await this.getGroupItemsDetailsList({
        with: 'itemType:name',
        item_type_id: data,
        per_page: 100000,
      })
      this.customNewAddInit.sourceData = this.OccupGroupItemsDetailsTypesList
    },
    async getItemTypeEdit(data) {
      await this.getGroupItemsDetailsList({
        with: 'itemType:name',
        item_type_id: data,
        per_page: 100000,
      })
      this.customNewAddInit.sourceData = this.OccupGroupItemsDetailsTypesList
    },
    // 新增职业禁忌证
    /* changeOccpContranDisplay(index) {
      return this.OccpContTypesIdSecond.some(function(item) {
        return index === item.occup_taboo_id
      })
    }, */
    // 新增目标职业病
    /* changeOccpDiseasesDisplay(index) {
      return this.OccpDiseasesTypesId.some(function(item) {
        return index === item.occup_disease_id
      })
    }, */
    // 编辑新增职业病
    /* changeOccpDiseasesDisplayEdit(index) {
      return this.editOccpDiseasesTypesId.some(function(item) {
        return index === item.occup_disease_id
      })
    }, */
    // 新增职业禁忌证
    changeOccpContraindication(index) {
      this.targetConDisplay = this.OccpContTypesIdSecond.map(function(item) {
        if (item.occup_taboo_id) {
          return item.occup_taboo_id
        }
      })
      if (
        this.OccpContTypesIdSecond[index].occup_taboo_id &&
        !this.addNewOccpArrySecond[index].deletItemTShwow
      ) {
        this.addNewOccpArrySecond[index].inspectionShow = false
        this.addNewOccpArrySecond[index].addNewItemTShwow = true
        this.addNewOccpArrySecond[index].addNewItemSShwow = false
        this.addNewOccpArrySecond[index].deletItemTShwow = false
      }
    },
    editChangeOccpContraindication(index) {
      this.targetConDisplayEdit = this.OccpContTypesIdSecondEdit.map(function(
        item,
      ) {
        if (item.occup_taboo_id) {
          return item.occup_taboo_id
        }
      })
      if (
        this.OccpContTypesIdSecondEdit[index].occup_taboo_id &&
        !this.editNewOccpArrySecond[index].deletItemTShwow
      ) {
        this.editNewOccpArrySecond[index].inspectionShow = false
        this.editNewOccpArrySecond[index].addNewItemTShwow = true
        this.editNewOccpArrySecond[index].addNewItemSShwow = false
        this.editNewOccpArrySecond[index].deletItemTShwow = false
      }
      /* console.log(this.OccpDiseasesTypesId) */
    },
    // 新增目标职业病
    changeOccpDiseases(index) {
      this.targetDiseaseDisplay = this.OccpDiseasesTypesId.map(function(item) {
        if (item.occup_disease_id) {
          return item.occup_disease_id
        }
      })
      if (
        this.OccpDiseasesTypesId[index].occup_disease_id &&
        !this.addNewOccpArry[index].deletItemTShwow
      ) {
        this.addNewOccpArry[index].inspectionShow = false
        this.addNewOccpArry[index].addNewItemTShwow = true
        this.addNewOccpArry[index].addNewItemSShwow = false
        this.addNewOccpArry[index].deletItemTShwow = false
      }
    },
    changeOccpDiseasesEditSecond(index) {
      this.targetDiseaseDisplayEdit = this.editOccpDiseasesTypesId.map(function(
        item,
      ) {
        if (item.occup_disease_id) {
          return item.occup_disease_id
        }
      })
      if (
        this.editOccpDiseasesTypesId[index].occup_disease_id &&
        !this.editNewOccpArry[index].deletItemTShwow
      ) {
        this.editNewOccpArry[index] = {
          inspectionShow: false,
          addNewItemTShwow: true,
          addNewItemSShwow: false,
          deletItemTShwow: false,
        }
      }
    },
    /* changeOccpDiseasesEdit(index) {
      console.log(this.editNewOccpArry.length)
      if (this.editOccpDiseasesTypesId[index] && !this.editNewOccpArry[index].deletItemTShwow) {
        this.editNewOccpArry[index].inspectionShow = false
        this.editNewOccpArry[index].addNewItemTShwow = true
        this.editNewOccpArry[index].addNewItemSShwow = false
        this.editNewOccpArry[index].deletItemTShwow = false
      }
    }, */
    // 编辑新增职业病
    // 新增职业病 新增与删除
    addDelNewItemTSFirst(index) {
      if (this.addNewOccpArry[index].addNewItemTShwow) {
        this.addNewOccpArry[index].addNewItemTShwow = false
        this.addNewOccpArry[index].deletItemTShwow = true
        this.addNewOccpArry.push({
          addNewItemSShwow: true,
          addNewItemTShwow: false,
          deletItemTShwow: false,
          inspectionShow: true,
        })
        this.OccpDiseasesTypesId[index + 1] = {
          /* occup_disease_id: null,
          exam_basi_id: null, */
        }
      } else if (this.addNewOccpArry[index].deletItemTShwow) {
        this.addNewOccpArry.splice(index, 1)
        this.OccpDiseasesTypesId.splice(index, 1)
      }
      /* this.changeHeight(this.addElement) */
    },
    editDelNewItemTSFirst(index) {
      if (
        this.editNewOccpArry[index].addNewItemTShwow &&
        this.editOccpDiseasesTypesId[0].occup_disease_id
      ) {
        this.editNewOccpArry[index].addNewItemTShwow = false
        this.editNewOccpArry[index].deletItemTShwow = true
        this.editNewOccpArry.push({
          addNewItemSShwow: true,
          addNewItemTShwow: false,
          deletItemTShwow: false,
          inspectionShow: true,
        })
        this.editOccpDiseasesTypesId[index + 1] = {
          /* occup_disease_id: null,
          exam_basi_id: null, */
        }
      } else if (this.editNewOccpArry[index].deletItemTShwow) {
        this.editNewOccpArry.splice(index, 1)
        this.editOccpDiseasesTypesId.splice(index, 1)
      }
      /* if (this.editNewOccpArry.length === 1 && !this.editOccpDiseasesTypesId[0].occup_disease_id) {
        this.editNewOccpArry[0] = {
          addNewItemSShwow: false,
          addNewItemTShwow: false,
          deletItemTShwow: false,
          inspectionShow: false,
        }
        console.log(this.editNewOccpArry)
      } */
      /* this.changeHeight(this.addElement) */
    },
    addDelNewItemCont(index) {
      if (this.addNewOccpArrySecond[index].addNewItemTShwow) {
        this.addNewOccpArrySecond[index].addNewItemTShwow = false
        this.addNewOccpArrySecond[index].deletItemTShwow = true
        this.addNewOccpArrySecond.push({
          addNewItemSShwow: true,
          addNewItemTShwow: false,
          deletItemTShwow: false,
          inspectionShow: true,
        })
        this.OccpContTypesIdSecond[index + 1] = {
          /* occup_taboo_id: null,
          exam_basi_id: null, */
        }
      } else if (this.addNewOccpArrySecond[index].deletItemTShwow) {
        this.addNewOccpArrySecond.splice(index, 1)
        this.OccpContTypesIdSecond.splice(index, 1)
      }
      /* this.changeHeight(this.addElement) */
    },
    editDelNewItemCont(index) {
      if (this.editNewOccpArrySecond[index].addNewItemTShwow) {
        this.editNewOccpArrySecond[index].addNewItemTShwow = false
        this.editNewOccpArrySecond[index].deletItemTShwow = true
        this.editNewOccpArrySecond.push({
          addNewItemSShwow: true,
          addNewItemTShwow: false,
          deletItemTShwow: false,
          inspectionShow: true,
        })
        this.OccpContTypesIdSecondEdit[index + 1] = {}
      } else if (this.editNewOccpArrySecond[index].deletItemTShwow) {
        this.editNewOccpArrySecond.splice(index, 1)
        this.OccpContTypesIdSecondEdit.splice(index, 1)
      }
      /* this.changeHeight(this.addElement) */
    },
    async hazardCategoryChange(data) {
      await this.getOccupHazardCategoryFactorTypesList({
        filters: `type_id:${data}`,
      })
    },
    async hazardCategoryChangeEdit(data) {
      await this.getOccupHazardCategoryFactorTypesList({
        filters: `type_id:${data}`,
      })
    },
    /* async changeHeight(data) {
      var that = null
      await this.$nextTick(function() {
        that = this.$refs[data.item]
      })
      if (this.windowHeight - 484 < parseInt(document.defaultView.getComputedStyle(that).height)) {
        this.addModalThreeHeight = this.windowHeight - 270 + 'px'
        this.addModalThreeOverflow = 'auto'
      } else {
        this.addModalThreeHeight = ''
        this.addModalThreeOverflow = ''
      }
    }, */
    async changeItem(data) {
      this.showSecoundItem = data.number
      /* this.addElement = data */
      /* console.log(data) */
      /* modalContentFooter */
      /*  console.log(this.$refs.addModalThree)
      console.log(document.defaultView.getComputedStyle(this.$refs.addModalThree).height) */
      /* var that = null
      await this.$nextTick(function() {
        that = this.$refs[data.item]
      })
      if (this.windowHeight - 484 < parseInt(document.defaultView.getComputedStyle(that).height)) {
        this.addModalThreeHeight = this.windowHeight - 270 + 'px'
        this.addModalThreeOverflow = 'auto'
      } else {
        this.addModalThreeHeight = ''
        this.addModalThreeOverflow = ''
      } */
      /* this.changeHeight(data) */
    },
    /* editSortFun(data) {
      this.editModal.data.sort = data
    }, */
    addSortFun(data) {
      this.totalsort = data
    },
    editSortFun(data) {
      this.editModal.data.sort = data
    },
    // 翻页
    /* pageSizeChange() {
      this.chekboxId = []
    }, */
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
            (this.pageInfo.page - 1) * this.pageInfo.page_size + 1 &&
          this.pageInfo.page !== 1
        ) {
          await this.$refs.baseInfoTable.request({
            page: this.pageInfo.page - 1,
          }) // 重新请求页面数据
        } else {
          await this.$refs.baseInfoTable.request() // 重新请求页面数据
        }
        /* this.totalsort -- */
      }
      if (this.chekboxId && !this.clickId) {
        await this.deletItemFun({ ids: this.chekboxId })
        if (
          this.pageInfo.total <=
            (this.pageInfo.page - 1) * this.pageInfo.page_size +
              this.chekboxId.length &&
          this.pageInfo.page !== 1
        ) {
          await this.$refs.baseInfoTable.request({
            page: this.pageInfo.page - 1,
          })
        } else {
          await this.$refs.baseInfoTable.request()
        }
        /* this.totalsort = this.totalsort - this.chekboxId.length */
      }
      this.$refs.baseInfoTable.allSelection = []
      this.chekboxId = []
      this.clickId = null
      this.showDelButton = true
      this.controlModal = false
    },
    // 编辑
    /* editRow(owData, event) {
      this.editSort = owData.sort
      this.editModal.data = _.clone(owData)
      this.lastTime = moment(parseInt(this.editModal.data.updated_at)).format('YYYY-MM-DD H:mm')
      this.editStatusBool = !!this.editModal.data.status
      this.editModalDiv = true
    }, */
    async saveEdit(formName) {
      let editData = {
        id: this.editModal.data.id,
        params: {
          sort: this.editModal.data.sort,
          harm_personnel_type_id: this.editModal.data.harm_personnel_type_id,
          occup_health_examination_type_id: this.editModal.data
            .occup_health_examination_type_id,
          occup_harm_type_id: this.editModal.data.occup_harm_type_id,
          occup_harm_factor_id: this.editModal.data.occup_harm_factor_id,
          examination_time: this.editModal.data.examination_time || '',
          pe_cycle: this.editModal.data.pe_cycle || '',
          remark: this.editModal.data.remark || '',
          examination_object: this.editModal.data.examination_object || '',
          examination_content: this.editModal.data.examination_content || '',
          status: this.editModal.data.editStatusBool ? 1 : 0,
          occup_disease: this.editOccpDiseasesTypesId
            .filter(item => !!item.occup_disease_id)
            .map(item => {
              if (item.exam_basi_id) {
                return item
              } else {
                return { occup_disease_id: item.occup_disease_id }
              }
            }),

          /* (() => {
            let arr = []
            for (let i = 0; i < this.editOccpDiseasesTypesId.length; i++) {
              if (
                this.editOccpDiseasesTypesId[i].occup_disease_id &&
                this.editOccpDiseasesTypesId[i].exam_basi_id
              ) {
                arr.push(this.editOccpDiseasesTypesId[i])
              } else if (
                this.editOccpDiseasesTypesId[i].occup_disease_id &&
                !this.editOccpDiseasesTypesId[i].exam_basi_id
              ) {
                arr.push({
                  occup_disease_id: this.editOccpDiseasesTypesId[i]
                    .occup_disease_id,
                })
              }
            }
            return arr
          })(), */
          occup_taboo: this.OccpContTypesIdSecondEdit.filter(
            item => !!item.occup_taboo_id,
          ).map(item => {
            if (item.exam_basi_id) {
              return item
            } else {
              return { occup_taboo_id: item.occup_taboo_id }
            }
          }),
          group_item: this.editModal.data.group_item.map(item => {
            return {
              group_item_id: item.group_item_id,
              type: item._checked ? 1 : 0,
            }
          }),
        },
      }
      try {
        if (await this.$refs[formName].validate()) {
          await this.amendItemFun(editData)
          await this.$refs.baseInfoTable.request()
          this.editModalDiv = false
        }
      } catch (error) {
        console.dir(error)
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
      this.addModal.data.group_item = this.group_item.map(function(item) {
        return {
          group_item_id: item.id,
          type: item._checked ? 1 : 0,
        }
      })
      this.addModal.data.inquiry_item = this.inquiry_item.map(function(item) {
        return {
          inquiry_item_id: item.id,
        }
      })
      this.addModal.data.examination_content = this.examination_content
      if (Object.keys(this.OccpDiseasesTypesId[0]).length) {
        if (
          !Object.keys(
            this.OccpDiseasesTypesId[this.OccpDiseasesTypesId.length - 1],
          ).length
        ) {
          this.OccpDiseasesTypesId.splice(
            this.OccpDiseasesTypesId.length - 1,
            1,
          )
        }
        this.addModal.data.occup_disease = this.OccpDiseasesTypesId
      }
      if (Object.keys(this.OccpContTypesIdSecond[0]).length) {
        if (
          !Object.keys(
            this.OccpContTypesIdSecond[this.OccpContTypesIdSecond.length - 1],
          ).length
        ) {
          this.OccpContTypesIdSecond.splice(
            this.OccpContTypesIdSecond.length - 1,
            1,
          )
        }
        this.addModal.data.occup_taboo = this.OccpContTypesIdSecond
      }
      try {
        if (await this.$refs[formName].validate()) {
          await this.adNewItemFun(this.addModal.data)
          await this.$refs.baseInfoTable.request()
          this.addModalDiv = false
        }
      } catch (error) {
        console.dir(error)
      }
    },
    // 新增项目
    cancelNewItem() {
      this.addModalDiv = false
      this.editModalDiv = false
    },

    async editRow(owData, event) {
      await Promise.all([
        this.getOccupHealthExamTypesList({ per_page: 100000 }),
        this.getOccupHazardCategoryTypesList({
          per_page: 100000,
          filters: 'status:1',
        }),
        this.getOccupDiseaseList({ per_page: 100000 }),
        this.getOccupInspectionList({ per_page: 100000 }),
        this.getOccupContraindicationList({ per_page: 100000 }),
        this.getInquiriesList({ per_page: 100000 }),
        this.getGroupItemsList({ item_type_id: '', per_page: 100000 }),
        this.getGroupItemsDetailsList({
          with: 'itemType:name',
          per_page: 100000,
        }),
      ])
      console.log(owData)
      this.customNewAddInit.sourceData = this.OccupGroupItemsDetailsTypesList
      this.OccpDiseasesTypesListClone = this.OccpDiseasesTypesList.items.map(
        item => {
          item.displayDisabled = true
          return item
        },
      )
      this.showSecoundItem = 0
      this.OccpContraindicationTypesListClone = this.OccpContraindicationTypesList.items.map(
        item => {
          item.displayDisabled = true
          return item
        },
      )
      this.editModal.data = {
        sort: owData.sort,
        id: owData.id,
        editStatusBool: owData.status === 1,
        updated_at: owData.updated_at,
        harm_personnel_type_id: owData.harm_personnel_type_id,
        occup_health_examination_type_id:
          owData.occup_health_examination_type_id,
        occup_harm_type_id: owData.occup_harm_type_id,
        remark: owData.remark === '/' ? '' : owData.remark,
        examination_content:
          owData.examination_content === '/' ? '' : owData.examination_content,
        inquiry_item: owData.inquiry_item,
        pe_cycle: owData.pe_cycle,
        examination_object: owData.examination_object,
        examination_time: owData.examination_time,
        group_item: owData.group_item.map(item => {
          let newItem = {}
          newItem = {
            item_type_name: item.group_item_type || '',
            name: item.group_item_name || '',
            _checked: item.type === 1,
            group_item_id: item.group_item_id,
          }
          return newItem
        }),
      }
      this.realName = owData.operater
      this.lastTime = moment(parseInt(this.editModal.data.updated_at)).format(
        'YYYY-MM-DD H:mm',
      )
      /* editModal.data.group_item */
      this.hazardCategoryChangeEdit(this.editModal.data.occup_harm_type_id)
      this.editModal.data.occup_harm_factor_id = owData.occup_harm_factor_id
      /* console.log(owData.occup_health_examination_type_id) */
      // 目标职业病
      if (owData.occup_disease.length === 0) {
        this.editOccpDiseasesTypesId[0] = {
          occup_disease_id: '',
          exam_basi_id: '',
        }
      } else {
        for (let i = 0; i < owData.occup_disease.length; i++) {
          this.editOccpDiseasesTypesId[i] = {
            occup_disease_id: owData.occup_disease[i].occup_disease_id,
            exam_basi_id: owData.occup_disease[i].exam_basi_id,
          }
        }
      }
      // 目标职业病
      if (owData.occup_disease.length === 0) {
        this.editNewOccpArry = [
          {
            addNewItemSShwow: true,
            addNewItemTShwow: false,
            deletItemTShwow: false,
            inspectionShow: true,
          },
        ]
      } else if (owData.occup_disease.length === 1) {
        this.editNewOccpArry = [
          {
            addNewItemSShwow: false,
            addNewItemTShwow: true,
            deletItemTShwow: false,
            inspectionShow: false,
          },
        ]
      } else {
        for (var i = 0; i < owData.occup_disease.length - 1; i++) {
          this.editNewOccpArry[i] = {
            addNewItemSShwow: false,
            addNewItemTShwow: false,
            deletItemTShwow: true,
            inspectionShow: false,
          }
        }
        this.editNewOccpArry[owData.occup_disease.length - 1] = {
          addNewItemSShwow: false,
          addNewItemTShwow: true,
          deletItemTShwow: false,
          inspectionShow: false,
        }
      }
      // 目标职业禁忌证
      if (owData.occup_taboo.length === 0) {
        this.OccpContTypesIdSecondEdit[0] = {
          occup_taboo_id: '',
          exam_basi_id: '',
        }
      } else {
        for (let i = 0; i < owData.occup_taboo.length; i++) {
          this.OccpContTypesIdSecondEdit[i] = {
            occup_taboo_id: owData.occup_taboo[i].occup_taboo_id || '',
            exam_basi_id: owData.occup_taboo[i].exam_basi_id || '',
          }
        }
        /* this.mmmtest = this.OccpContTypesIdSecond[i].occup_taboo_id */
      }
      /* console.log(this.OccpContTypesIdSecond) */
      // 目标职业禁忌证
      if (owData.occup_taboo.length === 0) {
        this.editNewOccpArrySecond = [
          {
            addNewItemSShwow: true,
            addNewItemTShwow: false,
            deletItemTShwow: false,
            inspectionShow: true,
          },
        ]
      } else if (owData.occup_taboo.length === 1) {
        this.editNewOccpArrySecond = [
          {
            addNewItemSShwow: false,
            addNewItemTShwow: true,
            deletItemTShwow: false,
            inspectionShow: false,
          },
        ]
      } else {
        for (let i = 0; i < owData.occup_taboo.length - 1; i++) {
          this.editNewOccpArrySecond[i] = {
            addNewItemSShwow: false,
            addNewItemTShwow: false,
            deletItemTShwow: true,
            inspectionShow: false,
          }
        }
        this.editNewOccpArrySecond[owData.occup_taboo.length - 1] = {
          addNewItemSShwow: false,
          addNewItemTShwow: true,
          deletItemTShwow: false,
          inspectionShow: false,
        }
      }
      /* this.targetDiseaseDisplay */
      // occup_disease_id
      this.targetDiseaseDisplayEdit = owData.occup_disease.map(item => {
        return item.occup_disease_id
      })
      this.targetConDisplay = owData.occup_taboo.map(item => {
        return item.occup_taboo_id
      })
      // 禁忌证
      this.OccpDiseasesTypesId = []
      /* this.OccpDiseasesTypesId[0] = {
        occup_disease_id: null,
        exam_basi_id: null,
      } */
      this.OccpDiseasesTypesId[0] = {
        /* occup_disease_id: null,
        exam_basi_id: null, */
      }
      this.OccpContTypesIdSecond = []
      this.OccpContTypesIdSecond[0] = {
        /* occup_taboo_id: null,
        exam_basi_id: null, */
      }
      this.customInit.sourceData = this.InquiriesTypesList.items
      /* this.addModal.data = {
        examination_object: '',
        pe_cycle: '',
        examination_time: '',
        remark: '',
        harm_personnel_type_id: null,
        occup_health_examination_type_id: null,
        occup_harm_type_id: null,
        occup_harm_factor_id: null,
      } */
      this.examination_content = ''
      this.inquiry_item = []
      this.group_item = []
      this.editModalDiv = true
    },
    async addButton() {
      this.totalsort = this.pageInfo.total + 1
      await Promise.all([
        this.getOccupHealthExamTypesList({ per_page: 100000 }),
        this.getOccupHazardCategoryTypesList({
          per_page: 100000,
          filters: 'status:1',
        }),
        this.getOccupDiseaseList({ per_page: 100000 }),
        this.getOccupInspectionList({ per_page: 100000 }),
        this.getOccupContraindicationList({ per_page: 100000 }),
        this.getInquiriesList({ per_page: 100000 }),
        this.getGroupItemsList({ item_type_id: '', per_page: 100000 }),
        this.getGroupItemsDetailsList({
          with: 'itemType:name',
          per_page: 100000,
        }),
      ])
      this.showSecoundItem = 0
      this.customNewAddInit.sourceData = this.OccupGroupItemsDetailsTypesList
      this.OccpDiseasesTypesListClone = this.OccpDiseasesTypesList.items.map(
        item => {
          item.displayDisabled = true
          return item
        },
      )
      this.OccpContraindicationTypesListClone = this.OccpContraindicationTypesList.items.map(
        item => {
          item.displayDisabled = true
          return item
        },
      )
      this.addNewOccpArry = [
        {
          addNewItemSShwow: true,
          addNewItemTShwow: false,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ]
      this.addNewOccpArrySecond = [
        {
          addNewItemSShwow: true,
          addNewItemTShwow: false,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ]
      this.OccpDiseasesTypesId = []
      /* this.OccpDiseasesTypesId[0] = {
        occup_disease_id: null,
        exam_basi_id: null,
      } */
      this.OccpDiseasesTypesId[0] = {
        /* occup_disease_id: null,
        exam_basi_id: null, */
      }
      this.OccpContTypesIdSecond = []
      this.OccpContTypesIdSecond[0] = {
        /* occup_taboo_id: null,
        exam_basi_id: null, */
      }
      this.customInit.sourceData = this.InquiriesTypesList.items
      for (let k in this.addModal.data) {
        this.addModal.data[k] = ''
      }
      this.examination_content = ''
      this.inquiry_item = []
      this.group_item = []
      this.addModalDiv = true
    },
    async enterSearch(val) {
      if (!val && !this.searchText) {
        return
      }
      this.params.search = val
      this.chekboxId = []
      this.searchText = val
    },
    // 启用
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
  },
  computed: {
    ...mapState(['windowHeight']),
    ...mapState('healthCareModule', [
      'occupHealthExamTypesList',
      'OccupHazardCategoryTypesList',
      'OccupHazardCategoryFactorTypesList',
      'OccpDiseasesTypesList',
      'OccpInspectionTypesList',
      'OccpContraindicationTypesList',
      'InquiriesTypesList',
    ]),
    ...mapGetters('healthCareModule', [
      'occupHealthTypesList',
      'OccupGroupItemsTypesList',
      'pageInfo',
      'OccupGroupItemsDetailsTypesList',
    ]),
    addModalThreeHeighttest() {
      return this.windowHeight - 270 + 'px'
    },
    columnsTable() {
      return [
        {
          title: '接害人员类型',
          key: 'harm_personnel_type_id_name',
          minWidth: 204,
        },
        {
          title: '职业病危害因素名称',
          key: 'occup_harm_factor_name',
          minWidth: 136,
        },
        {
          title: '职业健康检查种类',
          key: 'occup_health_examination_type_name',
          minWidth: 125,
        },
        {
          title: '目标疾病',
          key: 'target_disease',
          minWidth: 170,
          render: (h, params) => {
            let val = params.row.target_disease
            return h('div', [
              h('span', {
                domProps: {
                  innerHTML: (function() {
                    if (val[0].length && val[1].length) {
                      return (
                        '目标职业病：' +
                        val[0].join('、') +
                        '<br>' +
                        '目标职业禁忌症：' +
                        val[1].join('、')
                      )
                    } else if (val[0].length && !val[1].length) {
                      return '目标职业病：' + val[0].join('、')
                    } else if (!val[0].length && val[1].length) {
                      return '目标职业禁忌症：' + val[1].join('、')
                    } else {
                      return '/'
                    }
                  })(),
                },
              }),
            ])
          },
          className: 'test',
        },
        {
          title: '检查内容',
          key: 'examination_content',
          minWidth: 191,
          className: 'test',
        },
        {
          title: '重点症状询问',
          key: 'inquiry_item_arr_name',
          minWidth: 191,
          className: 'test',
        },
        {
          title: '体检项目',
          key: 'group_item_arr_name',
          minWidth: 190,
          className: 'test',
          render: (h, params) => {
            let val = params.row.group_item_arr_name
            return h('div', [
              h('span', {
                domProps: {
                  innerHTML: (function() {
                    if (val[0].length && val[1].length) {
                      return (
                        '必检项目：' +
                        val[0].join('、') +
                        '<br>' +
                        '选检项目：' +
                        val[1].join('、')
                      )
                    } else if (val[0].length && !val[1].length) {
                      return '必检项目：' + val[0].join('、')
                    } else if (!val[0].length && val[1].length) {
                      return '选检项目：' + val[1].join('、')
                    } else {
                      return '/'
                    }
                  })(),
                },
              }),
            ])
          },
        },
        {
          title: '其他',
          key: 'other',
          minWidth: 190,
          className: 'test',
          render: (h, params) => {
            let val = params.row.other
            return h('div', [
              h('span', {
                style: {
                  'text-align':
                    !val[0] && !val[1] && !val[2] ? 'center' : 'left',
                },
                domProps: {
                  /* innerHTML: '健康检查周期：' + val[0] + ';', */
                  innerHTML: (function() {
                    if (!val[0] && !val[1] && !val[2]) {
                      return '/'
                    } else {
                      let a = val[0] ? `健康检查周期：${val[0]}` + '<br>' : ''
                      let b = val[1] ? `检查对象：${val[1]}` + '<br>' : ''
                      let c = val[2] ? `检查时间：${val[2]}` : ''
                      return a + b + c
                    }
                  })(),
                },
              }),
            ])
          },
        },
        {
          title: '备注',
          key: 'remark',
          minWidth: 50,
          render: (h, params) => {
            let val = params.row.remark
            if (val) {
              return h('div', [
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
              ])
            }
            return ''
          },
        },
        {
          title: '启用',
          key: 'status',
          minWidth: 58,
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('div', [
                h('div', {
                  style: {
                    margin: '0 auto',
                    background:
                      'url(/static/icons/public/success.png) no-repeat',
                    width: '16px',
                    height: '16px',
                  },
                }),
              ])
            }
          },
        },
        {
          title: '显示顺序',
          key: 'sort',
          minWidth: 70,
        },
        {
          title: '最后修改时间',
          key: 'updated_at',
          minWidth: 180,
          render: (h, params) => {
            return h(
              'span',
              moment(parseInt(params.row.updated_at * 1000)).format('YYYY-MM-DD H:mm'),
            )
          },
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      //
    },
    targetDiseaseDisplay(val) {
      if (val.length) {
        this.OccpDiseasesTypesListClone = this.OccpDiseasesTypesList.items.map(
          (item, index) => {
            if (
              val.some(function(items) {
                return items === item.id
              })
            ) {
              item.displayDisabled = false
              return item
            } else {
              item.displayDisabled = true
              return item
            }
          },
        )
      }
    },
    targetDiseaseDisplayEdit(val) {
      if (val.length) {
        this.OccpDiseasesTypesListClone = this.OccpDiseasesTypesList.items.map(
          (item, index) => {
            if (
              val.some(function(items) {
                return items === item.id
              })
            ) {
              item.displayDisabled = false
              return item
            } else {
              item.displayDisabled = true
              return item
            }
          },
        )
      }
    },
    targetConDisplay(val) {
      if (val.length) {
        this.OccpContraindicationTypesListClone = this.OccpContraindicationTypesList.items.map(
          (item, index) => {
            if (
              val.some(function(items) {
                return items === item.id
              })
            ) {
              item.displayDisabled = false
              return item
            } else {
              item.displayDisabled = true
              return item
            }
          },
        )
      }
    },
    targetConDisplayEdit(val) {
      if (val.length) {
        this.OccpContraindicationTypesListClone = this.OccpContraindicationTypesList.items.map(
          (item, index) => {
            if (
              val.some(function(items) {
                return items === item.id
              })
            ) {
              item.displayDisabled = false
              return item
            } else {
              item.displayDisabled = true
              return item
            }
          },
        )
      }
    },
    /* group_item: {
      handler: (val) => {
        console.log(val)
      },
      deep: true,
    }, */
    /*   addModalThreeHeight(val) {
      console.log(val)
    }, */
    /*  customInit(val) {
      console.log(val)
    }, */
    /*  inquiry_item(val) {
      console.log(val)
    }, */
  },
  async created() {
    /* await this.getManagementList() */
    /* this.totalsort = this.pageInfo.total + 1 */
  },
  async mounted() {
    /* await this.getOccupHealthTypesList() */
    /* this.tableHeight = this.$refs.content.offsetHeight */
  },
  destroyed() {
    /* this.requestPagingo() */
  },
}
</script>
<style lang="less" >
@import (reference) '~assets/less/variable.less';
.healthCard-all {
  padding: 10px;
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  .healthCard-all-content {
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
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            line-height: 20px;
            font-size: 12px;
          }
        }
      }
      .ivu-table-fixed-right {
        .ivu-table-row {
          height: 120px;
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
      .content {
        overflow: auto;
        .first {
          .item1 {
            height: 50px;
            padding-top: 20px;
            margin-left: 20px;
            display: flex;
            .title1 {
              width: 108px;
              margin-right: 10px;
              height: 30px;
              line-height: 30px;
              text-align-last: justify;
            }
            .text1 {
              width: 226px;
              position: relative;
              .star-mark {
                position: absolute;
                font-size: 16px;
                color: #ff6262;
                right: 23px;
                top: 7px;
              }
            }
            .title2 {
              width: 112px;
              margin-left: 20px;
              margin-right: 10px;
              height: 30px;
              line-height: 30px;
              text-align-last: justify;
            }
            .text2 {
              width: 186px;
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
          .item2 {
            margin-top: 20px;
            margin-left: 20px;
            display: flex;
            .title {
              display: inline-block;
              margin-top: 9px;
              width: 108px;
              margin-right: 10px;
              text-align-last: justify;
            }
            .input {
              width: 550px;
              height: 60px;
              textarea {
                height: 100%;
              }
            }
          }
        }
        .second {
          margin-left: 20px;
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
            font-family: 'Microsoft YaHei';
            font-weight: bold;
            font-size: 14px;
            color: #008cee;
            border-bottom: 3px solid #008cee;
          }
        }
        .third {
          .item1 {
            margin: 20px auto 0px 20px;
            .content-title {
              margin-top: 20px;
              margin-bottom: 15px;
              font-family: 'Microsoft YaHei';
              font-weight: bold;
              font-size: 12px;
              color: #4a4a4a;
            }
            .content {
              overflow: initial;
              & > li {
                margin-top: 20px;
                width: 100%;
                height: 30px;
                display: flex;
                .first-title {
                  width: 84px;
                  height: 30px;
                  margin-right: 9px;
                  line-height: 30px;
                  font-size: 12px;
                  color: #797979;
                  text-align-last: justify;
                }
                .first-input {
                  width: 230px;
                }
                .second-title {
                  margin-left: 15px;
                  margin-right: 9px;
                  width: 48px;
                  height: 30px;
                  line-height: 30px;
                  font-size: 12px;
                  color: #797979;
                  text-align-last: justify;
                }
                .second-input {
                  width: 248px;
                }
                .icon-title {
                  padding-top: 6px;
                  margin-left: 12px;
                }
              }
            }
          }
          .item2 {
            margin: 20px 20px 0px 20px;
            display: flex;
            .content-title {
              width: 48px;
              height: 16px;
              margin-right: 10px;
              margin-top: 10px;
            }
            .input-text {
              width: 610px;
              height: 120px;
              .ivu-input {
                height: 100%;
              }
            }
          }
          .item3 {
            .content {
              margin-left: 79px;
              margin-top: 15px;
            }
          }
          .item4 {
            padding-top: 15px;
            padding-left: 20px;
          }
          .item5 {
            margin: 14px 20px 0px 20px;
            .content {
              & > li {
                margin-bottom: 15px;
                display: flex;
                & > p {
                  width: 73px;
                  height: 16px;
                  margin-right: 10px;
                  margin-top: 9px;
                  text-align-last: justify;
                }
                .ivu-input-type {
                  width: 585px;
                  height: 60px;
                  .ivu-input {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
              li:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
      .footer {
        height: 50px;
        margin-top: 20px;
        padding-bottom: 20px;
        margin-left: 455px;
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
      .content {
        overflow: auto;
        .first {
          .item1 {
            height: 50px;
            padding-top: 20px;
            margin-left: 20px;
            display: flex;
            .title1 {
              width: 108px;
              margin-right: 10px;
              height: 30px;
              line-height: 30px;
              text-align-last: justify;
            }
            .text1 {
              width: 226px;
              position: relative;
              .star-mark {
                position: absolute;
                font-size: 16px;
                color: #ff6262;
                right: 23px;
                top: 7px;
              }
            }
            .title2 {
              width: 112px;
              margin-left: 20px;
              margin-right: 10px;
              height: 30px;
              line-height: 30px;
              text-align-last: justify;
            }
            .text2 {
              width: 186px;
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
          .item2 {
            margin-top: 20px;
            margin-left: 20px;
            display: flex;
            .title {
              display: inline-block;
              margin-top: 9px;
              width: 108px;
              margin-right: 10px;
              text-align-last: justify;
            }
            .input {
              width: 550px;
              height: 60px;
              textarea {
                height: 100%;
              }
            }
          }
        }
        .second {
          margin-left: 20px;
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
            font-family: 'Microsoft YaHei';
            font-weight: bold;
            font-size: 14px;
            color: #008cee;
            border-bottom: 3px solid #008cee;
          }
        }
        .third {
          .item1 {
            margin: 20px auto 0px 20px;
            .content-title {
              margin-top: 20px;
              margin-bottom: 15px;
              font-family: 'Microsoft YaHei';
              font-weight: bold;
              font-size: 12px;
              color: #4a4a4a;
            }
            .content {
              overflow: initial;
              & > li {
                margin-top: 20px;
                width: 100%;
                height: 30px;
                display: flex;
                .first-title {
                  width: 84px;
                  height: 30px;
                  margin-right: 9px;
                  line-height: 30px;
                  font-size: 12px;
                  color: #797979;
                  text-align-last: justify;
                }
                .first-input {
                  width: 230px;
                }
                .second-title {
                  margin-left: 15px;
                  margin-right: 9px;
                  width: 48px;
                  height: 30px;
                  line-height: 30px;
                  font-size: 12px;
                  color: #797979;
                  text-align-last: justify;
                }
                .second-input {
                  width: 248px;
                }
                .icon-title {
                  padding-top: 6px;
                  margin-left: 12px;
                }
              }
            }
          }
          .item2 {
            margin: 20px 20px 0px 20px;
            display: flex;
            .content-title {
              width: 48px;
              height: 16px;
              margin-right: 10px;
              margin-top: 10px;
            }
            .input-text {
              width: 610px;
              height: 120px;
              .ivu-input {
                height: 100%;
              }
            }
          }
          .item3 {
            .content {
              margin-left: 79px;
              margin-top: 15px;
            }
          }
          .item4 {
            padding-top: 15px;
            padding-left: 20px;
          }
          .item5 {
            margin: 14px 20px 0px 20px;
            .content {
              & > li {
                margin-bottom: 15px;
                display: flex;
                & > p {
                  width: 73px;
                  height: 16px;
                  margin-right: 10px;
                  margin-top: 9px;
                  text-align-last: justify;
                }
                .ivu-input-type {
                  width: 585px;
                  height: 60px;
                  .ivu-input {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
              li:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
      .footer {
        height: 50px;
        margin-top: 20px;
        padding-bottom: 20px;
        margin-left: 20px;
        display: flex;
        .last-amend {
          width: fit-content;
          line-height: 30px;
          .lastUser {
            display: inline-block;
            margin-right: 20px;
          }
          .updatetime {
            display: inline-block;
            width: 189px;
          }
        }
        .ivu-form-item-content {
          margin-left: 95px;
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
