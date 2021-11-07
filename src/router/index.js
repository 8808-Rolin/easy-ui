import Vue from 'vue'
import Router from 'vue-router'
import LocalStorage from '../utils/LocalStorage'

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
	},{
		name: 'Forget',
		path: '/Forget',
		component: () => import('@/page/forget')
	},{
		name: 'Community',
		path: '/Community',
		component: () => import('@/page/community')
	},{
		name: 'error-500',
		path: '/500',
		component: () => import('@/page/500')
	}]
})

router.beforeEach(async(to, from, next) => {
	const localstorage = LocalStorage.getItem("token")
	let path = ['/Login', '/', '/Register', '/Forget']
	if(path.indexOf(to.path) >= 0){
		if(localstorage !== null && to.path !== '/')
			next('/')
		else
			next()
	}
	else{
		if(localstorage != null)
			next()
		else
			next('/Login')
	}	
})

export default router
