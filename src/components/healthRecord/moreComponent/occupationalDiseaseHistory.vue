<template>
  <div class="occupationalDiseaseHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>职业疾病史</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr occupationalDiseaseHistory-title-btn"
               style="margin-left:10px"
               @click="isAllPickUp">
            <Icon :type="thisItems ? 'arrow-up-b' : 'arrow-down-b'"
                  size="8"
                  color="white"
                  style="margin-top:5px;"></Icon>
          </div>
          <ZButton :ZBtype='"ghost"'
                   class="fr"
                   @click="openM">新 增</ZButton>
        </div>
      </div>
    </titleHasSlotMiddle>
    <div class="table-header clearBoth"
         v-if="thisItems">
      <ul class="table-choose fl clearBoth">
        <li v-for='(data,index) in datas'
            class="curPointer"
            :key="index"
            @click="addClassFun(data.name,index)"
            :class='{clickChange:data.name===chooseIndex}'>{{data.data}}</li>
      </ul>
    </div>
    <div v-if="thisItems"
         calss="thisItems"
         style="overflow:auto">
      <ZTable :isShowSelectOrIndex="false"
              border
              stripe
              :columns="columns"
              :data="detilData"
              :isDependent="true"
              style="border:none;"
              :width="'1490'"></ZTable>

              
    </div>
    <addOccupationalDiseaseHistory :Model="newAdd"
                                   @addAbolish="addAbolish"></addOccupationalDiseaseHistory>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import ZTable from '@/components/table/zTable'
import addOccupationalDiseaseHistory from '../modal/addOccupationalDiseaseHistory'

export default {
  name: 'occupationalDiseaseHistory',
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
      chooseIndex: 'order',
      basicInformationData: {},
      basicInformationRule: {},
      // 摩太框
      newAdd: false,
      datas: {
        data2: {
          data: '职业史',
          name: 'order',
        },
        data3: {
          data: '放射工作职业史',
          name: 'check',
        },
        data4: {
          data: '职业病史',
          name: 'sign',
        },
      },
      columns: [
        {
          title: '工作单位',
          type: 'index',
        },
        {
          title: '起止年月',
          type: 'index',
        },
        {
          title: '从业行业',
          type: 'index',
        },
        {
          title: '部门',
          type: 'index',
        },
        {
          title: '工种',
          type: 'index',
        },
        {
          title: '工龄',
          type: 'index',
        },
        {
          title: '职业危害因素',
          type: 'index',
        },
        {
          title: '照射源',
          type: 'index',
        },
        {
          title: '防护措施',
          type: 'index',
        },
        {
          title: '备注',
          type: 'index',
        },
      ],
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    ZTable,
    addOccupationalDiseaseHistory,
  },
  watch: {},
  props: {
    allItems: {
      type: Boolean,
      defalut: false,
    },
    detilData: {
      type: [Object, Array],
      defalut() {
        return {}
      },
    },
  },
  methods: {
    //
    isAllPickUp() {
      this.thisItems = !this.thisItems
    },
    addClassFun(a) {
      this.chooseIndex = a
    },
    openM() {
      this.newAdd = true
    },
    // 取消摩太框
    addAbolish() {
      this.newAdd = false
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
.occupationalDiseaseHistory {
  .ivu-table::before {
    width: 0;
    height: 0;
  }
  .ivu-table::after {
    width: 0;
    height: 0;
  }
  background: #ffffff;
  border: 1px solid #e0e0e0;
  // box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
  border-radius: 8px;

  .thisItems {
    width: 1033px;
  }
  .occupationalDiseaseHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
  }
  .occupationalDiseaseHistory-title-btn:hover {
    cursor: pointer;
  }
  .table-header {
    height: 50px;
    border-bottom: 1px solid @gradeAshFive;
    .table-choose {
      padding-left: 20px;
      line-height: 47px;
      font-size: 14px;
      > li {
        margin-right: 25px;
        float: left;
        color: @gradeAshThree;
        // border-bottom:3px solid red;
        border-bottom: 3px solid transparent;
        > span {
          font-size: 12px;
          line-height: 18px;
          padding-left: 4px;
          padding-right: 4px;
          color: @contentBg;
          margin-left: 3px;
          display: inline-block;
          border-radius: 100px;
          background: @gradeAshFour;
        }
      }
      li:hover {
        color: @gradeBlueOne;
        font-weight: bold;
        > span {
          font-weight: normal;
          background: #83cb54;
        }
      }
      .clickChange {
        color: @gradeBlueOne;
        font-weight: bold;
        border-bottom: 3px solid @gradeBlueOne;
        > span {
          font-weight: normal;
          background: #83cb54;
        }
      }
    }
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .occupationalDiseaseHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .occupationalDiseaseHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .occupationalDiseaseHistory-row {
    height: 30px;
  }
  .occupationalDiseaseHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .occupationalDiseaseHistory-input {
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
  .occupationalDiseaseHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>