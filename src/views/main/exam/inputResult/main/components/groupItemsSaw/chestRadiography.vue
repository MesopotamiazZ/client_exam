<template>
  <div class="chest-radio-graphy-wrapper">
    <!-- 表格 -->
    <div class="chest-detail">
      <table class="chest-detail-table">
        <colgroup>
          <col width="100" />
          <col width="100" />
          <col width="135" />
          <col width="90" />
          <col width="135" />
          <col width="135" />
          <col width="102" />
          <col width="102" />
          <col width="102" />
          <col width="102" />
          <col />
        </colgroup>
        <thead class="chest-detail-table-head">
          <tr>
            <th colspan="3">小阴影</th>
            <th rowspan="2">小阴影聚集</th>
            <th colspan="2">大阴影</th>
            <th colspan="4">胸膜改变</th>
            <th rowspan="2">附加符号</th>
          </tr>
          <tr>
            <th>形态大小</th>
            <th>总体密集度</th>
            <th>范围</th>
            <th>小于右上肺区</th>
            <th>大于右上肺区</th>
            <th>局部增厚</th>
            <th>弥漫增厚</th>
            <th>胸膜钙化</th>
            <th>心缘蓬乱</th>
          </tr>
        </thead>
        <tbody class="chest-detail-table-body">
          <tr>
            <td v-for="(name, index) in dustChestParamsNames"
                :key="index">
              <div v-for="(key, index) in Object.keys(dustChestParams)">
                <div class="dust-chest-params-selection"
                     v-if="name === dustChestParams[key].name && name !=='范围'">
                  <Select v-model="dustChestPramsChoosen[key]">
                    <Option v-for="item in dustChestParams[key].values"
                            :value="item.value"
                            :key="item.value">{{ item.value }}</Option>
                  </Select>
                </div>
                <div class="range"
                     v-else-if="name === dustChestParams[key].name && name =='范围'">
                  <div>
                    <input type="text"
                           placeholder="请输入"
                           v-model="dustChestPramsChoosen.range[0]">
                    <input type="text"
                           placeholder="请输入"
                           v-model="dustChestPramsChoosen.range[1]">
                  </div>
                  <div>
                    <input type="text"
                           placeholder="请输入"
                           v-model="dustChestPramsChoosen.range[2]">
                    <input type="text"
                           placeholder="请输入"
                           v-model="dustChestPramsChoosen.range[3]">
                  </div>
                  <div>
                    <input type="text"
                           placeholder="请输入"
                           v-model="dustChestPramsChoosen.range[4]">
                    <input type="text"
                           placeholder="请输入"
                           v-model="dustChestPramsChoosen.range[5]">
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 阅片结果 和 拍片参数 -->
    <div class="result-params-quality-wrapper">
      <Row :gutter="50">
        <Col span="12">
        <div class="read-result">
          <div class="title">阅片结果</div>
          <div class="content">
            <textarea class="padding10"
                      v-model="readResult"></textarea>
          </div>
          <div class="read-doctor">
            <div class="read-doctor-tag"
                 v-for="(item, index) in readDoctor"
                 :key="index">
              {{item.value}}
              <i class="delete-read-doctor"
                 @click="deleteReadDoctor(index)">&times;</i>
            </div>
            <Button type="ghost"
                    @click="addReadDoctor"
                    style="margin-bottom: 8px;">添加阅片人</Button>
          </div>
        </div>
        </Col>
        <Col span="12">
        <div class="use-params"
             style="margin-bottom: 25px;">
          <div class="params-item">
            <div class="title">拍片参数</div>
            <div class="content"
                 style="padding-top: 20px;">
              <Form :model="useParams"
                    :label-width="80">
                <Row>
                  <Col span="12">
                  <FormItem label="电流(mA)">
                    <Input v-model="useParams.electricity"></Input>
                  </FormItem>
                  </Col>
                  <Col span="12">
                  <FormItem label="电压(kVp)">
                    <Input v-model="useParams.voltage"></Input>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                  <FormItem label="毫安(mAS)">
                    <Input v-model="useParams.MaS"></Input>
                  </FormItem>
                  </Col>
                  <Col span="12">
                  <FormItem label="胸厚">
                    <Input v-model="useParams.thickChest"></Input>
                  </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
        <div class="use-params">
          <div class="params-item">
            <div class="title">拍片质量</div>
            <div class="content"
                 style="padding-top: 20px;">
              <Form :model="picQuality"
                    :label-width="40">
                <Row>
                  <Col span="12">
                  <FormItem label="质量">
                    <Select placeholder="请选择"
                            @on-change="picQualityParamsChange"
                            v-model="picQuality.quality">
                      <Option v-for="(item, index) in picQualityPrams"
                              :key="index"
                              :value="item.value">{{item.value}}</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                  <FormItem label="描述">
                    <Select v-model="picQuality.description"
                            @on-change="picQualityDesParamsChange">
                      <Option v-for="(item, index) in picQualityDesPrams"
                              :key="index"
                              :value="item.value">{{item.value}}</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
        </Col>
      </Row>
    </div>
    <!-- 添加阅片人模态框 -->
    <add-doctor-modal ref="addClinicalModal"
                      :addedDoctor="readDoctor"
                      :datalist='allReadDoctor'
                      @checkValue="checkValue"></add-doctor-modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import addClinical from '../addClinical/addClinical'
import AddDoctorModal from './addDoctorModal'
export default {
  components: {
    addClinical,
    AddDoctorModal,
  },
  data() {
    return {
      useParams: {
        electricity: '', // 电流
        voltage: '', // 电压
        MaS: '', // 毫安秒
        thickChest: '', // 胸厚
      },
      picQuality: {
        quality: '',
        description: '',
      },
      readDoctor: [],
      // 粉尘胸片参数
      readResult: '',
      dustChestParamsNames: [
        '形态大小',
        '总体密集度',
        '范围',
        '小阴影聚集',
        '小于右上肺区',
        '大于右上肺区',
        '局部增厚',
        '弥漫增厚',
        '胸膜钙化',
        '心缘蓬乱',
        '附加符号',
      ],
      // 粉尘胸片参数获取
      dustChestParams: {
        shapSize: {}, // 形态大小
        totalDensity: {}, // 总体密集度
        smallShadowCluster: {}, // 小阴影聚集
        ltRUpperLung: {}, // 小于右上肺区
        gtRUpperLung: {}, // 大于右上肺区
        segmentalThicken: {}, // 局部增厚
        diffuseThicken: {}, // 弥漫增厚
        pleuralCalcification: {}, // 胸膜钙化
        heartMarginTumbled: {}, // 心缘蓬乱
        addSymbol: {}, // 附加符号
      },
      // 粉尘胸片参数表格的选择记录
      dustChestPramsChoosen: {
        shapSize: '', // 形态大小
        totalDensity: '', // 总体密集度
        smallShadowCluster: '', // 小阴影聚集
        ltRUpperLung: '', // 小于右上肺区
        gtRUpperLung: '', // 大于右上肺区
        segmentalThicken: '', // 局部增厚
        diffuseThicken: '', // 弥漫增厚
        pleuralCalcification: '', // 胸膜钙化
        heartMarginTumbled: '', // 心缘蓬乱
        addSymbol: '', // 附加符号
        range: ['', '', '', '', '', ''], // 符号
      },
      // 拍片质量参数
      picQualityPrams: [],
      // 拍片质量描述
      picQualityDesPrams: [],
      // 阅片人
      allReadDoctor: [],
    }
  },
  async mounted() {
    let result = await this.getDustChestParams()
    for (let obj of result.items) {
      if (obj.name === '形态大小') {
        this.dustChestParams.shapSize = obj
      } else if (obj.name === '总体密集度') {
        this.dustChestParams.totalDensity = obj
      } else if (obj.name === '小阴影聚集') {
        this.dustChestParams.smallShadowCluster = obj
      } else if (obj.name === '小于右上肺区') {
        this.dustChestParams.ltRUpperLung = obj
      } else if (obj.name === '大于右上肺区') {
        this.dustChestParams.gtRUpperLung = obj
      } else if (obj.name === '局部增厚') {
        this.dustChestParams.segmentalThicken = obj
      } else if (obj.name === '弥漫增厚') {
        this.dustChestParams.diffuseThicken = obj
      } else if (obj.name === '胸膜钙化') {
        this.dustChestParams.pleuralCalcification = obj
      } else if (obj.name === '心缘蓬乱') {
        this.dustChestParams.heartMarginTumbled = obj
      } else if (obj.name === '附加符号') {
        this.dustChestParams.addSymbol = obj
      } else if (obj.name === '阅片人') {
        this.allReadDoctor = obj.values
      } else if (obj.name === '拍片质量描述') {
        this.picQualityDesPrams = obj.values
      } else if (obj.name === '拍片质量') {
        this.picQualityPrams = obj.values
      }
    }
    // 添加范围列字段
    this.dustChestParams.range = {
      name: '范围',
    }
  },
  methods: {
    ...mapActions('inputResultModule', ['getDustChestParams']),
    addReadDoctor() {
      this.$refs.addClinicalModal.open()
      // this.readDoctor.push({ name: '李医生' })
    },
    deleteReadDoctor(index) {
      this.readDoctor.splice(index, 1)
    },
    checkValue(data) {
      this.readDoctor = data
    },
    picQualityParamsChange(data) {
      this.picQuality.quality = data
    },
    picQualityDesParamsChange(data) {
      this.picQuality.description = data
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.chest-radio-graphy-wrapper {
  table,
  th,
  td,
  tbody,
  thead {
    box-sizing: border-box;
  }
  .chest-detail {
    .chest-detail-table {
      color: @gradeAshTwo;
      width: 100%;
      border-collapse: collapse;
      th,
      td {
        border: 1px solid @gradeAshFive;
      }

      .chest-detail-table-head {
        tr {
          height: 40px;
        }
      }
      .chest-detail-table-body {
        tr {
          height: 120px;
          td {
            text-align: center;
            .range {
              height: 120px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              input[type='text'] {
                width: 60px;
                height: 30px;
                border-radius: 4px;
                background: transparent;
                border: 1px solid @gradeAshFive;
                text-align: center;
              }
            }
          }
        }

        .dust-chest-params-selection {
          position: relative;
          // 粉尘胸片参数管理
          .ivu-select-selection {
            border: none;
          }
        }
      }
    }
  }
  // 结果和参数
  .result-params-quality-wrapper {
    padding: 30px;
    .read-result {
      .title {
        color: @gradeAshTwo;
        margin-bottom: 10px;
      }
      .content {
        width: 100%;
        textarea {
          height: 296px;
          width: 100%;
          resize: none;
          border: 1px solid @gradeAshFive;
          border-radius: 4px;
        }
      }

      .read-doctor {
        display: flex;
        align-items: center;
        margin-top: 15px;
        flex-wrap: wrap;
        .read-doctor-tag {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          border-radius: 4px;
          padding: 0 12px;
          background: @gradeBlueFour;
          margin-right: 10px;
          color: @gradeAshTwo;
          margin-bottom: 8px;
          .delete-read-doctor {
            font-style: normal;
            margin-right: 0px;
            position: relative;
            right: -5px;
            height: 100%;
            width: 10px;
            text-align: center;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .add-read-doctor {
          height: 30px;
          padding: 0 12px;
          background: #fff;
          color: @gradeBlueTwo;
          border: 1px solid @gradeBlueTwo;
          border-radius: 4px;
        }
      }
    }
    .use-params {
      .params-item {
        .title {
          color: @gradeAshTwo;
          margin-bottom: 10px;
        }
        .content {
          height: 120px;
          background: @gradeBlueFour;
        }
      }
    }

    .user-params-form {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
}
</style>