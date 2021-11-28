<template>
	<div class="info_box">
		<div class="info_mes">
			<div class="info_photo">
				<img :src="userImage" >
			</div>
			<div class="name_and_ID">
				<strong v-show="$route.name !== 'Me'">{{user.userName}}</strong>
				<strong v-show="$route.name === 'Me'" @click="update('昵称')" style="cursor: pointer;">{{user.userName}}</strong>
				&emsp;
				<small><strong>学号：</strong>{{user.studentID}}</small>
			</div>
			<div class="intro">
				<small v-show="$route.name !== 'Me'">{{user.intro}}</small>
				<small v-show="$route.name === 'Me'" @click="update('简介')" style="cursor: pointer;">{{user.intro}}</small>
			</div>
		</div>

		<div class="info_logo">
			<img src="../assets/logo-zhen-500px.png" >
		</div>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import base from '../api/request/base.js'
	export default {
		name: 'info',
		data() {
			return {
				
			}
		},
		methods:{
			update(mes) {
				this.$bus.$emit('updateUser', mes)
			}
		},
		computed:{
			...mapState({
				user:state => state.message.user,
			}),
			userImage() {
				return `${base.sq}${this.user.headImage}`
			},
		},
	}
</script>

<style scoped="scoped">
	.info_box {
		width: 100%;
		height: 9rem;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		box-shadow: var(--box-shadow2);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background: url(../assets/topbar.png) no-repeat;
		background-size: cover;
	}

	.info_box>div {
		height: 7rem;
		margin-top: 1.5rem;
	}

	.info_mes {
		width: calc(100% - 14rem);
	}
	
	.info_mes>div {
		position: absolute;
	}
	
	.info_photo {
		width: 6rem;
		height: 6rem;
		margin-top: 0.5rem;
		border-radius: 0.75rem;
		overflow: hidden;
	}
	
	.info_photo img {
		width: 100%;
	}
	
	.name_and_ID {
		height: 2rem;
		left: 8.5rem;
		margin-top: 0.5rem;
	}
	
	.name_and_ID>strong {
		font-size: 2rem;
	}
	
	.intro {
		left: 8.5rem;
		margin-top: 3.125rem;
	}

	.info_logo {
		width: 7rem;
	}
	
	.info_logo img {
		width: 100%;
		height: 100%;
	}
	
	
</style>
