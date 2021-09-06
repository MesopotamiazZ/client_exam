<template>
  <div class="company-agreement-manage-wrapper margin10">
    <!-- 协议列表 -->
    <div class="agreement-lists">
      <div style="height: 100%;">
        <div class="report-audit-manage-Body">
          <titletHasSlot style="border-bottom: 1px solid #cccccc;">
            <span slot='titletHasSlotLeftTitle'>协议列表</span>
            <div slot='titletHasSlotRightContent'>
              <searchInput class="fl "
                           icon="android-search"
                           searText="请输入搜索内容"
                           ref="searchInput">
              </searchInput>
              <ZButton :ZBtype='"ghost"'
                       class="fl marginR10"
                       @click="amendFunc">导 出</ZButton>
              <!-- <z-button ZBtype="success"
                        :disabled="true"
                        class="fl marginR10">删 除</z-button> -->
              <ZButton :ZBtype='"ghost"'
                       class="fl marginR10"
                       v-if="!selectMode"
                       @click="selectAgreement">选 择</ZButton>
              <ZButtonHasBg v-if="selectMode"
                            class="fl marginR10"
                            @click="abolishSelectMode">取 消</ZButtonHasBg>
            </div>
          </titletHasSlot>
          <div class="report-table">
            <q-table ref="agreementLists"
                     :showOperateColumn="false"
                     :isSelectMode="selectMode"
                     :params="agreementListsParams"
                     :ifEdit="true"
                     :columns="agreementListsColumns"
                     :selectMode="selectMode"
                     :data="agreementListsData"
                     :fixedRightWidth="103"
                     :initReq="false"
                     @on-select="selectRow"
                     @on-select-cancel="selectRowCancel"
                     @on-select-all="selectRowAll">
            </q-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 协议人员列表 -->
    <div class="agreement-menber-lists">
      <div style="height: 100%;">
        <div class="report-audit-manage-Body">
          <titletHasSlot style="border-bottom: 1px solid #cccccc;">
            <span slot='titletHasSlotLeftTitle'>协议人员列表</span>
            <div slot='titletHasSlotRightContent'>
              <ZButton :ZBtype='"ghost"'
                       class="fl marginR10"
                       @click="opemAddMemberModal">新 增</ZButton>
            </div>
          </titletHasSlot>
          <div class="report-table" ref="workPermitBody">
            <baseTable ref="zBaseInfoTable"
                     :columns="agreementMemberListsColumns"
                     :data="agreementMemberListsData"
                     :height="tableHeight"
                     :initReq="false"
                     :showOperateColumn="false"
                 >
            </baseTable>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增协议模态框 -->
    <default-modal :openModal="openAddNewAgreementModal"
                   headerText="新增协议"
                   @abolish="abolishAddNewAgreement"
                   @affirm="affirmAddNewAgreement">
      <div class="agreement-form">
        <div class="agreement-item">
          <label class="title">单位体检号</label>
          <div class="content"
               style="display: inline-block">
            <Input :disabled="true"
                   v-model="addNewAgreementForm.company_pe_sn"></Input>
          </div>
        </div>
        <div class="agreement-item">
          <label class="title">单位名称</label>
          <div class="content">
            <Input :disabled="true"
                   v-model="addNewAgreementForm.company_name"></Input>
          </div>
        </div>
        <div class="agreement-item">
          <div class="item-col">
            <div class="alignment-center">
              <label class="title">包含人数</label>
              <div class="content">
                <Input :disabled="true"
                       v-model="addNewAgreementForm.inclues_num"></Input>
              </div>
            </div>
          </div>
          <div class="item-col">
            <div class="alignment-center">
              <label class="title second-col">协议模板</label>
              <div class="content second-col">
                <Select v-model="addNewAgreementForm.agreement_template">
                  <Option value="11">补充协议模板11</Option>
                  <Option value="22">补充协议模板22</Option>
                  <Option value="33">补充协议模板33</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div class="agreement-item alignment-top">
          <label class="title"
                 for="add_remarks">备注</label>
          <div style="width: 356px;">
            <Input v-model="addNewAgreementForm.remarks"
                   type="textarea"></Input>
          </div>
        </div>
      </div>
    </default-modal>

    <!-- 编辑协议模态框 -->
    <default-modal :openModal="openEditAgreementModal"
                   headerText="编辑协议"
                   @abolish="abolishEditAgreement"
                   @affirm="affirmEditAgreement">
      <div class="agreement-form">
        <div class="agreement-item">
          <div class="item-col">
            <div class="alignment-center">
              <label class="title">单位体检号</label>
              <div class="content">
                <Input :disabled="true"
                       v-model="editNewAgreementForm.company_pe_sn"></Input>
              </div>
            </div>
          </div>
          <div class="item-col">
            <div class="alignment-center">
              <label class="title second-col">协议号</label>
              <div class="content second-col">
                <Input :disabled="true"
                       v-model="editNewAgreementForm.company_pe_sn"></Input>
              </div>
            </div>
          </div>
        </div>
        <div class="agreement-item">
          <label class="title">单位名称</label>
          <div class="content">
            <Input :disabled="true"
                   v-model="editNewAgreementForm.company_name"></Input>
          </div>
        </div>
        <div class="agreement-item">
          <div class="item-col">
            <div class="alignment-center">
              <label class="title">包含人数</label>
              <div class="content">
                <Input v-model="editNewAgreementForm.inclues_num"></Input>
              </div>
            </div>
          </div>
          <div class="item-col">
            <div class="alignment-center">
              <label class="title second-col">协议模板</label>
              <div class="content second-col">
                <Select v-model="editNewAgreementForm.agreement_template">
                  <Option value="11">补充协议模板11</Option>
                  <Option value="22">补充协议模板22</Option>
                  <Option value="33">补充协议模板33</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div class="agreement-item alignment-top">
          <label class="title"
                 for="add_remarks">备注</label>
          <div style="width: 356px;">
            <Input v-model="editNewAgreementForm.remarks"
                   type="textarea"></Input>
          </div>
        </div>
      </div>
    </default-modal>

    <!-- 新增协议人员模态框 -->
    <add-member-modal :recallSign="addMember"
                      headerText="添加人员到协议"
                      :modalWidth="813"
                      @abolish="abolishAddMember"
                      @affirm="affirmAddMember">
      <div style="height:500px; width: 813px;">
        <q-table :showOperateColumn="false"
                 :columns="addMemberColumns"
                 :selectMode="agreementMemberSelectMode"
                 :data="addMemberData"
                 :initReq="false"></q-table>
      </div>
    </add-member-modal>
    <affirmDelModal :controlModal="agreementListStatus"
                    content="确认删除该项吗?"
                    :rests="false"
                    @delCancel="delAgreementListCancel"
                    @affirmDel="affirmAgreementList"></affirmDelModal>
    <affirmDelModal :controlModal="membertListStatus"
                    content="确认删除该项吗?"
                    :rests="false"
                    @delCancel="delMemberListCancel"
                    @affirmDel="delMemberListAffirm"></affirmDelModal>
  </div>
</template>
<script>
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import titletHasSlot from '@/components/titleHasSlot'
import searchInput from '@/components/searchInput'
import addMemberModal from './components/addMember'
import defaultModal from './components/modal'
import affirmDelModal from '@/components/modal/affirmDelModal'
import ZTable from '@/components/table/zTable'
import baseTable from '@/components/qtable/table'
import { mapState } from 'vuex'

export default {
  components: {
    ZButton,
    ZButtonHasBg,
    titletHasSlot,
    searchInput,
    addMemberModal,
    defaultModal,
    affirmDelModal,
    ZTable,
    baseTable,
  },
  data() {
    return {
      // 协议列表
      tableHeight: 200,
      agreementListsData: [
        {
          agreement_no: '2017-Z-807',
          company_exam_no: '1080227110090',
          company_name: '承晟集团',
          includes: 90,
          create_date: '2017-12-12',
          remark: '123',
        },
        {
          agreement_no: '2017-Z-807',
          company_exam_no: '1080227110090',
          company_name: '承晟集团',
          includes: 90,
          create_date: '2017-12-12',
          remark: '',
        },
        {
          agreement_no: '2017-Z-807',
          company_exam_no: '1080227110090',
          company_name: '承晟集团',
          includes: 90,
          create_date: '2017-12-12',
          remark: '',
        },
        {
          agreement_no: '2017-Z-807',
          company_exam_no: '1080227110090',
          company_name: '承晟集团',
          includes: 90,
          create_date: '2017-12-12',
          remark: '',
        },
        {
          agreement_no: '2017-Z-807',
          company_exam_no: '1080227110090',
          company_name: '承晟集团',
          includes: 90,
          create_date: '2017-12-12',
          remark: '',
        },
      ],
      selectMode: false,
      agreementListsParams: {
        search: '',
      },
      agreementListStatus: false,
      delAgreementIndex: -1,
      // 协议人员列表
      agreementMemberListsData: [
        {
          member_name: '张晓松',
          member_sex: '男',
          member_age: 45,
          member_credit: '51022019730608****',
          company_name: '中国移动有限公司成都府恩公司',
        },
        {
          member_name: '张大松',
          member_sex: '男',
          member_age: 45,
          member_credit: '51022019730608****',
          company_name: '中国移动有限公司成都府恩公司',
        },
        {
          member_name: '张大树',
          member_sex: '男',
          member_age: 45,
          member_credit: '51022019730608****',
          company_name: '中国移动有限公司成都府恩公司',
        },
        {
          member_name: '张大松',
          member_sex: '男',
          member_age: 45,
          member_credit: '51022019730608****',
          company_name: '中国移动有限公司成都府恩公司',
        },
        {
          member_name: '张大树',
          member_sex: '男',
          member_age: 45,
          member_credit: '51022019730608****',
          company_name: '中国移动有限公司成都府恩公司',
        },
      ],
      agreementMemberListsParams: {
        search: '',
      },
      addMember: false,
      deleteMemberListIndex: -1,
      membertListStatus: false,
      // 新增协议人员弹框
      addMemberColumns: [
        {
          title: '姓名',
          key: 'name',
          width: 85,
        },
        {
          title: '性别',
          key: 'sex',
          width: 60,
        },
        {
          title: '年龄',
          key: 'age',
          width: 60,
        },
        {
          title: '身份证号',
          key: 'credit',
          width: 200,
        },
        {
          title: '单位名称',
          key: 'company',
          width: 360,
        },
      ],
      addMemberData: [
        {
          name: '李晓芳',
          sex: '女',
          age: 42,
          credit: '51012519920830****',
          company: '承晟集团',
        },
        {
          name: '李晓芳',
          sex: '女',
          age: 42,
          credit: '51012519920830****',
          company: '承晟集团',
        },
        {
          name: '李晓芳',
          sex: '女',
          age: 42,
          credit: '51012519920830****',
          company: '承晟集团',
        },
        {
          name: '李晓芳',
          sex: '女',
          age: 42,
          credit: '51012519920830****',
          company: '承晟集团',
        },
      ],
      // 新增协议弹框
      openAddNewAgreementModal: false,
      addNewAgreementForm: {
        company_pe_sn: '',
        company_name: '',
        inclues_num: 0,
        agreement_template: '',
        remarks: '',
      },
      editNewAgreementForm: {
        company_pe_sn: '2017-Z-807',
        company_name: '承晟集团',
        inclues_num: 96,
        agreement_template: '',
        remarks: '123456',
      },
      // 编辑协议弹框
      openEditAgreementModal: false,
      agreementMemberSelectMode: false,
    }
  },
  computed: {
    ...mapState(['windowHeight']),
    agreementListsColumns() {
      let that = this
      return [
        {
          title: '协议号',
          key: 'agreement_no',
          minWidth: 126,
        },
        {
          title: '单位体检号',
          key: 'company_exam_no',
          minWidth: 126,
        },
        {
          title: '单位名称',
          key: 'company_name',
        },
        {
          title: '包含人数',
          key: 'includes',
          minWidth: 144,
        },
        {
          title: '生成日期',
          key: 'create_date',
          minWidth: 125,
        },
        {
          title: '备注',
          key: 'remark',
          minWidth: 50,
          render(h, params) {
            return params.row.remark
              ? h('remark-in-table', {
                props: {
                  text: params.row.remark,
                },
              })
              : ''
          },
        },
        {
          title: '操作',
          fixed: 'right',
          width: 103,
          render(h, params) {
            return h(
              'div',
              {
                style: {
                  height: '40px',
                  'line-height': '40px',
                },
              },
              [
                h(
                  'span',
                  {
                    class: {
                      'text-button': !that.selectMode,
                      'text-button-disable': that.selectMode,
                    },
                    on: {
                      click: function() {
                        if (that.selectMode) return
                      },
                    },
                  },
                  '预览',
                ),
                h(
                  'span',
                  {
                    style: {
                      padding: '0 5px 0 10px',
                    },
                    class: {
                      'text-button': !that.selectMode,
                      'text-button-disable': that.selectMode,
                    },
                    on: {
                      click: function() {
                        if (that.selectMode) return
                        that.addNewAgreement()
                      },
                    },
                  },
                  '新增',
                ),
                h(
                  'Poptip',
                  {
                    props: {
                      // value: 2,
                      placement: 'bottom-end',
                      content: 'aaa',
                      value: false,
                    },
                    style: {
                      display: 'inline-block',
                      width: '15px',
                      color: '#008cee',
                      'margin-right': '10px',
                    },
                    nativeOn: {
                      click: () => {
                        this.morebtn = 1
                      },
                      mouseenter: e => {
                        if (document.body.clientHeight - e.clientY >= 160) {
                          this.place = 'bottom-end'
                        } else {
                          this.place = 'top-end'
                        }
                      },
                    },
                  },
                  [
                    h('div', {
                      style: {
                        width: '25px',
                        height: '15px',
                        color: '#008cee',
                        'z-index': '999',
                        background:
                          `url('/static/icons/public/${that.selectMode ? 'more-disable.svg' : 'more.svg'}') no-repeat center 10px`,
                      },
                    }),
                    h(
                      'div',
                      {
                        style: {
                          'line-height': '30px',
                        },
                        slot: 'content',
                      },
                      [
                        h(
                          'div',
                          {
                            class: {
                              'report-audit-manage-poptip': true,
                              'text-button-disable': that.selectMode,
                            },
                            on: {
                              click: function() {
                                if (that.selectMode) return
                                that.editAgreement()
                              },
                            },
                          },
                          '编辑',
                        ),
                        h(
                          'div',
                          {
                            class: {
                              'report-audit-manage-poptip': true,
                              'text-button-disable': that.selectMode,
                            },
                            on: {
                              click: function() {
                                if (that.selectMode) return
                                that.deleteAgreement(params.row, params.index)
                              },
                            },
                          },
                          '删除',
                        ),
                        h(
                          'div',
                          {
                            class: {
                              'report-audit-manage-poptip': true,
                              'text-button-disable': that.selectMode,
                            },
                            on: {
                              click: function() {
                                if (that.selectMode) return
                              },
                            },
                          },
                          '导出',
                        ),
                        h(
                          'div',
                          {
                            class: {
                              'report-audit-manage-poptip': true,
                              'text-button-disable': that.selectMode,
                            },
                            on: {
                              click: function() {
                                if (that.selectMode) return
                              },
                            },
                          },
                          '打印',
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            )
          },
        },
      ]
    },
    agreementMemberListsColumns() {
      let that = this
      return [
        {
          title: '姓名',
          key: 'member_name',
          minWidth: 173,
        },
        {
          title: '性别',
          key: 'member_sex',
          minWidth: 91,
        },
        {
          title: '年龄',
          key: 'member_age',
          minWidth: 91,
        },
        {
          title: '身份证',
          key: 'member_credit',
          minWidth: 228,
        },
        {
          title: '单位名称',
          key: 'company_name',
          minWidth: 333,
        },
        {
          title: '操作',
          fixed: 'right',
          width: 70,
          render(h, params) {
            return h(
              'div',
              {
                style: {
                  height: '40px',
                  'line-height': '40px',
                  color: '#FF6262',
                },
                on: {
                  click: function() {
                    that.deleteMemberList(params.row, params.index)
                  },
                },
              },
              '删除',
            )
          },
        },
      ]
    },
  },
  watch: {
    'windowHeight'(val) {
      this.tableHeight = this.$refs.workPermitBody.offsetHeight
    },
  },
  mounted() {
    this.tableHeight = this.$refs.workPermitBody.offsetHeight
  },
  methods: {
    selectAgreement() {
      this.selectMode = true
    },
    selectRow(selection, row, index) {
      console.log(selection)
    },
    selectRowCancel(selection, row, index) {
      console.log(selection)
    },
    selectRowAll(selection) {
      console.log(selection)
    },
    // 新增协议
    addNewAgreement() {
      this.openAddNewAgreementModal = true
    },
    affirmAddNewAgreement() {
      this.openAddNewAgreementModal = false
    },
    abolishAddNewAgreement() {
      this.openAddNewAgreementModal = false
    },
    // 编辑协议
    editAgreement() {
      this.openEditAgreementModal = true
    },
    abolishEditAgreement() {
      this.openEditAgreementModal = false
    },
    affirmEditAgreement() {
      this.openEditAgreementModal = false
    },
    // 删除协议 - 打开模态框
    deleteAgreement(row, index) {
      this.agreementListStatus = true
      this.delAgreementIndex = index
    },
    // 删除协议
    delAgreementListCancel() {
      this.agreementListStatus = false
      this.delAgreementIndex = -1
    },
    affirmAgreementList() {
      this.agreementListsData.splice(this.delAgreementIndex, 1)
      this.agreementListStatus = false
      this.delAgreementIndex = -1
    },
    // 协议列表 - 取消
    abolishSelectMode() {
      this.agreementMemberSelectMode = false
      this.selectMode = false
    },
    // 协议人员
    // 打开添加人员模态框
    opemAddMemberModal() {
      this.agreementMemberSelectMode = true
      this.addMember = true
    },
    // 确认添加人员
    affirmAddMember() {
      this.agreementMemberSelectMode = false
      this.addMember = false
    },
    abolishAddMember() {
      this.addMember = false
    },
    deleteMemberList(row, index) {
      this.deleteMemberListIndex = index
      this.membertListStatus = true
    },
    delMemberListCancel() {
      this.deleteMemberListIndex = -1
      this.membertListStatus = false
    },
    delMemberListAffirm() {
      this.agreementMemberListsData.splice(this.deleteMemberListIndex, 1)
      this.deleteMemberListIndex = -1
      this.membertListStatus = false
    },
    amendFunc() {
      this.$refs.zBaseInfoTable.exportCsv()
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.company-agreement-manage-wrapper {
  height: calc(~'100% - 30px');
  .agreement-lists {
    margin-bottom: 10px;
    height: 50%;
    .report-audit-manage-Body {
      height: 100%;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      box-shadow: 0 1px 6px 0 rgba(206, 213, 242, 0.8);
      border-radius: 8px;
      overflow: hidden;
      .ivu-table-fixed-body {
        overflow: hidden;
        .ivu-table-tbody {
          border-left: 1px solid #d9d9d9;
          overflow: hidden;
          > tr > td:nth-child(1) {
            border-right: none;
          }
        }
      }

      .report-table {
        height: calc(~'100% - 50px');
        .back-status-color {
          color: #ff7b11;
        }
        .text-button {
          line-height: 40px;
          color: @gradeBlueTwo;
        }
        .text-button-disable {
          line-height: 40px;
          color: @gradeAshFive;
          &:hover {
            color: @gradeAshFive;
          }
        }
      }

      // poptip
      // poptip
      .report-audit-manage-poptip {
        font-size: 12px;
        color: @gradeAshTwo;
        letter-spacing: 0;
        &:hover {
          font-size: 12px;
          color: @gradeBlueTwo;
          letter-spacing: 0;
        }
      }
    }
  }
  .agreement-menber-lists {
    height: 50%;
    .report-audit-manage-Body {
      height: 100%;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      box-shadow: 0 1px 6px 0 rgba(206, 213, 242, 0.8);
      border-radius: 8px;
      overflow: hidden;
      .ivu-table-fixed-body {
        overflow: hidden;
        .ivu-table-tbody {
          border-left: 1px solid #d9d9d9;
          overflow: hidden;
          > tr > td:nth-child(1) {
            border-right: none;
          }
        }
      }

      .report-table {
        height: calc(~'100% - 50px');
        .back-status-color {
          color: #ff7b11;
        }
        .text-button {
          line-height: 40px;
          color: @gradeBlueTwo;
        }
      }
    }
  }

  .agreement-form {
    padding: 20px;
    padding-bottom: 0;
    .agreement-item {
      font-size: 0;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      .item-col {
        width: 50%;
        display: inline-block;
        .alignment-center {
          display: flex;
          align-items: center;
        }
      }
      &.alignment-top {
        display: flex;
        align-items: flex-start;
      }
      .title {
        font-size: 12px;
        width: 60px;
        display: inline-block;
        margin-right: 10px;
        text-align: justify;
        text-align-last: justify;
        color: @gradeAshTwo;
        &.second-col {
          width: 48px;
          margin-left: 20px;
          text-align: justify;
          text-align-last: justify;
        }
      }
      .content {
        width: calc(~'100% - 70px');
        height: 30px;
        display: inline-block;
        color: @gradeAshTwo;
        &.disabled {
          border: none;
        }
        &.second-col {
          width: calc(~'100% - 78px');
        }
      }
      .text-content {
        width: calc('100% - 70px');
      }
    }
  }
}
</style>
