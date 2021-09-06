/*
*弹窗状态组件
*@author蒋易伶
*@date 2017.11.26
*/
<template>
  <div class="z-status">
    <component :is="type" class="z-status-content"></component>
    <div slot="footer"></div>
  </div>
</template>
<script>
  import loading from './components/loading'
  import saving from './components/saving'
  import loadFail from './components/loadFail'
  import passwordWrong from './components/passwordWrong'
  import { mapState } from 'vuex'
  export default {
    name: 'register',
    props: {
      type: {
        type: String,
        default: 'loading',
      },
    },
    data() {
      return {
        show: true,
      }
    },
    computed: {
      ...mapState(['windowHeight']),
    },
    methods: {
      changeComp(name) {
        this.currentView = name
      },
    },
    components: {
      loading,
      saving,
      loadFail,
      passwordWrong,
    },
  }
</script>
<style lang="less">
  .z-status {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    .z-status-content {
      margin: auto;
    }
  }
</style>