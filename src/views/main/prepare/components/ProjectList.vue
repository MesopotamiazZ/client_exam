/**
* author      : yhy
* cteate      : 2018/02/24 
* description : 项目列表
*/
<template>
  <div class="project-list contentBg">
    <div class="top"
         ref="top">
      <title-has-slot>
        <span slot="titletHasSlotLeftTitle">项目列表（{{itemTotal}}条）</span>
      </title-has-slot>
      <Table :stripe='true'
             :columns="columns1"
             :data="data1"
             :height="tableHeight"
             :row-class-name="selectHighlight"
             @on-row-click='onRowClick'>
      </Table>
    </div>
    <div class="center"></div>
    <div class="bottom">
      <Table :stripe='true'
             :columns="columns2"
             :data="data1"
             :height='160'>
      </Table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'project-list',
  data() {
    return {
      mtext: '中间',
      mIndex: -1,
      tableHeight: 0,
      itemTotal: 34,
      columns1: [
        {
          title: '序号',
          type: 'index',
          width: 50,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '项目名称',
          width: 177,
          align: 'center',
          ellipsis: true,
          key: 'age',
          render: (createElement, params) => {
            return createElement(
              'div',
              {
                style: {
                  position: 'relative',
                },
              },
              [
                createElement('div', {
                  style: {
                    color: 'blue',
                    fontSize: '14px',
                    position: 'absolute',
                    top: '0px',
                    left: '5px',
                    background:
                      'url(/static/icons/public/closeRed.svg) no-repeat',
                    width: '20px',
                    height: '20px',
                  },
                }),
                createElement('span', this.mtext),
              ],
            )
          },
        },
        {
          title: '标准价格',
          width: 74,
          key: 'address',
          align: 'center',
          ellipsis: true,
        },
      ],
      data1: [
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
        {
          age: '内科检查',
          address: '11000.00',
        },
      ],
      columns2: [
        {
          title: '附加费名称（组项）',
          key: 'age',
        },
        {
          title: '价格',
          key: 'address',
        },
      ],
    }
  },
  computed: {
    ...mapState(['windowHeight']),
  },
  methods: {
    selectHighlight(row, index) {
      if (this.mIndex === index) {
        return 'ivu-table-row-highlight-body-content'
      }
    },
    onRowClick(data, index) {
      this.mIndex = index
    },
    async resetClose() {
      await this.$nextTick()
      this.tableHeight = this.$refs.top.offsetHeight - 50
    },
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.top.offsetHeight - 50
    },
  },
}
</script>

<style lang="less">
@import (reference) '~assets/less/variable.less';
// 单独一行时的样式
.ivu-table-row-highlight-body-content td {
  &:first-child {
    border-left: 2px solid @gradeBlueOne;
  }
  &:last-child {
    border-right: 2px solid @gradeBlueOne;
  }
  border-bottom: 2px solid @gradeBlueOne;
  border-top: 2px solid @gradeBlueOne;
}
</style>

<style lang="less" scoped>
.project-list {
  overflow: hidden;
  height: 100%;
  .top {
    height: calc(~'100% - 160px');
  }
 
  .bottom {
    height: 160px;
  }
}
</style>

