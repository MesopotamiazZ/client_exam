<template>
<div class="hr">
  <div class="inputResult">
    <div class="logo"  @click='goUnitExam'>
        <Icon  :color='iconColor' type="android-arrow-dropleft-circle"></Icon> <span>结果录入</span>
    </div>
  </div>
  <div style="background:#ffffff;">
    <div class="inputentering" :style="{height:$store.state.windowHeight-170 + 'px'}">
      <!-- 王树彤健康档案行 -->
      <div class="title">
        王树彤健康档案 
        <div class="buttonright">
          <Button type="primary" style="margin-right:5px;">保存</Button>
          <Button type="ghost">取消</Button>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="jibenxinxi">
        <div class="duo">
          <div class="duocom">
              <span class="healthyHeardText font14">基本信息</span>
          </div>
        </div>
        <div class="xinxikuang">
          <div class="kuangLeft">
            <ul>
              <li>
                <p class="textJustify textJustify1 fl">个人档案编号</p> 
                <div class="fl" style="width:179px;">
                  <input class="" readonly="readonly" placeholder="20171116001">
                </div>
              </li>
              <li>
                <p class="textJustify textJustify1 fl">区域档案编号</p> 
                <div class="fl" style="width:179px;">
                  <input class="" readonly="readonly" placeholder="20171116001">
                </div>
              </li>
              <li>
                <p class="fl textJustify textJustify2" >姓名</p> 
                <div class="fl" style="width:103px;">
                  <input class="" readonly="readonly" placeholder="王树兵">
                </div>
              </li>
              <li>
                <p class="fl textJustify textJustify2">性别</p> 
                <div class="fl" style="width:67px;">
                  <input class="" readonly="readonly" placeholder="女">
                </div>
              </li>
              <li>
                <p class="textJustify textJustify1 fl">出生年月</p>
                <div class="fl" style="width:179px;">
                  <input class="" readonly="readonly" placeholder="1990-12-21">
                </div>
              </li>
              <li>
                <p class="textJustify textJustify1 fl">身份证号码</p>
                <div class="fl" style="width:179px;">
                  <input class="" readonly="readonly" placeholder="510621199012218765">
                </div>
              </li>
              <li>
                <p class="textJustify textJustify2 fl">手机号码</p>
                <div class="fl" style="width:103px;">
                  <input class="" readonly="readonly" placeholder="510621199012218765">
                </div>
              </li>
              <li>
                <p class="fl textJustify textJustify2">血型</p>
                <div class="fl" style="width:67px;">
                  <input class="" readonly="readonly" placeholder="">
                </div>
              </li>
              <li>
                <p class="textJustify textJustify1 fl">文化程度</p>
                <div class="fl" style="width:179px;">
                  <input class="" readonly="readonly" placeholder="本科">
                </div>
              </li>
              <li>
                <p class="textJustify textJustify1 fl">婚姻状态</p> 
                <div class="fl" style="width:179px;">
                  <input class="" readonly="readonly" placeholder="保密">
                </div>
              </li>
              <li>
                <p class="fl textJustify textJustify2" >其他证件</p>
                <div class="fl" style="width:253px;">
                  <input class="" readonly="readonly" placeholder="">
                </div>
              </li>
            </ul>
          </div>
          <div class="kuangright"></div>
          <ul>
            <li>
              <p class="textJustify textJustify1 fl">联系人姓名</p> 
              <div class="fl" style="width:179px;">
                <input class="" readonly="readonly" placeholder="20171116001">
              </div>
            </li>
            <li>
              <p class="textJustify textJustify1 fl">联系人电话</p> 
              <div class="fl" style="width:179px;">
                <input class="" readonly="readonly" placeholder="15181721111">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify3" >医疗费用支付方式</p> 
              <div class="fl" style="width:312px;">
                <input class="" readonly="readonly" placeholder="新型农村合作医疗、城镇居民基本医疗保险、其他...">
              </div>
            </li>
            <li>
              <p class="textJustify textJustify1 fl">医疗保险号</p> 
              <div class="fl" style="width:179px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="textJustify textJustify1 fl">医疗卡号</p> 
              <div class="fl" style="width:179px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >农合卡号</p> 
              <div class="fl" style="width:360px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 详细信息-->
      <div class="xiangxixinxi">
        <div class="duo">
          <div class="duocom">
            <span class="healthyHeardText font14">详细信息</span>
          </div>
        </div>
        <div class="xiangxikuang">
          <ul>
            <li>
              <p class="fl textJustify textJustify2" >工作单位</p>
              <div class="fl" style="width:489px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >职位职称</p>
              <div class="fl" style="width:360px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >国籍</p>
              <div class="fl" style="width:96px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >民族</p>
              <div class="fl" style="width:122px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >籍贯</p>
              <div class="fl" style="width:105px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >出生地</p>
              <div class="fl" style="width:360px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >邮政编码</p>
              <div class="fl" style="width:96px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >家庭编号</p>
              <div class="fl" style="width:122px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >户主关系</p>
              <div class="fl" style="width:105px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >家庭地址</p>
              <div class="fl" style="width:360px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >血缘关系</p>
              <div class="fl" style="width:96px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >居住类型</p>
              <div class="fl" style="width:122px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >居民类型</p>
              <div class="fl" style="width:105px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify1" >村(居)委会</p>
              <div class="fl" style="width:132px;">
                <input class="" readonly="readonly" placeholder="">
              </div>
            </li>
            <li>
              <p class="fl textJustify textJustify2" >贫困人群</p>
              <div class="fl" style="width:120px;">
                <input class="" readonly="readonly" placeholder="否">
              </div>
            </li>
          </ul>
        </div>
      </div>


      <!-- 更多 -->
      <div class="gengduo" v-show="true">
        <div class="duo">
          <div class="duocom">
            <span class="healthyHeardText font14">更多</span>
          </div>
          <div class="zhankai" @click="allDisplay">
            <span>全部展开</span>
              <!-- <Icon type="ios-arrow-up"></Icon> -->
              <img src="/static/icons/public/db_arrow_down.png" alt="down" style="margin-bottom: 1px;margin-left: 1px;">
          </div>
          <div class="shouqi" @click="allPackUp">
            <span >全部收起</span>
            <!-- <Icon type="ios-arrow-down"></Icon> -->
            <img src="/static/icons/public/db_arrow_up.png" alt="up" style="margin-bottom: 1px;margin-left: 1px;">
          </div>
        </div>
        <div class="moreContent">
          <!-- 既往史 -->
          <div class="jiwangshi">
              <div class="jiwangshi_shouqi">
                <span class="heal_jiwangshi">既往史</span>
                <img @click="jiwangshiClick" :src="imgs1" class="fr concelButton">
              </div>
              <div class="jiwangshiContent" ref="jiwangshiContent" v-if="jiwangshiFlag"><!-- 既往史内容 -->
                <ul class="">
                  <li class="flex">
                    <div class="bingshi1">
                        疾病史
                      </div>
                      <div class="bingshi_Checkbox flx1">
                        <Checkbox-group :model.sync="fruit">
                          <ul>
                            <li class="fl textJustify textJustify3">
                              <Checkbox value="">无</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">高血压</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">糖尿病</Checkbox>
                            </li> 
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">重性精神疾病</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">恶性肿瘤</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">肝炎</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">结核病</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">冠心病</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">慢性阻塞性肺疾病</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">其他法定传染病</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">脑卒中</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">职业病</Checkbox>
                            </li>
                            <li  class="fl textJustify textJustify3">
                              <Checkbox value="">其他</Checkbox>
                            </li>
                          </ul>
                        </Checkbox-group>
                      </div>
                  </li>
                  <li class="flex">
                    <div class="shoushushi1" :style="{height: getHeight + 'px', lineHeight: getHeight + 'px'}">
                      手术史
                      <img src="/static/icons/public/push.png" alt="shoushushi" @click="insertRow">
                    </div>
                    <div class="shoushushi2 flx1">
                      <insert-row :rowCouters="rowCouters"></insert-row>
                      <!-- <ul>
                        <li class="ssText">手术名称</li>
                        <li class="ssInput1">
                          <input type="text" value="剖腹产手术">
                        </li>
                        <li class="ssText">手术日期</li>
                        <li class="ssInput2">
                          <input type="text" value="2017-11-22">
                        </li>
                      </ul>
                      <ul>
                        <li class="ssText">手术名称</li>
                        <li class="ssInput1">
                          <input type="text" value="阑尾炎手术">
                        </li>
                        <li class="ssText">手术日期</li>
                        <li class="ssInput2">
                          <input type="text" value="2017-11-22">
                        </li>
                      </ul> -->
                    </div>
                  </li>
                  <li class="flex">
                    <div class="waishangshiTitle">
                      外伤史
                    </div>
                    <div class="waishangshiSelect flx1">
                      <Select @on-change="selectChange" v-model="waishangModel" class="marginL5" style="width: 65px;" placeholder="无">
                        <Option v-for="item in waishangList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <input type="text" v-if="isShowInput1" class="marginL5 marginR5 marginT5 marginB5">
                    </div>
                    <div class="shuxueshiTitle">
                      输血史
                    </div>
                    <div class="shuxueshiSelect flx1">
                      <Select v-model="shuxueModel" class="marginL5" style="width: 65px;" placeholder="无">
                        <Option v-for="item in shuxueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                  </li><!-- 外伤史/输血史 -->
                  <li class="flex">
                    <div class="geneticTitle">
                      家族遗传病
                    </div>
                    <div class="geneticSelect">
                      <Select v-model="geneticModel" class="marginL5" style="width: 65px;" placeholder="无">
                        <Option v-for="item in geneticList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                    <div class="relationTitle">
                      关系
                    </div>
                    <div class="relationSelect">
                      <Select v-model="relationModel" class="marginL5" style="width: 153px;" placeholder="父子">
                        <Option v-for="item in relationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                    <div class="geneticName">
                      选择家族病名称
                    </div>
                    <div class="geneticNameSelect flx1">
                      <Select v-model="geneticNameModel" class="marginL5" style="width: 97%;" placeholder="慢性阻塞性肺病">
                        <Option v-for="item in geneticNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                  </li><!-- 家族遗传史 -->
                  <li class="flex">
                    <div class="guominTitle">
                      药物过敏史
                    </div>
                    <div class="guominSelect flx1">
                      <Select v-model="guominModel" class="marginL5" style="width: 65px;" placeholder="无">
                        <Option v-for="item in waishangList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                    <div class="otherTitle">
                      其他过敏史
                    </div>
                    <div class="otherSelect flx1">
                      <Select v-model="otherModel" class="marginL5" style="width: 65px;" placeholder="无">
                        <Option v-for="item in shuxueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                  </li><!-- 过敏史 -->
                  <li class="flex">
                    <div class="baoluTitle">
                      暴露史
                    </div>
                    <div class="baoluSelect flx1">
                      <Select v-model="baoluModel" class="marginL5" style="width: 65px;" placeholder="无">
                        <Option v-for="item in waishangList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                    <div class="disabledTitle">
                      残疾情况
                    </div>
                    <div class="disabledSelect flx1">
                      <Select v-model="disabledModel" class="marginL5" style="width: 65px;" placeholder="无">
                        <Option v-for="item in shuxueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                  </li><!-- 暴露史/残疾情况 -->
                </ul>
              </div>
          </div>

          <!-- 婚姻史 -->
          <div class="hunyinshi">
            <div class="hunyinshi_shouqi">
                  <span class="heal_hunyinshi">婚姻史</span>
                  <img @click="hunyinshiClick" :src="imgs2" class="fr concelButton">
                </div>
              <div class="hunyinshiContent" v-if="hunyinshiFlag">
                <ul style="with:100%">
                  <li class="flex">
                    <span class="hunyinshispan" ><span>婚姻史</span></span>
                    <div class="hunyinsiRadio flx1">
                      <Radio-group v-model="animal">
                        <Radio label="未婚"></Radio>
                        <Radio label="已婚"></Radio>
                        <Radio label="离婚"></Radio>
                        <Radio label="丧偶"></Radio>
                        <Radio label="不详"></Radio>
                      </Radio-group>
                    </div>
                  </li>
                  <li class="flex">
                    <div class="flx1" style="">
                      <span class="hunyinshispan2">配偶出生年月</span>
                      <div class="inputchusheng inputOutDiv flx1"> 
                        <input class="inputchushengInput inputInDiv" placeholder="" ></Input>
                      </div>
                    </div>
                    <div class="flx1" style="">
                      <span class="hunyinshispan2">配偶接触放射性情况</span>
                      <div class="inputchusheng inputOutDiv flx1"> 
                        <input class="inputchushengInput inputInDiv" placeholder="" ></Input>
                      </div>
                    </div>
                    
                  </li>
                  <li class="flex">
                    <div class="flx1" style="">
                      <span class="hunyinshispan2">结婚日期</span>
                      <div class="inputchusheng inputOutDiv flx1"> 
                        <input class="inputchushengInput inputInDiv" placeholder="" ></Input>
                      </div>
                    </div>
                    <div class="flx1" style="">
                      <span class="hunyinshispan2">配偶职业及健康情况</span>
                      <div class="inputchusheng inputOutDiv flx1"> 
                        <input class="inputchushengInput inputInDiv" placeholder="" ></Input>
                      </div>
                    </div>
                    
                  </li>
                </ul>
              
              </div>
          </div>
          <!-- 职业疾病史 -->
          <div class="zhiyejibingshi">
              <div class="zhiyejibingshi_shouqi">
                  <span class="heal_zhiyejibingshi">职业疾病史</span>
                  <img @click="zhiyejibingshiClick" :src="imgs7" class="fr concelButton">
                </div>
                <div class="zhiyejibingshiContent" v-if="zhiyejibingshiFlag">
                  <Row>
                    <Col span="2" style="background: #E8F2FF;">车间</Col>
                    <Col span="3"><input placeholder="" class="zhiyejbingshi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">工种</Col>
                    <Col span="4"> 
                        <Select v-model="zhiyemodel1" style="width:152px" placeholder="配气工">
                        <Option v-for="item in zhiyeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="3" style="background: #E8F2FF;">生产日期</Col>
                    <Col span="2" ><input placeholder="" class="zhiyejbingshi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">工龄</Col>
                    <Col span="2" ><input placeholder="" class="zhiyejbingshi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">接害工龄</Col>
                    <Col span="2"  style="border-right:none !important;"><input class="zhiyejbingshi"></input></Col>
                    
                  </Row>
                  <Row>
                      <Col span="2" style="background: #E8F2FF;">车间</Col>
                      <Col span="9"> 
                        <Select v-model="guwufenchenmodel1" style="width:360px" placeholder="谷物粉尘（游离SiOn含量<10%）">
                        <Option v-for="item in guwuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </Col>
                      <Col span="3" style="background: #E8F2FF;">照射种类代码</Col>
                      <Col span="10"  style="border-right:none !important;"> 
                        <Select v-model="daimamodel1" style="width:400px" placeholder="FSB02">
                        <Option v-for="item in daimaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </Col>
                  </Row>
                  <Row>
                    <Col span="2" style="background: #E8F2FF;">档案备注</Col>
                    <Col span="22" style="border-right:none;"><input class="zhiyejbingshi"></input></Col>
                  </Row>
                  <Tabs :animated="false">
                          <TabPane label="职业史">
                            <div class="table">
                            <handsontable @editRow="editRow" @deleteRow="deleteRow" :data="data1" :colHeaders="colHeaders1" :columns="columns1" :width="0" :height="160" style="text-align:center"></handsontable>
                            </div>
                          </TabPane>
                          <TabPane label="放射工作职业史">
                            <div class="table">
                            <handsontable @editRow="editRow" @deleteRow="deleteRow" :data="data2" :colHeaders="colHeaders2" :columns="columns2" :width="0" :height="160" style="text-align:center"></handsontable>
                            </div>
                          </TabPane>
                          <TabPane label="职业病史">
                            <div class="table">
                            <handsontable @editRow="editRow" @deleteRow="deleteRow" :data="data3" :colHeaders="colHeaders3" :columns="columns3" :width="0" :height="160" style="text-align:center"></handsontable>
                            </div>
                          </TabPane>
                          <TabPane label="既往病史">
                            <div class="table">
                            <handsontable @editRow="editRow" @deleteRow="deleteRow" :data="data4" :colHeaders="colHeaders4" :columns="columns4" :width="0" :height="160" style="text-align:center"></handsontable>
                            </div>
                          </TabPane>
                          <TabPane label="档案图书资料">
                            <div class="table">
                            <handsontable @editRow="editRow" @deleteRow="deleteRow" :data="data5" :colHeaders="colHeaders5" :columns="columns5" :width="0" :height="160" style="text-align:center"></handsontable>
                            </div>
                          </TabPane>
                  </Tabs>
                </div>
          </div>
          <!-- 个人生活 -->
          <div class="gerenshenghuo">
                <div class="gerenshenghuo_shouqi">
                  <span class="heal_gerenshenghuo">个人生活</span>
                  <img @click="gerenshenghuoClick" :src="imgs6" class="fr concelButton">
                </div>
                <div class="gerenshenghuoContent" v-if="gerenshenghuoFlag">
                  <Row>
                    <Col span="3" style="background: #E8F2FF;">生活史小结</Col>
                    <Col span="21" style="border-right:none;"><input class="inputgerenshenghuo"></input></Col>
                  </Row>
                  <Row>
                    <Col span="3" style="background: #E8F2FF;">吸烟情况</Col>
                    <Col span="3">
                        <Select v-model="xiyanmodel1" style="width:110px" placeholder="无">
                        <Option v-for="item in xiyanList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="6"><input class="inputgerenshenghuo inputgerenshenghuo2"/><label>支 / 天</label></Col>
                    <Col span="6"><label>共</label><input class="inputgerenshenghuo inputgerenshenghuo2"/><label>年</label></Col>
                    <Col span="6" style="border-right:none;"><label>戒烟</label><input class="inputgerenshenghuo inputgerenshenghuo2"/><label>年</label></Col>
                  </Row>
                  <Row>
                    <Col span="3" style="background: #E8F2FF;">饮酒情况</Col>
                    <Col span="3">
                        <Select v-model="yinjiumodel1" style="width:110px" placeholder="无">
                        <Option v-for="item in yinjiuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="6"><input class="inputgerenshenghuo inputgerenshenghuo2"/><label>ml / 天</label></Col>
                    <Col span="6"><label>共</label><input class="inputgerenshenghuo inputgerenshenghuo2"/><label>年</label></Col>
                    <Col span="6" style="border-right:none;"><label>戒烟</label><input class="inputgerenshenghuo inputgerenshenghuo2"/><label>年</label></Col>
                  </Row>
                  <Row>
                    <Col span="3" style="background: #E8F2FF; border-bottom:none;">其他嗜好</Col>
                    <Col span="21" style="border-right:none;  border-bottom:none;"><input class="inputgerenshenghuo"></input></Col>
                  </Row>
                </div>
          </div>
          <!-- 生活环境史 -->
          <div class="shenghuohuanjingshi">
              <div class="shenghuohuanjingshi_shouqi">
                  <span class="heal_shenghuohuanjingshi">生活环境史</span>
                  <img @click="shenghuohuanjingshiClick" :src="imgs3" class="fr concelButton">
                </div>
                <div class="shenghuohuanjingshiContent" v-if="shenghuohuanjingshiFlag">
                    <ul style="with:100%">
                      <li class="flex">
                      <span class="shenghuohuanjingshispan" ><span>厨房排风设施</span></span>
                        <div class="shenghuohuanjingshiCheckbox flx1">
                            <CheckboxGroup  v-model="animal">
                                <Checkbox label="无"></Checkbox>
                                <Checkbox label="油烟机"></Checkbox>
                                <Checkbox label="换气扇"></Checkbox>
                                <Checkbox label="烟"></Checkbox>
                            </CheckboxGroup>
                        </div>
                      </li> 
                      <li class="flex">
                      <span class="shenghuohuanjingshispan" ><span>燃料类型</span></span>
                        <div class="shenghuohuanjingshiCheckbox flx1">
                            <CheckboxGroup  v-model="animal">
                                <Checkbox label="液化气"></Checkbox>
                                <Checkbox label="煤"></Checkbox>
                                <Checkbox label="天然气"></Checkbox>
                                <Checkbox label="沼气"></Checkbox>
                                <Checkbox label="柴火"></Checkbox>
                                <Checkbox label="其他"></Checkbox>
                            </CheckboxGroup>
                        </div>
                      </li> 
                      <li class="flex">
                      <span class="shenghuohuanjingshispan" ><span>饮水</span></span>
                        <div class="shenghuohuanjingshiCheckbox flx1">
                            <CheckboxGroup  v-model="animal">
                                <Checkbox label="自来水"></Checkbox>
                                <Checkbox label="井水"></Checkbox>
                                <Checkbox label="潮河水"></Checkbox>
                                <Checkbox label="塘水"></Checkbox>
                                <Checkbox label="经净化过的水"></Checkbox>
                                <Checkbox label="其他"></Checkbox>
                            </CheckboxGroup>
                        </div>
                      </li> 
                      <li class="flex">
                      <span class="shenghuohuanjingshispan" ><span>厕所</span></span>
                        <div class="shenghuohuanjingshiCheckbox flx1">
                            <CheckboxGroup  v-model="animal">
                                <Checkbox label="卫生厕所"></Checkbox>
                                <Checkbox label="马桶"></Checkbox>
                                <Checkbox label="露天粪坑"></Checkbox>
                                <Checkbox label="简易棚厕"></Checkbox>
                                <Checkbox label="一格或二格粪池式"></Checkbox>
                                <Checkbox label="其他"></Checkbox>
                            </CheckboxGroup>
                        </div>
                      </li> 
                      <li class="flex">
                      <span class="shenghuohuanjingshispan" style="border-bottom:none;"><span>禽畜栏</span></span>
                        <div class="shenghuohuanjingshiCheckbox flx1">
                            <CheckboxGroup  v-model="animal">
                                <Checkbox label="无"></Checkbox>
                                <Checkbox label="单设"></Checkbox>
                                <Checkbox label="室内"></Checkbox>
                                <Checkbox label="室外"></Checkbox>
                            </CheckboxGroup>
                        </div>
                      </li> 
                    </ul>
                </div>
          </div>
          <!-- 月经史 -->
          <div class="yuejingshi">
                <div class="yuejingshi_shouqi">
                  <span class="heal_yuejingshi">月经史</span>
                  <img @click="yuejingshiClick" :src="imgs4" class="fr concelButton">
                </div>
                <div class="yuejingshiContent" v-if="yuejingshiFlag">
                  <Row>
                    <Col span="2" style="background: #E8F2FF;">初潮(岁)</Col>
                    <Col span="2"><input placeholder="" class="inputyuejingshi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">经期(天)</Col>
                    <Col span="2"><input placeholder="" class="inputyuejingshi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">周期(天)</Col>
                    <Col span="3" ><input placeholder="" class="inputyuejingshi"></input></Col>
                    <Col span="3" style="background: #E8F2FF;">停经年龄(岁)</Col>
                    <Col span="3"><input placeholder="" class="inputyuejingshi"></input></Col>
                    <Col span="3" style="background: #E8F2FF;">末次月经时间</Col>
                    <Col span="2" style="border-right:none"><input class="inputyuejingshi" ></input></Col>
                    
                  </Row>
                </div>
          </div>
          <!-- 生育史 -->
          <div class="shengyushi">
                <div class="shengyushi_shouqi">
                  <span class="heal_shengyushi">生育史</span>
                  <img @click="shengyushiClick" :src="imgs5" class="fr concelButton">
                </div>
                <div class="shengyushiContent" v-if="shengyushiFlag">
                  <Row>
                    <Col span="3" style="background: #E8F2FF;">现有子女(人)</Col>
                    <Col span="3"><input placeholder="" class="inputshengyushi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">活产(次)</Col>
                    <Col span="2"><input placeholder="" class="inputshengyushi"></input></Col>
                    <Col span="3" style="background: #E8F2FF;">早产(次)</Col>
                    <Col span="2" ><input placeholder="" class="inputshengyushi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">死产(次)</Col>
                    <Col span="2"><input placeholder="" class="inputshengyushi"></input></Col>
                    <Col span="3" style="background: #E8F2FF;">异常(胎)</Col>
                    <Col span="2" style="border-right:none"><input class="inputshengyushi" ></input></Col>
                  </Row>
                  <Row>
                    <Col span="3" style="background: #E8F2FF;">孕(次)</Col>
                    <Col span="3"><input placeholder="" class="inputshengyushi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">活产(次)</Col>
                    <Col span="2"><input placeholder="" class="inputshengyushi"></input></Col>
                    <Col span="3" style="background: #E8F2FF;">自然流产(次)</Col>
                    <Col span="2" ><input placeholder="" class="inputshengyushi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">多胎(次)</Col>
                    <Col span="2"><input placeholder="" class="inputshengyushi"></input></Col>
                    <Col span="3" style="background: #E8F2FF;">异位妊娠(次)</Col>
                    <Col span="2" style="border-right:none"><input class="inputshengyushi" ></input></Col>
                  </Row>
                  <Row>
                    <Col span="3" style="background: #E8F2FF;">不孕不育原因</Col>
                    <Col span="21" style="border-right:none"><input class="inputshengyushi2"></input></Col>
                  </Row>
                  <Row>
                    <Col span="3" style="background: #E8F2FF;">现有男孩(人)</Col>
                    <Col span="3"><input placeholder="" class="inputshengyushi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">出生日期</Col>
                    <Col span="7"><input placeholder="" class="inputshengyushi3"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">健康状况</Col>
                    <Col span="7" style="border-right:none"><input class="inputshengyushi3"></input></Col>
                  </Row>
                  <Row>
                    <Col span="3" style="background: #E8F2FF;">现有女孩(人)</Col>
                    <Col span="3"><input placeholder="" class="inputshengyushi"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">出生日期</Col>
                    <Col span="7"><input placeholder="" class="inputshengyushi3"></input></Col>
                    <Col span="2" style="background: #E8F2FF;">健康状况</Col>
                    <Col span="7" style="border-right:none"><input class="inputshengyushi3"></input></Col>
                  </Row>
                </div>
          </div>
          <!-- 其他 -->
          <div class="qita">
              <div class="qita_shouqi">
                  <span class="heal_qita">其他</span>
                  <img @click="qitaClick" :src="imgs8" class="fr concelButton">
              </div>
              <div class="qitaContent" v-if="qitaFlag">
                    <div class="titlecenter">
                    问诊
                    </div>
                    <tag-selector :sourceData="tagData" @getSelectData="getSelect"></tag-selector>
                    <div class="titlecenter">
                    自觉症状
                    </div>
                    <div class="table">
                      <handsontable @editRow="editRow" @deleteRow="deleteRow" :data="data6" :colHeaders="colHeaders6" :columns="columns6" :width="0" :height="160" style="text-align:center"></handsontable>
                    </div>
              </div>
          </div>
        </div>
      </div>
    </div>   
  </div>
</div>

</template>
<script>
import handsontable from '@/components/table/handsontable'
import tagSelector from '@/components/tagSelector'
import healthyHeard from './components/healthyHeard'
import insertRow from './components/insertRow.vue'
export default {
  name: 'inputResult',
  components: {
    handsontable,
    tagSelector,
    healthyHeard,
    insertRow,
  },
  data () {
    return {
      rowCouters: [
        {},
      ], // 用于insertRow的计数
      jiwangshiFlag: false,
      hunyinFlag: false,
      animal: '未婚',
      value: '',
      imgSrc1: '/static/icons/public/blue_triangle_down.png',
      imgSrc2: '/static/icons/public/blue_triangle_up.png',
      imgs1: '/static/icons/public/blue_triangle_up.png',
      imgs2: '/static/icons/public/blue_triangle_up.png',
      imgs3: '/static/icons/public/blue_triangle_up.png',
      imgs4: '/static/icons/public/blue_triangle_up.png',
      imgs5: '/static/icons/public/blue_triangle_up.png',
      imgs6: '/static/icons/public/blue_triangle_up.png',
      imgs7: '/static/icons/public/blue_triangle_up.png',
      imgs8: '/static/icons/public/blue_triangle_up.png',
      isShowInput1: false, // 是否显示input
      waishangModel: '',
      shuxueModel: '',
      geneticModel: '',
      relationModel: '',
      geneticNameModel: '',
      guominModel: '',
      otherModel: '',
      baoluModel: '',
      disabledModel: '',
      zhiyemodel1: '',
      guwufenchenmodel1: '',
      daimamodel1: '',
      xiyanmodel1: '',
      yinjiumodel1: '',
      colHeaders1: ['', '工作单位', '起始年月', '终止时间', '车间', '工种', '有害因素名称', '有害因素浓度', '防护措施'],
      data1: [
        {id: '', gongzuodanwei: '', qizhishijian: '', zhongzhishiian: '', chejian: '', gongzhong: '', youhaiyinsumingcheng: '', youhaiyinsunongdu: '', fanghucuoshi: ''},
        {id: '', gongzuodanwei: '', qizhishijian: '', zhongzhishiian: '', chejian: '', gongzhong: '', youhaiyinsumingcheng: '', youhaiyinsunongdu: '', fanghucuoshi: ''},
        {id: '', gongzuodanwei: '', qizhishijian: '', zhongzhishiian: '', chejian: '', gongzhong: '', youhaiyinsumingcheng: '', youhaiyinsunongdu: '', fanghucuoshi: ''},
      ],
      columns1: [
        {data: 'id', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 32},
        {data: 'gongzuodanwei', renderer: 'html', className: 'htCenter htMiddle', width: 182},
        {data: 'qizhishijian', renderer: 'html', className: 'htCenter htMiddle', width: 100},
        {data: 'zhongzhishiian', renderer: 'html', className: 'htCenter htMiddle', width: 100},
        {data: 'chejian', renderer: 'html', className: 'htCenter htMiddle', width: 84},
        {data: 'gongzhong', renderer: 'html', className: 'htCenter htMiddle', width: 88},
        {data: 'youhaiyinsumingcheng', renderer: 'html', className: 'htCenter htMiddle', width: 110},
        {data: 'youhaiyinsunongdu', renderer: 'html', className: 'htCenter htMiddle', width: 124},
        {data: 'fanghucuoshi', renderer: 'html', className: 'htCenter htMiddle', width: 158},
      ],
      colHeaders2: ['', '工作单位', '起始年月', '终止时间', '部门', '工种', '放射线种类', '每日工作时数或工作量', '累计受照剂量'],
      data2: [
        {id: '', gongzuodanwei2: '', qizhishijian2: '', zhongzhishiian2: '', bumen: '', gongzhong2: '', fangshexian: '', meirigongzuoliang: '', leiji: ''},
        {id: '', gongzuodanwei2: '', qizhishijian2: '', zhongzhishiian2: '', bumen: '', gongzhong2: '', fangshexian: '', meirigongzuoliang: '', leiji: ''},
        {id: '', gongzuodanwei2: '', qizhishijian2: '', zhongzhishiian2: '', bumen: '', gongzhong2: '', fangshexian: '', meirigongzuoliang: '', leiji: ''},
      ],
      columns2: [
        {data: 'id', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 32},
        {data: 'gongzuodanwei2', renderer: 'html', className: 'htCenter htMiddle', width: 182},
        {data: 'qizhishijian2', renderer: 'html', className: 'htCenter htMiddle', width: 100},
        {data: 'zhongzhishiian2', renderer: 'html', className: 'htCenter htMiddle', width: 100},
        {data: 'bumen', renderer: 'html', className: 'htCenter htMiddle', width: 84},
        {data: 'gongzhong2', renderer: 'html', className: 'htCenter htMiddle', width: 88},
        {data: 'fangshexian', renderer: 'html', className: 'htCenter htMiddle', width: 110},
        {data: 'meirigongzuoliang', renderer: 'html', className: 'htCenter htMiddle', width: 140},
        {data: 'leiji', renderer: 'html', className: 'htCenter htMiddle', width: 142},
      ],
      colHeaders3: ['', '病名', '诊断日期', '诊断单位', '治疗经过', '转归', '是否痊愈'],
      data3: [
        {id: '', bingming: '', zhenduanriqi: '', zhenduandanwei: '', zhiliaojingguo: '', zhuangui: '', shifouquanyu: ''},
        {id: '', bingming: '', zhenduanriqi: '', zhenduandanwei: '', zhiliaojingguo: '', zhuangui: '', shifouquanyu: ''},
        {id: '', bingming: '', zhenduanriqi: '', zhenduandanwei: '', zhiliaojingguo: '', zhuangui: '', shifouquanyu: ''},
      ],
      columns3: [
        {data: 'id', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 32},
        {data: 'bingming', renderer: 'html', className: 'htCenter htMiddle', width: 182},
        {data: 'zhenduanriqi', renderer: 'html', className: 'htCenter htMiddle', width: 100},
        {data: 'zhenduandanwei', renderer: 'html', className: 'htCenter htMiddle', width: 174},
        {data: 'zhiliaojingguo', renderer: 'html', className: 'htCenter htMiddle', width: 214},
        {data: 'zhuangui', renderer: 'html', className: 'htCenter htMiddle', width: 157},
        {data: 'shifouquanyu', renderer: 'html', className: 'htCenter htMiddle', width: 128},
      ],
      colHeaders4: ['', '疾病类型', '病名', '诊断日期或年限', '诊断单位', '是否痊愈', '备注'],
      data4: [
        {id: '', jibingleixing: '', bingming: '', zhenduanriqi: '', zhenduandanwei4: '', shifouquanyu4: '', beizhu: ''},
        {id: '', jibingleixing: '', bingming: '', zhenduanriqi: '', zhenduandanwei4: '', shifouquanyu4: '', beizhu: ''},
        {id: '', jibingleixing: '', bingming: '', zhenduanriqi: '', zhenduandanwei4: '', shifouquanyu4: '', beizhu: ''},
      ],
      columns4: [
        {data: 'id', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 32},
        {data: 'jibingleixing', renderer: 'html', className: 'htCenter htMiddle', width: 152},
        {data: 'bingming', renderer: 'html', className: 'htCenter htMiddle', width: 141},
        {data: 'zhenduanriqi', renderer: 'html', className: 'htCenter htMiddle', width: 110},
        {data: 'zhenduandanwei4', renderer: 'html', className: 'htCenter htMiddle', width: 220},
        {data: 'shifouquanyu4', renderer: 'html', className: 'htCenter htMiddle', width: 90},
        {data: 'beizhu', renderer: 'html', className: 'htCenter htMiddle', width: 252},
      ],
      colHeaders5: ['', '图片类型', '图片名称', '导入日期', '导入人'],
      data5: [
        {id: '', tupianleixing: '', tupianmingcheng: '', daoruriqi: '', daoruren: ''},
        {id: '', tupianleixing: '', tupianmingcheng: '', daoruriqi: '', daoruren: ''},
        {id: '', tupianleixing: '', tupianmingcheng: '', daoruriqi: '', daoruren: ''},
      ],
      columns5: [
        {data: 'id', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 32},
        {data: 'tupianleixing', renderer: 'html', className: 'htCenter htMiddle', width: 219},
        {data: 'tupianmingcheng', renderer: 'html', className: 'htCenter htMiddle', width: 334},
        {data: 'daoruriqi', renderer: 'html', className: 'htCenter htMiddle', width: 191},
        {data: 'daoruren', renderer: 'html', className: 'htCenter htMiddle', width: 211},
      ],
      colHeaders6: ['', '症状', '程度', '出现时间'],
      data6: [
        {id: '', zhengzhuang: '', chengdu: '', chuxianshijian: ''},
        {id: '', zhengzhuang: '', chengdu: '', chuxianshijian: ''},
        {id: '', zhengzhuang: '', chengdu: '', chuxianshijian: ''},
      ],
      columns6: [
        {data: 'id', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 65},
        {data: 'tupianleixing', renderer: 'html', className: 'htCenter htMiddle', width: 446},
        {data: 'tupianmingcheng', renderer: 'html', className: 'htCenter htMiddle', width: 253},
        {data: 'daoruriqi', renderer: 'html', className: 'htCenter htMiddle', width: 231},
      ],
      tagData: [
        '头晕',
        '失眠',
        '视力下降',
        '记忆力减退',
        '记忆力减退',
        '记忆力减退严重',
      ],
      waishangList: [
        {
          value: '无',
          label: '无',
        },
        {
          value: '有',
          label: '有',
        },
      ],
      shuxueList: [
        {
          value: '无',
          label: '无',
        },
        {
          value: '有',
          label: '有',
        },
      ],
      geneticList: [
        {
          value: '无',
          label: '无',
        },
        {
          value: '有',
          label: '有',
        },
      ],
      relationList: [
        {
          value: '父子',
          label: '父子',
        },
        {
          value: '父子',
          label: '父子',
        },
        {
          value: '母子',
          label: '母子',
        },
        {
          value: '母女',
          label: '母女',
        },
      ],
      geneticNameList: [
        {
          value: '慢性阻塞性肺疾病',
          label: '慢性阻塞性肺疾病',
        },
        {
          value: '血友病',
          label: '血友病',
        },
        {
          value: '先天性心脏病',
          label: '先天性心脏病',
        },
      ],
      zhiyeList: [
        {
          value: '配气工',
          label: '配气工',
        },
        {
          value: '电工',
          label: '电工',
        },
      ],
      guwuList: [
        {
          value: '谷物粉尘（游离SiOn含量<10%）',
          label: '谷物粉尘（游离SiOn含量<10%）',
        },
        {
          value: '无',
          label: '无',
        },
      ],
      daimaList: [
        {
          value: 'FSB02',
          label: 'FSB02',
        },
        {
          value: '无',
          label: '无',
        },
      ],
      xiyanList: [
        {
          value: '无',
          label: '无',
        },
        {
          value: '有',
          label: '有',
        },
      ],
      yinjiuList: [
        {
          value: '无',
          label: '无',
        },
        {
          value: '有',
          label: '有',
        },
      ],
    }
  },
  methods: {
    insertRow () {
      this.rowCouters.push({})
    },
    goUnitExam () {
      console.log(222)
    },
    iconColor () {
      console.log(222)
    },
    fruit () {
      console.log(111)
    },
    allDisplay () {
      this.jiwangshiFlag = true
      this.hunyinshiFlag = true
      this.shenghuohuanjingshiFlag = true
      this.yuejingshiFlag = true
      this.shengyushiFlag = true
      this.gerenshenghuoFlag = true
      this.zhiyejibingshiFlag = true
      this.qitaFlag = true
      this.imgs1 = this.imgSrc1
      this.imgs2 = this.imgSrc1
      this.imgs3 = this.imgSrc1
      this.imgs4 = this.imgSrc1
      this.imgs5 = this.imgSrc1
      this.imgs6 = this.imgSrc1
      this.imgs7 = this.imgSrc1
      this.imgs8 = this.imgSrc1
    },
    allPackUp () {
      this.jiwangshiFlag = false
      this.hunyinshiFlag = false
      this.shenghuohuanjingshiFlag = false
      this.yuejingshiFlag = false
      this.shengyushiFlag = false
      this.gerenshenghuoFlag = false
      this.zhiyejibingshiFlag = false
      this.qitaFlag = false
      this.imgs1 = this.imgSrc2
      this.imgs2 = this.imgSrc2
      this.imgs3 = this.imgSrc2
      this.imgs4 = this.imgSrc2
      this.imgs5 = this.imgSrc2
      this.imgs6 = this.imgSrc2
      this.imgs7 = this.imgSrc2
      this.imgs8 = this.imgSrc2
    },
    jiwangshiClick() {
      if (this.imgs1 === this.imgSrc1) {
        this.imgs1 = this.imgSrc2
        this.jiwangshiFlag = false
      } else {
        this.imgs1 = this.imgSrc1
        this.jiwangshiFlag = true
      }
    },
    hunyinshiClick () {
      if (this.imgs2 === this.imgSrc1) {
        this.imgs2 = this.imgSrc2
        this.hunyinshiFlag = false
      } else {
        this.imgs2 = this.imgSrc1
        this.hunyinshiFlag = true
      }
    },
    shenghuohuanjingshiClick () {
      if (this.imgs3 === this.imgSrc1) {
        this.imgs3 = this.imgSrc2
        this.shenghuohuanjingshiFlag = false
      } else {
        this.imgs3 = this.imgSrc1
        this.shenghuohuanjingshiFlag = true
      }
    },
    yuejingshiClick () {
      if (this.imgs4 === this.imgSrc1) {
        this.imgs4 = this.imgSrc2
        this.yuejingshiFlag = false
      } else {
        this.imgs4 = this.imgSrc1
        this.yuejingshiFlag = true
      }
    },
    shengyushiClick () {
      if (this.imgs5 === this.imgSrc1) {
        this.imgs5 = this.imgSrc2
        this.shengyushiFlag = false
      } else {
        this.imgs5 = this.imgSrc1
        this.shengyushiFlag = true
      }
    },
    gerenshenghuoClick () {
      if (this.imgs6 === this.imgSrc1) {
        this.imgs6 = this.imgSrc2
        this.gerenshenghuoFlag = false
      } else {
        this.imgs6 = this.imgSrc1
        this.gerenshenghuoFlag = true
      }
    },
    zhiyejibingshiClick () {
      if (this.imgs7 === this.imgSrc1) {
        this.imgs7 = this.imgSrc2
        this.zhiyejibingshiFlag = false
      } else {
        this.imgs7 = this.imgSrc1
        this.zhiyejibingshiFlag = true
      }
    },
    qitaClick () {
      if (this.imgs8 === this.imgSrc1) {
        this.imgs8 = this.imgSrc2
        this.qitaFlag = false
      } else {
        this.imgs8 = this.imgSrc1
        this.qitaFlag = true
      }
    },
    selectChange (value) {
      if (value === '有') {
        this.isShowInput1 = true
      } else {
        this.isShowInput1 = false
      }
    },
  },
  computed: {
    getHeight () {
      return (this.rowCouters.length) * 40
    },
  },
}
</script>
<style lang="less">
.hr {
  .ivu-checkbox-wrapper {
    margin-right: 0;
  }
}
</style>

<style lang='less'>
@import (reference) '~assets/less/variable.less';
// @import (reference) '~assets/less/color.less';
// @import (reference) '~assets/less/public.less';

.duo{
           background-color: #F2F5FA;
           line-height: 50px;
           height: 50px;
            // border-top-left-radius: 8px;
            // border-top-right-radius: 8px;
           color: @gradeAshOne;
           position: relative;
           letter-spacing: 0.04px;
             .healthyHeardText::before {
              content: '';
              width: 3px;
              height: 17px;
              margin-left:20px; 
              margin-right: 8px;
              display: inline-block;
              vertical-align: middle;
              background-color: #6DAAFF;
            
            
          }
            .duocom{
                width: 105px;
                height: 19px;
                span{
                display: inline-block;;
               
                }
              }
              .zhankai{
              color:#008CEE;
              display: inline-block;
               position: absolute;
               right: 20px;
               top: 0;
              }
              .shouqi{
                color:#008CEE;
               display: inline-block;
               position: absolute;
               right:100px;
               top: 0;
              }
         }
.inputResult{
    .logo{
        height:48px ;
        background: #F2F5FA;
        margin-left: 10px;
        display: inline-block;
        cursor: pointer;
        i{
          color: #008CEE;
        }
        span{
          line-height: 48px;
          color: #1770D7;
          font-size: 12px;
        }
      }
}
.inputentering{
    width: 1055px;
    overflow: scroll ; 
    margin: 0 auto;
    // overflow:hidden;
    .title{
      height: 66px;
      width: 100%;
      line-height: 66px;
      text-align: center;
      font-weight: bold ;
      background: #ffffff;
      font-size: 20px;
      color: #4A4A4A;
      position: relative;
     
      .buttonright{
          position: absolute;
          top: 0px;
          right: 20px;
         
          Button{
          width: 74px;
          height: 30px;
          font-size:12px;
          }
      }
    }
    .jibenxinxi{
        width:1035px;
        height: 301px;
        margin: 0px 10px;
        margin-bottom: 20px;
        border:1px solid #E0E0E0;
        background:#FFFFFF; 
        border-radius:5px;
        .xinxikuang{
          // outline:1px solid red;
          margin-top: 7px;

         ul{
            list-style:none; 
            li{
               float:left;
               margin-left: 20px;
               margin-right: 15px;
               margin-top: 15px;
              
               input{
              width: 100%;
              background: #F2F5FA;
              border:none;
              margin-left: 10px;
              margin-right: 7PX;
              padding-left: 10px;
               height: 30px;
               }
               .textJustify1 {
                 display:inline-block;
                 width:72px;
                 line-height:30px;
                 overflow: hidden; 
                 height:30px;
               }
               .textJustify2{
                  display:inline-block;
                  width:48px;
                  line-height:30px;
                  overflow: hidden;
                  height:30px;
               }
               .textJustify3{
                  display:inline-block;
                  width:96px;
                  line-height:30px;
                  overflow: hidden;
                  height:30px;
               }
             
            }
         }
          .kuangright{
            width: 92px;
            height: 120px;
            float: right;
            margin-right: 20px;
            margin-top:-76px;
            border:1px solid #008CEE ;
          }
          
          }
      }
  
  }
   .xiangxixinxi{
        width:1035px;
        height: 256px;
        margin: 0px 10px;
        border:1px solid #E0E0E0;
        background:#FFFFFF; 
        margin-bottom: 20px;
        border-radius:5px;
        .xiangxikuang{
          ul{
            list-style: none;
            li{
              float:left;
              margin-left: 20px;
               margin-right: 15px;
               margin-top: 15px;
              input{
              width: 100%;
              background: #F2F5FA;
              border:none;
              margin-left: 10px;
              margin-right: 7PX;
              padding-left: 10px;
               height: 30px;
               }
               .textJustify1 {
                 display:inline-block;
                 width:72px;
                 line-height:30px;
                 overflow: hidden; 
                 height:30px;
               }
                .textJustify2{
                  display:inline-block;
                  width:48px;
                  line-height:30px;
                  overflow: hidden;
                  height:30px;
               }
            }
          }
        }
      
   }
  .moreContent {
    margin: auto @num20 @num10 @num20;
  }
  .gengduo{
          width:1035px;
          height: auto;
          margin: 0px 10px;
          border:1px solid #E0E0E0;
        
        .jiwangshi{
           width:995px;
           height:auto;
           margin-top: @num10;
          //  margin: 20px;
           background: @backgourdWithe;
           border: 1px solid #E0E0E0;
           margin-bottom:10px;
           border-radius:5px;
           .jiwangshi_shouqi{
             display: inline-block;
             width:995px;
             height: 45px;
             line-height:45px; 
             border-bottom: 1px solid #E0E0E0;
             clear: both;
             position: relative;
              span{
                margin-left: 20px;
                font-size: 14px;
                color:#111111;
                display: inline-block;;
              }
              .concelButton {
                position: absolute;
                top: 12px;
                right: 15px;
              }
           }
              .bingshi1{
                // display: inline-block;
                 width:170px;
                 height:95px;
                 text-align: center;
                 line-height: 95px;
                 border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                 background: #E8F2FF;
                 box-sizing: border-box;
               }
               .bingshi_Checkbox{
                  display: inline-block;
                 width: 824px;
                 height:94px;
                  border-bottom: 1px solid #E0E0E0;
                 ul{
                   list-style: none;
                   li{
                      width: 119px;
                        height: 16px;
                        line-height: 16px;
                      margin: 10px 15px 0 16px;
                     
                   }
                   

                   }
               }
            .shoushushi1 { // 手术史title
              width:170px;
              // height:80px;
              text-align: center;
              // line-height: 80px;
              border-right: 1px solid #E0E0E0;
              border-bottom: 1px solid #E0E0E0;
              background: #E8F2FF;
              box-sizing: border-box;
              // position: relative;
              img {
                position: relative;
                top: 2px;
                right: -40px;
                cursor: pointer;
              }
            }
            .shoushushi2 { // 手术史content
              ul {
                font-size: 0;
                li {
                  display: inline-block;
                  font-size: 12px;
                  
                }
                .ssText {
                  height: 40px;
                  width: 140px;
                  line-height: 40px;
                  background-color: #E8F2FF;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  text-align: center;
                }
                .ssInput1 {
                  height: 40px;
                  width: 373px;
                  text-align: center;
                  // border-right: 1px solid #E0E0E0;
                  // border-bottom: 1px solid #E0E0E0;
                  line-height: 40px;
                }
                .ssInput2 {
                  height: 40px;
                  width: 171px;
                  text-align: center;
                  // border-right: 1px solid #E0E0E0;
                  // border-bottom: 1px solid #E0E0E0;
                  line-height: 40px;
                }
                input {
                  // border: 0;
                  outline: 0;
                  text-align: center;
                  // background-color: #E0E0E0;
                  width: 150px;
                  height: 40px !important;
                  width: 100%;
                  // height: 100%;
                }
              }
            } 
                // 外伤史/输血史
                .waishangshiTitle {
                  width:170px;
                  height:40px;
                  text-align: center;
                  line-height: 40px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  background: #E8F2FF;
                  box-sizing: border-box;
                }
                .waishangshiSelect {
                  height: 40px;
                  line-height: 37px;
                  border-bottom: 1px solid #E0E0E0;
                  input {
                    width: 240px;
                    height: 30px;
                    margin: 5px 5px 5px 5px;
                  }
                }
                .shuxueshiTitle {
                  width:170px;
                  height:40px;
                  text-align: center;
                  line-height: 40px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  border-left: 1px solid #E0E0E0;
                  background: #E8F2FF;
                  box-sizing: border-box;
                }
                .shuxueshiSelect {
                  height: 40px;
                  line-height: 37px;
                  border-bottom: 1px solid #E0E0E0;
                }
                // 家族遗传史
                .geneticTitle {
                  width:170px;
                  height:40px;
                  text-align: center;
                  line-height: 40px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  background: #E8F2FF;
                  box-sizing: border-box;
                }
                .geneticSelect {
                  height: 40px;
                  width: 75px;
                  line-height: 37px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                }
                .relationTitle {
                  height: 40px;
                  line-height: 40px;
                  width: 88px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  text-align: center;
                  background-color: #E8F2FF;
                }
                .relationSelect {
                  height: 40px;
                  line-height: 37px;
                  width: 165px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                }
                .geneticName {
                  height: 40px;
                  width: 169px;
                  line-height: 40px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  text-align: center;
                  background-color: #E8F2FF;
                }
                .geneticNameSelect {
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  height: 40px;
                  line-height: 37px;
                  input {
                    width: 100%;
                  }
                }
                // 过敏史
                .guominTitle {
                  width:170px;
                  height:40px;
                  text-align: center;
                  line-height: 40px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  background: #E8F2FF;
                  box-sizing: border-box;
                }
                .guominSelect {
                  height: 40px;
                  line-height: 37px;
                  border-bottom: 1px solid #E0E0E0;
                }
                .otherTitle {
                  width:170px;
                  height:40px;
                  text-align: center;
                  line-height: 40px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  border-left: 1px solid #E0E0E0;
                  background: #E8F2FF;
                  box-sizing: border-box;
                }
                .otherSelect {
                  height: 40px;
                  line-height: 37px;
                  border-bottom: 1px solid #E0E0E0;
                }
                // 暴露史/残疾情况
                .baoluTitle {
                  width:170px;
                  height:40px;
                  text-align: center;
                  line-height: 40px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  background: #E8F2FF;
                  box-sizing: border-box;
                }
                .baoluSelect {
                  height: 40px;
                  line-height: 37px;
                  border-bottom: 1px solid #E0E0E0;
                }
                .disabledTitle {
                  width:170px;
                  height:40px;
                  text-align: center;
                  line-height: 40px;
                  border-right: 1px solid #E0E0E0;
                  border-bottom: 1px solid #E0E0E0;
                  border-left: 1px solid #E0E0E0;
                  background: #E8F2FF;
                  box-sizing: border-box;
                }
                .disabledSelect {
                  height: 40px;
                  line-height: 37px;
                  border-bottom: 1px solid #E0E0E0;
                }
       }  
         
         .hunyinshi{
            width:995px;
            margin-top: @num10;
            background: @backgourdWithe;
            border: 1px solid #E0E0E0;
            border-radius:5px;
             .hunyinshi_shouqi{
             display: inline-block;
             width:995px;
             height: 45px;
             line-height:45px; 
             border-bottom: 1px solid #E0E0E0;
             clear: both;
             position: relative;
              span{
                margin-left: 20px;
                font-size: 14px;
                color:#111111;
                display: inline-block;;
                }
                .concelButton{
                position: absolute;
                top: 12px;
                right: 15px;
              }
    
           }
           .hunyinshiContent {
              li {
                height: 40px;
                border-bottom: 1px solid #ccc;
              }
              li:nth-last-of-type(1) {
                border-bottom: none;
              }
            }
           .hunyinshispan{
                // float: left;
                display: inline-block;
                 width:170px;
                 height: 40px;;
                 text-align: center;
                 line-height: 40px;
                 border-right: 1px solid #E0E0E0;
                 border-bottom: 1px solid #E0E0E0;
                 background: #E8F2FF;
                 box-sizing: border-box;
           }
           .hunyinsiRadio{
             display:inline-block;
            //  float: right;
            //  margin-top:-40px;
             width:825px;
             height: 40px;
             line-height:40px;
            //  outline:1px solid red;
            //  border-bottom:1px solid #E0E0E0;
                 .ivu-radio-wrapper{
                   margin-left:40px;
                 } 
                
           }
            .hunyinshispan2{
                display: inline-block;
                 width:170px;
                 height: 41px;;
                 text-align: center;
                 line-height: 41px;
                 border-top: 1px solid #E0E0E0;
                 border-right: 1px solid #E0E0E0;
                 border-bottom: 1px solid #E0E0E0;
                 border-left: 1px solid #E0E0E0;
                 background: #E8F2FF;
                 box-sizing: border-box;
           }
             .inputchusheng{
                  width:327px;
                  // background:@backgourdWithe;
                }
                
                .test1 {
                  width:200px;

                }
       }
       
       .zhiyejibingshi{
           width:995px;
           height:auto;
           margin-top: @num10;
          //  margin: 20px;
           background: @backgourdWithe;
           border: 1px solid #E0E0E0;
           margin-bottom:10px;
           border-radius:5px;
           .zhiyejibingshi_shouqi{
             display: inline-block;
             width:995px;
             height: 45px;
             line-height:45px; 
             border-bottom: 1px solid #E0E0E0;
             clear: both;
             position: relative;
              span{
                margin-left: 20px;
                font-size: 14px;
                color:#111111;
                display: inline-block;;
              }
              .concelButton {
                position: absolute;
                top: 12px;
                right: 15px;
              }
           }
            // .ivu-col-span-2 {
            // display: block;
            // height: 40px;
            // border-right: none;
            //   }
            // .ivu-col-span-3 {
            // display: block;
            // height: 40px;
            //   }
            // .ivu-col-span-4 {
            // display: block;
            // height: 40px;
            //   }
           .ivu-col {
             background:#ffffff;
             text-align: center;
             border-right: 1px solid #D9D9D9;
             border-bottom: 1px solid #D9D9D9;
             line-height: 40px;
           }
           .ivu-tabs-tab{
             height:50px;
             padding:15px 16px;
           }
            // .ivu-tabs-bar{
            //   margin-bottom:300px;
            // }
           .zhiyejbingshi{
             width:100%;
             height: 40px;
             border:none;
             outline: none;
             text-align: center;
           }
          
       }
       .gerenshenghuo{
           width:995px;
           height:auto;
           margin-top: @num10;
          //  margin: 20px;
           background: @backgourdWithe;
           border: 1px solid #E0E0E0;
           margin-bottom:10px;
           border-radius:5px;
           .gerenshenghuo_shouqi{
             display: inline-block;
             width:995px;
             height: 45px;
             line-height:45px; 
             border-bottom: 1px solid #E0E0E0;
             clear: both;
             position: relative;
              span{
                margin-left: 20px;
                font-size: 14px;
                color:#111111;
                display: inline-block;;
              }
              .concelButton {
                position: absolute;
                top: 12px;
                right: 15px;
              }
           }
          //   .ivu-col-span-3 {
          //   display: block;
          //   height: 40px;
          //     }
          //  .ivu-col-span-21 {
          //   display: block;
          //   height: 40px;
          //     }
           .ivu-col {
             background:#ffffff;
             text-align: center;
             border-right: 1px solid #D9D9D9;
             border-bottom: 1px solid #D9D9D9;
             height:40px;
             line-height: 40px;
             box-sizing: border-box;
            //  border-top: 1px solid #D9D9D9;
           }

           .inputgerenshenghuo{
             width:100%;
             height: 40px;
             border-top:none;
             border-right:none;
             border-left:none;  
             outline: none;
             text-align: center;
           }
             .inputgerenshenghuo2{
             width:60%;
           }
          //    .inputgerenshenghuo3{
          //    width:50%;
          //  }
          
       }
         .shenghuohuanjingshi{
           width:995px;
           height:auto;
           margin-top: @num10;
          //  margin: 20px;
           background: @backgourdWithe;
           border: 1px solid #E0E0E0;
           margin-bottom:10px;
           border-radius:5px;
           .shenghuohuanjingshi_shouqi{
             display: inline-block;
             width:995px;
             height: 45px;
             line-height:45px; 
             border-bottom: 1px solid #E0E0E0;
             clear: both;
             position: relative;
              span{
                margin-left: 20px;
                font-size: 14px;
                color:#111111;
                display: inline-block;;
              }
              .concelButton {
                position: absolute;
                top: 12px;
                right: 15px;
              }
           }
            .shenghuohuanjingshiContent {
              li {
                height: 40px;
                border-bottom: 1px solid #ccc;
              }
              li:nth-last-of-type(1) {
                border-bottom: none;
              }
            }
            .shenghuohuanjingshispan{
                // float: left;
                 display: inline-block;
                 width:170px;
                 height: 40px;;
                 text-align: center;
                 line-height: 40px;
                 border-right: 1px solid #E0E0E0;
                 border-bottom: 1px solid #E0E0E0;
                 background: #E8F2FF;
                 box-sizing: border-box;
           }
            .shenghuohuanjingshiCheckbox{
             display:inline-block;
            //  float: right;
            //  margin-top:-40px;
             width:823px;
             height: 40px;
             line-height:40px;
            //  outline:1px solid red;
            //  border-bottom:1px solid #E0E0E0;
                 .ivu-checkbox-wrapper{
                   margin-left:20px;
                   width: 125px;
                   text-align: left;
                 } 
                
           }
       }
         
         .yuejingshi{
           width:995px;
           height:auto;
           margin-top: @num10;
          //  margin: 20px;
           background: @backgourdWithe;
           border: 1px solid #E0E0E0;
           margin-bottom:10px;
           border-radius:5px;
           .yuejingshi_shouqi{
             display: inline-block;
             width:995px;
             height: 45px;
             line-height:45px; 
             border-bottom: 1px solid #E0E0E0;
             clear: both;
             position: relative;
              span{
                margin-left: 20px;
                font-size: 14px;
                color:#111111;
                display: inline-block;;
              }
              .concelButton {
                position: absolute;
                top: 12px;
                right: 15px;
              }
           }
           .ivu-col-span-2 {
            display: block;
            height: 40px;
            text-algin: center;
              }
            .ivu-col-span-3 {
            display: block;
            height: 40px;
              }
               .ivu-col-span-7 {
            display: block;
            height: 40px;
              }
           .ivu-col {
             background:#ffffff;
             text-align: center;
             border-right: 1px solid #D9D9D9;
             line-height: 40px;
           }
           .inputyuejingshi{
             width:100%;
             height: 40px;
             border:none;
             outline: none;
             text-align: center;
           }
          
       }
         .shengyushi{
           width:995px;
           height:auto;
           margin-top: @num10;
          //  margin: 20px;
           background: @backgourdWithe;
           border: 1px solid #E0E0E0;
           margin-bottom:10px;
           border-radius:5px;
           .shengyushi_shouqi{
             display: inline-block;
             width:995px;
             height: 45px;
             line-height:45px; 
             border-bottom: 1px solid #E0E0E0;
             clear: both;
             position: relative;
              span{
                margin-left: 20px;
                font-size: 14px;
                color:#111111;
                display: inline-block;;
              }
              .concelButton {
                position: absolute;
                top: 12px;
                right: 15px;
              }
           }
           .ivu-col {
             background:#ffffff;
             text-align: center;
             border-right: 1px solid #D9D9D9;
             border-bottom: 1px solid #D9D9D9;
             line-height: 40px;
           }
            .ivu-col-span-2 {
            display: block;
            height: 40px;
              }
            .ivu-col-span-3 {
            display: block;
            height: 40px;
              }
            .ivu-col-span-7 {
            display: block;
            height: 40px;
              }
            .ivu-col-span-21 {
            display: block;
            height: 40px;
              }
           
           .inputshengyushi{
             width:100%;
             height: 40px;
             border-top:none;
             border-right:none;
             border-left:none;
             outline: none;
             text-align: center;
           }
           .inputshengyushi2{
             width:100%;
             height: 40px;
             border-top:none;
             border-right:none;
             border-left:none; 
             outline: none;
             text-align: center;
           }
            .inputshengyushi3{
             width:100%;
             height: 40px;
             border-top:none;
             border-right:none;
             border-left:none;  
             outline: none;
             text-align: center;
           }
       }
         .qita{
           width:995px;
           height:auto;
           margin-top: @num10;
          //  margin: 20px;
           background: @backgourdWithe;
           border: 1px solid #E0E0E0;
           margin-bottom:10px;
           border-radius:5px;
           .qita_shouqi{
             display: inline-block;
             width:995px;
             height: 45px;
             line-height:45px; 
             border-bottom: 1px solid #E0E0E0;
             clear: both;
             position: relative;
              span{
                margin-left: 20px;
                font-size: 14px;
                color:#111111;
                display: inline-block;;
              }
              .concelButton {
                position: absolute;
                top: 12px;
                right: 15px;
              }
           }
           .titlecenter{
             width:100%;
             height: 40px;
             font-family: MicrosoftYaHei;
             font-size: 12px;
             color: #111111;   
             text-align: center;
             line-height:40px;
             background:#E8F2FF;
           }
       }
}     
   
</style>