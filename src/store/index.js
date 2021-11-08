import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const request = {
	state:{
		token:null,
		network:false,
		statusMes:null,
	},
	mutations: {
		loginSuccess(state, val) {
			state.token = val
		},
		changeNetwork(state, val) {
			state.Network = val
		},
		changeStatusMes(state, val) {
			state.statusMes = val
		}
	}
	
}

const message = {
	state:{
		user:null,
	},
	mutations:{
		addUser(state, val) {
			state.user = val
		}
	}
}
const store = new Vuex.Store({
	modules: {
		request,
		message,
	}
})

export default store
