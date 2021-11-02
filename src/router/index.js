import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	routes: [{
			name: 'Login',
			path: '/Login',
			component: () => import('@/page/login')
		},
	 ]
})

export default router
