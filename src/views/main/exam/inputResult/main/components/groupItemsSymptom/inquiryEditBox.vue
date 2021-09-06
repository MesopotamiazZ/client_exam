<template>
  <div class="inquiry-edit-box" style="box-shadow: 0 2px 10px #ddd;">
    <div class="box-body">
      <div class="item">
        <div class="title">程度</div>
        <div class="content">
          <!-- <Row>
            <Col span="6"><input class="level active" type="button" value="+-" /></Col>
            <Col span="6"><input class="level" type="button" value="+" /></Col>
            <Col span="6"><input class="level" type="button" value="++" /></Col>
            <Col span="6"><input class="level" type="button" value="+++" /></Col>
          </Row> -->
          <input @click="chooseLevel" class="symptom-level" type="button" value="+-" />
          <input @click="chooseLevel" class="symptom-level" type="button" value="+" />
          <input @click="chooseLevel" class="symptom-level" type="button" value="++" />
          <input @click="chooseLevel" class="symptom-level" type="button" value="+++" />
        </div>
      </div>
      <div class="item">
        <div class="title">出现日期</div>
        <div class="content">
          <DatePicker :value="inquiry.occurDate" format="yyyy年MM月dd日" type="date" placeholder="Select date"></DatePicker>
        </div>
      </div>
      <div class="item">
        <div class="title">备注</div>
        <div class="content">
          <!-- <Input v-model="remarks" type="textarea" :rows="4" placeholder="Enter something..."></Input> -->
          <textarea :rows="4" :value="inquiry.remarks" class="remarks"></textarea>
        </div>
      </div>
      <div class="footer">
        <Button class="btn" type="primary" @click="confirmInquiry">确定</Button>
        <Button class="btn" type="ghost" @click="cancelInquiry">取消</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {

  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';

  // 问诊编辑弹框
  .inquiry-edit-box {
    height: 273px;
    width:230px;
    position: absolute;
    z-index: 999;
    left: 0px;
    top: 0px;
    background: #fff;
    display: none;
    border-radius: 4px;
    padding: 20px;
    .box-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &.active {
      display: block;
    }

    .item {
      .title{
        margin-bottom: 2px;
        color: @gradeAshTwo;
      }
      .content {
        display: flex;
        justify-content: space-between;
        .symptom-level {
          color: @gradeBlueTwo;
          width:40px;
          height: 25px;
          background: #fff;
          font-size: 16px;
          font-weight: bold;
          border: 1px solid @gradeBlueTwo;
          &.active {
            color: #fff;
            background: @gradeBlueTwo;
          }
          &:last-child {
            margin-right: 0;
          }
        }

        // 备注
        .remarks {
          width: 100%;
          height: 60px;
          resize: none;
          border-radius: 4px;
          border-color: @gradeAshFive;
        }
      }
    }

    // 按钮
    .footer {
      display: flex;
      justify-content: space-around;
    }
  }
</style>

