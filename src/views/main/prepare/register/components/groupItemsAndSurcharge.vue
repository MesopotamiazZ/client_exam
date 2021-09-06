/**
* author      : yhy
* cteate      : 2018/02/24 
* description : 项目列表
*/
<template>
  <div class="group-items-and-surcharge contentBg">
    <div class="top"
         ref="top">
      <title-has-slot>
        <span slot="titletHasSlotLeftTitle">项目列表（{{groupItems.length}}条）</span>
      </title-has-slot>
      <Table class="td-bottom-border"
             :stripe='true'
             :columns="groupItemsColumns"
             :data="groupItems"
             :height="tableHeight"
             :row-class-name="setItemHighlight">
      </Table>
    </div>
    <div class="bottom">
      <Table :stripe='true'
             :columns="surchargeColumns"
             :data="surcharges"
             :height='160'>
      </Table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'group-items-and-surcharge',
  props: {
    groupItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mIndex: -1,
      tableHeight: 0,
      itemTotal: 34,
      groupItemsColumns: [
        {
          title: '序号',
          type: 'index',
          width: 50,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '项目名称',
          width: 170,
          align: 'center',
          ellipsis: true,
          key: 'age',
          render: (createElement, params) => {
            let classes = ['tip', 'bg-green']
            // TODO: 判断组合项目属于 复检 职业必选 职业选检 (需要后台提供字段)
            return createElement(
              'div',
              {
                class: 'box',
              },
              [
                createElement(
                  'span',
                  {
                    class: classes,
                  },
                  ['复'],
                ),
                createElement('span', params.row.name),
              ],
            )
          },
        },
        {
          title: '标准价格',
          width: 74,
          key: 'price',
          align: 'center',
          ellipsis: true,
        },
      ],
      surchargeColumns: [
        {
          title: '附加费名称（组项）',
          key: 'name',
          width: 220,
        },
        {
          title: '价格',
          key: 'price',
          width: 70,
        },
      ],
    }
  },
  computed: {
    ...mapState(['windowHeight']),
    surcharges() {
      let surcharges = []
      this.groupItems.forEach(item => {
        item.surcharges.forEach(surcharge => {
          surcharges.push(surcharge)
        })
      })
      return surcharges
    },
  },
  methods: {
    setItemHighlight(row, index) {
      if (row.in_package) {
        return 'bg-high-green'
      }
    },
    async resetClose() {
      await this.$nextTick()
      this.tableHeight = this.$refs.top.offsetHeight - 50
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = this.$refs.top.offsetHeight - 50
    })
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

<style lang="less">
@import (reference) '~assets/less/color.less';

.group-items-and-surcharge {
  overflow: hidden;
  height: 100%;

  .td-bottom-border {
    td {
      border-bottom: 1px solid @gradeAshFive;
    }
  }

  .box {
    display: flex;

    span:last-child {
      flex: 1;
      text-align: center;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .top {
    height: calc(~'100% - 170px');
    margin-bottom: 10px;
    .ivu-table-wrapper {
      border-bottom: 1px solid @gradeAshFive;
    }
  }

  .bottom {
    border-top: 1px solid @gradeAshFive;
    height: 160px;
  }

  .tip {
    color: #fff;
    font-size: 12px;
    border-radius: 4px;
    padding: 0 2px;
  }

  .bg-green {
    background-color: #83cb54;
  }

  .bg-blue {
    background-color: #68ccff;
  }

  .ivu-table {
    tr.bg-high-green > td {
      background-color: rgb(234, 255, 220);
    }
  }
}
</style>

