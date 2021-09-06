<template>
  <div class="importingPicturesModel"
       v-if="openModel">
    <Modal v-model="delModel"
           width='577'
           :transition-names='[]'
           :transfer='false'
           :closable="false"
           :mask-closable="false">
      <div slot="header">
        <p name='adm-alertHeader'
           class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16">{{ headerText }}</span>
        </p>
      </div>
      <div class="importingPicturesModel-body">
        <div class="importingPicturesModel-btn">
          <Button type="ghost"
                  class="cancelDelBtn fl marginR20"
                  @click="clicl()">本地导入</Button>
          <Button type="ghost"
                  class="cancelDelBtn fl">读取图片</Button>
        </div>
        <div class="importingPicturesModel-img">
          <div class="fl importingPicturesModel-img-item"
               v-for="(item, index) of imgArr">
            <img :src="item.path"
                 style="max-width:100%;height:auto; "
                 :alt="item.name" />
            <div class="importingPicturesModel-img-item-icon"
                 @click="delImg(index)">
              <icon class="icon_close"
                    name="modal_close_default"></icon>
            </div>
          </div>
        </div>
        <div class="importingPicturesModel-up">
          <div class="fl importingPicturesModel-up-word">
            选择文件
          </div>
          <div class="fl importingPicturesModel-up-div">
            <div class="fl importingPicturesModel-up-div-span">
              <span>{{imgArr.length>0 ? imgArr.length+'张图片':''}}</span>
            </div>
            <div class="fl importingPicturesModel-up-div-browse">
              <div class="importingPicturesModel-up-div-browse-click"
                   @click="clicl()">
                <i></i>浏览</div>
            </div>
            <input style="opacity:0"
                   type="file"
                   id="file_input"
                   name="file"
                   :multiple="true"
                   :accept="acceptFileTypes"
                   @change="fileChange()">

          </div>

        </div>
      </div>
      <div slot="footer">
        <div class="adm-modelFooter">
          <Button type="ghost"
                  class="cancelDelBtn fr marginR20"
                  @click="abolish">取 消</Button>

          <ZButtonHasBg class=" marginR20 fr"
                        @click="affirm">保 存</ZButtonHasBg>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import ZButtonHasBg from '@/components/button/ZButtonHasBg'

export default {
  name: 'affmodel',
  data() {
    return {
      delModel: true,
      openModel: false,
      imgArr: [],
    }
  },
  props: {
    headerText: {
      // title
      type: String,
      default: '影像导入',
    },
  },
  computed: {
  },
  components: {
    ZButtonHasBg,
  },
  methods: {
    // 打开莫泰框
    clicl() {
      let a = this.$el.querySelectorAll('#file_input')[0]
      let event = document.createEvent('MouseEvents')
      event.initMouseEvent(
        'click',
        true,
        true,
        document.defaultView,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null,
      )
      a.dispatchEvent(event)
    },
    openM() {
      this.openModel = true
    },
    // 关闭莫泰框
    closeM() {
      this.openModel = false
      this.imgArr = []
    },
    // 确认 函数
    affirm() {
      //
      console.log(this.imgArr, '保存图片')
      this.$emit('saveImg', this.imgArr)
    },
    abolish() {
      this.closeM()
    },
    // 删除图片
    delImg(index) {
      this.imgArr.splice(index, 1)
      console.log('删除图片')
    },
    fileChange(e) {
      let a = this.$el.querySelectorAll('#file_input')[0]
      console.log(this.input, 'tttt')
      // if (a.files.length > 0 && a.files.length < 10) {
      for (let key in a.files) {
        this.$set(this.imgArr, key, a.files[key])
      }
      // } else if (a.files.length > 9) {
      //   alert('图片最对只能9张')
      // }
    },
  },
  created() {
    //
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.importingPicturesModel {
  .ivu-modal-content {
    overflow: hidden;
  }
  .importingPicturesModel-body {
    padding: 0 20px;
    .importingPicturesModel-btn {
      height: 30px;
      width: 100%;
      margin-top: 10px;
    }
    .importingPicturesModel-up {
      height: 32px;
      width: 100%;
      margin-top: 10px;
      margin-bottom: 18px;
      .importingPicturesModel-up-word {
        height: 30px;
        line-height: 30px;
        color: #4a4a4a;
        letter-spacing: 0;
      }
      .importingPicturesModel-up-div {
        width: 481px;
        height: 30px;
        background: #ffffff;
        border: 1px solid #cccccc;
        border-radius: 4px;
        margin-left: 8px;
        .importingPicturesModel-up-div-span {
          width: 399px;
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
        }
        .importingPicturesModel-up-div-browse {
          width: 78px;
          height: 30px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          #file_input {
            cursor: pointer;
            width: 80px;
            height: 40px;
            top: 3px;
            left: 8px;
          }
          .importingPicturesModel-up-div-browse-click {
            height: 30px;
            line-height: 30px;
            margin-left: 8px;
            cursor: pointer;
            color: #008cee;
          }
          i {
            display: inline-block; 
            margin-right:8px;
            width: 11px; 
            height: 11px; 
            background:url(/static/icons/public/mfile.svg);
          }
        }
      }
    }
    .importingPicturesModel-img {
      height: 300px;
      width: 100%;
      margin-top: 10px;
      border: 1px solid #cccccc;
      border-radius: 4px;
      padding: 0 10px 10px px;
      // justify-content:space-between;
      //align-items:baseline ;
      overflow: auto;
      .importingPicturesModel-img-item {
        overflow: hidden;
        position: relative;
        width: 165px;
        height: 85px;
        border-radius: 4px;
        margin-top: 10px;
        margin-left: 10px;
        .importingPicturesModel-img-item-icon {
          cursor: pointer;
          position: absolute;
          width: 16px;
          height: 16px;
          background: #b3b3b3;
          border-radius: 16px;
          line-height: 13px;
          text-align: center;
          top: 5px;
          right: 5px;
          > svg {
            width: 8px;
            height: 8px;
            color: @tableTr;
          }
        }
        .importingPicturesModel-img-item-icon:hover {
          cursor: pointer;
          position: absolute;
          background: @tsIconHover;
        }
      }
    }
  }
  .adm-alertHeader {
    background-color: @gradeBlueFive;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    font-weight: normal;
    .adm-alertHeaderText::before {
      content: '';
      width: 3px;
      height: 17px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      background-color: @gradeBlueOne;
    }
  }
  .adm-main {
    text-align: center;
    font-size: 16px;
    color: #4a4a4a;
    letter-spacing: 0;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .adm-modelFooter {
    height: 50px;
    Button {
      width: 74px;
      height: 30px;
    }
  }
}
</style>
