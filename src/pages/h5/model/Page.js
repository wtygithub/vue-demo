/**
 * Created by zhengguorong on 2016/11/24.
 */
export default class Page {
  constructor (page = {}) {
    this.elements = page.elements || []
    this.canvasHeight = Page.canvasHeight || 603
    this.canvasType = Page.canvasType || 'fixed'
  }
}
