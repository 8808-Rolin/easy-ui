<template>
	<div>
		<div class="error_404">
			<div class="error">
				<div class="photo">
					<img src="../assets/404.png" />
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

	export default {
		name: 'error-404',
		data() {
			return {
				message: ''
			}
		},
		components: {
			Header
		}
	}
</script>

<style scoped="scoped">
	.error_404 {
		width: 75rem;
		margin: auto;
		margin-top: 2rem;
	}

	.error_404 .error .photo {
		width: 50rem;
		margin: auto;
	}

	.error_404 .error .photo img {
		width: 100%;
		height: 100%;
	}

	.go_back {
		margin-top: 2rem;
		text-align: center;
	}

	.go_back .el-link {
		color: #1DA0FB;
		font-size: 1.2rem;
		font-style: italic;
	}
</style>
