<template>
  <div class="viewLog-wrapper height100P padding10">
    <div class="viewLog contentBg height100P">
      <div class="header-wrapper">
        <div v-for="(tab,index) in tabs" class="tab" :class="{active:curTab===index}" @click="curTab=index">
          <span>{{tab}}</span>
        </div>
        <div class="operater-wrapper">
          <search-input
            :searchWidth="306"
            class="fr"
            :style="{marginRight:'0'}"
            searText="请输入搜索内容"
            @on-enter="search"
            @on-Icon="search"
            @on-cancel="search">
          </search-input>
        </div>
      </div>
      <div class="content-wrapper">
        <login-log v-if="curTab===0"></login-log>
        <operater-log v-if="curTab===1"></operater-log>
        <system-log v-if="curTab===2"></system-log>
      </div>
    </div>
  </div>
</template>
<script>
import LoginLog from './components/loginLog'
import OperaterLog from './components/operaterLog'
import SystemLog from './components/systemLog'
export default {
  name: 'viewLog',
  components: {
    LoginLog,
    OperaterLog,
    SystemLog,
  },
  data() {
    return {
      tabs: ['登录记录', '操作记录', '系统日志'],
      curTab: 0,
      enabledAll: false, // 全部启用
    }
  },
  methods: {
    exportBtn() {
        //
    },
    add() {
      this.$refs.accountList.add()
    },
    search(data) {
        // this.paraming.search = data
    },
  },
}
</script>
<style lang="less">
   @import (reference) '~assets/less/variable.less';
  .viewLog-wrapper{
    .viewLog{
      .header-wrapper{
        height: 50px;
        padding: 0 20px;
        .tab{
          cursor: pointer;
          margin-right: 25px;
          display: inline-block;

          &.active{
            border-bottom: 3px solid @gradeBlueOne;
            &>span{
              color: @gradeBlueOne;
              font-weight: bold;
            }
          }

          &>span{
            display: inline-block;
            height: 47px;
            font-size: 14px;
            line-height: 50px;
            color: @gradeAshThree;
          }
        }
        .operater-wrapper{
          float: right;
          padding: 10px 0;

          .enable-all{
            margin-top: 6px;
            margin-right: 0;
            color: @gradeAshThree;
          }
        }
      }
      .content-wrapper{
        height: calc(~"100% - 50px");
      }
    }
  }
</style>