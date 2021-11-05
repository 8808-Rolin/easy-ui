<template>
	<div>
		<HeaderNoRight></HeaderNoRight>
		<div class="forget_box">
			<div class="easy_photo box"></div>
			<div class="forget box">
				<div class="">
					<h3>找回密码</h3>

					<div class="forget_form">
						<el-input :class="{mistaken: !isTrueSNo}" type="text" placeholder="学       号" prefix-icon="el-icon-user" v-model="user.studentID" @input="checkSNo">
						</el-input>
						<el-input :class="{mistaken: !isTruePhone}" type="text" placeholder="手  机  号" prefix-icon="el-icon-mobile-phone" @input="checkPhone"
							v-model="user.phone"></el-input>
						<el-input :class="{mistaken: !isTrueMail}" type="text" placeholder="电子邮箱" prefix-icon="el-icon-message" @input="checkMail" v-model="user.email">
						</el-input>
						<el-input :class="{mistaken: !passwordLen}" type="password" placeholder="新  密  码" prefix-icon="el-icon-key" @input="checkPasswordLen"
							v-model="user.password">
						</el-input>

						<el-button id="forget_btn" type="primary">找回密码</el-button>
					</div>

					<div class="forget_links">
						<el-link href="#" :underline="false">返回登录</el-link>
						<el-link href="#" :underline="false">前往注册</el-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderNoRight from '../components/HeaderNoRight.vue'

	export default {
		name: 'Forget',
		data() {
			return {
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
			checkSNo() {
				if (this.user.sNo.length > 8) {
					if (this.user.sNo.length > 15) {
						this.isTrueSNo = false
						// this.$alert("亲，请输入合法的学号！","输入信息有误")
						this.$notify.error({
							title: '输入信息有误',
							message: '亲，请输入合法的学号！',
						});
					} else {
						this.isTrueSNo = true
						// 发送请求给后端,验证学号是否已经注册
						// 未注册 this.isTrueSNo = true
						// 已注册 this.isTrueSNo = false    this.$alert("亲，请输入其他学号！", "学号已被注册")
					}
				}else if (this.user.sNo != '') {
					this.isTrueSNo = false
				}else {
					this.isTrueSNo = true
				}
			},
			// 手机号
			checkPhone() {
				const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
				if (this.user.phone.length == 11) {
					if (!regMobile.test(this.user.phone)) {
						this.isTruePhone = false
						// this.$alert("亲，请输入正确的手机号码！", "输入信息有误")
						this.$notify.error({
							title: '输入信息有误',
							message: '亲，请输入正确的手机号码！',
						});
					} else {
						// 发送请求给后端,验证手机号码是否已经注册过
						// 未注册 this.isTruePhone = true
						// 已注册 this.isTruePhone = false     this.$alert("亲，请输入其他手机号码！", "手机号码已被注册")
					}
				} else {
					this.isTruePhone = true
				}
			},
			// 邮箱
			checkMail() {
				const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
				if (this.user.email != "" && !regEmail.test(this.user.email)) {
					this.isTrueMail = false
				} else {
					this.isTrueMail = true
				}
			},
			// 密码长度
			checkPasswordLen() {
				if (this.user.password != "" && this.user.password.length < 8) {
					this.passwordLen = false
				} else {
					this.passwordLen = true
				}
			},
		}
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
