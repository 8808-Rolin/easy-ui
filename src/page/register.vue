<template>
	<div>
		<HeaderNoRight></HeaderNoRight>
		<div class="register_box">
			<div class="easy_photo box"></div>
			<div class="register box">
				<div class="">
					<h3>注册</h3>
					<div class="register_form">
						<el-input type="text" placeholder="学  号" prefix-icon="el-icon-user"></el-input>
						<el-input type="text" placeholder="手机号" prefix-icon="el-icon-mobile-phone"></el-input>
						<el-input type="text" placeholder="昵  称" prefix-icon="el-icon-user-solid"></el-input>
						<el-button-group>
							<el-button type="primary" icon="el-icon-arrow-left" @click="decrease">上一步</el-button>
							<el-button type="primary" @click="increase">下一步<i
									class="el-icon-arrow-right el-icon--right"></i></el-button>
						</el-button-group>
					</div>

					<div class="steps_box">
						<el-progress :percentage="percentage" :color="customColor"></el-progress>
					</div>

					<div class="register_links">
						<el-link href="#" :underline="false">已有账号？前往登录</el-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderNoRight from '../components/HeaderNoRight.vue'

	export default {
		name: 'Register',
		data() {
			return {
				percentage: 20,
				customColor: '#409eff',
				customColors: [{
						color: '#f56c6c',
						percentage: 20
					},
					{
						color: '#e6a23c',
						percentage: 40
					},
					{
						color: '#5cb87a',
						percentage: 60
					},
					{
						color: '#1989fa',
						percentage: 80
					},
					{
						color: '#6f7ad3',
						percentage: 100
					}
				]
			};
		},
		components: {
			HeaderNoRight
		},
		methods: {
			customColorMethod(percentage) {
				if (percentage < 30) {
					return '#909399';
				} else if (percentage < 70) {
					return '#e6a23c';
				} else {
					return '#67c23a';
				}
			},
			increase() {
				this.percentage += 10;
				if (this.percentage > 100) {
					this.percentage = 100;
				}
			},
			decrease() {
				this.percentage -= 10;
				if (this.percentage < 0) {
					this.percentage = 0;
				}
			}
		}
	}
</script>

<style>
	.register_box {
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

	.register_box .box {
		width: 28.125rem;
		height: 28.125rem;
	}

	.register_box .register {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.register>div {
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

	.register_form {
		width: 17rem;
		height: 15.625rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.register_form #register_btn {
		width: 12rem;
	}

	.steps_box {
		width: 17rem;
	}

	.register_links {
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
