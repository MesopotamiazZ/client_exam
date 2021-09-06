/** 
* @author wzd
* @date 2018/02/27
* @content 前台登记主页面进度条鼠标移入事件
*/ 
<template>
  <div class="waitingStaff contentBg">
    <title-has-slot class="title-has-slot">
      <span slot="titletHasSlotLeftTitle">候检人员<span class="staffCount">({{data.length}})</span></span>
    </title-has-slot>
    <div class="input-wrapper">
      <localSearchInput @search-key='localSearchKey' style="width: 210px;"></localSearchInput>
    </div>
    <!-- <div class="staff-wrapper"> -->
      <Table :columns="colunms"
           :data="data"
           :stripe='true'
           :height="442">
      </Table>
    <!-- </div> -->
  </div>
</template>
<script>
import localSearchInput from '@/components/localSearchInput'
export default {
  name: 'waitingStaff',
  components: {
    localSearchInput,
  },
  props: {
    colunms: {
      type: Array,
      default: () => {
        return [
          {
            type: 'index',
            title: '序号',
            width: 50,
            align: 'center',
          },
          {
            title: '体检号',
            key: 'examId',
          },
          {
            title: '姓名',
            key: 'name',
            width: 99,
            render: (h, params) => {
              if (params.row.isVip) {
                return h('div', [
                  h('i', {
                    attrs: {
                      class: 'vip',
                    },
                  }),
                  params.row.name,
                ])
              } else {
                return h('div', params.row.name)
              }
            },
          },
        ]
      },
    },
    data: {
      type: Array,
      // default: () => {
      //   return [
      //     {
      //       examId: '0000001',
      //       name: '应号雨',
      //       isVip: true,
      //     },
      //     {
      //       examId: '0000002',
      //       name: '林可',
      //       isVip: false,
      //     },
      //     {
      //       examId: '0000001',
      //       name: '应号雨',
      //       isVip: true,
      //     },
      //     {
      //       examId: '0000002',
      //       name: '林可',
      //       isVip: false,
      //     },
      //   ]
      // },
    },
  },
  data () {
    return {
      // staffCount: '',
    }
  },
  methods: {
    localSearchKey(data) {
      console.log(data)
    },
  },
}
</script>
<style lang="less">
.waitingStaff {
  width: 251px;
  height: 542px;
  overflow: hidden;
  // background: burlywood;
  .title-has-slot {
    border-bottom: 1px solid #D9D9D9;
  }
  .staffCount {
    font-size: 12px;
    color: #008cee;
  }
  .input-wrapper {
    height: 50px;
    line-height: 40px;
    text-align: center;
  }
  // .table-wrapper {
  //   height: 200px;
  //   // width: 251px;
  //   // overflow-y: scroll;
  //   // .ivu-table-wrapper {
  //   //   width: 100%;
  //   // }
  // }
  .vip {
    display: inline-block;
    width: 15px;
    height: 15px;
    font-size: 12px;
    background: url('/static/icons/public/vipYellow.svg') no-repeat;
    position: relative;
    top: 5px;
  }
}
</style>
