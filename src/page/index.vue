<template>
	<div>
		<Header></Header>
		<div class="index_box">
			<div class="index_left"></div>
			
			<div class="index_right">
				<Notice></Notice>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Notice from '../components/notice.vue'
	
	export default {
		name: 'Index',
		data() {
			return {
				
			}
		},
		components: {
			Header,
			Notice
		},
		methods:{
			
		}
	}
</script>

<style>
	.index_box {
		width: 75rem;
		height: 37.5rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	
	.index_box>div {
		width: 50%;
		height: 100%;
	}
	
	.index_left {
		background: url(../assets/logo-imgalpha-nologo-600px.png);
		background-size: cover;
	}
	
	.index_right {
		background-color: #1DA0FB;
	}
</style>
