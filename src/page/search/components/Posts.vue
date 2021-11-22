<template>
	<div class="result">
		<div class="Posts_box">
			<div class="Posts">
				<div class="title"><strong>帖子标题</strong></div>
				<p class="content">
					<small>个人空间是用来展示用户的一些信息以及收藏的，用户可以选择空间是否对外开放，以及用户本人和其他用户访问同一个空间时个人空间会展示不同的内容，因此个人空间应有三种不同的布局，既：用户本人访问的页面用户设置了不对外开放时其他用户访问的页面用户设置了对外开放时其他用户访问的页面作为空间主人，用户还可以在这里修改对应的用户信息，包括昵称、邮箱、联系方式、简介等；点击头像即可修改头像，点击对应项即可修改对应信息个人空间是用来展示用户的一些信息以及收藏的，用户可以选择空间是否对外开放，以及用户本人和其他用户访问同一个空间时个人空间会展示不同的内容，因此个人空间应有三种不同的布局，既：用户本人访问的页面用户设置了不对外开放时其他用户访问的页面用户设置了对外开放时其他用户访问的页面作为空间主人，用户还可以在这里修改对应的用户信息，包括昵称、邮箱、联系方式、简介等；点击头像即可修改头像，点击对应项即可修改对应信息</small>
				</p>
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

<style lang="less" scoped="scoped">
	.result {
		width: 100%;
		padding: 1rem;
		box-shadow: var(--box-shadow2);

		.Posts_box {
			width: 90%;
			margin: auto;

			.Posts {
				margin-bottom: 0.75rem;
				padding: 0.5rem;
				border-bottom: #cdcdcf 0.0625rem solid;
				cursor: pointer;

				.title {
					padding: 0.5rem 0;
					font-size: 1.5rem;
				}

				.content {
					width: 100%;
					line-height: 1.5;
					padding: 0.5rem 1rem;
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
