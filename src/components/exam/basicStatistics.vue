<template>
  <div class="basicStatisticsBox">
    <!--<span v-for="(item, index) in itemData" class="item"><label>{{item.label}}</label><span>{{getInfo(item.name)}}</span><span v-if="item.suffix" v-html="item.suffix"></span></span>-->
    <span class="item department" v-if="department"><label>当前科室</label><span>{{Department}}</span></span>
    <span class="item departmentWaiting" v-if="departmentWaiting" ><label>科室侯检人数</label><span>{{DepartmentWaiting}}人</span></span>
    <span class="item waiting" v-if="waiting" ><label>待检查</label><span>{{Waiting}}人</span></span>
    <span class="item processing" v-if="processing" ><label>检查中</label><span>{{Processing}}人</span></span>
    <span v-if="forConfirm || afterConfirm || afterCheckup" class="examinationCompleted" @click="expand_click">
      <span class="item forConfirm" v-if="forConfirm" ><label>待主检</label><span>{{ForConfirm}}人</span></span>
      <span class="item afterConfirm" v-if="afterConfirm" ><label>已主检</label><span>{{AfterConfirm}}人</span></span>
      <span class="item afterCheckup" v-if="afterCheckup" ><label>已审核</label><span>{{AfterCheckup}}人</span></span>
      <img :src="expand ? '/static/icons/public/green_triangle_up.png' : '/static/icons/public/green_triangle_down.png'" class="arrow" />
    </span>
  </div>
</template>
<script>
export default {
  name: 'basic-statistics',
  props: {
    // items: {
    //   type: Array,
    //   default: [],    // [{name 数据项名称, label 页面展示的标签, emit 点击发送的事件名, suffix 后缀html, css}]
    // },
    department: Boolean,
    departmentWaiting: Boolean,
    waiting: Boolean,
    processing: Boolean,
    forConfirm: Boolean,
    afterConfirm: Boolean,
    afterCheckup: Boolean,
    spreaded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      itemData: null,
      expand: false,
    }
  },
  created() {
    // this.itemData = this.items.slice()
    this.expand = this.spreaded
  },
  watch: {
    // items(val) {
    //   this.itemData = val.slice()
    // },
    spreaded(val) {
      this.expand = val
    },
//    expand(val) {
//      this.$emit('expand-change', val)
//    },
  },
  computed: {
    Department () {
      return '主检工作台'
    },
    DepartmentWaiting () {
      return 22
    },
    Waiting () {
      return 123
    },
    Processing () {
      return 33
    },
    ForConfirm () {
      return 12
    },
    AfterConfirm () {
      return 17
    },
    AfterCheckup () {
      return 222
    },
  },
  methods: {
    expand_click() {
      this.expand = !this.expand
      this.$emit('expand-change', this.expand, event.layerX)
    },
    // getInfo(name) {
    //   switch (name) {
    //   case 'department':
    //     return '主检工作台'
    //   case 'departmentWaiting':
    //     return 22
    //   case 'waiting':
    //     return 123
    //   case 'processing':
    //     return 33
    //   case 'forConfirm':
    //     return 12
    //   case 'afterConfirm':
    //     return 17
    //   case 'afterCheckup':
    //     return 222
    //   }
    // },
  },
}
</script>
<style lang="less" scoped>
.basicStatisticsBox{
  line-height: 30px;
  padding-left: 10px;
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 0;*/
  float: left;
  white-space: nowrap;
  font-size: 0;
  *{
    vertical-align: middle;
  }
  .item{
    display: inline-block;
    padding: 0 8px;
    font-size: 12px;
    label:after{
      content: "：";
    }
  }
  .item.department span{
    font-weight: bold;
    color: black;
  }
  .item span{
    font-weight: normal;
    color: #008CEE;
  }
  .examinationCompleted{
    &, & *{
      cursor: pointer;
    }
    .arrow{
      width: 14px;
      height: 14px;
      -webkit-user-select: none;
      vertical-align: middle;
      margin-top: 1px;
    }
  }
}
</style>
