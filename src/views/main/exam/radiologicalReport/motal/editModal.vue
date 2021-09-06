<template>
  <div class="editModal"
       v-if="delModel">
    <Modal v-model="delModel"
           width='937'
           :transition-names='[]'
           :transfer='false'
           :closable="false"
           :mask-closable="false">
      <div slot="header">
        <p name='adm-alertHeader'
           class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16"
               >{{ headerText }}</span>
        </p>
      </div>
      <div class="adm-main">
        <!-- 左边 -->
          <div class="adm-main-left fl">
            <!-- 第一排 -->
            <Row class="adm-main-lef-row">
              <div class="fl  ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:75px">体检号</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:142px;"
                      ></Input>
                </div>
              </div>        
              <div class="fl marginL20 ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:49px">姓名</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:142px;"
                      ></Input>
                </div>
              </div>        
          </Row>
            <!-- 第二排 -->
            <Row class="adm-main-lef-row marginT20">
              <div class="fl  ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:75px">性别</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:142px;"
                      ></Input>
                </div>
              </div>        
              <div class="fl marginL20 ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:49px">电话</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:142px;"
                      ></Input>
                </div>
              </div>        
          </Row>
            
            <!-- 第三排 -->
            <Row class="adm-main-lef-row marginT20">
              <div class="fl  ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:75px">身份证号</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:142px;"
                      ></Input>
                </div>
              </div>        
              <div class="fl marginL20 ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:49px">登记日期</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:142px;"
                      ></Input>
                </div>
              </div>        
          </Row>
            
            
            <!-- 第四排 -->
            <Row class="adm-main-lef-row marginT20">
              <div class="fl  ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:75px">单位名称</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:362px;"
                      ></Input>
                </div>
              </div>               
          </Row>
                        <!-- 第五排 -->
            <Row class="adm-main-lef-row marginT20">
              <div class="fl  ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:75px">部门/车间</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:142px;"
                      ></Input>
                </div>
              </div>        
              <div class="fl marginL20 ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:49px">剂量</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:142px;"
                      ></Input>
                </div>
              </div>        
          </Row>
                        <!-- 第六排 -->
            <Row class="adm-main-lef-row marginT20">
              <div class="fl  ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:75px">职业照射种类</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:362px;"
                      ></Input>
                </div>
              </div>               
          </Row>
                                  <!-- 第五排 -->
            <Row class="adm-main-lef-row marginT20">
              <div class="fl  ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:75px">申请类型</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:142px;"
                      ></Input>
                </div>
              </div>        
              <div class="fl marginL20 ">
                <div class="adm-main-lef-row-text fl textJustify"
                    style="height:30px;width:49px">变更内容</div>
                <div class="basicInformation-input fl">
                  <Input :disabled="true"
                        style="width:142px;"
                      ></Input>
                </div>
              </div>        
          </Row>
          </div>
          <!-- 右边表格 -->
          <div  class="adm-main-right fl">
              <Row class="adm-main-right-row">
              <div class="fl  ">
                <div class="adm-main-right-row-text fl textJustify"
                    style="height:30px;width:48px">培训</div>
                <div class="basicInformation-input fl">
                    <RadioGroup v-model="disabledGroup">
                        <Radio label="1" >有</Radio>
                        <Radio label="0">无</Radio>
                    </RadioGroup>
                </div>
              </div>                
             </Row>
             <!-- 第二排 -->
              <Row class="adm-main-right-row marginT20">
                <div class="fl  ">
                  <div class="adm-main-right-row-text fl textJustify"
                      style="height:30px;width:48px">培训日期</div>
                  <div class="basicInformation-input fl">
                    <DatePicker type="datetime"  style="width: 134px;height:30px;"></DatePicker>

                  </div>
                </div>                
                <div class="fl  marginL20">
                  <div class="adm-main-right-row-text fl textJustify"
                      style="height:30px;width:72px">培训结果</div>
                  <div class="basicInformation-input fl">
                      <Select v-model="model8" clearable style="width:134px;height:30px;">
                          <Option value="1" >男</Option>
                      </Select>                
                    </div>
                </div>                
             </Row>
             <!-- 第三排 -->
              <Row class="adm-main-right-row marginT20">
                <div class="fl  ">
                  <div class="adm-main-right-row-text fl textJustify"
                      style="height:30px;width:48px">发证日期</div>
                  <div class="basicInformation-input fl">
                    <DatePicker type="datetime"  style="width: 134px;height:30px;"></DatePicker>

                  </div>
                </div>                
                <div class="fl  marginL20">
                  <div class="adm-main-right-row-text fl textJustify"
                      style="height:30px;width:72px">开始放射日期</div>
                  <div class="basicInformation-input fl">
                    <DatePicker type="datetime" style="width: 134px;height:30px;" placement="left-start"></DatePicker>               
                    </div>
                </div>                
             </Row>
             <!-- 第四排 -->
              <Row class="adm-main-right-row marginT20">
                <div class="fl  ">
                  <div class="adm-main-right-row-text fl textJustify"
                      style="height:30px;width:48px">备注</div>
                  <div class="basicInformation-input fl">
                    <Input type="textarea"
                           :rows="3"
                           style="width:370px;height:80px;"
                           class="addOccupationalHistory-input-textAre"></Input>
                  </div>
                </div>                           
             </Row>
             <!-- 第五排 -->
              <Row class="adm-main-right-row marginT20">
                <div class="fl  ">
                  <div class="adm-main-right-row-text fl textJustify"
                      style="height:30px;width:48px">原因</div>
                  <div class="basicInformation-input fl">
                    <Input type="textarea"
                           :rows="3"
                           style="width:370px;height:80px;"
                           class="addOccupationalHistory-input-textAre"></Input>
                  </div>
                </div>                           
             </Row>
          </div> 
      </div>
      <div style="padding:0 20px;">
          <Row class="adm-main-right-row adm-main-right-row-changgeword" style="color:#737373">
              <p>最后修改人：王大大大<span style="margin-left:20px;">最后修改时间：2018年3月5日17:29:45</span></p>                         
          </Row>
      </div>

      <div slot="footer">
        <div class="adm-modelFooter">
          <Button type="ghost"
                  class="cancelDelBtn fr marginR20"
                  @click="abolish">取 消</Button>

          <ZButtonHasBg class=" marginR20 fr"
                        @click="affirm()">保 存</ZButtonHasBg>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
export default {
  name: 'editModal',
  data() {
    return {
      delModel: false,
      disabledGroup: '',
    }
  },
  props: {
    headerText: {
      // title
      type: String,
      default: '编辑上报中人员',
    },
  },
  components: {
    ZButtonHasBg,
  },
  methods: {
    // 打开莫泰框
    openM() {
      this.delModel = true
    },
    // 关闭莫泰框
    closeM() {
      this.delModel = false
    },
    setData(val) {
      this.delModel = true
    },
    // 确认 函数
    affirm() {
      console.log('确认')
    },
    abolish() {
      this.closeM()
    },
  },
}
</script>
<style lang="less">
// @import (reference) '~assets/less/variable.less';
@import '~assets/less/variable.less';
.editModal {
  .marginT20{
    margin-top: 20px;
  }
  .marginL20{
    margin-left: 20px;
  }
  .ivu-modal-content {
    overflow: hidden;
  }
  .adm-alertHeader {
    background-color: @gradeBlueFive;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    font-weight: normal;
    .adm-alertHeaderText::before {
      content: '';
      width: 3px;
      height: 17px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      background-color: @gradeBlueOne;
    }
  }
  .adm-main {
    height: 350px;
    text-align: center;
    font-size: 12px;
    color: #4a4a4a;
    letter-spacing: 0;
    margin-top: 20px;
    width: 100%;
    padding: 0 20px;
    .adm-main-left{
     width: 50%;
     min-height: 20px;
     .adm-main-lef-row{
        .adm-main-lef-row-text {
            line-height: 30px;
            font-size: 12px;
            color: #737373;
            letter-spacing: 0;
            margin-right: 10px;
       }     
         .adm-main-lef-row-input {
        margin-left: 10px;
        display: inline-block;
        flex: 1;
        }     
     }
    }
   .adm-main-right{
     margin-left: 20px;
     min-height: 20px;
     .adm-main-right-row{
        .adm-main-right-row-text {
            line-height: 30px;
            font-size: 12px;
            color: #737373;
            letter-spacing: 0;
            margin-right: 10px;
       }     
         .adm-main-right-row-input {
        margin-left: 10px;
        display: inline-block;
        flex: 1;
        }     
     }
    }
  }
  .adm-modelFooter {
    height: 50px;
    Button {
      width: 74px;
      height: 30px;
    }
  }
}
</style>
