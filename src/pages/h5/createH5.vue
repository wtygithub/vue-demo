<template>
  <div id="h5_container">
    <div id="h5_header">
      <div class="left">
        <i class="el-icon-back"></i>
      </div>
      <div class="middle">新建H5</div>
      <div class="right">
        <div class="save">
          <i class="el-icon-document"></i>
          <span>保存</span>
        </div>
        <div class="review">
          <i class="el-icon-view"></i>
          <span>预览</span>
        </div>
      </div>
    </div>
    <div id="editWrap">
      <div class="left_tab">
        <div v-for="(item,index) in tabList" :key="index" class="tab_item" @click="showMaterial(index)" :class="{isActive: activeIndex == index}">
          <div class="itemWrap">
            <div class="top">
              <i :class="item.iconClass"></i>
            </div>
            <p class="bottom">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="materialWrap">
        <!--背景-->
        <div class="bg">
          <div class="bgW">
            <div class="title1" :class="{active_bgtab: activite_BgTab}" @click="change_bgTab">我的</div>
            <div class="title2" :class="{active_bgtab:!activite_BgTab}" @click="change_bgTab">推荐</div>
          </div>
          <div class="bg_img">

          </div>
        </div>
        <!--文本-->
        <div class="text">

        </div>
        <!--素材-->
        <div class="material"></div>
        <!--图片-->
        <div class="photo"></div>
        <!--音乐-->
        <div class="music"></div>
      </div>
      <div class="content"></div>
      <div class="styleWrap"></div>
    </div>
  </div>
</template>

<script>
 // import {tabList} from '../../assets/js/option'
  import common_header_menu from '../../components/common/common_header_menu'
    export default {
        name: "createH5",
        data(){
          return{
            tabList:[
              {type:'bg',title:'背景',iconClass:'el-icon-document'},
              {type:'bg',title:'文本',iconClass:'el-icon-setting'},
              {type:'bg',title:'素材',iconClass:'el-icon-sold-out'},
              {type:'bg',title:'图片',iconClass:'el-icon-picture-outline'},
              {type:'bg',title:'音乐',iconClass:'el-icon-service'}
            ],//左侧导航
            activeIndex:0,//左侧导航栏活跃状态
            activite_BgTab:true,//背景tab
            textList:[
              {
                type:'text',
                title:'大标题',
                active:false,
                initStyle:{
                  'font-size': '48px','text-align': 'center','font-family':'MicrosoftYaHei','color':'#fff'
                },
                style: {
                  'position': 'absolute',
                  'top': '50%',
                  'left': '50%',
                  'bottom': '',
                  'right': '',
                  'font-size': '48px',
                  'cursor': 'move',
                  '-moz-user-select': 'none',
                  '-webkit-user-select': 'none',
                  'width': '80%',
                  'height':'',
                  'font-family': 'Microsoft YaHei',
                  'box-sizing': 'border-box',
                  'color': 'black',
                  'transform': '',
                  'rotate': '0deg',
                  'rotate_r': '120px',
                  'opacity': 1,
                  'text-align': 'center',
                  'font-weight': '',
                  'font-style': '',
                  'text-decoration': 'none',
                  'margin-top': '',
                  'margin-left': '',
                  'z-index':'',
                },
              },
              {
                type:'text',
                title:'标题',
                active:false,
                initStyle:{
                  'font-size': '30px','text-align': 'center','font-family':'MicrosoftYaHei','color':'#fff'
                },
                style: {
                  'position': 'absolute',
                  'top': '50%',
                  'left': '50%',
                  'bottom': '',
                  'right': '',
                  'font-size': '30px',
                  'cursor': 'move',
                  '-moz-user-select': 'none',
                  '-webkit-user-select': 'none',
                  'width': '80%',
                  'height':'',
                  'font-family': 'Microsoft YaHei',
                  'box-sizing': 'border-box',
                  'color': 'black',
                  'transform': '',
                  'rotate': '0deg',
                  'rotate_r': '120px',
                  'opacity': 1,
                  'text-align': 'center',
                  'font-weight': '',
                  'font-style': '',
                  'text-decoration': 'none',
                  'margin-top': '',
                  'margin-left': '',
                  'z-index':'',
                },
              },
              {
                type:'text',
                title:'副标题',
                active:false,
                initStyle:{
                  'font-size': '20px','text-align': 'center','font-family':'MicrosoftYaHei','color':'#fff'
                },
                style: {
                  'position': 'absolute',
                  'top': '50%',
                  'left': '50%',
                  'bottom': '',
                  'right': '',
                  'font-size': '20px',
                  'cursor': 'move',
                  '-moz-user-select': 'none',
                  '-webkit-user-select': 'none',
                  'width': '80%',
                  'height':'',
                  'font-family': 'Microsoft YaHei',
                  'box-sizing': 'border-box',
                  'color': 'black',
                  'transform': '',
                  'rotate': '0deg',
                  'rotate_r': '120px',
                  'opacity': 1,
                  'text-align': 'center',
                  'font-weight': '',
                  'font-style': '',
                  'text-decoration': 'none',
                  'margin-top': '',
                  'margin-left': '',
                  'z-index':'',
                },
              },
              {
                type:'text',
                title:'小标题',
                active:false,
                initStyle:{
                  'font-size': '18px','text-align': 'center','font-family':'MicrosoftYaHei','color':'#fff'
                },
                style: {
                  'position': 'absolute',
                  'top': '50%',
                  'left': '50%',
                  'bottom': '',
                  'right': '',
                  'font-size': '18px',
                  'cursor': 'move',
                  '-moz-user-select': 'none',
                  '-webkit-user-select': 'none',
                  'width': '80%',
                  'height':'',
                  'font-family': 'Microsoft YaHei',
                  'box-sizing': 'border-box',
                  'color': 'black',
                  'transform': '',
                  'rotate': '0deg',
                  'rotate_r': '120px',
                  'opacity': 1,
                  'text-align': 'center',
                  'font-weight': '',
                  'font-style': '',
                  'text-decoration': 'none',
                  'margin-top': '',
                  'margin-left': '',
                  'z-index':'',
                },
              },
              {
                type:'text',
                title:'正文',
                active:false,
                initStyle:{
                  'font-size': '14px','text-align': 'center','font-family':'MicrosoftYaHei','color':'#fff'
                },
                style: {
                  'position': 'absolute',
                  'top': '50%',
                  'left': '50%',
                  'bottom': '',
                  'right': '',
                  'font-size': '14px',
                  'cursor': 'move',
                  '-moz-user-select': 'none',
                  '-webkit-user-select': 'none',
                  'width': '80%',
                  'height':'',
                  'font-family': 'Microsoft YaHei',
                  'box-sizing': 'border-box',
                  'color': 'black',
                  'transform': '',
                  'rotate': '0deg',
                  'rotate_r': '120px',
                  'opacity': 1,
                  'text-align': 'center',
                  'font-weight': '',
                  'font-style': '',
                  'text-decoration': 'none',
                  'margin-top': '',
                  'margin-left': '',
                  'z-index':'',
                },
              },
            ]
          }
        },
        methods:{
          showMaterial(index){
            this.activeIndex = index
          },
          change_bgTab(){
            this.activite_BgTab = !this.activite_BgTab
          }
        }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base";
  #h5_container{
    width: 100%;
    height: 100%;
    #h5_header{
      width: 100%;
      height: 48px;
      line-height: 48px;
      background-image: linear-gradient(90deg, #00c4cd 0%, #6458aa 100%);
      color: #fff;
      box-sizing: border-box;
      padding: 0 20px 0 20px;
      .left,.middle,.right{
        float: left;
      }
      .left{
        width: 30%;
        i{
          cursor: pointer;
        }
      }
      .middle{
        width: 40%;
        text-align: center;
      }
      .right{
        width: 30%;
        text-align: right;
        .save{
          display: inline-block;
          cursor: pointer;
          margin-right: 18px;
          i{
            width: 14px;
            height: 14px;
            color: #fff;
          }
        }
        .review{
          display: inline-block;
          cursor: pointer;
          i{
            width: 14px;
            height: 14px;
            color: #fff;
          }
        }
      }
    }
    #editWrap{
      width: 100%;
      height: calc(100vh - 48px);
      .left_tab,.materialWrap,.content{
        float: left;
      }
      .left_tab{
        float: left;
        width: 60px;
        height: 100%;
        background: #272c33;
        .tab_item{
          width: 60px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          color: #fff;
          position: relative;
          .itemWrap{
            position: absolute;
            top: -10px;
            width: 100%;
            height: 100%;
            .top{
              width: 100%;
              height: 14px;
              text-align: center;
              margin-bottom: 5px;
            }
            .bottom{
              width: 100%;
              height: 14px;
              text-align: center;
            }
          }
        }
        .isActive{
          background: #646a74;
        }
        .tab_item:hover{
          color: $active_color !important;
          cursor: pointer;
        }
      }
      .materialWrap{
        width: 300px;
        height: 100%;
        background-color: #646a74;
        box-sizing: border-box;
        padding: 0 10px 0 10px;
        .bg{
          width: 100%;
          height: 100%;
          .bgW{
            width: 100%;
            height: 50px;
            .title1,.title2{
              display: inline-block;
              float: left;
              text-align: center;
              width: 50%;
              height: 50px;
              line-height: 50px;
              box-sizing: border-box;
              color: #fff;
              cursor: pointer;
            }
            .title1:hover{
              color:$active_color;
            }
            .title2:hover{
              color:$active_color;
            }
            .active_bgtab{
              border-bottom: 3px solid $active_color;
            }

          }
          .bg_img{
            box-sizing: border-box;
            border-top: 1px solid #052b29;
          }
        }
      }
      .content{
        width: calc(100vh - 660px);
        height: 100%;
      }
      .styleWrap{
        float: right;
        width: 300px;
        height: 100%;
        box-sizing: border-box;
        border-left: 1px solid #d7d7d7;
      }
    }
  }
</style>
