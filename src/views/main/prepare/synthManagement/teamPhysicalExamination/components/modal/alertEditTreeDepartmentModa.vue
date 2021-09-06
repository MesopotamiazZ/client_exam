/**
* author      : yhy
* cteate      : 2018/03/07
* description : 树状图编辑车间/部门
*/
<template>
    <!-- 升级vip -->
    <Modal v-model="alertEditTreeDepartmentModa"
           class="alert-edit-tree-department-moda"
           :width='423'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
        <div slot="header">
            <alert-header :showInput='false' :headerText="'编辑车间/部门'"></alert-header>
        </div>
        <div class="content">
          <Form :model="formInline" :rules="ruleInline">
            <div class="leftName">上级车间/部门</div>
            <FormItem prop="superiorSepartment" style="width: 297px;display:inline-block;">
              <Select v-model="formInline.superiorSepartment" class='symbol-price price' placeholder=''>
                <Option v-for="item in superiorSepartmentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <div class="leftName">车间/部门名称</div>
            <FormItem prop="departmentName" style="width: 297px; display:inline-block;">
              <Input type="text" v-model="formInline.departmentName" :class="{inputVerificationTs:isEmpty(formInline.departmentName)}" class='symbol-price price' />
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <div class="bottom marginT20">
            <div class="bottom-right">
              <Button type="primary" class="button" @click="rechargeVipSure">保 存</Button>
              <Button type="ghost" class="button" @click="rechargeCancel">取 消</Button>
            </div>
          </div>
        </div>
    </Modal>
</template>

<script>
export default {
  name: 'alertEditTreeDepartmentModa',
  data() {
    return {
      superiorSepartmentList: [
        {
          label: '行政部',
          value: 1,
        },
      ],
      formInline: {
        superiorSepartment: null, // 上级部门
        departmentName: '', // 车间部门名称
      },
      ruleInline: {
        departmentName: [
          {
            required: true,
            message: '车间/部门名称不为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  watch: {
    alertTreeDepartmentModa(val) {
      if (!val) {
        this.initClear()
      }
    },
  },
  props: {
    alertEditTreeDepartmentModa: {
      type: Boolean,
      default: false,
    },
    headerText: {
      type: String,
      default: '编辑车间/部门',
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
    rechargeVipSure() {
      this.$emit('tree-sure')
    },
    rechargeCancel() {
      this.$emit('update:alertEditTreeDepartmentModa', false)
    },
    initClear () {
      this.formInline = {
        superiorSepartment: null, // 上级部门
        departmentName: '', // 车间部门名称
      }
    },
  },
}
</script>
<style lang="less">
// 表格修改，
// .alert-edit-tree-department-moda {
//   .ivu-table {
//     .ivu-table-fixed-right {
//       .ivu-table-fixed-header {
//         th {
//           .ivu-table-cell {
//             margin-left: -50px!important;
//           }
//         }
//       }
//       .ivu-table-fixed-body {
//         .ivu-table-row {
//           &>td{
//             &>div {
//               width: 70px;
//             }
//           }
//         }
//       }
//     }
//   }
// }
</style>

<style lang="less" scoped>
.alert-edit-tree-department-moda {
  .content {
    .leftName {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align: justify;
      width: 78px;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .symbol-price {
      position: relative;
      display: inline-block;
      vertical-align: top;
      margin-top: 20px;
 
    }
    .ivu-form-item {
      margin-bottom: 0;
    }

  }
  .bottom {
    height: 50px;
    .bottom-right {
      .button {
        // margin-top: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>

