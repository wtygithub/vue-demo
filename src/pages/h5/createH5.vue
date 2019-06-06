<template>
  <div id="h5_container" class="editor">
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
      <!--侧导航-->
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
      <!--添加元素区域-->
      <div class="materialWrap">
        <bgList v-show="activeIndex==0"></bgList>
        <testList v-show="activeIndex==1"></testList>
        <materialList v-show="activeIndex==2"></materialList>
        <imageList v-show="activeIndex==3"></imageList>
        <musicList v-show="activeIndex==4"></musicList>
      </div>
      <!--展示区域-->
      <div class="contentWrap">
        <contentComponent :editorElement="element"></contentComponent>
      </div>
      <!--设置样式区域-->
      <div class="styleWrap">
        <!--背景设置-->
        <div class="bgSet" v-if="panelTabState === 0">
          <div class="tabWrap">
            <div class="lef" :class="{activeTab:currentPropertyTab === 1}" @click="currentPropertyTab = 1">背景设置</div>
            <div class="rig" :class="{activeTab:currentPropertyTab === 2}" @click="currentPropertyTab = 2">图层</div>
          </div>
          <bgSet :element="element" v-show="currentPropertyTab === 1"></bgSet>
          <layer v-show="currentPropertyTab === 2"></layer>
        </div>
        <!--文本设置-->
        <div class="textSetWrap"  v-if="panelTabState === 1">
          <div class="textTab">
            <div class="lef" :class="{activeTab1:currentPropertyTab === 1}" @click="currentPropertyTab = 1">文本设置</div>
            <div class="mid" :class="{activeTab1:currentPropertyTab === 2}" @click="currentPropertyTab = 2">动效设置</div>
            <div class="rig" :class="{activeTab1:currentPropertyTab === 3}" @click="currentPropertyTab = 3">图层</div>
          </div>
          <textSet :element="element" v-show="currentPropertyTab === 1"></textSet>
          <animationSet :element="element" v-show="currentPropertyTab === 2"></animationSet>
          <layer v-show="currentPropertyTab === 3"></layer>
        </div>
        <!--形状设置-->
        <div class="textSetWrap"  v-if="panelTabState === 2">
          <div class="textTab">
            <div class="lef" :class="{activeTab1:currentPropertyTab === 1}" @click="currentPropertyTab = 1">形状设置</div>
            <div class="mid" :class="{activeTab1:currentPropertyTab === 2}" @click="currentPropertyTab = 2">动效设置</div>
            <div class="rig" :class="{activeTab1:currentPropertyTab === 3}" @click="currentPropertyTab = 3">图层</div>
          </div>
          <shapeSet :element="element" v-show="currentPropertyTab === 1"></shapeSet>
          <animationSet :element="element" v-show="currentPropertyTab === 2"></animationSet>
          <layer v-show="currentPropertyTab === 3"></layer>
        </div>
        <!--图片设置-->
        <div class="textSetWrap"  v-if="panelTabState === 3">
          <div class="textTab">
            <div class="lef" :class="{activeTab1:currentPropertyTab === 1}" @click="currentPropertyTab = 1">图片设置</div>
            <div class="mid" :class="{activeTab1:currentPropertyTab === 2}" @click="currentPropertyTab = 2">动效设置</div>
            <div class="rig" :class="{activeTab1:currentPropertyTab === 3}" @click="currentPropertyTab = 3">图层</div>
          </div>
          <imageSet :element="element" v-show="currentPropertyTab === 1"></imageSet>
          <animationSet :element="element" v-show="currentPropertyTab === 2"></animationSet>
          <layer v-show="currentPropertyTab === 3"></layer>
        </div>
        <!--音乐设置-->
        <div class="bgSet" v-if="panelTabState === 4">
          <div class="tabWrap">
            <div class="lef" :class="{activeTab:currentPropertyTab === 1}" @click="currentPropertyTab = 1">音乐设置</div>
            <div class="rig" :class="{activeTab:currentPropertyTab === 2}" @click="currentPropertyTab = 2">图层</div>
          </div>
          <musicSet v-show="currentPropertyTab === 1"></musicSet>
          <layer v-show="currentPropertyTab === 2"></layer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import bgList from './bgList'
    import testList from './testList'
    import materialList from './materialList'
    import musicList from './musicList'
    import imageList from './imageList'
    import contentComponent from './contentView'//中间编辑区域
    import bgSet from './bgSet'//背景设置
    import textSet from './testSet'//文本设置
    import shapeSet from './materialSet'//素材设置
    import imageSet from './imageSet'//图片设置
    import animationSet from './animationSet'//动效设置
    import layer from './layerView'//图层设置
    import musicSet from './musicSet'//音乐设置
    import '../../assets/js/editorIconfont'
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
            activeName:'first',
            activeBgTab:true,//背景设置tab
            panelTabState:0,
            currentPropertyTab:1,
          }
        },
        mounted() {
          this.$store.dispatch('createTheme')
          /*初始化页面*/
          this.$store.dispatch('addPage')
          document.addEventListener('keyup', this.deleteListener)
        },
        destroyed(){
          document.removeEventListener('keyup',this.deleteListener)
        },
        methods:{
          showMaterial(index){
            this.activeIndex = index
          },
          changeBgTab(){
            this.activeBgTab = !this.activeBgTab
          },
          //删除元素
          deleteListener(event){
            if(event.keyCode === 8 && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA'){
              this.$store.dispatch('deleteSelectedElement')
            }
            if(event.keyCode === 46 && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA'){
              this.$store.dispatch('deleteSelectedElement')
            }
          }
        },
        computed:{
          //正在编辑的元素
          element(){
            let element = this.$store.state.editor.editorElement
            return  element || {}
          }
        },
        watch:{
          //正在编辑的元素
          element() {
            let ele = this.$store.state.editor.editorElement
            let type = ele ? ele.type : 'null'
            this.panelTabState = 0
            this.currentPropertyTab = 1;
            switch (type) {
              case 'bg':
                this.panelTabState = 0
                break
              case 'text':
                this.panelTabState = 1
                break
              case 'icon':
                this.panelTabState = 2
                break
              case 'pic':
                this.panelTabState = 3
                break
              case 'music':
                this.panelTabState = 4
                break
            }
          },
        },
        components:{
          bgList,
          testList,
          materialList,
          musicList,
          imageList,
          contentComponent,
          bgSet,
          textSet,
          shapeSet,
          imageSet,
          animationSet,
          layer,
          musicSet
        }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base";
  #h5_container{
    width: 100%;
    height: 100%;
    overflow: hidden;
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
      .left_tab,.materialWrap,.contentWrap{
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
      .contentWrap{
        width: calc(100% - 660px);
        height: 100%;
        background: #efefef;
      }
      .styleWrap{
        float: right;
        width: 300px;
        height: 100%;
        box-sizing: border-box;
        border-left: 1px solid #d7d7d7;
        /*背景设置*/
        .bgSet{
          width: 100%;
          height: 100%;
          .tabWrap{
            display: flex;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(153,153,153,1);
            text-align: center;
            .lef,.rig{
              width: 50%;
              height: 100%;
              border-bottom: 1px solid #CCCCCC;
              cursor: pointer;
            }
            .activeTab{
              color: $active_color;
              border-bottom: 1px solid $active_color;
            }
          }
        }
        /*文本设置*/
        .textSetWrap{
          width: 100%;
          height: 100%;
          .textTab{
            display: flex;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(153,153,153,1);
            text-align: center;
            .lef,.mid,.rig{
              width: 33.33%;
              height: 100%;
              border-bottom: 1px solid #CCCCCC;
              cursor: pointer;
            }
            .activeTab1{
              color: $active_color;
              border-bottom: 1px solid $active_color;
            }
          }
        }
      }
    }
  }
</style>
