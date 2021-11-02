<template>
	<header>
		<div class="warp">
			<div class="logo">
				<a href="#" title="Easy社团">Easy社团</a>
			</div>
			<div class="user">
				<div class="profile">
					<img src="../assets/profile.jpg">
				</div>
				<a>用户名</a>
				<el-dropdown>
					<span class="el-dropdown-link">
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'Header',
		data() {
			return {}
		}
	}
</script>

<style>
	header {
		width: 100%;
		height: 4rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0.25rem 0.25rem rgba(141, 141, 141, 0.25);
	}

	header .warp {
		width: 100%;
		max-width: 75rem;
		min-width: 18rem;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	header .warp .logo {
		width: 10rem;
		height: 4rem;
	}

	header .warp .logo a {
		display: block;
		width: 100%;
		height: 100%;
		background: url(../assets/logo-slogen-225x90px.png) no-repeat;
		background-size: cover;
		text-indent: -624.9375rem;
	}

	header .warp .user {
		width: 8rem;
		height: 2.25rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	header .warp .user .profile {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		overflow: hidden;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409eff;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
