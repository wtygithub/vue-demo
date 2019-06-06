<template>
    <div class="imageWrap">
      <headerTop :headerTit="title"></headerTop>
      <div class="inner">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" v-for="(item,index) in bgArr" :key="index">
            <div class="grid-content bg-purple">
              <img :src="item.url" alt="图片" @click="appendImg(item.url)">
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import headerTop from './headerTop'
    export default {
      name: "imageList",
      data(){
        return{
          title:'图片',
          bgArr:[
            {url:'http://img1.maka.im/assets/bgrecommend/recommend-bg-9.jpg?x-oss-process=image/resize,w_80'},
            {url:'http://img1.maka.im/assets/bgrecommend/recommend-bg-12.jpg?x-oss-process=image/resize,w_80'},
            {url:'http://img1.maka.im/assets/bgrecommend/recommend-bg-10.jpg?x-oss-process=image/resize,w_80'},
            {url:'http://img1.maka.im/assets/bgrecommend/recommend-bg-17.jpg?x-oss-process=image/resize,w_80'},
            {url:'http://img1.maka.im/assets/bgrecommend/recommend-bg-16.jpg?x-oss-process=image/resize,w_80'},
            {url:'http://img1.maka.im/assets/bgrecommend/recommend-bg-33.jpg?x-oss-process=image/resize,w_80'},
            {url:'http://img1.maka.im/assets/bgrecommend/recommend-bg-34.jpg?x-oss-process=image/resize,w_80'},
            {url:'http://img1.maka.im/assets/bgrecommend/recommend-bg-37.jpg?x-oss-process=image/resize,w_80'},
            {url:'http://img1.maka.im/assets/bgrecommend/recommend-bg-72.jpg?x-oss-process=image/resize,w_80'}

          ]
        }
      },
      methods:{
        appendImg(url){
          let obj = {}
          obj.type = 'pic'
          obj.top = 20
          obj.left = 20
          obj.width = 100
          obj.height = 100
          obj.imgSrc = url
          this.$store.dispatch('addElement', obj)
        }
      },
      components:{
        headerTop,
      }
    }
</script>

<style scoped lang="scss">
.imageWrap{
  width: 100%;
  height: 100%;
  .inner{
    width: 100%;
    min-height: calc(100ch - 44px);
    box-sizing: border-box;
    padding: 20px 20px 0;
    //overflow-y: auto;
    img{
      width: 100%;
      height: 70px;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
}
</style>
