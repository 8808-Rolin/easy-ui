<template>
	<div class="result">
		<div class="user_box">
			<transition name="el-zoom-in-top" mode="out-in">
				<div class="user">
				<div class="left">
					<div class="user_photo">
						<img src="../../../assets/profile.jpg">
					</div>
				</div>
				<div class="right">
					<div class="name">
						<div><big><strong>用户名</strong></big></div>
						<div><small>发帖数量：0</small></div>
					</div>
					<div class="intro">
						<small>个人介绍nnnnnnnn</small>
					</div>
				</div>
			</div>
			</transition>
			
			<i style="width: 31.25rem;"></i>
		</div>

		<div class="">
			<Pagination></Pagination>
		</div>
	</div>

</template>

<script>
	import Pagination from '../../../components/Pagination.vue'

	export default {
		name: 'user',
		data() {
			return {
				transitionName: 'slide-right'
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
		padding: 1rem 2.25rem;
		box-shadow: var(--box-shadow2);

		.user_box {
			width: 100%;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;

			.user {
				width: 31.25rem;
				margin-bottom: 1rem;
				padding: 0.5rem;
				border-radius: 1rem;
				display: flex;
				box-shadow: var(--box-shadow2);
				cursor: pointer;

				.left {
					width: 7.5rem;

					.user_photo {
						width: 6rem;
						height: 6rem;
						border-radius: 50%;
						overflow: hidden;
						margin: 0 auto 0.5rem;
						
						img {
							width: 100%;
							height: 100%;
						}
					}
				}

				.right {
					flex: 1;
					margin-left: 0.75rem;
					display: flex;
					flex-direction: column;

					.name {
						padding: 0.25rem;
						display: flex;
						justify-content: space-between;
					}

					.intro {
						padding: 0.25rem;
						flex: 1;
					}
				}
			}
		}
	}
</style>
