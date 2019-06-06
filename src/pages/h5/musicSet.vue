<template>
  <div class="musicPanel">
    <div class="title">
      <i class="el-icon-caret-bottom"></i>
      <span class="setMusic">音乐设置</span>
    </div>
    <div class="bgm" v-if="audioId">
      <svg class="icon2" fill="#229399" aria-hidden="true">
        <use xlink:href="#icon-health-006"></use>
      </svg>
      <p>{{audioName}}</p>
      <svg class="icon2" fill="#229399" aria-hidden="true" @click="changeAudioPlayingState">
        <use :xlink:href="audioPlaying?'#icon-health-041':'#icon-health-040'"></use>
      </svg>
      <i class="el-icon-delete" @click="delBgm"></i>
      <audio>
        <source :src="audioUrl" type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MusicPanel",
    props:{
      // defaultMusic:{
      //   type: Array
      // },
      // myMusic:{
      //   type: Array
      // }

    },
    data(){
      return{
        playing:false,
        audio:null,

      }
    },
    mounted(){
      this.audio = new Audio()
    },
    computed:{
      audioPlaying(){
        return this.$store.state.editor.editorTheme.audioPlaying
      },
      audioName(){
        return this.$store.state.editor.editorTheme.audioName
      },
      audioUrl(){
        return this.$store.state.editor.editorTheme.audioUrl
      },
      audioId(){
        return this.$store.state.editor.editorTheme.audioId
      }
    },
    methods:{
      delBgm(){
        let data = {
          audioUrl:'',
          audioName:'',
          audioId:'',
          audioPlaying:true,
        }
        this.$store.dispatch('setBgMusic', data);
      },
      changeAudioPlayingState(){
        this.$store.dispatch('changeAudioPlayingState', !this.audioPlaying );
      }
    }
  }
</script>

<style lang="scss" scoped>
  .musicPanel{

    .title{
      /*float: left;*/
      width: 100px;
      text-align: left;
      margin-left: 10px;
      margin-top: 20px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(51,51,51,1);
      line-height:14px;
    }
    .bgm{
      font-family:MicrosoftYaHei;
      width:260px;
      height:36px;
      /*float: left;*/
      text-align: left;
      cursor: pointer;
      align-items: center;
      margin-right: 10px;
      /*justify-content: center;*/
      display: flex;
      font-size:14px;
      margin-top: 20px;
      text-align: left;
      margin-left: 15px;
      p{
        display: inline-block;
        width: 126px;

        height: 100%;
        float: left;
        line-height: 36px;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

      }
      svg{
        width: 14px;
        height: 14px;
        cursor: pointer;
      }
      .el-icon-delete{
        margin-left: 10px;
      }
      span{
        float: left;
      }
      span:nth-of-type(2){
        margin-left: 30px;
        font-size: 30px;

      }
      span:nth-of-type(3){
        margin-left: 10px;
        font-size: 14px;

      }
    }
  }
</style>
