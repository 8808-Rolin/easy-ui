<template>
	<div id="seach">
		<Header></Header>

		<div class="main_box">
			<div class="search_box">
				<div class="logo"></div>
				<div class="search">
					<el-input placeholder="请输入内容" v-model="input" @keyup.enter.native="toChild()">
						<el-switch slot="prepend" v-model="value" active-text="用户" :active-value="1" :inactive-value="0"
							inactive-text="帖子"></el-switch>
						<el-button slot="append" icon="el-icon-search" @click="toChild"></el-button>
					</el-input>
				</div>
			</div>

			<div class="result_box">
				<transition class="result_box" name="transitionName" mode="out-in">
					<router-view class="router" :type="value"></router-view>
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
		props: ['type'],
		data() {
			return {
				value: 0,
				input: '',
				transitionName: 'slide-right',
			}
		},
		components: {
			Header
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
		},
		methods: {
			toChild(val) {
				console.log(this.value, this.input)
				if (this.value === 0 && this.input !== '') {
					this.$router.push({
						name: 'Posts',
						params: {
							content: this.input
						}
					})
					this.$bus.$emit('search')
				} else if (this.value === 1) {
					this.$router.push({
						name: 'User',
						params: {
							content: this.input
						}
					})
					this.$bus.$emit('search')
				}
			},
		},
		beforeMount() {
			if (this.$route.name === 'User')
				this.value = 1
			else
				this.value = 0
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
				background-color: var(--bg);

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
				background-color: var(--bg);
			}
		}
	}
</style>

<style scoped="scoped">
	@media screen and (max-width: 480px) {
		.main_box {
			width: 98%;
		}
		
		.main_box * {
			box-sizing: border-box;
		}
		
		.main_box .search_box, .main_box .result_box {
			background-color: #fff!important;
			box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, .12), 0 0 0.375rem rgba(0, 0, 0, .04)!important;
		}
		
		.main_box .result_box {
			width: 98%;
			margin: auto;
		}
	}
</style>
