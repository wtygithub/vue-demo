<template>
    <div class="bgWrap">
      <headerTop :headerTit="title"></headerTop>
      <div class="bgList">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" v-for="(item,index) in bgArr" :key="index">
            <div class="grid-content bg-purple">
              <img :src="item.url" alt="背景" @click="addBG(item.url)">
            </div>
          </el-col>
        </el-row>
        <!--<div class="bgItem" v-for="(item,index) in bgArr" :key="index">
          <img :src="item.url" alt="背景">
        </div>-->
      </div>
    </div>
</template>

<script>
    import headerTop from './headerTop'
    export default {
        props:{
          element:{
            type:Object
          }
        },
        name: "bgList",
        data(){
          return{
            title:'背景',
            bgArr:[
              {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558610643766&di=c984d3661f8922870808ad3d48a8b5d1&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F04%2F56%2F61%2F475865f36c197e1.jpg%2521%2Ffwfh%2F804x1429%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue'},
              {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559205397&di=a0bc15c6e3d692776b39c399b57bba89&imgtype=jpg&er=1&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F04%2F90%2F83%2F365905bc6e1254a.jpg%21%2Ffwfh%2F804x1429%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue'},
              {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558610718567&di=4431cc67268a64aa0ae916b1f8dc6f01&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_water_img%2F19%2F03%2F29%2Fc10d3597966d844997f7f6b9751ced95.jpg'},
              {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=150499252,4280804412&fm=26&gp=0.jpg'},
              {url:'http://img1.maka.im/assets/bgrecommend/recommend-bg-77.jpg'},
            ]
          }
        },
        methods:{
          addBG(url) {
            var obj = {}
            obj.type = 'bg'
            obj.imgSrc = url
            obj.opacity = 100
            this.$store.dispatch('addBGElement',obj)
          }

        },
        components:{
          headerTop,
        }
    }
</script>

<style scoped lang="scss">
.bgWrap{
  width: 100%;
  height: 100%;
  .bgList{
    width: 100%;
    min-height: calc(100% - 44px);
    box-sizing: border-box;
    padding: 20px 20px 0;
    overflow-y: auto;
    img{
      width: 100%;
      height: 128px;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }

}
</style>
