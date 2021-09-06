/*
*弹窗状态组件 ‘保存中’
*@author蒋易伶
*@date 2017.11.26
*/

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="88px" height="88px">
    <rect rx="12" ry="12" width="88" height="88" style="fill:rgba(0,0,0,.9);"/>
    <circle cx="44" cy="33" r="20" stroke="#999999" stroke-width="1" style="fill:rgba(0,0,0,0)"/>
    <circle cx="44" cy="33" r="12" stroke="#999999" stroke-width="1" style="fill:rgba(0,0,0,0)"/>
    <!-- 外圈大圆点 -->
    <circle r="4" fill="#FFFFFF" class="circk1" >
    </circle>
    <!-- 内圈小圆点 -->
    <circle r="2" fill="#FFFFFF" class="circk2">
    </circle>
    <!-- 文字 -->
    <text font-family="microsoft yahei" font-size="12" height="16" width="46" fill="#FFFFFF" y="75" x="23">保存中...</text>
  </svg>
</template>
<script>
  export default {}
</script>
<style lang="less" >
  .circk1 {
    motion-path: path(
      'M24,33
          a20,20 0 1,1 40,0
          a20,20 0 1,1 -40,0
          a20,20 0 1,1 40,0
          a20,20 0 1,1 -40,0
          a20,20 0 1,1 40,0
          a20,20 0 1,1 -40,0
          '
    );
    animation: move 3s cubic-bezier(0.4, 0.8, 0.8, 0) infinite;
  }
  @keyframes move {
    100% {
      motion-offset: 100%;
    }
  }
  .circk2 {
    motion-path: path(
      'M56,33
        a12,12 0 1,0 -24,0
        a12,12 0 1,0 24,0
        a12,12 0 1,0 -24,0
        a12,12 0 1,0 24,0
        a12,12 0 1,0 -24,0
        a12,12 0 1,0 24,0'
    );
    animation: move 3s cubic-bezier(0.4, 0.8, 0.8, 0) infinite;
  }
</style>