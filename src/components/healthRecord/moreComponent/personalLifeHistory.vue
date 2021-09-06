<template>
  <div class="geneticDiseaseHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>个人生活史</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr geneticDiseaseHistory-title-btn"
               style="margin-left:10px"
               @click="isAllPickUp">
            <Icon :type="thisItems ? 'arrow-up-b' : 'arrow-down-b'"
                  size="8"
                  color="white"
                  style="margin-top:5px;"></Icon>
          </div>
          <ZButton :ZBtype='"ghost"'
                   class="fr"
                   @click="openM">{{ life_hist ? '编 辑': '新增'}}</ZButton>
        </div>
      </div>
    </titleHasSlotMiddle>
    <div v-if="thisItems">
      <div class="geneticDiseaseHistory-table">
        <Row>
          <div class="fl">
            <div class="geneticDiseaseHistory-table-left"
                 v-for="(item, index) of disease"
                 :key="index">
              <div> {{item.name}}</div>
            </div>
          </div>
          <div class="fl">
            <div class="geneticDiseaseHistory-table-right-one">
              <div class="geneticDiseaseHistory-table-right-one-item">
                {{life_hist.is_smoke | smokeFit}}{{life_hist.smoke_per_day| smokeDay}}{{life_hist.smoke_year| smokeYear}}{{life_hist.stop_smoke_year| stopSmokeYear}}
              </div>
            </div>
            <div class="geneticDiseaseHistory-table-right-one">
              <div class="geneticDiseaseHistory-table-right-one-item">
                {{life_hist.is_drink | drinkFit}}{{life_hist.drink_year | drinkYear}}{{life_hist.stop_drink_year| stopDrinkYear}}
              </div>
            </div>
            <div class="geneticDiseaseHistory-table-right-one">
              <div class="geneticDiseaseHistory-table-right-one-item">
                {{life_hist.summary}}
              </div>
            </div>
          </div>

        </Row>
      </div>
    </div>
    <addpersonalLifeHistory :Model="addMedicalHistory"
                            @refresh="refresh"
                            @addAbolish="addAbolish"
                            :lifeHist="copylife_hist"></addpersonalLifeHistory>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import addpersonalLifeHistory from '../modal/addpersonalLifeHistory'
import {copy} from '@/utils/helper'
export default {
  name: 'geneticDiseaseHistory',
  data() {
    return {
      //
      unfold() {
        this.thisItems = true
      },
      retract() {
        this.thisItems = false
      },
      thisItems: false,
      basicInformationData: [],
      basicInformationRule: {},
      clect: '',
      // 摩太框
      addMedicalHistory: false,
      disease: [{ name: '吸烟' }, { name: '饮酒' }, { name: '总结' }], // 疾病史基础数据
      diseaseData: [
        [{ name: '1只' }, { name: '心脏病' }],
        [{ name: '高血压' }],
        [{ name: '高血压' }],
      ],
      life_hist: {},
      copylife_hist: {},
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    addpersonalLifeHistory,
  },
  watch: {
    lifeHist(val) {
      if (val) {
        this.life_hist = copy(val, true)
        this.copylife_hist = copy(val, true)
        console.log(this.life_hist, '生活史')
      }
    },
  },
  filters: {
    smokeFit(val) {
      if (val === 1) {
        return '不吸烟'
      } else if (val === 2) {
        return '偶尔吸烟'
      } else if (val === 3) {
        return '经常吸烟'
      }
    },
    drinkFit(val) {
      if (val === 1) {
        return '不饮酒'
      } else if (val === 2) {
        return '偶尔饮酒'
      } else if (val === 3) {
        return '经常饮酒'
      }
    },
    smokeDay(val) {
      if (val > 0) {
        return ' ' + val + '支/天'
      } else {
        return ''
      }
    },
    smokeYear(val) {
      if (val > 0) {
        return ' 共' + val + '年'
      } else {
        return ''
      }
    },
    refresh() {
      this.$emit('refresh')
    },
    drinkYear(val) {
      if (val > 0) {
        return ' 共' + val + '年'
      } else {
        return ''
      }
    },
    stopSmokeYear(val) {
      if (val > 0) {
        return ' 戒烟' + val + '年'
      } else {
        return ''
      }
    },
    stopDrinkYear(val) {
      if (val > 0) {
        return ' 戒酒' + val + '年'
      } else {
        return ''
      }
    },
  },
  props: {
    allItems: {
      type: Boolean,
      defalut: false,
    },
    lifeHist: {
      type: [Object, Array],
    },
  },
  methods: {
    //
    isAllPickUp() {
      this.thisItems = !this.thisItems
    },
    openM() {
      this.addMedicalHistory = true
      console.log('打开', this.addMedicalHistory)
    },
    addAbolish() {
      this.addMedicalHistory = false
    },
    refresh() {
      this.$emit('refresh')
    },
  },
  mounted() {
   // console.log('1')
  },
}
</script>
<style >

</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.geneticDiseaseHistory {
  overflow: hidden;
  .geneticDiseaseHistory-table {
    border-top: 1px solid #cccccc;
  }
  .geneticDiseaseHistory-table-left {
    text-align: center;
    width: 170px;
    height: 40px;
    background: #e8f2ff;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    padding-top: 10px;
  }
  .geneticDiseaseHistory-table-left-big {
    text-align: center;
    width: 170px;
    height: 80px;
    background: #e8f2ff;
    line-height: 80px;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
  /*   .geneticDiseaseHistory-table-left:last-child{
   text-align: center;
   width: 170px;
   height: 40px;
   background: #e8f2ff;
   line-height: 40px;
   border-right: 1px solid #D9D9D9;
   border-bottom: none;
  } */
  .geneticDiseaseHistory-table-right-one {
    width: 813px;
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
    text-align: left;
    line-height: 30px;
    padding: 5px;
  }
  .geneticDiseaseHistory-table-right-two {
    width: 813px;
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
    text-align: left;
    line-height: 30px;
    overflow: hidden;
  }
  .geneticDiseaseHistory-table-right-two:last-child {
    width: 813px;
    border-bottom: none;
    height: 40px;
    text-align: left;
    line-height: 30px;
  }
  .geneticDiseaseHistory-table-right-one-item {
    height: 30px;
    //  border: 1px solid #D9D9D9;
    line-height: 30px;
    text-align: center;
    min-width: 74px;
    display: inline-block;
  }
  .geneticDiseaseHistory-table-right-two-name {
    width: 140px;
    height: 40px;
    background: #e8f2ff;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .geneticDiseaseHistory-table-right-two-nameValue {
    width: 297px;
    height: 40px;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .geneticDiseaseHistory-table-right-two-data {
    width: 140px;
    height: 40px;
    background: #e8f2ff;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .geneticDiseaseHistory-table-right-two-dataValue {
    width: 236px;
    height: 40px;
    text-align: center;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  background: #ffffff;
  border: 1px solid #e0e0e0;
  /*   box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
 */
  border-radius: 8px;
  .geneticDiseaseHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
  }
  .geneticDiseaseHistory-title-btn:hover {
    cursor: pointer;
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .geneticDiseaseHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .geneticDiseaseHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .geneticDiseaseHistory-row {
    height: 30px;
  }
  .geneticDiseaseHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .geneticDiseaseHistory-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .marginL30px {
    margin-left: 30px;
  }
  .marginT15 {
    margin-top: 15px;
  }
  .geneticDiseaseHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>