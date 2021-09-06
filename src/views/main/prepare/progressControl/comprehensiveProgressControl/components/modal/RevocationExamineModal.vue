/**
* author      : yhy
* cteate      : 2018/02/27
* description : 撤销完检
*/
<template>
  <Modal v-model="RevocationExamineModal"
         class="revocation-examine-modal"
         :width='762'
         :transfer='false'
         :mask-closable="false"
         :transition-names="['']"
         :closable="false">
    <div slot="header">
      <alert-header :showInput='false'
                    :headerText="'撤销完检'">
      </alert-header>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="left-top">
          <div class="img-header">
            <img src=""
                 alt=""
                 class="header">
          </div>
          <div class="information">
            <div>
              <div class="leftName">体检号</div>
              <Input v-model="unitName"
                     class="rightInput"
                     style="width: 175px"
                     disabled/>
              <div class="rightName">姓名</div>
              <Input v-model="name"
                     class="rightInput"
                     style="width: 114px"
                     disabled/>
            </div>
            <div>
              <div class="leftName">身份证号</div>
              <Input v-model="card"
                     class="rightInput"
                     style="width: 175px"
                     disabled/>
              <div class="rightName">性别</div>
              <Input v-model="sex"
                     class="rightInput"
                     style="width: 114px"
                     disabled/>
            </div>
            <div>
              <div class="leftName">工作单位</div>
              <Input v-model="unit"
                     class="rightInput"
                     style="width: 348px"
                     disabled/>
            </div>
          </div>
        </div>
        <div class="left-bottom">
          <div class="wrapper contentBg">
            <div class="header">
              <div class="title">未检项目</div>
            </div>
            <div class="table">
              <Table :columns="columns1"
                     :data="data1"
                     :height='158'></Table>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right ">
        <div class="right-wrapper contentBg">
          <div class="header">
            <div class="title">已检项目</div>
          </div>
          <div class="table">
            <Table :columns="columns2"
                   :data="data1"
                   :height='297'></Table>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <div class="bottom">
        <div class="bottom-right">
          <Button type="primary"
                  class="button"
                  @click="printSure">确认撤销</Button>
          <Button type="ghost"
                  class="button"
                  @click="cancel">取 消</Button>
        </div>
        <div class="time">
          <span>完检人：王林 </span>
          <span>检查时间：2018-01-18 16:33</span>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'RevocationExamineModal',
  data() {
    return {
      choose: null,
      unitName: 'BA201709',
      name: '王梅额',
      card: '510182495425841284',
      sex: '女',
      unit: '四川小莱科技',
      columns1: [
        {
          title: '项目名称',
          key: 'name',
        },
        {
          title: '操作',
          key: 'age',
          render: (h, params) => {
            return h(
              'CheckboxGroup',
              {
                on: {
                  'on-change': function(value) {
                    console.log(value)
                  },
                },
              },
              [
                h('Checkbox', {
                  props: {
                    label: '弃检',
                  },
                }),
                h('Checkbox', {
                  props: {
                    label: '超时',
                  },
                }),
              ],
            )
          },
        },
        {
          title: '弃检原因',
          key: 'address',
        },
      ],
      columns2: [
        {
          title: '项目名称',
          key: 'name',
        },
      ],
      data1: [
        {
          name: '血常规',
          age: 18,
          address: '自愿放弃样本',
          date: '2016-10-03',
        },
        {
          name: '泌尿系统检查',
          age: 18,
          address: '超时',
          date: '2016-10-03',
        },
        {
          name: '血小板',
          age: 18,
          address: '自愿放弃样本',
          date: '2016-10-03',
        },
      ],
    }
  },
  props: {
    RevocationExamineModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    printSure() {
      this.$emit('RevocationExamineModal')
    },
    cancel() {
      this.$emit('update:RevocationExamineModal', false)
    },
    resetClose() {
      //
    },
  },
}
</script>

<style lang="less" scoped>
li {
  height: 50px;
  background: blue;
}
.revocation-examine-modal {
  .content {
    display: flex;
    .content-left {
      width: 560px;
      height: 360px;
      display: flex;
      flex-direction: column;
      .left-top {
        height: 160px;
        display: flex;
        .img-header {
          .header {
            width: 92px;
            height: 120px;
            margin-right:12px;
            background: lightcyan;
            margin-left: 20px;
            margin-top: 20px;
          }
        }
        .information {
          flex: 1;
          // background: lightpink;
          .leftName {
            vertical-align: top;
            line-height: 30px;
            height: 30px;
            overflow: hidden;
            margin: 20px 6px 0 20px;
            display: inline-block;
            text-align: justify;
            width: 48px;
            &::after {
              content: '';
              padding-left: 100%;
              display: inline-block;
            }
          }
          .rightName {
            vertical-align: top;
            line-height: 30px;
            height: 30px;
            overflow: hidden;
            margin:20px 6px 0 20px;
            display: inline-block;
            text-align: justify;
            width: 26px;
            &::after {
              content: '';
              padding-left: 100%;
              display: inline-block;
            }
          }
          .rightInput {
            display: inline-block;
            vertical-align: top;
            margin-top: 20px;
          }
        }
      }
      .left-bottom {
        flex: 1;
        // background: yellow;
        .wrapper {
          overflow: hidden;
           margin-left: 20px;
          .header {
            height: 40px;
            display: flex;
            .title {
              margin-left: 20px;
              line-height: 50px;
              font-size: 12px;
              color: #111111;
              letter-spacing: 0.05px;
              position: relative;
              &::before {
                content: '';
                width: 2px;
                height: 12px;
                background: #008cee;
                display: inline-block;
                position: absolute;
                top: 19px;
                left: -5px;
              }
            }
            .all-lose {
              cursor: pointer;
              margin-left: 335px;
              line-height: 50px;
              font-size: 12px;
              color: #008cee;
              letter-spacing: 0.03px;
              margin-right: 10px;
            }
            .all-time {
              cursor: pointer;
              line-height: 50px;
              font-size: 12px;
              color: #008cee;
              letter-spacing: 0.03px;
            }
          }
          .table {
            background: lightcoral;
            height: 158px;
          }
        }
      }
    }
    .content-right {
      height: 360px;
      flex: 1;
      .right-wrapper {
        width: 180px;
        margin-right: 20px;
        margin-left: 10px;
        margin-top:20px;
        overflow: hidden;
        .header {
          height: 40px;
          display: flex;
          .title {
            margin-left: 20px;
            line-height: 50px;
            font-size: 12px;
            color: #111111;
            letter-spacing: 0.05px;
            position: relative;
            &::before {
              content: '';
              width: 2px;
              height: 12px;
              background: #008cee;
              display: inline-block;
              position: absolute;
              top: 19px;
              left: -5px;
            }
          }
        }
      }
    }
  }
  .bottom {
    height: 70px;
    position: relative;
     .time {
      position: absolute;
      top: 30px;
      left: 20px;
      span:nth-of-type(2) {
        margin-left: 20px;
      }
    }
    .bottom-right {
      .button {
        margin-top: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
