<template>
  <div class="time-filter">
    <div class="item">
      <span class="marginR10">从</span><DatePicker v-model="start_time" type="datetime" placeholder="" style="width: 170px"></DatePicker>
    </div>
    <div class="item">
      <span class="marginR10">至</span><DatePicker v-model="end_time" type="datetime" placeholder="" style="width: 170px"></DatePicker>
    </div>
    <div class="clearFilter">
      <span @click="clearFilter">清除筛选</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'time-filter',
  data() {
    return {
      start_time: '',
      end_time: '',
    }
  },
  watch: {
    start_time(cur) {
      this.timeChange()
    },
    end_time(cur) {
      this.timeChange()
    },
  },
  methods: {
    timeChange() {
      let start = Date.parse(this.start_time)
      if (Number.isNaN(start)) {
        start = ''
      } else {
        start = start / 1000
      }
      let end = Date.parse(this.end_time)
      if (Number.isNaN(end)) {
        end = ''
      } else {
        end = end / 1000
      }
      this.$emit('timeChange', start, end)
    },
    checkboxClick(e, index) {
      if (e.target.localName === 'input') {
        return
      }
      this.$refs.check[index].change()
    },
    clearFilter() {
      this.start_time = ''
      this.end_time = ''
      this.$emit('clearFilter')
    },
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .time-filter{
    .item{
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 12px;
      padding-top: 10px;
      box-sizing: content-box;
    }
    .item:nth-child(1){
      border-top: 1px solid @gradeAshFive;
    }
    .clearFilter{
      text-align: center;
      span{
        cursor: pointer;
        line-height: 40px;
        color: @gradeBlueOne;
      }
    }
  }
</style>