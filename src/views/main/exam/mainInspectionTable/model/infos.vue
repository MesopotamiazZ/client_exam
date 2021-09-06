<template>
<div class="baseic">
 <div class="schema"><img :src="schema"/></div>
                 <div class="infos">
      <Row class="m20t15">
        <div>
          <div class="fontC" style="color:#737373;width:48px">
            体检号
          </div>
          <div class="disableIput" style="height:30px;width:115px;">
            <Input class="" placeholder="VIP升级名称" v-model="industriainput">
            </Input>
          </div>
        </div>
        <div>
          <div class="fontC" style="color:#737373;width:48px">
            姓名
          </div>
          <div class="disableIput" style="height:30px;width:99px;">
            <Input class="" disabled >
            </Input>
          </div>
        </div>
        
                <div>
          <div class="fontC" style="color:#737373;width:48px">
            性别
          </div>
          <div class="disableIput" style="height:30px;width:74px;">
            <Input class="" disabled >
            </Input>
          </div>
        </div>
      </Row>
     </div>
</div>
</template>
<script>
export default {
  name: 'infos',
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .baseic{
      padding: 20px;
      height: 255px;
 
      overflow-x: scroll;
      overflow-y: hidden;
      .fontC{
          float: left;
      }
      .disableIput{
          float: left;
          margin-left:10px;
      }
      .m20t15>div{
          float: left;
           margin-left: 26px;

      }
       .schema{
         height: 154px;
         width: 120px;
         flex-grow: 0;
         background-color: orange;
         float: left;
       }
       .infos{
         width: auto;
         overflow-x: scroll;
         overflow-y: hidden;
         float: left;
         & *{
           vertical-align: middle;
         }
         line-height: 30px;
         flex-grow: 1;
         margin-left: 6px;
         position: relative;
         .info-item{
           margin-bottom: 15px;
           display: inline-block;
           margin-right: 26px;
           label{
             display: inline-block;
             margin-right: 10px;
             text-align: justify;
             text-align-last: justify;
             font-size: 12px;
             color: #717171;
             width: 48px;
           }
         }
         .health-doc{
           position: absolute;
           right: 0;
           top: 155px;
           border: 1px solid #57A3F3;
           & *{
             color: #57A3F3;
           }
           transition: background-color 0.6s linear;
           &:hover{
             background-color: #EBF4FF;
           }
         }
       }
  }
</style>