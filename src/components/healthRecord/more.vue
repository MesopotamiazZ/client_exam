<template>
  <div class="more">
    <titletHasSlot style="border-bottom: 1px solid #cccccc;">
      <span slot='titletHasSlotLeftTitle'>基本健康信息</span>
      <div slot='titletHasSlotRightContent' style="margin-right:-6px;height:30px;">
        <div style="height:30px;">

          <div class="fr more-title-text" style="margin-left:18px;" @click="allPickUp" @mouseover="allPickUpMouseover" @mouseout="allPickUpMouseout">全部展开
             <div class="fl" style="margin-top:6px;">
              <icon :name='allUnfold' ></icon>
            </div>
            </div>
         <div class="fr more-title-text" style="margin-left:15px" @click="allSpread"  @mouseover="allretractMouseover" @mouseout="allretractMouseout">全部收起
            <div class="fl" style="margin-top:6px;">
              <icon :name='allretract'></icon>
            </div>
          </div>
            </div>
      </div>
    </titletHasSlot>
    <div class="allItems">
      <!-- 既往史 -->
      <previousHistory @refresh='refresh' class="marginT10" ref="previousHistory" :id="basicInformationData.id" :medical_hist="medical_hist"></previousHistory>

      <!-- 家族史 -->
      <familyHistory class="marginT10" ref="familyHistory" :basicInformationData="basicInformationData"  @refresh='refresh'></familyHistory>
      <!-- 遗传病史 -->
      <geneticDiseaseHistory class="marginT10"  ref="geneticDiseaseHistory" :basicInformationData="basicInformationData" @refresh='refresh'></geneticDiseaseHistory>

      <!-- 婚姻史 -->
      <maritalHistory class="marginT10" ref="maritalHistory" :basicInformationData="basicInformationData"  @refresh='refresh'></maritalHistory>

      <!-- 职业史 -->
      <occupationHistory class="marginT10" ref="occupationHistory" :basicInformationData="basicInformationData"  @refresh='refresh'></occupationHistory>

      <!-- 放射性工作史 -->
      <radioactivityHistory class="marginT10" ref="radioactivityHistory" :basicInformationData="basicInformationData"  @refresh='refresh'></radioactivityHistory>

      <!-- 职业疾病史 -->
<!--      <occupationalDiseaseHistory class="marginT10"></occupationalDiseaseHistory>-->  
    <!-- 个人生活史 -->
      <personalLifeHistory class="marginT10" ref="personalLifeHistory" :lifeHist="life_hist" @refresh='refresh'></personalLifeHistory>
      <!-- 生活环境史 -->
      <surroundingsHistory class="marginT10"  ref="surroundingsHistory" :live_environ ="live_environ"  @refresh='refresh'></surroundingsHistory>
      <!-- 月经史 -->
      <menstruationHistory class="marginT10" ref="menstruationHistory" :menstrual_hist ="menstrual_hist"  @refresh='refresh'></menstruationHistory>
      <!-- 生育史 -->
      <bearHistory class="marginT10"  ref="bearHistory" :basicInformationData="basicInformationData"  @refresh='refresh'></bearHistory>
      <!-- 其他史 -->
      <otherHistory class="marginT10" ref="otherHistory"></otherHistory>
    </div>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
import ZButton from '@/components/button/ZButton'
import previousHistory from './moreComponent/previousHistory'
import geneticDiseaseHistory from './moreComponent/geneticDiseaseHistory'
import bearHistory from './moreComponent/bearHistory'
import maritalHistory from './moreComponent/maritalHistory'
import menstruationHistory from './moreComponent/menstruationHistory'
import occupationalDiseaseHistory from './moreComponent/occupationalDiseaseHistory'
import otherHistory from './moreComponent/otherHistory'
import personalLifeHistory from './moreComponent/personalLifeHistory'
import surroundingsHistory from './moreComponent/surroundingsHistory'
import familyHistory from './moreComponent/familyHistory'
import occupationHistory from './moreComponent/occupationHistory'
import radioactivityHistory from './moreComponent/radioactivityHistory'
import {getDotData} from '@/utils/helper'

export default {
  name: 'more',
  data () {
    return {
//
      allUnfold: 'allUnfold',
      allretract: 'allretract',
      life_hist: {},
      live_environ: {},
      menstrual_hist: {},
      medical_hist: {},
      family_hist: {},
      // 婚姻史
      marriage_hist: {},
    }
  },
  components: {
    titletHasSlot,
    ZButton,
    previousHistory,
    bearHistory,
    maritalHistory,
    occupationalDiseaseHistory,
    menstruationHistory,
    otherHistory,
    personalLifeHistory,
    surroundingsHistory,
    familyHistory,
    geneticDiseaseHistory,
    occupationHistory,
    radioactivityHistory,
  },
  watch: {
    'basicInformationData'(val) {
      if (val) {
        this.life_hist = getDotData(val, 'life_hist')
        this.live_environ = getDotData(val, 'live_environ')
        this.menstrual_hist = getDotData(val, 'menstrual_hist')
        this.medical_hist = getDotData(val, 'medical_hist')
        this.family_hist = getDotData(val, 'family_hist')
        this.marriage_hist = getDotData(val, 'marriage_hist')
      }
    },
  },
  props: {
    basicInformationData: {
      type: Object,
    },
  },
  methods: {
//
    allPickUp() {
      this.$refs.familyHistory.unfold()
      this.$refs.previousHistory.unfold()
      this.$refs.geneticDiseaseHistory.unfold()
      this.$refs.maritalHistory.unfold()
      this.$refs.occupationHistory.unfold()
      this.$refs.radioactivityHistory.unfold()
      this.$refs.personalLifeHistory.unfold()
      this.$refs.surroundingsHistory.unfold()
      this.$refs.menstruationHistory.unfold()
      this.$refs.bearHistory.unfold()
      this.$refs.otherHistory.unfold()
    },
    allSpread() {
      this.$refs.familyHistory.retract()
      this.$refs.previousHistory.retract()
      this.$refs.geneticDiseaseHistory.retract()
      this.$refs.maritalHistory.retract()
      this.$refs.occupationHistory.retract()
      this.$refs.radioactivityHistory.retract()
      this.$refs.personalLifeHistory.retract()
      this.$refs.surroundingsHistory.retract()
      this.$refs.menstruationHistory.retract()
      this.$refs.bearHistory.retract()
      this.$refs.otherHistory.retract()
    },
    refresh() {
      this.$emit('refresh')
    },
    allPickUpMouseover() {
      this.allUnfold = 'allUnfoldblue'
    },
    allPickUpMouseout() {
      this.allUnfold = 'allUnfold'
    },
    allretractMouseover() {
      this.allretract = 'allretractblue'
    },
    allretractMouseout() {
      this.allretract = 'allretract'
    },
  },
  mounted() {
//
  },
}

</script>
<style >
  
</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.more{
background: #FFFFFF;
border: 1px solid #E0E0E0;
box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
border-radius: 8px;
padding-bottom: 10px;
width: 1033px;
margin: 0 auto;
.allItems{
  padding:0 23px
}
.marginT10{
  margin-top: 10px;
}
.more-title-text{
  width:70px;height:30px;
  font-size: 12px;
  // color: #008CEE;
  color: #737373;
  letter-spacing: 0;
  line-height: 30px;
}
.more-title-text:hover{
  color: #008CEE;
  cursor: pointer;
}
  .basicInformationForm{
    padding: 20px;
    position: relative;
    .more-img-po{
      position: absolute;
      top: 20px;
      right: 20px;;
    }
    .more-img{
      width: 90px ;
      height: 120px;
      border:1px solid red;
    }
  }
  .more-row{
    height: 30px;
  }
  .more-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .more-input{
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .marginL30px{
    margin-left: 30px
  }
  .marginT15{
    margin-top: 15px;
  }
  .more-row-detail{
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;  
}
}
</style>