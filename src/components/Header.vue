<template>
	<!-- <div> -->
	<header>
		<div class="warp">
			<div class="logo">
				<router-link :to="{path:'/'}" title="Easy社团">Easy社团</router-link>
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
						<el-dropdown-item @click.native="centerDialogVisible = true">发送邮件</el-dropdown-item>
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

		<el-dialog title="发送邮件" :visible.sync="centerDialogVisible" width="61.8%" center :append-to-body="true">
			<span>
				<div class="form">
					<div class="title">
						<label>邮件标题：</label>
						<el-input v-model="title" maxlength="120" show-word-limit placeholder="请输入邮件标题"></el-input>
					</div>
					<div class="content">
						<el-input type="textarea" maxlength="255" :rows="10" v-model="input" placeholder="请输入私信内容"
							show-word-limit></el-input>
					</div>
					<div class="to_man">
						<div class="to_man_tag">
							<label>收件人：</label>
							<el-tag v-show="toManTag != ''" closable :disable-transitions="false" size="small">
								{{toManTag}}
							</el-tag>
						</div>
						<div class="search_man">
							<el-input placeholder="请输入收件人的名称/昵称/电话号码/学号..." v-model="input">
							</el-input>
							<div>
								<el-tag :key="tag" v-for="tag in dynamicTags" :disable-transitions="false"
									size="medium" @click="">
									{{tag}}
								</el-tag>
							</div>
						</div>
					</div>
				</div>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		

	</header>
</template>

<script>
	import LocalStorage from '../utils/LocalStorage'
	import time from '../utils/time.js'
	import {
		mapState
	} from 'vuex'
	import base from '../api/request/base.js'; // 导入接口域名列表


	export default {
		name: 'Header',
		data() {
			return {
				centerDialogVisible: false,
				title: '',
				input: '',
				dynamicTags: ['huanoxcs 202020202020220', '标签二', '标签三','标签一'],
				inputVisible: false,
				inputValue: '',
				toManTag: ''
			}
		},
		methods: {
			logout() {
				console.log("退出登录处理.....")
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
									this.$store.commit("addOlineTime", time.formatDate)
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
			toMyHomePage() {
				this.$router.push({
					name: 'Me',
					params: {
						uid: this.uid
					}
				})
			},
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},
			
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.dynamicTags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
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
		z-index: 2000;
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
		max-width: 8rem;
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

	>>>.el-dropdown-link {
		cursor: pointer;
		color: #409eff;
		display: flex;
		align-items: center;
	}

	>>>.el-dropdown-link>div {
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
	
	.search_man .el-tag {
		margin-top: 0.5rem;
		cursor: pointer;
	}
	
	.el-tag {
		
		margin-right: 0.5rem;
	}
	
	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}
	
	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
	
	.to_man {
		margin-top: 0.5rem;
	}
	
	.to_man .to_man_tag {
		padding: 0.25rem 0;
	}
	
	.to_man .search_man {
		padding: 0.25rem 0;
	}
	
	.to_man .search_man > div {
		padding: 0.25rem 0;
	}
	
	.form .title {
		width: 100%;
		padding: 0.25rem 0;
		display: flex;
		align-items: center;
	}
	
	.form .title label {
		white-space: nowrap;
	}
	
	.form .content {
		margin-top: 0.5rem;
	}
	
	.form .content>>> .el-textarea__inner {
		resize: none;
	}

	@media screen and (max-width: 480px) {
		header {
			width: 100%;
			box-sizing: border-box;
			background-color: #fff;
			box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, .12), 0 0 0.375rem rgba(0, 0, 0, .04);
			z-index: 2000;
		}

		header .warp {
			padding: 0 0.25rem;
		}
		
		.el-dialog {
			width: 98%!important;
		}
	}
</style>
