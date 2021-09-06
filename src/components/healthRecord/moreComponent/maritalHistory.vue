<template>
  <div class="maritalHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>婚姻史</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr maritalHistory-title-btn"
               style="margin-left:10px"
               @click="isAllPickUp">
            <Icon :type="thisItems ? 'arrow-up-b' : 'arrow-down-b'"
                  size="8"
                  color="white"
                  style="margin-top:5px;"></Icon>
          </div>
          <ZButton :ZBtype='"ghost"'
                   class="fr"
                   @click="addNew">新 增</ZButton>
        </div>
      </div>
    </titleHasSlotMiddle>
    <div v-if="thisItems"
         class="thisItems">
      <ZTable :isShowSelectOrIndex="false"
              border
              stripe
              :columns="columns"
              :data="detilData"
              :isDependent="true"
              style="border:none;"></ZTable>
    </div>
    <addMaritalHistory ref="addMaritalHistory"
                       @refresh="refresh"
                       :Model="isAddNew"
                       @addAbolish="addAbolish"
                       :id="basicInformationData.id"
                       ></addMaritalHistory>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import ZTable from '@/components/table/zTable'
import addMaritalHistory from '../modal/addMaritalHistory'
import { timeFilter } from '@/utils/fifters'
import { copy } from '@/utils/helper'
export default {
  name: 'maritalHistory',
  data() {
    return {
      //
      unfold() {
        this.thisItems = true
      },
      retract() {
        this.thisItems = false
      },
      detilData: [], // 数据
      thisItems: false,
      basicInformationRule: {},
      isAddNew: false,
      copyData: [],
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    ZTable,
    addMaritalHistory,
  },
  watch: {
    basicInformationData(val) {
      this.detilData = val.marriage_hist
      this.copyData = copy(val.marriage_hist, true)
      console.log('婚姻史数据', this.detilData)
    },
  },
  computed: {
    columns() {
      return [
        {
          title: '结婚日期',
          key: 'wedding_date',
          render: (h, params) => {
            let a
            a = timeFilter(params.row.wedding_date, 'YYYY-MM-DD')
            return h('div', a)
          },
        },
        {
          title: '配偶职业',
          key: 'spouse_occup',
        },
        {
          title: '配偶接触放射线情况',
          key: 'spouse_radioactive',
          render: (h, params) => {
            let a = ''
            if (params.row.spouse_radioactive) {
              a = '是'
            } else {
              a = '否'
            }
            return h('div', a)
          },
        },
        {
          title: '配偶健康状况',
          key: 'spouse_health',
        },
      ]
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
    timeFilter,
    //
    isAllPickUp() {
      this.thisItems = !this.thisItems
    },
    addNew() {
      console.log('11')
      this.isAddNew = true
      this.$refs.addMaritalHistory.setData(this.copyData)
    },
    addAbolish() {
      this.isAddNew = false
    },
    refresh() {
      this.$emit('refresh')
      this.isAddNew = false
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
.maritalHistory {
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  // box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
  border-radius: 8px;
  .ivu-table::before {
    width: 0;
    height: 0;
  }
  .ivu-table::after {
    width: 0;
    height: 0;
  }

  .thisItems {
    border-top: 1px solid #cccccc;
  }
  .maritalHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
  }
  .maritalHistory-title-btn:hover {
    cursor: pointer;
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .maritalHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .maritalHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .maritalHistory-row {
    height: 30px;
  }
  .maritalHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .maritalHistory-input {
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
  .maritalHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>