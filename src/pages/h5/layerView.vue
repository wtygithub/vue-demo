<template>
  <div>
    <div class="overview">
      <div class="list custom-scrollbar" style="z-index: 2;" v-show="viewState === 1"
           :class="{ dragging: dragState === 1 }">
        <div v-if="audioId" class="layer noDragLayer" :class="{ active:element && element.type === 'music'}"
             @click="setMusicEditting()">
          <span class="thumb">
           <svg class="smallIcon" fill="#229399" aria-hidden="true">
              <use xlink:href="#icon-health-009"></use>
           </svg>
           <svg class="smallIcon icon_type" fill="#229399" aria-hidden="true">
              <use xlink:href="#icon-health-006"></use>
           </svg>
          </span>音乐
          <span class="rightThumb">
            <svg class="smallIcon icon_type" fill="#229399" aria-hidden="true">
              <use xlink:href="#icon-jiankangyunmima"></use>
            </svg>
          </span>
        </div>
        <ul>
          <li v-for="(layer, index) in layersNoBg" :key="index">
            <!--<div class="layer" :class="{ active: editingLayer === layer}"
                 @click="setEditingLayer($event, layer)"
                 @mousedown="moveLayer">-->
            <div :id="'layer'+index" class="layer" :class="{ active: editingLayer === layer}"
                 @click="setEditingLayer($event, layer)"
                 @mousedown="moveLayer($event, index)"
                >
              <span class="thumb" >
                <svg class="smallIcon" fill="#229399" aria-hidden="true" v-if="layer.isShowElement" @click.stop="layer.isShowElement = false">>
                  <use xlink:href="#icon-health-009"></use>
                </svg>
                <svg class="smallIcon" fill="#229399" aria-hidden="true" v-if="!layer.isShowElement" @click.stop="layer.isShowElement = true">
                  <use xlink:href="#icon-health-010"></use>
                </svg>
                <svg class="smallIcon icon_type" fill="#229399" aria-hidden="true" v-if="layer.type=='text'">
                  <use xlink:href="#icon-health-003"></use>
                </svg>
                <svg class="smallIcon icon_type" fill="#229399" aria-hidden="true" v-if="layer.type=='icon'">
                  <use xlink:href="#icon-health-004"></use>
                </svg>
                <svg class="smallIcon icon_type" fill="#229399" aria-hidden="true" v-if="layer.type=='pic'">
                  <use xlink:href="#icon-health-005"></use>
                </svg>
              </span>{{`${layer.type=='text'?'文本':''}${layer.type=='icon'?'素材':''}${layer.type=='pic'?'图片':''}` }}
              <span class="rightThumb">
                <svg class="smallIcon" fill="#229399" aria-hidden="true">
                  <use xlink:href="#icon-health-044"></use>
                </svg>
              </span>
            </div>
          </li>
        </ul>
        <div v-for="layer in layersBg" class="layer noDragLayer" :class="{ active: editingLayer === layer}"
             @click="setEditingLayer($event, layer)">
          <span class="thumb">
             <svg class="smallIcon" fill="#229399" aria-hidden="true">
               <use xlink:href="#icon-health-009"></use>
             </svg>
             <svg class="smallIcon icon_type" fill="#229399" aria-hidden="true">
               <use xlink:href="#icon-health-002"></use>
             </svg>
          </span>{{`${layer.type=='bg'?'背景':''}`}}
          <span class="rightThumb">
            <svg class="smallIcon icon_type" fill="#229399" aria-hidden="true">
               <use xlink:href="#icon-jiankangyunmima"></use>
             </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        viewState: 1,
        dragState: 0,
        canvasWidth: 375,
        canvasHeight: 603
      }
    },
    computed: {
      vxEditor() {
        return this.$store.state['editor']
      },
      pages() {
        return this.vxEditor['editorTheme']['pages']
      },
      editingPage() {
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
      audioId() {
        return this.$store.state.editor.editorTheme.audioId
      },
      element() {
        return this.$store.state.editor.editorElement
      }
    },
    methods: {
      moveLayer(downEvent, index) {
        let height = 35.8
        let timer = null
        // let layer = downEvent.target// 点击空白的时候  这个layer 是div； 点击图标的时候 这个layer是span或者i
        let layer = document.querySelector('#layer'+index);
        let li = layer.parentNode
        let parent = li.parentNode
        let liLen = parent.childNodes.length
        let startTop = li.offsetTop
        let startIndex = this.audioId ? Math.round(startTop / height) - 1 : Math.round(startTop / height)
        let targetIndex = null
        let placeholder = document.createElement('li')
        placeholder.style = 'height: ' + height + 'px; background-color: #d6d6d6'
        let move = (moveEvent) => {
          if (!timer) {
            // 被拖动的层
            let top = moveEvent.clientY - downEvent.clientY + startTop
            layer.setAttribute('data-moving', true)
            layer.style.top = top + 'px'
            this.dragState = 1
            // 占位层
            let nowIndex = this.audioId ? Math.round(top / height) - 1 : Math.round(top / height)
            nowIndex = nowIndex <= 0 ? 0 : nowIndex > liLen - 1 ? liLen - 1 : nowIndex
            if (targetIndex !== nowIndex) {
              (targetIndex || targetIndex === 0) && parent.removeChild(placeholder)
              targetIndex = nowIndex
              parent.insertBefore(placeholder, parent.childNodes[nowIndex + (startIndex >= targetIndex ? 0 : 1)])
            }
            // timer负责减少onmousemove对客户端的负担
            timer = setTimeout(() => {
              timer = null
            }, 40)
          }
        }
        let up = (upEvent) => {
          if (layer.getAttribute('data-moving')) {
            layer.removeAttribute('data-moving')
            layer.style.top = ''
            parent.removeChild(placeholder)
            this.layersNoBg[startIndex]['zindex'] = this.layersNoBg[targetIndex]['zindex'] + (targetIndex > startIndex ? -0.5 : 0.5)
            this.updateLayersSort()
          }
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', up)
          this.dragState = 0
        }
        if (liLen > 1) {
          document.addEventListener('mousemove', move)
          document.addEventListener('mouseup', up)
        }
      },
      addPage() {
        this.$store.dispatch('addPage')
      },
      setEditingPage(page) {
        this.$store.dispatch('setEditorPage', page)
      },
      setMusicEditting() {
        let element = {
          type: 'music'
        }
        this.$store.dispatch('setEditorElement', element);
      },
      setEditingLayer(event, layer) {
        this.$store.dispatch('setEditorElement', layer)
      },
      updateLayersSort() {
        this.$store.dispatch('sortElementsByZindex')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .overview {
    .smallIcon{
      width: 14px;
      height: 14px;
    }
    .list {
      //position: absolute;
      width: 100%;
      top: 41px;
      bottom: 0px;
      padding-bottom: 50px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .dragging:before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
    }
    .page {
      position: relative;
      border-color: transparent;
      border-style: solid;
      border-width: 4px 4px 30px;
      margin: 10px;
      &.active {
        border-color:#00c4cd;
        .icons {
          display: block;
        }
      }
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 2;
      }
      .content {
        transform-origin: left top;
        background-color: #fff;
        overflow: hidden;
        position: relative;
      }
      .icons {
        position: absolute;
        bottom: -1.5em;
        right: 0.5em;
        display: none;
        width: 100%;
        color: #fff;
        .icon {
          float: right;
          margin-left: 1em;
          opacity: 0.5;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
    .layer {
      padding-left: 20px;
      height: 35px;
      line-height: 35px;
      border-bottom: 1px solid #d6d6d6;
      text-align: left;
      cursor: pointer;
      font-size: 14px;
      color: #333333;
      &[data-moving] {
        background-color: #d6d6d6;
        position: absolute;
        width: 100%;
      }
      &:hover {
        background-color: #d6d6d6;
      }
      &.active {
        background-color: #00c4cd;
        color: #fff;
      }
      &.noDragLayer {
        color: #999999;
      }
      .thumb {
        display: inline-block;
        width: auto;
        height: 35px;
        .icon_type {
          padding: 0 10px;
        }
      }
      .rightThumb {
        display: inline-block;
        float: right;
        height: 35px;
        padding-right: 20px;
        .icon_lock_type {
          padding-right: 10px;
        }
      }
    }
  }

  .add {
    border: none;
    position: fixed;
    bottom: 0;
    height: 50px;
    line-height: 50px;
    width: 300px;
    right: 0;
    z-index: 100;
    background-color: #373f42;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }
</style>
