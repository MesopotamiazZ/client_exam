/** 
* @author 覃凤
* @date 2018/3/11
* @content 体检预约-前台预约-附加费选择
* chargeCategories: 展示用费用类型 （对象内需要包含 surcharges 费用名称）
* value: 当前附加费列表  （双向绑定）
*/
<template>
  <div class="choose-items-modal-surcharge container">
    <Form ref="surchargeForm"
          :model="surchargeForm"
          inline>
      <!-- 附加费用 -->
      <div class="row"
           v-for="(item, index) in surchargeForm.items">
        <FormItem label="费用类别"
                  :label-width="70"
                  :prop="`items.${index}.changeSurcharge_id`"
                  :rules="changeSurchargeRules">
          <Select placeholder='' v-model="item.changeSurcharge_id"
                  :disabled="item.status !== 0"
                  filterable>
            <Option v-for="(cc, i) in chargeCategories"
                    :value="cc.id"
                    :key="i"
                    @click.native.stop="setChangeSurcharges(item, cc.surcharges)">{{cc.name}}</option>
          </Select>
        </FormItem>
        <FormItem label="附加费名称"
                  :label-width="80"
                  :prop="`items.${index}.surcharge_id`"
                  :rules="surchargeRules">
          <template v-if="item.surchargeOptions.length">
            <Select placeholder='' v-model="item.surcharge_id"
                    :disabled="item.status !== 0"
                    filterable>
              <Option v-for="(cc, index) in item.surchargeOptions"
                      :value="cc.id"
                      :key="index"
                      @click.native="item.price = +cc.price">{{cc.name}}</option>
            </Select>
          </template>
          <template v-else>
            <Select disabled>
            </Select>
          </template>

        </FormItem>
        <FormItem label="收费金额"
                  :label-width="70"
                  :prop="`items.${index}.price`"
                  :rules="numberRules">
          <z-input-number :max="10000000"
                          :min="0"
                          ref="NumberInput"
                          v-model="item.price"
                          :disabled="item.status !== 0"
                          @on-change="validatePrice(item, $refs.NumberInput[index])"
                          :step="0.01"></z-input-number>
        </FormItem>
        <icon :name="item.status === 0 ? 'deletItemT': 'deletItemS'"
              class="handler"
              @click.native="delItem(item, item.status)"></icon>
      </div>

      <!-- 默认费用行 -->
      <div class="row">
        <FormItem label="费用类别"
                  :label-width="70"
                  prop="default.changeSurcharge_id">
          <Select v-model="surchargeForm.default.changeSurcharge_id"
                  ref="defaultSelect"
                  filterable>
            <Option v-for="(cc, i) in chargeCategories"
                    :value="cc.id"
                    :key="i"
                    @click.native.stop="setChangeSurcharges(surchargeForm.default, cc.surcharges)">{{cc.name}}</option>
          </Select>
        </FormItem>
        <FormItem label="附加费名称"
                  :label-width="80"
                  prop="default.surcharge_id"
                  :rules="defaultSurchargeRules">
          <template v-if="surchargeForm.default.surchargeOptions.length">
            <Select v-model="surchargeForm.default.surcharge_id"
                    filterable>
              <Option v-for="(cc, index) in surchargeForm.default.surchargeOptions"
                      :value="cc.id"
                      :key="index"
                      @click.native="surchargeForm.default.price = +cc.price">{{cc.name}}</option>
            </Select>
          </template>
          <template v-else>
            <Select disabled>
            </Select>
          </template>

        </FormItem>
        <FormItem label="收费金额"
                  :label-width="70"
                  prop="default.price"
                  :rules="defaultNumberRules">
          <z-input-number :max="10000000"
                          :min="0"
                          ref="defaultNumberInput"
                          v-model="surchargeForm.default.price"
                          @on-change="validatePrice(surchargeForm.default, $refs.defaultNumberInput)"
                          :step="0.01"></z-input-number>
        </FormItem>
        <icon :name="canAddItem ? 'addNewItemT': 'addNewItemS'"
              class="handler"
              @click.native="addItem"></icon>
      </div>
    </Form>
  </div>
</template>
<script>
// 依赖文件
import { mapState } from 'vuex'

// 公共组件
import zInputNumber from '@/components/form/zInputNumber'

export default {
  name: 'chooseItemsModalSurcharges',
  components: {
    zInputNumber,
  },
  props: {
    chargeCategories: {
      type: Array,
      required: true,
      default: () => [],
    },
    value: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      surchargeForm: {
        items: [],
        default: {
          changeSurcharge_id: null,
          surcharge_id: null,
          price: 0,
          surchargeOptions: [],
          status: 0,
        },
      },
      numberRules: [
        {
          required: true,
          type: 'number',
          message: '收费金额不能为空',
          trigger: 'blur',
        },
        {
          validator: (rule, value, callback) => {
            if (typeof value === 'number' && value > 0) {
              callback()
            } else {
              callback(new Error('收费金额必须大于0'))
            }
          },
          trigger: 'blur',
        },
      ],
      defaultNumberRules: [
        {
          required: true,
          type: 'number',
          message: '收费金额不能为空',
          trigger: 'blur',
        },
        {
          validator: (rule, value, callback) => {
            if (
              (typeof value === 'number' && value > 0) ||
              !this.surchargeForm.default.changeSurcharge_id ||
              !this.surchargeForm.default.surcharge_id
            ) {
              callback()
            } else {
              callback(new Error('收费金额必须大于0'))
            }
          },
          trigger: 'blur',
        },
      ],
      changeSurchargeRules: [
        {
          validator(rule, value, callback) {
            if (value) {
              callback()
            } else {
              callback('费用类别必须选择')
            }
          },
          trigger: 'change',
        },
      ],
      surchargeRules: [
        {
          validator(rule, value, callback) {
            if (value) {
              callback()
            } else {
              callback('附加费名称必须选择')
            }
          },
          trigger: 'change',
        },
      ],
      defaultSurchargeRules: [
        {
          validator: (rule, value, callback) => {
            if (value || !this.surchargeForm.default.changeSurcharge_id) {
              callback()
            } else {
              callback('附加费名称必须选择')
            }
          },
          trigger: 'change',
        },
      ],
    }
  },
  methods: {
    submitValidator(callback) {
      this.$refs.surchargeForm.validate(result => {
        callback(result)
      })
    },
    addItem() {
      if (!this.canAddItem) return
      this.surchargeForm.items.push(
        Object.assign({}, this.surchargeForm.default),
      )
      this.surchargeForm.default = {
        changeSurcharge_id: null,
        surcharge_id: null,
        price: 0,
        surchargeOptions: [],
        status: 0,
      }
      this.$refs.defaultSelect.setQuery('')
    },
    delItem(item, status) {
      if (status !== 0) return
      let index = this.surchargeForm.items.findIndex(_item => _item === item)
      if (typeof index === 'number') {
        this.surchargeForm.items.splice(index, 1)
      }
    },
    getNewItem(item) {
      return {
        changeSurcharge_id: item.changeSurcharge_id,
        surcharge_id: item.surcharge_id,
        price: item.price,
        status: item.status || 0,
      }
    },
    checkItem(item) {
      if (
        typeof item.changeSurcharge_id === 'number' &&
        typeof item.surcharge_id === 'number' &&
        item.price > 0
      ) {
        return true
      }
      return false
    },
    setChangeSurcharges(item, surcharges = []) {
      item.surchargeOptions = surcharges
    },
    validatePrice(item, ref) {
      if (typeof item.price === 'number' && item.price !== 0) {
        item.price = ~~(item.price * 100) / 100
        // 手动设置select组件的value值
        ref.currentValue = item.price
      } else {
        item.price = 0
      }
    },
    setCurSurcharge(value = []) {
      this.surchargeForm.items = []
      // 添加附加费项目
      value.forEach(item => {
        let surcharge = {
          changeSurcharge_id: item.charge_category_id,
          surcharge_id: item.surcharge_id,
          price: +item.price,
          status: item.status,
        }

        let chargeCategorie = this.chargeCategories.find(
          item => item.id === item.charge_category_id,
        )

        surcharge.surchargeOptions =
          (chargeCategorie && chargeCategorie.surcharges) || []

        this.surchargeForm.items.push(surcharge)
      })
    },
  },
  created() {
    this.setCurSurcharge(this.value)
  },
  computed: {
    ...mapState('frontAppointmentModule', ['curSelectSurcharges']),
    canAddItem() {
      let defaultItem = this.surchargeForm.default
      if (
        defaultItem.changeSurcharge_id &&
        defaultItem.surcharge_id &&
        defaultItem.price > 0
      ) {
        return true
      }
      return false
    },
  },
  watch: {
    surchargeForm: {
      deep: true,
      handler() {
        let items = []
        if (this.canAddItem) {
          items.push(this.getNewItem(this.surchargeForm.default))
        }
        this.surchargeForm.items.forEach(item => {
          if (this.checkItem(item)) {
            items.push(this.getNewItem(item))
          }
        })
        this.$emit('update:value', items)
      },
    },
  },
}
</script>

<style lang="less">
.choose-items-modal-surcharge {
  &.container {
    padding-top: 20px;
    display: flex;
    width: 100%;
    justify-content: center;
    .ivu-form {
      width: 750px;
      .row {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .ivu-form-item {
          flex: 1;
          margin-bottom: 0;
          .ivu-form-item-label::before {
            display: none;
          }
          .ivu-input-number {
            width: 100%;
          }
        }
        .handler {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>