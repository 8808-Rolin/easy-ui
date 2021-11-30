<template>
	<div>
		<div class="posts_box">
			<div class="post" v-for="(item, index) in myColl" :key="item.pid">
				<div class="post_top">
					<div class="logo" @click="toPublicAndCommunity(item.aid)">
						<img :src="postImage(item.aimage)">
					</div>
					<div class="name">
						<div @click="toPublicAndCommunity(item.aid)">{{item.aname}}</div>
						<div @click="toP(item.aid,item.pid)"><strong>{{item.title}}</strong></div>
					</div>
				</div>
				<div class="post_bottom">
					<small>回复数：{{item.replies}}</small>
					&emsp;
					<small>发布日期：{{item.date}}</small>
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
	import base from '@/api/request/base.js'

	export default {
		name: 'Collection',
		//props: ['myColl'],
		data() {
			return {
				myColl:[]
			}
		},
		components: {
			Pagination
		},
		methods: {
			postImage(image) {
				return `${base.sq}${image}`
			},
			/* 前往论坛页面 */
			toPublicAndCommunity(aid) {
				if (aid > 0)
					this.$router.push({
						name: 'Community',
						params: {
							aid
						}
					})
				else
					this.$router.push({
						path: '/public'
					})
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
				let type = 1
				let uid = this.$route.params.uid
				//console.log(type, uid)
				this.$api.getPosts({
					type,
					'zone-uid': uid
				}).then(
					res => {
						this.myColl = res.data.data.posts
						console.log(res.data.data)
					}
				)
			},
		},
		beforeMount() {
			console.log("挂载myColl")
			this.getPosts()
		},

		destroyed() {
			console.log("销毁collection")
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

					div {
						width: fit-content;
						max-width: 60%;
						padding-top: 0.25rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						cursor: pointer;
					}

					strong {
						font-size: 1.5rem;
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
