<template>
  <div class="formula" style="width:100%;">
    <div class="formula-left-wrapper border marginR20">
      <div class="wrapper-head">
        <span class="marginL5">条件编辑框</span>
      </div>
      <EditList ref="editList" :data="editData" @onChange="onChange"></EditList>
    </div>
    <div class="formula-right-wrapper border">
      <div class="select-wrapper marginR10">
        <div class="wrapper-head">
          <span class="marginL5">包含单项</span>
        </div>
        <select-table :columns="selectColumns" :data="selectData" @clickRow="clickRow"></select-table>
      </div>
      <div class="operator-wrapper">
        <div class="wrapper-head">
          <span class="marginL5">运算符号</span>
        </div>
        <Operator @clickItem="clickItem"></Operator>
      </div>
    </div>
  </div>
</template>
<script>
import SelectTable from '@/components/formula/selectTable'
import Operator from '@/components/formula/operator'
import EditList from '@/components/formula/editList'
import helper from '@/utils/helper.js'

export default {
  name: 'formula',
  components: {
    SelectTable,
    Operator,
    EditList,
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    selectData: {
      type: Array,
      default: () => {
        return []
      },
    },
    selectColumns: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      editData: JSON.parse(JSON.stringify(this.data)),
    }
  },
  watch: {
    data(cur) {
      this.editData = JSON.parse(JSON.stringify(cur))
    },
  },
  methods: {
    clickRow(data, index) {
      this.$refs.editList.insertOneRow({
        type: 'object',
        id: data.id,
        value: data.name,
      })
    },
    clickItem(data) {
      this.$refs.editList.insertOneRow({
        type: 'char',
        value: data,
      })
    },
    onChange(data) {
      let expression = data.map(item => {
        if (item.type === 'object') {
          return '[' + item.id + ']'
        }
        return item.value
      }).join('')
      let pass = helper.IsExpression(expression)
      this.$emit('onChange', data, expression, pass)
    },
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .formula{
    display: flex;
    .width100P{
      width: 100%;
    }
    .border{
      border:1px solid @gradeAshFive;
      border-radius:4px;
    }

    .wrapper-head{
      display: flex;
      height: 50px;
      padding: 0 20px;
      align-items: center;

      &::before{
        content: "";
        display: inline-block;
        width: 2px;
        height: 11px;
        background: @gradeBlueOne;
      }
      span{
        color: @gradeAshOne;
      }
    }

    .formula-right-wrapper{
      display: flex;
      flex: 1;
      width: 300px;
      overflow: hidden;

      .select-wrapper{
        border-right: 1px solid @gradeAshFive;
        flex: 1;
        width: 1px;
      }
      .operator-wrapper{
        border-left: 1px solid @gradeAshFive;
      }
    }
  }
</style>