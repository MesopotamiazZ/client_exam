<template>
  <div style="position: relative;"
       class="healthLibrarianship">
    <div class="healthLibrarianship-content">
      <titletHasSlot style="border-bottom: 1px solid #cccccc;">
        <span slot='titletHasSlotLeftTitle'>健康档案管理</span>
        <div slot='titletHasSlotRightContent'
             style="margin-right:-6px;">
          <searchInput icon="android-search"
                       class="fl"
                       placeholder="病史名称"
                       style="width: 220px"
                       ref="searchInput">
          </searchInput>
          <ZButton :ZBtype='"ghost"'
                   class="fl marginR10"
                   @click="amendFunc()"
                   v-if="isTrue">导 出</ZButton>
          <ZButton :ZBtype='"ghost"'
                   class="fl"
                   @click="choose()"
                   v-if="!isTrue">选 择</ZButton>
          <ZButtonHasBg :ZBtype='"ghost"'
                        class="fl"
                        @click="chooseCansel()"
                        v-if="isTrue">取 消</ZButtonHasBg>
        </div>

      </titletHasSlot>
      <div class="healthLibrarianship-content-table"
           ref="contentTable">
        <q-table ref="healthlibraianship"
        :selectMode="selectMode"
                     :showOperateColumn="false"
                     :columns="columns"
                     :data="detilData"
                     :initReq="false">
            </q-table>
      </div>
    </div>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZTable from '@/components/table/zTable'
import searchInput from '@/components/searchInput'
import QTable from '@/components/qtable'
import { mapState } from 'vuex'

export default {
  name: 'healthLibrarianship',
  props: {},
  data() {
    return {
      //
      showIcon: '/static/icons/public/show.png',
      isTrue: false,
      columns: [
        // {
        //   title: '序号',
        //   key: 'index',
        //   width: 40,
        // },
        {
          title: '个人档案编号',
          key: 'index1',
          width: 140,
        },
        {
          title: '区域档案编号',
          key: 'index3',
          width: 140,
        },
        {
          title: '姓名',
          key: 'index4',
          width: 80,
        },
        {
          title: '证件类型',
          key: 'index5',
          width: 150,
        },
        {
          title: '证件号码',
          key: 'index6',
          width: 140,
        },
        {
          title: '性别',
          key: 'index7',
          width: 70,
        },
        {
          title: '民族',
          key: 'index8',
          width: 80,
        },
        {
          title: '出生日期',
          key: 'index9',
          width: 90,
        },
        {
          title: '年龄',
          key: 'index10',
          width: 50,
        },
        {
          title: '文化程度',
          key: 'index11',
          width: 90,
        },
        {
          title: '单位名称',
          key: 'index13',
          width: 200,
        },
        {
          title: '单位名称',
          key: 'index13',
          width: 200,
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 70,
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
      ],
      detilData: [
        {
          index: '1',
          index1: '132456446',
          index10: '18',
          index3: '54363463',
          index13: '中国移动',
          index4: '柳巷',
          index5: '身份证',
          index6: '510845198008112854',
          index8: '汉族',
          index7: '男',
          index9: '1989-11-11',
        },
        {
          index: '2',
          index1: '132456446',
          index10: '18',
          index3: '54363463',
          index13: '中国移动',
          index4: '柳巷',
          index5: '身份证',
          index6: '510845198008112854',
          index8: '汉族',
          index7: '男',
          index9: '1989-11-11',
        },
        {
          index: '3',
          index1: '132456446',
          index10: '18',
          index3: '54363463',
          index13: '中国移动',
          index4: '柳巷',
          index5: '身份证',
          index6: '510845198008112854',
          index8: '汉族',
          index7: '男',
          index9: '1989-11-11',
        },
      ],
      selectMode: false,
    }
  },
  components: {
    titletHasSlot,
    ZButton,
    ZButtonHasBg,
    ZTable,
    searchInput,
    QTable,
  },
  watch: {
    windowHeight(val) {
      this.tableHeight = this.$refs.enquirecontently.offsetHeight
    },
  },
  methods: {
    //
    ...mapState(['windowHeight']),
    choose() {
      this.selectMode = true
      this.isTrue = true
    },
    chooseCansel() {
      this.selectMode = false
      this.isTrue = false
    },
    amendFunc() {
      //
    },
  },
  mounted() {
    //
  },
}
</script>
<style lang="less" >
.healthLibrarianship {
  height: 100%;
  padding: 10px;
  .healthLibrarianship-content {
    border: 1px solid #cccccc;
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    .healthLibrarianship-content-table {
      height: calc(~'100% - 50px');
    }
  }
  .ivu-table::before {
    width: 0;
    height: 0;
  }
  .ivu-table::after {
    width: 0;
    height: 0;
  }
}
</style>
