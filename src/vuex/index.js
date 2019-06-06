import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  keepList:['questionbank','questionManage'],//需要缓存的路由
  editorElement: {
  }, // 正在编辑的元素
  editorPage: {
    canvasHeight: 603,
    canvasType: 'fixed', // fixed 常规页  long 加长页
    elements: []
  }, // 正在编辑的页面
  themeList: [], // 用户所有主题列表
  editorTheme: {
    pages:[],
    themeId:'',
    title: '泰健康+ H5',
    description: '这是我用的泰健康+H5编辑器做的哦，有没有觉得很高大上啊~快来膜拜我！',
    audioUrl:'',
    audioName:'',
    audioId:'',
    audioPlaying:true,
    coverImage:'',
    themeListCoverImg:'',
  }, // 正在编辑的主题
  picList: [], // 图片列表
  bgImageList:[],//背景图片列表
  videoList: [] // 视频列表
}

export default {
  state,
  getters,
  actions,
  mutations
}
