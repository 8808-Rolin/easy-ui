<template>
	<div>
		<Header></Header>

		<div class="main_box">
			<Info></Info>

			<div class="p_mes">
				<!-- 标题、个人信息、帖子内容 -->
				<div class="p_title">
					<div class="time_super">
						<small>发表时间：{{post.releaseDate}}</small>
						<small>社团名称：{{name}}</small>
					</div>
					<div class="title">
						<el-tooltip :content="post.title" placement="top" :open-delay="500">
						<strong>&emsp;&emsp;{{post.title}}</strong>
						</el-tooltip>
					</div>
				</div>

				<div class="p_body">
					<div class="p_user">
						<div class="user_photo" @click="toHisHomePage(master.muid)">
							<img :src="headImage(master.image)">
						</div>
						<p @click="toHisHomePage(master.muid)"><big><strong>{{master.username}}</strong></big></p>
						<p>UID: {{master.muid}}</p>
						<p>院系：{{master.org}}</p>
					</div>
					<div class="p_content">
						<div class="content" v-html="post.content"></div>
						<div class="operation">
							<div>
								<el-tag :key="tag" v-for="tag in dynamicTags">
									{{tag}}
								</el-tag>
							</div>
							<div>
								<i class="el-icon-star-off" @click="favoriteProcess" v-show="post.isFavorite === 0"></i>
								<i class="el-icon-star-on" @click="favoriteProcess" v-show="post.isFavorite === 1"></i>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="p_discuss">
				<!-- 评论发表、他人评论 -->
				<div class="publish">
					<EmojiInput @analysisEmoji="releaseDiscuss" :aid="$route.params.aid" :permission="permissionCode"></EmojiInput>
				</div>
				<div class="discuss_all">
					<div class="discuss" v-for="(item, index) in discuss" :key="index">
						<div class="left" @click="toHisHomePage(item.author.cuid)">
							<img :src="headImage(item.author.userImage)">
						</div>
						<div class="right">
							<div class="name" @click="toHisHomePage(item.author.cuid)">{{item.author.username}}</div>
							<div class="content" v-html="Emoji(item.content.text)"></div>
							<div class="time_other">
								<div>发表时间：{{item.content.releaseDate}}</div>
								<i class="el-icon-more"></i>
							</div>
						</div>
					</div>
					<div style="padding: 0.5rem 0;">
						<Pagination :total="code" :PageSize="12"></Pagination>
					</div>
				</div>
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
	import base from '../api/request/base.js'
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'CommunityP',
		props:['total', 'PageSize', 'PageSizes', 'permission', 'aid'],
		data() {
			return {
				user: {},
				post: {},
				discuss: [],
				//myDiscuss: "",
				dynamicTags: [],
				permissionCode: 0,
				post: [],
				master: [],
				code:0,
			}
		},
		components: {
			Header,
			Info,
			EmojiInput,
			Pagination
		},
		methods: {
			getPostPageInfo() {
				let uid = this.uid
				let pid = this.$route.params.pid
				this.$api.getPostPageInfo({
					uid,
					pid
				}).then(
					res => {
						this.master = res.data.data.master
						this.dynamicTags = res.data.data.post.tags
						this.post = res.data.data.post
					}
				)
			},
			getMassOrganization() {
				let uid = this.uid
				let aid = this.$route.params.aid
				this.$api.getAssInformation({uid,aid}).then(
					res => {
						this.permissionCode = res.data.data.permissionCode
					}
				)
			},
			getDiscussList(page) {
				let pid = this.$route.params.pid
				this.$api.getDiscussList({
					pid,
					page
				}).then(
					res => {
						if (res.data.data.discuss !== undefined) {
							this.discuss = res.data.data.discuss
							if (res.data.data.code > 2)
								this.code = 12 * (res.data.data.code - 1)
							else 
								this.code = 12 * res.data.data.code
						}
						document.documentElement.scrollTop = 10
					}
				)
			},
			headImage(url) {
				return `${base.sq}${url}`
			},
			formatDate() {
				let date = new Date();
				let year = date.getFullYear(); // 年
				let month = date.getMonth() + 1; // 月
				let day = date.getDate(); // 日
				let week = date.getDay(); // 星期
				let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				let hour = date.getHours(); // 时
				hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
				let minute = date.getMinutes(); // 分
				minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
				let second = date.getSeconds(); // 秒
				second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
				return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
			},
			/* 解析表情 **/
			Emoji(content) {
				return analysisEmoji(content)
			},
			/* 插入我的评论 **/
			addMyDiscuss(content) {
				this.discuss.unshift({
					author: {
						userImage: this.me.headImage,
						username: this.me.userName,
					},
					content: {
						text: content,
						releaseDate: this.formatDate()
					},
				})
			},
			/* 提交回复 **/
			releaseDiscuss(content) {
				let pid = this.$route.params.pid
				let uid = this.uid
				if (this.permissionCode !== 0 || this.$route.params.aid === 0) {
					this.$api.releaseDiscuss({pid,uid,content}).then(
						res => {
							this.addMyDiscuss(content)
							this.$message.success(res.data.data.msg)
						}
					)
				} else {
					this.$message.info('请先加入社团')
				}
				
			},
			
			/* 收藏贴子 **/
			favoriteProcess() {
				let pid = this.$route.params.pid
				let uid = this.uid
				this.$api.favoriteProcess({pid,uid}).then(
					res => {
						console.log(res.data)
						let code = res.data.data.code
						if (code === 0)
							this.post.isFavorite = 1
						else if (code === 1)
							this.post.isFavorite = 0
					}
				)
			},
			
			/* 前往他的空间 */
			toHisHomePage(uid) {
				if (uid !== this.uid)
					this.$router.push({name:'His',params:{uid}})
				else
					this.$router.push({name:'Me',params:{uid}})
			}
		},
		computed: {
			...mapState({
				uid: state => state.request.uid,
				me: state => state.message.user,
			}),
			name() {
				if (this.$route.params.aid === "0" || this.$route.params.aid === 0)
					return '公共论坛'
				else
					return '文学社'
			}
		},
		beforeMount() {
			this.getPostPageInfo()
			this.getDiscussList(1)
			this.getMassOrganization()
			document.documentElement.scrollTop = 10
		},
		mounted(){
			this.$bus.$on('getDiscussList',this.getDiscussList)
		},
		beforeDestroy() {
			this.$bus.$off('getDiscussList')
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
					width: 75%;
					font-size: 2rem;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
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
						img {
							width: 100%;
							height: 100%;
						}
					}

					p {
						width: 10rem;
						overflow: hidden;
						margin-bottom: 1rem;
					}
				}

				.p_content {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

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
				position: sticky;
				top: 0;
				background-image: linear-gradient(#fafafa 90%, rgba(0, 0, 0, 0));
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
	.attachment {
	    cursor: pointer !important;
	}
	.upload_error {
	    background: #FFE5E0;
	    border: 1px solid #EA644A;
	}
	.attachment > img {
	    width: 16px;
	    vertical-align: middle;
	    padding-right:4px;
	}
	.attachment > a {
	    text-decoration: none;
	    vertical-align: middle;
	}
	
	.attachment > span {
	    vertical-align: middle;
	    padding-right:4px;
	}
</style>
