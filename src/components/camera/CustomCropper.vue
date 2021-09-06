<template>
  <div class="cropper-modal">
    <!-- <div class="overlay"></div> -->
    <div class="modal">
      <!-- <div class="modal-head">
        <div class="head-wrap">title</div>
      </div> -->
      <div class="modal-content clearfix">
        <div class="img-clip-wrap">
          <div class="container-bg">
            <div class="img-container">
              <img id="clip_src_img" @load="srcImgLoaded" :src="img">
              <div class="shadow-box"></div>
              <Select-Box ref="box" :srcSize="imgSize" :ratio="ratio" :img="img" @selectEnd="selectEnd"
                          @selectChange="selectChange"></Select-Box>
            </div>
          </div>
          <!-- <div class="reset-img">
            <i class="icon-reset"></i>
            <span>select image</span>
            <input type="file" id="file_input" accept="image/png,image/jpg,image/gif" @change="fileChange">
          </div> -->
        </div>
        <div class="img-preview-wrap">
          <div class="pre-container">
            <img id="clip_res_img" :src="img">
          </div>
          <div class="pre-info">头像预览</div>
        </div>
      </div>
      <div class="modal-footer">
        <!-- <a class="modal-btn btn-confirm" :href="clipData" download="crop.jpg">clip</a> -->
          <div class="bottom">
           <div class="upload" >            
              <div class="reset-img">
              <div class="upload-svg"></div>
              <i class="icon-reset"></i>
             <span>上传本地图片</span>
             <input type="file" id="file_input" accept="image/png,image/jpg,image/gif" @change="fileChange">
           </div>
          <div class="photo" @click='takePhoto'>
             <div class="upload-svg"></div>
             <div class="upload-title">现场拍摄</div>
          </div>
           </div>
          <div class="bottom-right">
            <Button type="primary" class="button" @click="addPhotoModalSure">保 存</Button>
            <Button type="ghost" class="button" @click="addPhotoModalCancel">取 消</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectBox from './SelectBox.vue'
  import {mapState} from 'vuex'
  export default {
    components: {
      SelectBox,
    },
    data () {
      return {
        img: null,
        $srcImg: null,
        $resImg: null,
        $input: null,
        $imgContainer: null,
        $preContainer: null,
        nw: 0,
        nh: 0,
        clipData: null,
        ratio: 3 / 4, // equal to SelectBox's width / height
        imgSize: {w: 0, h: 0},
        containerTop: 0,
      }
    },
    computed: {
      ...mapState('personalPhysicalExaminationModule', ['takePhotoUrl']),
    },
    mounted () {
      this.$input = this.$el.querySelectorAll('#file_input')[0]
      this.$srcImg = this.$el.querySelectorAll('#clip_src_img')[0]
      this.$resImg = this.$el.querySelectorAll('#clip_res_img')[0]
      this.$imgContainer = this.$el.querySelectorAll('.img-container')[0]
      this.$preContainer = this.$el.querySelectorAll('.pre-container')[0]
      this.$containerBox = this.$el.querySelectorAll('.container-bg')[0]
    },
    methods: {
      addPhotoModalSure() {
        // console.log('保存', this.clipData)
        this.$emit('save-photo', this.clipData)
      },
      takePhoto() {
        this.$emit('take-photo')
      },
      addPhotoModalCancel() {
        this.$emit('add-photo-modal-cancel')
      },
      selectChange () {
        const rec = this.$refs.box.rec
        if (rec.w > 0 && rec.h > 0) {
          this.updatePreview()
        }
      },
      selectEnd () {
        const rec = this.$refs.box.rec
        if (rec.w > 0 && rec.h > 0) {
          this.clip()
        }
      },
      fileChange () {
        const me = this
        const fd = new FileReader()
        fd.onloadend = function () {
          me.img = fd.result
        }
        if (this.$input.files && this.$input.files[0]) {
          fd.readAsDataURL(this.$input.files[0])
        }
      },
      srcImgLoaded () {
        this.nw = this.$srcImg.naturalWidth
        this.nh = this.$srcImg.naturalHeight
        this.clearSelect()
        this.setImgSize()
        this.updatePreview()
        this.clip()
      },
      clearSelect () {
        const box = this.$refs.box
        box.clearRec()
        this.clipData = null
      },
      setImgSize () {
        // image's naturalWidth naturalHeight ratio
        const nr = this.nw / this.nh
        const scw = this.$containerBox.offsetWidth
        const sch = this.$containerBox.offsetHeight
        let rw = 0  // select box width
        let rh = 0  // select box height
        if (nr >= this.ratio) {
          this.imgSize.w = scw
          this.imgSize.h = scw / nr
          this.containerTop = (sch - this.imgSize.h) / 2
          rh = this.imgSize.h
          rw = rh * this.ratio
        } else {
          this.imgSize.h = sch
          this.imgSize.w = sch * nr
          this.containerTop = 0
          rw = this.imgSize.w
          rh = rw / this.ratio
        }
        this.$srcImg.setAttribute('style', `width:${this.imgSize.w}px;height:${this.imgSize.h}px;`)
        this.$imgContainer.setAttribute('style',
          `width:${this.imgSize.w}px;height:${this.imgSize.h}px;top:${this.containerTop}px;`)
        this.$refs.box.rec = {w: 180, h: 230, l: 0, t: 0}
      },
      getComputedRec (r) {
        const cw = this.$imgContainer.offsetWidth
        const ch = this.$imgContainer.offsetHeight
        const wr = cw / this.nw
        const hr = ch / this.nh
        return {
          l: r.l / wr,
          t: r.t / hr,
          w: r.w / wr,
          h: r.h / hr,
        }
      },
      updatePreview () {
        const rec = this.$refs.box.rec
        const pcw = this.$preContainer.offsetWidth
        const pch = this.$preContainer.offsetHeight
        const wr = pcw / rec.w
        const hr = pch / rec.h
        const w = wr * this.$imgContainer.offsetWidth
        const h = hr * this.$imgContainer.offsetHeight
        const l = -rec.l * wr
        const t = -rec.t * hr
        this.$resImg.setAttribute('style',
          `width:${w}px;height:${h}px;top:${t}px;left:${l}px;`)
      },
      clip () {
        let rec = this.$refs.box.rec
        if (!rec.w || !rec.h) {
          return
        }

        const bufferCanvas = document.createElement('canvas')
        const bfx = bufferCanvas.getContext('2d')
        const computedRec = this.getComputedRec(rec)
        // bufferCanvas.width = // computedRec.w
        // bufferCanvas.height = // computedRec.h
        bufferCanvas.width = 116
        bufferCanvas.height = 142
        console.log(computedRec, this.nw, this.nh)
        bfx.drawImage(this.$srcImg, computedRec.l, computedRec.t, computedRec.w, computedRec.h, 0, 0, 116, 142)
        this.clipData = bufferCanvas.toDataURL('image/jpeg', 1)
      },
    },
    watch: {
      'takePhotoUrl'(val) {
        this.img = val
      },
    },
  }
</script>

<style scoped lang='less'>
  .cropper-modal .modal {
    overflow: hidden;
    width: 640px;
    height: 430px;
    border-radius: 8px;
    background-color: #fff;
  }

  .modal-head {
    position: relative;
    text-align: center;
    padding: 0 16px 0 40px;
  }

  .head-wrap {
    position: relative;
    font-size: 14px;
    color: #222;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e9ef;
  }

  /* .modal-content {
    padding: 30px 40px 40px;
  } */

  .img-clip-wrap {
    overflow: hidden;
    width: 465px;
    height: 340px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }

  .container-bg {
    width: 465px;
    height: 340px;
    background-color: #000;
    border-radius: 4px;
  }

  .img-container {
    position: relative;
    height: 0;
    margin: auto;
  }

  .img-container img {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .img-container .shadow-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1;
  }

  .reset-img {
    position: relative;
    display: inline-block;
    margin-top: 16px;
    font-size: 12px;
    color: #008CEE;
    font-weight: bold;
    cursor: pointer;
    overflow: hidden;
  }

  .reset-img input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer
  }

  // .reset-img:hover {
  //    color: #00b5e5;
  // }

  .img-preview-wrap {
    width: 116px;
    float: right;
    margin-top: 100px;
    margin-right: 20px;
  }

  .pre-container {
    width: 116px;
    height: 142px;
    background-color: #000;
    overflow: hidden;
    border-radius: 4px;
  }

  .pre-container img {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }

  .pre-info {
    margin-top: 8px;
    font-size: 12px;
    color: #4A4A4A;
    margin-left: 32px;
  }

  .clearfix:before, .clearfix:after {
    content: ' ';
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .modal-footer {
    text-align: center;
  }

  .modal-btn {
    display: inline-block;
    width: 110px;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
  }

  .btn-confirm {
    border: 1px solid #00a1d6;
    color: #fff;
    background-color: #00a1d6;
  }

  .btn-confirm:hover {
    background-color: #00b5e5;
  }
  .bottom {
    // background: lightpink;
    height: 70px;
    position: relative;
    .bottom-right {
      position: absolute;
      top: 0px;
      right: 0px;
        .button {
          margin-top: 20px;  
          margin-right: 20px;
          }
       }
    .upload{
      cursor: pointer;
     display: inline-block;
     font-size: 12px;
     color: #FFFFFF;
     position: absolute;
     bottom: 20px;
     left: 30px;
     .upload-svg{ 
        margin-right: 5px;
        vertical-align: top;
        width: 18px;
        height: 15px;
        display: inline-block;
        background: url(/static/icons/public/uploadblue.svg) no-repeat 

     }
     .upload-title{
         margin-top: 8px;
        vertical-align: top;
        display: inline-block;
     }
   } 
    .photo{
          width: 100px;
      cursor: pointer;
     display: inline-block;
     font-size: 12px;
     color: #FFFFFF;
     position: absolute;
         bottom: -2px;
    left: 106px;
     .upload-svg{ 
        margin-right: 5px;
        vertical-align: top;
        width: 24px;
        height: 25px;
        display: inline-block;
        background: url(/static/icons/public/camerablue.svg) no-repeat ;
        margin-top:7px;

     }
     .upload-title{
       font-weight: bold;
        font-size: 12px;
        color: #008CEE;
        margin-top: 8px;
        vertical-align: top;
        display: inline-block;
     }
   } 
     
  }
</style>
