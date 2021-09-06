/** 
* @author 覃凤
* @date 2018/2/26
* @content 体检预约-前台预约-套餐显示（含本地搜索）
* packages：套餐列表
* selectedPackage：当前选择套餐
*/
<template>
  <div class="package-search-tab">
    <div class="container">
      <div class="package-search">
        <div style="width: 300px;">
          <local-search-input @search-key='localSearch'></local-search-input>
        </div>
      </div>
      <div class="packages-tab">
        <div class="packages-tab-title">
          <ul class="flex">
            <li class="style-li overflowEllipsis"
                v-for='(column, index) in packageColumns'
                :key="index">{{ column.title }}</li>
          </ul>
        </div>
        <div class="packages-tab-content">
          <ul class="packages-tab-content-ul"
              ref="packageContainer">
            <template v-if="filterPackages.length">
              <li :key="package.id"
                  v-for='(package, index) in filterPackages'
                  @click="selectPackage(package)"
                  :class="{active: curSelectedPackage.id === package.id}"
                  :ref="`package${package.id}`">
                <ul class="tab-content-list-ul flex">
                  <template v-for="(column, index2) in packageColumns">
                    <li class="style-li overflowEllipsis">
                      <div class="row-cell"
                           v-if="column.pipe">{{ column.pipe(column.key, package[column.key]) }}</div>
                      <div class="row-cell"
                           v-else>{{ package[column.key] }}</div>
                    </li>
                  </template>
                </ul>
              </li>
            </template>
            <div v-else
                 class="no-data-row">{{noDataMsg}}</div>
          </ul>
        </div>
      </div>
    </div>
    <div class="package-group-items">
      <div>
        <alert-header-for-modal headerText='套餐内项目'></alert-header-for-modal>
        <ul>
          <li class="list-header line">项目名称</li>
          <li class="list-content">
            <template v-if="packageGroupItems.length">
              <div class="line"
                   v-for='(item, index) in packageGroupItems'
                   :key="index">
                {{ item.name }}
              </div>
            </template>
            <div v-else
                 class="line">
              暂无数据
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'chooseItemsModalPackages',
  props: {
    packages: {
      type: Array,
      default: () => [],
    },
    selectedPackage: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      keyword: '',
      packageColumns: [
        {
          title: '适用对象',
          key: 'target',
          pipe: this.targetDict,
        },
        {
          title: '套餐名称',
          key: 'name',
        },
        {
          title: '项目合计价格',
          key: 'group_price',
        },
        {
          title: '套餐价格',
          key: 'price',
        },
      ],
      curSelectedPackage: {},
    }
  },
  computed: {
    ...mapGetters('frontAppointmentModule', ['selectOptionDict']),
    // 过滤后的套餐
    filterPackages() {
      return this.packages.filter(pc => {
        return this.filter(pc.name, this.keyword)
      })
    },
    // 无数据时显示内容
    noDataMsg() {
      return this.packages.length ? '未筛选到数据' : '暂无数据'
    },
    // 当前套餐组合项目
    packageGroupItems() {
      return this.curSelectedPackage.group_items || []
    },
  },
  methods: {
    localSearch(keyword) {
      this.keyword = keyword
    },
    filter(data) {
      if (this.keyword === '') {
        return true
      }
      if (data.indexOf(this.keyword) === -1) {
        return false
      } else {
        return true
      }
    },
    targetDict(key, value) {
      return this.selectOptionDict[key][value]
    },
    selectPackage(_package = {}) {
      if (_package.id === this.curSelectedPackage.id) {
        this.curSelectedPackage = {}
        this.$emit('on-select', {})
      } else {
        this.curSelectedPackage = _package
        this.$emit('on-select', _package)
      }
    },
    initCurSelectedPackage() {
      this.curSelectedPackage = Object.assign({}, this.selectedPackage)
    },
    scrollToPackage() {
      if (this.curSelectedPackage.id) {
        let moveToEl = this.$refs[`package${this.curSelectedPackage.id}`]
        this.$nextTick(() => {
          this.$refs.packageContainer.scrollTop =
            (moveToEl && moveToEl[0].offsetTop) || 0
        })
      }
    },
  },
  created() {
    this.initCurSelectedPackage()
    this.scrollToPackage()
  },
  watch: {
    selectedPackage() {
      this.initCurSelectedPackage()
    },
  },
}
</script>
<style lang="less" scoped>
@import '~assets/less/variable.less';
@import (reference) '~assets/less/color.less';
@minWidth: 100px;

.package-search-tab {
  height: 100%;
  width: 100%;
  display: flex;
  .container {
    flex: 1;
    height: 100%;
  }
  .package-search {
    height: 50px;
    padding-top: @num10;
    & > div {
      margin: 0 auto;
    }
  }
  .style-li {
    border-right: 1px solid @gradeAshFive;
    text-align: center;
    height: 40px;
    line-height: 40px;
    min-width: @minWidth;
    .row-cell {
      height: 100%;
      padding-right: 10px;
      padding-left: 10px;
      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;
    }
  }
  .style-li:nth-of-type(1) {
    min-width: 74px;
    .row-cell {
      border-left: 2px solid transparent;
    }
  }
  .style-li:nth-of-type(2) {
    // 套餐名称
    min-width: 410px;
  }
  .style-li:nth-last-of-type(1) {
    flex: 1;
    border-right: none;
    .row-cell {
      border-right: 2px solid transparent;
    }
  }
  .active {
    .style-li {
      .row-cell {
        border-color: @gradeBlueTwo;
        border-right-color: transparent;
      }
    }
    .style-li:nth-last-of-type(1) {
      .row-cell {
        border-right-color: @gradeBlueTwo;
      }
    }
  }
  .tab-title-choose {
    // 选中的列
    width: 50px;
    border-right: 1px solid @gradeAshFive;
    .ivu-radio-wrapper {
      margin-left: 17px;
    }
  }
  .packages-tab {
    height: calc(~'100% - 50px');
    .packages-tab-title {
      height: 40px;
      line-height: 40px;
      & > ul {
        background-color: @tableTh;
        color: @gradeAshOne;
        text-align: center;
      }
    }
    .packages-tab-content {
      height: calc(~'100% - 40px');
      .packages-tab-content-ul {
        // 内容行
        height: 100%;
        overflow: auto;
        color: @gradeAshTwo;
        & > li {
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          overflow: hidden;
        }
        & > li:nth-of-type(2n) {
          background-color: @tableTr;
        }
        & > li:nth-last-of-type(1) {
          border-bottom: 1px solid @gradeAshFive;
        }
      }
    }
  }
  .package-group-items {
    height: 100%;
    width: 200px;
    padding: 0 10px;
    border-left: 1px solid @gradeAshFive;

    & > div {
      height: 100%;
      border-left: 1px solid @gradeAshFive;
      border-right: 1px solid @gradeAshFive;
    }

    & ul {
      height: calc(~'100% - 50px');
      text-align: center;
      font-size: 12px;
      .line {
        height: 40px;
        line-height: 40px;
        padding: 0 @num10;
        &:last-child {
          border-bottom: 1px solid @gradeAshFive;
        }
      }
      .list-header {
        background-color: @tableTh;
        color: @gradeAshOne;
      }
      .list-content {
        height: calc(~'100% - 40px');
        overflow: auto;
        color: @gradeAshTwo;
        div:nth-of-type(2n) {
          background-color: @tableTr;
        }
      }
    }
  }
  .no-data-row {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
</style>
