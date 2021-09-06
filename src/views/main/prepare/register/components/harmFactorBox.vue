/** 
* @author wzd
* @date 2018/03/12
* @content harmFactorBox 职业危害因素
*/ 
<template>
  <div class="harmFactorBox contentBg">
    <title-has-slot>
      <span slot="titletHasSlotLeftTitle">{{ headerText }}</span>
      <div slot="titletHasSlotRightContent"
           class="title-form">
        <slot name="title-form-slot"></slot>
      </div>
    </title-has-slot>
    <i class="editPen" @click="editHarmFactor"></i>
    <Table :columns="columns"
           :data="data"
           stripe></Table>
    
  </div>
</template>
<script>
export default {
  name: 'harmFactorTable',
  components: {
  },
  props: {
    headerText: {
      type: String,
      default: '职业病危害因素',
    },
    columns: {
      type: Array,
      default: () => {
        return [
          {
            title: '职业病危害因素名称',
            key: 'name',
          },
          {
            title: '职业健康检查种类',
            key: 'checkCate',
            width: 180,
          },
        ]
      },
    },
    data: [
      {
        type: Array,
        default: () => {
          return [
            {
              name: '添加危害因素',
              checkCate: '选择在岗状态',
            },
          ]
        },
      },
    ],
  },
  data() {
    return {
      harmData: [], // 职业危害因素数据,默认是空数组
      selectedHarmData: [], // 选中的危害因素
    }
  },
  methods: {
    editHarmFactor () {
      this.$emit('edit-harm-factor')
    },
  },
  computed: {
    // data() {
    //   return this.harmData.push({
    //     harmFactorName: '添加职业危害因素',
    //     checkType: '选择在岗状态',
    //   })
    // },
  },
  watch: {
    // data: {
    //   handler(newVal) {
    //     console.log(newVal)
    //   },
    //   deep: true,
    // },
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.harmFactorBox {
  position: relative;
  .editPen {
    display: inline-block;
    width: 15px;
    height: 15px;
    font-size: @font12;
    background: url('/static/icons/public/editPen.svg') no-repeat;
    position: absolute;
    right: 12px;
    top: 17px;
    cursor: pointer;
  }
}
</style>


