<template>
	<div>
		<HeaderHasSearch></HeaderHasSearch>
		<div class="main_box">
			<Info></Info>

			<div class="club">
				<!-- 左边社团信息 -->
				<div class="club_mes">
					<div class="club_logo">
						<img :src="assImage(ass.assImage)">
					</div>
					<div class="mes">
						<div class="name">
							<div class="club_name">
								<strong>{{ass.assName}}</strong>
							</div>
							<div class="join_club">
								<el-button v-show="permissionCode === 0" @click="joinAssociation">加入社团</el-button>
								<el-button v-show="permissionCode === 2" @click="toAdmin">社团管理</el-button>
							</div>
						</div>
						<div class="club_superior">
							<strong>社团对接组织：</strong>{{ass.assOrg}}
						</div>
						<div class="club_intro">
							<small><strong>简介：</strong>{{ass.assIntro}}</small>
						</div>
					</div>
				</div>

				<!-- 右边社团活动区 -->
				<div class="club_action">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span>社团活动</span>
						</div>
						<div v-for="item in actionOverview" :key="item.actid" class="text item"
							@click="centerDialogVisible = true;getActionInfo(item.actid)">
							<a class="notice_title"><strong>{{item.title}}</strong></a>
							<a><small>{{item.date}}</small></a>
						</div>
					</el-card>

					<el-dialog :title="dialogData.title" :visible.sync="centerDialogVisible" width="30%" center>
						<span v-html="dialogData.content"></span>
						<span slot="footer" class="dialog-footer">
							<el-button @click="centerDialogVisible = false">取&emsp;消</el-button>
							<el-button v-show="dialogData.status !== 2" type="primary"
								@click="joinAction(centerDialogVisible)">报&emsp;名</el-button>
							<el-button v-show="dialogData.status === 2" type="primary" disabled>已报名</el-button>
						</span>
					</el-dialog>
				</div>
			</div>

			<div class="notice_box">
				<MakesNotice :permission="permissionCode" :chaildPosts="posts" :chaildFirstPosts="firstposts"
					:total="code" :aid="$route.params.aid" :notisSize="notSize" :tinymceId="'ctinymceId'"></MakesNotice>
			</div>
			<!-- 废物div -->
			<div style="height: 1rem;"></div>
		</div>
	</div>
</template>

<script>
	import HeaderHasSearch from '../components/HeaderHasSearch.vue'
	import Info from '../components/info.vue'
	import MakesNotice from '../components/MakesNotice.vue'
	import base from '../api/request/base.js'
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'Community',
		props: ['chaildPosts', 'chaildFirstPosts', 'total', 'aid', 'notisSize', 'permission', 'tinymceId'],
		data() {
			return {
				permissionCode: 0,
				ass: [],
				options: [{
					label: '社团公告',
					value: 1,
				}],
				actionOverview: [],
				posts: [],
				firstposts: [],
				code: 0,
				page: 1,
				limit: 10,
				notSize: 0,
				// 对话框
				dialogData: {},
				centerDialogVisible: false,
				message:null,
			}
		},
		components: {
			HeaderHasSearch,
			Info,
			MakesNotice
		},
		methods: {
			getMassOrganization() {
				let uid = this.uid
				let aid = this.$route.params.aid
				this.$api.getAssInformation({
					uid,
					aid
				}).then(
					res => {
						this.permissionCode = res.data.data.permissionCode
						this.ass = res.data.data.ass
					}
				)
			},
			getActionOverview() {
				let uid = this.uid
				let aid = this.$route.params.aid
				this.$api.getActionOverview({
					uid,
					aid
				}).then(
					res => {
						this.actionOverview = res.data.data.action
					}
				)
			},
			getFistPostList(type, page, limit) {
				let aid = this.$route.params.aid
				this.$api.getPostList({
					aid,
					type,
					page,
					limit
				}).then(
					res => {
						this.posts = res.data.data.posts
						this.code = res.data.data.code
					}
				)
			},
			getPostList(type, page, limit) {
				let aid = this.$route.params.aid
				this.$api.getPostList({
					aid,
					type,
					page,
					limit
				}).then(
					res => {
						this.firstposts = res.data.data.posts
						this.notSize = res.data.data.code
					}
				)
			},
			assImage(assImage) {
				return `${base.sq}${assImage}`
			},
			joinAssociation() {
				this.$api.joinAssociation().then(
					res => {
						this.firstposts = res.data.data.posts
						this.notisSize = res.data.data.code
						this.code = this.code + this.notisSize
					}
				)
			},
			/* 获取活动详细内容**/
			getActionInfo(actid) {
				let uid = this.uid
				this.$api.getActionInfo({
					actid,
					uid
				}).then(
					res => {
						this.dialogData = res.data.data
						this.dialogData.actid = actid
					}
				)
			},
			joinAction(centerDialogVisible) {
				if (this.message !== null)
					this.message.close()
				let status = this.dialogData.status
				if (status === 0) {
					this.participate()
				} else if (status === 1) {
					this.message = this.$message.error("你没有权限参加活动")
					this.centerDialogVisible = false
				}
			},
			participate() {
				let uid = this.uid
				let actid = this.dialogData.actid
				this.$api.participate({
					uid,
					actid
				}).then(
					res => {
						this.message = this.$message.success(res.data.data.msg)
						this.centerDialogVisible = false
					}
				)
			},
			/* 前往管理员界面 */
			toAdmin() {
				let aid = this.$route.params.aid
				let studentID = this.user.studentID
				window.location.href = `${base.mq}/dashboard?aid=${aid}&studentID=${studentID}`
			},
			/* 加入社团 */
			joinAssociation() {
				if (this.message !== null)
					this.message.close()
				let aid = this.$route.params.aid
				let uid = this.uid
				this.$prompt('请输入备注', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,40}$/,
					inputErrorMessage: '备注不能超过40个字且不能输入非法字符'
				}).then(({
					value
				}) => {
					console.log(value, value.trim())
					if (value === null || value.trim() === '') {
						this.message = this.$message({
							type: 'error',
							message: '备注不能为空'
						});
					} else {
						this.$api.joinAssociation({aid,uid,note:value.trim()}).then(
							res => {
								this.message = this.$message({
									type: 'success',
									message: res.data.data.msg
								});
								//console.log(res.data)
							}
						)
					}
				}).catch(error => {
					if (error === 'cancel') {
						this.message = this.$message({
							type: 'info',
							message: '取消输入',
						});
					} else {
						this.message = this.$message({
							type: 'error',
							message: error,
						});
					}
				});
			}
		},
		computed: {
			...mapState({
				uid: state => state.request.uid,
				user: state => state.message.user,
			}),
		},
		created() {
			this.getMassOrganization()
			this.getActionOverview()
			this.getFistPostList(2, this.page, this.limit)
			this.getPostList(1, this.page, this.limit)
		},
		mounted() {
			this.$bus.$on('cgetPostList', this.getPostList)
			this.$bus.$on('getFistPostList', this.getFistPostList)
		},
		beforeDestroy() {
			this.$bus.$off('cgetPostList')
			this.$bus.$off('getFistPostList')
		},
	}
</script>

<style scoped="scoped">
	.main_box {
		width: 100%;
		max-width: 75rem;
		margin: auto;
		position: relative;
		top: 3rem;
	}

	.main_box .club {
		width: 100%;
		height: 12rem;
		margin-top: 0.625rem;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
		box-shadow: var(--box-shadow2);
		background-color: var(--bg);
	}

	.main_box .club>div {
		position: absolute;
		height: 11rem;
	}

	.main_box .notice_box {
		padding: 1rem;
		margin-top: 3rem;
		border-radius: 1rem;
		box-shadow: var(--box-shadow2);
		background-color: var(--bg);
	}

	/* 左边信息框 */
	.club_mes {
		width: 65%;
		left: 1rem;
		padding: 0.3125rem;
		display: flex;
		align-items: center;
	}

	.club_mes .club_logo {
		width: 9rem;
		height: 9rem;
		border-radius: 50%;
		overflow: hidden;
	}

	.club_mes .club_logo img {
		width: 100%;
		height: 100%;
	}

	.club_mes .mes {
		width: calc(100% - 10rem);
		margin-left: 1.25rem;
		display: block;
		text-align: left;
	}

	.club_mes .mes .name {
		height: 3rem;
		font-size: 2rem;
		display: flex;
		justify-content: space-between;
	}

	.club_mes .mes .name .club_name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.club_mes .mes .name .join_club .el-button {
		background-color: #1DA0FB;
		color: #FFFFFF;
		border: none;
		font-weight: bold;
		box-shadow: var(--box-shadow1);
	}

	.club_mes .mes .club_superior {
		height: 1.5rem;
	}

	.club_mes .mes .club_intro {
		height: 4.5rem;
	}


	/* 右边活动框 */
	.club_action {
		width: 30%;
		right: 1rem;
		padding: 0.3125rem;
	}

	/* 活动卡片 */
	.text {
		font-size: 14px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item {
		width: 100%;
		padding: 0.5rem 0.25rem;
		margin-bottom: 0.1875rem;
		border-radius: 0.375rem;
		box-shadow: var(--box-shadow1);
		cursor: pointer;
	}

	.notice_title {
		width: 80%;
		max-height: 1.05rem;
		overflow: hidden;
		word-wrap: normal;
		text-align: left;
	}

	>>>.el-card__header {
		width: 100%;
		background-color: #1DA0FB;
		color: #fff;
		z-index: 100;
		padding: 0.5rem 1.25rem;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	>>>.box-card {
		width: 100%;
		height: 100%;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	>>>.el-card__body {
		width: 100%;
		height: 100%;
		padding: 0.625rem;
		overflow-y: scroll;
		background-color: #FAFAFA;
	}

	/**滚动条的宽度*/
	>>>.el-card__body::-webkit-scrollbar {
		width: 0.5rem;
		height: 100%;
	}

	/* 滚动条的滑块 */
	>>>.el-card__body::-webkit-scrollbar-thumb {
		background: #1DA0FB;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}
</style>
