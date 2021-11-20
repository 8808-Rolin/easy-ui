<template>
	<div>
		<div class="info">
			<div class="title">
				个人信息
			</div>
			<p>手机号码：<span>12345678910</span></p>
			<p>电子邮箱：<span>1234567890@qq.com</span></p>
			<p>所属院系：<span>信息技术学院</span></p>
			<p>生&emsp;&emsp;日：<span>2021-11-16</span></p>
			<p>发帖数量：<span>0</span></p>
		</div>

		<div class="notice">
			<!-- <el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>卡片名称</span>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{'列表内容 ' + o }}
				</div>
			</el-card> -->
			<div class="title">
				公告
			</div>
			<div class="item_box">
				<div v-for="o in 9" :key="o" class="item">
					{{'列表内容 ' + o }}
				</div>
			</div>
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
	.info {
		padding: 0.5rem;
		box-shadow: var(--box-shadow2);

		.title {
			padding: 0.5rem 0;
			border-bottom: solid 0.0625rem #999;
		}

		p {
			line-height: 2;
		}
	}

	.notice {
		margin-top: 1rem;
		padding: 0.5rem;
		box-shadow: var(--box-shadow2);

		.title {
			padding: 0.5rem 0;
			border-bottom: solid 0.0625rem #999;
		}

		.item_box {
			height: 10rem;
			overflow: auto;

			.item {
				margin-top: 0.25rem;
				padding: 0.25rem 0;
			}

			/**滚动条的宽度*/
			&::-webkit-scrollbar {
				width: 0.5rem;
				height: 100%;
			}

			/* 滚动条的滑块 */
			&::-webkit-scrollbar-thumb {
				background: #1DA0FB;
				-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
				border-radius: 0.25rem;
			}
		}
	}
</style>
