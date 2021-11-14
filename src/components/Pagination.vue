<template>
	<div>
		<div class="block">
			<el-pagination background hide-on-single-page @size-change="handleSizeChange"
				@current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="PageSizes"
				:page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import Editor from "@/components/tinymce";

	export default {
		name: 'app',
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		},
		data() {
			return {
				PageSizes: [10, 20, 30, 40],
				currentPage: 1,
				total: 400,
				PageSize: 10,
				msg: {
					name: 1,
					age: 1
				}
			};
		}
	}
</script>

<style scoped>
	.pagination-container {
		background: #fff;
		padding: 32px 16px;
	}
</style>
