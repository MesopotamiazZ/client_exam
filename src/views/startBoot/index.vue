/*
 * 启动页面
 * @author zero
 * @date 2017/12/13
 */
<template>
  <div class="startBoot">
    <img src="static/images/public/loadingAnima.gif" alt="">
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import * as types from '@/store/types'
// import fs from 'fs'

export default {
  data () {
    return {
      now: +new Date(),
      minMsec: process.env.NODE_ENV === 'development' ? 0 : 3000,
    }
  },
  computed: {
    ...mapState(['userInfo', 'shortcutMap']),
  },
  methods: {
    ...mapActions(['getSecret', 'getUserInfo', 'initRouters']),
    ...mapActions('configModule', ['initConfig', 'getConfig']),
    ...mapMutations({
      setInit: types.SET_INITIALIZATION,
      initUserConfig: types.INIT_USER_CONFIG,
    }),
    initAccess () {
      this.setInit(true)
      this.$router.replace({name: 'main'})
    },
  },
  async created () {
    // 至少运行3S
    try {
      // 获取用户信息
      await this.getSecret()
      await this.getUserInfo()

      // 动态添加路由
      await this.initRouters()
      // 加载系统默认配置
      await this.initConfig()
      // 加载用户配置
      let userConfig = await this.getConfig(this.userInfo.id)
      this.initUserConfig(userConfig)
      // this.setShortcutmapScreenshot(this.shortcutMap.screenshot)

      // shortcut.registerShortcut('screenshot', 'ctrl+f')

      let diffMsec = +new Date() - this.now
      if (diffMsec >= this.minMsec) {
        this.initAccess()
      } else {
        setTimeout(() => {
          this.initAccess()
        }, this.minMsec - diffMsec)
      }
    } catch (error) {
      console.error(error)
      this.$Message.error('登录失败')
    }
    // create user data folder if not exist
//    if (!fs.existsSync('static/userData')) {
//      fs.mkdirSync('static/userData')
//    }
    // setTimeout(() => {
    //   this.getConfig(this.userInfo.id).then((data) => {
    //     if (data && data.settings && data.settings.zoomRatioM) {
    //       this.setZoomRatio(data.settings.zoomRatioM)
    //     }
    //   })
    // })
  },
}
</script>


<style lang="less" scoped>
 .startBoot {
   height: 100%;
   background-color:rgb(221, 225, 231);
   img {
     width: 100%;
   }
 }
</style>
