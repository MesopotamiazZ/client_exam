/**
* @author liuyang
* @date 2018/2/27
* @content 放射人员职业健康监护规范
*/
<template>
  <div class="professionalHealthCareStRadiologists-add-modal" v-if="addModalDiv">

    <!-- 新增弹窗 -->
      <Modal ref="modalContent"
             v-model="addModalDiv"
             width="708"
             height="600"
             :transition-names="[]"
             :mask-closable="false"
             :transfer="false"
             :closable="false">
        <div slot="header">
          <alert-header headerText="新增放射职业健康监护技术规范"
                        :headerVal="totalsort"
                        @alert-retrun-num="addSortFun"></alert-header>
        </div>
        <div class="body">
          <Form ref="addForm"
                :model="addModal.data"
                :rules="addModal.rule">
            <div class="body-content">
              <div class="first">
                <div class="item1">
                  <span class="title1">职业健康检查种类</span>
                  <div class="text1">
                    <FormItem prop="occup_health_examination_type_id">
                      <Select v-model="addModal.data.occup_health_examination_type_id"
                              :filterable='true'>
                        <Option v-for="item in occupHealthExamTypesList.items"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!addModal.data.harm_personnel_type_id"
                          class="star-mark">*</span>
                  </div>
                  <span class="title2">特殊情况</span>
                  <div class="text2">
                    <FormItem prop="harm_personnel_type_id">
                      <Select v-model="addModal.data.harm_personnel_type_id"
                              :filterable='true'>
                        <Option v-for="item in selectData"
                                :value="item.value"
                                :key="item.value">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <span v-show="!addModal.data.occup_health_examination_type_id"
                          class="star-mark">*</span>
                  </div>
                </div>
                <div class="item2"
                  style="margin-top: 15px;margin-left:20px">
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
              <div class="third   tab-content"
                   ref="addModalThree">
                <div class="item1"
                     v-if="0 === showSecoundItem"
                       style=" margin-top: 15px;"
                     ref="item1">
                  <div class="content">
                   <custom-transfer listWidth="230px"
                      :columns='customInitColumns'
                      :sourceData='InquiriesTypesLists'
                      :moveAll="true"
                      v-model="inquiry_item">
                    </custom-transfer>
                  </div>
                </div>
                <div class="item2"
                     v-else-if="1 === showSecoundItem"
                     ref="item2"
                     style="margin-top: 15px;margin-left:20px">
                  <custom-transfer
                    v-model="transferTargetData"
                    checkTitle="是否必检"
                    selectTitle="项目类别"
                    listWidth="290px"
                    listHeight="310px"
                    :moveAll="true"
                    :canChecked="true"
                    :columns="transferColumns"
                    :sourceData="allPro"
                    :select="true"
                    :selectOptions="selectOptions"
                    @getSelectValue="getItemType">
                  </custom-transfer>
                </div>
                <div class="item3"
                     style="margin-top: 15px;margin-left:20px"
                     v-else-if="2 === showSecoundItem"
                     ref="item3">
                  <ul class="content" >
                    <li>
                      <p class="title">健康检查周期</p>
                      <Input type="textarea"
                             v-model="addModal.data.pe_cycle" ></Input>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <Checkbox true-value=1 false-value=0 @on-change="newStatusValueFun" class="statusCheckbox">启用</Checkbox>
          <Button type="ghost" class="fr marginR20 marginB20" @click="cancelNewItem">取 消</Button>
          <Button class="fr marginR20 marginB20" @click="saveNewItem()">保 存</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'
export default {
  name: 'addComponent',
  components: {
    titletHasSlot,
  },
  props: {
    addModalDiv: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      transferTargetData: [],
      customInitColumns: [
        {
          title: '问诊症状名称',
          key: 'name',
        },

      ],
      transferColumns: [
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
      group_item: [],
      inquiry_item: [],
      // 检查内容
      examination_content: '',
      addModalThreeOverflow: '',
      OccpDiseasesTypesId: [],
      // 编
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
          name: '重点症状询问',
          number: 0,
          item: 'item1',
        },
        {
          name: '体检项目',
          number: 1,
          item: 'item2',
        },
        {
          name: '健康检查周期',
          number: 2,
          item: 'item3',
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
      addNewItemData: {},
      showGroupOut: true,
      newStatus: 0,
      // 表格参数
      isSelectMode: false,
      tableHeight: 400,
      statusValue: '',
      // 弹框
      // addModalDiv: true,
      editModalDiv: false,
      params: {
        search: '',
      },
      urlRemark: '/static/icons/public/remarkInCell.svg',
      searchText: '',
      totalsort: this.sort,
    }
  },
  methods: {
    ...mapActions('professionalHealthCareStRadiologistsModule', [
      'getAllPro',
      'getPeItemTypes',
      'getInquiryProjects',
      'getOccupHealthExamTypesList',
    ]),
    getItemType(val) {
      let params = {
        with: 'itemType:name',
      }
      if (val !== -1) {
        params.filters = `item_type_id:${val};status:1`
      }
      this.getAllPro(params)
    },
    async changeItem(data) {
      this.showSecoundItem = data.number
    },
    addSortFun(data) {
      // console.log(88, data)
      this.addModal.data.sort = data
    },
    // 新增启动
    newStatusValueFun(data) {
      if (data) {
        this.newStatus = 1
      } else {
        this.newStatus = 0
      }
    },
    async saveNewItem() {
      // this.addModalDiv = false
      this.$emit('commit-data', this.addModal.data)
    },
    // 新增项目
    cancelNewItem() { // 取消
      // this.addModalDiv = false
      this.$emit('cancel-data')
    },
  },
  computed: {
    ...mapState(['windowHeight']),
    ...mapState('professionalHealthCareStRadiologistsModule', [
      'allPeItemType',
      'allPro',
      'InquiriesTypesLists',
      'occupHealthExamTypesList',
    ]),
    selectOptions() {
      let arr = [
        {
          value: -1,
          label: '全部',
        },
      ]
      console.log(this.allPeItemType)
      this.allPeItemType.forEach(item => {
        arr.push({
          value: item.id,
          label: item.name,
        })
      })
      return arr
    },
  },
  watch: {
    windowHeight(val) {
      //
    },
    sort(cur) {
      console.log(66, cur)
      this.totalsort = cur
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
  },
  async created() {
    //
    await this.getPeItemTypes()
    await this.getAllPro({
      with: `itemType:name`,
    })
    await this.getInquiryProjects()
    await this.getOccupHealthExamTypesList()
  },
  async mounted() {
//
  },
  destroyed() {
 //
  },
}
</script>
<style lang="less" >
@import (reference) '~assets/less/variable.less';
  .professionalHealthCareStRadiologists-add-modal {
    .clearfix:after {
      clear: both;
      content: '';
      display: block;
    }
    .statusCheckbox {
    margin-top: 7px;
    margin-right: 20px;
  }
    .body {
      .body-content {
        // overflow: auto;
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
              width: 180px;
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
            // margin-top: 20px;
            margin-left: 20px;
            display: flex;
            .title {
              display: inline-block;
              // margin-top: 9px;
              width: 108px;
              margin-right: 10px;
              text-align-last: justify;
            }
            .input {
              width: 548px;
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
            font-weight: bold;
            font-size: 14px;
            color: #008cee;
            border-bottom: 3px solid #008cee;
          }
        }


        .third {
          height: calc(~'100% - 220px');
          .item2 {
            // margin: 20px 20px 0px 20px;
            display: flex;
            .content-title {
              width: 48px;
              height: 16px;
              margin-right: 10px;
              // margin-top: 10px;
            }
            .input-text {
              width: 610px;
              height: 120px;
              .ivu-input {
                height: 100%;
              }
            }
          }
          .item1 {
            .content {
              margin-left: 79px;
              // margin-top: 15px;
            }
          }
          .item4 {
            // padding-top: 15px;
            padding-left: 20px;
          }
          .item3 {
              display: flex;
            .content-title {
              width: 48px;
              height: 16px;
              margin-right: 10px;}
            .content {
                  height: 300px;
              & > li {
                margin-bottom: 15px;
                display: flex;
                & > p {
                  width: 73px;
                  height: 16px;
                  margin-right: 10px;
                  // margin-top: 9px;
                  text-align-last: justify;
                }
                .ivu-input-type {
                  width: 540px;
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
              .title {
                display: inline-block;
                // margin-top: 9px;
                width: 118px;
                margin-right: 10px;
                text-align-last: justify;
              }
                 .input {
                  width: 400px;
                  height: 60px;
                  textarea {
                    height: 100%;
              }
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
    .ivu-modal {
      height: calc(~'100% - 41px');
      max-height: 599px;
    }
    .ivu-modal-content {
      height: 100%;
    }
    .ivu-modal-body {
      height: calc(~'100% - 100px');
    }
    .body{
      height: 100%;
      padding-bottom:20px;

      form{
        height: 100%;
        overflow: auto;
      }
    }
  }

</style>
