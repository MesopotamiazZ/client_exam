/**
* author      : yhy
* cteate      : 2018/01/16 09:22
* description : excel导入
*/
<template>
     <!-- excel -->
  <div v-if="excelModal">
    <Modal v-model="excelModal"  class="excel-modal"
        :width='556'
        :transfer='false'
        :mask-closable="false"
        :transition-names="['']"
        :closable="false">
      <div slot="header">
      </div>
      <div class="content">    
          <div class="content-wrapper">
            <div class="leftName">选择文件</div>
            <div class="up-load" @click='upLoadExcel'>
              <img src="/static/icons/public/mfile.svg" >
              <span>浏览</span>
            </div>
            <Input v-model="inputValue" style="width: 453px"/>
                <!-- <Upload action="//jsonplaceholder.typicode.com/posts/" class="upload">
                      <img src="/static/icons/public/mfile.svg" >
                      <span>浏览</span>
                </Upload> -->
          </div>  
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Button type="primary" class="button" @click="excelModalSure">导 入</Button>
            <Button type="ghost" class="button" @click="excelModalCancel">取 消</Button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
    
</template>

<script>
export default {
  name: 'excelModal',
  data () {
    return {
      inputValue: '',
      // unitName: '',
      // vipNumber: '',
      upLoadData: null,
    }
  },
  props: {
    excelModal: {
      type: Boolean,
      default: false,
    },
  },
  wathc: {
    excelModal (val) {
      console.log(val)
      if (!val) {
        this.initClear()
      }
    },
  },
  methods: {
    upLoadExcel () { // 文件上传
      let fs = require('fs')
      let that = this
      let upLoadInput = document.createElement('input')
      upLoadInput.type = 'file'
      upLoadInput.addEventListener('change', onchange)
      upLoadInput.click()
      function onchange() {
        that.inputValue = upLoadInput.value
        // console.log(that.inputValue)
        fs.readFile(that.inputValue, function(err, data) {
          if (err) {
            return err
          }
          that.upLoadData = data
        })
      }
    },
    excelModalSure() { //   确认
      // let submitBtn = document.created
      this.$emit('upgradeVipSure', this.upLoadData)
    },
    excelModalCancel() { // 取消
      this.$emit('update:excelModal', false)
      this.initClear()
    },
    initClear () {
      this.inputValue = ''
      this.upLoadData = null
    },
  },
}
</script>

<style lang="less" scoped>
.excel-modal{
  .leftName{
    vertical-align: top;
    line-height: 45px;
    height: 30px;
    overflow: hidden;
    margin: 0 10px 0 0;
    display: inline-block;
    text-align: justify;
    width: 50px;
    &::after{
      content:'';
      padding-left:100%;
      display: inline-block;
    }
  }
  .content{
    line-height: 40px;
    .content-wrapper{
      padding-top: 20px;
      padding-left: 20px;
      position: relative;
      .up-load{
        cursor: pointer;
        position: absolute;
        top: 22px;
        right: 33px;
        z-index: 100;
        // &>div {
        //   position: relative;
        //   right: 0px;
        //   top: 0px;
        //   z-index: 100;
        //   outline: 1px solid red;
        //   // &>input {
        //   //   position: absolute;
        //   //   right: 0;

        //   // }
        //   &>div {
        //     position: absolute;
        //     right: 0;
        //     top: 0;
        //   }
        // }
        // span{
        // padding-top: 5px;   
        // font-size: 12px;
        // color: #1770D7;
        // }
      }
    }   
  }
  .bottom {
    height: 70px;
    .bottom-right {
      .button {
        margin-top: 20px;  
        margin-right: 20px;
      }
    }
  }
}
</style>


