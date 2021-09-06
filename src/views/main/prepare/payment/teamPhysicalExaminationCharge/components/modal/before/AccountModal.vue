/**
* author      : yhy jyl
* cteate      : 2018/02/23 
* description : 结算费用清单
*/
<template>
    <Modal v-model="AccountModal"  class="account-modal"
           :width='578'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <alert-header 
          :showInput='false'
          :headerText="'结算费用清单'">
        </alert-header>
      </div>
      <div class="content">
        <div>
            <div class="leftName">单位体检号</div>
            <Input v-model="unitName" class="rightInput"  style="width: 122px" disabled/>
             <div class="rightName">单位名称</div>
            <Input v-model="unitName" class="rightInput"  style="width: 259px" disabled/>
        </div>
        <div>
            <div class="leftName">已收金额</div>
            <Input v-model="unitName" class="rightInput value-price " style="width: 122px" disabled/>
            <div class="rightName">优惠金额</div>
            <Input v-model="unitName" class="rightInput value-price " style="width: 122px" disabled/>
        </div>
        <div class="complete-list contentBg" v-if="isComplete">
            <div class="complete-header">
                <alert-header-com :titleName="'已结算体检费用列表'" @closeModal='closeComplete'></alert-header-com>
            </div>
            <div class="complete-table">
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>5</li>
                <li>5</li>
                <li>5</li>
                <li>5</li>
                <li>10</li>
              </ul>
            </div>
        </div>
        <div class="compound-project contentBg" v-if="isCompound">
           <div class="compound-header">
              <alert-header-com :titleName="'组合项目'"  @closeModal='closeCompound'></alert-header-com>
           </div>
           <div class="compound-table"></div>
        </div>
        <div class="unnit-charge contentBg" v-if="isUnnit">
           <div class="unnit-header">
              <alert-header-com :titleName="'单位附加费用'"  @closeModal='closeUnnit'></alert-header-com>
           </div>
           <div class="unnit-table"></div>
        </div>
        <div class="person-charge contentBg" v-if="isPerson">
           <div class="person-header">
              <alert-header-com :titleName="'个人附加费用'"  @closeModal='closePerson'></alert-header-com>
           </div>
           <div class="person-table"></div>
        </div>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Button type="primary" class="button" @click="printSure">打印</Button>
            <Button type="ghost" class="button" @click="cancel">取 消</Button>
          </div>
        </div>
      </div>
    </Modal>
</template>

<script>
import AlertHeaderCom from '@/views/main/prepare/components/AlertHeaderCom.vue'
export default {
  name: 'AccountModal',
  components: {
    AlertHeaderCom,
  },
  data () {
    return {
      unitName: 'BA201709',
      isComplete: true,
      isCompound: true,
      isUnnit: true,
      isPerson: true,
    }
  },
  props: {
    AccountModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    printSure() {
      this.$emit('AccountModal')
    },
    cancel() {
      this.$emit('update:AccountModal', false)
    },
    closeComplete() {
      this.isComplete = false
    },

    closeCompound() {
      this.isCompound = false
    },

    closeUnnit() {
      this.isUnnit = false
    },

    closePerson() {
      this.isPerson = false
    },
    resetClose() {
      this.isComplete = true
      this.isCompound = true
      this.isPerson = true
      this.isUnnit = true
    },
  },
}
</script>

<style lang="less">
 .account-modal{
    .ivu-modal {
      height: calc(~'100% - 40px');
      .ivu-modal-content {
        height: 100%;
        .ivu-modal-body {
          height: calc(~'100% - 120px');
          .content { // 弹窗中间内容部分
            overflow: auto;
            height: 100%;
          }
        }
      }
    }
 }
</style>

<style lang="less" scoped>

li{
  height: 50px;
  background:blue;
}
  .account-modal{

       .content{
        .leftName{
         
            vertical-align: top;
            line-height: 30px;
            height: 30px;
            overflow: hidden;
            margin: 20px 10px 0 20px;
            display: inline-block;
            text-align: justify;
            width: 60px;
            &::after{
              content:'';
              padding-left:100%;
              display: inline-block;
            }
        }
        .rightName{
            vertical-align: top;
            line-height: 30px;
            height: 30px;
            overflow: hidden;
            margin: 20px 10px 0 20px;
            display: inline-block;
            text-align: justify;
            width: 48px;
            &::after{
              content:'';
              padding-left:100%;
              display: inline-block;
            }
        }
        .rightInput{
            display: inline-block;
            vertical-align: top;
            margin-top: 20px;
        }
        .value-price{
          position: relative;
          &::after{
            position: absolute;
            content:'元';
            display: inline-block;
            top:7px;
            right:10px;
            font-size: 12px;
            color: #737373;
          }
       } 
       .complete-list{
        margin-top: 20px;
        overflow: hidden;
        margin-left: 20px;
        margin-right: 20px;
        .complete-table{
           overflow: auto;
           max-height: 160px;
        }         
       } 
       .compound-project{
          margin-top: 20px;
          overflow: hidden;
          margin-left: 20px;
          margin-right: 20px;
        .compound-table{
          overflow: auto;
           max-height: 200px;
        }         
       }  
       .unnit-charge{
        margin-top: 20px;
        overflow: hidden;
        margin-left: 20px;
        margin-right: 20px;
        .unnit-table{
          overflow: auto;
           max-height: 120px;
        }         
       }  
       .person-charge{
        margin-top: 20px;
        overflow: hidden;
        margin-left: 20px;
        margin-right: 20px;
        .person-table{
          overflow: auto;
           max-height: 160px;
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
