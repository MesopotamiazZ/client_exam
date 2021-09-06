<template>
  <div class="bearHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>生育史</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr bearHistory-title-btn"
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
      <div class="bearHistory-table">
        <div style="height:40px">
          <div class="fl bearHistory-table-rowOne bearHistory-table-background"
               style="width:150px;">现有子女（人）</div>
          <div class="fl bearHistory-table-rowOne "
               style="width:105px;">{{(birth_hist.child_num || birth_hist.child_num ===0)?birth_hist.child_num:'/'}}</div>
          <div class="fl bearHistory-table-rowOne bearHistory-table-background"
               style="width:100px;">流产（次）</div>
          <div class="fl bearHistory-table-rowOne "
               style="width:95px;">{{(birth_hist.abortion_num || birth_hist.abortion_num===0)?birth_hist.abortion_num:'/'}}</div>
          <div class="fl bearHistory-table-rowOne bearHistory-table-background"
               style="width:100px;">早产（次）</div>
          <div class="fl bearHistory-table-rowOne"
               style="width:80px;">{{(birth_hist.preterm_num || birth_hist.preterm_num===0)?birth_hist.preterm_num:'/'}}</div>
          <div class="fl bearHistory-table-rowOne bearHistory-table-background"
               style="width:100px;">死产（次）</div>
          <div class="fl bearHistory-table-rowOne"
               style="width:80px;">{{(birth_hist.stillbirth_num || birth_hist.stillbirth_num===0)?birth_hist.stillbirth_num:'/'}}</div>
          <div class="fl bearHistory-table-rowOne bearHistory-table-background"
               style="width:100px;">异常胎（次）</div>
          <div class="fl bearHistory-table-rowOne"
               style="width:73px;">{{(birth_hist.abn_fetal_num|| birth_hist.abn_fetal_num===0)?birth_hist.abn_fetal_num:'/'}}</div>
        </div>
        <div style="height:40px">
          <div class="fl bearHistory-table-rowTwo bearHistory-table-background"
               style="width:150px;">孕（次）</div>
          <div class="fl bearHistory-table-rowTwo "
               style="width:105px;">{{(birth_hist.pregnant_num||birth_hist.pregnant_num===0)?birth_hist.pregnant_num:'/'}}</div>
          <div class="fl bearHistory-table-rowTwo bearHistory-table-background"
               style="width:100px;">活产（次）</div>
          <div class="fl bearHistory-table-rowTwo "
               style="width:95px;">{{(birth_hist.live_birth_num||birth_hist.live_birth_num===0)?birth_hist.live_birth_num:'/'}}</div>
          <div class="fl bearHistory-table-rowTwo bearHistory-table-background"
               style="width:100px;">自然流产（次）</div>
          <div class="fl bearHistory-table-rowTwo"
               style="width:80px;">{{(birth_hist.natural_abortion_num || birth_hist.natural_abortion_num===0)?birth_hist.natural_abortion_num:'/'}}</div>
          <div class="fl bearHistory-table-rowTwo bearHistory-table-background"
               style="width:100px;">多胎（次）</div>
          <div class="fl bearHistory-table-rowTwo"
               style="width:80px;">{{(birth_hist.multiple_birth || birth_hist.multiple_birth===0)?birth_hist.multiple_birth:'/'}}</div>
          <div class="fl bearHistory-table-rowTwo bearHistory-table-background"
               style="width:100px;">异位妊娠（次）</div>
          <div class="fl bearHistory-table-rowTwo"
               style="width:73px;">{{(birth_hist.eccyesis_num || birth_hist.eccyesis_num===0)?birth_hist.eccyesis_num:'/'}}</div>
        </div>
        <div style="height:40px">
          <div style="display:flex">
            <div class="fl bearHistory-table-rowThree bearHistory-table-background"
                 style="width:150px;">不孕不育原因</div>
            <div class="fl bearHistory-table-rowThree  "
                 style="width:200px;flex:1;border-right:none">{{birth_hist.infertility_cause?birth_hist.infertility_cause:'/'}}</div>
          </div>
        </div>
        <div style="height:40px">
          <div style="display:flex">
            <div class="fl bearHistory-table-rowThree bearHistory-table-background"
                 style="width:150px;border-bottom:none">子女健康状况</div>
            <div class="fl bearHistory-table-rowThree  "
                 style="width:200px;flex:1;border:none">{{birth_hist.child_health_cond?birth_hist.child_health_cond:'/'}}</div>
          </div>
        </div>
      </div>
    </div>
    <addBearHistory :birth="birth_hist"
                    :id="basicInformationData.id"
                    :Model="isAddNew"
                    @addAbolish="addAbolish"
                    @refresh="refresh"></addBearHistory>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import addBearHistory from '../modal/addBearHistory'

export default {
  name: 'bearHistory',
  data() {
    return {
      //
      basicInformationRule: {},
      // 弹出框
      isAddNew: false,
      thisItems: false,
      birth_hist: {
        child_num: null,
        abortion_num: '',
        preterm_num: '',
        stillbirth_num: '',
        abn_fetal_num: '',
        pregnant_num: '',
        live_birth_num: '',
        multiple_birth: '',
        natural_abortion_num: '',
        eccyesis_num: '',
        infertility_cause: '',
        child_health_cond: '',
      },
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    addBearHistory,
  },
  watch: {
    basicInformationData(val) {
      if (val) {
        this.$nextTick(() => {
          this.birth_hist = val.birth_hist
          console.log(this.birth_hist, '生育史生育史生育史生育史')
        })
      }
    },
  },
  props: {
    allItems: {
      type: Boolean,
      defalut: false,
    },
    basicInformationData: {
      type: [Object, Array],
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
.bearHistory {
  overflow: hidden;
  .thisItems {
    border-top: 1px solid #cccccc;
  }
  background: #ffffff;
  border: 1px solid #e0e0e0;
  // box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
  border-radius: 8px;
  margin: 0 auto;
  .bearHistory-table {
    height: 160px;
    .bearHistory-table-background {
      background: #e8f2ff;
    }
    .bearHistory-table-rowOne {
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
    }
    .bearHistory-table-rowOne:last-child {
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-right: none;
      border-bottom: 1px solid #d9d9d9;
    }
    .bearHistory-table-rowTwo {
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
    }
    .bearHistory-table-rowThree {
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
    }
    .bearHistory-table-rowTwo:last-child {
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-right: none;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  .bearHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    border-radius: 4px;
    text-align: center;
  }
  .bearHistory-title-btn:hover {
    cursor: pointer;
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .bearHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .bearHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .bearHistory-row {
    height: 30px;
  }
  .bearHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .bearHistory-input {
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
  .bearHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>