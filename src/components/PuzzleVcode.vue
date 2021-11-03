<template>
	<div>
		<Vcode :show="isShow" @success="onSuccess" @close="onClose" />
		<el-button @click="submit">开始验证</el-button>
	</div>
</template>

<script>
	import Vcode from "vue-puzzle-vcode";
	export default {
		data() {
			return {
				isShow: false,
			};
		},
		components: {
			Vcode,
		},
		methods: {
			submit() {
				this.isShow = true;
			},
			onSuccess(msg) {
				this.isShow = false; // 通过验证后，需要手动关闭模态框
			},

			onClose() {
				this.isShow = false;
			},
		},
	};
</script>

<style scoped="scoped">
	
</style>
