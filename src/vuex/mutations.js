import * as types from './mutation-type'
import Element from '../pages/h5/model/Element'

const mutations = {
  setkeepAlive(state,data){
    if(data == 'mainRoute'){ //不用缓存
      state.keepList = []
    }else{
      var arr = []  //用缓存
      for (var i =0;i<state.keepList.length;i++) {
        if(state.keepList[i] != data){
          arr.push(state.keepList[i])
        }
      }
      arr.push(data)
      state.keepList = arr
    }
  },
  [types.SET_CUR_EDITOR_ELEMENT](state, data) {
    state.editorElement = data
  },
  [types.CHANGE_OPERATING_TYPE](state, data) {
    state.currentType = data
  },
  [types.ADD_PIC_ELEMENT](state, data) {
    state.editorPage.elements.push(new Element(data))
  },
  [types.ADD_BG_ELEMENT](state, data) {
    let haveBG = false
    state.editorPage.elements.findIndex((value, index, arr) => {
      if (value.type === 'bg') {
        haveBG = true
        value.imgSrc = data.imgSrc
        value.width = data.width
        value.height = data.height
        value.opacity = data.opacity
      }
    })
    if (!haveBG) {
      state.editorPage.elements.push(new Element(data))
    }
  },
  [types.SET_CANVAS_HEIGHT](state, data) {
    state.editorPage.canvasHeight = parseInt(data);
  },
  [types.APPLY_BG_TO_OTHERS](state, data) {
    state.editorTheme.pages.forEach(page => {
      let hasBg = false;
      page.elements.forEach(element => {
        if(element.type === 'bg'){
          hasBg = true;
          element.imgSrc = data.imgSrc
          element.opacity = data.opacity
        }
      })
      if(!hasBg){
        page.elements.push(new Element(data));
      }
    })
  },
  [types.SET_CANVAS_TYPE](state, data) {
    state.editorPage.canvasType = data;
  },
  [types.SET_BG_MUSIC](state, data) {
    state.editorTheme.audioUrl = data.audioUrl;
    state.editorTheme.audioName = data.audioName;
    state.editorTheme.audioPlaying = data.audioPlaying;
    state.editorTheme.audioId = data.audioId;
  },
  [types.CHANGE_AUDIO_PLAYING_STATE](state, data) {
    state.editorTheme.audioPlaying = data;
  },
  // 播放动画
  [types.PLAY_ANIMATE](state) {
    let elements = state.editorPage.elements
    let editingElement = state.editorElement
    if (editingElement && editingElement.animatedName) {
      // 如存在有动画的选择元素
      editingElement.playing = true
    } else if (!editingElement) {
      // 不存在被选择的元素
      elements.forEach(v => {
        v.playing = true
      })
    }
  },
  // 停止播放动画
  [types.STOP_ANIMATE](state, data) {
    if (data instanceof Array) {
      // 该页元素
      data.forEach(v => {
        v['playing'] = false
      })
    } else if (data instanceof Object) {
      // 单个元素
      data['playing'] = false
    } else {
      // 不传参情况
      state['editorPage']['elements'].forEach(v => {
        v['playing'] = false
      })
    }
  },
  [types.ADD_PAGE](state, page) {
    state.editorTheme.pages.push(page)
  },
  [types.COPY_PAGE](state, data) {
    console.log(data.page)
    state.editorTheme.pages.splice(data.index+1, 0, data.page)
  },
  [types.DELETE_PAGE](state, data) {
    state.editorTheme.pages.findIndex((value, index, arr) => {
      if (value === data) {
        state.editorTheme.pages.splice(index, 1)
      }
    })
  },
  [types.SET_CUR_EDITOR_PAGE](state, data) {
    state.editorPage = data
  },
  [types.SET_COPY_EDITOR_PAGE](state, data) {
    state.editorPage = data.page
  },
  [types.GET_USER_THEME_LIST](state, data) {
    state.themeList = data
  },
  [types.SET_CUR_EDITOR_THEME](state, data) {
    state.editorTheme = data
  },
  [types.UPDATE_THEME_DES](state, {title, description, canvasHeight}) {
    state.editorTheme.title = title
    state.editorTheme.description = description
    state.editorTheme.canvasHeight = canvasHeight
  },
  [types.DELETE_ELEMENT](state, data) {
    state.editorPage.elements.findIndex((value, index, arr) => {
      if (value === data) {
        state.editorPage.elements.splice(index, 1)
        // state.editorElement = null
      }
    })
    let currentPageHasBg = false;
    state.editorPage.elements.forEach(element => {
      if(element.type === 'bg'){
        currentPageHasBg = true;
        state.editorElement = element;
      }
    })
    if(!currentPageHasBg){
      let element = {};
      element.type = 'bg';
      state.editorElement = element;
    }
  },
  [types.CREATE_THEME](state, data) {
    state.themeList.push(data)
  },
  [types.ADD_THEME_SUCCESS](state, data) {
    state.editorTheme._id = data._id
  },
  [types.UPDATE_THEME_SUCCESS](state, data) {
  },
  [types.GET_PAGE_THEMEID](state, data) {
    state.editorPage = data
  },
  [types.CLEAN_BG](state) {
    state.editorPage.elements.findIndex((value, index, arr) => {
      if (value && value.type === 'bg') {
        state.editorPage.elements.splice(index, 1)
      }
    })
  },
  [types.CLEAN_ELE](state, ele) {
    state.editorPage.elements.splice(state.editorPage.elements.indexOf(ele), 1)
  },
  [types.FETCH_PIC_LIST](state, picList) {
    state.picList = picList
  },
  [types.FETCH_VIDEO_LIST](state, videoList) {
    state.videoList = videoList
  },
  [types.PUSH_PIC_LIST](state, ele) {
    state.picList.push(ele)
  },
  [types.PUSH_BG_PIC_LIST](state, ele) {
    state.bgImageList.push(ele)
  },
  [types.PUSH_VIDEO_LIST](state, ele) {
    state.videoList.push(ele)
  },
  [types.CLEAN_PIC_LIST](state) {
    state.picList = []
  },
  // [types.SORTELEMENTS] (state, data) {
  //   let element = state.editorPage.elements[data.start]
  //   let end = parseInt(data.end)
  //   if (end !== -1) {
  //     state.editorPage.elements.splice(data.start, 1)
  //     if (end >= state.editorPage.elements.length) {
  //       state.editorPage.elements.push(element)
  //     } else {
  //       state.editorPage.elements.splice(end, 0, element)
  //     }
  //     state.editorPage.elements.map((value, index, arr) => {
  //       value.zindex = index + 1
  //     })
  //   }
  // },
  [types.DELETE_THEME](state, data) {
    state.themeList.findIndex((value, index, arr) => {
      if (value === data) {
        state.themeList.splice(index, 1)
      }
    })
  },
  [types.SORTELEMENTS_BY_ZINDEX](state, data) {
    state.editorPage.elements.sort((a, b) => a['zindex'] - b['zindex'])
    state.editorPage.elements.forEach((v, i, arr) => {
      arr[i]['zindex'] = i + 1
    })
  },
  [types.SET_THEME_ID](state, data) {
    state.editorTheme.themeId=data;
  },
  [types.SET_COVER_IMG](state, data) {
    state.editorTheme.coverImage=data;
  }
}

export default mutations

