<template>
  <div class="healthRecord">
    <div class="healthRecord-content zoom">
      <div class="healthRecord-head">
        <h1 class="healthRecord-head-title">{{realname}}健康档案</h1>
        <div class="healthRecord-head-btn">
<!--           <ZButton :ZBtype='"ghost"'
                   class="fl1 marginR10"
                   @click="goBack">返 回</ZButton> -->
          <ZButtonHasBg :ZBtype='"ghost"'
                        class="fl1 marginR20"
                        @click="print">打 印</ZButtonHasBg>
        </div>
      </div>
      <!-- 身体 -->
      <div class="healthRecord-body"
           :style='{height:$store.state.windowHeight-200 +"px"}'>
        <!-- 表单 -->
        <div class="healthRecord-body-borderB">
          <!-- 基本信息 -->
          <basicInformation :basicInformationData="basicInformationData"
                            @refresh="refresh"
                            ref="basicInformation"></basicInformation>
          <!-- 历史检查记录 -->
          <medicalHistory class="marginT10"></medicalHistory>
          <!-- 更多 -->
          <more class="marginT10"
                :basicInformationData="basicInformationData"
                @refresh="refresh"></more>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import basicInformation from './basicInformation'
import more from './more'
import medicalHistory from './medicalHistory'
import { mapMutations, mapActions } from 'vuex'
import * as types from '@/store/types'

export default {
  name: 'healthRecord',
  data() {
    return {
      //
      basicInformationData: {},
      id: null,
      name: '',
    }
  },
  components: {
    ZButton,
    ZButtonHasBg,
    basicInformation,
    more,
    medicalHistory,
  },
  watch: {},
  props: {},
  methods: {
    //
    ...mapActions('healthRecordModule', ['basicInformationGet']),
    goBack() {
      this.$emit('changeComponent', this.name)
    },
    ...mapMutations({
      setCurPage: types.SET_CURRENT_PAGE_NAME,
      setSelectData: types.SET_SELECTDATA,
    }),
    async print() {
    /*   var headhtml = '<html><head><title></title></head><body>'
      var foothtml = '</body>' */
      // 获取div中的html内容
      /*       var newhtml = document.all

      let a = document.getElementsByClassName('healthRecord-body-borderB')[0]
      let b = a.innerHTML
      // 获取div中的html内容，jquery写法如下
      // var newhtml= $("#" + printpage).html();

      // 获取原来的窗口界面body的html内容，并保存起来
      // var oldhtml = document.body.innerHTML
      // 给窗口界面重新赋值，赋自己拼接起来的html内容
      //  document.body.innerHTML = headhtml + b + foothtml
      await this.setSelectData(headhtml + b + foothtml)
      this.$router.push({ name: 'print' })
      let temp = {}
      temp.name = 'print'
      this.setCurPage(temp.name)
      // 调用window.print方法打印新窗口
      /*       document.execCommand('print') */
      // 将原来窗口body的html值回填展示
    },
    // refresh 刷新接口i
    refresh() {
      let that = this
      let a = {}
      a.id = 10
      this.basicInformationGet(a).then(data => {
        that.$refs.basicInformation.unamendFunc()
        this.basicInformationData = data
      })
    },
    // 基础信息请求
    http() {
      let a = {}
      a.id = this.id
      this.basicInformationGet(a).then(data => {
        this.basicInformationData = data
      })
    },
  },
  computed: {
    realname() {
      return this.basicInformationData.realname
    },
  },
  mounted() {
    console.log(this.$parent.id, this.$parent.view, 'ggggggggg')
    this.id = 10
    this.name = this.$parent.oldview
    this.$nextTick(() => {
      this.http()
    })
  },
}
</script>
<style >

</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';

.healthRecord {
  margin: 0 auto;
  background: #ffffff;
  .healthRecord-content {
    width: 1055px;
    margin: 0 auto;
    .marginT10 {
      margin-top: 10px;
    }
    .healthRecord-head {
      width: 100%;
      height: 30px;
      margin-top: 10px;
      position: relative;
      //border-bottom:1px solid black;
      .healthRecord-head-btn {
        position: absolute;
        right: 0;
        top: 0;
      }
      .healthRecord-head-title {
        width: 100%;
        display: inline-block;
        text-align: center;
        line-height: 26px;
        font-family: MicrosoftYaHei-Bold;
        font-size: 20px;
        color: #4a4a4a;
        letter-spacing: 0;
        font-weight: 900;
      }
    }
    .healthRecord-body {
      margin-top: 20px;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      background: none;
      .healthRecord-body-borderB {
        background: #ffffff;
      }
    }
  }
}
</style>