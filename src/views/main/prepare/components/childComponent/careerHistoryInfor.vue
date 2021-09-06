/** 
* @author 覃凤
* @date 2018/3/9
* @content 表格导入备单-表格信息-职业史信息
* showData：页面显示的数据，showIndex：页面显示的选中行
*/
<template>
  <div class="career-history-infor">
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
  name: 'career-history-infor',
  props: {
    showData: {
      type: Array,
      default: () => {
        return []
      },
    },
    showThisRow: {
      type: Number,
    },
  },
  watch: {
    showThisRow(val) {
      console.log(val)
    },
  },
  data () {
    return {
      msg: '职业史信息',
      person_info: { // 职业史
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
            title: '工种',
            key: 'occup_type_name',
          }, {
            title: '总工龄（年）',
            key: 'total_work_age',
          }, {
            title: '接害工龄（年）',
            key: 'injury_age',
          }, {
            title: '危害因素名称1',
            key: 'factor1',
          }, {
            title: '职业健康检查种类',
            key: 'factor_type1',
          }, {
            title: '危害因素名称2',
            key: 'factor2',
          }, {
            title: '职业健康检查种类',
            key: 'factor_type2',
          }, {
            title: '危害因素名称3',
            key: 'factor3',
          }, {
            title: '职业健康检查种类',
            key: 'factor_type3',
          },
        ],
        listKey: [
          {
            title: '',
            key: 'num',
          }, {
            title: '',
            key: 'realname',
          }, {
            title: '',
            key: 'id_card',
          }, {
            title: 'J',
            key: 'sex',
          }, {
            title: 'K',
            key: 'age',
          }, {
            title: 'L',
            key: 'dept_name',
          }, {
            title: 'M',
            key: 'mobile',
          }, {
            title: 'N',
            key: 'package_name',
          }, {
            title: 'O',
            key: 'self_pay',
          }, {
            title: 'P',
            key: 'payment',
          }, {
            title: 'Q',
            key: 'payment',
          }, {
            title: 'R',
            key: 'payment',
          },
        ],
      },
    }
  },
}
</script>
<style lang="less" scoped>
@import '~assets/less/variable.less';
@firstLineBg: #F4F4F4;
.career-history-infor {
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
        width: 100px;
      }
      &>li:nth-of-type(3) { // 身份证号
        width: 148px;
      }
      &>li:nth-of-type(4) { // 工种
        width: 116px;
      }
      &>li:nth-of-type(5) { // 总工龄
        width: 100px;
      }
      &>li:nth-of-type(6) { // 接害工龄
        width: 100px;
      }
      &>li:nth-of-type(7) { // 危害因素名称1
        width: 200px;
      }
      &>li:nth-of-type(8) { // 职业健康检查种类
      width: 116px;
      }
      &>li:nth-of-type(9) { // 危害因素名称2
        width: 200px;
      }
      &>li:nth-of-type(10) { // 职业健康检查种类
        width: 116px;
      }
      &>li:nth-last-of-type(2) { // 危害因素名称3
        width: 200px;
      }
      &>li:nth-last-of-type(1) { // 职业健康检查种类
        border-right: none;
        flex: 1;
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
        }
        &>li:nth-of-type(2n) {
          background-color: @tableTr;
        }
        &>li:nth-last-of-type(1) {
          // border-bottom: 1px solid @gradeAshFive;
          li {
            border-bottom: 2px solid transparent;
          }
        }
      }
    }
  }
}
</style>
