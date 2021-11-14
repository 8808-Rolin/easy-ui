import Vue from 'vue'
import Router from 'vue-router'
import LocalStorage from '../utils/LocalStorage'

Vue.use(Router)

const router = new Router({
	routes: [{
		name: '404',
		path: '/404',
		component: () => import('@/page/404')
	}, {
		name: '500',
		path: '/500',
		component: () => import('@/page/500')
	}, {
		name: 'Index',
		path: '',
		component: () => import('@/page/index')
	}, {
		name: 'Login',
		path: '/login',
		component: () => import('@/page/login')
	}, {
		name: 'Register',
		path: '/register',
		component: () => import('@/page/register')
	}, {
		name: 'Forget',
		path: '/forget',
		component: () => import('@/page/forget')
	}, {
		name: 'Public',
		path: '/public',
		component: () => import('@/page/public')
	}, {
		name: 'Community',
		path: '/community',
		component: () => import('@/page/community')
	}, {
		name: 'CommunityP',
		path: '/p',
		component: () => import('@/page/p')
	}]
})

/* 前置路由守卫：
	未登录时：可以进入 登录，注册， 找回密码， 首页
	登录成功后不能进行 登录，注册， 找回密码
**/
// router.beforeEach(async (to, from, next) => {
// 	const localstorage = LocalStorage.getItem("token")

// 	let path = [ '/500', '/404', '/', '/register', '/forget', '/login', '/tinymec']
// 	let bool = path.indexOf(to.path)
// 	if (bool >= 0) {
// 		if (bool > 2)
// 			if (localstorage != null)
// 				next('/')
// 			else
// 				next()
// 		else
// 			next()
// 	} else {
// 		if (localstorage != null)
// 			next()
// 		else
// 			next('/Login')
// 	}
// })

export default router
