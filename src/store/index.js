import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  keepList:['questionbank','questionManage']
}

const mutations = {
  setkeepAlive(state,keepRoute){
    if(keepRoute == 'mainRoute'){ //不用缓存
      state.keepList = []
    }else{
      var arr = []  //用缓存
      for (var i =0;i<state.keepList.length;i++) {
        if(state.keepList[i] != keepRoute){
          arr.push(state.keepList[i])
        }
      }
      arr.push(keepRoute)
      state.keepList = arr
    }
  }
}

const getters = {
  getList(state){
    return state.keepList
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})
