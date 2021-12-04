<template>
	<header>
		<div class="warp">
			<div class="logo">
				<router-link :to="{path:'/'}" title="Easy社团">Easy社团</router-link>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'HeaderNoRight',
		data() {
			return {}
		},
		methods:{},
	}
</script>

<style>
	header {
		width: 100%;
		height: 4rem;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: var(--box-shadow2);
		background-color: #fff;
		z-index: 9000;
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
	
	@media screen and (max-width: 480px) {
		header {
			display: none;
			z-index: 2000!important;
		}
	}
</style>

