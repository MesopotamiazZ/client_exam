<template>
  <div class="multiExam-addModal">
    <Modal
        width="682"
        :class="maxheight"
        :value="true"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            headerText="编辑组合项目"
            :headerVal="curTotal"
            @alert-retrun-num="getSort">
          </alert-header>
        </div>
        <div class="body">
          <div class="tab-nav clearfix">
            <div class="nav fl" :class="{active:curIndex===index}" v-for="(item,index) in navlist" @click="curIndex=index">
              <span>{{item}}</span>
            </div>
          </div>
          <div class="tab-content paddingT20 overflowAuto">
            <div class="tab0" v-show="curIndex===0" :key="0">
              <Form
                ref="form"
                :model="formData"
                :rules="rulesForm">
                <div class="row clearfix">
                  <div class="item fl clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30" style="width:97px;">项目类别</span>
                    <FormItem prop="item_type_id" class="fl">
                      <Select
                        filterable
                        v-model="formData.item_type_id"
                        style="width:287px;"
                        placeholder=""
                        :class="{selectionRequired:isEmpty(formData.item_type_id)}">
                        <Option v-for="item in proTypeOptions" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                  </div>
                  <div class="item fr clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30" style="width:48px;">适用性别</span>
                    <FormItem prop="sex" class="fl">
                      <Select
                        filterable
                        v-model="formData.sex"
                        style="width:160px;"
                        placeholder=""
                        :class="{selectionRequired:isEmpty(formData.sex)}">
                        <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                  </div>
                </div>
                <div class="row clearfix">
                  <div class="item fl clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30" style="width:97px;">组合项目名称</span>
                    <FormItem prop="name" class="fl">
                      <Input v-model="formData.name" style="width:287px" :class="{inputRequired:isEmpty(formData.name)}"></Input>
                    </FormItem>
                  </div>
                  <div class="item fr clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30" style="width:48px;">小结类型</span>
                    <FormItem prop="summary_type" class="fl">
                      <Select
                        filterable
                        v-model="formData.summary_type"
                        style="width:160px;"
                        placeholder=""
                        :class="{selectionRequired:isEmpty(formData.summary_type)}">
                        <Option v-for="item in summary_typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                  </div>
                </div>
                <div class="row clearfix">
                  <div class="item fl clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30" style="width:97px;">报告显示名称</span>
                    <FormItem prop="report_name" class="fl">
                      <Input v-model="formData.report_name" style="width:287px" :class="{inputRequired:isEmpty(formData.report_name)}"></Input>
                    </FormItem>
                  </div>
                  <div class="item fr clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30" style="width:48px;">费用类别</span>
                    <FormItem prop="charge_category_id" class="fl">
                      <Select
                        filterable
                        v-model="formData.charge_category_id"
                        style="width:160px;"
                        placeholder=""
                        :class="{selectionRequired:isEmpty(formData.charge_category_id)}">
                        <Option v-for="item in chargeTypeOptions" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                  </div>
                </div>
                <div class="row clearfix">
                  <div class="item fl clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30" style="width:97px;">异常结果汇总方式</span>
                    <FormItem prop="abn_summary_mode" class="fl">
                      <Select
                        filterable
                        v-model="formData.abn_summary_mode"
                        style="width:287px;"
                        placeholder=""
                        :class="{selectionRequired:isEmpty(formData.abn_summary_mode)}">
                        <Option v-for="item in abn_summary_modeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                  </div>
                  <div class="item fr clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30" style="width:48px;">标准价格</span>
                    <FormItem prop="price" class="fl">
                      <z-input type="number" class="yuan" v-model="formData.price" style="width:160px" :class='{inputRequired: isEmpty(formData.price)}'></z-input>
                    </FormItem>
                  </div>
                </div>
                <div class="row clearfix">
                  <div class="item fl clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30" style="width:97px;">指引单名称</span>
                    <FormItem prop="guide_name" class="fl">
                      <Select
                        filterable
                        v-model="formData.guide_name"
                        style="width:287px;"
                        placeholder=""
                        :class="{selectionRequired:isEmpty(formData.guide_name)}">
                        <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                  </div>
                  <div class="item fr clearfix">
                    <span class="textJustify fl lineH30 marginR10 height30" style="width:48px;">检查用时</span>
                    <FormItem class="fl">
                      <z-input type="number" class="minute" v-model="formData.exam_time" style="width:160px"></z-input>
                    </FormItem>
                  </div>
                </div>
                <div class="row displayflex">
                  <span class="textJustify lineH30 marginR10 height30" style="width:97px;margin-top:3px;">指引单显示内容</span>
                  <FormItem class="flex1">
                    <Input v-model="formData.guide_content" type="textarea" :maxlength="255" :row="2"></Input>
                  </FormItem>
                </div>
                <div class="row displayflex">
                  <span class="textJustify lineH30 marginR10 height30" style="width:97px;margin-top:3px;">默认小结内容</span>
                  <FormItem class="flex1">
                    <Input v-model="formData.default_summary" type="textarea" :maxlength="255" :row="2"></Input>
                  </FormItem>
                </div>
                <div class="row displayflex">
                  <span class="textJustify lineH30 marginR10 height30" style="width:97px;margin-top:3px;">备注</span>
                  <Input class="flex1" v-model="formData.remark" type="textarea" :maxlength="255" :row="2"></Input>
                </div>
                <div class="clearfix marginT15">
                  <span class="fl marginR20">最后修改人：{{rowData&&rowData.operater}}</span>
                  <span class="fl">最后修改时间：{{updated_at}}</span>
                </div>
              </Form>
            </div>
            <div class="tab1" v-show="curIndex===1" :key="1">
              <custom-transfer
                v-model="itemTarget"
                :showing="curIndex===1"
                :listWidth="'280px'"
                :listHeight="'400px'"
                :columns="itemColumns"
                :sourceData="allItems"
                :moveAll="true">
              </custom-transfer>
            </div>
            <div class="tab2" v-show="curIndex===2" :key="2">
              <custom-transfer
                v-model="surchargesTarget"
                :showing="curIndex===2"
                :listWidth="'280px'"
                :listHeight="'400px'"
                :columns="surchargesColumns"
                :sourceData="surcharges"
                :moveAll="true">
              </custom-transfer>
            </div>
            <div class="tab3" v-show="curIndex===3" :key="3">
              <custom-transfer
                v-model="excludesTarget"
                :showing="curIndex===3"
                :listWidth="'280px'"
                :listHeight="'400px'"
                :columns="excludesColumns"
                :sourceData="allPros"
                :select="true"
                :selectTitle="'项目类别'"
                :selectOptions="getProTypeOptions"
                @getSelectValue="getTypeId"
                :moveAll="true">
              </custom-transfer>
            </div>
            <div class="tab4" v-show="curIndex===4" :key="4">
              <span class="lineH30 marginR10 height30 fl">表达式类型</span>
              <Select
                filterable
                v-model="formData.expression_type"
                style="width:320px;"
                placeholder="">
                <Option v-for="item in expression_typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <div class="expression-wrapper border marginT20">
                <div class="head paddingL20 paddingR20">
                  <span class="lineH30 marginR10 height30">表达式内容：</span>
                  <span class="lineH30 marginR10 height30 fontBold" :style="{wordBreak:'break-all'}">{{expression_content}}</span>
                </div>
                <div class="expression-body padding20">
                  <formula :selectData="allItems" :selectColumns="selectColumns" @onChange="onChange"></formula>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="clearfix">
          <Button type="ghost" class="fr marginR20 marginB20" @click="canelAdd">取 消</Button>
          <Button type="primary" class="fr marginR20 marginB20" @click="submitAdd">保 存</Button>
          <template v-if="curIndex===0">
            <Checkbox v-model="formData.status" true-value=1 false-value=0 class="fr marginR20 marginT8" :key="1">启用</Checkbox>
            <Checkbox v-model="formData.is_sample_code" true-value=1 false-value=0 class="fr marginR20 marginT8" :key="2">是否打印条码</Checkbox>
            <Checkbox v-model="formData.is_before_eat" true-value=1 false-value=0 class="fr marginR20 marginT8" :key="3">是否餐前项目</Checkbox>
            <Checkbox v-model="formData.is_has_img" true-value=1 false-value=0 class="fr marginR20 marginT8" :key="4">是否有影像</Checkbox>
          </template>
          <template v-if="curIndex===4">
            <Checkbox v-model="formData.expression_status" true-value=1 false-value=0 class="fr marginR20 marginT8" :key="5">启用</Checkbox>
          </template>
        </div>
      </Modal>
  </div>
</template>
<script>
  import fifters from '@/utils/fifters'
  export default {
    props: {
      rowData: Object,
      data: {
        type: Object,
        default: () => {
          return {}
        },
      },
      proItems: {
        type: Array,
        default: () => {
          return []
        },
      },
      proSurCharges: {
        type: Array,
        default: () => {
          return []
        },
      },
      proExcludes: {
        type: Array,
        default: () => {
          return []
        },
      },
      proTypeOptions: {
        type: Array,
      },
      chargeTypeOptions: {
        type: Array,
      },
      allItems: {
        type: Array,
      },
      surcharges: {
        type: Array,
      },
      allPros: {
        type: Array,
      },
      sort: {
        type: [String, Number],
        default: '',
      },
    },
    data() {
      return {
        expression_content: this.getExpressionContent(),
        selectColumns: [
          {
            title: '单项编号',
            key: 'id',
            width: '40%',
          },
          {
            title: '项目名称',
            key: 'name',
            width: '60%',
          },
        ],
        curTotal: this.sort,
        maxHeight: 400,
        navlist: ['基本信息', '包含单项', '附加费', '排斥组合项目', '表达式'],
        curIndex: 0,
        sexList: [
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
        summary_typeList: [
          {
            value: 1,
            label: '自动',
          },
          {
            value: 2,
            label: '手动',
          },
        ],
        expression_typeList: [
          {
            value: 1,
            label: '运算值',
          },
          {
            value: 2,
            label: '表示值',
          },
        ],
        abn_summary_modeList: [
          {
            value: 1,
            label: '疾病或异常结果（疾病优先）',
          },
          {
            value: 2,
            label: '汇总疾病',
          },
          {
            value: 3,
            label: '汇总异常结果',
          },
          {
            value: 4,
            label: '同时汇总疾病及异常结果',
          },
        ],
        formData: JSON.parse(JSON.stringify(this.data)),
        itemTarget: JSON.parse(JSON.stringify(this.proItems)),
        itemColumns: [
          {
            title: '单项名称',
            key: 'name',
          },
        ],
        surchargesTarget: JSON.parse(JSON.stringify(this.proSurCharges)),
        surchargesColumns: [
          {
            title: '附加费名称',
            key: 'name',
          },
          {
            title: '价格（元）',
            key: 'price',
          },
        ],
        excludesTarget: JSON.parse(JSON.stringify(this.proExcludes)),
        excludesColumns: [
          {
            title: '项目类别',
            key: 'item_type',
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    innerText: params.data.item_type.name,
                  },
                }
              )
            },
            rightRender: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    innerText: params.data.item_type.name,
                  },
                }
              )
            },
          },
          {
            title: '组合项目名称',
            key: 'name',
          },
        ],
        rulesForm: {
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
          sex: [
            {
              validator: (rule, value, callback) => {
                if (typeof value === 'number') {
                  callback()
                } else {
                  callback(new Error('适用性别不能为空'))
                }
              },
            },
          ],
          name: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('组合项目名称不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
          summary_type: [
            {
              validator: (rule, value, callback) => {
                if (typeof value === 'number') {
                  callback()
                } else {
                  callback(new Error('小结类型不能为空'))
                }
              },
            },
          ],
          report_name: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('报告显示名称不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
          charge_category_id: [
            {
              validator: (rule, value, callback) => {
                if (typeof value === 'number') {
                  callback()
                } else {
                  callback(new Error('费用类别不能为空'))
                }
              },
            },
          ],
          abn_summary_mode: [
            {
              validator: (rule, value, callback) => {
                if (typeof value === 'number') {
                  callback()
                } else {
                  callback(new Error('异常结果汇总方式不能为空'))
                }
              },
            },
          ],
          price: [
            {
              validator: (rule, value, callback) => {
                if (value !== null && (value + '').length > 0) {
                  callback()
                } else {
                  callback(new Error('标准价格不能为空'))
                }
              },
              trigger: 'blur',
            },
          ],
          guide_name: [
            {
              validator: (rule, value, callback) => {
                if (typeof value === 'number') {
                  callback()
                } else {
                  callback(new Error('指引单名称不能为空'))
                }
              },
            },
          ],
        },
      }
    },
    computed: {
      maxheight() {
        let style = {
          tab0MaxH: this.curIndex === 0,
          tab1MaxH: this.curIndex === 1,
          tab2MaxH: this.curIndex === 2,
          tab3MaxH: this.curIndex === 3,
          tab4MaxH: this.curIndex === 4,
        }
        return style
      },
      getProTypeOptions() {
        let arr = [
          {
            label: '全部',
            value: -1,
          },
        ]
        this.proTypeOptions.forEach(item => {
          let obj = {
            label: item.name,
            value: item.id,
          }
          arr.push(obj)
        })
        return arr
      },
      updated_at() {
        if (this.rowData && this.rowData.updated_at) {
          return fifters.timeFilter(this.rowData.updated_at, 'YYYY-MM-DD HH:mm')
        } else {
          return ''
        }
      },
    },
    watch: {
      sort(cur) {
        this.curTotal = cur
      },
      proItems(cur) {
        this.itemTarget = JSON.parse(JSON.stringify(cur))
      },
      proSurCharges(cur) {
        this.surchargesTarget = JSON.parse(JSON.stringify(cur))
      },
      proExcludes(cur) {
        this.excludesTarget = JSON.parse(JSON.stringify(cur))
      },
    },
    methods: {
      getExpressionContent() {
        let ids = []
        if (this.data && this.data.expression_content) {
          let re = /\[(\d+)\]/g
          this.data.expression_content.replace(re, function () {
            ids.push(arguments[1])
          })
          let obj = {}
          this.allItems.forEach((item) => {
            obj[item.id] = item
          })
          let str = this.data.expression_content
          ids.forEach(item => {
            str = str.replace(`[${item}]`, obj[item].name)
          })
          return str
        }
        return ''
      },
      isEmpty(value) {
        if (value === '' || (value + '').trim() === '') {
          return true
        }
        return false
      },
      getTypeId(id) {
        if (id === -1) {
          this.$parent.getAllPros(
            {
              with: 'itemType:name',
              per_page: 100000,
              filters: 'status:1',
            }
          )
        } else {
          this.$parent.getAllPros(
            {
              with: 'itemType:name',
              per_page: 100000,
              filters: `item_type_id:${id};status:1`,
            }
          )
        }
      },
      canelAdd() {
        this.$emit('cancel')
      },
      async submitAdd() {
        let val = await this.$refs.form.validate()
        if (!val) {
          this.curIndex = 0
          return
        }
        let itemIds = this.itemTarget.map(item => {
          return item.id
        })
        let chargeIds = this.surchargesTarget.map(item => {
          return item.id
        })
        let excludesIds = this.excludesTarget.map(item => {
          return item.id
        })
        let obj = {
          item_ids: itemIds,
          surcharge_ids: chargeIds,
          exclude_ids: excludesIds,
          ...this.formData,
        }
        this.$emit('submit', obj)
      },
      getSort(val) {
        this.formData.sort = val
      },
      onChange(data, expression, pass) {
        this.formData.expression_content = expression
        this.expression_content = data.map(item => {
          return item.value
        }).join('')
      },
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .multiExam-addModal{
    .border{
      border:1px solid @gradeAshFive;
      border-radius:4px;
    }
    .fontBold{
      font-weight: bold;
    }
    .marginT8{
      margin-top: 8px;
    }
    .displayflex{
      display: flex;
    }
    .flex1{
      flex: 1;
    }
    .overflowAuto{
      overflow: auto;
    }
    .tab0MaxH .ivu-modal{
      max-height: 599px;
    }
    .tab1MaxH .ivu-modal{
      max-height: 599px;
    }
    .tab2MaxH .ivu-modal{
      max-height: 599px;
    }
    .tab3MaxH .ivu-modal{
      max-height: 599px;
    }
    .tab4MaxH .ivu-modal{
      max-height: 599px;
    }
    .body{
      padding: 20px 0;

      .tab-nav{
        margin: 0 20px;
        border-bottom: 1px solid @gradeAshFive;
        .nav{
          margin-right: 30px;
          height: 32px;
          border-bottom:3px solid #fff;
          cursor: pointer;

          span{
            display: block;
            height: 14px;
            line-height: 14px;
            color: @gradeAshThree;
          }
        }

        .nav.active{
          border-bottom:3px solid @gradeBlueOne;
          span{
            font-weight: bold;
            color: @gradeBlueOne;
          }
        }
      }
      .tab-content{
        height: calc(~'100% - 35px');

        &>div{
          padding: 0 20px;
        }
      }
      .expression-wrapper{
        .head{
          border-bottom: 1px solid @gradeAshFive;
        }
      }
    }
  }
</style>