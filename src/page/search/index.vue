<template>
	<div id="seach">
		<Header></Header>

		<div class="main_box">
			<div class="search_box">
				<div class="logo"></div>
				<div class="search">
					<el-input placeholder="请输入内容" v-model="input">
						<el-switch slot="prepend" v-model="value" active-text="帖子" inactive-text="用户"
							@change="updateChild"></el-switch>
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>
			</div>

			<div class="result_box">
				<transition class="result_box" :name="transitionName" mode="out-in">
					<router-view class="router"></router-view>
				</transition>
			</div>

			<!-- 废物div -->
			<div style="height: 1rem;"></div>
		</div>
	</div>
</template>

<script>
	import Header from '../../components/Header.vue'

	export default {
		name: 'Search',
		data() {
			return {
				value: false,
				input: '',
				transitionName: 'slide-right'
			}
		},
		components: {
			Header
		},
		methods: {
			updateChild(val) {
				if (val) {
					this.$router.push({
						name: 'Posts'
					})
				} else {
					this.$router.push({
						name: 'User'
					})
				}
			}
		},
		beforeMount() {
			this.value = true
			this.$router.push({
				name: 'Posts'
			})
		},
		watch: {
			$route(to, from) {
				let isBack = this.$router.isBack;
				if (isBack) {
					this.transitionName = "slide-right"
				} else {
					this.transitionName = "slide-left"
				}
				this.$router.isBack = false
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#seach {
		height: 100vh;
		
		.main_box {
			width: 100%;
			height: 100%;
			max-width: 75rem;
			margin: auto;

			.search_box {
				padding: 1rem;
				box-shadow: var(--box-shadow2);

				.logo {
					width: 15rem;
					height: 6rem;
					margin: auto;
					background: url(../../assets/logo-slogen-225x90px.png) no-repeat;
					background-size: cover;
				}

				.search {
					width: 100%;
					max-width: 40rem;
					margin: 0.5rem auto;
					display: flex;
					align-items: center;

					/deep/.el-input-group__append {
						background-color: #1DA0FB;
						border: #1DA0FB solid 0.0625rem;
						color: #fff;
					}

				}
			}

			.result_box {
				margin-top: 2rem;
			}
		}
	}
</style>
