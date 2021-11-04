<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>卡片名称</span>
			<el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-more-outline"></el-button>
		</div>
		<div v-for="(notice, index) in notices" :key="index" class="text item">
			<a class="notice_title">{{notice.title}}</a>
			<a>{{notice.time}}</a>
		</div>
	</el-card>
</template>

<script>
	export default {
		name: 'Notice',
		data() {
			return {
				notices: [{
					title: '第一条公告,第一条公告,第一条公告,第一条公告,第一条公告,第一条公告,',
					url: '',
					time: '2021-10-4'
				},{
					title: '第二条公告',
					url: '',
					time: '2021-10-4'
				}]
			}
		}
	}
</script>

<style>
	.text {
		font-size: 14px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item {
		margin-bottom: 18px;
	}
	
	.notice_title {
		width: 80%;
		max-height: 1.05rem;
		overflow: hidden;
		word-wrap: normal;
		text-align: left;
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
		width: 480px;
	}
</style>
