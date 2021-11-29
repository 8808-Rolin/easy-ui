<template>
	<div>
		<div v-show="status === 0">
			<div class="info">
				<div class="title">
					<span v-show="status === 0"><strong>我的信息</strong></span>
					<el-button @click="updateUser('头像')" type="text" v-show="status === 0" icon="el-icon-camera">修改头像
					</el-button>
				</div>
				<p style="cursor: default;">手机号码：<span>{{user.phone}}</span></p>
				<el-tooltip :content="user.email" placement="top" :open-delay="500">
					<p @click="updateUser('电子邮箱')">电子邮箱：<span>{{user.email}}</span></p>
				</el-tooltip>
				<p style="cursor: default;">所属院系：<span>{{user.college}}</span></p>
				<p @click="updateUser('生日')">生&emsp;&emsp;日：<span>{{user.birth}}</span></p>
				<p style="cursor: default;">发帖数量：<span>{{user.numpost}}</span></p>
			</div>

			<div class="notice">
				<div class="title">
					<strong>公告</strong>
				</div>
				<div class="item_box">
					<el-input :class="{notice_text:status===0}" :debounce="500" v-bind:readonly="status!==0"
						@blur="updateNotice" autosize type="textarea" placeholder="请输入内容" v-model="user.notice">
					</el-input>
				</div>
			</div>
			
			<el-dialog title="修改我的信息" :visible.sync="centerDialogVisibleDate" width="30%">
				<div>
					<el-date-picker v-model="date" type="date" placeholder="选择日期" style="width: 100%;"
						format="yyyy-MM-dd" value-format="yyyy-MM-dd">
					</el-date-picker>
				</div>
				<span slot="footer" class="dialog-footer" style="display: flex;justify-content: center;">
					<el-button @click="centerDialogVisibleDate = false">取 消</el-button>
					<el-button type="primary" @click="updateBirth">修改</el-button>
				</span>
			</el-dialog>

			<el-dialog title="修改我的信息" :visible.sync="centerDialogVisibleImage" width="30%" center>
				<div style="text-align: center;">
					<el-upload class="avatar-uploader" action="#" :show-file-list="false"
						:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
						:http-request="HttpRequest">
						<img v-if="imageBASE64" :src="imageBASE64" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>

				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="centerDialogVisibleImage = false">取 消</el-button>
					<el-button type="primary" @click="updateImage">修改</el-button>
				</span>
			</el-dialog>
		</div>
		<div v-show="status !== 0">
			<div class="info">
				<div class="title">
					<span v-show="status !== 0">他的信息</span>
					<el-button type="text" v-show="status !== 0" icon="el-icon-message"
						@click="centerDialogVisible2 = true">发送私信</el-button>
				</div>
				<p>手机号码：<span>{{user.phone}}</span></p>
				<el-tooltip :content="user.email" placement="top" :open-delay="500">
					<p>电子邮箱：<span>{{user.email}}</span></p>
				</el-tooltip>
				<p>所属院系：<span>{{user.college}}</span></p>
				<p>生&emsp;&emsp;日：<span>{{user.birth}}</span></p>
				<p>发帖数量：<span>{{user.numpost}}</span></p>
			</div>

			<div class="notice">
				<div class="title">
					公告
				</div>
				<div class="item_box">
					<el-input :class="{notice_text:status===0}" :debounce="500" v-bind:readonly="status!==0"
						@blur="updateNotice" autosize type="textarea" placeholder="请输入内容" v-model="user.notice">
					</el-input>
				</div>
			</div>


			<!-- 对话框，发送邮件 -->
			<el-dialog title="发送私信" :visible.sync="centerDialogVisible2" width="30%" center>
				<div class="form">
					<div>
						<label>私信标题：</label>
						<el-input v-model="title" maxlength="120" show-word-limit placeholder="请输入内容"></el-input>
					</div>
					<div>
						<el-input type="textarea" maxlength="255" :rows="10" v-model="input" placeholder="请输入私信内容" show-word-limit></el-input>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="centerDialogVisible2 = false">取 消</el-button>
					<el-button type="primary" @click="sendEmail">发送</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import axios from '@/utils/http'; // 导入http中创建的axios实例
	import base from '@/api/request/base.js'
	import qs from 'qs'; // 根据需求是否导入qs模块
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'PersonalInfo',
		props: ['user', 'status'],
		data() {
			return {
				change: false,
				content: '',
				change: false,
				message: null,
				centerDialogVisible2: false,
				centerDialogVisibleImage: false,
				centerDialogVisibleDate: false,
				input: '',
				title: '',
				imageUrl: '',
				value: 'asda',
				date: '',
				imageBASE64: '',
			}
		},
		methods: {
			/* 修改我的公告 */
			updateNotice() {
				if (this.message !== null)
					this.message.close()
				let newProfile = this.user.notice
				let uid = this.user.uid
				if (this.status === 0) {
					if (this.change) {
						this.$api.updateNotice({
							newProfile,
							uid
						}).then(
							res => {
								this.message = this.$message.success(res.data.data.msg)
								this.content = ''
								this.change = false
							}
						)
					} else {
						this.message = this.$message.info("请先修改参数！！")
					}
				}
			},
			/* 修改个人信息 */
			updateUser(usermes) {
				if (this.message !== null)
					this.message.close()
				let nameList = ['昵称', '简介', '头像', '电子邮箱', '生日']
				let urlList = ['update-name', 'update-intro', 'update-profile', 'update-email', 'update-birth']
				let list = ['name', 'intro', 'profile', 'email', 'birth']
				let myPattern = ''
				if (usermes === '电子邮箱')
					myPattern =
					/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
				let index = nameList.indexOf(usermes)
				let url = urlList[index]
				let uid = this.user.uid
				console.log(url, uid)

				if (usermes === '头像') {
					this.centerDialogVisibleImage = true
				} else if (usermes === '生日') {
					this.centerDialogVisibleDate = true
				} else {
					this.$prompt(`请输入${usermes}`, `修改我的信息`, {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						inputPattern: myPattern,
						inputErrorMessage: '邮箱格式不正确',
					}).then(({
						value
					}) => {
						let newProfile = value
						let params = {
							uid,
							newProfile
						}
						console.log(params)
						axios.post(`${base.sq}/api/zone/${url}`, qs.stringify(params)).then(
							res => {
								console.log(res.data.data)
								if (res.data.data.code === 0) {
									this.message = this.$message({
										type: 'success',
										message: res.data.data.msg
									});
									this.updateVuexUser(uid)
									this.user[list[index]] = newProfile

								} else {
									this.message = this.$message({
										type: 'success',
										message: res.data.data.msg
									});
								}
							}
						);
					}).catch(val => {
						console.log(val)
						if (val === 'cancel') {
							this.message = this.$message({
								type: 'info',
								message: '取消输入'
							});
						} else {
							this.message = this.$message({
								type: 'error',
								message: val
							});
						}
					});
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
						/* let imageBASE64 = filereader.result
						this.$api.uploadImage({imageBASE64}).then(
							res => {
								this.imageUrl = res.data.data.msg
							}
						) */
					}
				} else {
					if (!isJPGandPNG) {
						this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
					}
					if (!isLt500k) {
						this.$message.error('上传头像图片大小不能超过 2MB!');
					}
				}
				return false
			},
			// 覆盖默认的上传行为，可以自定义上传的实现
			HttpRequest(request) {
				console.log(request)
			},
			// 文件上传成功时的钩子
			handleAvatarSuccess(res, file) {
				console.log(res)
				//this.headImage = URL.createObjectURL(file.raw);
			},

			/* 修改头像 */
			updateImage() {
				let uid = this.user.uid
				let imageBASE64 = this.imageBASE64
				this.$api.uploadImage({
					imageBASE64
				}).then(
					res => {
						if (res.data.data.code === 0) {
							this.imageUrl = res.data.data.msg
							let newProfile = this.imageUrl
							this.$api.updateProfile({
								uid,
								newProfile
							}).then(
								res => {
									this.$message.success(res.data.data.msg)
									this.updateVuexUser(uid)
									this.centerDialogVisibleImage = false
									this.imageBASE64 = ''
								}
							)
						} else {
							this.$message.error(res.data.data.msg)
						}
					}
				)
			},
			/* 更改生日 */
			updateBirth() {
				let uid = this.user.uid
				let newProfile = this.date
				this.$api.updateBirth({
					uid,
					newProfile
				}).then(
					res => {
						if (res.data.data.code === 0) {
							this.user.birth = newProfile
							this.$message.success(res.data.data.msg)
							this.centerDialogVisibleDate = false
						} else {
							this.$message.error(res.data.data.msg)
						}
					}
				)
			},

			/* 更改vuex中缓存的user */
			updateVuexUser(uid) {
				this.$api.getCommonPersonInformation({
					uid
				}).then(
					res => {
						if (!res.data.data.code) {
							this.$store.commit("addUser", res.data.data.user)
						}
					}
				)
			},
			
			/* 发送私信 */
			sendEmail() {
				if (this.message !== null)
					this.message.close()
				let isSystem = 0
				let mailType = 0
				let fromuid = this.myUid
				let touid = this.$route.params.uid
				let title = this.title + '|=|' + this.myUid
				let content = this.input
				this.$api.sendEmail({isSystem,mailType,fromuid,touid,title,content}).then(
					res => {
						if (res.data.data.code > -1) {
							this.message = this.$message.success(res.data.data.msg)
							this.centerDialogVisible2 = false
							this.title = ''
							this.input = ''
						} else {
							this.message = this.$message.error(res.data.data.msg)
						}
					}
				)
			}
		},
		computed: {
			notice() {
				return this.user.notice
			},
			...mapState({
				myUid: state => state.request.uid,
			}),
		},
		watch: {
			notice(newval, oldval) {
				if (this.content === '')
					this.content = oldval !== undefined ? oldval : newval

				if (this.content === this.user.notice)
					this.change = false
				else
					this.change = true
				// console.log(this.content, "=============", newval, this.change)
			}
		},
		mounted() {
			this.$bus.$on('updateUser', this.updateUser)
		},
		beforeDestroy() {
			this.$bus.$off('updateUser')
		},
	}
</script>

<style lang="less" scoped="scoped">
	/deep/.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	/deep/.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	/deep/.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	/deep/.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.info {
		padding: 0.5rem 1rem;
		box-shadow: var(--box-shadow2);
		background-color: var(--bg);

		.title {
			padding: 0.5rem 0;
			border-bottom: solid 0.0625rem #999;
			display: flex;
			justify-content: space-between;
			align-items: center;

			/deep/.el-button {
				padding: 0.25rem;
			}
		}

		p {
			line-height: 2;
			margin-top: 0.5rem;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			cursor: pointer;
		}
	}

	.notice {
		margin-top: 1rem;
		padding: 0.5rem;
		box-shadow: var(--box-shadow2);
		background-color: var(--bg);

		.title {
			padding: 0.5rem 0;
			border-bottom: solid 0.0625rem #999;
		}

		.item_box {
			height: 12rem;
			overflow: auto;

			/**滚动条的宽度*/
			&::-webkit-scrollbar {
				width: 0.5rem;
				height: 100%;
			}

			/* 滚动条的滑块 */
			&::-webkit-scrollbar-thumb {
				background: #1DA0FB;
				-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
				border-radius: 0.25rem;
			}
		}
	}

	/deep/.el-textarea__inner {
		height: 100% !important;
		min-height: 100% !important;
		// margin-top: 0.5rem;
		resize: none;
		background-color: transparent;
		border: none;

		/**滚动条的宽度*/
		&::-webkit-scrollbar {
			width: 0.5rem;
			height: 100%;
		}

		/* 滚动条的滑块 */
		&::-webkit-scrollbar-thumb {
			background: #1DA0FB;
			// -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 0.25rem;
		}
	}

	/deep/.el-textarea {
		height: 100%;
	}

	/deep/.notice_text textarea:focus {
		font-size: 0.75rem;
		background-color: #f1f4f2;
		border-radius: 0.75rem;
	}

	.form {
		height: 18.75rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.form>div {
		display: flex;
		align-items: center;
	}

	.form>div label {
		width: 6rem;
		line-height: 2;
	}

	/deep/.form textarea {
		resize: none;
		border: 0.0625rem solid #dcdfe6;
	}
</style>
