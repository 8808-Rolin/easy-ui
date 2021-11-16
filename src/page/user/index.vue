<template>
	<div>
		<Header></Header>

		<div class="main_box">
			<Info></Info>
			
			<div class="mes_box">
				<div class="left">
					<router-view></router-view>
				</div>

				<div class="right">
					<PersonalInfo></PersonalInfo>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import Header from '../../components/Header.vue'
	import Info from '../../components/info.vue'
	import PersonalInfo from '../../components/homePage/personalInfo.vue'

	export default {
		name: 'HomePage',
		data() {
			return {

			}
		},
		components: {
			Header,
			Info,
			PersonalInfo
		}
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
			display: flex;
			.left {
				flex: 1;
				margin-right: 1rem;
				box-shadow: var(--box-shadow2);
				background-color: #0000FF22;
			}
			
			.right {
				width: 18.75rem;
				box-shadow: var(--box-shadow2);
				background-color: #00000022;
			}
		}
	}
</style>
