<template>
  <div class="camera">
    <div class="camera-header">
      <div class="camera-header-wrapper">
        <div class="title">选择摄像设备</div>
        <Select v-model="cameraId" style="width:240px" class="select">
          <Option v-for="item in cameras" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>  
      </div>
      <div class="close-camera" @click='closeCamera'></div>    
    </div>
     <video ref="video" autoplay :style="styles" class="video-wrapper"></video>
     <div class="bottom">      
        <div @click="capture" class="button">
           <div class="camera-svg"></div>
           <div class="camera-tilte">拍照</div>
        </div>
     </div>
     <div class="upload" >
              <div class="reset-img">
              <div class="upload-svg"></div>
              <i class="icon-reset"></i>
             <div class="loadimg">上传本地图片</div>
             <input type="file" id="file_input" accept="image/png,image/jpg,image/gif" @change="fileChange">
           </div>
     </div>
     
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  name: 'device',
  props: {
    width: {
      type: Number,
      default: 960,
    },
    height: {
      type: Number,
      default: 720,
    },
  },
  data() {
    return {
      cameras: [],
      cameraId: null,
      src: null,
      mediaStreamTrack: null,
    }
  },
  methods: {
    fileChange () {
      const me = this
      const fd = new FileReader()
      fd.onloadend = function () {
        // me.img = fd.result
        me.setTakePhotoUrl(fd.result)
        me.$emit('take-photo', fd.result)
      }
      if (this.$el.querySelectorAll('#file_input')[0].files && this.$el.querySelectorAll('#file_input')[0].files[0]) {
        fd.readAsDataURL(this.$el.querySelectorAll('#file_input')[0].files[0])
      }
    },
    // 点击拍照
    capture () {
      let $canvas = document.createElement('canvas')
      $canvas.width = this.$refs.video.clientWidth
      $canvas.height = this.$refs.video.clientHeight
      let ctx = $canvas.getContext('2d')
      ctx.drawImage(this.$refs.video, 0, 0)
      this.setTakePhotoUrl($canvas.toDataURL())
      this.$emit('take-photo', $canvas.toDataURL())
    },
    async getCameras() {
      // console.log(navigator)
      let sourceInfos = await navigator.mediaDevices.enumerateDevices()
      for (let i = 0; i !== sourceInfos.length; ++i) {
        let sourceInfo = sourceInfos[i]
        // 这里会遍历audio,video，所以要加以区分
        if (sourceInfo.kind.indexOf('video') === 0) {
          this.cameras.push({
            id: sourceInfo.deviceId,
            name: sourceInfo.label,
          })
        }
      }
      if (this.cameras.length) {
        this.cameraId = this.cameras[0].id
      }
    },
    async closeCameras () { // 关闭调用相机
      this.mediaStreamTrack.getTracks().forEach((track) => {
        track.stop()
      })
    },
    // 关闭照相机
    closeCamera() {
      this.$emit('close-camera')
    },
    // 上传本地图片
    uploadCamera() {
      this.$emit('upload-camera')
    },
    ...mapMutations('personalPhysicalExaminationModule', ['setTakePhotoUrl']),
  },
  mounted() {
    this.getCameras()
  },
  beforeDestroy() {
    this.closeCameras()
  },
  watch: {
    cameraId(val) {
      // console.log(navigator)
      // console.log(1111)
      navigator.webkitGetUserMedia({video: true}, stream => {
        this.$refs.video.src = window.URL.createObjectURL(stream)
        this.mediaStreamTrack = stream
      }, error => {
        console.log(error)
      })
    },
  },
  computed: {
    styles () {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
      }
    },
  },
}
</script>

<style lang="less" scoped>
 .camera{
  
   position: relative;
   .camera-header{
      border-radius: 8px;
     height: 50px;
     background: #F2F5FA;
     .camera-header-wrapper{
       text-align: center;
       .title{
         vertical-align: top;
         font-size: 12px;
         color: #737373;
         margin-right: 10px;       
         line-height: 50px;
         display: inline-block;
       }
       .select{
         margin-top: 10px;
       }
     }
     .close-camera{
       cursor: pointer;
       position: absolute;
       top: 13px;
       right: 16px;
       width: 20px;
       height: 20px;
       display: inline-block;
       background: url(/static/icons/public/closeCamera.svg) no-repeat;
       background-size: 20px;
     }
   }
   .video-wrapper {
     background: lightblue;
   }
   .bottom{
     background: rgba(17,17,17,0.50);
     width: 100%;
     text-align: center;
     position: absolute;
     bottom: 0;
     left: 0;
   
     .button{
       cursor: pointer;
       width: 100px;
       height: 40px;
       display: inline-block;
       background: #008CEE;
       border-radius: 100px;
       color: white;
       font-weight: bold;
       line-height: 40px;
       position: relative;       
      .camera-svg{
        position: absolute;
        top: 10px;
        right: 53px;
        vertical-align: top;
         display: inline-block;
        width: 24px;
        height: 20px;
        display: inline-block;
        background: url(/static/icons/public/camera.svg) no-repeat 
      }
      .camera-tilte{
        font-size: 14px;
         position: absolute;
        top: 0;
        right: 17px;
        text-align: right;
        vertical-align: top;
        display: inline-block;
      } 
     }
   }
    .upload{
      cursor: pointer;
     display: inline-block;
     font-size: 12px;
     color: #FFFFFF;
     position: absolute;
     bottom: 13px;
     left: 30px;
     .upload-svg{ 
        margin-top: 10px;
        margin-right: 5px;
        vertical-align: top;
        width: 18px;
        height: 15px;
        display: inline-block;
        background: url(/static/icons/public/upload.svg) no-repeat 

     }
     .upload-title{
         margin-top: 8px;
        vertical-align: top;
        display: inline-block;
     }
   } 
    .reset-img {
    position: relative;
    display: inline-block;
    margin-top: 16px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    // overflow: hidden;
  }

  .reset-img input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer
  }
  .loadimg{
    margin-top: 15px;

    display: inline-block;
  }
 }
</style>
