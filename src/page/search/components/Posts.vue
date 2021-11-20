<template>
	<div class="result">
		<div class="Posts_box">
			<div class="Posts">
				<div class="title"><strong>帖子标题</strong></div>
				<div class="content">
					<small>帖子内容</small>
				</div>
				<div class="other">
					<div><small>动漫社</small></div>
					<div>
						<div><small>作者</small></div>
						&emsp;
						<div><small>2021-11-15</small></div>
					</div>
				</div>
			</div>
			
			
			<div class="Posts">
				<div class="title"><strong>帖子标题</strong></div>
				<div class="content">
					<small>帖子内容</small>
				</div>
				<div class="other">
					<div><small>动漫社</small></div>
					<div>
						<div><small>作者</small></div>
						&emsp;
						<div><small>2021-11-15</small></div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<Pagination></Pagination>
		</div>
	</div>
</template>

<script>
	import Pagination from '../../../components/Pagination.vue'
	
	export default {
		name: 'Posts',
		data() {
			return {
				
			}
		},
		components: {
			Pagination
		}
	}
</script>

<style lang="less">
	.result {
		width: 100%;
		padding: 1rem;
		.Posts_box {
			width: 90%;
			margin: auto;
			.Posts {
				margin-bottom: 0.75rem;
				padding: 0.5rem;
				border-bottom: #cdcdcf 0.0625rem solid;
				.title {
					padding: 0.5rem 0;
					font-size: 1.5rem;
				}
				.content {
					min-height: 6.25rem;
					padding-left: 1rem;
				}
				.other {
					margin-top: 0.1875rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					div {
						line-height: 1;
						display: flex;
						align-items: center;
					}
				}
				
				&:last-child {
					border: none;
				}
			}
		}
	}
</style>
