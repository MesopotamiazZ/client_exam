<template>
  <div class="outer_container" v-show="!hidden">
    <div class="contentBox">
      <div class="var_choosing">
        <Select placeholder="选择变量" filterable v-model="selectedIndex" ref="sel">
          <Option v-for="(v, index) in varTypes" :value="String(index)">{{v.name}}</Option>
        </Select>
      </div>
      <div class="param" v-if="varInfo.param && varInfo.param.length">
        <span v-for="p in varInfo.param">
          <!-- next TODO -->
          <Input v-model="p.value" :placeholder="p.name" />
        </span>
      </div>
      <div class="format">
        <div class="listFormat" v-if="this.varTypes[this.selectedIndex].type === 'list'">
          <span><label>前缀</label><Input v-model="varInfo.fmt.prefix" /></span><span><label>后缀</label><Input v-model="varInfo.fmt.suffix"/></span><span><label>分行</label><Checkbox v-model="varInfo.fmt.breakLine"></Checkbox></span>
        </div>
        <div class="tableFormat" v-if="this.varTypes[this.selectedIndex].type === 'table'">
          <fmtCol v-for="col in varInfo.fmt.cols" :cols="varInfo.fmt.cols" :col="col" @del="delCol"></fmtCol>
          <span class="addCol" @click="addCol"></span>
        </div>
      </div>
      <div class="operation">
        <Button type="primary" @click="confirm">确认</Button>
        <Button @click="hidden = true">取消</Button>
      </div>
    </div>
  </div>
</template>
<script>
import vars from './varDefine'
import fmtCol from './fmtCol'
export default {
  name: 'var-picker',
  components: {
    fmtCol,
  },
  props: {
    show: Boolean,
  },
  data() {
    return {
      hidden: true,
      varTypes: vars,
      selectedIndex: null,
      varInfo: {
        param: null,
        fmt: {
          // list data
          prefix: '',
          suffix: '',
          breakLine: true,
          // table data
          cols: [
            // {name, key, display: 在表单上展示的名称}
          ],
        },
      },
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm', this.varTypes[this.selectedIndex])
      this.hidden = false
    },
    addCol() {
      this.varInfo.fmt.cols.push({})
    },
    delCol(col) {
      let targetIndex = -1
      this.varInfo.fmt.cols.forEach((c, index) => {
        if(c === col) targetIndex = index
      })
      if (targetIndex >= 0) {
        this.varInfo.fmt.cols.splice(targetIndex, 1)
      }
    },
  },
  created() {
    this.hidden = !this.show
  },
  mounted() {
  //
  },
  watch: {
    show(val) {
      this.hidden = !val
    },
  },
}
</script>

<style lang="less" scoped>
.outer_container{
/*  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 9;
  display: flex;
  align-items: center;
  justify-items: center; */
  .contentBox{

  }
}
</style>
