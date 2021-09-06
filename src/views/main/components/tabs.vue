<template>
  <div class="tabsDiv">
          <tabs type="card" @on-click="OneClick" :value="Tvalue" @on-tab-remove="handleTabRemove" >
              <tab-pane @on-click="OneClick" v-for="tab in tabs" :key="tab" :label="tab.name" ref="totalTabs" closable  animated=false style="width:1100">              
                <div slot="extra"></div>
              </tab-pane>
          </tabs>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    components: {
    },
    data() {
      return {
        tabs: [{name: '标签11', path: '路径'}],
        name: '',
        Tvalue: 0,
        tabsWidth: '',
      }
    },
    computed: {
      ...mapState('config', ['menuList']),
    },
    watch: {
      $route (val, oldVal) {
        console.log(val)
        if (val.fullPath === '/exam') {
          return
        }
        let arr = this.tabs
        if (val === oldVal) {
          return
        }
        this.checkHasChild(this.menuList)
        let canPush = true
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].path === val.fullPath) {
            canPush = false
            console.log('有相同的路由', canPush)
          }
        }
        console.log(canPush, 'canPush')
        const arry = this.getObjNature()
        if (canPush === true && arry.has(this.nmae)) {
          console.log('增加一个标签页', this.tabs)
          this.tabs.push({name: this.name, path: val.fullPath})
          this.Tvalue = this.tabs.length - 1
        }
      },
      // 刷新路由
      refreshRoute (fullPath, oldVal) {
        console.log('刷新路由')
      },
      // 关闭路由
      closeRoute (fullPath, oldVal) {
        console.log('关闭路由')
      },
    },
    methods: {
      getObjNature() {
        let obj = this.menuList
        let arr = []
        for (var key in obj) {
          for (var i = 0; i < obj[key].length; i++) {
            if (obj[key][i].name) {
              arr.push(obj[key][i].name)// 存入属性
            } else {
              this.getObjNature(obj[key]) // 递归遍历
            }
          }
        }
        if (arr.length > 0) {
          return arr
        } else {
          return
        }
      },
      // 切换标签页 左边
      tabClick (a, b) {
        let that = this
        this.name = a
        this.tabs.forEach((v, index) => {
          if (this.$route.fullPath === v.path) {
            that.Tvalue = index
            console.log('一样的路径', index)
            return
          }
        })
      },
      OneClick (a) {
        console.log(a, '1')
      },
      // 关闭标签
      handleTabRemove () {
        console.log(this)
      },
    },
    mounted () {
      console.log(JSON.stringify(this.menuList))
    },
  }
</script>

<style lang="less">
  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .headerWrapper {
    width: 100%;
    height: 80px;
    background: #bebebe;
  }
  .contentWrapper {
    display: flex;
    flex: 1;

    .left{
      position: relative;
      width: 170px;
    }
    .right {
      display: block;
      padding-left: 10px;
    }
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
    min-width: 90px;
    font-size:12px;
    height: 41px;
    margin-right: 0px!important;
    margin-top: 6px;
    padding: 0px auto;
    border: 1px solid #CED2D9 100%;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
    min-width: 90px;
    margin-top: 6px;
    font-size:12px;
    border: 1px solid #CED2D9 100%;
    border-bottom:1px solid white 100%;
    margin-right: 0px!important;
    padding: 0px auto;
    height: 42px;
  }
  .ivu-tabs-bar {
    height: 48px;;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-nav-container {
     height: 48px;
     line-height: 32px
  }
  .ivu-tabs-nav-prev {
      margin-top:12px;
  }
  .ivu-tabs-nav-next {
      margin-top: 12px;
  }
</style>
