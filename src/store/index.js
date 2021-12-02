import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // 解决页面刷新数据失效

Vue.use(Vuex)

const request = {
	state:{
		token:'',
		network:true,
		statusMes:'',
		uid:'',
	},
	mutations: {
		updateToken(state, token) {
			state.token = token
		},
		changeNetwork(state, Network) {
			state.Network = Network
		},
		changeStatusMes(state, statusMes) {
			state.statusMes = statusMes
		},
		updateUid(state, uid) {
			state.uid = uid
		},
	}
	
}

const message = {
	state:{
		user: '',
		existUser: true,
		olineTime:'',
	},
	mutations:{
		addUser(state, user) {
			state.user = user
		},
		removeUser(state, user) {
			state.user = user
		},
		updateExistUser(state, existUser){
			state.existUser = existUser
		},
		addOlineTime(state, olineTime) {
			state.olineTime = olineTime
		}
	}
}
const store = new Vuex.Store({
	plugins: [createPersistedState()], // 解决页面刷新数据失效
	modules: {
		request,
		message,
	}
})

export default store
