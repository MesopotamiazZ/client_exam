<template>
  <div class="type-filter">
    <ul class="ul-box">
      <li class="item" @click="clickSelectAll($event)">
        <icheck v-model="selectAll" ref="selectAll">
          <span>全部</span>
        </icheck>
      </li>
      <li v-for="(item,index) in options" class="item" @click="checkboxClick($event, index)">
        <icheck :label="item.value" v-model="selectOption[index].checked" ref="check">
          <span>{{ item.label }}</span>
        </icheck>
      </li>
    </ul>
    <div class="clearFilter">
      <span @click="clearFilter">清除筛选</span>
    </div>
  </div>
</template>
<script>
import icheck from '@/components/checkbox/checkbox'
export default {
  components: {
    icheck,
  },
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      selectOption: this.options.map(item => {
        return {
          value: item.value,
          checked: item.checked !== false,
        }
      }),
      selectAll: true,
      watchSelectAll: true,
    }
  },
  watch: {
    options(cur) {
      this.selectOption = cur.map(item => {
        return {
          value: item.value,
          checked: item.checked !== false,
        }
      })
    },
    selectOption: {
      deep: true,
      handler() {
        let arr = this.selectOption.filter(item => item.checked).map(item => item.value)
        if (arr.length === this.selectOption.length) {
          this.selectAll = true
        } else {
          this.selectAll = false
        }
        this.$nextTick(() => {
          this.watchSelectAll = true
        })
        this.$emit('filterValueChange', arr.length === this.selectOption.length ? [] : arr)
      },
    },
    selectAll(cur) {
      if (!this.watchSelectAll) {
        return
      }
      this.selectOption.forEach(item => {
        item.checked = cur
      })
    },
  },
  methods: {
    checkboxClick(e, index) {
      this.watchSelectAll = false
      if (e.target.localName === 'input') {
        return
      }
      this.$refs.check[index].change()
    },
    clickSelectAll(e) {
      if (e.target.localName === 'input') {
        return
      }
      this.$refs.selectAll.change()
    },
    clearFilter() {
      // for (let i in this.selectOption) {
      //   this.selectOption[i].checked = false
      // }
      this.selectAll = true
      this.$emit('clearFilter')
    },
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .type-filter{
    .ul-box{
      max-height: 240px;
      overflow: auto;
    }
    .item{
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 12px;
      border-bottom: 1px solid @gradeAshFive;
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