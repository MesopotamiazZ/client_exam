<template>
  <div style="position:relative"
       class="sampleManagement">
    <div v-if="!isHealthRecord"  style="height:100%;">
      <div class="sampleManagement-top"
           @click="thsclick">
                <!-- 引用分检头部组件1 -->
               <crossBand ></crossBand>
           </div>
      <div class="sampleManagement-tab">
        <tab :tab="tabdata"
             @tab-change="tabChange"
             @addItem="addItem"
             ref="tab"
             @del=delTab>
        </tab>
      </div>
      <div class="sampleManagement-content"
           v-show="changgeKey===1">
           <!-- 引用分检头部基础信息组件1 -->
        <div class="sampleManagement-content-baseInfo">
                <basicInfo @healthDoc="healthDoc" @setStr="setStr" @openM="openM" @data-change="inputChange"></basicInfo>
        </div>
        <div class="sampleManagement-content-table">
          <titletHasSlot style="border-bottom: 1px solid #cccccc;">
            <span slot='titletHasSlotLeftTitle'>当前采样{{tableData[0].sample_status}}</span>
            <div slot='titletHasSlotRightContent'
                 style="margin-right:-6px;">
              <ZButton :ZBtype='"ghost"'
                       class="fl marginR10"
                       @click="amendFunc()">全部打印</ZButton>
              <ZButton :ZBtype='"ghost"'
                       class="fl marginR10"
                       @click="amendFunc()">全部生成</ZButton>
              <ZButton :ZBtype='"ghost"'
                       class="fl "
                       @click="amendFunc()">全部作废</ZButton>
            </div>
          </titletHasSlot>
          <div class="sampleManagement-content-table-content">
                      <Rtable
                    ref="zBaseInfoTable"
                    :columns="columns"
                    :data="containers"
                   >
                    </Rtable>
          </div>
        </div>
      </div>
      <!-- v-show 控制显示隐藏 v-if 控制 数据是否清空 -->
      <div class="sampleManagement-content"
           v-show="changgeKey===2"
           v-if="tabdata.some(x =>{return x.key === 2})">
        <div class="sampleManagement-content-baseInfo"> 
                          <basicInfo @healthDoc="healthDoc"  @setStr="setStr" @openM="openM"></basicInfo>
</div>
        <titletHasSlot style="border-bottom: 1px solid #cccccc;">
          <span slot='titletHasSlotLeftTitle'>当前采样</span>
          <div slot='titletHasSlotRightContent'
               style="margin-right:-6px;">
            <ZButton :ZBtype='"ghost"'
                     class="fl marginR10"
                     @click="amendFunc()">全部打印</ZButton>
            <ZButton :ZBtype='"ghost"'
                     class="fl marginR10"
                     @click="amendFunc()">全部生成</ZButton>
            <ZButton :ZBtype='"ghost"'
                     class="fl "
                     @click="amendFunc()">全部作废</ZButton>
          </div>
        </titletHasSlot>
        <div class="sampleManagement-content-table-content">
                      <q-table
                    ref="zBaseInfoTable2"
                    :showOperateColumn="false"
                    :ifEdit="true"
                    :columns="columns"
                    :data="tableData"
                     :fixedRightWidth ="126"
                    :height="500"
                    :selectMode="false"
                    :ifShowPagination="false"
                   >
                    </q-table>
        </div>
      </div>
      <div class="sampleManagement-content"
           v-show="changgeKey===3"
           v-if="tabdata.some(x =>{return x.key === 3})">
        <div class="sampleManagement-content-baseInfo"> 
        <basicInfo @healthDoc="healthDoc"  @setStr="setStr" @openM="openM"></basicInfo> </div>
        <titletHasSlot style="border-bottom: 1px solid #cccccc;">
          <span slot='titletHasSlotLeftTitle'>当前采样</span>
          <div slot='titletHasSlotRightContent'
               style="margin-right:-6px;">
            <ZButton :ZBtype='"ghost"'
                     class="fl marginR10"
                     @click="amendFunc()">全部打印</ZButton>
            <ZButton :ZBtype='"ghost"'
                     class="fl marginR10"
                     @click="amendFunc()">全部生成</ZButton>
            <ZButton :ZBtype='"ghost"'
                     class="fl "
                     @click="unamendFunc()">全部作废</ZButton>
          </div>
        </titletHasSlot>
        <div class="sampleManagement-content-table-content">
                      <q-table
                    ref="zBaseInfoTable3"
                    :showOperateColumn="false"
                    :ifEdit="true"
                    :columns="columns"
                    :data="tableData"
                     :fixedRightWidth ="126"
                    :height="500"
                    :selectMode="false"
                    :ifShowPagination="false"
                     >
                    </q-table>
        </div>
      </div>
      <div class="sampleManagement-footer" style="padding:20px 0;"> 
                   <ZButton :ZBtype='"ghost"'
                     class="fr"
                     @click="amendFunc()">清 空</ZButton>
                   <ZButtonHasBg :ZBtype='"ghost"' style="margin-right:10px;"
                     class="fr "
                     @click="amendFunc()">保 存</ZButtonHasBg>

                    <div style="clear:both;"></div>
    </div>
        </div>

    <sampleManagementModal :Model="isShow"
                           @addAbolish="unamendFunc"></sampleManagementModal>

  </div>
</template>
<script>
/**
 * 采样
 * @author 黄伟
 * @date 2017/11/24
 */
import Tab from './tabs/index'
import titletHasSlot from '@/components/titleHasSlot'
import ZButton from '@/components/button/ZButton'
import sampleManagementModal from './modal/sampleManagementModal'
import crossBand from '@/components/crossBand'
import basicInfo from './components/basicInformation'
import { mapMutations } from 'vuex'
import * as types from '@/store/types'
import {copy, getDotData} from '@/utils/helper'
import Rtable from './table'
export default {
  name: 'sampleManagementC',
  data() {
    return {
      isHealthRecord: false,
      //
      tabdata: [{ title: '采样台1', key: 1 }],
      key: 1,
      changgeKey: 1,
      isShow: false,
      test: 0, // 测试数据
      // 边个列
      showData: false,
      tableData: [{
        sample_num: '',
        sample_container: '',
        group_item: '',
        sample_type: '',
        sample_status: '',
        give_up: null,
        generate_again: null,
        cancel_sample: null,
        sample_print: null,
      }],
      print: 'print',
      print_disable: 'print_disable',
      generate: 'generate',
      generate_disable: 'generate_disable',
      cancel: 'cancel',
      cancel_disable: 'cancel_disable',
      containers: [],
    }
  },
  // deactivated () {
  //   this.handleDistory = false
  //   this.handleToDelect = false
  // },
  watch: {
    tabdata(val) {
      if (val.length > 2) {
        this.$refs.tab.unshow()
      }
      if (val.length < 3) {
        this.$refs.tab.show()
      }
      if (val[1].title !== '采样台2' && val.length === 2) {
        val[1].title = '采样台2'
      }
    },
    key(val, oldVal) {
      if (val !== oldVal) {
        this.changgeKey = val
      }
    },
    showData(val) {
      if (val) {
        this.tableData = [
          {
            sample_num: 17090800002,
            sample_container: '红管',
            group_item: '血清天门冬氨基酸氨基转移酶',
            sample_type: '生化',
            sample_status: '未采',
            give_up: 1,
            generate_again: 1,
            cancel_sample: 1,
            sample_print: 0,
          },
          {
            sample_num: 17090800018,
            sample_container: '绿管',
            group_item: '血清天门冬氨基酸氨基转移酶',
            sample_type: '生化',
            sample_status: '未采',
            give_up: 0,
            generate_again: 1,
            cancel_sample: 0,
            sample_print: 1,
          },
          {
            sample_num: 17090800022,
            sample_container: '黑管',
            group_item: '血清天门冬氨基酸氨基转移酶',
            sample_type: '生化',
            sample_status: '未采',
            give_up: 1,
            generate_again: 0,
            cancel_sample: 1,
            sample_print: 0,
          },
        ]
      }
    },
  },
  computed: {
    columns() {
      let that = this
      return [
        {
          title: '序号',
          key: 'id',
          merge: true,
          render(h, params) {
            let a = params.index
            return h('div', {
            }, a + 1)
          },
        },
        {
          title: '采样号',
          key: 'sample_sn',
          merge: true,
        },
        {
          title: '标本容器',
          key: 'container_name',
          merge: true,
        },
        {
          title: '组合项目',
          key: 'samples.pe_group_item_name',
          grow: true,
        },
        {
          title: '采样类型',
          key: 'samples',
          render(h, params) {
            let a = ''
            for (let key of params.row.samples) {
              a += key.pe_group_item_name
            }
            return h('div', {
            }, a)
          },
        },
        {
          title: '状态',
          key: 'status',
          render(h, params) {
            let a = ''
            if (params.row.status === 0) { a = '未采' }
            if (params.row.status === 1) { a = '已采' }
            if (params.row.status === 2) { a = '弃检' }
            return h('div', {
            }, a)
          },
        },
        {
          title: '弃检',
          key: 'give_up',
          render (h, params) {
            return h('div', {
              style: {
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'space-around',
              },
              on: {
                click() {
                  console.log('ffffff')
                  that.isShow = true
                },
              },
            }, [
              h('Checkbox', {
                props: {
                  value: !!params.index,
                },
              }, '原因'),
            ])
          },
        },
        {
          title: '打印采样号',
          key: 'sample_print',
          render (h, params) {
            return h('div', {
              style: {
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'space-around',
              },
            }, [
              h('i', {
                style: {
                  display: 'inline-block',
                  width: '18px',
                  height: '18px',
                  background: `url(/static/icons/public/${params.row.sample_print ? that.print : that.print_disable}.svg)`,
                },
              }),
            ])
          },
        },
        {
          title: '重新生成采样号',
          key: 'generate_again',
          render (h, params) {
            return h('div', {
              style: {
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'space-around',
              },
            }, [
              h('i', {
                style: {
                  display: 'inline-block',
                  width: '17px',
                  height: '18px',
                  background: `url(/static/icons/public/${params.row.generate_again ? that.generate : that.generate_disable}.svg)`,
                },
              }),
            ])
          },
        },
        {
          title: '作废采样号',
          key: 'cancel_sample',
          render (h, params) {
            return h('div', {
              style: {
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'space-around',
              },
            }, [
              h('i', {
                style: {
                  display: 'inline-block',
                  width: '18px',
                  height: '18px',
                  background: `url(/static/icons/public/${params.row.cancel_sample ? that.cancel : that.cancel_disable}.svg) no-repeat`,
                },
              }),
            ])
          },
        },
      ]
    },
  },
  methods: {
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    goBack() {
      console.log('111')
    },
    thsclick() {
      this.$emit('changeComponent', 'healthRecord', 10)
    },
    //
    // 增加标签
    addItem() {
      if (this.tabdata.length < 3) {
        let a
        if (this.tabdata.length === 2 && this.tabdata[1].key !== 3) {
          a = { title: '采样台' + (this.tabdata.length + 1), key: 3 }
          this.tabdata.push(a)
        } else {
          a = { title: '采样台' + (this.tabdata.length + 1), key: 2 }
          this.tabdata.push(a)
        }
      }
    },
    inputChange(val) {
      let a = copy(val)
      this.containers = getDotData(a, 'containers')
/*       for (let key of data) {
        if (key.samples.length > 0) {
          for (let i of key.samples) {
            //
            console.log(i)
            let a = copy(key)
            a.newsample = i
            this.containers.push(a)
          }
        } else {
          let a = copy(key)
          a.newsample = {}
          this.containers.push(a)
        }
      } */
      console.log(this.containers, 'this.containers')
    },
    // 删除标签
    delTab(index) {
      this.tabdata.splice(index, 1)
    },
    // 切换标签页
    tabChange(a) {
      this.key = a
    },
    amendFunc() {
      // this.isShow = true
    },
    unamendFunc() {
      this.isShow = false
    },
    healthDoc() {
      console.log('111')
      this.$router.push({ name: 'healthRecord' })
      let temp = {}
      temp.name = 'healthRecord'
      temp.title = 'healthRecord'
      this.openPage(temp)
      this.setCurPage(temp.name)
    },
    setStr(val) {
      console.log('传递出来的数据：' + val)
      if (this.showData) {
        if (val === '17090800002' && this.tableData[0].sample_status) {
          this.tableData[0].sample_status = '已采'
          console.log(this.tableData[0].sample_status, '2222')
        }
        if (val === '17090800018' && this.tableData[1].sample_status) {
          this.tableData[1].sample_status = '已采'
          console.log(this.tableData[1].sample_status, '2222')
        }
        if (val === '17090800022' && this.tableData[2].sample_status) {
          this.tableData[2].sample_status = '已采'
          console.log(this.tableData[2].sample_status, '2222')
        }
      }
    },
    openM(a) {
      console.log(a, '出现下面数据')
      this.showData = true
    },
  },
  components: {
    Tab,
    titletHasSlot,
    ZButton,
    sampleManagementModal,
    crossBand,
    basicInfo,
    Rtable,
    //
  },
}
</script>
<style  lang="less" >
@import (reference) '~assets/less/variable.less';
// @import "~assets/less/public.less";
.sampleManagement {
      height:100%;
    .self-tab .self-tab-ul {
     border:none;
    }
    .self-tab .self-tab-ul {
     border:none;
    }
  padding: 10px;
  .sampleManagement-top {
    width: 100%;
    height: 30px;
  }
  .sampleManagement-tab {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .sampleManagement-content {
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    box-shadow: 0 1px 15px 0 rgba(206, 213, 242, 0.8);
    border-radius: 8px;
    height: calc(~'100% - 160px');
    .sampleManagement-content-baseInfo {
      width: 100%;
      height: 220px;
    }
    .sampleManagement-content-table{
    height: calc(~'100% - 140px');
    }
    .sampleManagement-content-table-content{
          height: calc(~'100% - 70px');
    }
  }
}
</style>
