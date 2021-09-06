/*
* 部门列表
* @author 肖康
* @date 2017/12/5
*/
<template>
    <div style="position:relative;height:100%;" class="paddingT10 paddingB10">
      <div class="wrapper contentBg departmentList">
        <titletHasSlot>
          <span slot="titletHasSlotLeftTitle">部门列表</span>
            <div slot="titletHasSlotRightContent">
              <Button type="ghost" class="marginR10" @click="newModalShow">新增部门</Button>
              <Button type="ghost">删除部门</Button>
            </div>
        </titletHasSlot>

        <div class="body">
          <div class="nav">
                        <Tree :data="department" @on-select-change="selectChange" ref="tree"></Tree>
            <!-- <ul>
              <li v-for="(item,index) in department">
                <span>{{item.title}}</span>
                <ul v-if=""></ul>
              </li>
            </ul> -->
          </div>
          
          <div class="f1 content">
            <div class="header">
              <span>体检登记</span>
            </div>
            <div class="center">
            <div class="centerForm">
              <div class="flex">
                <span class="label">部门名称</span>
                <div class="f1">
                  <Input v-model="selected" long></Input>
                </div>
              </div>
              <div class="flex marginT15">
                <span class="label">上级部门</span>
                <div class="f1">
                    <Select v-model="pareatP">
                        <Option v-for="item in department" :value="item.title" :key="item.id">{{ item.title }}</Option>
                    </Select>
                </div>
              </div>
            </div>
            </div>
            <div class="footer">

              <Button type="primary" class="marginR20">保 存</Button>
              <Button type="ghost">取 消</Button>

            </div>
          </div>
        </div>
      </div>
      <newModal ref="addmodel" headerText="新增部门"></newModal>
 
    </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
import newModal from './components/newModal'
// import delModal from './components/delModal'
// 确认删除该部门吗
export default {
  name: 'defineStatistics',
  components: {
    titletHasSlot,
    newModal,
  },
  data() {
    return {
      department: [
        {
          title: '行政部门',
          id: '1',
          children: [
            { title: '院长', parent: '行政部门' },
            { title: '书记办公室', parent: '行政部门' },
            { title: '行政办公室', parent: '行政部门' },
            { title: '纪委办公室', parent: '行政部门' },
            { title: '医务科', parent: '行政部门' },
            { title: '护理部', parent: '行政部门' },
            { title: '财务部', parent: '行政部门' },
            { title: '公会', parent: '行政部门' },
          ],
        },
        {
          title: '临床门诊部部门',
          id: '2',

          children: [
            { title: '门诊部', parent: '临床门诊部部门' },
            { title: '挂号收费室', parent: '临床门诊部部门' },
            { title: '注射输液室', parent: '临床门诊部部门' },
            { title: '急诊科', parent: '临床门诊部部门' },
            { title: '供应室', parent: '临床门诊部部门' },
          ],
        },
        {
          title: '住院部部门',
          id: '3',

          children: [
            { title: '内科', parent: '住院部部门' },
            { title: '外科', parent: '住院部部门' },
            { title: '儿科', parent: '住院部部门' },
            { title: '妇产科', parent: '住院部部门' },
            { title: '五官科', parent: '住院部部门' },
            { title: '中医科', parent: '住院部部门' },
            { title: '传染科', parent: '住院部部门' },
          ],
        },
        {
          title: '药剂科部门',
          id: '4',

          children: [
            { title: '中药房', parent: '药剂科部门' },
            { title: '西药房', parent: '药剂科部门' },
            { title: '药库', parent: '药剂科部门' },
          ],
        },
        {
          title: '后勤部门',
          id: '5',

          children: [
            { title: '医疗器械维修部', parent: '后勤部门' },
            { title: '救护车组', parent: '后勤部门' },
            { title: '洗衣房', parent: '后勤部门' },
            { title: '保卫科', parent: '后勤部门' },
            { title: '门卫', parent: '后勤部门' },
            { title: '营养食堂', parent: '后勤部门' },
            { title: '园艺环卫组', parent: '后勤部门' },
          ],
        },
      ],
      selected: '',
      pareatP: '无',
      showModal: false,
    }
  },
  methods: {
    // selectChange(data) {
    //   if (!data[0].selected) {
    //     data[0].selected = !data[0].selected
    //   }
    //   if (data[0].children) {
    //         // 是否展开
    //     data[0].expand = !data[0].expand
    //   }
    // },
    selectChange(data) {
      console.log('get', data)

      if (data.length === 0) {
        data[0] = {}
        data[0].selected = false
      }
      // if (!data[0].selected) {
      // data[0].selected = !data[0].selected
      // }
      if (data[0].children) {
            // 是否展开
        data[0].expand = !data[0].expand
      }
    },
    onClickFn(arr) {
      console.log('click', arr)
      let a = this.getCheckedNodes()
      console.log(a)
      // this.selected =
    },
    newModalShow() {
      this.$refs.addmodel.openM()
    },
  },
}
</script>
<style <style lang="less" scoped>
.wrapper {
  width: 1034px;
  margin: 0 auto;
  height: 100%;
  background: #ffffff;
}
.departmentList {
  .body {
    display: flex;
    height: calc(~"100% - 50px");
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #d9d9d9;

    .nav {
      width: 182px;
      height: 100%;
            background: #F7FAFF;

      padding-left: 20px;
      border-right: 1px solid #d9d9d9;
      .ivu-tree-title-selected,
      .ivu-tree-title-selected:hover {
        color: #008af1 !important;
      }
    }
    .content {
      flex: 1;
      position: relative;
      // flex-direction: column;
      // align-items: center;
      // justify-content: center;
      .header {
        height: 48px;
        display: flex;
        align-items: flex-start;
      border-bottom: 1px solid #d9d9d9;
        
        span {
          margin-left: 20px;
          font-size: 14px;
          line-height: 48px;
        }
      }
      .centerForm {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 272px;
        height: 130px;
        .label {
          margin-right: 10px;
        }
        .f1 {
          flex: 1;
        }
      }

      .footer {
        position: absolute;
        bottom: 0;
        padding-bottom: 20px;
        padding-right: 20px;
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }
    }
  }
}
</style>



<style lang="less">
.departmentList{
        transition: all 0s;
  .nav{
    .ivu-tree{
      .ivu-tree-children{
        transition: all 0s;
        li{
        transition: all 0s;
          
          .ivu-tree-title {
            background-color:#F7FAFF !important;
            transition: all .002s ease-in-out;
            
          }
          .ivu-tree-title:hover {
            background-color:#F7FAFF !important;
            
          }
          .ivu-tree-title-selected:hover{
            background-color:#F7FAFF !important;

          }
          .ivu-tree-title-selected{
            background-color:#F7FAFF !important;
            // color:#008AF1;
          }

          .ivu-tree-children{
                    transition: all 0s;

            li{
        transition: all 0s;
              
              .ivu-tree-title {
            background-color:#F7FAFF !important;
            transition: all .002s ease-in-out;
          }
          .ivu-tree-title:hover {
            background-color:#F7FAFF !important;
            
          }
          .ivu-tree-title-selected:hover{
            background-color:#F7FAFF !important;

          }
          .ivu-tree-title-selected{
            background-color:#F7FAFF !important;
            color:#008AF1;
          }
            }
          }
        }
      }
    }
  }
}
.departmentList{
  .nav{
    .ivu-tree{
      .ivu-tree-title-selected, .ivu-tree-title-selected:hover{
        background-color:#F7FAFF !important;
      }

      &>.ivu-tree-children{
        transition: all 0s;
        
        &>li{
        line-height:40px;          
        }
        .ivu-tree-title{
            color:#111111;
          font-size:14px;
          font-weight:900;  
        }

         &>.ivu-tree-children{
        .ivu-tree-title-selected{
          color:#008AF1 !important;
        }
         }

        &>.ivu-tree-title-selected{
        background-color:#F7FAFF;
        color:#008AF1;

      } 
      &>.ivu-tree-title-selected:hover{
        background-color:#F7FAFF;
      }

        .ivu-tree-children{
        .ivu-tree-title{
          font-size:12px;
          color:#4a4a4a;
          font-weight:100;
        }          
        }
      }
      
    }
  }
}
</style>
