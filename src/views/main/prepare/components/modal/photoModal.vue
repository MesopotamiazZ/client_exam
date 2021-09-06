/**
* author      : yhy
* cteate      : 2018/01/22 09:22
* description : 拍照弹窗
*/
<template>
     <!-- excel -->
    <div v-if='photoModal'>
      <Modal v-model="photoModal"  class="photo-modal"
            :width='640'
            :transfer='false'
            :mask-closable="false"
            :transition-names="['']"
            :closable="false">
        <div slot="header">
        </div>
        <div class="content">    
          <camera 
            :width='640' 
            :height='480'
            @take-photo='takePhoto'
            @close-camera='closeCamera'>
          </camera>
        </div>
        <div slot="footer">
      
        </div>
      </Modal>
    </div>
</template>

<script>
import camera from '@/components/camera/index.vue'
export default {
  name: 'photoModal',
  components: {
    camera,
  },
  props: {
    photoModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 点击拍照后回调
    takePhoto(url) {
      this.$emit('take-photo', url)
    },
    closeCamera() {
      this.$emit('close-photo')
    },
  },
}
</script>
<style lang="less">

 .photo-modal  .ivu-modal-body{
     line-height: 0.5;
 }
</style>


<style lang="less" scoped>
.photo-modal{
}
</style>


