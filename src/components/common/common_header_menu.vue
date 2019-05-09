<template>
  <div id="containerWrap">
    <div class="topHeader">Social CRM</div>
    <div class="contentWrap">
      <div class="left">
        <div class="menuW">
          <div v-for="(item,index) in menulist" :key="item.id">
            <div class="parentMenu" :class="{activeParent:item.isActive}" @click="showSubItem(index)">
              <i :class="item.icon" ></i>
              <span class="title">{{item.title}}</span>
              <i class="el-icon-arrow-down icon1" v-show="!item.isExpand"></i>
              <i class="el-icon-arrow-up icon1" v-show="item.isExpand"></i>
            </div>
            <div class="subMenu" v-show="item.isExpand">
              <div class="subItem" v-for="(options,itemIndex) in item.subItem" :key="options.subId" :class="{active:options.activite}" @click="activeItem(index,itemIndex)">
                {{options.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        flag:0,
        menulist:[
          {
            title:'营销工具',
            isActive:false,
            isExpand:false,
            icon:'el-icon-location-outline',
            id:1,
            subItem:[
              {
                name:'活动制作',
                activite:false,
                path:'/home',
                subId:1.1
              },
              {
                name:'活动管理',
                activite:false,
                path:'/manageActivity',
                subId:1.2
              },
            ]
          },
          {
            title:'问卷系统',
            icon:'el-icon-edit-outline',
            isActive:false,
            isExpand:false,
            id:2,
            subItem:[
              {
                name:'题库',
                activite:false,
                path:'/questionBank',
                subId:2.1
              },
              {
                name:'问卷管理',
                path:'/questionManage',
                activite:false,
                subId:2.2
              },
            ]
          },
        ]
      }
    },
    created(){
      //alert(sessionStorage.routerPath)
      console.log(sessionStorage.routerPath)
      if(!sessionStorage.routerPath){
        //alert('11')
        sessionStorage.setItem('routerPath','/home')
      }
      if(sessionStorage.routerPath){
        for(var i=0;i< this.menulist.length;i++){
          this.menulist[i].isExpand = false;
          this.menulist[i].isActive = false;
          for(var j=0;j<this.menulist[i].subItem.length;j++){
            this.menulist[i].subItem[j].activite = false;
            if(this.menulist[i].subItem[j].path == sessionStorage.getItem('routerPath')){
              this.menulist[i].isActive = true;
              this.menulist[i].isExpand = true;
              this.menulist[i].subItem[j].activite = true;

            }
          }
        }
      }
      console.log(this.menulist)
    },
    methods:{

      showSubItem(index){
        for(var j=0;j<this.menulist.length;j++){
          if(j == index){
            if(this.menulist[index].isExpand){
              this.menulist[index].isExpand = false
            }else{
              this.menulist[index].isExpand = true
            }
          }else{
            this.menulist[j].isExpand = false
            for(var i =0;i<this.menulist[j].subItem.length;i++){
              this.menulist[j].subItem[i].activite = false;
            }
          }

        }
      },
      activeItem(index1,index2){
        var parentSubItem = (this.menulist[index1]).subItem;
        for(var i = 0;i<parentSubItem.length;i++){
          parentSubItem[i].activite = false
        }
        this.$store.commit('setkeepAlive','mainRoute')
        console.log(this.$store.state.keepList)
        this.menulist[index1].subItem[index2].activite = true;
        var url = parentSubItem[index2].path

        sessionStorage.routerPath = url;

        setTimeout(()=>{
          this.$router.push(''+ url)
        },100)

      }
    },
    components:{

    }
  }
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  @import "../../assets/css/base";
  #containerWrap{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 50px;
    .topHeader{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background: $backgroud_color;
      //background:linear-gradient(180deg,$backgroud_color 0%,$backgroud_color 100%);
      text-align: center;
      line-height: 50px;
      z-index: 100;
      color: #fff;
    }
    .contentWrap{
      width: 100%;
      height: 100%;
      overflow: hidden;
      .left{
        float: left;
        width: 180px;
        height: 100%;
        background:rgba(255,255,255,1);
        .menuW{
          width: 100%;
          height: 100%;
          .parentMenu{
            width: 100%;
            height: 38px;
            background:rgba(255,255,255,1);
            box-sizing: border-box;
            padding: 0 18px;
            line-height: 38px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            cursor: pointer;
            .title{
              display: inline-block;
              margin: 0 10px 0 0px;
              width: 90px;
              height: 100%;
            }
            .icon1{
              cursor: pointer;
            }
          }
          .parentMenu:hover{
            color:$active_text_color;
          }
          .subMenu{
            width: 100%;
            font-size:12px;
            font-family:MicrosoftYaHei;
            .subItem{
              width: 100%;
              height: 38px;
              line-height: 38px;
              box-sizing: border-box;
              padding-left: 40px;
              background:rgba(242,245,246,1);
              cursor: pointer;
            }
            .subItem:hover{
              color:$active_text_color;
            }
            .active{
              background:$hover_tab_color;
              color:$active_text_color !important;
            }
          }
        }
      }
      .right{
        float: left;
        width: calc(100% - 180px);
        height: 100%;
        background: lightgrey;
      }
    }
  }

</style>
