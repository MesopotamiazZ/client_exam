/*
*主检基本信息组件
*@author 张澈
*@date 2018/1/3
<template>
  <div class="basicInformationOuterBox">
    <div class="basicInfo">
      <div class="schema">
        <img :src="info && info.customer.photo || '/static/images/public/default_avatar.svg'" alt="无照片" ref="customerPhoto" />
        <div class="mark" v-if="recheck || sendBack">
          <span class="recheck" v-if="recheck"><icon name="enabledState" ></icon><span class="text">复检</span></span>
          <span class="sendBack" v-if="sendBack"><i class="sendBackIcon"></i><span class="text">退回</span></span>
        </div>
      </div>
      <div class="infos">
        <div class="line1 line">
          <span class="info-item" style="flex-grow: 1; width: 196px"><label>体检号</label><Input type="text" style="width: calc(100% - 58px); height: 30px" v-model="examinationNumber" ></Input></span>
          <span class="info-item" style="flex-grow: 1; width: 150px"><label>姓名</label><span class="item-value" style="width: calc(100% - 58px)">{{userName}}</span></span>
          <span class="info-item" style="flex-grow: 1; width: 157px"><label>性别</label><span class="item-value" style="width: calc(100% - 58px)">{{['-', '男', '女'][gender]}}</span></span>
          <span class="info-item age" style="flex-grow: 1; width: 157px"><label>年龄</label><span class="item-value" style="width: calc(100% - 58px)">{{age}}</span></span>
        </div>
        <div class="line2 line">
          <span class="info-item" style="flex-grow: 2; width: 372px"><label>工作单位</label><span class="item-value" style="width: calc(100% - 58px)">{{company}}</span></span>
          <span class="info-item" style="flex-grow: 2; width: 340px"><label>体检类型</label><span class="item-value" style="width: calc(100% - 58px)">{{examType}}</span></span>
        </div>
        <template v-if="examType === 2">
          <div class="line3 line professional">
            <span class="info-item" style="flex-grow: 1; width: 197px"><label>工种</label><span class="item-value" style="width: calc(100% - 58px)">{{workCategory}}</span></span>
            <span class="info-item inHarm" style="flex-grow: 1; width: 148px"><label>接害工龄</label><span class="item-value" style="width: calc(100% - 58px)">{{touchingYears}}</span></span>
            <span class="info-item" style="flex-grow: 2; width: 340px"><label>危害因素</label><span class="item-value" style="width: calc(100% - 58px)">{{injuryFactor}}</span></span>
          </div>
          <div class="line4 line professional">
            <span class="info-item" style="flex-grow: 2; width: 372px"><label>目标疾病</label><span class="item-value" style="width: calc(100% - 58px)">{{targetDisease}}</span></span>
            <span class="info-item" style="flex-grow: 2; width: 340px"></span>
          </div>
        </template>
        <template v-if="examType === 3">
          <div class="line3 line radiation">
            <span class="info-item" style="flex-grow: 1; width: 211px"><label>工种</label><span class="item-value" style="width: calc(100% - 58px);">{{workCategory}}</span></span>
            <span class="info-item" style="flex-grow: 2; width: 504px"><label style="width: 72px;">职业照射种类</label><span class="item-value" style="width: calc(100% - 82px);">{{radiationCategory}}</span></span>
          </div>
          <div class="line4 line radiation">
            <span class="info-item" style="flex-grow: 1; width: 211px"><label>目标疾病</label><span class="item-value" style="width: calc(100% - 58px);">{{radiationDisease}}</span></span>
            <span class="info-item" style="flex-grow: 2; width: 230px"><label style="width: 72px;">特殊情况</label><span class="item-value" style="width: calc(100% - 82px);">{{spacial}}</span></span>
            <span class="info-item" style="flex-grow: 0; width: 244px"></span>
          </div>
        </template>
        <!--<template v-if="propGet(info, 'is_recheck') === 1 || 1">
          <span class="info-item"><icon name="enabledState" ></icon><span class="item-text" style="margin-left: 5px;">复检</span></span>
          <span class="info-item"><label>目标疾病</label><span class="item-value" style="width: 200px;"></span></span>
        </template>-->
      </div>
      <div class="quoteGbz">
        <span @click="gbzData.show = !gbzData.show">GBZ-188的相关引用</span>
        <div class="content" v-show="gbzData.show && gbzData.queue.length" v-html="gbzData.queue[gbzData.queue.length - 1]"></div>
        <div class="goBack" v-if="gbzData.queue.length > 1"></div>
      </div>
      <Button class="health-doc" @click="healthDoc">健康档案</Button>
    </div>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
import {mapActions} from 'vuex'
import gbzJson from './gbz188.json'
import {copy, getDotData} from '@/utils/helper'
/* let projectGetBasic = (examinationNumber) => {
  let data = {
    '1804010126': {
      'id': 243,
      'pe_sn': '1804010126',
      'customer_id': 414,
      'is_print_health_card': 0,
      'print_guide_list_time': null,
      'package_name': '',
      'package_id': 12,
      'appt_time': 15124151,
      'pe_type': 3,
      'is_recheck': 0,
      'is_lock': 0,
      'lock_time': 0,
      'lock_staff_id': 0,
      'is_outside_check': 0,
      'is_print_report': 0,
      'operater': '李四',
      'created_at': '1515460093',
      'updated_at': '1517906397',
      'status': 4,
      'unit_id': null,
      'subscription': 0,
      'settlement_type': null,
      'remark': '',
      'reject_reason': '写错了',
      'customer': {
        'id': 414,
        'ha_id': 1,
        'id_card': '501022198402182748',
        'birthday': '',
        'remark': '',
        'realname': 'tesla',
        'age': 34,
        'mobile': '17682337905',
        'is_vip': 1,
        'sex': 1,
        'photo': 'picture/customer/W0vylW5ETBcuQ4y4SrixJgic3IWquvYpqqej6PL7.jpeg',
        'operater': '4',
        'created_at': '1514890780',
        'updated_at': '1514890780',
        'status': 1,
        'unit_name': '',
      },
      'occup_harm_factors': [
        {
          name: '砷化氢 (砷化三氢)',
          gbzKey: '5.10',
          year: 12,
          targetDisease: '慢性砷中毒',
        },
      ],
      'occup_info': {
        occup_type_name: '打杂',

      },
      unit_appt: {
        unit: {
          name: '中国铁路',
        },
      },
      radiation: {
        category: '核辐射',
        targetDisease: '畸形',
      },
      specialCondition: '非常特殊的情况',
    },
  }
  return new Promise((resolve) => {
    resolve(data[examinationNumber])
  })
} */
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
  },
  data() {
    return {
      serverData: null,
      queryTimer: null,
      recheck: false,
      sendBack: false,
      examinationNumber: '',
      photo: '',
      userName: '',
      gender: 0,
      age: 0,
      company: '',
      examType: '',
      workCategory: '',
      touchingYears: '',
      injuryFactor: '',
      targetDisease: '',
      radiationCategory: '',
      radiationDisease: '',
      spacial: '',
      gbzData: {
        key: null,
        show: false,
        queue: [],
      },
//      propGet: new window['Function']('obj', 'propName', 'defaultValue', `
//        try{
//          with(obj){
//            return eval(propName)
//          }
//        }catch(e){
//          return defaultValue || ''
//        }
//      `),
    }
  },
  computed: {
//    ...mapState(['userInfo']),
  },
  created() {
    if (this.pe_sn) this.examinationNumber = this.pe_sn
  },
  watch: {
    'gbzData.key'(val) {
      console.log('===', val)
      this.gbzData.queue = []
      this.gbzPush(val)
    },
    pe_sn(val, oldVal) {
      this.examinationNumber = val
    },
    examinationNumber(val, oldVal) {
      if (val) {
        if (this.queryTimer) {
          window.clearTimeout(this.queryTimer)
        }
        this.queryTimer = window.setTimeout(() => {
//          this.$emit('query', this.examinationNumber)
          this.query(val)
          this.queryTimer = null
        }, 500)
      }
    },
  },
  methods: {
    ...mapActions(['subscribeScanGun', 'desubscribeScanGun']),
//    ...mapActions('mainInspectionTableModule', [
//      'projectGet',
//      'projectPost',
//      'changAddPut',
//      'projectGetBasic',
//      'projectHasChosen',
//      'projectHasChecked',
//    ]),
    ...mapActions('sampleManagementModule', [
      'projectGet',
    ]),
    query(examinationNumber) {
//      console.log('do query ', examinationNumber)
      // TODO1804010126
      this.projectGet(examinationNumber).then((val) => {
        let data = copy(val.meta)
        this.recheck = getDotData(data, 'is_recheck')
        this.photo = getDotData(data, 'customer.photo')
        this.userName = getDotData(data, 'customer.name')
        this.sendBack = getDotData(data, 'is_lock')
        this.gender = getDotData(data, 'customer.sex')
        this.age = getDotData(data, 'customer.age')
        this.examType = getDotData(data, 'pe_detail.pe_type')
        this.company = getDotData(data, 'customer.unit_name')
        this.workCategory = getDotData(data, 'pe_detail.pe_category_detail.occup_type_name')
        this.touchingYears = getDotData(data, 'pe_detail.pe_category_detail.injury_age')
        // this.injuryFactor = getDotData(data, 'occup_harm_factors[0].name')
        if (data.pe_detail.pe_category_detail && data.pe_detail.pe_category_detail.occupHarms) {
          let a = data.pe_detail.pe_category_detail.occupHarms
          let str
          for (let key of a) {
            str += key.factor_name
          }
          this.injuryFactor = str
        }
        this.targetDisease = getDotData(data, '')
        this.radiationCategory = getDotData(data, 'radiation.category')
        this.spacial = getDotData(data, 'specialCondition')
        this.radiationDisease = getDotData(data, 'radiation.targetDisease')
        this.serverData = data
        this.gbzData.key = getDotData(data, 'occup_harm_factors[0].gbzKey')
        this.$emit('data-change', val)
      })
    },
    aaa (str) {
      console.log(str, 'ffffffff')
      if (str === '1804010126') {
        this.examinationNumber = str
        console.log(this.examinationNumber, 'this.examinationNumber =')
        this.$emit('openM', true)
      }
      this.$nextTick(() => {
        this.$emit('setStr', str)
      })
    },
    showGbz() {
      console.log('show')
      this.gbzData.show = true
      let click = () => {
        this.gbzData.show = false
        window.removeEventListener('click', click)
      }
      window.addEventListener('click', click)
    },
    healthDoc() {
      this.$emit('healthDoc')
    },
    gbzPush(k) {
      if (typeof k === 'string' && k) {
        let path = k.split('.')
        let obj = gbzJson
        console.log(path)
        try {
          path.forEach((s) => {
            obj = obj[s]
          })
        } catch (e) { /* */ }
        if (obj) {
          this.gbzData.queue.push(this.jsonToContent(obj, k))
        }
      }
    },
    jsonToContent(obj, k = '') {
      let convert = (obj, level, k) => {
        let result = ''
        Object.keys(obj).forEach((key) => {
          if (key === 'content') return
          result += this.spaceGetter(level * 4) + k + '.' + key + ' ' + obj[key].content.replace(/[\n]/g, '\n' + this.spaceGetter(level * 4)).replace(/(d{1,2}\.)+?(\d{1,2})/, (match) => {
            return '<span class="basicInformationOuterBox_gbz_go_next">' + match + '</span>'
          }) + '\n' + convert(obj[key], level + 1, k + '.' + key)
        })
        return result
      }
      return k + ' ' + obj.content + '\n' + convert(obj, 1, k)
    },
    spaceGetter(num) {
      let out = ''
      while (num--) out += ' '
      return out
    },
    getter: new window['Function']('obj', 'propName', 'defaultValue', `
      try{
        with(obj){
          return eval(propName)
        }
      }catch(e){
        return defaultValue || ''
      }
    `),
  },
  mounted() {
//    this.projectGet(112212).then(function () {
//      console.log(arguments)
//    })
    let img = this.$refs.customerPhoto
    img.onload = () => {
      let rate = img.offsetWidth / img.offsetHeight
      img.style[rate > 0.75 ? 'width' : 'height'] = '100%'
    }
    this.subscribeScanGun(this.aaa)
  },
  deactivated() {
    this.$nextTick(() => {
      console.log('beforeDestroy')
      this.desubscribeScanGun(this.aaa)
    })
  },
  beforeDestroy() {
    this.desubscribeScanGun(this.aaa)
  },
}

</script>

<style lang="less" >
  .basicInformationOuterBox{
    /*display: flex;*/
    position: relative;
    width: 100%;
    box-shadow: 0 0 3px 2px #f0f0f0;
    border-radius: 10px;
    float: left;
    .basicInfo{
      display: flex;
      /*flex-grow: 0;*/
      align-items: flex-start;
      margin: 20px 0 20px 20px;
      height: 165px;
      min-width: 760px;
      .schema{
        width: 120px;
        height: 160px;
        flex-grow: 0;
        flex-shrink: 0;
        position: relative;
        border: 1px solid #33A3F1;
        img{
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          left: 0;
        }
        .mark{
          position: absolute;
          bottom: 0;
          height: 40px;
          width: 100%;
          line-height: 40px;
          text-align: center;
          font-weight: bold;
          background-color: rgba(255,255,255,0.75);
          display: flex;
          justify-content: center;
          & > span{
            width: 53px;
            height: 100%;
            white-space: nowrap;
            & *{
              vertical-align: middle;
            }
            .text{
              margin-left: 4px;
            }
            .sendBackIcon{
              display: inline-block;
              width: 15px;
              height: 15px;
              background: url(/static/icons/public/sendBack.svg) no-repeat center;
              background-size: contain;
            }
          }
        }
      }
      .infos{
        flex-grow: 1;
        line-height: 30px;
        margin-left: 6px;
        padding-right: 13px;
        & *{
          vertical-align: middle;
        }
        .line{
          display: flex;
          width: 100%;
        }
        .info-item{
          display: inline-block;
          margin-left: 19px;
          margin-bottom: 15px;
          margin-right: 7px;
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
          &.age .item-value{
            position: relative;
            &:after{
              content: "岁";
              color: #8E8E90;
              position: absolute;
              right: 8px;
              line-height: 30px;
            }
          }
          &.inHarm .item-value{
            position: relative;
            &:after{
              content: "年";
              color: #8E8E90;
              position: absolute;
              right: 8px;
              line-height: 30px;
            }
          }
        }
      }
      .quoteGbz{
        color: #1795EE;
        cursor: pointer;
        position: absolute;
        right: 117px;
        bottom: 25px;
        .content{
          width: 399px;
          height: 200px;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 10px;
          border: 1px solid #DCDCDC;
          box-shadow: 0 0 3px #DCDCDC;
          position: absolute;
          top: 30px;
          right: -20px;
          white-space: pre-wrap;
          z-index: 999;
          background-color: white;
          color: gray;
          .basicInformationOuterBox_gbz_go_next{
            cursor: pointer;
            text-decoration: underline;
            margin: 0 4px;
          }
        }
        .goBack{
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid #DCDCDC;
          cursor: pointer;
          right: -10px;
          top: 40px;
          z-index: 1;
          text-align: center;
          line-height: 16px;
          &:before{
            content: "<";
            color: #DCDCDC;
          }
        }
      }
      .health-doc{
        position: absolute;
        top: 155px;
        right: 20px;
        border-color: #34A3F1;
        color: #249CF0;
        background-color: white;
        &:hover{
          background-color: #EBF4FF;
        }
      }
    }
  }
</style>
