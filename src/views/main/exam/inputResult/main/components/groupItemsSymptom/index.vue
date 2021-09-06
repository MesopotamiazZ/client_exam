<template>
  <div class="group-items-symptom-outer-wrapper">
    <div class="group-items-symptom-wrapper">
      <div class="group-items-header">
        <div class="fl group-items-left font16">
          <span>问诊症状</span>
        </div>
        <div class="fr group-items-right">
          <Button type="text"
                  @click="clearAll"
                  class="clear-all">全部清空</Button>
          <div class="inquiry-search">
            <!-- <local-search-input></local-search-input> -->
            <Input v-model="inquiryItemValue"
                   icon="ios-search"
                   placeholder="请输入..."
                   @on-keyup="searchInquirySymptom"
                   style="width: 160px;"></Input>
          </div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <!-- 分割线 -->
      <div class="seperate-line"></div>
      <!-- body信息  -->
      <!-- 问诊症状 -->
      <div class="group-items-body inquiry-items">
        <Row>
          <Col v-for="(item, index) in allInquirySymptom"
               span="2"
               :key="index">
          <inquiry-item :isEmphases="!!item.is_important"
                        :inquiryData="item"
                        :ref="'inquiryItem'+index"
                        @add-inquiry-symptom="handleAddInquirySymptom(item, index, $event)"
                        @handle-click="handleClick(item, index, $event)"></inquiry-item>

          </Col>
        </Row>
        <!-- 问诊症状弹框 -->
        <div class="inquiry-edit-box"
             style="box-shadow: 0 2px 10px #ddd;">
          <div class="box-body">
            <div class="item">
              <div class="title">程度
                <span>*</span>
                <span v-if="validate">请选择程度</span>
              </div>
              <div class="content">
                <input @click="chooseLevel"
                       :class="{'symptom-level':true, 'active': inquiry.degree==='+-'}"
                       type="button"
                       value="+-" />
                <input @click="chooseLevel"
                       :class="{'symptom-level':true, 'active': inquiry.degree==='+'}"
                       type="button"
                       value="+" />
                <input @click="chooseLevel"
                       :class="{'symptom-level':true, 'active': inquiry.degree==='++'}"
                       type="button"
                       value="++" />
                <input @click="chooseLevel"
                       :class="{'symptom-level':true, 'active': inquiry.degree==='+++'}"
                       type="button"
                       value="+++" />
              </div>
            </div>
            <div class="item">
              <div class="title">出现日期</div>
              <div class="content">
                <DatePicker @on-change="handleSymptomOccur"
                            :value="inquiry.appear_time"
                            format="yyyy-MM-dd"
                            type="date"
                            placement="top"
                            placeholder="请选择日期"></DatePicker>
              </div>
            </div>
            <div class="item">
              <div class="title">备注</div>
              <div class="content">
                <textarea :rows="4"
                          v-model="inquiry.remark"
                          class="remarks"></textarea>
              </div>
            </div>
            <div class="footer">
              <Button class="btn"
                      type="primary"
                      @click="confirmInquiry">确定</Button>
              <Button class="btn"
                      type="ghost"
                      @click="cancelInquiry">取消</Button>
            </div>
          </div>
        </div>
        <!-- 问诊症状弹框 - end -->
      </div>
    </div>
    <!-- 自觉症状 -->
    <div class="group-items-symptom-wrapper">
      <div class="group-items-header">
        <div class="fl group-items-left font16">
          <span>自觉症状</span>
        </div>
        <div class="fr marginR15">
          <Button type="ghost"
                  @click="addNewSelfSympton">新增</Button>
        </div>
        <div style="clear:both;"></div>
      </div>
      <!-- 分割线 -->
      <div class="seperate-line"></div>
      <!-- body信息  -->
      <div class="group-items-body">
        <div class="self-feeling">
          <Table stripe
                 no-data-text=""
                 :columns="columns1"
                 :data="selfFeelingData"></Table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import inquiryItem from './inquiryItem'
import LocalSearchInput from '@/components/localSearchInput'
import { mapActions } from 'vuex'
// import { copy } from '@/utils/helper'
// import InquiryEditBox from './inquiryEditBox'
export default {
  components: {
    inquiryItem,
    // InquiryEditBox,
    LocalSearchInput,
  },
  props: {
    // 组合项目表格的内容
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    const that = this
    return {
      show: true,
      inquiryEditBoxEl: null,
      inquiryItemValue: '', // 搜索的关键字
      inquiryKey: ['degree', 'appear_time', 'remark'],
      inquiry: {
        degree: '',
        appear_time: '',
        remark: '',
      },
      tempSymptomItem: {},
      allInquirySymptom: [], // 所有问诊症状
      allInquirySymptomCopy: [], // 所有问诊症状复制
      filterInquirySymptom: [], // 搜索出来的问诊
      columns1: [
        {
          title: '症状',
          key: 'symptom',
          width: 400,
          render(h, params) {
            return h('input', {
              domProps: {
                value: params.row.symptom,
                placeholder: '请输入',
              },
              style: {
                display: 'inline-block',
                background: 'transparent',
                height: '100%',
                width: '100%',
                border: 'none',
                'text-align': 'center',
                margin: '0',
              },
              on: {
                change(e) {
                  that.selfFeelingData[params.index].symptom = e.target.value
                },
              },
            })
          },
        },
        {
          title: '程度',
          key: 'level',
          width: 80,
          render(h, params) {
            let opts = that.symptomLevelList.map(item => {
              return h(
                'Option',
                {
                  props: {
                    value: item.value,
                    key: item.value,
                  },
                },
                item.label,
              )
            })
            return h(
              'Select',
              {
                props: {
                  value: that.selfFeelingData[params.index].level,
                  placement: 'top',
                },
                on: {
                  'on-change'(data) {
                    that.selfFeelingData[params.index].level = data
                  },
                },
              },
              [opts],
            )
          },
        },
        {
          title: '出现日期',
          key: 'date',
          width: 130,
          render(h, params) {
            return h('DatePicker', {
              props: {
                value: that.selfFeelingData[params.index].date,
                placement: 'top',
              },
              on: {
                'on-change'(data) {
                  that.selfFeelingData[params.index].date = data
                },
              },
            })
          },
        },
        {
          title: '备注',
          key: 'remarks',
          render(h, params) {
            return h('input', {
              domProps: {
                value: params.row.remarks,
                placeholder: '/',
              },
              style: {
                display: 'inline-block',
                background: 'transparent',
                height: '100%',
                width: '100%',
                border: 'none',
                'text-align': 'center',
                margin: '0',
              },
              on: {
                change(e) {
                  that.selfFeelingData[params.index].remarks = e.target.value
                },
              },
            })
          },
        },
        {
          title: '操作',
          // key: '操作',
          width: 70,
          render(h, params) {
            return h(
              'div',
              {
                style: {
                  height: '100%',
                  display: 'flex',
                  'flex-direction': 'column',
                  'justify-content': 'space-around',
                  'align-items': 'center',
                },
              },
              [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '12px',
                    height: '13px',
                    'line-height': '40px',
                    background:
                      'url(/static/icons/public/table-hover-del.svg) no-repeat',
                  },
                  on: {
                    click: event => {
                      event.stopPropagation()
                      that.$emit(
                        'self-feeling-delete',
                        params.row,
                        params.index,
                        that.selfFeelingData,
                      )
                    },
                  },
                }),
              ],
            )
          },
        },
      ],
      // 自觉症状表格
      selfFeelingData: [
        // {
        //   symptom: '',
        //   level: '',
        //   date: '',
        //   remarks: '',
        // },
      ],
      // 程度选择框的数据
      symptomLevelList: [
        { value: '+-', label: '+-' },
        { value: '+', label: '+' },
        { value: '++', label: '++' },
        { value: '+++', label: '+++' },
      ],
      inquiryItemVNode: null,
      validate: false,
    }
  },
  methods: {
    ...mapActions('inputResultModule', ['getBasicInfoInqueries']),
    searchInquirySymptom() {
      if (this.inquiryItemValue !== '') {
        this.$nextTick(() => {
          this.allInquirySymptom = this.allInquirySymptomCopy.filter(item => {
            return ~item.inquiry_item_name.indexOf(this.inquiryItemValue)
          })
        })
        // this.filterInquirySymptom = this.allInquirySymptom
      } else {
        // this.allInquirySymptom = this.allInquirySymptomCopy
        // this.allInquirySymptom.forEach(item => {
        //   item.degree = ''
        //   item.appear_time = ''
        //   item.remark = ''
        // })
        this.$nextTick(() => {
          this.allInquirySymptom = this.allInquirySymptomCopy
        })
      }
    },
    // 问诊 - 编辑
    handleClick(item, index, $event) {
      let inputResultWrapper = document.querySelector('.input-result-wrapper')
      // console.log(this.$refs[`inquiryItem${index}`][0].ifShowAdd = false)
      let wrapper = $event.target.offsetParent.offsetParent
      if (wrapper.classList.contains('inquiry-body')) {
        wrapper = wrapper.offsetParent
      }
      let left = wrapper.offsetLeft + wrapper.clientWidth
      let top = wrapper.offsetTop
      if (left + 230 > inputResultWrapper.clientWidth - 30) {
        left = wrapper.offsetLeft - 230
      }
      this.inquiryEditBoxEl.classList.add('active')
      this.inquiryEditBoxEl.style.left = `${left}px`
      this.inquiryEditBoxEl.style.top = `${top}px`

      if (this.inquiryItemVNode !== null && this.inquiryItemVNode.showBorder) {
        this.inquiryItemVNode.showBorder = false
      }
      // 保存当前点击的vnode
      this.inquiryItemVNode = this.$refs[`inquiryItem${index}`][0]
      this.tempSymptomItem = item
      this.inquiryKey.forEach(key => {
        this.inquiry[key] = item[key]
      })
      // 显示现在编辑的边框
      this.inquiryItemVNode.showBorder = true
    },
    // 问诊 - 添加
    handleAddInquirySymptom(item, index, e) {
      let inputResultWrapper = document.querySelector('.input-result-wrapper')
      // 弹框位置
      let wrapper = e.target.offsetParent.offsetParent
      if (wrapper.classList.contains('inquiry-body')) {
        wrapper = wrapper.offsetParent
      }
      let left = wrapper.offsetLeft + wrapper.clientWidth
      let top = wrapper.offsetTop
      if (left + 230 > inputResultWrapper.clientWidth - 30) {
        left = wrapper.offsetLeft - 230
      }
      this.inquiryEditBoxEl.classList.add('active')
      this.inquiryEditBoxEl.style.left = `${left}px`
      this.inquiryEditBoxEl.style.top = `${top}px`
      // 弹框位置 end

      if (this.inquiryItemVNode !== null && this.inquiryItemVNode.showBorder) {
        this.inquiryItemVNode.showBorder = false
      }

      // 保存当前点击的vnode
      this.inquiryItemVNode = this.$refs[`inquiryItem${index}`][0]

      this.tempSymptomItem = item
    },
    // 问诊 - 选择程度
    chooseLevel(e) {
      let target = e.target
      this.$set(this.inquiry, 'degree', target.value)
    },
    // 症状出现时间
    handleSymptomOccur(date) {
      // this.inquiry.occurDate = date
      this.$set(this.inquiry, 'appear_time', date)
    },
    // 问诊 - 取消
    cancelInquiry() {
      this.validate = false
      this.inquiryEditBoxEl.classList.remove('active')
      let degree = document.querySelector('.symptom-level.active')
      if (degree !== null) {
        degree.classList.remove('active')
      }
      Object.keys(this.inquiry).forEach(key => {
        this.inquiry[key] = ''
      })
      this.inquiryItemVNode.showBorder = false
    },
    // 问诊 - 确定
    confirmInquiry() {
      if (!this.inquiry.degree) {
        this.validate = true
        return
      }
      this.validate = false
      this.inquiryEditBoxEl.classList.remove('active')
      let degree = document.querySelector('.symptom-level.active')
      if (degree !== null) {
        degree.classList.remove('active')
      }
      // this.inquiryItemVNode.degree = this.tempSymptomItem.degree
      // this.inquiryItemVNode.appear_time = this.tempSymptomItem.occurDate
      // this.inquiryItemVNode.remark = this.tempSymptomItem.remark
      this.inquiryKey.forEach(key => {
        this.tempSymptomItem[key] = this.inquiry[key]
      })
      if (this.inquiryItemVNode.ifShowAdd) {
        this.inquiryItemVNode.ifShowAdd = false
      }
      this.inquiryItemVNode.showBorder = false
    },
    // 新增
    addNewSelfSympton() {
      let obj = {
        symptom: '',
        level: '',
        date: '',
        remarks: '',
      }
      this.selfFeelingData.push(obj)
    },
    // 全部清空
    clearAll() {
      for (let i = 0; i < this.allInquirySymptom.length; i++) {
        this.$refs[`inquiryItem${i}`][0].handleReset()
      }
    },
  },
  async created() {
    let result = await this.getBasicInfoInqueries('180203027')
    this.allInquirySymptom = result
    this.allInquirySymptomCopy = result
  },
  watch: {
    'inquiry.degree' (val) {
      if (val) {
        this.validate = false
      }
    },
  },
  mounted() {
    this.inquiryEditBoxEl = document.querySelector('.inquiry-edit-box')
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';

.group-items-symptom-outer-wrapper {
  .group-items-symptom-wrapper {
    margin: 10px;
    border: 1px solid @gradeAshFive;
    border-radius: 8px;
    .ivu-table-tip {
      display: none;
    }
    // overflow: auto;
    .group-items-header {
      height: 50px;
      overflow: hidden;
      line-height: 50px;
      .group-items-left {
        color: @gradeAshOne;
        letter-spacing: 0.04px;
        &::before {
          content: '';
          margin-top: -4px;
          display: inline-block;
          margin-right: 6px;
          margin-left: @num20;
          width: 4px;
          height: 18px;
          vertical-align: middle;
          background-color: @gradeBlueOne;
        }
      }
      .group-items-right {
        margin-right: 20px;
        display: flex;
        align-items: center;
        .clear-all {
          color: @gradeBlueTwo;
        }
        .inquiry-search {
          display: inline-block;
          width: 65%;
        }
        .icon-show {
          width: 20px;
          height: 20px;
          background: #008cee;
          display: inline-block;
          text-align: center;
          border-radius: 4px;
          margin-top: -2px;
          vertical-align: middle;
          position: relative;
          cursor: pointer;
          .arr-icon {
            position: absolute;
            top: 4px;
            right: 6px;
          }
        }
      }
    }
    .ghost-button {
      border-color: #34a3f1;
      color: #249cf0;
    }
    .seperate-line {
      height: 1px;
      background: @gradeAshFive;
    }
    .group-items-body {
      border-radius: 4px;
      width: 100%;
      min-height: 220px;
      // padding: 10px;
      position: relative;
      textarea.ivu-input {
        resize: none;
        padding-top: 7px;
        padding-right: 10px;
        padding-left: 10px;
        padding-bottom: 7px;
        font-size: 12px;
        line-height: 20px;
        height: 200px;
        border: none;
        background: #f2f7ff;
      }

      &.inquiry-items {
      }

      // 自觉症状
      .self-feeling {
      }
    }
  }

  // 问诊编辑弹框
  .inquiry-edit-box {
    height: 273px;
    width: 230px;
    position: absolute;
    z-index: 99999;
    left: 0px;
    top: 0px;
    background: #fff;
    display: none;
    border-radius: 4px;
    padding: 20px;
    .box-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &.active {
      display: block;
    }

    .item {
      .title {
        margin-bottom: 2px;
        color: @gradeAshTwo;
        span {
          color: @tsIcon;
        }
      }
      .content {
        display: flex;
        justify-content: space-between;
        .symptom-level {
          color: @gradeBlueTwo;
          width: 40px;
          height: 25px;
          background: #fff;
          font-size: 16px;
          font-weight: bold;
          border: 1px solid @gradeBlueTwo;
          &.active {
            color: #fff;
            background: @gradeBlueTwo;
          }
          &:last-child {
            margin-right: 0;
          }
        }

        // 备注
        .remarks {
          width: 100%;
          height: 60px;
          resize: none;
          border-radius: 4px;
          border-color: @gradeAshFive;
        }
      }
    }

    // 按钮
    .footer {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
