<template>
  <div class="affirmDelModal"
       v-if="delModel">
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
      <p class="adm-main">确定保存该数据吗？</p>
      <div slot="footer">
        <div class="adm-modelFooter">
          <Button type="ghost"
                  class="cancelDelBtn fr marginR20"
                  @click="abolish">取 消</Button>

          <ZButtonHasBg class=" marginR20 fr"
                        @click="affirm()">保 存</ZButtonHasBg>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import {copy} from '@/utils/helper'
import { mapActions } from 'vuex'

export default {
  name: 'affmodel',
  data() {
    return {
      delModel: false,
    }
  },
  props: {
    headerText: {
      // title
      type: String,
      default: '提示',
    },
    transmit: {
      type: [Object, Array],
    },
    remark: {
      type: [Object, Array],
    },
    id: {
      type: [Number, String],
    },
  },
  components: {
    ZButtonHasBg,
  },
  methods: {
    // 打开莫泰框
    ...mapActions('healthRecordModule', ['familyPost']),
    openM() {
      this.delModel = true
    },
    // 关闭莫泰框
    closeM() {
      this.delModel = false
    },
    setData(val) {
      this.delModel = true
    },
    // 确认 函数
    affirm() {
      let that = this
      let a = copy(this.transmit, true)
      for (let key in a) {
        if (a[key].value && a[key].value.length < 1) {
          a.splice(key, 1)
        }
      }
      for (let key in a) {
        a[key].ha_id = this.id
        let data = a[key].value || []
        if (data) {
          for (let v in data) {
            if (a[key].relation === 1) {
              if (data[v] === '恶性肿瘤') {
                data[v] = { name: data[v], remark: this.remark.remark1 }
              } else if (data[v] === '其他') {
                data[v] = { name: data[v], remark: this.remark.remark2 }
              } else { data[v] = { name: data[v] } }
            }
            if (a[key].relation === 2) {
              if (data[v] === '恶性肿瘤') {
                data[v] = { name: data[v], remark: this.remark.remark3 }
              } else if (data[v] === '其他') {
                data[v] = { name: data[v], remark: this.remark.remark4 }
              } else { data[v] = { name: data[v] } }
            }
            if (a[key].relation === 3) {
              if (data[v] === '恶性肿瘤') {
                data[v] = { name: data[v], remark: this.remark.remark5 }
              } else if (data[v] === '其他') {
                data[v] = { name: data[v], remark: this.remark.remark6 }
              } else { data[v] = { name: data[v] } }
            }
            if (a[key].relation === 4) {
              if (data[v] === '恶性肿瘤') {
                data[v] = { name: data[v], remark: this.remark.remark7 }
              } else if (data[v] === '其他') {
                data[v] = { name: data[v], remark: this.remark.remark8 }
              } else { data[v] = { name: data[v] } }
            }
          }
        }
      }
      this.familyPost(a).then(data => {
        if (data) {
          that.$emit('refresh')
          that.closeM()
        }
      })
      //
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
