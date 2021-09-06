<template>
  <div class="containers contentBg">
    <div class="left">
    <span class="tname">当前科室：</span>
    <span>{{department}}</span>
    <div class="personNumWrapper"  @click="showOperation=true">
    <span class="tname">科室候检人数：</span>
    <span class="marginR10">{{num+'人'}}</span>

      <div class="icon-down" ref="iconDown">
      <Icon type="arrow-down-b" size="2" color="#ffffff"></Icon>
      <!-- <icon class="fa caret-down"></icon> -->
      </div>
    </div>
    

      <!-- 弹出内容 -->
      <div class="table border1D9 contentBg"  v-if="showOperation">
        <div class="tableHeader paddingL15">
            <i></i>
            <span>待检人员</span>
            <span class="waitItemNum">({{num}})</span>
        </div>
        <i-table height="284" border stripe  :columns="waitP.col" :data="waitP.lists"></i-table>
      </div>
    </div>

    <div class="connected">
      <span>当前电脑连接仪器：</span>
      <div class="connectedI">
        <div class="transitionLeft"></div>

      <Carousel-custom  v-model="scrollVal" autoplay loop :height="30" :dots="carouselConf.dots" :easing="carouselConf.easing" :radius-dot="carouselConf.radiusDot" :arrow="carouselConf.arrow" :autoplay-speed="carouselConf.autoplaySpeed">
        <CarouselItem v-for="(item,index) in connect" key="index" class="item">
          <!-- <div class="item"> -->
          <span>{{item.name}}</span>
          <i class=" btn connectOK" v-show="item.state"></i>
          <i class="btn connectErr" v-show="!item.state"></i>
          <!-- </div> -->
        </CarouselItem>
    </Carousel-custom>
    <!-- 分割 -->
        <!-- <div class="scrollCon" :style="{transform:scrollLeftVal}">

          
        <div v-for="(item,index) in connect" key="index" class="item">
          <span>{{item.name}}</span>
          <i class=" btn connectOK" v-show="item.state"></i>
          <i class="btn connectErr" v-show="!item.state"></i>
        </div>
        </div> -->
   
        <div class="transitionRight"></div>
      </div>
    </div>
  </div>
</template>

<script>
// carousel
const CarouselCustom = () => import('./carousel/carousel')

export default {
  name: 'inputResultScrollBar',
  components: {
    CarouselCustom,
  },
  data() {
    return {
      scrollVal: 0,
      carouselConf: {
        autoplay: false,
        autoplaySpeed: 5000,
        dots: 'none',
        radiusDot: false,
        trigger: 'click',
        arrow: 'never',
        easing: 'linear',
      },
      scrollLeftVal: '0,0,0',
      scrollLeft: 0,
      showOperation: false,
      department: '内科',
      num: 31,
      connect: [
        {
          name: '飞科电子伽马刀',
          state: true,
        },
        {
          name: '飞科电子伽马刀',
          state: false,
        },
        {
          name: '飞科电子伽马刀',
          state: true,
        },
        {
          name: '飞科电子伽马刀',
          state: true,
        },
      ],
      waitP: {
        col: [
          {
            type: 'index',
            width: 30,
          },
          {
            title: '待检人员姓名',
            key: 'name',
          },
        ],
        lists: [
          {
            name: '王德全',
          },
          {
            name: '王德',
          },
          {
            name: '王全',
          },
          {
            name: '德全',
          },
          {
            name: '德全',
          },
          {
            name: '德全',
          },
          {
            name: '德全',
          },
          {
            name: '德全8',
          },
        ],
      },
    }
  },
  watch: {
    showOperation(val) {
      if (val === true) {
        this.$refs.iconDown.style.transform = 'rotate(180deg) scale(0.8)'
        document.addEventListener('mouseup', this.hideMenu)
      } else {
        this.$refs.iconDown.style.transform = 'rotate(0) scale(0.8)'
        document.removeEventListener('mouseup', this.hideMenu)
      }
    },
    scrollLeft(val) {
      this.scrollLeftVal = `translate3d(${-val}px,0,0)`
    },
  },
  mounted() {
    // 总宽度为380
    this.scrollFn(160)
  },
  methods: {
    hideMenu() {
      console.log('hideMenu')
      this.showOperation = false
    },
    // todo:交替
    scrollFn(s) {
      const self = this
      // 大约为60帧
      const d = s / 1000
      setInterval(function() {
        self.scrollLeft += d
        // self.scrollLeft = d
      }, 16)
    },
  },
}
</script>

<style lang="less" scoped>
@import "~assets/less/public.less";

.containers {
  width: 100%;
  height: 30px;
  border-radius: 15px;
  font-size: 0;
  // overflow-y: hidden;
  // overflow-x: scroll;
  position: relative;
  display: flex;
  .left {
    display: inline-block;
    height: 30px;
    flex: 1;
    .personNumWrapper {
      cursor: pointer;
      display: inline-block;
    }
  }
  span {
    font-size: 12px;
    line-height: 30px;
    color: #4a4a4a;
  }
  .tname {
    margin-left: 20px;
  }

  .icon-down {
    display: inline-block;
    // margin-top: 8px;
    width: 18px;
    height: 18px;
    line-height: 10px;
    text-align: center;
    background: #83cb54;
    border-radius: 50%;
    position: relative;
    transform: scale(0.8);
    padding-top: 1px;
    i {
      line-height: 18px;
    }
  }

  .connected {
    float: right;
    width: 488px;
    line-height: 30px;
    display: flex;
    height: 30px;
    // .connectedI::-webkit-scrollbar {
    //   display: none;
    // }
    .connectedI {
      width: 380px;
      height: 30px;
      overflow: hidden;
      white-space: nowrap;
      position: relative;

      .transitionLeft {
        width: 80px;
        height: 30px;
        background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0));
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
      }
      .transitionRight {
        width: 80px;
        height: 30px;
        background: linear-gradient(to left, #ffffff, rgba(255, 255, 255, 0));
        position: absolute;
        right: 0;
        top: 0;
      }
      // .scrollCon {
        // position: absolute;
        // display: flex;
        // align-items: center;
         .item {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          vertical-align: top;
          // margin: 0 10px;
          // width: 300px;
          // float: left;
          .btn {
            display: inline-block;
            width: 35px;
            height: 18px;
          }
          .connectOK {
            display: inline-block;
            background: url(/static/icons/public/success_brand.png) no-repeat
              center;
            background-size: contain;
          }
          .connectErr {
            display: inline-block;
            background: url(/static/icons/public/warning_brand.png) no-repeat
              center;
            background-size: contain;
          }
        }
      // }
    }
  }
  .border1D9 {
    border: 1px solid #d9d9d9;
  }

  .table {
    width: 170px;
    height: 324px;
    position: absolute;
    left: 90px;
    top: 45px;
    z-index: 9;
    overflow: hidden;
    .tableHeader {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      color: #000000;
      background: #ffffff;
      & > i {
        display: inline-block;
        width: 2px;
        height: 14px;
        background-color: @gradeBlueOne;
        margin-right: 2px;
      }
      & > span {
        font-size: 15px;
        // font-weight: 500;
      }

      .waitItemNum {
        color: @gradeBlueOne;
        font-size: 12px;
      }
    }
  }
}
</style>
