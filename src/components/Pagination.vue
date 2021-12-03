<template>
	<div>
		<div class="block">
			<el-pagination background hide-on-single-page @size-change="handleSizeChange"
				@current-change="handleCurrentChange" :current-page="currentPage"
				:page-size="PageSize" layout="total, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import Editor from "@/components/tinymce";
	import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
	
	export default {
		name: 'app',
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.$bus.$emit('getPostList', 0, 2, val, this.PageSize)
				this.$bus.$emit('getFistPostList', 2, val, this.PageSize)
				this.$bus.$emit('getDiscussList', val)
				document.documentElement.scrollTop = 10
			}
		},
		props: ['total', 'PageSize', 'notisSize'],
		data() {
			return {
				//PageSizes: [10],
				currentPage: 1,
				//total: 400,
				//PageSize: 10,
				msg: {
					name: 1,
					age: 1
				}
			};
		},
		computed: {
			// 分页参数
			paginationProps() {
				const _this = this
				return {
					// showQuickJumper: true, // 是否显示快速跳转
					// showSizeChanger: true, // 是否显示修改页面展示条数
					current: _this.currentPage, // 当前第几页
					pageSize: _this.pageSize, // 每页显示条数
					total: _this.total, // 数据总数
					showTotal: (total, range) => {
						return ('共' + total + '条')
					},
				}
			}
		},
	}
</script>

<style scoped>
	.block {
		text-align: center;
	}

	.pagination-container {
		background: #fff;
		padding: 32px 16px;
	}
</style>
