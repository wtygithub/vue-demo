<template>
  <div id="textPanel" class="panel panel-edit">
    <div class="panel-edit-title"><i class="el-icon-caret-bottom"></i><span>文本设置</span></div>
    <div class="con-wrapper">
      <div class="item">
        <div class="right">文本</div>
        <div class="left fontLine">
          <textarea style="resize: none;" class="textarea_style" v-model="element.text"></textarea>
        </div>
      </div>
      <div class="item" style="margin-top: 30px;">
        <div class="right">样式</div>
        <div class="left fontLine" id="custom_checkbox">
          <el-tooltip class="item" effect="dark" content="加粗" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="clickBoldIcon(element)" :class="{activeIcon:element.fontWeight == 'bold'}">
              <use xlink:href="#icon-health-025"></use>
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="倾斜" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="clickItalicIcon(element)" :class="{activeIcon:element.fontStyle == 'italic'}">
              <use xlink:href="#icon-health-026"></use>
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="下划线" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="clickUnderlineIcon(element)" :class="{activeIcon:element.textDecoration == 'underline'}">
              <use xlink:href="#icon-health-027"></use>
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="左对齐" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="element.textAlign = 'left'" :class="{activeIcon:element.textAlign == 'left'}">
              <use xlink:href="#icon-health-028"></use>
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="居中对齐" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="element.textAlign = 'center'" :class="{activeIcon:element.textAlign == 'center'}">
              <use xlink:href="#icon-health-029"></use>
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="右对齐" placement="bottom">
            <svg class="shape" fill="#555555" aria-hidden="true" @click="element.textAlign = 'right'" :class="{activeIcon:element.textAlign == 'right'}">
              <use xlink:href="#icon-health-030"></use>
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
          <el-color-picker v-model="element.color"></el-color-picker>
        </div>
      </div>
      <div class="item itemspec">
        <div class="right">字体</div>
        <div class="left">
          <el-select style="width: 212px;" placeholder="请选择字体" v-model="element.fontFamily">
            <el-option v-for="(item, index) in fontFamily" :key="index" :label="item.name" :value="item.currFamily">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item">
        <div class="right">字体大小</div>
        <div class="left custom_input_number">
          <el-input-number :min="12" :max="100" v-model="element.fontSize"></el-input-number>
        </div>
      </div>
      <!--<div class="item">-->
      <!--<div class="right">行高</div>-->
      <!--<div class="left custom_input_number">-->
      <!--<el-input-number v-model="element.lineHeight"></el-input-number>-->
      <!--</div>-->
      <!--</div>-->
      <div class="item">
        <div class="right">透明度</div>
        <div class="left">
          <div class="custom_silder_style">
            <el-slider :min="0" :max="100" v-model="element.opacity"></el-slider>
          </div>
        </div>
        <div class="right right_1">
          <div class="texts">{{element.opacity}}</div>
        </div>
      </div>
      <div class="item">
        <div class="right">旋转</div>
        <div class="left">
          <div class="custom_silder_style">
            <el-slider :min="0" :max="360" v-model="element.transform"></el-slider>
          </div>
        </div>
        <div class="right right_1">
          <div class="texts">{{element.transform}}</div>
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
        <div style="margin-left: 10px;"><el-switch inactive-color="#aaaaaa" active-color="#229399" v-model="element.isUseLink"></el-switch></div>
      </div>
      <div class="item" v-show="element.isUseLink"><el-input placeholder="请输入链接" id="custom_input_style" v-model="element.jumpUrl"></el-input></div>
    </div>
  </div>
</template>

<style>
  /*覆盖下拉列表*/
  #textPanel .el-select .el-input__inner {
    height: 30px!important;
    line-height: 30px!important;
  }
  /*覆盖文本框*/
  #textPanel #custom_input_style{
    width: 94%;
    height: 30px!important;
    line-height: 30px!important;
    padding-left: 5px;
  }
  /*覆盖计数文本框*/
  #textPanel .custom_input_number .el-input-number{
    width: 212px;
    height: 30px !important;
    line-height: 30px !important;
  }
  #textPanel .custom_input_number .el-input-number__increase,
  #textPanel .custom_input_number .el-input-number__decrease {
    position: absolute;
    z-index: 1;
    top: 1px;
    width: 35px;
    line-height: 30px;
    height: 30px;
    text-align: center;
    background: #299399;
    color: #ffffff;
    cursor: pointer;
    font-size: 12px;
  }
  #textPanel .custom_input_number .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  /*覆盖颜色框*/
  #textPanel .custom_color_picker .el-color-picker__trigger {
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
  /*覆盖滑块内容*/
  #textPanel .custom_silder_style .el-slider{
    width: 150px;
  }
  #textPanel .custom_silder_style .el-slider__runway {
    width: 100%;
    height: 4px;
  }
  #textPanel .custom_silder_style .el-slider__bar{
    height: 4px;
    background-color: #008A7C;
  }
  #textPanel .custom_silder_style .el-slider__button-wrapper{
    z-index: 1;
    top: -16px;
  }
  #textPanel .custom_silder_style .el-slider__button {
    width: 12px;
    height: 12px;
    border: 2px solid #008A7C;
  }
  /*覆盖Checkbox内容*/
  #textPanel #custom_checkbox .iconCheckboxStyle .custom_checkbox {
    text-align: left;
    vertical-align: middle;
    line-height: 1;
    margin: 0;
    padding: 0;
    width: 30px;
    height: 25px;
    position: absolute;
    left: 0;
    top: 0;
    color: transparent;
    background: transparent;
    font-size: 0;
  }
  #textPanel #custom_checkbox .iconCheckboxStyle .custom_checkbox.is-checked{
    color: #299399;
    background: transparent;
    font-size: 0;
  }
  #textPanel #custom_checkbox .iconCheckboxStyle .el-checkbox__inner {
    display: inline-block;
    position: absolute;
    border: none;
    border-radius: 0px;
    box-sizing: border-box;
    width: 30px;
    height: 25px;
    left: 0;
    top: -10px;
    color: transparent;
    background: transparent;
    font-size: 0;
    padding: 0;
    margin: 0;
    -webkit-transition: none;
    transition: none;
  }
</style>

<style lang="scss" scoped>
  #textPanel {
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
            .iconCheckboxStyle{
              position: relative;
              width: 100%;
              height: 100%;
              .custom_checkbox{
                position: absolute;
                width: 30px;
                height: 30px;
                background: transparent;
              }
            }
            .checkedBoxStyle{
              color: #ffffff;
              background: #299399;
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
      text-align: right;
      vertical-align: middle;
      font-size: 12px;
      color: #48576a;
      line-height: 1;
      width: 70px;
      float: left;
      padding: 11px 12px 11px 0;
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
      /*canvasHeight: {
        type: Number,
      },
      panelState: {
        type: Number,
      }*/
    },
    data () {
      return {
        panelTabState: 0,
        fontFamily: [
          {name: '宋体', currFamily: 'SimSun'},
          {name: '黑体', currFamily: 'SimHei'},
          {name: '微软雅黑', currFamily: 'Microsoft YaHei'},
          {name: '微软正黑体', currFamily: 'Microsoft JhengHei'},
          {name: '新宋体', currFamily: 'NSimSun'},
          {name: '新细明体', currFamily: 'PMingLiU'},
          {name: '细明体', currFamily: 'MingLiU'},
          {name: '标楷体', currFamily: 'DFKai-SB'},
          {name: '仿宋', currFamily: 'FangSong'},
          {name: '楷体', currFamily: 'KaiTi'},
          {name: 'sans-serif', currFamily: 'sans-serif'}
        ],
        flag1: true,
        flag2: true,
        flag3: true,
      }

    },
    methods: {
      //文本加粗
      clickBoldIcon(element){
        if(this.flag1){
          element.fontWeight = 'bold'
          this.flag1 = false
        }else{
          element.fontWeight = 'normal'
          this.flag1 = true
        }
      },
      //文本倾斜
      clickItalicIcon(element){
        if(this.flag2){
          element.fontStyle = 'italic'
          this.flag2 = false
        }else{
          element.fontStyle = 'normal'
          this.flag2 = true
        }
      },
      //文本添加下划线
      clickUnderlineIcon(element){
        if(this.flag3){
          element.textDecoration = 'underline'
          this.flag3 = false
        }else{
          element.textDecoration = 'none'
          this.flag3 = true
        }
      },
    },
  }
</script>
