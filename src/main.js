// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import common_header_menu from './components/common/common_header_menu'
import store from './vuex/store'
import 'element-ui/lib/theme-chalk/index.css';

Vue.component('common_header_menu',common_header_menu)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: new Vuex.Store(store),
  components: { App },
  template: '<App/>'
})
