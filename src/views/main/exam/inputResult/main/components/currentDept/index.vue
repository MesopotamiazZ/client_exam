<template>
  <div class="current-dept-wrapper" v-if="isShowDeptBox" @mouseenter = "mouseEnter" @mouseleave="mouseLeave">
    <div>
      <div class="current-dept-title">
        <titletHasSlot style="border-radius:8px 8px 0 0;">
          <span slot='titletHasSlotLeftTitle'>
            当前科室<span class="title-numbers">({{deptData.length}})</span>
          </span>
        </titletHasSlot>
      </div>
      <div>
        <!-- 表格 -->
        <Table 
          stripe 
          :columns="columns" 
          :data="deptData"
          :height="200"
        ></Table>
      </div>
    </div>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlotMiddle'
import { mapActions } from 'vuex'

export default {
  name: 'healthExamPersonSearch',
  components: {
    titletHasSlot,
  },
  props: {
    curDeptChoices: { // 当前选择的科室(字符串)
      type: Array,
      default() {
        return []
      },
    },
    deptData: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    let that = this
    return {
      isShowDeptBox: false, // 显示/隐藏科室选择框
      isInDeptBox: false, // 鼠标是否进入科室选择模态框
      currentSelection: [], // 当前选择的科室(数组)
      columns: [
        {
          // type: 'selection',
          width: 50,
          align: 'center',
          renderHeader(h, params) {
            return h('span', '')
          },
          render(h, params) {
            let isSelect = false
            for (let obj of that.currentSelection) {
              if (obj === params.row.name || obj.dept.name === params.row.dept.name) {
                isSelect = true
              }
            }
            return h('Checkbox', {
              props: {
                value: isSelect,
              },
              on: {
                'on-change'(select) {
                  if (select) {
                    that.currentSelection.push(that.deptData[params.index])
                  } else {
                    for (let key in that.currentSelection) {
                      if (that.currentSelection[key].dept.name === params.row.dept.name) {
                        that.currentSelection.splice(key, 1)
                      }
                    }
                  }
                  that.$emit('current-dept-selection', that.currentSelection)
                },
              },
            })
          },
        },
        {
          title: '科室名称',
          key: 'name',
          render(h, params) {
            return h('div', params.row.dept.name)
          },
        },
      ],
    }
  },
  watch: {
    //
  },
  async mounted() {
    // index中请求了一次, 组件这里请求了一次, 感觉有点重复
    let deptInfo = await this.getDeptInfo(1)
    this.currentSelection = deptInfo.depts
  },
  methods: {
    ...mapActions('inputResultModule', [
      'getDeptInfo',
    ]),
    mouseEnter() {
      this.isInDeptBox = true
      this.$emit('get-mouse-position', this.isInDeptBox)
    },
    mouseLeave() {
      this.isInDeptBox = false
      this.$emit('get-mouse-position', this.isInDeptBox)
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
.current-dept-wrapper {
  background: #eee;
  width: 251px;
  height: 251px;
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

  // 标题后一条横线
  // .current-dept-title {
  //   &::after {
  //     content: '';
  //     display: block;
  //     height: 1px;
  //     background: @gradeAshFive;
  //   }
  // }
}
</style>