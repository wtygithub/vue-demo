<template>
    <div class="materWrap">
      <headerTop :headerTit="title"></headerTop>
      <div id="shape_List" class="sidebar_style">
        <div class="shape_list_content">
          <ul class="shape_list_ul">
            <li class="shape_list_li" @click="addIcon('icon-health-901','#f55747')">
              <svg class="shape" fill="#f55747" aria-hidden="true">
                <use xlink:href="#icon-health-901"></use>
              </svg>
            </li>
            <li class="shape_list_li" @click="addIcon('icon-health-902','#ffac62')">
              <svg class="shape" fill="#ffac62" aria-hidden="true">
                <use xlink:href="#icon-health-902"></use>
              </svg>
            </li>
            <li class="shape_list_li" @click="addIcon('icon-health-904','#b1d21b')">
              <svg class="shape" fill="#b1d21b" aria-hidden="true">
                <use xlink:href="#icon-health-904"></use>
              </svg>
            </li>
            <li class="shape_list_li" @click="addIcon('icon-health-039','#00bbe2')">
              <svg class="shape" fill="#00bbe2" aria-hidden="true">
                <use xlink:href="#icon-health-039"></use>
              </svg>
            </li>
            <li class="shape_list_li" @click="addIcon('icon-xingbiao','#ff92b0')">
              <svg class="shape" fill="#ff92b0" aria-hidden="true">
                <use xlink:href="#icon-xingbiao"></use>
              </svg>
            </li>
            <li class="shape_list_li" @click="addIcon('icon-health-903','#48c4c4')">
              <svg class="shape" fill="#48c4c4" aria-hidden="true">
                <use xlink:href="#icon-health-903"></use>
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import headerTop from './headerTop'
  import '../../assets/js/editorIconfont'
    export default {
      name: "materialList",
      data(){
        return{
          title:'素材'
        }
      },
      methods:{
        addIcon (iconKey,color) {
          let obj = {}
          obj.type = 'icon'
          obj.iconKey = iconKey
          obj.top = 0
          obj.left = 0
          obj.width = 80
          obj.height = 80
          obj.fill = color
          this.$store.dispatch('addElement', obj)
        }
      },
      components:{
        headerTop,
      }
    }
</script>

<style scoped lang="scss">
  .materWrap{
    width: 100%;
    height: 100%;
    .sidebar_style{
      padding: 20px 20px 0;
      .sidebar_style_title{
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        color: #299399;
        text-align: left;
        border-bottom: solid 1px #299399;
        box-sizing: border-box;
        margin-bottom: 20px;
      }
    }
    #shape_List{
      .shape {
        width: 80px;
        height: 80px;
      }
      .shape_list_content{
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        ul.shape_list_ul{
          width: 100%;
          margin: 0;
          padding: 0;
          li.shape_list_li{
            width: 80px;
            height: 80px;
            display: inline-block;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
