 /**
  * 表头排序组件
  * @author 张祥
  * @date 2018/3/7
  */
<template>
  <div class="table-head-sort" :class="{paddingR10:(sort==='asc'||sort==='desc')&&sortKey===column.key}">
    <span class="title" @click="setFieldSort">{{column.title}}</span>
    <Icon v-if="sort==='asc'&&sortKey===column.key" type="ios-arrow-thin-up"></Icon>
    <Icon v-if="sort==='desc'&&sortKey===column.key"type="ios-arrow-thin-down"></Icon>
  </div>
</template>
<script>
export default {
  name: 'table-head-sort',
  props: {
    column: Object,
    sortKey: String,
  },
  data() {
    return {
      sort: '',
    }
  },
  watch: {
    sortKey() {
      if (this.sortKey !== this.column.key) {
        this.sort = ''
      }
    },
  },
  methods: {
    setFieldSort() {
      if (this.sort === '') {
        this.sort = 'asc'
      } else if (this.sort === 'asc') {
        this.sort = 'desc'
      } else if (this.sort === 'desc') {
        this.sort = ''
      }
      this.$emit('sortChange', this.column.key, this.sort)
    },
  },
  mounted() {
    this.$el.parentNode.classList.add('custom-head-cell-sort')
  },
}
</script>
<style lang="less">
  .ivu-table-cell.custom-head-cell-sort{
    padding: 0;
    width: 100%;
  }
  .table-head-sort{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: calc(~'100% - 10px');
    margin: auto;
    .title{
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ivu-icon-ios-arrow-thin-up,
    .ivu-icon-ios-arrow-thin-down{
      position: absolute;
      font-size: 18px;
      font-weight: bold;
      color:#0066D4;
      margin-left: 3px;
      top: 11px;
    }
  }
</style>