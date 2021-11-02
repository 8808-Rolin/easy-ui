<template>
	<div>
		<Header></Header>
		<div class="login_box">
			<div class="easy_photo box"></div>
			<div class="login box">
				<h3>登录</h3>
				<div class="login_way">
					<div class="no_login">
						学号登录
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'

	export default {
		name: 'Login',
		data() {
			return {}
		},
		components: {
			Header
		}
	}
</script>

<style>
	.login_box {
		width: 18.75rem;
		height: 18.75rem;
		background-color: #55aaff;
	}
</style>
