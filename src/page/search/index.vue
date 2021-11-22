<template>
	<div>
		<Header></Header>

		<div class="main_box">
			<div class="search_box">
				<div class="logo"></div>
				<div class="search">
					<el-input placeholder="请输入内容" v-model="input" @keyup.enter.native="toChild()">
						<el-switch slot="prepend" v-model="value" active-text="用户" :active-value="1" :inactive-value="0" inactive-text="帖子"></el-switch>
						<el-button slot="append" icon="el-icon-search" @click="toChild"></el-button>
					</el-input>
				</div>
			</div>

			<div class="result_box">
				<router-view :type="value"></router-view>
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
		props:['type'],
		data() {
			return {
				value: 0,
				input: '',
			}
		},
		components: {
			Header
		},
		methods:{
			toChild(val) {
				console.log(this.value, this.input)
				if(this.value === 0 && this.input !== '') {
					this.$router.push({name:'Posts',params:{content:this.input}})
					this.$bus.$emit('search')
				} else if(this.value === 1){
					this.$router.push({name:'User',params:{content:this.input}})
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
	.main_box {
		width: 100%;
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
			padding: 1rem;
			box-shadow: var(--box-shadow2);
		}
	}
</style>
