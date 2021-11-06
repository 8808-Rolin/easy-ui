<template>
	<div>
		<HeaderNoRight></HeaderNoRight>
		<div class="forget_box">
			<div class="easy_photo box"></div>
			<div class="forget box">
				<div class="">
					<h3>找回密码</h3>

					<div class="forget_form">
						<el-input :class="{mistaken: !isTrueSNo}" type="text" placeholder="学       号"
							prefix-icon="el-icon-user" v-model="user.studentID" @input="checkSNo">
						</el-input>
						<el-input :class="{mistaken: !isTruePhone}" type="text" placeholder="手  机  号"
							prefix-icon="el-icon-mobile-phone" @input="checkPhone" v-model="user.phone"></el-input>
						<el-input :class="{mistaken: !isTrueMail}" type="text" placeholder="电子邮箱"
							prefix-icon="el-icon-message" @input="checkMail" v-model="user.email">
						</el-input>
						<el-input :class="{mistaken: !passwordLen}" type="password" placeholder="新  密  码"
							prefix-icon="el-icon-key" @input="checkPasswordLen" v-model="password">
						</el-input>

						<el-button id="forget_btn" @click="submit" type="primary">找回密码</el-button>
					</div>

					<div class="forget_links">
						<router-link :to="{path:'/Login'}" :underline="false">返回登录</router-link>
						<router-link :to="{path:'/Register'}" :underline="false">前往注册</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderNoRight from '../components/HeaderNoRight.vue'
	import qs from 'qs'
	import crypto from 'crypto'

	export default {
		name: 'Forget',
		data() {
			return {
				time: null, //防抖
				notify: null,
				password: '',
				user: {
					studentID: '',
					phone: '',
					email: '',
					password: '',
				},

				// 验证
				isTrueSNo: true,
				isTruePhone: true,
				isTrueMail: true,
				passwordLen: true,
			};
		},
		components: {
			HeaderNoRight
		},
		methods: {
			/* 验证学号 **/
			checkSNo() {
				if (this.time != null)
					clearTimeout(this.time)
				this.time = setTimeout(() => {
					let ID = this.user.studentID.length
					if (this.notify != null)
						this.notify.close()
					if (ID > 15 || ID < 8) {
						this.isTrueSNo = false
						if (ID > 15) {
							this.notify = this.$notify.error({
								title: '输入信息有误',
								message: '亲，输入的学号过长！',
							});
						} else {
							this.notify = this.$notify.error({
								title: '输入信息有误',
								message: '亲，输入的学号过短！',
							});
						}
					} else {
						this.isTrueSNo = true
					}
					if (this.user.studentID === '')
						this.isTrueSNo = true
				}, 800)
			},
			/* 验证手机号 **/
			checkPhone() {
				const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
				let phone = this.user.phone.length
				if (this.time != null)
					clearTimeout(this.time)
				this.time = setTimeout(() => {
					if (this.notify != null)
						this.notify.close()
					if (this.user.phone !== '' && (phone > 11 || phone < 11)) {
						if (!regMobile.test(this.user.phone)) {
							this.isTruePhone = false
							this.notify = this.$notify.error({
								title: '输入信息有误',
								message: '亲，请输入正确的手机号码！',
							});
						}
					} else {
						this.isTruePhone = true
					}
				}, 800)
			},
			/* 验证邮箱 **/
			checkMail() {
				if (this.time != null)
					clearTimeout(this.time)
				this.time = setTimeout(() => {
					const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
					if (this.notify != null)
						this.notify.close()
					if (this.user.email != "" && !regEmail.test(this.user.email)) {
						this.isTrueMail = false
						this.notify = this.$notify.error({
							title: '输入信息有误',
							message: '亲，请输入正确的邮箱！',
						});
					} else {
						this.isTrueMail = true
					}
				}, 1000)
			},
			/* 验证密码 **/
			checkPasswordLen() {
				if (this.time != null)
					clearTimeout(this.time)
				this.time = setTimeout(() => {
					if (this.notify != null)
						this.notify.close()
					if (this.password != "" && this.password.length < 8) {
						this.passwordLen = false
						this.notify = this.$notify.error({
							title: '输入信息有误',
							message: '亲，密码不小于8位！',
						});
					} else {
						this.passwordLen = true
					}
				}, 800)
			},
			/* 发送请求 **/
			submit() {
				if (this.notify != null)
					this.notify.close()
				console.log(this.standart, this.notNull)
				if (this.standart && this.notNull) {
					let md5 = crypto.createHash("md5"); //md5加密对象
					md5.update(this.password) //需要加密的密码
					this.user.password = md5.digest('hex'); //password 加密完的密码
					this.$http
						.post('http://rolin.icu:11119/api/user/forget-password', qs.stringify({
							...this.user
						}), {
							'Content-Type': 'application/x-www-form-urlencoded'
						})
						.then(response => {
							console.log(response.data)
							if (response.data.data.code === 0) {
								this.$alert(`\n你修改后的密码是:${this.password}`, response.data.data.msg, {
									confirmButtonText: '确定',
									callback: action => {
										this.$message({
											type: 'success',
											message: `${response.data.data.msg}`
										});
									}
								});
								this.$router.push({
									path: '/Login'
								})
							} else {
								this.notify = this.$message.error(response.data.data.msg)
							}
						})
						.catch(error => {
							console.log(error.data)
						})
				}
			}

		},
		computed: {
			/* 当所有数据验证成功后返回true **/
			standart() {
				return this.isTrueSNo && this.isTruePhone && this.isTrueMail && this.passwordLen
			},
			/* 当数据不存在空字符串时返回true **/
			notNull() {
				let arr = Object.values(this.user).filter(item => {
					if (item !== '') {
						return true
					}
				})
				return arr.length >= 3 && this.password !== ''
			}
		},
	}
</script>

<style>
	.forget_box {
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

	.forget_box .box {
		width: 28.125rem;
		height: 28.125rem;
	}

	.forget_box .forget {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.forget>div {
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


	.forget_form {
		width: 17rem;
		height: 17rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}


	.forget_form #forget_btn {
		width: 12rem;
	}

	.forget_links {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.forget_links a {
		color: inherit;
		font-size: 14px;
	}

	.forget_links a:hover {
		color: #1DA0FB;
		font-size: 14px;
	}

	.easy_photo {
		background: url(../assets/logo-imgalpha-nologo-600px.png) no-repeat;
		background-size: cover;
	}

	.mistaken .el-input__inner:focus,
	.mistaken .el-input__inner {
		outline-color: #ff0000;
		border-color: #FF0000;
	}
</style>
