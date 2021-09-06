/** 
* @author 覃凤
* @date 2018/3/3
* @content 单位管理-编辑员工
* ifShowModal：控制弹窗显示隐藏，modalData：传入的数据，cancel-data：返回的取消事件，commit-data：返回的提交事件
*/
<template>
  <div class="edit-employees" v-if='ifShowModal'>
    <Modal v-model="ifShowModal"
            :styles='{width:678+"px"}'
            :transition-names='[]'
            :mask-closable="false"
            :transfer='false'
            :closable="false">
      <div slot="header">
        <alert-header :headerText="msg" :showInput='false'></alert-header>
      </div>
      <div class="edit-employees-content">
        <Form ref='addEmployeesForm' :model="showModalData" :rules='dataRule'>
          <div class="base-info-content">
            <h6 class="marginB20">员工基本信息</h6>
            <ul class="add-employees-body-ul">
              <li class="fl">
                <span class="fl textJustify marginR10">姓名</span>
                <div class="fl" style="width: 208px;">
                  <FormItem prop='self_name'>
                    <Input v-model='showModalData.self_name' :class='{inputVerificationTs: isEmpty(showModalData.self_name)}'></Input>
                  </FormItem>
                </div>
              </li>
              <li class="fr">
                <span class="fl textJustify marginR10" style="width: 48px;">身份证号</span>
                <div class="fl" style="width: 269px;">
                  <FormItem prop='self_idNum'>
                    <Input v-model='showModalData.self_idNum' :class='{inputVerificationTs: isEmpty(showModalData.self_idNum)}'></Input>
                  </FormItem>
                </div>
              </li>
              <li class="fl">
                <span class="fl textJustify marginR10">年龄</span>
                <div class="fl" style="width: 83px;">
                  <FormItem prop='self_age'>
                    <z-input type='number' :class='{inputVerificationTs: isEmpty(showModalData.self_age)}' v-model='showModalData.self_age'></z-input>
                  </FormItem>
                </div>
              </li>
              <li class="fl">
                <span class="fl marginR10 marginL20" style="width: 24px;">性别</span>
                <div class="fl" style="width: 71px;">
                  <Select 
                    v-model="showModalData.self_sex" 
                    filterable 
                    placeholder=''>
                    <Option v-for="item in selectData.self_sex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
              </li>
              <li class="fr">
                <span class="fl textJustify marginR10" style="width: 48px;">联系电话</span>
                <div class="fl" style="width: 269px;">
                  <FormItem prop='self_phone'>
                    <z-input type='number' v-model='showModalData.self_phone' :class='{inputVerificationTs: isEmpty(showModalData.self_phone)}'></z-input>
                  </FormItem>
                </div>
              </li>
              <li class="fl marginB20" style="width: 100%;">
                <span class="fl textJustify marginR10">联系地址</span>
                <div class="fl add-emplo-line">
                  <Input v-model='showModalData.self_address'></Input>
                </div>
              </li>
              <li class="fl" style="width: 100%;">
                <span class="fl textJustify marginR10">单位名称</span>
                <div class="fl add-emplo-line">
                  <FormItem prop='self_unitName'>
                    <Input v-model='showModalData.self_unitName' :class='{inputVerificationTs: isEmpty(showModalData.self_unitName)}'></Input>
                  </FormItem>
                </div>
              </li>
              <li class="fl marginB20">
                <span class="fl textJustify marginR10">车间/部门</span>
                <div class="fl" style="width: 208px;">
                  <Select 
                    v-model="showModalData.self_cjbm" 
                    filterable 
                    placeholder=''>
                    <Option v-for="item in selectData.self_cjbmData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
              </li>
              <li class="fr marginB20">
                <span class="fl textJustify marginR10" style="width: 48px;">职务</span>
                <div class="fl" style="width: 269px;">
                  <Input v-model='showModalData.self_zw'></Input>
                </div>
              </li>
              <li class="clearBoth"></li>
            </ul>
          </div>
          <div class="career-info-content">
            <h6 class="marginB20">职业史信息</h6>
            <ul class="add-employees-body-ul">
              <li class="fl marginR20 marginB20">
                <span class="fl textJustify marginR10">总工龄</span>
                <div class="fl" style="width: 64px;">
                  <z-input type='number' class="self-input-year" v-model='showModalData.self_zgl'></z-input>
                </div>
              </li>
              <li class="fl marginB20">
                <span class="fl textJustify marginR10">接害工龄</span>
                <div class="fl" style="width: 67px;">
                  <z-input type='number' class="self-input-year" v-model='showModalData.self_jhgl'></z-input>
                </div>
              </li>
              <li class="fr marginB20">
                <span class="fl textJustify marginR10" style="width: 48px;">工种</span>
                <div class="fl" style="width: 269px;">
                  <Select 
                    v-model="showModalData.self_gz" 
                    filterable 
                    placeholder=''>
                    <Option v-for="item in selectData.self_gz" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
              </li>
              <li class="fl marginB20">
                <harmFactorTable :columns='columns' headerText='职业环境情况' @edit-harm-factor='ifShowHarmFactorFun'></harmFactorTable>
              </li>
              <li>
                <span class="fl textJustify marginR10" style="margin-top: 2px;">备注</span>
                <div class="fl add-emplo-line">
                  <Input type="textarea" v-model='showModalData.self_remark'></Input>
                </div>
              </li>
              <li class="clearBoth"></li>
            </ul>
            <div class="flex marginT20">
              <p class="marginR20"><span>最后修改人：</span>{{ showModalData.self_lastPer }}</p>
              <p class="flx1"><span>最后修改时间：</span>{{ showModalData.self_lastTime }}</p>
            </div>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <div class="edit-employees-footer paddingB20 paddingT20">
            <z-button ZBtype='ghost' class="fr marginR20" @click="cancel">取 消</z-button>
            <z-button ZBtype='primary' class="fr marginR20" @click="commit('addEmployeesForm')">保 存</z-button>
            <div class="clearBoth"></div>
          </div>
      </div>
    </Modal>
    <occupHarmFactorModal :controlModal='ifShowControlModal' @add-affirm-factor='commitAffimFactor' @cancel-add-factor='canceltAffimFactor'></occupHarmFactorModal>
  </div>
</template>
<script>
import harmFactorTable from '@/views/main/prepare/register/components/harmFactorBox.vue'
import occupHarmFactorModal from '@/views/main/prepare/appointmentCheckup/frontAppointment/components/modal/occupHarmFactorModal.vue'
export default {
  name: 'add-employees',
  components: {
    harmFactorTable,
    occupHarmFactorModal,
  },
  props: {
    ifShowModal: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    const idNumber = (rule, val, callback) => {
      let idNum = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
      if (val !== '') {
        if (!idNum.test(val)) {
          callback(new Error('身份证号输入不正确'))
        } else {
          callback()
        }
      } else {
        callback(new Error('身份证号不为空'))
      }
    }
    const phoneNumber = (rule, val, callback) => {
      let phoneNum = /^1[3|4|5|7|8][0-9]{9}$/
      if (val !== '') {
        if (!phoneNum.test(val)) {
          callback(new Error('手机号输入不正确'))
        } else {
          callback()
        }
      } else {
        callback(new Error('手机号不为空'))
      }
    }
    return {
      msg: '编辑员工',
      ifShowControlModal: false,
      columns: [
        {
          title: '职业病危害因素名称',
          key: 'name',
        },
        {
          title: '职业健康检查种类',
          key: 'id',
          width: 180,
        },
      ],
      showModalData: { // 提交数据
        self_name: '李莎',
        self_idNum: '510922198702237685',
        self_age: '31',
        self_sex: 2,
        self_phone: '15123453463',
        self_address: '四川省成都市西部智谷A区',
        self_unitName: '京东集团',
        self_cjbm: 1,
        self_zw: '产品经理',
        self_zgl: 2,
        self_jhgl: 1,
        self_gz: 1,
        self_remark: '',
        self_lastPer: '张悦城', // 最后修改人
        self_lastTime: '2017-12-12 12:00', // 最后修改时间
      },
      selectData: {
        self_cjbmData: [ // 车间部门下拉
          {
            label: '技术部',
            value: 1,
          },
        ],
        self_sex: [
          {
            label: '男',
            value: 1,
          }, {
            label: '女',
            value: 2,
          },
        ],
        self_gz: [
          {
            label: '钳工',
            value: 1,
          },
        ],
      },
      dataRule: {
        self_name: [
          {
            required: true,
            trigger: 'blur',
            type: 'string',
            message: '姓名不能为空',
          },
        ],
        self_idNum: [
          {
            required: true,
            trigger: 'blur',
            validator: idNumber,
          },
        ],
        self_age: [
          {
            required: true,
            trigger: 'blur',
            message: '年龄不能为空',
          },
        ],
        self_phone: [
          {
            required: true,
            validator: phoneNumber,
            trigger: 'blur',
          },
        ],
        self_unitName: [
          {
            required: true,
            trigger: 'blur',
            message: '单位名称不能为空',
          },
        ],
      },
    }
  },
  watch: {
    ifShowModal(val) {
      if (!val) {
        this.initData()
      }
    },
  },
  methods: {
    ifShowHarmFactorFun() {
      this.ifShowControlModal = true
    },
    commitAffimFactor() {
      this.ifShowControlModal = false
    },
    canceltAffimFactor () {
      this.ifShowControlModal = false
    },
    isEmpty (data) {
      if (data === '' || data === null) {
        return true
      } else {
        return false
      }
    },
    cancel () {
      this.$emit('cancel-data')
    },
    async commit (name) {
      if (await this.$refs[name].validate()) {
        this.$emit('commit-data', this.showModalData)
      }
    },
    initData () {
      this.showModalData = { // 提交数据
        self_name: '',
        self_idNum: '',
        self_age: '',
        self_sex: '',
        self_phone: '',
        self_address: '',
        self_unitName: '',
        self_cjbm: null,
        self_zw: '',
        self_zgl: null,
        self_jhgl: null,
        self_gz: null,
        self_remark: '',
        self_lastPer: '',
        self_lastTime: '',
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import '~assets/less/variable.less';
.edit-employees {
  .edit-employees-content {
    padding: @num20 @num20 0 @num20;
    .add-employees-body-ul {
      &>li {
        // margin-bottom: @num20;
        color: @gradeAshThree;
        &>span {
          width: 54px;
          line-height: @num30;
          height: @num30;
          overflow: hidden;
        }
        .add-emplo-line {
          width: calc(~'100% - 64px');
        }
      }
    }
    h6 {
      font-size: 12px;
      line-height: 30px;
      color: @gradeAshTwo;
    }
  }
}
</style>
<style lang="less">
.edit-employees {
  .ivu-modal {
    height: calc(~'100% - 30px');
    max-height: 786px;
    .ivu-modal-content {
      height: 100%;
      .ivu-modal-body {
        height: calc(~'100% - 120px');
        .edit-employees-content {
          // 弹窗中间内容部分
          overflow: auto;
          height: 100%;
        }
      }
    }
  }
}
</style>