/**
* Created yhy
* Date: 2017/12/22
* Time: 19:08
* content:搜索框
* 参数props：  searchWidth：输入框宽度 ,searText：输入框提示文字
* 方法funtion : @on-enter 点击回车时触发  @on-Icon点击图标时触发  @on-cancel点击取消时触发  参数都为此时input输入框的值
*/
<template>
  <div class="search-input">
    <template v-if="isShow">
       <div :style="{width:mOutSearchWidth+'px',height:searchHeight+'px'}" class="input-wrapper">
          <Input :placeholder="searText" @on-focus='outOnfocus' />
        <div class="icon-wrapper">
          <icon name='searchIcon' class="icon"></icon>  
        </div>
     </div>
    </template>
    <template v-else>
     <div :style="{width:mInnerSearchWidth+'px',height:searchHeight+'px'}" class="input-wrapper inner-wrapper">
        <Input v-model="valueSearch"   @on-enter='onEnter'/>
        <div class="icon-wrapper" @click='buttonIcon'>
          <icon name='searchIcon' class="icon"></icon>  
        </div>
     </div>
     <div class="cancel-wrapper"  @click='cancel'>
       <span class="cancel">取消</span>
     </div>
     </template>  
  </div>
</template>

<script>
export default {
  name: 'search-input',
  data () {
    return {
      mOutSearchWidth: this.searchWidth,
      mInnerSearchWidth: this.searchWidth - 30,
      valueSearch: '',
      isShow: true,
      isIcon: true,
    }
  },
  props: {
    searchWidth: {
      type: Number,
      default: 220,
    },
    searchHeight: {
      type: Number,
      default: 30,
    },
    searText: {
      type: String,
      default: '请输入搜索内容',
    },

  },
  methods: {
    outOnfocus() {
      this.isShow = false
    },
    onEnter() {
      this.$emit('on-enter', this.valueSearch)
    },
    buttonIcon() {
      this.$emit('on-Icon', this.valueSearch)
    },
    cancel() {
      let alldata = this.valueSearch
      this.valueSearch = ''
      this.isShow = true
      this.$emit('on-cancel', this.valueSearch, alldata)
    },

  },
  watch: {
    valueSearch(val) {
      if (val === '') {
        this.$emit('on-cancel', this.valueSearch)
      }
    },
    searchWidth (data) {
      this.mOutSearchWidth = data
    },
  },
}
</script>
<style lang="less">
 .inner-wrapper{
   .ivu-input {
    padding-right: 36px;
  }
 }
</style>

<style lang="less" scoped>
  .search-input{
    margin-right: 20px;
    display: inline-block;
    .input-wrapper{
      display: inline-block;
      position: relative;
      .icon-wrapper{
        
        border-radius: 4px;
        text-align: center;
        position: absolute;
        top:2px;
        right: 3px;
        display: inline-block;
        width: 25px;
        height:26px;
        background: #008CEE;
        .icon{
          cursor: pointer;
          margin-top: 6px;
        }
      }
    }
    .cancel-wrapper{
      cursor: pointer;
      width: 25px;
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
      height: 30px;
      color: #008CEE;
      margin-left:5px; 
      .cancel{
        line-height: 30px;
      }
    }
    &:hover{
      .icon-wrapper{
        background: #49B4FF ;
      } 
    }
  }
</style>

