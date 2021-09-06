<template>
  <div class='fcheckboxChoice' :style="{'width':width + 'px','height':height+'px'}">
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <ul class="checkBoxes">
        <li class="checkBox" v-if="checkBox">
          <Checkbox 
          :addedDoctor = "addedDoctor"
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll">全选</Checkbox>
        </li>
        <li class="checkBox" v-for="item of rawData" :key="item.value" :style="width?'width:120px':''">
          <Checkbox :label="item.id" >
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
        indeterminate: !!this.addedDoctor.length,
        checkAll: false,
        checkAllGroup: this.addedDoctor.map(item => {
          return item.value
        }),
        returnedData: [],
      }
    },
    props: {
      checkData: {
        type: Array,
        default() {
          return []
        },
      },
      rawData: {
        type: Array,
        default() {
          return []
        },
      },
      width: {
        type: String,
        default: '',
      },
      height: {
        type: String,
        default: '',
      },
      checkBox: {
        type: Boolean,
        default: true,
      },
      // 已添加的阅片医生
      addedDoctor: {
        type: Array,
        default() {
          return []
        },
      },
    },
    methods: {
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false
        } else {
          this.checkAll = !this.checkAll
        }
        this.indeterminate = false

        if (this.checkAll) {
          this.checkAllGroup = this.rawData.map((item) => {
            return item.id
          })
        } else {
          this.checkAllGroup = []
        }
        this.returnedData = []
        for (let obj of this.rawData) {
          if (this.checkAllGroup.includes(obj.id)) {
            this.returnedData.push(obj)
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
        this.returnedData = []
        for (let obj of this.rawData) {
          if (this.checkAllGroup.includes(obj.id)) {
            this.returnedData.push(obj)
          }
        }
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
