import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import less from 'less'
import tinymce from 'tinymce'
import time from "./utils/time.js"

import App from './App.vue'
import router from './router'
import store from './store'
import api from './api' // 导入api接口

Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码
Vue.prototype.$tinymce = tinymce
Vue.config.productionTip = false
Vue.withCredentials = true

Vue.use(ElementUI)
Vue.use(less)
let homeScrollTop = 0;
Vue.prototype.$homeScroll = homeScrollTop;

 
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)  


// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)

new Vue({
	router,
	store,
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this
	},
}).$mount('#app')

