<template>
<div class="radiologicalReport">
   <div class="radiologicalReport-content">
       <div class="radiologicalReport-Body">
         <titletHasSlot style="border-bottom: 1px solid #cccccc;">
            <span slot='titletHasSlotLeftTitle'>上报申请人员列表</span>
            <div slot='titletHasSlotRightContent'>
               <searchInput class="fl " icon="android-search"
                             :searText="'请输入'"
                             @on-enter='searchFunc'
                             @on-Icon='searchFunc'
                             @on-cancel="searchCancel()"
                             ref="searchInput">
                </searchInput> 
              <ZButton :ZBtype='"ghost"'
                       class="fl marginR10"
                       @click="amendFunc()">导 入</ZButton>
              <ZButton :ZBtype='"ghost"'
                       class="fl marginR10"
                       @click="amendFunc()">导 出</ZButton>
              <ZButton :ZBtype='"ghost"'
                       class="fl "
                       @click="amendFunc()">选 择</ZButton>
            </div>
          </titletHasSlot>
          <div ref="radiologicalReportcontently" class="radiologicalReportcontently">
                 <q-table
            ref="zBaseInfoTable"
            :isSelectMode="selectMode"
            :params="params"
            :ifEdit="true"
            :columns="columns"
            :selectMode="selectMode"
            :data="getList"
            :height="tableHeight"
             @delete-row="delOne"
            @delete="delOne"
            @edit-row="editOne"
            @edit="editOne"
            @on-row-dbClick="editOne"
            @all-selection="selectChange"
            :initReq="false">
          </q-table>
          </div>
       </div>
        
   </div>
   <editModal ref="editModal"></editModal>
</div>
</template>
<script>
import ZButton from '@/components/button/ZButton'
import titletHasSlot from '@/components/titleHasSlot'
import searchInput from '@/components/searchInput'
import { mapState } from 'vuex'
import editModal from './motal/editModal'

export default {
  name: 'radiologicalReport',
  data() {
    return {
      getList: [
        {
          register_date: '2017-8-9',
          pe_sn: '170260889',
          apply_status: '已申请',
          name: '王小花',
          sex: '女',
          begin_radio_date: '2017-4-1',
          issue_certification_date: '2017-7-1',
          occupation_radio_type: '焊工',
          train: '焊工培训',
          train_date: '2017-5-1',
          train_result: '合格',
        },
        {
          register_date: '2017-8-9',
          pe_sn: '170260889',
          apply_status: '已申请',
          name: '赵大胖',
          sex: '男',
          begin_radio_date: '2017-4-1',
          issue_certification_date: '2017-7-1',
          occupation_radio_type: '焊工',
          train: '焊工培训',
          train_date: '2017-5-1',
          train_result: '合格',
        },
        {
          register_date: '2017-8-9',
          pe_sn: '170260889',
          apply_status: '已申请',
          name: '李池',
          sex: '男',
          begin_radio_date: '2017-4-1',
          issue_certification_date: '2017-7-1',
          occupation_radio_type: '焊工',
          train: '焊工培训',
          train_date: '2017-5-1',
          train_result: '合格',
        },
        {
          register_date: '2017-8-9',
          pe_sn: '170260889',
          apply_status: '已申请',
          name: '王小剑',
          sex: '男',
          begin_radio_date: '2017-4-1',
          issue_certification_date: '2017-7-1',
          occupation_radio_type: '焊工',
          train: '焊工培训',
          train_date: '2017-5-1',
          train_result: '合格',
        },
      ],
      params: {
        search: '',
      },
      selectMode: false,
      tableHeight: 500,
    }
  },
  components: {
    ZButton,
    titletHasSlot,
    searchInput,
    editModal,
  },
  computed: {
    columns() {
      return [
        {
          title: '登记日期',
          key: 'register_date',
          minWidth: 100,
        },
        {
          title: '体检号',
          key: 'pe_sn',
          minWidth: 90,
        },
        {
          title: '申请状态',
          key: 'apply_status',
          minWidth: 80,
        },
        {
          title: '姓名',
          key: 'name',
          minWidth: 80,
        },
        {
          title: '性别',
          key: 'sex',
          minWidth: 42,
        },
        {
          title: '开始放射日期',
          key: 'begin_radio_date',
          minWidth: 143,
        },
        {
          title: '发证日期',
          key: 'issue_certification_date',
          minWidth: 100,
        },
        {
          title: '职业照射种类',
          key: 'occupation_radio_type',
          minWidth: 100,
        },
        {
          title: '培训',
          key: 'train',
          minWidth: 205,
        },
        {
          title: '职业照射种类',
          key: 'occupation_radio_type',
          minWidth: 58,
        },
        {
          title: '培训日期',
          key: 'train_date',
          minWidth: 100,
        },
        {
          title: '培训结果',
          key: 'train_result',
          minWidth: 70,
        },
        {
          title: '申请类型',
          key: 'apply_type',
          minWidth: 68,
        },
        {
          title: '变更内容',
          key: 'change_content',
          minWidth: 160,
        },
        {
          title: '剂量',
          key: 'dose',
          minWidth: 68,
        },
        {
          title: '电话',
          key: 'tel',
          minWidth: 100,
        },
        {
          title: '部门/车间',
          key: 'dept',
          minWidth: 100,
        },
        {
          title: '单位名称',
          key: 'company',
          minWidth: 200,
        },
        {
          title: '不符合原因',
          key: 'not_match_reason',
          minWidth: 130,
        },
        {
          title: '备注',
          key: 'remarks',
          minWidth: 50,
          render(h, params) {
            return h('remark-in-table')
          },
        },
        {
          title: '已打印',
          key: '70',
        },
        {
          title: '最后修改人',
          key: 'last_modify_name',
          minWidth: 80,
        },
        {
          title: '最后修改时间',
          key: 'last_modify_date',
          minWidth: 122,
        },
      ]
    },
  },
  watch: {
    windowHeight(val) {
      console.log(val, 'tt')
      this.tableHeight = this.$refs.radiologicalReportcontently.offsetHeight
    },
  },
  methods: {
    ...mapState(['windowHeight']),
    searchFunc() {
      console.log('搜索')
    },
    delOne() {
      console.log('删除')
    },
    editOne() {
      console.log('编辑', this.$refs.editModal)
      this.$refs.editModal.openM()
    },
    selectChange() {
      console.log('全选')
    },
  },
}
</script>
<style  lang="less" >
@import (reference) '~assets/less/variable.less';

.radiologicalReport{
     position: relative;height:100%;background:#FFFFFF;
     height: 100%;

     .radiologicalReport-content{
         padding: 10px;
         height: 100%;
         .radiologicalReport-Body{
         height: 100%;
         background: #FFFFFF;
         border: 1px solid #D9D9D9;
         box-shadow: 0 1px 6px 0 rgba(206,213,242,0.80); 
         border-radius: 8px;
         }
        .radiologicalReportcontently {
          height: calc(~'100% - 50px');
        }
}
     }

</style>