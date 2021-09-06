/*
*主检基本信息组件
*@author 张澈
*@date 2018/1/3
<template>
  <div class="basicInformationContainer">
    <div class="basicInfo" :style="{'border-right': !waitingProjects && 'none'}">
      <div class="schema"><img :src="info && info.customer.photo" alt="无照片"/></div>
      <div class="infos">
        <span class="info-item"><label>体检号</label><Input type="text" style="width: 100px; height: 30px" v-model="examinationNumber" ></Input></span>
        <span class="info-item"><label>姓名</label><span class="item-value" style="width: 88px">{{propGet(info, 'customer.realname')}}</span></span>
        <span class="info-item"><label>性别</label><span class="item-value" style="width: 65px">{{['', '男', '女'][propGet(info, 'customer.sex', 0)]}}</span></span>
        <span class="info-item"><label>年龄</label><span class="item-value" style="width: 40px">{{propGet(info, 'customer.age')}}</span></span><br/>
        <span class="info-item"><label>工作单位</label><span class="item-value" style="width: 269px">{{propGet(info, 'unit_appt.unit.name')}}</span></span>
        <span class="info-item"><label>体检类型</label><span class="item-value" style="width: 185px">{{['', '健康体检', '职业体检'][propGet(info, 'pe_type')]}}</span></span><br/>
        <template v-if="propGet(info, 'pe_type') === 2">
          <span class="info-item"><label>工种</label><span class="item-value" style="width: 105px;">{{propGet(info, 'occup_info.occup_type_name')}}</span></span>
          <span class="info-item"><label>接害工龄</label><span class="item-value" style="width: 40px">{{propGet(info, 'occup_info.injury_age')}}</span></span>
          <span class="info-item"><label>危害因素</label><span class="item-value" style="width: 229px">{{propGet(info, 'occup_harm_factors.name')}}</span></span><br/>
        </template>
        <template v-if="propGet(info, 'is_recheck') === 1">
          <span class="info-item"><icon name="enabledState" ></icon><span class="item-text" style="margin-left: 5px;">复检</span></span>
          <span class="info-item"><label>目标疾病</label><span class="item-value" style="width: 200px;"></span></span>
        </template>
      </div>
      <z-button class="health-doc" @click="healthDoc">健康档案</z-button>
    </div>
    <div class="waitingProjects" v-if="waitingProjects">
      <titletHasSlot>
        <span slot="titletHasSlotLeftTitle"><span>待检项目</span><span style="color: #038DEE; font-size: 14px">({{waitingProjects.length}})</span></span>
      </titletHasSlot>
      <div class="tableBox">
        <table>
          <colgroup>
            <col width="50" />
            <col/>
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in waitingProjects" :class="{oddLine: !(index % 2)}">
              <td>{{index + 1}}</td>
              <td>{{item.group_item_name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
import titletHasSlot from '@/components/titleHasSlot'

export default {
  name: 'basicInfomation',
  components: {
    titletHasSlot,
  },
  props: {
    pe_sn: {
      default: '',
    },
    info: {
      type: Object,
    },
    waitingProjects: {
      type: Array,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      queryTimer: null,
      examinationNumber: '',
      propGet: new window['Function']('obj', 'propName', 'defaultValue', `
        try{
          with(obj){
            return eval(propName)
          }
        }catch(e){
          return defaultValue || ''
        }
      `),
    }
  },
  watch: {
    pe_sn(val, oldVal) {
      this.examinationNumber = val
    },
    examinationNumber(val, oldVal) {
      if (val) {
        if (this.queryTimer) {
          window.clearTimeout(this.queryTimer)
        }
        this.queryTimer = window.setTimeout(() => {
          this.$emit('query', this.examinationNumber)
          this.queryTimer = null
        }, 500)
      }
    },
  },
  methods: {
//    ...mapActions('mainInspectionTableModule', [
//      'projectGet',
//      'projectPost',
//      'changAddPut',
//      'projectGetBasic',
//      'projectHasChosen',
//      'projectHasChecked',
//    ]),
    query(examinationNumber) {
//
    },
    healthDoc() {
//
      this.$emit('healthDoc')
    },
  },
  mounted() {
//    this.projectGet(112212).then(function () {
//      console.log(arguments)
//    })
  },
}

</script>

<style lang="less" >
  .basicInformationContainer{
    display: flex;
    position: relative;
    width: 100%;
    .basicInfo{
      display: flex;
      flex-grow: 0;
      align-items: flex-start;
      margin: 20px 0 20px 20px;
      height: 165px;
      width: 760px;
      min-width: 760px;
      border-right: 1px solid #D9D9D9;
    }
    .schema{
      width: 120px;
      height: 154px;
      flex-grow: 0;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .infos{
      flex-grow: 1;
      line-height: 30px;
      margin-left: 6px;
      & *{
        vertical-align: middle;
      }
      .info-item{
        display: inline-block;
        margin-left: 19px;
        margin-bottom: 15px;
        height: 30px;
        label{
          text-align: justify;
          text-align-last: justify;
          width: 48px;
          display: inline-block;
          margin-right: 10px;
        }
        .item-value{
          display: inline-block;
          height: 100%;
          background-color: #F2F5FA;
          padding: 0 10px;
          border-radius: 2px;
        }
      }
    }
    .health-doc{
      position: absolute;
      top: 155px;
      left: 677px;
      border-color: #34A3F1;
      color: #249CF0;
      background-color: white;
      &:hover{
        background-color: #EBF4FF;
      }
    }

    .waitingProjects{
      flex-grow: 1;
      border-radius: 8px;
      margin: 10px;
      align-items: flex-start;
      height: 180px;
      position: relative;
      border: 1px solid #D9D9D9;
      min-width: 230px;
      overflow: hidden;
      .tableBox{
        position: absolute;
        width: 100%;
        top: 50px;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        table{
          text-align: center;
          line-height: 50px;
          width: 100%;
          border-collapse: collapse;
          td:first-child{
            border-right: 1px solid #DBDCDD;
          }
          tr.oddLine{
            background-color: #F2F7FF;
          }
        }
      }
    }
  }
</style>
