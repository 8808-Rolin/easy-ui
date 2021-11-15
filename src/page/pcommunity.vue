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
						<p><big><strong>用户名</strong></big></p>
						<p>UID: 0662</p>
						<p>院系：信息技术学院</p>
					</div>
					<div class="p_content">
						<div class="content">
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
							<p>Post content</p>
						</div>
						<div class="operation">
							<div>
								<el-tag :key="tag" v-for="tag in dynamicTags">
									{{tag}}
								</el-tag>
							</div>
							<div>
								<i class="el-icon-star-off"></i>
								<i class="el-icon-star-on"></i>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="p_discuss">
				<!-- 评论发表、他人评论 -->
				<div class="publish">
					<EmojiInput @analysisEmoji="analyEmoji"></EmojiInput>
				</div>
				<div class="discuss_all">
					<div class="discuss" v-for="(item, index) in discuss" :key="index">
						<div class="left">
							<img src="../assets/profile.jpg">
						</div>
						<div class="right">
							<div class="name">{{item.name}}</div>
							<div class="content" v-html="item.content"></div>
							<div class="time_other">
								<div>发表时间：{{item.date}}</div>
								<i class="el-icon-more"></i>
							</div>
						</div>
					</div>
					<div style="padding: 0.5rem 0;">
						<Pagination></Pagination>
					</div>
				</div>
			</div>
			<!-- 废物div -->
			<div style="height: 1rem;"></div>
		</div>
		<!-- 废物div -->
		<div style="height: 1rem;"></div>
	</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Info from '../components/info.vue'
	import EmojiInput from '../components/EmojiInput.vue'
	import Pagination from '../components/Pagination.vue'
	import analysisEmoji from '../utils/analysisEmoji.js'

	export default {
		name: 'CommunityP',
		data() {
			return {
				user: {},
				post: {},
				discuss: [{
						name: "用户名",
						content: "评论内容",
						date: "2021-11-14",
					},
					{
						name: "用户名",
						content: "评论内容",
						date: "2021-11-14",
					},
					{
						name: "用户名",
						content: "评论内容",
						date: "2021-11-14",
					}
				],
				myDiscuss: "",
				dynamicTags: ['标签一', '标签二', '标签三'],
			}
		},
		components: {
			Header,
			Info,
			EmojiInput,
			Pagination
		},
		methods: {
			/* 解析表情 **/
			analyEmoji(content) {
				let str = analysisEmoji(content)
				this.discuss.push({
					name: "用户名",
					content: str,
					date: "2021-11-14",
				})
			},
		},
	}
</script>

<style lang="less">
	.main_box {
		width: 100%;
		max-width: 75rem;
		margin: auto;
		position: relative;
		top: 3rem;
		bottom: 1.875rem;

		.p_mes {
			width: 100%;
			margin-top: 1rem;
			box-shadow: var(--box-shadow2);

			.p_title {
				padding: 0.5rem;
				border-bottom: #cdcdcf 0.0625rem solid;

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
					width: 12.5rem;
					padding: 1rem 1.5rem;
					text-align: center;
					border-right: #cdcdcf 0.0625rem solid;

					.user_photo {
						width: 6rem;
						height: 6rem;
						border: 0.25rem solid #c8c8d7;
						border-radius: 50%;
						margin: 1rem auto;
						overflow: hidden;
					}

					p {
						width: 10rem;
						overflow: hidden;
						margin-bottom: 1rem;
					}
				}

				.p_content {
					flex: 1;

					.content {
						min-height: calc(100% - 5rem);
						padding: 1rem 1.5rem;
					}

					.operation {
						font-size: 1.5rem;
						color: #ffaa00;
						padding: 0.5rem;
						display: flex;
						justify-content: space-between;

						.el-tag+.el-tag {
							margin-left: 10px;
						}
					}
				}
			}
		}

		.p_discuss {
			width: 100%;
			margin-top: 1rem;
			margin-bottom: 1rem;
			border-bottom-left-radius: 1rem;
			border-bottom-right-radius: 1rem;
			box-shadow: var(--box-shadow2);

			.publish {
				padding: 2rem 1rem 0;
				// border-bottom: rgba(0, 0, 0, .3) 0.0625rem solid;
			}

			.discuss_all {
				margin-top: 2rem;

				.discuss {
					width: 70%;
					margin: 1rem auto 0;
					padding: 0.5rem 1rem;
					display: flex;

					.left {
						width: 4rem;
						height: 4rem;
						border-radius: 50%;
						overflow: hidden;
					}

					.right {
						flex: 1;
						margin-left: 1rem;
						border-bottom: rgba(0, 0, 0, .3) 0.0625rem solid;

						div {
							padding: 0.1875rem 0;
						}

						.name {
							font-weight: bold;
						}

						.content {
							color: #666;

							img {
								width: 1.875rem;
								height: 1.875rem;
							}
						}

						.time_other {
							font-size: 0.75rem;
							color: #999;
							display: flex;
							justify-content: space-between;
						}
					}

					&:last-child .right {
						border: none;
					}
				}
			}
		}
	}
</style>
