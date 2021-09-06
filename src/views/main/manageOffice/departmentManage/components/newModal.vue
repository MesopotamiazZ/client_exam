<template>
        <div class="rabatmodel" >
            <Modal v-model="addModel"  
            :transfer='false'
            :mask-closable="false" 
            :transition-names="['']"
            :closable="false"
            :width='312' 
            >
            <div slot="header"  >
                  <p v-if="headerText" name='alertHeader' class="alertHeader font14">
                     <span class="alertHeaderText font14">{{ headerText }}</span>
                  </p>
            </div>
            <div>
                <div class="center">
            <div class="centerForm">
              <div class="flex">
                <span class="label">部门名称</span>
                <div class="f1">
                  <Input v-model="selected"></Input>
                </div>
              </div>
              <div class="flex marginT15">
                <span class="label">上级部门</span>
                <div class="f1">
                    <Select v-model="pareatP">
                        <!-- <Option ></Option> -->
                    </Select>
                </div>
              </div>
            </div>
            </div>
            </div>
            <div slot="footer" class="footerClass alertFooterBtn" style="height:70px;padding:20px 10px 20px 20px;background:white； border-radius: " >
                <div style="bakcground:white;">
           
                <Button type="ghost" class=" marginR10 fr" @click="abolish">取 消</Button>

                <Button type="primary"  class=" marginR20 fr" @click="affirm" >保 存</Button>

                </div>
            </div>
            </Modal>
        </div>
</template>
<script>
export default {
  name: 'newModal',
  data () {
    return {
      inputShow: false, // 左侧分类添加点击
      addModel: false, // *
      options: [],
      selected: '',
      pareatP: '无',
      isShowOffice: true,
      isShowName: true,
      select: '',
      industriainput: '',
      thisAlldata: {},
      docInput: '',
    }
  },
  watch: {
  },
  props: {
    headerText: {
      type: String,
      default: '',
    },
  },
  methods: {
    openM(data) {
      this.addModel = true
    },
     // 关闭莫泰框
    closeM() {
      this.addModel = false
    },
    // 确认 函数
    affirm() {
      let that = this
      this.changge()
      this.onBurlDoc()
      if (this.select && this.docInput) {
        that.$emit('resf')
        that.closeM()
      }// 回调函数以后
    },
    changge() {
      if (this.select) {
        this.isShowOffice = true
      } else {
        this.isShowOffice = false
      }
    },
    onBurlDoc() {
      if (this.docInput) {
        this.isShowName = true
      } else {
        this.isShowName = false
      }
    },
    abolish() {
      this.closeM()
    },

  },
}

</script>
<style >
  
</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.alertHeader {
  background-color: #F2F5FA;
  // padding: 16px 20px;
  // padding: 6px 0;
  line-height: 28px;
  height: 28px;
  // border-top-left-radius: 8px;
  // border-top-right-radius: 8px;
  color: @gradeAshOne;
  letter-spacing: 0.04px;
  font-weight: 500;
  .alertHeaderText::before {
    content: '';
    width: 3px;
    height: 17px;
    margin-right: 8px;
    display: inline-block;
    vertical-align: middle;
    background-color: #6DAAFF;
  }
}
.footerClass{
    border-bottom-left-radius: @borderRadiuBig;
  border-bottom-right-radius: @borderRadiuBig;
}
.ifromClass{
  padding: 0 20px;
}


.rabatmodel .disableIput{
    float:left;height:30px;line-height:30px;
    width: 274px;
    color:#4A4A4A 100%;
    position: relative;
}


.BlageIput{
    float:left;height:30px;line-height:30px;
    width: 430px;
    color:#4A4A4A 100%;
    height: 80px;
}



// .disableIput .requiredMustFill1{
//    color: #FF7C7C;
//    position: absolute;
//    right: 15px;
//    font-size:12px;
//    top:3px;
// }
.rabatmodel{
    .center{
        width: 100%;
        height:100%;
        
        .centerForm{
            padding-right: 20px;
            padding-left: 20px;
            padding-top: 20px;
            .label {
          margin-right: 10px;
        }
        .f1 {
          flex: 1;
        }
        }
      }
}
</style>