<template>
	<div>
		<Header></Header>
		<div class="error_500">
			<div class="error">
				<div class="mes_box">
					<div class="error_code">
						<a>500: 服务器错误</a>
					</div>
					<div class="error_mes">
						<div v-html="$store.state.request.statusMes"></div>
					</div>
				</div>

				<div class="go_back">
					<el-link type="primary" icon="el-icon-warning-outline">返回首页</el-link>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import Header from '../components/Header.vue'
	import { mapState } from 'vuex';

	export default {
		name: 'error-500',
		data() {
			return {
				message: ''
			}
		},
		components: {
			Header
		},
		computed: {
			...mapState(['statusMes'])
		},
		beforeMount() {
			console.log(this.$store.state)
		}
	}
</script>

<style>
	.error_500 {
		width: 100%;
		max-width: 75rem;
		height: calc(100vh - 4rem);
		position: absolute;
		left: 50%;
		bottom: 1vh;
		transform: translateX(-50%);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		z-index: 1;
	}

	.error {
		width: 90%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.error .mes_box {
		width: 100%;
		height: 90%;
		margin: auto;
	}

	.error_code {
		height: 4rem;
		border-radius: 0.375rem;
		margin-bottom: 0.5rem;
		background-color: #1DA0FB;
		box-shadow: var(--box-shadow2);
	}

	.error_code a {
		color: #fff;
		line-height: 4rem;
		font-size: 2rem;
	}

	.error_mes {
		width: 100%;
		height: calc(100% - 4.5rem);
		padding: 0.5rem;
		text-align: left;
		border-radius: 0.5rem;
		overflow: auto;
		box-shadow: var(--box-shadow2);
	}

	/**滚动条的宽度*/
	.error_mes::-webkit-scrollbar {
		width: 0.5rem;
		height: 100%;
	}

	/* 滚动条的滑块 */
	.error_mes::-webkit-scrollbar-thumb {
		background: #1DA0FB;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}
	
	.go_back {
		width: 100%;
		height: 2rem;
	}

	.go_back .el-link {
		color: #1DA0FB;
		font-size: 1.2rem;
		font-style: italic;
	}
</style>
