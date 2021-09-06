<template>
  <div class="accountManagement-wrapper height100P padding10">
    <div class="accountManagement contentBg height100P">
      <div class="header-wrapper">
        <div v-for="(tab,index) in tabs" class="tab" :class="{active:curTab===index}" @click="curTab=index">
          <span>{{tab}}</span>
        </div>
        <div class="operater-wrapper">
          <Button type="ghost" class="fr" @click="exportBtn">导 出</Button>
          <Button type="ghost" class="fr marginR10" @click="add" v-if="curTab===0">新 增</Button>
          <search-input
            :searchWidth="220"
            class="fr marginL20 marginR20"
            searText="请输入搜索内容"
            @on-enter="search"
            @on-Icon="search"
            @on-cancel="search">
          </search-input>
          <Checkbox v-model="enabledAll" class="enable-all" v-if="curTab===1">全部启用</Checkbox>
        </div>
        <!-- <div class="operater-wrapper" v-if="curTab===1" key="2">
          <Button type="ghost" class="fr" @click="exportBtn">导 出</Button>
          <Button type="ghost" class="fr marginR10" @click="add">新 增</Button>
          <search-input
            :searchWidth="220"
            class="fr marginL20 marginR20"
            searText="请输入搜索内容"
            @on-enter="search"
            @on-Icon="search"
            @on-cancel="search">
          </search-input>
        </div> -->
      </div>
      <div class="content-wrapper">
        <AccountList ref="accountList" v-if="curTab===0"></AccountList>
        <PermissionList ref="permissionList" v-if="curTab===1"></PermissionList>
      </div>
    </div>
  </div>
</template>
<script>
  import AccountList from './components/accountList.vue'
  import PermissionList from './components/permissionList.vue'
  export default {
    name: 'accountManagement',
    components: {
      AccountList,
      PermissionList,
    },
    data() {
      return {
        tabs: ['账号列表', '权限列表'],
        curTab: 0,
        enabledAll: false, // 全部启用
      }
    },
    methods: {
      exportBtn() {
        if (this.curTab === 0) {
          this.$refs.accountList.$refs.zBaseInfoTable.$refs.table.exportCsv({filename: '账号列表'})
        } else {
          this.$refs.permissionList.$refs.zBaseInfoTable.$refs.table.exportCsv({filename: '权限列表'})
        }
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
  .accountManagement-wrapper{
    .accountManagement{
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
