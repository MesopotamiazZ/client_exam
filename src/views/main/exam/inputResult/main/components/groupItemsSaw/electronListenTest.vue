<template>
  <div class="electron-listen-test-wrapper">
    <div class="test-container">
      <!-- 右耳 -->
      <div class="electron-listen-test-right">
        <div class="test-table">
          <chart :options="getBar(xAxisGas, yDataGas, rightTabName, 'right')"
                 ref="bar"
                 theme="ovilia-green"
                 auto-resize />
          <tab :tab="tabData"
               @tab-change="rightTabChange"
               :num="1"></tab>
          <div v-if="rightTabName === '气导'">
            <Table :columns="gasGuideColumnsRight"
                   :data="gasGuideDataRight"></Table>
          </div>
          <div v-if="rightTabName === '骨导'">
            <Table :columns="stoneGuideColumnsRight"
                   :data="boneGuideDataRight"></Table>
          </div>
        </div>
      </div>
      <!-- 左耳 -->
      <div class="electron-listen-test-left">
        <div class="test-table">
          <chart :options="getBar(xAxisGas, yDataGas, leftTabName, 'left')"
                 ref="bar"
                 theme="ovilia-green"
                 auto-resize />
          <tab :tab="tabData"
               @tab-change="leftTabChange"></tab>
          <div v-if="leftTabName === '气导'">
            <Table :columns="gasGuideColumnsRight"
                   :data="gasGuideDataLeft"></Table>
          </div>
          <div v-if="leftTabName === '骨导'">
            <Table :columns="stoneGuideColumnsLeft"
                   :data="boneGuideDataLeft"></Table>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-left">
        <div class="footer-btn-wrapper">
          <Button class="btn"
                  type="ghost"
                  @click="fillDefaultMeasure">填充默认</Button>
        </div>
        <div class="footer-btn-wrapper">
          <Button class="btn"
                  type="ghost"
                  @click="estimateData">评价</Button>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-right-title">
          <div class="title">检查结论</div>
          <div class="title">检查结果</div>
        </div>
        <div class="footer-right-content">
          <div class="footer-content-item"><input type="text"></div>
          <div class="footer-content-item"><input type="text"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tab from '../tabs'
import chart from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import { mapActions } from 'vuex'

import getBar from './data'
// 引入helper
import { copy } from '@/utils/helper'
// import chart from 'vue-charts'
export default {
  components: {
    Tab,
    chart,
  },
  props: {
    sex: {
      type: [Number, String],
      default: 1,
    },
    age: {
      type: [Number, String],
    },
  },
  data() {
    let that = this
    return {
      inspectSaw: '', // 检查所见
      inspectResult: '', // 检查结果
      // tab标签名
      tabData: [
        {
          title: '气导',
        },
        {
          title: '骨导',
        },
      ],
      rightTabName: '气导',
      leftTabName: '气导',
      // 气导表格
      gasGuideColumnsRight: [
        {
          title: '频率',
          key: 'frequency',
        },
        {
          title: '测定值',
          key: 'measuredValue',
        },
        {
          title: '修正值',
          key: 'modifierValue',
        },
        {
          title: '是否掩蔽',
          key: 'isMasking',
          render(h, params) {
            return h('Checkbox', {
              props: {
                value: params.row.isMasking,
              },
              on: {
                'on-change'(data) {
                  that.gasGuideDataRight[params.index].isMasking = data
                },
              },
            })
          },
        },
      ],
      gasGuideColumnsLeft: [
        {
          title: '频率',
          key: 'frequency',
        },
        {
          title: '测定值',
          key: 'measuredValue',
        },
        {
          title: '修正值',
          key: 'modifierValue',
        },
        {
          title: '是否掩蔽',
          key: 'isMasking',
          render(h, params) {
            return h('Checkbox', {
              props: {
                value: params.row.isMasking,
              },
              on: {
                'on-change'(data) {
                  that.gasGuideDataLeft[params.index].isMasking = data
                },
              },
            })
          },
        },
      ],
      gasGuideDataRight: [],
      gasGuideDataRightCopy: [],
      gasGuideDataLeft: [],
      // 骨导表格
      stoneGuideColumnsRight: [
        {
          title: '频率',
          key: 'frequency',
        },
        {
          title: '测定值',
          key: 'measuredValue',
        },
        {
          title: '是否掩蔽',
          key: 'isMasking',
          render(h, params) {
            return h('Checkbox', {
              props: {
                value: params.row.isMasking,
              },
              on: {
                'on-change'(data) {
                  that.boneGuideDataRight[params.index].isMasking = data
                },
              },
            })
          },
        },
      ],
      stoneGuideColumnsLeft: [
        {
          title: '频率',
          key: 'frequency',
        },
        {
          title: '测定值',
          key: 'measuredValue',
        },
        {
          title: '是否掩蔽',
          key: 'isMasking',
          render(h, params) {
            return h('Checkbox', {
              props: {
                value: params.row.isMasking,
              },
              on: {
                'on-change'(data) {
                  that.boneGuideDataLeft[params.index].isMasking = data
                },
              },
            })
          },
        },
      ],
      boneGuideDataRight: [],
      boneGuideDataLeft: [],

      // 线形图数据
      // 电测听数据
      listenTestData: {
        '500': 15,
        '1000': 20,
        '2000': 10,
        '3000': 25,
        '4000': 10,
        '6000': 10,
      },
      xAxisGas: [],
      yDataGas: [],
      xAxisBone: [],
      yDataBone: [],
    }
  },
  mounted() {
    Object.keys(this.listenTestData).forEach(key => {
      let obj = {
        frequency: key,
      }
      this.gasGuideDataRight.push(copy(obj, true))
      this.gasGuideDataLeft.push(copy(obj, true))
      this.boneGuideDataRight.push(copy(obj, true))
      this.boneGuideDataLeft.push(copy(obj, true))
    })
  },
  watch: {
    gasGuideDataRight: {
      handler(val, oldval) {
        this.yDataGas =
          this.rightTabName === '气导'
            ? this.gasGuideDataRight
            : this.boneGuideDataRight
      },
      deep: true,
    },
  },
  methods: {
    getBar,
    ...mapActions('inputResultModule', ['getAuditoryThresholdCorrection']),
    rightTabChange(data) {
      this.rightTabName = data.title
    },
    leftTabChange(data) {
      this.leftTabName = data.title
    },
    // 填充默认(測定值)
    fillDefaultMeasure() {
      for (let obj of this.gasGuideDataRight) {
        Object.keys(this.listenTestData).forEach(key => {
          if (key === obj.frequency) {
            this.$set(obj, 'measuredValue', this.listenTestData[key])
          }
        })
      }

      this.xAxisGas = Object.keys(this.listenTestData)

      for (let obj of this.gasGuideDataLeft) {
        Object.keys(this.listenTestData).forEach(key => {
          if (key === obj.frequency) {
            this.$set(obj, 'measuredValue', this.listenTestData[key])
          }
        })
      }
      for (let obj of this.boneGuideDataRight) {
        Object.keys(this.listenTestData).forEach(key => {
          if (key === obj.frequency) {
            this.$set(obj, 'measuredValue', this.listenTestData[key])
          }
        })
      }
      for (let obj of this.boneGuideDataLeft) {
        Object.keys(this.listenTestData).forEach(key => {
          if (key === obj.frequency) {
            this.$set(obj, 'measuredValue', this.listenTestData[key])
          }
        })
      }
    },
    // 评价
    async estimateData() {
      for (let key in this.listenTestData) {
        let result = await this.getAuditoryThresholdCorrection({
          rcf: key,
          age: Number(this.age),
        })
        for (let obj of this.gasGuideDataRight) {
          if (obj.frequency === key) {
            this.$set(
              obj,
              'modifierValue',
              obj.measuredValue + result[`${this.sex === 1 ? '男' : '女'}`],
            )
          }
        }
      }
      for (let key in this.listenTestData) {
        let result = await this.getAuditoryThresholdCorrection({
          rcf: key,
          age: Number(this.age),
        })
        for (let obj of this.gasGuideDataLeft) {
          if (obj.frequency === key) {
            this.$set(
              obj,
              'modifierValue',
              obj.measuredValue + result[`${this.sex === 1 ? '男' : '女'}`],
            )
          }
        }
      }
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.electron-listen-test-wrapper {
  padding: 30px;
  .test-container {
    &::after {
      content: '';
      display: block;
      clear: both;
    }
    .electron-listen-test-left {
      float: right;
      width: 50%;
      padding-left: 80px;
    }
    .electron-listen-test-right {
      float: left;
      width: 50%;
      padding-right: 80px;
    }
  }

  .footer {
    margin-top: 30px;
    .footer-left {
      float: left;
      .footer-btn-wrapper {
        position: relative;
        height: 40px;
        .btn {
          position: absolute;
          top: 5px;
        }
      }
    }
    .footer-right {
      margin-left: 94px;
      .footer-right-title {
        float: left;
        .title {
          height: 40px;
          line-height: 40px;
          width: 150px;
          text-align: center;
          background: @gradeBlueFour;
          // border: 1px solid @gradeAshFive;
          box-shadow: 0 0 1px @gradeAshThree;
        }
        .title:first-child {
          border-top-left-radius: 4px;
        }
        .title:last-child {
          border-bottom-left-radius: 4px;
        }
      }
      .footer-right-content {
        .footer-content-item {
          height: 40px;
          overflow: hidden;
          box-shadow: 0 0 1px @gradeAshThree;
          input {
            display: block;
            height: 100%;
            width: 100%;
            // border: 1px solid @gradeAshFive;
            padding-left: 10px;
            border: none;
          }
          &:first-child {
            border-top-right-radius: 4px;
          }
          &:last-child {
            border-bottom-right-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
