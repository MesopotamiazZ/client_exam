
/**
 * 签名上传上传组件
 * @author 黄伟
 * @date 2017/12/15
 *  图片默认最大480 180 要改可以传值进来
 */
<template>
  <div class='signatureUpload'>
    <div><img :src="img" class="signatureUpload-img" :style="imgStyle"></div>
    <div class="signatureUpload-btn">
      <div class="signatureUpload-btnClass" @click="delclickFuc ">删除签名</div>     
      <div class="signatureUpload-btnClass">
        <input style="opacity:0" type="file" :accept="acceptFileTypes" @change="fileChange()">上传图片
      </div>
      <div class="signatureUpload-btnClass" @click="handclickFuc">手绘签名</div>     
    </div>
  </div>
</template>
<script>
  export default {
    name: 'image-load',
    data() {
      return {
        img: '', // 图片路径
      }
    },
    props: {
      imgStyle: {
        type: String,
        default: 'max-width: 480px;max-height: 180px;',
      },
      multiple: {
        type: Boolean,
        default: true,
      },
      name: {
        type: String,
        default: 'file',
      },
      acceptFileTypes: {
        type: RegExp,
        default: function() {
          return /(\.|\/)(gif|jpe?g|png|bmp)$/i
        },
      },
      columns: {
        type: Array,
        default: '',
      },
    },
    mounted() {
      this.$input = this.$el.querySelectorAll('#file_input')[0]
      console.log('图片上传')
    },
    methods: {
      fileChange(e) {
        const me = this
        const fd = new FileReader()
        fd.onloadend = function() {
          me.img = fd.result
        }
        if (this.$input.files && this.$input.files[0]) {
          fd.readAsDataURL(this.$input.files[0])
          this.$emit('getImg', this.$input.files[0])
        }
      },
      init() {
        let fn = this
        fn.img = ''
      },
      handclickFuc() {
        this.$emit('handclickFuc')
      },
      delclickFuc() {
        this.$emit('delclickFuc')
      },
    },
  }
</script>
<style  lang="less" scoped>
  .signatureUpload {
    width: 480px;
    height: 180px;
    position: relative;
    background: #f2f2f2;
    .signatureUpload-btn {
      position: absolute;
      bottom: 12px;
      width: 100%;
      .signatureUpload-btnClass {
        float: right;
        width: 78px;
        height: 30px;
        border: 1px solid #cccccc;
        color: #737373;
        background: #ffffff;
        border-radius: 3px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
      }
    }
    #file_input {
      width: 78px;
      height: 30px;
      position: absolute;
      bottom: 0;
    }
    input {
      width: 78px;
      height: 30px;
      transform: translateX(-15px);
    }
  }
</style>