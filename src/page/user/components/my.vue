<template>
	<div>
		<Info></Info>

		<div class="homepage">
			<div class="left">
				<el-tabs class="top_box" v-model="activeName2" @tab-click="handleClick2">
					<el-tab-pane label="我的社团" name="0">
						<div v-show="joinass === null" style="text-align: center;">尚未加入任何社团</div>
						<MyClub :ass="joinass"></MyClub>
					</el-tab-pane>
					<el-tab-pane label="我的邮箱" name="1">
						<el-tabs tab-position="left" v-model="mailType" @tab-click="getMaileClick">
							<el-tab-pane label="收件箱" name="1">
								<div class="btn_box">
									<el-button type="danger" @click.native="deleteMail" icon="el-icon-delete"
										size="mini">清空
									</el-button>
								</div>
								<div v-show=""></div>
								<el-table class="email_table" :data="inboxData" style="width: 100%" fit height="313">
									<div v-show="inboxData === null" style="text-align: center;">暂无邮件</div>
									<el-table-column label="状态" width="50">
										<template slot-scope="scope">
											<el-tag type="success" size="mini" v-show="scope.row.isRead === 1">已读
											</el-tag>
											<el-tag type="danger" size="mini" v-show="scope.row.isRead === 0">未读
											</el-tag>
										</template>
									</el-table-column>
									<el-table-column class="title_2" label="标题">
										<template slot-scope="scope">
											<el-tooltip :content="updateTitle(scope.row.title)" placement="top"
												@click.native="handleEdit(scope.$index, scope.row);centerDialogVisible = true;getMailContent(scope.row.mid)">
												<div>{{updateTitle(scope.row.title)}}</div>
											</el-tooltip>
										</template>
									</el-table-column>
									<el-table-column label="发送人" prop="name"></el-table-column>
									<el-table-column label="发送时间" width="180" v-if="showTd">
										<template slot-scope="scope">
											<i class="el-icon-time"></i>
											<span style="margin-left: 10px">{{ scope.row.date }}</span>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="100" v-if="showTd">
										<template slot-scope="scope">
											<el-badge :is-dot="scope.row.isRead === 0" class="item">
												<el-button size="mini" type="primary"
													@click="handleEdit(scope.$index, scope.row);centerDialogVisible = true;getMailContent(scope.row.mid);getHisId(scope.row.title)">
													查看
												</el-button>
											</el-badge>
										</template>
									</el-table-column>
								</el-table>
							</el-tab-pane>
							<el-tab-pane label="发件箱" name="0">
								<el-table class="email_table" :data="outboxData" style="width: 100%" fit height="313">
									<div v-show="outboxData === null" style="text-align: center;">暂无邮件</div>
									<el-table-column label="状态" width="50">
										<template slot-scope="scope">
											<el-tag type="success" size="mini" v-show="scope.row.isRead === 1">已读
											</el-tag>
											<el-tag type="danger" size="mini" v-show="scope.row.isRead === 0">未读
											</el-tag>
										</template>
									</el-table-column>
									<el-table-column class="title_2" label="标题">
										<template slot-scope="scope">
											<el-tooltip :content="updateTitle(scope.row.title)" placement="top"
												@click.native="handleEdit(scope.$index, scope.row);centerDialogVisible = true;getMailContent(scope.row.mid)">
												<div>{{updateTitle(scope.row.title)}}</div>
											</el-tooltip>
										</template>
									</el-table-column>
									<el-table-column label="发送人" prop="name"></el-table-column>
									<el-table-column label="发送时间" width="180" v-if="showTd">
										<template slot-scope="scope">
											<i class="el-icon-time"></i>
											<span style="margin-left: 10px">{{ scope.row.date }}</span>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="200" v-if="showTd">
										<template slot-scope="scope">
											<el-badge :is-dot="scope.row.isRead === 0" class="item">
												<el-button size="mini" type="primary"
													@click="handleEdit(scope.$index, scope.row);centerDialogVisible = true;getMailContent(scope.row.mid);getHisId(scope.row.title)">
													查看
												</el-button>
											</el-badge>
										</template>
									</el-table-column>
								</el-table>
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
				</el-tabs>

				<el-tabs class="bottom_box" v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="我的帖子" name="0">
						<div v-show="post === null" style="text-align: center;">尚未发帖</div>
						<!-- <Posts :posts="post"></Posts> -->
					</el-tab-pane>
					<el-tab-pane label="我的收藏" name="1">
						<div v-show="post === null" style="text-align: center;">尚未收藏</div>
						<!-- <Collection :myColl="post"></Collection> -->
					</el-tab-pane>
					<keep-alive>
						<component :is="current"></component>
					</keep-alive>
				</el-tabs>
			</div>

			<div class="right">
				<PersonalInfo :user="userdata" :status="code"></PersonalInfo>
			</div>

			<!-- 对话框，邮件内容 -->
			<transition name="el-zoom-in-center" :duration="5000">
				<el-dialog title="私信内容" v-show="centerDialogVisible" :visible.sync="centerDialogVisible" width="30%"
					center>
					<el-input type="textarea" maxlength="255" :rows="10" :readonly="true" :value="mailContent"
						placeholder="请输入私信内容" show-word-limit></el-input>
					<span slot="footer" class="dialog-footer">
						<el-button type="infor" @click="centerDialogVisible = false">关闭</el-button>
						<el-button v-show="mailType === '1' && showTd" type="primary"
							@click="centerDialogVisible2 = true; close()">回复</el-button>
					</span>
				</el-dialog>
			</transition>

			<!-- 对话框，发送邮件 -->
			<transition name="el-zoom-in-center" :duration="5000" v-show="showTd">
				<el-dialog title="发送私信" v-show="centerDialogVisible2" :visible.sync="centerDialogVisible2" width="30%"
					center>
					<div class="form">
						<div>
							<label>私信标题：</label>
							<el-input v-model="title" maxlength="120" show-word-limit placeholder="请输入内容"></el-input>
						</div>
						<div>
							<el-input type="textarea" maxlength="255" :rows="10" v-model="input" placeholder="请输入私信内容"
								show-word-limit></el-input>
						</div>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="centerDialogVisible = true;centerDialogVisible2 = false">返回</el-button>
						<el-button type="primary" @click="sendEmail">发送</el-button>
					</span>
				</el-dialog>
			</transition>
		</div>

		<!-- 空间是否开放 -->
		<div id="isOpen" :class="{open:open_huojian}">
			<el-button class="tou" icon="iconfont icon-huojian" @click="open_huojian = !open_huojian"></el-button>
			<el-button v-show="isOpenShow === 1" class="isOpenG" icon="iconfont icon-yanjing_guanbi"
				@click="isOpenShow = 0;updateSwitchState()"></el-button>
			<el-button v-show="isOpenShow === 0" class="isOpenD" icon="iconfont icon-yanjing_dakai"
				@click="isOpenShow = 1;updateSwitchState()">
			</el-button>
			<el-button class="fanhui" icon="iconfont icon-fanhui" plain @click="returnPage"></el-button>
		</div>

	</div>

</template>

<script>
	import MyClub from '@/components/homePage/club.vue'
	import Posts from '@/components/homePage/posts.vue'
	import Collection from '@/components/homePage/collection.vue'
	import PersonalInfo from '@/components/homePage/personalInfo.vue'
	import Info from '@/components/info.vue'
	import time from '@/utils/time.js'
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'MyHome',
		props: ['user', 'ass', 'posts', 'myColl', 'status'],
		components: {
			MyClub,
			Posts,
			PersonalInfo,
			Collection,
			Info
		},
		data() {
			return {
				activeName: 0,
				activeName2: 0,
				mailType: '1',
				userdata: {},
				joinass: [],
				post: [],
				code: '',
				mail: [],
				centerDialogVisible: false,
				centerDialogVisible2: false,
				mailContent: '',
				// 邮件类型
				selectValue: '',
				input: '',
				message: null,
				title: '',
				hisId: -1,
				dateList: [],
				inboxData: [],
				outboxData: [],
				current: 'Posts',
				getMailTimeout: null,
				isOpenShow: 0,
				open_huojian: false
			}
		},
		methods: {
			close() {
				setTimeout(() => {
					this.centerDialogVisible = false
				}, 500)
			},
			handleClick(tab, event) {
				//this.post = []
				//console.log(tab, event, "@@@@@@@@");
				if (this.activeName === '0')
					this.current = 'Posts'
				else
					this.current = 'Collection'
				//this.getPosts()
			},
			handleClick2(tab, event) {
				//console.log(tab, event, "@@@@@@@@");
			},
			getMaileClick() {
				if (this.getMailTimeout !== null)
					clearTimeout(this.getMailTimeout)
				this.getMailTimeout = setTimeout(() => {
					this.getMails()
				}, 1000)
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			/* 获取权限校验码 */
			getZoneStatus() {
				let muid = this.$route.params.uid
				this.$api.getZoneStatus({
					muid
				}).then(
					res => {
						this.code = res.data.data.code
						console.log(res.data)
					}
				)
			},
			/* 获取我的个人信息和公告 */
			getInformation() {
				let uid = this.$route.params.uid
				this.$api.getInformation({
					uid
				}).then(
					res => {
						this.joinass = res.data.data.joinass
						this.userdata = res.data.data.userdata
						console.log(res)
					}
				)
			},
			/* 获取邮箱概要数据 */
			getMails() {
				let uid = this.$route.params.uid
				this.$api.getMails({
					uid
				}).then(
					res => {
						this.mail = res.data.data.mail
						this.inboxData = res.data.data.mail.reduce((item, next) => {
							next.type === 0 && item.push(next);
							return item;
						}, []);
						this.outboxData = res.data.data.mail.reduce((item, next) => {
							next.type === 1 && item.push(next);
							return item;
						}, []);
						console.log(this.inboxData, this.outboxData)
						this.dateList = res.data.data.mail.reduce((item, next) => {
							item.push(next.date);
							return item;
						}, []);
					}
				)
			},
			/* 查看邮箱 */
			getMailContent(mid) {
				let status = this.mailType
				if (this.message !== null)
					this.message.close()
				this.$api.getMailContent({
					mid,
					status
				}).then(
					res => {
						if (res.data.data.code === 1) {
							this.mailContent = res.data.data.msg
							this.getMails()
						} else
							this.message = this.$message.error(res.data.data.msg)
					}
				)
			},
			/* 清空邮箱 */
			deleteMail() {
				if (this.message !== null)
					this.message.close()
				if (this.mail.length > 0) {
					let uid = this.$route.params.uid
					this.$confirm('此操作将永久删除所有私信, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						center: true
					}).then(() => {
						this.$api.deleteMail({
							uid
						}).then(
							res => {
								this.message = this.$message.success(res.data.data.msg)
								this.getMails()
							}
						)
					}).catch(() => {
						this.message = this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				} else {
					this.message = this.$message.info("你未收到任何私信")
				}
			},
			/* 替换换行符 **/
			updateNext(content) {
				return content.replace(/\n/g, "<br/>").replace(/ /g, '&nbsp')
			},
			updateTitle(title) {
				let arr = title.split('|=|')
				return arr[0]
			},
			getHisId(mailTitle) {
				if (this.message !== null)
					this.message.close()
				console.log(mailTitle.split('|=|')[1])
				this.hisId = mailTitle.split('|=|')[1]
			},
			sendEmail() {
				let isSystem = 0
				let mailType = 0
				let fromuid = this.userdata.uid
				let touid = this.hisId
				let title = this.title + '|=|' + this.userdata.uid
				let content = this.input
				this.$api.sendEmail({
					isSystem,
					mailType,
					fromuid,
					touid,
					title,
					content
				}).then(
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
			},
			/* 定时任务方法 */
			checkNewMail() {
				let count = 0
				this.dateList.forEach((item, index) => {
					if (item > this.olineTime) {
						count++
					} else {
						console.log(item, this.olineTime)
						console.log(item > this.olineTime)
					}
				})
				if (count > 0) {
					console.log(count)
				}
			},
			// 切换空间可见状态
			updateSwitchState() {
				if (this.message !== null)
					this.message.close()
				let uid = this.$route.params.uid
				this.$api.updateSwitchState({
					uid
				}).then(
					res => {
						this.message = this.$message.success(res.data.data.msg)
						console.log(res.data)
					}
				)
			},
			// 返回上一级
			returnPage() {
				if (window.history.length <= 1) {
					this.$router.push({
						path: "/system/storageManagement"
					});
					return false;
				} else {
					this.$router.go(-1);
				}
			},
		},
		computed: {
			...mapState({
				olineTime: state => state.message.olineTime,
			}),
			showTd() {
				let width = true
				if (document.body.clientWidth < 480) {
					width = false
				}
				return width
			}
		},
		beforeMount() {
			this.getMails()
			this.getInformation()
			this.getZoneStatus()
		},
	}
</script>

<style scoped="scoped">
	.item {
		margin-top: 0.5rem;
	}

	.homepage {
		width: 100%;
		margin-top: 1rem;
		display: flex;
	}

	.top_box {
		padding-bottom: 1rem;
	}

	.btn_box {
		padding: 0.25rem 0;
		text-align: right;
	}

	.bottom_box {
		margin-top: 1rem;
	}

	>>>.el-table__body-wrapper::-webkit-scrollbar {
		width: 0.5rem;
		height: 100%;
	}

	>>>.el-table__body-wrapper::-webkit-scrollbar-thumb {
		background: #1DA0FB;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}

	>>>.el-table,
	.el-table__expanded-cell {
		background-color: transparent;
	}

	>>>.el-table tr {
		background-color: transparent !important;
	}

	>>>.el-table--enable-row-transition .el-table__body td,
	>>>.el-table .cell,
	>>>.el-table_3_column_15 .cell {
		background-color: transparent;
		text-align: center;
	}

	/* >>>.el-table td.el-table__cell .el-tooltip,
	>>>.el-table_1_column_2 .cell {
		text-align: left;
	} */

	>>>.el-table td.el-table__cell .el-tooltip {
		cursor: pointer;
	}

	>>>.el-table,
	>>>.el-table__expanded-cell,
	>>>.el-table th.el-table__cell,
	>>>.el-table--enable-row-transition .el-table__body td,
	>>>.el-table .cell {
		background-color: transparent;
	}
	
	>>>.cell .el-tooltip {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.left {
		flex: 1;
		overflow: hidden;
		margin-right: 1rem;
		padding: 1rem;
		box-shadow: var(--box-shadow2);
		background-color: var(--bg);
	}

	.right {
		width: 18.75rem;
	}

	>>>textarea {
		resize: none;
		cursor: default;
	}

	/* /deep/.el-dialog {
		height: 30rem;
	} */

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

	#isOpen {
		width: 1.375rem;
		overflow: hidden;
		position: fixed;
		top: 4.75rem;
		right: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		transition: width .3s;
		/* transform: translateX(50%); */
	}

	#isOpen .el-button+.el-button {
		margin-left: 0;
	}

	#isOpen>>>.el-button {
		font-weight: lighter !important;
		padding: 0.25rem;
		transition: all .3s;
	}

	#isOpen>>>.tou {
		transform: rotate(180deg);
		border-top-right-radius: 50%;
		border-bottom-right-radius: 50%;
		border: none;
	}

	#isOpen>>>.tou i {
		font-size: 2rem;
	}

	.open {
		width: 50% !important;
		transform: rotate(180deg) !important;
		border-top-right-radius: 50%;
		border-bottom-right-radius: 50%;
	}

	#isOpen>>>.iconfont {
		font-size: 1.5rem;
	}

	#isOpen .fanhui {
		transform: rotateY(180deg);
	}

	.isOpenG {
		/* transform: translateX(100%); */
		color: #ff0000;
	}

	.isOpenD {
		/* transform: translateX(-100%); */
		color: #55aa00;
	}

	@media screen and (max-width: 480px) {
		.info_box {
			display: none;
		}

		.left {
			margin: 0;
			background-color: #fff;
			box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, .12), 0 0 0.375rem rgba(0, 0, 0, .04);
		}

		.right {
			display: none;
		}
		
		>>>.el-dialog {
			width: 98%!important;
		}
	}
</style>
