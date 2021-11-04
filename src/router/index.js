import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	routes: [{
		name: 'Index',
		path: '',
		component: () => import('@/page/index')
	}, {
		name: 'Login',
		path: '/Login',
		component: () => import('@/page/login')
	}, {
		name: 'Register',
		path: '/Register',
		component: () => import('@/page/register')
	}]
})

export default router
