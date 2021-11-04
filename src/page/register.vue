<template>
	<div>
		<HeaderNoRight></HeaderNoRight>
		<div class="register_box">
			<div class="easy_photo box"></div>
			<div class="register box">
				<div class="">
					<h3>注册</h3>
					<div class="register_form">
						<el-input :class="{mistaken:!isTrueSNo}" type="text" placeholder="学  号"
							prefix-icon="el-icon-user" @input="checkSNo" v-model="loginMessage.sNo"
							v-show="percentage == 25">
						</el-input>
						<el-input :class="{mistaken:!isTruePhone}" type="text" placeholder="手机号"
							prefix-icon="el-icon-mobile-phone" @input="checkPhone" v-model="loginMessage.phone"
							v-show="percentage == 25"></el-input>
						<el-input type="text" placeholder="昵  称" prefix-icon="el-icon-user-solid"
							v-model="loginMessage.name" v-show="percentage == 25"></el-input>

						<el-select class="faculty" v-model="loginMessage.faculty" placeholder="请选择院系"
							prefix-icon="el-icon-location-outline" v-show="percentage == 50">
							<el-option v-for="item in faculties" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-input type="text" placeholder="真实姓名" prefix-icon="el-icon-user"
							v-model="loginMessage.realName" v-show="percentage == 50">
						</el-input>
						<el-input :class="{mistaken:!isTrueMail}" type="text" placeholder="电子邮箱"
							prefix-icon="el-icon-message" @input="checkMail" v-model="loginMessage.mail"
							v-show="percentage == 50"></el-input>

						<div class="register_3" v-show="percentage == 75">
							<el-select class="gender" v-model="loginMessage.gender" placeholder="性别"
								prefix-icon="el-icon-location-outline">
								<el-option v-for="item in genders" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-date-picker class="date" v-model="loginMessage.date" type="date" placeholder="生日"
								format="yyyy-MM-dd" value-format="yyyy-MM-dd">
							</el-date-picker>
						</div>
						<el-upload class="avatar-uploader" :action="action" :show-file-list="false"
							:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
							v-show="percentage == 75">
							<img v-if="loginMessage.imageUrl" :src="loginMessage.imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip" class="el-upload__tip">上传jpg/png头像，且不超过500kb</div>
						</el-upload>

						<el-input :class="{mistaken: !passwordLen}" type="password" placeholder="密码(至少8位)"
							prefix-icon="el-icon-key" @input="checkPasswordLen" v-model="loginMessage.password"
							v-show="percentage == 100"></el-input>
						<el-input :class="{mistaken:!isTruePassword}" type="password" placeholder="确认密码"
							prefix-icon="el-icon-key" @input="checkPassword" v-model="loginMessage.isPassword"
							v-show="percentage == 100"></el-input>
						<div v-show="percentage == 100">
							<PuzzleVcode></PuzzleVcode>
						</div>

						<el-button-group>
							<el-button type="primary" icon="el-icon-arrow-left" @click="decrease"
								v-if="percentage > 25">上一步</el-button>
							<el-button type="primary" @click="increase" v-if="percentage <= 75">下一步<i
									class="el-icon-arrow-right el-icon--right"></i></el-button>
							<el-button type="primary" @click="increase" v-if="percentage == 100">立即注册<i
									class="el-icon-arrow-right el-icon--right"></i></el-button>
						</el-button-group>
					</div>

					<div class="steps_box">
						<el-progress :percentage="percentage" :color="customColor"></el-progress>
					</div>

					<div class="register_links">
						<el-link href="#" :underline="false">已有账号？前往登录</el-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderNoRight from '../components/HeaderNoRight.vue'
	import PuzzleVcode from "../components/PuzzleVcode.vue"

	export default {
		name: 'Register',
		data() {
			return {
				faculties: [{
					value: '选项1',
					label: '信息技术学院'
				}, {
					value: '选项2',
					label: '艺术设计学院'
				}],

				genders: [{
					value: '选项1',
					label: '男'
				}, {
					value: '选项2',
					label: '女'
				}],

				action: "http://easy.rolin.icu:11119/api/tool/upload-image", // 头像上传地址
				percentage: 25, // 进度条初始数据
				customColor: '#f2a373', // 进度条颜色

				// 登录数据， 差最后的验证
				loginMessage: {
					sNo: '',
					phone: '',
					name: '',
					faculty: '',
					realName: '',
					mail: '',
					gender: '',
					date: '',
					imageUrl: '', // 不太确定
					password: '',
					isPassword: '',
				},

				// 验证
				isTrueSNo: true,
				isTruePhone: true,
				isTrueMail: true,
				passwordLen: true,
				isTruePassword: true
			};
		},
		components: {
			HeaderNoRight,
			PuzzleVcode
		},
		methods: {
			// 进度条
			increase() {
				this.percentage += 25;
				if (this.percentage > 100) {
					this.percentage = 100;
				}
			},
			decrease() {
				this.percentage -= 25;
				if (this.percentage < 0) {
					this.percentage = 0;
				}
			},
			// 头像上传
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			// 验证
			// 学号
			checkSNo() {
				if (this.loginMessage.sNo.length > 8) {
					if (this.loginMessage.sNo.length > 15) {
						this.isTrueSNo = false
						// this.$alert("亲，请输入合法的学号！","输入信息有误")
						this.$notify.error({
							title: '输入信息有误',
							message: '亲，请输入合法的学号！',
						});
					} else {
						// 发送请求给后端,验证学号是否已经注册
						// 未注册 
						this.isTrueSNo = true
						// 已注册 this.isTrueSNo = false    this.$alert("亲，请输入其他学号！", "学号已被注册")
					}
				} else if (this.user.sNo != '') {
					this.isTrueSNo = false
				} else {
					this.isTrueSNo = true
				}
			},
			// 手机号
			checkPhone() {
				const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
				if (this.loginMessage.phone.length == 11) {
					if (!regMobile.test(this.loginMessage.phone)) {
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
				if (this.loginMessage.mail != "" && !regEmail.test(this.loginMessage.mail)) {
					this.isTrueMail = false
				} else {
					this.isTrueMail = true
				}
			},
			// 密码长度
			checkPasswordLen() {
				if (this.loginMessage.password != "" && this.loginMessage.password.length < 8) {
					this.passwordLen = false
				} else {
					this.passwordLen = true
				}
			},
			// 确认密码
			checkPassword() {
				if (this.loginMessage.isPassword.length > 0 && this.loginMessage.password == this.loginMessage
					.isPassword) {
					this.isTruePassword = true
				} else {
					this.isTruePassword = false
					if (this.loginMessage.isPassword.length == this.loginMessage.password.length) {
						// this.$alert("亲，请重新确认密码！", "两次密码不一致")
						this.$notify.error({
							title: '密码不一致',
							message: '亲，请重新确认密码！',
						});
						this.loginMessage.isPassword = ''
					}
				}
			}
		}
	}
</script>

<style>
	.register_box {
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

	.register_box .box {
		width: 28.125rem;
		height: 28.125rem;
	}

	.register_box .register {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.register>div {
		width: 21.875rem;
		height: 25rem;
		border: 0.0625rem solid rgba(0, 0, 0, .25);
		border-top: 0.75rem solid #f2a373;
		border-radius: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.register_form {
		width: 17rem;
		height: 15.625rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.register_form #register_btn {
		width: 12rem;
	}

	.steps_box {
		width: 17rem;
	}

	.register_links {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.el-select.faculty {
		width: 100%;
	}

	.easy_photo {
		background: url(../assets/logo-imgalpha-nologo-600px.png) no-repeat;
		background-size: cover;
	}

	.register_3 {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	/* 头像上传样式 */
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 2.5rem;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 5rem;
		height: 5rem;
		line-height: 5rem;
		text-align: center;
	}

	.avatar {
		width: 5rem;
		height: 5rem;
		display: block;
	}

	.register_3 .gender {
		width: 35%;
	}

	.register_3 .date {
		width: 60%;
	}

	.mistaken .el-input__inner:focus,
	.mistaken .el-input__inner {
		outline-color: #ff0000;
		border-color: #FF0000;
	}

	.el-button-group .el-button,
	.el-button-group .el-button:hover {
		background-color: #f2a373;
		border-color: #f2a373;
	}
</style>
