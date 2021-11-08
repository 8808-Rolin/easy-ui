<template>
	<div class="info_box">
		<div class="info_mes">
			<div class="info_photo">
				<img src="../assets/profile.jpg" >
			</div>
			<div class="name_and_ID">
				<strong>用户名</strong>
				<small><strong>学号：</strong>2019060703316</small>
			</div>
			<div id="intro">
				<small><strong>简介：</strong>简介</small>
			</div>

		</div>

		<div class="info_logo">
			<img src="../assets/logo-zhen-500px.png" >
		</div>
	</div>
</template>

<script>
	export default {
		name: 'info',
		data() {
			return {

			}
		}
	}
</script>

<style>
	.info_box {
		width: 100%;
		height: 9rem;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		box-shadow: var(--box-shadow2);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.info_box>div {
		height: 7rem;
		margin-top: 1.5rem;
	}

	.info_mes {
		width: calc(100% - 14rem);
		background-color: #42B983;
	}

	.info_logo {
		width: 7rem;
	}
</style>
