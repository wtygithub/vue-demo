<template>
  <common_header_menu>
    <div id="detail">
      <div class="headerW">
        <div @click="isSave">
          <i class="el-icon-arrow-left"></i>
          <span>返回</span>
        </div>
      </div>
    </div>
  </common_header_menu>
</template>

<script>
  import common_header_menu from './common/common_header_menu'
    export default {
        name: "detail",
        methods:{
          goBack(){
            if(this.$route.query.flag == 1){
              this.$router.push('/questionbank')
            }else{
              this.$router.push('/questionManage')
            }
          },
          isSave(){
            //this.$toast('上架成功')
            this.$message('确认保存么？')
          }
        },
        components:{
          common_header_menu,
        }
    }
</script>

<style scoped lang="scss">
  #detail{
    box-sizing: border-box;
    border: 15px solid #f7f7f7;
    width: 100%;
    height: 100%;
    background: #fff;
    .headerW{
      box-sizing: border-box;
      padding: 15px;
      width: 100%;
      height: 100%;
      cursor: pointer;

    }
  }
</style>
