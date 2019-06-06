<template>
    <div class="testWrap">
      <headerTop :headerTit="title"></headerTop>
      <div class="inner">
        <div class="textTit t1" style="font-size: 48px" @click="addText('title1')">大标题</div>
        <div class="textTit t2" style="font-size: 30px" @click="addText('title2')">标题</div>
        <div class="textTit t3" style="font-size: 20px" @click="addText('title3')">副标题</div>
        <div class="textTit t4" style="font-size: 18px" @click="addText('title4')">小标题</div>
        <div class="textTit t5" style="font-size: 14px" @click="addText('title5')">正文内容</div>
      </div>
    </div>
</template>

<script>
  import headerTop from './headerTop'
    export default {
      name: "testList",
      data(){
        return{
          title:'文本',
        }
      },
      methods:{
        addText(type){
          let param = {}
          param['type'] = 'text'
          param['text'] = '请输入文本'
          param['width'] = '375'
          param['lineHeight'] = 1
          switch (type) {
            case 'plain':
              break
            case 'title1':
              param['fontSize'] = 48
              param['height'] = 48
              param['fontWeight'] = ''
              param['textAlign'] = 'center'
              break
            case 'title2':
              param['fontSize'] = 30
              param['height'] = 30
              param['fontWeight'] = ''
              param['textAlign'] = 'center'
              break
            case 'title3':
              param['fontSize'] = 20
              param['height'] = 20
              param['fontWeight'] = ''
              param['textAlign'] = 'center'
              break
            case 'title4':
              param['fontSize'] = 18
              param['height'] = 18
              param['fontWeight'] = ''
              param['textAlign'] = 'center'
              break
            case 'title5':
              param['fontSize'] = 14
              param['height'] = 14
              param['fontWeight'] = ''
              param['textAlign'] = 'center'
              break
            default:
          }
          this.$store.dispatch('addElement',param)

        }
      },
      components:{
        headerTop,
      }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base";
  .testWrap{
    width: 100%;
    height: 100%;
    .inner{
      margin-top: 20px;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      .textTit{
        box-sizing: border-box;
        //width: 100%;
        height: 60px;
        line-height: 60px;
        color: #fff;
        text-align: center;
        cursor: pointer;
      }
      .t1:hover,.t2:hover,.t3:hover,.t4:hover,.t5:hover{
        background: #272c33;
        border-top: 1px solid $active_color;
        border-bottom: 1px solid $active_color;
      }
    }
  }
</style>
