<template>
	<div>
		<HeaderNoRight></HeaderNoRight>
		<div class="register_box">
			<div class="easy_photo box"></div>
			<div class="register box">
				<div class="">
					<h3>注册</h3>
					<div class="register_form">
						<div class="msg_input" v-show="percentage == 25">
							<el-input :class="{mistaken:!isTrueSNo}" type="text" placeholder="学  号"
								prefix-icon="el-icon-user" @change="checkSNo" v-model="loginMessage.studentID"
								v-show="percentage == 25">
							</el-input>
							<span class="msg" v-show="!isTrueSNo">请输入合法学号</span>
						</div>

						<div class="msg_input" v-show="percentage == 25">
							<el-input :class="{mistaken:!isTruePhone}" type="text" placeholder="手机号"
								prefix-icon="el-icon-mobile-phone" @change="checkPhone" v-model="loginMessage.phone"
								v-show="percentage == 25"></el-input>
							<span class="msg" v-show="!isTruePhone">请输入合法手机号</span>
						</div>

						<div class="msg_input" v-show="percentage == 25">
							<el-input type="text" placeholder="昵  称" prefix-icon="el-icon-user-solid"
								v-model="loginMessage.userName" v-show="percentage == 25"></el-input>
						</div>

						<div class="msg_input" v-show="percentage == 50">
							<el-select class="college" v-model="loginMessage.college" placeholder="请选择院系"
								prefix-icon="el-icon-location-outline" v-show="percentage == 50">
								<el-option v-for="item in faculties" :key="item.coid" :label="item.name"
									:value="item.coid">
								</el-option>
							</el-select>
						</div>


						<div class="msg_input" v-show="percentage == 50">
							<el-input type="text" placeholder="真实姓名" prefix-icon="el-icon-user"
								v-model="loginMessage.realName" v-show="percentage == 50">
							</el-input>
						</div>

						<div class="msg_input" v-show="percentage == 50">
							<el-input :class="{mistaken:!isTrueMail}" type="text" placeholder="电子邮箱"
								prefix-icon="el-icon-message" @change="checkMail" v-model="loginMessage.email"
								v-show="percentage == 50"></el-input>
							<span class="msg" v-show="!isTrueMail">请输入合法的电子邮箱</span>
						</div>

						<div class="register_3" v-show="percentage == 75">
							<el-select class="sex" v-model="loginMessage.sex" placeholder="性别"
								prefix-icon="el-icon-location-outline">
								<el-option v-for="item in sexs" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-date-picker class="date" v-model="loginMessage.birth" type="date" placeholder="生日"
								format="yyyy-MM-dd" value-format="yyyy-MM-dd">
							</el-date-picker>
						</div>

						<el-upload class="avatar-uploader" action="#" :http-request="HttpRequest"
							:show-file-list="false" :on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload" v-show="percentage == 75">
							<img v-if="imageBASE64" :src="imageBASE64" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip" class="el-upload__tip">上传jpg/png头像，且不超过500kb</div>
						</el-upload>

						<div class="msg_input" v-show="percentage == 100">
							<el-input :class="{mistaken: !passwordLen}" auto-complete="new-password" type="password"
								placeholder="密码(至少8位)" prefix-icon="el-icon-key" @change="checkPasswordLen"
								v-model="password" v-show="percentage == 100"></el-input>
						</div>

						<div class="msg_input" v-show="percentage == 100">
							<el-input :class="{mistaken:!isTruePassword}" type="password" placeholder="确认密码"
								prefix-icon="el-icon-key" @input="checkPassword" v-model="isPassword"
								v-show="percentage == 100"></el-input>
							<span class="msg" v-show="!isTruePassword">与第一次密码不一致，请重新输入</span>
						</div>

						<div v-show="percentage == 100">
							<PuzzleVcode :onCode.sync="isVerify"></PuzzleVcode>
						</div>

						<div class="form_btn">
							<el-button-group>
								<el-button type="primary" icon="el-icon-arrow-left" @click="decrease"
									v-if="percentage > 25">上一步</el-button>
								<el-button type="primary" @click="increase" v-if="percentage <= 75">下一步<i
										class="el-icon-arrow-right el-icon--right"></i></el-button>
								<el-button type="primary" @click="submit" v-if="percentage == 100">立即注册<i
										class="el-icon-arrow-right el-icon--right"></i></el-button>
							</el-button-group>
						</div>

					</div>

					<div class="steps_box">
						<el-progress :percentage="percentage" :color="customColor"></el-progress>
					</div>

					<div class="register_links">
						<router-link :to="{path:'/login'}" :underline="false">已有账号？前往登录</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderNoRight from '../components/HeaderNoRight.vue'
	import PuzzleVcode from "../components/PuzzleVcode.vue"
	import qs from 'qs'
	import crypto from 'crypto'
	import {
		Loading
	} from 'element-ui';

	export default {
		userName: 'Register',
		data() {
			return {
				faculties: null,

				sexs: [{
					value: '0',
					label: '男'
				}, {
					value: '1',
					label: '女'
				}],

				time: null, //防抖
				notify: null,
				percentage: 25, // 进度条初始数据
				customColor: '#f2a373', // 进度条颜色
				isPassword: '',
				password: '',
				imageBASE64: '',
				// 登录数据， 差最后的验证
				loginMessage: {
					studentID: '',
					phone: '',
					userName: '',
					college: '',
					realName: '',
					email: '',
					sex: '',
					birth: '',
					headImage: 'http://172.20.216.24:11119/images/default.jpg',
					password: '',
				},

				// 验证
				isTrueSNo: true,
				isTruePhone: true,
				isTrueMail: true,
				passwordLen: true,
				isTruePassword: true,
				isVerify: 0
			};
		},
		components: {
			HeaderNoRight,
			PuzzleVcode
		},
		methods: {
			/* 进度条 **/

			// 下一步
			increase() {
				if (this.notify !== null)
					this.notify.close()
				let percentage = this.percentage
				// 判断学号与手机号码是否唯一
				if (percentage === 25 && this.notNull && this.standart) {
					let loadingInstance1 = Loading.service({
						fullscreen: true
					});
					const params = {
						studentID: this.loginMessage.studentID,
						phone: this.loginMessage.phone
					}
					this.$api.uniVariable(params).then(
						response => {
							loadingInstance1.close()
							if (response.data.data.code !== 0) {
								this.percentage = 25
								this.notify = this.$notify.error({
									message: response.data.data.msg,
								});
							} else {
								this.percentage += 25;
							}
						}
					)
				} else if (percentage === 75 && this.notNull && this.standart) {
					let loadingInstance1 = Loading.service({
						fullscreen: true
					});
					this.$api.uploadImage({
						imageBASE64: this.imageBASE64
					}).then(
						response => {
							loadingInstance1.close()
							if (response.data.data.code === 0) {
								this.percentage += 25
								this.loginMessage.headImage = response.data.data.msg
							} else {
								this.percentage = 75
								this.notify = this.$message.error({
									message: response.data.data.msg,
								});
							}
						}
					)
				} else if (this.notNull && this.standart) {
					this.percentage += 25;
					if (this.percentage > 100) {
						this.percentage = 100;
					}
				} else {
					this.notify = this.$message.error("请确认填写信息！")
				}
			},
			// 上一步
			decrease() {
				this.percentage -= 25;
				if (this.percentage < 0) {
					this.percentage = 0;
				}
			},

			/* 上传头像 **/

			// 上传文件之前的钩子，参数为上传的文件，若返回 false，则停止上传。
			beforeAvatarUpload(file) {
				const isJPGandPNG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt500k = file.size / 1024 / 1024 < 0.5;
				if (isJPGandPNG && isLt500k) {
					let filereader = new FileReader();
					filereader.readAsDataURL(file)
					filereader.onload = () => {
						this.imageBASE64 = filereader.result
						console.log(this.imageBASE64)
					}
				} else {
					if (!isJPGandPNG) {
						this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
					}
					if (!isLt500k) {
						this.$message.error('上传头像图片大小不能超过 2MB!');
					}
				}
				return false;
			},
			// 覆盖默认的上传行为，可以自定义上传的实现
			HttpRequest(request) {
				//console.log(request)
			},
			// 文件上传成功时的钩子
			handleAvatarSuccess(res, file) {
				this.headImage = URL.createObjectURL(file.raw);
			},

			/* 验证 **/

			// 学号长度校验 
			checkSNo() {
				let reg = /^\d{1,}$/
				let pattern = new RegExp(reg);
				let len = this.loginMessage.studentID.length
				let bool = pattern.test(this.loginMessage.studentID)
				if (this.notify != null)
					this.notify.close()
				if ((len > 15 || len < 8) && bool) {
					this.isTrueSNo = false
					if (len > 15) {
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
					if (!bool) {
						this.isTrueSNo = false
						this.notify = this.$notify.error({
							title: '输入信息有误',
							message: '亲，学号只能包含数字！',
						});
					} else
						this.isTrueSNo = true
				}
				if (this.loginMessage.studentID === '')
					this.isTrueSNo = true
			},
			// 手机号正则校验 
			checkPhone() {
				const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
				let phone = this.loginMessage.phone.length
				if (this.notify != null)
					this.notify.close()
				if (this.loginMessage.phone !== '' && (phone > 11 || phone < 11)) {
					if (!regMobile.test(this.loginMessage.phone)) {
						this.isTruePhone = false
						this.notify = this.$notify.error({
							title: '输入信息有误',
							message: '亲，请输入正确的手机号码！',
						});
					}
				} else {
					this.isTruePhone = true
				}
			},
			// 邮箱正则校验 
			checkMail() {
				const regEemail =
					/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
				if (this.loginMessage.email != "" && !regEemail.test(this.loginMessage.email)) {
					this.isTrueMail = false
				} else {
					this.isTrueMail = true
				}
			},
			// 密码长度校验
			checkPasswordLen() {
				if (this.password != "" && this.password.length < 8) {
					this.passwordLen = false
					this.notify = this.$notify.error({
						title: '密码格式错误',
						message: '密码不少于8位字符！',
					});
				} else {
					this.passwordLen = true
				}
			},
			// 确认密码
			checkPassword() {
				if (this.time != null)
					clearTimeout(this.time)
				this.time = setTimeout(() => {
					if (this.notify != null)
						this.notify.close()
					if (this.isPassword.length > 0 && this.password === this.isPassword) {
						this.isTruePassword = true
					} else {
						this.isTruePassword = false
						if (this.isPassword.length == this.password.length) {
							this.notify = this.$notify.error({
								title: '密码不一致',
								message: '亲，请重新确认密码！',
							});
						}
					}
				}, 600)
			},

			/* 发送请求 **/
			submit() {
				if (this.notify !== null)
					this.notify.close()
				if (this.standart && this.notNull) {
					let md5 = crypto.createHash("md5"); //md5加密对象
					md5.update(this.password) //需要加密的密码
					this.loginMessage.password = md5.digest('hex'); //password 加密完的密码
					this.$api.register(this.loginMessage).then(
						response => {
							if (response.data.data.code === 0) {
								this.$message({
									type: 'success',
									message: `${response.data.data.msg}`
								});
								this.$router.push({
									path: '/login'
								})
							} else {
								this.$message.success({
									title: '请求状态',
									message: response.data.data.msg,
								})
							}
						}
					)
				} else {
					if (this.isTruePassword && this.passwordLen && this.notNull)
						this.notify = this.$message.error("请进行人机验证！")
					else
						this.notify = this.$message.error("请确认填写信息！")
				}
			}
		},
		computed: {
			/* 当所有数据验证成功后返回true **/
			standart() {
				let bool = false
				if (this.percentage === 25)
					bool = this.isTrueSNo && this.isTruePhone
				else if (this.percentage === 50)
					bool = this.isTrueMail
				else if (this.percentage === 75)
					bool = this.imageBASE64 !== ''
				else if (this.percentage === 100)
					bool = this.passwordLen && this.isTruePassword && this.isVerify === 1
				return bool
			},
			/* 当数据不存在空字符串时返回true **/
			notNull() {
				let bool = false
				let arr = Object.values(this.loginMessage).filter(item => {
					if (item !== '') {
						return true
					}
				})
				if (this.percentage === 25)
					bool = arr.length >= 3
				else if (this.percentage === 50)
					bool = arr.length >= 6
				else if (this.percentage === 75)
					bool = arr.length >= 8
				else if (this.percentage === 100)
					bool = arr.length >= 9 && this.password !== '' && this.isPassword !== ''
				return bool
			}
		},
		watch: {
			percentage(newVal) {
				if (newVal === 50) {
					let loadingInstance1 = Loading.service({
						fullscreen: true
					});
					this.$api.getCollegeList().then(
						response => {
							loadingInstance1.close()
							if (response.data.data.result === -1) {
								this.$message.error({
									message: response.data.data.msg,
								});
							} else {
								this.faculties = response.data.data.college
							}
						}
					)
				}
			}
		}
	}
</script>

<style scoped="scoped">
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
		background-color: var(--bg);
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
		/* border: 0.0625rem solid rgba(0, 0, 0, .25); */
		box-shadow: var(--box-shadow2);
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

	.register_form .msg_input {
		width: 100%;
		height: 3.75rem;
	}

	.register_form .msg {
		font-size: 0.75rem;
		color: #ec0000;
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

	.register_links a {
		color: inherit;
		font-size: 14px;
	}

	.register_links a:hover {
		color: #1DA0FB;
		font-size: 14px;
	}

	.el-select.college {
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
	>>>.avatar-uploader {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	>>>.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 2.5rem;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	>>>.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	>>>.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 5rem;
		height: 5rem;
		line-height: 5rem;
		text-align: center;
	}

	>>>.avatar {
		width: 5rem;
		height: 5rem;
		display: block;
	}

	.register_3 .sex {
		width: 35%;
	}

	.register_3 .date {
		width: 60%;
	}

	.mistaken >>>.el-input__inner:focus,
	.mistaken >>>.el-input__inner {
		outline-color: #ff0000;
		border-color: #FF0000;
	}

	.el-button-group >>>.el-button,
	.el-button-group >>>.el-button:hover {
		background-color: #f2a373;
		border-color: #f2a373;
	}
	
	@media screen and (max-width: 480px) {
		.register_box {
			box-shadow: none;
			width: 100%;
			background-color: transparent;
		}
		
		.register_box .register>div {
			background-color: var(--bg);
		}
		
		.easy_photo {
			display: none;
		}
		
	}
</style>
