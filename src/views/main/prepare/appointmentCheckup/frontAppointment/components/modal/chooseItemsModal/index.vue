/** 
* @author 覃凤
* @date 2018/2/26
* @content 体检预约-前台预约-选择套餐及项目（弹窗）
* ifShowModal：弹窗显示隐藏，cancel-data：取消按钮，commit-data：完成按钮
*/
<template>
  <div>
    <Modal class="choose-items-modal"
           v-model="ifShowModal"
           :transition-names='[]'
           :styles='{width:`${100}%`}'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header :headerText="'选择'"
                      :showInput='false'></alert-header>
      </div>
      <div class="choose-items-modal-body">
        <div class="meal-project-body flex">
          <div class="project-body-left flx1">
            <div class="left-title">
              <tab :tab='tab'
                   @tab-change='tabChange'>
                <p slot="tabR"
                   class="tab-title">
                  <span>已选：</span>
                  <span :style="{'font-weight': showIndexOne===0?'normal':'bold'}">{{ selectedPackage.name || '无' }}</span>
                </p>
              </tab>
            </div>
            <!-- 套餐 -->
            <div class="left-content flex"
                 v-show='showIndexOne===0'>
              <packages ref="packages"
                        :packages="packages"
                        :selectedPackage="selectedPackage"
                        @on-select="selectPackage"></packages>
            </div>
            <!-- 项目 -->
            <div class="left-content left-content-pro flex"
                 v-show='showIndexOne===1'>
              <div>
                <group-items headerText='检查项目'
                             :groupItems="checkGroupItems"
                             :value.sync="selectedCheckGroupItems"
                             :groupItemsInPackageIds="groupItemsInPackageIds"
                             @on-remove-item-in-package="cancelPackage">
                </group-items>
              </div>
              <div>
                <group-items headerText='检验项目'
                             :groupItems="checkoutGroupItems"
                             :value.sync="selectedCheckoutGroupItems"
                             :groupItemsInPackageIds="groupItemsInPackageIds"
                             @on-remove-item-in-package="cancelPackage"></group-items>
              </div>
              <div>
                <group-items headerText='功能项目'
                             :groupItems="functionalGroupItems"
                             :value.sync="selectedFunctionalGroupItems"
                             :groupItemsInPackageIds="groupItemsInPackageIds"
                             @on-remove-item-in-package="cancelPackage"></group-items>
              </div>
            </div>
            <!-- 附加费 -->
            <div class="left-content"
                 v-show='showIndexOne===2'>
              <div>
                <surcharges ref="surcharges"
                            :chargeCategories="chargeCategories"
                            :value.sync="selectedSurcharges">
                </surcharges>
              </div>
            </div>
          </div>
          <div class="project-body-right">
            <!-- 项目列表 -->
            <group-items-and-surcharge ref='groupItemsAndSurcharge'
                                       :groupItems='selectedAllGroupItems'></group-items-and-surcharge>
          </div>
        </div>
      </div>
      <div slot='footer'>
        <div class="meal-project-footer paddingB20 paddingT20">
          <z-button ZBtype='ghost'
                    class="fr marginR20"
                    @click="cancel">取 消</z-button>
          <z-button ZBtype='primary'
                    class="fr marginR20"
                    @click='showConfirmSubmitModal = true'>完 成</z-button>
          <p class="fr">订单金额：
            <span>{{orderPrice | toPrecision(2)}}</span>元</p>
          <p class="fr">项目合计金额
            <span>{{groupItemsTotalPrice | toPrecision(2)}}</span>元</p>
          <div class="clearBoth"></div>
        </div>
      </div>
    </Modal>
    <tip-modal :controlModal="showEmptyPackageModal"
               :isMask="false"
               mainContent="确认取消选择已选套餐吗？"
               @tip-modal-affirm="emptySelectedPackage"
               @tip-modal-cancel="showEmptyPackageModal=false"></tip-modal>
    <tip-modal :controlModal="showConfirmSubmitModal"
               :isMask="false"
               mainContent="确认修改已选项目吗？"
               @tip-modal-affirm="submit"
               @tip-modal-cancel="showConfirmSubmitModal=false"></tip-modal>
  </div>
</template>
<script>
// 依赖文件
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import * as types from '@/store/modules/prepare/appointmentCheckup/frontAppointment/frontAppointmentTypes.js'

// 公共组建
import tab from '@/components/tab/tab'
// import tipModal from '@/views/main/prepare/components/modal/tipModal'

// 私有组件
import groupItems from './groupItems'
import groupItemsAndSurcharge from '../../groupItemsAndSurcharge'
import packages from './packages'
import surcharges from './surcharges'

export default {
  name: 'chooseItemsModal',
  components: {
    groupItemsAndSurcharge, // 项目列表（右侧）
    groupItems, // 组合项目列表
    packages, // 套餐列表
    surcharges, // 附加费组件
    tab, // 标签组件
    // tipModal, // 提示弹窗
  },
  props: {
    ifShowModal: {
      type: Boolean,
      default: false,
    },
    sex: {
      type: Array,
      default: () => ['2'],
    },
  },
  computed: {
    ...mapState('frontAppointmentModule', [
      'selectOptions',
      'checkGroupItems',
      'checkoutGroupItems',
      'functionalGroupItems',
      'curSelectPackage',
      'curSelectGroupItems',
      'curSelectSurcharges',
    ]),
    ...mapGetters('frontAppointmentModule', [
      'packages',
      'chargeCategories',
      'curSelectPackageId',
    ]),
    groupItemsInPackageIds() {
      return this.selectedGroupItemsInPackage.map(item => item.id)
    },
    selectedAllGroupItems() {
      return [
        ...this.selectedGroupItemsInPackage,
        ...this.selectedCheckGroupItems,
        ...this.selectedCheckoutGroupItems,
        ...this.selectedFunctionalGroupItems,
      ]
    },
    // 项目合计金额 (组合项目总金额 + 套餐内组合项目金额 + 订单附加费)
    groupItemsTotalPrice() {
      return (
        this.selectedGroupItemsInPackage.reduce(
          (price, item) => price + +item.price,
          0,
        ) +
        this.groupItemsPrice +
        this.surchargePrice
      )
    },
    // 订单金额 (组合项目总金额 + 套餐金额 + 订单附加费)
    orderPrice() {
      let packagePrice = this.selectedPackage.price || 0
      return this.groupItemsPrice + this.surchargePrice + +packagePrice
    },
    // 组合项目总金额
    groupItemsPrice() {
      return (
        this.selectedCheckGroupItems.reduce(
          (price, item) => price + +item.price,
          0,
        ) +
        this.selectedCheckoutGroupItems.reduce(
          (price, item) => price + +item.price,
          0,
        ) +
        this.selectedFunctionalGroupItems.reduce(
          (price, item) => price + +item.price,
          0,
        )
      )
    },
    // 订单附加费金额
    surchargePrice() {
      return this.selectedSurcharges.reduce(
        (price, surcharge) => price + +surcharge.price,
        0,
      )
    },
  },
  data() {
    return {
      tab: [
        {
          title: '套餐',
        },
        {
          title: '项目',
        },
        {
          title: '附加费',
        },
      ],
      showEmptyPackageModal: false,
      showConfirmSubmitModal: false,
      showIndexOne: 0,
      /* ==========================================项目 */
      removeItem: {},
      /* ==========================================附加费 */
      selectedPackage: {}, // 选中套餐
      selectedGroupItemsInPackage: [], // 选中套餐内项目
      selectedCheckGroupItems: [], // 选中检查项目
      selectedCheckoutGroupItems: [], // 选中检验项目
      selectedFunctionalGroupItems: [], // 选中功能项目
      selectedSurcharges: [], // 选中附加费
    }
  },
  watch: {
    packages() {
      // 解决延迟问题
      this.selectedPackage =
        this.packages.find(item => item.id === this.curSelectPackageId) || {}
    },
  },
  methods: {
    ...mapActions('frontAppointmentModule', [
      'getPackages',
      'getGroupItems',
      'getChargeCategories',
    ]),
    ...mapMutations('frontAppointmentModule', {
      // 设置检查组合项
      setCheckGroupItems: types.SET_CHECK_GROUP_ITEMS,
      // 设置检验组合项
      setCheckoutGroupItems: types.SET_CHECKOUT_GROUP_ITEMS,
      // 设置功能组合项
      setFunctionalGroupItems: types.SET_FUNCTIONAL_GROUP_ITEMS,
    }),
    /* ==============================================套餐操作 */
    // 设置当前选择数据
    initCurSelectData() {
      // 设置当前套餐
      this.selectedPackage =
        this.packages.find(item => item.id === this.curSelectPackageId) || {}

      // 设置当前套餐内项目
      if (Array.isArray(this.selectedPackage.group_items)) {
        this.selectedGroupItemsInPackage = this.selectedPackage.group_items.map(
          item => Object.assign({ in_package: true }, item),
        )
      }

      // 设置当前组合项目 根据组合项目类型 赋值在不同组合项目中 目前项目中没有标识项目类型的字段
      if (this.curSelectGroupItems.length) {
        this.curSelectGroupItems.forEach(item => {
          if (typeof item.item_class !== 'number') return

          let _class = item.item_class

          if (_class === 1) {
            this.selectedCheckGroupItems.push(
              Object.assign({ name: item.group_item_name }, item),
            )
          } else if (_class === 2) {
            this.selectedCheckoutGroupItems.push(
              Object.assign({ name: item.group_item_name }, item),
            )
          } else if (_class === 3) {
            this.selectedFunctionalGroupItems.push(
              Object.assign({ name: item.group_item_name }, item),
            )
          }
        })
      }

      // 设置当前附加费
      if (this.curSelectSurcharges.length) {
        this.selectedSurcharges = this.curSelectSurcharges.map(item => item)
      }
    },
    // 选择套餐
    selectPackage(_package = {}) {
      this.selectedPackage = _package
      if (this.selectedPackage.group_items) {
        this.selectedGroupItemsInPackage = this.selectedPackage.group_items.map(
          item => Object.assign({ in_package: true }, item),
        )
      } else {
        this.selectedGroupItemsInPackage = []
      }

      // 选择套餐时 取消已存在于套餐内项目中的组合项目
      this.selectedCheckGroupItems = this.selectedCheckGroupItems.filter(
        item => !~this.groupItemsInPackageIds.indexOf(item.id),
      )
      this.selectedCheckoutGroupItems = this.selectedCheckoutGroupItems.filter(
        item => !~this.groupItemsInPackageIds.indexOf(item.id),
      )
      this.selectedFunctionalGroupItems = this.selectedFunctionalGroupItems.filter(
        item => !~this.groupItemsInPackageIds.indexOf(item.id),
      )
    },
    // 清空当前套餐
    emptySelectedPackage() {
      this.selectPackage()
      this.showEmptyPackageModal = false
      this.removeItem = {}
    },
    // 取消套餐
    cancelPackage(item) {
      this.removeItem = item
      this.showEmptyPackageModal = true
    },
    /* ====================================================附加费 */
    /* ===============================================页面操作 */
    // tab改变
    tabChange(data, index) {
      this.showIndexOne = index
    },
    // 取消
    cancel() {
      this.$emit('update:ifShowModal', false)
    },
    // 提交选择数据
    submit() {
      console.log(
        this.selectedAllGroupItems,
        this.selectedPackage,
        this.selectedSurcharges,
      )
      this.$emit('on-submit')
    },
  },
  async mounted() {
    // 初始化当前数据
    this.initCurSelectData()

    // 请求套餐、所有项目、附加费（费用类别）
    let datas = await Promise.all([
      // TODO: 确定status作用范围 等待后台确认
      // 所有套餐
      this.getPackages({
        per_page: 100,
        fields: 'id,name,target,group_price,price',
        filters: `sex:${this.sex.join(
          ',',
        )};status:1;groupItems.itemType.status:1;`,
        with: 'groupItems.surcharges;groupItems.itemType',
      }),
      // 获取检查项目
      this.getGroupItems({
        per_page: 10000,
        filters: `sex:${this.sex.join(
          ',',
        )};status:1;itemType.status:1;itemType.item_class:${
          this.selectOptions.item_class[0].value
        }`,
        with: 'itemType;surcharges',
      }),
      // 获取检验项目
      this.getGroupItems({
        per_page: 10000,
        filters: `sex:${this.sex.join(
          ',',
        )};status:1;itemType.status:1;itemType.item_class:${
          this.selectOptions.item_class[1].value
        }`,
        with: 'itemType;surcharges',
      }),
      // 获取功能项目
      this.getGroupItems({
        per_page: 10000,
        filters: `sex:${this.sex.join(
          ',',
        )};status:1;itemType.status:1;itemType.item_class:${
          this.selectOptions.item_class[2].value
        }`,
        with: 'itemType;surcharges',
      }),
      // 获取费用类型
      this.getChargeCategories({
        per_page: 10000,
        filters: 'status:1;surcharges.status:1;',
        with: 'surcharges',
      }),
    ])

    this.setCheckGroupItems(datas[1].items)
    this.setCheckoutGroupItems(datas[2].items)
    this.setFunctionalGroupItems(datas[3].items)

    // 需要在数据获取之后进行的操作
    this.$refs.packages.scrollToPackage()
    this.$refs.surcharges.initCurSurcharge()
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.choose-items-modal {
  // 整体布局
  .ivu-modal {
    max-width: 1278px;
    height: 100%;
    padding: @num20;
    max-height: 827px;
    .ivu-modal-content {
      width: 100%;
      height: 100%;
      .ivu-modal-body {
        width: 100%;
        height: calc(~'100% - 120px');
        overflow: auto;
        .choose-items-modal-body {
          width: 100%;
          height: 100%;
          overflow: auto;
          .meal-project-body {
            // 弹窗中间内容部分
            width: 1238px;
            height: 660px;
            border-bottom: 1px solid #d8d8d8;
          }
        }
      }
    }
  }
}
.choose-items-modal {
  // 弹窗内容布局
  .meal-project-body {
    .project-body-left {
      height: 100%;
      .left-title {
        height: 50px;
        border-bottom: 1px solid @gradeAshFive;
        .tab-title {
          line-height: 50px;
          font-size: 16px;
          color: @gradeAshOne;
          span {
            font-size: 16px;
            color: @gradeAshTwo;
          }
        }
      }
      .left-content {
        height: calc(~'100% - 50px');
        .content-left {
          height: 100%;
          border-right: 1px solid #d8d8d8;
        }
        .content-right {
          height: 100%;
          width: 177px;
          border-left: 1px solid #d8d8d8;
          border-right: 1px solid #d8d8d8;
        }
      }
      .left-content-pro {
        // 项目tab
        & > div {
          height: 100%;
          flex: 1;
          margin-right: @num10;
          border-left: 1px solid #d8d8d8;
          border-right: 1px solid #d8d8d8;
        }
        & > div:nth-type-of(1) {
          border-left: none;
        }
      }
    }
    .project-body-right {
      height: 100%;
      width: 300px;
      .group-items-and-surcharge {
        border-bottom: none;
        border-top: none;
        box-shadow: none;
        border-radius: 0;
        .ivu-table::before {
          display: none;
        }
      }
    }
  }
  .meal-project-footer {
    & > p {
      line-height: 30px;
      color: @gradeAshThree;
      font-size: 12px;
      margin-right: 35px;
      & > span {
        margin-left: 3px;
        margin-right: 3px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>