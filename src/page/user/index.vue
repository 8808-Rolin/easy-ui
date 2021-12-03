<template>
	<div>
		<Header></Header>
		<div class="main_box">
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

	export default {
		name: 'HomePage',
		data() {
			return {
				centerDialogVisible3: false,
				title: '',
				input: ''
			}
		},
		components: {
			Header,
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
		z-index: 2000;

		.mes_box {
			width: 100%;
			margin-top: 1rem;
		}
	}
</style>

<style type="text/css" scoped="scoped">
	@media screen and (max-width: 480px) {
		.main_box {
			width: 98%;
			box-sizing: border-box;
		}
		
		.main_box * {
			box-sizing: border-box;
		}
	}
</style>
