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
      <p class="adm-main">确定保存该数据吗？</p>
      <div slot="footer">
        <div class="adm-modelFooter">
          <Button type="ghost"
                  class="cancelDelBtn fr marginR20"
                  @click="abolish">取 消</Button>

          <ZButtonHasBg class=" marginR20 fr"
                        @click="affirm">保 存</ZButtonHasBg>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import { copy } from '@/utils/helper'
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
    data: {
      type: [String, Object, Array],
    },
    medical_hist: {
      type: [String, Object, Array],
    },
    id: {
      type: [String, Number],
    },
    name: {
      type: [String, Number],
    },
  },
  components: {
    ZButtonHasBg,
  },
  methods: {
    // 打开莫泰框
    ...mapActions('healthRecordModule', ['previousPost']),
    openM() {
      this.delModel = true
    },
    // 关闭莫泰框
    closeM() {
      this.delModel = false
    },
    // 确认 函数
    affirm() {
      let that = this
      let copyData = copy(this.data, true)
      let a = {}
      a.ha_id = this.id
      if (copyData) {
        a.type_status = 1
      }
      if (this.name === '疾病史') {
        a.type = 1
      }
      if (this.name === '职业病史') {
        a.type = 2
      }
      if (this.name === '输血史') {
        a.type = 5
      }
      if (this.name === '外伤史') {
        a.type = 4
      }
      if (this.name === '手术史') {
        a.type = 3
      }

      copyData.forEach(element => {
        element.date = new Date(element.date) / 1000
      })
      a.value = copyData
      this.previousPost(a).then(data => {
        if (data) {
          that.$emit('affirmDel')
          that.closeM()
        }
      })
      copyData = []
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
