<template>
  <div class="custom-html">
    <!-- 根据用户要求进行横竖打印 -->
    <button @click="formatData(ueditorStoreData)">click</button>
     <button @click="lengthwisePrint">竖着打印</button>
      <button @click="acrossPrint">横着打印</button>
    <div class="content" ref="content">
          <div  :class="{'content-div-lengthwise':contentSizeLengthwise,'content-div-across':!contentSizeLengthwise}" :style="{height:contentSize.height+'px',width:contentSize.width+'px',marginTop:marginTop}" v-html="dataA"></div>
    </div>
    <!-- <div class="content-div" v-html="dataA"></div> -->
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'ueditorTestHtml',
  computed: {
    ...mapState('ueditorStoreModule', ['ueditorStoreData']),
    ...mapState(['windowHeight']),
  },
  data() {
    // 替换变量
    return {
      variable: {
        name: '鲁智深',
        age: '998',
        com: 'zzz电子',
        sex: '男',
        year: '18',
      },
      dataA: '',
      contentSize: {
        height: 100,
        width: 100,
      },
      contentSizeLengthwise: true,
      marginTop: 'auto',
    }
  },
  mounted() {
    this.lengthwisePrint()
    /* console.log(this.ueditorStoreData) */
  },
  methods: {
    lengthwisePrint() {
      this.contentSizeLengthwise = true
      let size = parseInt(window.getComputedStyle(this.$refs.content).height)
      this.contentSize.height = size
      this.contentSize.width = parseInt(size / 1.41)
      this.marginTop = 'auto'
    },
    acrossPrint() {
      this.contentSizeLengthwise = false
      let size = parseInt(window.getComputedStyle(this.$refs.content).height)
      this.contentSize.height = parseInt(size / 1.41)
      this.contentSize.width = size
      this.marginTop = parseInt((size - size / 1.41) / 2) + 'px'
      /* this.contentSize.width = size */
      /* this.contentSize.height = parseInt(size / 1.41) */
    },
    getData() {
      // vuex
    },
    formatData(data) {
      console.log(this.$refs.content)
      /* console.log(data) */
      let that = this
      for (let key in this.variable) {
        let reg = new RegExp('\\(\\$\\(' + key + '\\)\\$\\)', 'g')
        /* console.log('key==', key)
        console.log('reg==', reg) */
        let temp = data.replace(reg, function(a, b) {
          /* console.log(a, b) */
          return that.variable[key]
        })
        /* console.log('temp==', temp) */
        if (temp) {
          data = temp
        }
      }
      this.dataA = data
      // console.log('结果', data)
    },
  },
  watch: {
    windowHeight() {
      if (this.contentSizeLengthwise) { this.lengthwisePrint() } else { this.acrossPrint() }
    },
  },
  // props: {
  //   data: {
  //     required: true,
  //     default: () => {
  //       return []
  //     },
  //   },

  // },

}
</script>
<style lang="less">
p {
  color:red;
}
.custom-html{
  height: 100%;
  overflow: hidden;
  .content-div-lengthwise {
    margin:auto;
    background: gainsboro;
}
 .content-div-across {
    margin:auto;
    /* margin:20px; */
    background: gainsboro;
}
}

</style>