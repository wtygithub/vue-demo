<template>
  <div class="musicWrap">
    <headerTop :headerTit="title"></headerTop>
    <div class="audioWrap">
      <ul class="item">
        <li v-for="(item,index) in musicList" :key="index" @click="setMusic(item)">
          <svg class="icon1" fill="#229399" aria-hidden="true">
            <use xlink:href="#icon-health-006"></use>
          </svg>
          <span class="musicName">{{item.name}}</span>
          <div class="playWrap">
            <svg class="icon2" fill="#229399" aria-hidden="true" @click="play(item, index, item.url)">
              <use :xlink:href="item.playing?'#icon-health-041':'#icon-health-040'"></use>
            </svg>
            <svg class="icon" fill="#229399" aria-hidden="true">
              <use xlink:href="#icon-hcloud-010"></use>
            </svg>
          </div>
          <audio>
            <source :src="item.url" type="audio/mpeg">
          </audio>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import headerTop from './headerTop'
  export default {
    name: "musicList",
    data(){
      return{
        audio:null,
        musicList:[
          {name:'晚安喵',url:require('../../assets/music/晚安喵.mp3'),playing:false,id:1},
          {name:'小海盗口琴',url:require('../../assets/music/小海盗口琴.mp3'),playing:false,id:2},
        ],
        title:'音乐',
        playing:false
      }
    },
    mounted(){
      let that = this
      this.audio=new Audio()
      this.audio.addEventListener('ended', function () {
        that.musicList.forEach(element => {
          element.playing = false;
        });
      })
    },
    methods: {
      //设置音乐
      setMusic(item,index){
        let obj = {}
        obj.audioUrl = item.url
        obj.audioName = item.name
        obj.audioPlaying = item.playing
        obj.audioId = item.id
        this.$store.dispatch('setBgMusic',obj)
        let param = {}
        param.type = 'music'
        this.$store.dispatch('setEditorElement',param)
      },
      //播放或暂停音乐
      play(item, index, url) {
        for (let i = 0; i < this.musicList.length; i++) {
          if (i !== index) {
            this.musicList[i].playing = false
          }
        }
        item.playing = !item.playing
        this.audio.src = url;
        if (item.playing) {
          this.audio.play();
        } else {
          this.audio.pause()
        }
      },
    },
    watch:{
      audioPlaying(){
        if(this.audioPlaying){
          this.audio.src = this.audioUrl
          this.audio.play();
        }else{
          this.audio.src = this.audioUrl
          this.audio.pause()
        }
      }
    },
    computed:{
      audioPlaying(){
        return this.$store.state.editor.editorTheme.audioPlaying
      },
      audioUrl(){
        return this.$store.state.editor.editorTheme.audioUrl
      },
    },
    components:{
      headerTop,
    }
  }
</script>
<style scoped lang="scss">
  .musicWrap{
    width: 100%;
    height: 100%;
    .audioWrap{
      width: 100%;
      min-height: calc(100vh - 92px);
      overflow-y: auto;
      overflow-x: hidden;
      ul{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 20px 0;
        li{
          box-sizing: border-box;
          padding: 0 20px;
          width: 100%;
          height: 36px;
          line-height: 36px;
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(41,147,153,1);
          cursor: pointer;
          .playWrap{
            float: right;
            width: 20%;
            height: 100%;
            display: inline-block;
          }
          svg{
            width: 14px;
            height: 14px;
          }
          .icon1,.icon2{
            margin-right: 5px;
          }
        }
        li:hover{
          background: #fff;
        }
      }
    }
  }
</style>
