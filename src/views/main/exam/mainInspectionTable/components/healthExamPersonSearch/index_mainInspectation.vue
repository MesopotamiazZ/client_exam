<template>
  <div class="search-person-wrapper" v-show="isShowBox">
    <div class="search-bar-wrapper">
      <input type="text" v-model="searchText" placeholder="请输入体检好/姓名" class="search-box" @input="searchPerson">
      <i class="search-icon"></i>
    </div>
    <div class="will-exam-person-wrapper">
      <titletHasSlot style="border-radius:8px 8px 0 0;">
        <span slot='titletHasSlotLeftTitle'>
          可主检人员<span class="title-numbers">({{willExamData.length}})</span>
        </span>
      </titletHasSlot>
      <div>
        <ZTable :isShowSelectOrIndex="false" border stripe :columns="columns"
          :data="willExamDataCopy" :height="160" :isDependent="true">
        </ZTable>
      </div>
    </div>
    <div class="be-examed-person-wrapper">
      <titletHasSlot style="border-radius:8px 8px 0 0;">
        <span slot='titletHasSlotLeftTitle'>
          已主检人员<span class="title-numbers">({{beExamedData.length}})</span>
        </span>
      </titletHasSlot>
      <div>
        <ZTable :isShowSelectOrIndex="false" border stripe :columns="columns"
          :data="beExamedDataCopy" :height="160" :isDependent="true">
        </ZTable>
      </div>
    </div>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlotMiddle'
import ZTable from '@/components/table/zTable.vue'
export default {
  name: 'healthExamPersonSearch',
  components: {
    titletHasSlot,
    ZTable,
  },
  props: {
    willExamData: {
      type: Array,
      default() {
        return []
      },
    },
    beExamedData: {
      type: Array,
      default() {
        return []
      },
    },
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    isShowBox: {
      type: Boolean,
      default: false,
    },
    searchTargetColumns: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      searchText: '',
      willExamDataCopy: this.willExamData,
      beExamedDataCopy: this.beExamedData,
    }
  },
  methods: {
    showExamPersonBox() {
      this.isShowBox = !this.isShowBox
    },
    searchPerson() {
      let searchText = this.searchText
      if (searchText && this.searchTargetColumns.length) {
//        this.willExamDataCopy = this.willExamData.filter((item) => {
//          return item.checkNo === this.searchText || item.name === this.searchText
//        })
//        this.beExamedDataCopy = this.beExamedData.filter((item) => {
//          return item.checkNo === this.searchText || item.name === this.searchText
//        })
        let waiting = []
        this.searchTargetColumns.forEach((searchCol) => {
          waiting = waiting.concat(this.willExamData.filter((item) => {
            return item[searchCol].indexOf(searchText) >= 0 && waiting.indexOf(item) === -1
          }))
        })
        this.willExamDataCopy = waiting
        let complete = []
        this.searchTargetColumns.forEach((searchCol) => {
          waiting = complete.concat(this.beExamedData.filter((item) => {
            return item[searchCol].indexOf(searchText) >= 0 && complete.indexOf(item) === -1
          }))
        })
        this.beExamedDataCopy = complete
      } else {
        this.willExamDataCopy = this.willExamData
        this.beExamedDataCopy = this.beExamedData
      }
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
@import '~assets/less/color.less';
::-webkit-input-placeholder{
  color: #ccc;
}
.search-person-wrapper {
  background: #eee;
  width: 323px;
  height: 551px;
  position: absolute;
  top: 50px;
  left: 100px;
  z-index: 999;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  box-shadow: 0 1px 6px 0 rgba(206,213,242,0.80);
  overflow: hidden;
  .search-bar-wrapper{
    box-sizing: border-box;
    border-bottom: 1px solid @gradeAshFive;
    padding: 10px 20px;
    .search-box{
      width: 190px;
      height: 30px;
      background: #FFFFFF;
      border: 1px solid #CCCCCC;
      border-radius: 4px;
      font-size: 12px;
      line-height: 16px;
      padding-left: 10px;
      padding-right: 35px;
    }
    .search-icon{
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url(/static/icons/public/search.png);
      position: absolute;
      top: 18px;
      right: 30px;
    }
  }
  .title-numbers{
    color: @gradeBlueOne;
    font-size: @font12;
  }
  .will-exam-person-wrapper{}
  .be-examed-person-wrapper{}
}
</style>
