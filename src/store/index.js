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


const store = new Vuex.Store({
	modules: {
		request,
	}
})

export default store
