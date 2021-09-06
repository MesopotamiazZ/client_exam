/**
* author      : 覃凤
* cteate      : 2018/03/12
* description : 编辑单位
*/
<template>
<div v-if='ifShowModal' class="edit-account-modal">
  <Modal v-model="ifShowModal"
         :width='690'
         class="account-modal"
         :transfer='false'
         :mask-closable="false"
         :transition-names="['']"
         :closable="false">
    <div slot="header">
      <alert-header :showInput='false' headerText="编辑单位">
      </alert-header>
    </div>
    <div class="content paddingL20">
      <div class="unit-info">基本信息</div>
      <Form :model="formInline" :rules="ruleInline">
        <div class="leftName">单位名称</div>
        <FormItem prop="self_unitName" style="width: 585px;display:inline-block;">
          <Input type="text" v-model.trim="formInline.self_unitName" :class="{inputVerificationTs:isEmpty(formInline.self_unitName)}" class='input-price price'/>
        </FormItem>
        <div class="leftName">电话号码</div>
        <FormItem prop="self_phoneNum" style="width: 253px; display:inline-block;">
          <z-input type="number" v-model="formInline.self_phoneNum" class='symbol-price price'></z-input>
        </FormItem>
        <div class="leftName" style="margin-left:20px;">传真号码</div>
        <FormItem prop="self_faxNum" style="width: 246px; display:inline-block;">
          <z-input type="text" v-model="formInline.self_faxNum" class='symbol-price price'></z-input>
        </FormItem>
        <div class="leftName">电子邮箱</div>
        <FormItem prop="self_eMail" style="width: 585px; display:inline-block;">
          <Input type="text" v-model="formInline.self_eMail" class='symbol-price price' />
        </FormItem>
        <div class="leftName">经济类型</div>
        <FormItem prop="self_economicType" style="width: 253px; display:inline-block;">
          <Select v-model="formInline.self_economicType" filterable placeholder=''>
            <Option v-for="item in selectData.economicType" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <div class="leftName" style="margin-left:20px;">经济行业</div>
        <FormItem prop="self_economicIndustry" style="width: 246px; display:inline-block;">
          <Select v-model="formInline.self_economicIndustry" filterable placeholder="">
            <Option v-for="item in selectData.economicIndustry" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <div class="leftName">行政区域</div>
        <FormItem prop="self_province" style="width: 140px; display:inline-block;">
          <Select v-model="formInline.self_province" filterable placeholder="">
            <Option v-for="item in selectData.province" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <div class="leftName" style='width:12px;margin-left:10px;'>省</div>
        <FormItem prop="self_city" style="width: 165px; display:inline-block;">
          <Select v-model="formInline.self_city" filterable placeholder="">
            <Option v-for="item in selectData.city" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <div class="leftName"
             style='width:12px;margin-left:10px;'>市</div>
        <FormItem prop="self_area" style="width: 170px; display:inline-block;">
          <Select v-model="formInline.self_area" filterable placeholder="">
            <Option v-for="item in selectData.area" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <div class="leftName" style='width:12px;margin-left:10px;'>区</div>
        <div class="leftName">单位地址</div>
        <FormItem prop="self_unitAddress" style="width: 585px;display:inline-block;">
          <Input type="text" v-model="formInline.self_unitAddress" class='input-price price' />
        </FormItem>
        <div class="leftName" style="margin-top:2px;">备注</div>
        <FormItem prop="remark" style="width: 585px;display:inline-block;">
          <Input v-model="formInline.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
        </FormItem>
      </Form>
      <div class="table marginR20">
        <title-has-slot class="title-has-slot">
          <span slot="titletHasSlotLeftTitle">职业环境情况</span>
        </title-has-slot>
        <div class="add" @click='add'>编辑</div>
        <Table stripe :columns="selectData.columns" :data="formInline.tableData" :height='120'></Table>
      </div>
      <div class="unit-info">单位联系人</div>
      <div class="add-info">
        <add-info-modal></add-info-modal>
      </div>
      <div class="flex paddingR20">
        <p class="marginR20"><span>最后修改人：</span>{{ formInline.self_lastPerson }}</p>
        <p class="flx1"><span>最后修改时间：</span>{{ formInline.self_lastTime }}</p>
      </div>
    </div>
    <div slot="footer">
      <div class="bottom">
        <div class="bottom-right">
          <Button type="primary" class="button" @click="saveAndEdit">保存并编辑车间/部门</Button>
          <Button type="primary" class="button" @click="sure">保 存</Button>
          <Button type="ghost" class="button" @click="cancel">取 消</Button>
        </div>
      </div>
    </div>
    <!-- 新增职业危害因素 -->
    <addOrModifyOccupHarmFactor 
      :controlModal='controlModal'
      headerText='编辑职业病危害因素'
      @add-affirm-factor='addFactorSave'
      @cancel-add-factor='addFactorCancel'>
    </addOrModifyOccupHarmFactor>


  </Modal>
</div>
</template>

<script>
import addInfoModal from './addInfoModal'
import addOrModifyOccupHarmFactor from '@/views/main/prepare/components/modal/addOrModifyOccupHarmFactor'
export default {
  name: 'edit-unit-modal',
  components: {
    addInfoModal,
    addOrModifyOccupHarmFactor,
  },
  data() {
    return {
      controlModal: false,
      formInline: {
        self_unitName: '四川承晟集团', // 单位名称
        self_phoneNum: 18402525119, // 电话号码
        self_faxNum: '8594-264', // 传真号码
        self_eMail: '781894894@163.com', // 电子邮箱
        self_economicType: 1, // 经济类型
        self_economicIndustry: 1, // 经济行业
        self_province: 1, // 省
        self_city: 1, // 市
        self_area: 2, // 区
        self_unitAddress: '西部智谷A区', // 单位地址
        remark: '', // 备注
        tableData: [
          {
            type: '一般作业人员',
            name: '有机粉尘',
          },
        ],
        self_lastPerson: '张悦城', // 最后修改人
        self_lastTime: '2017-12-12 12：00', // 最后修改时间
      },
      ruleInline: {
        self_unitName: [
          {
            required: true,
            message: '单位名称不能位空',
            trigger: 'blur',
            // type: String,
          },
        ],
      },
      selectData: {
        columns: [
          {
            title: '职业病危害因素类别',
            key: 'type',
            width: 330,
            ellipsis: true,
          },
          {
            title: '职业病危害因素名称',
            key: 'name',
            // width: 300,
            ellipsis: true,
          },
        ],
        economicType: [ // 经济类型
          {
            label: '国有经济',
            value: 1,
          },
          {
            label: '集体经济',
            value: 2,
          },
          {
            label: '个体经济',
            value: 3,
          },
          {
            label: '其他',
            value: 4,
          },
        ],
        economicIndustry: [ // 经济行业
          {
            label: '农业',
            value: 1,
          },
          {
            label: '林业',
            value: 2,
          },
          {
            label: '畜牧业',
            value: 3,
          },
        ],
        province: [ // 省
          {
            label: '四川',
            value: 1,
          },
        ],
        city: [ // 市
          {
            label: '成都',
            value: 1,
          },
        ],
        area: [ // 区
          {
            label: '锦江区',
            value: 1,
          }, {
            label: '武侯区',
            value: 2,
          }, {
            label: '金牛区',
            value: 3,
          }, {
            label: '青羊区',
            value: 4,
          }, {
            label: '成华区',
            value: 5,
          }, {
            label: '温江区',
            value: 6,
          }, {
            label: '龙泉驿区',
            value: 7,
          }, {
            label: '新都区',
            value: 8,
          }, {
            label: '郫都区',
            value: 9,
          },
        ],
      },
    }
  },
  props: {
    ifShowModal: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    isEmpty(data) {
      if (data === '' || data === undefined) {
        return true
      } else {
        return false
      }
    },
    sure() {
      this.$emit('edit-unit-save')
    },
    cancel() {
      this.$emit('edit-unit-cancel')
    },
    saveAndEdit() {
      this.$emit('edit-unit-save-and-edit')
    },
    // 新增
    add() {
      this.controlModal = true
    },
    // 职业危害保存
    addFactorSave() {
      this.controlModal = false
    },
    // 职业危害取消
    addFactorCancel() {
      this.controlModal = false
    },
  },
}
</script>

<style lang="less">
// .account-modal {
//   .ivu-modal {
//     height: calc(~'100% - 40px');
//     .ivu-modal-content {
//       height: 100%;
//       .ivu-modal-body {
//         height: calc(~'100% - 120px');
//         .content {
//           // 弹窗中间内容部分
//           overflow: auto;
//           height: 100%;
//         }
//       }
//     }
//   }
// }
</style>

<style lang="less" scoped>
@import (reference) '~assets/less/variable.less';
.edit-account-modal {
  color: @gradeAshThree;
  .content {
    .leftName {
      vertical-align: top;
      line-height: @num30;
      height: @num30;
      overflow: hidden;
      margin-right: @num10;
      // margin: 0px @num10 0px @num20;
      display: inline-block;
      text-align: justify;
      width: 48px;
      margin-left: 0;
      margin-top: 0;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .rightName {
      vertical-align: top;
      line-height: @num30;
      height: @num30;
      overflow: hidden;
      margin: @num20 @num10 0 @num20;
      display: inline-block;
      text-align: justify;
      width: 24px;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .rightInput {
      display: inline-block;
      vertical-align: top;
      // margin-top: @num20;
    }
    .value-price {
      position: relative;
      &::after {
        position: absolute;
        content: '元';
        display: inline-block;
        top: 7px;
        right: 10px;
        font-size: 12px;
        color: #737373;
      }
    }
    .unit-info {
      height: 56px;
      font-weight: bold;
      letter-spacing: 0.05px;
      line-height: 56px;
      color: @gradeAshTwo;
    }
    .table {
      overflow: hidden;
      // margin: 0px @num20;
      position: relative;
      border: 1px solid @gradeAshFive;
      border-radius: @borderRadiuBig;
      .add {
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 12px;
        color: #008cee;
        letter-spacing: 0;
        display: inline-block;
      }
    }
    .add-info {
      // margin-left: 20px;
      margin-top: -20px;
    }
  }
  .bottom {
    height: 70px;
    .bottom-right {
      .button {
        margin-top: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
