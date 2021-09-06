<template>
  <div class="modelContent">
    <div class="modelContentName marginT20 marginL20">
      <label class="marginR10">禁忌症名称</label>
      <Input v-model="contraindicationName" on-blur="validateNull" ref="contraindicationName"></Input>
    </div>
    <div class="modelContentExplain marginT10 marginL20">
      <label class="marginR10">相关术语及解释</label>
      <Input v-model="modelContentExplain" on-blur="validateNull" :rows="3" type="textarea" ref="modelContentExplain"></Input>
    </div>
  </div>
</template>
<script>
  // import { mapState, mapActions } from 'vuex'
  // import * as type from '../../../../../../store/modules/information/proExamManagement/occupationalContraindication/occupationalContraindicationTypes'
  // import * as type from '../../../../../store/modules/information/proExamManagement/occupationalContraindication/occupationalContraindicationTypes'
  export default {
    name: 'modelContent',
    data () {
      return {
        contraindicationName: '',
        modelContentExplain: '',
      }
    },
    methods: {
      validateNull () {
        console.log(222222222)
        if (this.contraindicationName === null) {
          this.$refs.contraindicationName.style.placeholder = '请输入...'
        }
        if (this.modelContentExplain === null) {
          this.$refs.modelContentExplain.style.placeholder = '请输入...'
        }
      },
    },
    computed: {},
  }
</script>
<style lang="less">
  .modelContent {
    .modelContentName {
      label {
        width: 84px;
        height: 16px;
        letter-spacing: 5px;
      }
      .ivu-input-wrapper {
        // display: inline-block;
        width: 262px;
        height: 32px;
      }
      .ivu-input-wrapper::after {
        content: '*';
        color: red;
        font-size: 20px;
        position: relative;
        right: -250px;
        top: -20px;
      }
    }
    .modelContentExplain {
      label {
        width: 84px;
        height: 16px;
        letter-spacing: 0px;
        position: relative;
        top: -35px;
      }
      .ivu-input {
        resize : none;
      }
      .ivu-input-wrapper {
        // display: inline-block;
        width: 262px;
        height: 118px;
      }
      .ivu-input-wrapper::after {
        content: '*';
        color: red;
        font-size: 20px;
        position: relative;
        right: -250px;
        top: -105px;
      }
    }
  }
</style>
