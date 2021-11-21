<template>
	<div>
		<el-tabs class="top_box" v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="我的社团" name="first">
				<MyClub></MyClub>
			</el-tab-pane>
			<el-tab-pane label="空间邮件" name="second">
				<div class="btn_box">
					<el-button type="primary" icon="el-icon-edit">发送邮件</el-button>
					<el-button type="danger" icon="el-icon-delete">全部删除</el-button>
				</div>

				<el-table class="email_table" :data="tableData" style="width: 100%" height="313">
					<el-table-column label="状态" width="180">
						<template slot-scope="scope">
							<el-tag type="success">已读</el-tag>
							<el-tag type="danger">未读</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="主题" width="280">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top">
								<p>姓名: {{ scope.row.name }}</p>
								<p>住址: {{ scope.row.address }}</p>
								<div slot="reference" class="name-wrapper">
									{{ scope.row.name }}
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column label="发送时间" width="180">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>

		<el-tabs class="bottom_box" v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="我的帖子" name="first">
				<Posts></Posts>
			</el-tab-pane>
			<el-tab-pane label="空间收藏" name="second">我的收藏</el-tab-pane>
		</el-tabs>
	</div>

</template>

<script>
	import MyClub from '../../../components/homePage/club.vue'
	import Posts from '../../../components/homePage/posts.vue'

	export default {
		name: 'MyHome',
		data() {
			return {
				activeName: 'first',
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		},
		components: {
			MyClub,
			Posts
		},
	}
</script>

<style>
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

	.el-table__body-wrapper::-webkit-scrollbar {
		width: 0.5rem;
		height: 100%;
	}

	.el-table__body-wrapper::-webkit-scrollbar-thumb {
		background: #1DA0FB;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}
</style>
