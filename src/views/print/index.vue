<template>
<div >
  
</div>

</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import * as types from '@/store/types'

export default {
  name: 'print',
  data() {
    return {
//
    }
  },
  computed: {
    name() {
      return ''
    },
    ...mapGetters(['getselectdata']),
  },
  methods: {
//
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    lll() {
      this.$router.push({name: 'vipUpgrade'})
      let temp = {}
      temp.name = 'vipUpgrade'
     // this.openPage(temp)
      this.setCurPage(temp.name)
    },
    print() {
      this.$nextTick(() => {
        var headhtml = '<html><head><title></title></head><body>'
        var foothtml = '</body>'
    // 获取div中的html内容
/*       var newhtml = document.all

      console.log(newhtml, 'newhtml') */
        let a = document.getElementById('print')
        let b = a.innerHTML
    // 给窗口界面重新赋值，赋自己拼接起来的html内容
        a.innerHTML = headhtml + b + foothtml
    // 调用window.print方法打印新窗口
        document.execCommand('print')
      })
    },
  },
  mounted() {
//
    let a = document.getElementById('print')
    a.innerHTML = this.getselectdata
  },
}
</script>

<style lang="less" >
.printsp{
  padding-left: 85px;
  padding-right: 85px
}
</style>
