<template>
  <div>
    <Button @click="setData(data)">点击</Button>
    <Button @click="print(data)">打印</Button>
    <ZButton @click="clickccc()">自定义按钮</ZButton>
    <titletHasSlot>
      <span slot='titletHasSlotLeftTitle'>测测测测</span>
      <div slot='titletHasSlotRightContent'>
         <ZButton disabled class="fl marginR20" @click="clickccc()">新 增</ZButton>
         <ZButton class="fl marginR20" @click="clickccc()">自定义按钮</ZButton>
         <ZButtonHasBg class="fl" @click='testClicl1()'>点点得得点</ZButtonHasBg>
      </div>

    </titletHasSlot>
    <div style="width:300px;height:300px">11111111111111111111
<!-- <VueImgInputeraaaa ref='VueImgInputeraaaa'></VueImgInputeraaaa>  -->
</div>
<button @click='open'>111</button>
    <handsontable @addRow="addRow" :addBtn='true' @editCell="editCell" @deSelect="deSelect" @selectRow="selectRow" @editRow="editRow" @deleteRow="deleteRow" :data="data" :colHeaders="colHeaders" :columns="columns" :width="0" :height="550" style="text-align:center"></handsontable>
  </div>
</template>
<script>
import handsontable from '@/components/table/handsontable'
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import titletHasSlot from '@/components/titleHasSlot'
import { aRenderer } from '@/service/renderer'
// import VueImgInputeraaaa from './VueImgInputer'

export default {
  name: 'instrumentManagement',
  data () {
    return {
      addIndex: [],
      data: [
        {id: 1, code: '1827364592', name: '周使用', sex: 0, age: 20, type: '健康体检', state: 1, unit: '中国人寿集团', registerDate: 1500000000, img: 'http://www.baidu.com'},
        {id: 2, code: '1827364593', name: '根喵', sex: 1, age: 22, type: '肠镜', state: 0, unit: '中国人寿集团', registerDate: 2500000000, img: 'http://www.baidu.com'},
        {id: 3, code: '1827364592', name: '周使用', sex: 0, age: 20, type: '健康体检', state: 1, unit: '中国人寿集团', registerDate: 1500000000, img: 'http://www.baidu.com'},
        {id: 4, code: '1827364593', name: '根喵', sex: 1, age: 22, type: '肠镜', state: 0, unit: '中国人寿集团', registerDate: 2500000000, img: 'http://www.baidu.com'},
        {id: 5, code: '1827364592', name: '周使用', sex: 0, age: 20, type: '健康体检', state: 1, unit: '中国人寿集团', registerDate: 1500000000, img: 'http://www.baidu.com'},
        {id: 6, code: '1827364593', name: '根喵', sex: 1, age: 22, type: '肠镜', state: 0, unit: '中国人寿集团', registerDate: 2500000000, img: 'http://www.baidu.com'},
        {id: 7, code: '1827364592', name: '周使用', sex: 0, age: 20, type: '健康体检', state: 1, unit: '中国人寿集团', registerDate: 1500000000, img: 'http://www.baidu.com'},
        {id: 8, code: '1827364593', name: '根喵', sex: 1, age: 22, type: '肠镜', state: 0, unit: '中国人寿集团', registerDate: 2500000000, img: 'http://www.baidu.com'},
        {id: 9, code: '1827364592', name: '周使用', sex: 0, age: 20, type: '健康体检', state: 1, unit: '中国人寿集团', registerDate: 1500000000, img: 'http://www.baidu.com'},
        {id: 10, code: '1827364593', name: '根喵', sex: 1, age: 22, type: '肠镜', state: 0, unit: '中国人寿集团', registerDate: 2500000000, img: 'http://www.baidu.com'},
        {id: 11, code: '1827364592', name: '周使用', sex: 0, age: 20, type: '健康体检', state: 1, unit: '中国人寿集团', registerDate: 1500000000, img: 'http://www.baidu.com'},
        {id: 12, code: '1827364593', name: '根喵', sex: 1, age: 22, type: '肠镜', state: 0, unit: '中国人寿集团', registerDate: 2500000000, img: 'http://www.baidu.com'},
        {id: 13, code: '1827364592', name: '周使用', sex: 0, age: 20, type: '健康体检', state: 1, unit: '中国人寿集团', registerDate: 1500000000, img: 'http://www.baidu.com'},
        {id: 14, code: '1827364593', name: '根喵', sex: 1, age: 22, type: '肠镜', state: 0, unit: '中国人寿集团', registerDate: 2500000000, img: 'http://www.baidu.com'},
        {id: 15, code: '1827364592', name: '周使用', sex: 0, age: 20, type: '健康体检', state: 1, unit: '中国人寿集团', registerDate: 1500000000, img: 'http://www.baidu.com'},
        {id: 16, code: '1827364593', name: '根喵', sex: 1, age: 22, type: '肠镜', state: 0, unit: '中国人寿集团', registerDate: 2500000000, img: 'http://www.baidu.com'},
      ],
      colHeaders: ['', '体检号', '姓名', '性别', '年龄', '体检类别', '主检状态', '单位名称', '登记日期', '科室小结'],
      columns: [
        {
          data: 'index',
          renderer: function (instance, td, row, col, prop, value, cellProperties) {
            td.className += ' htCenter htMiddle'
            td.innerHTML = row + 1
          },
          className: 'htCenter htMiddle',
          readOnly: true,
          width: 30,
        },
        {data: 'code', renderer: 'html', className: 'htCenter htMiddle', readOnly: false, width: 100, bbb: false},
        {data: 'name', renderer: 'html', className: 'htCenter htMiddle', width: 100},
        {data: 'sex', renderer: function (instance, td, row, col, prop, value, cellProperties) { td.innerHTML = value === 1 ? '男' : '女'; td.className += ' htCenter htMiddle' }},
        {data: 'age', renderer: 'html', className: 'htCenter htMiddle'},
        {data: 'type', renderer: 'html', className: 'htCenter htMiddle'},
        {data: 'state', renderer: 'html', className: 'htCenter htMiddle'},
        {data: 'unit', renderer: 'html', className: 'htCenter htMiddle'},
        {data: 'registerDate', renderer: 'html', className: 'htCenter htMiddle'},
        {data: 'img', renderer: aRenderer, className: 'htCenter htMiddle', readOnly: true},
      ],
      model: {
        complainVoucher: [],
        id: '1',
      },
    }
  },
  components: {
    handsontable,
    ZButton,
    titletHasSlot,
    ZButtonHasBg,
    // VueImgInputeraaaa,
  },
  methods: {
    open() {
      // this.$refs.VueImgInputeraaaa.handleFileChange()
    },
    clickccc () {
      console.log('点击')
    },
    testClicl1 () {
      console.log('点击有背景颜色的按钮')
    },
    editCell(data) {
      console.log('编辑单元格', data)
    },
    editRow(data) {
      console.log('编辑', data)
    },
    deleteRow(data) {
      this.data = this.data.filter((item) => {
        return data.id !== item.id
      })
    },
    setData (data) {
      this.data.reverse()
    },
    print () {
      print()
    },
    selectRow (row, data) {
      console.log('选中', data)
    },
    deSelect () {
      console.log('取消选择')
    },
    addRow (data) {
       // this.data.push(data)
      this.addIndex = data
      console.log(this.data, data, 'data')
    },
  },
}
</script>
<style>
</style>