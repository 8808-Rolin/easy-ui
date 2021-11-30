<template>
	<div>
		<Info :user="userdata"></Info>
		
		<div class="homepage">
		<div v-show="code === 2" style="line-height: 100px;">
			<h1>当前空间用户未开放，无法访问！！</h1>
		</div>
		<div class="left" v-show="code !== 2">
			<el-tabs class="top_box" v-model="activeName2" @tab-click="handleClick">
				<el-tab-pane label="他的社团" name="first">
					<MyClub :ass="joinass"></MyClub>
				</el-tab-pane>
			</el-tabs>

			<el-tabs class="bottom_box" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="他的帖子" name="0">
					<Posts :posts="post"></Posts>
				</el-tab-pane>
				<el-tab-pane label="他的收藏" name="1">
					<Collection :myColl="post"></Collection>
				</el-tab-pane>
			</el-tabs>
		</div>

		<div class="right" v-show="code !== 2">
			<PersonalInfo :user="userdata" :status="code"></PersonalInfo>
		</div>
	</div>
	</div>
	

</template>

<script>
	import MyClub from '@/components/homePage/club.vue'
	import Posts from '@/components/homePage/posts.vue'
	import Collection from '@/components/homePage/collection.vue'
	import PersonalInfo from '@/components/homePage/personalInfo.vue'
	import Info from '@/components/hisInfo.vue'

	export default {
		name: 'MyHome',
		props: ['user', 'ass', 'posts', 'myColl', 'status', 'user'],
		data() {
			return {
				activeName: 0,
				activeName2: 'first',
				userdata: {},
				joinass: [],
				post: [],
				code: '',
				mail: [],
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
			handleDelete(index, row) {
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
		},
		components: {
			MyClub,
			Posts,
			PersonalInfo,
			Collection,
			Info
		},
		beforeMount() {
			this.getInformation()
			this.getPosts()
			this.getZoneStatus()
		}
	}
</script>

<style scoped="scoped">
	.item {
		margin-top: 10px;
		margin-right: 40px;
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
	>>>.el-table .cell {
		background-color: transparent;
		text-align: center;
	}

	>>>.el-table td.el-table__cell .el-tooltip,
	>>>.el-table_1_column_2 .cell {
		text-align: left;
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
