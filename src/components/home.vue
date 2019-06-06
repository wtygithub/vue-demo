<template>
  <common_header_menu>
    <div class="makeH5">
      <div class="banner">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556446495401&di=e0b06d0dfe409c191007568bffc496d2&imgtype=0&src=http%3A%2F%2Fbjhaxm.com%2Fhome%2Fb%2F8%2Fi51jx7%2Fresource%2F2016%2F09%2F20%2F57e0d12b23a80.jpg" alt="">
      </div>
      <div class="H5list">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="H5模版" name="first">
            <div class="listWrap">
              <!--添加-->
              <div class="emptyTemplate">
                <div class="add">
                  <router-link target="_blank" to="/createH5">
                    <i class="el-icon-plus"></i>
                  </router-link>

                </div>
              </div>
              <!--模版列表-->
              <div class="listItem" v-for="(item,index) in templateList" :key="index">
                <img :src="item.url" alt="">
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </common_header_menu>
</template>

<script>
  import '../assets/css/reset.css'
  import common_header_menu from './common/common_header_menu'
  export default {
    name: 'home',
    data () {
      return{
        activeName:'first',
        templateList:[
          {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558535006349&di=c3db6c5aa75a26c32b77048a181cd3a7&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_water_img%2F19%2F04%2F03%2Ff149f4766560029c0e1e0c5119dbc432.jpg'}
        ]
      }
    },
    mounted(){
    },
    methods:{
      //跳转至新建H5页面
      goCreateH5(){
        this.$router.push('/createH5')
      }
    },
    components:{
      common_header_menu
    }
  }
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .makeH5{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .banner{
      width: 100%;
      height: 300px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .H5list{
      width: 100%;
      min-height: calc(100vh - 350px);
      box-sizing: border-box;
      border: 15px solid #eee;
      padding: 20px;
      background: #fff;
      .listWrap{
        float: left;
        .emptyTemplate{
          float: left;
          width:170px;
          height:273px;
          line-height: 273px;
          margin: 0 24px 24px 0;
          background: #fff;
          box-sizing: border-box;
          border: 1px dashed #ccc;
          text-align: center;
          cursor: pointer;
          .el-icon-plus{
            font-size: 30px;
            cursor: pointer;
          }
        }
        .listItem{
          float: left;
          width:170px;
          height:273px;
          line-height: 273px;
          margin: 0 24px 24px 0;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
