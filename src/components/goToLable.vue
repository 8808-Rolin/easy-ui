<template>
	<div class="goto_box">
		<div class="small_display">
			<el-button icon="el-icon-arrow-left"></el-button>
		</div>
		
		<el-tooltip v-show="show" content="返回首页" placement="top" effect="light" :open-delay="500">
			<router-link :to="{path: '/'}"><i class="el-icon-s-home"></i></router-link>
		</el-tooltip>
		<el-tooltip v-show="show" content="前往公共论坛" placement="top" effect="light" :open-delay="500">
			<router-link :to="{path: '/public'}"><i class="el-icon-s-promotion"></i></router-link>
		</el-tooltip>
	</div>
</template>

<script>
	export default {
		name: 'GoToLable',
		data() {
			return {
				screenWidth: document.body.clientWidth,
				show: true
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped="scoped">
	.goto_box {
		position: fixed;
		display: flex;
		flex-direction: column;
		bottom: 8rem;
		right: 2rem;
	}
	
	.goto_box >>> a {
		padding: 0.5rem;
		border: rgba(0,0,0,.1) 0.0625rem solid;
		border-radius: 0.25rem;
		color: #999;
		background-color: #ffffff99;
	}
	
	.goto_box >>> a:hover {
		background-color: #1DA0FB;
		color: #fff;
		border-color: #1DA0FB;
	}
	
	.goto_box >>> a + a {
		margin-top: 0.5rem;
	}
	
	.goto_box i {
		font-size: 2rem;
	}
	
	.small_display {
		position: fixed;
		display: none;
		right: -0.5rem;
	}
	
	.small_display >>> .el-button {
		padding: 0.5rem;
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;
	}
	
	@media screen and (max-width: 480px) {
		.small_display {
			display: block;
		}
	}
</style>
