 /**
  * 表头筛选组件
  * @author 张祥
  * @date 2018/2/27
  */
<template>
  <div class="table-head-filter" :class="{open: open}">
    <Poptip v-model="open" placement="bottom">
      <div class="table-head">
        <span class="title" :class="{isFiltering:filtering||sorting}">{{column.title}}</span>
      </div>
      <div slot="content" @mousewheel="mousewheel">
        <div class="sort-box">
          <template>
            <span class="icon marginR15" v-show="sort === 'desc' && sortKey === column.key" :style="{'background-image': `url(${descActiveIconPath})`}" @click="setFieldSort('desc')"></span>
            <span class="icon marginR15" v-show="sort !== 'desc' || sortKey !== column.key" :style="{'background-image': `url(${descIconPath})`}" @click="setFieldSort('desc')"></span>
          </template>
          <template>
            <span class="icon" v-show="sort === 'asc' && sortKey === column.key" :style="{'background-image': `url(${ascActiveIconPath})`}" @click="setFieldSort('asc')"></span>
            <span class="icon" v-show="sort !== 'asc' || sortKey !== column.key" :style="{'background-image': `url(${ascIconPath})`}" @click="setFieldSort('asc')"></span>
          </template>
        </div>
        <div class="filter-box">
          <type-filter v-if="column.filterType==='type'" @filterValueChange="filterValueChange" @clearFilter="clearSort" :options="column.filterOptions"></type-filter>
          <time-filter v-if="column.filterType==='time'" @timeChange="timeChange" @clearFilter="clearSort"></time-filter>
          <date-filter v-if="column.filterType==='date'" @timeChange="timeChange" @clearFilter="clearSort"></date-filter>
        </div>
      </div>
    </Poptip>
  </div>
</template>
<script>
import TypeFilter from './typeFilter.vue'
import TimeFilter from './timeFilter.vue'
import DateFilter from './dateFilter.vue'

export default {
  name: 'table-head-filter',
  props: {
    column: Object,
    sortKey: String,
  },
  components: {
    TypeFilter,
    TimeFilter,
    DateFilter,
  },
  data() {
    return {
      filtering: false,
      sorting: false,
      open: false,
      sort: '',
      ascIconPath: '/static/icons/table-header/asc.svg',
      ascActiveIconPath: '/static/icons/table-header/asc-active.svg',
      descIconPath: '/static/icons/table-header/desc.svg',
      descActiveIconPath: '/static/icons/table-header/desc-active.svg',
      options: [
        {
          value: 0,
          label: '通用',
        },
        {
          value: 1,
          label: '男',
        },
        {
          value: 2,
          label: '女',
        },
      ],
    }
  },
  computed: {
    ascIcon() {
      return this.sort === 'asc' && this.sortKey === this.column.key ? this.ascActiveIconPath : this.ascIconPath
    },
    descIcon() {
      return this.sort === 'desc' && this.sortKey === this.column.key ? this.descActiveIconPath : this.descIconPath
    },
  },
  watch: {
    sortKey() {
      if (this.sortKey !== this.column.key) {
        this.sort = ''
      }
      if (this.sort && this.sortKey === this.column.key) {
        // console.log(this.column.key, '正在排训')
        this.sorting = true
      } else {
        // console.log(this.column.key, '没有排训')
        this.sorting = false
      }
    },
    sort() {
      if (this.sort && this.sortKey === this.column.key) {
        // console.log(this.column.key, '正在排训')
        this.sorting = true
      } else {
        // console.log(this.column.key, '没有排训')
        this.sorting = false
      }
    },
  },
  methods: {
    setFieldSort(direction) {
      if (direction === this.sort) {
        this.sort = ''
      } else {
        this.sort = direction
      }
      this.$emit('sortChange', this.column.key, this.sort)
    },
    filterValueChange(value) {
      this.$emit('filterChange', this.column.key, value)
      if (value.length > 0) {
        // console.log('正在进行类别筛选')
        this.filtering = true
      } else {
        // console.log('没有进行类别筛选')
        this.filtering = false
      }
    },
    clearSort() {
      if (this.sort !== '') {
        this.sort = ''
        this.$emit('sortChange', this.column.key, this.sort)
      }
      // console.log('清除筛选')
      this.sorting = false
      this.filtering = false
    },
    timeChange(start, end) {
      this.$emit('timeChange', start, end)
      if (start && end) {
        // console.log('正在进行时间排训')
        this.filtering = false
      } else {
        // console.log('没有进行时间排训')
        this.filtering = true
      }
    },
    mousewheel(event) {
      event.stopPropagation()
    },
  },
  mounted() {
    this.$el.parentNode.classList.add('custom-head-cell-filter')
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .ivu-table-cell.custom-head-cell-filter{
    padding: 0;
    width: 100%;
  }
  .table-head-filter{
    .title{
      &::after {
        content: "";
        display: inline-block;
        height: 0;
        width: 0;
        border: solid transparent;
        border-width: 4px;
        border-top-color: #b3b3b3;
        top: 3px;
        left: 2px;
        position: relative;
      }
    }
    .isFiltering{
      &::after {
        border-top-color: @gradeBlueOne;
      }
    }
    .sort-box {
      display: flex;
      justify-content: center;
      padding: 12px;
      .icon {
        cursor: pointer;
        width: 26px;
        height: 26px;
        display: inline-block;
      }
    }
    .ivu-poptip-popper {
      box-shadow: 0 2px 10px 0 rgba(115, 115, 115, 0.5);
      padding: 0;
      .ivu-poptip-arrow {
        display: none;
      }
    }
  }
  .table-head-filter.open{
    background: @gradeBlueOne;
    .title{
      color:#fff;
      &::after {
        border-top-color: #fff;
      }
    }
  }
</style>