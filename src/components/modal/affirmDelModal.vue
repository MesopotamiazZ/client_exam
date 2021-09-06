/**
* Created wzd
* Date: 2017/12/16
* Time: 21:00
* content:确认删除modal
*/
<template>
  <div class="affirmDelModal">
    <Modal v-if="rests"
           v-model="controlModalShow"
           :class="{'none-mask': !isMask}"
           :styles='{width:modalWidth+"px"}'
           :transition-names='[]'
           :mask-closable="maskClosable"
           :transfer='false'
           :closable="closable"  @on-visible-change="statusChange">
      <div slot="header">
        <p name='adm-alertHeader'
           class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16">{{ headerText }}</span>
        </p>
      </div>
      <p v-if="delCounts <= 1"
         class="adm-main">确认删除该条信息吗?</p>
      <p v-else
         class="adm-main">确认删除选中的
        <b>{{delCounts}}条</b> 信息吗？</p>
      <div slot="footer"
           class="adm-modal-footer-wrapper">
        <div class="adm-modelFooter"
             v-if="showFooter">
          <Button type="error"
                  class="affirmDelBtn"
                  @click="affirmDel">{{delet}}</Button>
          <Button type="ghost"
                  class="cancelDelBtn"
                  @click="delCancel">取 消</Button>
        </div>
      </div>
    </Modal>
    <Modal v-if="!rests"
           v-model="controlModalShow"
           :styles='{width:modalWidth+"px"}'
           :transition-names='[]'
           :mask-closable="maskClosable"
           :transfer='false'
           :closable="closable" @on-visible-change="statusChange">
      <div slot="header">
        <p name='adm-alertHeader'
           class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16">{{ headerText }}</span>
        </p>
      </div>
      <p class="adm-main">{{content}}</p>
      <div slot="footer"
           class="adm-modal-footer-wrapper">
        <div class="adm-modelFooter"
             v-if="showFooter">
          <Button type="error"
                  class="affirmDelBtn"
                  @click="affirmDel">{{delet}}</Button>
          <Button type="ghost"
                  class="cancelDelBtn"
                  @click="delCancel">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'affirm-del-modal',
  props: {
    headerText: {
      // title
      type: String,
      default: '提示',
    },
    delet: {
      // title
      type: String,
      default: '删 除',
    },
    content: {
      // title
      type: String,
      default: '',
    },
    delCounts: {
      // 选中删除条数
      type: Number,
    },
    controlModal: {
      // 控制Modal显示与关闭
      type: Boolean,
      default: false,
    },
    modalWidth: {
      // modal宽度
      type: Number,
      default: 296,
    },
    maskClosable: {
      // 是否允许点击遮罩层关闭
      type: Boolean,
      default: false,
    },
    closable: {
      // 是否显示右上角的关闭按钮，关闭后 Esc 按键也将关闭
      type: Boolean,
      default: false,
    },
    rests: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    isMask: { // 是否有遮罩层
      type: Boolean,
      default: true,
    },
  },
  computed: {
    // controlModalShow() {
    //   return _.cloneDeep(this.controlModal)
    // },
  },
  watch: {
    controlModal(data) {
      _
      console.log('watch', data)
      if (data) {
        this.controlModalShow = true
      } else {
        this.controlModalShow = false
      }
    },
  },
  data() {
    return {
      controlModalShow: false,
    }
  },
  methods: {
    statusChange(val) {
      if (val) {
        this.controlModalShow = val
      } else {
        this.controlModalShow = false
      }

      this.$emit('on-visible-change', val)
    },
    delCancel() {
      // 取消删除
      this.$emit('delCancel')
    },
    affirmDel() {
      // 确认删除
      this.$emit('affirmDel', true)
    },
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.affirmDelModal {
  .adm-alertHeader {
    background-color: #f2f5fa;
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
      position: relative;
      top: -0.7px;
    }
  }
  .adm-main {
    text-align: center;
    font-size: 16px;
    color: #4a4a4a;
    letter-spacing: 0;
    margin-top: 30px;
    margin-bottom: 30px;
    // 添加
    margin-left: 30px;
    margin-right: 30px;
  }
  .adm-modal-footer-wrapper {
    min-height: 10px;
  }
  .adm-modelFooter {
    height: 50px;
    button {
      width: 74px;
      height: 30px;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
  .none-mask {
    .ivu-modal-mask {
      background-color: transparent!important;
    }
    .ivu-modal-content {
      border-radius: @borderRadiuBig;
      background-color: #FFFFFF;
      box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
    }
  }
}
</style>
