<template>
	<div class="result">
		<div v-show="users.length <= 0" style="text-align: center;"><h3>暂无数据</h3></div>
		<div class="user_box">
			<div class="user" v-for="(item, index) in users" :key="item.uid">
				<div class="left">
					<div class="user_photo">
						<img :src="headImage(item.image)">
					</div>
					<!-- <div class="college">
						<p><small>{{二级学院}}</small></p>
						<p><strong>信息技术学院</strong></p>
					</div> -->
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
			<i style="width: 31.25rem;"></i>
		</div>

		<div class="">
			<Pagination></Pagination>
		</div>
	</div>

</template>

<script>
	import Pagination from '../../../components/Pagination.vue'
	import base from '../../../api/request/base.js'

	export default {
		name: 'user',
		props:['type'],
		data() {
			return {
				users:[]
			}
		},
		methods:{
			/* 获取搜索数据 **/
			search() {
				let type = this.type
				let keyword = this.$route.params.content
				if (keyword !== 'null') {
					this.$api.search({type,keyword}).then(
						res => {
							this.users = res.data.data.users
							//console.log(res.data.data.users)
						}
					)
				}
			},
			/* 重写头像路径 **/
			headImage(image) {
				return `${base.sq}${image}`
			}
		},
		components: {
			Pagination
		},
		mounted() {
			this.$bus.$on('search', this.search)
		},
		beforeDestroy() {
			this.$bus.$off('search')
		},
		beforeMount() {
			this.search()
		},
	}
</script>

<style lang="less">
	.result {
		width: 100%;
		padding: 0 1.25rem;

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

				.left {
					width: 7.5rem;
					text-align: center;

					.user_photo {
						width: 6rem;
						height: 6rem;
						border-radius: 50%;
						overflow: hidden;
						margin: 0 auto 0.5rem;
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
