<template>
	<div>
		<HeaderNoRight></HeaderNoRight>
		<div class="login_box">
			<div class="easy_photo box"></div>
			<div class="login box">
				<div class="">
					<h3>登录</h3>
					<div class="login_way">
						<div class="no_login" :class="{'active': !user.loginType}" @click="noOrPhone"
							:disabled="!user.loginType">
							学号登录
						</div>
						<div class="phone_login" :class="{'active':user.loginType}" @click="noOrPhone"
							:disabled="user.loginType">
							手机登录
						</div>
					</div>

					<div class="login_form">
						<el-input type="text" placeholder="学   号" prefix-icon="el-icon-user" v-show="!user.loginType"
							v-model="user.account"></el-input>
						<el-input type="text" placeholder="手机号" prefix-icon="el-icon-mobile-phone"
							v-show="user.loginType" v-model="user.account"></el-input>
						<el-input type="password" @keyup.enter.native="Commit" placeholder="密   码"
							prefix-icon="el-icon-key" v-model="password">
						</el-input>
						<div class="remember">
							<el-checkbox v-model="checked">记住密码</el-checkbox>
						</div>
						<el-button id="login_btn" @click="Commit" type="primary">登&emsp;录</el-button>
					</div>

					<div class="login_links">
						<router-link :to="{path:'/forget'}" :underline="false">忘记密码？</router-link>
						<router-link :to="{path:'/register'}" :underline="false">还没有账号？前往注册</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderNoRight from '../components/HeaderNoRight.vue'
	import crypto from 'crypto'
	import qs from 'qs'
	import LocalStorage from '../utils/LocalStorage'

	export default {
		name: 'Login',
		data() {
			return {
				checked: false,
				password: null,
				message: null, // 消息提示框
				user: {
					loginType: 0,
					account: '',
					password: '',
				}
			};
		},
		components: {
			HeaderNoRight
		},
		methods: {
			/* 切换表单 **/
			noOrPhone: function() {
				this.user.loginType = this.user.loginType === 0 ? 1 : 0;
				this.user.account = '';
				this.password = '';
			},
			/* 提交数据 **/
			Commit() {
				if (this.message !== null)
					this.message.close()
				this.user.password = this.password
				/* 记住密码实现 **/
				if (this.checked) {
					LocalStorage.setItem({
						name: 'password',
						value: {
							...this.user,
							checked: this.checked
						},
						expires: 60, //缓存时间
					})
				}
				let md5 = crypto.createHash("md5"); //md5加密对象
				md5.update(this.password) //需要加密的密码
				this.user.password = md5.digest('hex'); //password 加密完的密码
				this.$api.login(this.user).then(
					response => {
						console.log(response.data.data.uid + "@@@@")
						if (response.data.data.code === 0) {
							LocalStorage.setItem({
								name: 'token',
								value: {
									token: response.data.data.token,
									uid: response.data.data.uid
								},
								expires: 60,
							})
							this.$router.push({
								path: '/'
							})
						} else {
							LocalStorage.removeItem("token")
							LocalStorage.removeItem("password")
							this.message = this.$message.error({
								message: response.data.data.msg,
							})
						}
					}	
				)
			}
		},
		/* 缓存读取 **/
		beforeMount() {
			let val = LocalStorage.getItem("password")
			this.user.loginType = 0
			if (val) {
				this.password = val.password
				this.user.account = val.account
				this.checked = val.checked
				this.user.loginType = val.loginType;
			}
		}
	}
</script>

<style>
	.login_box {
		width: 56.25rem;
		height: 28.125rem;
		border-radius: 0.75rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		box-shadow: var(--box-shadow2);
	}

	.login_box .box {
		width: 28.125rem;
		height: 28.125rem;
	}

	.login_box .login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.login>div {
		width: 21.875rem;
		height: 25rem;
		border-top: 0.75rem solid #1da0fb;
		box-shadow: var(--box-shadow2);
		border-radius: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.login_way {
		width: 80%;
		height: 1.5rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.login_way>div {
		width: 4rem;
		cursor: pointer;
	}

	.login_form {
		width: 17rem;
		height: 12.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.login_form .remember {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.login_form #login_btn {
		width: 12rem;
	}

	.login_links {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.login_links a {
		color: inherit;
		font-size: 14px;
	}

	.login_links a:hover {
		color: #1DA0FB;
		font-size: 14px;
	}

	.easy_photo {
		background: url(../assets/logo-imgalpha-nologo-600px.png) no-repeat;
		background-size: cover;
	}

	.active {
		pointer-events: none;
		border-bottom: #1DA0FB solid 0.125rem;
		color: #1DA0FB;
	}
</style>
