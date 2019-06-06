<template>
    <div class="headerTop">
      {{headerTit}}
    </div>
</template>

<script>
    export default {
       props:{
         headerTit:{
           type:String,
           default:''
         }
       },
      name: "headerTop"
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base";
  .headerTop{
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    padding: 0 20px;
    line-height: 44px;
    font-size: 14px;
    color: $active_color;
    text-align: left;
    border-bottom: 1px solid;
  }
</style>
