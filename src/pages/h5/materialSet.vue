<template>
  <div id="shapePanel" class="panel panel-edit">
    <div class="panel-edit-title">
      <i class="el-icon-caret-bottom"></i><span>形状设置</span>
    </div>
    <div class="con-wrapper">
      <div class="item">
        <div class="right">对齐</div>
        <div class="left fontLine">
          <el-tooltip class="item" effect="dark" content="顶对齐" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="clickBoldIcon(element)" :class="{activeIcon:element.fontWeight == 'bold'}">
              <use xlink:href="#icon-health-015"></use>
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="居中对齐" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="clickItalicIcon(element)" :class="{activeIcon:element.fontStyle == 'italic'}">
              <use xlink:href="#icon-health-016"></use>
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="底对齐" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="clickUnderlineIcon(element)" :class="{activeIcon:element.textDecoration == 'underline'}">
              <use xlink:href="#icon-health-017"></use>
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="左对齐" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="element.textAlign = 'left'" :class="{activeIcon:element.textAlign == 'left'}">
              <use xlink:href="#icon-health-018"></use>
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="水平居中对齐" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="element.textAlign = 'center'" :class="{activeIcon:element.textAlign == 'center'}">
              <use xlink:href="#icon-health-019"></use>
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="右对齐" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="element.textAlign = 'right'" :class="{activeIcon:element.textAlign == 'right'}">
              <use xlink:href="#icon-health-020"></use>
            </svg>
          </el-tooltip>
        </div>
      </div>
      <div class="item">
        <div class="right">图层</div>
        <div class="left fontLine">
          <svg class="shape" fill="#555555" aria-hidden="true">
            <use xlink:href="#icon-health-021"></use>
          </svg>
          <svg class="shape" fill="#555555" aria-hidden="true">
            <use xlink:href="#icon-health-022"></use>
          </svg>
          <svg class="shape" fill="#555555" aria-hidden="true">
            <use xlink:href="#icon-health-023"></use>
          </svg>
          <svg class="shape" fill="#555555" aria-hidden="true">
            <use xlink:href="#icon-health-024"></use>
          </svg>
        </div>
      </div>
      <div class="item itemspec">
        <div class="right">颜色</div>
        <div class="left custom_color_picker">
          <!--<el-input class="custon_input_style" type="color" v-model="element.color"></el-input>-->
          <el-color-picker v-model="element.fill"></el-color-picker>
        </div>
      </div>
      <div class="itemOpc">
        <label>透明度</label>
        <div class="content">
          <el-slider v-model="element.opacity" show-input input-size="mini"></el-slider>
        </div>
      </div>
      <div class="itemOpc">
        <label>旋转</label>
        <div class="content">
          <el-slider v-model="element.transform"
                     show-input input-size="mini"
                     :max="360"></el-slider>
        </div>
      </div>
      <div class="item" style="height: 30px;">
        <div>位置及尺寸</div>
      </div>
      <div class="item" style="clear: both;">
        <div class="item1">X</div>
        <div class="item1">Y</div>
        <div class="item1">宽</div>
        <div class="item1">高</div>
        <div class="item1"><input disabled="true" type="text" v-model="element.left"></div>
        <div class="item1"><input disabled="true" type="text" v-model="element.top"></div>
        <div class="item1"><input disabled="true" type="text" v-model="element.width"></div>
        <div class="item1"><input disabled="true" type="text" v-model="element.height"></div>
      </div>
      <div class="item" style="clear: both;margin-top: 30px;">
        <div>启用跳转链接</div>
        <div style="margin-left: 10px;"><el-switch v-model="element.isUseLink" inactive-color="#aaaaaa" active-color="#229399"></el-switch></div>
      </div>
      <div class="item" v-show="element.isUseLink"><el-input placeholder="请输入链接" id="custom_input_style" v-model="element.jumpUrl"></el-input></div>
    </div>
  </div>
</template>

<style>
  /*覆盖滑块内容*/
  #shapePanel .custom_silder_style .el-slider{
    width: 150px;
  }
  #shapePanel .custom_silder_style .el-slider__runway {
    width: 100%;
    height: 4px;
  }
  #shapePanel .custom_silder_style .el-slider__bar{
    height: 4px;
    background-color: #008A7C;
  }
  #shapePanel .custom_silder_style .el-slider__button-wrapper{
    z-index: 1;
    top: -16px;
  }
  #shapePanel .custom_silder_style .el-slider__button {
    width: 12px;
    height: 12px;
    border: 2px solid #008A7C;
  }
  /*覆盖颜色框*/
  #shapePanel .custom_color_picker .el-color-picker__trigger {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 30px;
    width: 212px;
    padding: 1px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 0;
    position: relative;
    cursor: pointer;
  }
  /*覆盖文本框*/
  #shapePanel #custom_input_style{
    width: 94%;
    height: 30px!important;
    line-height: 30px!important;
    padding-left: 5px;
  }
</style>

<style lang="scss" scoped>
  /**
  * 修改element样式  顶级类名前加/deep/  自定义不用修改全局样式且互不影响
 */
  /deep/ .content{
    .el-slider__input{
      width: 80px
    }
    .el-slider__runway.show-input{
      margin-right: 95px;
    }
    .el-input-number--mini .el-input-number__increase, .el-input-number--mini .el-input-number__decrease{
      width: 20px;
      font-size: 12px;
    }
    .el-input-number--mini .el-input__inner{
      padding-left: 25px;
      padding-right:25px ;
    }
  }

  .con-wrapper {
    z-index: 1;
    margin-top: 20px;
    .itemOpc {
      padding: 5px 0;
      clear: both;
      .content {
        margin-left: 70px;
        margin-right: 20px;
      }
    }
    /*label {*/
    /*text-align: left;*/
    /*vertical-align: middle;*/
    /*font-size: 12px;*/
    /*color: #333333;*/
    /*line-height: 1;*/
    /*width: 70px;*/
    /*float: left;*/
    /*padding: 13px 12px 11px 13px;*/
    /*}*/
  }

  #shapePanel {
    z-index: 1;
    .panel-edit-title{
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: #555555;
      padding-left: 10px;
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: left;
      i.iconfont{
        vertical-align: middle;
        font-size: 12px;
        color: #555555;
      }
      span{
        padding-left: 5px;
      }
    }
    .con-wrapper {
      width: 100%;
      .item {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        font-size: 12px;
        height: 40px;
        line-height: 40px;
        padding: 0 10px 0 10px;
        cursor: pointer;
        .bgTitle {
          padding-left: 8px;
        }
        .triangle {
          font-size: 12px;
          position: relative;
          top: -2px;
          right: 2px;
        }
        img {
          width: 160px;
        }
        &.active {
          color: white;
          background-color: #4CADA3;
        }
        &.active-spec {
          opacity: 0.6;
        }
        .disable {
          opacity: 0.5;
        }
        .line {
          position: relative;
          width: 160px;
          height: 5px;
          background-color: #CCCCCC;
          border-radius: 2px;
          margin-top: 8px;
          .bar {
            position: absolute;
            right: 0;
            top: -8px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #CCCCCC;
          }
        }
        .left {
          flex: 1;
          -webkit-flex: 1;
          padding-left: 5px;
          box-sizing: border-box;
          .custom_silder_style{
            padding-left: 10px;
          }
          .f12 {
            font-size: 12px;
            margin-left: 3px;
            margin-right: 3px;
          }
          &.fontLine {
            height: 30px;
            line-height: 30px;
            svg{
              display: inline-block;
              width: 34px;
              height: 20px;
              margin-top: 6px;
            }
            .activeIcon{
              fill: #299399;
            }
            .icon {
              display: inline-block;
              width: 30px;
              text-align: center;
              height: 25px;
              margin-right: 2px;
            }
            .active {
              background-color: #008A7C;
              color: white;
            }
            .textarea_style{
              width: 94%;
              height: 60px;
              padding-left: 5px;
              padding-top: 5px;
              border-radius: 4px;
              border-color: #CCCCCC;
            }
          }
          .line-spec {
            width: 140px;
          }
        }
        .left_spec {
          display: flex;
          display: -webkit-flex;
          flex-wrap: wrap;
          box-sizing: border-box;
          .left_r {
            width: 180px;
          }
          .icon {
            vertical-align: middle;
          }
        }
        .right {
          flex: 0 0 50px;
          -webkit-flex: 0 0 50px;
          height: 30px;
          font-size: 12px;
          text-align: left;
          line-height: 30px;
          .delete {
            width: 51px;
            padding: 10px;
            background: rgba(238, 238, 238, 1);
            border-radius: 2px;
            box-sizing: border-box;
            text-align: center;
            &:hover {
              background-color: #848484;
              color: white;
            }
            div {
              line-height: 20px;
            }
          }
          .texts {
            height: 30px;
            line-height: 30px;
            width: 50px;
            text-align: center;
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            border: 1px solid #CCCCCC;
          }
        }
        .right_1 {
          flex: 0 0 50px;
          -webkit-flex: 0 0 50px;
        }
        select {
          display: inline-block;
          width: 140px;
          border-radius: 5px;
          height: 30px;
          line-height: 30px;
        }
        .item1 {
          flex: 0 0 25%;
          -webkit-flex: 0 0 25%;
          height: 30px;
          input {
            display: inline-block;
            width: 40px;
            height: 25px;
            text-align: center;
            border: 1px solid lavender;
            border-radius: 5px;
          }
        }
        .input_style{
          width: 94%;
          height: 30px;
          padding-left: 5px;
          border-radius: 4px;
          border-color: #cccccc;
        }
      }
      .itemspec {
        height: 45px;
      }
      .item-spec {
        height: auto;
        padding: 0 12px;
      }
      .bgCon {
        .title {
          padding: 0 12px 12px 20px;
          font-size: 12px;
        }
      }
    }

    .item {
      padding: 5px 0;
      clear: both;
      .content {
        margin-left: 70px;
      }
    }
    label {
      /*text-align: right;*/
      text-align: left;
      vertical-align: middle;
      font-size: 12px;
      color: #48576a;
      line-height: 1;
      width: 70px;
      float: left;
      padding: 11px 12px 11px 10px;
    }
  }

  .panel-tab {
    line-height: 40px;
    margin: -10px -10px 10px;
    .tab {
      float: left;
      width: 50%;
      text-align: center;
      cursor: pointer;
      background-color: #d6d6d6;
      &.active {
        background-color: transparent;
      }
    }
  }
</style>

<script>
  export default {
    props: {
      element: {
        type: Object
      },
     /* canvasHeight: {
        type: Number,
      },
      panelState: {
        type: Number,
      }*/
    },
    data () {
      return {
        panelTabState: 0,
      }
    },
    computed: {
      levelEditor () {
        return this.$store.state['editor']
      },
      levelEditingPage () {
        return this.levelEditor['editorPage']['elements']
      }
    },
    methods: {
      // 顶对齐
      topAlignMent(left,top,width,height){
        this.element.top = 0
      },
      // 上下居中
      centerAlignMent(left,top,width,height){
        this.element.top = (this.canvasHeight+4 - height)/2
      },
      // 底对齐
      bottomAlignMent(left,top,width,height){
        this.element.top = (this.canvasHeight+4 - height)
      },
      // 左对齐
      leftAlignMent(left,top,width,height){
        this.element.left = 0
      },
      // 居中对齐
      middleAlignMent(left,top,width,height){
        this.element.left = (375-width)/2
        this.element.top = (this.canvasHeight+4 - height)/2
      },
      // 右对齐
      rightAlignMent(left,top,width,height){
        this.element.left = (375-width)
      },
      // 上一层
      upperStory(element){
        console.log(this.levelEditingPage)
        let totalLength = this.levelEditingPage.length
        let currentIndex = 0
        this.levelEditingPage.forEach((value, index)=>{
          if(value == element){
            currentIndex = index
          }
        })
        console.log(currentIndex)
        if(currentIndex+1 != totalLength){
          let currentZIndex = element.zindex
          element.zindex = this.levelEditingPage[currentIndex+1].zindex
          this.levelEditingPage[currentIndex+1].zindex = currentZIndex
          this.swapArray(this.levelEditingPage, currentIndex, currentIndex+1)
        }else {
          console.log('已经置顶了，无法上移')
        }
      },
      // 下一层
      nextFloor(element){
        let currentIndex = 0
        this.levelEditingPage.forEach((value, index)=>{
          if(value == element){
            currentIndex = index
          }
        })
        console.log(currentIndex)
        if(currentIndex != 0){
          let currentZIndex = element.zindex
          element.zindex = this.levelEditingPage[currentIndex-1].zindex
          this.levelEditingPage[currentIndex-1].zindex = currentZIndex
          this.swapArray(this.levelEditingPage, currentIndex, currentIndex-1)
        }else {
          console.log('已经置底了，无法下移')
        }
      },
      // 置顶
      setTop(element){
        let totalLength = this.levelEditingPage.length
        let currentIndex = 0
        this.levelEditingPage.forEach((value, index)=>{
          if(value == element){
            currentIndex = index
          }
        })
        if(currentIndex+1 != totalLength){
          let needMoveTime = totalLength - 1 -currentIndex
          for(let i=0; i<needMoveTime; i++){
            let currentZIndex = element.zindex
            element.zindex = this.levelEditingPage[currentIndex+1].zindex
            this.levelEditingPage[currentIndex+1].zindex = currentZIndex
            this.swapArray(this.levelEditingPage, currentIndex ,currentIndex+1)
            currentIndex++
          }
        }else {
          console.log('已经置顶了，无法上移')
        }
      },
      // 置底
      setBottom(element){
        let currentIndex = 0
        this.levelEditingPage.forEach((value, index)=>{
          if(value == element){
            currentIndex = index
          }
        })
        if(currentIndex != 0){
          let needMoveTime = currentIndex - 0
          for(let i=0; i<needMoveTime; i++){
            let currentZIndex = element.zindex
            element.zindex = this.levelEditingPage[currentIndex-1].zindex
            this.levelEditingPage[currentIndex-1].zindex = currentZIndex
            this.swapArray(this.levelEditingPage, currentIndex ,currentIndex-1)
            currentIndex--
          }
        }else {
          console.log('已经置底了，无法下移')
        }
      },
      // 交换数组元素
      swapArray(array, index1, index2){
        array.filter(v => v['type'] !== 'bg').reverse()
        array[index1] = array.splice(index2, 1, array[index1])[0]
        return array
      },
    },
  }
</script>
