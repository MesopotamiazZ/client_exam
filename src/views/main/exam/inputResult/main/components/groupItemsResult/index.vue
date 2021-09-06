<template>
  <div class="group-items-result-wrapper">
    <!-- <div class="compound-header">组合项目:妇科, 弃检, 读入数据, 影像导入, <span @click="show = !show">展开</span></div> -->

    <div class="group-items-header">
      <div class="fl group-items-left font16">
        <span>组合项目：{{groupItemsName}}</span>
      </div>
      <div class="fr group-items-right">
        <Checkbox :disabled="!!groupItemInfo.is_abandon"
                  class="marginR10">是否异常</Checkbox>
        <Button :disabled="!!groupItemInfo.is_abandon"
                class="marginR10"
                type="ghost">自动小结</Button>
        <Button :disabled="!!groupItemInfo.is_abandon"
                class="marginR10"
                type="ghost">清空小结</Button>
        <Button :disabled="!!groupItemInfo.is_abandon"
                type="ghost"
                class="marginR20"
                @click="addResultAdvice">临床诊断</Button>
      </div>
      <div style="clear:both;"></div>
    </div>
    <!-- 分割线 -->
    <div class="seperate-line"></div>
    <!-- body信息  -->
    <div class="group-items-body">
      <Input v-model="inputTextArea"
             type="textarea"
             placeholder="请输入检查小结..."></Input>
    </div>
    <!-- 新增临床诊断 -->
    <!-- <add-clinical ref="addClinicalModal"
                  :choosenDiagnose="choosenDiagnose"
                  @checkValue="checkValue"></add-clinical> -->
  </div>
</template>
<script>
import ZButton from '@/components/button/ZButton'
import addClinical from '../addClinical/addClinical'
export default {
  components: {
    ZButton,
    addClinical,
  },
  props: {
    // 组合项目表格的内容
    data: {
      type: Array,
      default() {
        return []
      },
    },
    // 组合项目类型
    type: {
      type: String,
      default: 'normal', // normal - 普通, chestRadiography - 胸片, listenTest - 电测听
    },
    // 组合项目名字
    groupItemsName: {
      type: String,
      require: true,
    },
    // 选中的
    // choosenDiagnose: {
    //   type: Array,
    //   default() {
    //     return []
    //   },
    // },
    // 禁止按钮
    // banAutoResultBtn: {
    //   type: Boolean,
    //   default: false,
    // },
    // banClearResultBtn: {
    //   type: Boolean,
    //   default: false,
    // },
    // banDiagnoseBtn: {
    //   type: Boolean,
    //   default: false,
    // },
    groupItemInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      show: true,
      inputTextArea: '',
      choosenDiagnose: [], // 存放勾选的项目
    }
  },
  methods: {
    addResultAdvice() {
      this.$emit('open-modal')
    },

    checkValue(data) {
      // 处理数据 - 增加来源组合项目字段
      for (let obj of data) {
        this.$set(obj, 'groupOrigin', this.groupItemsName)
      }
      this.$emit('diagnose-report', data)
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';

.group-items-result-wrapper {
  margin: 10px;
  border: 1px solid @gradeAshFive;
  border-radius: 8px;
  .group-items-header {
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    .group-items-left {
      color: @gradeAshOne;
      letter-spacing: 0.04px;
      &::before {
        content: '';
        margin-top: -4px;
        display: inline-block;
        margin-right: 6px;
        margin-left: @num20;
        width: 4px;
        height: 18px;
        vertical-align: middle;
        background-color: @gradeBlueOne;
      }
    }
    .group-items-right {
      .icon-show {
        width: 20px;
        height: 20px;
        background: #008cee;
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        margin-top: -2px;
        vertical-align: middle;
        position: relative;
        cursor: pointer;
        .arr-icon {
          position: absolute;
          top: 4px;
          right: 6px;
        }
      }
    }
  }
  .ghost-button {
    border-color: #34a3f1;
    color: #249cf0;
  }
  .seperate-line {
    height: 1px;
    background: @gradeAshFive;
  }
  .group-items-body {
    border-radius: 4px;
    width: 100%;
    height: 220px;
    padding: 10px;
    textarea.ivu-input {
      resize: none;
      padding-top: 7px;
      padding-right: 10px;
      padding-left: 10px;
      padding-bottom: 7px;
      font-size: 12px;
      line-height: 20px;
      height: 200px;
      border: none;
      background: #f2f7ff;
    }
  }
}
</style>

