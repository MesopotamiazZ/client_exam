/**
* author      : yhy
* cteate      : 2018/03/06 
* description : 点击一行出现数据
*/
<template>
  <div class="add-info-modal marginB20">
    <div v-for="(item,index) in addNewOccpArry"
         class="add-info-modal-wrapper">
      <div class="leftName">单位联系人</div>
      <Input v-model="addNewMessage[index].person"
             @on-change = "addPerson(index)"
             placeholder=""
             style="width: 137px"
             class="input"></Input>
      <div class="leftName marginL10">联系电话</div>
      <Input v-model="addNewMessage[index].telNumber"
              @click="addNumberRemark"
              placeholder=""
               style="width: 137px"
               class="input"
               :disabled="item.inspectionShow"></Input>
      <div class="leftName marginL10">备注</div>
      <Input v-model="addNewMessage[index].remark"
             @click="addNumberRemark"
             placeholder=""
             style="width: 137px"
             class="input"
             :disabled="item.inspectionShow"></Input>
      <span 
      class="icon-title"
      @click="changeState(index)">
        <icon name='addNewItemS'
              v-show="item.addNewItemSShwow"></icon>
        <icon name='addNewItemT'
              v-show="item.addNewItemTShwow"
              style="cursor:pointer"></icon>
        <icon name='deletItemT'
              v-show="item.deletItemTShwow"
              style="cursor:pointer"></icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addInfoModal',
  data() {
    return {
      addNewOccpArry: [
        {
          addNewItemSShwow: true,
          addNewItemTShwow: false,
          deletItemTShwow: false,
          inspectionShow: true,
        },
      ],
      addNewMessage: [
        {
          person: '',
          telNumber: '',
          remark: '',
        },
      ],
      list: [1, 2, 3],
      value: '123',
    }
  },
  methods: {
    addNumberRemark() {
      this.$emit('getData', this.addNewMessage)
      /* console.log(this.addNewMessage) */
    },
    addPerson(index) {
      this.addNewOccpArry[index] = {
        addNewItemSShwow: false,
        addNewItemTShwow: true,
        deletItemTShwow: false,
        inspectionShow: false,
      }
      this.addNumberRemark()
    },
    changeState(index) {
      if (this.addNewOccpArry[index].addNewItemTShwow) {
        this.addNewMessage.push({
          person: '',
          telNumber: '',
          remark: '',
        })
        this.addNewOccpArry.push(
          {
            addNewItemSShwow: true,
            addNewItemTShwow: false,
            deletItemTShwow: false,
            inspectionShow: true,
          }
        )
        this.addNewOccpArry[index] = {
          addNewItemSShwow: false,
          addNewItemTShwow: false,
          deletItemTShwow: true,
          inspectionShow: false,
        }
      } else if (this.addNewOccpArry[index].deletItemTShwow) {
        this.addNewMessage.splice(index, 1)
        this.addNewOccpArry.splice(index, 1)
      }
      this.addNumberRemark()
    },
  },
}
</script>

<style lang="less" scoped>
.add-info-modal {
  .add-info-modal-wrapper {
    position: relative;
    display: flex;
    .leftName {
      margin-top: 20px;
      // margin-left: 10px;
      line-height: 30px;
      height: 30px;
      display: inline-block;
      margin-right: 10px;
    }
    .input {
      margin-top: 20px;
    }
    /* .img {
      cursor: pointer;
      top: 29px;
      right: 25px;
      position: absolute;
      width: 15px;
      height: 15px;
      background: url(/static/icons/public/info_delete.svg) no-repeat;
    } */
    .icon-title {
      display: inline-block;
      height: 30px;
      margin-top: 20px;
      padding-top: 6px;
      margin-left: 12px;
    }
  }
}
</style>

