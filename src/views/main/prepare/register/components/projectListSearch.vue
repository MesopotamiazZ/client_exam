/** 
* @author 覃凤
* @date 2018/2/26
* @content 体检预约-前台预约-项目（带搜索）
* headerText：表头名称，showCheckBox：是否显示多选框，data：列表中的数据，chouseData传入的需要显示选中的数据(套餐中的数据)，
* newData：列表中操作的数据，newChouseData：需要传出的套餐数据，
*/
<template>
  <div class="project-list-search">
    <alert-header-for-modal :headerText='headerText'>
      <div slot="alertHeaderSearch">
        <div style="178px;">
          <local-search-input @search-key='localSearch'></local-search-input>
        </div>
      </div>
    </alert-header-for-modal>
    <div class="list-search-body">
      <ul class="list-search-head">
        <template v-for="(columns,index) in columns">
          <li class="overflowEllipsis style-li"
              :key="index">
            <div>{{ columns.title }}</div>
          </li>
        </template>
        <li class="overflowEllipsis style-li"
            v-if='showCheckBox'>
          <div>选中</div>
        </li>
      </ul>
      <ul class="list-search-content">
        <template v-for="(item,index1) in data">
          <li :key="index1"
              @click='liClick(item,index1)'
              v-if='filter(item.name)'>
            <ul class="search-content-ul">
              <template v-for="(item2,index2) in columns">
                <li class="overflowEllipsis style-li"
                    :key="index2">{{ item[item2.key] }}</li>
              </template>
              <li class="overflowEllipsis style-li"
                  v-if='showCheckBox'>
                <div class="checkbox">
                  <Checkbox v-model="item.ifChoused"
                            :disabled='item.isDisabled'
                            :true-value='1'
                            :false-value='0'
                            @on-change='checkboxChange'></Checkbox>
                </div>
              </li>
            </ul>
          </li>
        </template>
        <!-- <div class="no-data-row">暂无数据</div> -->
      </ul>
    </div>
  </div>

</template>
<script>
import * as _ from 'lodash'
export default {
  name: 'project-list-search',
  props: {
    headerText: {
      type: String,
    },
    showCheckBox: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
      default() {
        return [
          {
            title: '项目名称',
            key: 'name',
          },
          {
            title: '标准价格',
            key: 'price',
          },
        ]
      },
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      msg: '项目（带搜索）',
      keyword: '', // 搜索的数据
      projectData: [], // 除套餐外选中的数据
    }
  },
  methods: {
    // ...mapActions('frontAppointmentModule', [
    //   'getExamComboList',
    //   'getAllExamPro',
    //   'getProOfExamComboList',
    // ]),
    localSearch(data) {
      this.keyword = data
    },
    filter(data) {
      // 搜索
      if (!this.keyword) {
        return true
      }
      if (data.indexOf(this.keyword) === -1) {
        return false
      } else {
        return true
      }
    },
    liClick(data, index) {
      // 点击每一行
      console.log('点击获取的行数据', data)
      // 判断数据是否是选中套餐内的数据
      // 出现取消确认弹窗，取消会将所有套餐内的数据取消（如果确认取消的话，emit给父组件，从父组件控制）
      // 点击显示是否选中
      if (!data.isDisabled) {
        this.data[index].ifChoused = data.ifChoused === 1 ? 0 : 1
      }
    },
    checkboxChange(data) {
      // 多选框按钮选中
      console.log(data)
    },
    // initData () { // 处理显示选中的数据
    //   this.chouseData
    // },
  },
  mounted() {
    // this.initData(this.data)
    // console.log(this.data)
    this.newData = _.clone(this.data)
  },
  computed: {
    noDataMsg() {
      return this.packages.length ? '无筛选数据' : '暂无数据'
    },
  },
}
</script>
<style lang="less" scoped>
@import '~assets/less/variable.less';
@width: 50px;
@minWidth: 74px;
.project-list-search {
  height: 100%;
  // outline: 1px solid green;
  .list-search-body {
    height: calc(~'100% - 50px');
    color: @gradeAshOne;
    .style-li {
      border-right: 1px solid @gradeAshFive;
      height: 100%;
      text-align: center;
      // padding-left: @num10;
      // padding-right: @num10;
      width: @minWidth;
    }
    .style-li:nth-of-type(1) {
      flex: 1;
      min-width: @minWidth;
    }
    .style-li:nth-last-of-type(1) {
      border-right: none;
      width: @width;
    }
    .list-search-head {
      height: 40px;
      line-height: 40px;
      background-color: @tableTh;
      text-align: center;
      display: flex;
      white-space: nowrap;
      align-items: center;
    }
    .checkbox {
      label {
        margin-left: @num10;
      }
    }
    .list-search-content {
      height: calc(~'100% - 40px');
      overflow: auto;
      & > li {
        // 内容每一行
        line-height: 40px;
        height: 40px;
        width: 100%;
        // border-right: 1px solid red;
        cursor: pointer;
        .search-content-ul {
          // 具体显示的ul
          text-align: center;
          display: flex;
          white-space: nowrap;
          align-items: center;
        }
      }
      & > li:nth-of-type(2n) {
        background-color: @tableTr;
      }
      & > li:nth-last-of-type(1) {
        border-bottom: 1px solid @gradeAshFive;
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
