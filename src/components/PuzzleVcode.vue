<template>
	<div>
		<Vcode :show="isShow" @success="onSuccess" @close="onClose"/>
		<el-button @click="submit">开始验证</el-button>
	</div>
</template>

<script>
	import Vcode from "vue-puzzle-vcode";
	export default {
		data() {
			return {
				isShow: false,
				code:0
			};
		},
		components: {
			Vcode,
		},
		methods: {
			submit() {
				this.isShow = true;
				this.code = 0;
				this.onCode()
			},
			onSuccess(msg) {
				this.isShow = false;// 通过验证后，需要手动关闭模态
				this.code = 1;
				this.onCode()
			},

			onClose() {
				this.isShow = false;
			},
			onCode() {
				this.$emit("update:onCode", this.code)
			}
		},
	};
</script>

<style scoped="scoped">
	
</style>
