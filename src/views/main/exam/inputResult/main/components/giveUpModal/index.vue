<template>
  <div class="give-up-checkup">
    <Modal 
      v-model="giveUpModal" 
      width="490" 
      height="400"
      :transfer='false' 
      :closable="false" 
      :mask-closable="false" 
      :transition-names="['']">
      <div slot="header">
        <!-- <alert-header headerText='提示'></alert-header> -->
        <TitleHasSlot>
          <span slot="titletHasSlotLeftTitle">提示</span>
        </TitleHasSlot>
      </div>
      <div class="marginT20 marginB20 marginR15 marginL20 give-up-modal-body">
        <!-- <span class="inquiry">确定弃检此组合项目吗?</span> -->
        <!-- <Input class="give-up-reason" v-model="reason" type="textarea" placeholder="请输入弃检原因"></Input> -->
        <Table border stripe :columns = "columns" :data="data" height="160" @on-row-click="clickGiveReasonLine"></Table>
        <!-- <Input v-model="reason" type="textarea" :rows="4" placeholder="Enter something..."></Input> -->
        <textarea v-model="reason" class="give-up-reason"></textarea>
      </div>
      <div slot="footer" style="height:50px;" class="footer">
        <z-button v-if="Boolean(isAbandon)" ZBtype='primary' class="button-in" type="ghost" @click="modifyConfirm">确 认</z-button>
        <z-button v-if="Boolean(!isAbandon)" ZBtype='primary' class="button-in" type="ghost" @click="giveUpConfirm">确认弃检</z-button>
        <z-button v-if="Boolean(isAbandon)" ZBtype='primary' class="button-in" type="ghost" @click="giveUpCancel">取消弃检</z-button>
        <z-button ZBtype='ghost' class="button-in" type="ghost" @click="giveUpModalCancel">取 消</z-button>
      </div>
    </Modal>
  </div>
</template>
<script>
import TitleHasSlot from '@/components/titleHasSlot.vue'
export default {
  components: {
    TitleHasSlot,
  },
  props: {
    giveUpModal: {
      style: Boolean,
      default: false,
    },
    reasonIn: {
      type: String,
      default: '',
    },
    isAbandon: {
      type: [Boolean, Number],
      default: false,
    },
  },
  data() {
    return {
      reason: this.reasonIn,
      columns: [
        {
          type: 'index',
          width: 50,
          renderHeader(h, params) {
            return h('span', '序号')
          },
        },
        {
          title: '备选弃检原因',
          key: 'reason',
        },
      ],
      data: [
        {
          reason: '自愿放弃',
        },
        {
          reason: '怀孕弃检不宜做此检查',
        },
        {
          reason: '自愿放弃',
        },
        {
          reason: '自愿放弃',
        },
      ],
    }
  },
  methods: {
    giveUpModalCancel() { // 取消 - 也就是关闭模态框, 当前什么样就什么样, 不做操作
      // this.reason = ''
      this.$emit('give-up-modal-cancel')
    },
    modifyConfirm() { // 确认 - 确认修改
      this.$emit('modify-confirm', this.reason)
    },
    giveUpConfirm () { // 确认弃检
      this.$emit('give-up-confirm', this.reason)
    },
    giveUpCancel () { // 取消弃检
      this.reason = ''
      this.$emit('give-up-cancel', this.reason)
    },
    // 单击某弃检原因行
    clickGiveReasonLine (row, index) {
      this.reason = row.reason
    },
  },
  watch: {
    reasonIn() {
      this.reason = this.reasonIn
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
  .give-up-checkup{
    .give-up-reason>textarea{
      display: block;
      width: 305px;
      height: 90px;
      overflow: auto;
      margin-top: 22px;
      background: #FFFFFF;
      border-radius: 4px;
      resize: none;
      padding: 7px 10px;
    }
    .footer{
      margin-right: 20px;
    }
    .inquiry{
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 0;
    }

    // 
    .give-up-modal-body {
      height: 260px;
      border-radius: 8px;
      border: 1px solid @gradeAshFive;
      overflow: hidden;
      .give-up-reason {
        box-sizing: border-box;
        margin: 1px;
        height: 96px;
        width:451px;
        padding: 10px;
        line-height: 20px;
        color: @gradeAshTwo;
        resize: none;
        border: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        &:focus{
          outline: none;
          box-shadow: 0 0 1px blue;
        }
      }
    }
  }
</style>

