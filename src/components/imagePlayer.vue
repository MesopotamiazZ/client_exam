/**
* @author 张澈
* @data 2018/1/10
* @description 图片播放器
*/
<template>
  <div class="imagePlayerOuterBox" ref="outerBox" v-show="opened">
    <div class="imagePlayerPanel" ref="panel" :class="{imageMoving: imageMoving}" :style="{'transform-origin': scaleOrigin}" >
      <div class="images" ref="imageBox">
        <img v-for="(item, index) in images" :data-src="item.shortcut ? item.src : undefined" :src="item.shortcut || item.src" draggable="false" @mousedown="move_mousedown" @mousewheel="wheelScale"
             :style="{
            'transform-origin': selectedIndex === index ? originVal : undefined,
            'z-index': selectedIndex === index ? '8' : undefined,
        }"/>
      </div>
      <div class="preview" :style="{width: 150 * maxPreview - 10 + 'px'}">
        <div class="shortcutsWrapper" ref="shortcutsWrapper">
          <div class="shortcutsBox">
            <img v-for="(item, index) in images" :src="item.shortcut || item.src" :class="{selected: index === selectedIndex}" @click="imageMoving || (selectedIndex = index)" :title="item.description"/>
          </div>
        </div>
        <div class="previewOperation">
          <span class="backwardRoll" @click="previewRoll(-3)"><icon name="leftArrow1"></icon></span>
          <span class="forwardRoll" @click="previewRoll(3)"><icon name="rightArrow1"></icon></span>
        </div>
      </div>
      <div class="operation">
        <span class="item moveOperation" @click="imageMoving = !imageMoving"><icon class="icon" name="move"></icon><span class="desc">拖动</span></span>
        <span class="item" @click="scaleUp"><icon class="icon" name="scaleUp"></icon><span class="desc">放大</span></span>
        <span class="item" @click="scaleDown"><icon class="icon" name="scaleDown"></icon><span class="desc">缩小</span></span>
        <span class="item" @click="rotate"><icon class="icon" name="rotateClockwise"></icon><span class="desc">旋转</span></span>
        <span class="item" @click="download"><icon class="icon" name="download"></icon><span class="desc">下载</span></span>
      </div>
      <span class="backwardIcon" @click="changeFocus(-1)"><icon class="icon" name="leftArrow2" ></icon></span>
      <span class="forwardIcon" @click="changeFocus(1)"><icon class="icon" name="rightArrow2" ></icon></span>
      <div class="closeBtn" @click="opened = false"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    images: {   // [{src 图片链接, shortcut 缩略图链接, description 描述}]
      type: Array,
      default: () => {
        return []
      },
    },
    scaleOrigin: String,
  },
  data() {
    return {
      directionMarks: undefined,
      scaleFactors: undefined,
      positions: undefined,
      selectedIndex: -1,
      imgs: null,
      opened: false,
      maxPreview: 5,
      originVal: 'center',
//      originX: 0,
//      originY: 0,
      scaleVal: 1,
      rotateVal: 0,
      offsetLeft: 0,
      offsetTop: 0,
      previewScroll: 0,
      scrollTimer: null,
      imageMoving: false,
      movingData: {
        cursorX: 0,
        cursorY: 0,
        imgX: 0,
        imgY: 0,
        imageDom: null,
      },
      resetTransitionTimer: null,
      componentActive: false,
    }
  },
  watch: {
    imgs(val) {
      try {
        this.$refs.shortcutsBox.style.width = val.length * 150 - 10 + 'px'
      } catch (e) {
//
      }
    },
//    originX(val) {
//      this.originVal = val + 'px ' + this.originY + 'px'
//    },
//    originY(val) {
//      this.originVal = this.originX + 'px ' + val + 'px'
//    },
    selectedIndex(val, oldVal) {
      this.originVal = 'center'
      this.scaleVal = 1
      this.rotateVal = 0
      this.offsetLeft = 0
      this.offsetTop = 0
      let imgs = this.imgs
      let selectedImage = imgs[this.selectedIndex]
      if (!selectedImage) return
      let selectedImageSrc = selectedImage.getAttribute('data-src')
      if (selectedImageSrc) {
        selectedImage.src = selectedImageSrc
        selectedImage.removeAttribute('data-src')
//        this.imageResize(selectedImage)
      }

      for (let i = 0; i < imgs.length; i++) {
        let img = imgs[i]
        if (img) {
          let offsetFactor = i - val
          if (offsetFactor === 0) {
            this.updateSelectedImage()
          } else {
            img.style.transform = `translateX(${285 * offsetFactor / Math.abs(offsetFactor) + 390 * offsetFactor}px) scale(0.4)`
          }
        }
      }
      let selectedPreviewLeftPosition = this.selectedIndex * 150 - this.previewScroll
      let maxLeftPosition = this.maxPreview * 150 - 150
      if (selectedPreviewLeftPosition < 0) {
        this.previewRoll(selectedPreviewLeftPosition / 150)
      } else if (selectedPreviewLeftPosition > maxLeftPosition) {
        this.previewRoll((selectedPreviewLeftPosition - maxLeftPosition) / 150)
      }
    },
    opened(val) {
      if (val) {
        window.setTimeout(() => {
          this.panelResize()
        })
      }
      window.setTimeout(() => {
        this.select(0)
      })
    },
  },
  methods: {
    move_mousedown(e) {
      e = event
      if ((e.ctrlKey || this.imageMoving) && e.srcElement === this.imgs[this.selectedIndex]) {
        this.movingData.imageDom = this.imgs[this.selectedIndex]
        this.movingData.imageDom.style.transition = 'none'

        this.movingData.cursorX = e.pageX
        this.movingData.cursorY = e.pageY
//        console.log(this.movingData.imageDom.style.transform)
//        this.movingData.imageDom.style.transform.replace(/translate\((-?\d+)px,\s*(-?\d+)px\)/, (match, x, y) => {
//          this.movingData.imgX = ~~x
//          this.movingData.imgY = ~~y
//        })
        this.movingData.imgX = this.offsetLeft
        this.movingData.imgY = this.offsetTop
        window.addEventListener('mousemove', this.move_mousemove)
        window.addEventListener('mouseup', this.move_mouseup)
      }
    },
    move_mousemove(e) {
      this.offsetLeft = e.pageX - this.movingData.cursorX + this.movingData.imgX
      this.offsetTop = e.pageY - this.movingData.cursorY + this.movingData.imgY
      this.updateSelectedImage()
    },
    move_mouseup(e) {
      this.movingData.imageDom.style.cssText = this.movingData.imageDom.style.cssText.replace(/transition:\s*none;?/, '')
      window.removeEventListener('mousemove', this.move_mousemove)
      window.removeEventListener('mouseup', this.move_mouseup)
    },
    select(val) {
      this.selectedIndex = val
      this.originVal = 'center'
      this.scaleVal = 1
      this.rotateVal = 0
      this.offsetLeft = 0
      this.offsetTop = 0
      let imgs = this.imgs
      let selectedImage = imgs[this.selectedIndex]
      if (!selectedImage) return
      let selectedImageSrc = selectedImage.getAttribute('data-src')
      if (selectedImageSrc) {
        selectedImage.src = selectedImageSrc
        selectedImage.removeAttribute('data-src')
//        this.imageResize(selectedImage)
      }

      for (let i = 0; i < imgs.length; i++) {
        let img = imgs[i]
        if (img) {
          let offsetFactor = i - val
          if (offsetFactor === 0) {
            this.updateSelectedImage()
          } else {
            img.style.transform = `translateX(${285 * offsetFactor / Math.abs(offsetFactor) + 390 * offsetFactor}px) scale(0.4)`
          }
        }
      }
      let selectedPreviewLeftPosition = this.selectedIndex * 150 - this.previewScroll
      let maxLeftPosition = this.maxPreview * 150 - 150
      if (selectedPreviewLeftPosition < 0) {
        this.previewRoll(selectedPreviewLeftPosition / 150)
      } else if (selectedPreviewLeftPosition > maxLeftPosition) {
        this.previewRoll((selectedPreviewLeftPosition - maxLeftPosition) / 150)
      }
    },
//    move(moving) {
//      this.imageMoving = !!moving
//      if (moving) {
//        this.movingData.imageDom = this.imgs[this.selectedIndex]
//        this.movingData.imageDom.style.transition = 'none'
//        this.movingData.imageDom.addEventListener('mousedown', this.move_mousedown)
//      } else {
//        this.movingData.imageDom.removeEventListener('mousedown', this.move_mousedown)
//        this.movingData.imageDom.style.cssText = this.movingData.imageDom.style.cssText.replace(/transition:\s*none;?/, '')
//      }
//    },
    scaleUp() {
      if (this.imageMoving) return
//      this.originVal = 'center'
      this.originJustify()
      this.scaleVal += 0.4
      this.updateSelectedImage()
    },
    scaleDown() {
      if (this.imageMoving) return
//      this.originVal = 'center'
      this.originJustify()
      this.scaleVal -= 0.4
      if (this.scaleVal < 0) this.scaleVal = 0
      this.updateSelectedImage()
    },
    rotate() {
      if (this.imageMoving) return
//      this.originVal = 'center'
      this.originJustify()
      this.rotateVal += 90
      this.updateSelectedImage()
    },
    download() {
      if (this.imageMoving) return
      let selectedImg = this.imgs[this.selectedIndex]
      if (!selectedImg) return
      let link = document.createElement('a')
      link.href = selectedImg.src
      link.download = (() => {
        let name = ''
        selectedImg.src.replace(/(\/|\\).+?$/, (match) => {
          name = match
        })
        return name || 'image_' + parseInt(Math.random() * 1000000000)
      })()
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    updateSelectedImage() {
      this.imgs[this.selectedIndex].style.transform = 'translate(' + this.offsetLeft + 'px,' + this.offsetTop + 'px) scale(' + this.scaleVal + ') rotate(' + this.rotateVal + 'deg)'
    },
    changeFocus(stepVal) {
      if (this.imageMoving) return
      let val = stepVal + this.selectedIndex
      if (val >= 0 && val < this.imgs.length) {
        this.selectedIndex = val
      }
    },
    previewRoll(stepVal) {
      if (this.imageMoving) return
      let maxScroll = 150 * (this.imgs.length - this.maxPreview)
      if (stepVal < 0 && this.previewScroll <= 0 || stepVal > 0 && this.previewScroll >= maxScroll) {
        return
      }
      let wrapper = this.$refs.shortcutsWrapper
      this.previewScroll += stepVal * 150
      if (this.previewScroll > maxScroll) this.previewScroll = maxScroll
      if (this.previewScroll < 0) this.previewScroll = 0

      if (this.scrollTimer) {
        window.clearInterval(this.scrollTimer)
      }
      let speedVal = this.previewScroll - wrapper.scrollLeft
      let a = 3
      let speedSign = speedVal ? speedVal / Math.abs(speedVal) : 1
      speedVal = Math.sqrt(Math.abs(speedVal * 2 / a)) * a + 2
      this.scrollTimer = window.setInterval(() => {
        let val = wrapper.scrollLeft + speedVal * speedSign
        speedVal -= a
        if (speedSign > 0 && val > this.previewScroll || speedSign < 0 && val < this.previewScroll) {
          val = this.previewScroll
          window.clearInterval(this.scrollTimer)
        }
        wrapper.scrollLeft = val
      }, 15)
    },
    panelResize() {
      let outerBox = this.$refs.outerBox
      let panel = this.$refs.panel
      panel.style.transform = `scale(${(() => {
        let scaleX = outerBox.offsetWidth / panel.offsetWidth
        let scaleY = outerBox.offsetHeight / panel.offsetHeight
        return scaleX > scaleY ? scaleY : scaleX
      })()})`
    },
    imageResize(img) {
      let imageBox = this.$refs.imageBox
      let boxRate = imageBox.offsetWidth / imageBox.offsetHeight
      let cssText = img.style.cssText.replace(/(?:width:\s*.+?;)|(?:height:\s*.+?;)/g, '')
      if (img.offsetWidth / img.offsetHeight > boxRate) {
        img.style.cssText = cssText + 'width: 100%'
      } else {
        img.style.cssText = cssText + 'height: 100%'
      }
    },
    originJustify(x, y) {
      let selected = this.imgs[this.selectedIndex]
      let width = selected.offsetWidth
      let height = selected.offsetHeight
      if (x === undefined || x === 'center') {
        x = width / 2
      }
      if (y === undefined || y === 'center') {
        y = height / 2
      }
      let preX = width / 2
      let preY = height / 2
      this.originVal.replace(/^\s*(-?\d+)px\s+(-?\d+)px\s*$/, (match, x, y) => {
        preX = ~~x
        preY = ~~y
      })
      this.originVal = `${x}px ${y}px`
      let dx = (x - preX) * (this.scaleVal - 1)
      let dy = (y - preY) * (this.scaleVal - 1)
      this.offsetLeft += dx
      this.offsetTop += dy
    },
    wheelScale(e) {
      e = event
      if (!this.imageMoving && e.ctrlKey && e.srcElement === this.imgs[this.selectedIndex]) {
        let ox = e.offsetX
        let oy = e.offsetY
        let selected = this.imgs[this.selectedIndex]
        selected.style.transition = 'none'
        this.originJustify(ox, oy)
        if (e.wheelDelta > 0) {
          this.scaleVal += 0.3
          this.updateSelectedImage()
        } else if (e.wheelDelta < 0) {
          this.scaleVal -= 0.3
          this.updateSelectedImage()
        }
        if (this.resetTransitionTimer) {
          window.clearTimeout(this.resetTransitionTimer)
        }
        this.resetTransitionTimer = window.setTimeout(() => {
          selected.style.cssText = selected.style.cssText.replace('transition: none;', '')
          this.resetTransitionTimer = null
        }, 300)
      }
    },
  },
  mounted() {
    this.panelResize()
    window.addEventListener('resize', this.panelResize)
    let imageBox = this.$refs.imageBox
    let images = this.imgs = imageBox.children
    let boxRate = imageBox.offsetWidth / imageBox.offsetHeight
    for (let i = 0; i < images.length; i++) {
      let img = images[i]
      if (img.offsetWidth / img.offsetHeight > boxRate) {
        img.style.width = '100%'
      } else {
        img.style.height = '100%'
      }
      ((img) => {
        img.onload = () => {
          this.imageResize(img)
        }
      })(img)
    }
    this.selectedIndex = 0

    imageBox.addEventListener('mousewheel', (e) => {
      if (this.imageMoving || e.ctrlKey) return
      let val = e.wheelDelta < 0 ? this.selectedIndex + 1 : this.selectedIndex - 1
      if (val < 0) val = 0
      if (val >= this.imgs.length) val = this.imgs.length - 1
      this.selectedIndex = val
    })

    let shortcutsWrapper = this.$refs.shortcutsWrapper
    shortcutsWrapper.addEventListener('mousewheel', (e) => {
      if (e.wheelDelta < 0) {
        this.previewRoll(1)
      } else {
        this.previewRoll(-1)
      }
    })

    this.componentActive = true
  },
  activated() {
    if (!this.componentActive) {
      window.addEventListener('resize', this.panelResize)
    }
    this.componentActive = true
  },
  deactivated() {
    window.removeEventListener('resize', this.panelResize)
    this.componentActive = false
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.panelResize)
  },
}
</script>
<style lang="less" scoped>
  .imagePlayerOuterBox{
    background-color: rgba(0,0,0,0.6);
    position: absolute;
    z-index: 9999999999999;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
    & *{
      -webkit-user-select: none;
    }
    .imagePlayerPanel{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 1280px;
      height: 750px;
      .images{
        position: absolute;
        top: 40px;
        width: 950px;
        height: 500px;
        left:0;
        right: 0;
        margin: auto;
        img{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          transition: 0.3s ease;
          transition-property: transform, visibility;
        }
      }
      .preview{
        width: 740px;
        height: 85px;
        position: absolute;
        left: 0;
        right: 0;
        top: 555px;
        margin: auto;
        overflow: hidden;
        z-index: 10;
        .shortcutsWrapper{
          white-space: nowrap;
          font-size: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          .shortcutsBox{
            height: 100%;
            img{
              width: 140px;
              height: 100%;
              margin-right: 10px;
              &.selected{
                border: 2px solid #068DEB;
              }
            }
          }
        }
        .previewOperation{
          width: 0;
          height: 0;
          & > span{
            position: absolute;
            width: 16px;
            height: 16px;
            top: 0;
            bottom: 0;
            margin: auto;
            cursor: pointer;
          }
          .backwardRoll{
            left: 0;
          }
          .forwardRoll{
            right: 0;
          }
        }
      }
      .operation{
        width: 320px;
        height: 59px;
        position: absolute;
        left: 0;
        right: 0;
        top: 660px;
        margin: auto;
        background-color: rgba(38, 53, 76, 0.8);
        font-size: 0;
        white-space: nowrap;
        border-radius: 29.5px;
        text-align: center;
        overflow: hidden;
        padding: 0 15px;
        z-index: 10;
        .item{
          display: inline-block;
          height: 100%;
          width: 20%;
          cursor: pointer;
          &:hover{
            background-color: rgba(0,0,0,0.2);
          }
          & > *{
            display: block;
            margin: auto;
          }
          .icon{
            margin-top: 9px;
            width: 20px;
            height: 20px;
          }
          .desc{
            margin-top: 5px;
            font-size: 13px;
            color: white;
          }
        }
      }
      .backwardIcon{
        position: absolute;
        height: 85px;
        width: 85px;
        left: 60px;
        top: 248px;
        z-index: 9;
        cursor: pointer;
        .icon{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .forwardIcon{
        position: absolute;
        height: 85px;
        width: 85px;
        right: 60px;
        top: 248px;
        z-index: 9;
        cursor: pointer;
        .icon{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .closeBtn{
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        background-color: #B2B2B2;
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
        &:before{
          content: "";
          position: absolute;
          width: 19px;
          height: 1px;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          transform: rotate(45deg);
          background-color: white;
        }
        &:after{
          content: "";
          position: absolute;
          width: 19px;
          height: 1px;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          transform: rotate(-45deg);
          background-color: white;
        }
        &:hover:before{
          background-color: rgb(100,0,0);
        }
        &:hover:after{
          background-color: rgb(100,0,0);
        }
      }
      &.imageMoving, &.imageMoving *{
        cursor: move;
      }
      &.imageMoving .operation .moveOperation{
        background-color: rgba(0,0,0,0.2);
      }
    }
  }
</style>
