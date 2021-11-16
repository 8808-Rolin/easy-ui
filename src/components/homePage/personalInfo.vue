<template>
	<div>
		<div class="info">
			<p>个人信息</p>
			<p>手机号码：<span>12345678910</span></p>
			<p>电子邮箱：<span>1234567890@qq.com</span></p>
			<p>所属院系：<span>信息技术学院</span></p>
			<p>生&emsp;&emsp;日：<span>2021-11-16</span></p>
			<p>发帖数量：<span>0</span></p>
		</div>

		<div class="notice">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>卡片名称</span>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{'列表内容 ' + o }}
				</div>
			</el-card>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'PersonalInfo',
		data() {
			return {

			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.info {}

	.notice {
		.box-card .clearfix {
			padding: 0.375rem;
		}
		
		.text {
			font-size: 14px;
		}

		.item {
			margin-bottom: 0.1875rem;
		}

		.clearfix:before,
		.clearfix:after {
			display: table;
			content: "";
		}

		.clearfix:after {
			clear: both
		}

		.box-card {
			width: 100%;
		}
	}
</style>
