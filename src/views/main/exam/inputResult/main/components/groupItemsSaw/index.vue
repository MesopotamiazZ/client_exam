<template>
  <div class="group-items-saw-wrapper">
    <!-- <div class="compound-header">组合项目:妇科, 弃检, 读入数据, 影像导入, <span @click="show = !show">展开</span></div> -->

    <div class="group-items-header">
      <div class="fl group-items-left font16">
        <span>组合项目：{{groupItemInfo.group_item_name}}</span>
        <Checkbox class="marginL20"
                  v-model="status"
                  @on-change="giveUpChange">弃检</Checkbox>
      </div>
      <div class="fr group-items-right">
        <Button v-if="!canDataImport"
                disabled
                class="fl1 marginR10 ghost-button">数据导入</Button>
        <Button v-if="canDataImport"
                type="ghost"
                class="fl1 marginR10 ghost-button"
                @click="dataImport">数据导入</Button>
        <Button v-if="!canImagesImport"
                disabled
                class="fl1 marginR10 ghost-button">影像导入</Button>
        <Button v-if="canImagesImport"
                type="ghost"
                class="fl1 marginR10 ghost-button"
                @click="imagesImport">影像导入</Button>
        <div class="icon-show marginR20"
             @click="show = !show">
          <Icon :type="show ? 'arrow-up-b' : 'arrow-down-b'"
                size="8"
                color="white"
                class="arr-icon"></Icon>
        </div>
      </div>
      <div style="clear:both;"></div>
    </div>

    <div v-show="show">
      <!-- v-show="groupItemInfo.is_has_img" -->
      <div v-show="groupItemInfo.is_has_img">
        <image-display @single-relation="singleRelation"></image-display>
      </div>
      <!-- 分割线 -->
      <div class="seperate-line"
           v-if="show"></div>
      <!-- body信息  -->
      <div class="group-items-body"
           v-if="type==='normal'">
        <Table border
               stripe
               :columns="columns"
               @on-row-click="outputGroupItemInfo"
               :data="data"></Table>
      </div>
      <!-- 电测听 -->
      <div class="group-items-body"
           v-if="type==='listenTest'">
        <electron-listen-test :sex="sex"
                              :age="age"></electron-listen-test>
      </div>
      <!-- 胸片 -->
      <div class="group-items-body"
           v-if="type==='chestRadiography'">
        <chest-radiography></chest-radiography>
      </div>
    </div>
    <!-- <importingPicturesModel ref="importingPicturesModel"></importingPicturesModel> -->
  </div>
</template>
<script>
import QTable from '@/components/qtable'
import ZButton from '@/components/button/ZButton'
import ImageDisplay from '../imageDisplay'
import ChestRadiography from './chestRadiography'
import ElectronListenTest from './electronListenTest'
import giveUpModal from '../giveUpModal'
import importingPicturesModel from './importingPicturesModel'
export default {
  components: {
    QTable,
    ZButton,
    ImageDisplay,
    ChestRadiography,
    ElectronListenTest,
    giveUpModal,
    importingPicturesModel,
  },
  props: {
    // 组合项目表格的内容
    data: {
      type: Array,
      default() {
        return []
      },
    },
    // 标题
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    // 组合项目类型
    type: {
      type: String,
      default: 'normal', // normal - 普通, chestRadiography - 胸片, listenTest - 电测听
    },
    // 组合项目名字
    groupItemsName: {
      type: String,
    },
    // 图像显示
    showImageScroll: {
      type: Boolean,
      default: false,
    },
    // 性别
    sex: {
      type: [Number, String],
    },
    // 年龄
    age: {
      type: [Number, String],
    },
    // 组合项目的所有信息
    groupItemInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      show: true,
      canDataImport: false,
      canImagesImport: true,
      giveUpModal: false, // 模态框打开字段
      giveupdeal: true,
      giveUpStatus: !!this.groupItemInfo.is_abandon, // 页面上弃检状态 (是/否) // groupItemInfo.is_abandon
      giveUpReason: '',
      status: null,
    }
  },
  computed: {},
  methods: {
    setstatus(val) {
      this.status = val
    },
    outputGroupItemInfo(row, index) {
      this.$emit(
        'current-group-item-info',
        this.groupItemInfo.pe_items[index],
      )
    },
    giveUpChange(status) {
      this.giveUpModal = true
      this.$emit('give-up-change')
      this.$emit('give-up-status', status)
    },
    dataImport() {
      alert('data import')
    },
    imagesImport() {
      this.$emit('image-import')
      // this.$refs.importingPicturesModel.openM()
    },
    singleRelation() {
      this.$emit('single-relation', this.groupItemInfo)
    },
  },
}
</script>
<style lang="less" scoped>
@import (reference) '~assets/less/variable.less';

.group-items-saw-wrapper {
  margin: 10px;
  border: 1px solid @gradeAshFive;
  border-radius: 8px;
  overflow: auto;
  .group-items-header {
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    .group-items-left {
      color: @gradeAshOne;
      letter-spacing: 0.04px;
      &::before {
        content: '';
        margin-top: -4px;
        display: inline-block;
        margin-right: 6px;
        margin-left: @num20;
        width: 4px;
        height: 18px;
        vertical-align: middle;
        background-color: @gradeBlueOne;
      }
    }
    .group-items-right {
      .icon-show {
        width: 20px;
        height: 20px;
        background: #008cee;
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        margin-top: -2px;
        vertical-align: middle;
        position: relative;
        cursor: pointer;
        .arr-icon {
          position: absolute;
          top: 4px;
          right: 6px;
        }
      }
    }
  }
  .ghost-button {
    // border-color: #34A3F1;
    // color: #249CF0;
  }
  .seperate-line {
    height: 1px;
    background: @gradeAshFive;
  }
  .group-items-body {
    .ivu-table-cell {
      padding: 0;
      color: red;
    }
    .ivu-table::before {
      // height: 0;
    }
  }
}
</style>

