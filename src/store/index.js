import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const request = {
	state:{
		myAddress:"http://rolin.icu:11119",
		token:null,
		network:false,
	},
	mutations: {
		loginSuccess(state, val) {
			state.token = val
		},
		changeNetwork(state, val) {
			state.Network = val
		}
	}
	
}


const store = new Vuex.Store({
	modules: {
		request,
	}
})

export default store
