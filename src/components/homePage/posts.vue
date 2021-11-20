<template>
	<div>
		<div class="posts_box">
			<div class="post">
				<div class="post_top">
					<div class="logo">
						<img src="../../assets/profile.jpg">
					</div>
					<div class="name">
						<div>社团名称</div>
						<div><strong>帖子标题</strong></div>
					</div>
				</div>
				<div class="post_content">
					<small>帖子内容</small>
				</div>
				<div class="post_bottom">
					<small>回复数：0</small>
					&emsp;
					<small>发布日期：2021-11-18</small>
				</div>
			</div>
		</div>
		<div class="">
			<Pagination></Pagination>
		</div>
	</div>
</template>

<script>
	import Pagination from '../Pagination.vue'

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

<style lang="less" scoped="scoped">
	.posts_box {
		padding: 1rem;

		.post {
			padding: 0.5rem;
			border-bottom: 0.0625rem solid rgba(0, 0, 0, .3);
			display: flex;
			flex-direction: column;

			.post_top {
				display: flex;

				.logo {
					width: 4rem;
					height: 4rem;
					border-radius: 50%;
					overflow: hidden;
				}

				.name {
					flex: 1;
					margin-left: 1rem;
					display: flex;
					flex-direction: column;

					div {
						padding-top: 0.25rem;
					}

					strong {
						font-size: 1.5rem;
					}
				}
			}

			.post_content {
				padding: 0.5rem;
			}

			.post_bottom {
				text-align: right;
				color: #999;
			}
		}
	}
</style>
