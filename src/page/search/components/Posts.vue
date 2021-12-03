<template>
	<div class="result">
		<div v-show="posts.length <= 0" style="text-align: center;">
			<h3>暂无数据</h3>
		</div>
		<div class="Posts_box">
			<transition-group name="more" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter">
				<div class="Posts" v-for="(item, index) in posts" :key="item.pid" v-if="show" :data-index="item">
					<div class="title" @click="toPost(item.aid, item.pid)"><strong>{{item.title}}</strong></div>
					<div class="content" @click="toPost(item.aid, item.pid)">
						<small v-html="item.content"></small>
					</div>
					<div class="other">
						<div @click="toCommunityAndPublic(item.aid)" style="max-width: 6rem;"><small>{{item.aname}}</small></div>
						<div>
							<div @click="toHisHomePage(item.authorUID)" style="max-width: 4rem;"><small>{{item.authorName}}</small></div>
							&emsp;
							<div><small>{{item.releaseDate}}</small></div>
						</div>
					</div>
				</div>
			</transition-group>
		</div>
	</div>
</template>

<script>
	import Pagination from '../../../components/Pagination.vue'
	import {
		mapState
	} from 'vuex'
	

	export default {
		name: 'Posts',
		props: ['type'],
		data() {
			return {
				posts: [],
				show: false
			}
		},
		components: {
			Pagination
		},
		methods: {
			/* 获取搜索数据 **/
			search() {
				let type = this.type
				let keyword = this.$route.params.content
				if (keyword !== 'null') {
					this.$api.search({
						type,
						keyword
					}).then(
						res => {
							this.posts = res.data.data.posts
							console.log(res.data.data)
						}
					)
				} else {

				}
			},
			
			/* 前往他的空间 */
			toHisHomePage(uid) {
				if (uid !== this.uid)
					this.$router.push({name:'His',params:{uid}})
				else
					this.$router.push({name:'Me',params:{uid}})
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
					this.$router.push({
						name: 'Public'
					})
				else
					this.$router.push({
						name: 'Community',
						params: {
							aid
						}
					})
			},
			// 动画
			beforeEnter(el) {
				el.style.opacity = 0
			},
			enter(el, done) {
				// console.log(el.dataset.index)
				let delay = el.dataset.index * 1000
				setTimeout(() => {
					el.style.transition = 'opacity 1s '
					el.style.opacity = 1
					el.style.animation = 'one-in 1s infinite'
					el.style['animation-iteration-count'] = 1
					done()
				}, delay)
			}
		},
		computed: {
			...mapState({
				uid: state => state.request.uid,
			}),
		},
		beforeMount() {
			this.search()
		},
		mounted() {
			this.$bus.$on('search', this.search)
			setTimeout(() => {
				this.show = !this.show
			})
		},
		beforeDestroy() {
			this.$bus.$off('search')
			//sessionStorage.setItem('scrollTop', scrollTop)
		},
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
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
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
						line-height: 1.3;
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

<style type="text/css">
	@keyframes one-in {
		from {
			padding-top: 100px;
			height: 0%;
		}

		to {
			padding-top: 0px;
			height: 100%;
		}
	}
</style>

<style scoped="scoped">
	@media screen and (max-width: 480px) {
		.result * {
			box-sizing: border-box;
		}
		
		.result .Posts_box {
			width: 100%;
		}
		
		.result .Posts_box> span{
			width: 98%;
		}
		
		.other div {
			line-height: 1.3;
		}
		
		.other >div small{
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
