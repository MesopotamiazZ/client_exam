/**
* author      : yhy
* cteate      : 2018/01/11 09:22
* description : 面包削
*/
<template>
    <div class="bread" :class="{addThird: showThird}">
        <span class="first-title"
              @click='buttonFirst'>{{firstTitle}}</span>
        <span class="bread"></span>
        <span class="second-title" @click='buttonSecond'>{{secondTitle}}</span>
        <span class="bread" v-if='showThird'></span>
        <span class="third-title">{{thirdTitle}}</span>
    </div>
</template>

<script>
export default {
  name: 'bread',
  props: {
    firstTitle: {
      type: String,
      default: '单位管理',
    },
    secondTitle: {
      type: String,
      default: '单位账户详情',
    },
    thirdTitle: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      showThird: false,
    }
  },
  watch: {
    thirdTitle(val) {
      if (val !== '') {
        this.showThird = true
      }
    },
  },
  methods: {
    buttonFirst() {
      this.$emit('button-first')
    },
    buttonSecond () {
      this.$emit('button-second')
    },
  },
  mounted() {
    if (this.thirdTitle !== '') {
      this.showThird = true
    }
  },
}
</script>

<style lang="less" scoped>
@import '~assets/less/variable.less';
.bread {
  height: 50px;
  .first-title {
    cursor: pointer;
    line-height: 50px;
    font-size: 12px;
    color: @gradeBlueOne;
    letter-spacing: 0.03px;
  }
  .bread {
    display: inline-block;
    width: 5px;
    margin-left: 7.5px;
    margin-right: 7.5px;
    height: 10px;
    background: url(/static/icons/public/bread.svg) no-repeat;
  }
  .second-title {
    line-height: 50px;
    font-size: 16px;
    color: #111111;
    letter-spacing: 0.04px;
  }
  .third-title {
    line-height: 50px;
  }
}
.addThird {
  .second-title {
    font-size: 12px;
    color: @gradeBlueOne;
    // color: @gradeAshThree;
    letter-spacing: 0.03px;
    cursor: pointer;
  }
  .third-title {
    font-size: 16px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
  }
}
</style>

