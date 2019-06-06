/**
 * Created by zhengguorong on 2016/11/24.
 */
export default class Theme {
  constructor (theme = {}) {
    this.title = theme.title || '泰健康+ H5'
    this.description = theme.description || '这是我用的泰健康+H5编辑器做的哦，有没有觉得很高大上啊~快来膜拜我！'
    this.pages = theme.pages || []
    // this.type = theme.type || 'h5'
    this.audioUrl = theme.audioUrl || ''
    this.audioName = theme.audioName || ''
    this.audioId = theme.audioId || ''
    this.audioPlaying = theme.audioPlaying || true
    this.coverImage = theme.coverImage || ''//分享截图
    this.themeId = theme.themeId || ''
    this.themeListCoverImg = theme.themeListCoverImg || ''//列表封面展示的图片
  }
}
