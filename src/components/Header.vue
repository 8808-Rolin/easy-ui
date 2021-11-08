<template>
	<header>
		<div class="warp">
			<div class="logo">
				<router-link :to="{path:'/'}" title="Easy社团">Easy社团</router-link>
			</div>
			<div class="user" v-show="existUser">
				<div class="profile">
					<img src="../assets/profile.jpg">
				</div>
				<a>用户名</a>
				<el-dropdown>
					<span class="el-dropdown-link">
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="login_and_register" v-show="!existUser">
				<router-link :to="{path:'/login'}">登录</router-link>
				<router-link :to="{path:'/register'}">注册</router-link>
			</div>
			
		</div>
	</header>
</template>

<script>
	import LocalStorage from '../utils/LocalStorage'
	
	export default {
		name: 'Header',
		data() {
			return {
				existUser: false
			}
		},
		methods:{},
		beforeMount() {
			const ls = LocalStorage.getItem("token")
			if (ls !== null) {
				this.existUser = true
				if (this.$store.state.message.user === null) {
					this.$api.getCommonPersonInformation({uid:ls.uid}).then(
						res => {
							console.log(res.data.data)
						}
					).catch(
						error => {
							console.log(error.response)
						}
					)
				}
			}
		}
	}
</script>

<style>
	header {
		width: 100%;
		height: 4rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: var(--box-shadow2);
		background-color: #FFFFFF;
		z-index: 9999;
	}

	header .warp {
		width: 100%;
		max-width: 75rem;
		min-width: 18rem;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	header .warp .logo {
		width: 10rem;
		height: 4rem;
	}

	header .warp .logo a {
		display: block;
		width: 100%;
		height: 100%;
		background: url(../assets/logo-slogen-225x90px.png) no-repeat;
		background-size: cover;
		text-indent: -624.9375rem;
	}

	header .warp .user {
		width: 8rem;
		height: 2.25rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	header .warp .user .profile {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		overflow: hidden;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409eff;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
	
	.login_and_register {
		width: 6.25rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	
	.login_and_register a {
		color: inherit;
		font-size: 14px;
	}
	
	.login_and_register a:hover {
		color: #1DA0FB;
		font-size: 14px;
	}
</style>
