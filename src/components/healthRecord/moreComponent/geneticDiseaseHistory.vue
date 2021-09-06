<template>
  <div class="geneticDiseaseHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>遗传病史、药物过敏史、暴露史、残疾情况</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr geneticDiseaseHistory-title-btn"
               style="margin-left:10px"
               @click="isAllPickUp">
            <Icon :type="thisItems ? 'arrow-up-b' : 'arrow-down-b'"
                  size="8"
                  color="white"
                  style="margin-top:5px;"></Icon>
          </div>
          <Dropdown style="margin-left: 20px"
                    @on-click="selcetDropDown">
            <Button type="ghost">
              新 增
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem v-for="(item, index) of disease"
                            :name="item.name"
                            :key="index">{{item.name}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </titleHasSlotMiddle>
    <div v-if="thisItems"
         class="thisItems">
      <div class="geneticDiseaseHistory-table">
        <Row>
          <div class="fl">
            <div class="geneticDiseaseHistory-table-left"
                 v-for="(item, index) of disease"
                 :key="index">
              <div>{{item.name}}</div>
            </div>
          </div>
          <div class="fl" >
            <div class="geneticDiseaseHistory-table-right-one"
                 v-for="(item, index) of diseaseData"
                 :key="index">
              <div class="fl " style="margin-left:10px;"
                   v-for="(key, indexofkey) of item"
                   :key="indexofkey">{{key.name==='其他'?key.remark:key.name}}</div>
            </div>
          </div>

        </Row>
      </div>
    </div>
    <addGeneticDiseaseHistory :id="basicInformationData.id"
                              :Model="addMedicalHistory"
                              :name="name"
                              @addAbolish="addAbolish"
                              ref="addGeneticDiseaseHistory"
                              @refresh="refresh"></addGeneticDiseaseHistory>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import addGeneticDiseaseHistory from '../modal/addGeneticDiseaseHistory'
export default {
  name: 'geneticDiseaseHistory',
  data() {
    return {
      //
      unfold() {
        this.thisItems = true
      },
      retract() {
        this.thisItems = false
      },
      thisItems: false,
      basicInformationRule: {},
      clect: '',
      // 摩太框
      addMedicalHistory: false,
      disease: [
        { name: '遗传病史' },
        { name: '药物过敏史' },
        { name: '暴露史' },
        { name: '残疾情况' },
      ], // 疾病史基础数据
      diseaseData: [[], [], [], []],
      transmitData: [],
      name: '',
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    addGeneticDiseaseHistory,
  },
  watch: {
    basicInformationData(val) {
      if (val) {
        if (val.heredityist) {
          for (let key of val.heredityist) {
            if (key.type) {
              this.diseaseData[key.type - 1] = key.value
              this.transmitData[key.type - 1] = key
            }
          }
        }
      }
    },
  },
  props: {
    allItems: {
      type: Boolean,
      defalut: false,
    },
    basicInformationData: {
      type: [Object, Array],
    },
  },
  methods: {
    //
    refresh() {
      this.$emit('refresh')
      this.addAbolish()
    },
    isAllPickUp() {
      this.thisItems = !this.thisItems
    },
    openM() {
      this.addMedicalHistory = true
      console.log('打开', this.addMedicalHistory)
    },
    addAbolish() {
      this.addMedicalHistory = false
    },
    // 打开模态框
    selcetDropDown() {
      this.name = arguments[0]
      this.$nextTick(() => {
        if (this.name) {
          this.addMedicalHistory = true
          this.$refs.addGeneticDiseaseHistory.openM(this.transmitData)
        }
      })
      console.log(arguments[0], 'a')
    },
  },
  mounted() {
    console.log('1')
  },
}
</script>
<style >

</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.geneticDiseaseHistory {
    .ivu-dropdown-item:hover{
    background: #E8F2FF;
  }
  overflow: hidden;
  /*   .thisItems{
    border-top: 1px solid #cccccc;
  } */
  .geneticDiseaseHistory-table-left {
    text-align: center;
    width: 170px;
    height: 40px;
    background: #e8f2ff;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    padding-top: 10px;
  }
  .geneticDiseaseHistory-table-left:last-child {
    border-bottom: none;
  }
  .geneticDiseaseHistory-table-left-big {
    text-align: center;
    width: 170px;
    height: 80px;
    background: #e8f2ff;
    line-height: 80px;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
  /*   .geneticDiseaseHistory-table-left:last-child{
   text-align: center;
   width: 170px;
   height: 40px;
   background: #e8f2ff;
   line-height: 40px;
   border-right: 1px solid #D9D9D9;
   border-bottom: none;
  } */
  .geneticDiseaseHistory-table-right-one {
    width: 813px;
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
    text-align: left;
    line-height: 30px;
    padding: 5px;
      overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .geneticDiseaseHistory-table-right-one:last-child {
    border-bottom: none;
  }
  .geneticDiseaseHistory-table-right-two {
    width: 813px;
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
    text-align: left;
    line-height: 30px;
    overflow: hidden;
  }
  .geneticDiseaseHistory-table-right-two:last-child {
    width: 813px;
    border-bottom: none;
    height: 40px;
    text-align: left;
    line-height: 30px;
  }
  .geneticDiseaseHistory-table-right-one-item {
    height: 30px;
    //  border: 1px solid #D9D9D9;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    margin-left: 10px;
  }
  .geneticDiseaseHistory-table-right-two-name {
    width: 140px;
    height: 40px;
    background: #e8f2ff;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .geneticDiseaseHistory-table-right-two-nameValue {
    width: 297px;
    height: 40px;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .geneticDiseaseHistory-table-right-two-data {
    width: 140px;
    height: 40px;
    background: #e8f2ff;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .geneticDiseaseHistory-table-right-two-dataValue {
    width: 236px;
    height: 40px;
    text-align: center;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  background: #ffffff;
  border: 1px solid #e0e0e0;
  /*   box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
 */
  border-radius: 8px;
  .geneticDiseaseHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
  }
  .geneticDiseaseHistory-title-btn:hover {
    cursor: pointer;
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .geneticDiseaseHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .geneticDiseaseHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .geneticDiseaseHistory-row {
    height: 30px;
  }
  .geneticDiseaseHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .geneticDiseaseHistory-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .marginL30px {
    margin-left: 30px;
  }
  .marginT15 {
    margin-top: 15px;
  }
  .geneticDiseaseHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>