/** 
* @author wzd
* @date 2018/01/10
* @content 新增或修改职业危害因素modal
*/ 
<template>
  <div class="addOrModifyOccupHarmFactor">
     <Modal v-model="controlModal" :styles='{width:"394px"}'
      :transition-names='[]'
      :mask-closable="false"
      :transfer='false'
      :closable="false">
      <div slot="header">
        <p name='amof-alertHeader' class="amof-alertHeader font14">
          <span class="amof-alertHeaderText font16">{{headerText}}</span>
        </p>
      </div>
      <div class="amof-mian">
        <ul>
          <li class="firstRow lis">
            <span class="firstRow-span">危害因素类别</span>
            <Select v-model="factorType" filterable>
              <Option v-for="item in factorTypes" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </li>
          <li class="secondRow lis">
            <!-- <Input placeholder="请搜索职业危害因素名称"></Input> -->
            <localSearchInput 
            :inputText="'请搜索职业危害因素名称'"
            :inputWidth="354"
            @search-key="getSearchKey"></localSearchInput>
          </li>
          <li class="thirdRow lis">
            <CheckboxGroup v-model="selectFactor">
              <ul class="checkBoxes">
                <li v-for="(item,index) in factorListTemp" :key="index" class="checkBox">
                  <Checkbox :label="item.id">
                    <!-- :class="{checkOne: isCheckOne(index)}" -->
                    <span class="li-span" :ref='"span"+index'>
                      {{item.name}}
                    </span>
                  </Checkbox>
                </li>
              </ul>
            </CheckboxGroup>
          </li>
        </ul>
      </div>
      <div slot="footer">
        <div class="amof-modelFooter">
          <Button type="primary" @click="addAffirm">确 认</Button><Button type="ghost" @click="addCancel">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex' // mapState, mapActions

import localSearchInput from '@/components/localSearchInput'
export default {
  name: 'addOrModifyOccupHarmFactor',
  components: {
    localSearchInput,
  },
  props: {
    controlModal: { // 控制开关
      type: Boolean,
      default: false,
    },
    headerText: { // title
      type: String,
      default: '新增职业危害因素',
    },
    factorTypes: { // 获取危害因素类型
      type: Array,
    },
    // factorList: { // 获取危害因素列表
    //   type: Array,
    // },
  },
  data () {
    return {
      factorType: '', // 双向绑定危害因素类别
      // factorTypes: [],
      factorList: [], // 危害因素列表(恒定副本)
      factorListTemp: [], // 危害因素列表(操作副本)
      selectFactor: [], // 选中的危害因素
      selectFactorOne: '', // 危害因素类别
    }
  },
  methods: {
    addAffirm () { // 新增确认
      // console.log('1', this.factorListTemp)
      // console.log('2', this.selectFactor)
      // let temp = this.factorListTemp.filter((item, index) => {
      //   console.log(item.id)
      //   return (item.id in this.selectFactor)
      // })
      let temp = []
      let factorListTemp = this.factorListTemp
      for (let i = 0; i < factorListTemp.length; i++) {
        for (let j = 0; j < this.selectFactor.length; j++) {
          if (factorListTemp[i].id === this.selectFactor[j]) {
            temp.push(factorListTemp[i])
          }
        }
      }
      this.$emit('add-affirm-factor', temp, false)
    },
    addCancel () { // 新增取消
      this.$emit('cancel-add-factor', false)
      this.factorType = ''
      this.factorList = []
      this.factorListTemp = []
    },
    // 传回搜索框实时检索
    getSearchKey (value) {
      console.log('getSearchKey', value)
      console.log(this.factorList.length)
      if (value.trim() === '') {
        console.log(11222)
        console.log(this.HarmFactorList)
        this.factorListTemp = this.HarmFactorList.filter((item) => {
          return (item.type_id === this.selectFactorOne)
        })
        return
      }
      let temp = this.factorList.filter((item) => {
        return (item.name.indexOf(value.trim()) !== -1)
      })
      this.factorListTemp = temp
    },
    // 判断checkbox是否被选中
    // isCheckOne (index) {
    //   console.log(this.selectFactor)
    //   this.selectFactor.map((item) => {
    //     console.log(item)
    //     if (item === index) {
    //       console.log(1111222)
    //       return true
    //     } else {
    //       return false
    //     }
    //   })
    // },
    ...mapActions('categoriesAndFactorsModule', [
      'getHarmCategory', // 危害类别
      'getHarmFactor', // 危害因素
    ]),
  },
  computed: {
    ...mapGetters('categoriesAndFactorsModule', [
      'harmCategoryList', // 危害类别
      'HarmFactorList', // 危害因素
    ]),
  },
  watch: {
    async factorType (newVal, oldVal) {
      // 对危害因素列表进行查询筛选
      this.selectFactor = []
      this.selectFactorOne = newVal
      await this.getHarmFactor({size: 0, status: 1})
      // this.factorList = this.HarmFactorList
      this.factorList = this.HarmFactorList.filter((item) => {
        return (item.type_id === newVal)
      })
      this.factorListTemp = this.factorList
    },
    selectFactor (newVal, oldVal) {
      // this.factorListTemp.forEach((item, index) => {
      //   // console.log(index)
      //   // console.log(this.$refs['span' + index])
      //   this.$refs['span' + index][0].style.color = '#737373'
      // })
      // newVal.forEach((item) => {
      //   // console.log('span' + item)
      //   this.$refs['span' + item][0].style.color = '#008CEE'
      //   // console.log(this.$refs['span' + item])
      // })
    },
  },
  // mounted () {
  //   console.log('mounted')
  //   this.getHarmCategory()
  //   console.log(this.harmCategoryList)
  //   this.factor_types = this.harmCategoryList
  // },
}
</script>
<style lang="less">
  @import '~assets/less/variable.less';
  // .addOrModifyOccupHarmFactor {
  //   .ivu-modal {
  //     height: calc(~'100% - 40px');
  //     max-height: 487px;
  //     .ivu-modal-content {
  //       height: 100%;
  //       .ivu-modal-body {
  //         height: calc(~'100% - 101px');
  //         .amof-mian {
  //           overflow: auto;
  //           height: 100%;
  //         }
  //       }
  //     }
  //   }
  // }
  .addOrModifyOccupHarmFactor {
    .amof-alertHeader {
      background-color: #F2F5FA;
      line-height: 50px;
      height: 50px;
      color: @gradeAshOne;
      letter-spacing: 0.04px;
      font-weight: normal;
      .amof-alertHeaderText::before {
        content: '';
        width: 3px;
        height: 17px;
        margin-right: 8px;
        display: inline-block;
        vertical-align: middle;
        background-color: @gradeBlueOne;
        position: relative;
        top: -.7px;
      }
    }
    .amof-modelFooter {
      height: 50px;
      Button {
        width: 74px;
        height: 30px;
        margin-right: 20px;
        margin-bottom: 20px;
      }
    }
    .amof-mian {
      padding: @num20 @num20 0;
      ul {
        font-size: 0;
        .lis {
          margin-bottom: @num20;
          .firstRow-span {
            font-size: @font12;
            color: @gradeAshThree;
            letter-spacing: 0;
            display: inline-block;
            // margin-right: @num10;
          }
        }
        .firstRow {
          height: 30px;
          line-height: 30px;
          width: 354px;
          .ivu-select-single {
            vertical-align: top;
            display: inline-block;
            width: 271px;
            margin-left: 7px;
          }
        }
        .secondRow {

        }
        .thirdRow {
          // height: 200px;
          // overflow: scroll-y;
          .checkBoxes {
            width: 353.5px;
            overflow-y: scroll;
            max-height: 245px;
            padding: @num20;
            background: #FAFAFA;
            border: 1px solid @mainMenuBorder;
            border-radius: @borderRadiuSmall;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            .checkBox:nth-of-type(2n) {
              margin-left: @num30;
            }
            .checkBox {
              font-size: @font12;
              color: @gradeAshThree;
              letter-spacing: 0.34px;
              width: 135px;
              .ivu-checkbox-wrapper {
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              // .li-span {
              //   width: 99px;
              //   height: 16px;
              //   text-overflow: ellipsis;
              //   overflow: hidden;
              //   white-space: nowrap;
              // }
            }
          }
        }
      }
    }
    .ivu-checkbox {
      width: 15px;
      height: 15px;
      // margin-right: 6px;
      position: relative;
      top: 0;
      
    }
    .amof-mian ul .lis span {
      margin-right: 3px!important;
    }
    .ivu-modal-body {
      // overflow: scroll;
      height: auto !important;
    }
    .ivu-modal-content {
      height: auto !important;
    }
    // .checkOne {
    //   color: @gradeBlueOne;
    // }
    .ivu-modal {
      height: auto!important;
    }
  }
</style>
