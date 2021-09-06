/**
* Created yhy
* Date: 2017/11/15
* Time: 16:11
* content:描述类型展开项
*/
<template>
  <div class="describe-type">
   <div class="describe-type-wrapper">
        <Row class="expand-row">
            <i-col span="3">
                <div class="title">检查所见</div>
              
            </i-col>
            <i-col span="3">
                <div class="title">检查结果</div>
              
            </i-col>
              <i-col span="3">
                <div class="title">适用体检类别</div>
                
            </i-col>
            <i-col span="3">
                <div class="title">是否默认</div>
              
            </i-col>
            <i-col span="3">
                <div class="title">启用</div>
               
            </i-col>
            <i-col span="3">
                <div class="title">是否异常</div>
                
            </i-col>
            <i-col span="3">
                <div class="title">是否小结</div>
                
            </i-col>
            <i-col span="3">
                <div class="title">显示顺序</div>  
            </i-col>
        </Row>
        <Row v-for="(item, index) in finalRow" :key="index" class="row">
            <i-col span="3">
                <div class="cell">{{item.see}}</div>
            </i-col>
            <i-col span="3">
                <div class="cell">{{item.result}}</div>            
            </i-col>
            <i-col span="3">
                <div class="cell">{{item.peCategories}}</div>            
            </i-col>
            <i-col span="3">
               <div class="cell-radio">
                 <Radio v-model="item.is_default_res" @on-change='onChoose(index,finalRow)'></Radio>   
               </div>
            </i-col>
            <i-col span="3">
                <div class="cell-icon">
                     <div :class="{icon:item.status===1}"></div>
                </div>             
            </i-col>
            <i-col span="3">
                <div class="cell-icon">
                    <div :class="{icon:item.is_abn===1}"></div>
                </div>               
            </i-col>
            <i-col span="3">
                <div class="cell-icon">
                     <div :class="{icon:item.in_brief_summary===1}"></div>
                </div>                
            </i-col>
            <i-col span="3">
                 <div class="cell">{{item.sort}}</div>                 
            </i-col>
        </Row>
   </div>
  <div class="button" @click='buttonSkip'>
    <div>
      <Icon type="ios-arrow-right"  :size='20'	class="ios-arrow-right"></Icon>
    </div>
  </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'describeType',
  data () {
    return {
      finalRow: [],
      peCategories: '', // 适用体检类别
    }
  },
  props: {
    row: {
      type: Array,
      default() {
        return []
      },
    },
    mainId: {
      type: Object,
    },
  },
  mounted () {
    this.initdata()
  },
  methods: {
    async onChoose(mindex, list) {
      // console.log(list)
    //   list.forEach((item, index) => {
    //     if (index === mindex) {
    //       item.stateone = true
    //       this.$emit('choose-reslut', item)
    //     } else {
    //       item.stateone = false
    //     }
    //   })
    //   console.log(list.length)
      for (let index = 0; index < list.length; index++) {
        if (index === mindex) {
          // console.log(list[index].id)
          list[index].is_default_res = true
          await this.getRadioChange(
            {id: this.mainId.rowId,
              data: {
                'default_res_id': list[index].id,
              }})
        } else {
          list[index].is_default_res = false
        }
      }
      // this.$emit('changed')
    },
    buttonSkip() {
      this.$emit('button-skip')
    },
    initdata() {
      this.peCategories = ''
      this.finalRow = this.row.map((item) => {
        let isdefault = false
        // console.log('item.id', this.mainId.default_res_id)
        // console.log('item.id', item.id)
        if (item.id === this.mainId.default_res_id) {
          isdefault = true
        } else {
          isdefault = false
        }
        item.pe_categories.forEach((data) => {
          this.peCategories += `${data.name};`
        })
        item.peCategories = this.peCategories
        return {
          sort: item.sort,
          id: item.id,
          see: item.see,
          result: item.result,
          is_abn: item.is_abn,
          is_default_res: isdefault,
          in_brief_summary: item.in_brief_summary,
          status: item.status,
          item_id: item.item_id,
          peCategories: item.peCategories,
        }
      })
    },
    ...mapActions('singleProjectModule', [
      'getRadioChange', // 展开项目radio改变上传接口
    ]),
  },
  watch: {
    row(val) {
      this.initdata()
    },
  },
}
</script>

<style lang="less" scoped>
  @import (reference) '~assets/less/variable.less';
.describe-type{
    height: 100%;
    // display: flex;
    position: relative;
    padding-right: 40px;
    // outline: 1px solid red;
    .describe-type-wrapper{
        flex: 5;
        .title{
            height: 31px;
            text-align: center;
            line-height: 30px;
            font-size: 12px;
            color: @gradeAshOne;
            // font-weight: bold;
        }
        .expand-row{
             border-bottom: 1px solid @gradeAshFive;   
        }
        .row{
           border-bottom: 1px solid @gradeAshFive; 
        }
        .cell{
            text-overflow: ellipsis; 
            overflow: hidden; 
            white-space: nowrap; 
            text-align: center;
            height: 31px;
            font-size: 12px;
            color: @gradeAshTwo;
            line-height: 30px;
        }
        .cell-icon{
            padding-top: 8px;
          .icon{
             background: url(/static/icons/public/success.png) no-repeat;
             margin: 0 auto;
             width: 16px;
             height: 16px;
          }
          .edit-icon{
             background: url(/static/icons/public/table-hover-edit.svg) no-repeat;
             margin: 0 auto;
             width: 16px;
             height: 16px;
          }
        }
        .cell-radio{
           padding-top: 4px;
        }
    }
    .button{
        // display: inline-block;
        position: absolute;
        top: 0;
        right: 9px;
        width: 30px;
        height: 100%;
        background: @menuTreeLevel2ItemHover;
        border: 1px solid @tableChouseBorder;
        border-radius: 8px;
        &>div {
          position: relative;
          width: 100%;
          height: 100%;
          .ios-arrow-right{
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -9px;
            margin-left: -3.5px;
            // right: 9px;
          }
        }
    }
    
    

}
</style>
