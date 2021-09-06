/** 
* @author 覃凤
* @date 2018/2/26
* @content 体检预约-前台预约-选择套餐及项目（弹窗）
* ifShowModal：弹窗显示隐藏，cancel-data：取消按钮，commit-data：完成按钮
*/
<template>
  <div class="choose-meal-project">
    <Modal v-model="ifShowModal"
           :transition-names='[]'
           :styles='{width:`${100}%`}'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="选择套餐及项目"
                      :showInput='false'></alert-header>
      </div>
      <div class="choose-meal-project-body">
        <div class="meal-project-body flex">
          <div class="project-body-left flx1">
            <div class="left-title">
              <tab :tab='tab'
                   @tab-change='tabChange'>
                <p slot="tabR"
                   class="tab-title">
                  <span>已选：</span>
                  <span :style="{'font-weight': showIndexOne===0?'normal':'bold'}">{{ selectPackage.name || '无' }}</span>
                </p>
              </tab>
            </div>
            <!-- 套餐 -->
            <div class="left-content flex"
                 v-show='showIndexOne===0'>
              <div class="content-left flx1">
                <div class="meal-search-tab">
                  <div class="meal-search">
                    <div style="width: 300px;">
                      <local-search-input @search-key='localSearch'></local-search-input>
                    </div>
                  </div>
                  <div class="meal-tab">
                    <div class="meal-tab-title">
                      <ul class="flex">
                        <li class="style-li overflowEllipsis"
                            v-for='(column,index) in packageColumns'
                            :key="index">{{ column.title }}</li>
                      </ul>
                    </div>
                    <div class="meal-tab-content">
                      <ul class="meal-tab-content-ul">
                        <template v-if="filterPackages.length">
                          <li :key="package.name"
                              v-for='(package,index) in filterPackages'
                              @click="clickRow(package,index)"
                              :class="{active: selectPackage.id === package.id}">
                            <ul class="tab-content-list-ul flex">
                              <template v-for="(column,index2) in packageColumns">
                                <li class="style-li overflowEllipsis">
                                  <div class="row-cell"
                                       v-if="column.pipe">{{ column.pipe(column.key, package[column.key]) }}</div>
                                  <div class="row-cell"
                                       v-else>{{ package[column.key] }}</div>
                                </li>
                              </template>
                            </ul>
                          </li>
                        </template>
                        <div v-else
                             class="no-data-row">{{noDataMsg}}</div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-right">
                <!-- 套餐内项目 -->
                <show-project-list :data="packageGroupItems"></show-project-list>
              </div>
            </div>
            <!-- 项目 -->
            <div class="left-content left-content-pro flex"
                 v-show='showIndexOne===1'>
              <div>
                <project-list-search headerText='检查项目'
                                     :data="checkGroupItems"
                                     :selectData="[]">
                </project-list-search>
              </div>
              <div>
                <project-list-search headerText='检验项目'
                                     :data="checkoutGroupItems"
                                     :selectData="[]"></project-list-search>
              </div>
              <div>
                <project-list-search headerText='功能项目'
                                     :data="functionalGroupItems"
                                     :selectData="[]"></project-list-search>
              </div>
            </div>
            <!-- 附加费 -->
            <div class="left-content"
                 v-show='showIndexOne===2'>
              <div style="width: 650px;margin:0 auto;">
                <add-new-item ref="addNewItemComponent"
                              :chargeCategories="chargeCategories"
                              v-model="selectSurcharges">
                </add-new-item>
              </div>
            </div>
          </div>
          <div class="project-body-right">
            <!-- 项目列表 -->
            <project-list ref='projectList'
                          :allData='listData'></project-list>
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
                    @click='commit'>完 成</z-button>
          <p class="fr">应收金额：
            <span>900.00</span>元</p>
          <div class="clearBoth"></div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import tab from '@/components/tab/tab.vue'
import showProjectList from '../showProjectList.vue' // 套餐内项目
import projectListSearch from '../projectListSearch.vue' // 项目列表
import projectList from '../projectList.vue' // 项目列表
import addNewItem from '@/views/main/prepare/components/addNewItem.vue' // 附加费
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import * as types from '@/store/modules/prepare/appointmentCheckup/frontAppointment/frontAppointmentTypes.js'

export default {
  name: 'choose-meal-project',
  components: {
    tab,
    showProjectList,
    projectListSearch,
    projectList,
    addNewItem,
  },
  props: {
    ifShowModal: {
      type: Boolean,
      default: true,
    },
    sex: {
      type: String,
      default: '2',
    },
  },
  computed: {
    ...mapState('frontAppointmentModule', [
      'curOrder',
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
      'selectOptionDict',
      'chargeCategories',
    ]),
    // 当前套餐内项目
    packageGroupItems() {
      return this.selectPackage.group_items || []
    },
    // 过滤后的套餐
    filterPackages() {
      return this.packages.filter(pc => {
        return this.filter(pc.name, this.packagesKeyword)
      })
    },
    // 无数据时显示内容
    noDataMsg() {
      return this.packages.length ? '无筛选数据' : '暂无数据'
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
      showIndexOne: 0,
      listData: [], // 套餐内项目
      packagesKeyword: null,
      packageColumns: [
        {
          title: '适用对象',
          key: 'target',
          pipe: this.targetDict,
        },
        {
          title: '套餐名称',
          key: 'name',
        },
        {
          title: '项目合计价格',
          key: 'group_price',
        },
        {
          title: '套餐价格',
          key: 'price',
        },
      ],
      curPackage: {},
      /* ==========================================项目 */
      /* ==========================================附加费 */
      expenseCategory: [],
      surchargeNameTest: [],
      typeItem: [
        {
          value: 'expenseCategoryId',
          title: 'expenseCategoryName',
        },
        {
          value: 'surchargeNameId',
          title: 'surchargeNameName',
        },
        {
          value: 'chargeAmount',
        },
      ],
      selectPackage: {}, // 选中套餐
      selectGroupItems: [], // 选中组合项目
      selectSurcharges: [], // 选择附加费
    }
  },
  watch: {},
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
    targetDict(key, value) {
      return this.selectOptionDict[key][value]
    },
    clickRow(data, index) {
      if (this.selectPackage.id === data.id) {
        this.selectPackage = {}
      } else {
        this.selectPackage = data
      }
    },
    localSearch(keyword) {
      this.packagesKeyword = keyword
    },
    filter(value, keyword) {
      if (!keyword) {
        return true
      }
      if (value.indexOf(keyword) === -1) {
        return false
      } else {
        return true
      }
    },
    /* ====================================================附加费 */
    testMethod() {
      this.surchargeNameTest = [
        { surchargeNameName: 'test1', surchargeNameId: 1 },
        { surchargeNameName: 'test2', surchargeNameId: 2 },
        { surchargeNameName: 'test3', surchargeNameId: 3 },
        { surchargeNameName: 'test4', surchargeNameId: 4 },
        { surchargeNameName: 'test5', surchargeNameId: 5 },
        { surchargeNameName: 'test6', surchargeNameId: 6 },
      ]
    },
    getExpenseCategoryFun() {
      this.expenseCategory = [
        { expenseCategoryName: 'test6', expenseCategoryId: 1 },
        { expenseCategoryName: 'test1', expenseCategoryId: 2 },
        { expenseCategoryName: 'test2', expenseCategoryId: 3 },
        { expenseCategoryName: 'test3', expenseCategoryId: 4 },
        { expenseCategoryName: 'test4', expenseCategoryId: 5 },
        { expenseCategoryName: 'test5', expenseCategoryId: 6 },
      ]
    },
    /* ===============================================页面操作 */
    async resetClose() {
      await this.$refs.projectList.resetClose()
    },
    tabChange(data, index) {
      // tab改变
      this.showIndexOne = index
    },
    cancel() {
      // 取消
      this.$emit('cancel-data')
    },
    commit() {
      // 完成
      this.$emit('commit-data')
    },
    // 获取当前选择数据
    getCurSelectData() {
      // 获取当前套餐
      this.selectPackage = Object.assign({}, this.curSelectPackage)

      // 获取当前组合项目
      // if (this.curOrder.item_charges && this.curOrder.item_charges.length) {
      //   this.setCurSelectGroupItems(this.curOrder.item_charges)
      // }
      if (this.curSelectGroupItems.length) {
        this.selectGroupItems = this.curSelectGroupItems.map(item => item)
      }
      // 获取当前附加费
      if (this.curSelectSurcharges.length) {
        this.selectSurcharges = this.curSelectSurcharges.map(item => item)
      }
    },
  },
  async created() {
    // 请求套餐、所有项目、附加费（费用类别）
    let datas = await Promise.all([
      // 所有套餐
      this.getPackages({
        per_page: 10000,
        fields: 'id,name,target,group_price,price',
        filters: 'sex:' + this.sex.join(','),
        with: 'groupItems.surcharges',
      }),
      // 获取检查项目
      this.getGroupItems({
        per_page: 10000,
        filters: `sex:${this.sex.join(',')};status:1;itemType.item_class:${
          this.selectOptions.item_class[0].value
        }`,
        with: 'itemType',
      }),
      // 获取检验项目
      this.getGroupItems({
        per_page: 10000,
        filters: `sex:${this.sex.join(',')};status:1;itemType.item_class:${
          this.selectOptions.item_class[1].value
        }`,
        with: 'itemType',
      }),
      // 获取功能项目
      this.getGroupItems({
        per_page: 10000,
        filters: `sex:${this.sex.join(',')};status:1;itemType.item_class:${
          this.selectOptions.item_class[2].value
        }`,
        with: 'itemType',
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

    this.getCurSelectData()
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.choose-meal-project {
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
        .choose-meal-project-body {
          width: 100%;
          height: 100%;
          overflow: auto;

          border-bottom: 1px solid red;
          .meal-project-body {
            // 弹窗中间内容部分
            width: 1238px;
            height: 660px;
            border-bottom: 1px solid #d8d8d8;
            //  background-color: green;
            // outline: 1px solid green;
          }
        }
      }
    }
  }
}
.choose-meal-project {
  // 弹窗内容布局
  .meal-project-body {
    .project-body-left {
      height: 100%;
      // background-color: goldenrod;
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
        // height: 100%;
        height: calc(~'100% - 50px');
        // background-color: aquamarine;
        & > div {
          margin-right: @num10;
        }
        .content-left {
          height: 100%;
          border-right: 1px solid #d8d8d8;
          // background-color: green;
        }
        .content-right {
          height: 100%;
          width: 177px;
          border-left: 1px solid #d8d8d8;
          border-right: 1px solid #d8d8d8;
          // background-color: pink;
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
      // background-color: red;
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
        font-size: 24px;
        color: @tsIcon;
        font-weight: bold;
      }
    }
  }
}
</style>
<style lang="less" scoped>
@import '~assets/less/variable.less';
@minWidth: 100px;
.meal-search-tab {
  width: 100%;
  // outline: 1px solid red;
  .meal-search {
    height: 50px;
    padding-top: @num10;
    // outline: 1px solid red;
    & > div {
      margin: 0 auto;
    }
  }
  .style-li {
    border-right: 1px solid @gradeAshFive;
    // height: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    // padding-left: @num10;
    // padding-right: @num10;
    min-width: @minWidth;
    .row-cell {
      height: 100%;
      padding-right: 10px;
      padding-left: 10px;
      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;
      // border-right:1px solid @gradeAshFive;
    }
  }
  .style-li:nth-of-type(1) {
    min-width: 74px;
    .row-cell {
      border-left: 2px solid transparent;
    }
  }
  .style-li:nth-of-type(2) {
    // 套餐名称
    min-width: 410px;
  }
  .style-li:nth-last-of-type(1) {
    flex: 1;
    // width: @minWidth;
    border-right: none;
    .row-cell {
      border-right: 2px solid transparent;
    }
  }
  .active {
    .style-li {
      .row-cell {
        border-color: @gradeBlueTwo;
        border-right-color: transparent;
      }
    }
    .style-li:nth-last-of-type(1) {
      .row-cell {
        border-right-color: @gradeBlueTwo;
      }
    }
  }
  .tab-title-choose {
    // 选中的列
    width: 50px;
    border-right: 1px solid @gradeAshFive;
    .ivu-radio-wrapper {
      margin-left: 17px;
    }
  }
  .meal-tab {
    height: calc(~'100% - 50px');
    .meal-tab-title {
      height: 40px;
      line-height: 40px;
      & > ul {
        background-color: @tableTh;
        color: @gradeAshOne;
        text-align: center;
      }
    }
    .meal-tab-content {
      height: calc(~'100% - 30px');
      .meal-tab-content-ul {
        // 内容行
        height: 100%;
        overflow: auto;
        color: @gradeAshTwo;
        & > li {
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          overflow: hidden;
        }
        & > li:nth-of-type(2n) {
          background-color: @tableTr;
        }
        & > li:nth-last-of-type(1) {
          border-bottom: 1px solid @gradeAshFive;
        }
      }
    }
  }
  .no-data-row {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
</style>