<template>
  <div style="position: relative;height:100%;">
     <div>
       <div class="mainInspectionTable" :style='{height:$store.state.windowHeight-101+"px"}'>
           <div class="mainInspectionTable-head">
             <div>
               <div class="floatL titlecompelet">
                <crossBand
                 :carouselData= "carouselData"
                 :isShowBox="isShowExamBox"
                 :willCheckup="waitingAndCompleteData.waitingData.length"
                 :beCheckuped="waitingAndCompleteData.completeData.length"
                 @open-check-up-modal="openCheckupModal"
                ></crossBand>
               </div>

             <div  class="floatR buttonArr" >
<!--                 <ZButton :ZBtype='"ghost"'  class="fl marginR20">
                                   解 锁
                </ZButton> -->
                <ZButton :ZBtype='"ghost"'  class="fl marginR20" @click="isEdit = !isEdit">
                                   编 辑
                </ZButton>
                <ZButton :ZBtype='"ghost"'  class="fl marginR20">
                                   完 检
                </ZButton>
                <ZButton :ZBtype='"ghost"'  class="fl marginR20">
                                   退回修改
                </ZButton>
                <ZButton :ZBtype='"ghost"'  class="fl">
                                   预览报告
                </ZButton>

             </div>
             </div>

           </div>
           <div class="mainInspectionTable-body" >
             <div class="body-left">
               <div class="body-left-top">
                 <span class="body-left-top-span">参考信息</span>
               </div>
               <div  class="body-left-body">
                 <!-- 第一条 -->
                 <div class= "body-left-body-first">
                      <titletHasSlot style="border-radius:8px 8px 0 0;">
                  <span slot='titletHasSlotLeftTitle'>既往/职业病史</span>
                </titletHasSlot>
                <zTable :isShowSelectOrIndex="false" border stripe :columns="pros_columns"
                :data="detilData" :height="tableHeight -50" :isDependent="true">
                </zTable>
                 </div>
                  <!-- 第二条 -->
                  <div class= "body-left-body-secend">
                <titletHasSlot style="border-radius:8px 8px 0 0;">
                  <span slot='titletHasSlotLeftTitle'>历史诊断</span>
                </titletHasSlot>
<!--                 <zTable :isShowSelectOrIndex="false" border stripe :columns="pros_columns"
                :data="detilData" :height="tableHeight -50" :isDependent="true">
                </zTable> -->
                 </div>
                </div>

             </div>
           <!-- 右边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 边 -->
             <div class="body-right flx1">
               <div class="right-above" >
                 <basicInfo @query="informationQuery" :info="basicInformation" :pe_sn="pe_sn" :waitingProjects="waitingProjects"></basicInfo>
               </div>
               <div class="right-bottom"  :style='{height:$store.state.windowHeight-386+"px"}'>
                       <!-- 表格 -->

                      <div class="ward-impression" >
                        <titletHasSlot style="border-radius:8px 8px 0 0;">
                          <span slot='titletHasSlotLeftTitle'>科室印象
                          </span>
                          <div slot="titletHasSlotRightContent">
                            <ZButton :ZBtype='"ghost"' class="fl" @click="cleanClinical()">清空诊断
                            </ZButton>
                          </div>
                        </titletHasSlot>
                        <RTable
                          class="checkup-result"
                          :data="tableData"
                          :columns="columns"
                          :bodyHeight="160"
                          @tr-spread="handleTrSpread"
                          :isEdit = "isEdit"
                        ></RTable>
                      </div>
                      <!-- 临床诊断 -->
                      <div class="ward-impression" >
                          <titletHasSlot style="border-radius:8px 8px 0 0;">
                          <span slot='titletHasSlotLeftTitle'>临床诊断
                          </span>
                          <div slot="titletHasSlotRightContent">
                             <ZButton :ZBtype='"ghost"'  class="fl" @click="cleanClinical()">清空诊断
                            </ZButton>
                          </div>
                          </titletHasSlot>
                           <div class="ward-impression-body">
                              <div class="ward-impression-body-content">
                                <div v-for="(item,index) of addClinicalArr" class="ward-impression-body-forerach" :key="item">{{item}}
                                  <div class="rightClassTransitionFlex" @click="TransitionFlexCansle(index)">
                                  <icon class="icon_close" name="modal_close_default"></icon>
                                  </div>
                                </div>
                                 <div class="ward-impression-body-content-add" @click="addClinicalClick">
                                     <div></div>
                                     <div></div>
                                 </div>
                              </div>
                           </div>
                         </div>

                       <!--  建议 -->
                      <div class="ward-impression" >
                          <titletHasSlot style="border-radius:8px 8px 0 0;">
                          <span slot='titletHasSlotLeftTitle'>建议</span>
                          <div slot="titletHasSlotRightContent">
                             <ZButton :ZBtype='"ghost"'  class="fl marg10">
                                   自动生成
                            </ZButton>
                               <ZButton :ZBtype='"ghost"'  class="fl " @click="cleanSuggest()">
                                   清空建议
                            </ZButton>
                          </div>
                          </titletHasSlot>
                           <div class="ward-impression-body">
                              <div class="ward-impression-body-changge">
                                 <Input v-model="inputTextArea" type="textarea" placeholder="请输入建议..."></Input>
                              </div>
                           </div>
                      </div>
                       <!-- 医嘱结论 -->
                      <div class="ward-impression" >
                          <titletHasSlot style="border-radius:8px 8px 0 0;" >
                          <span slot='titletHasSlotLeftTitle'>医嘱结论
                          </span>
                          <div slot="titletHasSlotRightContent">
                             <ZButton :ZBtype='"ghost"'  class="fl  marg10" @click="openReviewModal">
                                   复查预约
                            </ZButton>
                              <ZButton :ZBtype='"ghost"'  class="fl  marg10">
                                   处 方
                            </ZButton>
                            <ZButton :ZBtype='"ghost"'  class="fl  marg10">
                                   自动生成
                            </ZButton>
                             <ZButton :ZBtype='"ghost"'  class="fl" @click="cleanAdvice">
                                   清空建议
                            </ZButton>
                          </div>
                          </titletHasSlot>
                            <div class="ward-impression-body">
                              <div class="ward-impression-body-changge">
                                 <Input v-model="adviceModalArea" type="textarea" placeholder="请输入医嘱结论..."></Input>
                              </div>
                           </div>
                      </div>
                      <div class="ward-impression-time"><span>主检医生： <div id="image01" :style="'display:inline-block;width:110px;height:50px;transform:translateY(10px);background:url('+ userInfo.signature+')no-repeat;'"/></span><span class="margin30">主检时间：2017-12-12</span></div>
               </div>
             </div>
           </div>
       </div>
     </div>
     <addClinical ref="addClinicalModal" @checkValue="checkValue"></addClinical>
     <!-- 清空诊断 -->
     <affirmDelModal ref="affirmDelModal" :controlModal="controlModal" @delCancel="delCancel" :rests="false"
     :content="'确认清空诊断吗？'"
     :delet= "'清 空'"
     @affirmDel= "affirmDel"
     ></affirmDelModal>
     <!-- 清空建议 -->
     <affirmDelModal ref="suggestModal"
      :controlModal="suggestModal"
      @delCancel="suggestDelCancel"
      :rests="false"
     :content="'确认清空建议吗？'"
     :delet= "'清 空'"
     @affirmDel= "suggestAffirmDel"
     ></affirmDelModal>
     <!-- 清空医嘱结论 -->
     <affirmDelModal ref="adviceModal"
      :controlModal="adviceModal"
      @delCancel="adviceDelCancel"
      :rests="false"
     :content="'确认清空医嘱吗？'"
     :delet= "'清 空'"
     @affirmDel= "adviceAffirmDel"
     ></affirmDelModal>
     <!-- 复查项目 -->
     <reviewModal ref="reviewModal"></reviewModal>
     <!-- 已检/待检查询 -->
     <simpleSearchTable ref="simpleSearchTable"
       :width="230"
       :withSn="true"
       :datas="[
           {
               title: '可主检人员',
               columns: waitingAndCompleteData.columns,
               rows: waitingAndCompleteData.waitingData,
               height: 160,
           },
           {
               title: '已主检人员',
               columns: waitingAndCompleteData.columns,
               rows: waitingAndCompleteData.completeData,
               height: 160,
           },
       ]"
       @rowclick="rowclick"
       :beShowing="isShowExamBox"
       :searchColumns="['pe_sn', 'customerName']"
     ></simpleSearchTable>
      <!--<HealthExamPersonSearch
      :columns="waitingAndCompleteData.columns"
      :willExamData="waitingAndCompleteData.waitingData"
      :beExamedData="waitingAndCompleteData.completeData"
      :searchTargetColumns="['pe_sn', 'customerName']"
      :isShowBox="isShowExamBox"
     ></HealthExamPersonSearch>-->
     <!-- 移动摩太框 -->
     <canMoveModal ref="canMoveModal">
      <div>11111111111</div>
    </canMoveModal>
  </div>
</template>
<script>
import ZButton from '@/components/button/ZButton'
import affirmDelModal from '@/components/modal/affirmDelModal'
import canMoveModal from '@/components/modal/canMoveModal'
import crossBand from '@/components/crossBand'
import zTable from '@/components/table/zTable'
import addClinical from './components/addClinical/addClinical'
import reviewModal from './components/reviewModal'
import titletHasSlot from '@/components/titleHasSlot'
import RTable from './components/table'
import data from './components/table/data.json'
import basicInfo from './components/basicInformation.vue'
import HealthExamPersonSearch from './components/healthExamPersonSearch/index.vue'
import simpleSearchTable from './components/simpleSearchTable.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'mainInspectionTable',
  components: {
    ZButton,
    crossBand,
    zTable,
    titletHasSlot,
    RTable,
    addClinical,
    affirmDelModal,
    reviewModal,
    basicInfo,
    HealthExamPersonSearch,
    canMoveModal,
    simpleSearchTable,
  },
  data() {
    return {
      isEdit: false, // 判断科室印象是否可以编辑
      dada: {},
      pe_sn: '',
      basicInformation: null,
      waitingProjects: [],
      carouselData: [
        {
          instrument: '科力飞电子伽马刀',
          status: 1,
        }],
      pros_columns: [
        {
          title: '好转',
          width: 50,
          type: 'd',
        },
        {
          title: '疾病(或异常)',
          key: '',
        },
        {
          title: '确诊日期',
          key: '',
        },
      ],
      tableData: data,
      addClinicalArr: [],
      controlModal: false,
      // 输入建议
      inputTextArea: '',
      suggestModal: false,
      adviceModalArea: '',
      adviceModal: false,
      columns: [
        {
          title: '科室名称',
          key: 'officeName',
          width: 150,
        },
        {
          title: '组合项目名称',
          key: 'proj_group',
          width: 190,
        },
        {
          title: '影像',
          key: 'image',
          width: 55,
        },
        {
          title: '科室小结',
          key: 'conslusion',
          width: 339,
        },
        {
          title: '分科医生',
          key: 'doctor',
          width: 86,
        },
        {
          title: '结论及建议',
          key: 'result_suggest',
          width: 253,
        },
        {
          title: '弃检',
          key: 'give_up',
          width: 70,
        },
        {
          title: '建议复查',
          key: 'checkup_again',
          width: 70,
        },
      ],
      waitingAndCompleteData: {
        columns: [
//          {
//            title: '序号',
//            key: 'index',
//            width: 50,
//          },
          {
            title: '体检号',
            key: 'pe_sn',
            width: 100,
          },
          {
            title: '姓名',
            key: 'customerName',
            // width: 80,
          },
//          {
//            title: '退回',
//            width: 70,
//          },
        ],
        waitingData: [],
        completeData: [],
      },
      isShowExamBox: false,
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapActions('mainInspectionTableModule', [
      'projectGet',
      'projectPost',
      'changAddPut',
      'projectGetBasic',
      'projectHasChosen',
      'deptsGet',
      'waitingAndComplete',
    ]),
    healthDoc() {
//
    },
    addClinicalClick() {
      console.log('1')
      this.$refs.addClinicalModal.open()
    },
    // 多选框的值
    checkValue(data) {
      let temp = data
      console.log(temp, 'fgfffffffffffffff')
      for (let a of temp) {
        this.$nextTick(() => {
          // 目前还没有去重
          this.addClinicalArr.push(a)
        })
      }
      console.log(data)
    },
    TransitionFlexCansle(data) {
      console.log(data)
      this.addClinicalArr.splice(data, 1)
    },
    //  清空诊断
    cleanClinical() {
      console.log('12')
      this.controlModal = true
    },
    delCancel() {
      this.controlModal = false
    },
    // 确认清空
    affirmDel() {
      this.addClinicalArr = []
      this.controlModal = false
    },
    //  清空诊断
    cleanSuggest() {
      this.suggestModal = true
    },
    suggestDelCancel() {
      this.suggestModal = false
    },
    // 确认清空
    suggestAffirmDel() {
      this.inputTextArea = ''
      this.suggestModal = false
    },
    //  清空诊断
    cleanAdvice() {
      this.adviceModal = true
    },
    adviceDelCancel() {
      this.adviceModal = false
    },
    // 确认清空
    adviceAffirmDel() {
      this.adviceModalArea = ''
      this.adviceModal = false
    },
    handleTrSpread(officeName, data) {
      this.$refs.canMoveModal.open()
      console.log(8888, officeName, data)
    },
    // 复查项目
    openReviewModal() {
      console.log(111)
      console.log('this.$refs.reviewModal', this.$refs.reviewModal)
      this.$refs.reviewModal.openM()
    },
    openCheckupModal() {
      this.isShowExamBox = !this.isShowExamBox
    },
    informationQuery(num) {
      this.projectGetBasic(num).then((data) => {
//        console.log('------------', data)
        this.basicInformation = data
        this.deptsGet(data.id).then((deptsData) => {
//          console.log('-=-deptsData', data.id, deptsData)
//          let tdata = this.tableDataConvert(deptsData)
          console.log('=====', deptsData)
          this.tableData = this.tableDataConvert(deptsData)
          this.waitingProjects = deptsData.pe_group_item.filter((item) => { return true })
          console.log('-=-=-=', this.waitingProjects)
//          console.log('==after convert', tdata)
        })
//        console.log(this.basicInformation.customer.realname)
      }).catch(() => {
        this.basicInformation = null
      })
      if (num !== this.pe_sn) {
        this.pe_sn = num
        this.$refs.simpleSearchTable.cancelSelect()
      }
    },
    tableDataConvert(data) {
      return (() => {
        let resultObj = {}
        data.pe_group_item.forEach((item) => {
          try {
            if (!resultObj[item.pedept.dept_name]) {
              resultObj[item.pedept.dept_name] = []
            }
            resultObj[item.pedept.dept_name].push({
              proj_group: item.group_item && item.group_item.name,
//                image: item.pe_item.image_pic,
              image: (() => {
                let arr = []
                item.pe_item.forEach((item2) => {
                  arr.push(item2.image_pic)
                })
                return arr
              })(),
              conslusion: item.pedept.summary,
              doctor: item.pedept.staff.realname,
              result_suggest: item.pedept.pe_dept_cnclsn && (() => {
                let advice = ''
                item.pedept.pe_dept_cnclsn.forEach((conclusion) => {
                  advice += conclusion.advice + ';'
                })
                if (advice.length) {
                  return advice.substr(0, advice.length - 1)
                } else {
                  return ''
                }
              })(),
              give_up: item.statsu === 0,
              checkup_again: item.is_reexam,
              isExpand: item.pe_item.length > 0,
            })
          } catch (e) {
            console.error(e)
          }
        })
        let result = []
        Object.keys(resultObj).forEach((key) => {
          result.push({
            officeName: key,
            children: resultObj[key],
          })
        })
        return result
      })()
    },
    rowclick(row) {
      this.pe_sn = row.pe_sn
      this.informationQuery(row.pe_sn)
    },
//    impressionQuery(inspection_id) {
//
//    },
  },
  mounted() {
    // TODO  4是临时的
    this.waitingAndComplete(4 || this.userInfo.id).then((data) => {
      if (data) {
        this.waitingAndCompleteData.waitingData.length = 0
        data.check.forEach((item, index) => {
          this.waitingAndCompleteData.waitingData.push({
            data: {
              pe_sn: (() => {
                try {
                  return item.examine[0].pe_sn
                } catch (e) {
                  return ''
                }
              })(),
              customerName: item.realname,
            },
            lockType: (() => {    // 0：未锁定  1：非当前医生锁定  2：当前医生锁定
              try {
                if (item.examine[0].is_lock) {
                  if (item.examine[0].lock_staff_id === this.userInfo.id) {
                    return 2
                  } else {
                    return 1
                  }
                } else {
                  return 0
                }
              } catch (e) {
                return 0
              }
            })(),
          })
        })
        this.waitingAndCompleteData.completeData.length = 0
        data.check_out.forEach((item, index) => {
          this.waitingAndCompleteData.completeData.push({
            data: {
              pe_sn: (() => {
                try {
                  return item.examine[0].pe_sn
                } catch (e) {
                  return ''
                }
              })(),
              customerName: item.realname,
            },
            lockType: (() => {    // 0：未锁定  1：非当前医生锁定  2：当前医生锁定
              try {
                if (item.examine[0].is_lock) {
                  if (item.examine[0].lock_staff_id === this.userInfo.id) {
                    return 2
                  } else {
                    return 1
                  }
                } else {
                  return 0
                }
              } catch (e) {
                return 0
              }
            })(),
          })
        })
//        console.log('-===-=-=-=', this.waitingAndCompleteData.waitingData, this.waitingAndCompleteData.completeData)
      }
    }).catch((err) => {
      if (err) {
        console.error(err)
      }
    })
  },
}
</script>
<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.mainInspectionTable{
  .titlecompelet{
    width:calc(~'100% - 525px');
  }
  .buttonArr{
    width: 375px;
    margin-left: 150px;
  }
  .floatL{
    float: left;
  }
  .floatR{
    float: right;
  }
  .marginR20{
    margin-right: 20px;
  }
  .marginR10{
    margin-right: 10px;
  }
 width: 100%;
 height: 100%;
 padding: 10px;
 .mainInspectionTable-head{
   width: 100%;
   height: 30px;
 }
 .mainInspectionTable-body{
   margin-top: 10px;
   display: flex;
   height: calc(~'100% - 50px');
   width: 100%;
   .body-left{
      width: 330px;
      height: 100%;
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      box-shadow: 0 1px 6px 0 rgba(206,213,242,0.80);
      border-radius: 8px;
     float: left;
      /*flex-grow: 1;*/
     .body-left-top{
       border-bottom: 1px solid #D9D9D9;
       height: 60px;
       font-size: 20px;
       color: #111111;
      letter-spacing: 0.06px;
      padding-top: 20px;
      .body-left-top-span{
        margin-left: 20px;
        font-weight: 550;
      }
     }
     .body-left-body{
       padding:10px;
       .body-left-body-first{
         border: 1px solid #D9D9D9;
         border-radius: 8px;
         overflow: hidden;
         height:220px;
         margin-bottom: 10px;
       }
       .body-left-body-secend{
         border: 1px solid #D9D9D9;
         border-radius: 8px;
         overflow: hidden;
         height: 100%;
         margin-bottom: 10px;
       }
     }
   }
   .body-right{
     float: left;
     /*flex-grow: 0;*/
     margin-left: 10px;
     width: 500px;
     .right-above{
       height: 205px;
       border-radius: 8px;
       background: #FFFFFF;
       border: 1px solid #D9D9D9;
       box-shadow: 0 1px 6px 0 rgba(206, 213, 242, 0.80);
       overflow-x: auto;
       overflow-y: hidden;
       width: 100%;
             /*display: flex;*/
     }
     .right-bottom{
       border-radius: 8px;
       background: #FFFFFF;
        border: 1px solid #D9D9D9;
        box-shadow: 0 1px 6px 0 rgba(206,213,242,0.80);
       height: 100%;
       overflow-y: scroll;
       overflow-x: hidden;
       margin-top: 10px;
       padding: 0 10px 10px 10px;
       .ward-impression-time{
         height: 45px;
         color: #737373;
         padding-left:10px;
         line-height: 45px;
         .margin30{
           margin-left: 30px;

         }
       }
       .ward-impression{
         border-radius: 8px;
         margin-top: 10px;
         min-height: 200px;
         border: 1px solid #D9D9D9;
                      .marg10{
               margin-right: 10px;
             }
          .checkup-result{
            td{
              padding: 0 8px;
              div{
                // word-break: keep-all;
                // white-space: nowrap;
                // overflow: hidden;
                // text-overflow: ellipsis;
              }
            }

          }
         .ward-impression-body{
           height: 150px;
           width: 100%;
           padding: 10px;
           border-top: 1px solid #D9D9D9;
           .ward-impression-body-changge{
             background: #F2F7FF;
             border-radius: 4px;
             width: 100%;
             height:130px;
             padding:  0;
              textarea.ivu-input {
                    resize: none;
                    padding-top: 7PX;
                    padding-right: 10px;
                    padding-left: 10px;
                    padding-bottom: 7px;
                    font-size: 12px;
                    line-height: 20px;
                    height:130px;
                    border: none;
             background: #F2F7FF;
                }
           }
           .ward-impression-body-content{
             background: #F2F7FF;
             border-radius: 4px;
             width: 100%;
             height:130px;
              padding: 0 10px 10px 0;
             .rightClassTransitionFlex{
                cursor: pointer;
                position: absolute;
                width: 14px;
                height:14px;
                background: @menuTreeBorder;
                border-radius:14px;
                line-height: 12px;
                text-align: center;
                top:-7px;
                right:-7px;
                >svg{
                  width: 8px;
                  height: 8px;
                  color:  @tableTr
              }
            }
            .rightClassTransitionFlex:hover{
              cursor: pointer;
              background: @tsIconHover;
            }
      .ward-impression-body-forerach{
               padding: 4px 25px;
               width: auto;
               float: left;
               background: #FFFFFF;
               border: 1px solid #CCCCCC;
               height:30px;
               margin-left: 10px;
               margin-top: 10px;
               position: relative;
             }
             .ward-impression-body-forerach:nth-child(1){
               padding: 4px 25px;
               width: auto;
               float: left;
               background: #FFFFFF;
               border: 1px solid #CCCCCC;
               height:30px;
             }
           }
           .ward-impression-body-content-add{
             float: left;
             padding:0;
             width: 30px;
             height: 30px;
             margin-left:10px;
             margin-top: 10px;
             background: #FFFFFF;
            border: 1px dashed  #008CEE;
            position: relative;
            div:nth-child(1){
              position: absolute;
              width: 14px;
              height: 2px;
              top:14px;
              left: 7.5px;
              background: #008CEE;
            }
            div:nth-child(2){
              position: absolute;
              width: 2px;
              height: 14px;
              top:8px;
              left: 13.5px;
              background: #008CEE;
            }
           }
         }
       }
     }
   }
 }
}
</style>
