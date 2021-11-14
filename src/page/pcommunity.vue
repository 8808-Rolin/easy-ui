<template>
	<div>
		<Header></Header>

		<div class="main_box">
			<Info></Info>

			<div class="p_mes">
				<!-- 标题、个人信息、帖子内容 -->
				<div class="p_title">
					<div class="time_super">
						<small>发表时间：2021-11-12</small>
						<small>归属组织：社团名称</small>
					</div>
					<div class="title">
						<strong>帖子标题</strong>
					</div>
				</div>

				<div class="p_body">
					<div class="p_user">
						<div class="user_photo">
							<img src="../assets/profile.jpg">
						</div>
						<p>用户名</p>
						<p>UID: 0662</p>
						<p>院系：信息技术学院</p>
					</div>
					<div class="p_content">
						<div class="content">
							帖子内容
						</div>
						<div class="operation">
							<i class="el-icon-star-off"></i>
							<i class="el-icon-star-on"></i>
						</div>
					</div>
				</div>
			</div>

			<div class="p_discuss">
				<!-- 评论发表、他人评论 -->
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Info from '../components/info.vue'

	export default {
		name: 'CommunityP',
		data() {
			return {

			}
		},
		components: {
			Header,
			Info
		}
	}
</script>

<style lang="less">
	.main_box {
		width: 100%;
		max-width: 75rem;
		margin: auto;
		position: relative;
		top: 3rem;

		.p_mes {
			width: 100%;
			margin-top: 1rem;
			box-shadow: var(--box-shadow2);

			.p_title {
				padding: 0.5rem;
				border-bottom: #1DA0FB99 0.0625rem solid;

				div {
					padding: 0.1875rem 0.5rem;
				}

				.time_super {
					small {
						margin-right: 3rem;
					}
				}

				.title {
					font-size: 1.5rem;
				}
			}

			.p_body {
				width: 100%;
				display: flex;

				.p_user {
					padding: 1rem 1.5rem;
					text-align: center;
					border-right: #1DA0FB99 0.0625rem solid;

					.user_photo {
						width: 6rem;
						height: 6rem;
						border-radius: 50%;
						margin: 1rem auto;
						overflow: hidden;
					}

					p {
						margin-bottom: 1rem;
					}
				}

				.p_content {
					flex: 1;

					.content {
						min-height: calc(100% - 2.5rem);
						padding: 1rem 1.5rem;
					}

					.operation {
						font-size: 1.5rem;
						color: #ffaa00;
						padding: 0.5rem;
						text-align: right;
					}
				}
			}
		}
	}
</style>
