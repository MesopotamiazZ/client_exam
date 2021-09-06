<template>
  <div class="skip-button-wrapper">
    <icon name='tableTitleJump' @click.native="skipTo"></icon>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import * as types from '@/store/types'
export default {
  name: 'skipButton',
  props: {
    skipName: {
      type: String,
      required: true,
      default: '',
    },
  },
  methods: {
    // 跳转功能
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    skipTo() {
      if (this.skipName) {
        this.$router.push({ name: this.skipName })
        let temp = {}
        temp.name = this.skipName
        temp.title = this.skipName
        this.openPage(temp)
        this.setCurPage(temp.name)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.skip-button-wrapper{
  display: inline-block;
  cursor: pointer;
  font-size: 0;
}
</style>
