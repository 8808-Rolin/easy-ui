<template>
	<header>
		<div class="warp">
			<div class="logo">
				<router-link :to="{path:'/'}" title="Easy社团">Easy社团</router-link>
			</div>

			<div class="seach_box">
				<el-input placeholder="请输入内容" v-model="search.keyword" class="input-with-select">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>

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
						<el-dropdown-item>个人空间</el-dropdown-item>
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
				existUser: false,
				search: {
					type: 0,
					keyword: ''
				}
			}
		},
		methods:{},
		beforeMount() {
			const ls = LocalStorage.getItem("token")
			if (ls !== null) {
				this.existUser = true
				this.$store.state.token = ls
				console.log(this.$store)
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

	/* 搜索框 */
	.seach_box .el-input__inner {
		width: 12.5rem;
		transition: width .5s;
	}

	.seach_box .el-input__inner:focus {
		width: 20rem;
		transition: width .5s;
	}

	.el-input-group__append,
	.el-input-group__prepend {
		background-color: #1DA0FB;
		color: #fff;
		border-color: #1DA0FB;
	}
</style>
