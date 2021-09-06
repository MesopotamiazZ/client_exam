/** 
* @author wzd
* @date 2018/03/02
* @content 放射体检备单
*/ 
<template>
  <div class="radiationExamRemarkInvoices" v-if="controlModal">
    <Modal v-model="controlModal"
           :styles="{width: '976px'}"
           style="overflow:auto;"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <p name='alertHeader'
           class="alertHeader font14">
          <span class="alertHeaderText font16">放射工作人员职业健康检查备单</span>
        </p>
      </div>
      <div class="main">
        <Form ref="remarkInvoicesForm"
              :model="remarkInvoicesForm.data"
              :rules="remarkInvoicesForm.rule"
              :label-width="48 + 10"
              class="remarkInvoices-form">
          <FormItem label="体检套餐"
                    prop="examCombo"
                    class="remarkInvoices-form-row one">
            <select-input type="text"
                          v-model.trim="remarkInvoicesForm.data.examCombo"
                          :data="[]"
                          @input="editFormInputName"
                          :class='{inputVerificationTs: isEmpty(remarkInvoicesForm.data.examCombo)}'
                          @getSelect="editFormInputSelect"></select-input>
          </FormItem>
          <FormItem label="预约日期"
                    prop="appointmentDate"
                    class="remarkInvoices-form-row one">
            <!-- <date-component :dateVal="remarkInvoicesForm.data.appointmentDate"></date-component> -->
            <DatePicker type="date"
                                :class="{selectVerificationTs: isEmpty(remarkInvoicesForm.data.appointmentDate)}"
                                v-model.trim="remarkInvoicesForm.data.appointmentDate"></DatePicker>
          </FormItem>
          <FormItem label="结算方式"
                    prop="statementType"
                    class="remarkInvoices-form-row two">
            <Select v-model="remarkInvoicesForm.data.statementType"
                    placeholder=""
                    :class='{selectVerificationTs: isEmpty(remarkInvoicesForm.data.statementType)}'
                    filterable>
              <Option v-for="item in selectOptions.statementType"
                      :value="item.value"
                      :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="备注"
                    prop="remark"
                    class="remarkInvoices-form-row two marginL20">
            <Input type="text"
                   v-model.trim="remarkInvoicesForm.data.remark"></Input>
          </FormItem>
        </Form>
        <div class="proExam-box contentBg">
          <div class="proExam-box-header">
            <span class="header-text">备单人数：{{employeeCount}}人</span>
            <div class="btns-right">
              <template v-if="!isSelect">
                <Button type="ghost"
                        @click="selectBtn">选择</Button>
              </template>
              <template v-else>
                <Button type="success"
                        :disabled="chooseDisabled"
                        @click="delInvoices">删除</Button>
                <Button type="ghost"
                        :disabled="chooseDisabled"
                        @click="batchSet">批量设置</Button>
                <Button type="ghost"
                        @click="cancelSelect">取消</Button>
              </template>
            </div>
          </div>
          <div class="proExam-box-body">
            <Table ref="table"
                     @on-selection-change="changeSelection"
                     :columns="tableColumns"
                     :data="tableData"
                     :height="300"></Table>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="modelFooter">
          <Button type="primary"
                  @click="affirm">保 存</Button>
          <Button type="ghost"
                  @click="cancel">取 消</Button>
        </div>
      </div>
    </Modal>
    <radiologySet :radiologySetModal="radiologySetModal" @send="radiologySetModal=false" @cancel="radiologySetModal=false"></radiologySet>
    <!-- 删除 -->
    <affirm-del-modal
      :isMask="false"
      :controlModal="deleteOneModal"
      :delCounts="selectionData.length"
      @delCancel="deleteOneModal=false"
      @affirmDel="deleteAffirm">
    </affirm-del-modal>
    <!-- 新增职业健康检查种类 -->
    <newHealthType :modelVoid="newHealthType" @sure="newHealthType=false" @cancel="newHealthType=false"></newHealthType>
  </div>
</template>
<script>
import dateComponent from '@/components/calendar/dateComponent'
import zInput from '@/components/zInput'
import ZTable from '@/components/table/zTable'
import radiologySet from './radiologySet'
import newHealthType from './newHealthType'
export default {
  name: 'radiationExamRemarkInvoices',
  components: {
    dateComponent,
    zInput,
    ZTable,
    radiologySet,
    newHealthType,
  },
  props: {
    controlModal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tableColumns() {
      let arr = this.otherColumns
      if (this.isSelect) {
        if (arr[0].key === 'index' || arr[0].type === 'selection') {
          arr.shift()
        }
        arr.unshift(this.selectColumns)
        // this.otherColumns[1]
      } else {
        if (arr[0].key === 'index' || arr[0].type === 'selection') {
          arr.shift()
        }
        arr.unshift(this.indexColumns)
      }
      console.log(1111111, arr)
      return arr
    },
  },
  data() {
    return {
      newHealthType: false,
      selectionData: [],
      deleteOneModal: false,
      radiologySetModal: false,
      chooseDisabled: true,
      place: 'bottom',
      selectMode: false,
      employeeCount: 33, // 备单人数
      isSelect: false, // 是否点击选择
      remarkInvoicesForm: {
        data: {
          examCombo: '', // 体检套餐
          appointmentDate: '', // 预约日期
          statementType: null, // 结算方式
          remark: '', // 备注
        },
        rule: {
          examCombo: [
            { required: true, message: '体检套餐不能为空', trigger: 'blur' },
          ],
          appointmentDate: [
            {required: true,
              message: '预约日期不能为空',
              type: 'date',
              trigger: 'change' },
            // { required: true, message: '预约日期不能为空', trigger: 'blur' },
          ],
          statementType: [
            { required: true, type: 'number', message: '结算方式不能为空', trigger: 'change' },
          ],
        },
      },
      selectOptions: {
        statementType: [
          {
            label: '以预约人数',
            value: 1,
          },
          {
            label: '以实检人数',
            value: 2,
          },
        ],
      },
      illTypeChoose: [
        {value: 1, label: 'α射线'},
        {value: 2, label: 'β射线'},
        {value: 3, label: 'γ射线'},
        {value: 4, label: '中子射线'},
        {value: 5, label: '电子射线'},
        {value: 6, label: '质子射线'},
        {value: 7, label: '其他射线'},
      ],
      moreIrradiateChoose: [
        {value: 1, label: '有'},
        {value: 2, label: '无'},
      ],
      printCertificateChoose: [
        {value: 1, label: '是'},
        {value: 2, label: '否'},
      ],
      applyChoose: [
        {value: 1, label: '是'},
        {value: 2, label: '否'},
      ],
      adornChoose: [
        {value: 1, label: '是'},
        {value: 2, label: '否'},
      ],
      exceptionalCaseChoose: [
        {value: 1, label: '有'},
        {value: 2, label: '无'},
      ],
      indexColumns: {
        title: '序号',
        key: 'index',
        align: 'center',
        width: 50,
        render: (h, params) => {
          return h('div', params.row._index + 1)
        },
      },
      selectColumns: {
        type: 'selection',
        width: 50,
        align: 'center',
      },
      otherColumns: [
        {
          title: '员工姓名',
          key: 'name',
          width: 79,
        },
        {
          title: '性别',
          key: 'sex',
          width: 44,
        },
        {
          title: '年龄',
          key: 'age',
          width: 44,
        },
        {
          title: '车间/部门',
          key: 'department',
          width: 140,
        },
        {
          title: '职务',
          key: 'job',
          width: 140,
        },
        {
          title: '个人支付比例',
          key: 'personalPercent',
          width: 100,
          render: (h, params) => {
            return h('z-input', {
              class: {
                'table-input': true,
              },
              props: {
                value: this.tableData[params.index].personalPercent,
                type: 'number',
              },
              on: {
                'on-blur': () => {
                  this.tableData[params.index].personalPercent = event.target.value
                },
              },
            })
          },
        },
        {
          title: '新增费用结算方式',
          key: 'paymentType',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h(
              'Select',
              {
                props: {
                  value: params.row.paymentType,
                  placeholder: '',
                  placement: this.place,
                },
                nativeOn: {
                  'on-change': function(data) {
                    params.row.paymentType = data
                  },
                  mouseenter: e => {
                    if (document.body.clientHeight - e.clientY >= 200) {
                      this.place = 'bottom'
                    } else {
                      this.place = 'top'
                    }
                  },
                },
              },
              this.selectOptions.statementType.map(function(item) {
                return h('Option', {
                  props: {
                    value: item.value,
                    label: item.label,
                  },
                })
              }),
            )
          },
        },
        {
          title: '放射线种类',
          key: 'illType',
          align: 'center',
          width: '116px',
          render: (h, params) => {
            return h(
              'Select',
              {
                props: {
                  value: params.row.illType,
                  placeholder: '',
                  placement: this.place,
                },
                nativeOn: {
                  'on-change': function(data) {
                    params.row.illType = data
                  },
                  mouseenter: e => {
                    if (document.body.clientHeight - e.clientY >= 240) {
                      this.place = 'bottom'
                    } else {
                      this.place = 'top'
                    }
                  },
                },
              },
              this.illTypeChoose.map(function(item) {
                return h('Option', {
                  props: {
                    value: item.value,
                    label: item.label,
                  },
                })
              }),
            )
          },
        },
        {
          title: '每日工作时数或工作量（h）',
          key: 'workTime',
          width: 200,
          render: (h, params) => {
            return h('z-input', {
              class: {
                'table-input': true,
              },
              props: {
                value: this.tableData[params.index].workTime,
                type: 'number',
              },
              on: {
                'on-blur': function(event) {
                  this.tableData[params.index].workTime = event.target.value
                },
              },
            })
          },
        },
        {
          title: '过量照射史',
          key: 'moreIrradiate',
          align: 'center',
          width: 84,
          render: (h, params) => {
            return h(
              'Select',
              {
                props: {
                  value: params.row.moreIrradiate,
                  placeholder: '',
                  placement: this.place,
                },
                nativeOn: {
                  'on-change': function(data) {
                    params.row.moreIrradiate = data
                  },
                  mouseenter: e => {
                    if (document.body.clientHeight - e.clientY >= 200) {
                      this.place = 'bottom'
                    } else {
                      this.place = 'top'
                    }
                  },
                },
              },
              this.moreIrradiateChoose.map(function(item) {
                return h('Option', {
                  props: {
                    value: item.value,
                    label: item.label,
                  },
                })
              }),
            )
          },
        },
        {
          title: '佩戴个人剂量计',
          key: 'adorn',
          align: 'center',
          width: 104,
          render: (h, params) => {
            return h(
              'Select',
              {
                props: {
                  value: params.row.adorn,
                  placeholder: '',
                  placement: this.place,
                },
                nativeOn: {
                  'on-change': function(data) {
                    params.row.adorn = data
                  },
                  mouseenter: e => {
                    if (document.body.clientHeight - e.clientY >= 200) {
                      this.place = 'bottom'
                    } else {
                      this.place = 'top'
                    }
                  },
                },
              },
              this.adornChoose.map(function(item) {
                return h('Option', {
                  props: {
                    value: item.value,
                    label: item.label,
                  },
                })
              }),
            )
          },
        },
        {
          title: '打证',
          key: 'printCertificate',
          align: 'center',
          width: 50,
          render: (h, params) => {
            return h(
              'Select',
              {
                props: {
                  value: params.row.printCertificate,
                  placeholder: '',
                  placement: this.printCertificate,
                },
                nativeOn: {
                  'on-change': function(data) {
                    params.row.printCertificate = data
                  },
                  mouseenter: e => {
                    if (document.body.clientHeight - e.clientY >= 200) {
                      this.place = 'bottom'
                    } else {
                      this.place = 'top'
                    }
                  },
                },
              },
              this.printCertificateChoose.map(function(item) {
                return h('Option', {
                  props: {
                    value: item.value,
                    label: item.label,
                  },
                })
              }),
            )
          },
        },
        {
          title: '申请类型',
          key: 'apply',
          align: 'center',
          width: 104,
          render: (h, params) => {
            return h(
              'Select',
              {
                props: {
                  value: params.row.apply,
                  placeholder: '',
                  placement: this.place,
                },
                nativeOn: {
                  'on-change': function(data) {
                    params.row.apply = data
                  },
                  mouseenter: e => {
                    if (document.body.clientHeight - e.clientY >= 200) {
                      this.place = 'bottom'
                    } else {
                      this.place = 'top'
                    }
                  },
                },
              },
              this.applyChoose.map(function(item) {
                return h('Option', {
                  props: {
                    value: item.value,
                    label: item.label,
                  },
                })
              }),
            )
          },
        },
        {
          title: '变更内容',
          key: 'changeContent',
          width: 104,
          render: (h, params) => {
            return h('z-input', {
              class: {
                'table-input': true,
              },
              on: {
                'on-blur': function(event) {
                  params.row.changeContent = event.target.value
                  console.log('2', params)
                },
              },
            })
          },
        },
        {
          title: '职业健康检查种类',
          key: 'checkType',
          width: 116,
          render: (h, params) => {
            return h('div', {
              class: 'enter',
              on: {
                click: () => {
                  this.newHealthType = true
                },
              },
            }, '点击增加')
          },
        },
        {
          title: '累计受照剂量（mSv）',
          key: 'allIrradiate',
          width: 148,
          render: (h, params) => {
            return h('z-input', {
              class: {
                'table-input': true,
              },
              props: {
                value: this.tableData[params.index].allIrradiate,
                type: 'number',
              },
              on: {
                'on-blur': function(event) {
                  this.tableData[params.index].allIrradiate = event.target.value
                },
              },
            })
          },
        },
        {
          title: '特殊情况',
          key: 'exceptionalCase',
          align: 'center',
          width: 116,
          render: (h, params) => {
            return h(
              'Select',
              {
                props: {
                  value: params.row.exceptionalCase,
                  placeholder: '',
                  placement: this.place,
                },
                nativeOn: {
                  'on-change': function(data) {
                    params.row.exceptionalCase = data
                  },
                  mouseenter: e => {
                    if (document.body.clientHeight - e.clientY >= 200) {
                      this.place = 'bottom'
                    } else {
                      this.place = 'top'
                    }
                  },
                },
              },
              this.exceptionalCaseChoose.map(function(item) {
                return h('Option', {
                  props: {
                    value: item.value,
                    label: item.label,
                  },
                })
              }),
            )
          },
        },
        {
          key: '',
          align: 'center',
        },
        {
          title: '操作',
          key: 'operator',
          fixed: 'right',
          width: 46,
          render: (h, params) => {
            return h('div', {
              style: {
                width: '100%',
                height: '40px',
                background: '#ffffff',
                lineHeight: '40px',
              } }, [
                h('i', {
                  attrs: {
                    class: this.isSelect ? 'table-del' : 'icon-del',
                  },
                  on: {
                    click: () => {
                      if (!this.isSelect) {
                        this.deleteOneModal = true
                      }
                    },
                  },
                }),
              ]
            )
          },
        },
      ],
      tableData: [
        {
          name: '王奔',
          sex: '男',
          age: 20,
          department: '技术部',
          job: '后端',
          personalPercent: null,
          paymentType: '',
          illType: null,
          workTime: null,
          moreIrradiate: null,
          adorn: null,
          printCertificate: null,
          apply: null,
          changeContent: null,
          checkType: null,
          allIrradiate: null,
          exceptionalCase: null,
        },
        {
          name: '王奔',
          sex: '男',
          age: 20,
          department: '技术部',
          job: '后端',
          personalPercent: null,
          paymentType: '',
        },
        {
          name: '王奔',
          sex: '男',
          age: 20,
          department: '技术部',
          job: '后端',
          personalPercent: null,
          paymentType: '',
        },
        {
          name: '王奔',
          sex: '男',
          age: 20,
          department: '技术部',
          job: '后端',
          personalPercent: null,
          paymentType: '',
        },
        {
          name: '王奔',
          sex: '男',
          age: 20,
          department: '技术部',
          job: '后端',
          personalPercent: null,
          paymentType: '',
        },
        {
          name: '王奔',
          sex: '男',
          age: 20,
          department: '技术部',
          job: '后端',
          personalPercent: null,
          paymentType: '',
        },
        {
          name: '王奔',
          sex: '男',
          age: 20,
          department: '技术部',
          job: '后端',
          personalPercent: null,
          paymentType: '',
        },
        {
          name: '王奔',
          sex: '男',
          age: 20,
          department: '技术部',
          job: '后端',
          personalPercent: null,
          paymentType: '',
        },
      ],
    }
  },
  methods: {
    editFormInputName() {
      // 对体检套餐输入框进行输入修改变化时触发
    },
    editFormInputSelect() {
      // 选择套餐
    },
    affirm() {
      // 保存
      this.$refs.remarkInvoicesForm.validate((valid) => {
        if (valid) {
          this.$emit('send')
          this.remarkInvoicesForm.data =
          {
            examCombo: '', // 体检套餐
            appointmentDate: '', // 预约日期
            statementType: null, // 结算方式
            remark: '', // 备注
          }
          this.isSelect = false
        }
      })
    },
    cancel() {
      this.$emit('cancel')
      this.remarkInvoicesForm.data =
      {
        examCombo: '', // 体检套餐
        appointmentDate: '', // 预约日期
        statementType: null, // 结算方式
        remark: '', // 备注
      }
      this.isSelect = false
    },
    selectBtn() {
      // 备单选择按钮
      this.isSelect = true
    },
    batchSet() {
      // 批量设置
      this.radiologySetModal = true
    },
    delInvoices() {
      // 删除备单
      this.deleteOneModal = true
    },
    cancelSelect() {
      // 取消选择
      this.$refs.table.selectAll(false)
      this.selectionData = []
      this.isSelect = false
    },
    changeSelection(data) {
      this.selectionData = data
      if (data.length) {
        this.chooseDisabled = false
      } else {
        this.chooseDisabled = true
      }
    },
    deleteAffirm() {
      this.deleteOneModal = false
    },
    isEmpty(data) {
      if (data === '' || data === null) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.radiationExamRemarkInvoices {
  .alertHeader {
    background-color: #f2f5fa;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    color: @gradeAshOne;
    font-weight: normal;
    .alertHeaderText::before {
      content: '';
      width: 3px;
      height: 17px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      background-color: @gradeBlueOne;
      position: relative;
      top: -0.7px;
    }
  }
  .main {
    .remarkInvoices-form {
      padding-top: @num20;
      font-size: 0;
      .remarkInvoices-form-row {
        padding: 0 @num20;
        height: 30px;
        & > .ivu-form-item-label {
          padding: @num10 @num10 0 0;
          text-align: justify;
          &::after {
            content: '';
            display: inline-block;
            width: 100%;
            overflow: hidden;
            height: 0%;
          }
          &::before {
            display: none;
          }
        }
        &.ivu-form-item {
          margin-bottom: @num20;
        }
      }
    }
    .one {
      display: inline-block;
    }
    .one:nth-of-type(1) {
      .ivu-form-item-content {
        width: 300px;
      }
    }
    .one:nth-of-type(2) {
      padding-left: 0 !important;
      .ivu-form-item-content {
        width: 220px;
      }
    }
    .two {
      display: inline-block;
    }
    .ivu-form-item:nth-of-type(3) {
      padding-left: 0 !important;
      .ivu-form-item-content {
        width: 200px;
      }
    }
    .ivu-form-item:nth-of-type(4) {
      padding-left: 0 !important;
      .ivu-form-item-content {
        width: 877px;
      }
    }
    .proExam-box {
      margin: 0 @num20 @num20 @num20;
      .proExam-box-header {
        height: 50px;
        line-height: 48px;
        position: relative;
        .btns-right {
          display: inline-block;
          position: absolute;
          right: @num20;
          Button{
            margin-left: 6px;
          }
        }
        .header-text {
          margin-left: @num20;
          font-size: 12px;
          color: #6c6c6c;
          letter-spacing: 0.92px;
        }
      }
      >.proExam-box-body {
        height: 305px;
        overflow: hidden;
        .ivu-select-dropdown{
          max-height:120px;
        }
        .enter{
          width: 100%;
          height:40px;
          color: #B3B3B3;
          line-height:40px;
          background: #ffffff;
        }
        .enter:hover{
          color:#008CEE;
        }
        .ivu-table-fixed::before, .ivu-table-fixed-right::before {
          height:0px;
        }
        .ivu-table-fixed-header{
          width:54px;
        }
        .ivu-table-fixed-body{
          max-height:260px;
        }
        .ivu-table-fixed-right,
        .ivu-table-fixed-body table colgroup col {
          width: 46px !important;
        }
        .ivu-select-selection{
          border:none;
          border-radius: 0%;
          height:40px;
          line-height: 40px;
          span{
            height:40px;
            line-height:40px;
          }
        }
      }
    }
  }
  .modelFooter {
    height: 50px;
    Button {
      width: 74px;
      height: 30px;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
  .yuan::after {
    content: '元';
    position: absolute;
    display: inline-block;
    color: @gradeAshThree;
    font-size: 12px;
    top: 7px;
    right: 10px;
  }
  .icon-del {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url('/static/icons/public/table-hover-del.svg') no-repeat;
    font-size: 12px;
    position: relative;
    top: 3px;
  }
  .table-del {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url('/static/icons/public/table-del.svg') no-repeat;
    font-size: 12px;
    position: relative;
    top: 3px;
  }
  .table-input > .ivu-input {
    border-color: transparent;
    border-radius: 0 !important;
    height: 39px !important;
    text-align: center;
    // outline: 1px solid red;
  }
  .table-input > .ivu-input:hover {
    border-color: @gradeBlueTwo;
  }
  // =======对iview进行修改=======
  .ivu-table-row {
    // border-bottom: 1px solid red!important;
    height: 40px;
    td:nth-of-type(1),
    td:nth-of-type(2),
    td:nth-of-type(3),
    td:nth-of-type(4),
    td:nth-of-type(5),
    td:nth-of-type(6) {
      padding: 0;
      background: #f4f4f4;
    }
    td {
      padding: 0 !important;
      // height: 40px;
      // width: 100%;
      // height: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid #d9d9d9 !important;
      .ivu-table-cell {
        padding: 0;
      }
    }
  }
}
</style>
