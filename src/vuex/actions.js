import * as types from './mutation-type'
import Element from '../pages/h5/model/Element'
import Page from '../pages/h5/model/Page'
import Theme from '../pages/h5/model/Theme'
import tools from '../pages/h5/util/tools'

/**
 * 创建场景主题
 * @param commit
 */

export const createTheme = ({commit}, type) => {
  var theme = new Theme({type: type})
  commit(types.CREATE_THEME, theme)
  commit(types.SET_CUR_EDITOR_THEME, theme)
}

/**
 * 设置当前编辑的主题
 */
export const setEditorTheme = ({commit}, theme) => {
  var newTheme = new Theme(theme)
  commit(types.SET_CUR_EDITOR_THEME, newTheme)
}

/**
 * 设置当前正在编辑的页面
 * @param commit
 * @param page
 */
export const setEditorPage = ({commit}, page) => {
  commit(types.SET_CUR_EDITOR_PAGE, page)
}

/**
 * 给主题添加页面
 * @param commit
 */
export const addPage = ({commit}) => {
  var page = new Page()
  commit(types.ADD_PAGE, page)
  commit(types.SET_CUR_EDITOR_PAGE, page)
  commit(types.SET_CUR_EDITOR_ELEMENT,new Element({}))
}

/**
 * 更改页面高度
 * @param commit
 */
export const setCanvasHeight = ({commit}, data) => {
  commit(types.SET_CANVAS_HEIGHT, data)
}

/**
 * 更改页面高度
 * @param commit
 */
export const applyBgToOthers = ({commit}, data) => {
  commit(types.APPLY_BG_TO_OTHERS, data)
}

/**
 * 更改页面类型
 * @param commit
 */
export const setCanvasType = ({commit}, data) => {
  commit(types.SET_CANVAS_TYPE, data)
}

/**
 * 设置背景音乐
 * @param commit
 */
export const setBgMusic = ({commit}, data) => {
  commit(types.SET_BG_MUSIC, data)
}

/**
 * 改变背景音乐播放状态
 * @param commit
 */
export const changeAudioPlayingState = ({commit}, data) => {
  commit(types.CHANGE_AUDIO_PLAYING_STATE, data)
}

/**
 * 添加页面元素
 */
export const addElement = ({commit, state}, data) => {
  commit(types.ADD_PIC_ELEMENT, new Element(data))
  var list = state.editorPage.elements
  var lastIndex = list.length - 1
  list[lastIndex]['zindex'] = lastIndex ? list[lastIndex - 1]['zindex'] + 1 : 1
  commit(types.SET_CUR_EDITOR_ELEMENT, state.editorPage.elements[lastIndex])
}

/**
 * 添加背景图片SET_CUR_EDITOR_ELEMENT
 */
export const addBGElement = ({commit, state}, data) => {
  commit(types.ADD_BG_ELEMENT, new Element(data))
  var list = state.editorPage.elements
  var lastIndex = list.length - 1
  list[lastIndex]['zindex'] = lastIndex ? list[lastIndex - 1]['zindex'] + 1 : 1
  commit(types.SET_CUR_EDITOR_ELEMENT, state.editorPage.elements[lastIndex])
}

/**
 * 保存图片
 * @param commit
 * @param data
 */
export const savePic = ({commit}, data) => {
  commit(types.PUSH_PIC_LIST, data)
}

/**
 * 保存背景图片
 * @param commit
 * @param data
 */
export const saveBgPic = ({commit}, data) => {
  commit(types.PUSH_BG_PIC_LIST, data)
}

/**
 * 保存视频
 * @param commit
 * @param data
 */
export const saveVideo = ({commit}, data) => {
  commit(types.PUSH_VIDEO_LIST, data)
}
/**
 * 清除背景
 * @param commit
 */
export const cleanBG = ({commit}) => {
  commit(types.CLEAN_BG)
}

export const cleanEle = ({commit}, ele) => {
  commit(types.CLEAN_ELE, ele)
}

/**
 * 复制页面
 * @param commit
 */
export const copyPage = ({commit}, data) => {
  console.log(data)
  var copyPage = tools.vue2json(data)
  commit(types.COPY_PAGE, copyPage)
  commit(types.SET_COPY_EDITOR_PAGE, copyPage)
}

/**
 * 删除页面
 * @param commit
 */
export const delPage = ({commit}, page) => {
  commit(types.DELETE_PAGE, page)

}

export const getPageByThemeId = ({dispatch, commit}, data) => {
  commit(types.SET_CUR_EDITOR_THEME, data)
  commit(types.SET_CUR_EDITOR_PAGE, data.pages[0])
  // dispatch('sortElementsByZindex')
}
//设置正在编辑的元素
export const setEditorElement = ({commit}, element) => {
  element.jumpUrl ? element.isUseLink = true : element.isUseLink = false
  commit(types.SET_CUR_EDITOR_ELEMENT, element)
}

export const changeOperatingType = ({commit}, data) => {
  commit(types.CHANGE_OPERATING_TYPE, data)
}

// 删除元素
export const deleteElement = ({commit}, element) => {
  commit(types.DELETE_ELEMENT, element)
}

export const deleteSelectedElement = ({commit, state}) => {
  commit(types.DELETE_ELEMENT, state.editorElement)
}

export const playAnimate = ({state, commit, getters}) => {
  commit(types.PLAY_ANIMATE)
  let target = getters['editingElement'] || getters['editingPageElements'] || null
  let time = 0
  if (target instanceof Array) {
    target.forEach(v => {
      time = v['animatedName'] && (v['duration'] + v['delay']) > time ? (v['duration'] + v['delay']) : time
    })
  } else if (target instanceof Object) {
    time = (target['duration'] + target['delay'])
  }
  setTimeout(() => {
    commit(types.STOP_ANIMATE, target)
  }, time * 1000)
}

export const cleanPicList = ({commit}) => {
  commit(types.CLEAN_PIC_LIST)
}

export const sortElementsByZindex = ({commit}, location) => {
  commit(types.SORTELEMENTS_BY_ZINDEX, location)
}


/*模板Id*/
export const setThemeId = ({commit}, data) => {
  commit(types.SET_THEME_ID, data)
}

/*保存封面*/
export const setCoverImg = ({commit}, data) => {
  commit(types.SET_COVER_IMG, data)
}

