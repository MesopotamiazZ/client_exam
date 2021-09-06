
<template>
  <div class="custom-select-input">
    <Input :disabled="disabled" ref="input" v-model="curValue" placeholder="" @on-focus="showOptions=true" @on-change="changeByInput" @on-blur="blur"></Input>
    <ul v-if="showOptions&&cloneData.length>0" class="custom-select-input-ul">
      <li class="custom-select-input-li" v-for="(item,index) in cloneData" @click="selectOne(item)" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'select-input',
    props: {
      value: {
        type: [Number, String],
        default: '',
      },
      data: {
        type: Array,
        default: () => {
          return []
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        curValue: this.value,
        curSelect: '',
        showOptions: false,
        cloneData: this.data,
        cloneData1: this.data,
      }
    },
    methods: {
      blur() {
        setTimeout(() => {
          this.showOptions = false
        }, 200)
      },
      selectOne(item) {
        this.curValue = item.name
        this.curSelect = item
        this.showOptions = false
        this.$emit('getSelect', this.curSelect)
      },
      changeByInput() {
        // 通过键盘输入时触发
        this.curSelect = ''
        this.$emit('getSelect', this.curSelect)
      },
      filter() {
        this.cloneData = this.cloneData1.filter(item => {
          if ((item.name + '').toLocaleLowerCase().includes(this.curValue.toLocaleLowerCase().trim())) {
            return true
          }
          return false
        })
      },
    },
    watch: {
      data(cur, old) {
        this.cloneData = cur.slice()
        this.cloneData1 = cur.slice()
      },
      value(cur) {
        this.curValue = cur
        console.log(123, cur)
      },
      curValue(cur) {
        this.$emit('input', cur)
        this.filter()
      },
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .custom-select-input {
    position: relative;

    .custom-select-input-ul {
      position: absolute;
      left: 0;
      right: 0;
      padding: 5px 0;
      margin-top: 5px;
      max-height: 200px;
      overflow: auto;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      position: absolute;
      z-index: 900;
    }

    .custom-select-input-li {
      padding: 0 10px;
      height: 36px;
      line-height: 36px;

      &:hover {
        background-color: @gradeBlueFour;
      }
    }
  }
</style>