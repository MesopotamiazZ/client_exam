/**
* Created yhy
* Date: 2017/12/05/
* Time: 11:51
* content:人才招聘
*/
<template>
  <div class="alentRecruitmentWrapper">
    <div class="talentRecruitment">
      <div class="talentRecruitmentContent contentBg">
        <div class="talentRecruitmentHeader">
          <div class="tilte">招聘列表</div>
          <div class="rightButton">
            <Button type="ghost" class="button" @click="buttonApply">申&nbsp;请</Button>
            <Button type="ghost" class="button" @click="buttonSeeApply">查看申请</Button>
            <Button type="ghost" class="button" @click="buttonEdit">修&nbsp;改</Button>
            <Button type="ghost" class="button" @click="buttonAdd">新&nbsp;增</Button>
            <Button type="ghost" @click="buttonDelete">删&nbsp;除</Button>

          </div>
        </div>
        <div class="talentRecruitmentTable">
          <handsontable
            @deSelect="deSelect"
            @selectRow="selectRow"
            @editRow="editRow"
            @deleteRow="deleteRow"
            :data="coldata"
            :colHeaders="colHeaders"
            :columns="columns"
            style="text-align:center"></handsontable>
        </div>
      </div>
    </div>
    <!--申请-->
    <Modal v-model="modelApply" width="472" class="modelApply" :transfer='false' :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <div class="tilte">申请职位</div>
      </div>
      <div style="margin-top: 5px">
        <div class="leftName">
          姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名
        </div>
        <Input v-model="value" placeholder="" style="width: 125px"></Input>
        <div class="rightName">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</div>
        <Select v-model="model1" style="width:132px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <div class="leftName">
          性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
        </div>
        <Select v-model="model1" style="width:125px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="rightName">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄</div>
        <Input v-model="value" placeholder="" style="width: 132px"></Input>
      </div>
      <div>
        <div class="leftName">现在科室/部门</div>
        <Select v-model="model1" style="width:125px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="rightName">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族</div>
        <Select v-model="model1" style="width:132px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <div class="leftName">现&nbsp;&nbsp;&nbsp;在&nbsp;&nbsp;&nbsp;岗&nbsp;&nbsp;&nbsp;位</div>
        <Select v-model="model1" style="width:125px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="rightName">现在上级</div>
        <Input v-model="value" placeholder="" style="width: 132px"></Input>
      </div>
      <div>
        <div class="textareaTitle">申&nbsp;&nbsp;&nbsp;请&nbsp;&nbsp;&nbsp;内&nbsp;&nbsp;&nbsp;容</div>
        <Input v-model="value8" type="textarea" class="textarea" placeholder=""/>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottomRight">
            <Button type="primary" class="button" @click="modelApplyCommit">提&nbsp;交</Button>
            <Button type="ghost" class="button" @click="modelApplyCancel">取&nbsp;消</Button>
          </div>
        </div>
      </div>
    </Modal>

    <!--查看申请-->
    <Modal v-model="modelSeeApply" width="816" class="modelSeeApply" :transfer='false' :mask-closable="false"
           :transition-names="['']"
    >
      <div slot="header">
        <div class="tilte">查看申请</div>
      </div>
      <div class="modelSeeApplyTable ">
        <div class="modelSeeApplyTableWrapper contentBg">
          <handsontable
            :data="coldataSeeAdd"
            :colHeaders="colHeadersSeeAdd"
            :columns="columnsSeeAdd"
            :height="320"
            style="text-align:center"></handsontable>
        </div>
      </div>
      <div slot="footer">
      </div>
    </Modal>

    <!--修改-->
    <Modal v-model="modelEdit" width="472" class="modelEdit" :transfer='false' :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <div class="tilte">修改职位</div>
      </div>
      <div style="margin-top: 5px">
        <div class="leftName">用人科室/部门</div>
        <Select v-model="model1" style="width:152px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="rightName">岗位</div>
        <Select v-model="model1" style="width:132px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <div class="leftName">职&nbsp;&nbsp;&nbsp;称&nbsp;&nbsp;要&nbsp;&nbsp;&nbsp;求</div>
        <Select v-model="model1" style="width:152px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="rightName">民族</div>
        <Select v-model="model1" style="width:132px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <div class="leftName">有&nbsp;&nbsp;&nbsp;效&nbsp;&nbsp;时&nbsp;&nbsp;&nbsp;间</div>
        <date-component style="width: 152px"></date-component>
        <div class="rightName">人数</div>
        <Input v-model="value" placeholder="" style="width: 132px"></Input>
      </div>
      <div>
        <div class="textareaTitle">要&nbsp;&nbsp;&nbsp;求&nbsp;&nbsp;内&nbsp;&nbsp;&nbsp;容</div>
        <Input v-model="value8" type="textarea" class="textarea" placeholder=""/>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottomRight">
            <Button type="primary" class="button" @click="modelEditSave">保&nbsp;存</Button>
            <Button type="ghost" class="button" @click="modelEditCancel">取&nbsp;消</Button>
          </div>
        </div>
      </div>
    </Modal>

    <!--新增-->
    <Modal v-model="modelAdd" width="472" class="modelAdd" :transfer='false' :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <div class="tilte">新增职位</div>
      </div>
      <div style="margin-top: 5px">
        <div class="leftName">现在科室/部门</div>
        <Select v-model="model1" style="width:152px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="rightName">岗位</div>
        <Select v-model="model1" style="width:132px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <div class="leftName">职&nbsp;&nbsp;&nbsp;称&nbsp;&nbsp;要&nbsp;&nbsp;&nbsp;求</div>
        <Select v-model="model1" style="width:152px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="rightName">民族</div>
        <Select v-model="model1" style="width:132px" :filterable="true">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <div class="leftName">有&nbsp;&nbsp;&nbsp;效&nbsp;&nbsp;时&nbsp;&nbsp;&nbsp;间</div>
        <date-component style="width: 152px"></date-component>
        <div class="rightName">人数</div>
        <Input v-model="value" placeholder="" style="width: 132px"></Input>
      </div>
      <div>
        <div class="textareaTitle">要&nbsp;&nbsp;&nbsp;求&nbsp;&nbsp;内&nbsp;&nbsp;&nbsp;容</div>
        <Input v-model="value8" type="textarea" class="textarea" placeholder=""/>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottomRight">
            <Button type="primary" class="button" @click="modelAddSave">保&nbsp;存</Button>
            <Button type="ghost" class="button" @click="modelAddCancel">取&nbsp;消</Button>
          </div>
        </div>
      </div>
    </Modal>

    <!--删除-->
    <Modal v-model="modelDelete" :width='296' class="modelDelete"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <div class="tilte">提示</div>
      </div>
      <div class="content">确定删除本条信息吗？</div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottomRight">
            <Button type="primary" class="button" @click="modelDeleteSure">删&nbsp;除</Button>
            <Button type="ghost" class="button" @click="modelDeleteCancel">取&nbsp;消</Button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
  import handsontable from '@/components/table/handsontable'
  import aRenderer from '@/service/renderer'
  import dateComponent from '@/components/calendar/dateComponent'
  export default {
    name: 'recruitment',
    data () {
      return {
        modelDelete: false,
        modelAdd: false,
        modelEdit: false,
        modelApply: false,
        modelSeeApply: false,
        colHeaders: ['', '用人科室/部门', '职称', '岗位', '招聘人数', '申请人数', '发布时间', '要求内容'],
        columns: [
          {className: 'htCenter htMiddle', readOnly: true, width: 80, bbb: false, renderer: aRenderer.indexRenderer()},
          {data: 'a', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 160, bbb: false},
          {data: 'b', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 160, bbb: false},
          {data: 'c', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 160, bbb: false},
          {data: 'd', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 72, bbb: false},
          {data: 'e', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 72, bbb: false},
          {data: 'f', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 101, bbb: false},
          {data: 'g', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 219, bbb: false},
        ],
        coldata: [
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
          {
            a: '采样台',
            b: '检验医师',
            c: '护士',
            d: '1',
            e: '1',
            f: '2017-1-12',
            g: '技术熟练',
          },
        ],
        colHeadersSeeAdd: ['', '现在科室/部门', '姓名', '性别', '年龄', '职称', '现在岗位', '现在上级', '申请时间', '申请内容'],
        columnsSeeAdd: [
          {className: 'htCenter htMiddle', readOnly: true, width: 30, bbb: false, renderer: aRenderer.indexRenderer()},
          {data: 'a', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 108, bbb: false},
          {data: 'b', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 63, bbb: false},
          {data: 'c', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 35, bbb: false},
          {data: 'd', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 35, bbb: false},
          {data: 'e', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 94, bbb: false},
          {data: 'f', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 94, bbb: false},
          {data: 'g', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 77, bbb: false},
          {data: 'h', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 82, bbb: false},
          {data: 'y', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 170, bbb: false},
        ],
        coldataSeeAdd: [
          {
            a: '检验科',
            b: '秦始皇',
            c: '男',
            d: '20',
            e: '检验师',
            f: '护士',
            g: '王医生',
            h: '2017-12-12',
            y: '无',
          },
          {
            a: '检验科',
            b: '秦始皇',
            c: '男',
            d: '20',
            e: '检验师',
            f: '护士',
            g: '王医生',
            h: '2017-12-12',
            y: '无',
          },
          {
            a: '检验科',
            b: '秦始皇',
            c: '男',
            d: '20',
            e: '检验师',
            f: '护士',
            g: '王医生',
            h: '2017-12-12',
            y: '无',
          },
          {
            a: '检验科',
            b: '秦始皇',
            c: '男',
            d: '20',
            e: '检验师',
            f: '护士',
            g: '王医生',
            h: '2017-12-12',
            y: '无',
          },
          {
            a: '检验科',
            b: '秦始皇',
            c: '男',
            d: '20',
            e: '检验师',
            f: '护士',
            g: '王医生',
            h: '2017-12-12',
            y: '无',
          },
          {
            a: '检验科',
            b: '秦始皇',
            c: '男',
            d: '20',
            e: '检验师',
            f: '护士',
            g: '王医生',
            h: '2017-12-12',
            y: '无',
          },
          {
            a: '检验科',
            b: '秦始皇',
            c: '男',
            d: '20',
            e: '检验师',
            f: '护士',
            g: '王医生',
            h: '2017-12-12',
            y: '无',
          },
          {
            a: '检验科',
            b: '秦始皇',
            c: '男',
            d: '20',
            e: '检验师',
            f: '护士',
            g: '王医生',
            h: '2017-12-12',
            y: '无',
          },
          {
            a: '检验科',
            b: '秦始皇',
            c: '男',
            d: '20',
            e: '检验师',
            f: '护士',
            g: '王医生',
            h: '2017-12-12',
            y: '无',
          },
          {
            a: '检验科',
            b: '秦始皇',
            c: '男',
            d: '20',
            e: '检验师',
            f: '护士',
            g: '王医生',
            h: '2017-12-12',
            y: '无',
          },
        ],
      }
    },
    methods: {
//      ------------主界面按钮----------------
      buttonApply () {
        console.log()
        this.modelApply = true
      },
      buttonSeeApply () {
        console.log()
        this.modelSeeApply = true
      },
      buttonEdit () {
        console.log()
        this.modelEdit = true
      },
      buttonAdd () {
        console.log()
        this.modelAdd = true
      },
      buttonDelete () {
        console.log()
        this.modelDelete = true
      },
//  ------------申请对话框按钮----------------
      modelApplyCommit () {
        console.log()
      },
      modelApplyCancel () {
        console.log()
        this.modelApply = false
      },
      //  ------------修改对话框按钮----------------
      modelEditSave () {
        console.log()
      },
      modelEditCancel () {
        console.log()
        this.modelEdit = false
      },
      //  ------------新增对话框按钮----------------
      modelAddSave () {
        console.log()
      },
      modelAddCancel () {
        console.log()
        this.modelAdd = false
      },
      //  ------------删除对话框按钮----------------
      modelDeleteSure () {
        console.log()
      },
      modelDeleteCancel () {
        console.log()
        this.modelDelete = false
      },
//      ------------主界面表格按钮----------------
      editRow (data) {
        console.log()
      },
      deleteRow (data) {
        console.log()
      },
      selectRow (row, data) {
        console.log()
      },
      deSelect () {
        console.log()
      },
    },
    components: {
      handsontable,
      dateComponent,
    },
  }
</script>
<style lang="less">
  .alentRecruitmentWrapper .talentRecruitmentTable {
    height: calc(~'100% - 50px');
    .ihandsontable,
    .ihandsontable > .handsontable,
    .ihandsontable > .handsontable .ht_master,
    .ihandsontable > .handsontable .wtHolder {
      height: 100% !important;
    }
  }
</style>
<style lang="less" scoped>
  @import (reference) '~assets/less/variable.less';

  .alentRecruitmentWrapper {
    /*width: 1055px;*/
    /*margin: 0 auto;*/
    height: 100%;
    position: relative;
    .talentRecruitment {
      padding: 10px;
      width: 100%;
      height: 100%;
      .talentRecruitmentContent {
        overflow: hidden;
        width: 100%;
        height: 100%;
        /*background: lightblue;*/
        .talentRecruitmentHeader {
          height: 50px;
          /*background: lightcoral;*/
          position: relative;
          .tilte {
            display: inline-block;
            line-height: 50px;
            font-size: 14px;
            color: @gradeAshOne;
            &::before {
              content: '';
              margin-top: -3px;
              vertical-align: middle;
              display: inline-block;
              margin-right: 8px;
              margin-left: @num20;
              width: 3px;
              height: 17px;
              background-color: @gradeBlueOne;
            }
          }
          .rightButton {
            font-size: 0;
            display: inline-block;
            position: absolute;
            top: 10px;
            right: 20px;
            .button {
              margin-right: 10px;
            }
          }
        }

      }

    }
  }

  .modelApply {
    .tilte {
      font-size: 14px;
      color: @gradeAshOne;
      margin-left: -20px;
      display: inline-block;
      line-height: 30px;
      &::before {
        content: '';
        margin-top: -3px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 8px;
        margin-left: @num20;
        width: 3px;
        height: 17px;
        background-color: @gradeBlueOne;
      }
    }
    .bottom {
      margin-top: 0;
      height: 70px;
      .bottomRight {
        font-size: 0;
        .button {
          margin-top: 20px;
          margin-right: 20px;
        }
      }
    }
    .leftName {
      line-height: 30px;
      margin-top: 15px;
      width: 80px;
      margin-left: 20px;
      margin-right: 10px;
      font-size: 12px;
      color: @gradeAshThree;
      display: inline-block;
    }
    .rightName {
      line-height: 30px;
      font-size: 12px;
      color: @gradeAshThree;
      margin-top: 15px;
      width: 48px;
      margin-left: 20px;
      margin-right: 10px;
      display: inline-block;
    }
    .textareaTitle {
      width: 78px;
      margin-left: 20px;
      margin-right: 10px;
      margin-top: 22px;
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
      color: @gradeAshThree;
    }
    .textarea {
      width: 342px;
      height: 70px;
      margin-top: 15px;
    }
  }

  .modelSeeApply {
    .tilte {
      font-size: 14px;
      color: @gradeAshOne;
      margin-left: -20px;
      display: inline-block;
      line-height: 30px;
      &::before {
        content: '';
        margin-top: -3px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 8px;
        margin-left: @num20;
        width: 3px;
        height: 17px;
        background-color: @gradeBlueOne;
      }
    }
    .modelSeeApplyTable {
      padding: 10px;;
      .modelSeeApplyTableWrapper {
        overflow: hidden;
      }
    }
  }

  .modelEdit {
    .tilte {
      font-size: 14px;
      color: @gradeAshOne;
      margin-left: -20px;
      display: inline-block;
      line-height: 30px;
      &::before {
        content: '';
        margin-top: -3px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 8px;
        margin-left: @num20;
        width: 3px;
        height: 17px;
        background-color: @gradeBlueOne;
      }
    }
    .bottom {
      /*margin-top: 13px;*/
      height: 70px;
      .bottomRight {
        font-size: 0;
        .button {
          margin-top: 20px;
          margin-right: 20px;
        }
      }
    }
    .leftName {
      line-height: 30px;
      display: inline-block;
      width: 76px;
      margin-left: 20px;
      margin-right: 10px;
      font-size: 12px;
      color: @gradeAshThree;
      margin-top: 15px;
    }
    .rightName {
      line-height: 30px;
      display: inline-block;
      width: 24px;
      margin-left: 20px;
      margin-right: 10px;
      font-size: 12px;
      color: @gradeAshThree;
      margin-top: 15px;
    }
    .textareaTitle {
      width: 76px;
      margin-left: 20px;
      margin-right: 10px;
      margin-top: 22px;
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
      color: @gradeAshThree;
    }
    .textarea {
      width: 345px;
      height: 70px;
      margin-top: 15px;
    }
  }

  .modelAdd {
    .tilte {
      font-size: 14px;
      color: @gradeAshOne;
      margin-left: -20px;
      display: inline-block;
      line-height: 30px;
      &::before {
        content: '';
        margin-top: -3px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 8px;
        margin-left: @num20;
        width: 3px;
        height: 17px;
        background-color: @gradeBlueOne;
      }
    }
    .bottom {
      /*margin-top: 13px;*/
      height: 70px;
      .bottomRight {
        font-size: 0;
        .button {
          margin-top: 20px;
          margin-right: 20px;
        }
      }
    }
    .leftName {
      line-height: 30px;
      display: inline-block;
      width: 76px;
      margin-left: 20px;
      margin-right: 10px;
      font-size: 12px;
      color: @gradeAshThree;
      margin-top: 15px;
    }
    .rightName {
      line-height: 30px;
      display: inline-block;
      width: 24px;
      margin-left: 20px;
      margin-right: 10px;
      font-size: 12px;
      color: @gradeAshThree;
      margin-top: 15px;
    }
    .textareaTitle {
      width: 76px;
      margin-left: 20px;
      margin-right: 10px;
      margin-top: 22px;
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
      color: @gradeAshThree;
    }
    .textarea {
      width: 345px;
      height: 70px;
      margin-top: 15px;
    }
  }

  .modelDelete {
    .tilte {
      font-size: 14px;
      color: @gradeAshOne;
      margin-left: -20px;
      display: inline-block;
      line-height: 30px;
      &::before {
        content: '';
        margin-top: -3px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 8px;
        margin-left: @num20;
        width: 3px;
        height: 17px;
        background-color: @gradeBlueOne;
      }
    }
    .content {
      text-align: center;
      margin-top: 30px;
      margin-bottom: 10px;
      font-size: 16px;
      color: #4A4A4A;
    }
    .bottom {
      height: 70px;
      .bottomRight {
        font-size: 0;
        .button {
          margin-top: 20px;
          margin-right: 20px;
        }
      }
    }
  }
</style>

