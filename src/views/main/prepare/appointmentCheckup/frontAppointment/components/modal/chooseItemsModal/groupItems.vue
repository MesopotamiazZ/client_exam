/** 
* @author 覃凤
* @date 2018/2/26
* @content 体检预约-前台预约-项目（带搜索）
* headerText：表头名称，showCheckBox：是否显示多选框，data：列表中的数据，chouseData传入的需要显示选中的数据(套餐中的数据)，
* groupItems：展示的组合项目
* groupItemsInPackageIds：当前套餐内的组合项目ID列表
* value：当前选中的组合项目列表 （双向绑定）
*/
<template>
  <div class="choose-items-modal-group-items">
    <alert-header-for-modal :headerText='headerText'>
      <div slot="alertHeaderSearch">
        <div>
          <local-search-input @search-key='localSearch'></local-search-input>
        </div>
      </div>
    </alert-header-for-modal>
    <div class="list-search-body">
      <ul class="list-search-head">
        <template v-for="(columns, index) in columns">
          <li class="overflowEllipsis style-li"
              :key="index">
            <div>{{ columns.title }}</div>
          </li>
        </template>
        <li class="overflowEllipsis style-li">
          <div>选中</div>
        </li>
      </ul>
      <ul class="list-search-content">
        <template v-for="(item, index1) in groupItems">
          <li :key="index1"
              @click='selectGroupItem($event, item)'
              v-if='filter(item.name)'>
            <ul class="search-content-ul">
              <template v-for="(col, index2) in columns">
                <li class="overflowEllipsis style-li"
                    :key="index2">{{ item[col.key] }}</li>
              </template>
              <li class="overflowEllipsis style-li">
                <div class="checkbox">
                  <Checkbox v-model="stateList[item.id]"
                            :disabled="item.is_charged"
                            :true-value='true'
                            :false-value='false'></Checkbox>
                </div>
              </li>
            </ul>
          </li>
        </template>
        <div class="no-data-row"
             v-if="!groupItems.length">暂无数据</div>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chooseItemsModalGroupItems',
  props: {
    headerText: {
      type: String,
    },
    groupItems: {
      type: Array,
      default: () => [],
    },
    groupItemsInPackageIds: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    noDataMsg() {
      return this.packages.length ? '无筛选数据' : '暂无数据'
    },
  },
  data() {
    return {
      keyword: '', // 搜索的数据
      columns: [
        {
          title: '项目名称',
          key: 'name',
        },
        {
          title: '标准价格',
          key: 'price',
        },
      ],
      stateList: {}, // 状态表
    }
  },
  methods: {
    localSearch(data) {
      this.keyword = data
    },
    filter(data) {
      // 搜索
      if (!this.keyword) {
        return true
      }
      if (data.indexOf(this.keyword) === -1) {
        return false
      } else {
        return true
      }
    },
    selectGroupItem($event, item) {
      // 已收费则不能修改
      if (item.is_charged) return

      // 解决点击触发两次事件的bug
      if ($event.target.localName === 'label') return
      this.stateList[item.id] = !this.stateList[item.id]

      // 判断数据是否是选中套餐内的数据
      if (this.groupItemsInPackageIds.indexOf(item.id) !== -1) {
        // click事件在on-change之前 需要在下一个时刻复赋值
        this.$nextTick(() => {
          this.stateList[item.id] = true
        })
        this.$emit('on-remove-item-in-package', item)
      } else {
        if (this.stateList[item.id]) {
          // 新增
          if (!this.value.some(_item => _item.id === item.id)) {
            this.value.push(item)
            this.$emit('update:value', this.value)
          }
        } else {
          // 移除
          let _value = this.value.filter(_item => _item.id !== item.id)
          this.$emit('update:value', _value)
        }
      }
    },
    // 映射套餐内组合项目、组合项目
    mapingState() {
      // 初始化映射表
      this.stateList = {}

      this.groupItems.map(item => {
        this.$set(this.stateList, item.id, false)
      })

      this.groupItemsInPackageIds.map(id => {
        this.$set(this.stateList, id, true)
      })

      this.value.map(item => {
        this.$set(this.stateList, item.id, true)
      })
    },
  },
  created() {
    this.mapingState()
  },
  watch: {
    groupItemsInPackageIds() {
      this.mapingState()
    },
    value() {
      this.mapingState()
    },
    // stateList: {
    //   deep: true,
    //   handler () {
    //     return
    //   }
    // }
  },
}
</script>
<style lang="less" scoped>
@import '~assets/less/variable.less';
@width: 50px;
@minWidth: 74px;
.choose-items-modal-group-items {
  height: 100%;
  // outline: 1px solid green;
  .list-search-body {
    height: calc(~'100% - 50px');
    color: @gradeAshOne;
    .style-li {
      border-right: 1px solid @gradeAshFive;
      height: 100%;
      text-align: center;
      // padding-left: @num10;
      // padding-right: @num10;
      width: @minWidth;
    }
    .style-li:nth-of-type(1) {
      width: 177px;
    }
    .style-li:nth-last-of-type(1) {
      flex: 1;
      border-right: none;
      width: @width;
    }
    .list-search-head {
      height: 40px;
      line-height: 40px;
      background-color: @tableTh;
      text-align: center;
      display: flex;
      white-space: nowrap;
      align-items: center;
    }
    .checkbox {
      label {
        margin-left: @num10;
      }
    }
    .list-search-content {
      height: calc(~'100% - 40px');
      overflow: auto;
      & > li {
        // 内容每一行
        line-height: 40px;
        height: 40px;
        width: 100%;
        // border-right: 1px solid red;
        cursor: pointer;
        .search-content-ul {
          // 具体显示的ul
          text-align: center;
          display: flex;
          white-space: nowrap;
          align-items: center;
        }
      }
      & > li:nth-of-type(2n) {
        background-color: @tableTr;
      }
      & > li:nth-last-of-type(1) {
        border-bottom: 1px solid @gradeAshFive;
      }
    }
  }
  .no-data-row {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid @gradeAshFive;
  }
}
</style>
