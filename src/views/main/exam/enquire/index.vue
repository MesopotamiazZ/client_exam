<template>
<div class="enquire">
     <div class="enquire-top">
         <crossBand></crossBand>
     </div>
     <div class="enquire-table">
          <titletHasSlot style="border-bottom: 1px solid #cccccc;">
            <span slot='titletHasSlotLeftTitle'>采样查询</span>
            <div slot='titletHasSlotRightContent' style="margin-right:-20px;">
                   <ZButton :ZBtype='"ghost"'
                 class="fr"
                 style="margin-right:20px;"
                 @click="goRouter()"
               >选 中</ZButton>
                <searchInput icon="android-search"
                             :searText="'请输入采样号/组合项目/体检号/姓名/单位名称'"
                             :searchWidth="351"
                             @on-enter='searchFunc'
                             @on-Icon='searchFunc'
                             @on-cancel="searchCancel()"
                             ref="searchInput">
                </searchInput>
            </div>
          </titletHasSlot>
          <div ref="enquirecontently" class="enquirecontently">
              <q-table
                  :columns="columns"
                  :data="data"
                  :height="500"
                  :ifEdit="true"
                  :showOperateColumn="false"
                  >
              </q-table>
          </div>
     </div>
</div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
import crossBand from '@/components/crossBand'
import searchInput from '@/components/searchInput'
import { mapState } from 'vuex'
import ZButton from '@/components/button/ZButton'

export default {
  name: 'enquire',
  components: {
    titletHasSlot,
    crossBand,
    searchInput,
    ZButton,
  },
  beforeDestroy: function() {
//
  },
  data () {
    return {
      showIcon: '/static/icons/public/show.png',
      data: [
        {
          sample_status: '已采',
          sample_num: '17090808882',
          sample_container: '紫管(抗凝剂)',
          group_item: '血清天门冬氨酸基转移',
          sample_type: '发光免疫',
          pe_sn: '17090800001',
          name: '许老三',
          sex: '女',
          age: 22,
          company: '成都超有爱信息技术有限公司',
          register_date: '2018-02-05',
          sample_or_giveup: '2018-02-05 12:00',
          sample_or_giveup_doctor: '王思佳',
        },
        {
          sample_status: '未采',
          sample_num: '17090808887',
          sample_container: 'C14采集器',
          group_item: '胃病检查',
          sample_type: '生化',
          pe_sn: '17090800001',
          name: '许老四',
          sex: '男',
          age: 20,
          company: '成都超有爱信息技术有限公司',
          register_date: '2018-02-05',
          sample_or_giveup: '2018-02-05 12:00',
          sample_or_giveup_doctor: '王思佳',
        },
        {
          sample_status: '弃检',
          sample_num: '17090808822',
          sample_container: '紫管(抗凝剂)',
          group_item: '血清天门冬氨酸基转移',
          sample_type: '发光免疫',
          pe_sn: '17090800001',
          name: '许老五',
          sex: '男',
          age: 22,
          company: '成都超有爱信息技术有限公司',
          register_date: '2018-02-05',
          sample_or_giveup: '2018-02-05 12:00',
          sample_or_giveup_doctor: '王思佳',
        },
      ],
      tableHeight: 500,
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '采样状态',
          key: 'sample_status',
          minWidth: 68,
          ellipsis: true,
        },
        {
          title: '采样号',
          key: 'sample_num',
          minWidth: 98,
          ellipsis: true,
        },
        {
          title: '标本容器',
          key: 'sample_container',
          minWidth: 120,
          ellipsis: true,
        },
        {
          title: '组合项目',
          key: 'group_item',
          minWidth: 164,
          ellipsis: true,

        },
        {
          title: '采样类型',
          key: 'sample_type',
          minWidth: 68,
          ellipsis: true,

        },
        {
          title: '体检号',
          key: 'pe_sn',
          minWidth: 98,
          ellipsis: true,
        },
        {
          title: '姓名',
          key: 'name',
          minWidth: 100,
          ellipsis: true,

        },
        {
          title: '性别',
          key: 'sex',
          minWidth: 44,
          ellipsis: true,

        },
        {
          title: '年龄',
          key: 'age',
          minWidth: 44,
          ellipsis: true,

        },
        {
          title: '单位名称',
          key: 'company',
          minWidth: 200,
          ellipsis: true,

        },
        {
          title: '登记日期',
          key: 'register_date',
          minWidth: 88,
          ellipsis: true,

        },
        {
          title: '采样 /弃检时间',
          key: 'sample_or_giveup',
          minWidth: 122,
          ellipsis: true,

        },
        {
          title: '采样 / 弃检医生',
          key: 'sample_or_giveup_doctor',
          minWidth: 108,
          ellipsis: true,

        },
        {
          title: '操作',
          key: 'aaa',
          minWidth: 70,
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  minWidth: '18px',
                  height: '18px',
                  'margin-left': '7px',
                  'margin-top': '5px',
                  background: 'url(' + this.showIcon + ') no-repeat',
                },
                on: {
                  click: event => {
                    console.log('查看', params.row)
                    this.fold = true
                    this.$emit('show', params.row, params.index, params.column)
                  },
                },
              }),
            ])
          },
        },
      ]
    },
  },
  windowHeight(val) {
    this.tableHeight = this.$refs.enquirecontently.offsetHeight
  },
  methods: {
//
    ...mapState(['windowHeight']),
  },
}
</script>

<style lang="less">
@import (reference) '~assets/less/variable.less';
.enquire{
  padding: 10px;
  height: 100%;
  .enquire-top{
    width: 100%;
    height:30px;
  }
  .enquire-table{
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    box-shadow: 0 1px 15px 0 rgba(206,213,242,0.80);
    border-radius: 8px;
    margin-top:20px;
     height: calc(~'100% - 50px');
     .enquirecontently{
        height: calc(~'100% - 44px');
     }
  }
}
</style>