<template>
  <div class="search-table">
    <div class="search-table-con contentBg" :style="ifShowSearchtitle ? '': 'border-radius:0'">
      <div class="search-table-title" v-if="ifShowSearchtitle">
        <div :class="{show: !ifShowSearch}">
          <table-search-title>
            <span slot="titletHasSlotLeftTitle">{{ searchTableTitle }}</span>
            <div slot="titletHasSlotRightContent">
              <div style="margin-top: 3px;">
                <span @click='clickToShowSearch' class='tableTitleSearchIcon marginT5 curPointer'>
                  <icon class="curPointer" style='margin-right: 8px;' name='tableTitleSearchIcon'></icon>
                </span>
                <span class="curPointer" @click="skipTo()">
                  <icon class='tableTitleJump marginT5 curPointer' name='tableTitleJump'></icon>
                </span>
              </div>
            </div>
          </table-search-title>
        </div>
        <div class="table-title-search flex" :class='{show: ifShowSearch}'>
          <div class="flx1 marginL10">
            <z-input v-model="allSearch" placeholder="" autofocus  @input="searchInput"></z-input>
            <img class='clearIcon curPointer' @click='retrunSearch' src='/static/icons/public/gg.png' />
          </div>
          <span class="marginL10 marginR10 curPointer search-table-qx" @click='returnQX'>取消</span>
        </div>
      </div>
      <div class="search-table-header">
        <ul class="search-table-head-ul">
          <li class="fl search-table-head-li overflowEllipsis" v-for="(columns,index) in newColumns">{{ index===0?'序号':columns.title }}</li>
        </ul>
      </div>
      <!-- <div class="search-table-body-out"> -->
      <div class="search-table-body" ref='searchTableH'>
        <ul
          class="fl search-table-body-ul"
          ref='searchTableValH'
          :class="{activeTop: activePosition === 1, activeBottom: activePosition === 2}"
          @scroll="listScroll($event)">
          
          <template v-for="(items, index) in newDataList"   v-if="!ifShowSearchtitle">
            <li
              :class="{active: showActive===true? (index===clickIndex): false}"
              class="search-table-body-li curPointer"
              @click='testClick(items, index)'>
              <div class="fl overflowEllipsis changgeColumnsElement" v-for="(column, index2) in changgeColumns" :key="index2">
                <nodeContent :userInfo="userInfo" :index="index" :value="newDataList[index]" :column="column" :col= "columns"></nodeContent>
                <!-- {{index2===0?index+1:items[column.key]}} -->
              </div>
            </li>
          </template>
        </ul>
        <!-- <div class='fl' style='width: 30px;'></div> -->
        <!-- </div> -->
      </div>
      <div class="position-hints" v-show='iconShow' ref="position-hints">
        <icon name='triangleIcon'></icon>
      </div>
    </div>
  </div>
</template>
<script>
  import tableSearchTitle from '@/components/table/tableSearchTitle'
  import zInput from '@/components/form/input/zInput'
  import { mapMutations, mapState } from 'vuex'
  import * as types from '@/store/types'
  // import * as _ from 'lodash'
  export default {
    name: 'search-table',
    props: {
      searchTableTitle: {
        type: String,
        default: '类别列表',
      },
      columns: {
        type: Array,
      },
      selectStatu: {
        type: Boolean,
        default: true,
      },
      ifShowSearchtitle: {
        type: Boolean,
        default: true,
      },
      dataList: {
        type: Array,
        default: function() {
          return []
        },
      },
      skipName: {
        type: String,
        defalut: '',
      },
      clickIndexProp: {
        type: Number,
        default: -1,
      },
    },
    data() {
      return {
        noBorderRadios: '',
        ifShowSearch: false, // 是否显示搜索框
        keyword: '', // 搜索框数据
        allSearch: '',
        //      scrollTopVal: 0, // 距离上部
        ifScroll: false, // 是否有滚动
        iconShow: true, // 位置三角显示
        headerTop: 100, // 头部需扣减的
        liLineHeight: 40, // 行高
        ifActive: [],
        clickIndex: this.clickIndexProp,
        inputVal: '', // 处理的输入框的值
        timer: null,
        showActive: true,
        tableH: '', // 表格数据高度
        newDataList: this.dataList,
        trueDataList: [],
        activePosition: 0, // 选中项在列表中的位置 0：正常  1：置顶  2：置底
        componentActive: false,
      }
    },
    computed: {
      ...mapState(['userInfo']),
      newColumns() {
        if (this.ifShowSearchtitle) {
          let arr = [
            {
              title: '序号',
              key: 'num',
            },
          ]
          for (let i = 0; i < this.columns.length; i++) {
            arr.push(this.columns[i])
          }
          return arr
        } else {
          return this.columns
        }
      },
      changgeColumns() {
        return [...this.columns]
      },
    },
    mounted() {
      // this.initStyle()
      // if (this.newDataList && this.newDataList.length > 0) {
      //   this.testClick(this.newDataList[0], 0)
      // }
      // window.addEventListener('resize', this.listScroll)
      // this.componentActive = true
    },
    watch: {
      iconShow(data) {
        // console.log(data)
      },
      allSearch(data) {
        // console.log('输入的是什么', data)
        if (data === '') {
          this.newDataList = this.dataList
        }
      },
      search(data) {
        if (data === '') {
          this.newDataList = this.dataList
        }
      },
      dataList(data, oldData) {
        // console.log('进来了data', data)
        this.newDataList = data
        if (oldData.length === 0 && data.length > 0) {
          // this.newDataList = data
          this.testClick(this.newDataList[0], 0)
        } else {
          // console.log(data)
        }
        // this.$nextTick(() => {
        //   this.initHasScroll()
        // })
      },
    },
    methods: {
      searchInput() {
        // console.log('searchInput')
        this.trueDataList = []
        this.dataList.forEach((item, index) => {
          if (this.filter(item)) {
            this.trueDataList.push(item)
          }
        })
        this.newDataList = this.trueDataList
      },
      ...mapMutations({
        openPage: types.OPEN_PAGE,
        setCurPage: types.SET_CURRENT_PAGE_NAME,
      }),
      initHasScroll() {
        // 判断初始有滚动条
        let tableOutH = this.$refs.searchTableH.offsetHeight // 表格外部高度
        this.tableH = this.$refs.searchTableValH.offsetHeight // 表格数据高度
        if (tableOutH < this.tableH) {
          // console.log('出现滚动条')
          // this.$refs.searchTableValH.style
        } else {
          // console.log('不出现滚动条')
        }
      },
      skipTo() {
        if (this.skipName) {
          this.$router.push({ name: this.skipName })
          let temp = {}
          temp.name = this.skipName
          temp.title = this.skipName
          this.openPage(temp)
          this.setCurPage(temp.name)
        }
      },
      clickToShowSearch() {
        // 点击搜索
        // console.log('点击搜索')
        this.ifShowSearch = true
        // this.tableSearchDFocus()
        this.iconShow = false
        this.showActive = false
        this.$emit('table-search-click')
      },
      initStyle() {
        // 初始加载
        this.clickIndex = 0
        //        this.scrollTopVal = 0
        this.iconPosition(0)
        // console.log('初始加载')
        // this.$emit('table-search-chouse', true)
      },
      //      scrollFun (event) { // 滚动条
      //        this.ifScroll = true
      //        let searchBody = document.querySelector('.search-table-body')
      //        this.scrollTopVal = searchBody.scrollTop
      //      },
      testClick(data, index) {
        // 点击每项
        this.clickIndex = index
        this.iconShow = true
        this.showActive = true
        this.ifShowSearch = false
        this.iconPosition(this.clickIndex, this.$refs.searchTableValH.scrollTop)
        if (this.newDataList && this.newDataList.length > 0) {
          // console.log('data',data)
          if (this.newDataList.length === 1) {
            this.$emit('search-type', this.newDataList[0], index)
          } else {
            this.$emit('search-type', this.newDataList[index], index)
          }
          this.$emit('table-search-chouse', true, data, index)
        }
        //        this.activePosition = 0
        this.listScroll()
      },
      iconPosition(index, scroll) {
        // console.log(this.iconShow)
        // if (this.iconShow === true) {
        let positionHints = document.querySelector('.position-hints')
        let topVal = this.headerTop + index * 40 - (scroll || 0)
        let max =
          this.$refs.searchTableH.offsetHeight +
          this.headerTop -
          this.liLineHeight
        let min = this.headerTop
        //        if (topVal >= min && topVal <= max) {
        //          this.iconShow = true
        //        } else {
        //          this.iconShow = false
        //        }
        if (topVal < min) {
          positionHints.style.top = min + 'px'
        } else if (topVal > max) {
          positionHints.style.top = max + 'px'
        } else {
          positionHints.style.top = topVal + 'px'
        }
        // }
      },
      filter(item) {
        // console.log(val)
        // let newVal = val[this.columns[1].key]
        // if (this.allSearch === '') {
        //   return true
        // }
        // if (newVal.indexOf(this.allSearch) !== -1) {
        //   return true
        // } else {
        //   return false
        // }
        if (this.allSearch === '') {
          return true
        }
        // 将用户输入的内容按空格拆分成多个关键词
        let keywords = this.allSearch
          .toLocaleLowerCase()
          .trim()
          .split(' ')
        let a = true

        // 对每个关键词进行内容匹配，如果有一个没匹配上，就返回false
        for (let i = 0; i < keywords.length; i++) {
          const keyword = keywords[i]
          let b = false
          for (let j = 0; j < this.columns.length; j++) {
            const column = this.columns[j]
            let value = item[column.key]
            if (typeof value === 'number') {
              value = value + ''
            }
            if (typeof value !== 'string') {
              continue
            }
            if (value.toLocaleLowerCase().includes(keyword)) {
              b = true
            }
          }
          if (!b) {
            a = !a // 不能用a=false,否则eslint会报a未使用
            break
          }
        }
        return a
      },
      // tableSearchDFocus () { // 搜索框有焦点时，处理边框和三角位置
      //   this.clickIndex = -1
      //   this.scrollTopVal = -10
      // },
      retrunSearch() {
        // 点击清除
        this.allSearch = ''
        // console.log('点击清除')
        this.newDataList = this.dataList
      },
      returnQX() {
        this.ifShowSearch = false
        this.allSearch = ''
        this.$emit('search-input-val', this.allSearch)
        // if (this.selectStatu) {
        this.iconShow = true
        this.showActive = true
        // console.log('点击取消')
        // console.log(this.newDataList)
        // console.log(this.clickIndex)
        this.newDataList = this.dataList
        // if (this.newDataList.length === 1) {
        //   this.testClick(this.newDataList, this.clickIndex)
        // } else {
        this.testClick(this.newDataList[this.clickIndex], this.clickIndex)
        // }
        // this.$emit('table-search-chouse', true)
        // }
        // this.newDataList = this.dataList

        this.listScroll()
      },
      selectStatuFun() {
        // 下拉框变化样式改变
        this.iconShow = false
        this.showActive = false
      },
      listScroll() {
        if (!this.componentActive) return
        let panel = this.$refs.searchTableValH
        let scrollVal = panel.scrollTop
        let listItems = this.$refs.searchTableValH.children
        let activeLi = listItems[this.clickIndex]
        if (!activeLi) return
        let liHeight = activeLi.offsetHeight
        let activeLiOffsetTop = liHeight * this.clickIndex

        //        console.log(scrollVal, activeLiOffsetTop)
        if (scrollVal > activeLiOffsetTop) {
          this.activePosition = 1
        } else if (
          activeLi.offsetHeight + activeLiOffsetTop - scrollVal >
          panel.offsetHeight
        ) {
          this.activePosition = 2
        } else {
          this.activePosition = 0
        }
        this.iconPosition(this.clickIndex, scrollVal)
        //        console.log(panel.scrollTop, activeLi.offsetTop, panel.offsetHeight)
      },
    },
    activated() {
      if (!this.componentActive) {
        window.addEventListener('resize', this.listScroll)
      }
      this.componentActive = true
    },
    deactivated() {
      window.removeEventListener('resize', this.listScroll)
      this.componentActive = false
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.listScroll)
    },
    //    deactivated () {
    //      if (this.ifScroll) {
    //        let searchBody = document.querySelector('.search-table-body')
    //        searchBody.removeEventListener('scroll', this.scrollFun)
    //      }
    //    },
    components: {
      tableSearchTitle,
      zInput,
      nodeContent: {
        props: {
          value: {},
          column: {
            required: true,
          },
          index: [String, Number],
          col: {
            required: false,
          },
          icon: [String],
          userInfo: [Object],
        },
        render: function(h) {
          if (this.column.key === 'index') {
            if (this.column.is_lock) {
              if (this.value.lock_staff_id === this.userInfo.id) {
                return h('i', {
                  style: {
                    display: 'inline-block',
                    width: '12px',
                    height: '16px',
                    background: 'url(/static/icons/public/lockmyself.jpg)',
                  },
                })
              } else {
                return h('i', {
                  style: {
                    display: 'inline-block',
                    width: '12px',
                    height: '16px',
                    background: 'url(/static/icons/public/lock.jpg)',
                  },
                })
              }
            } else {
              return h(
                'div',
                {
                  class: {
                    'call-back': this.value.status === 4,
                  },
                },
                this.index + 1
              )
            }
          } else if (this.column.key === 'realname') {
            if (this.value.customer.is_vip) {
              return h(
                'div',
                {
                  class: {
                    'call-back': this.value.status === 4,
                  },
                },
                [
                  h(
                    'span',
                    {
                      style: {
                        position: 'relative',
                      },
                    },
                    [
                      h(
                        'span',
                        {
                          style: {
                            'max-width': '70px',
                          },
                        },
                        this.value.customer.realname
                      ),
                      h('i', {
                        style: {
                          display: 'inline-block',
                          width: '16px',
                          height: '15px',
                          background: 'url(/static/icons/public/vipimg.jpg)',
                          'background-size': '100% 100%',
                          position: 'absolute',
                          top: '0',
                          left: '-21px',
                        },
                      }),
                    ]
                  ),
                ]
              )
            } else {
              return h('div', this.value.customer.realname)
            }
          } else if (this.column.key === 'pe_sn') {
            if (this.value.status === 4) {
              return h(
                'div',
                {
                  style: {
                    position: 'relative',
                    display: 'inline-block',
                  },
                  class: {
                    'call-back': this.value.status === 4,
                  },
                },
                [
                  h('i', {
                    style: {
                      display: 'inline-block',
                      position: 'absolute',
                      width: '16px',
                      height: '16px',
                      left: '-16px',
                      top: '10px',
                      background: 'url(/static/icons/public/recall.jpg)',
                    },
                  }),
                  h('span', this.value[this.column.key]),
                ]
              )
            } else {
              return h(
                'div',
                {
                  style: {
                    position: 'relative',
                  },
                },
                [
                  h(
                    'span',
                    {
                      style: {
                        display: 'inline-block',
                      },
                    },
                    this.value[this.column.key]
                  ),
                ]
              )
            }
          } else {
            return h('div', this.value[this.column.key])
          }
        },
      },
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  @width: 50px;
  @minWidth: 100px;
  .search-table {
    width: 100%;
    height: 100%;
    position: relative;
    // border-radius: @borderRadiuBig;
    .search-table-qx {
      // 取消
      color: @gradeBlueTwo;
    }
    // .table-flex {
    //   // flex布局
    //   display: flex;
    //   text-align: center;
    // }
    // .table-flex-jus {
    //   justify-content: center;
    //   align-items: center;
    //   flex: 1;
    // }
    .position-hints {
      // 位置图标
      position: absolute;
      right: -19px;
      top: 0;
      // width: 0;
      // height: 0;
      // border-radius: 3px;
      // border-top: 10px solid transparent;
      // border-right: 10px solid @tabelSearchActive;
      // border-bottom: 10px solid transparent;
    }
    .search-table-con {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    .search-table-header {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: @tableTh;
      color: @gradeAshOne;
      .search-table-head-ul {
        height: 100%;
        width: 100%;
        text-align: center;
        display: flex;
        white-space: nowrap;
        align-items: center;
        & > li {
          border-right: 1px solid @gradeAshFive;
          height: 100%;
          text-align: center;
          padding-left: 3px;
          padding-right: 5px;
          width: @minWidth;
        }
        & > li:nth-of-type(1) {
          // width: 20px;
          width: @width;
          border-left: 2px solid transparent;
        }
        & > li:nth-last-of-type(1) {
          border-right: none;
          flex: 1;
        }
        // .search-table-head-li {
        //   // width: 50%;
        //   height: 100%;
        //   text-align: center;
        //   // outline: 1px solid #0a6cd6;
        // }
      }
    }
    // .search-table-body-out {
    //   width: 100%;
    //   margin-right: 10px;
    //   // padding-right: 10px;
    //   height: calc(~'100% - 100px');
    //   overflow: hidden;
    //   position: relative;
    // }
    .search-table-body {
      position: relative;
      width: 100%;
      // height: 100%;
      height: calc(~'100% - 90px');
      // margin-bottom: 10px;
      .search-table-body-ul {
        overflow: auto;
        width: 100%;
        height: 100%;
        &.activeTop .active {
          position: absolute;
          top: 0;
          z-index: 999;
          width: 100%;
          background-color: white;
        }
        &.activeBottom .active {
          position: absolute;
          bottom: 0;
          z-index: 999;
          width: 100%;
          background-color: white;
        }
        &.activeTop {
          padding-top: 40px;
        }
        &.activeBottom {
          padding-bottom: 40px;
        }

        & > li {
          height: 40px;
          line-height: 36px;
          text-align: center;
          color: @gradeAshTwo;
          display: flex;
          // border: 2px solid transparent;
          & > div {
            // width: 50%;
            padding-left: 3px;
            padding-right: 5px;
            // margin-top: -1px;
            width: @minWidth;
            border: 2px solid transparent;
            // border-bottom: none;
            border-right: 1px solid @gradeAshFive;
          }
          & > div:nth-of-type(1) {
            width: @width;
            // width: 20px;
            // border-right: none;
          }
          & > div:nth-last-of-type(1) {
            border-right: 2px solid transparent;
            flex: 1;
            border-left: none;
          }
        }
        & > li:nth-of-type(2n) {
          background-color: @tableTr;
        }
        & > li:nth-last-of-type(1) {
          border-bottom: 1px solid @gradeAshFive;
        }
        & > li:hover {
          background-color: @iviTableHover;
        }
        // .search-table-body-li {
        //   height: 40px;
        //   line-height: 40px;
        //   text-align: center;
        //   color: @gradeAshTwo;
        //   border: 2px solid transparent;
        //   &>div {
        //     // width: 50%;
        //     border-right: 1px solid @gradeAshFive;
        //   }
        //   &>div:nth-of-last-type(1) {
        //     border-right: none;
        //     flex: 1;
        //     background-color: red;
        //   }
        // }
        .active {
          & > div {
            border-top-color: @tabelSearchActive;
            border-bottom-color: @tabelSearchActive;
          }
          & > div:nth-of-type(1) {
            border-left-color: @tabelSearchActive;
          }
          & > div:nth-last-of-type(1) {
            border-right: 2px solid @tabelSearchActive;
          }
        }
      }
    }
    .search-table-title {
      position: relative;
      height: 50px;
      & > div {
        transition: 0.6s ease;
        transition-property: opacity, visibility;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        visibility: hidden;
        width: 100%;
      }
      & > div.show {
        opacity: 1;
        visibility: visible;
      }
    }

    .table-title-search {
      // 头部搜索
      width: 100%;
      height: 50px;
      line-height: 50px;
      .ivu-input-wrapper {
        input {
          padding-right: 25px;
        }
      }
      & > div {
        position: relative;
      }
      .clearIcon {
        position: absolute;
        top: 19px;
        right: 10px;
        // right: 15px;
      }
    }
  }
</style>
