<template>
  <Poptip placement="bottom" class="renderHeader" :class="{active: open}" v-model="open">
    <span class="handler title" :class="{active: open, using: open ? false : isEnable}">{{column.title}}</span>
    <div slot="content" class="header-content">
      <div class="box sort-box">
        <span class="handler icon" :style="{'background-image': `url(${descIcon})`}" @click="setFieldSort('desc')"></span>
        <span class="handler icon" :style="{'background-image': `url(${ascIcon})`}" @click="setFieldSort('asc')"></span>
      </div>
      <div class="box" v-for="(item, index) in option" :key="index">
        <span class="handler" @click="handlerClick($event, index)">
          <icheck v-model="selectOption[index].checked" ref="check">
            <span>{{ item }}</span>
          </icheck>
        </span>
      </div>
      <div class="box">
        <div class="resetBtn handler" @click="resetFilter">重置筛选</div>
      </div>
    </div>
  </Poptip>
</template>

<script>
import icheck from '@/components/checkbox/checkbox'

export default {
  name: 'headerRender',
  components: {
    icheck,
  },
  props: {
    column: Object,
    option: Array,
  },
  data() {
    return {
      open: false,
      single: true,
      selectOption: [],
      sort: null,
      ascIconPath: '/static/icons/table-header/asc.svg',
      ascActiveIconPath: '/static/icons/table-header/asc-active.svg',
      descIconPath: '/static/icons/table-header/desc.svg',
      descActiveIconPath: '/static/icons/table-header/desc-active.svg',
    }
  },
  methods: {
    handlerClick(e, index) {
      if (e.target.localName === 'input') {
        return
      }
      this.$refs.check[index].change()
    },
    resetFilter() {
      for (let i in this.selectOption) {
        this.selectOption[i].checked = true
      }
      this.sort = null
    },
    setFieldSort(direction) {
      if (direction === this.sort) {
        this.sort = null
      } else {
        this.sort = direction
      }
    },
  },
  created() {
    this.option.forEach((item, index) => {
      this.selectOption.push({
        checked: true,
        value: index,
      })
    })
  },
  mounted() {
    // 把padding设置为0为背景铺满颜色
    this.$el.parentNode.style.padding = '0'
  },
  computed: {
    filterList() {
      let opList = []
      for (let i in this.selectOption) {
        if (this.selectOption[i].checked) {
          opList.push(this.selectOption[i].value)
        }
      }
      return opList
    },
    isEnable() {
      return (
        this.sort !== null || this.selectOption.some(item => !item.checked)
      )
    },
    ascIcon() {
      return this.sort === 'asc' ? this.ascActiveIconPath : this.ascIconPath
    },
    descIcon() {
      return this.sort === 'desc' ? this.descActiveIconPath : this.descIconPath
    },
  },
  watch: {
    selectOption: {
      deep: true,
      handler() {
        this.$emit(
          'fieldSearch',
          this.selectOption.filter(item => item.checked).map(item => item.value)
        )
      },
    },
    sort() {
      this.$emit('fieldSort', this.sort)
    },
  },
}
</script>

<style lang="less" >
.renderHeader {
  width: 100%;

  .ivu-checkbox-wrapper {
    margin-right: 0;
    height: 20px;
  }
  .ivu-poptip-popper {
    box-shadow: 0 2px 10px 0 rgba(115, 115, 115, 0.5);
    padding: 0;
    .ivu-poptip-arrow {
      display: none;
    }
  }
}
</style>


<style lang="less" scoped>
.renderHeader {
  &.active {
    background: #008cee;
  }
  .handler {
    cursor: pointer;
  }
  .title {
    &::after {
      content: " ";
      height: 0;
      width: 0;
      border: solid transparent;
      border-width: 4px;
      border-top-color: #b3b3b3;
      top: 12px;
      position: relative;
    }
    &.active {
      color: #fff;
    }
    &.active::after {
      border-top-color: #fff;
    }
    &.using::after {
      border-top-color: #008cee;
    }
  }
  .header-content {
    min-width: 90px;

    .box {
      padding: 10px;
      border-bottom: 1px solid #d9d9d9;
      font-size: 0;

      &:last-child {
        border-bottom: none;
      }
    }
    .sort-box {
      display: flex;
      justify-content: space-between;
      .icon {
        width: 26px;
        height: 26px;
        display: inline-block;
      }
    }
    .resetBtn {
      text-align: center;
      font-size: 12px;
      color: #008cee;
      letter-spacing: 0.03px;
    }
  }
}
</style>
