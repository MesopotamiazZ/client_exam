/** 
* @author 覃凤
* @date 2018/3/6
* @content 表格导入备单-错误列表
* 
*/
<template>
  <div class="error-list">
    <title-has-slot class="title-has-slot">
      <span slot="titletHasSlotLeftTitle">{{ msg }}</span>
      <div slot='titletHasSlotRightContent' class="titlet-has-slot-right-content">
        <span class="font12 pro-line fl line-public marginR20" @click='proLine'><Icon type="chevron-up"></Icon>上一条</span>
        <span class="font12 next-line fl line-public marginR20" @click='nextLine'><Icon type="chevron-down"></Icon>下一条</span>
        <Button class="fl" type="ghost" @click='saveErrorList'>保存日志</Button>
      </div>
    </title-has-slot>
    <div class="error-list-content">
      <ul class="error-list-title error-list-content-public flex">
        <template v-for="(itemTitle,index) in columns" >
          <li v-if='index===0' :key="0">
            <div>{{ itemTitle.title }}（共{{ errorData._error.length }}条）</div>
          </li>
          <li v-else :key="itemTitle.key">
            <div>{{ itemTitle.title }}</div>
          </li>
        </template>
      </ul>
      <ul class="error-list-content-data">
        <li class="curPointer" :class='{active: index===indexData}' v-for="(item,index) in newErrorData" :key="index" @click='clickLine(index)'>
          <ul class="error-list-content-public flex">
            <li class='overflowEllipsis' :title='item[item2.key]' v-for="(item2,index) in columns">
              <div>{{ item[item2.key] }}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'error-list',
  props: {
    errorData: {
      type: Object,
      default: () => {
        return {
          data_code: '',
          count: 1, // 总条数
          filename: '', // 所属文件名称
          _error: [],
        }
      },
    },
  },
  computed: {
    newErrorData () {
      return this.errorData._error.map((data) => {
        data.filename = this.errorData.filename
        data.sheet = '/'
        return {
          row: data.row, // 行
          line: data.line, // 列
          info: data.info, // 详情
          filename: data.filename,
          sheet: data.sheet,
        }
      })
      // console.log(aaa)
    },
  },
  data () {
    return {
      msg: '错误列表',
      indexData: null,
      columns: [
        {
          title: '错误信息',
          key: 'info',
        }, {
          title: '行',
          key: 'row',
        }, {
          title: '列',
          key: 'line',
        },
        // {
        //   title: '文件名',
        //   key: 'filename',
        // },
        {
          title: 'Sheet',
          key: 'sheet',
        },
      ],
    }
  },
  watch: {
    'errorData._error' (val) {
      // console.log(val)
      if (val.length === 0) {
        this.indexData = null
      }
    },
  },
  methods: {
    saveErrorList () { // 点击保存日志
      console.log(1111)
      let selfInput = document.createElement('input')
      selfInput.type = 'file'
      selfInput.setAttribute('nwsaveas', `.txt`)
      selfInput.addEventListener('change', onchange)
      selfInput.click()
      let that = this
      function onchange(event) {
        let path = selfInput.value
        let fs = require('fs')
        let data = ''
        if (that.newErrorData) {
          data = JSON.stringify(that.newErrorData)
        } else {
          data = ''
        }
        fs.writeFile(path + '.json', data, function(err) {
          if (err) {
            return console.log(err)
          }
          // console.log('The file was saved!')
        })
      }
    },
    clickLine (index) {
      // console.log(index)
      this.indexData = index
      this.$emit('error-choose-data', parseInt(this.errorData._error[this.indexData].row))
    },
    proLine () { // 点击上一条
      this.indexData -= 1
      // console.log('第几行', this.indexData)
      if (this.indexData <= 0) {
        this.indexData = 0
      }
      this.clickLine(this.indexData)
    },
    nextLine() { // 点击下一条
      if (this.indexData === null) {
        this.indexData = 0
      } else {
        this.indexData += 1
      }
      // console.log('点击下一条第几行', this.indexData)
      if (this.indexData >= this.errorData._error.length) {
        this.indexData = this.errorData._error.length - 1
      }
      this.clickLine(this.indexData)
    },
  },
  mounted () {
    // this.clickLine(0)
    // this.errorData =
    this.indexData = null
  },
}
</script>
<style lang="less" scoped>
@import '~assets/less/variable.less';
.error-list {
  height: 100%;
  width: 100%;
  overflow: auto;
  .line-public {
    line-height: @num30;
    height: @num30;
    color: @gradeBlueOne;
    cursor: pointer;
  }
  .disabled-public {
    color: @gradeAshFive;
  }
  // .pro-line {
    
  // }
  // .next-line {

  // }
  .error-list-content-public {
    // width: 100%;
    text-align: center;
    border: 2px solid transparent;
    &>li {
      height: 36px;
      line-height: 36px;
      border-right: 1px solid @gradeAshFive;
      padding-left: @num10;
      padding-right: @num10;
    }
    &>li:nth-of-type(1) {
      width: 700px;
    }
    &>li:nth-of-type(2) {
      width: 88px;
    }
    &>li:nth-of-type(3) {
      width: 88px;
    }
    // &>li:nth-of-type(4) {
    //   width: 298px;
    // }
    &>li:nth-last-of-type(1) {
      border-right: none;
      flex: 1;
    }
  }
  .error-list-content {
    height: calc(~'100% - 50px');
    width: 100%;
    // overflow-x: auto;
    .error-list-title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: @tableTh;
      color: @gradeAshOne;
      // li {
      //   border-right: @gradeAshFive;
      // }
    }
    .error-list-content-data {
      height: calc(~'100% - 40px');
      overflow-y: auto;
      width: 100%;
      // &>li {
      //   width: 100%;
      //   // outline: 1px solid red;
      // }
      &>li:nth-of-type(2n) {
        background-color: @tableTr;
      }
      &>li:nth-last-of-type(1) {
        border-bottom: 1px solid @gradeAshFive;
      }
    }
  }
  .active {
    .error-list-content-public {
      border-color: @gradeBlueOne;
    }
  }
}
</style>
