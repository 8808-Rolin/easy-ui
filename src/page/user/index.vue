<template>
	<div>
		<Header></Header>

		<div class="main_box">
			<Info></Info>

			<div class="mes_box">
				<router-view></router-view>
			</div>
			<!-- 废物div -->
			<div style="height: 1rem;"></div>
		</div>
	</div>
</template>

<script>
	import Header from '../../components/Header.vue'
	import Info from '../../components/info.vue'

	export default {
		name: 'HomePage',
		data() {
			return {

			}
		},
		components: {
			Header,
			Info,
		},
	}
</script>

<style lang="less">
	.main_box {
		width: 100%;
		max-width: 75rem;
		margin: auto;
		position: relative;
		top: 3rem;

		.mes_box {
			width: 100%;
			margin-top: 1rem;
		}
	}
</style>
