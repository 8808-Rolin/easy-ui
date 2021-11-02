<template>
	<div>
		<HeaderNoRight></HeaderNoRight>
		<div class="login_box">
			<div class="easy_photo box"></div>
			<div class="login box">
				<div class="">
					<h3>登录</h3>
					<div class="login_way">
						<div class="no_login">
							学号登录
						</div>
						<div class="phone_login">
							手机登录
						</div>
					</div>

					<div class="login_form">
						<el-input type="text" placeholder="学号" prefix-icon="el-icon-user"></el-input>
						<el-input type="password" placeholder="密码" prefix-icon="el-icon-key"></el-input>
						<div class="remember">
							<el-checkbox v-model="checked">记住密码</el-checkbox>
						</div>
						<el-button id="login_btn" type="primary">登&emsp;录</el-button>
					</div>

					<div class="login_links">
						<el-link href="#" :underline="false">忘记密码？</el-link>
						<el-link href="#" :underline="false">还没有账号？前往注册</el-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderNoRight from '../components/HeaderNoRight.vue'

	export default {
		name: 'Login',
		data() {
			return {
				checked: true
			};
		},
		components: {
			HeaderNoRight
		}
	}
</script>

<style>
	.login_box {
		width: 56.25rem;
		height: 28.125rem;
		border-radius: 0.75rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		box-shadow: var(--box-shadow2);
	}

	.login_box .box {
		width: 28.125rem;
		height: 28.125rem;
	}

	.login_box .login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.login>div {
		width: 21.875rem;
		height: 25rem;
		border: 0.0625rem solid rgba(0, 0, 0, .25);
		border-top: 0.75rem solid #1da0fb;
		border-radius: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.login_way {
		width: 80%;
		height: 1.5rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.login_way>div {
		width: 4rem;
	}

	.login_form {
		width: 17rem;
		height: 12.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	
	.login_form .remember {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	
	.login_form #login_btn {
		width: 12rem;
	}
	
	.login_links {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.easy_photo {
		background: url(../assets/logo-imgalpha-nologo-600px.png) no-repeat;
		background-size: cover;
	}
</style>
