<template>
  <div class="mainVue">
    <div class="headerWrapper">
      <m-header
        @logout="showLogoutModal"
        @changePassword="showChangePasswordModal"
        @changeAvatar="showChangeAvatarModal"
        @changeAccount="showChangeAccount">
      </m-header>
    </div>
    <div class="contentWrapper">
      <div class="left_c" :style="{width: showTreeMenu ? undefined : '55px'}">
        <main-menu @clickSetting="showSettingMenu" :setTreeMenu="setTreeMenu" :showTreeMenu="showTreeMenu"></main-menu>
        <menu-tree :class="{hidden: !showTreeMenu}"></menu-tree>
        <ul v-if="isShowSettingMenu" class="settingMenu">
          <li @mousedown="setting()">
            <span>设置</span>
          </li>
        </ul>
      </div>
      <div class="right_c" :style="{width: rightWidth + (showTreeMenu ? 0 : 170) + 'px'}">
        <div class="wrapper">
          <tab-group ref="tabsRef"></tab-group>
          <div class="content">
            <!-- 模态框  -->
            <!-- <status v-if="reqCount > 0" :displayName="'loading'"></status> -->
            <div class="loading-wrapper" v-if="reqCount > 0">
              <div class="loading-bg">
                <MCircle displayName="loading"></MCircle>
              </div>
            </div>
            <!-- 模态框结束 -->
            <keep-alive :include="cachePage.join(',')">
              <router-view></router-view>
            </keep-alive>
            <!-- <router-link :to="{ name: 'table'}">
              神秘入口
            </router-link>
            <router-link :to="{ name: 'split'}">
              神秘入口2
            </router-link> -->
          </div>
        </div>
      </div>
      
      <!-- 更改头像 -->
      <div class="modal changeAvatar" v-if="changeAvatarModal">
        <Modal
          v-model="changeAvatarModal"
          class-name="vertical-center-modal"
          :styles="{width:'280px'}"
          :transition-names="[]"
          :mask-closable="false"
          :transfer="false"
          :closable="false">
          <div slot="header">
            <alert-header headerText="修改头像" :showInput="false"></alert-header>
          </div>
          <div class="body padding20">
            <Button type="ghost" @click="selectImg">上传本地照片</Button>
            <div :style="{width:'240px',height:'240px'}" class="marginT20">
              <vueCropper
                ref="cropper"
                :img="example2.img"
                :outputSize="example2.size"
                :outputType="example2.outputType"
                :info="example2.info"
                :canScale="example2.canScale"
                :autoCrop="example2.autoCrop"
                :autoCropWidth="example2.autoCropWidth"
                :autoCropHeight="example2.autoCropHeight"
                :fixed="example2.fixed"
                :fixedNumber="example2.fixedNumber">
              </vueCropper>
            </div>
          </div>
          <div slot="footer">
            <Button type="ghost" class="fr marginR20 marginB20" @click="changeAvatarModal=false">取 消</Button>
            <Button type="primary" class="fr marginR20 marginB20" @click="submitChangeAvatar">确 定</Button>
            <div class="clearBoth"></div>
          </div>
        </Modal>
      </div>

      <!-- 退出登录 -->
      <div class="modal logout" v-if="logoutModal">
        <Modal
          v-model="logoutModal"
          class-name="vertical-center-modal"
          :styles="{width:'300px'}"
          :transition-names="[]"
          :mask-closable="false"
          :transfer="false"
          :closable="false">
          <div slot="header">
            <alert-header headerText="注销登陆" :showInput="false"></alert-header>
          </div>
          <div class="body">
            <span>确认注销并退出系统吗？</span>
          </div>
          <div slot="footer">
            <Button type="ghost" class="fr marginR20 marginB20" @click="cancelLogout()">取 消</Button>
            <Button type="primary" class="fr marginR20 marginB20" @click="logout()">确 定</Button>
            <div class="clearBoth"></div>
          </div>
        </Modal>
      </div>

      <!-- 修改密码 -->
      <div class="modal changePassword" v-if="changePasswordModal">
        <Modal
          :styles="{width:'320px'}"
          v-model="changePasswordModal"
          class-name="vertical-center-modal"
          :transition-names="[]"
          :mask-closable="false"
          :transfer="false"
          :closable="false">
          <div slot="header">
            <alert-header headerText="修改密码" :showInput="false"></alert-header>
          </div>
          <div class="body">
            <Form ref="changePasswordForm" :rules="ruleValidateChangePasswordForm" :model="changePasswordFormData">
              <div class="row clearfix">
                <span class="textJustify fl lineH30 marginR10" :style="{width: '48px'}">当前密码</span>
                <FormItem prop="curPassword" class="fr">
                  <Input type="password" :style="{width:'220px'}" :maxlength="32" v-model="changePasswordFormData.curPassword"></Input>
                </FormItem>
              </div>
              <div class="row clearfix">
                <span class="textJustify fl lineH30 marginR10" :style="{width: '48px'}">新密码</span>
                <FormItem prop="newPassword" class="fr">
                  <Input type="password" :style="{width:'220px'}" :maxlength="32" v-model="changePasswordFormData.newPassword"></Input>
                  <remark-in-table class="passwordtipIc" :style="{position:'absolute',right:'7px',top:'7px'}"></remark-in-table>
                  <div class="passwordtips">密码由6-32位字母或数字组成，不可包含特殊字符和空格</div>
                </FormItem>
              </div>
              <div class="row clearfix">
                <span class="textJustify fl lineH30 marginR10" :style="{width: '48px'}">确认密码</span>
                <FormItem prop="confirmPassword" class="fr">
                  <Input type="password" :style="{width:'220px'}" :maxlength="32" v-model="changePasswordFormData.confirmPassword"></Input>
                </FormItem>
              </div>
            </Form>
          </div>
          <div slot="footer">
            <Button type="ghost" class="fr marginR20 marginB20" @click="changePasswordModal=false">取 消</Button>
            <Button type="primary" class="fr marginR20 marginB20" @click="submitChangePassword()">确 定</Button>
            <div class="clearBoth"></div>
          </div>
        </Modal>
      </div>

      <!-- 切换账号 -->
      <div class="modal changeAccount" v-if="changeAccountModal">
        <Modal
          :styles="{width:'320px'}"
          v-model="changeAccountModal"
          class-name="vertical-center-modal"
          :transition-names="[]"
          :mask-closable="false"
          :transfer="false"
          :closable="false">
          <div slot="header">
          </div>
          <div class="body">
            <icon name="modal_close_default" class="closeBtn" @click.native="changeAccountModal=false"></icon>
            <Form ref="changeAccountForm" :rules="ruleValidateChangeAccountForm" :model="changeAccountFormData">
              <div>
                <img class="account-avatar" :src="changeAccountFormData.avatar" alt="" @error="error">
              </div>
              <div class="row">
                <FormItem prop="name">
                  <x-input label="用户名" class="marginT5" :maxlength="32" v-model="changeAccountFormData.name"></x-input>
                </FormItem>
              </div>
              <div class="row clearfix">
                <FormItem prop="password">
                  <x-input label="密码" :maxlength="32" type="password" class="marginT20"  v-model="changeAccountFormData.password"></x-input>
                </FormItem>
              </div>
              <Button type="primary" @click="submitLogin()" class="loginBtn">登 录</Button>
              <div class="row marginT15 clearfix bigFont">
                <span class="fl" @click="expand=!expand">网络设置<Icon type="ios-arrow-down" :class="{expand:expand}"></Icon></span>
                <span class="fr" @click="cantLoginModal=true">无法登录？</span>
              </div>
              <div class="row marginT5" v-if="expand">
                <span class="gradeAshThree">服务器请求地址（内网）</span>
                 <Input type="text" v-model="changeAccountFormData.ip"></Input>
              </div>
            </Form>
          </div>
          <div slot="footer"></div>
        </Modal>
      </div>
      <tip-modal
        :controlModal="cantLoginModal"
        :isMask="false"
        modalWidth="460px"
        mainContentSize="16px"
        mainContent="如您因为没有账号密码或忘记密码而无法登录系统，请联系系统管理员协助解决问题"
        @tip-modal-affirm="cantLoginModal=false"
        @tip-modal-cancel="cantLoginModal=false">
      </tip-modal>
      <div v-if="settingModal">
        <SettingModal :visible="settingModal" @closeModal="settingModal=false"></SettingModal>
      </div>
    </div>
  </div>
</template>

<script>
  import { Circle } from 'vue-loading-spinner'
  import mHeader from '@/views/main/components/Header'
  import MenuTree from '@/views/main/components/MenuTree'
  import TabGroup from '@/views/main/components/TabGroup'
  import MainMenu from '@/views/main/components/MainMenu'
  import SettingModal from '@/views/main/components/settingModal'
  import VueCropper from 'vue-cropper'
  import { mapGetters, mapState } from 'vuex'
  import status from '@/components/status'
  import path from 'path'
  import childProcess from 'child_process'

  export default {
    name: 'main',
    components: {
      mHeader,
      MenuTree,
      TabGroup,
      MainMenu,
      status,
      SettingModal,
      MCircle: Circle,
      VueCropper,
    },
    async beforeRouteEnter(to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
      })
    },
    data() {
      const validateCurPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入当前密码'))
        } else {
          callback()
        }
      }
      const validateNewPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          if (this.changePasswordFormData.confirmPassword !== '') {
            // 对确认密码框进行验证
            this.$refs.changePasswordForm.validateField('confirmPassword')
          }
          callback()
        }
      }
      const validateConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.changePasswordFormData.newPassword) {
          callback(new Error('两次输入的密码不相同'))
        } else {
          callback()
        }
      }
      return {
        example2: {
          img: '',
          info: false,
          size: 1,
          outputType: 'jpeg',
          canScale: true,
          autoCrop: true,
          autoCropWidth: 200,
          autoCropHeight: 200,
          original: true,
          fixedBox: true,
        },
        expand: false,
        firstLoadAvatar: true,
        cantLoginModal: false,
        settingModal: false,
        isShowSettingMenu: false,
        rightWidth: 0,
        logoutModal: false,
        changeAccountModal: false,
        changeAvatarModal: false,
        changePasswordModal: false,
        showTreeMenu: true,
        toLogout: {
          parModal: 'logout',
          confirmText: '确 定',
          cancel: '取 消',
        },
        toChangePassword: {
          parModal: 'changePassword',
          confirmText: '确 定',
          cancel: '取 消',
        },
        changePasswordFormData: {
          curPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
        ruleValidateChangePasswordForm: {
          curPassword: [{ validator: validateCurPassword, trigger: 'blur' }],
          newPassword: [{ validator: validateNewPassword, trigger: 'blur' }],
          confirmPassword: [
            { validator: validateConfirmPassword, trigger: 'blur' },
          ],
        },
        changeAccountFormData: {
          avatar: '',
          name: '',
          password: '',
          ip: '',
        },
        ruleValidateChangeAccountForm: {
          name: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('用户名不能为空'))
                } else {
                  callback()
                }
              },
            },
          ],
          password: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('密码不能为空'))
                } else {
                  callback()
                }
              },
            },
          ],
        },
      }
    },
    computed: {
      ...mapState(['reqCount', 'userInfo']),
      ...mapGetters(['cachePage']),
      getHeight() {
        if (this.backupDBs.length < 4) {
          return '160px'
        } else {
          return '361px'
        }
      },
    },
    watch: {
      isShowSettingMenu(val) {
        if (val === true) {
          document.addEventListener('mouseup', this.hideSettingMenu)
        } else {
          document.removeEventListener('mouseup', this.hideSettingMenu)
        }
      },
    },
    mounted: function() {
      this.rightWidth = parseInt(this.$el.getBoundingClientRect().width) - 225
    },
    created() {
      // 监听窗口事件
      window.addEventListener('resize', this.handleResize)
      this.snipaste = childProcess.exec(
        path.join(process.cwd(), 'static', 'tools', 'screenshot', 'Snipaste.exe')
      )
      let that = this
      this.nwWindow.on('close', function() {
        childProcess.exec('taskkill /pid ' + that.snipaste.pid + ' /T /F', () => {
          this.close(true)
        })
      })
    },
    beforeDestroy: function() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize(event) {
        this.rightWidth = parseInt(this.$el.getBoundingClientRect().width) - 225
      },
      cancelLogout() {
        console.log('取消注销登录')
        this.logoutModal = false
      },
      logout() {
        console.log('注销登录成功')
        this.logoutModal = false
      },
      showLogoutModal() {
        this.logoutModal = true
      },
      showChangePasswordModal() {
        this.changePasswordModal = true
        this.$refs['changePasswordForm'].resetFields()
      },
      showChangeAvatarModal() {
        this.changeAvatarModal = true
      },
      submitChangePassword() {
        this.$refs.changePasswordForm.validatevalidate(valid => {
          if (valid) {
            console.log('提交表单,表单数据为=====\n')
            console.log(this.changePasswordFormData)
            this.changePasswordModal = false
          } else {
            console.log('表单验证不通过，提交失败')
          }
        })
      },
      showSettingMenu() {
        this.isShowSettingMenu = true
      },
      setting() {
        this.settingModal = true
        this.isShowSettingMenu = false
      },
      hideSettingMenu() {
        this.isShowSettingMenu = false
      },
      setTreeMenu(isShow) {
        this.showTreeMenu = !!isShow
      },
      submitChangeAvatar() {
        this.$refs.cropper.getCropData((data) => {
          console.log(data)
        })
        this.changeAvatarModal = false
      },
      selectImg() {
        let input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.addEventListener('change', onChange)
        input.click()
        let _this = this
        function onChange(event) {
          console.log(_this.example2)
          _this.example2.img = input.value
        }
      },
      showChangeAccount() {
        this.changeAccountModal = true
        this.changeAccountFormData.name = this.userInfo.name
        this.changeAccountFormData.avatar = this.userInfo.avatar
      },
      error(event) {
        if (this.firstLoadAvatar) {
          event.target.src = '/static/images/public/default_avatar.svg'
          this.firstLoadAvatar = false
        }
      },
      submitLogin() {
        this.$refs.changeAccountForm.validate(valid => {
          if (valid) {
            console.log(this.changeAccountFormData)
            this.changeAccountModal = false
          } else {
            console.log('表单验证不通过，提交失败')
          }
        })
      },
    },
  }
</script>

<style lang="less">
  @import (reference) '~assets/less/public.less';
  .mainVue {
    position: relative;
    height: 100%;

    .font0 {
      font-size: 0;
    }

    .lineH30{
      line-height: 30px;
      height: 30px;
    }

    .flex{
      display: flex;
    }

    .flex1{
      flex: 1;
    }

    .gradeAshThree{
      color: @gradeAshThree;
    }

    .clearfix:after{
      content: "";
      display: block;
      clear: both;
    }

    .headerWrapper {
      width: 100%;
      height: @headerHeight;
      background: #bebebe;
    }
    .contentWrapper {
      height: calc(~'100% - 60px');
      display: flex;
      .left_c {
        position: relative;
        width: @mainMenuWidth+@menuTreeWidth;
        height: 100%;
        transition: width 0.2s linear;
        .mainMenu {
          z-index: 2;
        }
        .settingMenu {
          position: absolute;
          left: 16px;
          bottom: 66px;
          border-radius: 4px;
          background-color: #ffffff;
          filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.12));
          z-index: 999;
          white-space: nowrap;

          &::after {
            content: '';
            position: absolute;
            bottom: -9px;
            border-top: 10px solid #ffffff;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
          }

          li {
            height: 36px;
            padding-left: 10px;
            padding-right: 10px;
            cursor: pointer;
          }

          li:hover {
            background-color: @userMenuItemHover;
          }
          span {
            display: inline-block;
            min-width: 100px;
            font-size: 12px;
            color: @gradeAshTwo;
            line-height: 36px;
          }
        }
        & > .tree {
          transition: 0.2s linear;
          transition-property: margin, visibility;
          &.hidden {
            margin-left: -170px;
            visibility: hidden;
          }
        }
      }
      .right_c {
        display: block;
        // padding-left: 10px;
        // background-color: @allBg;
        background-color: #fff;
        transition: width 0.2s linear;
        height: 100%;
        .wrapper {
          height: 100%;
        }

        .content {
          height: calc(~'100% - 50px');
          position: relative;
        }

        .loading-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 9999;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
        }

        .loading-bg {
          width: 80px;
          height: 80px;
          margin: auto;
          box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
          border-radius: 8px;
          background: #fff;
          opacity: 0.8;
        }

        .spinner--circle {
          margin: 20px;
        }
      }
    }

    .logout {
      .body {
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;

        span {
          display: inline-block;
          margin: 0 auto;
          font-size: 16px;
          color: #4a4a4a;
        }
      }
    }

    .changePassword {
      .body {
        padding: 20px;
        padding-bottom: 0;
        .btnGroup {
          padding: 1px;

          .enter {
            padding: 7px 24px;
          }
          .cancel {
            margin-left: 20px;
            padding: 7px 24px;
          }
        }
        .passwordtips{
          display: none;
          position: absolute;
          padding: 5px 10px;
          right: 23px;
          top: -20px;
          left: 0;
          background: #FFFCDC;
          border: 1px solid#CCCCCC;
        }
        .passwordtipIc:hover + .passwordtips{
          display: block;
        }
      }
    }

    .changeAccount{
      .body{
        padding: 20px;
      }
      .account-avatar{
        width: 88px;
        height: 88px;
        border-radius: 50%;
        background: #bebebe;
        display: block;
        margin: 20px auto;
      }
      .bigFont{
        color: #008CEE;
        font-size: 14px;

        span{
          cursor: pointer;
        }
      }
      .loginBtn{
        width: 100%;
        height: 40px;
        border-radius: 20px;
        font-size: 18px;
        margin-top: 35px;
        background: linear-gradient(right, #008CEE, #0067D4);
      }
      .closeBtn{
        position: absolute;
        right: 10px;
        top: 10px;
        width: 14px;
        height: 14px;
        padding: 3px;
        fill: #FFF;
        background: @tsIcon;
        border-radius: 50%;
        cursor: pointer;
      }
      .ivu-icon-ios-arrow-down{
        font-size: 18px;
        position: relative;
        top: 2px;
        left: 4px;
        transform: rotate(-90deg);
        transition: all 0.2s ease-in-out;
      }
      .ivu-icon-ios-arrow-down.expand{
        transform: rotate(0deg);
      }
      .ivu-form-item{
        margin-bottom: 0;
      }
    }
  }
</style>
