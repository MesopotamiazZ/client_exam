<template>
  <div>
    <ul class="item-all">
      <li class="item-li-content">
        <Form ref="surchargeForm"
              :model="surchargeForm"
              :label-width="80"
              style="width: 300px"
              inline>
          <template v-for="(item, index) in surchargeForm.items">
            <FormItem :key="index"
                      label="费用类别"
                      :prop="'items.' + index + '.value'"
                      :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
              <Select ref="row">
                <Option :value="cc.id"
                        v-for="(cc, index) in chargeCategories"
                        @click.native.stop="show($refs.row[index], cc)" :key="index">{{cc.name}}</option>
              </Select>
            </FormItem>
            <FormItem :key="index"
                      label="附加费名称"
                      :prop="'items.' + index + '.value'">
              <Select>
                <Option :value="cc.id"
                        v-for="(cc, index) in chargeCategories" :key="index">{{cc.name}}</option>
              </Select>
            </FormItem>
            <FormItem :key="index"
                      label="收费金额"
                      :prop="'items.' + index + '.value'">
              <Input></Input>
            </FormItem>
          </template>
        </Form>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
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
        items: [{}],
      },
    }
  },
  methods: {
    show () {
      /* console.log(arguments) */
    },
  },
  computed: {
    ...mapState('frontAppointmentModule', ['curSelectSurcharges']),
  },
  created () {
    console.log(this.curSelectSurcharges)
  },
}
</script>

<style lang="less">
.item-all {
  .item-li-content {
    margin-top: 20px;
    display: flex;
    .title {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
    }
    .ivu-select {
      width: 130px;
      margin-right: 20px;
    }
    .ivu-input-wrapper {
      width: 130px;
    }
    .icon-title {
      padding-top: 6px;
      margin-left: 12px;
      display: inline-block;
    }
  }
}
</style>