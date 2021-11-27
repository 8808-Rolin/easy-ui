<template>
	<div class="info_box">
		<div class="info_mes">
			<div class="info_photo">
				<img :src="userImage" >
			</div>
			<div class="name_and_ID">
				<strong>{{user.username}}</strong>
				&emsp;
			</div>
			<div class="intro">
				<small>{{user.notice}}</small>
			</div>
		</div>

		<div class="info_logo">
			<img src="../assets/logo-zhen-500px.png" >
		</div>
	</div>
</template>

<script>
	import base from '../api/request/base.js'
	
	export default {
		name: 'hisInfo',
		props:['user'],
		data() {
			return {
				
			}
		},
		computed:{
			userImage() {
				return `${base.sq}${this.user.profile}`
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
		left: 10rem;
		margin-top: 0.5rem;
	}
	
	.name_and_ID>strong {
		font-size: 2rem;
	}
	
	.intro {
		left: 10rem;
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
