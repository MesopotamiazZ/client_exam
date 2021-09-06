/* 
tab:切换tab,
tab-change:切换tab返回数据
titleData: 表头数据
 */
<template>
  <div class="read-local-data">
    <Form>
      <div class="up-btn">
        <input id='file' type="file" @change="initExcel($event)"></input>
        <!-- <Button id='chouseFileBtn' @click='chouseFiles'>点击选择文件</Button> -->
      </div>
    </Form>
    <self-tab :tab='tab' @tab-change='tabChange'></self-tab>
    <ul class="title-ul">
      <li class="fl overflowEllipsis paddingL10 paddingR10" v-for="item in newTitle" :key="item.key">
        <div>{{ item.columnName }}</div>
        <div>{{ item.title }}</div>
      </li>
    </ul>
    <ul style="background-color: lightblue;height: 100px;overflow: scroll;width:100%;">
      <li v-for="(item,index) in rowNewData" style='text-align: center;height:30px;line-height: 30px;border:1px solid red;'
      :class="{findErrActive:((index+1)===findErrData.index&&isErrDataPage)}">
        <Row>
          <Col style="outline: 1px solid green;" span='1'>{{ item.indexNum }}</Col>
          <Col style="outline: 1px solid green;" span='2'>{{ item.name }}</Col>
          <Col style="outline: 1px solid green;" span='3'>{{ item.idNum }}</Col>
          <Col style="outline: 1px solid green;" span='2'>{{ item.department }}</Col>
          <Col style="outline: 1px solid green;" span='1'>{{ item.sex }}</Col>
          <Col style="outline: 1px solid green;" span='1'>{{ item.age }}</Col>
          <Col style="outline: 1px solid green;" span='3'>{{ item.phone }}</Col>
          <Col style="outline: 1px solid green;" span='2'>{{ item.tc }}</Col>
          <Col style="outline: 1px solid green;" span='4'>{{ item.dw }}</Col>
          <Col style="outline: 1px solid green;" span='2'>{{ item.bl }}</Col>
          <Col style="outline: 1px solid green;" span='3'>{{ item.fs }}</Col>
        </Row>
      </li>
    </ul>
    <z-page 
      :total='page.total' 
      show-sizer 
      :page-size='page.page_size' 
      :page-size-opts='page.page_size_opts'
      :indexNum='findErrData.page_size'
      @on-change='pageChange' 
      @on-page-size-change='pageSizeChange'>
    </z-page>
    <div class="err-infor">
      <Button type="ghost" @click="proErr">上一条</Button>
      <Button type="ghost" @click='nextErr'>下一条</Button>
      <ul style="width:100%;height:30px;outline:1px solid red;line-height:30px;text-align:center;">
        <li style="width:50%;border-right:1px solid red;" class="fl">行</li>
        <li style="width:50%;" class="fl">列</li>
      </ul>
      <ul style="width: 100%;height: 80px;border: 1px solid red;overflow: scroll;">
        <li v-for='(item,index) in errData' :class='{errActive: index===errIndex}'>
          <div style="width: 50%;text-align-center">{{ item.row }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import xlsx from 'node-xlsx'
import zPage from './page/page.vue'
import selfTab from '@/components/tab/tab.vue'

export default {
  name: 'read-local-data',
  components: {
    zPage,
    selfTab,
  },
  props: {
    // titleData: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   },
    // },
    tab: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  watch: {
    titleData (data) {
      console.log(data)
      this.newTitle = data
    },
  },
  data () {
    return {
      msg: '读取excel',
      newTitle: [],
      isErrDataPage: true, // 用于判断点击分页和错误数据是否在同一页
      rowData: [], // 存放读取的数据（除标题）
      rowNewData: [ // 页面显示的数据
        {
          name: '',
          sex: null,
          age: null,
          ifSecond: null,
          tc: null,
          dw: null,
        },
      ],
      errData: [
        {
          row: 2,
        }, {
          row: 3,
        }, {
          row: 12,
        }, {
          row: 20,
        },
      ],
      errIndex: 0,
      findErrData: {
        index: 0, // 错误数据对应的当前的index
        page_size: 0, // 错误数据对应的页码
      },
      // titleData: {
      //   indexNum: '序号',
      //   name: '姓名',
      //   idNum: '身份证号',
      //   department: '部门/车间',
      //   sex: '性别',
      //   age: '年龄',
      //   phone: '联系电话',
      //   tc: '体检套餐',
      //   dw: '单位名称',
      //   bl: '个人支付比例',
      //   fs: '新增费用支付方式',
      // },
      rowName: ['name', 'sex', 'age', 'ifSecond', 'tc', 'dw'],
      // initRow: [],
      page: {
        total: 0, // 总条数
        page_size: 1, // 每页显示条数
        current_page: 1, // 当前处于第几页
        page_size_opts: [5, 6, 7], // 切换选择显示条数数组
      },
    }
  },
  mounted () {
    // console.log(this.errIndex)
    this.page.page_size = this.page.page_size_opts[0]
  },
  methods: {
    tabChange (data, index) {
      this.$emit('tab-change', data, index)
    },
    initChouseErr (data) { // 上面显示表格对应的错误数据
    // 选中错误数据得到错误数据在excel文件中是在哪一行
    // 计算第几页
    // 计算第几行
    // 1、3、12/5=3....2
      // console.log(data)
      let row = data.row // 错误数据页面显示的对应excel数据的行
      let pageSize = row / this.page.page_size
      let errSizeIndex = 0
      this.findErrData.page_size = Math.ceil(row > this.page.page_size ? pageSize : row) // 第几页
      if (row > this.page.page_size) {
        this.findErrData.page_size = Math.ceil(pageSize)
        if (pageSize % 1 === 0) { // 是否为整数页码
          errSizeIndex = pageSize
          this.findErrData.index = this.page.page_size// 对应页面第1行
          // console.log('为整数第几行', this.findErrData.index)
        } else {
          errSizeIndex = parseFloat(pageSize.toString().split('.')[1])
          this.findErrData.index = parseInt(parseFloat(`0.${errSizeIndex}`) * this.page.page_size) // 对应页面第几行 // 这里的计算有点问题（如果page_size为7的情况）
          // console.log('不为整数的小数部分', `0.${errSizeIndex}`)
          // console.log('不为整数第几行', this.findErrData.index)
        }
      } else {
        this.findErrData.page_size = 1
        this.findErrData.index = row // 对应页面第几行
      }
      this.pageChange(this.findErrData.page_size)
      // console.log('对应第几页', this.findErrData.page_size)
      // console.log('页码对应index', this.findErrData.index)
    },
    proErr () { // 上一条
      this.errIndex -= 1
      if (this.errIndex <= 0) {
        this.errIndex = 0
      }
      this.initChouseErr(this.errData[this.errIndex])
    },
    nextErr () { // 下一条
      this.errIndex += 1
      if (this.errIndex > this.errData.length - 1) {
        this.errIndex = this.errData.length - 1
      }
      this.initChouseErr(this.errData[this.errIndex])
    },
    // chouseFiles () { // 点击选择文件
    //   console.log('点击按钮')
    //   // let file = document.getSelection('#file')
    //   // let chouseFileBtn = document.getSelection('#chouseFileBtn')
    //   // console.log(chouseFileBtn)
    //   // chouseFileBtn.onclick = function(e) {
    //   //   console.log(1111)
    //   // }
    // },
    initExcel (data) {
      // console.log(data)
      // console.log(data.target)
      // console.log(data.target.files)
      // console.log(data.target.files[0].path) // 路径
      // console.log(data.target.files[0].name) // 文件名字
      // console.log(data.target.files[0].type) // 类型
      let path = data.target.files[0].path
      // 读取文件
      let workBook = xlsx.parse(path)[0]
      console.log(workBook) // 返回的是数组（每个数组就是文件中的文件簿sheet）
      /*
       1、workBook:{
         data: [], // sheet对应的数据，包含表头
         name: '', // 对应的sheet的文件名称
       }
      */
      this.rowData = [] // 在页面中显示的数据
      workBook.data.forEach((val, i) => { // 获得每行的数据
        let obj = {}
        val.forEach((data, j) => { // 获得单个的数据
          obj[this.rowName[j]] = data.toString().replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, '')
        })
        this.rowData.push(obj)
      })
      this.rowData.splice(0, 1) // 数据
      this.page.total = this.rowData.length
      this.initShowPage() // 处理页面加载显示数据
      this.initChouseErr(this.errData[this.errIndex])
    },
    pageChange (data) { // 分页的切换
      this.page.current_page = data // 当前是第几页
      this.initShowPage()
      if (this.page.current_page !== this.findErrData.page_size) { // 点击的分页和错误计算的分页不同的时候页码样式的变化，
        this.isErrDataPage = false
      } else {
        this.isErrDataPage = true
      }
      // console.log(this.page.page_size)
    },
    pageSizeChange (data) { // 每页显示条数调整
      // console.log(data)
      this.page.page_size = data
      this.initShowPage()
      this.errIndex = 0
      this.initChouseErr(this.errData[this.errIndex])
    },
    initShowPage () { // 处理数据显示条数
      let start = (this.page.current_page - 1) * this.page.page_size // 当前页数*每页显示条数
      let end = (this.page.current_page) * this.page.page_size // 当前页数*每页显示条数
      this.rowNewData = this.rowData.slice(start, end)
      // console.log('读取的所有数据', this.rowData)
      // console.log('页面中显示数据', this.initRow)
      // console.log('显示的标题', this.titleData)
    },

  },
}
</script>
<style lang="less" scoped>
@import (reference) '~assets/less/variable.less';
.read-local-data {
  .title-ul { // 表头
    li {
      outline: 1px solid red;
      text-align: center;
      div {
        line-height: @num30;
        height: @num30;
      }
    }
  }
  .errActive {
    background-color: lightblue;
  }
  .findErrActive {
    background-color: green;
  }
  .up-btn {
    display: inline-block;
    position: relative;
    height: @buttonH;
    overflow: hidden;
    min-width: @buttonMinWidth;
    outline: 1px solid red;
    input#file {
      cursor: pointer;
      height: @buttonH;
      overflow: hidden;
      min-width: @buttonMinWidth;
      position: absolute;
      top: 0;
      left: 0;
      // opacity: 0;
    }
  }
}
</style>
