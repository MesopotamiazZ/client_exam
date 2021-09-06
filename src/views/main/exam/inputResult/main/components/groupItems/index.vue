<template>
  <div class="group-items-wrapper">
     <!-- <div class="compound-header">组合项目:妇科, 弃检, 读入数据, 影像导入, <span @click="show = !show">展开</span></div> -->

    <div class="group-items-header">
      <div class="fl group-items-left font16">
        <span>组合项目：{{groupItemsName}}</span>
        <Checkbox class="marginL20">弃检</Checkbox>
      </div>
      <div class="fr group-items-right">
        <Button disabled class="fl1 marginR10 ghost-button" >数据导入</Button>
        <Button class="fl1 marginR10 ghost-button" >影像导入</Button>
        <div class="icon-show marginR20" @click="show = !show">
          <Icon :type="show ? 'arrow-up-b' : 'arrow-down-b'" size="8" color="white" class="arr-icon"></Icon>
        </div>
      </div>
      <div style="clear:both;"></div>
    </div>
    <!-- 分割线 -->
    <div class="seperate-line" v-if="show"></div>
    <!-- body信息  -->
    <div class="group-items-body" v-show="show" v-if = "type==='normal'">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <div class="group-items-body" v-show="show" v-if = "type==='listenTest'">
      电测听
    </div>
    <div class="group-items-body" v-show="show" v-if = "type==='chestRadiography'">
      胸片
    </div>
  </div>
</template>
<script>
  import QTable from '@/components/qtable'
  import ZButton from '@/components/button/ZButton'
  export default {
    components: {
      QTable,
      ZButton,
    },
    props: {
      // 组合项目表格的内容
      data: {
        type: Array,
        default() {
          return []
        },
      },
      // 组合项目类型
      type: {
        type: String,
        default: 'normal', // normal - 普通, chestRadiography - 胸片, listenTest - 电测听
      },
      // 组合项目名字
      groupItemsName: {
        type: String,
        require: true,
      },
    },
    data() {
      return {
        show: true,
        columns1: [
          {
            title: 'Name',
            key: 'name',
          },
          {
            title: 'Age',
            key: 'age',
          },
          {
            title: 'Address',
            key: 'address',
          },
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01',
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02',
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
          },
        ],
      }
    },
  }
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';

.group-items-wrapper {
  margin: 10px;
  border: 1px solid @gradeAshFive;
  border-radius: 8px;
  .group-items-header {
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    .group-items-left {
      color: @gradeAshOne;
      letter-spacing: 0.04px;
      &::before{
        content: '';
        margin-top: -4px;
        display: inline-block;
        margin-right: 6px;
        margin-left: @num20;
        width: 4px;
        height: 18px;
        vertical-align: middle;
        background-color: @gradeBlueOne;
      }
    }
    .group-items-right{
      .icon-show {
        width: 20px;
        height: 20px;
        background: #008cee;
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        margin-top: -2px;
        vertical-align: middle;
        position: relative;
        cursor: pointer;
        .arr-icon {
          position: absolute; 
          top: 4px; 
          right: 6px;
        }
      }
    }
  }
  .ghost-button {
    border-color: #34A3F1;
    color: #249CF0;
  }
  .seperate-line {
    height: 1px;
    background: @gradeAshFive;
  }
  .group-items-body {
    
  }
}
</style>

