<template>
  <div class="basicInformation">
    <titletHasSlot style="border-bottom: 1px solid #cccccc;">
      <span slot='titletHasSlotLeftTitle'>基本信息</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;">
        <ZButton :ZBtype='"ghost"'
                 class="fl"
                 @click="amendFunc()"
                 v-if="ischangge">编 辑</ZButton>
        <ZButtonHasBg :ZBtype='"ghost"'
                      class="fl marginR10"
                      @click="save()"
                      v-if="!ischangge">保 存</ZButtonHasBg>
        <ZButton :ZBtype='"ghost"'
                 class="fl"
                 @click="cancel()"
                 v-if="!ischangge">取 消</ZButton>
      </div>
    </titletHasSlot>
    <Form ref="basicInformation"
          class="basicInformationForm">
      <!-- 第一行 -->
      <Row class="basicInformation-row">
        <div class="fl ">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">个人档案编号</div>
          <div class="basicInformation-input">
            <Input disabled
                   v-model="model.personal_code"
                   style="width:180px;"></Input>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">姓名</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   v-model="model.realname"
                   style="width:180px;"></Input>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:60px">性别</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:100px;"
                   v-model="model.sex"
                   v-if="ischangge"></Input>
            <Select filterable
                    style="height:30px;width:100px;"
                    v-model="model.sex"
                    v-if="!ischangge">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:24px">年龄</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:58px;"
                   v-model="model.age"></Input>
          </div>
        </div>
      </Row>
      <!-- 第二行 -->
      <Row class="basicInformation-row marginT15">
        <div class="fl ">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">区域档案编号</div>
          <div class="basicInformation-input">
            <Input disabled
                   style="width:180px;"
                   v-model="model.area_code"></Input>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">证件类型</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:180px;"
                   v-model="model.identity_type"
                   v-if="ischangge"></Input>
            <Select filterable
                    style="height:30px;width:180px;"
                    v-model="model.identity_type"
                    v-if="!ischangge">
              <Option v-for="(item,index) of identityTypeArr"
                      :key="index"
                      :value="index+1">{{item}}</Option>
            </Select>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:60px">证件号码</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:222px;"
                   v-model="model.identity_num"></Input>
          </div>
        </div>
      </Row>
      <!-- 第三行 -->
      <Row class="basicInformation-row marginT15">
        <div class="fl ">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">文化程度</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:180px;"
                   v-model="model.edu_level"
                   v-if="ischangge"></Input>
            <Select filterable
                    style="height:30px;width:180px;"
                    v-model="model.edu_level"
                    v-if="!ischangge">
              <Option v-for="(item,index) of levelArr"
                      :key="index"
                      :value="index+1">{{item}}</Option>
            </Select>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">婚姻状况</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:180px;"
                   v-model="model.marital_status"
                   v-if="ischangge"></Input>
            <Select filterable
                    style="height:30px;width:180px;"
                    v-model="model.marital_status"
                    v-if="!ischangge">
              <Option v-for="(item,index) of maritalStatusArr"
                      :key="index"
                      :value="index+1">{{item}}</Option>
            </Select>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:60px">血型</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:222px;"
                   v-model="model.blood_group"
                   v-if="ischangge"></Input>
            <Select filterable
                    style="height:30px;width:222px;"
                    v-model="model.blood_group"
                    v-if="!ischangge">
              <Option v-for="(item,index) of bloodGroupArr"
                      :key="index"
                      :value="index + 1">{{item}}</Option>
            </Select>
          </div>
        </div>
      </Row>
      <!-- 第四行 -->
      <Row class="basicInformation-row marginT15">
        <div class="fl ">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">手机号码</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:180px;"
                   v-model="model.mobile"></Input>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">联系人姓名</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:180px;"
                   v-model="model.contact_name"></Input>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:60px;">联系人电话</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:337px;"
                   v-model="model.contact_mobile"></Input>
          </div>
        </div>
      </Row>
      <!-- 第五行 -->
      <Row class="basicInformation-row marginT15">
        <div class="fl ">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">医疗保险号</div>
          <div class="basicInformation-input">

            <Input :disabled="ischangge"
                   style="width:180px;"
                   v-model="model.medicare_num"></Input>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">医疗卡号</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:180px;"
                   v-model="model.medical_card_number"></Input>
          </div>
        </div>
        <div class="fl  marginL30px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:60px">农合卡号</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:337px;"
                   v-model="model.agr_card_num"></Input>
          </div>
        </div>
      </Row>
      <!-- 第六行 -->
      <Row class="basicInformation-row marginT15">
        <div class="fl ">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:96px;">医疗费用支付方式</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:885px;"
                   v-model="model.provider_payments"
                   v-if="ischangge">
            </Input>
            <CheckboxGroup v-model="model.provider_payments"
                           v-if="!ischangge">
              <Checkbox :label="1"
                        style="margin-top:6px">
                <span>新型农村合作医疗</span>
              </Checkbox>
              <Checkbox :label="2">
                <span>城镇职工基本医疗保险</span>
              </Checkbox>
              <Checkbox :label="3">
                <span>城镇居民基本医疗保险</span>
              </Checkbox>
              <Checkbox :label="4">
                <span>商业医疗保险</span>
              </Checkbox>
              <Checkbox :label="5">
                <span>其他</span>
              </Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </Row>
      <!-- 详细情况 -->
      <Row class="basicInformation-row marginT15">
        <div class="fl basicInformation-row-detail">详细情况</div>
      </Row>
      <!-- 详细情况 - 第1行 -->
      <Row class="basicInformation-row marginT15">
        <div class="fl ">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:48px">单位名称</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:506px;"
                   v-model="model.detail_info.address"></Input>
          </div>
        </div>
        <div class="fl  marginL20px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:48px">职位职称</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:349px;"
                   v-model="model.detail_info.title"></Input>
          </div>
        </div>
      </Row>
      <!-- 详细情况 - 第2行 -->
      <Row class="basicInformation-row marginT15">
        <div class="fl ">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:48px;">国籍</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:82px;"
                   v-model="model.detail_info.nationality"
                   v-if="ischangge"></Input>
            <Select filterable
                    style="height:30px;width:82px;"
                    v-model="model.detail_info.nationality"
                    v-if="!ischangge">
              <Option :value="1">中国</Option>
              <Option :value="2">其他</Option>
            </Select>
          </div>
        </div>
        <div class="fl"
             style="margin-left:45px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:60px;">民族</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:82px;"
                   v-model="model.detail_info.nation"
                   v-if="ischangge"></Input>
            <Select filterable
                    style="height:30px;width:82px;"
                    v-model="model.detail_info.nation"
                    v-if="!ischangge">
              <Option v-for="(item,index) of nationArr"
                      :key="index"
                      :value="index+1">{{item}}</Option>
            </Select>
          </div>
        </div>
        <div class="fl "
             style="margin-left:45px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:48px">籍贯</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:123px;"
                   v-model="model.detail_info.native_place"></Input>
          </div>
        </div>
        <div class="fl  marginL20px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:48px">出生地</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:349px;"
                   v-model="model.detail_info.birthplace"></Input>
          </div>
        </div>
      </Row>
      <!-- 详细情况 - 第3行 -->
      <Row class="basicInformation-row marginT15">
        <div class="fl ">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:48px;">现地址</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:506px;"></Input>
          </div>
        </div>
        <div class="fl marginL20px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:48px;">邮政编码</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:349px;" v-model="model.detail_info.postal_code"></Input>
          </div>
        </div>

      </Row>
      <!-- 详细情况 - 第4行 -->
      <Row class="basicInformation-row marginT15">
        <div class="fl ">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:48px">居民类型</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:86px;"
                   v-model="model.detail_info.resident_type"
                   v-if="ischangge"></Input>
            <Select filterable
                    style="height:30px;width:86px;"
                    v-model="model.detail_info.resident_type"
                    v-if="!ischangge">
              <Option v-for="(item,index) of  residentTypeArr"
                      :key="index"
                      :value="index+1">{{item}}</Option>
            </Select>
          </div>
        </div>
        <div class="fl"
             style="margin-left:45px;">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:48px">居住类型</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:86px;"
                   v-model="model.detail_info.residential_type"
                   v-if="ischangge"></Input>
            <Select filterable
                    style="height:30px;width:86px;"
                    v-model="model.detail_info.residential_type"
                    v-if="!ischangge">
              <Option v-for="(item,index) of residentialTypeArr"
                      :key="index"
                      :value="index+1">{{item}}</Option>
            </Select>
          </div>
        </div>
        <div class="fl "
             style="margin-left:45px;">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:48px">贫困人群</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:127px;"
                   v-model="model.detail_info.is_poor"
                   v-if="ischangge"></Input>
            <Select filterable
                    style="height:30px;width:127px;"
                    v-model="model.detail_info.is_poor"
                    v-if="!ischangge">
              <Option :value="1">是</Option>
              <Option :value="2">否</Option>
            </Select>
          </div>
        </div>
        <div class="fl marginL20px">
          <div class="basicInformation-text fl textJustify"
               style="height:30px;width:72px">村（居）委会</div>
          <div class="basicInformation-input">
            <Input :disabled="ischangge"
                   style="width:325px;"
                   v-model="model.detail_info.committee"></Input>
          </div>
        </div>
      </Row>
      <!-- 定位图片 -->
      <div class="basicInformation-img-po" >
        <img :src="pic"
             alt="照片"
             class="basicInformation-img">
        </div>
    </Form>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import { getDotData, copy } from '@/utils/helper'
import { mapActions } from 'vuex'

export default {
  name: 'basicInformation',
  data() {
    return {
      //
      basicInformationRule: {},
      ischangge: true,
      pic: '/static/images/public/default_avatar.svg', // 编辑
      // 文化程度
      levelArr: [
        '文盲或半文盲',
        '小学',
        '初中',
        '高中',
        '技工学校',
        '中等专业学校',
        '大学专科',
        '大学本科',
        '硕士',
        '博士',
        '博士后',
        '不详',
      ],
      nationArr: ['汉族', '少数民族', '其他'],
      bloodRelationshipArr: ['直系血亲', '旁系血亲', '三代以内旁系血亲'],
      residentialTypeArr: ['常住类型', '暂住', '流动人口', '其他'],
      residentTypeArr: ['未分', '城镇居民', '农村居民'],
      // 支付方式
      providerPaymentsArr: [
        '未填写',
        '城镇职工基本医疗保险',
        '城镇居民基本医疗保险',
        '新型农村合作医疗',
        '贫困救助',
        '商业医疗保险',
        '全公费',
        '全自费',
        '其他',
      ],
      bloodGroupArr: ['A型', 'B型', 'AB型', 'O型', '不详'],
      // 婚姻状况
      maritalStatusArr: ['不详', '已婚', '未婚', '离婚', '丧偶'],
      // 证件类型
      identityTypeArr: [
        '身份证',
        '居民户口簿',
        '军官证',
        '驾驶证',
        '港澳居民来往内地通行证',
        '台湾居民来往内地通行证',
        '其他法定有效证件',
      ],
      //
      selectAll: [{ name: '1啊啊啊' }, { name: '2噢噢噢噢' }],
      model: {
        // 个人档案编码
        personal_code: '',
        // 区域编码
        area_code: '',
        // 证件类型
        identity_type: '',
        // 身份证
        identity_num: '',
        // 真是姓名
        realname: '',
        // 血型
        blood_group: '',
        // 文化水平
        edu_level: '',
        // 年龄
        age: '',
        // 手机号码
        mobile: '',
        // 性别
        sex: '',
        // 婚姻状况
        marital_status: '',
        // 联系人姓名
        contact_name: '',
        // 联系人手机号
        contact_mobile: '',
        // 支付方式
        provider_payments: '',
        // 医疗保险号
        medicare_num: '',
        // 医疗卡号
        medical_card_number: '',
        // 弄合卡号
        agr_card_num: '',
        // 备注
        remark: '',
        // 职工ID
        operater: '',
        // 状态
        status: '',
        // 详细信息
        detail_info: {
          work_unit: '',
          title: '',
          nationality: '',
          nation: '',
          native_place: '',
          birthplace: '',
          postal_code: '',
          current_address: '',
          residential_type: '',
          resident_type: '',
          is_poor: '',
          committee: '',
          housemaster_relationship_id: '',
          blood_relationship: '',
          family_number: '',
          address: '',
        },
      },
      copyprosvider_payments: [],
    }
  },
  components: {
    titletHasSlot,
    ZButton,
    ZButtonHasBg,
  },
  watch: {
    basicInformationData(data, oldVal) {
      if (data && this.ischangge) {
        let val = copy(data, true)
        let a = ''
        let copyDetail = copy(this.model.detail_info, true)
        this.$set(this.model, 'personal_code', getDotData(val, 'personal_code'))
        // this.model.personal_code = getDotData(val, 'personal_code')
        this.model.area_code = getDotData(val, 'area_code')
        this.model.identity_type = this.identityTypeFilter(
          getDotData(val, 'identity_type'),
        )
        this.model.identity_num = getDotData(val, 'identity_num')
        this.model.realname = getDotData(val, 'realname')
        this.model.blood_group = getDotData(val, 'blood_group')
        this.model.edu_level = getDotData(val, 'edu_level')
        this.model.age = getDotData(val, 'age')
        this.model.mobile = getDotData(val, 'mobile')
        this.model.sex = getDotData(val, 'sex') === 1 ? '男' : '女'
        this.model.marital_status = this.maritalFilter(
          getDotData(val, 'marital_status'),
        )
        this.model.contact_name = getDotData(val, 'contact_name')
        this.model.contact_mobile = getDotData(val, 'contact_mobile')

        this.model.provider_payments = getDotData(val, 'provider_payments')

        /* 支付方式 返回的是数组 */
        for (let key of this.model.provider_payments) {
          a += this.PaymentChange(key) + ','
        }
        a = a.substring(0, a.length - 1)
        this.model.provider_payments = a
        this.model.medicare_num = getDotData(val, 'medicare_num')
        this.model.medical_card_number = getDotData(val, 'medical_card_number')
        this.model.agr_card_num = getDotData(val, 'agr_card_num')
        this.model.remark = getDotData(val, 'remark')
        this.model.operater = getDotData(val, 'operater')
        this.model.status = getDotData(val, 'status')
        this.model.detail_info = getDotData(val, 'detail_info')
          ? getDotData(val, 'detail_info')
          : copyDetail
        if (this.model.detail_info.is_poor === 1) {
          this.model.detail_info.is_poor = '是'
        } else if (this.model.detail_info.is_poor === 2) {
          this.model.detail_info.is_poor = '否'
        }
        this.model.identity_type = this.isIdentityType(this.model.identity_type)
        this.model.edu_level = this.isEduLevel(this.model.edu_level)
        this.model.blood_group = this.isBloodGroupval(this.model.blood_group)
        this.model.marital_status = this.maritalFilter(
          this.model.marital_status,
        )
        this.model.detail_info.is_poor = this.isTrue(
          this.model.detail_info.is_poor,
        )
        this.model.detail_info.nationality = this.isNationality(
          this.model.detail_info.nationality,
        )
        this.model.detail_info.nation = this.isNation(
          this.model.detail_info.nation,
        )
        this.model.detail_info.blood_relationship = this.isBloodRelationship(
          this.model.detail_info.blood_relationship,
        )
        this.model.detail_info.residential_type = this.isResidentialType(
          this.model.detail_info.residential_type,
        )
        this.model.detail_info.resident_type = this.isResidentType(
          this.model.detail_info.resident_type,
        )
      }
    },
    ischangge(val) {
      if (val) {
        if (this.model.detail_info.is_poor === 1) {
          this.model.detail_info.is_poor = '是'
        } else if (this.model.detail_info.is_poor === 2) {
          this.model.detail_info.is_poor = '否'
        }
        this.model.identity_type = this.isIdentityType(this.model.identity_type)
        this.model.edu_level = this.isEduLevel(this.model.edu_level)
        this.model.blood_group = this.isBloodGroupval(this.model.blood_group)
        this.model.marital_status = this.maritalFilter(
          this.model.marital_status,
        )
        this.model.detail_info.is_poor = this.isTrue(
          this.model.detail_info.is_poor,
        )
        this.model.detail_info.nationality = this.isNationality(
          this.model.detail_info.nationality,
        )
        this.model.detail_info.nation = this.isNation(
          this.model.detail_info.nation,
        )
        this.model.detail_info.blood_relationship = this.isBloodRelationship(
          this.model.detail_info.blood_relationship,
        )
        this.model.detail_info.residential_type = this.isResidentialType(
          this.model.detail_info.residential_type,
        )
        this.model.detail_info.resident_type = this.isResidentType(
          this.model.detail_info.resident_type,
        )
      } else {
        this.model.identity_type = this.isIdentityTypeChange(
          this.model.identity_type,
        )
        this.model.edu_level = this.isEduLevelChange(this.model.edu_level)
        this.model.blood_group = this.isBloodGroupvalChange(
          this.model.blood_group,
        )
        this.model.marital_status = this.maritalFilterChange(
          this.model.marital_status,
        )
        this.model.detail_info.is_poor = this.isTrueChange(
          this.model.detail_info.is_poor,
        )
        this.model.detail_info.nationality = this.isNationalityChange(
          this.model.detail_info.nationality,
        )
        this.model.detail_info.nation = this.isNationChange(
          this.model.detail_info.nation,
        )
        this.model.detail_info.blood_relationship = this.isBloodRelationshipChange(
          this.model.detail_info.blood_relationship,
        )
        this.model.detail_info.residential_type = this.isResidentialTypeChange(
          this.model.detail_info.residential_type,
        )
        this.model.detail_info.resident_type = this.isResidentTypeChange(
          this.model.detail_info.resident_type,
        )
        let a = []
        let temp = this.model.provider_payments.split(',')
        for (let key of temp) {
          a.push(this.Payment(key))
        }
        this.model.provider_payments = a
      }
    },
  },
  filters: {
    //
  },
  props: {
    basicInformationData: {
      type: [Object, Array],
    },
  },
  methods: {
    ...mapActions('healthRecordModule', ['basicInformationPut']),
    // 证件类型
    isIdentityType(val) {
      switch (val) {
      case 1:
        return '身份证'
      case 2:
        return '居民户口簿'
      case 3:
        return '军官证'
      case 4:
        return '驾驶证'
      case 5:
        return '港澳居民来往内地通行证'
      case 6:
        return '台湾居民来往内地通行证'
      case 7:
        return '其他法定有效证件'
      default:
        return val
      }
    },
    // 证件类型
    isIdentityTypeChange(val) {
      switch (val) {
      case '身份证':
        return 1
      case '居民户口簿':
        return 2
      case '军官证':
        return 3
      case '驾驶证':
        return 4
      case '港澳居民来往内地通行证':
        return 5
      case '台湾居民来往内地通行证':
        return 6
      case '其他法定有效证件':
        return 7
      default:
        return val
      }
    },
    // 血型
    isBloodGroupval(val) {
      switch (val) {
      case 1:
        return 'A型'
      case 2:
        return 'B型'
      case 3:
        return 'AB型'
      case 4:
        return 'O型'
      case 5:
        return '不详'
      default:
        return val
      }
    },
    // 血型
    isBloodGroupvalChange(val) {
      switch (val) {
      case 'A型':
        return 1
      case 'B型':
        return 2
      case 'AB型':
        return 3
      case 'O型':
        return 4
      case '不详':
        return 5
      default:
        return val
      }
    },
    // 文化程度
    isEduLevel(val) {
      switch (val) {
      case 1:
        return '文盲或半文盲'
      case 2:
        return '小学'
      case 3:
        return '初中'
      case 4:
        return '高中'
      case 5:
        return '技工学校'
      case 6:
        return '中等专业学校'
      case 7:
        return '大学专科'
      case 8:
        return '大学本科'
      case 9:
        return '硕士'
      case 10:
        return '博士'
      case 11:
        return '博士后'
      case 12:
        return '不详'
      default:
        return val
      }
    },
    isEduLevelChange(val) {
      switch (val) {
      case '文盲或半文盲':
        return 1
      case '小学':
        return 2
      case '初中':
        return 3
      case '高中':
        return 4
      case '技工学校':
        return 5
      case '中等专业学校':
        return 6
      case '大学专科':
        return 7
      case '大学本科':
        return 8
      case '硕士':
        return 9
      case '博士':
        return 10
      case '博士后':
        return 11
      case '不详':
        return 22
      default:
        return val
      }
    },
    //    //
    isProviderPayments(val) {
      switch (val) {
      case 0:
        return '未填写'
      case 1:
        return '城镇职工基本医疗保险'
      case 2:
        return '城镇居民基本医疗保险'
      case 3:
        return '新型农村合作医疗'
      case 4:
        return '贫困救助'
      case 5:
        return '商业医疗保险'
      case 6:
        return '全公费'
      case 7:
        return '全自费'
      case 8:
        return '其他'
      default:
        return val
      }
    },
    //  婚姻状况
    maritalFilter(val) {
      switch (val) {
      case 1:
        return '不详'
      case 2:
        return '已婚'
      case 3:
        return '未婚'
      case 4:
        return '离婚'
      case 5:
        return '丧偶'
      default:
        return val
      }
    },
    maritalFilterChange(val) {
      switch (val) {
      case '不详':
        return 1
      case '已婚':
        return 2
      case '未婚':
        return 3
      case '离婚':
        return 4
      case '丧偶':
        return 5
      default:
        return ''
      }
    },
    //  身份类型
    identityTypeFilter(val) {
      switch (val) {
      case 1:
        return '身份证'
      case 2:
        return '居民户口簿'
      case 3:
        return '军官证'
      case 4:
        return '驾驶证'
      case 5:
        return '港澳居民来往内地通行证'
      case 6:
        return '台湾居民来往内地通行证'
      case 7:
        return '其他法定有效证件'
      default:
        return ''
      }
    },
    identityTypeFilterChange(val) {
      switch (val) {
      case '身份证':
        return 1
      case '居民户口簿':
        return 2
      case '军官证':
        return 3
      case '驾驶证':
        return 4
      case '港澳居民来往内地通行证':
        return 5
      case '台湾居民来往内地通行证':
        return 6
      case '其他法定有效证件':
        return 7
      default:
        return val
      }
    },
    // 支付方式
    providerPaymentsFilter(val) {
      switch (val) {
      case 0:
        return '其他'
      case 1:
        return '新型农村合作医疗'
      case 2:
        return '商业医疗保险'
      case 3:
        return '城镇居民基本医疗保险'
      default:
        return val
      }
    },
    // 是否
    isTrue(val) {
      switch (val) {
      case 2:
        return '否'
      case 1:
        return '是'
      default:
        return val
      }
    },
    // 是否
    isTrueChange(val) {
      switch (val) {
      case '是':
        return 1
      case '否':
        return 2
      default:
        return val
      }
    },
    // 国籍
    isNationality(val) {
      switch (val) {
      case 1:
        return '中国'
      case 2:
        return '其他'
      default:
        return val
      }
    },
    // 国籍
    isNationalityChange(val) {
      switch (val) {
      case '中国':
        return 1
      case '其他':
        return 2
      default:
        return val
      }
    },
    // 民族
    isNation(val) {
      switch (val) {
      case 1:
        return '汉族'
      case 2:
        return '少数民族'
      case 3:
        return '其他'
      default:
        return val
      }
    },
    // 民族
    isNationChange(val) {
      switch (val) {
      case '汉族':
        return 1
      case '少数民族':
        return 2
      case '其他':
        return 3
      default:
        return val
      }
    },
    // 血缘关系
    isBloodRelationship(val) {
      switch (val) {
      case 1:
        return '直系血亲'
      case 2:
        return '旁系血亲'
      case 3:
        return '三代以内旁系血亲'
      default:
        return val
      }
    },
    // 血缘关系
    isBloodRelationshipChange(val) {
      switch (val) {
      case '直系血亲':
        return 1
      case '旁系血亲':
        return 2
      case '三代以内旁系血亲':
        return 3
      default:
        return val
      }
    },
    // 居住类型
    isResidentialType(val) {
      switch (val) {
      case 1:
        return '常住类型'
      case 2:
        return '暂住'
      case 3:
        return '流动人口'
      case 4:
        return '其他'
      default:
        return val
      }
    },
    // 居住类型
    isResidentialTypeChange(val) {
      switch (val) {
      case '常住类型':
        return 1
      case '暂住':
        return 2
      case '流动人口':
        return 3
      case '其他':
        return 4
      default:
        return val
      }
    },
    // 居民类型
    isResidentType(val) {
      switch (val) {
      case 1:
        return '未分'
      case 2:
        return '城镇居民'
      case 3:
        return '农村居民'
      default:
        return val
      }
    },
    // 居民类型
    isResidentTypeChange(val) {
      switch (val) {
      case '未分':
        return 1
      case '城镇居民':
        return 2
      case '农村居民':
        return 3
      default:
        return val
      }
    },
    // 支付方式
    Payment(val) {
      switch (val) {
      case '新型农村合作医疗':
        return 1
      case '城镇职工基本医疗保险':
        return 2
      case '城镇居民基本医疗保险':
        return 3
      case '商业医疗保险':
        return 4
      case '其他':
        return 5
      default:
        return val
      }
    },
    // 支付方式
    PaymentChange(val) {
      switch (val) {
      case 1:
        return '新型农村合作医疗'
      case 2:
        return '城镇职工基本医疗保险'
      case 3:
        return '城镇居民基本医疗保险'
      case 4:
        return '商业医疗保险'
      case 5:
        return '其他'
      default:
        return val
      }
    },
    amendFunc() {
      this.ischangge = false
    },
    unamendFunc() {
      this.ischangge = true
    },
    save() {
      if (this.model.sex === '男') {
        this.model.sex = 1
      }
      if (this.model.sex === '女') {
        this.model.sex = 2
      }
      let that = this
      this.$nextTick(function() {
        this.basicInformationPut(this.model).then(data => {
          if (data) {
            that.$emit('refresh')
          }
        })
      })
    },
    cancel() {
      this.ischangge = true
      let a = ''
      for (let key of this.model.provider_payments) {
        a += this.PaymentChange(key) + ','
      }
      a = a.substring(0, a.length - 1)
      this.model.provider_payments = a
    },
  },
  mounted() {
    //
  },
}
</script>
<style >

</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.basicInformation {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 15px 0 rgba(206, 213, 242, 0.7);
  border-radius: 8px;
  width: 1033px;
  margin: 0 auto;
  margin-top: 5px;
  .ivu-row{
    position:static;
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .basicInformation-img-po {
      position: absolute;
      width: 90px;
      height: 120px;
      top: 20px;
      right: 20px;
      overflow: hidden;
      border:1px solid rgba(51, 165, 241, 0.6);
    }
    .basicInformation-img {
      width: 90px;
      height: 120px;
    }
  }
  .basicInformation-row {
    height: 30px;
  }
  .basicInformation-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .basicInformation-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .marginL30px {
    margin-left: 30px;
  }
  .marginL20px {
    margin-left: 20px;
  }
  .marginT15 {
    margin-top: 20px;
  }
  .basicInformation-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>