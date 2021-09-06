<template>
  <div class="organizationInformation-wrapper height100P padding10">
    <div class="organizationInformation contentBg height100P">
      <div class="center">
        <div class="clearfix marginB10">
          <Button type="ghost" class="fr" @click="edit">编 辑</Button>
        </div>
        <div class="row">
          <span class="textJustify lineH30 marginR10" :style="{width:'60px'}">机构名称</span>
          <div class="right">
            <span>{{info.name}}</span>
          </div>
        </div>
        <div class="row">
          <span class="textJustify lineH30 marginR10" :style="{width:'60px'}">机构电话</span>
          <div class="right">
            <span>{{info.tel}}</span>
          </div>
        </div>
        <div class="row">
          <span class="textJustify lineH30 marginR10" :style="{width:'60px'}">机构地址</span>
          <div class="right">
            <span>{{info.address}}</span>
          </div>
        </div>
        <div class="row">
          <span class="textJustify lineH30 marginR10" :style="{width:'60px'}">机构网站</span>
          <div class="right">
            <span>{{info.web}}</span>
          </div>
        </div>
        <div class="row">
          <span class="textJustify lineH30 marginR10" :style="{width:'60px'}">机构LOGO</span>
          <div>
            <img :src="info.logo" class="logo" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="edit-modal" v-if="editModal">
      <Modal
        v-model="editModal"
        width="710"
        :transfer="false"
        :closable="false"
        :mask-closable="false"
        :transition-names="['']">
        <div slot="header">
          <alert-header
            :showInput="false"
            headerText="编辑医院信息">
          </alert-header>
        </div>
        <div class="body">
          <div class="row flex">
            <span class="textJustify lineH30 marginR10" :style="{width:'60px'}">机构名称</span>
            <Input type="text" class="flex1" v-model="formData.name"></Input>
          </div>
          <div class="row flex">
            <span class="textJustify lineH30 marginR10" :style="{width:'60px'}">机构电话</span>
            <Input type="text" class="flex1" v-model="formData.tel"></Input>
          </div>
          <div class="row flex">
            <span class="textJustify lineH30 marginR10" :style="{width:'60px'}">机构地址</span>
            <Input type="text" class="flex1" v-model="formData.address"></Input>
          </div>
          <div class="row flex">
            <span class="textJustify lineH30 marginR10" :style="{width:'60px'}">机构网站</span>
            <Input type="text" class="flex1" v-model="formData.web"></Input>
          </div>
          <div class="row flex">
            <span class="textJustify lineH30 marginR10" :style="{width:'60px'}">机构LOGO</span>
            <div class="flex">
              <img class="logo" :src="formData.logo" id="logo" alt="">
              <Button type="ghost" class="marginL10" @click="importImg">本地导入</Button>
            </div>
          </div>
        </div>
        <div slot="footer" class="clearfix">
          <Button type="ghost" class="fr marginR20 marginB20" @click="editModal=false">取 消</Button>
          <Button type="primary" class="fr marginR20 marginB20" @click="submitEdit">保 存</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  name: 'organizationInformation',
  data() {
    return {
      info: {
        name: '成都中医药大学第二附属医院健康体检中心',
        tel: '028-6666 8888',
        address: '成都市武侯区人民南路四段17号',
        web: 'http://www.sctcm120.com/',
        logo: '',
      },
      formData: {},
      editModal: false,
    }
  },
  methods: {
    importImg() {
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.addEventListener('change', onChange)
      input.click()
      let _this = this
      function onChange(event) {
        document.querySelector('#logo').src = input.value
        _this.formData.logo = input.value
      }
    },
    edit() {
      this.formData = JSON.parse(JSON.stringify(this.info))
      this.editModal = true
    },
    submitEdit() {
      this.info = JSON.parse(JSON.stringify(this.formData))
      this.editModal = false
    },
  },
  created() {
    this.formData = JSON.parse(JSON.stringify(this.info))
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .organizationInformation-wrapper{
    .lineH30{
      line-height: 30px;
    }
    .clearfix:after {
      content:""; 
      display: block; 
      clear:both; 
    }
    .flex1{
      flex: 1;
    }
    .organizationInformation{
      .center{
        width: 670px;
        margin: 0 auto;
        margin-top: 30px;

        .row{
          display: flex;
          height: 30px;
          margin-bottom: 20px;
        }
        .right{
          flex: 1;
          height: 30px;
          padding: 0 10px;
          border: 1px solid @gradeAshFour;
          line-height: 30px;
        }
      }
    }
    .body{
      padding: 20px;
      .row{
        height: 30px;
        margin-bottom: 20px;

        &:nth-last-child(1){
          height: 120px;
          align-items: flex-start;
          margin-bottom: 0;

          &>div{
            align-items: flex-end;
          }
        }
      }
      .flex{
        display: flex;
      }
    }
    .logo{
      width: 120px;
      height: 120px;
    }
  }
</style>
