<template>
  <div class="fmtColContainer">
    <div class="content">
      <Select v-model="selectedIndex" @on-change="selectChange" size="small">
        <Option v-for="(col, index) in cols" :value="index" >{{col.name}}</Option>
      </Select>
      <Input size="small" v-model="displayVal" />
    </div>
    <div class="closeBtn" @click="close"></div>
  </div>
</template>
<script>
export default {
  name: 'fmt-col',
  props: {
    cols: Array,
    col: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      selectedCol: null,
      selectedIndex: -1,
      displayVal: '',
    }
  },
  watch: {
    selectedIndex(val) {
      this.selectedCol = this.cols[val]
    },
    displayVal(val) {
      if (this.selectedCol) this.selectedCol.display = val
    },
  },
  methods: {
    selectChange() {
      this.displayVal = this.selectedCol.display
    },
    selectedCol(val) {
      Object.keys(val).forEach((key) => {
        this.col[key] = val[key]
      })
    },
    close() {
      this.$emit('del', this.col)
    },
  },
}
</script>
<style lang="less" scoped>
.fmtColContainer{
  width: 100px;
  height: 55px;
  padding: 2px;
  position: relative;
  .closeBtn{
    border-radius: 50%;
    width: 16px;
    height: 16px;
    position: absolute;
    right: -8px;
    top: -8px;
    z-index: 1;
    background-color: #B2B2B2;
    cursor: pointer;
    visibility: hidden;
    &:before{
      content: "";
      width: 8px;
      height: 1px;
      background-color: white;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      transform: rotate(45deg);
      cursor: pointer;
    }
    &:after{
      content: "";
      width: 8px;
      height: 1px;
      background-color: white;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      transform: rotate(-45deg);
      cursor: pointer;
    }
  }
  &:hover{
    .closeBtn{
      visibility: visible;
    }
  }
}
</style>
