/** 
* @author 覃凤
* @date 2018/2/26
* @content 体检预约-前台预约-套餐内项目（显示）
* listData：传入的数据
*/
<template>
  <div class="show-project-list">
    <alert-header-for-modal headerText='套餐内项目'></alert-header-for-modal>
    <ul>
      <li class="list-header line">项目名称</li>
      <li class="list-content">
        <template v-if="data.length">
          <div class="line" v-for='(item,index) in data' :key="index">
            {{ item.name }}
          </div>
        </template>
        <div v-else class="line">
          暂无数据
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'show-project-list',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data () {
    return {
      msg: '套餐内项目',
    }
  },
}
</script>
<style lang="less" scoped>
@import "~assets/less/variable.less";
.show-project-list {
  &>ul {
    height: calc(~'100% - 40px');
    text-align: center;
    font-size: 12px;
    .line {
      height: 40px;
      line-height: 40px;
      padding: 0 @num10;
    }
    .list-header {
      background-color: @tableTh;
      color: @gradeAshOne;
    }
    .list-content {
      height: calc(~'100% - 40px');
      overflow: auto;
      color: @gradeAshTwo;
      div:nth-of-type(2n) {
        background-color: @tableTr;
      }
    }
  }
}
</style>
