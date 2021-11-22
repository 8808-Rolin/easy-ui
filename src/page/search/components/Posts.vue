<template>
	<div class="result">
		<div v-show="posts.length <= 0" style="text-align: center;"><h3>暂无数据</h3></div>
		<div class="Posts_box">
			<div class="Posts" v-for="(item, index) in posts" :key="item.pid">
				<div class="title" @click="toPost(item.aid, item.pid)"><strong>{{item.title}}</strong></div>
				<div class="content" @click="toPost(item.aid, item.pid)">
					<small v-html="item.content"></small>
				</div>
				<div class="other">
					<div @click="toCommunityAndPublic(item.aid)"><small>{{item.aname}}</small></div>
					<div>
						<div><small>{{item.authorName}}</small></div>
						&emsp;
						<div><small>{{item.releaseDate}}</small></div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div>
			<Pagination></Pagination>
		</div> -->
	</div>
</template>

<script>
	import Pagination from '../../../components/Pagination.vue'
	
	export default {
		name: 'Posts',
		props:['type'],
		data() {
			return {
				posts:[],
			}
		},
		components: {
			Pagination
		},
		methods:{
			/* 获取搜索数据 **/
			search() {
				let type = this.type
				let keyword = this.$route.params.content
				if (keyword !== 'null') {
					this.$api.search({type,keyword}).then(
						res => {
							this.posts = res.data.data.posts
							console.log(res.data.data)
						}
					)
				} else {
					
				}
			},
			// 前往帖子页面
			toPost(aid, pid) {
				console.log(this.$homeScroll)
				setTimeout(() => {
					this.$router.push({
						name: 'PublicCommunity',
						params: {
							aid,
							'pid': pid
						}
					})
				}, 500)
			},
			// 前往公共论坛和社团
			toCommunityAndPublic(aid) {
				if (aid === 0)
					this.$router.push({name:'Public'})
				else
					this.$router.push({name:'Community', params:{aid}})
			}
		},
		beforeMount() {
			this.search()
		},
		mounted() {
			this.$bus.$on('search', this.search)
		},
		beforeDestroy() {
			this.$bus.$off('search')
			//sessionStorage.setItem('scrollTop', scrollTop)
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
