<template>
  <div id="contentWrap">
    <div class="pageContent">
      <ul class="inner">
        <li v-for="(page,index) in pages" :key="index">
          <div class="elementWrap"
               :class="{activeBorder:currentEditPageIndex ==index}"
               :style="{height:page.canvasHeight+'px'}"
               @click.stop="setEditingPage(page,index)">
            <div  v-show="audioId" class="musicWrap" @click.stop="setCurrentElement">
              <svg class="icon2" fill="#222" aria-hidden="true">
                <use :xlink:href="audioPlaying?'#icon-health-042':'#icon-health-043'"></use>
              </svg>
            </div>
            <template v-for="(element,option) in page.elements">
              <div v-if="element.type === 'bg'" @click.stop="selectedElement(element,page,index)">
                <div>
                  <img :src="element.imgSrc" alt="背景" class="bgImg" :style="{opacity:element.opacity/100}">
                </div>

              </div>
              <div @click.stop="selectedElement(element,page,index)">
                <FontElement
                  v-if="element.type === 'text'"
                  :element="element"
                  :style="elementPosition(element)"
                ></FontElement>
                <PicElement
                  v-if="element.type === 'pic'"
                  :element="element"
                  :showOperate="editorElement === element"
                  :style="{transform:'rotate('+element.transform+'deg)','z-index':element.zindex,opacity:element.opacity/100,width:element.width+'px',height:element.height+'px',top:element.top+'px',left:element.left + 'px','animation-duration':element.duration + 's','-webkit-animation-duration':element.duration + 's','animation-delay':element.delay + 's','-webkit-animation-delay':element.delay + 's'}"
                  :class="[element.playing?'animated ' + element.animatedName:'',element.loop?'infinite':'']"
                ></PicElement>
                <ShapesElement
                  v-if="element.type === 'icon'"
                  :iconKey="element.iconKey"
                  :showOperate="editorElement === element"
                  :element="element"
                  :style="{fill: element.fill,transform:'rotate('+element.transform+'deg)','z-index':element.zindex,opacity:element.opacity/100,width:element.width+'px',height:element.height+'px',top:element.top+'px',left:element.left + 'px','animation-duration':element.duration + 's','-webkit-animation-duration':element.duration + 's','animation-delay':element.delay + 's','-webkit-animation-delay':element.delay + 's'}"
                  :class="[element.playing?'animated ' + element.animatedName:'',element.loop?'infinite':'']"
                ></ShapesElement>
              </div>
            </template>
            <div class="sideIcon">
              <div v-show="index > 0" @click.stop="pageUp(pages,index)">
                <i class="el-icon-arrow-up"></i>
              </div>
              <p>{{index+1}}</p>
              <div v-show="index < totalPageNumber-1" @click.stop="pageDown(pages,index)">
                <i class="el-icon-arrow-down"></i>
              </div>
              <div @click.stop="copyPage(pages,page,index)">
                <i class="el-icon-copy-document"></i>
              </div>
              <div  @click.stop="deletePage(page)" v-show="totalPageNumber -1 > 0">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </li>
        <div class="addPage" @click="addPage(pages)">
          <i class="el-icon-plus"></i>
          <span>新页面</span>
        </div>
      </ul>
    </div>

  </div>
</template>

<script>
  import FontElement from './Element/FontElement'
  import PicElement from './Element/PicElement'
  import ShapesElement from './Element/ShapesElement'
  import '../../assets/js/editorIconfont'
  import 'animate.css'
  export default {
    props:{
      editorElement:{
        type:Object,
        default:function () {
          return {}
        }
      }
    },
    name: "contentView",
    data(){
      return{
        currentEditPageIndex:0
      }
    },
    mounted(){
      /*var el = document.getElementById('contentWrap')
      el.addEventListener('scroll',function () {
      })*/
    },
    methods:{
      setCurrentElement(){
        let element = {
          type:'music'
        }
        this.$store.dispatch('setEditorElement', element);
      },
      //设置正在编辑的元素及页面
      setEditingPage(page,index){
        this.currentEditPageIndex = index
        this.$store.dispatch('setEditorPage',page)
        let element = {};
        element.type = 'bg';
        this.$store.dispatch('setEditorElement', element)
      },
      //设置正在编辑的元素及页面
      selectedElement(element,page,index){
        this.currentEditPageIndex = index
        this.$store.dispatch('setEditorElement',element)
        this.$store.dispatch('setEditorPage',page)
      },
      //添加页面
      addPage(pages){
        if(this.totalPageNumber >= 10){
          this.$message({
            showClose: true,
            message: '最多可创建10页！',
            type: 'warning',
            duration: 1500
          });
          return false
        }else{
          this.$store.dispatch('addPage')
          this.currentEditPageIndex = this.totalPageNumber - 1
          let newPage = pages[this.currentEditPageIndex]
          this.$store.dispatch('setEditorPage',newPage)
          this.setScrollTop(pages)
        }
      },
      //删除页面
      deletePage(index){
        //只有一页时，不可删除
        if(this.totalPageNumber == 1){
          this.$message({
            showClose: true,
            message: '至少创建一页！',
            type: 'warning',
            duration: 1500
          });
         return false
        }else{
          this.$confirm('确定删除该页面吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('delPage',index)
            this.currentEditPageIndex = this.totalPageNumber -1
            var currentPage = this.pages[this.currentEditPageIndex]
            //最后一页，没有元素
            if(currentPage.elements.length === 0){
              this.$store.dispatch('setEditorElement',{})
              this.$store.dispatch('setEditorPage',currentPage)
            }else{
              //有元素是否有背景
              var result = currentPage.elements.find((value) =>{
                return value.type === 'bg'
              })
              if(result === 'undefined'){
                this.$store.dispatch('setEditorElement',{})
                this.$store.dispatch('setEditorPage',currentPage)
              }else{
                this.$store.dispatch('setEditorElement',result)
                this.$store.dispatch('setEditorPage',currentPage)
              }
            }


          }).catch(() => {

          });
        }
      },
      //上一页
      pageUp(pages,index){
        this.currentEditPageIndex = index - 1
        console.log(this.currentEditPageIndex)
        this.$store.dispatch('setEditorPage',pages[this.currentEditPageIndex])
        var elements = pages[this.currentEditPageIndex].elements
        var element= elements.find(ele =>{
          return ele.type == 'bg'
        })
        if(element){
          this.$store.dispatch('setEditorElement',element)
        }else{
          this.$store.dispatch('setEditorElement',{})
        }
        let pageNum = pages.slice(0,index - 1)
        this.setScrollTop(pageNum)
      },
      //下一页
      pageDown(pages,index){
        this.currentEditPageIndex = index + 1
        console.log(this.currentEditPageIndex)
        this.$store.dispatch('setEditorPage',pages[this.currentEditPageIndex])
        var elements = pages[this.currentEditPageIndex].elements
        var element= elements.find(ele =>{
          return ele.type == 'bg'
        })
        if(element){
          this.$store.dispatch('setEditorElement',element)
        }else{
          this.$store.dispatch('setEditorElement',{})
        }
        let pageNum = pages.slice(0,index + 1)
        this.setScrollTop(pageNum)
      },
      //复制
      copyPage(pages,page,index){
        this.currentEditPageIndex = index + 1
        this.$store.dispatch('copyPage',{page,index})
        this.$store.dispatch('setEditorPage',pages[this.currentEditPageIndex])
        let pageNum = pages.slice(0,index + 1)
        this.setScrollTop(pageNum)
      },
      //设置滚动条高度
      setScrollTop(pageList){
        var top = 0
        pageList.forEach(page =>{
          var pageHeight = page.canvasHeight + 20
          top += pageHeight
        })
        setTimeout(function () {
          document.getElementById('contentWrap').scrollTop = top
        }, 400)
      },

    },
    computed: {
      elementPosition(ele) {
        return (ele) => {
          return {
            zIndex: ele['zindex'],
            top: ele['top'] + 'px',
            left: ele['left'] + 'px'
          }
        }
      },
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
      layers() {
        return this.editingPage['elements']
      },
      layersNoBg() {
        return this.layers && this.layers.filter(v => v['type'] !== 'bg').reverse()
      },
      layersBg() {
        return this.layers && this.layers.filter(v => v['type'] === 'bg')
      },
      editingLayer() {
        return this.vxEditor['editorElement']
      },
      audioUrl(){
        return this.vxEditor['editorTheme']['audioUrl']
      },
      audioPlaying(){
        return this.vxEditor['editorTheme']['audioPlaying']
      },
      audioId(){
        return this.vxEditor['editorTheme']['audioId']
      }
    },
    components:{
      FontElement,
      PicElement,
      ShapesElement
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base";
  #contentWrap{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 40px;
    overflow-y: auto;
    .pageContent{
      width: 100%;
      height: 100%;
      .inner{
        width: 100%;
        height: 100%;
        li{
          .elementWrap{
            position: relative;
            width: 375px;
            background: #fff;
            box-sizing: border-box;
            margin: 0 auto 20px;
            .bgImg{
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
            }
            .musicWrap{
              position: absolute;
              top: 30px;
              right: 30px;
              width: 36px;
              height: 36px;
              z-index: 1000;
              cursor: pointer;
              svg{
                width: 100%;
                height: 100%;
              }
            }
          }
          .sideIcon{
            position: absolute;
            left: -25px;
            top: 50%;
            transform: translateY(-50%);
            width: 15px;
            height: 110px;
            text-align: center;
            i,p{
              cursor: pointer;
            }

          }
        }
        .activeBorder{
          border: 1px solid $active_color;
        }
      }

    }
    .addPage{
      width: 375px;
      height: 40px;
      box-sizing: border-box;
      line-height: 40px;
      text-align: center;
      background:rgba(255,255,255,1);
      border:1px solid rgba(41,147,153,1);
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(41,147,153,1);
      margin: 20px auto;
      cursor: pointer;
      z-index: 1000;
    }
  }
</style>
