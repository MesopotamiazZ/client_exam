/**
* Created 黄伟
* Date: 2018/1/7
* Time: 15:16
* content: 主检
*/
<template>
  <div class="affirmDelModal"
       v-if="opendefaultModal">
    <Modal v-model="opendefaultModal"
           :width='width'
           :transition-names='[]'
           :transfer='false'
           :closable="false"
           :mask-closable="false">
      <div slot="header">
        <p name='adm-alertHeader'
           class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16">{{ headerText }}</span>
        </p>
      </div>
      <p class="adm-main">
        {{content}}
      </p>
      <div slot="footer">
        <div class="adm-modelFooter">
          <Button type="primary"
                  class="affirmDelBtn marginR10"
                  @click="affirm">确 认</Button>
          <Button type="ghost"
                  class="affirmDelBtn"
                  v-if="saveBtn"
                  @click="noSave">不保存</Button>
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
    }
  },
  props: {
    opendefaultModal: {
      type: Boolean,
      default: false,
    },
    headerText: {
      // title
      type: String,
      default: '提示',
    },
    content: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '296',
    },
    saveBtn: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 确认 函数
    affirm() {
      console.log('1')
      this.$emit('affirm')
    },
    noSave() {
      this.$emit('noSave')
      console.log('2')
    },
    abolish() {
      console.log('3')
      this.$emit('abolish')
    },
  },
}
</script>
<style lang="less">
// @import (reference) '~assets/less/variable.less';
@import '~assets/less/variable.less';
.affirmDelModal {
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
