
<template>
  <div class="modal-component">
    <Modal ref="modalContent"
           v-model="modalDisplay"
           width="708"
           :transition-names="[]"
           :mask-closable="false"
           :transfer="false"
           :closable="false">
      <div slot="header">
        <!-- <slot name="headerCom">
        </slot> -->
        <alert-header headerText="新增职业病危害因素类别"
                        :headerVal="modalData.data.sort"
                        @alert-retrun-num="addSortFun"></alert-header>
      </div>
      <div class="content-footer">
        <Form ref="addForm"
              :model="modalData.data"
              :rules="modalData.rule">
          <div class="content"
               :style="{maxHeight:addModalThreeHeighttest}">
            <div class="first">
              <div class="item1">
                <span class="title1">接害人员类别</span>
                <div class="text1">
                  <FormItem prop="harm_personnel_type_id">
                    <Select v-model="modalData.data.harm_personnel_type_id"
                            :filterable='true'>
                      <Option v-for="item in selectData"
                              :value="item.value"
                              :key="item.value">{{item.name}}</Option>
                    </Select>
                  </FormItem>
                  <span v-show="!modalData.data.harm_personnel_type_id"
                        class="star-mark">*</span>
                </div>
                <span class="title2">职业健康检查种类</span>
                <div class="text2">
                  <FormItem prop="occup_health_examination_type_id">
                    <Select v-model="modalData.data.occup_health_examination_type_id"
                            :filterable='true'>
                      <Option v-for="item in occupHealthExamTypesList.items"
                              :value="item.id"
                              :key="item.id">{{item.name}}</Option>
                    </Select>
                  </FormItem>
                  <span v-show="!modalData.data.occup_health_examination_type_id"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item1">
                <span class="title1">职业病危害因素类别</span>
                <div class="text1">
                  <!-- @on-change="hazardCategoryChange" -->
                  <FormItem prop="occup_harm_type_id">
                    <Select v-model="modalData.data.occup_harm_type_id"
                            :filterable='true'
                            @on-change="hazardCategoryChange">
                      <Option v-for="item in OccupHazardCategoryTypesList.items"
                              :value="item.id"
                              :key="item.id"
                              :disabled="false">{{item.name}}</Option>
                    </Select>
                  </FormItem>
                  <span v-show="!modalData.data.occup_harm_type_id"
                        class="star-mark">*</span>
                </div>
                <span class="title2">职业危害因素名称</span>
                <div class="text2">
                  <!-- addNewItemData.name -->
                  <FormItem prop="occup_harm_factor_id">
                    <Select v-model="modalData.data.occup_harm_factor_id"
                            :filterable='true'
                            :disabled="!modalData.data.occup_harm_type_id">
                      <Option v-for="item in occupHazardCategoryFactorTypesList"
                              :value="item.id"
                              :key="item.id">{{item.name}}</Option>
                    </Select>
                  </FormItem>
                  <span v-show="!modalData.data.occup_harm_factor_id"
                        class="star-mark">*</span>
                </div>
              </div>
              <div class="item2">
                <span class="title">备注</span>
                <Input class="input"
                       type="textarea"
                       v-model.trim="modalData.data.remark"></Input>
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
                    <!-- @on-change="changeOccpDiseases(index)" -->
                    <Select class="first-input"
                            v-model="occpDiseasesTypesId[index].occup_disease_id"
                            :placement="'top'"
                            @on-change="changeOccpDiseases(index)">
                      <Option v-for="(items,indexs) in occpDiseasesTypesListClone"
                              :value="items.id"
                              :key="items.id"
                              v-show="items.displayDisabled">{{items.name}}</Option>
                    </Select>
                    <p class="second-title">检查依据</p>
                    <Select class="second-input"
                            v-model="occpDiseasesTypesId[index].exam_basi_id"
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
                    <!-- @on-change="changeOccpContraindication(index)" -->
                    <Select class="first-input"
                            v-model="OccpContTypesIdSecond[index].occup_taboo_id"
                            :placement="'top'"
                            @on-change="changeOccpContraindication(index)"
                            >
                      <Option v-for="items in occpContraindicationTypesListClone"
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
                           v-model="modalData.data.pe_cycle"></Input>
                  </li>
                  <li>
                    <p>检查时间</p>
                    <Input type="textarea"
                           v-model="modalData.data.examination_time"></Input>
                  </li>
                  <li>
                    <p>检查对象</p>
                    <Input type="textarea"
                           v-model="modalData.data.examination_object"></Input>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer">
            <FormItem>
               <Checkbox class="checkBox"
                        v-model = "editStatusBool"
                        >启用</Checkbox>
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
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  props: {
    modalType: {
      type: String,
      required: true,
      default: '',
    },
    headerText: {
      type: String,
      required: true,
      default: '',
    },
    modalDisplay: {
      type: Boolean,
      required: true,
      default: false,
    },
    occupHazardCategoryFactorTypesList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      editStatusBool: false,
      modalData: {
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
      /* newStatus: 0, */
      group_item: [],
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
      inquiry_item: [],
      // 检查内容
      examination_content: '',
      OccpContTypesIdSecond: [
        {
          occup_taboo_id: '',
          exam_basi_id: '',
        },
      ],
      targetConDisplay: [],
      occpContraindicationTypesListClone: [],
      occpDiseasesTypesListClone: [],
      showSecoundItem: 0,
      occpDiseasesTypesId: [
        {
          occup_disease_id: '',
        },
      ],
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
      addNewOccpArry: [
        {
          addNewItemSShwow: true,
          addNewItemTShwow: false,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
      addNewOccpArrySecond: [
        {
          addNewItemSShwow: true,
          addNewItemTShwow: false,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
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
    }
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
  },
  methods: {
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
    async saveNewItem(formName) {
      this.modalData.data.status = this.editStatusBool ? 1 : 0
      /* this.modalData.data.sort = */
      // 体检项目
      this.modalData.data.group_item = this.group_item.map(function(item) {
        return {
          group_item_id: item.id,
          type: item._checked ? 1 : 0,
        }
      })
      // 重点症状询问
      this.modalData.data.inquiry_item = this.inquiry_item.map(function(item) {
        return {
          inquiry_item_id: item.id,
        }
      })
      this.modalData.data.examination_content = this.examination_content
      if (Object.keys(this.occpDiseasesTypesId[0]).length) {
        if (
          !Object.keys(
            this.occpDiseasesTypesId[this.occpDiseasesTypesId.length - 1],
          ).length
        ) {
          this.occpDiseasesTypesId.splice(
            this.occpDiseasesTypesId.length - 1,
            1,
          )
        }
        console.log(Object.keys(this.occpDiseasesTypesId[0]))
        this.modalData.data.occup_disease = this.occpDiseasesTypesId
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
        this.modalData.data.occup_taboo = this.OccpContTypesIdSecond
      }
      try {
        if (await this.$refs[formName].validate()) {
          await this.adNewItemFun(this.modalData.data)
          await this.$refs.baseInfoTable.request()
          this.addModalDiv = false
        }
      } catch (error) {
        console.dir(error)
      }
    },
    addSortFun(data) {
      this.modalData.data.sort = data
    },
    cancelNewItem() {
      this.$emit('closeModal', false)
    },
    /* newStatusValueFun(data) {
      if (data) {
        this.newStatus = 1
      } else {
        this.newStatus = 0
      }
    }, */
    async getItemType(data) {
      await this.getGroupItemsDetailsList({
        with: 'itemType:name',
        item_type_id: data,
        per_page: 100000,
      })
      this.customNewAddInit.sourceData = this.OccupGroupItemsDetailsTypesList
    },
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
        this.occpDiseasesTypesId[index + 1] = {
          occup_disease_id: null,
          exam_basi_id: null,
        }
      } else if (this.addNewOccpArry[index].deletItemTShwow) {
        this.addNewOccpArry.splice(index, 1)
        this.occpDiseasesTypesId.splice(index, 1)
      }
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
    async hazardCategoryChange(data) {
      await this.getOccupHazardCategoryFactorTypesList({
        filters: `type_id:${data}`,
      })
    },
    changeItem(data) {
      this.showSecoundItem = data.number
    },
    changeOccpDiseases(index) {
      this.targetDiseaseDisplay = this.occpDiseasesTypesId.map(function(item) {
        if (item.occup_disease_id) {
          return item.occup_disease_id
        }
      })
      if (
        this.occpDiseasesTypesId[index].occup_disease_id &&
        !this.addNewOccpArry[index].deletItemTShwow
      ) {
        this.addNewOccpArry[index].inspectionShow = false
        this.addNewOccpArry[index].addNewItemTShwow = true
        this.addNewOccpArry[index].addNewItemSShwow = false
        this.addNewOccpArry[index].deletItemTShwow = false
      }
    },
  },
  async mounted() {
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
    this.occpDiseasesTypesListClone = this.OccpDiseasesTypesList.items.map(
      item => {
        item.displayDisabled = true
        return item
      },
    )
    this.occpContraindicationTypesListClone = this.OccpContraindicationTypesList.items.map(
        item => {
          item.displayDisabled = true
          return item
        },
      )
    this.customInit.sourceData = this.InquiriesTypesList.items
    this.customNewAddInit.sourceData = this.OccupGroupItemsDetailsTypesList
    if (this.modalType === 'addNewItem') {
      this.modalData.data.sort = this.pageInfo.total + 1
    }
  },
}
</script>

<style lang="less">
.modal-component {
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
</style>
