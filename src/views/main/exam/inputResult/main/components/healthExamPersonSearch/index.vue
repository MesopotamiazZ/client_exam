<template>
  <div class="search-person-wrapper" v-if="isShowBox" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="search-bar-wrapper">
      <input type="text" v-model="searchText" placeholder="请输入体检号/姓名" class="search-box" @input="searchPerson">
      <i class="search-icon"></i>
    </div>
    <div class="will-exam-person-wrapper">
      <titletHasSlot style="border-radius:8px 8px 0 0;">
        <span slot='titletHasSlotLeftTitle'>
          候检人员<span class="title-numbers">({{willExamDataCopy.length}})</span>
        </span>
      </titletHasSlot>
      <div>
        <!-- <ZTable :isShowSelectOrIndex="false" border stripe :columns="columns"
          :data="willExamDataCopy"  :isDependent="true" @on-row-click="onRowClick" :row-class-name="rowClassName">
        </ZTable> -->
        <searchTable :searchTableTitle="'职业病分类列表'" :columns="columns" :dataList="willExamDataCopy"
         @search-type="tableClick"
        :skipName="'interrogationCategory'"
        :ifShowSearchtitle = "false"
        :searchText = 'searchText'
        :clickIndexProp="clickIndex"
        >
        </searchTable>
      </div>
    </div>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlotMiddle'
import ZTable from '@/components/table/zTable.vue'
import searchTable from './searchTable'

export default {
  name: 'healthExamPersonSearch',
  components: {
    titletHasSlot,
    ZTable,
    searchTable,
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
      default: true,
    },
    clickIndex: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      searchText: '',
      willExamDataCopy: [],
      beExamedDataCopy: this.beExamedData,
      isMouseInExamPersonSearch: false,
    }
  },
  watch: {
    'willExamData'(val, oldVal) {
      if (val) {
        this.willExamDataCopy = val
      }
    },
  },
  methods: {
    showExamPersonBox() {
      this.isShowBox = !this.isShowBox
    },
/*     searchPerson() {
      console.log(this.searchText)
      if (this.searchText) {
        this.willExamDataCopy = this.willExamData.filter((item) => {
          return item.checkNo === this.searchText || item.name === this.searchText
        })
        this.beExamedDataCopy = this.beExamedData.filter((item) => {
          return item.checkNo === this.searchText || item.name === this.searchText
        })
      } else {
        this.willExamDataCopy = this.willExamData
        this.beExamedDataCopy = this.beExamedData
      }
    }, */
    onRowClick(selection, row, index) {
      this.$emit('on-row-click', selection, row, index)
    },
    rowClassName(row, index) {
      if (index === 1) {
        console.log(this, 'ffff')
      }
    },
    tableClick(data, index) {
      this.$emit('on-row-click', data, index)
    },
    searchPerson() {
        // console.log('searchInput')
      let temp = []
      this.willExamData.forEach((item, index) => {
        if (this.filter(item)) {
          temp.push(item)
        }
      })
      this.willExamDataCopy = temp
    },
    filter(item) {
      console.log(item)
      if (this.searchText === '') {
        return true
      }
        // 将用户输入的内容按空格拆分成多个关键词
      let keywords = this.searchText
          .toLocaleLowerCase()
          .trim()
          .split(' ')
      let a = true

        // 对每个关键词进行内容匹配，如果有一个没匹配上，就返回false
      for (let i = 0; i < keywords.length; i++) {
        const keyword = keywords[i]
        let b = false
        for (let j = 0; j < this.columns.length; j++) {
          const column = this.columns[j]
          let value = item[column.key]
          let realname = item.customer.realname ? item.customer.realname : '' // 姓名
          if (typeof value === 'number') {
            value = value + ''
          }
          if (typeof value !== 'string') {
            continue
          }
          if (value.toLocaleLowerCase().includes(keyword)) {
            b = true
          }
          if (realname.toLocaleLowerCase().includes(keyword)) {
            b = true
          }
        }
        if (!b) {
          a = !a // 不能用a=false,否则eslint会报a未使用
          break
        }
      }
      return a
    },
    // 鼠标进入/出
    mouseEnter() {
      this.isMouseInExamPersonSearch = true
      this.$emit('exam-person-search-pos', this.isMouseInExamPersonSearch)
    },
    mouseLeave() {
      this.isMouseInExamPersonSearch = false
      this.$emit('exam-person-search-pos', this.isMouseInExamPersonSearch)
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
.ivu-table .demo-table-info-row{
        background-color: #2db7f5;
        color: red;
        border:1px solid red !important;
    }
.search-person-wrapper {
  background: #eee;
  width: 251px;
  height: 551px;
  position: absolute;
  top: 50px;
  left: 30px;
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
      width: 215px;
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
  .will-exam-person-wrapper{
    .call-back{
      color: #F1870C;
    }
  }
  .be-examed-person-wrapper{}
}
</style>