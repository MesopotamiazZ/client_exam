 /**
* 穿梭框
* @author 张祥
* @date 2017/11/24
*/
<template>
  <div class="customTransfer">
    <div class="customTransfer-list" :style="{width:listWidth,height:listHeight,paddingTop:leftInputValue!==null?'100px':'50px'}">
      <div class="customTransfer-list-header">
        <div class="wrapper clearfix">
          <i class="list-i"></i>
          <span class="title">{{title}}</span>
        </div>
        <div v-if="leftInputValue!==null" class="selectWrapper paddingR20 paddingL20 borderT1 clearfix">
          <span v-if="inputTitle!==null" class="title">{{inputTitle}}</span>
          <div class="selectW">
            <Input v-model="leftInputValue" disabled class="leftInput"></Input>
          </div>
        </div>
      </div>
      <div class="customTransfer-list-body" ref="list">
        <ul class="title rowUl" :style="{paddingRight:leftListPaddingR+'px'}">
          <li class="column" v-for="column in leftColumns?leftColumns:columns" :key="column.id" :style="{flex:'1',width:'1px'}">
            <div class="table-cell">
              <span>{{column.title}}</span>
            </div>
          </li>
          <li v-if="canChecked" class="column" :style="{width:getCheckedWidth}">
            <div class="table-cell">
              <span>{{checkTitle}}</span>
            </div>
          </li>
        </ul>
        <div class="listWrapper" ref="leftListWrapper">
          <ul ref="leftList">
            <li class="row" v-for="(item,index) in targetData" :key="item.id" @click="selectLeftRow(index,item)" :class="{selected:index===leftSelectIndex}">
              <ul class="rowUl">
                <li class="column" v-for="(column,index2) in columns" :key="column.id" :style="{flex:'1',width:'1px'}">
                  <div class="table-cell">
                    <template>
                      <Render
                        v-if="(typeof column.render) ==='function'"
                        :row="index"
                        :col="index2"
                        :data="item"
                        :render="column.render">
                      </Render>
                      <span v-else>{{item[column.key]}}</span>
                    </template>
                  </div>
                </li>
                <li v-if="canChecked" class="column" :style="{width:getCheckedWidth}">
                  <div class="checkw">
                    <Checkbox class="checkbox" :value="item._checked" @click.native="click(item)"></Checkbox>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="customTransfer-operation">
      <span class="ic ic_left" :class="{bigMargin:!moveAll,disabled:rightSelectIndex===undefined||isExist||!canAdd}" @click="add()">
        <icon name="transfer_left"></icon>
      </span>
      <br>
      <span class="ic ic_right" :class="{bigMargin:!moveAll,disabled:leftSelectIndex===undefined}" @click="remove()">
        <icon name="transfer_right"></icon>
      </span>
      <br>
      <span v-if="moveAll" class="ic ic_double_left" :class="{disabled:targetData.length===sourceData.length}" @click="addAll()">
        <icon name="transfer_double_left"></icon>
      </span>
      <br>
      <span v-if="moveAll" class="ic ic_double_right" :class="{disabled:targetData.length===0}" @click="removeAll()">
        <icon name="transfer_double_right"></icon>
      </span>
    </div>
    <div class="customTransfer-list" :style="{width:listWidth,height:listHeight,paddingTop:select?'100px':'50px'}">
      <div class="customTransfer-list-header">
        <div v-if="select" class="selectWrapper paddingR20 paddingL20 borderB1 clearfix">
          <span v-if="selectTitle!==null" class="title">{{selectTitle}}</span>
          <div class="selectW">
            <Select filterable v-model="selectValue" placeholder="" class="select">
              <Option v-for="item in selectOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="paddingR20 paddingL20">
          <Input class="search" v-model="keyword" icon="ios-search" placeholder="请输入搜索内容"></Input>
        </div>
      </div>
      <div class="customTransfer-list-body">
        <ul class="title rowUl" :style="{paddingRight:rightListPaddingR+'px'}">
          <li class="column" v-for="column in columns" :key="column.id" :style="{flex:'1',width:'1px'}">
            <div class="table-cell">
              <span>{{column.title}}</span>
            </div>
          </li>
        </ul>
        <div class="listWrapper" ref="rightListWrapper">
          <ul ref="rightList">
            <template v-for="(item,index) in sourceData">
              <li class="row" v-if="filter(item)" :key="item.id" @click="selectRightRow(index,item)" :class="{selected:index===rightSelectIndex}">
                <ul class="rowUl">
                  <li class="column" v-for="(column,index2) in columns" :key="column.id" :style="{flex:'1',width:'1px'}">
                    <div class="table-cell">
                      <template>
                        <Render
                          v-if="(typeof column.rightRender) ==='function'"
                          :row="index"
                          :col="index2"
                          :data="item"
                          :render="column.rightRender">
                        </Render>
                        <span v-else>{{item[column.key]}}</span>
                      </template>
                    </div>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Render from './components/render.js'
  export default {
    name: 'custom-transfer',
    components: {
      Render,
    },
    props: {
      // 告诉穿梭框其是否正在显示
      showing: {
        type: Boolean,
        default: true,
      },
      value: {
        type: Array,
        default: () => {
          return []
        },
      },
      leftInputValue: {
        type: [String, Number],
        default: null,
      },
      inputTitle: {
        type: String,
        default: null,
      },
      // 控制添加按钮是否可用
      canAdd: {
        type: Boolean,
        default: true,
      },
      // 是否出现复选框
      canChecked: {
        type: Boolean,
        default: false,
      },
      checkedWidth: {
        type: [String, Number],
        default: 70,
      },
      checkTitle: {
        type: String,
        default: '状态',
      },
      // 左侧标题
      title: {
        type: String,
        default: '已选列表',
      },
      // 是否可以添加全部或移除全部
      moveAll: {
        type: Boolean,
        default: false,
      },
      // 是否显示右边下拉框
      select: {
        type: Boolean,
        default: false,
      },
      // 下拉框标题
      selectTitle: {
        type: String,
        default: null,
      },
      // 下拉框默认值
      selectDefault: {
        type: [String, Number],
      },
      // 下拉框列表选项
      selectOptions: {
        type: Array,
      },
      // 穿梭框宽度
      listWidth: {
        type: String,
        default: '250px',
      },
      // 穿梭框高度
      listHeight: {
        type: String,
        default: '400px',
      },
      // 控制列
      columns: {
        type: Array,
        default: () => {
          return []
        },
      },
      // 控制左边列
      leftColumns: {},
      // 右边数据
      sourceData: {
        type: Array,
        default: () => {
          return []
        },
      },
      // 左边数据
      // targetData: {
      //   type: Array,
      //   default: () => {
      //     return []
      //   },
      // },
    },
    data() {
      return {
        targetData: [],
        selectValue: this.selectDefault,
        isExist: false,
        leftSelectIndex: undefined, // 左侧选中条目的索引
        rightSelectIndex: undefined, // 右侧选中条目的索引
        targetSelectRow: {}, // 右侧选中条目的内容
        keyword: '', // 关键词
        leftListPaddingR: 0, // 左侧列表头的右边距
        rightListPaddingR: 0, // 右侧列表头的右边距
      }
    },
    computed: {
      getCheckedWidth() {
        if (typeof this.checkedWidth === 'number') {
          return this.checkedWidth + 'px'
        }
        return this.checkedWidth
      },
      // nativeLeftColumns(){
      //   return le
      // }
    },
    methods: {
      click(item) {
        if (!item._checked) {
          item._checked = true
        } else {
          item._checked = !item._checked
        }
        this.getSelectData()
      },
      selectRightRow(index, row) {
        let obj = JSON.parse(JSON.stringify(row))
        this.rightSelectIndex = index
        this.targetSelectRow = obj
        this.getSourceSelectRow(obj)
        this.isExist = this.targetData.some(item => {
          return item.id === row.id
        })
      },
      selectLeftRow(index, row) {
        this.leftSelectIndex = index
      },
      add() {
        if (this.rightSelectIndex === undefined || this.isExist || !this.canAdd) {
          return
        }
        if (!this.isExist) {
          this.targetData.push(this.targetSelectRow)
          this.isExist = true
        }
        this.getSelectData()
      },
      addAll() {
        if (this.targetData.length === this.sourceData.length) {
          return
        }
        this.targetData = JSON.parse(JSON.stringify(this.sourceData))
        this.getSelectData()
      },
      remove() {
        if (this.leftSelectIndex === undefined) {
          return
        }
        this.targetData.splice(this.leftSelectIndex, 1)
        this.leftSelectIndex = undefined
        this.getSelectData()
      },
      removeAll() {
        if (this.targetData.length === 0) {
          return
        }
        this.targetData = []
        this.leftSelectIndex = undefined
        this.getSelectData()
      },
      addRightPadding() {
        let listWrapperHeight = this.$refs.rightListWrapper.offsetHeight
        let listHeight = this.$refs.rightList.offsetHeight
        if (listHeight > listWrapperHeight) {
          this.rightListPaddingR = 6
        } else {
          this.rightListPaddingR = 0
        }
      },
      addLeftPadding() {
        let listWrapperHeight = this.$refs.leftListWrapper.offsetHeight
        let listHeight = this.$refs.leftList.offsetHeight
        if (listHeight > listWrapperHeight) {
          this.leftListPaddingR = 6
        } else {
          this.leftListPaddingR = 0
        }
      },
      filter(item) {
        if (this.keyword === '') {
          return true
        }
        // 将用户输入的内容按空格拆分成多个关键词
        let keywords = this.keyword
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
      getSelectData() {
        // 向父组件提交targetData
        this.$emit('input', JSON.parse(JSON.stringify(this.targetData)))
      },
      getSelectValue(selectValue = null) {
        // 向父组件提交下拉选择框的值
        this.$emit('getSelectValue', selectValue)
      },
      getSourceSelectRow(sourceSelectRow) {
        // 向父组件提交右边选中的当前项
        this.$emit('getSourceSelectRow', sourceSelectRow)
      },
    },
    mounted() {
      this.targetData = JSON.parse(JSON.stringify(this.value))
      this.$nextTick(function() {
        this.addRightPadding()
        this.addLeftPadding()
      })
      this.$emit('input', this.targetData)
    },
    watch: {
      showing(cur) {
        if (cur) {
          this.$nextTick(function() {
            this.addRightPadding()
            this.addLeftPadding()
          })
        }
      },
      value(cur) {
        this.targetData = JSON.parse(JSON.stringify(cur))
      },
      leftSelectIndex(cur, old) {
        if (cur !== undefined) {
          this.rightSelectIndex = undefined
        }
      },
      rightSelectIndex(cur, old) {
        if (cur !== undefined) {
          this.leftSelectIndex = undefined
        }
      },
      targetData(cur) {
        this.leftSelectIndex = undefined
        if (cur) {
          let exist = cur.some(item => {
            return item.id === this.targetSelectRow.id
          })
          this.isExist = exist
        }
        this.$nextTick(() => {
          this.addLeftPadding()
        })
      },
      sourceData(cur) {
        this.rightSelectIndex = undefined
        this.$nextTick(() => {
          this.addRightPadding()
        })
      },
      selectValue(cur) {
        this.getSelectValue(cur)
      },
      keyword(cur, old) {
        this.$nextTick(() => {
          this.addRightPadding()
          this.addLeftPadding()
        })
      },
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/public.less';
  .customTransfer {
    position: relative;
    display: flex;
    align-items: center;

    .customTransfer-list {
      position: relative;
      height: 100%;
      display: inline-block;
      border: 1px solid @gradeAshFive;
      border-radius: 5px;
      padding-top: 50px;
      background: #fff;
      overflow-y: hidden;

      .clearfix {
        clear: both;
        overflow: hidden;
      }

      .customTransfer-list-body {
        width: 100%;
        height: 100%;
        padding-top: 40px;
        position: relative;

        ul.title {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 40px;
          border-left: 2px solid @tableTh;
          border-right: 2px solid @tableTh;
          background: @tableTh;
          span {
            font-size: 12px;
            color: #111111;
          }
        }

        .rowUl {
          display: flex;
        }

        .listWrapper {
          height: 100%;
          width: 100%;
          overflow: auto;

          .row {
            width: 100%;
            height: 40px;
            cursor: pointer;

            ul {
              height: 100%;
              width: 100%;
            }
          }

          .row:nth-child(odd) {
            background: #ffffff;
            border-left: 2px solid #ffffff;
            border-right: 2px solid #ffffff;
          }
          .row:nth-child(even) {
            background: @tableTr;
            border-left: 2px solid @tableTr;
            border-right: 2px solid @tableTr;
          }

          .row:nth-last-child(1) {
            border-bottom: 1px solid @gradeAshFive;
          }

          .row:hover {
            background: @iviTableHover;
            border-left: 2px solid @iviTableHover;
            border-right: 2px solid @iviTableHover;
          }

          .selected {
            border: 2px solid #68ccff !important;
          }
        }

        .column {
          width: 50%;
          height: 100%;
          border-right: 1px solid @gradeAshFive;
        }

        .column:last-child {
          border-right: none;
        }

        .ivu-tooltip,
        .ivu-tooltip-rel {
          width: 100%;
          height: 100%;
        }

        .table-cell {
          display: flex;
          width: 100%;
          height: 100%;
          padding: 0 5px;
          overflow: hidden;
          text-align: center;
          box-sizing: border-box;
          align-items: center;
          justify-content: center;

          span {
            width: 100%;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
          }
        }

        .checkw {
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: center;

          .checkbox {
            margin-right: 0;
          }
        }
      }

      .customTransfer-list-header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;

        .wrapper {
          margin: 16px 16px;
        }

        .borderB1 {
          border-bottom: 1px solid @gradeAshFive;
        }
        .borderT1 {
          border-top: 1px solid @gradeAshFive;
        }

        .list-i {
          float: left;
          width: 3px;
          height: 12px;
          margin-top: 3px;
          background: #008cee;
        }

        .title {
          float: left;
          font-size: 12px;
          margin-left: 4px;
        }

        .selectWrapper {
          display: flex;

          .title {
            font-size: 12px;
            color: #737373;
            line-height: 50px;
            margin-right: 10px;
          }

          .selectW {
            display: inline-block;
            flex: 1;
          }
        }

        .select {
          margin: 10px auto;
        }

        .leftInput {
          margin: 10px auto;
        }

        .search {
          margin: 10px auto;
        }
      }
    }

    .customTransfer-operation {
      display: inline-block;
      overflow: hidden;
      vertical-align: middle;
      padding-left: 20px;
      padding-right: 20px;
      font-size: 0;

      .fa-icon {
        fill: #008cee;
        width: 48px;
        height: 28px;
        border: 1px solid #008cee;
        border-radius: 4px;
      }

      .ic {
        display: inline-block;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .ic:nth-last-child(1) {
        margin-bottom: 0;
      }

      .ic.bigMargin {
        margin-bottom: 28px;
      }

      .ic.disabled {
        cursor: default;
      }

      .ic.disabled .fa-icon {
        fill: #ced2d9;
        border-color: #ced2d9;
      }
    }
  }
</style>
