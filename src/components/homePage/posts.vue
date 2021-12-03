<template>
	<div>
		<div class="posts_box">
			<div v-show="posts.length == 0" style="text-align: center;">尚未发帖</div>
			<div class="post" v-for="(item, index) in posts" :key="item.pid">
				<div class="post_top">
					<div class="logo" @click="toPublicAndCommunity(item.aid)">
						<img :src="postImage(item.aimage)">
					</div>
					<div class="name">
						<div @click="toPublicAndCommunity(item.aid)">{{item.aname}}</div>
						<div class="title" @click="toP(item.aid, item.pid)"><strong>{{item.title}}</strong></div>
					</div>
				</div>
				<div class="post_bottom">
					<small>回复数：{{item.replies}}</small>
					&emsp;
					<small>发布日期：{{item.date}}</small>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Pagination from '../Pagination.vue'
	import base from '@/api/request/base.js'

	export default {
		name: 'Posts',
		//props:['posts'],
		data() {
			return {
				posts:[]
			}
		},
		components: {
			Pagination
		},
		methods:{
			postImage(image) {
				return `${base.sq}${image}`
			},
			/* 前往论坛页面 */
			toPublicAndCommunity(aid) {
				if (aid > 0)
					this.$router.push({name:'Community', params:{aid}})
				else
					this.$router.push({path: '/public'})
			},
			/* 前往贴子页面 */
			toP(aid, pid) {
				this.$router.push({
					name: 'PublicCommunity',
					params: {
						aid,
						pid
					}
				})
			},
			/* 获取我的帖子和收藏 **/
			getPosts() {
				let type = 0
				let uid = this.$route.params.uid
				//console.log(type, uid)
				this.$api.getPosts({
					type,
					'zone-uid': uid
				}).then(
					res => {
						this.posts = res.data.data.posts
						console.log(res.data.data)
					}
				)
			},
		},
		beforeMount() {
			console.log("挂载posts")
			this.getPosts()
		},
		destroyed() {
			console.log("销毁posts")
		}
	}
</script>

<style lang="less" scoped="scoped">
	.posts_box {
		padding: 1rem;
	
		.post {
			padding: 1rem;
			border-bottom: 0.0625rem solid rgba(23, 25, 30, .1);
			display: flex;
			flex-direction: column;
	
			.post_top {
				display: flex;
	
				.logo {
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
	
				.name {
					flex: 1;
					margin-left: 1rem;
					display: flex;
					flex-direction: column;
					overflow: hidden;
					
	
					div {
						width: fit-content;
						max-width: 60%;
						padding-top: 0.25rem;
						cursor: pointer;
					}
	
					.title {
						font-size: 1.5rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						cursor: pointer;
					}
				}
			}
	
			.post_bottom {
				text-align: right;
				color: #999;
			}
		}
	}
</style>

<style scoped="scoped">
	@media screen and (max-width: 480px) {
		.posts_box {
			padding: 0;
		}
		
		.posts_box * {
			box-sizing: border-box;
		}
		
		.posts_box .post {
			width: 98%;
		}
		
		.posts_box .post .post_top .name> div {
			max-width: 100%;
		}
		
		.posts_box .post .post_bottom {
			margin-top: 0.5rem;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
