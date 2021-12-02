<template>
	<header>
		<div class="warp">
			<div class="logo">
				<router-link :to="{path:'/'}" title="Easy社团">Easy社团</router-link>
			</div>

			<div class="seach_box" :class="{'topSeach_box':topSeach_box}">
				<el-input placeholder="请输入内容" @keyup.enter.native="toSearch" @focus="topSeach_box = true" @blur="topSeach_box = false" v-model="search.keyword" class="input-with-select">
					<el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
				</el-input>

			</div>

			<div class="user" v-show="existUser">
				<div class="profile" @click="toMyHomePage">
					<img :src="headImage">
				</div>
				<el-dropdown>
					<span class="el-dropdown-link">
						<div style="color: #000000;cursor: pointer;">{{user.userName}}</div>
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="toMyHomePage">个人空间</el-dropdown-item>
						<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
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
	import {
		mapState
	} from 'vuex'
	import base from '../api/request/base.js'; // 导入接口域名列表

	export default {
		name: 'Header',
		data() {
			return {
				search: {
					type: 0,
					keyword: 'vue'
				},
				topSeach_box:false,
			}
		},
		methods: {
			logout() {
				this.$store.commit("removeUser", '')
				LocalStorage.removeItem('token')
				this.$store.commit('updateExistUser', false)
				this.$router.push({
					path: '/login'
				})
			},
			checkLogin() {
				const ls = LocalStorage.getItem("token")
				if (ls !== null) {
					this.$store.commit('updateToken', ls.token)
					this.$store.commit('updateUid', ls.uid)
					let user = this.$store.state.message.user
					if (user.headImage === '' || user.headImage === undefined || user.headImage === null) {
						this.$api.getCommonPersonInformation({
							uid: ls.uid
						}).then(
							res => {
								if (!res.data.data.code) {
									this.$store.commit("addUser", res.data.data.user)
									this.$store.commit('updateExistUser', true)
								}
							}
						)
					} else {
						this.$store.commit('updateExistUser', true)
					}
				} else {
					this.$store.commit('updateExistUser', false)
				}
			},
			toSearch() {
				if (this.search.keyword !== '') 
					this.$router.push({name:'Posts',params:{content:this.search.keyword}})
			},
			toMyHomePage() {
				this.$router.push({name:'Me',params:{uid:this.uid}})
			}
		},
		computed: {
			...mapState({
				user: state => state.message.user,
				existUser: state => state.message.existUser,
				uid: state => state.request.uid,
			}),
			headImage() {
				return `${base.sq}${this.user.headImage}`
			}
		},
		created() {
			this.checkLogin()
		}
	}
</script>

<style scoped="scoped">
	img {
		width: 100%;
		height: 100%;
	}
	
	header {
		width: 100%;
		height: 4rem;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: var(--box-shadow2);
		background-color: var(--bg);
		z-index: 9000;
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
		margin-right: 0.5rem;
		border-radius: 50%;
		overflow: hidden;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409eff;
		display: flex;
		align-items: center;
	}
	
	.el-dropdown-link>div {
		width: fit-content;
		max-width: 4rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
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
	.seach_box>>> .el-input__inner {
		width: 12.5rem;
		transition: width .5s;
	}

	.seach_box>>>.el-input__inner:hover {
		width: 20rem;
		transition: width .5s;
	}

	.seach_box>>>.el-input-group__append {
		background-color: #1DA0FB;
		color: #fff;
		border-color: #1DA0FB;
	}
	
	.topSeach_box>>> .el-input__inner {
		width: 20rem;
		transition: width .5s;
	}
	
	@media screen and (max-width: 480px) {
		.seach_box>>>.el-input__inner {
			width: 0;
			padding: 0;
			border: 0;
		}
		
		.seach_box>>>.el-input__inner:hover {
			width: 100vw - 8rem - 10rem;
			transition: width .5s;
		}
		
		.seach_box>>>.el-input-group__append {
			border: #1DA0FB 0.0625rem solid;
			border-radius: 0;
		}
	}
</style>
