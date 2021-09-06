<template>
  <div class="phoneHeader">
    <div name='phoneHeader' class="flex">
      <span class="">{{ headerText }}</span>
      <Select  class="fl flx1" v-model="modelPhone" filterable>
            <Option v-for="item in dataList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
export default {
  props: ['headerText'],
  data() {
    return {
      modelPhone: '',
      dataList: [
        // 体检类别
        {
          value: 'New York',
          label: 'New York',
        },
        {
          value: 'London',
          label: 'London',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
@import (reference) "~assets/less/color.less";
.phoneHeader {
  line-height: @num30;
  & > div {
    & > span {
      margin-right: @num10;
      color: @gradeAshOne;
    }
  }
}
</style>
