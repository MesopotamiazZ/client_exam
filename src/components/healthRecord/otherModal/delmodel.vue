<template>
  <div class="affirmDelModal">
    <Modal v-model="delModel"
           width='296'
           :transition-names='[]'
           :transfer='false'
           :closable="false"
           :mask-closable="false">
      <div slot="header">
        <p name='adm-alertHeader'
           class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16"
                style="margin-left:20px;">{{ headerText }}</span>
        </p>
      </div>
      <p class="adm-main">确认要删除吗？</p>
      <div slot="footer">
        <div class="adm-modelFooter">
          <Button type="error"
                  class="affirmDelBtn"
                  style="margin-right:16px;"
                  @click="affirm">删 除</Button>
          <Button type="ghost"
                  class="cancelDelBtn marginR20"
                  @click="abolish">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'affirmDelModal',
  data() {
    return {
      data: {},
      delModel: false,
      id: '',
    }
  },
  props: {
    headerText: {
      // title
      type: String,
      default: '提示',
    },
  },
  methods: {
    // 打开莫泰框
    openM(id) {
      this.delModel = true
      if (id) {
        this.id = id
      }
    },
    // 关闭莫泰框
    closeM() {
      this.delModel = false
      this.id = ''
    },
    // 确认 函数
    affirm() {
      this.$emit('affirmDel', this.id)
    },
    abolish() {
      this.closeM()
    },
  },
}
</script>
<style lang="less">
// @import (reference) '~assets/less/variable.less';
@import '~assets/less/variable.less';
.affirmDelModal {
  .ivu-modal-content {
    overflow: hidden;
  }
  .adm-alertHeader {
    background-color: @gradeBlueFive;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    font-weight: normal;
    .adm-alertHeaderText::before {
      content: '';
      width: 3px;
      height: 17px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      background-color: @gradeBlueOne;
    }
  }
  .adm-main {
    text-align: center;
    font-size: 16px;
    color: #4a4a4a;
    letter-spacing: 0;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .adm-modelFooter {
    height: 50px;
    Button {
      width: 74px;
      height: 30px;
    }
  }
}
</style>
