<template>
  <div class='fcheckboxChoice' :style="{'width':width + 'px','height':height+'px'}">
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <ul class="checkBoxes">
        <li class="checkBox" v-if="checkBox">
          <Checkbox 
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll">全选</Checkbox>
        </li>
        <li class="checkBox" v-for="item of rawData" :key="item.name" :style="width?'width:120px':''">
          <Checkbox :label="item.name">
            <span class="li-span">{{item.name}}</span>
          </Checkbox>
        </li>
      </ul>
    </CheckboxGroup>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        indeterminate: false,
        checkAll: false,
        checkAllGroup: this.choosenDiagnose.map(item => {
          return item.name
        }),
        returnedData: [],
      }
    },
    props: {
      checkAllData: {
        type: Array,
      },
      rawData: {
        type: Array,
        default() {
          return []
        },
      },
      width: {
        type: [String, Number],
        default: '',
      },
      height: {
        type: [String, Number],
        default: '',
      },
      checkBox: {
        type: Boolean,
        default: true,
      },
      choosenDiagnose: {
        type: Array,
        default() {
          return []
        },
      },
    },
    watch: {
    },
    methods: {
      transmitData(a) {
        this.checkAllGroup = []
        this.$nextTick(() => {
          if (a) {
            for (let key in a) {
              this.$set(this.checkAllGroup, key, a[key])
            }
          }
          if (this.rawData === a) {
            this.checkAll = true
          }
        })
        console.log(this.checkAllGroup, ' 完全放弃为人父亲')
      },
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false
        } else {
          this.checkAll = !this.checkAll
        }
        this.indeterminate = false

        if (this.checkAll) {
          this.checkAllGroup = this.rawData.map((item) => {
            return item.name
          })
        } else {
          this.checkAllGroup = []
        }
        this.returnedData = []
        for (let obj of this.rawData) {
          if (this.checkAllGroup.includes(obj.name)) {
            this.returnedData.push(obj.name)
          }
        }
        this.$emit('check-value', this.returnedData)
      },
      checkAllGroupChange (data) {
        if (data.length === this.rawData.length) {
          this.indeterminate = false
          this.checkAll = true
        } else if (data.length > 0) {
          this.indeterminate = true
          this.checkAll = false
        } else {
          this.indeterminate = false
          this.checkAll = false
        }
        // this.$emit('check-value', data)
        this.returnedData = []
        for (let obj of this.rawData) {
          if (this.checkAllGroup.includes(obj.name)) {
            this.returnedData.push(obj.name)
          }
        }
        console.log(this.returnedData)
        this.$emit('check-value', this.returnedData)
      },
    },
  }
</script>
<style lang="less" scoped>
@import "~assets/less/variable.less";

.fcheckboxChoice{
  border-radius: 8px;
  height: 257px;
  width: 394px;
  border: 1px solid #cccccc;
  background:  #FAFAFA;
  overflow: auto;
  .checkBoxes {
    height: auto;
    padding: @num30;
    background: #FAFAFA;
    border-radius: @borderRadiuSmall;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .checkBox:nth-of-type(2n) {
      margin-left: @num20;
    }
    .checkBox {
      font-size: @font12;
      width: 140px;
      .ivu-checkbox-wrapper {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  input{
    width: 16px;
    height:16px;
  }
}
</style>
