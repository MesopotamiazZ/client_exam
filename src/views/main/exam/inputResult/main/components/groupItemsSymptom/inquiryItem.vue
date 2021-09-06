<template>
  <!-- <div style="position:relative;"
       @click="handleClick"> -->
  <div class="inquiry-wrapper"
       @click="handleClick">
    <div :class="{'inquiry-head':true, 'normal-background': !isEmphases, 'emphases-background': isEmphases}"
         @mouseenter="showPopOver"
         @mouseleave="hidePopOver">
      <div class="inquiry-head-content">{{inquiryData.inquiry_item_name}}</div>
      <div :class="{'pop-over': true, 'active': isActive}">{{inquiryData.inquiry_item_name}}</div>
    </div>
    <div class="inquiry-body"
         @mouseenter="handleMouseEnter"
         @mouseleave="handleMouseLeave">
      <div class="item-wrapper"
           v-show="!ifShowAdd">
        <div class="item">{{inquiryData.degree}}</div>
        <div class="item"
             v-if="inquiryData.remark">
          <remark-in-table :text="inquiryData.remark"></remark-in-table>
        </div>
        <div class="item">{{inquiryData.appear_time}}</div>
      </div>
      <div class="item-operate"
           v-show="!ifShowAdd && ifShowOperate">
        <div>
          <Button type="ghost"
                  @click="handleEdit">编辑</Button>
        </div>
        <div>
          <Button type="ghost"
                  @click="handleReset">清空</Button>
        </div>
      </div>
      <div class="item-add"
           v-show="ifShowAdd">
        <div style="height: 100%; line-height: 75px;"
             @click="inquirySymptomAdd">添加</div>
      </div>
    </div>
    <div class="border-mask"
         v-if="showBorder"></div>
  </div>

  <!-- </div> -->

</template>
<script>
export default {
  props: {
    inquiryData: {
      type: Object,
      default() {
        return {}
      },
    },
    isEmphases: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    // const that = this
    return {
      ifShowOperate: false,
      ifShowAdd: true,
      degree: '',
      appear_time: '',
      // inquiryDataClone: JSON.parse(JSON.stringify(that.inquiryData)),
      showBorder: false,
      isActive: false, // pop over 控制
    }
  },
  mounted() {
    if (this.inquiryData.degree || this.inquiryData.remark || this.inquiryData.appear_time) {
      this.ifShowOperate = false
      this.ifShowAdd = false
    } else {
      this.ifShowOperate = false
      this.ifShowAdd = true
    }
  },
  methods: {
    handleClick(e) {
      if (e.target.innerHTML === '编辑') {
        this.$emit('handle-click', e)
      }
    },
    handleMouseEnter() {
      this.ifShowOperate = true
    },
    handleMouseLeave() {
      this.ifShowOperate = false
    },
    // 编辑
    handleEdit() {
      this.$emit('inquiry-edit', this.inquiryData)
    },
    // 清空
    handleReset() {
      // this.appear_time = ''
      // this.degree = ''
      this.$set(this.inquiryData, 'appear_time', '')
      this.$set(this.inquiryData, 'degree', '')
      this.$set(this.inquiryData, 'remark', '')
      this.ifShowAdd = true
    },
    // 添加问诊症状
    inquirySymptomAdd(e) {
      this.showBorder = true
      this.$emit('add-inquiry-symptom', e)
    },
    // 标题pop over
    showPopOver() {
      this.isActive = true
    },
    hidePopOver() {
      this.isActive = false
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.inquiry-wrapper {
  box-sizing: border-box;
  border-bottom: 1px solid @gradeAshFive;
  border-right: 1px solid @gradeAshFive;
  cursor: pointer;
  // width: 100px;
  .inquiry-head {
    height: 25px;
    line-height: 25px;
    text-align: center;
    position: relative;
    .inquiry-head-content {
      padding: 0 8px;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &.normal-background {
      background: @gradeBlueFour;
    }
    &.emphases-background {
      background: #f8e71c;
    }
    .pop-over {
      position: absolute;
      border-radius: 4px;
      box-shadow: 0px 0px 6px #ccc;
      margin-left: 2px;
      padding: 5px;
      line-height: 20px;
      background: #fff;
      min-width: 98%;
      z-index: 888;
      display: none;
      &.active {
        display: block;
        white-space: normal;
      }
    }
  }
  .inquiry-body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 70px;
    text-align: center;
    position: relative;
    .item-operate {
      height: 100%;
      width: 100%;
      background: #fff;
      opacity: 0.9;
      position: absolute;
      left: 0;
      top: 0;
      div {
        line-height: 35px;
      }
    }
    .item-add {
      height: 100%;
      color: @gradeBlueTwo;
    }
  }
  .border-mask {
    border: 2px solid @gradeBlueTwo;
    position: absolute;
    height: 100%;
    top: -1px;
    width: 100%;
  }
}
</style>

