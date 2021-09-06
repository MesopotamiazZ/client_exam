<template>
  <div class="menstruationHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>月经史</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr menstruationHistory-title-btn"
               style="margin-left:10px"
               @click="isAllPickUp">
            <Icon :type="thisItems ? 'arrow-up-b' : 'arrow-down-b'"
                  size="8"
                  color="white"
                  style="margin-top:5px;"></Icon>
          </div>
          <ZButton :ZBtype='"ghost"'
                   class="fr"
                   @click="compile">编 辑</ZButton>
        </div>
      </div>
    </titleHasSlotMiddle>
    <div v-if="thisItems"
         class="thisItems">
      <div style="height:40px">
        <div class="fl menstruationHistory-table-rowOne menstruationHistory-table-background"
             style="width:105px;">初潮（岁）</div>
        <div class="fl menstruationHistory-table-rowOne "
             style="width:105px;">{{menstrualHist.menarche_age?menstrualHist.menarche_age:'/'}}</div>
        <div class="fl menstruationHistory-table-rowOne menstruationHistory-table-background"
             style="width:105px;">经期（天）</div>
        <div class="fl menstruationHistory-table-rowOne "
             style="width:135px;">{{menstrualHist.period ?menstrualHist.period:'/'}}</div>
        <div class="fl menstruationHistory-table-rowOne menstruationHistory-table-background"
             style="width:105px;">周期（天）</div>
        <div class="fl menstruationHistory-table-rowOne"
             style="width:140px;">{{menstrualHist.MC?menstrualHist.MC:'/'}}</div>
        <div class="fl menstruationHistory-table-rowOne menstruationHistory-table-background"
             style="width:170px;">停经年龄（岁）</div>
        <div class="fl menstruationHistory-table-rowOne"
             style="width:118px;">{{menstrualHist.menopause_age ? menstrualHist.menopause_age : '/'}}</div>
      </div>
    </div>
    <addMenstruationHistory :Model="isAddNew"
                            @addAbolish="addAbolish"
                            :menstrualHist="copymenstrualHist"
                            @close="addAbolish"
                            @refresh="refresh"></addMenstruationHistory>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import addMenstruationHistory from '../modal/addMenstruationHistory'
import {copy} from '@/utils/helper'
export default {
  name: 'menstruationHistory',
  data() {
    return {
      //
      thisItems: false,
      basicInformationData: {},
      basicInformationRule: {},
      // 弹出框
      isAddNew: false,
      menstrualHist: {
        ha_id: null,
        menarche_age: null,
        period: null,
        MC: null,
        menopause_age: null,
      },
      copymenstrualHist: {
        ha_id: null,
        menarche_age: null,
        period: null,
        MC: null,
        menopause_age: null,
      },

    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    addMenstruationHistory,
  },
  watch: {
    menstrual_hist(val) {
      console.log('月经', val)
      if (val) {
        this.menstrualHist = copy(val, true)
        this.copymenstrualHist = copy(val, true)
      }
    },
  },
  props: {
    allItems: {
      type: Boolean,
      defalut: false,
    },
    menstrual_hist: {
      type: Object,
    },
  },
  methods: {
    //
    unfold() {
      this.thisItems = true
    },
    retract() {
      this.thisItems = false
    },
    isAllPickUp() {
      this.thisItems = !this.thisItems
    },
    compile() {
      this.isAddNew = true
    },
    addAbolish() {
      this.isAddNew = false
    },
    refresh() {
      this.$emit('refresh')
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
.menstruationHistory {
  overflow: hidden;
  .thisItems {
    border-top: 1px solid #cccccc;
  }
  background: #ffffff;
  border: 1px solid #e0e0e0;
  // box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
  border-radius: 8px;
  .menstruationHistory-table-rowOne {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #d9d9d9;
  }
  .menstruationHistory-table-rowOne:last-child {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-right: none;
  }
  .menstruationHistory-table-background {
    background: #e8f2ff;
  }
  .menstruationHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
  }
  .menstruationHistory-title-btn:hover {
    cursor: pointer;
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .menstruationHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .menstruationHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .menstruationHistory-row {
    height: 30px;
  }
  .menstruationHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .menstruationHistory-input {
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
  .menstruationHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>