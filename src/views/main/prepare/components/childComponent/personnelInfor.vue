/** 
* @author 覃凤
* @date 2018/3/9
* @content 表格导入备单-表格信息-人员信息
* showData：页面显示的数据，showIndex：页面显示的选中行
*/
<template>
  <div class="personnel-infor">
    <div class="personnel-infor-body">
      <ul class="person-info-title-key person-info-public">
        <li v-for='itemTitle in person_info.listKey' :key="itemTitle.key">
          <div>{{ itemTitle.title }}</div>
        </li>
      </ul>
      <ul class="person-info-title-name person-info-public person-info-title-key-scroll">
        <li  v-for='itemTitle in person_info.listTitle' :key="itemTitle.key">
          <div>{{ itemTitle.title }}</div>
        </li>
      </ul>
      <!-- {{showThisRow}} -->
      <div class="person-info-con">
        <ul class="person-info-con-in">
          <li :class='{active: index===showThisRow}' style="width: 100%;" v-for="(item,index) in showData" :key="index">
            <ul class="person-info-con-line person-info-public">
              <li class="overflowEllipsis" :title='item[item2.key]' v-for='item2 in person_info.listTitle' :key='item2.key'>
                <div>{{ item[item2.key] }}</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personnel-infor',
  props: {
    showData: {
      type: Array,
      default: () => {
        return []
      },
    },
    showThisRow: {
      type: Number,
      default: null,
    },
  },
  watch: {
    showData(val) {
      console.log(val)
    },
    showThisRow (val) {
      console.log(val)
    },
  },
  data () {
    return {
      msg: '人员信息',
      person_info: {
        listTitle: [
          {
            title: '1',
            key: 'num',
          }, {
            title: '姓名',
            key: 'realname',
          }, {
            title: '身份证号',
            key: 'id_card',
          }, {
            title: '性别',
            key: 'sex',
          }, {
            title: '年龄',
            key: 'age',
          }, {
            title: '车间/部门',
            key: 'dept_name',
          }, {
            title: '联系电话',
            key: 'mobile',
          }, {
            title: '体检套餐',
            key: 'package_name',
          }, {
            title: '个人支付比例',
            key: 'self_pay',
          }, {
            title: '新增费用支付方',
            key: 'payment',
          },
        ],
        listKey: [
          {
            title: '',
            key: 'num',
          }, {
            title: 'A',
            key: 'realname',
          }, {
            title: 'B',
            key: 'id_card',
          }, {
            title: 'C',
            key: 'sex',
          }, {
            title: 'D',
            key: 'age',
          }, {
            title: 'E',
            key: 'dept_name',
          }, {
            title: 'F',
            key: 'mobile',
          }, {
            title: 'G',
            key: 'package_name',
          }, {
            title: 'H',
            key: 'self_pay',
          }, {
            title: 'I',
            key: 'payment',
          },
        ],
      },
      // showThisRow: null,
    }
  },
  created() {
    console.log(this.showData)
  },
}
</script>
<style lang="less" scoped>
@import '~assets/less/variable.less';
@firstLineBg: #F4F4F4;
.personnel-infor {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .personnel-infor-body {
    height: 100%;
    width: 100%;
    overflow-x: auto;
    // overflow: auto;
    .person-info-public {
      display: flex;
      white-space: nowrap;
      align-items: center;
      &>li {
        text-align: center;
        line-height: 40px;
        height: 40px;
        border-right: 1px solid @gradeAshFive;
      }
      &>li:nth-of-type(1) {
        width: 30px;
      }
      &>li:nth-of-type(2) { // 姓名
        width: 150px;
      }
      &>li:nth-of-type(3) { // 身份证号
        width: 223px;
      }
      &>li:nth-of-type(4) { // 性别
        width: 66px;
      }
      &>li:nth-of-type(5) { // 年龄
        width: 66px;
      }
      &>li:nth-of-type(6) { // 车间/部门
        width: 212px;
      }
      &>li:nth-of-type(7) { // 联系电话
        width: 149px;
      }
      &>li:nth-of-type(8) { // 体检套餐
        width: 357px;
      }
      &>li:nth-last-of-type(2) { // 个人支付比例
        width: 132px;
      }
      &>li:nth-last-of-type(1) { // 新增费用支付方
        border-right: none;
        // width: 9.7%;
        flex: 1;
        // max-width: 150px;
      }
    }
    .person-info-title-key { // 表格头部第一行
      min-width: 1542px;
      height: @num30;
      line-height: @num30;
      background-color: @firstLineBg;
      border: 2px solid @firstLineBg;
      &>li {
        height: @num30;
        line-height: @num30;
        border-top: 1px solid @gradeAshFive;
        border-bottom: 1px solid @gradeAshFive;
      }
    }
    .person-info-title-key-scroll {
      &>li:nth-last-of-type(1) {
        width: 156px!important;
      }
    }
    .person-info-title-name { // 表格头部第二行
      min-width: 1542px;
      background-color: @tableTh;
      border-left: 2px solid @firstLineBg;
      border-right: 2px solid @firstLineBg;
      li {
        border-bottom: 1px solid transparent;
      }
      &>li:nth-of-type(1) {
        background-color: @firstLineBg;
        border-bottom-color: @gradeAshFive;
      }
    }
    .person-info-con {
      height: calc(~'100% - 70px');
      width: 100%;
      min-width: 1542px;
      overflow-y: auto;
      .person-info-con-in {
        height: 100%;
        width: 100%;
        // min-width: 1542px;
        &>li {
          border-left: 2px solid @firstLineBg;
          border-right: 2px solid @firstLineBg;
          li {
            border-top: 2px solid transparent;
            border-bottom: 2px solid transparent;
          }
          li:nth-of-type(1) {
            background-color: @firstLineBg;
            border-bottom: 1px solid @gradeAshFive;
          }
        }
        &>li:nth-of-type(1) {
          li:nth-of-type(1) {
            border-top: 1px solid @gradeAshFive;
          }
        }
        &>li:nth-last-of-type(1) {
          border-bottom: 1px solid @gradeAshFive;
        }
        .active {
          border-right-color: @gradeBlueOne;
          li {
            border-top-color: @gradeBlueOne;
            border-bottom-color: @gradeBlueOne;
          }
          li:nth-of-type(2) {
            border-left:2px solid @gradeBlueOne;
          }
          li:nth-of-type(1) {
            border-top-color: transparent;
          }
        }
        &>li:nth-of-type(2n) {
          background-color: @tableTr;
        }
        &>li:nth-last-of-type(1) {
          // border-bottom: 1px solid @gradeAshFive;
          li {
            // border-bottom: 2px solid transparent;
          }
        }
      }
    }
  }
}
</style>
