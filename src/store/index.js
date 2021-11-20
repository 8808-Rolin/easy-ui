import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // 解决页面刷新数据失效

Vue.use(Vuex)

const request = {
	state:{
		token:'',
		network:false,
		statusMes:'',
		uid:'',
	},
	mutations: {
		updateToken(state, val) {
			state.token = val
		},
		changeNetwork(state, val) {
			state.Network = val
		},
		changeStatusMes(state, val) {
			state.statusMes = val
		},
		updateUid(state, val) {
			state.uid = val
		},
	}
	
}

const message = {
	state:{
		user: '',
		existUser: true,
	},
	mutations:{
		addUser(state, val) {
			state.user = val
		},
		removeUser(state, val) {
			state.user = val
		},
		updateExistUser(state, val){
			state.existUser = val
		},
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
