  /**
   * 标签选择器
   * @author 张祥
   * @date 2017/11/27
   */
<template>
  <div class="tag-selector">
    <div class="left fl">
      <div class="tag-flow">
        <div class="tag" v-for="(tag,index) in targetData" :key="tag.id" @click="add(tag)">
          <span>{{tag}}</span>
          <Icon type="ios-close" class="close" @click.native="remove(index,tag)"></Icon>
        </div>
        <Icon type="ios-plus-empty" class="add" @click.native="add()"></Icon>
      </div>
    </div>
    <div class="right fl">
      <div class="header">
        <Input icon="ios-search" v-model="keyword" placeholder="项目搜索" style="width: 100%"></Input>
      </div>
      <div class="tag-flow">
        <template v-for="(tag,index) in sourceData">
          <div v-if="filter(tag)" class="tag" :class="{active:temp.indexOf(index)!==-1}" :key="tag.id" @click="select(index,tag)">
            <span>{{tag}}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tag-selector',
    props: {
      sourceData: {
        type: Array,
      },
    },
    data() {
      return {
        targetData: [], // 放置所有被选择的标签的数组
        temp: [], // 记录被选中的标签的索引的临时数组
        keyword: '', // 搜索关键字
      }
    },
    methods: {
      select(index, tag) {
        this.temp.push(index) // 将选择的标签的索引push到临时数组中
      },
      add(tag) {
        this.temp.sort() // 先对temp排序，防止删除出错
        // 将选择的标签push到左侧
        for (let i = 0; i < this.temp.length; i++) {
          const mIndex = this.temp[i]
          this.targetData.push(this.sourceData[mIndex])
        }
        // 从右侧删除选择的标签，从后往前删，防止删除出错
        for (let i = this.temp.length - 1; i >= 0; i--) {
          const mIndex = this.temp[i]
          this.sourceData.splice(mIndex, 1)
        }
        this.temp = [] // 清空临时数组
      },
      remove(index, tag) {
        this.sourceData.push(tag) // 将移除的标签放回源数据中
        this.targetData.splice(index, 1) // 移除标签
      },
      filter(tag) {
        if (this.keyword === '') {
          return true
        }
        if (tag.indexOf(this.keyword) !== -1) {
          return true
        }
        return false
      },
      getSelectData() {
        this.$emit('getSelectData', this.targetData)
      },
    },
    watch: {
      targetData() {
        this.getSelectData()
      },
    },
  }
</script>
<style lang="less" scoped>
  @import (reference) '~assets/less/variable.less';

  .tag-selector {
    display: flex;
    height: 160px;
    padding: 10px;

    .left {
      position: relative;
      margin-right: 10px;
      flex: 1;

      ::-webkit-scrollbar {
        display: none;
      }

      .tag-flow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 8px;
        overflow: auto;
      }

      .tag {
        position: relative;
      }

      .close {
        display: none;
        position: absolute;
        right: -7px;
        top: -8px;
        font-size: 16px;
        color: #008cee;
      }

      .tag:hover .close {
        display: block;
      }

      .add {
        float: left;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        color: #008cee;
        border: 1px dashed #008cee;
      }
    }

    .right {
      position: relative;
      flex: 1;
      margin-left: 10px;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      .header {
        position: absolute;
        width: 100%;
        height: 46px;
        top: 0;
        padding: 8px 20px;
      }

      .tag-flow {
        position: absolute;
        top: 46px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        padding-left: 10px;
      }
    }

    .tag {
      float: left;
      height: 30px;
      min-width: 74px;
      text-align: center;
      line-height: 30px;
      margin-right: 10px;
      margin-bottom: 8px;
      padding-left: 12px;
      padding-right: 12px;
      border: 1px solid #cccccc;
      cursor: pointer;
    }

    .active,
    .tag:hover {
      color: #008cee;
      border-color: #008cee;
    }
  }
</style>
