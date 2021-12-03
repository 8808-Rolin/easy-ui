import Vue from 'vue'
import Router from 'vue-router'
import LocalStorage from '../utils/LocalStorage'

Vue.use(Router)

/* 解决中断当前的导航时控制台报错 **/
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) {
		return originalPush.call(this, location, onResolve, onReject)
	}
	return originalPush.call(this, location).catch(err => err)
}


const router = new Router({
	// mode: 'history',
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
		path: '/community/:aid',
		component: () => import('@/page/community'),
		props($route){
			return {aid:$route.params.aid}
		}
	}, {
		name: 'PublicCommunity',
		path: '/publicommunity/:aid/:pid',
		component: () => import('@/page/pcommunity'),
		props($route){
			return {aid:$route.params.aid,pid:$route.params.pid}
		}
	}, {
		name: 'emoji2',
		path: '/emoji2',
		component: () => import('@/components/emoji2')
	}, {
		name: 'Search',
		path: '/search',
		component: () => import('@/page/search/index'),
		children: [{
				name: 'Posts',
				path: 'posts/:content',
				component: () => import('@/page/search/components/Posts'),
				props($route){
					return {content:$route.params.content}
				}
			},{
				name: 'User',
				path: 'user/:content',
				component: () => import('@/page/search/components/user'),
				props($route){
					return {content:$route.params.content}
				}
			},
		]
	}, {
		name: 'HomePage',
		path: '/homepage',
		component: () => import('@/page/user/index'),
		children: [{
			name: 'Me',
			path: 'me/:uid',
			component: () => import('@/page/user/components/my'),
			props($route){
				return {content:$route.params.uid}
			}
		}, {
			name: 'His',
			path: 'his/:uid',
			component: () => import('@/page/user/components/his'),
			props($route){
				return {content:$route.params.uid}
			}
		}]
	}]
})

/* 前置路由守卫：
	未登录时：可以进入 登录，注册， 找回密码， 首页
	登录成功后不能进行 登录，注册， 找回密码
**/
router.beforeEach(async (to, from, next) => {
	const localstorage = LocalStorage.getItem("token")
	let path = ['/500', '/404', '/', '/register', '/forget', '/login']
	let bool = path.indexOf(to.path)
	if (bool >= 0) {
		if (bool > 2)
			if (localstorage != null)
				next('/')
		else
			next()
		else
			next()
	} else {
		if (localstorage != null)
			next()
		else
			next('/login')
	}
})

export default router
