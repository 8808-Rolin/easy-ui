<template v-if="show">
	<div class="result">
		<div v-show="users.length <= 0" style="text-align: center;">
			<h3>暂无数据</h3>
		</div>
		<div class="user_box">
			<transition-group appear name="more" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter">
				<div @click="toHisHomePage(item.uid)" class="user" v-for="(item, index) in users" :key="item.uid" :data-index="item">
					<div class="left">
						<div class="user_photo">
							<img :src="headImage(item.image)">
						</div>
					</div>
					<div class="right">
						<div class="name">
							<div><big><strong>{{item.username}}</strong></big></div>
							<div><small>发帖数量：{{item.numberOfPost}}</small></div>
						</div>
						<div class="intro">
							<small>{{item.intro}}</small>
						</div>
					</div>
				</div>
			</transition-group>


		</div>

		<div class="">
			<Pagination></Pagination>
		</div>
	</div>

</template>

<script>
	import Pagination from '@/components/Pagination.vue'
	import base from '@/api/request/base.js'
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'user',
		props: ['type'],
		data() {
			return {
				show: false,
				users: []
			}
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
							this.users = res.data.data.users
							//console.log(res.data.data.users)
						}
					)
				}
			},
			/* 前往他的空间 */
			toHisHomePage(uid) {
				if (uid !== this.uid)
					this.$router.push({name:'His',params:{uid}})
				else
					this.$router.push({name:'Me',params:{uid}})
			},
			/* 重写头像路径 **/
			headImage(image) {
				return `${base.sq}${image}`
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
		components: {
			Pagination
		},
		watch: {
			users() {
				setTimeout(() => {
					this.show = !this.show
				})
			}
		},
		mounted() {
			this.$bus.$on('search', this.search)
			setTimeout(() => {
				this.show = !this.show
			})
		},
		beforeDestroy() {
			this.$bus.$off('search')
		},
		beforeMount() {
			this.search()
		},
	}
</script>

<style lang="less" scoped="scoped">
	.result {
		width: 100%;
		padding: 1rem 2.25rem;
		box-shadow: var(--box-shadow2);

		.user_box {
			width: 100%;

			span {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				
				&::after {
					width: 31.25rem;
				    content: '';
				}
			}

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
						max-height: 2rem;
						overflow: hidden;
						padding: 0.25rem;
						display: flex;
						justify-content: space-between;
					}

					.intro {
						max-height: 4.5rem;
						margin-top: 0;
						overflow: hidden;
						padding: 0.25rem;
						flex: 1;
					}
				}
			}
		}
	}
</style>

<style type="text/css">
	@keyframes one-in {
		from {
			padding-left: 100%;
		}

		to {
			padding-left: 0%;
		}
	}
</style>
