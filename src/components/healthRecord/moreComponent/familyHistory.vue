<template>
  <div class="familyHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>家族史</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr familyHistory-title-btn"
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
    <addFamilyHistory
                      :Model="isAddNew"
                      ref="addFamilyHistory"
                      @addAbolish="addAbolish"
                      :id="basicInformationData.id"
                      @refresh="refresh"></addFamilyHistory>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import ZTable from '@/components/table/zTable'
import addFamilyHistory from '../modal/addFamilyHistory'

export default {
  name: 'familyHistory',
  data() {
    return {
      //
      basicInformationRule: {},
      isAddNew: false,
      thisItems: false,
      detilData: [],
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    ZTable,
    addFamilyHistory,
  },
  watch: {
    basicInformationData(val) {
      if (val) {
        this.detilData = val.family_hist
      }
    },
  },
  computed: {
    columns() {
      return [
        {
          title: '与本人关系',
          key: 'relation',
          width: 120,
          render: (h, params) => {
            if (params.row.relation === 1) {
              return h('div', '父亲')
            }
            if (params.row.relation === 2) {
              return h('div', '母亲')
            }
            if (params.row.relation === 3) {
              return h('div', '兄弟姐妹')
            }
            if (params.row.relation === 4) {
              return h('div', '子女')
            }
          },
        },
        {
          title: '家族病',
          key: 'value',
          render: (h, params) => {
            let data = params.row.value
            let a = ''
            for (let key of data) {
              a += key.name + '、'
            }
            a = a.substring(0, a.length - 1)
            return h('div', a)
          },
        },
      ]
    },
  },
  props: {
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
    addNew() {
      this.isAddNew = true
      this.$refs.addFamilyHistory.openM(this.detilData)
    },
    addAbolish() {
      this.isAddNew = false
    },
    refresh() {
      this.isAddNew = false
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
.familyHistory {
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
  background: #ffffff;
  border: 1px solid #e0e0e0;
  // box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
  border-radius: 8px;
  overflow: hidden;
  .familyHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
  }
  .familyHistory-title-btn:hover {
    cursor: pointer;
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .familyHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .familyHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .familyHistory-row {
    height: 30px;
  }
  .familyHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .familyHistory-input {
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
  .familyHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>