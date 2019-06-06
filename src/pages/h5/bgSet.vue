<template>
  <div class="setInner">
    <div v-show="element.imgSrc">
      <div class="openWrap">
        <i class="el-icon-caret-bottom" v-show="showExpand" @click="isShowExpand"></i>
        <i class="el-icon-caret-top" v-show="!showExpand" @click="isShowExpand"></i>
        <span>背景设置</span>
      </div>
      <div v-show="showExpand">
        <div class="currentBg" >
          <img :src="element.imgSrc" alt="背景">
          <div class="delWrap">
            <div class="innerDel">
              <p>
                <i class="el-icon-delete"></i>
              </p>
              <p @click="deleteBg">删除</p>
            </div>
          </div>
        </div>
        <div class="opacityWrap">
          <div class="title">透明度</div>
          <el-slider v-model="element.opacity"></el-slider>
          <div class="value">{{element.opacity}}%</div>
        </div>
        <div class="btn" @click="setAllPageBg(element.imgSrc)">
          <button>将背景样式应用到所有页面</button>
        </div>
      </div>
    </div>
    <div>
      <div class="openWrap">
        <i class="el-icon-caret-bottom" v-show="changePageHeight" @click="isShowChangePageHeight"></i>
        <i class="el-icon-caret-top" v-show="!changePageHeight" @click="isShowChangePageHeight"></i>
        <span>页面设置</span>
      </div>
      <div v-show="changePageHeight">
        <div class="setWrap">
          <span class="p1">尺寸</span>
          <span class="p2">宽</span>
          <span class="p3">375</span>
          <span class="p4">高</span>
          <input type="text" class="p5" v-model="curPageHeight" @input="changeHeight">
        </div>
        <p class="prompt">高只可以输入603至6030之间的整数</p>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
      props:{
        element:{
          type:Object,
          default:function () {
            return {}
          }
        }
      },
      name: "bgSet",
      data(){
        return{
          showExpand:true,
          opacityBg:100,
          changePageHeight:true,
          curPageHeight:'603'
        }
      },
      methods:{
        //将背景应用到所有页面
        setAllPageBg(imgSrc){
          var obj = {}
          obj.imgSrc = imgSrc
          obj.opacity = 100
          this.$store.dispatch('applyBgToOthers',obj)
        },
        //改变页面高度
        changeHeight(){
          var reg = /^[1-9]\d*$/;
          var value = this.curPageHeight;
          if (value == '') {
            this.$message({
              message: '高只可以输入603至6030之间的整数',
              type: 'warning',
              duration:1500
            });
            return false
          }
          if (!reg.test(value)) {
            this.$message({
              message: '格式不正确,只可以输入603至6030之间的整数',
              type: 'warning',
              duration:1500
            });
            return false
          }
          if(value*1 < 603) {
            this.$message({
              message: '高只可以输入603至6030之间的整数',
              type: 'warning',
              duration:1500
            });
            return false
          }
          if(value*1 > 6030){
            this.$message({
              message: '高只可以输入603至6030之间的整数',
              type: 'warning',
              duration:1500
            });
            return false
          }

          this.$store.dispatch('setCanvasHeight',this.curPageHeight)


        },
        isShowExpand(){
          this.showExpand = !this.showExpand
        },
        isShowChangePageHeight(){
          this.changePageHeight = !this.changePageHeight
        },
        //删除背景
        deleteBg(){
          this.$store.dispatch('cleanBG')
        }
      },
      watch:{
        pageHeight(newVal){
          this.curPageHeight = newVal
        }
      },
      computed:{
        vxEditor() {
          return this.$store.state['editor']
        },
        pages() {
          return this.vxEditor['editorTheme']['pages']
        },
        totalPageNumber(){
          return this.vxEditor['editorTheme']['pages'].length
        },
        editingPage () {
          return this.vxEditor['editorPage']
        },
        editingElement(){
          return this.vxEditor['editorElement']
        },
        layers() {
          return this.editingPage['elements']
        },
        currentEditPage(){
          return this.vxEditor['currentPageNum']
        },
        pageHeight(){
          return this.vxEditor['editorPage'].canvasHeight
        }
      }

    }
</script>

<style scoped lang="scss">
@import "../../assets/css/base";
.setInner{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 0 0 10px;
  .openWrap{
    i{
      cursor: pointer;
    }
  }
  .currentBg{
    position: relative;
    width: 100%;
    height: 289px;
    box-sizing: border-box;
    padding-left: 10px;
    margin-top: 20px;
    img{
      width: 180px;
      height: 100%;
    }
    .delWrap{
      position: absolute;
      top: 0;
      right: 30px;
      width:50px;
      height:50px;
      background:rgba(242,242,242,1);
      border-radius:2px;
      font-size:12px;
      font-family:MicrosoftYaHei;
      color:rgba(102,102,102,1);
      text-align: center;
      cursor: pointer;
      .innerDel{
        position:absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
      i{
        font-size: 20px;
      }
    }
  }
  .opacityWrap{
    display: flex;
    box-sizing: border-box;
    padding-left: 10px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size:12px;
    font-family:MicrosoftYaHei;
    color:rgba(51,51,51,1);
    .title{
      width: 15%;
      margin-right: 10px;
    }
    .el-slider{
      width: 60%;
    }
    .value{
      width: 20%;
      text-align: center;
    }
  }
  .btn{
    width: 100%;
    height: 36px;
    box-sizing: border-box;
    padding: 0 20px 0 10px;
    margin-bottom: 30px;
    button{
      width: 100%;
      height:36px;
      border: none !important;
      background:$active_color;
      border-radius:4px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(255,255,255,1);
      cursor: pointer;
    }
  }
  .setWrap{
    display: flex;
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding-left: 10px;
    font-family:MicrosoftYaHei;
    margin-top: 20px;
    .p1{
      font-size:12px;
      color:rgba(51,51,51,1);
    }
    .p2,.p4{
      font-size:12px;
      color:rgba(102,102,102,1);
    }
    .p3,.p5{
      font-size:14px;
      color:rgba(102,102,102,1);
      text-align: center;
    }
    .p2{
      margin: 0 10px 0 20px;
    }
    .p4{
      margin: 0 10px 0 23px;
    }
    .p3{
      display: inline-block;
      width:50px;
      height:30px;
      background:rgba(244,244,244,1);
      border-radius:4px;
      border:1px solid rgba(221,221,221,1);
    }
    .p5{
      display: inline-block;
      width:50px;
      height:30px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      border:1px solid rgba(221,221,221,1);
    }
  }
  .prompt{
    padding: 10px 0 0 53px;
    font-size:12px;
    font-family:MicrosoftYaHei;
    color:rgba(102,102,102,1);
  }
}
</style>
