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
						<strong>{{post.title}}</strong>
						</el-tooltip>
					</div>
				</div>

				<div class="p_body">
					<div class="p_user">
						<div class="user_photo" @click="toHisHomePage(master.muid)">
							<img :src="headImage(master.image)">
						</div>
						<p @click="toHisHomePage(master.muid)" style="cursor: pointer;"><big><strong>{{master.username}}</strong></big></p>
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
					<!-- <EmojiInput @analysisEmoji="releaseDiscuss" :aid="$route.params.aid" :permission="permissionCode"></EmojiInput> -->
					<component :is="myEmoji" @analysisEmoji="releaseDiscuss" :aid="$route.params.aid" :permission="permissionCode"></component>
				</div>
				<div class="discuss_all">
					<div v-show="discuss.length == 0" style="text-align: center;">尚未有人评论</div>
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
			
			<GoToLable></GoToLable>
			<!-- 废物div -->
			<div style="height: 3rem;"></div>
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Info from '../components/info.vue'
	import EmojiInput from '../components/EmojiInput.vue'
	import EmojiInput2 from '../components/EmojiInput2.vue'
	import Pagination from '../components/Pagination.vue'
	import GoToLable from '../components/goToLable.vue'
	import analysisEmoji from '../utils/analysisEmoji.js'
	import base from '../api/request/base.js'
	import time from '../utils/time.js'
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
				aname:'',
			}
		},
		components: {
			Header,
			Info,
			EmojiInput,
			Pagination,
			GoToLable,
			EmojiInput2
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
			/* 解析表情 **/
			Emoji(content) {
				return analysisEmoji(content)
			},
			/* 插入我的评论 **/
			addMyDiscuss(content) {
				console.log(time)
				this.discuss.unshift({
					author: {
						userImage: this.me.headImage,
						username: this.me.userName,
					},
					content: {
						text: content,
						releaseDate: time.formatDate
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
			},
			/* 获取社团名称 */
			getAssociationInfo() {
				let aid = this.$route.params.aid
				this.$api.getAssociationInfo({aid}).then(
					res => {
						if (res.data.data.name !== undefined)
							this.aname = res.data.data.name
						else 
							this.aname = '文学社'
					}
				)
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
				else {
					return this.aname
				}
			},
			myEmoji() {
				let myEmoji = 'EmojiInput'
				if(document.body.clientWidth < 480) {
					myEmoji = 'EmojiInput2'
				}
				return myEmoji
			},
		},
		beforeMount() {
			this.getPostPageInfo()
			this.getDiscussList(1)
			this.getMassOrganization()
			this.getAssociationInfo()
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
			background-color: var(--bg);

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
					
					strong {
						padding-left: 2rem;
					}
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
						cursor: pointer;
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
						max-width: 100vw;
						min-height: calc(100% - 5rem);
						padding: 1rem 1.5rem;
						
						* {
							max-width: 100%;
						}
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
			background-color: var(--bg);

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
						cursor: pointer;
						
						img {
							width: 100%;
							height: 100%;
						}
					}

					.right {
						flex: 1;
						margin-left: 1rem;
						overflow: hidden;
						border-bottom: rgba(0, 0, 0, .3) 0.0625rem solid;

						div {
							padding: 0.1875rem 0;
						}

						.name {
							width: fit-content;
							font-weight: bold;
							cursor: pointer;
						}

						.content {
							overflow: hidden;
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

<style type="text/css" scoped="scoped">
	@media screen and (max-width: 480px) {
		.main_box {
			width: 98%;
			top: 1rem;
		}
		
		.main_box * {
			box-sizing: border-box;
		}
		
		.main_box .info_box {
			display: none;
		}
		
		.p_mes {
			background-color: #FFF!important;
			box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, .12), 0 0 0.375rem rgba(0, 0, 0, .04);
		}
		
		.time_super {
			width: 100%;
		}
		
		.p_user {
			display: none;
		}
		
		.main_box .p_mes .p_title .title {
			font-size: 1.5rem;
		}
		
		.main_box .p_mes .p_title .title strong {
			padding: 0;
		}
		
		.p_discuss {
			background-color: #fff;
			box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, .12), 0 0 0.375rem rgba(0, 0, 0, .04);
		}
		
		.discuss {
			width: 100% !important;
			padding: 0 0.5rem!important;
		}
		
		.publish {
			margin-top: 0.5rem;
			padding: 0.25rem 0 !important;
		}
		
		.main_box .p_discuss .discuss_all {
			margin: 0;
		}
	}
</style>
