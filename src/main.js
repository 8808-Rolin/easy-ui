import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.withCredentials = true

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
