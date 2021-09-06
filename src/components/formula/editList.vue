<template>
  <div class="formula-edit-list">
    <div class="list">
      <ul>
        <li v-for="(item,index) in copyData">
          <div ref="item" :tabindex = "editAbleIndex===index?-1:''" :class="{cell:true,focus:editAbleIndex===index}" @click.stop="enterEditMode($event,index)" @keydown="keydown($event,item,index)">
            <span :class="{selected:inputStr===''}">{{item.value}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="btnGroup">
      <z-button ZBtype="success" :disabled="editAbleIndex===-1" @click.native.stop="deleteOneRow">删 除</z-button>
      <z-button ZBtype="ghost" class="fr" @click.native.stop="insertNullRow">插 入</z-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'edit-list',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      editAbleIndex: -1,
      curIndex: -1,
      inputStr: '',
      copyData: JSON.parse(JSON.stringify(this.data)),
      timer: null,
      stop: false,
    }
  },
  watch: {
    data(cur) {
      this.copyData = JSON.parse(JSON.stringify(cur))
    },
    copyData: {
      handler: function(value) {
        this.$emit('onChange', value)
      },
      deep: true,
    },
  },
  methods: {
    enterEditMode(event, index) {
      // 使索引为index的li进入可编辑模式
      this.editAbleIndex = index
      this.inputStr = ''
      document.addEventListener('click', this.exitEditMode)
      this.$nextTick(() => {
        this.$refs.item[index].focus()
      })
    },
    exitEditMode() {
      this.editAbleIndex = -1
      document.removeEventListener('click', this.exitEditMode)
    },
    itemBlur(item, index) {
      this.inputStr = ''
      if (!this.stop) {
        this.curIndex = -1
      }
    },
    itemFocus(item, index) {
      this.curIndex = index
    },
    keydown(ev, item, index) {
      // 左侧数字0-9对应48-57 右侧数字0-9对应96-105，
      // 右侧小数点110，中间小数点190，
      // 退格键8， enter键13
      let kc = ev.keyCode
      let char = ''
      if (kc >= 48 && kc <= 57) {
        char = kc - 48
      } else if (kc >= 96 && kc <= 105) {
        char = kc - 96
      } else if (kc === 110 || kc === 190) {
        char = '.'
      } else {
        char = ''
      }
      this.inputStr += char
      item.type = 'number'
      item.value = this.inputStr
    },
    btnMouseup() {
      this.stop = false
    },
    btnMousedown(event) {
      this.stop = true
      let _this = this
      function mouseleave(event) {
        // 清空选中项索引
        _this.stop = false
        _this.curIndex = -1
        event.target.removeEventListener('mouseleave', mouseleave)
      }
      event.target.addEventListener('mouseleave', mouseleave)
    },
    insertNullRow() {
      if (this.editAbleIndex === -1) {
        this.copyData.push({
          value: '',
        })
      } else {
        this.copyData.splice(this.editAbleIndex, 0, {
          value: '',
        })
      }
      this.exitEditMode()
    },
    insertOneRow(data) {
      if (this.editAbleIndex === -1) {
        this.copyData.push(data)
      } else {
        this.copyData.splice(this.editAbleIndex, 1, data)
      }
      this.exitEditMode()
    },
    deleteOneRow() {
      if (this.editAbleIndex !== -1) {
        this.copyData.splice(this.editAbleIndex, 1)
      }
      this.exitEditMode()
    },
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .formula-edit-list{
    width: 200px;
    .list{
      height: 200px;
      overflow: auto;
    }
    ul{
      border-top: 1px solid @gradeAshFive;
    }
    li{
      height: 40px;
    }
    .cell{
      outline: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span{
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      }
    }
    // .cell:focus{
    //   outline-color: @gradeBlueOne;
    //   span.selected{
    //     background: @gradeBlueOne;
    //   }
    // }
    .focus{
      border:2px solid @gradeBlueOne;
      border-radius: 2px;
    }
    ul > li:nth-child(odd){
      background: @tableTr;
    }
    ul > li:nth-child(even){
      background: #ffffff;
    }
    ul > li:nth-last-child(1){
      border-bottom: 1px solid @gradeAshFive;
    }
    ul > li:hover{
      background: @iviTableHover
    }
    .btnGroup{
      padding: 10px 20px;
    }
  }
</style>