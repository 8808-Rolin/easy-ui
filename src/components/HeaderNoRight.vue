<template>
	<header>
		<div class="warp">
			<div class="logo">
				<a href="#" title="Easy社团">Easy社团</a>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'HeaderNoRight',
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
		box-shadow: var(--box-shadow2);
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
</style>

