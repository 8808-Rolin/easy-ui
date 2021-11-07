<template>
	<div>
		<HeaderHasSearch></HeaderHasSearch>

		<div class="main_box">
			<Info></Info>
		</div>
	</div>
</template>

<script>
	import HeaderHasSearch from '../components/HeaderHasSearch.vue'
	import Info from '../components/info.vue'

	export default {
		name: 'Community',
		data() {
			return {

			}
		},
		components: {
			HeaderHasSearch,
			Info
		},
		methods: {

		}
	}
</script>

<style>
	.main_box {
		width: 100%;
		max-width: 75rem;
		margin: auto;
		position: relative;
		top: 3.75rem;
	}
</style>
