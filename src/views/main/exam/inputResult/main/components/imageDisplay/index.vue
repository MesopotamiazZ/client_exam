<template>
  <div class= "scorll-images-wrapper"  @mousewheel="onMousewheel">
    <div class="scroll-inner-images-wrapper" :style="setWidth(data)">
      <image-item 
        v-for="(item, index) in data" 
        @single-relation="singleRelation" 
        :data="item" 
        :key="index"></image-item>
    </div>
  </div>
</template>
<script>
  import ImageItem from './imageItem'
  export default {
    components: {
      ImageItem,
    },
    props: {
  
    },
    data() {
      return {
        data: [
          {
            index: 0,
          },
          {
            index: 1,
          },
          {
            index: 2,
          },
          {
            index: 0,
          },
          {
            index: 4,
          },
          {
            index: 0,
          },
          {
            index: 6,
          },
          {
            index: 7,
          },
          {
            index: 8,
          },
          {
            index: 9,
          },
        ],
      }
    },
    methods: {
      onMousewheel (e) {
        e.stopPropagation()
        e.preventDefault()
        let el = e.currentTarget
        if (e.wheelDelta < 0) {
          el.scrollLeft += 30
        } else {
          el.scrollLeft -= 30
        }
      },
      setWidth(data) {
        let width
        if (data) {
          width = data.length * 200 + 20 * (data.length - 1)
        }
        return {width: width ? `${width}px` : '2000px'}
      },
      // 单项关联
      singleRelation(data) {
        this.$emit('single-relation', data)
      },
    },
  }
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.scorll-images-wrapper {
  // width: 800px;
  height: px;
  overflow-x: auto;
  .scroll-inner-images-wrapper{
    // width: 2000px;
    .image-item {
      width: 200px;
      display: inline-block;
      margin-right: 20px;
      overflow: hidden;
      padding: 2px;
      &:hover{
        padding: 0;
        border: 2px solid @gradeBlueTwo;
      }
      .description {
        height: 40px;
        line-height: 40px;
        background: @gradeBlueFive;
        text-align: center;
      }
      .single-relation {
        height: 40px;
        line-height: 40px;
        background: @gradeBlueFive;
        text-align: center;
        color: @gradeBlueTwo;
        &:hover {
          cursor: pointer;
        }
      }
      .inspect-image {
        width: 200px;
        height: 160px;
      }
    }
    .image-item:last-child{
      margin-right: 0;
    }
  }
}
</style>

