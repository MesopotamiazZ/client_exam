<template>
  <div>
    <!-- 新增 -->
    <Modal v-model="show"
           width="906"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="新增诊断规则"
                      :headerVal="formData.sort"
                      @alert-retrun-num="addSortCtrl"></alert-header>
      </div>
      <Form :model="formData"
            :rules="formRules"
            class="drm-modal-content paddingL20 paddingR20"
            ref="addForm">
        <div class="drm-form-row">
          <div class="drm-row-item drm-item-small">
            <span class="drm-item-label">项目类别</span>
            <FormItem class="marginL10"
                      style="width:146px;"
                      prop="item_type_id">
              <!-- TODO: -->
              <Select v-model="formData.item_type_id"
                      filterable
                      placeholder=" ">
                <Option v-for="item in itemTypes.items"
                        :value="item.id"
                        :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </div>
          <div class="drm-row-item drm-item-large marginL20">
            <span class="drm-item-label">诊断规则名称</span>
            <FormItem class="marginL10"
                      style="width:208px;"
                      prop="name">
              <!-- TODO: -->
              <Input v-model="formData.name"
                     placeholder=" "></Input>
            </FormItem>
          </div>
        </div>
        <div class="drm-form-row">
          <div class="drm-row-item drm-item-small">
            <span class="drm-item-label">诊断结果名称</span>
            <FormItem class="marginL10"
                      style="width:146px;"
                      prop="diagnose_result">
              <Select v-model="formData.diagnose_result"
                      filterable
                      placeholder=" ">
                <Option v-for="item in result.items"
                        :value="item.id"
                        :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </div>
          <div class="drm-row-item drm-item-large marginL20">
            <span class="drm-item-label">性别</span>
            <FormItem class="marginL10"
                      style="width:68px;"
                      prop="sex">
              <Select v-model="formData.sex"
                      placeholder=" ">
                <Option :value="0">通用</Option>
                <Option :value="1">男</Option>
                <Option :value="2">女</Option>
              </Select>
            </FormItem>
            <span class="drm-item-label marginL20">适用年龄段</span>
            <FormItem class="marginL10"
                      style="width:40px;">
              <Input v-model="formData.age_x"
                     number
                     placeholder=" "></Input>
            </FormItem>
            <div class="drm-flex-line"></div>
            <FormItem style="width:40px;"
                      prop="age_y">
              <Input v-model="formData.age_y"
                     number
                     placeholder=" "></Input>
            </FormItem>
          </div>
        </div>
        <div class="drm-table-wrapper marginB20">
          <content-header fontSize="12"
                          height="40px">
            <div slot="title">规则内容</div>
            <div slot="other">123</div>
            <div slot="contents"
                 class="header-content-wrapper paddingR20">
              <div @click="delAllRules">全部删除</div>
              <div @click="delSelectionRule">删除选中</div>
              <div @click="cleanSelectionRule">清空选中</div>
              <div @click="insartRule">插入</div>
            </div>
          </content-header>
          <!-- <div class="">

          </div> -->
          <div ref="tableWrapper"
               class="drm-table">
            <div class="x-modal-table-wrapper">
              <Table v-if="formData.rules"
                     :data="formData.rules"
                     :columns="columnsArr"
                     :highlight-row="true"
                     :height="228" @on-row-click="clickRow"></Table>
              <!-- <modal-table @clickItem="clickItem"
                         :data="rules"></modal-table> -->

              <!-- header -->
              <!-- <div class="xmt-header">
                <div class="xmt-cell1">前置括弧</div>
                <div class="xmt-cell2">项目/表达式/既往病史</div>
                <div class="xmt-cell3">运算符</div>
                <div class="xmt-cell4">参考值</div>
                <div class="xmt-cell5">后置括弧</div>
                <div class="xmt-cell6">关系</div>
              </div> -->
              <!-- body -->
              <!-- <div class="xmt-body">
                <div class="xmt-highlight"
                       v-show="showHighlight"
                       ref="highlight"></div>
                <div class="xmt-tr"
                     v-for="(item,index) in formData.rules"
                     :key="item.id"
                     @click="clickRow(index)"
                     ref="row">
                  
                  <div class="xmt-cell1 cell">
                    <Select placeholder="" v-model="item.prep_bracket">
                      <Option value="(">(</Option>
                      <Option value="((">((</Option>
                      <Option value="(((">(((</Option>
                      <Option value="((((">((((</Option>
                      <Option value="(((((">(((((</Option>
                    </Select>
                  </div>
                  <div class="xmt-cell2 cell">
                    <div @click="clickItem"
                         class="xmt-project-cell">
                         <span v-if="item.express">{{item.express}}</span>
                         <span v-else class="place">请输入</span>
                         </div>
                  </div>
                  <div class="xmt-cell3 cell">
                    <Select placeholder="" v-model="item.operator">
                      <Option value="IN">包含</Option>
                      <Option value=">">></Option>
                      <Option value=">=">>=</Option>
                      <Option value="<"><</Option>
                      <Option value="<="><=</Option>
                    </Select>
                  </div>
                  <div class="xmt-cell4 cell">
                    <Input placeholder="请输入" v-model="item.reference_value"></Input>
                  </div>
                  <div class="xmt-cell5 cell">
                    <Select placeholder="" v-model="item.end_bracket">
                      <Option value=")">)</Option>
                      <Option value="))">))</Option>
                      <Option value=")))">)))</Option>
                      <Option value="))))">))))</Option>
                      <Option value=")))))">)))))</Option>
                    </Select>
                  </div>
                  <div class="xmt-cell6 cell">
                    <Select placeholder="" v-model="item.logic_relation">
                      <Option value="AND">并且</Option>
                      <Option value="OR">或者</Option>
                    </Select>
                  </div>
                </div>
              </div> -->
            </div>
            <!-- <q-table
              ref="table"
              :ifEdit="false"
              :isShowSelectOrIndex="false"
              :showOperateColumn="false"
              :ifShowPagination="false"
              :isBorder="true"
              :selectMode="false"
              :height="tableHeight"
              :columns="tableColumns"
              :data="tableData"
              :params="tableParams"
              :pageInfo="tableInfo"
              :initReq="false"
              >
            </q-table> -->
            <!--   @edit="tableEdit"
              :requestDataApi="getDiagnoseRules"

              @edit-row="tableRowEdit"
              @delete="tableDelete"
              @delete-row="tableRowDelete"
              @on-select="tableSelectRow"
              @on-select-cancel="tableCancelSelectRow"
              @on-select-all="tableSelectAll"
              @all-selection="tableAllSelection"
              @on-selection-change="tableSelectionChange"
              @on-row-click="tableClickRow" -->
          </div>
        </div>
        <div class="drm-form-textarea marginB20">
          <span class="drm-item-label"
                style="width:72px;">备注</span>
          <FormItem class="drm-flex1 marginL10">
            <Input type="textarea"
                   :autosize="{minRows: 1,maxRows: 2}"
                   v-model="formData.remark"></Input>
          </FormItem>
        </div>
      </Form>
      <div slot="footer">
        <div class="drm-modal-footer">
          <Checkbox v-model="formData.status">启用</Checkbox>
          <Button @click="addFormSave"
                    type="primary"
                    class="marginR20">保 存</Button>
          <Button @click="addFormCancel"
                    type="ghost">取 消</Button>
        </div>
      </div>
    </Modal>
    <card-modal ref="cardModal"
                :show="showCard"
                @visibleChange="cardVisibleChange"
                @on-change="cardChange"></card-modal>
    <!-- <Modal
      v-model="showCard"
      :transition-names='[]'
      :mask-closable="false"
      :transfer='false'
      :closable="true">
      <div slot="header" class="">头</div>
      <div slot="close" class="">关闭</div>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <div slot="footer">1234</div>
    </Modal> -->
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import contentHeader from '@/components/contentHeader'
import inlineSelect from './inlineSelect'
import modalTable from './modalTable'
import cardModal from './cardModal'
export default {
  components: {
    contentHeader,
    inlineSelect,
    modalTable,
    cardModal,
  },
  props: {
    show: {
      default: false,
    },
    data: {
      default: function() {
        return {
          sortValue: 0,
          status: 1,
          item_type_id: '',
          // ruleName: '',
          sex: 0,
          age_x: '',
          age_y: '',
          name: '',
          diagnose_result: '',
          remark: '',

          rules: [
            {
              id: 0,
              prep_bracket: '',
              end_bracket: '',
              logic_relation: '',
              reference_value: '',
              operator: '',
              relate_id: 0,
              relate_type: 0,
            },
          ],
        }
      },
    },
  },
  data() {
    // const itemTypeValidator = (rule, value, callback, source, options) => {
    //   if (value.toString().length <= 0) {
    //     callback(new Error('项目类别不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    // const nameValidator = (rule, value, callback, source, options) => {
    //   if (value.toString().length <= 0) {
    //     callback(new Error('诊断规则名称不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    // const resultValidator = (rule, value, callback, source, options) => {
    //   if (value.toString().length <= 0) {
    //     callback(new Error('诊断结果名称不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    // const sexValidator = (rule, value, callback, source, options) => {
    //   if (value.toString().length <= 0) {
    //     callback(new Error('适用性别不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    const ageValidator = (rule, value, callback, source, options) => {
      // console.log(rule, value)
      if (
        this.formData.age_x.toString().length > 0 &&
        value.toString().length <= 0
      ) {
        if (Number(value) > Number(this.formData.age_x)) {
          callback(new Error(' '))
        }
        // callback(new Error('需填写年龄段'))
        callback(new Error(' '))
      } else {
        callback()
      }
    }
    return {
      // form
      formData: {
        sortValue: 0,
        status: 1,
        itemType: '',
        ruleName: '',
        sex: '',
        age_x: '',
        age_y: '',
        name: '',
        rules: [{}],
      },
      columnsArr: [
        {
          title: '前置括弧',
          key: 'prep_bracket',
          render: (h, params) => {
            // console.log('in table', this.formData.rules[params.index].prep_bracket)
            return h(
              'Select',
              {
                props: {
                  placeholder: ' ',
                  value: this.formData.rules[params.index].prep_bracket,
                },
                on: {
                  'on-change': (event) => {
                    // console.log('失1焦', event)
                    this.formData.rules[params.index].prep_bracket = event
                  },
                },
              },
              [
                h('Option', {
                  props: {
                    value: '(',
                    label: '(',
                  },
                }),
                h('Option', {
                  props: {
                    value: '((',
                    label: '((',
                  },
                }),
                h('Option', {
                  props: {
                    value: '(((',
                    label: '(((',
                  },
                }),
                h('Option', {
                  props: {
                    value: '((((',
                    label: '((((',
                  },
                }),
                h('Option', {
                  props: {
                    value: '(((((',
                    label: '(((((',
                  },
                }),
              ],
            )
          },
          // },
        },
        {
          title: '项目/表达式/既往病史',
          width: 336,
          key: 'express',
          render: (h, params) => {
            const that = this
            return h(
              'div',
              {
                on: {
                  click: this.clickItem,
                },
                class: 'xmt-project-cell',
              },
              [
                h('span', {
                  style: {
                    display: that.formData.rules[params.index].express ? 'inline' : 'none',
                  },
                }, that.formData.rules[params.index].express),
                h('span', {
                  style: {
                    display: that.formData.rules[params.index].express ? 'none' : 'inline',
                  },
                  class: 'place',
                }, '请输入'),
              ])
          },
        },
        // },
        {
          title: '运算符',
          key: 'operator',
          render: (h, params) => {
            return h('Select', {
              props: {
                placeholder: ' ',
                value: this.formData.rules[params.index].operator,
              },
              on: {
                'on-change': (event) => {
                  // console.log('失1焦', event)
                  this.formData.rules[params.index].operator = event
                },
              },
            },
              [
                h('Option',
                  {
                    props: {
                      value: 'IN',
                    },
                  }, '包含'),
                h('Option',
                  {
                    props: {
                      value: '>',
                    },
                  }, '>'),
                h('Option',
                  {
                    props: {
                      value: '>=',
                    },
                  }, '>='),
                h('Option',
                  {
                    props: {
                      value: '<',
                    },
                  }, '<'),
                h('Option',
                  {
                    props: {
                      value: '<=',
                    },
                  }, '<='),
              ])
          },
        },
        {
          title: '参考值',
          key: 'reference_value',
          render: (h, params) => {
            return h('Input', {
              props: {
                placeholder: '请输入',
                value: this.formData.rules[params.index].reference_value,
              },
              on: {
                'on-change': (event) => {
                  // console.log('失1焦', event)
                  this.formData.rules[params.index].reference_value = event.target.value
                },
              },
            })
          },
        },
        {
          title: '后置括弧',
          key: 'end_bracket',
          render: (h, params) => {
            return h(

              'Select',
              {
                props: {
                  placeholder: ' ',
                  value: this.formData.rules[params.index].end_bracket,
                },
                on: {
                  'on-change': (event) => {
                    // console.log('失1焦', event)
                    this.formData.rules[params.index].end_bracket = event
                  },
                },
              },
              [
                h('Option', {
                  props: {
                    value: ')',
                    label: ')',
                  },
                }),
                h('Option', {
                  props: {
                    value: '))',
                    label: '))',
                  },
                }),
                h('Option', {
                  props: {
                    value: ')))',
                    label: ')))',
                  },
                }),
                h('Option', {
                  props: {
                    value: '))))',
                    label: '))))',
                  },
                }),
                h('Option', {
                  props: {
                    value: ')))))',
                    label: ')))))',
                  },
                }),
              ],
            )
          },
        },
        {
          title: '关系',
          key: 'logic_relation',
          render: (h, params) => {
            return h('Select', {
              props: {
                placeholder: ' ',
                value: this.formData.rules[params.index].logic_relation,
              },
              on: {
                'on-change': (event) => {
                  // console.log('失1焦', event)
                  this.formData.rules[params.index].logic_relation = event
                },
              },
            }, [
              h('Option', {
                props: {
                  value: 'AND',
                },
              }, '并且'),
              h('Option', {
                props: {
                  value: 'OR',
                },
              }, '或者'),
            ])
          },
        },
      ],
      // TODO:
      formRules: {
        item_type_id: [
          // {
          //   validator: itemTypeValidator,
          //   // message: '经济类型名称为必填',
          //   trigger: ['change', 'blur'],
          // },

          {
            required: true,
            type: 'number',
            message: '项目类别不能为空',
            trigger: 'change',
          },
        ],
        name: [
          // {
          //   validator: nameValidator,
          //   // message: '经济类型名称为必填',
          //   trigger: 'change',
          // },
          {
            required: true,
            type: 'string',
            message: '诊断规则名称不能为空',
            trigger: 'change',
          },
        ],
        diagnose_result: [
          // {
          //   validator: resultValidator,
          //   // message: '经济类型名称为必填',
          //   trigger: 'change',
          // },
          {
            required: true,
            type: 'number',
            message: '诊断结果名称不能为空',
            trigger: 'change',
          },
        ],
        sex: [
          // {
          //   validator: sexValidator,
          //   // message: '经济类型名称为必填',
          //   trigger: 'change',
          // },
          {
            required: true,
            type: 'number',
            message: '适用性别不能为空',
            trigger: 'change',
          },
        ],
        age_y: [
          {
            validator: ageValidator,
            // message: '经济类型名称为必填',
            trigger: 'change',
          },
          // {
          //   required: true,
          //   message: ' ',
          //   trigger: 'change',
          // },
        ],
        // pName: [
        //   {
        //     validator: nameValidator,
        //     message: '上级经济类型名称为必填',
        //     trigger: 'change',
        //   },
        // ],
      },
      // table
      showHighlight: false,
      tableHeight: 240,
      selectionRow: -1,
      // 表达式
      express: '',
      tableColumns: [
        {
          title: '前置括弧',
          minWidth: 100,
          render: (h, p) => {
            return h(inlineSelect, {}, [])
          },
        },
        {
          title: '项目/表达式/既往病史',
          minWidth: 320,
        },
        {
          title: '运算符',
          minWidth: 60,
        },
        {
          title: '参考值',
          minWidth: 170,
        },
        {
          title: '后置括弧',
          minWidth: 100,
        },
        {
          title: '关系',
          minWidth: 100,
        },
      ],

      tableParams: {},
      // card
      showCard: false,
    }
  },
  computed: {
    ...mapState('diagnosticRuleManagementModule', [
      'itemTypes',
      'diagnoseRules',
      'result',
    ]),
    tableInfo() {
      return {}
    },
  },
  async created() {
    this.formData = _.cloneDeep(this.data)
    this.formData.sort = _.cloneDeep(this.diagnoseRules.meta.total + 1)
    // console.log('formData', this.diagnoseRules.meta.total)

    await this.getResult({ per_page: '100000' })
    // console.log('结果数据', this.result)
  },
  mounted() {
    // this.setTableHeight()
  },
  methods: {
    ...mapActions('diagnosticRuleManagementModule', ['getResult']),

    addFormCancel() {
      this.$emit('on-cancel')
    },
    async addFormSave() {
      // console.log('result', this.formData, this.express)
      // TODO: 接口
      // console.log()
      if (await this.$refs.addForm.validate()) {
        this.$emit('on-affirm', this.formData)
      }
      // this.addDiagnoseRules({})
    },
    addSortCtrl(val) {
      this.formData.sort = Number(val)
    },
    addFormInputName(val) {
      // console.log('输入值：', val)
      // this.add.formData.name = val
    },
    addFormInputSelect(data) {
      // console.log(data)
      this.add.formData.code = data.code
    },
    // table
    // 设置表格高度
    setTableHeight() {
      this.tableHeight = this.$refs.tableWrapper.offsetHeight
      // console.log(this.$refs.tableWrapper.offsetHeight)
    },
    // table
    clickItem() {
      // console.log('接收emit')
      this.$refs.cardModal.init()
      this.showCard = true
    },
    ctrlHightlight(i) {
      // this.$refs.highlight.style.top = this.$refs.row[i].offsetTop + 'px'
      let arr = document.querySelectorAll('.xmt-tr')
      this.$refs.highlight.style.top = arr[i].offsetTop + 'px'
      // console.log(this.$refs.row[i], i)
      this.showHighlight = true
    },
    clickRow(data, i) {
      // console.log(i)
      // this.ctrlHightlight(i)
      this.selectionRow = i
      return this.formData.rules[i]
    },
    cardVisibleChange(val) {
      // console.log('cardVisibleChange', val)
      this.showCard = val
    },
    cardChange(val, type, label) {
      // TODO:
      // console.log('选中行为', this.selectionRow, this.formData.rules)
      this.formData.rules[this.selectionRow].relate_type = type
      // FIXME: 提交后台时如果type为3，则将id写在express字段下
      this.formData.rules[this.selectionRow].relate_id = val
      this.formData.rules[this.selectionRow].express = label
      this.showCard = false
    },
    delAllRules() {
      this.formData.rules = []
    },
    delSelectionRule() {
      // this.formData.rules[this.selectionRow]
      // this.$refs.highlight.style.top = '-200px'
      this.formData.rules.splice(this.selectionRow, 1)
    },
    cleanSelectionRule() {
      // console.log('选中行', this.formData.rules[this.selectionRow])
      // this.$set(this, this.formData.rules[this.selectionRow], {
      //   id: '',
      //   prep_bracket: '',
      //   express: '',
      //   operator: '',
      //   reference_value: '',
      //   end_bracket: '',
      //   logic_relation: '',
      // })
      this.formData.rules[this.selectionRow].id = ''
      this.formData.rules[this.selectionRow].prep_bracket = ''
      this.formData.rules[this.selectionRow].express = ''
      this.formData.rules[this.selectionRow].operator = ''
      this.formData.rules[this.selectionRow].reference_value = ''
      this.formData.rules[this.selectionRow].end_bracket = ''
      this.formData.rules[this.selectionRow].logic_relation = ''

      // this.formData.rules[this.selectionRow] = {
      //   id: '',
      //   prep_bracket: '',
      //   express: '',
      //   operator: '',
      //   reference_value: '',
      //   end_bracket: '',
      //   logic_relation: '',
      // }
    },
    insartRule() {
      if (this.selectionRow === -1) {
        this.formData.rules.push({})
      } else {
        this.formData.rules.splice(this.selectionRow, 0, {
          id: '',
          prep_bracket: '',
          express: '',
          operator: '',
          reference_value: '',
          end_bracket: '',
          logic_relation: '' })
      }
      // console.log(this.formData.rules)
    },
  },
}
</script>

<style lang="less">
.diagnostic-rule-management {
  .drm-modal-content {
    padding-top: 20px;
    color: #737373;
    .drm-form-row {
      display: flex;
      align-items: center;
      // & > span {
      //   height: 30px;
      //   line-height: 30px;
      //   margin-bottom: 20px;
      // }
      // > div > span{
      //   height: 30px;
      //   line-height: 30px;
      //   margin-bottom: 20px;
      // }
    }
    .drm-row-item {
      display: flex;
      justify-content: flex-end;
      // align-items:center;
    }
    .drm-table-wrapper {
      display: flex;
      flex-direction: column;
      height: 280px;
      border: 1px solid #d9d9d9;
      // FIXME: overf h
      // overflow: hidden;
      border-radius: 8px;
    }
    .header-content-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;

      > div {
        cursor: pointer;
        margin-left: 20px;
        color: #008cee;
      }
    }
    .drm-table {
      flex: 1;
    }
    .x-modal-table-wrapper {
      width: 100%;
      height: 100%;

      .xmt-header {
        display: flex;
        height: 40px;
        width: 100%;
        background: rgb(215, 233, 255);

        > div {
          // flex: 1;
          text-align: center;
          line-height: 40px;
          font-weight: 500;
          color: #111;
          box-sizing: border-box;
          border-right: 1px solid #ccc;
        }
        > div:last-child {
          border: none;
        }
      }
      .xmt-body {
        position: relative;
        // overflow-y: scroll;
        height: ~'calc(100% - 50px)';
        .xmt-tr {
          display: flex;
          > .cell:first-child {
            padding-left: 2px;
          }
          > .cell {
            // flex: 1;
            text-align: center;
            line-height: 40px;
            font-weight: 500;
            color: #111;
            box-sizing: border-box;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
          }
          > .cell:nth-child(2) {
            padding-left: 2px;
          }
          > .cell:last-child {
            border-right: none;
            padding-right: 2px;
          }
        }
      }
      .xmt-highlight {
        position: absolute;
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        border: 2px solid #008cee;
      }
      .xmt-project-cell {
        position: relative;
        cursor: pointer;
        z-index: 2;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .place {
          color: #ccc;
        }
      }
      .flex1 {
        flex: 1;
      }
      .xmt-cell1 {
        min-width: 100px;
      }
      .xmt-cell2 {
        flex: 1;
        width: 1px;
      }
      .xmt-cell3 {
        min-width: 80px;
      }
      .xmt-cell4 {
        min-width: 170px;
        text-align: center;
        .ivu-input {
          text-align: center;
        }
      }
      .xmt-cell5 {
        min-width: 100px;
      }
      .xmt-cell6 {
        min-width: 100px;
      }
    }
    .drm-form-textarea {
      display: flex;
    }
    .drm-form-row-height-label {
      padding-top: 7px;
      line-height: 20px;
    }
    .drm-form-row-height {
      display: flex;
      height: 60px;
    }
    .drm-flex1 {
      flex: 1;
    }
    .drm-item-label {
      // width: 96px;
      overflow: hidden;
      text-align: justify;
      text-align-last: justify;
      height: 30px;
      line-height: 30px;
      margin-bottom: 20px;
    }
    .drm-item-large {
      width: 290px;
    }
    .drm-item-small {
      width: 228px;
    }
    .drm-flex-line {
      display: flex;
      flex: 1;
      align-items: center;
      height: 30px;
      padding: 0 4px;
      // background:#ccc;
    }
    .drm-flex-line:after {
      content: '';
      flex: 1;
      height: 1px;
      background: #ccc;
    }
    .drm-operator {
      line-height: 12px;
    }
  }
  .drm-modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // height: 50px;
    padding-right: 20px;
    padding-bottom: 20px;
    & > label {
      margin-right: 20px;
    }
  }
}
</style>

<style lang="less">
.x-modal-table-wrapper {
  // 覆盖样式
  // .ivu-input, .ivu-select-input, .ivu-input-icon, .ivu-select-single .ivu-select-selection{
  //   height:38px;
  //   line-height:38px;
  // }
  .ivu-select-item{
    height: 32px;
    line-height:32px;
  }
  .ivu-select-dropdown{
      position: fixed!important;
    }
  .ivu-table-wrapper{
      position: static!important;
    }
  // .ivu-table-row-hover {
    .ivu-table-row:hover{
    .ivu-select-selection {
      // background: ~'var(--auxiliaryColot-table-hover)';
      // background:rgb(235,247,255);
      background:rgb(223,240,255);
      
    }
    .ivu-input {
      // background:rgb(235,247,255);
      background:rgb(223,240,255);
      // background:red;
      
      // background: ~'var(--auxiliaryColot-table-hover)';
    }
  }
  .ivu-table-row-highlight {
    .ivu-select-selection {
      background:rgb(235,247,255);
      // background-color: #ebf7ff;
    }
    .ivu-input {
      background:rgb(235,247,255);
      // background-color: #ebf7ff;
    }
  }
  .ivu-select-selection {
    border: none;
    box-shadow: none;
  }
  .ivu-input {
    border: none;
    box-shadow: none;
    text-align:center;
  }
}
</style>