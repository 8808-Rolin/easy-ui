<template>
	<div class="homepage">
		<div class="left">
			<el-tabs class="top_box" v-model="activeName2" @tab-click="handleClick">
				<el-tab-pane label="我的社团" name="first">
					<MyClub :ass="joinass"></MyClub>
				</el-tab-pane>
				<el-tab-pane label="我的私信" name="second">
					<div class="btn_box">
						<!-- <el-button type="primary" icon="el-icon-edit" @click="centerDialogVisible2 = true">发送邮件
						</el-button> -->
						<el-button type="danger" @click.native="deleteMail" icon="el-icon-delete" size="medium">清空所有
						</el-button>
					</div>

					<el-table class="email_table" :data="mail" style="width: 100%" fit height="313">
						<el-table-column label="状态" width="100">
							<template slot-scope="scope">
								<el-tag type="success" size="mini" v-show="scope.row.isRead === 1">已读</el-tag>
								<el-tag type="danger" size="mini" v-show="scope.row.isRead === 0">未读</el-tag>
							</template>
						</el-table-column>
						<el-table-column class="title_2" label="标题" width="280">
							<template slot-scope="scope">
								<el-tooltip :content="scope.row.title" placement="top"
									@click.native="handleEdit(scope.$index, scope.row);centerDialogVisible = true;getMailContent(scope.row.mid)">
									<div>{{ scope.row.title }}</div>
								</el-tooltip>
							</template>
						</el-table-column>
						<el-table-column label="发送人" prop="from"></el-table-column>
						<el-table-column label="发送时间" width="180">
							<template slot-scope="scope">
								<i class="el-icon-time"></i>
								<span style="margin-left: 10px">{{ scope.row.date }}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-badge :is-dot="scope.row.isRead === 0" class="item">
									<el-button size="mini" type="primary"
										@click="handleEdit(scope.$index, scope.row);centerDialogVisible = true;getMailContent(scope.row.mid)">
										查看
									</el-button>
								</el-badge>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>

			<el-tabs class="bottom_box" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="我的帖子" name="0">
					<Posts :posts="post"></Posts>
				</el-tab-pane>
				<el-tab-pane label="我的收藏" name="1">
					<Collection :myColl="post"></Collection>
				</el-tab-pane>
			</el-tabs>
		</div>

		<div class="right">
			<PersonalInfo :user="userdata" :status="code"></PersonalInfo>
		</div>

		<!-- 对话框，邮件内容 -->
		<el-dialog title="私信内容" :visible.sync="centerDialogVisible" width="30%" center>
			<span v-html="mailContent"></span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
	import MyClub from '@/components/homePage/club.vue'
	import Posts from '@/components/homePage/posts.vue'
	import Collection from '@/components/homePage/collection.vue'
	import PersonalInfo from '@/components/homePage/personalInfo.vue'

	export default {
		name: 'MyHome',
		props: ['user', 'ass', 'posts', 'myColl', 'status'],
		data() {
			return {
				activeName: 0,
				activeName2: 'first',
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
			}
		},
		methods: {
			handleClick(tab, event) {
				//console.log(tab, event, "@@@@@@@@");
				this.getPosts()
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
			/* 获取我的帖子和收藏 **/
			getPosts() {
				let type = this.activeName
				let uid = this.$route.params.uid
				//console.log(type, uid)
				this.$api.getPosts({
					type,
					'zone-uid': uid
				}).then(
					res => {
						this.post = res.data.data.posts
						console.log(res.data.data)
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
						console.log(res.data)
					}
				)
			},
			/* 查看邮箱 */
			getMailContent(mid) {
				this.$api.getMailContent({
					mid
				}).then(
					res => {
						if (res.data.data.code === 1) {
							this.mailContent = res.data.data.msg
							this.getMails()
						} else
							this.$message.error(res.data.data.msg)
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
								this.$message.success(res.data.data.msg)
								this.getMails()
							}
						)
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				} else {
					this.message = this.$message.info("你未收到任何私信")
				}
			}
		},
		components: {
			MyClub,
			Posts,
			PersonalInfo,
			Collection,
		},
		beforeMount() {
			this.getInformation()
			this.getPosts()
			this.getZoneStatus()
			this.getMails()
		}
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
		border-bottom: #999 0.0625rem solid;
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

	>>>.el-table td.el-table__cell .el-tooltip,
	>>>.el-table_1_column_2 .cell {
		text-align: left;
	}

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

	.left {
		flex: 1;
		max-width: calc(100% - 19.75rem);
		margin-right: 1rem;
		padding: 1rem;
		box-shadow: var(--box-shadow2);
	}

	.right {
		width: 18.75rem;
	}
</style>
