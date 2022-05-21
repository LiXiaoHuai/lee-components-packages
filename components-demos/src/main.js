import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import leeTable from 'lee-tableplus';
import 'element-ui/lib/theme-chalk/index.css';
import 'lee-tableplus/lib/lee-tableplus.css';
Vue.use(ElementUI).use(leeTable);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
