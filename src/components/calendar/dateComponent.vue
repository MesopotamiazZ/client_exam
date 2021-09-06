<template>
  <div class="self-date">
    <DatePicker ref="picker"
      :type="dateType"
      format="yyyy-MM-dd"
      :open='open'
      :value='newDate'
      :direction='direction'
      @on-open-change='openChange'
      @on-change="handleChange">
      <div @click="handleClick">
        <dateIconCom></dateIconCom>
        <Input
          v-model="initDataVal"
          @on-blur='inputBlur'
          @on-focus='inputFocus'
          @on-change="input_change"
          :placeholder="placeholder">
        </Input>
      </div>
    </DatePicker>
  </div>
</template>
<script>
  import * as _ from 'lodash'
  import dateIconCom from '@/components/calendar/dateIcon'
  export default {
    name: 'date-component',
    components: {
      dateIconCom,
    },
    props: {
      dateType: {
        // 显示类型
        type: String,
      },
      direction: {
        // 显示方向
        type: String,
        default: 'bottom',
      },
      dateVal: {
        // 数据
        type: [String, Array],
      },
      placeholder: {
        type: String,
        default: '请输入',
      },
    },
    watch: {
      dateVal(data) {
        this.newDate = data
      },
      newDate (val) {
        if (val instanceof Array) {
          this.initDataVal = val.join('~')
          // return val.join('~')
        } else {
          this.initDataVal = val
          // return val
        }
      },
//      initDataVal (data) {
        // console.log(data)
//        if (data === '') {
          // console.log(this.returnTime)
//          this.$emit('on-change', '')
//        }
//      },
    },
    computed: {
      // initDataVal() {
      //   // console.log(this.newDate)
      //   if (this.newDate instanceof Array) {
      //     return this.newDate.join('~')
      //   } else {
      //     return this.newDate
      //   }
      // },
    },
    data() {
      return {
        open: false,
        newDate: '',
        initDataVal: '',
      }
    },
    mounted() {
      this.newDate = this.dateVal
    },
    methods: {
      openChange () {
        // console.log(this.initDataVal)
      },
      inputFocus () {
        // console.log(this.initDataVal)
        // if (this.initDataVal === '') {
        //   // console.log(this.returnTime)
        //   this.$emit('on-change', '')
        // }
      },
      inputBlur () {
        this.open = false
        // console.log(this.initDataVal)
        // if (this.initDataVal === '') {
        //   // console.log(this.returnTime)
        //   this.$emit('on-change', '')
        // }
      },
      handleClick() {
        this.open = !this.open
      },
      handleChange(date) {
        this.newDate = date
        this.open = false
        this.initEmitData(_.clone(this.newDate))
      },
      initEmitData(data) {
        this.returnTime = []
        if (data instanceof Array) {
          for (let i in data) {
            data[i] = new Date(Date.parse(data[i].replace(/-/g, '/')))
            data[i] = data[i].getTime()
            this.returnTime.push(data[i])
          }
        } else {
          data = new Date(Date.parse(data.replace(/-/g, '/')))
          data = data.getTime()
          this.returnTime.push(data)
        }
        // console.log(this.returnTime)
        this.$emit('on-change', this.returnTime)
      },
      input_change() {
        let val = this.initDataVal.trim()
        if (val) {
          try {
            val = val.split('~')
            if (val[0].match(/^\s*\d{4}-\d{1,2}-\d{1,2}\s*$/) && val[1].match(/^\s*\d{4}-\d{1,2}-\d{1,2}\s*$/)) {
              this.newDate = [val[0], val[1]]
              this.$emit('on-change', val)
            }
          } catch (e) {
            return
          }
        } else {
          this.newDate = ''
          this.$emit('on-change', '')
        }
      },
    },
    deactivated() {
      this.open = false
    },
  }
</script>
<style lang="less">
  @import (reference) "~assets/less/variable.less";
  .self-date {
    .ivu-date-picker-rel {
      .ivu-input-wrapper {
        input {
          padding-right: 33px;
          letter-spacing: 0;
        }
      }
    }
  }
</style>
