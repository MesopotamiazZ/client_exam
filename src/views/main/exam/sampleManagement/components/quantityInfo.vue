<template>
  <div class="quantityInfoContainer">
    <div class="top">
      <Input class="input" placeholder="请输入体检号/姓名" v-model="filterText" @on-change="filter"/>
      <img class="icon" src="/static/icons/public/search.png" />
    </div>
    <div class="table1">
      <titletHasSlot slot="header" class="header" >
        <span slot="titletHasSlotLeftTitle"><span>待主检<span style="color: #2B9DF3">({{waitingData.length}})</span></span></span>
      </titletHasSlot>
      <div class="tableBox">
        <itable
          tableName="table1"
          ref="table1"
          :columns="waiting.cols"
          :data="waiting.data"
          @on-select="doSelect"
          :maxHeight="waiting.height"
        ></itable>
      </div>
    </div>
    <div class="table2">
      <titletHasSlot slot="header" class="header" >
        <span slot="titletHasSlotLeftTitle"><span>已主检<span style="color: #2B9DF3">({{finishedData.length}})</span></span></span>
      </titletHasSlot>
      <div class="tableBox">
        <itable
          tableName="table2"
          ref="table2"
          :columns="finished.cols"
          :data="finished.data"
          @on-select="doSelect"
          :maxHeight="finished.height"
        ></itable>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'
import itable from '@/components/itable'
export default {
  name: 'quantityInfoContainer',
  components: {
    titletHasSlot,
    itable,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    maxLineNum: Number,
  },
  data() {
    return {
      filterText: '',
      waiting: {
        height: null,
        cols: [
          {
            name: '序号',
            width: 50,
            render: (h, param, ctx) => {
              if (param.row.is_lock) {
                return h('img', {
                  attrs: {
                    src: param.row.lock_staff_id === ctx.parent.$parent.userInfo.id ? '/static/icons/public/lock2.svg' : '/static/icons/public/lock1.svg',
                  },
                })
              } else {
                return h('span', {
                  style: param.row.rejectedMark && {
                    color: '#F29121',
                  },
                }, param.index + 1)
              }
            },
          },
          {
            name: '体检号',
            key: 'pe_sn',
            width: 129,
            render: (h, param, ctx) => {
              return h('span', {
                style: param.row.rejectedMark && {
                  color: '#F29121',
                },
              }, param.row.rejectedMark && [
                h('span', {
                  style: {
                    background: 'url(/static/icons/public/sendBack.svg) no-repeat left center',
                    display: 'inline-block',
                    width: '18px',
                    height: '16px',
                    'margin-left': '-18px',
                    'vertical-align': 'middle',
                  },
                }),
                h('span', {
                  style: {
                    'vertical-align': 'middle',
                  },
                }, param.value),
              ] || param.value)
            },
          },
          {
            name: '姓名',
            key: 'userName',
            width: 100,
            render: (h, param, ctx) => {
              return h('span', {
                style: param.row.rejectedMark && {
                  color: '#F29121',
                },
              }, param.value)
            },
          },
        ],
        data: [],
      },
      finished: {
        height: null,
        cols: [
          {
            name: '序号',
            width: 50,
            render: (h, param, ctx) => {
              return h('span', {
                style: param.row.rejectedMark && {
                  color: '#F29121',
                },
              }, param.index + 1)
            },
          },
          {
            name: '体检号',
            key: 'pe_sn',
            width: 129,
            render: (h, param, ctx) => {
              return h('span', {
                style: param.row.rejectedMark && {
                  color: '#F29121',
                },
              }, param.row.rejectedMark && [
                h('span', {
                  style: {
                    background: 'url(/static/icons/public/sendBack.svg) no-repeat left center',
                    display: 'inline-block',
                    width: '18px',
                    height: '16px',
                    'margin-left': '-18px',
                    'vertical-align': 'middle',
                  },
                }),
                h('span', {
                  style: {
                    'vertical-align': 'middle',
                  },
                }, param.value),
              ] || param.value)
            },
          },
          {
            name: '姓名',
            key: 'userName',
            width: 100,
            render: (h, param, ctx) => {
              return h('span', {
                style: param.row.rejectedMark && {
                  color: '#F29121',
                },
              }, param.value)
            },
          },
        ],
        data: [],
      },
      waitingData: [
        // rejectedMark 退回标记
        { pe_sn: '123', userName: '张三', is_lock: false, lock_staff_id: null, rejectedMark: false },
        { pe_sn: '223', userName: '李四', is_lock: false, lock_staff_id: null, rejectedMark: false },
        { pe_sn: '323', userName: '陈五', is_lock: true, lock_staff_id: 1000, rejectedMark: true },
        { pe_sn: '423', userName: '刘六', is_lock: true, lock_staff_id: 1001, rejectedMark: false },
        { pe_sn: '523', userName: '杨七', is_lock: true, lock_staff_id: 1002, rejectedMark: true },
        { pe_sn: '623', userName: '王八', is_lock: false, lock_staff_id: null, rejectedMark: false },
        { pe_sn: '723', userName: '彭九', is_lock: false, lock_staff_id: null, rejectedMark: false },
      ],
      finishedData: [
        { pe_sn: '123', userName: '张三', rejectedMark: false },
        { pe_sn: '223', userName: '李四', rejectedMark: true },
        { pe_sn: '323', userName: '陈五', rejectedMark: false },
        { pe_sn: '423', userName: '刘六', rejectedMark: false },
        { pe_sn: '523', userName: '杨七', rejectedMark: false },
        { pe_sn: '623', userName: '王八', rejectedMark: false },
        { pe_sn: '723', userName: '彭九', rejectedMark: false },
      ],
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  created() {
    this.filter()
  },
  methods: {
    filter() {
      let ft = this.filterText.trim()
//      console.log('-=-=', ft)
      let w = this.waitingData.filter((item) => {
        try {
          return item.pe_sn.indexOf(ft) === 0 || item.userName.indexOf(ft) >= 0
        } catch (e) { /**/ }
      })
      let f = this.finishedData.filter((item) => {
        try {
          return item.pe_sn.indexOf(ft) === 0 || item.userName.indexOf(ft) >= 0
        } catch (e) { /* */ }
      })
      this.waiting.data = w
      this.finished.data = f
    },
    doSelect(row) {
      this.$emit('on-select', row.pe_sn)
    },
    refreshHeight() {
      if (this.maxLineNum > this.waiting.data.length + this.finished.data.length) {
        this.waiting.height = null
        this.finished.height = null
      }
      let finishedNum = Math.ceil(this.maxLineNum / 2) - 1
      let waitingNum = this.maxLineNum - finishedNum
      this.waiting.height = waitingNum * 40
      this.finished.height = finishedNum * 40
//      console.log(this.maxLineNum, this.waiting.height, this.finished.height)
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.$refs.table1.posters.scrollBar++
        this.$refs.table2.posters.scrollBar++
      }
    },
    maxLineNum(val) {
      this.refreshHeight()
    },
  },
  mounted() {
    this.refreshHeight()

//    window.addEventListener('click', () => {
//      this.$refs.table2.posters.scrollBar++
//    })
  },
}
</script>
<style lang="less" scoped>
  .quantityInfoContainer{
    width: 278px;
    /*max-height: calc(~'100% - 100px');*/
    height: 100%;
    background: white;
    .top{
      padding: 10px 20px;
      border-bottom: 1px solid #ddd;
      position: relative;
      z-index: 0;
      .icon{
        position: absolute;
        right: 30px;
        width: 14px;
        height: 14px;
        margin: auto;
        top: 0;
        bottom: 0;
        z-index: -1;
      }
    }
    .tableBox{
      width: 280px;
      margin-left: -1px;
      /*height: calc(~'100% - 50px')*/
    }
    .table1{
      /*height: calc(~'50% + 15px');*/
      /*max-height: 330px;*/
    }
    .table2{
      /*height: calc(~'50% - 65px');*/
      /*max-height: 330px;*/
    }
  }
</style>
<style lang="less">
  .quantityInfoContainer .top{
    .input, .input *{
      background-color: transparent;
    }
  }
</style>
