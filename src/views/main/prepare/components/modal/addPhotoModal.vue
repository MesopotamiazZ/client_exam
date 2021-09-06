/**
* author      : yhy
* cteate      : 2018/01/23 14:19
* description : 添加头像
*/
<template>
     <!-- 升级vip -->
    <Modal v-model="addPhotoModal"  class="add-photo-modal"
           :width='640'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <alert-header 
          :showInput='false'
          :headerText="'添加头像'">
        </alert-header>
      </div>
      <div class="content">
       <Custom-Cropper @add-photo-modal-cancel='addPhotoModalCancel' @take-photo='takePhoto'  @save-photo='savePhoto'></Custom-Cropper>
      </div>
      <div slot="footer">
        <!-- <div class="bottom">
          <div class="bottom-right">
            <Button type="primary" class="button" @click="addPhotoModalSure">保 存</Button>
            <Button type="ghost" class="button" @click="addPhotoModalCancel">取 消</Button>
          </div>
        </div> -->
      </div>
    </Modal>
</template>

<script>
 import CustomCropper from '@/components/camera/CustomCropper'
export default {
   name: 'addPhotoModal',
   components: {
     CustomCropper,
   },
   props: {
     addPhotoModal: {
       type: Boolean,
       default: false,
     },
   },
   methods: {
     savePhoto(clipUrlData) {
       this.$emit('save-photo', clipUrlData)
     },
    // 取消
     addPhotoModalCancel() {
       this.$emit('update:addPhotoModal', false)
     },
     takePhoto() {
       this.$emit('take-photo')
     },
   },

}
</script>

<style lang="less" scoped>
.add-photo-modal{
}
</style>


