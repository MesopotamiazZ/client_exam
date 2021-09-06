<template>
  <div class="x-modal-table-wrapper">
    <!-- header -->
    <div class="xmt-header">
      <div class="xmt-cell1">前置括弧</div>
      <div class="xmt-cell2">项目/表达式/既往病史</div>
      <div class="xmt-cell3">运算符</div>
      <div class="xmt-cell4">参考值</div>
      <div class="xmt-cell5">后置括弧</div>
      <div class="xmt-cell6">关系</div>
    </div>
    <!-- body -->
    <div class="xmt-body">
      <div class="xmt-tr"
           v-for="(item,index) in data"
           :key="item.id"
           @click="clickRow(index)"
           ref="row">
        <div class="xmt-highlight"
             v-show="showHighlight"
             ref="highlight"></div>
        <div class="xmt-cell1 cell">
          <Select placeholder="">
            <Option value="(">(</Option>
            <Option value="((">((</Option>
            <Option value="(((">(((</Option>
            <Option value="((((">((((</Option>
            <Option value="(((((">(((((</Option>
          </Select>
        </div>
        <div class="xmt-cell2 cell">
          <div @click="projectClick"
               class="xmt-project-cell">点击弹框</div>
        </div>
        <div class="xmt-cell3 cell">
          <Select placeholder=""></Select>
        </div>
        <div class="xmt-cell4 cell">
          <Input placeholder="请输入"></Input>
        </div>
        <div class="xmt-cell5 cell">
          <Select placeholder="">
            <Option value=")">)</Option>
            <Option value="))">))</Option>
            <Option value=")))">)))</Option>
            <Option value="))))">))))</Option>
            <Option value=")))))">)))))</Option>
          </Select>
        </div>
        <div class="xmt-cell6 cell">
          <Select placeholder=""></Select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'modalTable',
  props: {
    data: {
      type: Array,
      require: true,
      default: function() {
        return [{}]
      },
    },
  },
  data() {
    return {
      showHighlight: false,
      // rules
      rules: [],
      tableData: [],
    }
  },

  created() {
    this.tableData = _.cloneDeep(this.data)
  },
  methods: {
    ctrlHightlight(i) {
      this.$refs.highlight[i].style.top = this.$refs.row[i].offsetTop
      // console.log(this.$refs.row[i].offsetTop)
      this.showHighlight = true
    },
    clickRow(i) {
      // console.log(i)
      this.ctrlHightlight(i)
      return this.data[i]
    },
    // 点击表达式项目
    projectClick() {
      console.log('emit')
      this.$emit('clickItem')
    },
  },
}
</script>

<style lang="less" scoped>
.x-modal-table-wrapper {
  width: 100%;
  height: 100%;

  .xmt-header {
    display: flex;
    height: 40px;
    width: 100%;
    background: rgb(215, 233, 255);

    > div {
      // flex: 1;
      text-align: center;
      line-height: 40px;
      font-weight: 500;
      color: #111;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
    }
    > div:last-child {
      border: none;
    }
  }
  .xmt-body {
    position: relative;
    .xmt-tr {
      display: flex;

      > .cell {
        // flex: 1;
        text-align: center;
        line-height: 40px;
        font-weight: 500;
        color: #111;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }
      > .cell:nth-child(2) {
        padding-left: 2px;
      }
      > .cell:last-child {
        border-right: none;
        padding-right: 2px;
      }
    }
  }
  .xmt-highlight {
    position: absolute;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    border: 2px solid #008cee;
  }
  .xmt-project-cell {
    position: relative;
    cursor: pointer;
    z-index: 2;
  }
  .flex1 {
    flex: 1;
  }
  .xmt-cell1 {
    width: 100px;
  }
  .xmt-cell2 {
    flex: 1;
  }
  .xmt-cell3 {
    width: 60px;
  }
  .xmt-cell4 {
    width: 170px;
  }
  .xmt-cell5 {
    width: 100px;
  }
  .xmt-cell6 {
    width: 100px;
  }
}
</style>

<style lang="less">
.x-modal-table-wrapper {
  // 覆盖样式
  // .ivu-input, .ivu-select-input, .ivu-input-icon, .ivu-select-single .ivu-select-selection{
  //   height:38px;
  //   line-height:38px;
  // }
  .ivu-select-selection {
    border: none;
    box-shadow: none;
  }
  .ivu-input {
    border: none;
    box-shadow: none;
  }
}
</style>
